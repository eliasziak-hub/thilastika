import json,re,os,shutil,sys
S='./';O='../'
rd=lambda f:open(S+f,encoding='utf8').read()
libs=''.join(rd(f).replace("typeof window!=='undefined'?window:globalThis","__G")+'\n' for f in ['portraits.js','render.js','arch2.js','special.js','species.js','fauna.js','fauna_sil.js','fauna_render.js','fauna_map.js'])
app=rd('app.js')
css=rd('style.css');html=rd('template.html')
loader=r'''
const __G={};
'''+libs+r'''
const Species=__G.Species,Portrait=__G.Portrait;
const __CSS=%s,__HTML=%s;
%s
const S=document.currentScript,B=S&&S.src?S.src.replace(/[^\/]*([?#].*)?$/,''):'./';
const SEL='[data-poulia4-library],[data-thilastika-library],[data-thilastika]';
let hosts=[...document.querySelectorAll(SEL)];
if(!hosts.length&&S){const d=document.createElement('div');d.setAttribute('data-thilastika','');S.parentNode.insertBefore(d,S);hosts=[d]}
let ld;const data=()=>ld||(ld=window.THILASTIKA_DATA?Promise.resolve():new Promise((ok,no)=>{const s=document.createElement('script');s.src=B+'data.js?v=6';s.onload=ok;s.onerror=no;document.head.appendChild(s)}));
hosts.forEach(h=>{if(h.shadowRoot)return;const R=h.attachShadow({mode:'open'});
 R.innerHTML='<div style="padding:40px 16px;text-align:center;font:14px system-ui,sans-serif;color:#756f60">Φόρτωση βιβλιοθήκης θηλαστικών…</div>';
 const go=()=>data().then(()=>{R.innerHTML='<style>'+__CSS+'</style>'+__HTML;if(!h.hasAttribute('data-standalone'))R.getElementById('app').classList.add('embed');
   APP(R,h,{cat:h.dataset.cat,dark:h.dataset.theme=='dark'})}).catch(e=>{console.error(e);R.innerHTML='<div style="padding:30px;text-align:center;font:14px system-ui,sans-serif">Δεν φορτώθηκαν τα δεδομένα της βιβλιοθήκης.</div>'});
 if('IntersectionObserver'in window){const io=new IntersectionObserver(e=>{if(e[0].isIntersecting){io.disconnect();go()}},{rootMargin:'600px'});io.observe(h)}else go()});
'''%(json.dumps(css,ensure_ascii=False),json.dumps(html,ensure_ascii=False),app)
open(O+'embed.js','w',encoding='utf8').write('(()=>{\n"use strict";\n'+loader+'\n})();\n')
print('embed.js ->',os.path.abspath(O+'embed.js'))
