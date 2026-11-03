const $=id=>document.getElementById(id);
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const T=ms=>RM?1:ms;
const CAP=4;

/* Sands */
const SANDS={
  p:{name:"Picón",desc:"Black volcanic gravel. Coarse stones with air between them.",base:"#2b2420"},
  l:{name:"Lava roja",desc:"Rusty volcanic soil that breaks into crumbly clods.",base:"#9a3a27"},
  g:{name:"Arena dorada",desc:"Fine golden grain with a warm sheen.",base:"#dba54d"},
  r:{name:"Restingolita",desc:"Pumice that floated up from the 2011 Tagoro eruption off La Restinga. Dark crust, white core.",base:"#d9d4c8"},
  a:{name:"Ceniza",desc:"Fine grey ash from Tajogaite, 2021. Soft as flour and it gets everywhere.",base:"#7b7773"},
  s:{name:"Azufre",desc:"Crusty yellow-green crystals from the fumaroles near the top of Teide. Smells like eggs.",base:"#cfc62e"},
  c:{name:"Polvo de calima",desc:"Saharan dust that settles after a calima. A close cousin of the haze, so look twice.",base:"#c4703f"},
  j:{name:"Jable",desc:"Pale shell sand that drifts across Fuerteventura and Lanzarote, full of tiny shell fragments.",base:"#e9dfc4"},
  o:{name:"Olivino",desc:"Green volcanic crystals. The black beach at El Golfo glitters with them.",base:"#5f8a24"},
  k:{name:"Cochinilla",desc:"Carmine from the cochineal insects farmed on Lanzarote's cactus fields. Not sand. Artistic licence.",base:"#b0144a"}
};

/* Chapters */
const CHAPTERS=[
  {name:"El Hierro",cls:"hierro",from:1,to:15,souvenir:"plgr",end:"A sticker of El Hierro sand is on your board. La Palma is next, eruption included."},
  {name:"La Palma",cls:"palma",from:16,to:30,souvenir:"apla",end:"A sticker of La Palma ash and picón joins the board. La Gomera is next."},
  {name:"La Gomera",cls:"gomera",from:31,to:45,souvenir:"glgp",end:"La Gomera's sticker is on the board. Tenerife is next, and it brings sulfur."},
  {name:"Tenerife",cls:"tenerife",from:46,to:60,souvenir:"psap",end:"Teide in a bottle, stuck on the board. Gran Canaria is next."},
  {name:"Gran Canaria",cls:"canaria",from:61,to:75,souvenir:"gcgc",end:"A sticker of Maspalomas dune and calima joins the board. Fuerteventura is next."},
  {name:"Fuerteventura",cls:"fuerte",from:76,to:90,souvenir:"jgjc",end:"Fuerteventura's long bottle is stuck on the board. Lanzarote is next, with two new sands."},
  {name:"Lanzarote",cls:"lanzarote",from:91,to:105,souvenir:"pkoj",end:"Timanfaya survived. Lanzarote's flask joins the board. One island left."},
  {name:"La Graciosa",cls:"graciosa",from:106,to:120,souvenir:"jogk",end:"Every island sorted. The board is full, and Archipiélago mode is open."},
  {name:"Archipiélago",cls:null,from:121,to:Infinity,endless:true}
];
const ISLAND_CH=CHAPTERS.filter(c=>!c.endless);
const chapterOf=l=>CHAPTERS.find(c=>l>=c.from&&l<=c.to);
const themeOf=l=>{const c=chapterOf(l);return c.endless?ISLAND_CH[(l-121)%8].cls:c.cls};
const SHAPES={
  hierro:{w:56,h:150,nr:.43,nh:16,br:"20px 20px 28px 28px"},
  palma:{w:46,h:180,nr:.43,nh:20,br:"14px 14px 18px 18px"},
  gomera:{w:56,h:160,nr:.36,nh:18,br:"45% 45% 50% 50% / 28% 28% 42% 42%"},
  tenerife:{w:58,h:158,nr:.34,nh:14,br:"48% 48% 10px 10px / 62% 62% 10px 10px"},
  canaria:{w:64,h:128,nr:.62,nh:10,br:"14px 14px 24px 24px"},
  fuerte:{w:50,h:140,nr:.3,nh:34,br:"18px 18px 22px 22px"},
  lanzarote:{w:58,h:150,nr:.32,nh:26,br:"40% 40% 50% 50% / 26% 26% 48% 48%"},
  graciosa:{w:52,h:118,nr:.46,nh:12,br:"22px 22px 26px 26px"}
};
const FX={palma:"ash",gomera:"mist",tenerife:"stars",canaria:"dust",fuerte:"wind",lanzarote:"heat",graciosa:"stars"};
function cfg(level){
  if(level<=7)return{sands:"plg",empty:2,haze:0};
  if(level<=10)return{sands:"plg",empty:1,haze:0};
  if(level<=14)return{sands:"plgr",empty:2,haze:0};
  if(level===15)return{sands:"plgr",empty:1,haze:0};
  if(level<=18)return{sands:"plga",empty:2,haze:0};
  if(level===19)return{sands:"plga",empty:2,haze:1};
  if(level<=21)return{sands:"plgar",empty:2,haze:0};
  if(level===22||level===25||level===28)return{sands:"plgar",empty:2,haze:1};
  if(level===27||level===29)return{sands:"plgar",empty:1,haze:0};
  if(level===30)return{sands:"plgar",empty:2,haze:2};
  if(level<=30)return{sands:"plgar",empty:2,haze:0};
  if(level<=45)return{sands:level<=37?"plgarg":level<=44?"plgarpl":"plgarplg",empty:2,haze:level===45?2:level%3===0?1:0};
  if(level<=60)return{sands:level<=50?"plgars":level<=55?"plgarsp":"plgarsgl",empty:2,haze:level%2===0?2:0};
  if(level<=75)return{sands:level<=67?"plgarsc":"plgarscp",empty:2,haze:level===75?3:level%2===1?2:0};
  if(level<=90)return{sands:level===90?"plgarscjg":"plgarscj",empty:2,haze:level<=80?2:3};
  if(level<=105)return{sands:level<=95?"plgarscjo":"plgarscjok",empty:2,haze:3};
  if(level<=120)return{sands:level===120?"plgarscjokp":"plgarscjok",empty:2,haze:3};
  const r=rng(level*7919+3);const all="plgarscjok".split("");
  for(let i=all.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[all[i],all[j]]=[all[j],all[i]]}
  return{sands:all.slice(0,8+Math.floor(r()*3)).join(""),empty:2,haze:[1,2,3,3][Math.floor(r()*4)]};
}
const STORY={
  1:{t:"El Hierro",x:"The westernmost island, where the trip starts. Three sands to begin with:",s:"plg"},
  11:{t:"New sand",s:"r"},
  16:{t:"La Palma",x:"Tall bottles from here on. Tajogaite's ash reached every corner of the island, so now it's in your sand too.",s:"a"},
  30:{key:"erupt",t:"Tajogaite",lava:1,x:"19 September 2021. The ridge above Cabeza de Vaca split open and erupted for 85 days. Last level of La Palma, and the calima is thick."},
  31:{t:"La Gomera",x:"Pear-shaped bottles and no new sand, just more of it. Fog rolls in from Garajonay, and the calima comes every third level."},
  45:{t:"Last level of La Gomera",x:"Eight sands, two hazy layers. Whistle if it helps; the silbo gomero carries across whole barrancos."},
  46:{t:"Tenerife",x:"Bottles shaped like the Teide. Calima every other level, two layers deep.",s:"s"},
  60:{t:"Teide",x:"3,715 metres, the highest point in Spain. Last level of Tenerife."},
  61:{t:"Gran Canaria",x:"Wide jars. The calima stops only hiding sand and becomes one.",s:"c"},
  75:{t:"Maspalomas",x:"Last level of Gran Canaria: three hazy layers per bottle. Only the top shows."},
  76:{t:"Fuerteventura",x:"Long-necked bottles. From level 81 the calima hides everything but the top layer.",s:"j"},
  90:{t:"Last level of Fuerteventura",x:"Nine sands, full calima, and wind straight from Africa."},
  91:{t:"Lanzarote",x:"Flask bottles and two new sands. The first one:",s:"o"},
  96:{t:"New sand",s:"k"},
  105:{t:"Timanfaya",lava:1,x:"1 September 1730. The eruptions went on for six years and buried about a quarter of the island. Last level of Lanzarote."},
  106:{t:"La Graciosa",x:"Small bottles, all ten sands, full calima. The island has no paved roads and this chapter has no mercy."},
  120:{t:"Last island level",x:"Eleven bottles of sand, every layer hidden except the top. Finish this and the board is full."},
  121:{t:"Archipiélago",x:"Endless from here on: random islands, random sands, random calima. Helps still come every 10 levels."}
};

