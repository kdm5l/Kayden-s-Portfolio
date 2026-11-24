const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const cat=x=>x.c.map(i=>C[i]).join(' / ');
let cur='intro',prev='show',EX=true,paused=false,si=0,front='sA',tm,last=Date.now(),pi=0,ii=0,filt=-1,DUR=CONFIG.slideSeconds*1000;
$('#ipimg').src=IMG.portrait;$('#abimg').src=IMG.portrait;
$$('[data-t]').forEach(e=>{[...e.dataset.t].forEach((ch,i)=>{const s=document.createElement('span');s.textContent=ch;s.style.animationDelay=(.25+i*.09+(e.className=='l2'?.6:0))+'s';e.appendChild(s)})});
function go(v){closeGame();if(v===cur)return;$('#pv').pause();if(cur==='show')$$('#show video').forEach(x=>x.pause());clearTimeout(tm);$('#'+cur).classList.remove('on');prev=cur;cur=v;$('#'+v).classList.add('on');
 $('#top').classList.toggle('hide',v==='intro');$$('[data-go]').forEach(b=>b.classList.toggle('on',b.dataset.go===v));
 if(v==='show')playShow();
 if(v==='gal')setTimeout(()=>($('.card')||document.body).focus({preventScroll:true}),600);}
function home(play){go('show');if(play){paused=false;}setPause(!EX?true:paused)}
/* showcase: three projects at a time */
const chunk=(arr,n)=>arr.reduce((r,x,i)=>(i%n?r[r.length-1].push(x):r.push([x]),r),[]);
const BAD={};let G=chunk(P,3),gi=0,elapsed=0,HOLD=5000;front='gB';
const pad2=n=>String(n).padStart(2,'0');
function card(x){const b=document.createElement('button');b.className='tc';
 b.innerHTML='<div class="tm"><span class="no mono"></span></div><div class="tt"><span class="mono g"></span><h3></h3><span class="mono go">View project →</span></div>';
 const tm=b.querySelector('.tm');
 if(IMG[x.h]){const im=document.createElement('img');im.src=IMG[x.h];im.alt=x.t;tm.prepend(im);tm.style.setProperty('--bi','url("'+IMG[x.h]+'")')}
 if(VIDEOS[x.h]&&!BAD[x.h]){const v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.autoplay=true;if(IMG[x.h])v.poster=IMG[x.h];v.onerror=()=>{BAD[x.h]=1;v.remove()};v.onloadeddata=()=>v.classList.add('rd');v.src=VIDEOS[x.h];tm.appendChild(v);v.play().catch(()=>{})}
 b.querySelector('.no').textContent=pad2(P.indexOf(x)+1);b.querySelector('.g').textContent=cat(x);b.querySelector('h3').textContent=x.t;
 b.onclick=()=>openP(P.indexOf(x));return b}
function fillGrp(el,g){el.innerHTML='';g.forEach(x=>el.appendChild(card(x)))}
function labels(){const g=G[gi];if(!g)return;const f=P.indexOf(g[0])+1,l=P.indexOf(g[g.length-1])+1;
 $('#sq').textContent='// Exhibition showcase · Sequence '+pad2(gi+1)+' / '+pad2(G.length);
 $('#spr').textContent=(f===l?'Project '+pad2(f):'Projects '+pad2(f)+'–'+pad2(l))+' / '+pad2(P.length);
 $$('.sg').forEach((s,j)=>{s.classList.toggle('on',j===gi);s.classList.toggle('done',j<gi);s.firstChild.style.transform=j===gi?'scaleX('+Math.min(1,elapsed/DUR)+')':''})}
