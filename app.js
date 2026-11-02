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
  {name:"El Hierro",cls:"hierro",from:1,to:15,souvenir:"plgr",end:"A souvenir bottle of El Hierro sand is on your shelf. La Palma is next, eruption included."},
  {name:"La Palma",cls:"palma",from:16,to:30,souvenir:"apla",end:"A tall bottle of La Palma ash and picón joins the shelf. La Gomera is next."},
  {name:"La Gomera",cls:"gomera",from:31,to:45,souvenir:"glgp",end:"La Gomera's bottle is on the shelf. Tenerife is next, and it brings sulfur."},
  {name:"Tenerife",cls:"tenerife",from:46,to:60,souvenir:"psap",end:"Teide in a bottle, on the shelf. Gran Canaria is next."},
  {name:"Gran Canaria",cls:"canaria",from:61,to:75,souvenir:"gcgc",end:"A jar of Maspalomas dune and calima joins the shelf. Fuerteventura is next."},
  {name:"Fuerteventura",cls:"fuerte",from:76,to:90,souvenir:"jgjc",end:"Fuerteventura's long bottle is on the shelf. Lanzarote is next, with two new sands."},
  {name:"Lanzarote",cls:"lanzarote",from:91,to:105,souvenir:"pkoj",end:"Timanfaya survived. Lanzarote's flask joins the shelf. One island left."},
  {name:"La Graciosa",cls:"graciosa",from:106,to:120,souvenir:"jogk",end:"Every island sorted. The shelf is full, and Archipiélago mode is open."},
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
  1:{t:"El Hierro",x:"Tap a bottle, then tap where it pours. Sand only lands on the same sand or in an empty bottle. Fill every bottle with one sand and it gets a cork.",s:"plg"},
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
  120:{t:"Last island level",x:"Eleven bottles of sand, every layer hidden except the top. Finish this and the shelf is full."},
  121:{t:"Archipiélago",x:"Endless from here on: random islands, random sands, random calima. Helps still come every 10 levels."}
};

function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const TILES={};
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
    TILES[id]=c.toDataURL();
  }
})();

/* Rules and generation */
function runLen(b){let n=0;const t=b[b.length-1];for(let i=b.length-1;i>=0&&b[i]===t;i--)n++;return n}
function corked(b){return b.length===CAP&&b.every(c=>c===b[0])}
function solved(bs){return bs.every(b=>!b.length||corked(b))}
function solvable(start){
  const seen=new Set();let nodes=0;
  const key=bs=>bs.map(b=>b.join("")).sort().join("|");
  function dfs(bs){
    if(solved(bs))return true;
    if(++nodes>150000)return false;
    const k=key(bs);if(seen.has(k))return false;seen.add(k);
    for(let i=0;i<bs.length;i++){const a=bs[i];if(!a.length||corked(a))continue;const top=a[a.length-1],run=runLen(a);
      for(let j=0;j<bs.length;j++){if(i===j)continue;const b=bs[j];if(b.length>=CAP)continue;
        if(b.length&&b[b.length-1]!==top)continue;if(!b.length&&run===a.length)continue;
        const n=Math.min(run,CAP-b.length);const nb=bs.map(x=>x.slice());for(let q=0;q<n;q++)nb[j].push(nb[i].pop());
        if(dfs(nb))return true}}
    return false}
  return dfs(start)}
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
  const shelf=ISLAND_CH.map(ch=>{const done=save.done>=ch.to;const S=SHAPES[ch.cls];
    const bands=done?ch.souvenir.split("").map(s=>`<i style="background-image:url(${TILES[s]})"></i>`).join(""):"";
    return`<div class="slot${done?" done":""}"><div class="mini" style="--nr:${S.nr};--br:${S.br}"><div class="mn"></div><div class="mb">${bands}</div></div><span>${ch.name}</span></div>`}).join("");
  const chapters=CHAPTERS.filter(c=>c.from<=save.level).map(c=>{
    if(c.endless)return`<div class="chapter"><div class="label">Archipiélago &middot; endless &middot; ${Math.max(0,save.done-120)} sorted</div></div>`;
    const curCh=save.level>=c.from&&save.level<=c.to;
    let dots="";for(let i=c.from;i<=c.to;i++){const cls=(i<=save.done?"done":i===save.level?"next":"")+(cfg(i).haze?" cal":"");dots+=`<button class="dot ${cls}" data-l="${i}" ${i>save.level?"disabled":""}>${i}</button>`}
    return`<details class="chapter" ${curCh?"open":""}><summary class="label">${c.name} &middot; ${Math.max(0,Math.min(save.done,c.to)-c.from+1)} of ${c.to-c.from+1}</summary><div class="dots">${dots}</div></details>`}).reverse().join("");
  const next=true;
  h.innerHTML=`<div><h1 class="logo">Picón</h1><p class="tag">Sort the sands of the islands, one bottle at a time.</p></div>
    <div><div class="label">Souvenir shelf</div><div class="shelf">${shelf}</div></div>
    <button class="cta" id="go" ${next?"":"disabled"}>Play level ${save.level}</button>
    ${chapters}
    <button class="reset" id="wipe">Reset progress</button>`;
  $("go").onclick=()=>startLevel(save.level);
  h.querySelectorAll(".dot").forEach(d=>d.onclick=()=>startLevel(+d.dataset.l));
  $("wipe").onclick=()=>confirmWipe();
}
function confirmWipe(){
  modal(`<h2>Reset progress?</h2><p>Your levels, souvenirs and saved helps will be cleared.</p><div class="row"><button class="ghost" id="no">Keep it</button><button class="cta" id="yes" style="flex:1">Reset</button></div>`);
  $("no").onclick=closeModal;$("yes").onclick=()=>{save=fresh();persist();closeModal();renderHome()};
}

