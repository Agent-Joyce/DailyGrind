  /* ==================================================================
     8. MAP ART AND DIALOGUE
     ART draws each building as inline SVG; GREET holds the shopkeepers' lines.
     ================================================================== */
  var ART={
    factory:function(){
      return SV(150,118,shade(72,114,78)+
        box(110,30,10,70,6,'#8b4a3a','#6d3a2e','#a35a47')+Rc(110,34,10,3,'#e8e2d4')+Rc(110,42,10,3,'#e8e2d4')+
        '<g opacity=".55"><circle cx="118" cy="20" r="6" fill="#cfd4d8"><animate attributeName="cy" values="22;6;22" dur="9s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0;.8" dur="9s" repeatCount="indefinite"/></circle><circle cx="124" cy="12" r="8" fill="#dfe3e6"><animate attributeName="cy" values="16;-2;16" dur="11s" repeatCount="indefinite"/></circle></g>'+
        box(6,58,104,50,16,'#9aa5ad','#76838c','#b8c2c9')+
        P([6,58,24,40,24,58],'#c9d2d8')+P([24,58,24,40,42,58],'#7f8c95')+P([42,58,60,40,60,58],'#c9d2d8')+P([60,58,60,40,78,58],'#7f8c95')+P([78,58,96,40,96,58],'#c9d2d8')+P([96,58,96,40,110,52],'#7f8c95')+
        Rc(20,41,3,16,'#9bd0e6')+Rc(56,41,3,16,'#9bd0e6')+Rc(92,41,3,16,'#9bd0e6')+
        Rc(6,58,104,8,'#e0a526',E)+T(58,64.5,6.5,'#2b2b2b','FACTORY',40)+
        loopN(4,function(i){return win(12+i*14,72,10,10)})+
        '<rect x="70" y="76" width="30" height="32" fill="#4a5560"'+E+'/>'+loopN(6,function(i){return Rc(70,78+i*5,30,1,'rgba(255,255,255,.18)')})+
        Rc(12,92,8,16,'#5b3a1e',E)+P([66,108,104,108,108,112,62,112],'#d4b03a'));
    },
    hosp:function(){
      return SV(150,118,shade(72,114,78)+
        box(4,64,40,48,14,'#e9f0f3','#b7c4ca','#ffffff')+box(100,64,34,48,12,'#e9f0f3','#b7c4ca','#ffffff')+
        box(42,30,62,82,18,'#f4f8f9','#c1ccd2','#ffffff')+
        Rc(42,30,62,12,'#2f86b0',E)+T(73,40,8.5,'#fff','HOSPITAL',50)+
        '<rect x="63" y="46" width="20" height="20" rx="3" fill="#fff"'+E+'/>'+Rc(71,48,4,16,'#d33')+Rc(65,54,16,4,'#d33')+
        loopN(2,function(r){return [48,60,84,92].map(function(x,i){return i<2?'':''}).join('')})+
        loopN(3,function(r){return win(48,72+r*12,8,8)+win(90,72+r*12,8,8)})+
        loopN(2,function(r){return win(9,72+r*16,9,10)+win(26,72+r*16,9,10)+win(105,72+r*16,9,10)+win(120,72+r*16,9,10)})+
        Rc(62,94,22,18,'#3a6a86',E)+Rc(73,94,1,18,'rgba(255,255,255,.5)')+Rc(58,88,30,6,'#d33',E)+
        P([58,88,88,88,94,85,64,85],'#e86a5f')+
        '<ellipse cx="73" cy="26" rx="13" ry="5" fill="#cfd8dc"'+E+'/>'+T(73,28.5,7,'#d33','H',6)+
        Rc(110,56,16,8,'#d33',E)+T(118,62.5,5,'#fff','ER',9));
    },
    /* classical bank: pediment, six columns, steps */
    bank:function(){
      return SV(150,112,shade(70,108,76)+
        box(4,100,116,8,16,'#d9d3c3','#b0a998','#efe9d9')+
        box(12,40,102,60,22,'#e8e1d1','#bdb5a2','#f3eddf')+
        P([63,16,120,40,142,29,85,5],'#8f4b3f')+P([6,40,120,40,63,16],'#efe8d8')+P([15,38,111,38,63,21],'#dcd3bf')+
        '<circle cx="63" cy="31" r="5.5" fill="#d4a93a"'+E+'/>'+T(63,34,8,'#4a3a12','$',5)+
        Rc(12,40,102,9,'#d4cbb7')+T(63,47,7.5,'#5a4b2c','BANK',34)+
        loopN(6,function(i){return Rc(18+i*17,50,7,50,'url(#col)')+Rc(16.5+i*17,50,10,2.5,'#cfc6b2')+Rc(16.5+i*17,97.5,10,2.5,'#cfc6b2')})+
        win(27,58,6,32)+win(44,58,6,32)+win(78,58,6,32)+win(95,58,6,32)+Rc(60,68,8,32,'#5b3a1e',E)+
        sw(114,48,22,.15,.4,26)+sw(114,48,22,.6,.85,26));
    },
    /* brick schoolhouse with clock tower and flag */
    school:function(){
      return SV(150,125,shade(64,120,72)+
        box(8,56,100,60,20,'url(#brick)','#7a3a2b','#8a4636')+
        box(50,22,26,38,10,'url(#brick)','#7a3a2b','#8a4636')+
        P([46,22,80,22,63,3],'#4a5b6e')+P([80,22,63,3,90,16],'#36465a')+
        '<circle cx="63" cy="35" r="7" fill="#f8f6f0"'+E+'/><path d="M63 29.5V35h4" fill="none" stroke="#333" stroke-width="1"/>'+
        loopN(2,function(r){return [16,32,76,92].map(function(x){return Rc(x-1,63+r*24,12,16,'#f4f1ea')+win(x,64+r*24,10,14)}).join('')})+
        Rc(53,88,18,28,'#3b2a1a',E)+'<path d="M53 90a9 9 0 0 1 18 0" fill="#f4f1ea"/>'+
        Rc(46,69,32,11,'#1f5a3d',E)+T(62,77.5,7,'#fff','SCHOOL',26)+
        sw(108,56,20,.2,.45,16)+sw(108,56,20,.2,.45,40)+sw(108,56,20,.6,.85,16)+sw(108,56,20,.6,.85,40)+
        Rc(116,36,1.6,82,'#8a8f95')+Rc(117.6,37,17,10,'#d94f3d',' class="wave"'));
    },
    /* low fast-food restaurant with a tall pole sign showing a burger */
    fast:function(){
      return SV(160,120,shade(70,112,78)+
        box(8,60,100,46,18,'#f7f2e8','#cdbfa8','#c8352b')+Rc(8,60,100,10,'#c8352b')+Rc(8,70,100,2,'#e8b02a')+
        win(14,76,38,24)+win(70,76,34,24)+Rc(55,78,12,28,'url(#glass)',E)+
        Rc(86,66,16,6,'#fff')+T(94,71,4.5,'#c8352b','OPEN 24H',14)+
        sw(108,60,18,.15,.45,24)+sw(108,60,18,.55,.85,24)+
        Rc(130,50,5,60,'#7a7f85',E)+'<rect x="115" y="12" width="36" height="38" rx="7" fill="#c8352b"'+E+'/>'+
        '<g class="glow"><path d="M122 29a11 9 0 0 1 22 0z" fill="#e5a050"'+E+'/><rect x="122" y="29" width="22" height="3.4" rx="1.7" fill="#7cc04a"/><rect x="122" y="32.4" width="22" height="4" rx="2" fill="#5a2d17"/><rect x="122" y="36.4" width="22" height="4" rx="2" fill="#e5a050"'+E+'/></g>'+
        T(133,47,5,'#ffcb05','DRIVE-THRU',28));
    },
    /* clothes mall: wide two-tone block, mannequin windows, rooftop shopping bag */
    mall:function(){
      var man=function(x,body,tie){return '<circle cx="'+x+'" cy="62" r="3" fill="#e8c7a8"/>'+PS([x-5,66,x+5,66,x+6,84,x-6,84],body)+(tie?Rc(x-.8,66,1.6,8,tie):'')+Rc(x-.7,84,1.4,6,'#666')};
      return SV(150,125,shade(68,120,74)+
        box(12,34,106,80,22,'#ece8e0','#bdb7aa','#f8f5ef')+Rc(12,34,106,16,'#7b2d8e',E)+T(65,46,10.5,'#fff','CLOTHES MALL',90,' class="glow"')+
        win(18,56,32,36,'url(#warm)')+win(80,56,32,36,'url(#warm)')+man(34,'#e0457b')+man(96,'#22324d','#c8102e')+
        Rc(54,82,22,32,'url(#glass)',E)+'<path d="M65 82v32" stroke="#cfd4d9" stroke-width="1"/>'+P([50,80,80,80,84,86,46,86],'#7b2d8e')+
        Rc(88,98,22,12,'#fff',E)+T(99,106.5,5.5,'#e0457b','SALE',16)+
        sw(118,34,22,.15,.4,80,'#8a8f95')+sw(118,34,22,.6,.85,80,'#8a8f95')+
        '<path d="M55 22q10-14 20 0" fill="none" stroke="#c0398a" stroke-width="2.2"/><polygon points="50,21 80,21 77,34 53,34" fill="#e0457b"'+E+'/><circle cx="65" cy="27" r="3" fill="#fff" opacity=".85"/>');
    },
    /* tall low-end apartment block with water tower and AC units */
    apt:function(){
      return SV(110,160,shade(44,155,52)+
        box(10,32,64,122,22,'#a9a59d','#7e7a73','#bdb9b0')+
        Rc(24,14,20,18,'#8a6a45',E)+'<ellipse cx="34" cy="14" rx="10" ry="3" fill="#a07c52"/>'+P([24,14,34,5,44,14],'#5a4a38')+Rc(26,32,2,4,'#555')+Rc(40,32,2,4,'#555')+
        loopN(6,function(r){return loopN(3,function(c){var lit=(r*3+c)%3===0;
          return win(16+c*18,42+r*15,12,10,lit?'url(#warm)':'#3d4650')+Rc(15+c*18,52+r*15,14,1.5,'#666')+(((r*2+c)%5===0)?Rc(18+c*18,44+r*15,6,5,'#c9ccd0'):'')})})+
        loopN(6,function(r){return sw(74,42+r*15,22,.2,.45,10)+sw(74,42+r*15,22,.6,.85,10,'#d9a85a')})+
        Rc(28,136,18,18,'#3b3b3b',E)+P([24,134,50,134,48,139,26,139],'#c0392b')+
        Rc(14,126,40,7,'#59626b')+T(34,131.5,5.2,'#fff','APARTMENTS',34));
    },
    /* hip-roofed bungalow with porch, chimney smoke and garden */
    bung:function(){
      return SV(150,100,shade(66,96,70)+
        box(10,50,90,42,24,'#f2ece0','#cfc7b6','#e5dec9')+
        P([4,52,22,28,88,28,106,52],'#35604d')+P([22,28,88,28,112,16,46,16],'#2f5644')+P([106,52,88,28,112,16,130,40],'#294a3b')+
        box(70,10,9,18,6,'#9a4a3b','#7a362a','#b05a49')+
        '<circle cx="76" cy="8" r="3" fill="#ddd" class="smoke"/><circle cx="80" cy="4" r="3.5" fill="#ccc" class="smoke" style="animation-delay:.9s"/>'+
        win(18,62,20,18,'url(#warm)')+win(76,62,18,18,'url(#warm)')+Rc(50,66,14,26,'#6b4423',E)+
        Rc(40,58,34,5,'#e9e2d0',E)+Rc(44,63,3,29,'#fff')+Rc(67,63,3,29,'#fff')+
        sw(100,50,24,.2,.5,22,'#e7b25a')+
        P([50,92,64,92,72,100,42,100],'#cfc7b6')+
        '<ellipse cx="14" cy="92" rx="10" ry="6" fill="#3d8a4f"/><ellipse cx="100" cy="95" rx="9" ry="5" fill="#3d8a4f"/>'+
        Rc(121,80,2,16,'#6b4423')+Rc(110,72,30,11,'#2f5d4a',E)+T(125,80,5.2,'#fff','BUNGALOW',24));
    },
    /* glass office tower on a podium */
    jobs:function(){
      return SV(130,140,shade(56,136,64)+
        box(4,98,100,34,20,'#c9ced3','#9aa1a8','#dfe3e6')+
        box(14,22,60,76,24,'url(#glass)','#2b4d68','#7fb0c9')+
        loopN(6,function(i){return '<path d="M'+(26+i*10.5)+' 22V98" stroke="#d6e3ec" stroke-width=".7" opacity=".6"/>'}).replace(/ /g,' ')+
        loopN(5,function(i){return '<path d="M14 '+(34+i*12.5)+'H74" stroke="#d6e3ec" stroke-width=".7" opacity=".6"/>'})+
        PS([14,22,44,22,14,70],'#fff',' opacity=".13"')+
        sw(74,22,24,.15,.4,70)+sw(74,22,24,.6,.85,70)+box(30,14,16,8,6,'#8d949b','#6a7077','#aab0b5')+
        win(10,106,26,20)+win(70,106,28,20)+Rc(44,106,16,26,'url(#glass)',E)+P([40,102,64,102,66,106,38,106],'#2563a8')+
        Rc(16,86,56,10,'#2563a8',E)+T(44,93.5,6.5,'#fff','EMPLOYMENT',48)+
        sw(104,98,20,.2,.45,20,'#455f73')+sw(104,98,20,.6,.85,20,'#455f73'));
    },
    /* big-box supermarket with cart and produce */
    market:function(){
      return SV(160,105,shade(70,100,78)+
        box(6,44,112,52,22,'#f3f4f1','#c9ccc4','#dfe3dc')+Rc(6,44,112,13,'#1f8a4c')+T(62,54,9,'#fff','SUPERMARKET',84)+
        win(12,62,40,30)+win(76,62,38,30)+Rc(56,64,16,32,'url(#glass)',E)+P([50,60,78,60,82,64,46,64],'#1f8a4c')+
        sw(118,44,22,.15,.4,22)+sw(118,44,22,.55,.85,22)+
        Rc(14,88,22,8,'#b98b5e',E)+'<circle cx="20" cy="87" r="3.2" fill="#e8742a"/><circle cx="27" cy="86.5" r="3.2" fill="#d94f3d"/><circle cx="33" cy="87" r="3" fill="#8fc43a"/>'+
        P([132,82,150,82,146,93,136,93],'#9aa5ad')+'<path d="M132 82l-4-5" stroke="#555" stroke-width="1.4" fill="none"/><circle cx="138" cy="96" r="1.8" fill="#333"/><circle cx="145" cy="96" r="1.8" fill="#333"/>');
    },
    /* wood-clad restaurant with awning, warm light, patio umbrellas */
    resto:function(){
      var aw=loopN(7,function(i){return Rc(8+i*11.4,58,11.6,12,i%2?'#fff':'#c0392b',E)}).replace(/ /g,' ');
      return SV(140,108,shade(62,103,68)+
        box(10,42,76,56,20,'url(#wood)','#4a3320','#6b4a2e')+Rc(22,28,52,13,'#16130f',E)+T(48,38,8,'#e6c27a','RESTAURANT',44)+
        aw+loopN(8,function(i){return '<circle cx="'+(14+i*10)+'" cy="73" r="1.3" fill="#ffd58a"/>'}).replace(/ /g,' ')+
        win(14,76,24,18,'url(#warm)')+win(56,76,24,18,'url(#warm)')+Rc(42,76,12,22,'#3a2316',E)+
        sw(86,42,20,.2,.5,22,'#e7b25a')+
        Rc(107,86,1.6,12,'#666')+'<ellipse cx="108" cy="84" rx="15" ry="5" fill="#d94f3d"'+E+'/><ellipse cx="108" cy="96" rx="9" ry="2.6" fill="#fff"'+E+'/>'+
        Rc(127,92,1.4,8,'#666')+'<ellipse cx="128" cy="90" rx="9" ry="3.4" fill="#2f7fbf"'+E+'/>');
    },
    /* blue-band electronics store with live screens and dish */
    elec:function(){
      return SV(160,108,shade(66,103,74)+
        box(8,40,100,58,24,'#2b3138','#1c2025','#3b434b')+Rc(8,40,100,14,'#1c6bff')+T(66,51,9,'#fff','ELECTRONICS',74)+
        PS([22,41,15,50,20,50,17,57,26,47,21,47],'#ffd400')+
        Rc(14,60,34,24,'url(#screen)',E+' class="flick"')+Rc(76,60,28,12,'url(#screen2)',E+' class="flick" style="animation-delay:.8s"')+
        Rc(76,74,13,10,'url(#screen)',E+' class="flick" style="animation-delay:1.4s"')+Rc(91,74,13,10,'url(#screen2)',E+' class="flick" style="animation-delay:.3s"')+
        Rc(54,72,16,26,'url(#glass)',E)+sw(108,40,24,.15,.5,24,'#18d0ff')+sw(108,40,24,.6,.85,24,'#2b6fd8')+
        '<ellipse cx="64" cy="22" rx="9" ry="5" transform="rotate(-30 64 22)" fill="#d8dde2"'+E+'/><path d="M64 24l-2 10" stroke="#777" stroke-width="1.5"/>');
    },
    /* small painted thrift shop with clothes rack */
    thrift:function(){
      var aw=loopN(6,function(i){return Rc(6+i*11.4,52,11.6,11,i%2?'#fff':'#e6a23c',E)}).replace(/ /g,' ');
      return SV(110,95,shade(48,90,52)+
        box(8,36,64,52,16,'#4f9d95','#2f6762','#6db5ad')+Rc(14,39,52,11,'#f4ead2',E)+T(40,47.5,8.5,'#c2552f','THRIFT',36,' font-style="italic"')+
        aw+win(14,66,22,20)+'<circle cx="25" cy="72" r="3" fill="#e8c7a8"/><path d="M20 76h10l2 10H18z" fill="#c8453b"/>'+
        Rc(46,64,14,24,'#2b4a47',E)+win(62,68,8,14)+sw(72,36,16,.25,.75,22)+
        Rc(80,66,1.5,22,'#555')+Rc(98,66,1.5,22,'#555')+Rc(80,66,19.5,1.5,'#555')+
        Rc(84,68,4,13,'#c8453b')+Rc(89,68,4,13,'#2b4a8a')+Rc(94,68,4,13,'#e0a526'));
    },
    /* slate-blue gym with a red sign band and a big dumbbell on the roof */
    gym:function(){
      return SV(100,104,shade(42,99,48)+
        Rc(22,24,36,3.6,'#2a2f36',E)+Rc(18,17,4.6,17,'#2a2f36',E)+Rc(58,17,4.6,17,'#2a2f36',E)+Rc(12.6,20,4.6,11,'#5a626c',E)+Rc(63.4,20,4.6,11,'#5a626c',E)+
        box(8,38,60,56,16,'#4a5d7a','#33425a','#6a82a3')+Rc(8,38,60,12,'#e8573f',E)+T(38,47.4,8.6,'#fff','GYM',24)+
        win(14,56,26,22)+'<circle cx="22" cy="63" r="2.6" fill="#2b2b2b"/><path d="M19 66h6v8h-6z" fill="#2b2b2b"/><circle cx="32" cy="63" r="2.6" fill="#7b3f2a"/><path d="M29 66h6v8h-6z" fill="#7b3f2a"/>'+
        Rc(46,58,14,36,'#1f2b3d',E)+Rc(48,61,10,12,'url(#glass)')+Rc(49,80,8,3,'#2c9a54',' class="blink"')+
        sw(68,38,16,.25,.75,28,'#a9d7ee')+Rc(8,92,60,3,'#c9ced4',E));
    },
    /* small town park: lawn, path, trees, a bench, a pond and a wooden sign */
    park:function(){
      var tr=function(x,y,s){return Rc(x-1.2,y-s*.5,2.4,s*.5,'#6b4a2e')+'<circle cx="'+x+'" cy="'+(y-s)+'" r="'+(s*.6)+'" fill="url(#leaf)"/><circle cx="'+(x-s*.4)+'" cy="'+(y-s*.7)+'" r="'+(s*.45)+'" fill="url(#leaf)"/><circle cx="'+(x+s*.4)+'" cy="'+(y-s*.72)+'" r="'+(s*.46)+'" fill="url(#leaf)"/>'};
      return SV(100,90,shade(50,82,44)+
        '<ellipse cx="50" cy="66" rx="46" ry="18" fill="#8cc865" stroke="#5f9a43" stroke-width="1.5"/>'+
        '<path d="M8 72Q40 60 56 66T94 62" fill="none" stroke="#e3d3a4" stroke-width="5" stroke-linecap="round"/>'+
        '<ellipse cx="70" cy="74" rx="12" ry="5" fill="url(#water)" stroke="#5a8f6a" stroke-width="1"/>'+
        tr(22,62,16)+tr(80,56,13)+tr(38,52,11)+
        Rc(46,64,16,2.4,'#8a6a45',E)+Rc(47,66.4,1.4,4,'#5c4630')+Rc(59,66.4,1.4,4,'#5c4630')+Rc(46,60.5,16,1.8,'#8a6a45')+
        Rc(12,30,1.8,18,'#6b4a2e')+Rc(3,22,22,9,'#7a5232',E)+T(14,29,6.5,'#fbeec8','PARK',16));
    },
    /* community centre: a low hall with a red roof band, a banner, big windows and double doors */
    comm:function(){
      return SV(100,108,shade(40,103,48)+
        box(6,46,62,52,18,'#efe3cc','#b9a37f','#f7efdf')+Rc(6,46,62,9,'#c0504d',E)+T(37,53,6,'#fff','COMMUNITY',54)+
        win(11,60,16,14)+win(47,60,16,14)+Rc(29,70,16,28,'#7a5232',E)+'<path d="M37 70v28" stroke="#4a3220" stroke-width=".8"/>'+
        Rc(14,80,12,9,'#2f8f6b',E)+T(20,86.5,3.6,'#fff','OPEN',10)+
        '<circle cx="54" cy="84" r="3.2" fill="#e8742a"/><circle cx="60" cy="86" r="3" fill="#ffc94a"/>'+
        sw(68,46,18,.2,.75,20,'#9b8664'));
    }
  };
  function art(k){return ART[k]()}

  /* ---------- shopkeeper dialogue: several everyday lines per building, plus lines that react to you ---------- */
  var GREET={
    msgsapp:['🔔 Notification',['Loans between friends: pay back on time.','A friendly bet keeps things interesting.']],
    gigsapp:['🔔 Notification',['Orders are waiting near you.','Keep your rating up: tired riders run late.','Rain is forecast. Fares are steady.']],
    creatorapp:['🔔 Notification',['Your followers are waiting for the next video.','Post every day to keep your following.','A sponsor viewed your profile.']],
    callsapp:['🔔 Notification',['Keep in touch: a quick call goes a long way.','Missed call from an unknown number.']],
    phone:['🔔 Notification',['Apps installed: Bank, Jobs, Gigs and Creator.','Battery full.','No new messages.']],
    pc:['🔔 Notification',['Welcome back.','Your desktop is a mess, but the apps work.','Updates installed.']],
    jobsapp:['🔔 Notification',['New listings are posted every morning.','Openings change daily. Apply early.','Tip: qualifications open better-paid jobs.']],
    bankapp:['🔔 Notification',['Your balance is up to date.','Rates refreshed just now.','Tip: money in savings earns interest every night.','Market news is in the Economy box on the Overview.']],
    factory:['Foreman Raj',['Hard hats on. The line does not stop for anyone.','We ship forty crates before lunch. Every day.','Keep your fingers away from the press, please.','Overtime is optional. Mostly.','Engineers sit upstairs with the air-con. Line workers sweat down here.','Smell that? Machine oil and ambition.']],
    jobs:['Marge at the desk',['Jobs are on the board. Bring your qualifications.','Take a number. Kidding, there is no queue today.','Firms are picky this week. Dress the part.','A certificate opens doors. A degree opens better ones.','Interviews take an hour, whether they love you or not.','Rejection is just practice for the next interview.']],
    school:['Professor Lim',['Five pathways, and the longer ones lead to the best jobs.','The library is open late if you need it.','Turn up to class. I notice who is missing.','Medicine is long, but the hospital pays well.','Knowledge compounds, just like interest.','Pop quiz tomorrow. Maybe.']],
    bank:['Mr. Tan',['Savings, fixed deposits, ETFs, a hedge fund, even crypto. Know what you are buying first.','Interest is your money working while you sleep.','Never invest money you need for rent.','Hedge funds are exciting. Exciting is not always good.','Diversify. That is all the advice you get for free.','The market hates bad news. So do I.']],
    market:['Aunty Rose',['Fresh stock this morning. Cook it at home, and get a fridge if you want it to last.','Vegetables just came in from the farm.','Cooking at home saves you money, you know.','Buy what you can cook before it spoils, ah.','Ready-to-eat meals save you the cooking. Your call.','Two for one on rice today. Just kidding.']],
    fast:['Dave',['Welcome in! Order up, or ask about a shift.','Burgers are hot and the fries are hotter.','Want to make that a meal?','We never close. Neither do I, apparently.','Snack now, regret later.','Fastest service in town. Mostly.']],
    resto:['Chef Marco',['Table for one? Or are you here to work?','Tonight we have a lovely risotto.','A good meal fixes most bad days.','My kitchen, my rules. Wash your hands.','The tasting menu is worth every cent.','Reservations? For you, never needed.']],
    elec:['Kenji',['Fridges, phones, computers. Everything you buy goes straight to your home.','New phones arrived this morning.','A computer pays for itself if you use it to learn.','Broken something? I fix things too.','The fridge is the most underrated purchase in town.','Extended warranty? No? Good choice.']],
    hosp:['Dr. Lee',['Mind your energy. Run yourself down and you will be back here with a bill.','Sleep is cheaper than medicine.','Insurance looks boring until you need it.','Wash your hands. Eat something green.','We are short of nurses. Study medicine, maybe?','A check-up now saves a bill later.']],
    mall:['Mei at the counter',['New stock today. Dress well and the Employment Office will take you seriously.','A suit for interviews, casual for everything else.','Try bargaining. I might say yes.','Clothes wear out faster than you think.','That colour suits you. Truly.','Half the town shops here on payday.']],
    apt:['Mr. Ong, your landlord',['The walls are thin, but the rent is cheap.','Rent is due '+everyDays(RENT_EVERY)+'. I do not forget.','Please, no loud music after ten.','The lift works. Usually.','Your neighbour says hello. Your other neighbour says be quiet.','Home sweet home, more or less.']],
    thrift:['Edna',['Everything here has a story. Most of it is cheap.','Someone else’s junk, your treasure.','That fridge still works. Probably.','Gloves for the factory? Good thinking.','I price things by feel.','Come back tomorrow, the stock changes.']],
    comm:['Rosa at the front desk',['Karaoke starts at eight. Bring a friend, or make one here.','Volunteers always welcome. The tea is free.','People who come here find work faster. Funny, that.','You look like you need a night out.','Lonely? You are in the right place.','Half the jobs in town are never advertised. Ask around.']],
    park:['Auntie Lin, on her morning walk',['Lovely day for a stroll.','Ten thousand steps, that is my secret.','The ducks know me by name.','A walk clears the head better than coffee.','Sit a while. The bench is free.','I jog every morning. Well, I walk fast.']],
    gym:['Coach Dana',['Welcome! Warm up first, hero.','Yoga at the front, weights at the back.','A little exercise keeps the doctor away.','Pilates is harder than it looks. Trust me.','Sweat now, sleep better tonight.','Staff get half price, in case you were wondering.']],
    bung:['The estate agent',['Lovely home. Lovely rent, too.','Garden views, quiet street, soft beds.','Steady job? Then we can talk.','Rest here and you wake up happier.','Neighbours here wave. Imagine that.','The deposit is steep, the sleep is better.']]
  };
  function greetLine(k){
    if(APPS.indexOf(k)>=0){var NL=GREET[k][1];return NL[Math.floor(Math.random()*NL.length)]}  /* an app notification, not a shopkeeper */
    var g=GREET[k],L=g[1].slice(),c=S.career,hold=Object.keys(c).some(function(x){return (CAREERS[x].b||x)===k});
    if(S.energy<30)L.push('You look exhausted. Have you slept at all?','Careful, you are running on fumes.');
    if(S.happy<30)L.push('Cheer up. Tomorrow is another day.');
    if(!S.fed&&(k==='fast'||k==='resto'||k==='market'))L.push('You look hungry. Have you eaten today?','Eat something before you fall over.');
    if(hold)L.push('Back for your shift? Good, we are busy.','There you are. Clock in when you are ready.');
    if(S.cash<30)L.push('Money tight? Plenty of us have been there.');
    if(worth()>=GOAL)L.push('Doing well for yourself, I hear.');  /* once you reach the first rank */
    if(k==='hosp'&&S.ill)L.push('You look unwell. Let me have a look at you.');
    if(k==='hosp'&&S.medDebt>0)L.push('About that unpaid bill of yours…');
    if(k==='jobs'&&!Object.keys(c).length)L.push('No job yet? Let us fix that today.');
    if(k==='school'&&S.enrolled&&S.sinceClass>=2)L.push('We have missed you in class. Do not fall behind.');
    if(k==='bank'&&anyInv())L.push('Your investments are being watched closely. By you, I hope.');
    if(k==='apt'&&nextRentWeek()-S.day<=1)L.push('Rent is due very soon. Just a reminder.');
    if(shutLeft(k)>0)L.push('Sorry, we are closed for now. Check back in a few days.');
    if(S.trends&&S.trends.length&&Math.random()<0.4)L.push('Did you hear the news? '+S.trends[0].n+'. Strange times.');
    return L[Math.floor(Math.random()*L.length)];
  }
  var sayLine=null;

  /* the top-bar arrows flash for a few seconds when a new day starts (see FLASH) */
  var FLASH=null;
  /* vital number colour: red below 10, amber 10 to 29, yellow 30 to 60, green above 60 */
  function vitColor(v){return v<10?'#ef7d72':v<30?'#f0a030':v<=60?'#f0d040':'#5fcf92'}