function buildSegs(){const sg=$('#segs');sg.innerHTML='';G.forEach((g,j)=>{const b=document.createElement('button');b.className='sg';b.innerHTML='<i></i>';b.setAttribute('aria-label','Sequence '+(j+1));b.onclick=()=>{setPause(true);showGroup(j,j>=gi?1:-1)};sg.appendChild(b)})}
function showGroup(n,dir){dir=dir||1;gi=(n+G.length)%G.length;const old=$('#'+front),nx=front==='gA'?'gB':'gA',el=$('#'+nx);
 fillGrp(el,G[gi]);el.style.transition='none';el.style.opacity=0;el.style.transform='translateX('+dir*4+'vw)';void el.offsetWidth;
 el.style.transition='';el.style.opacity=1;el.style.transform='none';el.classList.add('on');
 if(old){old.classList.remove('on');old.style.opacity=0;old.style.transform='translateX('+(-dir*4)+'vw)';setTimeout(()=>{if(!old.classList.contains('on'))old.innerHTML=''},1400)}
 front=nx;elapsed=0;labels()}
function regroup(){G=chunk(P,3);if(gi>=G.length)gi=0;buildSegs();fillGrp($('#'+front),G[gi]);labels()}
function playShow(){$$('#'+front+' video').forEach(v=>v.play().catch(()=>{}));elapsed=0;labels()}
function setPause(v){paused=v;$('#show').classList.toggle('paused',v);$('#sPl').textContent=v?'▶ Play':'❚❚ Pause'}
/* rotation: advances only while the showcase is visible, not paused, and nobody has touched the controls recently */
setInterval(()=>{if(cur!=='show'||paused||Date.now()-last<HOLD)return;elapsed+=100;const s=$$('.sg')[gi];if(s)s.firstChild.style.transform='scaleX('+Math.min(1,elapsed/DUR)+')';if(elapsed>=DUR)showGroup(gi+1,1)},100);
/* gallery */
function thumb(id,alt){if(IMG[id]){const i=document.createElement('img');i.src=IMG[id];i.alt=alt||'';return i}
 const v=document.createElement('video');v.muted=true;v.preload='metadata';v.playsInline=true;v.src=(VIDEOS[id]||'')+'#t=0.5';return v}
function drawGal(){const ch=$('#chips');ch.innerHTML='';['All',...C].forEach((n,i)=>{const b=document.createElement('button');b.className='btn'+(filt===i-1?' on':'');b.textContent=n;b.onclick=()=>{filt=i-1;drawGal()};ch.appendChild(b)});
 const g=$('#grid');g.innerHTML='';P.forEach((x,i)=>{if(filt>=0&&!x.c.includes(filt))return;const b=document.createElement('button');b.className='card';b.style.animationDelay=(g.children.length*60)+'ms';
 b.innerHTML='<div class="im"><img alt=""></div><div class="tx"><span class="mono g"></span><h3></h3><p></p><span class="o mono">Open project →</span></div>';
 b.querySelector('.im').replaceChildren(thumb(x.h,x.t));b.querySelector('span').textContent=cat(x);b.querySelector('h3').textContent=x.t;b.querySelector('p').textContent=x.d;b.onclick=()=>openP(i);g.appendChild(b)})}
/* project */
function openP(i){pi=i;ii=0;renderP();if(cur!=='proj')go('proj')}
function renderP(){const x=P[pi];$('#stplay').hidden=$('#pplay').hidden=!x.play;$('#pc').textContent=cat(x);$('#pt').textContent=x.t;$('#pd').textContent=x.d;$('#pmeta').innerHTML=x.m.map(m=>'<div><b>'+m[0]+'</b><span>'+m[1]+'</span></div>').join('');
 const t=$('#th');t.innerHTML='';x.im.forEach((m,k)=>{const b=document.createElement('button');b.appendChild(thumb(m[0],m[1]));b.onclick=()=>img(k);t.appendChild(b)});
 const many=x.im.length>1;$('#pa').style.display=$('#pb').style.display=t.style.display=many?'':'none';img(0,true)}