function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const TILES={},TILEC={};
(function makeTiles(){
  const S=96;
  const wrap=(fn)=>{for(const dx of[-S,0,S])for(const dy of[-S,0,S])fn(dx,dy)};
  const pick=(r,a)=>a[Math.floor(r()*a.length)];
  for(const id of [...Object.keys(SANDS),"haze"]){
    const c=document.createElement("canvas");c.width=c.height=S;const x=c.getContext("2d");const r=rng(id.charCodeAt(0)*131+id.length);
    if(id==="p"){
      x.fillStyle="#0c0a09";x.fillRect(0,0,S,S);
      for(let i=0;i<24;i++){const cx=r()*S,cy=r()*S,rx=6+r()*5,ry=rx*(.75+r()*.3),rot=r()*3,col=pick(r,["#2e2724","#3b322d","#26201d","#443a33"]);
        wrap((dx,dy)=>{x.save();x.translate(cx+dx,cy+dy);x.rotate(rot);x.fillStyle=col;x.beginPath();x.ellipse(0,0,rx,ry,0,0,7);x.fill();
          x.fillStyle="rgba(255,255,255,.10)";x.beginPath();x.ellipse(-rx*.3,-ry*.35,rx*.45,ry*.3,0,0,7);x.fill();
          x.fillStyle="rgba(0,0,0,.35)";for(let k=0;k<3;k++){x.beginPath();x.arc((k-1)*rx*.4,ry*.2,1,0,7);x.fill()}x.restore()})}
    }else if(id==="l"){
      x.fillStyle="#7a2a1d";x.fillRect(0,0,S,S);
      for(let i=0;i<46;i++){const cx=r()*S,cy=r()*S,rad=4+r()*6,n=5+Math.floor(r()*3),col=pick(r,["#a6432c","#6b251a","#b9573b","#8c3322"]);const pts=[];for(let k=0;k<n;k++){const a=k/n*6.283,d=rad*(.6+r()*.5);pts.push([Math.cos(a)*d,Math.sin(a)*d])}
        wrap((dx,dy)=>{x.fillStyle=col;x.beginPath();pts.forEach(([px,py],k)=>k?x.lineTo(cx+dx+px,cy+dy+py):x.moveTo(cx+dx+px,cy+dy+py));x.closePath();x.fill()})}
      for(let i=0;i<180;i++){x.fillStyle=r()<.5?"rgba(30,8,4,.55)":"rgba(255,190,150,.25)";x.fillRect(r()*S,r()*S,1.4,1.4)}
    }else if(id==="g"){
      x.fillStyle="#d39b45";x.fillRect(0,0,S,S);
      for(let i=0;i<1700;i++){x.fillStyle=pick(r,["#e8b962","#b88331","#f2d08b","#c98f3a","#fff0c4"]);const s=1+r()*1.2;x.fillRect(r()*S,r()*S,s,s)}
    }else if(id==="r"){
      x.fillStyle="#1d1b1a";x.fillRect(0,0,S,S);
      for(let i=0;i<17;i++){const cx=r()*S,cy=r()*S,rad=8+r()*5,pores=[];for(let k=0;k<6;k++)pores.push([(r()-.5)*rad*1.1,(r()-.5)*rad*1.1,.8+r()*1.2]);
        wrap((dx,dy)=>{x.fillStyle="#3c3936";x.beginPath();x.arc(cx+dx,cy+dy,rad,0,7);x.fill();x.fillStyle="#ebe6da";x.beginPath();x.arc(cx+dx,cy+dy,rad*.7,0,7);x.fill();
          x.fillStyle="rgba(70,64,58,.75)";pores.forEach(([px,py,pr])=>{x.beginPath();x.arc(cx+dx+px*.6,cy+dy+py*.6,pr,0,7);x.fill()})})}
    }else if(id==="a"){
      x.fillStyle="#76726e";x.fillRect(0,0,S,S);
      for(let i=0;i<2600;i++){x.fillStyle=pick(r,["rgba(255,255,255,.08)","rgba(0,0,0,.09)","rgba(150,146,140,.25)"]);x.fillRect(r()*S,r()*S,1,1)}
      for(let i=0;i<14;i++){const cx=r()*S,cy=r()*S,rad=8+r()*14;wrap((dx,dy)=>{const g=x.createRadialGradient(cx+dx,cy+dy,0,cx+dx,cy+dy,rad);g.addColorStop(0,r()<.5?"rgba(255,255,255,.07)":"rgba(0,0,0,.07)");g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(cx+dx-rad,cy+dy-rad,rad*2,rad*2)})}
    }else if(id==="s"){
      x.fillStyle="#bdb522";x.fillRect(0,0,S,S);
      for(let i=0;i<70;i++){const cx=r()*S,cy=r()*S,rad=2.5+r()*4.5,n=3+Math.floor(r()*3),rot=r()*6,col=pick(r,["#e3dc4a","#f2ee86","#9d9618","#d1ca33","#c9d63c"]);const pts=[];for(let k=0;k<n;k++){const a=rot+k/n*6.283;pts.push([Math.cos(a)*rad,Math.sin(a)*rad])}
        wrap((dx,dy)=>{x.fillStyle=col;x.beginPath();pts.forEach(([px,py],k)=>k?x.lineTo(cx+dx+px,cy+dy+py):x.moveTo(cx+dx+px,cy+dy+py));x.closePath();x.fill()})}
      for(let i=0;i<500;i++){x.fillStyle="rgba(255,255,225,.4)";x.fillRect(r()*S,r()*S,1,1)}
    }else if(id==="c"){
      x.fillStyle="#c4703f";x.fillRect(0,0,S,S);
      for(let i=0;i<1100;i++){x.fillStyle=pick(r,["#d88a55","#a95a30","#e3a070","#b86440"]);x.fillRect(r()*S,r()*S,1.3,1.3)}
      for(let i=0;i<9;i++){const y0=r()*S,amp=2+r()*3,ph=r()*6;x.strokeStyle=r()<.5?"rgba(255,215,175,.22)":"rgba(110,45,20,.22)";x.lineWidth=1.5+r()*1.5;
        for(const dy of[-S,0,S]){x.beginPath();for(let px=0;px<=S;px+=3){const py=y0+dy+Math.sin(px/S*6.283*2+ph)*amp;px?x.lineTo(px,py):x.moveTo(px,py)}x.stroke()}}
    }else if(id==="j"){
      x.fillStyle="#e9dfc4";x.fillRect(0,0,S,S);
      for(let i=0;i<1300;i++){x.fillStyle=pick(r,["#f6efdc","#d8ccab","#cfc19c","#fffaf0"]);x.fillRect(r()*S,r()*S,1.2,1.2)}
      for(let i=0;i<28;i++){const cx=r()*S,cy=r()*S,rad=2+r()*3.5,a=r()*6,col=pick(r,["#fffdf6","#b9a275","#e3c9a0","#d6b48a"]);
        wrap((dx,dy)=>{x.strokeStyle=col;x.lineWidth=1.6;x.beginPath();x.arc(cx+dx,cy+dy,rad,a,a+2.6);x.stroke()})}
    }else if(id==="o"){
      x.fillStyle="#2b3f13";x.fillRect(0,0,S,S);
      for(let i=0;i<40;i++){const cx=r()*S,cy=r()*S,rad=3+r()*4,n=4+Math.floor(r()*3),rot=r()*6,col=pick(r,["#5f8a24","#7aa82e","#94c43c","#46681a","#a7d24a"]);const pts=[];for(let k=0;k<n;k++){const a=rot+k/n*6.283,d=rad*(.7+r()*.4);pts.push([Math.cos(a)*d,Math.sin(a)*d])}
        wrap((dx,dy)=>{x.fillStyle=col;x.beginPath();pts.forEach(([px,py],k)=>k?x.lineTo(cx+dx+px,cy+dy+py):x.moveTo(cx+dx+px,cy+dy+py));x.closePath();x.fill()})}
      for(let i=0;i<45;i++){x.fillStyle="rgba(250,255,215,.9)";const s2=r()<.3?2:1;x.fillRect(r()*S,r()*S,s2,s2)}
    }else if(id==="k"){
      x.fillStyle="#a0123f";x.fillRect(0,0,S,S);
      for(let i=0;i<2200;i++){x.fillStyle=pick(r,["#c41c52","#7d0a2e","#d8346a","#92103a"]);x.fillRect(r()*S,r()*S,1,1)}
      for(let i=0;i<30;i++){const cx=r()*S,cy=r()*S;wrap((dx,dy)=>{x.fillStyle="#5a0620";x.beginPath();x.arc(cx+dx,cy+dy,1.4,0,7);x.fill()})}
    }else if(id==="haze"){
      x.fillStyle="#b8996c";x.fillRect(0,0,S,S);
      for(let i=0;i<22;i++){const cx=r()*S,cy=r()*S,rad=14+r()*22,col=r()<.5?"rgba(240,215,170,.35)":"rgba(140,105,65,.3)";
        wrap((dx,dy)=>{const g=x.createRadialGradient(cx+dx,cy+dy,0,cx+dx,cy+dy,rad);g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(cx+dx-rad,cy+dy-rad,rad*2,rad*2)})}
    }
    TILES[id]=c.toDataURL();TILEC[id]=c;
  }
})();

