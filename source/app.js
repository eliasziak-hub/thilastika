const APP=(R,host,opts)=>{
const D=window.THILASTIKA_DATA,BLOG='https://ze-r.blogspot.com',$=i=>R.getElementById(i);
/* αφαίρεση μπλοκ εσωτερικών λινκ (<div style="float:right"> και λίστες λινκ χωρίς εικόνες) */
const cleanHtml=h=>{h=String(h||'');if(!/<div/i.test(h))return h;const d=new DOMParser().parseFromString('<body><div id="r">'+h+'</div></body>','text/html'),r=d.getElementById('r');
  const ws=s=>s.replace(/[\s ]+/g,'');
  const bad=e=>{if(/float\s*:\s*right/i.test(e.getAttribute('style')||''))return true;if(e.querySelector('div,img'))return false;const an=[...e.querySelectorAll('a')];if(an.length<2)return false;const t=ws(e.textContent).length,a=ws(an.map(x=>x.textContent).join('')).length,b=ws([...e.querySelectorAll('b,strong')].filter(x=>!x.closest('a')).map(x=>x.textContent).join('')).length;return a>=.8*t||(a+b)>=.9*t};
  [...r.querySelectorAll('div')].reverse().forEach(e=>{if(!e.isConnected)return;if(bad(e)||(!e.textContent.trim()&&!e.querySelector('img,iframe')))e.remove()});return r.innerHTML};
let posts=D.posts.map(p=>(p.title=String(p.title).replace(/[​-‏﻿]/g,'').trim(),p.content=cleanHtml(p.content),p)),cat=null,qs='',sortM='rel',favOnly=false,list=[],shown=0,N=0,DF=new Map(),SURF=new Map(),fc={cont:'',diet:''},wall=false,cur=null;
const BATCH=24,esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nw=w=>w.toLocaleLowerCase('el').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ς/g,'σ');
const fd=v=>{const d=new Date(v);return isNaN(d)?'—':new Intl.DateTimeFormat('el-GR',{day:'numeric',month:'short',year:'numeric'}).format(d)};
const strip=h=>String(h||'').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&[a-z#0-9]+;/g,' ');
const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
let FAV=new Set();try{FAV=new Set(JSON.parse(ls.get('thil-fav')||'[]'))}catch(e){}
const saveFav=()=>ls.set('thil-fav',JSON.stringify([...FAV]));
const CMP=new Set();
const toast=t=>{const e=$('toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2600)};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
/* ---------- TF-IDF ---------- */
const STOP=new Set('και του της των που στο στην στη στον στα στις απο για ειναι ενα μια ενας με σε να τα το ο η οι ως η αλλα πολυ μπορει εχει εχουν ζουν ζει οπως τους τον την τις οτι σαν κατα μετα προς επισης συνηθως ενω οταν αυτο αυτα αυτη αυτες αυτοι μονο ειδη ειδος εχουν μεσα περιπου διαφορα αλλες αλλα'.split(' ').map(nw));
function words(t){return String(t).toLocaleLowerCase('el').split(/[^\p{L}\d]+/u).filter(w=>w.length>3&&!/^\d+$/.test(w)).map(w=>[nw(w),w]).filter(a=>!STOP.has(a[0])).map(a=>[a[0].slice(0,6),a[1]])}
function index(){
  N=posts.length;DF=new Map();
  posts.forEach(p=>{const tf=new Map();words((p.title+' ').repeat(3)+p.categories.join(' ')+' '+strip(p.content)).forEach(([s,w])=>{tf.set(s,(tf.get(s)||0)+1);if(!SURF.has(s))SURF.set(s,w)});p._tf=tf;tf.forEach((_,s)=>DF.set(s,(DF.get(s)||0)+1))});
  posts.forEach(p=>{const v=new Map();let n=0;p._tf.forEach((c,s)=>{const w=(1+Math.log(c))*Math.log(N/DF.get(s));if(w>0){v.set(s,w);n+=w*w}});n=Math.sqrt(n)||1;v.forEach((w,s)=>v.set(s,w/n));p._v=v;p._kw=[...v].sort((a,b)=>b[1]-a[1]).slice(0,4).map(a=>a[0]);p._h=nw(p.title+' '+p.categories.join(' ')+' '+strip(p.content));p._f=facts(p)});
}
const kw=s=>SURF.get(s)||s;
function score(p,q,qs){let t=0;qs.forEach(s=>t+=p._v.get(s)||0);if(nw(p.title).includes(q))t+=1;return t}
function sim(a,b){let d=0;const[s,l]=a._v.size<b._v.size?[a._v,b._v]:[b._v,a._v];s.forEach((w,k)=>{const o=l.get(k);if(o)d+=w*o});return d}
/* ---------- στοιχεία από το κείμενο ---------- */
const CONT=[['Αφρική',/αφρικ|μαδαγασκ|σαχαρ|κονγκο|κενυα|τανζαν/],['Ασία',/ασια|ινδι|κινα|ιαπων|σιβηρ|μαλαισ|ινδονησ|ταιλανδ|βορνεο|σουμ[αά]τρ|θιβετ|ιμαλαι|μογγολ/],['Ευρώπη',/ευρωπ|ελλαδ|μεσογει|βαλκαν|αλπει|πυρηναι/],['Αμερική',/αμερικ|αμαζον|ανδεις|βραζιλ|καναδ|μεξικ|αλασκ|ορενοκ|παταγον/],['Ωκεανία',/αυστραλ|τασμανι|νεα γουινε|νεα ζηλανδ/],['Ωκεανοί',/ωκεαν|θαλασσ|πελαγ/]];
const DIET=[['Σαρκοφάγο',/σαρκοφαγ|σαρκοβορ/],['Φυτοφάγο',/φυτοφαγ|χορτοφαγ/],['Παμφάγο',/παμφαγ/],['Εντομοφάγο',/εντομοφαγ|μυρμηκοφαγ|τερμιτοφαγ/]];
function facts(p){const t=nw(strip(p.content)),f={cont:[],diet:[]};
  CONT.forEach(([n,r])=>{if(r.test(t))f.cont.push(n)});if(p.categories.some(c=>/Κητώδη|Φώκιες|Φάλαινες|Σειρηνοειδή|Δελφινίδες/.test(c))&&!f.cont.includes('Ωκεανοί'))f.cont.push('Ωκεανοί');
  DIET.forEach(([n,r])=>{if(r.test(t))f.diet.push(n)});
  let m=t.match(/μηκος[^0-9]{0,45}(\d+(?:[.,]\d+)?)(?:\s*[-–]\s*(\d+(?:[.,]\d+)?))?\s*(εκ|εκατ|μ\b|μετρ|χιλ)/);
  if(m){let a=parseFloat(m[1].replace(',','.')),b=m[2]?parseFloat(m[2].replace(',','.')):0;const u=m[3];const k=/^(μ$|μετρ)/.test(u)?100:1;f.len=(b?a+'–'+b:a)+(k==100?' μ.':' εκ.')}
  m=t.match(/βαρος[^0-9]{0,45}(\d+(?:[.,]\d+)?)(?:\s*[-–]\s*(\d+(?:[.,]\d+)?))?\s*(κιλ|χλγ|kg|γρ|γραμ|τον)/);
  if(m){const a=m[1].replace(',','.'),b=m[2]?m[2].replace(',','.'):'',u=/^γρ/.test(m[3])?'γρ.':/^τον/.test(m[3])?'τόνοι':'κιλά';f.kg=(b?a+'–'+b:a)+' '+u}
  return f}
/* ---------- πορτραίτα ---------- */
const AR=new Map();
const A_=p=>{let a=AR.get(p.id);if(!a){const pk=Species.pick(p),svg=Portrait.render(pk.spec,p.id),sc=Portrait.SC[pk.spec.s]||Portrait.SC.savanna;a={svg,key:pk.key,bg:sc.s,uri:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)};AR.set(p.id,a)}return a};
const art=p=>A_(p).uri;
/* ---------- φίλτρα / λίστα ---------- */
function filter(){const q=nw(qs.trim()),qk=q?[...new Set(words(qs).map(a=>a[0]))]:[];
  let r=posts.filter(p=>(!cat||p.categories.includes(cat))&&(!favOnly||FAV.has(p.id))&&(!fc.cont||p._f.cont.includes(fc.cont))&&(!fc.diet||p._f.diet.includes(fc.diet)));
  if(q){r=r.map(p=>({p,s:score(p,q,qk)+(p._h.includes(q)?.05:0)})).filter(o=>o.s>0).map(o=>(o.p._s=o.s,o.p))}
  const t=p=>Date.parse(p.published)||0;
  if(sortM=='rnd')return shuffle(r);
  r.sort((a,b)=>sortM=='az'?a.title.localeCompare(b.title,'el'):sortM=='za'?b.title.localeCompare(a.title,'el'):sortM=='old'?t(a)-t(b):sortM=='rel'&&q?b._s-a._s:t(b)-t(a));return r}
function card(p){const a=A_(p);return `<article class="card"><div class="pt" style="background:linear-gradient(180deg,${a.bg[0]},${a.bg[1]})" data-o="${esc(p.id)}">${p.fresh?'<span class="new">Νέο</span>':''}<button class="cmp ${CMP.has(p.id)?'on':''}" data-m="${esc(p.id)}" aria-label="Σύγκριση" title="Προσθήκη στη σύγκριση">⇄</button><button class="fav ${FAV.has(p.id)?'on':''}" data-f="${esc(p.id)}" aria-label="Αγαπημένο">♥</button><img src="${a.uri}" alt="Πορτρέτο: ${esc(p.title)}" width="160" height="160" loading="lazy" decoding="async"></div><div class="body"><div class="meta">${p.categories.slice(0,2).map(esc).join(' · ')} · ${fd(p.published)}</div><h3>${esc(p.title)}</h3><p class="sn">${esc(p.snippet)}</p><div class="kw">${p._kw.slice(0,3).map(s=>`<button data-k="${esc(s)}">${esc(kw(s))}</button>`).join('')}</div><button class="open" data-o="${esc(p.id)}">Άνοιγμα →</button></div></article>`}
function more(){const c=$('cards'),b=list.slice(shown,shown+BATCH);if(!b.length)return;c.insertAdjacentHTML('beforeend',b.map(card).join(''));shown+=b.length;
  c.querySelectorAll('.pt:not(.ok) img').forEach(im=>{const ok=()=>im.parentNode.classList.add('ok');im.complete?requestAnimationFrame(ok):im.addEventListener('load',ok,{once:true})})}
function render(){list=filter();shown=0;$('cards').innerHTML=list.length?'':'<div class="empty"><b>Δεν βρέθηκαν είδη</b><br>Δοκίμασε άλλη λέξη, κατηγορία ή φίλτρο.</div>';more();
  $('cnt').textContent=`${list.length} από ${posts.length}`;}
function facetsUI(){const cc=CONT.map(c=>c[0]),dd=DIET.map(c=>c[0]);
  $('facets').innerHTML='<small>Ήπειρος / ενδιαίτημα:</small>'+cc.map(c=>`<button class="fc ${fc.cont==c?'on':''}" data-fc="cont:${c}">${c}</button>`).join('')+'<small style="margin-left:8px">Διατροφή:</small>'+dd.map(c=>`<button class="fc ${fc.diet==c?'on':''}" data-fc="diet:${c}">${c}</button>`).join('')}
function cats(){const cn={};posts.forEach(p=>p.categories.forEach(c=>cn[c]=(cn[c]||0)+1));const names=Object.keys(cn).sort((a,b)=>a.localeCompare(b,'el'));
  $('cats').innerHTML=[['Όλες',null,posts.length],...names.map(c=>[c,c,cn[c]])].map(([n,v,c])=>{const f=v&&posts.find(p=>p.categories.includes(v));return `<button class="cat ${cat===v?'on':''}" data-c="${v===null?'':esc(v)}">${f?`<img src="${art(f)}" alt="" width="30" height="30" loading="lazy" decoding="async">`:''}<span>${esc(n)}</span><i>${c}</i></button>`}).join('');
  $('s2').textContent=names.length}
function stats(){$('tTot').textContent=posts.length+' αναρτήσεις';$('s1').textContent=posts.length;$('s3').textContent=DF.size.toLocaleString('el');$('s4').textContent=fd(posts.reduce((m,p)=>p.updated>m?p.updated:m,''))}
function daily(){const p=posts[Math.floor(Date.now()/864e5)%posts.length];if(!p)return;$('daily').innerHTML=`<img src="${art(p)}" alt="Πορτρέτο: ${esc(p.title)}" width="160" height="160" data-o="${esc(p.id)}"><div><small>ΕΙΔΟΣ ΤΗΣ ΗΜΕΡΑΣ</small><h2>${esc(p.title)}</h2><p>${esc(p.snippet)}</p><button class="btn pri" data-o="${esc(p.id)}">Διάβασε περισσότερα →</button></div>`}
const byId=id=>posts.find(p=>p.id==id),sid=p=>p.id.split('post-').pop();
/* ---------- επεξεργασία κειμένου ανάρτησης ---------- */
const rs=(u,s)=>String(u||'').replace(/^http:/,'https:').replace(/\/(?:s\d+|w\d+|h\d+)(?:-[a-zA-Z0-9]+)*\/([^/]+)$/,(m,f)=>`/s${s}${/-rw/.test(m)?'-rw':''}/${f}`);
const ikey=u=>String(u||'').replace(/\/(?:s\d+|w\d+|h\d+)(?:-[a-zA-Z0-9]+)*\/([^/]+)$/,'/$1').replace(/^https?:/,'');
const byPath=()=>{const m=new Map();posts.forEach(p=>{try{m.set(new URL(p.url).pathname,p)}catch(e){}});return m};
function parse(p){
  const doc=new DOMParser().parseFromString('<body><div id="r">'+p.content+'</div></body>','text/html'),root=doc.getElementById('r'),pth=byPath();
  const MK=/άρθρα στο ευρετήριο|Ο αστερισμός ετοιμάζεται|Πηγή: δημόσιες αναρτήσεις|Άτλας ειδών/;let cut=false;
  [...root.childNodes].forEach(n=>{if(cut){n.remove();return}if(n.nodeType==1&&MK.test(n.textContent)){cut=true;n.remove()}});
  const items=[];let buf='';const seen=new Set();
  const flush=()=>{const t=buf.replace(/ /g,' ').replace(/\s+/g,' ').trim();buf='';if(t&&t.replace(/<[^>]*>/g,'').trim())items.push({t:'p',h:t})};
  const anchor=(a,inner)=>{const hr=(a.getAttribute('href')||'').trim();if(!hr||hr[0]=='#'||/^javascript:/i.test(hr))return inner;let u;try{u=new URL(hr,BLOG+'/')}catch(e){return inner}if(!/^https?:$/.test(u.protocol))return inner;
    const q=pth.get(u.pathname);if(q&&/blogspot\./.test(u.host))return `<a class="sp" data-o="${esc(q.id)}" href="${esc(u.href)}">${inner}</a>`;return `<a href="${esc(u.href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`};
  const inl=n=>{let s='';for(const c of n.childNodes){if(c.nodeType==3)s+=esc(c.nodeValue.replace(/\s+/g,' '));else if(c.nodeType==1)s+=inlEl(c)}return s};
  const inlEl=c=>{const tg=c.tagName.toLowerCase();if(tg=='br')return ' ';if(tg=='a')return anchor(c,inl(c));if(tg=='b'||tg=='strong')return '<b>'+inl(c)+'</b>';if(tg=='i'||tg=='em')return '<i>'+inl(c)+'</i>';if(/^(small|sup|sub|u)$/.test(tg))return `<${tg}>${inl(c)}</${tg}>`;if(/^(script|style|img|iframe|object)$/.test(tg))return '';return inl(c)};
  const addImg=(im,href)=>{const src=im.getAttribute('src')||'';if(!src||/^data:/.test(src)||im.getAttribute('width')=='1')return;const k=ikey(src);if(seen.has(k))return;seen.add(k);const big=href&&/(googleusercontent|ggpht|blogspot|\.jpe?g|\.png|\.webp|\.gif)/i.test(href)?href:src;items.push({t:'img',src,big,alt:im.getAttribute('alt')||''})};
  const BL=/^(div|p|table|tbody|thead|tr|td|th|ul|ol|li|section|center|blockquote|figure|figcaption|article|span)$/;
  const walk=n=>{for(const c of n.childNodes){if(c.nodeType==3){buf+=esc(c.nodeValue.replace(/\s+/g,' '));continue}if(c.nodeType!=1)continue;const tg=c.tagName.toLowerCase();
    if(tg=='br'){flush();continue}if(tg=='img'){flush();addImg(c,'');continue}
    if(tg=='a'){const im=c.querySelector('img');if(im){flush();addImg(im,c.getAttribute('href'));continue}buf+=inlEl(c);continue}
    if(/^h[1-6]$/.test(tg)){flush();const h=inl(c).trim();if(h.replace(/<[^>]*>/g,'').trim())items.push({t:'h',h});continue}
    if(/^(script|style)$/.test(tg))continue;
    if(tg=='span'&&!c.querySelector('img,div,p,h1,h2,h3,h4,h5,h6,br')){buf+=inl(c);continue}
    if(BL.test(tg)){flush();walk(c);flush();continue}
    buf+=inlEl(c)}};
  walk(root);flush();
  /* λίστες */
  const out=[];let ul=null;for(const it of items){if(it.t=='p'){const m=it.h.match(/^(?:[•·●▪‣◦]|[-–—](?=\s))\s*([\s\S]*)$/);if(m&&m[1]){if(!ul){ul={t:'ul',i:[]};out.push(ul)}ul.i.push(m[1]);continue}}ul=null;out.push(it)}
  /* γραμμή ονομάτων πριν την πρώτη φωτογραφία */
  let aka='';const ii=out.findIndex(x=>x.t=='img');
  if(out[0]&&out[0].t=='p'){const tx=out[0].h.replace(/<[^>]*>/g,'').trim();if(tx.length<=150&&((ii>0&&ii<=3&&/\(/.test(tx))||nw(tx)==nw(p.title))){aka=tx;out.shift()}}
  return{aka,items:out}}
function build(p){const {aka,items}=parse(p),lb=[];let html='',heroDone=false,lead=false,hs=[],gal=[],hi=0;
  const fig=(it,cls,sz)=>{lb.push({src:rs(it.big||it.src,1600),cap:it.alt||p.title});return `<figure class="${cls}" data-lb="${lb.length-1}"><img src="${esc(rs(it.src,sz))}" alt="${esc(it.alt||p.title)}" loading="lazy" referrerpolicy="no-referrer"><span class="zm">🔍</span></figure>`};
  const flushG=()=>{if(!gal.length)return;if(gal.length==1)html+=fig(gal[0],'wide',800);else html+='<div class="gal">'+gal.map(g=>fig(g,'g',400)).join('')+'</div>';gal=[]};
  items.forEach((it,k)=>{
    if(it.t=='img'){if(!heroDone&&k<=2){heroDone=true;html+=fig(it,'hf',800);return}gal.push(it);return}
    flushG();
    if(it.t=='p'){const long=it.h.replace(/<[^>]*>/g,'').length>60;html+=`<p${!lead&&long?' class="lead"':''}>${it.h}</p>`;if(!lead&&long)lead=true}
    else if(it.t=='h'){const id='h'+(hi++);hs.push([id,it.h.replace(/<[^>]*>/g,'')]);html+=`<h4 id="${id}">${it.h}</h4>`}
    else if(it.t=='ul')html+='<ul>'+it.i.map(x=>`<li>${x}</li>`).join('')+'</ul>'});
  flushG();return{aka,html,hs,lb}}
/* ---------- αναδυόμενο ---------- */
let LB=[],lbi=0;
function openLb(i){LB=cur?cur.lb:[];if(!LB.length)return;lbi=(i+LB.length)%LB.length;const l=LB[lbi];$('lbI').src=l.src;$('lbC').textContent=`${l.cap} · ${lbi+1}/${LB.length}`;$('lb').classList.add('show');$('lbP').style.display=$('lbN').style.display=LB.length>1?'':'none'}
const closeLb=()=>{$('lb').classList.remove('show');$('lbI').removeAttribute('src')};
function open(id,hash=true){const p=byId(id);if(!p)return;const a=A_(p),f=p._f,B=build(p);cur={id:p.id,lb:B.lb};
  $('mHero').innerHTML=a.svg;$('mT').textContent=p.title;$('mAka').textContent=B.aka;$('mAka').style.display=B.aka?'':'none';
  $('mK').innerHTML=p.categories.map(c=>`<button class="tag" data-c="${esc(c)}">${esc(c)}</button>`).join('');
  $('mFacts').innerHTML=f.cont.map(c=>`<span class="fact">🌍 ${esc(c)}</span>`).join('');
  $('mA').innerHTML=B.html||'<p style="color:var(--muted)">Η ανάρτηση δεν έχει κείμενο.</p>';
  $('mToc').innerHTML=B.hs.length>=3?B.hs.map(([i,t])=>`<button data-h="${i}">${esc(t)}</button>`).join(''):'';
  $('mA').querySelectorAll('img').forEach(im=>im.addEventListener('error',()=>{const f=im.closest('figure');if(f)f.remove()},{once:true}));
  const L=$('mL');L.href=p.url||BLOG+'/search?q='+encodeURIComponent(p.title);$('mCmp').dataset.m=p.id;$('mCmp').classList.toggle('on',CMP.has(p.id));$('mDl').dataset.id=p.id;
  const s=posts.filter(o=>o!==p).map(o=>[o,sim(p,o)]).sort((a,b)=>b[1]-a[1]).slice(0,8);
  $('mSim').innerHTML=s.map(([o,v])=>`<button data-o="${esc(o.id)}"><img src="${art(o)}" alt="" width="160" height="160" loading="lazy">${esc(o.title)}<small>${Math.round(v*100)}%</small></button>`).join('');
  const ix=list.findIndex(x=>x.id==p.id);$('mPos').textContent=ix>=0?`${ix+1} από ${list.length}`:'';
  $('bk').classList.add('show');document.body.style.overflow='hidden';$('mc').scrollTop=0;if(hash)try{history.replaceState(null,'','#p='+sid(p))}catch(e){}}
function close(){closeLb();$('bk').classList.remove('show');if(!$('bk2').classList.contains('show'))document.body.style.overflow='';cur=null;try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}}
function step(d){if(!cur)return;const l=list.length?list:posts;let i=l.findIndex(x=>x.id==cur.id);i=i<0?0:(i+d+l.length)%l.length;open(l[i].id)}
function fav(id){FAV.has(id)?FAV.delete(id):FAV.add(id);saveFav();R.querySelectorAll(`[data-f="${CSS.escape(id)}"]`).forEach(b=>b.classList.toggle('on',FAV.has(id)));if(favOnly)render()}
/* ---------- σύγκριση ---------- */
function cmpBar(){const n=CMP.size;$('cmpbar').classList.toggle('on',n>0);$('cmpn').textContent=n+' είδη στη σύγκριση'}
function toggleCmp(id){if(CMP.has(id))CMP.delete(id);else{if(CMP.size>=3)return toast('Έως 3 είδη στη σύγκριση');CMP.add(id)}R.querySelectorAll(`[data-m="${CSS.escape(id)}"]`).forEach(b=>b.classList.toggle('on',CMP.has(id)));cmpBar()}
function shared(a,b){const r=[];a._v.forEach((w,k)=>{const o=b._v.get(k);if(o)r.push([k,Math.min(w,o)])});return r.sort((x,y)=>y[1]-x[1]).slice(0,5).map(x=>kw(x[0]))}
function compare(){const ps=[...CMP].map(byId).filter(Boolean);if(ps.length<2)return toast('Διάλεξε τουλάχιστον 2 είδη (κουμπί ⇄)');
  let h=`<h2>Σύγκριση ειδών</h2><div class="sub">Στοιχεία που εντοπίστηκαν αυτόματα στο κείμενο κάθε ανάρτησης</div><div class="cmpg" style="--n:${ps.length}">`+ps.map(p=>{const f=p._f;return `<div class="cc"><img src="${art(p)}" alt="" width="160" height="160"><h3>${esc(p.title)}</h3><dl><dt>Κατηγορίες</dt><dd>${p.categories.map(esc).join(', ')||'—'}</dd><dt>Μήκος</dt><dd>${esc(f.len||'—')}</dd><dt>Βάρος</dt><dd>${esc(f.kg||'—')}</dd><dt>Περιοχή</dt><dd>${f.cont.join(', ')||'—'}</dd><dt>Διατροφή</dt><dd>${f.diet.join(', ')||'—'}</dd><dt>Βασικοί όροι</dt><dd>${p._kw.map(kw).map(esc).join(', ')}</dd></dl><button class="btn" data-o="${esc(p.id)}" style="margin-top:10px">Άνοιγμα →</button></div>`}).join('')+'</div>';
  for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++)h+=`<div class="simrow"><b>${Math.round(sim(ps[i],ps[j])*100)}%</b> ομοιότητα TF-IDF · ${esc(ps[i].title)} ↔ ${esc(ps[j].title)} · κοινοί όροι: ${shared(ps[i],ps[j]).map(esc).join(', ')||'—'}</div>`;
  h+='<div class="acts" style="margin-top:16px"><button class="btn" id="pnClose">Κλείσιμο</button></div>';showPn(h)}
function showPn(h){$('pn').innerHTML=h;$('bk2').classList.add('show');document.body.style.overflow='hidden'}
function closePn(){$('bk2').classList.remove('show');if(!$('bk').classList.contains('show'))document.body.style.overflow=''}
/* ---------- κουίζ ---------- */
function quiz(){const T=10;let r=0,sc=0,st=0,bs=+ls.get('thil-best')||0,Q=[];
  const pool=shuffle(posts.filter(p=>!/ίδες$|ειδή$|μορφα$|^Θηλαστικά$/.test(p.title)));
  for(const p of pool.slice(0,T)){const same=pool.filter(o=>o!==p&&o.categories[0]==p.categories[0]),oth=pool.filter(o=>o!==p);const d=new Set();shuffle(same).slice(0,2).forEach(o=>d.add(o));shuffle(oth).forEach(o=>{if(d.size<3)d.add(o)});Q.push({p,o:shuffle([p,...d])})}
  const view=()=>{if(r>=T){const nb=sc>bs;if(nb){bs=sc;ls.set('thil-best',bs)}showPn(`<h2>Τέλος! ${sc}/${T}</h2><div class="sub">${nb?'Νέο ρεκόρ! 🏆':'Καλύτερο σκορ: '+bs+'/'+T}</div><p>${sc>=9?'Άριστος ζωολόγος!':sc>=6?'Πολύ καλά — ξέρεις καλά τα ζώα.':'Δοκίμασε ξανά και δες τις αναρτήσεις για περισσότερα!'}</p><div class="acts"><button class="btn pri" id="qAgain">Παίξε ξανά</button><button class="btn" id="pnClose">Κλείσιμο</button></div>`);return}
    const q=Q[r];showPn(`<h2>🎯 Ποιο ζώο είναι;</h2><div class="qbar"><span>Ερώτηση ${r+1}/${T}</span><div class="pg"><i style="width:${r/T*100}%"></i></div><span>Σκορ ${sc}${st>1?' · 🔥 '+st:''}</span></div><div class="qz"><div class="qa">${A_(q.p).svg}</div><div><div class="qo">${q.o.map((o,i)=>`<button data-qa="${i}">${esc(o.title)}</button>`).join('')}</div><p class="sn" id="qf" style="margin-top:12px"></p><div class="acts"><button class="btn" id="qHint">💡 Υπόδειξη</button><button class="btn pri" id="qNext" style="display:none">Επόμενη →</button><button class="btn" id="pnClose">Έξοδος</button></div></div></div>`)};
  quiz.h={answer(i){const q=Q[r],bs_=R.querySelectorAll('.qo button');if(bs_[0]&&bs_[0].disabled)return;const ok=q.o[i]===q.p;bs_.forEach((b,k)=>{b.disabled=true;if(q.o[k]===q.p)b.classList.add('ok');else if(k==i)b.classList.add('no')});if(ok){sc++;st++}else st=0;$('qf').innerHTML=`${ok?'✅ Σωστά!':'❌ Λάθος.'} <b>${esc(q.p.title)}</b> — ${esc(q.p.snippet.slice(0,140))}…`;$('qNext').style.display='';$('qHint').style.display='none'},
   hint(){const q=Q[r];$('qf').textContent='Υπόδειξη: κατηγορία «'+q.p.categories[0]+'»'+(q.p._f.cont[0]?', περιοχή '+q.p._f.cont[0]:'')},next(){r++;view()},again(){quiz()}};
  view()}
/* ---------- γεγονότα ---------- */
R.addEventListener('click',e=>{const t=e.target.closest('[data-c],[data-k],[data-o],[data-f],[data-m],[data-fc],[data-h],[data-lb],[data-qa]');
  if(!t){const id=e.target.id;if(id=='pnClose')return closePn();if(id=='qNext')return quiz.h.next();if(id=='qHint')return quiz.h.hint();if(id=='qAgain')return quiz.h.again();return}
  const d=t.dataset;
  if(d.qa!==undefined)return quiz.h.answer(+d.qa);
  if(d.lb!==undefined)return openLb(+d.lb);
  if(d.h)return $(d.h)&&$(d.h).scrollIntoView({behavior:'smooth',block:'start'});
  if(d.f!==undefined)return fav(d.f);
  if(d.m!==undefined){e.stopPropagation();return toggleCmp(d.m)}
  if(d.fc){const[k,v]=d.fc.split(':');fc[k]=fc[k]==v?'':v;facetsUI();render();return}
  if(d.o){e.preventDefault();closePn();return open(d.o)}
  if(d.k){qs=kw(d.k);$('q').value=qs;sortM='rel';$('sort').value='rel';close();render();$('cards').scrollIntoView({behavior:'smooth',block:'start'});return}
  cat=d.c||null;if(!$('bk').classList.contains('show')||d.c!==undefined){close();cats();render()}});
$('q').addEventListener('input',e=>{qs=e.target.value;clearTimeout(render.t);render.t=setTimeout(render,120)});
$('sort').addEventListener('change',e=>{sortM=e.target.value;render()});
$('bFav').onclick=e=>{favOnly=!favOnly;e.currentTarget.classList.toggle('on',favOnly);render()};
$('bRnd').onclick=()=>open(posts[Math.floor(Math.random()*posts.length)].id);
$('bQuiz').onclick=()=>quiz();
$('vGrid').onclick=()=>{wall=false;$('cards').classList.remove('wall');$('vGrid').classList.add('on');$('vWall').classList.remove('on')};
$('vWall').onclick=()=>{wall=true;$('cards').classList.add('wall');$('vWall').classList.add('on');$('vGrid').classList.remove('on')};
const setDark=on=>{host.classList.toggle('dark',on);ls.set('thil-dark',on?'1':'0');$('bDark').textContent=on?'☀️':'🌙'};
$('bDark').onclick=()=>setDark(!host.classList.contains('dark'));
setDark(ls.get('thil-dark')=='1'||(opts.dark===true));
$('mX').onclick=close;$('bk').addEventListener('click',e=>{if(e.target==$('bk'))close()});$('bk2').addEventListener('click',e=>{if(e.target==$('bk2'))closePn()});
$('mPrev').onclick=()=>step(-1);$('mNext').onclick=()=>step(1);
$('lbX').onclick=closeLb;$('lbP').onclick=()=>openLb(lbi-1);$('lbN').onclick=()=>openLb(lbi+1);$('lb').addEventListener('click',e=>{if(e.target==$('lb'))closeLb()});
$('cmpGo').onclick=compare;$('cmpClr').onclick=()=>{[...CMP].forEach(toggleCmp)};
$('mCmp').onclick=e=>{toggleCmp(e.currentTarget.dataset.m);e.currentTarget.classList.toggle('on',CMP.has(e.currentTarget.dataset.m))};
$('mDl').onclick=e=>{const p=byId(e.currentTarget.dataset.id),a=A_(p),n=(sid(p)||'portrait');const url=URL.createObjectURL(new Blob([a.svg],{type:'image/svg+xml'})),x=document.createElement('a');x.href=url;x.download='thilastika-'+n+'.svg';x.click();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('Λήψη πορτραίτου SVG')};
$('mHero').addEventListener('pointermove',e=>{const b=e.currentTarget.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5,s=e.currentTarget.firstElementChild;if(s)s.style.transform=`rotateY(${x*10}deg) rotateX(${-y*10}deg) scale(1.03)`});
$('mHero').addEventListener('pointerleave',e=>{const s=e.currentTarget.firstElementChild;if(s)s.style.transform=''});
let tx=0;$('mc').addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});$('mc').addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>90&&!e.target.closest('.toc'))step(d<0?1:-1)},{passive:true});
const onKey=e=>{const lbOn=$('lb').classList.contains('show'),mo=$('bk').classList.contains('show'),po=$('bk2').classList.contains('show');
  if(e.key=='Escape'){if(lbOn)closeLb();else if(po)closePn();else if(mo)close()}
  else if(lbOn&&e.key=='ArrowLeft')openLb(lbi-1);else if(lbOn&&e.key=='ArrowRight')openLb(lbi+1);
  else if(mo&&!lbOn&&!po&&e.key=='ArrowLeft')step(-1);else if(mo&&!lbOn&&!po&&e.key=='ArrowRight')step(1);
  else if(e.key=='/'&&!mo&&!po&&!/INPUT|SELECT/.test((R.activeElement||{}).tagName||'')&&document.activeElement===host){e.preventDefault();$('q').focus()}};
