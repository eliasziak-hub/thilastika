/* Θηλαστικά · μηχανή ολόσωμων πορτρέτων SVG (240×180) — όλα ζωγραφίζονται με κώδικα.
   Προφίλ ζώου με σκίαση, γούνα, σημάδια και θολό φόντο (bokeh), όπως στα πορτρέτα των πουλιών. */
(function(G){
'use strict';
const L=G.__lib,{f,cl,hash,rng,adj,mixc,cr,sample,SC}=L;
const W=240,H=180,GY=150;
const rad=a=>a*Math.PI/180,rot=(x,y,a)=>[x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a)];
const P2=a=>a.map(q=>f(q[0])+' '+f(q[1])).join('L');
/* κορδέλα με μεταβλητό πλάτος: wf(t) → πλάτος */
function rib(pts,wf,st=5){const s=sample(pts,st),n=s.length,Lf=[],Rg=[];
 for(let i=0;i<n;i++){const a=s[Math.max(0,i-1)],b=s[Math.min(n-1,i+1)];let dx=b[0]-a[0],dy=b[1]-a[1];const l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;const w=wf(i/(n-1))/2;
  Lf.push([s[i][0]-dy*w,s[i][1]+dx*w]);Rg.push([s[i][0]+dy*w,s[i][1]-dx*w])}
 return'M'+P2(Lf.concat(Rg.reverse()))+'Z'}
const lin=(w0,w1)=>t=>w0+(w1-w0)*t;
const lgr=(id,x1,y1,x2,y2,st,u)=>`<linearGradient id="${id}" ${u?'gradientUnits="userSpaceOnUse" ':''}x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}">${st.map(s=>`<stop offset="${s[0]}" stop-color="${s[1]}"${s[2]!=null?` stop-opacity="${s[2]}"`:''}/>`).join('')}</linearGradient>`;
const rgr=(id,st,cx=.5,cy=.5,r=.5)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${st.map(s=>`<stop offset="${s[0]}" stop-color="${s[1]}"${s[2]!=null?` stop-opacity="${s[2]}"`:''}/>`).join('')}</radialGradient>`;

/* ---------- σκηνή 240×180 (χωρίς φίλτρα: απαλές ακτινωτές διαβαθμίσεις) ---------- */
function scene2(S,R,p){
 const k=SC[S]||SC.savanna,hz=84+R()*12;let D='',B='',F='';
 D+=lgr(p+'sk',0,0,0,1,[[0,k.s[0]],[1,k.s[1]]])+lgr(p+'gr',0,0,0,1,[[0,k.g[0]],[1,k.g[1]]])
  +rgr(p+'gl',[[0,k.glow,.95],[1,k.glow,0]])+rgr(p+'fa',[[0,k.far,1],[.65,k.far,.8],[1,k.far,0]])+rgr(p+'mi',[[0,k.mid,1],[.65,k.mid,.85],[1,k.mid,0]])
  +rgr(p+'vg',[[.5,'#000',0],[1,'#000',.38]],.5,.46,.78)+lgr(p+'hz',0,0,0,1,[[0,k.glow,0],[.5,k.glow,.5],[1,k.glow,0]]);
 B+=`<rect width="${W}" height="${hz+6}" fill="url(#${p}sk)"/><circle cx="${f(40+R()*120)}" cy="${f(18+R()*24)}" r="96" fill="url(#${p}gl)"/>`;
 const dense=/forest|jungle|bamboo|reed/.test(S),water=/^(water|sea|coast)$/.test(S);
 let far='';for(let i=0;i<(dense?10:6);i++){const x=R()*250-5,w=26+R()*40;far+=dense?`<ellipse cx="${f(x)}" cy="${f(hz-16+R()*18)}" rx="${f(w*.62)}" ry="${f(26+R()*28)}" fill="url(#${p}fa)"/>`:`<ellipse cx="${f(x)}" cy="${f(hz+2)}" rx="${f(w*1.5)}" ry="${f(11+R()*22)}" fill="url(#${p}fa)"/>`}
 B+=far;
 let mid='';for(let i=0;i<(dense?7:5);i++)mid+=`<ellipse cx="${f(R()*260-10)}" cy="${f(hz+4+R()*6)}" rx="${f(30+R()*34)}" ry="${f(10+R()*16)}" fill="url(#${p}mi)"/>`;
 B+=mid+`<rect y="${f(hz+4)}" width="${W}" height="${H-hz-4}" fill="url(#${p}gr)"/><rect y="${f(hz-8)}" width="${W}" height="22" fill="url(#${p}hz)"/>`;
 if(water)B+=`<rect y="${f(hz+4)}" width="${W}" height="${H}" fill="url(#${p}gr)"/>`+Array.from({length:7},(_,i)=>`<path d="M${f(R()*200)} ${f(hz+14+i*10)}h${f(30+R()*60)}" stroke="${k.glow}" stroke-width="${f(.8+R())}" opacity="${f(.15+R()*.25)}" stroke-linecap="round"/>`).join('');
 /* bokeh */
 let bk='';D+=rgr(p+'bk',[[0,k.glow,.5],[.8,k.glow,.32],[1,k.glow,0]]);
 for(let i=0;i<13;i++)bk+=`<circle cx="${f(R()*250)}" cy="${f(R()*(hz+30))}" r="${f(5+R()*11)}" fill="url(#${p}bk)" opacity="${f(.3+R()*.5)}"/>`;
 B+=bk;
 if(S=='night'||S=='cave'){let st='';for(let i=0;i<24;i++)st+=`<circle cx="${f(R()*240)}" cy="${f(R()*84)}" r="${f(.5+R()*.9)}" fill="#fff" opacity="${f(.5+R()*.5)}"/>`;B+=st}
 /* μπροστινό πλάνο */
 if(/savanna|steppe|meadow|forest|jungle|bamboo|reed|tundra|mountain/.test(S)){
  const g1=adj(k.g[1],-6),g2=adj(k.g[0],10);let bl='';
  for(let i=0;i<46;i++){const x=R()<.5?R()*52:188+R()*52,h=10+R()*22,lean=(R()-.5)*10,y=H+2;bl+=`<path d="M${f(x)} ${y}Q${f(x+lean*.4)} ${f(y-h*.6)} ${f(x+lean)} ${f(y-h)}" stroke="${R()<.5?g1:g2}" stroke-width="${f(1+R()*1.4)}" fill="none" stroke-linecap="round"/>`}
  for(let i=0;i<14;i++){const x=70+R()*100,h=5+R()*10,lean=(R()-.5)*6,y=H+1;bl+=`<path d="M${f(x)} ${y}Q${f(x+lean*.4)} ${f(y-h*.6)} ${f(x+lean)} ${f(y-h)}" stroke="${g1}" stroke-width="${f(.9+R())}" fill="none" stroke-linecap="round" opacity=".9"/>`}
  F+=bl}
 else if(S=='snow')F+=`<ellipse cx="30" cy="186" rx="90" ry="14" fill="#fff" opacity=".85"/><ellipse cx="220" cy="188" rx="80" ry="12" fill="#f3f8fd" opacity=".9"/>`;
 else if(S=='desert')F+=`<path d="M0 ${H}Q50 ${H-14} 110 ${H-4}T240 ${H-8}V${H}Z" fill="${adj(k.g[0],6)}" opacity=".9"/>`;
 else if(S=='rock')F+=`<path d="M-4 ${H}L8 ${H-14}L30 ${H-10}L44 ${H}Z" fill="${adj(k.g[1],-8)}"/><path d="M196 ${H}L212 ${H-12}L240 ${H-16}L244 ${H}Z" fill="${adj(k.g[1],-12)}"/>`;
 else if(water)F+=`<path d="M0 ${H-6}Q30 ${H-10} 60 ${H-6}T120 ${H-6}T180 ${H-6}T240 ${H-6}V${H}H0Z" fill="${k.g[1]}" opacity=".55"/>`;
 return{D,B,F,hz,k,vg:`<rect width="${W}" height="${H}" fill="url(#${p}vg)"/>`}}

/* ---------- κεφάλι (προφίλ, κοιτάζει δεξιά) ---------- */
function headPts(h){const{cd,cs,sd0,sd1,rm=0,jw=.1,nt=.05,bump=0}=h;
 const top=[[0,-cd*.38],[.09,-cd*.56],[.22,-cd*.6-bump],[cs*.78,-cd*.5+(cd*.5-sd0*.5)*.55-rm*.3],[cs,-sd0*.5-rm*.45],[(cs+1)/2,-(sd0+sd1)/4-rm*.8],[1-nt,-sd1*.5-rm*.3],[1,-sd1*.28]];
 const bot=[[1,sd1*.3],[1-nt,sd1*.5],[(cs+1)/2,(sd0+sd1)/4+.02],[cs*.95,sd0*.5+.03],[cs*.5,cd*.46+jw*.7],[.2,cd*.5+jw],[.07,cd*.36+jw*.4],[0,cd*.08]];
 return top.concat(bot)}
const EARS=L.EAR;
function earD(k,w,h){const pts=(EARS[k]||EARS.round)(w,h);return{d:cr(pts,true),in:cr(pts.map(([x,y])=>[x*.58,y*.62-h*.06]),true)}}

/* ---------- ουρές ---------- */
const TAILS={ /* σημεία σε μονάδες μήκους κορμού· x<0 προς τα πίσω, y>0 προς τα κάτω */
 cat:{p:[[0,0],[-.13,.05],[-.25,.18],[-.28,.36],[-.2,.5]],w:lin(8,6),tip:'round'},
 catup:{p:[[0,0],[-.12,.0],[-.2,-.1],[-.22,-.3]],w:lin(8,6),tip:'round'},
 dog:{p:[[0,0],[-.1,.08],[-.17,.22],[-.18,.4]],w:t=>10+8*Math.sin(Math.PI*Math.min(1,t*1.1))*(1-t*.3)-t*6,tip:'bush'},
 fox:{p:[[0,0],[-.12,.08],[-.22,.2],[-.26,.36]],w:t=>9+14*Math.sin(Math.PI*Math.min(1,t*.95))-t*7,tip:'bush'},
 horse:{p:[[0,0],[-.04,.14],[-.07,.34],[-.07,.52]],w:t=>6+9*Math.sin(Math.PI*t*.8)+t*3,tip:'hair'},
 cow:{p:[[0,0],[-.03,.22],[-.04,.46],[-.03,.62]],w:lin(3.2,2),tip:'tuft'},
 short:{p:[[0,0],[-.05,.01],[-.09,.06]],w:lin(7,3),tip:'round'},
 stub:{p:[[0,0],[-.03,-.01]],w:lin(6,4),tip:'round'},
 flick:{p:[[0,0],[-.03,-.04],[-.06,-.02]],w:lin(8,5),tip:'round'},
 rat:{p:[[0,0],[-.18,.08],[-.34,.1],[-.5,.2],[-.6,.3]],w:lin(4.2,1.4),tip:'round'},
 squirrel:{p:[[0,0],[-.1,-.12],[-.1,-.36],[.02,-.52]],w:t=>6+16*Math.sin(Math.PI*Math.min(1,t*.9)),tip:'bush'},
 beaver:{p:[[0,0],[-.14,.03],[-.3,.04]],w:t=>6+t*28,tip:'flat'},
 kang:{p:[[0,0],[-.2,.08],[-.42,.14],[-.64,.2]],w:lin(22,2.5),tip:'round'},
 lion:{p:[[0,0],[-.04,.2],[-.05,.46],[-.04,.6]],w:lin(4,3),tip:'tuft'},
 long:{p:[[0,0],[-.16,.08],[-.32,.1],[-.46,.2],[-.54,.34]],w:lin(6,3),tip:'round'},
 mink:{p:[[0,0],[-.12,.06],[-.26,.12],[-.34,.22]],w:t=>6+7*Math.sin(Math.PI*Math.min(1,t*.9))-t*3,tip:'bush'},
 ring:{p:[[0,0],[-.18,-.02],[-.34,-.16],[-.4,-.4],[-.3,-.58]],w:lin(8,7),tip:'round'},
 mon:{p:[[0,0],[-.14,.1],[-.3,.12],[-.44,.0],[-.5,-.2]],w:lin(6.5,4.5),tip:'round'},
 tuftdrop:{p:[[0,0],[-.04,.18],[-.07,.34]],w:lin(5,4),tip:'tuft'},
 none:null};

G.__F={W,H,GY,rad,rot,P2,rib,lin,lgr,rgr,scene2,headPts,earD,TAILS};
})(typeof window!=='undefined'?window:globalThis);