/* Rules and generation */
function runLen(b){let n=0;const t=b[b.length-1];for(let i=b.length-1;i>=0&&b[i]===t;i--)n++;return n}
function corked(b){return b.length===CAP&&b.every(c=>c===b[0])}
function solved(bs){return bs.every(b=>!b.length||corked(b))}
/* Pours that change something: hazy layers stop a pour, and tipping a single-sand bottle into an empty one is skipped */
function movesOf(bs,hid){const out=[];
  for(let i=0;i<bs.length;i++){const a=bs[i];if(!a.length||corked(a))continue;const top=a[a.length-1],run=runLen(a),vis=Math.min(run,a.length-hid[i]);
    for(let j=0;j<bs.length;j++){if(i===j)continue;const b=bs[j];if(b.length>=CAP)continue;
      if(b.length&&b[b.length-1]!==top)continue;if(!b.length&&run===a.length)continue;
      out.push([i,j,Math.min(vis,CAP-b.length)])}}
  return out}
/* true, false, or null when it ran out of nodes before deciding */
function solvable(start,hid0=start.map(()=>0),cap=150000){
  const seen=new Set();let nodes=0,over=false;
  const key=(bs,hid)=>bs.map((b,i)=>hid[i]+b.join("")).sort().join("|");
  function dfs(bs,hid){
    if(solved(bs))return true;
    if(++nodes>cap){over=true;return false}
    const k=key(bs,hid);if(seen.has(k))return false;seen.add(k);
    for(const[i,j,n]of movesOf(bs,hid)){const nb=bs.map(x=>x.slice()),nh=hid.slice();for(let q=0;q<n;q++)nb[j].push(nb[i].pop());
      nh[i]=Math.min(nh[i],Math.max(0,nb[i].length-1));
      if(dfs(nb,nh))return true}
    return false}
  return dfs(start,hid0)?true:over?null:false}
function generate(level){
  const c=cfg(level);const r=rng(level*1009+17);
  for(let empty=c.empty;empty<=3;empty++){
    for(let t=0;t<300;t++){
      const pool=[];for(const s of c.sands)for(let k=0;k<CAP;k++)pool.push(s);
      for(let i=pool.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
      const bs=[];for(let i=0;i<c.sands.length;i++)bs.push(pool.slice(i*CAP,i*CAP+CAP));
      if(bs.some(b=>runLen(b)>=3))continue;
      if(c.haze&&bs.some(b=>{for(let k=0;k<c.haze;k++)if(b[k]===b[k+1])return true;return false}))continue;
      for(let e=0;e<empty;e++)bs.push([]);
      if(solvable(bs))return bs}}
  return null}

/* Save */
const KEY="picon.v1";
const fresh=()=>({level:1,done:0,helps:{barranco:0,guagua:0,alisio:0},earned:[],seen:[],r1:1});
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.level)return s}catch(e){}return fresh()}
let save=load();
save.helps.alisio=save.helps.alisio||0;
if(!save.r1){save.r1=1;if(save.earned.includes(10))save.helps.guagua++}
if(save.done>0&&!save.seen.includes("onboard"))save.seen.push("onboard");
persist();
function persist(){try{localStorage.setItem(KEY,JSON.stringify(save))}catch(e){}}

/* Ambient fx per island, plus embers in the eruptions */
const fx=$("fx"),fc=fx.getContext("2d");let parts=[],fxMode="",fxRun=false;
function sizeFx(){const d=Math.min(2,devicePixelRatio||1);fx.width=innerWidth*d;fx.height=innerHeight*d;fc.setTransform(d,0,0,d,0,0)}
addEventListener("resize",sizeFx);sizeFx();
const FXN={ash:36,mist:7,stars:60,dust:50,wind:14,heat:26};
function setFx(mode){if(mode===fxMode&&parts.length)return;fxMode=mode;parts=[];if(RM||!mode){fc.clearRect(0,0,innerWidth,innerHeight);return}
  for(let i=0;i<FXN[mode];i++)parts.push(spawn(mode,true));if(!fxRun){fxRun=true;requestAnimationFrame(tick)}}
function spawn(k,any){const R=Math.random,W=innerWidth,H=innerHeight;
  if(k==="ash")return{k,x:R()*W,y:any?R()*H:-10,vx:(R()-.5)*.25,vy:.25+R()*.45,r:.8+R()*1.8,c:`rgba(170,165,160,${.25+R()*.35})`};
  if(k==="mist")return{k,x:any?R()*W:-150,y:R()*H,vx:.12+R()*.18,vy:0,r:80+R()*120,c:"rgba(205,230,212,.045)"};
  if(k==="stars")return{k,x:R()*W,y:R()*H*.75,vx:0,vy:0,r:.5+R()*1.1,ph:R()*6,sp:.01+R()*.03,c:"#f4f6ff"};
  if(k==="dust")return{k,x:any?R()*W:-10,y:R()*H,vx:.8+R()*1.6,vy:(R()-.5)*.3,r:.7+R()*1.3,c:`rgba(225,150,90,${.2+R()*.35})`};
  if(k==="wind")return{k,x:any?R()*W:-60,y:R()*H,vx:3+R()*3,vy:0,len:20+R()*40,c:`rgba(240,225,190,${.06+R()*.1})`};
  return{k,x:R()*W,y:any?R()*H:H+10,vx:(R()-.5)*.2,vy:-(.3+R()*.6),r:.8+R()*1.6,c:`rgba(255,${90+R()*80|0},40,${.25+R()*.35})`}}
function erupt(){if(RM)return;for(let i=0;i<140;i++){const ember=i<70;parts.push({x:innerWidth/2+(Math.random()-.5)*120,y:innerHeight+10,vx:(Math.random()-.5)*5,vy:-(6+Math.random()*9),r:ember?1.5+Math.random()*2.5:1+Math.random()*2.5,c:ember?`rgba(255,${80+Math.random()*90|0},30,.9)`:"rgba(120,115,110,.7)",ember:true,life:1})}}
function tick(){
  fc.clearRect(0,0,innerWidth,innerHeight);
  parts=parts.filter(p=>{
    if(p.ember){p.vy+=.16;p.x+=p.vx;p.y+=p.vy;p.life-=.007;if(p.life<=0||p.y>innerHeight+20)return false;fc.globalAlpha=Math.max(0,p.life)}
    else{const W=innerWidth,H=innerHeight;
      if(p.k==="ash")p.x+=Math.sin(p.y/40)*.15;
      if(p.k==="stars"){p.ph+=p.sp;fc.globalAlpha=.25+.55*(.5+.5*Math.sin(p.ph))}else fc.globalAlpha=1;
      p.x+=p.vx;p.y+=p.vy;
      if(p.y>H+12||p.y<-12||p.x>W+(p.r||0)+(p.len||0)+10)Object.assign(p,spawn(p.k,false))}
    if(p.k==="wind"){fc.strokeStyle=p.c;fc.lineWidth=1.2;fc.beginPath();fc.moveTo(p.x,p.y);fc.lineTo(p.x-p.len,p.y);fc.stroke();return true}
    fc.fillStyle=p.c;fc.beginPath();fc.arc(p.x,p.y,p.r,0,7);fc.fill();return true});
  fc.globalAlpha=1;
  if(parts.length)requestAnimationFrame(tick);else fxRun=false;
}