function img(k,now){const x=P[pi];ii=(k+x.im.length)%x.im.length;const m=$('#pm'),v=$('#pv'),ph=$('.ph');
 const set=()=>{const e=x.im[ii],vs=VIDEOS[e[0]];v.pause();
  const showImg=()=>{v.removeAttribute('src');v.style.display='none';m.style.display='block';m.src=IMG[e[0]]||'';m.alt=e[1]};
  if(vs){v.onerror=showImg;v.poster=IMG[e[0]]||'';v.src=vs;v.style.display='block';m.style.display='none';v.play().catch(()=>{})}else showImg();
  $('#ph').textContent=e[1]||x.t;$('#pnote').textContent=e[2]||'';ph.classList.remove('sw');m.classList.remove('sw');
  $('#pn').textContent=(vs?'▶ Video · ':'')+(ii+1)+' / '+x.im.length};
 if(now)set();else{ph.classList.add('sw');m.classList.add('sw');setTimeout(set,250)}$$('#th button').forEach((b,j)=>b.classList.toggle('on',j===ii))}
const gameOn=()=>$('#game').classList.contains('on');
const gameURL=()=>typeof GAME_SRCDOC!=='undefined'?URL.createObjectURL(new Blob([GAME_SRCDOC],{type:'text/html'})):P[pi].play;
function loadGame(){const f=$('#gf');if(typeof GAME_SRCDOC!=='undefined'){f.removeAttribute('src');f.srcdoc=GAME_SRCDOC}else{f.removeAttribute('srcdoc');f.src=P[pi].play+'?'+Date.now()}}
function openGame(){if(!P[pi].play)return;$('#gtt').textContent=P[pi].t;loadGame();$('#game').classList.add('on');setTimeout(()=>$('#gf').focus(),500)}
function closeGame(){const g=$('#game');if(!g||!g.classList.contains('on'))return;g.classList.remove('on');setTimeout(()=>{if(!g.classList.contains('on')){$('#gf').removeAttribute('srcdoc');$('#gf').src='about:blank'}},500)}
function closeP(){go(prev==='proj'||prev==='intro'?'gal':prev)}
/* events */
$('#bHome').onclick=()=>home(true);$('#enter').onclick=()=>{paused=false;go('show')};
$$('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
$('#sP').onclick=()=>{setPause(true);showGroup(gi-1,-1)};$('#sN').onclick=()=>{setPause(true);showGroup(gi+1,1)};$('#sPl').onclick=()=>setPause(!paused);
$('#show').addEventListener('click',e=>{if(!e.target.closest('.tc,#sctl,#segs'))setPause(!paused)});
$('#pa').onclick=()=>img(ii-1);$('#pb').onclick=()=>img(ii+1);$('#pcl').onclick=closeP;$('#stplay').onclick=$('#pplay').onclick=openGame;$('#gcl').onclick=closeGame;$('#gre').onclick=loadGame;$('#gnw').onclick=e=>{if(typeof GAME_SRCDOC!=='undefined'){e.preventDefault();window.open(gameURL(),'_blank')}else $('#gnw').href=P[pi].play};
$('#pp').onclick=()=>{pi=(pi-1+P.length)%P.length;renderP()};$('#pnx').onclick=()=>{pi=(pi+1)%P.length;renderP()};
function setEx(v){EX=v;const b=$('#bEx');b.textContent='Exhibition: '+(v?'ON':'OFF');b.classList.toggle('on',v);if(cur==='show')setPause(!v)}
$('#bEx').onclick=()=>setEx(!EX);
function fs(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()}
$('#bFs').onclick=fs;
function nearest(dir){const cs=$$('.card'),a=document.activeElement;let i=cs.indexOf(a);if(i<0){cs[0]&&cs[0].focus();return}
 const r=a.getBoundingClientRect();let best=null,bd=1e9;cs.forEach(c=>{if(c===a)return;const q=c.getBoundingClientRect(),dx=q.left-r.left,dy=q.top-r.top;
 const ok=dir==='l'?dx<-5&&Math.abs(dy)<r.height/2:dir==='r'?dx>5&&Math.abs(dy)<r.height/2:dir==='u'?dy<-5:dy>5;
 if(ok){const d=dir==='l'||dir==='r'?Math.abs(dx):Math.abs(dy)*3+Math.abs(dx);if(d<bd){bd=d;best=c}}});if(best){best.focus();best.scrollIntoView({block:'nearest',behavior:'smooth'})}}
addEventListener('keydown',e=>{if(/INPUT|TEXTAREA/.test(e.target.tagName))return;const k=e.key;if(k==='e'||k==='E'){setEx(!EX);return}if(k==='f'||k==='F'){fs();return}
 if(cur==='intro'){if(k==='Enter'||k===' '){e.preventDefault();$('#enter').click()}return}
 if(k==='h'||k==='H'||k==='Home'){home(true);return}
 if(k==='g'||k==='G'){go('gal');return}if(k==='a'||k==='A'){go('about');return}if(k==='c'||k==='C'){go('contact');return}
 if(cur==='show'){if(k===' '){e.preventDefault();document.activeElement.blur();setPause(!paused)}else if(k==='ArrowRight'){setPause(true);showGroup(gi+1,1)}else if(k==='ArrowLeft'){setPause(true);showGroup(gi-1,-1)}else if(/^[1-3]$/.test(k)){const x=G[gi][k-1];if(x)openP(P.indexOf(x))}else if(k==='Enter'&&!document.activeElement.classList.contains('tc'))openP(P.indexOf(G[gi][0]))}
 else if(cur==='proj'){if(k==='ArrowRight')img(ii+1);else if(k==='ArrowLeft')img(ii-1);else if(k==='ArrowDown'||k==='PageDown')$('#pnx').click();else if(k==='ArrowUp'||k==='PageUp')$('#pp').click();else if(k==='Escape'||k==='Backspace'){gameOn()?closeGame():closeP()}}
 else if(cur==='gal'){const m={ArrowLeft:'l',ArrowRight:'r',ArrowUp:'u',ArrowDown:'d'}[k];if(m){e.preventDefault();nearest(m)}else if(k==='Escape')home(true)}
 else if(k==='Escape')home(true)});
/* idle → return to showcase */
['mousemove','mousedown','keydown','touchstart','wheel','click'].forEach(ev=>addEventListener(ev,()=>{last=Date.now();document.body.classList.remove('idle')},{passive:true}));
setInterval(()=>{if(!$('#pv').paused)last=Date.now();const t=Date.now()-last;
 if(EX&&t>CONFIG.idleSeconds*1000&&cur!=='show'){paused=false;go('show');setPause(false)}
 else if(EX&&t>CONFIG.idleSeconds*1000&&paused){setPause(false)}
 if(t>4000&&(cur==='show'||cur==='intro'))document.body.classList.add('idle');
 const d=new Date();$('#clk').textContent=d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})},1000);
P.filter(x=>!IMG[x.h]).forEach(x=>{const rm=()=>{const i=P.indexOf(x);if(i>-1){P.splice(i,1);drawGal();regroup()}};
 if(!VIDEOS[x.h])return rm();const v=document.createElement('video');v.preload='metadata';v.onerror=rm;v.src=VIDEOS[x.h]});
drawGal();buildSegs();showGroup(0,1);$('#intro').classList.add('on');

/* optional contact form (needs PHP) */
if(CONFIG.contactForm){const f=$('#cf');f.hidden=false;f.onsubmit=async e=>{e.preventDefault();const s=$('#cfs');s.textContent='Sending…';
 try{const r=await fetch('contact.php',{method:'POST',body:new FormData(f)});const j=await r.json();s.textContent=j.ok?'Sent — thank you!':'Could not send.';if(j.ok)f.reset()}
 catch(_){s.textContent='Form needs the PHP server (see README).'}}}

addEventListener('message',e=>{if(e.data==='kmp')last=Date.now()});
