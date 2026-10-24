<#
  Daily Grind: UI check (QA)

  Builds a throwaway test copy of index.html with the test hook (window.__G) and uicheck.js, plus a page that runs it
  twice in your browser: in a desktop-width frame (1280x800) and then a phone-width frame (390x844). Each run presses
  every button in every building and checks the layout, the toasts, and that the vitals shown match the real change
  (see the top of uicheck.js). Both reports appear side by side, with a button to download the results as JSON.
  Needs only Windows PowerShell and a browser (no Node or Python). On a machine with Node and Playwright,
  "node tools/qa/run-uicheck.js" does the same and also saves screenshots.

  Usage (from the repo folder):
    powershell -ExecutionPolicy Bypass -File tools\qa\run-uicheck.ps1
    powershell -ExecutionPolicy Bypass -File tools\qa\run-uicheck.ps1 -OutDir D:\AI\dg_scratch\ui

  The test copy is written OUTSIDE the repo (default: a "dg_qa_ui" folder next to the repo folder) and must not be
  committed. It plays in its own browser storage, so your real save is not touched. It takes under a minute.
#>
param(
  [string]$OutDir = "",
  [switch]$NoOpen
)
$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$repo = Resolve-Path (Join-Path $here '..\..')
if (-not $OutDir) { $OutDir = Join-Path (Split-Path -Parent $repo) 'dg_qa_ui' }
$full = [IO.Path]::GetFullPath($OutDir).TrimEnd('\') + '\'
if ($full.StartsWith($repo.Path.TrimEnd('\') + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'OutDir must be outside the repo folder (the test copy must not be committed).' }
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$utf8 = New-Object Text.UTF8Encoding($false)
$src = [IO.File]::ReadAllText((Join-Path $repo 'index.html'), $utf8)

$marker = '  if(!load())fresh();'
$count = ([regex]::Matches($src, [regex]::Escape($marker))).Count
if ($count -ne 1) { throw "Expected the line '$marker' exactly once in index.html, found $count. Update run-uicheck.ps1." }

# test hook: the same one run-uicheck.js injects
$hook = '  window.__G={get S(){return S},set S(v){S=v},get loc(){return loc},set loc(v){loc=v},get view(){return view},set view(v){view=v},' +
        'CONFIG:CONFIG,fresh:fresh,render:function(){render()},worth:worth,TRACKS:TRACKS,CAREERS:CAREERS,ITEMS:ITEMS,LOCS:LOCS};'
$nl = if ($src.Contains("`r`n")) { "`r`n" } else { "`n" }
$out = $src.Replace($marker, $hook + $nl + $marker)
$cfg = '<script>window.__UICHECK={autorun:true,seed:7};</script><script src="uicheck.js"></script>'
$at = $out.LastIndexOf('</body>')
if ($at -lt 0) { throw 'No </body> in index.html.' }
$out = $out.Substring(0, $at) + $cfg + $nl + $out.Substring($at)
[IO.File]::WriteAllText((Join-Path $OutDir 'game.html'), $out, $utf8)
Copy-Item -Force (Join-Path $here 'uicheck.js') (Join-Path $OutDir 'uicheck.js')

# the harness: one frame at a time (they would share the same browser storage), scaled down to fit the screen
$harness = @'
<!doctype html><html><head><meta charset="utf-8"><title>Daily Grind UI check</title>
<style>body{font:14px/1.4 system-ui,sans-serif;margin:16px;background:#eef2f4;color:#16222e}
.frames{display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap}.f{background:#fff;border:2px solid #16222e;border-radius:10px;padding:8px}
.f h3{margin:0 0 6px}.box{overflow:hidden}iframe{border:0;transform-origin:0 0}.rep{max-width:640px}
.rep li{margin:2px 0}.ok{color:#1a7f3c;font-weight:700}.bad{color:#b00;font-weight:700}</style></head><body>
<h2 style="margin:0 0 8px">Daily Grind UI check</h2><p id="st">Starting…</p>
<div class="frames"><div class="f"><h3>Desktop 1280×800</h3><div class="box" style="width:640px;height:400px"><iframe id="fd" width="1280" height="800" style="transform:scale(.5)"></iframe></div><div class="rep" id="rd"></div></div>
<div class="f"><h3>Phone 390×844</h3><div class="box" style="width:293px;height:633px"><iframe id="fp" width="390" height="844" style="transform:scale(.75)"></iframe></div><div class="rep" id="rp"></div></div></div>
<p><button id="dl" disabled>Download JSON</button></p>
<script>
var all=[],order=[['fd','rd'],['fp','rp']],i=0;
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function next(){if(i>=order.length){document.getElementById('st').innerHTML=all.some(function(r){return r.issues.length})?'<span class="bad">Finished: issues found (see below).</span>':'<span class="ok">Finished: no issues at either width.</span>';document.getElementById('dl').disabled=false;return}
  document.getElementById('st').textContent='Running '+(i?'phone':'desktop')+' width…';document.getElementById(order[i][0]).src='game.html?'+Date.now()}
window.addEventListener('message',function(e){var d=e.data;if(!d||d.type!=='dg-uicheck')return;var r=d.res;all.push(r);
  document.getElementById(order[i][1]).innerHTML='<p>'+r.stats.buildings+' buildings, '+(r.stats.situations||0)+' situations, '+r.stats.clicks+' presses, '+r.stats.checks+' layout checks. '+
    (r.issues.length?'<span class="bad">'+r.issues.length+' issue(s)</span>':'<span class="ok">No issues.</span>')+'</p><ul>'+
    r.issues.map(function(x){return '<li><b>'+esc(x.kind)+'</b> '+esc(x.where)+': '+esc(x.msg)+'</li>'}).join('')+'</ul>';
  i++;setTimeout(next,300)});
document.getElementById('dl').onclick=function(){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(all,null,1)],{type:'application/json'}));a.download='dailygrind-uicheck.json';a.click()};
next();
</script></body></html>
'@
$page = Join-Path $OutDir 'uicheck.html'
[IO.File]::WriteAllText($page, $harness, $utf8)

Write-Host "Test copy and check page written to $OutDir"
if (-not $NoOpen) { Start-Process $page; Write-Host 'Opened in your default browser. Both reports appear when the runs finish.' }
