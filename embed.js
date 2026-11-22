/* Θηλαστικά · embed.js — <script src=".../embed.js" defer data-height="900" data-cat="Αρκτίδες"></script> */
(()=>{const s=document.currentScript||[...document.scripts].find(x=>/embed\.js/.test(x.src));if(!s)return;
const o=s.dataset,q=new URLSearchParams({embed:'1'});if(o.cat)q.set('cat',o.cat);
const box=document.createElement('div'),f=document.createElement('iframe'),b=document.createElement('button');
box.style.cssText=`position:relative;width:100%;max-width:${o.maxWidth||'1200px'};margin:16px auto`;
f.src=s.src.replace(/embed\.js.*$/,'index.html')+'?'+q;f.title=o.title||'Θηλαστικά · Βιβλιοθήκη ειδών';f.loading='lazy';f.allow='clipboard-write';
f.style.cssText=`width:100%;height:${o.height||Math.max(640,Math.min(900,Math.round(innerHeight*.9)))}px;border:0;border-radius:14px;background:#f3eee2;display:block`;
b.textContent='⤢';b.title='Πλήρης οθόνη';b.setAttribute('aria-label','Πλήρης οθόνη');b.style.cssText='position:absolute;right:10px;bottom:10px;z-index:2;width:34px;height:34px;border:0;border-radius:50%;background:#2f5d50;color:#fff;font-size:16px;cursor:pointer;opacity:.85';
let full=false;const h=f.style.height;b.onclick=()=>{full=!full;box.style.cssText=full?'position:fixed;inset:0;z-index:99999;margin:0;max-width:none;background:#f3eee2':`position:relative;width:100%;max-width:${o.maxWidth||'1200px'};margin:16px auto`;f.style.height=full?'100%':h;f.style.borderRadius=full?'0':'14px';b.textContent=full?'✕':'⤢'};
box.append(f,b);const t=o.target&&document.querySelector(o.target);t?t.appendChild(box):s.parentNode.insertBefore(box,s.nextSibling)})();