document.addEventListener('keydown',onKey);
new IntersectionObserver(en=>{if(en[0].isIntersecting)more()},{rootMargin:'700px'}).observe($('sent'));
/* ---------- συγχρονισμός Blogger ---------- */
async function sync(quiet){const b=$('bSync');b.disabled=true;try{const last=posts.reduce((m,p)=>p.updated>m?p.updated:m,'');
  const j=await(await fetch(`${BLOG}/feeds/posts/default?alt=json&max-results=150&updated-min=${encodeURIComponent(last)}`)).json();let n=0;
  (j.feed.entry||[]).forEach(e=>{const id=e.id.$t,c=cleanHtml(e.content?e.content.$t:''),al=(e.link||[]).find(l=>l.rel=='alternate'),o={id,title:e.title.$t.replace(/[​-‏﻿]/g,'').trim(),originalTitle:e.title.$t,published:e.published.$t,updated:e.updated.$t,categories:(e.category||[]).map(x=>x.term),content:c,snippet:strip(c).replace(/\s+/g,' ').trim().slice(0,200),url:al&&al.href,fresh:true};
   const i=posts.findIndex(p=>p.id==id);if(i<0)posts.push(o);else if(posts[i].updated!=o.updated)posts[i]=o;else return;AR.delete(id);n++});
  if(n){index();cats();stats();render()}if(!quiet||n)toast(n?`${n} νέες/ενημερωμένες αναρτήσεις από το Blogger`:'Όλα ενημερωμένα')}
  catch(e){if(!quiet)toast('Δεν υπάρχει σύνδεση με το Blogger αυτή τη στιγμή')}b.disabled=false}
$('bSync').onclick=()=>sync(false);
index();cats();facetsUI();stats();daily();render();
const m=location.hash.match(/p=(\d+)/);if(m){const p=posts.find(x=>sid(x)==m[1]);if(p)open(p.id,false)}
const u=opts.cat||new URLSearchParams(location.search).get('cat');if(u&&posts.some(p=>p.categories.includes(u))){cat=u;cats();render()}
if(navigator.onLine)setTimeout(()=>sync(true),2500);
};