/* Home */
function renderHome(){
  document.body.className="";setFx("");
  const h=$("home");
  // Finished islands become stickers on the board, each at its own slight tilt
  const TILT=[-6,4,-3,7,-5,3,-7,5];
  const shelf=ISLAND_CH.map((ch,i)=>{const done=save.done>=ch.to;const S=SHAPES[ch.cls];
    const bands=done?ch.souvenir.split("").map(s=>`<i style="background-image:url(${TILES[s]})"></i>`).join(""):"";
    return`<div class="slot${done?" done":""}" style="--tilt:${TILT[i]}deg"><div class="mini" style="--nr:${S.nr};--br:${S.br}"><div class="mn"></div><div class="mb">${bands}</div></div><span>${ch.name}</span></div>`}).join("");
  const chapters=CHAPTERS.filter(c=>c.from<=save.level).map(c=>{
    if(c.endless)return`<div class="chapter"><div class="label">Archipiélago &middot; endless &middot; ${Math.max(0,save.done-120)} sorted</div></div>`;
    const curCh=save.level>=c.from&&save.level<=c.to;
    let dots="";for(let i=c.from;i<=c.to;i++){const cls=(i<=save.done?"done":i===save.level?"next":"")+(cfg(i).haze?" cal":"");dots+=`<button class="dot ${cls}" data-l="${i}" ${i>save.level?"disabled":""}>${i}</button>`}
    return`<details class="chapter" ${curCh?"open":""}><summary class="label">${c.name} &middot; ${Math.max(0,Math.min(save.done,c.to)-c.from+1)} of ${c.to-c.from+1}</summary><div class="dots">${dots}</div></details>`}).reverse().join("");
  const next=true;
  h.innerHTML=`<div><h1 class="logo">Picón</h1><p class="tag">Sort the sands of the islands, one bottle at a time.</p></div>
    <div><div class="label">Souvenirs</div><div class="shelf">${shelf}</div></div>
    <button class="cta" id="go" ${next?"":"disabled"}>Play level ${save.level}</button>
    ${chapters}
    <div class="links"><button class="reset" id="how">How to play</button><button class="reset" id="wipe">Reset progress</button></div>`;
  $("go").onclick=()=>startLevel(save.level);
  h.querySelectorAll(".dot").forEach(d=>d.onclick=()=>startLevel(+d.dataset.l));
  $("how").onclick=()=>onboarding();
  $("wipe").onclick=()=>confirmWipe();
}
function confirmWipe(){
  modal(`<h2>Reset progress?</h2><p>Your levels, souvenirs and saved helps will be cleared.</p><div class="row"><button class="ghost" id="no">Keep it</button><button class="cta" id="yes" style="flex:1">Reset</button></div>`);
  $("no").onclick=closeModal;$("yes").onclick=()=>{save=fresh();persist();closeModal();renderHome();intro(()=>onboarding())};
}

/* Game state */
let cur=null,els=[];
function startLevel(level){
  const bs=generate(level),c=cfg(level),ch=chapterOf(level);
  const hidden=bs.map(b=>b.length?Math.min(c.haze,b.length-1):0);
  cur={level,ch,initial:bs.map(b=>b.slice()),initialHidden:hidden.slice(),bottles:bs.map(b=>b.slice()),hidden,hist:[],undos:3,sel:-1,busy:false,returning:false,pending:null,guagua:false,alisio:false,corkedSet:new Set(),stuck:null};
  recomputeCorks();
  const th=themeOf(level);cur.th=th;
  document.body.className=th;
  setFx(FX[th]||"");
  $("home").hidden=true;$("game").hidden=false;
  $("chap").textContent=ch.name+(c.haze?" · Calima":"");
  $("lvl").textContent=level;
  const len=ch.endless?10:ch.to-ch.from+1,pos=ch.endless?(level-121)%10+1:level-ch.from+1;
  $("prog").innerHTML=Array.from({length:len},(_,i)=>`<i class="${i<pos?"on":""}"></i>`).join("");
  $("board").className="board";
  render();
  const st=STORY[level],key=st&&(st.key||level);
  if(st&&!save.seen.includes(key)){save.seen.push(key);persist();story(st);return}
  if(c.haze&&!save.seen.includes("calima")){save.seen.push("calima");persist();
    modal(`<h2>Calima</h2><div class="sand"><div class="sw" style="background-image:url(${TILES.haze})"></div><div><small>Dust from the Sahara hides the bottom of every bottle. A hazy layer shows its sand once it reaches the top. The Alisio help blows it away.</small></div></div><button class="cta" id="ok">Start</button>`);$("ok").onclick=closeModal}
}
function story(st){
  const show=()=>{const rows=(st.s||"").split("").filter(Boolean).map(s=>`<div class="sand"><div class="sw" style="background-image:url(${TILES[s]})"></div><div><strong>${SANDS[s].name}</strong><small>${SANDS[s].desc}</small></div></div>`).join("");
    modal(`<h2${st.lava?' class="lava"':""}>${st.t}</h2>${st.x?`<p>${st.x}</p>`:""}${rows}<button class="cta" id="ok">Start</button>`);$("ok").onclick=closeModal};
  if(st.lava){const app=$("app");app.classList.remove("quake");void app.offsetWidth;app.classList.add("quake");erupt();setTimeout(show,T(900))}else show();
}
function paint(body,b,hid=0,growFrom=-1,dur=0,cleared=[]){
  body.innerHTML="";const anims=[];
  b.forEach((s,k)=>{const d=document.createElement("div");const hz=k<hid;d.className="layer"+(hz?" hz":"")+(cleared.includes(k)?" clear":"");
    d.style.backgroundImage=`url(${TILES[hz?"haze":s]})`;body.appendChild(d);
    if(growFrom>=0&&k>=growFrom)anims.push(d.animate([{height:"0%"},{height:"25%"}],{duration:dur,easing:"linear",delay:(k-growFrom)*dur}))});
  return anims}