/* Game state */
let cur=null,els=[];
function startLevel(level){
  const bs=generate(level),c=cfg(level),ch=chapterOf(level);
  const hidden=bs.map(b=>b.length?Math.min(c.haze,b.length-1):0);
  cur={level,ch,initial:bs.map(b=>b.slice()),initialHidden:hidden.slice(),bottles:bs.map(b=>b.slice()),hidden,hist:[],undos:3,sel:-1,busy:false,returning:false,pending:null,guagua:false,alisio:false,corkedSet:new Set()};
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
  $("bRestart").classList.toggle("pulse",!cur.undos&&cur.hist.length>0&&!solved(cur.bottles));
  const H=save.helps;$("helpN").textContent=H.barranco+H.guagua+H.alisio;
  $("mode").textContent=cur.alisio?"Alisio: tap a hazy bottle":cur.guagua?"Guagua on: next pour moves one layer":"";
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
  cur.busy=true;
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
    if(A.length&&!corked(A)&&B.length<CAP&&(!B.length||B[B.length-1]===A[A.length-1]))pour(p,q);else{cur.sel=-1;render()}}
}
function recomputeCorks(){cur.corkedSet=new Set();cur.bottles.forEach((b,i)=>{if(corked(b))cur.corkedSet.add(i)})}

/* Tools */
function refundActive(){if(!cur)return;if(cur.guagua){cur.guagua=false;save.helps.guagua++}if(cur.alisio){cur.alisio=false;save.helps.alisio++}persist()}
const idle=()=>cur&&!cur.busy&&!cur.returning;
$("bHome").onclick=()=>{if(!idle())return;refundActive();$("game").hidden=true;$("home").hidden=false;renderHome()};
$("bRestart").onclick=()=>{if(!idle())return;refundActive();cur.bottles=cur.initial.map(b=>b.slice());cur.hidden=cur.initialHidden.slice();cur.hist=[];cur.undos=3;cur.sel=-1;recomputeCorks();render()};
$("bUndo").onclick=()=>{if(!idle()||!cur.undos||!cur.hist.length)return;const h=cur.hist.pop();cur.bottles=h.b;cur.hidden=h.h.map((x,k)=>Math.min(x,cur.hidden[k]??x));if(h.g)cur.guagua=true;cur.undos--;cur.sel=-1;recomputeCorks();render()};
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
    closeModal();render()});
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
  modal(body+earnHtml+`<button class="cta" id="next" ${earn?"disabled":""}>${goHome?"See the full shelf":`Level ${L+1}`}</button>`);
  if(earn)document.querySelectorAll(".opt").forEach(o=>o.onclick=()=>{choice=o.dataset.h;document.querySelectorAll(".opt").forEach(x=>x.classList.toggle("on",x===o));$("next").disabled=false});
  $("next").onclick=()=>{
    if(earn&&choice){save.helps[choice]++;save.earned.push(L);persist()}
    closeModal();
    if(goHome){$("game").hidden=true;$("home").hidden=false;renderHome()}else startLevel(L+1);
  };
}

function modal(html){$("modal").innerHTML=`<div class="scrim"><div class="card" role="dialog" aria-modal="true">${html}</div></div>`}
function closeModal(){$("modal").innerHTML=""}

renderHome();
