<#
  Daily Grind: simulation runs (QA)

  Builds a throwaway test copy of index.html with the test hook (window.__G) injected just before the line
  "  if(!load())fresh();", adds sim.js, and opens it in your browser. The page then plays the games by itself
  with real clicks and shows a report (also in the browser console, and as a JSON download).

  Default: 20 careful "survive" games (seeds 1-20) and 10 random games (seeds 101-110), the same as the
  QA pass in CHANGELOG section 37. Needs only Windows PowerShell and a browser (no Node or Python).

  Usage (from the repo folder):
    powershell -ExecutionPolicy Bypass -File tools\qa\run-sims.ps1
    powershell -ExecutionPolicy Bypass -File tools\qa\run-sims.ps1 -Survive 5 -Random 0
    powershell -ExecutionPolicy Bypass -File tools\qa\run-sims.ps1 -SurviveSeed 50 -OutDir D:\temp\dg_qa

  The test copy is written OUTSIDE the repo (default: a "dg_qa_run" folder next to the repo folder) and must not
  be committed. It plays in its own browser storage, so your real save is not touched.
  Keep the browser tab in front while it runs; 30 games take about one to three minutes.
#>
param(
  [int]$Survive = 20,
  [int]$Random = 10,
  [int]$SurviveSeed = 1,
  [int]$RandomSeed = 101,
  [string]$OutDir = "",
  [switch]$NoOpen
)
$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$repo = Resolve-Path (Join-Path $here '..\..')
if (-not $OutDir) { $OutDir = Join-Path (Split-Path -Parent $repo) 'dg_qa_run' }
$full = [IO.Path]::GetFullPath($OutDir).TrimEnd('\') + '\'
if ($full.StartsWith($repo.Path.TrimEnd('\') + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'OutDir must be outside the repo folder (the test copy must not be committed).' }
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$utf8 = New-Object Text.UTF8Encoding($false)
$src = [IO.File]::ReadAllText((Join-Path $repo 'index.html'), $utf8)

# the marker line must be there exactly once, or the hook would go in the wrong place
$marker = '  if(!load())fresh();'
$count = ([regex]::Matches($src, [regex]::Escape($marker))).Count
if ($count -ne 1) { throw "Expected the line '$marker' exactly once in index.html, found $count. Update run-sims.ps1." }

# test hook: exposes the game's private state and helpers to sim.js
$hook = '  window.__G={get S(){return S},set S(v){S=v},get loc(){return loc},get view(){return view},CONFIG:CONFIG,fresh:fresh,enter:enter,render:function(){render()},' +
        'worth:worth,score:score,CAREERS:CAREERS,TRACKS:TRACKS,HOUSE:HOUSE,lvl:lvl,meets:meets,kreq:kreq,payIdx:payIdx,effort:effort,M:M,G:G,' +
        'hasDress:hasDress,price:price,qualFee:qualFee,lesCount:lesCount,lesHours:lesHours,inProgress:inProgress,expShort:expShort,' +
        'shutLeft:shutLeft,myJob:myJob,dist:dist};'
$nl = if ($src.Contains("`r`n")) { "`r`n" } else { "`n" }
$out = $src.Replace($marker, $hook + $nl + $marker)

$cfg = "<script>window.__QA={survive:$Survive,random:$Random,surviveSeed:$SurviveSeed,randomSeed:$RandomSeed};</script><script src=""sim.js""></script>"
$at = $out.LastIndexOf('</body>')
if ($at -lt 0) { throw 'No </body> in index.html.' }
$out = $out.Substring(0, $at) + $cfg + $nl + $out.Substring($at)

$page = Join-Path $OutDir 'index.html'
[IO.File]::WriteAllText($page, $out, $utf8)
Copy-Item -Force (Join-Path $here 'sim.js') (Join-Path $OutDir 'sim.js')

Write-Host "Test copy written to $page"
Write-Host "Runs: $Survive survive (seeds $SurviveSeed..$($SurviveSeed+$Survive-1)), $Random random (seeds $RandomSeed..$($RandomSeed+$Random-1))."
if (-not $NoOpen) { Start-Process $page; Write-Host 'Opened in your default browser. The report appears when all runs finish.' }