function render(newCorks=new Set(),cleared={}){
  const board=$("board");board.innerHTML="";els=[];
  const n=cur.bottles.length;const perRow=n<=5?n:Math.ceil(n/2);const S=SHAPES[cur.th];const gx=n>8?10:14;
  const avail=board.parentElement.clientWidth||360;
  const w=Math.max(34,Math.min(S.w,Math.floor((avail-gx*(perRow-1))/perRow)));
  board.style.cssText=`--w:${w}px;--h:${S.h}px;--nr:${S.nr};--nh:${S.nh}px;--br:${S.br};column-gap:${gx}px;max-width:${perRow*w+(perRow-1)*gx}px`;
  cur.bottles.forEach((b,i)=>{
    const el=document.createElement("button");el.className="bottle"+(i===cur.sel?" sel":"")+(newCorks.has(i)?" pop":"")+(cur.alisio&&cur.hidden[i]?" aim":"");
    el.setAttribute("aria-label",`Bottle ${i+1}: ${b.length?b.map((s,k)=>k<cur.hidden[i]?"hazy":SANDS[s].name).join(", "):"empty"}`);
    el.innerHTML=`${corked(b)?'<div class="cork"></div>':""}<div class="neck"></div><div class="bbody"></div>`;
    paint(el.querySelector(".bbody"),b,cur.hidden[i],-1,0,cleared[i]||[]);
    el.addEventListener("pointerdown",e=>{e.preventDefault();tap(i)});
    el.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();tap(i)}};
    board.appendChild(el);els.push(el)});
  $("undoN").textContent=cur.undos;
  $("bUndo").disabled=!cur.undos||!cur.hist.length;
  $("bRestart").classList.toggle("pulse",(!cur.undos&&cur.hist.length>0&&!solved(cur.bottles))||(!!cur.stuck&&!cur.stuck.back));
  $("bUndo").classList.toggle("pulse",!!cur.stuck&&cur.stuck.back>0);
  board.classList.toggle("stuck",!!cur.stuck);
  const H=save.helps;$("helpN").textContent=H.barranco+H.guagua+H.alisio;
  $("mode").textContent=cur.alisio?"Alisio: tap a hazy bottle":cur.guagua?"Guagua on: next pour moves one layer":cur.stuck?(cur.stuck.back?"Dead end. Undo to get out":"Dead end. Restart the level"):"";
  $("mode").classList.toggle("warn",!cur.alisio&&!cur.guagua&&!!cur.stuck);
}
function tap(i){
  if(cur.busy)return;const b=cur.bottles[i];
  if(cur.alisio){if(!cur.hidden[i]){shake(i);return}const c=[];for(let k=0;k<cur.hidden[i];k++)c.push(k);cur.hidden[i]=0;cur.alisio=false;render(new Set(),{[i]:c});return}
  if(cur.sel<0){if(!b.length||corked(b)){shake(i);return}cur.sel=i;els[i].classList.add("sel");return}
  if(cur.sel===i){els[i].classList.remove("sel");cur.sel=-1;return}
  const a=cur.bottles[cur.sel];
  if(b.length>=CAP||(b.length&&b[b.length-1]!==a[a.length-1])){shake(i);els[cur.sel].classList.remove("sel");cur.sel=-1;return}
  if(cur.returning){cur.pending=[cur.sel,i];return}
  pour(cur.sel,i);
}
function shake(i){const e=els[i];e.classList.remove("shake");void e.offsetWidth;e.classList.add("shake")}
async function pour(i,j){
  cur.busy=true;cur.stuck=null;
  const a=cur.bottles[i],b=cur.bottles[j],top=a[a.length-1];
  let n=Math.min(runLen(a),a.length-cur.hidden[i],CAP-b.length);let usedG=false;
  if(cur.guagua&&n>1){n=1;cur.guagua=false;usedG=true}
  cur.hist.push({b:cur.bottles.map(x=>x.slice()),h:cur.hidden.slice(),g:usedG});
  const src=els[i],dst=els[j],board=$("board");
  const bR=board.getBoundingClientRect(),sR=src.getBoundingClientRect(),dR=dst.getBoundingClientRect();
  const dBody=dst.querySelector(".bbody").getBoundingClientRect();
  const sx=sR.left+sR.width/2,sy=sR.top,tx=dR.left+dR.width/2,ty=dR.top-30;
  const side=tx>=sx?1:-1,ang=side*100;
  src.style.transformOrigin="50% 0";src.style.zIndex=5;src.style.transition="none";
  await src.animate([{transform:"translateY(-14px)"},{transform:`translate(${tx-sx}px,${ty-sy-14}px) rotate(${ang}deg)`}],{duration:T(170),easing:"cubic-bezier(.3,.7,.2,1)",fill:"forwards"}).finished;
  const lh=(dBody.height-4)/CAP;
  const stream=document.createElement("div");stream.className="stream";
  stream.style.backgroundColor=SANDS[top].base;stream.style.backgroundImage=`url(${TILES[top]})`;
  stream.style.left=(tx-bR.left-3)+"px";stream.style.top=(ty-bR.top+4)+"px";
  stream.style.height=Math.max(10,(dBody.bottom-2-b.length*lh)-(ty+4))+"px";
  board.appendChild(stream);
  await stream.animate([{transform:"scaleY(0)"},{transform:"scaleY(1)"}],{duration:T(70),easing:"ease-in",fill:"forwards"}).finished;
  const from=b.length;for(let q=0;q<n;q++)b.push(a.pop());
  const revealed=[];if(cur.hidden[i]>Math.max(0,a.length-1)){cur.hidden[i]=Math.max(0,a.length-1);if(a.length)revealed.push(a.length-1)}
  paint(src.querySelector(".bbody"),a,cur.hidden[i]);
  const grows=paint(dst.querySelector(".bbody"),b,cur.hidden[j],from,T(110));
  await Promise.all(grows.map(g=>g.finished));
  stream.style.transformOrigin="50% 100%";
  stream.animate([{transform:"scaleY(1)"},{transform:"scaleY(0)"}],{duration:T(70),fill:"forwards"}).finished.then(()=>stream.remove());
  cur.sel=-1;cur.busy=false;cur.returning=true;
  const done=solved(cur.bottles);if(done)cur.busy=true;
  await src.animate([{transform:`translate(${tx-sx}px,${ty-sy-14}px) rotate(${ang}deg)`},{transform:"translateY(0)"}],{duration:T(170),easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"}).finished;
  cur.returning=false;
  const newC=new Set();cur.bottles.forEach((x,k)=>{if(corked(x)&&!cur.corkedSet.has(k)){newC.add(k);cur.corkedSet.add(k)}});
  render(newC,revealed.length?{[i]:revealed}:{});
  if(done){setTimeout(win,T(450));return}
  if(cur.pending){const[p,q]=cur.pending;cur.pending=null;cur.sel=p;const A=cur.bottles[p],B=cur.bottles[q];
    if(A.length&&!corked(A)&&B.length<CAP&&(!B.length||B[B.length-1]===A[A.length-1])){pour(p,q);return}cur.sel=-1;render()}
  checkSoon();
}
function recomputeCorks(){cur.corkedSet=new Set();cur.bottles.forEach((b,i)=>{if(corked(b))cur.corkedSet.add(i)})}

/* Tools */
function refundActive(){if(!cur)return;if(cur.guagua){cur.guagua=false;save.helps.guagua++}if(cur.alisio){cur.alisio=false;save.helps.alisio++}persist()}
const idle=()=>cur&&!cur.busy&&!cur.returning;
$("bHome").onclick=()=>{if(!idle())return;refundActive();$("game").hidden=true;$("home").hidden=false;renderHome()};
function restart(){if(!idle())return;refundActive();cur.bottles=cur.initial.map(b=>b.slice());cur.hidden=cur.initialHidden.slice();cur.hist=[];cur.undos=3;cur.sel=-1;cur.stuck=null;recomputeCorks();render()}
function undo(k=1){if(!idle()||cur.undos<k||cur.hist.length<k)return;
  let h,g=0;for(let q=0;q<k;q++){h=cur.hist.pop();if(h.g)g++}
  cur.bottles=h.b;cur.hidden=h.h.map((x,q)=>Math.min(x,cur.hidden[q]??x));
  if(g){if(!cur.guagua){cur.guagua=true;g--}save.helps.guagua+=g;persist()}
  cur.undos-=k;cur.sel=-1;cur.stuck=null;recomputeCorks();render();checkSoon()}
$("bRestart").onclick=restart;
$("bUndo").onclick=()=>undo(1);
$("bHelp").onclick=()=>{if(!idle())return;helpCard()};

const HELPS={
  barranco:{name:"Barranco",use:"Adds one empty bottle to this level.",earn:"An extra empty bottle, any level."},
  guagua:{name:"Guagua",use:"Your next pour of 2+ layers moves just one. Restart or Home gives it back.",earn:"One pour that moves a single layer."},
  alisio:{name:"Alisio",use:"Blows the calima off one bottle. Tap the bottle next.",earn:"Clears the haze from one bottle."}
};
function helpCard(){
  const H=save.helps;const total=H.barranco+H.guagua+H.alisio;const nextAt=Math.ceil((save.done+1)/10)*10;
  const hazy=cur.hidden.some(x=>x>0);
  const can={barranco:H.barranco>0,guagua:H.guagua>0&&!cur.guagua,alisio:H.alisio>0&&hazy&&!cur.alisio};
  modal(`<h2>Helps</h2><p>${total?"Use one on this level.":`You earn one every 10 levels. Next at level ${nextAt}.`}</p>
    <div class="pick">${Object.keys(HELPS).map(k=>`<button class="opt" data-k="${k}" ${can[k]?"":"disabled"}><strong>${HELPS[k].name} &times;${H[k]}</strong><small>${HELPS[k].use}</small></button>`).join("")}</div>
    <button class="ghost" id="close">Close</button>`);
  $("close").onclick=closeModal;
  document.querySelectorAll(".opt").forEach(o=>o.onclick=()=>{const k=o.dataset.k;save.helps[k]--;persist();
    if(k==="barranco"){cur.bottles.push([]);cur.hidden.push(0);cur.initial.push([]);cur.initialHidden.push(0);cur.hist.forEach(h=>{h.b.push([]);h.h.push(0)})}
    if(k==="guagua")cur.guagua=true;
    if(k==="alisio")cur.alisio=true;
    cur.stuck=null;closeModal();render();checkSoon()});
}

/* Dead ends: after a pour, check there's still a pour to make. If not, count how many undos get back to a board that can be sorted. */
let stuckTimer=0;
function checkSoon(){clearTimeout(stuckTimer);const c=cur;
  stuckTimer=setTimeout(()=>{if(cur!==c||!idle()||solved(c.bottles))return;const st=deadEnd(c);if(!st)return;
    c.stuck=st;render();if(!$("modal").innerHTML)deadCard(st)},T(300))}
function deadEnd(c){
  if(movesOf(c.bottles,c.hidden).length)return null;
  let back=0;
  for(let k=1;k<=Math.min(c.undos,c.hist.length);k++){const h=c.hist[c.hist.length-k];
    if(solvable(h.b,h.h.map((x,q)=>Math.min(x,c.hidden[q]??x)),40000)!==false){back=k;break}}
  return{back};
}
function deadCard(st){
  const H=save.helps,helps=H.barranco+H.guagua,n=st.back;
  const why="There's no pour left to make. Every top sand has nowhere to go.";
  const fix=n?`Your last ${n===1?"pour":n+" pours"} led here. Undo ${n===1?"it":"them"} and you're back on track.`:cur.hist.length?"Undoing won't get you out of this one. Start the level over.":"Start the level over.";
  modal(`<div class="dead-head"><span class="dead-ico" aria-hidden="true"></span><div class="label">Sin salida</div></div>
    <h2 class="lava">Dead end</h2><p>${why}</p><p style="color:var(--fg)">${fix}</p>
    <div class="pick">${n?`<button class="cta" id="dUndo">Undo ${n===1?"last pour":n+" pours"}</button>`:""}<button class="${n?"ghost":"cta"}" id="dRe">Restart level</button>
    ${helps?`<button class="ghost" id="dHelp">Use a help (${helps})</button>`:""}</div>
    <button class="reset" id="dLook" style="align-self:center">Look at the board</button>`,"dead");
  if(n)$("dUndo").onclick=()=>{closeModal();undo(n)};
  $("dRe").onclick=()=>{closeModal();restart()};
  if(helps)$("dHelp").onclick=()=>helpCard();
  $("dLook").onclick=closeModal;
}

/* Win */
function win(){
  const L=cur.level;
  if(L>save.done){save.done=L;save.level=L+1}
  const earn=L%10===0&&!save.earned.includes(L);
  const ch=cur.ch,chapterEnd=L===ch.to;
  persist();
  let choice=null;
  const body=chapterEnd?`<h2>${ch.name}, done</h2><p>${ch.end}</p>`:`<h2>Level ${L} sorted</h2><p>${cur.undos} of 3 undos left unused.</p>`;
  const earnHtml=earn?`<p style="color:var(--fg)">You earned a help. Pick one to keep:</p><div class="pick">${Object.keys(HELPS).map(k=>`<button class="opt" data-h="${k}"><strong>${HELPS[k].name}</strong><small>${HELPS[k].earn}</small></button>`).join("")}</div>`:"";
  const goHome=L===120;
  modal(body+earnHtml+`<button class="cta" id="next" ${earn?"disabled":""}>${goHome?"See the full board":`Level ${L+1}`}</button>`);
  if(earn)document.querySelectorAll(".opt").forEach(o=>o.onclick=()=>{choice=o.dataset.h;document.querySelectorAll(".opt").forEach(x=>x.classList.toggle("on",x===o));$("next").disabled=false});
  $("next").onclick=()=>{
    if(earn&&choice){save.helps[choice]++;save.earned.push(L);persist()}
    closeModal();
    if(goHome){$("game").hidden=true;$("home").hidden=false;renderHome()}else startLevel(L+1);
  };
}

function modal(html,cls=""){$("modal").innerHTML=`<div class="scrim"><div class="card ${cls}" role="dialog" aria-modal="true">${html}</div></div>`}
function closeModal(){$("modal").innerHTML=""}

/* Intro: a layer of picón pours off the screen west to east, and each island lights up as it's uncovered */
const GOLD="#e6b45a",TOUR=2700,TSTEP=420,TDUR=560,TEND=TOUR+7*TSTEP+TDUR;
/* Coastlines as [lon,lat], traced clockwise from each island's westernmost point */
const ISLES=[
  // El Hierro: three ridges, with the El Golfo bay biting into the north-west
  [[-18.161,27.712],[-18.148,27.738],[-18.128,27.762],[-18.103,27.759],[-18.075,27.757],[-18.05,27.77],[-18.027,27.784],[-18.005,27.8],[-17.988,27.818],[-17.972,27.838],[-17.955,27.843],[-17.935,27.838],[-17.915,27.83],[-17.895,27.825],[-17.884,27.812],[-17.888,27.79],[-17.9,27.775],[-17.908,27.757],[-17.925,27.74],[-17.944,27.725],[-17.952,27.705],[-17.962,27.682],[-17.972,27.66],[-17.983,27.638],[-17.997,27.643],[-18.012,27.66],[-18.035,27.675],[-18.06,27.686],[-18.09,27.693],[-18.12,27.697],[-18.145,27.701]],
  // La Palma: wide in the north around the Caldera, narrowing to Fuencaliente
  [[-18.006,28.75],[-17.995,28.783],[-17.975,28.81],[-17.95,28.833],[-17.92,28.848],[-17.885,28.856],[-17.85,28.851],[-17.815,28.845],[-17.782,28.836],[-17.765,28.81],[-17.758,28.78],[-17.745,28.75],[-17.73,28.72],[-17.745,28.69],[-17.762,28.665],[-17.758,28.635],[-17.762,28.605],[-17.778,28.575],[-17.8,28.54],[-17.82,28.505],[-17.835,28.475],[-17.843,28.455],[-17.855,28.47],[-17.87,28.5],[-17.882,28.535],[-17.89,28.57],[-17.91,28.6],[-17.935,28.63],[-17.955,28.655],[-17.975,28.685],[-17.99,28.715]],
  // La Gomera: round, with ravines notching the coast
  [[-17.348,28.115],[-17.335,28.15],[-17.31,28.178],[-17.28,28.195],[-17.245,28.205],[-17.21,28.198],[-17.18,28.188],[-17.15,28.17],[-17.125,28.15],[-17.105,28.12],[-17.098,28.09],[-17.11,28.065],[-17.135,28.045],[-17.165,28.03],[-17.2,28.022],[-17.235,28.025],[-17.27,28.04],[-17.3,28.06],[-17.325,28.08],[-17.34,28.095]],
  // Tenerife: a triangle from Teno to Rasca, with the Anaga peninsula pointing north-east
  [[-16.923,28.345],[-16.9,28.365],[-16.86,28.375],[-16.82,28.38],[-16.78,28.375],[-16.74,28.375],[-16.7,28.385],[-16.66,28.395],[-16.62,28.405],[-16.58,28.415],[-16.54,28.42],[-16.5,28.445],[-16.46,28.48],[-16.42,28.505],[-16.375,28.53],[-16.335,28.56],[-16.29,28.565],[-16.245,28.565],[-16.2,28.57],[-16.155,28.585],[-16.125,28.575],[-16.14,28.552],[-16.18,28.535],[-16.22,28.505],[-16.255,28.47],[-16.29,28.44],[-16.33,28.4],[-16.37,28.36],[-16.395,28.32],[-16.415,28.28],[-16.435,28.24],[-16.465,28.2],[-16.5,28.15],[-16.525,28.105],[-16.545,28.065],[-16.565,28.04],[-16.6,28.025],[-16.64,28.01],[-16.675,28.0],[-16.705,28.01],[-16.725,28.045],[-16.75,28.075],[-16.785,28.1],[-16.81,28.135],[-16.83,28.175],[-16.84,28.215],[-16.85,28.255],[-16.87,28.29],[-16.9,28.315]],
  // Gran Canaria: round, with La Isleta hanging off the north-east
  [[-15.835,27.96],[-15.825,28.0],[-15.8,28.035],[-15.77,28.065],[-15.73,28.095],[-15.7,28.125],[-15.67,28.148],[-15.63,28.155],[-15.59,28.155],[-15.55,28.148],[-15.51,28.14],[-15.47,28.13],[-15.445,28.14],[-15.44,28.17],[-15.425,28.182],[-15.405,28.172],[-15.41,28.15],[-15.425,28.125],[-15.42,28.095],[-15.405,28.06],[-15.385,28.02],[-15.375,27.98],[-15.378,27.94],[-15.385,27.9],[-15.39,27.86],[-15.41,27.83],[-15.44,27.805],[-15.48,27.785],[-15.52,27.765],[-15.56,27.75],[-15.595,27.742],[-15.63,27.755],[-15.665,27.77],[-15.7,27.79],[-15.735,27.81],[-15.765,27.835],[-15.79,27.865],[-15.815,27.9],[-15.83,27.93]],
  // Fuerteventura: long and thin, with the Jandía peninsula on a narrow isthmus
  [[-14.508,28.07],[-14.48,28.09],[-14.44,28.105],[-14.4,28.115],[-14.36,28.13],[-14.32,28.15],[-14.28,28.175],[-14.245,28.2],[-14.22,28.225],[-14.195,28.26],[-14.18,28.3],[-14.17,28.34],[-14.16,28.385],[-14.145,28.43],[-14.12,28.475],[-14.09,28.52],[-14.06,28.565],[-14.035,28.61],[-14.02,28.655],[-14.01,28.7],[-13.99,28.735],[-13.955,28.748],[-13.915,28.75],[-13.875,28.748],[-13.84,28.738],[-13.825,28.71],[-13.825,28.67],[-13.83,28.63],[-13.84,28.59],[-13.855,28.55],[-13.86,28.51],[-13.855,28.47],[-13.86,28.43],[-13.87,28.39],[-13.89,28.35],[-13.92,28.31],[-13.955,28.27],[-13.99,28.235],[-14.03,28.205],[-14.08,28.19],[-14.13,28.175],[-14.17,28.16],[-14.21,28.14],[-14.25,28.11],[-14.29,28.085],[-14.33,28.06],[-14.37,28.045],[-14.41,28.04],[-14.45,28.045],[-14.485,28.055]],
  // Lanzarote: a long ridge from Papagayo up to the Famara cliffs and Órzola
  [[-13.875,28.86],[-13.86,28.89],[-13.84,28.92],[-13.83,28.955],[-13.815,28.99],[-13.79,29.02],[-13.76,29.045],[-13.72,29.06],[-13.68,29.07],[-13.645,29.085],[-13.61,29.1],[-13.575,29.125],[-13.545,29.15],[-13.52,29.18],[-13.495,29.205],[-13.465,29.22],[-13.44,29.21],[-13.43,29.18],[-13.43,29.15],[-13.44,29.115],[-13.455,29.08],[-13.475,29.04],[-13.5,29.005],[-13.53,28.98],[-13.56,28.96],[-13.6,28.945],[-13.64,28.93],[-13.68,28.915],[-13.72,28.9],[-13.76,28.88],[-13.8,28.86],[-13.84,28.85]],
  // La Graciosa: across the El Río strait from Lanzarote's northern tip
  [[-13.545,29.255],[-13.535,29.272],[-13.515,29.288],[-13.495,29.292],[-13.478,29.28],[-13.472,29.262],[-13.482,29.243],[-13.5,29.232],[-13.52,29.232],[-13.538,29.242]]
];
function intro(next){
  const el=document.createElement("div");el.className="intro";
  el.innerHTML=`<canvas></canvas><div class="intro-t"><h1 class="logo">Picón</h1><p class="tag">Sort the sands of the islands, one bottle at a time.</p></div><div class="label intro-cap">Eight islands &middot; El Hierro to La Graciosa</div><div class="intro-hint">Tap to start</div>`;
  document.body.appendChild(el);
  const cv=el.querySelector("canvas"),x=cv.getContext("2d"),d=Math.min(2,devicePixelRatio||1),W=innerWidth,H=innerHeight,R=Math.random;
  cv.width=W*d;cv.height=H*d;
  const rel=(px,py)=>RM?-3000:300+px/W*1500+py/H*450;

  // Islands, projected and fitted under the logo
  const K=Math.cos(28.3*Math.PI/180),raw=ISLES.map(pts=>pts.map(([lo,la])=>[(lo+18.2)*K,29.35-la]));
  const all=raw.flat(),mnx=Math.min(...all.map(p=>p[0])),mxx=Math.max(...all.map(p=>p[0])),mny=Math.min(...all.map(p=>p[1])),mxy=Math.max(...all.map(p=>p[1]));
  // Title, map and caption share the height evenly, with room kept at the bottom for the hint
  const head=el.querySelector(".intro-t"),headH=head.offsetHeight,capH=16,hintR=64;
  const sc=Math.min(Math.min(W-32,620)/(mxx-mnx),H*.34/(mxy-mny)),mapH=(mxy-mny)*sc;
  const gap=Math.max(32,(H-hintR-headH-mapH-capH)/4),top0=gap+headH+gap;
  head.style.top=gap+"px";
  const ox=(W-(mxx-mnx)*sc)/2-mnx*sc,oy=top0-mny*sc;
  // Each island gets its own sprite, gold and speckled like the Rubik Dirt logo, so it can zoom on its own
  const isles=raw.map((ring,i)=>{const pts=ring.map(([a,b])=>[ox+a*sc,oy+b*sc]),p=new Path2D();
    pts.forEach(([a,b],k)=>k?p.lineTo(a,b):p.moveTo(a,b));p.closePath();
    const xs=pts.map(q=>q[0]),ys=pts.map(q=>q[1]),bx=Math.min(...xs)-3,by=Math.min(...ys)-3,bw=Math.max(...xs)+3-bx,bh=Math.max(...ys)+3-by;
    const c=document.createElement("canvas");c.width=Math.ceil(bw*d);c.height=Math.ceil(bh*d);const l=c.getContext("2d");l.setTransform(d,0,0,d,-bx*d,-by*d);
    l.fillStyle=GOLD;l.fill(p);l.globalCompositeOperation="destination-out";
    for(let k=0,N=bw*bh/9;k<N;k++){const sx=bx+R()*bw,sy=by+R()*bh,rad=R()<.9?.25+R()*.55:.8+R()*.9,v=4+Math.floor(R()*3),rot=R()*6;
      l.beginPath();for(let q=0;q<v;q++){const a=rot+q/v*6.283,dd=rad*(.6+R()*.6);q?l.lineTo(sx+Math.cos(a)*dd,sy+Math.sin(a)*dd):l.moveTo(sx+Math.cos(a)*dd,sy+Math.sin(a)*dd)}l.fill()}
    l.globalCompositeOperation="source-over";l.strokeStyle=GOLD;l.lineWidth=1.4;l.lineJoin="round";l.stroke(p);
    const cx=bx+bw/2,cy=by+bh/2;
    return{p,c,bx,by,bw,bh,cx,cy,t:rel(cx,cy)+380,amp:Math.max(.5,Math.min(2.4,64/Math.max(bw,bh)-1)),name:ISLAND_CH[i].name,z:TOUR+i*TSTEP}});
  el.querySelector(".intro-cap").style.top=(top0+mapH+gap)+"px";

  // The world under the picón: night sea
  const world=document.createElement("canvas");world.width=W*d;world.height=H*d;const w=world.getContext("2d");w.setTransform(d,0,0,d,0,0);
  w.fillStyle="#06151a";w.fillRect(0,0,W,H);
  w.save();w.translate(W/2,0);w.scale(2*W/H,1);const sea=w.createRadialGradient(0,0,0,0,0,H*.6);sea.addColorStop(0,"#0e2f37");sea.addColorStop(.7,"#06151a");w.fillStyle=sea;w.fillRect(-H,0,2*H,H);w.restore();

  // The picón cover: a grid of stones that each drop when the sweep reaches them
  const g=Math.max(9,Math.round(Math.sqrt(W*H/2400))),PAL=["#2e2724","#3b322d","#26201d","#443a33"],spr=[],grains=[];
  for(let k=0;k<6;k++){const c=document.createElement("canvas"),z=Math.ceil(g*1.5*d);c.width=c.height=z;const s=c.getContext("2d"),rx=z*(.36+R()*.08),ry=rx*(.75+R()*.25);
    s.translate(z/2,z/2);s.fillStyle=PAL[k%4];s.beginPath();s.ellipse(0,0,rx,ry,0,0,7);s.fill();
    s.fillStyle="rgba(255,255,255,.1)";s.beginPath();s.ellipse(-rx*.3,-ry*.35,rx*.45,ry*.3,0,0,7);s.fill();
    s.fillStyle="rgba(0,0,0,.35)";for(let q=0;q<3;q++){s.beginPath();s.arc((q-1)*rx*.4,ry*.2,Math.max(1,z*.03),0,7);s.fill()}
    spr.push(c)}
  const cover=document.createElement("canvas");cover.width=W*d;cover.height=H*d;const cc=cover.getContext("2d");
  if(!RM){
    for(let gy=0;gy<=H/g+1;gy++)for(let gx=0;gx<=W/g+1;gx++){const px=gx*g+(R()-.5)*g*.4,py=gy*g+(R()-.5)*g*.4;
      grains.push({x:px,y:py,r:R()*6.3,s:Math.floor(R()*6),t:rel(px,py)+R()*320})}
    grains.sort((a,b)=>a.t-b.t);
    cc.setTransform(d,0,0,d,0,0);cc.fillStyle="#0c0a09";cc.fillRect(0,0,W,H);
    for(const q of grains){const co=Math.cos(q.r)*d,si=Math.sin(q.r)*d;cc.setTransform(co,si,-si,co,q.x*d,q.y*d);cc.drawImage(spr[q.s],-g*.75,-g*.75,g*1.5,g*1.5)}
    cc.setTransform(d,0,0,d,0,0);cc.globalCompositeOperation="destination-out"}

  const t0=performance.now();let last=t0,fi=0,falling=[],ended=false,capAt=-1;
  const txt=el.querySelector(".intro-t"),cap=el.querySelector(".intro-cap"),hint=el.querySelector(".intro-hint");
  function frame(now){if(ended)return;const t=now-t0,dt=Math.min(40,now-last);last=now;
    if(fi<grains.length&&grains[fi].t<=t){cc.beginPath();
      while(fi<grains.length&&grains[fi].t<=t){const q=grains[fi++];cc.moveTo(q.x+g*.8,q.y);cc.arc(q.x,q.y,g*.8,0,7);
        q.vx=(R()-.5)*.05;q.vy=R()*.04;q.vr=(R()-.5)*.012;falling.push(q)}
      cc.fill()}
    x.setTransform(1,0,0,1,0,0);x.drawImage(world,0,0);
    // Voyage tour: each island in level order swells up around its centre, shows its name, and settles back
    const zp=I=>RM?0:Math.max(0,Math.min(1,(t-I.z)/TDUR)),order=isles.slice().sort((A,B)=>(zp(A)%1>0)-(zp(B)%1>0));
    for(const I of order){const e=Math.sin(Math.PI*zp(I)),s=1+I.amp*e*e*(3-2*e),lit=Math.max(0,Math.min(1,(t-I.t)/500));
      x.setTransform(d*s,0,0,d*s,d*I.cx*(1-s),d*I.cy*(1-s));
      if(e>0){x.save();x.shadowColor="rgba(0,0,0,.6)";x.shadowBlur=18;x.shadowOffsetY=6;x.drawImage(I.c,I.bx,I.by,I.bw,I.bh);x.restore()}
      else x.drawImage(I.c,I.bx,I.by,I.bw,I.bh);
      if(lit){x.save();x.globalAlpha=lit*(.8-.4*e);x.shadowColor=GOLD;x.shadowBlur=12;x.strokeStyle=GOLD;x.lineWidth=1.4/s;x.lineJoin="round";x.stroke(I.p);x.restore()}}
    const on=RM?-1:t>TEND?isles.length:isles.findIndex(I=>zp(I)>0&&zp(I)<1);
    if(on>=0&&on!==capAt){capAt=on;cap.innerHTML=on<isles.length?`${on+1} of ${isles.length} &middot; ${isles[on].name}`:"Eight islands &middot; El Hierro to La Graciosa";cap.classList.add("on")}
    if(!RM){x.setTransform(1,0,0,1,0,0);x.drawImage(cover,0,0)}
    let n=0;for(const q of falling){q.vy+=.0022*dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.r+=q.vr*dt;if(q.y>H+g)continue;falling[n++]=q;
      const co=Math.cos(q.r)*d,si=Math.sin(q.r)*d;x.setTransform(co,si,-si,co,q.x*d,q.y*d);x.drawImage(spr[q.s],-g*.75,-g*.75,g*1.5,g*1.5)}
    falling.length=n;
    if(t>T(1900))txt.classList.add("on");
    if(RM&&t>1)cap.classList.add("on");
    if(t>T(3000))hint.classList.add("on");
    if(t>(RM?2600:TEND+700)){end();return}
    requestAnimationFrame(frame)}
  function end(){if(ended)return;ended=true;removeEventListener("keydown",end);el.classList.add("out");setTimeout(()=>el.remove(),T(520));next()}
  el.addEventListener("pointerdown",end);addEventListener("keydown",end);
  requestAnimationFrame(frame);
}

/* Onboarding: three cards, each with a small demo on loop */
let onbTok=0;
const wait=ms=>new Promise(r=>setTimeout(r,T(ms)));
function demoBottle(b,hid=0){const el=document.createElement("div");el.className="bottle";
  el.innerHTML=`<div class="neck"></div><div class="bbody"></div>`;paint(el.querySelector(".bbody"),b,hid);return el}
function tapAt(stage,el){const g=stage.getBoundingClientRect(),r=el.getBoundingClientRect(),t=document.createElement("i");t.className="tapr";
  t.style.left=(r.left+r.width/2-g.left)+"px";t.style.top=(r.top+r.height*.55-g.top)+"px";stage.appendChild(t);setTimeout(()=>t.remove(),700)}
async function demoLoop(stage,alive,A0,B0,hid0){
  while(alive()){
    const A=A0.slice(),B=B0.slice();let hA=hid0;
    stage.innerHTML="";const ea=demoBottle(A,hA),eb=demoBottle(B);stage.append(ea,eb);
    await wait(900);if(!alive())return;
    tapAt(stage,ea);ea.classList.add("sel");
    await wait(750);if(!alive())return;
    tapAt(stage,eb);await wait(150);if(!alive())return;
    const gR=stage.getBoundingClientRect(),sR=ea.getBoundingClientRect(),dR=eb.getBoundingClientRect(),bb=eb.querySelector(".bbody").getBoundingClientRect();
    const dx=dR.left+dR.width/2-(sR.left+sR.width/2),dy=dR.top-30-sR.top,ang=dx>=0?100:-100,tilt=`translate(${dx}px,${dy}px) rotate(${ang}deg)`;
    ea.style.transformOrigin="50% 0";ea.style.transition="none";ea.style.zIndex=5;
    await ea.animate([{transform:"translateY(-14px)"},{transform:tilt}],{duration:T(260),easing:"cubic-bezier(.3,.7,.2,1)",fill:"forwards"}).finished;
    const top=A[A.length-1],n=Math.min(runLen(A),A.length-hA,CAP-B.length),from=B.length;
    const st=document.createElement("div");st.className="stream";st.style.backgroundColor=SANDS[top].base;st.style.backgroundImage=`url(${TILES[top]})`;
    st.style.left=(dR.left+dR.width/2-gR.left-3)+"px";st.style.top=(dR.top-26-gR.top)+"px";
    st.style.height=Math.max(10,bb.bottom-2-from*(bb.height-4)/CAP-(dR.top-26))+"px";stage.appendChild(st);
    await st.animate([{transform:"scaleY(0)"},{transform:"scaleY(1)"}],{duration:T(90),easing:"ease-in",fill:"forwards"}).finished;
    for(let q=0;q<n;q++)B.push(A.pop());
    const rev=[];if(hA>Math.max(0,A.length-1)){hA=Math.max(0,A.length-1);if(A.length)rev.push(A.length-1)}
    paint(ea.querySelector(".bbody"),A,hA);
    await Promise.all(paint(eb.querySelector(".bbody"),B,0,from,T(160)).map(a=>a.finished));
    st.remove();
    await ea.animate([{transform:tilt},{transform:"translateY(0)"}],{duration:T(260),easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"}).finished;
    ea.classList.remove("sel");ea.getAnimations().forEach(a=>a.cancel());
    if(rev.length)paint(ea.querySelector(".bbody"),A,hA,-1,0,rev);
    if(corked(B)){const c=document.createElement("div");c.className="cork";eb.prepend(c);eb.classList.add("pop")}
    await wait(2300);
  }
}
const ONB=[
  {t:"Pour",x:"Tap a bottle, then tap where it pours. Sand only lands on the same sand or in an empty bottle. Fill a bottle with a single sand and it gets a cork. Cork them all to finish the level.",
    demo:(s,alive)=>demoLoop(s,alive,["l","g","p","p"],["p","p"],0)},
  {t:"Calima",x:"Dust from the Sahara hides the lower layers. A hazy layer shows its sand once it reaches the top. It rolls in on La Palma and gets thicker the further east you sail.",
    demo:(s,alive)=>demoLoop(s,alive,["l","g","p"],["p","p","p"],2)},
  {t:"Helps",x:"Every level gives you 3 undos. Every 10 levels you also earn a help to keep for a tight spot.",
    demo:s=>{const S=SHAPES.hierro,mini=b=>`<div class="mini" style="--nr:${S.nr};--br:${S.br}"><div class="mn"></div><div class="mb">${b}</div></div>`,
      band=t=>`<i style="flex:none;height:25%;background-image:url(${TILES[t]})"></i>`;
      const rows=[["<b class=\"undo\">&#8630;</b>","Undo &times;3","Takes back your last pour. Refills on every level."],
        [mini(""),HELPS.barranco.name,HELPS.barranco.earn],
        [mini(band("g")),HELPS.guagua.name,HELPS.guagua.earn],
        [mini(band("haze")+band("haze")+band("g")),HELPS.alisio.name,HELPS.alisio.earn]];
      s.classList.add("list");
      s.innerHTML=rows.map(([i,n,d])=>`<div class="sand"><div class="ico">${i}</div><div><strong>${n}</strong><small>${d}</small></div></div>`).join("")}}
];
function onboarding(){
  const el=document.createElement("div");el.className="onb";el.setAttribute("role","dialog");el.setAttribute("aria-modal","true");el.setAttribute("aria-label","How to play");
  document.body.appendChild(el);let step=0;
  function show(){const tok=++onbTok,s=ONB[step],last=step===ONB.length-1;
    el.innerHTML=`<div class="onb-in"><button class="onb-skip" id="oSkip" ${last?"hidden":""}>Skip</button>
      <div class="demo" id="demo"></div>
      <div class="onb-step"><div class="label">${step+1} of ${ONB.length}</div><h2>${s.t}</h2><p>${s.x}</p></div>
      <div class="pips">${ONB.map((_,i)=>`<i class="${i<=step?"on":""}"></i>`).join("")}</div>
      <div class="row">${step?'<button class="ghost" id="oBack">Back</button>':""}<button class="cta" id="oNext" style="flex:2">${last?"Start sorting":"Next"}</button></div></div>`;
    s.demo($("demo"),()=>tok===onbTok&&el.isConnected);
    $("oSkip").onclick=close;$("oNext").onclick=()=>{if(last)close();else{step++;show()}};
    if(step)$("oBack").onclick=()=>{step--;show()};
    $("oNext").focus({preventScroll:true})}
  function close(){onbTok++;if(!save.seen.includes("onboard")){save.seen.push("onboard");persist()}
    el.classList.add("out");setTimeout(()=>el.remove(),T(320))}
  show();
}

renderHome();
intro(()=>{if(!save.seen.includes("onboard"))onboarding()});
