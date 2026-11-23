(()=>{
"use strict";

const __G={};
/* Θηλαστικά · μηχανή πορτραίτων SVG (160×160) — όλα ζωγραφίζονται με κώδικα.
   Κάθε είδος = αρχέτυπο κεφαλιού + χρώματα + σημάδια + εξαρτήματα (κέρατα, χαίτη, κ.λπ.) */
(function(G){
'use strict';
const f=n=>+(+n).toFixed(1),cl=(v,a,b)=>Math.max(a,Math.min(b,v));
/* ---------- τυχαιότητα ---------- */
const hash=s=>{let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const rng=seed=>{let a=seed>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
/* ---------- χρώματα ---------- */
const h2r=h=>{h=h.replace('#','');if(h.length==3)h=h.replace(/./g,'$&$&');const n=parseInt(h,16);return[n>>16,n>>8&255,n&255]};
const r2h=([r,g,b])=>'#'+[r,g,b].map(v=>cl(Math.round(v),0,255).toString(16).padStart(2,'0')).join('');
const toHsl=([r,g,b])=>{r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;if(mx!=mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx==r?(g-b)/d+(g<b?6:0):mx==g?(b-r)/d+2:(r-g)/d+4;h*=60}return[h,s*100,l*100]};
const fromHsl=(h,s,l)=>{h=((h%360)+360)%360;s=cl(s,0,100)/100;l=cl(l,0,100)/100;const a=s*Math.min(l,1-l),k=n=>(n+h/30)%12,t=n=>l-a*Math.max(-1,Math.min(k(n)-3,9-k(n),1));return r2h([t(0)*255,t(8)*255,t(4)*255])};
const adj=(c,dl=0,ds=0,dh=0)=>{const[h,s,l]=toHsl(h2r(c));return fromHsl(h+dh,s+ds,l+dl)};
const mixc=(a,b,t)=>{const A=h2r(a),B=h2r(b);return r2h(A.map((v,i)=>v+(B[i]-v)*t))};
/* ---------- γεωμετρία ---------- */
const cr=(pts,closed)=>{const n=pts.length,g=i=>closed?pts[(i%n+n)%n]:pts[cl(i,0,n-1)];let d=`M${f(pts[0][0])} ${f(pts[0][1])}`;
 for(let i=0,e=closed?n:n-1;i<e;i++){const p0=g(i-1),p1=g(i),p2=g(i+1),p3=g(i+2);
  d+=`C${f(p1[0]+(p2[0]-p0[0])/6)} ${f(p1[1]+(p2[1]-p0[1])/6)} ${f(p2[0]-(p3[0]-p1[0])/6)} ${f(p2[1]-(p3[1]-p1[1])/6)} ${f(p2[0])} ${f(p2[1])}`}
 return d+(closed?'Z':'')};
const sample=(pts,st)=>{const o=[],n=pts.length;for(let i=0;i<n-1;i++){const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(n-1,i+2)];
 for(let s=0;s<st;s++){const t=s/st,t2=t*t,t3=t2*t,c=k=>.5*(2*p1[k]+(-p0[k]+p2[k])*t+(2*p0[k]-5*p1[k]+4*p2[k]-p3[k])*t2+(-p0[k]+3*p1[k]-3*p2[k]+p3[k])*t3);o.push([c(0),c(1)])}}
 o.push(pts[n-1]);return o};
/* κωνική λωρίδα: κέρατα, χαυλιόδοντες, τρίχες χαίτης */
const taper=(pts,w0,w1,st=5,pw=1)=>{const s=sample(pts,st),n=s.length,L=[],Rr=[];
 for(let i=0;i<n;i++){const a=s[Math.max(0,i-1)],b=s[Math.min(n-1,i+1)];let dx=b[0]-a[0],dy=b[1]-a[1];const l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;const t=Math.pow(i/(n-1),pw),w=(w0+(w1-w0)*t)/2;L.push([s[i][0]-dy*w,s[i][1]+dx*w]);Rr.push([s[i][0]+dy*w,s[i][1]-dx*w])}
 return'M'+L.concat(Rr.reverse()).map(p=>f(p[0])+' '+f(p[1])).join('L')+'Z'};
const mir=(sx=1)=>sx;
const sym=half=>{const R=half.map(([dx,y])=>[80+dx,y]),Lf=[];for(let i=half.length-2;i>=1;i--)Lf.push([80-half[i][0],half[i][1]]);return R.concat(Lf)};
const flip=s=>`<g transform="matrix(-1 0 0 1 160 0)">${s}</g>`;
const both=s=>s+flip(s);
const tr=(s,x,y,sc=1,rot=0)=>`<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${f(sc)})">${s}</g>`;

/* ---------- σκηνές (θολό φόντο σαν φωτογραφία) ---------- */
const SC={
 savanna:{s:['#fde7b8','#f1c47f'],far:'#cfa860',mid:'#a9a45a',g:['#cdb06c','#8e7840'],glow:'#fff4cc'},
 steppe:{s:['#e9eed2','#c6d3a2'],far:'#b5bd84',mid:'#98a566',g:['#aebb78','#738048'],glow:'#fffbdb'},
 forest:{s:['#d4e6c5','#94b98c'],far:'#5f8a62',mid:'#3f6c4c',g:['#527d47','#2d4e2c'],glow:'#f7ffd2'},
 jungle:{s:['#c6e3ad','#6fb06b'],far:'#3f8a4e',mid:'#27693a',g:['#3b7b39','#1d4724'],glow:'#fffbb8'},
 bamboo:{s:['#dcecc0','#a9cc84'],far:'#7aa763',mid:'#5b8a4a',g:['#6f9a52','#3f6a34'],glow:'#fffde0'},
 snow:{s:['#e4f0fc','#b9d5ee'],far:'#c9dcef',mid:'#e6f0f9',g:['#f5f9fd','#cddcea'],glow:'#ffffff'},
 mountain:{s:['#d3e3f0','#9fbad3'],far:'#7f97b0',mid:'#6d8768',g:['#8b9b6b','#566a45'],glow:'#fff6dc'},
 desert:{s:['#fadfb3','#ebb273'],far:'#dba96a',mid:'#cf9757',g:['#dab677','#b78a4a'],glow:'#fff1c4'},
 water:{s:['#cbe7ee','#90c3d1'],far:'#5f9cac','mid':'#40808f',g:['#3d7b89','#204f60'],glow:'#ffffff'},
 sea:{s:['#aadcf0','#4ea3c6'],far:'#2f86ad',mid:'#1f6f98',g:['#1c628a','#0d3d63'],glow:'#e9fbff'},
 night:{s:['#35337a','#100f33'],far:'#1d1b4d',mid:'#151339',g:['#1e1c48','#0b0a22'],glow:'#ece6ff'},
 cave:{s:['#4b4a63','#1d1c2c'],far:'#3a3950',mid:'#2b2a3c',g:['#2b2a3a','#141320'],glow:'#c9c6ff'},
 meadow:{s:['#d9ecf7','#a7cfe6'],far:'#8cb57a',mid:'#6fa05c',g:['#7fb064','#4c7e3e'],glow:'#fffde6'},
 rock:{s:['#dcd8d0','#b3aca1'],far:'#9a9387',mid:'#807a6e',g:['#8c8578','#5c574d'],glow:'#fff8e8'},
 tundra:{s:['#dfe9ee','#b6c8d2'],far:'#a8b8a0',mid:'#8fa085',g:['#a7b49a','#6b7a62'],glow:'#fffefa'},
 reed:{s:['#e7efc8','#bccf8c'],far:'#98b06a',mid:'#779648',g:['#6f9650','#3c6034'],glow:'#fffed6'},
 coast:{s:['#c5e2f1','#8dc0da'],far:'#6fa3bb',mid:'#9a8f78',g:['#b9ab8a','#7d7157'],glow:'#ffffff'}
};
function scene(S,R,p){const k=SC[S]||SC.savanna,hz=92+R()*12,D=[],B=[];
 D.push(`<linearGradient id="${p}sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${k.s[0]}"/><stop offset="1" stop-color="${k.s[1]}"/></linearGradient>`,
  `<linearGradient id="${p}gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${k.g[0]}"/><stop offset="1" stop-color="${k.g[1]}"/></linearGradient>`,
  `<radialGradient id="${p}gl"><stop offset="0" stop-color="${k.glow}" stop-opacity=".95"/><stop offset="1" stop-color="${k.glow}" stop-opacity="0"/></radialGradient>`,
  `<radialGradient id="${p}vg" cx=".5" cy=".46" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".42"/></radialGradient>`,
  `<filter id="${p}b6" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter><filter id="${p}b2" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.6"/></filter>`);
 B.push(`<rect width="160" height="160" fill="url(#${p}sk)"/><circle cx="${f(28+R()*60)}" cy="${f(24+R()*20)}" r="64" fill="url(#${p}gl)"/>`);
 const dense=/forest|jungle|bamboo|reed/.test(S);
 let far='';for(let i=0;i<(dense?9:5);i++){const x=R()*170-5,w=22+R()*34;far+=dense?`<ellipse cx="${f(x)}" cy="${f(hz-18+R()*20)}" rx="${f(w*.55)}" ry="${f(30+R()*26)}"/>`:`<ellipse cx="${f(x)}" cy="${f(hz+4)}" rx="${f(w*1.4)}" ry="${f(12+R()*20)}"/>`}
 B.push(`<g fill="${k.far}" opacity=".85" filter="url(#${p}b6)">${far}</g>`);
 let mid='';for(let i=0;i<(dense?6:4);i++)mid+=`<ellipse cx="${f(R()*180-10)}" cy="${f(hz+2+R()*6)}" rx="${f(26+R()*30)}" ry="${f(10+R()*18)}"/>`;
 B.push(`<g fill="${k.mid}" opacity=".9" filter="url(#${p}b6)">${mid}</g><rect y="${f(hz)}" width="160" height="${f(160-hz)}" fill="url(#${p}gr)"/>`);
 let bk='';for(let i=0;i<12;i++){const x=R()*170-5,y=R()*150,r=3+R()*8;bk+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${R()<.6?k.glow:k.far}" opacity="${f(.12+R()*.2)}"/>`}
 B.push(`<g filter="url(#${p}b2)">${bk}</g>`);
 if(S=='night'||S=='cave'){let st='';for(let i=0;i<14;i++)st+=`<circle cx="${f(R()*160)}" cy="${f(R()*80)}" r="${f(.5+R()*.8)}" fill="#fff" opacity="${f(.5+R()*.5)}"/>`;B.push(st)}
 return{D:D.join(''),B:B.join(''),hz,k}}

/* ---------- γούνα (λεπτές τρίχες) ---------- */
function fur(R,o){let a='',b='';const n=o.n|0;
 for(let i=0;i<n;i++){const x=o.x0+R()*(o.x1-o.x0),y=o.y0+R()*(o.y1-o.y0);
  const ang=Math.atan2(y-o.fy,x-o.fx)+(R()-.5)*(o.sp||.8),l=o.len*(.55+R()*.9),ex=x+Math.cos(ang)*l,ey=y+Math.sin(ang)*l+(o.gr||0)*l*.4,cx=x+Math.cos(ang)*l*.5+(R()-.5)*l*.45,cy=y+Math.sin(ang)*l*.5+(R()-.5)*l*.45;
  const s=`M${f(x)} ${f(y)}Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}`;if(R()<(o.lp==null?.5:o.lp))a+=s;else b+=s}
 return`<g fill="none" stroke-linecap="round" stroke-width="${o.lw||.7}"><path d="${a}" stroke="${o.light}" opacity="${o.lo||.4}"/><path d="${b}" stroke="${o.dark}" opacity="${o.do||.38}"/></g>`}

/* ---------- μάτι ---------- */
function eye(cx,cy,r,o,p,col){
 const ir=o.ir||'#6a4720',ry=r*(o.sq||.88);let s='';
 const lidc=col.d,sg=o.sc||null;
 s+=`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(r*1.55)}" ry="${f(r*1.35)}" fill="${col.dk}" opacity=".35" filter="url(#${p}b2)"/>`;
 if(o.pt=='bead'){s+=`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(r)}" ry="${f(r*.95)}" fill="#0c0806"/><circle cx="${f(cx-r*.32)}" cy="${f(cy-r*.36)}" r="${f(r*.3)}" fill="#fff" opacity=".95"/><circle cx="${f(cx+r*.3)}" cy="${f(cy+r*.3)}" r="${f(r*.14)}" fill="#fff" opacity=".5"/>`;return s}
 s+=`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(r*1.08)}" ry="${f(ry*1.08)}" fill="#120b07"/>`;
 if(sg)s+=`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(r)}" ry="${f(ry)}" fill="${sg}"/>`;
 s+=`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(r*(sg?.7:.92))}" ry="${f(ry*(sg?.78:.92))}" fill="url(#${p}ir${o.id||''})"/>`;
 const pu=o.pt||'round';
 if(pu=='v')s+=`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(r*.2)}" ry="${f(ry*.88)}" fill="#050302"/>`;
 else if(pu=='h')s+=`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(r*.62)}" ry="${f(ry*.22)}" fill="#050302"/>`;
 else s+=`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r*.5)}" fill="#050302"/>`;
 s+=`<ellipse cx="${f(cx-r*.34)}" cy="${f(cy-ry*.38)}" rx="${f(r*.26)}" ry="${f(r*.22)}" fill="#fff" opacity=".95"/><circle cx="${f(cx+r*.36)}" cy="${f(cy+ry*.38)}" r="${f(r*.12)}" fill="#fff" opacity=".55"/>`;
 /* βλέφαρο */
 s+=`<path d="M${f(cx-r*1.12)} ${f(cy-ry*.05)}Q${f(cx)} ${f(cy-ry*2.05)} ${f(cx+r*1.12)} ${f(cy-ry*.05)}Q${f(cx)} ${f(cy-ry*1.0)} ${f(cx-r*1.12)} ${f(cy-ry*.05)}Z" fill="${lidc}" class="lid"/>`;
 s+=`<path d="M${f(cx-r*1.1)} ${f(cy-ry*.02)}Q${f(cx)} ${f(cy-ry*1.2)} ${f(cx+r*1.1)} ${f(cy-ry*.02)}" fill="none" stroke="#0d0805" stroke-width="${f(Math.max(.7,r*.2))}" stroke-linecap="round"/>`;
 if(o.lash)s+=`<path d="M${f(cx-r*1.1)} ${f(cy-ry*.3)}l${f(-r*.5)} ${f(-r*.3)}M${f(cx-r*.5)} ${f(cy-ry*.85)}l${f(-r*.25)} ${f(-r*.55)}M${f(cx+r*.2)} ${f(cy-ry*.98)}l${f(r*.05)} ${f(-r*.6)}M${f(cx+r*.9)} ${f(cy-ry*.7)}l${f(r*.35)} ${f(-r*.45)}" stroke="#0d0805" stroke-width=".8" stroke-linecap="round" fill="none"/>`;
 return s}

/* ---------- σχήματα αυτιών (δεξί αυτί, τοπικό σύστημα, βάση στο 0,0) ---------- */
const EAR={
 round:(w,h)=>[[-w*.5,0],[-w*.55,-h*.5],[-w*.2,-h*.95],[w*.3,-h*.95],[w*.58,-h*.5],[w*.5,0]],
 point:(w,h)=>[[-w*.55,0],[-w*.4,-h*.45],[-w*.02,-h],[w*.4,-h*.4],[w*.58,0]],
 tall:(w,h)=>[[-w*.5,0],[-w*.62,-h*.45],[-w*.2,-h*.9],[w*.05,-h],[w*.35,-h*.8],[w*.55,-h*.4],[w*.5,0]],
 leaf:(w,h)=>[[-w*.5,0],[-w*.7,-h*.3],[-w*.55,-h*.7],[0,-h],[w*.5,-h*.7],[w*.65,-h*.3],[w*.5,0]],
 fan:(w,h)=>[[-w*.3,0],[-w*.4,-h*.4],[-w*.1,-h*.85],[w*.4,-h],[w*.85,-h*.7],[w*1,-h*.2],[w*.8,h*.35],[w*.45,h*.8],[w*.15,h*.6],[w*.05,h*.2]],
 drop:(w,h)=>[[-w*.4,0],[-w*.6,h*.3],[-w*.45,h*.8],[0,h],[w*.4,h*.7],[w*.5,h*.2],[w*.4,0]],
 bat:(w,h)=>[[-w*.5,0],[-w*.7,-h*.4],[-w*.45,-h*.95],[-w*.05,-h*1.05],[w*.4,-h*.7],[w*.6,-h*.2],[w*.5,0]]
};
function ear(o,col,p){ /* δεξί αυτί, επιστρέφει σχήμα (θα καθρεφτιστεί) */
 const w=o.w,h=o.h,pts=(EAR[o.k]||EAR.round)(w,h),d=cr(pts,true),ri=o.in||col.in;
 const inner=pts.map(([x,y])=>[x*.58+(o.k=='fan'?w*.12:0),y*.62+(o.k=='drop'?0:-h*.06)]);
 let s=`<g transform="translate(${f(80+o.x)} ${f(o.y)}) rotate(${f(o.r||0)})"><path d="${d}" fill="${o.c||`url(#${p}ear)`}"/>`;
 s+=`<path d="${cr(inner,true)}" fill="${ri}" opacity="${o.io==null?.85:o.io}"/>`;
 if(o.fuzz)s+=`<path d="${cr(inner,true)}" fill="none" stroke="${col.l}" stroke-width="1.2" stroke-dasharray="1 1.4" opacity=".7"/>`;
 if(o.tuft)s+=`<path d="M${f(-w*.1)} ${f(-h*.95)}l${f(-w*.05)} ${f(-h*.42)}M${f(w*.1)} ${f(-h*.98)}l${f(w*.1)} ${f(-h*.4)}M${f(w*.25)} ${f(-h*.85)}l${f(w*.22)} ${f(-h*.3)}" stroke="${col.k}" stroke-width="1.6" stroke-linecap="round"/>`;
 return s+'</g>'}

/* ---------- κέρατα ---------- */
const HORN={ /* σημεία (δεξί κέρατο) από τη βάση 0,0 · [πάχος αρχής, τέλους] */
 lyre:{p:[[0,0],[5,-8],[8,-17],[4,-28],[-1,-35]],w:[3.2,.8],r:7},
 gazelle:{p:[[0,0],[3,-7],[5,-15],[2,-23],[-1,-27]],w:[2.4,.7],r:7},
 straight:{p:[[0,0],[4,-14],[9,-30],[15,-48],[21,-66]],w:[3.2,.6],r:8},
 oryx:{p:[[0,0],[3,-14],[3,-30],[0,-46],[-4,-60]],w:[3.2,.6],r:8},
 spiral:{p:[[0,0],[7,-6],[2,-13],[10,-22],[4,-30],[12,-40],[8,-48]],w:[3.6,.8],r:9},
 sabre:{p:[[0,0],[4,-10],[5,-26],[2,-44],[-5,-58]],w:[3.4,.7],r:6},
 back:{p:[[0,0],[6,-8],[8,-14],[5,-20],[0,-22]],w:[3.4,.8],r:6},
 wilde:{p:[[0,0],[8,2],[14,-4],[16,-14],[12,-22]],w:[4.5,1],r:0},
 ibex:{p:[[0,0],[6,-10],[10,-22],[8,-34],[0,-40]],w:[4.6,1],r:12},
 cow:{p:[[0,0],[8,-2],[15,-8],[19,-18],[18,-27]],w:[4,1],r:0},
 bison:{p:[[0,0],[7,-2],[12,-8],[12,-16],[8,-20]],w:[4.4,1],r:0},
 buffalo:{p:[[0,0],[10,3],[20,0],[26,-9],[24,-19],[17,-22]],w:[7.5,1.2],r:0},
 yak:{p:[[0,0],[9,0],[17,-5],[21,-14],[20,-24]],w:[4.4,1],r:0},
 ram:{p:[[0,0],[8,-4],[13,2],[12,12],[5,15],[1,9],[5,5]],w:[7,1.6],r:10},
 goat:{p:[[0,0],[5,-8],[9,-15],[11,-24],[8,-31]],w:[3.4,.9],r:8},
 markhor:{p:[[0,0],[4,-8],[0,-15],[6,-22],[1,-29],[7,-36],[3,-42]],w:[3.4,.8],r:9},
 chamois:{p:[[0,0],[1,-10],[3,-18],[8,-22],[11,-18]],w:[2.6,.8],r:5},
 takin:{p:[[0,0],[10,2],[18,-4],[20,-12],[16,-16]],w:[6,1.2],r:2},
 pronghorn:{p:[[0,0],[3,-10],[3,-20],[-2,-28],[-5,-27]],w:[3.6,.9],r:6},
 spike:{p:[[0,0],[1,-6],[2,-13]],w:[2.2,.6],r:0},
 ossicone:{p:[[0,0],[1,-9],[1,-15]],w:[3.4,2.6],r:0},
 musk:{p:[[0,0],[10,6],[18,10],[24,2],[24,-8]],w:[8,1.4],r:0}
};
function horn(o,col,p){const H=HORN[o.k];if(!H)return'';const sc=o.s||1;let s='';
 const d=taper(H.p.map(([x,y])=>[x*sc,y*sc]),H.w[0]*sc,H.w[1]*sc,5);
 s+=`<g transform="translate(${f(80+o.x)} ${f(o.y)}) rotate(${f(o.rot||0)})"><path d="${d}" fill="url(#${p}hn)" stroke="${col.hk}" stroke-width=".5"/>`;
 if(H.r){const sp=sample(H.p.map(([x,y])=>[x*sc,y*sc]),5);let rings='';for(let i=2;i<sp.length-3;i+=Math.max(2,H.r>9?2:3)){const a=sp[i-1],b=sp[i+1],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,w=(H.w[0]+(H.w[1]-H.w[0])*i/sp.length)*sc*.55;rings+=`M${f(sp[i][0]-dy/l*w)} ${f(sp[i][1]+dx/l*w)}L${f(sp[i][0]+dy/l*w)} ${f(sp[i][1]-dx/l*w)}`}
  s+=`<path d="${rings}" stroke="${col.hk}" stroke-width=".7" opacity=".6" fill="none"/>`}
 return s+'</g>'}

/* κεραίες ελαφιών: ραβδί + διακλαδώσεις */
function antler(o,col,p){const sc=o.s||1,ty=o.t||'tines';let s='';const col1=col.an||'#8a6a45';
 const br=(pts,w0,w1)=>`<path d="${taper(pts.map(([x,y])=>[x*sc,y*sc]),w0*sc,w1*sc,4)}" fill="${col1}" stroke="${adj(col1,-18)}" stroke-width=".4"/>`;
 let a='';
 if(ty=='tines'){a=br([[0,0],[4,-9],[9,-20],[10,-32],[6,-44]],3,1)+br([[5,-10],[12,-14],[17,-24]],2,.7)+br([[9,-22],[16,-27],[20,-37]],1.8,.6)+br([[10,-32],[3,-38],[-1,-47]],1.6,.6)+br([[2,-4],[0,-10],[-3,-17]],1.8,.6)}
 else if(ty=='palm'){a=`<path d="M0 0Q8 -6 14 -18Q22 -24 28 -20L30 -28L25 -32L24 -40L18 -38L14 -46L8 -38L6 -26Q3 -12 0 0Z" fill="${col1}" stroke="${adj(col1,-18)}" stroke-width=".5"/>`+br([[2,-2],[4,-8],[2,-14]],2,.8)}
 else if(ty=='reindeer'){a=br([[0,0],[3,-12],[10,-26],[16,-40],[14,-54]],3,1)+br([[3,-14],[11,-20],[14,-26]],2,.8)+br([[10,-26],[18,-28],[24,-36],[26,-44]],2,.8)+br([[0,-6],[6,-10],[9,-3]],2.4,1)+br([[14,-42],[22,-48],[24,-56]],1.8,.6)}
 else if(ty=='fork'){a=br([[0,0],[2,-10],[6,-22],[4,-32]],2.8,.9)+br([[4,-14],[10,-20],[12,-30]],2,.7)}
 else if(ty=='spike'){a=br([[0,0],[1,-8],[3,-17]],2.4,.7)}
 return`<g transform="translate(${f(80+o.x)} ${f(o.y)}) rotate(${f(o.rot||0)})">${a}</g>`}

/* ---------- σημάδια (κόβονται πάνω στο κεφάλι) ---------- */
function marks(list,R,col,A,p){let s='';
 for(const m of list){const k=typeof m=='string'?m:m.k,c=(m&&m.c)||col.k;
  if(k=='tiger'){const S=[[[0,24],[0,38],[0,52]],[[11,25],[13,38],[9,52]],[[22,31],[24,42],[18,56]],[[44,60],[34,63],[27,72]],[[44,73],[35,77],[27,86]],[[42,87],[34,89],[27,97]],[[38,100],[32,100],[26,104]],[[33,40],[34,48],[31,56]]];
   s+=both(S.map(q=>`<path d="${taper(q.map(a=>[80+a[0],a[1]]),4.2,.6,5)}" fill="${c}" opacity=".92"/>`).join(''))}
  else if(k=='zebra'){let z='';const ys=[[0,10],[11,12],[21,13],[30,12],[38,11]];for(const[x,w]of ys)z+=`<path d="${taper([[80+x,10],[80+x+1.5,40],[80+x+2.5,70],[80+x+1.5,100],[80+x*.6,134]],w*.34,w*.2,6)}" fill="${c}" opacity=".95"/>`;
   for(let i=0;i<5;i++)z+=`<path d="${taper([[80+24+i*1.2,46+i*13],[80+18,50+i*13],[80+10,52+i*13]],4,1,4)}" fill="${c}" opacity=".9"/>`;s+=both(z)}
  else if(k=='okapi'){let z='';for(let i=0;i<7;i++)z+=`<path d="${taper([[80+34,86+i*9],[80+24,88+i*9],[80+12,92+i*9]],3.4,1,4)}" fill="${c}" opacity=".85"/>`;s+=both(z)}
  else if(k=='spots'||k=='rosette'||k=='dots'||k=='wspots'){const n=m.n||34,rg=m.r||[2,3.6];
   for(let i=0;i<n;i++){const x=20+R()*120,y=(m.y0||26)+R()*((m.y1||112)-(m.y0||26)),r=rg[0]+R()*(rg[1]-rg[0]);
    if(k=='rosette')s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="${c}" stroke-width="${f(r*.55)}" opacity=".85"/>`+(m.core?`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r*.28)}" fill="${c}" opacity=".9"/>`:'');
    else s+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r)}" ry="${f(r*(.7+R()*.4))}" fill="${c}" opacity="${k=='wspots'?.8:.85}"/>`}}
  else if(k=='tears'){s+=both(`<path d="${taper([[80+18,70],[80+17,82],[80+20,94],[80+24,102]],3.2,1.2,5)}" fill="${c}"/>`)}
  else if(k=='mask'){s+=`<path d="M${80-40} 60Q${80-22} 52 80 62Q${80+22} 52 ${80+40} 60Q${80+36} 80 ${80+20} 82Q${80+8} 74 80 78Q${80-8} 74 ${80-20} 82Q${80-36} 80 ${80-40} 60Z" fill="${c}" opacity=".95"/>`}
  else if(k=='eyepatch'){s+=both(`<ellipse cx="${80+(m.x||19)}" cy="${m.y||66}" rx="${m.w||9}" ry="${m.h||12}" transform="rotate(${m.rot||-25} ${80+(m.x||19)} ${m.y||66})" fill="${c}"/>`)}
  else if(k=='ringeye'){s+=both(`<path d="M${80+(m.x||17)-9} ${(m.y||66)-3}Q${80+(m.x||17)} ${(m.y||66)-12} ${80+(m.x||17)+9} ${(m.y||66)-2}Q${80+(m.x||17)+12} ${(m.y||66)+7} ${80+(m.x||17)+3} ${(m.y||66)+9}Q${80+(m.x||17)-8} ${(m.y||66)+8} ${80+(m.x||17)-9} ${(m.y||66)-3}Z" fill="${c}" opacity=".95"/>`)}
  else if(k=='blaze'){s+=`<path d="${taper([[80,m.y0||14],[80,(m.y0||14)+40],[80,(m.y1||110)]],m.w0||5,m.w1||11,6)}" fill="${m.c||'#f4efe6'}" opacity=".95"/>`}
  else if(k=='cheek'){s+=both(`<ellipse cx="${80+(m.x||26)}" cy="${m.y||88}" rx="${m.w||14}" ry="${m.h||11}" fill="${m.c||col.m}" opacity="${m.o||.9}" filter="url(#${p}b2)"/>`)}
  else if(k=='brow'){s+=both(`<path d="M${80+4} ${(m.y||54)}Q${80+16} ${(m.y||54)-5} ${80+28} ${(m.y||54)+2}" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>`)}
  else if(k=='gstripe'){s+=both(`<path d="${taper([[80+(m.x0||13),m.y0||62],[80+(m.x1||12),(m.y0||62)+22],[80+(m.x1||12),m.y1||110]],m.w||2.4,m.w||2.4,4)}" fill="${c}" opacity=".9"/>`)}
  else if(k=='fpatch'){s+=`<path d="M${80-(m.w||15)} ${m.y0||26}Q80 ${(m.y0||26)-8} ${80+(m.w||15)} ${m.y0||26}Q${80+(m.w||15)-3} ${m.y1||60} 80 ${(m.y1||60)+12}Q${80-(m.w||15)+3} ${m.y1||60} ${80-(m.w||15)} ${m.y0||26}Z" fill="${c}" opacity="${m.o||.85}" filter="url(#${p}b2)"/>`}
  else if(k=='band'){s+=`<rect x="0" y="${m.y}" width="160" height="${m.h}" fill="${c}" opacity="${m.o||.85}"/>`}
  else if(k=='scales'){let sc='';const w=m.w||9;for(let r=0;r<10;r++)for(let q=-8;q<8;q++){const x=80+q*w+(r%2?w/2:0),y=20+r*w*.78;sc+=`<path d="M${f(x-w/2)} ${f(y)}Q${f(x)} ${f(y+w*.9)} ${f(x+w/2)} ${f(y)}" />`}
   s+=`<g fill="none" stroke="${c}" stroke-width=".9" opacity=".7">${sc}</g>`}
  else if(k=='bands'){let b='';for(let i=0;i<m.n;i++)b+=`<rect x="0" y="${f(m.y0+i*(m.gap||12))}" width="160" height="${m.h||4}" fill="${c}" opacity=".5"/>`;s+=b}
 }
 return s}

/* ---------- μύτη ---------- */
function nose(o,col,p){const y=o.y,s=o.s||1,c=o.c||col.n,hi='#ffffff';let r='';
 const hl=(x,yy,rx,ry,op)=>`<ellipse cx="${f(x)}" cy="${f(yy)}" rx="${f(rx)}" ry="${f(ry)}" fill="${hi}" opacity="${op}"/>`;
 switch(o.k){
 case'cat':r=`<path d="M${80-5.5*s} ${y-3*s}Q80 ${y-5.5*s} ${80+5.5*s} ${y-3*s}Q${80+4.5*s} ${y+3.5*s} 80 ${y+5.5*s}Q${80-4.5*s} ${y+3.5*s} ${80-5.5*s} ${y-3*s}Z" fill="${c}"/>${hl(80-1.5*s,y-2.4*s,2.4*s,1,.55)}<path d="M80 ${y+5*s}v${5*s}M80 ${y+10*s}q${-6*s} ${5*s} ${-12*s} ${1*s}M80 ${y+10*s}q${6*s} ${5*s} ${12*s} ${1*s}" stroke="${col.dk}" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".85"/>`;break;
 case'dog':r=`<path d="M${80-8*s} ${y-3*s}Q80 ${y-8*s} ${80+8*s} ${y-3*s}Q${80+8*s} ${y+4*s} 80 ${y+7*s}Q${80-8*s} ${y+4*s} ${80-8*s} ${y-3*s}Z" fill="${c}"/>${hl(80-2.5*s,y-4*s,4*s,1.4*s,.5)}<path d="M${80-5.5*s} ${y-.5*s}q${-2*s} ${2*s} ${.6*s} ${3.2*s}M${80+5.5*s} ${y-.5*s}q${2*s} ${2*s} ${-.6*s} ${3.2*s}" stroke="#000" stroke-width="1.2" fill="none" opacity=".75"/><path d="M80 ${y+7*s}v${7*s}" stroke="${col.dk}" stroke-width="1" opacity=".7"/>`;break;
 case'bear':r=`<ellipse cx="80" cy="${y}" rx="${9*s}" ry="${6.5*s}" fill="${c}"/>${hl(80-3*s,y-3*s,4.6*s,1.5*s,.45)}<path d="M${80-5*s} ${y+1*s}q${-1.5*s} ${2*s} ${.6*s} ${3*s}M${80+5*s} ${y+1*s}q${1.5*s} ${2*s} ${-.6*s} ${3*s}" stroke="#000" stroke-width="1.1" fill="none" opacity=".7"/><path d="M80 ${y+6*s}v${5*s}" stroke="${col.dk}" stroke-width="1" opacity=".6"/>`;break;
 case'hoof':r=`<g><ellipse cx="${80-6.5*s}" cy="${y}" rx="${3.2*s}" ry="${4.6*s}" transform="rotate(25 ${80-6.5*s} ${y})" fill="${c}"/><ellipse cx="${80+6.5*s}" cy="${y}" rx="${3.2*s}" ry="${4.6*s}" transform="rotate(-25 ${80+6.5*s} ${y})" fill="${c}"/></g><path d="M${80-8*s} ${y+11*s}Q80 ${y+14*s} ${80+8*s} ${y+11*s}" stroke="${col.dk}" stroke-width="1" fill="none" opacity=".6"/>`;break;
 case'bull':r=`<ellipse cx="80" cy="${y}" rx="${15*s}" ry="${9*s}" fill="${o.mc||col.m}"/>${hl(80-4*s,y-4*s,8*s,2*s,.4)}<ellipse cx="${80-6.5*s}" cy="${y}" rx="${2.6*s}" ry="${4*s}" fill="${c}" transform="rotate(20 ${80-6.5*s} ${y})"/><ellipse cx="${80+6.5*s}" cy="${y}" rx="${2.6*s}" ry="${4*s}" fill="${c}" transform="rotate(-20 ${80+6.5*s} ${y})"/>`;break;
 case'pig':r=`<ellipse cx="80" cy="${y}" rx="${12*s}" ry="${9.5*s}" fill="${o.mc||'#d99a9a'}"/><ellipse cx="80" cy="${y}" rx="${12*s}" ry="${9.5*s}" fill="none" stroke="${adj(o.mc||'#d99a9a',-14)}" stroke-width="1.4"/>${hl(80-3*s,y-4*s,5*s,1.8*s,.4)}<ellipse cx="${80-4.2*s}" cy="${y}" rx="${2*s}" ry="${3*s}" fill="#3d1f1f"/><ellipse cx="${80+4.2*s}" cy="${y}" rx="${2*s}" ry="${3*s}" fill="#3d1f1f"/>`;break;
 case'rod':r=`<path d="M${80-3.4*s} ${y-2*s}Q80 ${y-4.6*s} ${80+3.4*s} ${y-2*s}Q${80+2.6*s} ${y+2.4*s} 80 ${y+3.4*s}Q${80-2.6*s} ${y+2.4*s} ${80-3.4*s} ${y-2*s}Z" fill="${c}"/>${hl(80-1*s,y-2.5*s,1.4*s,.7,.6)}<path d="M80 ${y+3*s}v${3*s}" stroke="${col.dk}" stroke-width=".8" opacity=".7"/>`;break;
 case'prim':r=`<path d="M${80-4.2*s} ${y}q${1.5*s} ${-2.4*s} ${3*s} ${.4*s}M${80+4.2*s} ${y}q${-1.5*s} ${-2.4*s} ${-3*s} ${.4*s}" stroke="${col.dk}" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".85"/>`;break;
 case'wet':r=`<ellipse cx="80" cy="${y}" rx="${6*s}" ry="${4.4*s}" fill="${c}"/>${hl(80-2*s,y-2*s,2.6*s,1.1*s,.55)}<ellipse cx="${80-2.4*s}" cy="${y+.6*s}" rx="${1*s}" ry="${1.5*s}" fill="#000" opacity=".65"/><ellipse cx="${80+2.4*s}" cy="${y+.6*s}" rx="${1*s}" ry="${1.5*s}" fill="#000" opacity=".65"/>`;break;
 case'slit':r=`<path d="M${80-6*s} ${y-1*s}q${2*s} ${-3.4*s} ${4*s} ${.5*s}M${80+6*s} ${y-1*s}q${-2*s} ${-3.4*s} ${-4*s} ${.5*s}" stroke="${c}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;break;
 case'snout':r=`<ellipse cx="80" cy="${y}" rx="${5*s}" ry="${3.4*s}" fill="${c}"/>${hl(80-1.5*s,y-1.4*s,2*s,.9,.55)}`;break;
 default:break}
 return r}
/* ---------- στόμα ---------- */
function mouth(o,col){const y=o.y,w=o.w||9;if(!o.k||o.k=='none')return'';
 if(o.k=='cat')return'';
 if(o.k=='line')return`<path d="M${80-w} ${y}Q80 ${y+(o.d||3)} ${80+w} ${y}" stroke="${col.dk}" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".8"/>`;
 if(o.k=='smile')return`<path d="M${80-w} ${y-1}Q80 ${y+(o.d||5)} ${80+w} ${y-1}" stroke="#2a1410" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".85"/>`;
 if(o.k=='open')return`<path d="M${80-w} ${y}Q80 ${y+w*1.4} ${80+w} ${y}Q80 ${y+1.5} ${80-w} ${y}Z" fill="#5a1f22"/><path d="M${80-w*.7} ${y+w*.7}Q80 ${y+w*1.2} ${80+w*.7} ${y+w*.7}Q80 ${y+w*.3} ${80-w*.7} ${y+w*.7}Z" fill="#c86a6a" opacity=".85"/>`;
 return''}
function whiskers(o,col){let s='';const n=o.n||3,len=o.l||26,y=o.y,x=o.x||9,c=o.c||'#fff';
 for(let i=0;i<n;i++){const dy=(i-(n-1)/2)*(o.g||4.2),ex=len,ey=dy*2.1+(o.dr||3);
  s+=`<path d="M${80+x} ${y+dy}Q${80+x+ex*.55} ${y+dy+ey*.25-(o.up||2)} ${80+x+ex} ${y+ey}" />`}
 return both(`<g fill="none" stroke="${c}" stroke-width="${o.w||.6}" stroke-linecap="round" opacity="${o.op||.75}">${s}</g>`)}

/* ---------- χαίτη / αναδρομικά τριχώματα ---------- */
function mane(o,R,col,p){let s='';const cx=o.cx||80,cy=o.cy||76,n=o.n||80,A0=(o.a0==null?0:o.a0)*Math.PI,A1=(o.a1==null?2:o.a1)*Math.PI;
 const cols=[o.c1||col.m1,o.c2||col.m2,o.c3||col.m3];
 for(let i=0;i<n;i++){const a=A0+(A1-A0)*(i/Math.max(1,n-1))+(R()-.5)*(A1-A0)/n*1.6,r0=(o.r0||26)+R()*6,r1=(o.r1||58)+R()*(o.rv||14),
  x0=cx+Math.cos(a)*r0*(o.sx||1),y0=cy+Math.sin(a)*r0*(o.sy||1),a2=a+(R()-.5)*.35+(o.curl||0),x1=cx+Math.cos(a2)*r1*(o.sx||1),y1=cy+Math.sin(a2)*r1*(o.sy||1)+(o.gr||0)*r1;
  const mx=(x0+x1)/2+(R()-.5)*8,my=(y0+y1)/2+(R()-.5)*8;
  s+=`<path d="${taper([[x0,y0],[mx,my],[x1,y1]],o.w||5,.8,4)}" fill="${cols[(R()*3)|0]}" opacity="${f(.95-R()*.2)}"/>`}
 return s}
/* θαμπή γούνα στο περίγραμμα */
function fuzz(pts,R,o,col){let s='';const sp=sample(pts.concat([pts[0]]),Math.max(1,Math.round((o.n||60)/pts.length)+1)),cx=80,cy=o.cy||80;
 for(let i=0;i<sp.length;i+=1){const[x,y]=sp[i];if(o.top&&y>(o.top||999))continue;let nx=x-cx,ny=(y-cy)*.9,l=Math.hypot(nx,ny)||1;nx/=l;ny/=l;const len=(o.len||5)*(.6+R()*.9),ang=(R()-.5)*.8,dx=nx*Math.cos(ang)-ny*Math.sin(ang),dy=nx*Math.sin(ang)+ny*Math.cos(ang);
  s+=`<path d="${taper([[x-dx*2,y-dy*2],[x+dx*len*.5+(R()-.5)*1.5,y+dy*len*.5+(o.gr||.15)*len*.3],[x+dx*len,y+dy*len+(o.gr||.15)*len*.5]],o.w||3,.3,3)}" fill="${R()<.5?col.b:col.d}" opacity=".95"/>`}
 return s}

/* ---------- αρχέτυπα κεφαλιού ---------- */
const H={ /* δεξιό μισό περίγραμμα [dx,y] από κορυφή ως πηγούνι */
 cat:[[0,26],[17,28],[32,40],[40,58],[42,76],[40,92],[32,107],[18,116],[0,120]],
 cheetah:[[0,28],[15,30],[28,42],[34,60],[34,76],[30,92],[22,106],[12,116],[0,120]],
 lynx:[[0,28],[16,30],[30,42],[37,60],[40,78],[38,94],[28,108],[15,117],[0,121]],
 canid:[[0,26],[14,28],[27,38],[35,54],[37,70],[31,84],[22,95],[15,106],[12,120],[7,130],[0,133]],
 fox:[[0,28],[14,30],[26,40],[32,56],[32,70],[26,83],[18,95],[11,108],[8,122],[4,130],[0,132]],
 bear:[[0,30],[19,31],[33,42],[40,60],[41,80],[35,98],[22,110],[0,115]],
 panda:[[0,28],[20,29],[36,40],[43,58],[44,78],[38,98],[24,110],[0,115]],
 horse:[[0,10],[13,12],[21,24],[25,44],[26,66],[23,90],[20,108],[21,124],[17,137],[0,142]],
 antel:[[0,16],[13,18],[21,30],[24,48],[24,68],[20,92],[16,108],[17,122],[12,132],[0,136]],
 deer:[[0,16],[13,18],[22,32],[25,50],[24,70],[19,92],[14,108],[14,122],[10,132],[0,136]],
 cow:[[0,24],[18,22],[29,32],[32,52],[31,76],[27,98],[25,112],[24,126],[16,134],[0,136]],
 goat:[[0,22],[14,22],[24,34],[27,54],[25,76],[20,98],[16,112],[16,126],[10,134],[0,137]],
 camel:[[0,18],[13,20],[22,32],[26,50],[25,70],[20,90],[20,108],[20,122],[12,131],[0,133]],
 giraffe:[[0,16],[11,18],[20,30],[23,48],[22,68],[17,90],[14,106],[15,122],[10,132],[0,136]],
 pig:[[0,36],[20,38],[33,50],[38,70],[34,92],[27,106],[22,118],[0,130]],
 elephant:[[0,14],[20,14],[34,26],[38,46],[34,70],[24,88],[16,104],[11,128],[8,146],[0,152]],
 rhino:[[0,22],[18,22],[30,34],[34,56],[33,80],[29,102],[26,118],[18,130],[0,134]],
 hippo:[[0,40],[26,40],[40,54],[44,76],[42,100],[32,118],[18,128],[0,132]],
 tapir:[[0,22],[16,22],[28,34],[32,54],[30,78],[24,98],[18,114],[14,128],[8,136],[0,140]],
 ape:[[0,24],[17,25],[30,36],[36,54],[36,72],[33,90],[26,104],[15,114],[0,118]],
 monkey:[[0,30],[16,31],[27,42],[32,58],[32,74],[27,90],[18,102],[10,110],[0,113]],
 baboon:[[0,28],[15,30],[27,42],[32,58],[29,76],[22,92],[16,108],[14,122],[9,132],[0,134]],
 lemur:[[0,34],[14,35],[26,46],[31,62],[29,78],[22,94],[14,108],[8,118],[0,122]],
 rodent:[[0,36],[16,38],[30,50],[37,68],[37,86],[30,102],[18,112],[0,116]],
 cavy:[[0,34],[17,36],[30,48],[36,66],[35,88],[30,106],[20,118],[0,122]],
 rabbit:[[0,38],[15,40],[27,52],[32,68],[31,88],[25,104],[15,114],[0,118]],
 mustel:[[0,34],[15,35],[28,46],[34,62],[34,80],[28,96],[18,106],[0,112]],
 hog:[[0,32],[15,33],[28,44],[34,60],[33,80],[26,98],[16,112],[10,126],[0,130]],
 round:[[0,34],[17,35],[31,46],[38,64],[38,84],[32,102],[19,113],[0,117]],
 seal:[[0,30],[18,31],[32,42],[38,60],[37,80],[32,98],[20,110],[0,116]],
 koala:[[0,32],[18,33],[32,44],[38,62],[38,82],[32,100],[20,112],[0,118]],
 roo:[[0,22],[13,24],[22,36],[26,54],[25,74],[20,92],[14,108],[11,122],[6,130],[0,132]],
 snout:[[0,36],[13,37],[24,48],[28,62],[26,80],[20,98],[12,116],[6,132],[0,140]],
 tube:[[0,22],[16,24],[27,38],[30,56],[26,76],[18,96],[10,114],[6,134],[0,146]]
};

const ARCH={
 cat:{h:'cat',ear:{k:'round',x:31,y:36,w:17,h:16,r:12,in:'#e9b3a6'},eye:{x:18,y:66,r:5.1,pt:'v'},nose:{k:'cat',y:92},muz:{lobes:[[-8,100,11,8.5],[8,100,11,8.5],[0,112,10,6.5]]},wh:{y:98,n:4,x:10,l:30},fur:{n:420,len:4,lw:.7},fz:{n:90,len:5,w:3.2},neck:[30,58,60]},
 canid:{h:'canid',ear:{k:'point',x:24,y:34,w:20,h:27,r:8,in:'#d8a79a'},eye:{x:15,y:63,r:4.3,pt:'round'},nose:{k:'dog',y:127,s:1},muz:{y:108,w:14,h:26},fur:{n:420,len:4.5,lw:.7},fz:{n:90,len:5,w:3.2},mouthp:{k:'line',y:133,w:7},wh:{y:120,n:3,x:12,l:18,op:.5},neck:[26,52,64]},
 bear:{h:'bear',ear:{k:'round',x:33,y:36,w:17,h:16,in:'#7a5a45'},eye:{x:19,y:66,r:3.3,pt:'bead'},nose:{k:'bear',y:92,s:1.05},muz:{y:99,w:19,h:16},fur:{n:420,len:4.5,lw:.8},fz:{n:90,len:5,w:3.4},mouthp:{k:'line',y:106,w:7},neck:[38,64,68]},
 horse:{h:'horse',ear:{k:'tall',x:14,y:18,w:11,h:22,r:6,in:'#c98f80'},eye:{x:24,y:56,r:5.6,pt:'round',ir:'#5a3b1e'},nose:{k:'hoof',y:128,s:1.1},muz:{y:124,w:16,h:20},fur:{n:200,len:3,lw:.6},mouthp:{k:'line',y:137,w:8},neck:[21,42,60]},
 antel:{h:'antel',ear:{k:'leaf',x:25,y:40,w:13,h:22,r:62,in:'#d9a89a'},eye:{x:21,y:56,r:5,pt:'h',ir:'#7a5424'},nose:{k:'hoof',y:128,s:.95},muz:{y:124,w:13,h:17},fur:{n:240,len:3,lw:.6},mouthp:{k:'line',y:134,w:6},neck:[19,32,64]},
 cow:{h:'cow',ear:{k:'leaf',x:31,y:46,w:14,h:22,r:75,in:'#e0b0a5'},eye:{x:26,y:52,r:5.2,pt:'round',ir:'#4a3018'},nose:{k:'bull',y:124,s:1},muz:{y:122,w:20,h:15},fur:{n:240,len:3,lw:.6},mouthp:{k:'none'},neck:[28,46,64]}
};
G.__ARCH={H,ARCH};
G.__lib={f,cl,hash,rng,adj,mixc,cr,taper,sample,sym,flip,both,tr,scene,fur,eye,ear,horn,antler,marks,nose,mouth,whiskers,mane,fuzz,EAR,HORN,SC};
})(__G);

/* render: σύνθεση πορτραίτου από προδιαγραφή (spec) */
(function(G){
'use strict';
const L=G.__lib,{f,cl,hash,rng,adj,mixc,cr,taper,sample,sym,flip,both,tr,scene,fur,eye,ear,horn,antler,marks,nose,mouth,whiskers,mane,fuzz}=L,{H,ARCH}=G.__ARCH;
const merge=(a,b)=>{const o=Object.assign({},a);for(const k in b){const v=b[k];o[k]=v&&typeof v=='object'&&!Array.isArray(v)&&a&&a[k]&&typeof a[k]=='object'&&!Array.isArray(a[k])?merge(a[k],v):v}return o};

/* εξαρτήματα: επιστρέφουν {b:πίσω στρώση, m:μετά το κεφάλι (πάνω από γούνα), f:μπροστά στρώση} */
const X={
 tusks(c,o){const s=o.s||1;let b=`<path d="${taper([[80+(o.x||14),(o.y||122)],[80+(o.x||14)+5*s,(o.y||122)-3*s],[80+(o.x||14)+9*s,(o.y||122)-13*s]],3.4*s,.9,4)}" fill="#f1e9d2" stroke="#c9bd9b" stroke-width=".4"/>`;return{f:both(b)}},
 trunk(c,o){const w=o.w||26;return{m:`<path d="M${80-w/2} 78C${80-w/2-2} 104 ${80-w*.3} 134 ${80-w*.34} 158L${80+w*.34} 158C${80+w*.3} 134 ${80+w/2+2} 104 ${80+w/2} 78Z" fill="url(#${c.p}hd)"/><path d="${[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>`M${80-w*.5+i*.4} ${88+i*6}Q80 ${92+i*6} ${80+w*.5-i*.4} ${88+i*6}`).join('')}" stroke="${c.col.d}" stroke-width=".8" fill="none" opacity=".35"/><ellipse cx="${80-w*.14}" cy="${100}" rx="${w*.12}" ry="26" fill="${c.col.l}" opacity=".3" filter="url(#${c.p}b2)"/>`}},
 beard(c,o){return{f:`<path d="M${80-6} ${o.y||128}Q80 ${(o.y||128)+22} ${80+6} ${o.y||128}Q80 ${(o.y||128)+6} ${80-6} ${o.y||128}Z" fill="${o.c||c.col.d}"/>`}},
 forelock(c,o){let s='';const R=c.R;for(let i=0;i<14;i++){const x=80+(R()-.5)*(o.w||22),y=o.y||14;s+=`<path d="${taper([[x,y-2],[x+(R()-.5)*8,y+8],[x+(R()-.5)*10,y+(o.l||26)]],3.6,.5,4)}" fill="${o.c||c.col.m1}" opacity=".92"/>`}return{f:s}},
 topknot(c,o){let s='';const R=c.R;for(let i=0;i<(o.n||26);i++){const a=Math.PI*(1.08+R()*.84),r=R()*(o.r||18);const x=80+Math.cos(a)*r*1.4,y=(o.y||24)+Math.sin(a)*r*.7;s+=`<path d="${taper([[x,y+4],[x+(R()-.5)*6,y-8],[x+(R()-.5)*9,y-(o.l||16)-R()*8]],3.4,.5,3)}" fill="${o.c||c.col.m1}" opacity=".95"/>`}return{f:s}},
 quills(c,o){let s='';const R=c.R;for(let i=0;i<(o.n||46);i++){const a=Math.PI*(1.02+R()*.96),r=(o.r||44)+R()*8,x=80+Math.cos(a)*r*(o.sx||1),y=(o.cy||78)+Math.sin(a)*r*(o.sy||.95),l=(o.l||22)+R()*10;s+=`<path d="${taper([[x,y],[x+Math.cos(a)*l,y+Math.sin(a)*l]],3,.3,2)}" fill="${i%3?c.col.d:o.c2||'#e9e2cf'}" stroke="${c.col.dk}" stroke-width=".3"/>`}return{b:s}},
 ruff(c,o){return{b:mane(Object.assign({r0:26,r1:46,rv:10,n:70,w:5,sy:.9},o.m||{}),c.R,c.col,c.p)}},
 shell(c,o){return{}},
 bill(c,o){return{f:`<path d="M${80-26} 98Q80 86 ${80+26} 98Q${80+30} 120 80 128Q${80-30} 120 ${80-26} 98Z" fill="#3a3f46"/><ellipse cx="${80-8}" cy="106" rx="2.2" ry="1.4" fill="#111"/><ellipse cx="${80+8}" cy="106" rx="2.2" ry="1.4" fill="#111"/><path d="M${80-20} 104Q80 92 ${80+20} 104" stroke="#8a9098" stroke-width=".8" fill="none" opacity=".6"/>`}},
 glasses(c,o){return{}}
};

G.__X=X;
function render(spec,seedStr){
 const seed=hash(seedStr||spec.a),R=rng(seed),p='p'+(seed%46656).toString(36)+'_';
 const A=merge(ARCH[spec.a]||ARCH.cat,spec.o||{}),C=spec.c||['#c8a070','#e6cfa4','#8a6a3e'];
 const b=C[0],l=C[1]||adj(b,18),d=C[2]||adj(b,-18);
 const col={b,l,d,dk:adj(d,-18),k:C[7]||adj(d,-24),m:C[3]||l,n:C[4]||'#2a1a16',in:C[5]||adj(b,12,-10,-6),hk:adj(spec.hc||'#6a5a48',-18),m1:C[8]||d,m2:C[9]||b,m3:C[10]||adj(d,-12),an:spec.an};
 const S=scene(spec.s||'savanna',R,p);
 if(A.kind&&G.__SPECIAL&&G.__SPECIAL[A.kind])return G.__SPECIAL[A.kind](spec,A,{R,p,S,col,seed,defs:S.D});
 const hp=sym(A.hd?A.hd:H[A.h]),dy=A.dy||0,hs=A.hs||1;
 const pts=hp.map(([x,y])=>[80+(x-80)*hs,y+dy]);
 const headD=cr(pts,true);
 let defs=S.D;
 defs+=`<radialGradient id="${p}hd" cx=".42" cy=".3" r=".78"><stop offset="0" stop-color="${l}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${d}"/></radialGradient>`;
 defs+=`<linearGradient id="${p}nk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b}"/><stop offset="1" stop-color="${d}"/></linearGradient>`;
 defs+=`<linearGradient id="${p}ear" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${adj(b,6)}"/><stop offset="1" stop-color="${d}"/></linearGradient>`;
 defs+=`<radialGradient id="${p}ir" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="${adj(A.eye.ir||'#7a5a2a',22)}"/><stop offset=".55" stop-color="${A.eye.ir||'#7a5a2a'}"/><stop offset="1" stop-color="${adj(A.eye.ir||'#7a5a2a',-24)}"/></radialGradient>`;
 defs+=`<linearGradient id="${p}hn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${adj(spec.hc||'#6a5a48',10)}"/><stop offset=".5" stop-color="${adj(spec.hc||'#6a5a48',22)}"/><stop offset="1" stop-color="${adj(spec.hc||'#6a5a48',-12)}"/></linearGradient>`;
 defs+=`<radialGradient id="${p}mz"><stop offset=".55" stop-color="${col.m}" stop-opacity="1"/><stop offset="1" stop-color="${col.m}" stop-opacity="0"/></radialGradient>`;
 defs+=`<filter id="${p}gn" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="${seed%97}" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .9 -.28"/></filter>`;
 /* neck */
 let neck='',neckD='',nshadow='';
 const hb=Math.max(...pts.map(q=>q[1]));
 if(A.neck){const ny=Math.min(A.neck[2]||54,56),w1=A.neck[1];
  const rp=pts.filter(q=>q[0]>=80).sort((a,b)=>a[1]-b[1]);let hw=A.neck[0];for(let k=1;k<rp.length;k++)if(rp[k][1]>=ny){const a=rp[k-1],b=rp[k],t=(ny-a[1])/((b[1]-a[1])||1);hw=a[0]-80+(b[0]-a[0])*t;break}
  const w0=Math.max(8,hw-5);
  neckD=`M${f(80-w0)} ${ny}C${f(80-w0)} ${ny+36} ${f(80-w1+8)} 124 ${80-w1} 200L${80+w1} 200C${f(80+w1-8)} 124 ${f(80+w0)} ${ny+36} ${f(80+w0)} ${ny}Z`;
  neck=`<path d="${neckD}" fill="url(#${p}nk)"/>`;
  defs+=`<clipPath id="${p}nc"><path d="${neckD}"/></clipPath>`;
  nshadow=`<g clip-path="url(#${p}nc)"><ellipse cx="80" cy="${f(hb+3)}" rx="${f(w0*1.1)}" ry="13" fill="${col.dk}" opacity=".55" filter="url(#${p}b6)"/></g>`}
 defs+=`<clipPath id="${p}cl"><path d="${headD}"/>${neckD?`<path d="${neckD}"/>`:''}</clipPath>`;
 const ctx={p,col,R,A};
 /* πίσω στρώσεις */
 let back='',mid='',front='';
 const ex=(A.extra||[]).concat(spec.extra||[]);
 for(const e of ex){const o=typeof e=='string'?{k:e}:e,fn=X[o.k];if(!fn)continue;const r=fn(ctx,o);back+=r.b||'';mid+=r.m||'';front+=r.f||''}
 if(A.mane)back+=mane(A.mane,R,col,p);
 if(A.horn)back+=both(horn(A.horn,col,p));
 if(A.antler)back+=both(antler(A.antler,col,p));
 if(A.ear)back+=both(ear(A.ear,col,p));
 if(A.ear2)back+=both(ear(A.ear2,col,p));
 if(A.fz)back+=fuzz(pts,R,Object.assign({cy:A.fz.cy||80},A.fz),col);
 /* κεφάλι */
 let hd=`<path d="${headD}" fill="url(#${p}hd)"/>`;
 let ins=`<g clip-path="url(#${p}cl)">`;
 ins+=`<path d="${headD}" fill="none" stroke="${col.dk}" stroke-width="13" opacity=".5" filter="url(#${p}b6)"/>`;
 if(neckD)ins+=`<path d="${neckD}" fill="none" stroke="${col.dk}" stroke-width="12" opacity=".45" filter="url(#${p}b6)"/>`;
 ins+=`<ellipse cx="68" cy="${f(A.hl?A.hl[0]:44)}" rx="${A.hl?A.hl[1]:26}" ry="${A.hl?A.hl[2]:16}" fill="${l}" opacity=".5" filter="url(#${p}b6)"/>`;
 if(A.muz){const m=A.muz;if(m.lobes)m.lobes.forEach(([dx,y,rx,ry])=>{ins+=`<ellipse cx="${80+dx}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#${p}mz)"/>`});else ins+=`<ellipse cx="80" cy="${m.y}" rx="${m.w}" ry="${m.h}" fill="url(#${p}mz)"/>`}
 if(spec.m)ins+=marks(spec.m,R,col,A,p);
 const fb=A.fb||[18,22,142,138];
 if(A.fur){const fo=A.fur;ins+=fur(R,{x0:80-(fo.rx||44),x1:80+(fo.rx||44),y0:fo.y0||20,y1:fo.y1||130,fx:80,fy:fo.fy||52,n:fo.n,len:fo.len,lw:fo.lw,light:adj(b,24),dark:adj(d,-6),sp:fo.sp,gr:fo.gr,lo:fo.lo,do:fo.do})}
 if(neckD&&A.fur)ins+=fur(R,{x0:80-A.neck[1],x1:80+A.neck[1],y0:A.neck[2]||92,y1:160,fx:80,fy:60,n:Math.round(A.fur.n*.4),len:A.fur.len*1.2,lw:A.fur.lw,light:adj(b,22),dark:adj(d,-6),sp:.6,gr:.3});
 ins+=`<rect width="160" height="160" filter="url(#${p}gn)" opacity=".16"/>`;
 ins+='</g>';
 /* χαρακτηριστικά προσώπου */
 let fc='';
 if(A.eye&&A.eye.pt!='none'){const e=A.eye;fc+=eye(80-e.x,e.y,e.r,e,p,col)+eye(80+e.x,e.y,e.r,e,p,col)}
 if(A.nose)fc+=nose(Object.assign({},A.nose,{mc:A.nose.mc||col.m}),col,p);
 if(A.mouthp)fc+=mouth(A.mouthp,col);
 if(A.wh)fc+=whiskers(A.wh,col);
 const sc=spec.sc||A.sc||1,cy=spec.cy||80;
 const mf=A.manef?mane(A.manef,R,col,p):'';
 const sub=`<g class="sub">${back}${neck}${nshadow}${hd}${ins}${mf}${mid}${fc}${front}</g>`;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><defs>${defs}</defs>${S.B}<g transform="translate(80 ${cy}) scale(${sc}) translate(-80 ${-cy})">${sub}</g><rect width="160" height="160" fill="url(#${p}vg)"/></svg>`;
 return svg}
G.Portrait={render,merge,ARCH,H,SC:L.SC};
})(__G);

/* αρχέτυπα (συνέχεια) + εξαρτήματα */
(function(G){
'use strict';
const {ARCH,H}=G.__ARCH,X=G.__X,L=G.__lib,{f,taper,both,adj,mane}=L;
Object.assign(H,{
 horse:[[0,10],[12,12],[20,22],[25,40],[27,60],[26,80],[22,98],[19,110],[22,122],[22,133],[16,142],[0,145]],
});
const e=(o)=>o;
Object.assign(ARCH,{
 horse:{h:'horse',ear:{k:'tall',x:14,y:18,w:11,h:22,r:6,in:'#c98f80'},eye:{x:24,y:56,r:5.6,pt:'round',ir:'#5a3b1e'},nose:{k:'hoof',y:131,s:1.1},muz:{y:128,w:17,h:18},fur:{n:200,len:3,lw:.6},mouthp:{k:'line',y:140,w:9},neck:[30,50,76],sc:.9,cy:130,hl:[44,22,24]},
 antel:{h:'antel',ear:{k:'leaf',x:25,y:40,w:13,h:22,r:62,in:'#d9a89a'},eye:{x:21,y:56,r:5,pt:'h',ir:'#7a5424'},nose:{k:'hoof',y:128,s:.95},muz:{y:124,w:13,h:17},fur:{n:240,len:3,lw:.6},mouthp:{k:'line',y:134,w:6},neck:[24,40,70],sc:.8,cy:128},
 deer:{h:'deer',ear:{k:'leaf',x:27,y:36,w:15,h:24,r:58,in:'#e4b9a8'},eye:{x:21,y:56,r:5.2,pt:'round',ir:'#3a2410'},nose:{k:'wet',y:129,s:1.5,c:'#1a1210'},muz:{y:122,w:13,h:18},fur:{n:240,len:3,lw:.6},mouthp:{k:'line',y:136,w:6},neck:[24,40,70],sc:.8,cy:128},
 goat:{h:'goat',ear:{k:'leaf',x:24,y:46,w:12,h:19,r:78,in:'#d8a79a'},eye:{x:19,y:58,r:4.8,pt:'h',ir:'#c8a23a'},nose:{k:'hoof',y:130,s:.8},muz:{y:124,w:11,h:14},fur:{n:260,len:4,lw:.7},fz:{n:50,len:4,w:2.6},mouthp:{k:'line',y:136,w:5},neck:[22,38,70],extra:['beard'],sc:.82,cy:128},
 cow:{h:'cow',ear:{k:'leaf',x:31,y:46,w:14,h:22,r:75,in:'#e0b0a5'},eye:{x:26,y:52,r:5.2,pt:'round',ir:'#4a3018'},nose:{k:'bull',y:124,s:1},muz:{y:122,w:20,h:15},fur:{n:240,len:3,lw:.6},mouthp:{k:'none'},neck:[30,50,68],sc:.84,cy:128},
 camel:{h:'camel',ear:{k:'round',x:17,y:28,w:10,h:13,r:14,in:'#d8a79a'},eye:{x:22,y:54,r:5,pt:'round',lash:1,ir:'#4a2f14'},nose:{k:'slit',y:124,s:.9,c:'#2a1a12'},muz:{y:122,w:15,h:15},fur:{n:300,len:4,lw:.7},fz:{n:50,len:4,w:2.8},mouthp:{k:'line',y:133,w:6,d:2},neck:[22,38,66],extra:[{k:'topknot',n:26,y:24,r:18,l:14}],sc:.86,cy:128},
 giraffe:{h:'giraffe',ear:{k:'leaf',x:22,y:36,w:12,h:20,r:70,in:'#e0b0a5'},eye:{x:19,y:54,r:6.2,pt:'round',lash:1,ir:'#2a1a0c'},nose:{k:'hoof',y:130,s:.85},muz:{y:124,w:12,h:16},fur:{n:200,len:3,lw:.6},mouthp:{k:'line',y:136,w:5},neck:[19,34,60],sc:.8,cy:128},
 pig:{h:'pig',ear:{k:'drop',x:30,y:44,w:16,h:18,r:30,in:'#e0a8a0'},eye:{x:19,y:62,r:3,pt:'bead'},nose:{k:'pig',y:116,s:1.25},muz:{y:114,w:17,h:14},fur:{n:260,len:3.4,lw:.7},mouthp:{k:'none'},neck:[34,56,70],fz:{n:60,len:4,w:2.6}},
 elephant:{h:'elephant',ear:{k:'fan',x:30,y:40,w:36,h:38,r:12,in:'#c99a90'},eye:{x:22,y:56,r:3.6,pt:'round',ir:'#5a3a1e'},fur:{n:120,len:2.4,lw:.6},neck:[34,56,70],extra:['trunk'],sc:.86,cy:120},
 rhino:{h:'rhino',ear:{k:'tall',x:22,y:26,w:11,h:14,r:20,in:'#a88a80'},eye:{x:30,y:62,r:3,pt:'bead'},fur:{n:80,len:2.2,lw:.7},neck:[36,60,70],extra:['rhinohorn'],nose:{k:'hoof',y:124,s:1.1,c:'#222'},muz:{y:120,w:20,h:14},mouthp:{k:'line',y:132,w:10}},
 hippo:{h:'hippo',ear:{k:'round',x:30,y:38,w:9,h:9,in:'#a07872'},eye:{x:27,y:50,r:4,pt:'round',ir:'#3a2410'},fur:{n:50,len:2,lw:.6},neck:[40,64,70],extra:['hippo'],mouthp:{k:'none'}},
 tapir:{h:'tapir',ear:{k:'round',x:21,y:26,w:14,h:16,r:8,in:'#f0e8da'},eye:{x:25,y:56,r:3.2,pt:'bead'},nose:{k:'snout',y:138,s:1.3,c:'#222'},muz:{y:124,w:14,h:20},fur:{n:140,len:2.8,lw:.6},neck:[26,46,70],mouthp:{k:'none'}},
 ape:{h:'ape',ear:{k:'round',x:37,y:66,w:15,h:14,r:90,in:'#c89a86',c:null},eye:{x:12.5,y:61,r:3.8,pt:'round',ir:'#4a2a12',sq:.8},nose:{k:'prim',y:80,s:1.1},muz:{lobes:[[0,86,23,27]]},mouthp:{k:'line',y:100,w:11,d:2},fur:{n:300,len:4,lw:.7},fz:{n:70,len:5,w:3},neck:[34,60,76],marksbrow:1},
 monkey:{h:'monkey',ear:{k:'round',x:32,y:68,w:13,h:13,r:90,in:'#d8a79a'},eye:{x:11.5,y:63,r:3.7,pt:'round',ir:'#4a2a12',sq:.85},nose:{k:'prim',y:81,s:1},muz:{lobes:[[0,86,19,22]]},mouthp:{k:'line',y:98,w:9,d:2},fur:{n:300,len:3.6,lw:.7},fz:{n:60,len:4,w:2.8},neck:[30,54,74]},
 baboon:{h:'baboon',ear:{k:'round',x:31,y:56,w:11,h:11,r:90,in:'#d8a79a'},eye:{x:13,y:56,r:3.6,pt:'round',ir:'#7a4a18',sq:.8},nose:{k:'prim',y:112,s:1.2},muz:{lobes:[[0,100,17,32]]},mouthp:{k:'line',y:128,w:9,d:2},fur:{n:300,len:4,lw:.7},fz:{n:60,len:4.4,w:3},neck:[30,56,72]},
 lemur:{h:'lemur',ear:{k:'round',x:25,y:42,w:13,h:14,r:15,in:'#d8c6bc'},eye:{x:15,y:68,r:5,pt:'round',ir:'#c9902c',sq:.9},nose:{k:'wet',y:108,s:1.3,c:'#1a1210'},muz:{y:100,w:15,h:24},fur:{n:300,len:3.4,lw:.7},fz:{n:70,len:4,w:2.8},mouthp:{k:'line',y:114,w:5,d:2},neck:[26,48,72]},
 rodent:{h:'rodent',ear:{k:'round',x:28,y:40,w:14,h:13,r:12,in:'#e4aeb0'},eye:{x:17,y:62,r:3.4,pt:'bead'},nose:{k:'rod',y:92,s:1.2},muz:{lobes:[[-9,100,12,10],[9,100,12,10]]},wh:{y:98,n:4,x:9,l:28,op:.8},fur:{n:300,len:3,lw:.6},fz:{n:60,len:3.6,w:2.4},mouthp:{k:'line',y:106,w:5},neck:[30,50,70],extra:['teeth']},
 cavy:{h:'cavy',ear:{k:'drop',x:30,y:44,w:13,h:13,r:25,in:'#e4aeb0'},eye:{x:19,y:62,r:3.8,pt:'bead'},nose:{k:'rod',y:98,s:1.4},muz:{lobes:[[-9,104,12,10],[9,104,12,10]]},wh:{y:104,n:4,x:10,l:26,op:.8},fur:{n:300,len:3.4,lw:.6},fz:{n:60,len:3.8,w:2.4},mouthp:{k:'line',y:112,w:5},neck:[32,56,76]},
 rabbit:{h:'rabbit',ear:{k:'tall',x:13,y:40,w:13,h:50,r:6,in:'#e8b4b4'},eye:{x:26,y:62,r:4.2,pt:'round',ir:'#3a2210'},nose:{k:'rod',y:96,s:1.3,c:'#d99a9a'},muz:{lobes:[[-8,102,12,9],[8,102,12,9]]},wh:{y:100,n:4,x:10,l:30,op:.85},fur:{n:320,len:3.2,lw:.6},fz:{n:60,len:3.6,w:2.4},mouthp:{k:'line',y:108,w:4},neck:[30,52,70],extra:['teeth']},
 mustel:{h:'mustel',ear:{k:'round',x:29,y:40,w:13,h:12,r:12,in:'#d8a79a'},eye:{x:16,y:64,r:3.3,pt:'bead'},nose:{k:'wet',y:94,s:1,c:'#1a1210'},muz:{lobes:[[-7,100,11,9],[7,100,11,9]]},wh:{y:100,n:4,x:9,l:24,op:.8},fur:{n:300,len:3.2,lw:.6},fz:{n:60,len:3.6,w:2.4},mouthp:{k:'line',y:108,w:5},neck:[30,52,68]},
 hog:{h:'snout',ear:{k:'round',x:22,y:40,w:11,h:11,r:10,in:'#e4aeb0'},eye:{x:12,y:62,r:3,pt:'bead'},nose:{k:'snout',y:134,s:1.2,c:'#2a1a16'},muz:{y:110,w:10,h:30},fur:{n:260,len:3,lw:.6},fz:{n:50,len:3.6,w:2.4},mouthp:{k:'none'},neck:[24,44,70]},
 round:{h:'round',ear:{k:'round',x:30,y:42,w:14,h:14,r:12,in:'#d8a79a'},eye:{x:18,y:64,r:3.6,pt:'bead'},nose:{k:'bear',y:92,s:1},muz:{y:98,w:16,h:14},fur:{n:300,len:3.6,lw:.7},fz:{n:60,len:4,w:2.8},mouthp:{k:'line',y:106,w:6},neck:[32,56,70]},
 seal:{h:'seal',ear:null,eye:{x:19,y:62,r:6,pt:'bead'},nose:{k:'snout',y:90,s:1.3,c:'#1a1210'},muz:{lobes:[[-9,98,13,10],[9,98,13,10]]},wh:{y:96,n:5,x:8,l:34,g:3.2,w:.7,op:.9},fur:{n:200,len:2.6,lw:.6},mouthp:{k:'line',y:106,w:6,d:3},neck:[38,60,70]},
 koala:{h:'koala',ear:{k:'round',x:40,y:40,w:25,h:23,r:10,in:'#f0e8e0',c:null},eye:{x:19,y:62,r:3,pt:'bead'},nose:{k:'bear',y:86,s:1.55,c:'#1a1412'},muz:{y:100,w:16,h:14},fur:{n:360,len:4,lw:.8},fz:{n:70,len:5,w:3.2},mouthp:{k:'line',y:104,w:6},neck:[34,58,70]},
 roo:{h:'roo',ear:{k:'tall',x:17,y:30,w:12,h:30,r:12,in:'#e3b0a6'},eye:{x:19,y:58,r:4.4,pt:'round',ir:'#3a2410'},nose:{k:'wet',y:128,s:1.4,c:'#2a1a16'},muz:{y:120,w:11,h:18},fur:{n:240,len:3,lw:.6},mouthp:{k:'line',y:134,w:5},neck:[24,42,70]},
 tube:{h:'tube',ear:{k:'tall',x:18,y:32,w:12,h:26,r:14,in:'#e0b0a6'},eye:{x:19,y:58,r:3.2,pt:'bead'},nose:{k:'snout',y:142,s:1.2,c:'#2a1a16'},muz:{y:116,w:9,h:28},fur:{n:240,len:3.2,lw:.6},neck:[26,46,70]}
});
/* εξαρτήματα */
X.rhinohorn=(c,o)=>({f:`<path d="M${80-13} 108Q80 100 ${80+13} 108Q${80+9} 80 80 ${o.t||66}Q${80-9} 80 ${80-13} 108Z" fill="${o.c||'#8a8070'}" stroke="#3a342c" stroke-width=".6"/><path d="M${80-5} 100Q${80-3} 82 ${80-1} 72" stroke="#cfc6b4" stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".6"/>`+(o.two?`<path d="M${80-8} 70Q80 62 ${80+8} 70Q${80+6} 56 80 52Q${80-6} 56 ${80-8} 70Z" fill="${o.c||'#8a8070'}" stroke="#3a342c" stroke-width=".5"/>`:'')});
X.sidemane=(c,o)=>{let s='';const R=c.R;for(let i=0;i<(o.n||40);i++){const sg=i%2?1:-1,y0=(o.y0||20)+R()*(o.h||80),x0=80+sg*(18+R()*8),l=(o.l||22)*(.7+R()*.6);s+=`<path d="${taper([[x0,y0],[x0+sg*(3+R()*5),y0+l*.5],[x0+sg*(2+R()*10),y0+l]],o.w||5,.6,3)}" fill="${[c.col.m1,c.col.m2,c.col.m3][(R()*3)|0]}"/>`}return{b:s}};
ARCH.bat={kind:'bat'};ARCH.cet={kind:'cet'};
X.hippo=(c,o)=>({f:`<ellipse cx="${80-11}" cy="116" rx="4" ry="3" fill="#2a1a18"/><ellipse cx="${80+11}" cy="116" rx="4" ry="3" fill="#2a1a18"/><path d="M${80-26} 128Q80 140 ${80+26} 128" stroke="#3a2420" stroke-width="1.4" fill="none"/><path d="M${80-20} 130l1 6l3 -5M${80+20} 130l-1 6l-3 -5" fill="#f4eed8"/>`});
X.teeth=(c,o)=>({f:`<path d="M${80-3.4} ${o.y||101}h6.8v${o.h||7}q-3.4 1.6 -6.8 0Z" fill="${o.c||'#f6f0e0'}" stroke="#9a8f78" stroke-width=".4"/><path d="M80 ${o.y||101}v${o.h||7}" stroke="#9a8f78" stroke-width=".4"/>`});
X.crest=(c,o)=>({b:`<ellipse cx="80" cy="${o.y||24}" rx="${o.w||26}" ry="${o.h||18}" fill="${c.col.d}"/>`});
X.ring=(c,o)=>({m:`<ellipse cx="80" cy="84" rx="${(o.w||32)-10}" ry="26" fill="${o.skin||c.col.m}" opacity=".9"/>`+`<path d="M80 ${o.y0||30}C${80+(o.w||32)} ${o.y0||30} ${80+(o.w||32)+4} ${o.y1||82} ${80+(o.w||32)-8} 100C${80+14} 116 ${80-14} 116 ${80-(o.w||32)+8} 100C${80-(o.w||32)-4} ${o.y1||82} ${80-(o.w||32)} ${o.y0||30} 80 ${o.y0||30}ZM80 ${(o.y0||30)+10}C${80+(o.w||32)-9} ${(o.y0||30)+12} ${80+(o.w||32)-8} 82 ${80+(o.w||32)-14} 94C${80+8} 108 ${80-8} 108 ${80-(o.w||32)+14} 94C${80-(o.w||32)+8} 82 ${80-(o.w||32)+9} ${(o.y0||30)+12} 80 ${(o.y0||30)+10}Z" fill="${o.c||c.col.l}" fill-rule="evenodd" opacity=".95"/>`});
X.flange=(c,o)=>({b:both(`<ellipse cx="${80+(o.x||34)}" cy="${o.y||80}" rx="${o.w||15}" ry="${o.h||24}" fill="${o.c||'#3d3633'}"/>`),m:''});
X.tuftcap=(c,o)=>{let s='';const R=c.R;for(let i=0;i<(o.n||30);i++){const a=Math.PI*(1.05+R()*.9),r=R()*(o.r||26),x=80+Math.cos(a)*r*1.2,y=(o.y||36)+Math.sin(a)*r*.6;s+=`<path d="${taper([[x,y+4],[x+(R()-.5)*8,y-5],[x+(R()-.5)*12,y-(o.l||12)]],3.4,.5,3)}" fill="${o.c||c.col.d}" opacity=".95"/>`}return{f:s}};
X.mohawk=X.tuftcap;
X.ruffle=(c,o)=>({b:mane(Object.assign({r0:26,r1:46,rv:10,n:70,w:6,sy:.95},o.m||{}),c.R,c.col,c.p)});
X.starnose=(c,o)=>{let s='';for(let i=0;i<18;i++){const a=i/18*Math.PI*2;s+=`<path d="${taper([[80+Math.cos(a)*5,(o.y||112)+Math.sin(a)*5],[80+Math.cos(a)*11,(o.y||112)+Math.sin(a)*11]],2,1.4,2)}" fill="#e8a0a0"/>`}return{f:s+`<circle cx="80" cy="${o.y||112}" r="5" fill="#d98888"/>`}};
X.proboscis=(c,o)=>({f:`<path d="M${80-14} 96C${80-18} 112 ${80-12} 132 ${80-6} 142C80 148 ${80+6} 142 ${80+12} 132C${80+18} 112 ${80+14} 96 80 92Z" fill="${o.c||c.col.b}"/><ellipse cx="${80-5}" cy="138" rx="2.4" ry="3.4" fill="#222"/><ellipse cx="${80+5}" cy="138" rx="2.4" ry="3.4" fill="#222"/>`});
X.bristles=(c,o)=>{let s='';const R=c.R;for(let i=0;i<(o.n||40);i++){const x=80+(R()-.5)*(o.w||44),y=(o.y||104)+(R()-.5)*(o.h||16);s+=`<path d="M${f(x)} ${f(y)}l${f((R()-.5)*3)} ${f(3+R()*4)}" />`}return{f:`<g stroke="${o.c||'#e8dcc0'}" stroke-width=".8" stroke-linecap="round" fill="none">${s}</g>`}};
})(__G);

/* ειδικές μορφές: νυχτερίδες και κητώδη (δεν χωρούν στο γενικό πρόσωπο) */
(function(G){
'use strict';
const L=G.__lib,{f,adj,mixc,cr,taper,both,fur,eye,sample}=L;
const SP=G.__SPECIAL=G.__SPECIAL||{};
const wrap=(ctx,body,extraDefs='')=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><defs>${ctx.defs}${extraDefs}</defs>${ctx.S.B}${body}<rect width="160" height="160" fill="url(#${ctx.p}vg)"/></svg>`;
/* ---------- νυχτερίδα ---------- */
SP.bat=(spec,A,ctx)=>{const{R,p,col}=ctx,o=Object.assign({t:'plain',ear:1,wing:1},A.bat||{}),b=col.b,d=col.d,l=col.l,wc=spec.wc||adj(b,-6),wd=adj(wc,-22);
 let defs=`<linearGradient id="${p}wg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${adj(wc,10)}"/><stop offset="1" stop-color="${wd}"/></linearGradient><radialGradient id="${p}hd" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="${l}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${d}"/></radialGradient><radialGradient id="${p}ir" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#7a4a2a"/><stop offset="1" stop-color="#1a0c06"/></radialGradient>`;
 const wing=`<path d="M88 88L152 34Q150 56 143 66Q142 84 130 90Q128 106 114 108Q108 120 92 120Z" fill="url(#${p}wg)" stroke="${wd}" stroke-width=".8"/><path d="M88 88L152 34M88 90L143 66M88 94L130 90M88 100L114 108" stroke="${wd}" stroke-width="1.1" fill="none" opacity=".8"/>`;
 let s=both(wing).replace(/<g transform="matrix\(-1 0 0 1 160 0\)">/,'<g transform="matrix(-1 0 0 1 160 0)">');
 const e=o.ear*1;
 s+=`<ellipse cx="80" cy="112" rx="19" ry="26" fill="${b}"/>`;
 s+=both(`<path d="${cr([[88,66],[94,52],[100,46-e*16],[104,58-e*10],[100,74]],true)}" fill="${b}" stroke="${d}" stroke-width=".8"/>`);
 s+=both(`<path d="${cr([[90,64],[94,54],[99,50-e*14],[101,60],[98,70]],true)}" fill="#e0a9a4" opacity=".7"/>`);
 s+=`<ellipse cx="80" cy="72" rx="21" ry="20" fill="url(#${p}hd)"/>`;
 s+=`<ellipse cx="80" cy="82" rx="12" ry="10" fill="${col.m}" opacity=".85"/>`;
 s+=fur(R,{x0:58,x1:102,y0:56,y1:128,fx:80,fy:70,n:120,len:3.2,lw:.6,light:adj(b,24),dark:adj(d,-4)});
 if(o.t=='leaf')s+=`<path d="M80 74L74 86Q80 90 86 86Z" fill="#d79a9a" stroke="#8a5a5a" stroke-width=".5"/>`;
 else if(o.t=='horse')s+=`<path d="M70 82Q80 72 90 82Q92 92 80 92Q68 92 70 82Z" fill="#d79a9a" stroke="#8a5a5a" stroke-width=".5"/><ellipse cx="75" cy="85" rx="1.6" ry="2" fill="#4a2a2a"/><ellipse cx="85" cy="85" rx="1.6" ry="2" fill="#4a2a2a"/>`;
 else if(o.t=='fox')s+=`<ellipse cx="80" cy="84" rx="5.5" ry="4" fill="#1a1210"/><ellipse cx="78" cy="83" rx="2" ry=".9" fill="#fff" opacity=".5"/>`;
 else s+=`<ellipse cx="80" cy="84" rx="5" ry="3.6" fill="#c98a8a"/><circle cx="78" cy="84" r="1" fill="#2a1414"/><circle cx="82" cy="84" r="1" fill="#2a1414"/>`;
 const er=o.t=='fox'?4.4:3;s+=`<circle cx="70" cy="68" r="${er}" fill="#0c0806"/><circle cx="90" cy="68" r="${er}" fill="#0c0806"/><circle cx="${f(70-er*.3)}" cy="${f(68-er*.35)}" r="${f(er*.3)}" fill="#fff"/><circle cx="${f(90-er*.3)}" cy="${f(68-er*.35)}" r="${f(er*.3)}" fill="#fff"/>`;
 s+=`<path d="M74 92Q80 96 86 92" stroke="#2a1410" stroke-width="1" fill="none"/><path d="M76 93l.6 2.6l1.2 -2M84 93l-.6 2.6l-1.2 -2" fill="#fff"/>`;
 return wrap(ctx,s,defs)};
/* ---------- κητώδη (προφίλ) ---------- */
const CET={
 dolphin:{tip:152,mel:12,beak:1,dors:1,col:['#6f8594','#dfe9ee']},
 orca:{tip:146,mel:6,beak:0,dors:1.6,col:['#15181d','#f4f4f0'],patch:1},
 beluga:{tip:144,mel:20,beak:.5,dors:0,col:['#e9eef0','#ffffff']},
 narwhal:{tip:142,mel:18,beak:.2,dors:0,col:['#8c9aa0','#e6ebea'],tusk:1,spots:1},
 sperm:{tip:152,mel:30,beak:0,dors:.5,col:['#5e6a72','#9aa5aa'],block:1,wrinkle:1},
 humpback:{tip:150,mel:8,beak:0,dors:.6,col:['#26323c','#cfd8dc'],bumps:1,fl:1},
 grey:{tip:150,mel:6,beak:0,dors:.2,col:['#7a8286','#aab2b4'],spots:1,bumps:.5},
 beaked:{tip:156,mel:16,beak:1.4,dors:1,col:['#7a7466','#cfc8b6']},
 pilot:{tip:140,mel:26,beak:0,dors:1.2,col:['#1c2026','#7a8288']},
 porpoise:{tip:140,mel:10,beak:0,dors:1,col:['#5c6a74','#e0e6e8']},
 blue:{tip:152,mel:4,beak:0,dors:.3,col:['#5a7a96','#c8d6e0'],spots:1}
};
SP.cet=(spec,A,ctx)=>{const{R,p,col}=ctx,t=(A.cet&&A.cet.t)||'dolphin',K=Object.assign({},CET[t]||CET.dolphin),top=spec.c[0]||K.col[0],bot=spec.c[1]||K.col[1],dk=adj(top,-22);
 const tip=K.tip,mel=K.mel,bk=K.beak*8;
 const topPts=[[-12,128],[28,86],[78,66],[110,64-mel*.5],[126,70-mel*.8],[tip-18-bk,84-mel*.1],[tip-bk*.4,92],[tip,95]];
 const botPts=[[tip-3,98],[128,104],[110,118],[84,136],[40,148],[-12,152]];
 const pts=topPts.concat(botPts),D=cr(pts,true);
 const defs=`<linearGradient id="${p}cb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".55" stop-color="${adj(top,6)}"/><stop offset=".7" stop-color="${bot}"/><stop offset="1" stop-color="${adj(bot,6)}"/></linearGradient><clipPath id="${p}cc"><path d="${D}"/></clipPath><radialGradient id="${p}ir" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#6a5030"/><stop offset="1" stop-color="#140c06"/></radialGradient>`;
 let s='';
 /* υδάτινη επιφάνεια πίσω */
 s+=`<rect y="118" width="160" height="42" fill="#0e5a86" opacity=".35"/>`;
 if(K.dors)s+=`<path d="M56 78Q${f(62+4*K.dors)} ${f(78-22*K.dors)} ${f(78+8*K.dors)} 72Z" fill="${dk}"/>`;
 s+=`<path d="M0 136Q30 160 70 160" fill="none"/>`;
 s+=`<path d="M52 116Q38 140 18 154Q40 156 70 134Z" fill="${dk}"/>`;
 if(K.tusk)s+=`<path d="${taper([[tip-2,94],[170,80],[200,66]],3,.8,4)}" fill="#efe6d0" stroke="#bdb095" stroke-width=".4"/>`;
 s+=`<path d="${D}" fill="url(#${p}cb)"/>`;
 let ins=`<g clip-path="url(#${p}cc)">`;
 ins+=`<path d="${D}" fill="none" stroke="${adj(top,-28)}" stroke-width="12" opacity=".5" filter="url(#${p}b6)"/>`;
 ins+=`<ellipse cx="96" cy="76" rx="34" ry="9" fill="#fff" opacity=".22" filter="url(#${p}b6)"/>`;
 if(K.patch)ins+=`<ellipse cx="104" cy="82" rx="9" ry="4" transform="rotate(-18 104 82)" fill="#f7f7f2"/><path d="M60 118Q90 100 130 112L130 160L40 160Z" fill="#f7f7f2"/><path d="M40 82Q58 92 66 80Q62 70 50 74Z" fill="#8a9096" opacity=".8"/>`;
 if(K.spots)for(let i=0;i<46;i++)ins+=`<ellipse cx="${f(R()*130)}" cy="${f(70+R()*70)}" rx="${f(1.5+R()*4)}" ry="${f(1+R()*2.6)}" fill="${R()<.5?adj(top,-24):adj(bot,-10)}" opacity=".55"/>`;
 if(K.wrinkle)for(let i=0;i<12;i++)ins+=`<path d="M${f(60+R()*70)} ${f(70+R()*60)}q6 3 ${f(8+R()*6)} 0" stroke="${adj(top,-26)}" stroke-width=".7" fill="none" opacity=".6"/>`;
 if(K.bumps)for(let i=0;i<14;i++)ins+=`<circle cx="${f(118+R()*28)}" cy="${f(76+R()*10)}" r="${f(1+R()*1.3)}" fill="${adj(top,18)}" opacity=".8"/>`;
 ins+=fur(R,{x0:0,x1:150,y0:70,y1:150,fx:20,fy:110,n:50,len:5,lw:.5,light:'#fff',dark:'#000',lo:.07,do:.08,sp:.3});
 ins+='</g>';
 s+=ins;
 /* στόμα, μάτι */
 const ey=94-mel*.18;
 s+=`<path d="M${tip-2} 96Q${tip-26} ${t=='humpback'||t=='grey'?92:104} ${tip-44-K.beak*4} ${t=='humpback'||t=='grey'?94:100}" stroke="${adj(top,-34)}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
 if(!K.block)s+=eye(tip-40-bk,ey+2,3.4,{pt:'bead'},p,col);else s+=eye(tip-26,106,2.6,{pt:'bead'},p,col);
 s+=`<ellipse cx="${tip-14-bk}" cy="${f(76-mel*.6)}" rx="2" ry="1" fill="#000" opacity=".6"/>`;
 /* ακτίνες φωτός */
 s+=`<path d="M20 0L50 118L10 118Z M70 0L96 118L60 118Z" fill="#fff" opacity=".1"/>`;
 return wrap(ctx,s,defs)};
})(__G);

/* πίνακας ειδών: τίτλος ανάρτησης → προδιαγραφή πορτραίτου */
(function(G){
'use strict';
const {adj}=G.__lib,{merge}=G.Portrait;
const S=(a,s,b,x)=>{x=x||{};const o=merge({eye:x.ir?{ir:x.ir}:{}},x.o||{});const r=Object.assign({},x,{a,s,o});
 r.c=[b,x.l||adj(b,16,-4),x.d||adj(b,-20),x.mz||adj(b,24,-12),x.n||'#241812',x.i||'#e0b0a4',null,x.k||adj(b,-36)].concat(x.mc||[]);
 if(x.mc){r.c[8]=x.mc[0];r.c[9]=x.mc[1];r.c[10]=x.mc[2]}return r};
const hz=(k,x,y,rot,s)=>({horn:{k,x:x==null?11:x,y:y==null?20:y,rot:rot==null?6:rot,s:s||.8}});
const P={};
/* ---- αιλουροειδή ---- */
P.lion=S('cat','savanna','#c9964f',{l:'#e8c88a',d:'#8a5d2b',mz:'#efdcb4',n:'#3a2420',ir:'#c98a2e',o:{ear:{w:13,h:12,x:34,y:42},mane:{n:230,r0:34,r1:56,rv:16,w:11,c1:'#7a4a1f',c2:'#a3682a',c3:'#4e2d12',sx:1.15,sy:1.02,gr:.1},manef:{n:90,r0:35,r1:50,rv:9,w:9,c1:'#8a5624',c2:'#a3682a',c3:'#5e3a16',sx:1.05,sy:.95,a0:.9,a1:1.2},neck:[40,60,60]}});
P.lioness=S('cat','savanna','#cfa468',{l:'#ecd2a0',d:'#94683a',mz:'#f1e2c0',n:'#4a2a26',ir:'#c98a2e'});
P.tiger=S('cat','jungle','#dc7a2a',{l:'#f3a85a',d:'#a14a14',mz:'#f7efe2',n:'#c46a6a',i:'#f7efe2',m:[{k:'tiger',c:'#1b0f08'}],ir:'#d9a92e'});
P.leopard=S('cat','savanna','#d9a550',{l:'#efcf8a',d:'#9a6a28',mz:'#f4ead0',n:'#3a2420',m:[{k:'rosette',c:'#2a1a0e',n:34}],ir:'#9ab04a'});
P.jaguar=S('cat','jungle','#d6a040',{l:'#ecc67e',d:'#94601c',mz:'#f4ead0',n:'#3a2420',m:[{k:'rosette',c:'#2a1a0e',n:26,r:[3,5.2],core:1}],ir:'#c9a02e',o:{h:'bear',ear:{x:33,y:38}}});
P.cheetah=S('cat','savanna','#d9b060',{l:'#f0d596',d:'#a67a32',mz:'#f6ecd4',n:'#2a1a16',m:[{k:'dots',c:'#2a1a0e',n:40,r:[1.4,2.6]},'tears'],ir:'#b8902a',o:{h:'cheetah'}});
P.puma=S('cat','mountain','#c19a6e',{l:'#e0c498',d:'#86623c',mz:'#f0e4cc',n:'#c98a8a',ir:'#9ab04a'});
P.lynx=S('cat','forest','#b99a76',{l:'#dcc6a2',d:'#7a5e40',mz:'#f0e8d8',n:'#b07a7a',m:[{k:'dots',c:'#5a4430',n:22,r:[1.2,2.2]}],ir:'#c8b038',o:{h:'lynx',ear:{k:'point',w:15,h:22,x:30,y:34,r:8,tuft:1,in:'#c9a08a'},fz:{n:120,len:8,w:3.6}}});
P.serval=S('cat','savanna','#d8a85c',{l:'#efcf92',d:'#9a6a2a',mz:'#f4ead0',n:'#2a1a16',m:[{k:'dots',c:'#241710',n:34,r:[1.6,3]}],ir:'#c8a02a',o:{ear:{k:'round',w:19,h:24,x:28,y:34,r:6}}});
P.caracal=S('cat','desert','#c98a58',{l:'#e2b484',d:'#8a5632',mz:'#f4ead8',n:'#2a1a16',ir:'#c8a02a',o:{ear:{k:'point',w:15,h:23,x:28,y:34,r:10,tuft:1,in:'#241812',io:.95}}});
P.manul=S('cat','steppe','#9a9488',{l:'#cdc8bc',d:'#5e5a50',mz:'#e8e4da',n:'#a07a7a',ir:'#c8b038',m:[{k:'gstripe',c:'#4a463e',x0:12,x1:12,y0:62,y1:90,w:1.4}],o:{ear:{k:'round',x:36,y:42,w:15,h:13,r:25},fz:{n:120,len:7,w:3.6}}});
P.tabby=S('cat','meadow','#9a8a78',{l:'#c6b8a4',d:'#5e5244',mz:'#efe6d8',n:'#d99a9a',m:[{k:'tiger',c:'#4a3e32'}],ir:'#a8b83a',o:{ear:{k:'point',w:17,h:19,x:30,y:34,r:12}}});
P.orangecat=S('cat','meadow','#d98a48',{l:'#f2b878',d:'#a45a22',mz:'#f7ece0',n:'#d99a9a',m:[{k:'tiger',c:'#a85a22'}],ir:'#b8b83a',o:{ear:{k:'point',w:17,h:19,x:30,y:34,r:12}}});
P.snowleo=S('cat','snow','#cfcac0',{l:'#ebe8e0',d:'#8a857a',mz:'#f4f2ec',n:'#b08a8a',m:[{k:'rosette',c:'#3a3630',n:26,r:[2.6,4.4]}],ir:'#9ab8a8'});
/* ---- κυνοειδή ---- */
P.wolf=S('canid','forest','#8c8780',{l:'#cfcac2',d:'#4e4a45',mz:'#d8d2c6',n:'#16100e',i:'#a98a80',ir:'#c9a02e',m:[{k:'brow',c:'#2a2622'}]});
P.fox=S('canid','meadow','#d9702a',{l:'#f0a35a',d:'#9a4416',mz:'#f7efe6',n:'#16100e',i:'#f2d0c0',ir:'#c28a22',o:{h:'fox',eye:{pt:'v',r:4},ear:{w:19,h:29,x:25}}});
P.jackal=S('canid','savanna','#b98a58',{l:'#dcb888',d:'#7a5430',mz:'#ecdcc0',n:'#16100e',ir:'#c8a02a',o:{h:'fox'}});
P.coyote=S('canid','desert','#a08a6c',{l:'#cdb894',d:'#665238',mz:'#e0d2b8',n:'#16100e',ir:'#c8a02a',o:{h:'fox'}});
P.dingo=S('canid','desert','#c49a62',{l:'#e6c690',d:'#8a6234',mz:'#f2e4c8',n:'#16100e',ir:'#b8902a'});
P.fennec=S('canid','desert','#e2c8a0',{l:'#f4e6cc',d:'#a8865a',mz:'#f8f0e2',n:'#16100e',i:'#f0c8bc',ir:'#2a1a0e',o:{h:'fox',ear:{k:'point',w:26,h:48,x:24,y:42,r:6},eye:{r:5.2,pt:'round'},sc:.9}});
P.hyena=S('canid','savanna','#a89468',{l:'#cfc09a',d:'#6a5a38',mz:'#2a221c',n:'#16100e',ir:'#4a3018',m:[{k:'spots',c:'#3a2e1e',n:18,r:[2,3.6],y0:30,y1:90}],o:{ear:{k:'round',w:22,h:22,x:30,y:36,in:'#4a3a30'},muz:{w:14,h:22}}});
P.aardwolf=S('canid','savanna','#cdb88a',{l:'#e6d6b0',d:'#8a7650',mz:'#e8dcc0',n:'#16100e',ir:'#4a3018',m:[{k:'tiger',c:'#2a2018'}],o:{ear:{k:'tall',w:16,h:26,x:24,y:34,r:10}}});
P.raccoon=S('canid','forest','#8a8478',{l:'#c0baae',d:'#4e4a42',mz:'#e8e4da',n:'#16100e',ir:'#2a1c12',m:[{k:'mask',c:'#17120e'}],o:{h:'fox',ear:{k:'round',w:14,h:14,x:26,y:36,r:10,in:'#c8b8a8'},eye:{pt:'bead',r:3.4}}});
P.coati=S('canid','jungle','#8a5e3c',{l:'#b98a62',d:'#4e3220',mz:'#e8dcc8',n:'#16100e',ir:'#2a1c12',m:[{k:'ringeye',c:'#e8e0d0',x:15,y:62}],o:{h:'fox',eye:{pt:'bead',r:3.4},ear:{k:'round',w:12,h:12,x:24,y:36}}});
P.rdog=S('canid','forest','#8a8070',{l:'#bdb4a2',d:'#4e4638',mz:'#d8d0be',n:'#16100e',ir:'#2a1c12',m:[{k:'mask',c:'#17120e'}],o:{h:'fox',eye:{pt:'bead',r:3.2},ear:{k:'round',w:13,h:13,x:26,y:36,r:10}}});
P.wilddog=S('canid','savanna','#a07a48',{l:'#d0a870',d:'#4a3420',mz:'#2a2018',n:'#16100e',ir:'#8a5a1e',m:[{k:'spots',c:'#17120e',n:12,r:[3,6],y0:24,y1:80}],o:{ear:{k:'round',w:22,h:22,x:30,y:36,in:'#3a2a20'}}});
P.ethwolf=S('canid','mountain','#c8703a',{l:'#e29a62',d:'#8a4420',mz:'#f6ece0',n:'#16100e',ir:'#a8741e',o:{h:'fox',ear:{w:17,h:22}}});
/* ---- αρκούδες ---- */
P.brownbear=S('bear','forest','#6b4a30',{l:'#98714a',d:'#3b2818',mz:'#8b6a48',n:'#1a1210',ir:'#4a3018'});
P.blackbear=S('bear','forest','#2a2420',{l:'#4a423a',d:'#14100e',mz:'#9a7c5c',n:'#14100e',ir:'#3a2410'});
P.panda=S('bear','bamboo','#f4f1ea',{l:'#ffffff',d:'#cfcac0',mz:'#f4f1ea',n:'#18110f',i:'#2a2220',ir:'#2a1c12',m:[{k:'eyepatch',c:'#1a1412',x:19,y:68,w:9,h:12,rot:-30}],o:{h:'panda',ear:{c:'#1a1412',in:'#2a2220',x:36,y:36},neck:[40,60]}});
P.polar=S('bear','snow','#f0ead8',{l:'#fffcf0',d:'#cfc6ae',mz:'#f6f0e0',n:'#14100e',ir:'#2a1c12',o:{h:'panda',ear:{k:'round',x:34,y:36,w:11,h:11,in:'#d8cdb8'}}});
/* ---- ουλοφάγα: δεν υπάρχουν· μουστελίδες ---- */
P.weasel=S('mustel','meadow','#a3703c',{l:'#c99a62',d:'#684420',mz:'#f4ecdc',n:'#1a1210',ir:'#1a1210'});
P.ermine=S('mustel','snow','#f4f2ee',{l:'#ffffff',d:'#d8d4cc',mz:'#ffffff',n:'#1a1210',ir:'#1a1210'});
P.mink=S('mustel','water','#4a3022',{l:'#6e4c36',d:'#2a1a12',mz:'#e8dcc8',n:'#1a1210',ir:'#1a1210'});
P.marten=S('mustel','forest','#6e4a2c',{l:'#96704a',d:'#3e2812',mz:'#e8c27a',n:'#1a1210',ir:'#1a1210',m:[{k:'fpatch',c:'#e8c27a',y0:94,y1:116,w:14,o:.9}]});
P.sable=S('mustel','tundra','#7a5a3a',{l:'#a88660',d:'#483222',mz:'#d8c29a',n:'#1a1210',ir:'#1a1210'});
P.otter=S('mustel','water','#6a4a30',{l:'#9a7852',d:'#3e2a18',mz:'#cfb496',n:'#1a1210',ir:'#1a1210',o:{ear:{x:27,y:40,w:9,h:8},muz:{lobes:[[-9,100,13,10],[9,100,13,10]]},wh:{n:5,l:30,w:.7}}});
P.badger=S('mustel','forest','#8a8a86',{l:'#b8b8b2',d:'#4a4a46',mz:'#e8e6e0',n:'#1a1210',ir:'#1a1210',m:[{k:'eyepatch',c:'#16120f',x:15,y:70,w:7,h:34,rot:0},{k:'blaze',c:'#f4f1ea',y0:30,y1:112,w0:10,w1:13}],o:{h:'hog',eye:{x:15,y:66},ear:{k:'round',x:26,y:40,in:'#e8e0d8',c:'#16120f'}}});
P.skunk=S('mustel','meadow','#1c1816',{l:'#3a3330',d:'#0c0a09',mz:'#2a2420',n:'#d99a9a',ir:'#1a1210',m:[{k:'blaze',c:'#f4f1ea',y0:20,y1:96,w0:6,w1:9}]});
P.wolverine=S('mustel','tundra','#4a3626',{l:'#6e5238',d:'#26190e',mz:'#6e5238',n:'#1a1210',ir:'#1a1210',m:[{k:'brow',c:'#d8c8a0'}],o:{h:'round'}});
P.honeybadger=S('mustel','savanna','#2a2624',{l:'#4a4440',d:'#14100e',mz:'#2a2624',n:'#1a1210',ir:'#1a1210',m:[{k:'fpatch',c:'#e6e2dc',y0:20,y1:48,w:34,o:1}],o:{ear:{k:'round',w:6,h:6,x:30,y:44}}});
P.stinkbadger=S('mustel','forest','#2a2420',{l:'#4a3e34',d:'#14100e',mz:'#e8dcc0',n:'#d99a9a',ir:'#1a1210',m:[{k:'blaze',c:'#f2ead0',y0:22,y1:100,w0:7,w1:9}],o:{h:'hog',ear:{x:24}}});
P.mongoose=S('mustel','savanna','#9a7a52',{l:'#c4a678',d:'#5e4630',mz:'#d8c29a',n:'#1a1210',ir:'#6a4a1e',o:{h:'fox',ear:{k:'round',w:9,h:9,x:24,y:38}}});
P.yellowmongoose=S('mustel','desert','#d8a040',{l:'#f0c870',d:'#9a6a1e',mz:'#f6e8c0',n:'#1a1210',ir:'#3a2410',o:{h:'fox'}});
P.meerkat=S('mustel','desert','#cfae78',{l:'#ecd4a0',d:'#8a6a3c',mz:'#f0e0c0',n:'#1a1210',ir:'#1a1210',m:[{k:'eyepatch',c:'#4a3a2a',x:16,y:66,w:6,h:9,rot:0}],o:{h:'hog',eye:{pt:'bead',r:4,x:15,y:64},nose:{k:'snout',y:128},ear:{k:'round',w:7,h:7,x:25,y:48}}});
P.civet=S('mustel','jungle','#8a8a84',{l:'#b8b8b0',d:'#46463e',mz:'#ece8dc',n:'#1a1210',ir:'#3a2a12',m:[{k:'mask',c:'#1a1612'}],o:{h:'fox'}});
P.genet=S('mustel','savanna','#c9b794',{l:'#e6dac0',d:'#8a7a58',mz:'#f2ecdc',n:'#1a1210',ir:'#2a1c0e',m:[{k:'dots',c:'#3a2e22',n:22,r:[1.2,2.4]},{k:'ringeye',c:'#2a2018',x:15,y:62}],o:{h:'fox'}});
P.palmcivet=S('mustel','jungle','#8a7a5e',{l:'#b8a888',d:'#4a3e2a',mz:'#e6dcc4',n:'#1a1210',ir:'#2a1c0e',m:[{k:'mask',c:'#2a2018'}],o:{h:'fox'}});
P.fossa=S('mustel','forest','#a8825a',{l:'#cfa97a',d:'#6a4a2c',mz:'#e0c8a0',n:'#1a1210',ir:'#8a6a1e',o:{h:'fox',ear:{k:'round',w:14,h:14,x:27,y:38}}});
/* ---- οπληφόρα ---- */
P.horse=S('horse','meadow','#8a5230',{l:'#b27a4c',d:'#4f2c18',mz:'#6f4426',n:'#1a1210',i:'#a8705a',ir:'#3a2410',extra:[{k:'forelock',c:'#2a170c'},{k:'sidemane',c:'#2a170c',n:50}],mc:['#2a170c','#3a2412','#1a0f08'],m:[{k:'blaze',c:'#f2eee6',y0:22,y1:112,w0:3,w1:7}]});
P.zebra=S('horse','savanna','#f1ede4',{l:'#ffffff',d:'#cfc9bc',mz:'#4a423a',n:'#14100e',i:'#d7b0a4',m:[{k:'zebra',c:'#15110f'}]});
P.donkey=S('horse','steppe','#8a8680',{l:'#b4b0a8',d:'#54504a',mz:'#e8e4da',n:'#1a1210',ir:'#3a2410',i:'#d8b8ac',o:{ear:{k:'tall',w:14,h:36,x:17,y:20,r:12}},extra:[{k:'forelock',c:'#3a3630',l:12}]});
P.mule=S('horse','meadow','#8a5e3c',{l:'#b08462',d:'#4e3220',mz:'#d8c0a0',n:'#1a1210',ir:'#3a2410',o:{ear:{k:'tall',w:13,h:30,x:16,y:20,r:10}},extra:[{k:'forelock',c:'#2a1a10',l:14}]});
P.onager=S('horse','desert','#c9a278',{l:'#e6cfa8',d:'#8a6a44',mz:'#f2ecdc',n:'#2a1a12',ir:'#3a2410',o:{ear:{k:'tall',w:13,h:28,x:16,y:20}},extra:[{k:'forelock',c:'#4a3a2a',l:12}]});
P.oryx=S('antel','desert','#cbb592',{l:'#e8dcc2',d:'#9a8462',mz:'#f4f0e6',n:'#1a1410',i:'#e3c9bd',ir:'#6a4a22',hc:'#3d332b',m:[{k:'gstripe',c:'#2a1c14',w:3.2},{k:'fpatch',c:'#3a2a20',y0:28,y1:50,w:12}],sc:.7,o:{horn:{k:'oryx',x:11,y:20,rot:18,s:.6}}});
const AN=(name,b,x,hk,hx)=>{P[name]=S('antel',x.s||'savanna',b,Object.assign({},x,{o:Object.assign(hk?{horn:{k:hk,x:11,y:20,rot:12,s:hx||.6}}:{},x.o||{})}))};
AN('waterbuck','#7a6a58',{mz:'#e8e2d6',m:[{k:'fpatch',c:'#e8e2d6',y0:100,y1:112,w:14,o:.9}],sc:.72,s:'reed',o:{}},'lyre');
AN('topi','#8a4a2a',{mz:'#3a2418',m:[{k:'gstripe',c:'#2a1a12',w:5,y0:60,y1:112}],sc:.72},'back');
AN('klipspringer','#8a8a62',{mz:'#d8d4bc',s:'rock',sc:.8},'spike',.7);
AN('gazelle','#c9955a',{mz:'#f6efe2',m:[{k:'gstripe',c:'#4a3020',w:2.4,y0:60,y1:112},{k:'cheek',c:'#f6efe2',x:16,y:80,w:8,h:16}],sc:.78,s:'steppe'},'gazelle',.8);
AN('sable','#3a2a22',{mz:'#2a2018',m:[{k:'gstripe',c:'#f4efe6',w:3,y0:60,y1:108}],sc:.64,s:'savanna',o:{}},'sabre',.55);
AN('duiker','#7a5a3a',{mz:'#c9b08a',sc:.84,s:'jungle'},'spike',.8);
AN('addax','#e8dcc0',{mz:'#f6f0e2',m:[{k:'fpatch',c:'#4a3a2a',y0:24,y1:40,w:12}],sc:.68,s:'desert'},'spiral',.6);
AN('impala','#b8744a',{mz:'#f2eadc',m:[{k:'gstripe',c:'#3a2418',w:2,y0:60,y1:110}],sc:.72},'lyre',.7);
AN('gerenuk','#b0825a',{mz:'#efe4d0',sc:.78,m:[{k:'cheek',c:'#efe4d0',x:16,y:78,w:8,h:16}],o:{ear:{w:15,h:26,x:24}}},'spike',.8);
AN('wildebeest','#4a4640',{mz:'#2a2622',m:[{k:'fpatch',c:'#2a2622',y0:26,y1:60,w:16,o:.8}],sc:.74,extra:['beard']},'wilde',.8);
AN('kudu','#8a7a68',{mz:'#e8e0d0',m:[{k:'gstripe',c:'#f4efe6',w:1.6,y0:56,y1:90},{k:'brow',c:'#f4efe6'}],sc:.62,o:{ear:{w:17,h:28,x:26}}},'spiral',.6);
AN('hartebeest','#a0643a',{mz:'#6a4026',sc:.72},'back',.8);
AN('goral','#8a7a62',{mz:'#e8e0cc',s:'rock',sc:.8},'goat',.7);
AN('saiga','#cdb68a',{mz:'#e8dcc0',s:'steppe',sc:.8,o:{nose:{k:'bull',y:122,s:1.3,mc:'#d8c8a8'}}},'spike',.7);
AN('oribi','#c49458',{mz:'#f2e8d4',sc:.84,s:'meadow'},'spike',.8);
AN('pronghorn','#c07a40',{mz:'#f6efe2',s:'steppe',sc:.72,m:[{k:'cheek',c:'#1a1410',x:16,y:70,w:8,h:10,o:.9}]},'pronghorn',.7);
AN('nilgai','#7a8290',{mz:'#e8ece8',sc:.76,m:[{k:'gstripe',c:'#f4f4f0',w:2.4,y0:56,y1:100}]},'spike',.8);
AN('chevrotain','#8a6038',{mz:'#e8dcc0',sc:.8,s:'jungle',extra:[{k:'tusks',x:7,y:128,s:.7}]});
AN('muskdeer','#7a5a3a',{mz:'#d8c8a8',sc:.8,s:'mountain',extra:[{k:'tusks',x:7,y:128,s:.8}],o:{ear:{k:'leaf',w:17,h:26,x:25}}});
P.takin=S('goat','mountain','#c9a24a',{l:'#e8c878',d:'#8a6a28',mz:'#8a6a38',n:'#1a1210',ir:'#4a3018',hc:'#3a2e22',sc:.8,o:{horn:{k:'takin',x:14,y:26,rot:0,s:.8},nose:{k:'bull',y:124,s:1.1,mc:'#4a3a2a'},fz:{n:90,len:7,w:3.4}}});
P.zebu=S('cow','savanna','#d8d2c4',{l:'#f0ece2',d:'#9a9484',mz:'#c9b8a8',n:'#3a2a24',ir:'#4a3018',hc:'#e6dcc0',sc:.8,o:{ear:{k:'drop',w:17,h:26,x:32,y:50,r:20},horn:{k:'cow',x:23,y:32,rot:-5,s:1}},extra:[{k:'ruffle',m:{n:30,r0:20,r1:38,w:5}}]});
P.cow=S('cow','meadow','#f2eee6',{l:'#ffffff',d:'#cfc8bb',mz:'#e6b8aa',n:'#3a2420',i:'#e9bcb0',ir:'#4a3018',hc:'#e3d6b8',m:[{k:'spots',c:'#241a14',n:7,r:[6,13],y0:24,y1:96}],o:{horn:{k:'cow',x:23,y:30,rot:-10,s:.8}}});
P.brcow=S('cow','meadow','#8a5030',{l:'#b07a50',d:'#4e2a16',mz:'#d8b8a0',n:'#3a2420',ir:'#3a2410',hc:'#e3d6b8',m:[{k:'blaze',c:'#f2eee6',y0:30,y1:100,w0:6,w1:11}],o:{horn:{k:'cow',x:23,y:30,rot:-10,s:.8}}});
P.anoa=S('cow','jungle','#3a3028',{l:'#5e4e40',d:'#1e1812',mz:'#2a2018',n:'#1a1210',ir:'#2a1a0e',hc:'#c9b88a',sc:.82,o:{horn:{k:'sabre',x:12,y:26,rot:30,s:.4}}});
P.bison=S('cow','steppe','#4a3424',{l:'#6a4e38',d:'#26190e',mz:'#2e2016',n:'#1a1210',ir:'#2a1a0e',hc:'#1e1812',sc:.8,o:{horn:{k:'bison',x:26,y:36,rot:-6,s:.9},fz:{n:120,len:9,w:5},neck:[46,64]},extra:[{k:'forelock',c:'#2a1c12',w:44,l:30},{k:'beard',c:'#2a1c12',y:128},{k:'sidemane',c:'#2a1c12',n:50,y0:30,h:70,l:26}],mc:['#2a1c12','#3a281a','#1e1409']});
P.yak=S('cow','mountain','#2e2622',{l:'#52463e',d:'#14100e',mz:'#1e1814',n:'#1a1210',ir:'#2a1a0e',hc:'#d8cfb8',sc:.8,o:{horn:{k:'yak',x:24,y:34,rot:-6,s:.8},fz:{n:120,len:9,w:5}},extra:[{k:'sidemane',c:'#1e1814',n:60,y0:30,h:80,l:34}],mc:['#1e1814','#2e2622','#14100e']});
P.aurochs=S('cow','forest','#2a2420',{l:'#4a423a',d:'#14100e',mz:'#d8cdb8',n:'#1a1210',ir:'#2a1a0e',hc:'#e6dcc0',sc:.78,o:{horn:{k:'cow',x:22,y:30,rot:-14,s:1}},m:[{k:'blaze',c:'#c9b890',y0:100,y1:125,w0:12,w1:12}]});
P.buffalo=S('cow','reed','#3e3a34',{l:'#5e5850',d:'#1c1916',mz:'#2a2622',n:'#1a1210',ir:'#2a1a0e',hc:'#3a342c',sc:.7,o:{horn:{k:'buffalo',x:20,y:28,rot:-4,s:.9},ear:{k:'leaf',w:15,h:24,x:33,y:46,r:72,in:'#7a6a60'}}});
P.gaur=S('cow','jungle','#3a2e26',{l:'#5a4838',d:'#1c1612',mz:'#2a2018',n:'#1a1210',ir:'#2a1a0e',hc:'#e0d6b8',sc:.76,m:[{k:'fpatch',c:'#e6dcc0',y0:24,y1:44,w:18,o:.9}],o:{horn:{k:'cow',x:22,y:26,rot:-8,s:.9}}});
P.muskox=S('cow','tundra','#3e3026',{l:'#5e4a38',d:'#1e150e',mz:'#2a2018',n:'#1a1210',ir:'#2a1a0e',hc:'#d8cfb0',sc:.8,o:{horn:{k:'musk',x:16,y:28,rot:0,s:.8},fz:{n:120,len:10,w:5}},extra:[{k:'sidemane',c:'#2a1e16',n:60,y0:30,h:90,l:40}],mc:['#2a1e16','#3e3026','#1a120c']});
P.mtgoat=S('goat','snow','#f0ece4',{l:'#ffffff',d:'#c4beb0',mz:'#f6f2ea',n:'#1a1210',ir:'#c8a23a',hc:'#241c18',o:{horn:{k:'chamois',x:11,y:24,rot:2,s:1},fz:{n:90,len:7,w:3.4}}});
/* ---- αίγες/πρόβατα ---- */
P.argali=S('goat','steppe','#a8906a',{l:'#d0bc94',d:'#6a563a',mz:'#efe6d2',n:'#1a1210',ir:'#a88a2a',hc:'#8a7658',sc:.74,o:{horn:{k:'ram',x:23,y:40,rot:0,s:1.1}},extra:[]});
P.goat=S('goat','mountain','#d8d2c4',{l:'#f4efe4',d:'#a89f8c',mz:'#ebe4d4',n:'#2a2018',i:'#e4bdb0',ir:'#c8a23a',hc:'#7a6a50',o:{horn:{k:'goat',x:10,y:24,rot:6,s:.9}}});
P.mouflon=S('goat','mountain','#8a5e38',{l:'#b08560',d:'#4e3220',mz:'#efe4d0',n:'#1a1210',ir:'#a88a2a',hc:'#8a7658',sc:.76,o:{horn:{k:'ram',x:22,y:40,rot:0,s:1}},extra:[]});
P.chamois=S('goat','mountain','#b8926a',{l:'#dcc29a',d:'#6e4e30',mz:'#f4ecd8',n:'#1a1210',ir:'#a8883a',hc:'#241c18',m:[{k:'gstripe',c:'#2a1c12',w:3.2,x0:10,x1:11,y0:60,y1:110}],o:{horn:{k:'chamois',x:11,y:24,rot:2,s:1}},extra:[]});
P.barbary=S('goat','desert','#bb8f5a',{l:'#dcb888',d:'#7a5430',mz:'#e8d4b0',n:'#1a1210',ir:'#a8883a',hc:'#4a3a2a',sc:.78,o:{horn:{k:'back',x:12,y:24,rot:8,s:1.1}},extra:['beard']});
P.sheep=S('goat','meadow','#f0ece2',{l:'#ffffff',d:'#bfb8a6',mz:'#6a5a4a',n:'#2a1c16',i:'#e4b4aa',ir:'#c8a23a',sc:.86,o:{fz:{n:140,len:8,w:5.4},fur:{n:260,len:5},ear:{k:'drop',x:30,y:48,w:15,h:15,r:10}},extra:[{k:'tuftcap',y:34,n:40,r:30,l:10,c:'#f0ece2'}]});
P.ram=S('goat','meadow','#e8e2d4',{l:'#fbf9f2',d:'#b8b09c',mz:'#7a6a58',n:'#2a1c16',ir:'#c8a23a',hc:'#8a7658',sc:.8,o:{horn:{k:'ram',x:23,y:40,rot:0,s:1},fz:{n:140,len:8,w:5.4}}});
P.bezoar=S('goat','rock','#9a7a52',{l:'#c4a678',d:'#5e4630',mz:'#d8c8a8',n:'#1a1210',ir:'#a8883a',hc:'#4a3a2a',sc:.7,o:{horn:{k:'sabre',x:12,y:24,rot:8,s:.8}},m:[{k:'gstripe',c:'#2a1c12',w:2,y0:64,y1:100}],extra:['beard']});
/* ---- ελάφια ---- */
const DR=(name,b,x)=>{P[name]=S('deer',x.s||'forest',b,x)};
DR('roe','#a5683a',{mz:'#f4efe6',n:'#1a1210',m:[{k:'cheek',c:'#f4efe6',x:12,y:114,w:14,h:8,o:.95}],sc:.8,o:{antler:{x:11,y:22,rot:8,s:.6,t:'fork'}},an:'#6a5238'});
DR('pudu','#7a5a3c',{mz:'#c9b08a',sc:.84,s:'jungle',o:{antler:{x:10,y:24,rot:4,s:.8,t:'spike'}},an:'#4a3a2a'});
DR('chital','#c28a52',{mz:'#f4ecdc',m:[{k:'wspots',c:'#fbf6ea',n:34,r:[1.2,2.2],y0:30,y1:110}],s:'jungle',sc:.74,o:{antler:{x:11,y:22,rot:10,s:.75,t:'tines'}},an:'#6a5238'});
DR('reddeer','#9a6a3e',{l:'#c19061',d:'#5e3a1e',mz:'#e9d6b8',i:'#e4b9a8',sc:.7,o:{antler:{x:11,y:22,rot:10,s:.8,t:'tines'}},an:'#7a5a38'});
DR('moose','#4a3a2e',{l:'#6a5646',d:'#241a12',mz:'#6a5646',s:'tundra',sc:.7,o:{antler:{x:14,y:22,rot:16,s:.9,t:'palm'},muz:{y:122,w:17,h:20},nose:{k:'bull',y:126,s:1.1,mc:'#5a4a3c'},extra:[]},an:'#8a6a45',extra:['beard']});
DR('reindeer','#7a6a5a',{l:'#a89a88',d:'#463a2e',mz:'#e8e2d6',s:'snow',sc:.66,o:{antler:{x:11,y:22,rot:10,s:.8,t:'reindeer'}},an:'#9a8a70'});
DR('watdeer','#b08a58',{mz:'#e8dcc0',s:'reed',sc:.82,o:{ear:{k:'round',w:20,h:20,x:28,y:36,r:30}},extra:[{k:'tusks',x:7,y:128,s:.8}]});
DR('fallow','#b8803e',{mz:'#f2e6cc',m:[{k:'wspots',c:'#fbf3e0',n:26,r:[1.2,2],y0:30,y1:110}],sc:.7,o:{antler:{x:12,y:22,rot:14,s:.8,t:'palm'}},an:'#8a6a45'});
/* ---- καμηλίδες / καμηλοπαρδάλεις ---- */
P.camel=S('camel','desert','#b88a56',{l:'#d9b27a',d:'#7a5530',mz:'#cfa56e',n:'#2a1a12',i:'#d8a79a'});
P.dromedary=S('camel','desert','#c9a070',{l:'#e6c796',d:'#8a6a40',mz:'#dcb888',n:'#2a1a12'});
P.llama=S('camel','mountain','#d8cfbc',{l:'#f2ece0',d:'#9a8f78',mz:'#efe6d6',n:'#2a1a12',o:{ear:{k:'tall',w:10,h:24,x:14,y:28,r:10},extra:[]},extra:[{k:'topknot',n:30,y:26,r:16,l:12,c:'#e8e0cc'}]});
P.alpaca=S('camel','mountain','#e8dcc4',{l:'#fbf6ea',d:'#b0a284',mz:'#f4ead6',n:'#2a1a12',o:{ear:{k:'tall',w:9,h:16,x:13,y:28,r:8},fz:{n:120,len:9,w:5.4}},extra:[{k:'topknot',n:44,y:30,r:20,l:18,c:'#f4ecd8'}]});
P.guanaco=S('camel','steppe','#b88a58',{l:'#d9b384',d:'#7a5632',mz:'#d8d4cc',n:'#2a1a12',o:{ear:{k:'tall',w:10,h:24,x:14,y:28,r:10}}});
P.vicuna=S('camel','mountain','#d0a66e',{l:'#ecc890',d:'#94693a',mz:'#f4ecdc',n:'#2a1a12',o:{ear:{k:'tall',w:9,h:22,x:14,y:28,r:10}}});
P.giraffe=S('giraffe','savanna','#e2b66a',{l:'#f3d492',d:'#a8742c',mz:'#f0d9a8',n:'#2a1a12',i:'#e4b9a8',hc:'#6a4a2c',m:[{k:'wspots',c:'#8a4a1a',n:30,r:[4,7],y0:28,y1:150}],o:{horn:{k:'ossicone',x:8,y:20,s:1.2}}});
P.okapi=S('giraffe','jungle','#5a3a2a',{l:'#7a5440',d:'#2e1e16',mz:'#c8b8a4',n:'#1a1210',i:'#e4b9a8',hc:'#3a2a20',m:[{k:'okapi',c:'#f4efe6'}],o:{horn:{k:'ossicone',x:8,y:22,s:.9},ear:{k:'leaf',w:15,h:24,x:22,y:36}}});
/* ---- χοιρίδες ---- */
P.peccary=S('pig','jungle','#5a5248',{l:'#7e7466',d:'#2e2a24',mz:'#8a7c6a',n:'#1e1612',ir:'#1a1210',m:[{k:'band',y:104,h:12,c:'#e8e0cc',o:.8}],o:{ear:{k:'leaf',w:11,h:14,x:26,y:40,r:10}}});
P.pig=S('pig','meadow','#e6b4a8',{l:'#f6d2c8',d:'#b87a72',mz:'#eeaaa0',n:'#8a5050',ir:'#3a2418',o:{ear:{k:'drop',x:30,y:44,w:20,h:22,r:35,in:'#d99a94'},fur:{n:60,len:2},fz:null}});
P.babirusa=S('pig','jungle','#8a8680',{l:'#b0aca4',d:'#4e4a44',mz:'#a09a90',n:'#2a2420',ir:'#2a1c10',extra:[{k:'tusks',x:8,y:112,s:1.8}],o:{ear:{k:'round',x:30,y:44,w:12,h:12},fz:null}});
P.warthog=S('pig','savanna','#8a7a66',{l:'#b0a088',d:'#4e4234',mz:'#a09078',n:'#2a2018',ir:'#2a1c10',extra:[{k:'tusks',x:17,y:118,s:1.7},{k:'sidemane',c:'#3a3028',n:30,y0:20,h:60,l:22}],mc:['#3a3028','#4a3e34','#2a2018'],m:[{k:'spots',c:'#6a5a46',n:4,r:[3,4],y0:70,y1:100}],o:{ear:{k:'leaf',x:27,y:40,w:12,h:18,r:20}}});
P.riverhog=S('pig','jungle','#c9722e',{l:'#e8a05a',d:'#8a4418',mz:'#f0e4cc',n:'#2a1c16',ir:'#2a1c10',extra:[{k:'tusks',x:15,y:118,s:1},{k:'topknot',n:30,y:30,r:12,l:16,c:'#f6f0e0'}],o:{ear:{k:'tall',x:24,y:36,w:11,h:22,r:14,tuft:1}}});
P.boar=S('pig','forest','#5e4e40',{l:'#87735e',d:'#33281f',mz:'#7a6650',n:'#1e1612',ir:'#2a1c10',extra:[{k:'tusks',x:15,y:118}]});
/* ---- παχύδερμα ---- */
P.elephant=S('elephant','savanna','#8f8a84',{l:'#b9b3aa',d:'#5e5953',mz:'#a49e94',n:'#2a2420',i:'#c99a90',extra:['trunk',{k:'tusks',x:20,y:116,s:1.4}]});
P.rhino=S('rhino','savanna','#8c8780',{l:'#b4aea4',d:'#5a554f',mz:'#9a948a',n:'#2a2420',i:'#9a8780'});
P.hippo=S('hippo','water','#8b7384',{l:'#b49aa8',d:'#5a4656',mz:'#a4888f',n:'#2a1a1e',i:'#a07880'});
P.tapir=S('tapir','jungle','#3a342f',{l:'#5e564e',d:'#1e1a17',mz:'#e6dfd0',n:'#1a1614',i:'#f0e8da'});
P.hyrax=S('cavy','rock','#8a6e50',{l:'#b49878',d:'#523e28',mz:'#d8c8a8',n:'#1a1210',ir:'#2a1c10',o:{ear:{k:'round',x:32,y:48,w:11,h:11},extra:[]}});
/* ---- πίθηκοι ---- */
P.chimp=S('ape','jungle','#2a2220',{l:'#4a3e38',d:'#17110f',mz:'#c9a58a',n:'#1a1210',i:'#c89a86',ir:'#3a2410'});
P.gorilla=S('ape','jungle','#26221f',{l:'#4a443e',d:'#100e0c',mz:'#2e2824',n:'#0e0c0a',i:'#2e2824',ir:'#3a2410',m:[{k:'brow',c:'#0e0c0a'}],o:{eye:{x:12,y:62,r:3.2},muz:{lobes:[[0,88,22,26]]},ear:{x:36,w:10,h:12,in:'#2e2824'}},extra:[{k:'crest',y:22,w:20,h:16}]});
P.orang=S('ape','jungle','#b8602a',{l:'#d8883e',d:'#7a3a14',mz:'#5a4a40',n:'#1a1210',i:'#5a4a40',ir:'#3a2410',o:{muz:{lobes:[[0,88,19,22]]},fz:{n:80,len:8,w:4}},extra:[{k:'flange',x:30,y:86,w:12,h:20,c:'#4a3c34'},{k:'beard',c:'#8a4418',y:104},{k:'sidemane',c:'#a8521e',n:50,y0:20,h:90,l:30}],mc:['#a8521e','#c96a2a','#7a3a14']});
P.gibbon=S('monkey','jungle','#3a3028',{l:'#5e5248',d:'#1c1612',mz:'#2a2420',n:'#1a1210',i:'#2a2420',ir:'#4a2a12',extra:[{k:'ring',w:26,y0:34,y1:76,c:'#efe6d4'}],o:{ear:null}});
P.macaque=S('monkey','forest','#9a7a56',{l:'#c4a27a',d:'#5e4630',mz:'#d8a79a',n:'#1a1210',i:'#d8a79a',ir:'#5a3818'});
P.barbmac=S('monkey','rock','#a8895c',{l:'#cfb084',d:'#6a5232',mz:'#c9a78a',n:'#1a1210',i:'#c9a78a',ir:'#5a3818'});
P.colobus=S('monkey','jungle','#15110f',{l:'#2e2824',d:'#0a0807',mz:'#2a2420',n:'#0a0807',i:'#2a2420',ir:'#3a2410',extra:[{k:'ring',w:30,y0:36,y1:70,c:'#f4efe4',skin:'#4a403a'}],o:{ear:null}});
P.langur=S('monkey','forest','#8a8a86',{l:'#b8b8b2',d:'#4a4a46',mz:'#1e1a18',n:'#0e0c0a',i:'#1e1a18',ir:'#4a2a12',extra:[{k:'tuftcap',y:34,n:30,r:30,l:12,c:'#d8d2c0'}],m:[{k:'cheek',c:'#1e1a18',x:0,y:84,w:20,h:24,o:.95}],o:{muz:{lobes:[[0,86,19,22]]}}});
P.guenon=S('monkey','jungle','#7a7a6e',{l:'#a8a89a',d:'#3e3e36',mz:'#2a2622',n:'#0e0c0a',i:'#2a2622',ir:'#6a4a1e',m:[{k:'fpatch',c:'#f4f0e6',y0:92,y1:100,w:8,o:.95}]});
P.patas=S('monkey','steppe','#c4783c',{l:'#e2a066',d:'#7e4620',mz:'#d9b8a0',n:'#1a1210',i:'#d8a79a',ir:'#6a4a1e',m:[{k:'brow',c:'#2a1a12'}]});
P.mangabey=S('monkey','jungle','#8a8680',{l:'#b4b0a8',d:'#4e4a44',mz:'#b09a8a',n:'#1a1210',i:'#b09a8a',ir:'#6a4a1e',m:[{k:'ringeye',c:'#efe6d6',x:12,y:63}]});
P.snubnose=S('monkey','mountain','#d9a850',{l:'#f0cc80',d:'#8a6224',mz:'#6fb4d2',n:'#2a3a4a',i:'#6fb4d2',ir:'#3a2410',o:{nose:{k:'prim',y:76,c:'#1a2a3a'}}});
P.mandrill=S('baboon','jungle','#6a5a3e',{l:'#8e7c58',d:'#3a3022',mz:'#b83a3a',n:'#d8302a',i:'#8a6a58',ir:'#4a2a12',m:[{k:'gstripe',c:'#3a8ad0',x0:11,x1:14,y0:76,y1:124,w:6}],extra:[{k:'beard',c:'#e8c24a',y:128}]});
P.baboon=S('baboon','savanna','#8a7a58',{l:'#b4a47c',d:'#4e4430',mz:'#4a3a36',n:'#1a1210',i:'#c9a78a',ir:'#7a4a18',extra:[{k:'sidemane',c:'#6a5a3e',n:40,y0:20,h:70,l:26}],mc:['#6a5a3e','#8a7a58','#4e4430']});
P.gelada=S('baboon','mountain','#6a4a30',{l:'#8e6a48',d:'#38281a',mz:'#a08672',n:'#1a1210',i:'#a08672',ir:'#5a3818',extra:[{k:'sidemane',c:'#4a3220',n:60,y0:20,h:90,l:34}],mc:['#4a3220','#6a4a30','#2e1e12'],o:{muz:{lobes:[[0,100,15,26]]}}});
P.colugo=S('lemur','jungle','#8a7a68',{l:'#b4a48e',d:'#4a3e30',mz:'#a89a84',n:'#3a2a24',i:'#a89a84',ir:'#2a1a0e',m:[{k:'spots',c:'#f0e8d8',n:20,r:[1.2,2.4],y0:26,y1:110}],o:{eye:{r:5.6,pt:'round'},nose:{k:'wet',y:100,s:1.1}}});
/* ---- λεμούριοι ---- */
P.ringtail=S('lemur','forest','#8e8a86',{l:'#bdb8b2',d:'#5e5a56',mz:'#f2eee8',n:'#1a1210',ir:'#c9902c',m:[{k:'ringeye',c:'#17110f',x:15,y:68}]});
P.sifaka=S('lemur','forest','#f0ece2',{l:'#ffffff',d:'#b8b2a2',mz:'#3a302a',n:'#1a1210',ir:'#c9902c',o:{ear:{k:'round',x:23,y:44,w:9,h:9,in:'#3a302a'},nose:{k:'wet',y:108,s:1.3},muz:{y:104,w:12,h:20,},fz:{n:100,len:6,w:3.4}},m:[{k:'fpatch',c:'#3a302a',y0:74,y1:118,w:14,o:.95}]});
P.indri=S('lemur','jungle','#2a2420',{l:'#4a423a',d:'#100e0c',mz:'#1e1a18',n:'#0e0c0a',ir:'#6a4a1e',o:{ear:{k:'round',x:30,y:38,w:14,h:14,in:'#1e1a18',tuft:0}},extra:[{k:'ruffle',m:{n:50,r0:30,r1:46,w:6,a0:.2,a1:1.8,c1:'#efe6d4',c2:'#f4efe4',c3:'#c8c0ac'}}]});
P.loris=S('lemur','jungle','#a89a82',{l:'#cdc2a8',d:'#6a5e48',mz:'#e8dcc0',n:'#2a1a16',ir:'#2a1a0e',m:[{k:'eyepatch',c:'#4a3a2e',x:15,y:68,w:8,h:10,rot:0},{k:'blaze',c:'#efe6d4',y0:36,y1:104,w0:3,w1:4}],o:{eye:{r:6.2,x:15},ear:{k:'round',x:30,y:44,w:7,h:7}}});
P.tarsier=S('lemur','jungle','#9a8466',{l:'#c2ac8a',d:'#5e4a32',mz:'#cfb894',n:'#c98a8a',ir:'#3a2410',o:{eye:{r:9,x:19,y:68,pt:'round'},ear:{k:'leaf',x:32,y:46,w:18,h:26,r:70,in:'#cfa088'},nose:{k:'rod',y:98,s:1.4,c:'#c98a8a'}}});
P.ayeaye=S('lemur','jungle','#3a2e24',{l:'#5e4e3e',d:'#1c1510',mz:'#8a7a68',n:'#c98a8a',ir:'#c8a02a',o:{eye:{r:6,x:16,y:68},ear:{k:'round',x:32,y:46,w:16,h:20,r:20,in:'#a88a7a',c:'#2e241c'},nose:{k:'rod',y:98,s:1.2,c:'#d99a9a'}},extra:[{k:'teeth',y:100,h:6}]});
P.galago=S('lemur','forest','#b0a088',{l:'#d6c8ae',d:'#6e604a',mz:'#e8dcc4',n:'#2a1a16',ir:'#2a1a0e',o:{eye:{r:7,x:16,y:68},ear:{k:'leaf',x:30,y:40,w:18,h:26,r:30,in:'#d8a8a0'},nose:{k:'wet',y:104,s:1}}});
/* ---- πλατύρρινοι ---- */
P.woolly=S('monkey','jungle','#7a7468',{l:'#a29a8a',d:'#3e3a32',mz:'#2a2420',n:'#0e0c0a',i:'#2a2420',ir:'#4a2a12',o:{muz:{lobes:[[0,88,17,20]]}}});
P.spider=S('monkey','jungle','#2e2622',{l:'#52463e',d:'#14100e',mz:'#c9a58a',n:'#1a1210',i:'#c9a58a',ir:'#4a2a12',extra:[{k:'ring',w:22,y0:48,y1:76,c:'#d8c8a8'}],o:{ear:null,muz:{lobes:[[0,86,15,18]]}}});
P.uakari=S('monkey','jungle','#f0e8d8',{l:'#ffffff',d:'#b8ac92',mz:'#d8382e',n:'#7a1a14',i:'#d8382e',ir:'#4a2a12',m:[],o:{muz:{lobes:[[0,82,23,28]]},ear:{c:'#d8382e',in:'#a82a22'},eye:{x:13}}});
P.saki=S('monkey','jungle','#3a322a',{l:'#6a5e50',d:'#17110f',mz:'#2a2420',n:'#0e0c0a',i:'#2a2420',ir:'#4a2a12',m:[{k:'fpatch',c:'#f0ead8',y0:34,y1:70,w:22,o:.9}],o:{ear:null,fz:{n:100,len:8,w:4}}});
P.leontam=S('monkey','jungle','#e08a2a',{l:'#f6b44e',d:'#9a5214',mz:'#3a2a20',n:'#1a1210',i:'#3a2a20',ir:'#2a1a0e',o:{muz:{lobes:[[0,88,14,16]]}},extra:[{k:'ruffle',m:{n:90,r0:30,r1:50,w:8,a0:.1,a1:1.9,c1:'#d9781a',c2:'#f0a030',c3:'#b8600e'}}]});
P.marmoset=S('monkey','forest','#8a7a62',{l:'#b4a48a',d:'#4a3e2e',mz:'#d9c0aa',n:'#1a1210',i:'#d9c0aa',ir:'#2a1a0e',o:{ear:{k:'round',x:30,y:56,w:8,h:8,tuft:0}},extra:[{k:'ruffle',m:{n:30,r0:30,r1:46,w:5,a0:.0,a1:2,c1:'#f4f0e4',c2:'#e8e2d0',c3:'#cfc8b4'}}],m:[{k:'fpatch',c:'#f4f0e4',y0:36,y1:48,w:14,o:.9}]});
P.howler=S('monkey','jungle','#5e3a28',{l:'#8a5a3e',d:'#2e1a10',mz:'#2a1a14',n:'#0e0c0a',i:'#2a1a14',ir:'#3a2410',extra:[{k:'beard',c:'#3e2418',y:106}],o:{muz:{lobes:[[0,88,17,20]]}}});
P.capuchin=S('monkey','jungle','#d8c19a',{l:'#f0e0bc',d:'#8a7650',mz:'#e8d0b8',n:'#1a1210',i:'#e8d0b8',ir:'#4a2a12',extra:[{k:'tuftcap',y:40,n:40,r:30,l:10,c:'#3a2e24'}],m:[{k:'fpatch',c:'#3a2e24',y0:26,y1:46,w:24,o:.95}]});
P.tamarin=S('monkey','jungle','#3a3028',{l:'#5e5248',d:'#1c1612',mz:'#2a2420',n:'#0e0c0a',i:'#2a2420',ir:'#2a1a0e',o:{ear:{k:'round',x:30,y:56,w:8,h:8}},extra:[{k:'ruffle',m:{n:40,r0:28,r1:46,w:5,a0:.4,a1:1.6,c1:'#f4f0e4',c2:'#f4f0e4',c3:'#e8e2d0'}}]});
P.owlmonk=S('monkey','night','#8a8478',{l:'#b4aea0',d:'#4a463e',mz:'#e8e2d6',n:'#1a1210',i:'#d8c8b8',ir:'#8a5a18',o:{eye:{r:6,x:13,y:62},ear:{k:'round',x:32,y:60,w:8,h:8}},m:[{k:'eyepatch',c:'#2a2420',x:13,y:62,w:9,h:12,rot:0},{k:'gstripe',c:'#efe6d6',x0:6,x1:6,y0:40,y1:62,w:2.4}]});
P.squirrelmonk=S('monkey','jungle','#8a8a52',{l:'#b4b478',d:'#4e4e2a',mz:'#f4efe0',n:'#1a1210',i:'#f4efe0',ir:'#2a1a0e',m:[{k:'mask',c:'#f4efe0'}],o:{muz:{lobes:[[0,98,12,10]]},ear:{k:'round',x:30,y:56,w:8,h:8,tuft:0}}});
P.midas=S('monkey','jungle','#1e1814',{l:'#3a3028',d:'#0c0a08',mz:'#17120f',n:'#0e0c0a',i:'#17120f',ir:'#2a1a0e',extra:[{k:'ruffle',m:{n:30,r0:28,r1:42,w:5,a0:.3,a1:1.7,c1:'#17120f',c2:'#2a2420',c3:'#0c0a08'}}]});
/* ---- τρωκτικά ---- */
P.rat=S('rodent','meadow','#8a7058',{l:'#b39878',d:'#54402c',mz:'#e6d6c0',n:'#e4aeb0',i:'#e4aeb0'});
P.mouse=S('rodent','meadow','#a89478',{l:'#cdbca0',d:'#6a5a44',mz:'#efe6d6',n:'#e4aeb0',i:'#e4aeb0',o:{ear:{w:18,h:17,x:30,y:38}}});
P.hamster=S('rodent','meadow','#c9a06a',{l:'#e8c796',d:'#8a6a3c',mz:'#f4ecdc',n:'#d99a9a',i:'#e4aeb0',o:{muz:{lobes:[[-14,100,14,13],[14,100,14,13],[0,106,10,8]]},hs:1.05}});
P.vole=S('rodent','meadow','#8a7258',{l:'#ae9674',d:'#52402c',mz:'#cfc0a0',n:'#d99a9a',i:'#c9a098',o:{ear:{k:'round',w:9,h:9,x:28,y:42,in:'#c9a098'}}});
P.gerbil=S('rodent','desert','#c9a870',{l:'#e8cd98',d:'#8a6c3c',mz:'#f4ecd8',n:'#d99a9a',i:'#e4aeb0',m:[],o:{eye:{r:4.2,pt:'bead'}}});
P.jerboa=S('rodent','desert','#d8b888',{l:'#f0dcb0',d:'#9a7c4c',mz:'#f8f0e0',n:'#d99a9a',i:'#e4aeb0',o:{ear:{k:'tall',w:14,h:28,x:20,y:42,r:8},eye:{r:5,pt:'bead'}}});
P.beaver=S('rodent','water','#6a4a2c',{l:'#8e6a42',d:'#3a2814',mz:'#8e6a42',n:'#1a1210',i:'#4a3220',o:{ear:{x:29,y:44,w:9,h:9,in:'#3a2814'},nose:{k:'bear',y:92,s:.9}},extra:[{k:'teeth',y:102,h:9,c:'#e08a3a'}]});
P.muskrat=S('rodent','water','#6a4a30',{l:'#8e6a48',d:'#3a2814',mz:'#a08868',n:'#1a1210',i:'#4a3220',o:{ear:{k:'round',x:30,y:44,w:7,h:7}}});
P.nutria=S('cavy','water','#7a5a3a',{l:'#a07c56',d:'#46301a',mz:'#e8dcc8',n:'#2a1a16',i:'#4a3220',extra:[{k:'teeth',y:104,h:7,c:'#e0862e'}],o:{ear:{x:30,y:44,w:8,h:8}}});
P.gundi=S('cavy','rock','#b49a70',{l:'#d6c196',d:'#7a6644',mz:'#ece0c4',n:'#d99a9a',i:'#c9a098',o:{ear:{k:'round',x:30,y:44,w:9,h:9}}});
P.squirrel=S('rodent','forest','#b55a2a',{l:'#d88458',d:'#7a3814',mz:'#f4ecdc',n:'#2a1a16',i:'#c9a098',o:{ear:{k:'point',w:11,h:17,x:28,y:38,r:10,tuft:1,in:'#c9a098'},eye:{pt:'bead',r:4}}});
P.chipmunk=S('rodent','forest','#a8744a',{l:'#cfa070',d:'#6a4428',mz:'#f4ecdc',n:'#2a1a16',i:'#c9a098',m:[{k:'gstripe',c:'#2a1c12',x0:10,x1:10,y0:30,y1:100,w:2.4},{k:'gstripe',c:'#f4efe0',x0:16,x1:16,y0:34,y1:100,w:3}],o:{ear:{k:'round',w:10,h:10,x:28,y:40}}});
P.prairiedog=S('rodent','steppe','#b89a6c',{l:'#d8c094',d:'#7a6240',mz:'#f0e4cc',n:'#2a1a16',i:'#c9a098',o:{ear:{k:'round',w:8,h:8,x:28,y:44},eye:{r:4.4,pt:'bead'}}});
P.marmot=S('rodent','mountain','#8a6a48',{l:'#b49272',d:'#4e3822',mz:'#e8d8bc',n:'#2a1a16',i:'#c9a098',o:{ear:{k:'round',w:9,h:9,x:30,y:46}},m:[{k:'cheek',c:'#e8d8bc',x:20,y:86,w:8,h:12}]});
P.souslik=S('rodent','steppe','#b0946a',{l:'#d4bc94',d:'#74603e',mz:'#f0e6d0',n:'#2a1a16',i:'#c9a098',m:[{k:'dots',c:'#f4eedd',n:14,r:[1,1.8]}],o:{ear:{k:'round',w:7,h:7,x:29,y:46},eye:{r:4.4,pt:'bead'}}});
P.dormouse=S('rodent','forest','#a88a64',{l:'#cdb48c',d:'#6a523a',mz:'#f2e8d4',n:'#2a1a16',i:'#d8aaa0',m:[{k:'eyepatch',c:'#2a2018',x:15,y:66,w:9,h:6,rot:0}],o:{ear:{k:'round',w:10,h:10,x:29,y:42},eye:{pt:'bead',r:4.4}}});
P.gopher=S('rodent','meadow','#8a6a4a',{l:'#b08e6c',d:'#4e3622',mz:'#cdb496',n:'#2a1a16',i:'#c9a098',o:{ear:{k:'round',w:6,h:6,x:28,y:46},eye:{r:2.6,pt:'bead'}},extra:[{k:'teeth',y:100,h:6}]});
P.kangrat=S('rodent','desert','#c9a070',{l:'#e6c796',d:'#8a6a40',mz:'#f6eeda',n:'#2a1a16',i:'#c9a098',o:{eye:{r:5,pt:'bead'}}});
P.mountainbeaver=S('rodent','forest','#5e4a36',{l:'#85694e',d:'#2e2014',mz:'#8a7258',n:'#2a1a16',i:'#4a3626',o:{ear:{k:'round',w:8,h:8,x:30,y:44}}});
P.guineapig=S('cavy','meadow','#c98a4e',{l:'#ecb67a',d:'#8a5a2a',mz:'#f6ecdc',n:'#e4aeb0',i:'#e4aeb0',m:[{k:'blaze',c:'#f6efe2',y0:30,y1:108,w0:6,w1:10}]});
P.capybara=S('cavy','water','#8a6a48',{l:'#b08e68',d:'#4e3a24',mz:'#a08462',n:'#1a1210',i:'#6a5238',o:{h:'cavy',nose:{k:'bull',y:100,s:.9,mc:'#6a5238'},ear:{k:'round',w:8,h:8,x:30,y:42}}});
P.chinchilla=S('cavy','mountain','#a8a8a8',{l:'#d0d0d0',d:'#6a6a6e',mz:'#f0f0ee',n:'#d99a9a',i:'#e4aeb0',o:{ear:{k:'round',w:20,h:22,x:30,y:46,r:25}}});
P.degu=S('cavy','steppe','#a89066',{l:'#cdb68a',d:'#6a5a3c',mz:'#e8dcc0',n:'#d99a9a',i:'#d8aaa0',o:{ear:{k:'round',w:12,h:12,x:30,y:44}}});
P.porcupine=S('round','rock','#5e4e3e',{l:'#85735e',d:'#2e241a',mz:'#a89a84',n:'#2a1a16',i:'#c9a098',ir:'#1a1210',extra:[{k:'quills',r:36,l:26,n:130,cy:80,sx:1.3,sy:1,c2:'#efe6d0'}],o:{ear:{k:'round',x:28,y:44,w:8,h:8},fz:null,hs:.8}});
P.newporc=S('round','forest','#4a3e32',{l:'#6e5e4c',d:'#241a12',mz:'#8a7a64',n:'#2a1a16',i:'#c9a098',ir:'#1a1210',extra:[{k:'quills',r:34,l:22,n:110,cy:80,sx:1.3,sy:1,c2:'#efe6d0'}],o:{ear:{k:'round',x:28,y:44,w:8,h:8},fz:null,hs:.8}});
P.agouti=S('cavy','jungle','#8a5a2e',{l:'#b4824e',d:'#4a2e14',mz:'#d8b890',n:'#2a1a16',i:'#c9a098',o:{ear:{k:'round',w:9,h:9,x:30,y:44}}});
P.hutia=S('cavy','jungle','#6e5a3e',{l:'#947c58',d:'#3a2e1c',mz:'#c9b090',n:'#2a1a16',i:'#c9a098'});
P.cavy=P.guineapig;
P.spinyrat=S('rodent','jungle','#8a6a42',{l:'#b08e64',d:'#4e3a22',mz:'#e8dcc4',n:'#d99a9a',i:'#c9a098'});
P.giantrat=S('rodent','jungle','#8a8070',{l:'#b2a892',d:'#544c3e',mz:'#e8e0d0',n:'#d99a9a',i:'#c9a098'});
P.molerat=S('rodent','desert','#e0b8a8',{l:'#f4d6c8',d:'#b08a7a',mz:'#f4d6c8',n:'#e4aeb0',i:'#e4aeb0',o:{ear:null,eye:{r:2,pt:'bead'}},extra:[{k:'teeth',y:104,h:10,c:'#f0e6c8'}],fur:{n:40}});
P.anomalure=S('rodent','jungle','#8a7a62',{l:'#b2a288',d:'#4e4432',mz:'#e8dcc4',n:'#d99a9a',i:'#e4aeb0',o:{ear:{k:'round',w:12,h:12,x:28,y:42},eye:{r:4.6,pt:'bead'}}});
P.pika=S('rodent','mountain','#9a8466',{l:'#bea88a',d:'#5e4c34',mz:'#e8dcc4',n:'#2a1a16',i:'#d8aaa0',o:{ear:{k:'round',w:15,h:16,x:30,y:42}}});
P.hare=S('rabbit','steppe','#a8845a',{l:'#d0b080',d:'#6a5030',mz:'#f0e6d4',n:'#2a1a16',i:'#d8a8a0',o:{ear:{h:54,w:14,k:'tall',x:12,y:40},eye:{x:27,y:60,ir:'#b87a2a'},fur:{n:300}}});
P.rabbit=S('rabbit','meadow','#9a8672',{l:'#c4b098',d:'#5e4c3a',mz:'#efe6d8',n:'#d99a9a',i:'#e8b4b4'});
P.lagomorph=P.rabbit;
/* ---- εντομοφάγα κ.λπ. ---- */
P.hedgehog=S('hog','meadow','#a89478',{l:'#cfbea0',d:'#6a5a44',mz:'#d8c8b0',n:'#17110f',i:'#e4aeb0',extra:[{k:'quills',r:34,l:16,n:150,cy:78,sx:1.25,sy:1}]});
P.mole=S('hog','meadow','#3a3836',{l:'#5a5654',d:'#1c1a19',mz:'#4a4644',n:'#d98888',i:'#4a4644',o:{ear:null,eye:{r:1.6,pt:'bead'},nose:{k:'none'}},extra:[{k:'starnose',y:130}]});
P.tenrec=S('hog','jungle','#b09a78',{l:'#d6c4a0',d:'#6e5e42',mz:'#e8dcc0',n:'#2a1a16',i:'#e4aeb0',extra:[{k:'quills',r:32,l:12,n:120,cy:80,sx:1.2,sy:.9,c2:'#d8c8a0'}]});
P.shrew=S('hog','forest','#6a5a4a',{l:'#8e7c68',d:'#3a2e22',mz:'#a89a84',n:'#d99a9a',i:'#e4aeb0',o:{eye:{r:2.2,pt:'bead'}}});
P.watershrew=S('hog','water','#2e2a28',{l:'#4e4844',d:'#14110f',mz:'#d8d2c8',n:'#d99a9a',i:'#e4aeb0',o:{eye:{r:2.2,pt:'bead'}}});
P.desman=S('hog','water','#4a3e3a',{l:'#6e5e58',d:'#241c18',mz:'#c9b8b0',n:'#d98888',i:'#4a3e3a',o:{ear:null,eye:{r:2,pt:'bead'}},wh:{n:5,l:26}});
P.elephantshrew=S('hog','steppe','#a8724a',{l:'#cf9a6e',d:'#6a4428',mz:'#e8d4b8',n:'#17110f',i:'#e4aeb0',o:{eye:{r:4.6,pt:'bead'},ear:{k:'round',w:14,h:14,x:26,y:44}},m:[{k:'ringeye',c:'#f4ece0',x:12,y:62}]});
P.treeshrew=S('hog','jungle','#8a5a3a',{l:'#b2825a',d:'#4a2e1a',mz:'#e0c8a8',n:'#17110f',i:'#d8a098',o:{eye:{r:4.2,pt:'bead'}}});
P.aardvark=S('tube','savanna','#a8957a',{l:'#cdbca0',d:'#6a5a44',mz:'#d8c8ae',n:'#2a1a16',i:'#e0b0a6',ir:'#2a1a0e',o:{ear:{k:'tall',w:16,h:36,x:20,y:34}}});
P.anteater=S('tube','jungle','#7a6e5e',{l:'#a29684',d:'#3e3628',mz:'#9a8e7a',n:'#2a1a16',i:'#4a4034',ir:'#1a1210',o:{ear:{k:'round',x:22,y:34,w:9,h:9},eye:{x:12,y:60,r:2.8,pt:'bead'}},m:[{k:'gstripe',c:'#17110f',x0:14,x1:20,y0:70,y1:110,w:6}]});
P.armadillo=S('round','steppe','#a89a88',{l:'#cdc2b2',d:'#6a5e4e',mz:'#d8cec0',n:'#2a1a16',i:'#c9a098',ir:'#1a1210',m:[{k:'scales',c:'#4a4034',w:9}],o:{ear:{k:'round',x:30,y:36,w:10,h:10},fur:{n:0}}});
P.sloth=S('round','jungle','#b0a088',{l:'#d6c8ae',d:'#6e604a',mz:'#e0d4b8',n:'#17110f',i:'#cdbc98',ir:'#1a1210',m:[{k:'eyepatch',c:'#3a2e24',x:17,y:64,w:11,h:7,rot:-28}],o:{ear:null,eye:{x:17,y:64,r:3,pt:'bead'},mouthp:{k:'smile',y:104,w:9,d:5}}});
P.pangolin=S('tube','savanna','#9a8a70',{l:'#c0b096',d:'#5a4e3a',mz:'#a89a80',n:'#2a1a16',i:'#a89a80',ir:'#1a1210',m:[{k:'scales',c:'#4a3e2c',w:8}],o:{ear:null,eye:{x:13,y:60,r:3,pt:'bead'}},fur:{n:0}});
P.echidna=S('tube','steppe','#4a3a2e',{l:'#6a5646',d:'#241a12',mz:'#c9b8a0',n:'#17110f',i:'#4a3a2e',ir:'#1a1210',o:{ear:null,eye:{x:12,y:60,r:2.6,pt:'bead'}},extra:[{k:'quills',r:32,l:18,n:90,cy:76,sx:1.2,sy:1,c2:'#e8dcc0'}]});
P.platypus=S('round','water','#5e4a38',{l:'#85694e',d:'#2e2014',mz:'#5e4a38',n:'#17110f',i:'#5e4a38',ir:'#1a1210',o:{ear:null,eye:{x:20,y:64,r:2.6,pt:'bead'},nose:{k:'none'},mouthp:null},extra:['bill']});
/* ---- μαρσιποφόρα ---- */
P.kangaroo=S('roo','desert','#b9774a',{l:'#d9a074',d:'#7a4628',mz:'#ecd8c0',n:'#2a1a16',i:'#e3b0a6'});
P.wallaby=S('roo','forest','#8a7a62',{l:'#b2a288',d:'#4e4432',mz:'#e8dcc4',n:'#2a1a16',i:'#e3b0a6',m:[{k:'gstripe',c:'#efe6d6',x0:10,x1:11,y0:90,y1:112,w:2}]});
P.treeroo=S('roo','jungle','#8a5a34',{l:'#b2825a',d:'#4a2e18',mz:'#d8b88e',n:'#2a1a16',i:'#e3b0a6',o:{ear:{k:'round',x:26,y:38,w:12,h:12,r:8},eye:{r:4.6}}});
P.koala=S('koala','forest','#8e9094',{l:'#b8babd',d:'#5e6064',mz:'#d9d8d2',n:'#17110f',i:'#f0e8e0'});
P.wombat=S('round','steppe','#7a6a58',{l:'#a29280',d:'#3e342a',mz:'#9a8a76',n:'#17110f',i:'#c9a098',o:{ear:{k:'round',x:30,y:36,w:11,h:11},nose:{k:'bear',y:90,s:1.5,c:'#17110f'},eye:{r:2.8,x:21,y:62,pt:'bead'}}});
P.possum=S('rodent','forest','#a8a090',{l:'#d0c8b8',d:'#6a6256',mz:'#f0ece2',n:'#d99a9a',i:'#e8b4b4',o:{ear:{k:'round',w:20,h:20,x:30,y:42,r:12,c:'#2a2420'},eye:{r:4.4,pt:'bead'},nose:{k:'rod',y:100,s:1.5,c:'#d99a9a'}},extra:[]});
P.devil=S('round','forest','#2a2422',{l:'#4a423e',d:'#100e0d',mz:'#2a2422',n:'#17110f',i:'#e0a09a',ir:'#2a1a12',o:{ear:{k:'round',x:32,y:38,w:18,h:18,in:'#e0a09a',c:'#2a2422'},nose:{k:'bear',y:92}}});
P.dasyurid=S('hog','desert','#b09070',{l:'#d4b896',d:'#6e5238',mz:'#ecdcc0',n:'#2a1a16',i:'#e4aeb0',o:{eye:{r:4,pt:'bead'},ear:{k:'round',x:24,y:38,w:12,h:12}}});
P.glider=S('rodent','night','#9a9a98',{l:'#c4c4c0',d:'#5a5a58',mz:'#efece6',n:'#d99a9a',i:'#e4aeb0',o:{eye:{r:6,pt:'bead'},ear:{k:'round',x:30,y:42,w:16,h:16,r:12}},m:[{k:'gstripe',c:'#2a2624',x0:0,x1:0,y0:24,y1:76,w:3}]});
P.cuscus=S('rodent','jungle','#8a8a82',{l:'#b2b2a8',d:'#4a4a42',mz:'#ecdcc0',n:'#d99a9a',i:'#e4aeb0',o:{eye:{r:6,pt:'bead',ir:'#8a4a1a'},ear:{k:'round',x:30,y:46,w:8,h:8}}});
P.honeypossum=S('hog','jungle','#a89478',{l:'#cdbca0',d:'#6a5a44',mz:'#e0d4bc',n:'#2a1a16',i:'#e4aeb0',m:[{k:'gstripe',c:'#3a2e22',x0:0,x1:0,y0:24,y1:80,w:2}],o:{eye:{r:4.6,pt:'bead'}}});
P.bandicoot=S('hog','steppe','#a08a68',{l:'#c8b490',d:'#665238',mz:'#e8dcc4',n:'#2a1a16',i:'#e4aeb0',o:{ear:{k:'tall',w:14,h:24,x:24,y:38,r:10},eye:{r:4.2,pt:'bead'}}});
P.numbat=S('hog','forest','#c47a4a',{l:'#e2a278',d:'#7e4a28',mz:'#efe0c8',n:'#17110f',i:'#e4aeb0',m:[{k:'tiger',c:'#f4ece0',}],o:{ear:{k:'round',x:24,y:40,w:11,h:11}}});
P.marsmole=S('hog','desert','#e8d0b0',{l:'#f8ecd8',d:'#b09878',mz:'#e8d0b0',n:'#d99a9a',i:'#e8d0b0',o:{ear:null,eye:{r:1.6,pt:'bead'},nose:{k:'rod',y:134,s:2,c:'#d99a9a'}},fur:{n:80}});
P.mountpossum=P.possum;
/* ---- θαλάσσια ---- */
P.seal=S('seal','coast','#8e9496',{l:'#bcc2c2',d:'#565c60',mz:'#d9dcd8',n:'#17110f',i:'#8e9496',m:[{k:'spots',c:'#3a3e42',n:14,r:[2,4],y0:30,y1:110}]});
P.graysea=S('seal','coast','#8a8a82',{l:'#b4b4aa',d:'#4e4e48',mz:'#d4d4cc',n:'#17110f',i:'#8e9496',o:{muz:{lobes:[[0,104,16,16]]},nose:{k:'snout',y:92,s:1.4}}});
P.furseal=S('seal','coast','#5e5448',{l:'#85786a',d:'#2e2820',mz:'#d8cfc0',n:'#17110f',i:'#5e5448',o:{ear:{k:'point',x:34,y:54,w:7,h:10,r:30,c:'#3e362c',in:'#3e362c'}}});
P.sealion=S('seal','coast','#7a5a3c',{l:'#a08060',d:'#3e2a18',mz:'#a08060',n:'#17110f',i:'#5a4028',o:{ear:{k:'point',x:34,y:54,w:7,h:10,r:30,c:'#4a3420',in:'#4a3420'},neck:[44,66]}});
P.walrus=S('seal','snow','#a8745a',{l:'#d09a7c',d:'#6a4030',mz:'#d8c0a8',n:'#2a1a16',i:'#a8745a',o:{eye:{r:3,pt:'bead'},muz:{lobes:[[-10,100,16,12],[10,100,16,12]]},wh:{n:6,l:12,w:1,y:100,g:3,dr:6}},extra:[{k:'tusks',x:14,y:106,s:2},{k:'bristles',y:102,h:14,w:36,n:70,c:'#f0e4c8'}]});
P.elseal=S('seal','coast','#8a7a68',{l:'#b2a290',d:'#4e4234',mz:'#a89a88',n:'#17110f',i:'#8a7a68',extra:[{k:'proboscis',c:'#8a7a68'}],o:{eye:{r:6.6,pt:'bead'}}});
P.hooded=S('seal','snow','#7a7e82',{l:'#a6aaae',d:'#3e4246',mz:'#c4c8ca',n:'#17110f',i:'#7a7e82',m:[{k:'spots',c:'#26292c',n:20,r:[2,4.6],y0:30,y1:110}],extra:[{k:'proboscis',c:'#c0402c'}]});
P.manatee=S('seal','water','#8a8a84',{l:'#b4b4ae',d:'#4e4e48',mz:'#a0a09a',n:'#2a2420',i:'#8a8a84',o:{eye:{r:2.2,pt:'bead',x:22,y:62},muz:{lobes:[[0,104,22,20]]},nose:{k:'wet',y:92,s:1.4,c:'#2a2420'},wh:{n:6,l:8,w:1,y:106,g:3,dr:5}},extra:[{k:'bristles',y:110,h:16,w:36,n:60,c:'#cfcfc8'}]});
P.dugong=S('seal','sea','#a09a90',{l:'#c8c2b8',d:'#5e5a52',mz:'#b4aea2',n:'#2a2420',i:'#a09a90',o:{eye:{r:2.2,pt:'bead',x:20,y:60},muz:{lobes:[[0,108,18,22]]},nose:{k:'wet',y:90,s:1.2,c:'#2a2420'}},extra:[{k:'tusks',x:8,y:122,s:.8},{k:'bristles',y:118,h:12,w:28,n:40,c:'#cfc8b8'}]});
/* ---- νυχτερίδες ---- */
P.fruitbat=S('bat','night','#6a5040',{l:'#9a7a5c',d:'#3a2a1e',mz:'#c9a98a',o:{bat:{t:'fox',ear:.7}}});
P.leafbat=S('bat','cave','#4a4a52',{l:'#7a7a82',d:'#2a2a30',mz:'#9a9aa2',o:{bat:{t:'leaf',ear:1.2}}});
P.horseshoe=S('bat','cave','#7a6a60',{l:'#a69688',d:'#3e342c',mz:'#c4b4a4',o:{bat:{t:'horse',ear:1}}});
P.vespbat=S('bat','night','#5a4a3e',{l:'#85725e',d:'#2e241c',mz:'#a8947c',o:{bat:{t:'plain',ear:1}}});
P.vampire=S('bat','night','#4a3e3a',{l:'#6e605a',d:'#241e1c',mz:'#8a7a72',o:{bat:{t:'leaf',ear:.9}}});
P.freetail=S('bat','night','#6a5a4c',{l:'#948272',d:'#352c24',mz:'#b4a290',o:{bat:{t:'plain',ear:1.1}}});
P.longeared=S('bat','night','#8a7a68',{l:'#b2a28c',d:'#4a3e30',mz:'#d4c4ac',o:{bat:{t:'plain',ear:1.9}}});
/* ---- κητώδη ---- */
const CE=(n,t,top,bot,sc)=>{P[n]=S('cet',sc||'sea',top,{c:[top,bot],o:{cet:{t}}});P[n].c=[top,bot,adj(top,-20),bot,'#111','#111']};
CE('dolphin','dolphin','#6f8594','#dfe9ee');CE('orca','orca','#15181d','#f4f4f0');CE('beluga','beluga','#e9eef0','#ffffff');
CE('narwhal','narwhal','#8c9aa0','#e6ebea');CE('sperm','sperm','#5e6a72','#9aa5aa');CE('humpback','humpback','#26323c','#cfd8dc');
CE('greywhale','grey','#7a8286','#aab2b4');CE('beaked','beaked','#7a7466','#cfc8b6');CE('pilot','pilot','#1c2026','#7a8288');
CE('porpoise','porpoise','#5c6a74','#e0e6e8');CE('bluewhale','blue','#5a7a96','#c8d6e0');CE('rissos','dolphin','#9aa0a4','#e4e8ea');
G.PRESETS=P;
/* ---- τίτλος → προεπιλογή ---- */
const T={
'Αργκαλί':'argali','Αίγα':'goat','Aγρινό':'mouflon','Αγριόγιδο':'chamois','Μοσχόβους':'muskox','Αμμότραγος':'barbary','Πρόβατο':'sheep','Οβίνες':'ram','Ορεαμνός':'mtgoat',
'Σερβάλ':'serval','Λιοντάρι':'lion','Ιαγουάρος':'jaguar','Ερπηστίδες':'mongoose','Λεοπάρδαλη':'leopard','Μανούλ':'manul','Τίγρη':'tiger','Πανθερίνες':'snowleo','Σαρκοφάγα':'wolf','Καρακάλ':'caracal','Κυναίλουρος ή τσιτάχ':'cheetah','Πούμα':'puma','Αιλουροειδή':'orangecat',
'Κόβυς':'waterbuck','Όρυξ':'oryx','Δαμαλίσκος':'topi','Ορεότραγος':'klipspringer','Γαζέλα':'gazelle','Ιπποτραγίνες':'sable','Κεφάλοφος':'duiker','Ταυρότραγος':'takin','Άδδαξ':'addax','Ιμπάλα':'impala','Αντιλόπη':'gazelle','Αμμοδορκάδα':'gerenuk','Λιθοκράνιος':'gerenuk','Κονοχαίτης':'wildebeest',
'Πάντα':'panda','Μπαριμπάλ':'blackbear',
'Μοσχογαλή':'palmcivet','Σουρικάτα':'meerkat','Σιβέτη':'civet','Κρυπτόπρωκτος':'fossa','Βιβερίδες':'civet','Ημιγαλή':'palmcivet','Γενετή':'genet',
'Βίσονας':'bison','Γιακ':'yak','Άουροχς, Βους ο αρχέγονος':'aurochs','Βούβαλος':'buffalo','Γκαούρ':'gaur',
'Βοοειδή':'cow','Κεφαλοφίνες':'duiker','Ζεμπού':'zebu','Ανόα':'anoa','Όριμπι':'oribi','Αλκέλαφος':'hartebeest','Νεμόρεδος':'goral','Σαϊγκά':'saiga',
'Δελφίνι':'dolphin','Δελφιναπτερίδες':'beluga','Όρκα':'orca','Φώκαινα':'porpoise','Δελφινίδες':'dolphin','Γλοβικέφαλος':'pilot','Λαγηνόρρυγχος':'dolphin','Γράμπος':'rissos',
'Ζαρκάδι':'roe','Πούντου':'pudu','Μόσχος':'muskdeer','Αξίς':'chital','Ελαφίδες':'reddeer','Ελάφι':'reddeer','Υδροπότης':'watdeer','Άλκη':'moose','Τάρανδος':'reindeer','Βοσέλαφος':'nilgai','Αίγαγρος':'bezoar','Αίλουρος η γαλή':'tabby','Λύγκας':'lynx','Πλατώνι':'fallow',
'Νυφίτσα':'weasel','Κουνάβι':'marten','Ασβός':'badger','Ενυδρίδα':'otter','Σπερμόφιλος':'souslik','Μυωξός':'dormouse','Κάστορας':'beaver',
'Τενρέκ':'tenrec','Σωληνόδοντα':'aardvark','Σκαντζόχοιρος':'hedgehog','Τυφλοπόντικας':'mole','Ερινακεΐδες':'hedgehog','Τουπαΐα':'treeshrew','Μυγαλή':'shrew','Ντεσμάν':'desman','Μακροσκελίδες':'elephantshrew',
'Μονοτρήματα':'echidna','Αντιλοκάπρα':'pronghorn','Υρακοειδή':'hyrax','Ορνιθόρυγχος':'platypus','Τράγουλος':'chevrotain','Υαίμοσχος':'chevrotain','Περιττοδάκτυλα':'rhino','Εντομοφάγα':'hedgehog',
'Γάιδαρος':'donkey','Ζέβρα':'zebra','Ιππίδες':'horse','Μουλάρι':'mule','Όναγρος':'onager','Άλογο':'horse',
'Αλπακά':'alpaca','Δρομάδα':'dromedary','Γουανάκο':'guanaco','Καμήλα':'camel','Βικούνια':'vicuna','Λάμα':'llama','Καμηλίδες':'camel',
'Καμηλοπαρδαλίδες':'giraffe','Οκαπία':'okapi','Καμηλοπάρδαλη':'giraffe',
'Μανδρίλος':'mandrill','Μαγότος':'barbmac','Πρεσβύτης':'langur','Πάτας':'patas',
'Ανάναρκος':'beaked','Κητώδη':'dolphin','Μονόδους':'narwhal',
'Φαλαινοπτερίδες':'bluewhale','Ραμφοφάλαινα':'beaked','Φυσητήρας':'sperm','Μεγάπτερη':'humpback','Δελφινάπτερος':'beluga','Φάλαινα':'bluewhale','Γκρίζα φάλαινα':'greywhale','Μεγάπτερος':'humpback',
'Καμπερού':'ethwolf','Κοάτι':'coati','Ύαινα':'hyena','Ντίνγκο':'dingo','Ρακούν':'raccoon','Νυκτερευτής':'rdog','Φενέκ':'fennec','Λυκάων':'wilddog','Κυνοειδή':'wolf','Κογιότ':'coyote','Προτελής':'aardwolf','Κυνίδες':'wolf',
'Αρκτίδες':'brownbear','Καφέ αρκούδα🐻':'brownbear','Τσακάλι':'jackal','Αλεπού':'fox','Λύκος':'wolf',
'Λαγόμορφα':'rabbit','Λαγός':'hare','Κουνέλι':'rabbit','Μακί':'ringtail',
'Γιαπόκ':'otter','Ταρσίπους':'honeypossum','Δενδρόλαγος':'treeroo','Οπόσουμ':'possum','Πηραμελής':'bandicoot','Δασύκερκος':'dasyurid','Αντεχίνος':'dasyurid','Σαρκόφιλος':'devil','Δασυουρίδες':'dasyurid',
'Πέταυρος':'glider','Ονυχογαλή':'wallaby','Διπρωτόδοντα':'kangaroo','Κοάλα':'koala','Καγκουρό':'kangaroo','Φαλαγγιστής':'cuscus','Μακροποδίδες':'kangaroo','Φασκωλόμυς':'wombat','Ακροβάτης':'glider','Νωτορύκτης':'marsmole',
'Μεφίτις':'skunk','Ερμίνα':'ermine','Βιζόν':'mink','Μινκ':'mink','Αλωπεκοϊχνεύμων':'yellowmongoose','Μουστελίδες':'badger','Αδηφάγος':'wolverine','Μυδάος':'stinkbadger','Ρατέλ':'honeybadger','Ζιμπελίνα':'sable','Μαγκούστα':'mongoose',
'Αρουραίος':'rat','Ποντικός':'mouse','Υδρομυγαλή':'watershrew','Πηρόμυσκος':'mouse','Δίπους':'jerboa','Υδρόμυς':'muskrat','Απαλόμυς':'mouse','Διποδίδες':'jerboa','Αλάκταγα':'jerboa',
'Εμβαλονουρίδες':'freetail','Νυχτερίδα':'vespbat','Φυλλόστομοι':'leafbat','Μεγαχειρόπτερα':'fruitbat','Ρινολοφίδες':'horseshoe','Μολοσσίδες':'freetail','Βεσπερτιλιονίδες':'longeared','Χειρόπτερα':'vespbat','Δεσμοδοντίδες':'vampire','Μεγαδερματίδες':'leafbat',
'Δασυποδίδες':'armadillo','Τολυπευτής':'armadillo','Βραδυποδίδες':'sloth','Mυρμηκοφάγος':'anteater','Ταχυγλωσσίδες':'echidna','Ορυκτερόπους':'aardvark','Αρμαδίλλοι':'armadillo','Νωδά':'sloth','Παγκολίνος':'pangolin','Μυρμηκόβιος':'numbat',
'Κουντού':'kudu',
'Πίθηκοι':'chimp','Δερμόπτερα':'colugo','Γαλεοπίθηκος':'colugo','Γελάδας':'gelada','Χιμπατζής':'chimp','Κερκόκιβος':'mangabey','Ουραγκουτάγκος':'orang','Κατάρρινοι':'macaque','Γίβων':'gibbon','Γορίλας':'gorilla','Ανθρωπόμορφοι':'chimp',
'Κολοβός':'colobus','Γουερέτζας':'colobus','Μπαμπουίνοι':'baboon','Ρυγχοπίθηκος':'snubnose','Κερκοπίθηκος':'guenon','Σεμνοπίθηκοι':'langur',
'Τάρσιος':'tarsier','Λεμούριοι':'ringtail','Ινδρίδες':'indri','Λορισίδες':'loris','Σιφάκα':'sifaka','Νυκτίκηβος':'loris','Δωβεντονίδες':'ayeaye','Γάλαγος':'galago',
'Λαγότριχες':'woolly','Ατελής':'spider','Κακαγιάο':'uakari','Πιθηκίνες':'saki','Λεοντόκηβος':'leontam','Ουιστιτί':'marmoset','Αλουάτα':'howler','Κίβος':'capuchin','Λεοντοπίθηκος':'leontam','Ταμαρίνος':'tamarin','Ίακχος':'marmoset','Κιβίδες':'capuchin','Πλατύρρινοι':'capuchin','Άωτος':'owlmonk','Σαϊμίρι':'squirrelmonk','Μίδας':'midas',
'Ελεφαντίδες':'elephant','Ρινόκερος':'rhino','Ιπποπόταμος':'hippo','Παχύδερμα':'elephant','Τάπιρος':'tapir','Συΐδες':'boar',
'Ρυτίνη':'manatee','Σειρηνοειδή':'manatee','Ντιγκόνγκ':'dugong','Μανάτος':'manatee',
'Σκίουρος':'squirrel','Απλοδοντίδες':'mountainbeaver','Κυνόμυς':'prairiedog','Ελειόμυς':'dormouse','Σκιουρόμορφα':'squirrel','Σκιουρίδες':'squirrel','Μαρμότα':'marmot','Δενδρογαλή':'treeshrew',
'Κτενοδάκτυλος':'gundi','Γεωμυΐδες':'gopher','Ετερομυΐδες':'kangrat','Ανωμάλουρος':'anomalure',
'Πεκάρι':'peccary','Χοίρος':'pig','Ελαφόχοιρος':'babirusa','Φακόχοιρος':'warthog','Ποταμόχοιρος':'riverhog','Αγριόχοιρος':'boar',
'Ρομβόμυς':'gerbil','Κρικητόμυς':'giantrat','Χάμστερ':'hamster','Εχίμυς':'spinyrat','Ονδάτρα':'muskrat','Αλτικόλη':'vole',
'Υδρόχοιρος':'capybara','Ερεθιζοντίδες':'newporc','Χαιτόμυς':'newporc','Δασυπρωκτίδες':'agouti',
'Καβιίδες':'cavy','Υστριχίδες':'porcupine','Χοιρίδιο ινδικό':'guineapig','Bαθυεργίδες':'molerat','Οκτωδοντίδες':'degu','Τσιντσιλά':'chinchilla','Αυλακόδους':'degu','Εχιμυίδες':'spinyrat','Καπρομυΐδες':'hutia','Μυοκάστορας':'nutria','Υστρικόμορφα':'porcupine','Αθήρουρος':'porcupine','Αγγούτι':'agouti',
'Αλίχοιρος':'graysea','Φώκια':'seal','Αρκτοκέφαλος':'furseal','Μονάχους-μονάχους':'seal','Θαλάσσιος ελέφαντας':'elseal','Καλόρρινος':'hooded','Ωταρία':'sealion','Λιοντάρι της θάλασσας':'sealion','Φωκίδες':'seal','Οδόβαινος':'walrus'
};
const CATD={'Αιλουροειδή':'tabby','Κυνοειδή':'wolf','Αρκτίδες':'brownbear','Μουστελίδες':'weasel','Βιβερίδες':'civet','Πίθηκοι':'macaque','Κατάρρινοι':'macaque','Πλατύρρινοι':'capuchin','Κερκοπιθηκίδες':'guenon','Λεμουριόμορφα':'ringtail','Τρωκτικά':'rat','Μυόμορφα':'mouse','Σκιουρόμορφα':'squirrel','Υστρικόμορφα':'porcupine','Λαγόμορφα':'rabbit','Εντομοφάγα':'hedgehog','Μαρσιποφόρα':'kangaroo','Διπρωτόδοντα':'kangaroo','Νυχτερίδες':'vespbat','Κητώδη':'dolphin','Φάλαινες':'bluewhale','Δελφινίδες':'dolphin','Φώκιες':'seal','Σειρηνοειδή':'manatee','Νωδά':'armadillo','Αντιλοπίδες':'gazelle','Αιγώδη':'goat','Βοοειδή':'cow','Βοοίνες':'buffalo','Ελαφίδες':'reddeer','Οπληφόρα':'gazelle','Καμηλοπαρδαλίδες':'giraffe','Καμηλίδες':'camel','Ιππίδες':'horse','Συΐδες':'boar','Παχύδερμα':'elephant','Ελλάδα':'wolf','Θηλαστικά':'wolf'};
const nz=t=>String(t||'').replace(/[​-‏﻿]/g,'').trim();
G.Species={
 pick(post){const t=nz(post.title),k=T[t]||T[nz(post.originalTitle)];if(k&&P[k])return{key:k,spec:P[k]};
  for(const c of post.categories||[]){if(CATD[c]&&P[CATD[c]])return{key:CATD[c],spec:P[CATD[c]]}}return{key:'wolf',spec:P.wolf}},
 table:T,presets:P
};
})(__G);

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
})(__G);

/* Θηλαστικά · σιλουέτες-πρότυπα: κάθε «σχέδιο» (plan) είναι ένα ενιαίο περίγραμμα ζώου σε προφίλ (κορμός+λαιμός+κεφάλι+πόδια),
   που παραμορφώνεται ανά είδος (μήκος κορμού, πόδια, λαιμός, κεφάλι) και ζωγραφίζεται με σκίαση, γούνα, σημάδια. */
(function(G){
'use strict';
const L=G.__lib,F=G.__F,{f,cl,hash,rng,adj,mixc,cr,sample,taper,HORN}=L,{W,H,GY,rad,rot,rib,lin,lgr,rgr,scene2,earD,TAILS}=F;
const merge=(a,b)=>{const o=Array.isArray(a)?a.slice():Object.assign({},a);for(const k in b){const v=b[k];o[k]=v&&typeof v=='object'&&!Array.isArray(v)&&a&&a[k]&&typeof a[k]=='object'&&!Array.isArray(a[k])?merge(a[k],v):v}return o};
/* ενιαία καμπύλη Catmull-Rom με γωνίες (4ο στοιχείο=1) */
function crc(pts,closed=true){const n=pts.length,g=i=>closed?pts[(i%n+n)%n]:pts[cl(i,0,n-1)];let d=`M${f(pts[0][0])} ${f(pts[0][1])}`;
 for(let i=0,e=closed?n:n-1;i<e;i++){const p0=g(i-1),p1=g(i),p2=g(i+1),p3=g(i+2),k1=p1[3]?0:1/6,k2=p2[3]?0:1/6;
  d+=`C${f(p1[0]+(p2[0]-p0[0])*k1)} ${f(p1[1]+(p2[1]-p0[1])*k1)} ${f(p2[0]-(p3[0]-p1[0])*k2)} ${f(p2[1]-(p3[1]-p1[1])*k2)} ${f(p2[0])} ${f(p2[1])}`}
 return d+(closed?'Z':'')}
function flat(pts){const n=pts.length,g=i=>pts[(i%n+n)%n],o=[];
 for(let i=0;i<n;i++){const p0=g(i-1),p1=g(i),p2=g(i+1),p3=g(i+2),k1=p1[3]?0:1/6,k2=p2[3]?0:1/6,c1=[p1[0]+(p2[0]-p0[0])*k1,p1[1]+(p2[1]-p0[1])*k1],c2=[p2[0]-(p3[0]-p1[0])*k2,p2[1]-(p3[1]-p1[1])*k2];
  for(let s=0;s<8;s++){const t=s/8,u=1-t;o.push([u*u*u*p1[0]+3*u*u*t*c1[0]+3*u*t*t*c2[0]+t*t*t*p2[0],u*u*u*p1[1]+3*u*u*t*c1[1]+3*u*t*t*c2[1]+t*t*t*p2[1]])}}
 return o}
const gc=(st,t)=>{for(let i=1;i<st.length;i++)if(t<=st[i][0]){const a=st[i-1],b=st[i],u=(t-a[0])/((b[0]-a[0])||1);return mixc(a[1],b[1],u)}return st[st.length-1][1]};

/* ---------- σχέδια ---------- */
const PLANS={};
/* αιλουροειδές (λιοντάρι, τίγρη, λεοπάρδαλη…) — σώμα x 18..140, έδαφος y=100 */
PLANS.felid={
 pts:[[24,40],[42,35],[62,36],[84,36],[104,34],[118,33,.3],[130,29,.6],[139,22,1],
  [149,19,1],[159,21,1],[167,27,1],[176,31,1],[181,35,1],[182,40,1],[178,44,1],[172,46,1],[170,51,1],[162,55,1],[152,55,1],[143,51,1],
  [136,57,.6],[131,67,.3],[135,77],
  [136,85],[135,92],[135,97],[142,100,0,1],[127,100,0,1],[124,92],[122,82],[119,74],
  [104,72],[86,70],[68,66],[56,63],
  [52,70],[47,80],[44,90],[45,97],[52,100,0,1],[36,100,0,1],[32,92],[27,84],[21,72],[15,58],[17,46]],
 near:{fore:[23,31],hind:[36,45]},legTop:{fore:60,hind:58},
 ref:{legY:72,xa:60,xb:112,hj:[146,40],neckDir:[.82,-.55],tail:[19,42],gy:100,xr:[16,136]},
 a:{eye:[163,33],er:2.3,nose:[181,37],mouthA:[172,46],mouthB:[154,48],ear:[148,20],muz:[172,43],hc:[150,38],horn:[148,18],pelvis:[36,52],shoulder:[112,52],brow:[158,29]},
 w:{legS:1.32,dep:.88,hs:1.1}
};



/* φώκια/θαλάσσιο λιοντάρι: ξαπλωμένη, κεφάλι ψηλά */
PLANS.seal={pts:[[8,90,0,1],[16,83],[34,74],[56,66],[80,61],[102,58],[120,54],[131,44],[139,34],[148,28],[158,28],[165,33],[168,40],[171,44],[169,48],[162,51],[156,54],[148,57],[142,64],[137,74],[133,86],[126,95],[112,99],[90,100],[60,100],[36,100],[20,100],[10,99,0,1],[4,94]],
 ref:{legY:97,gy:100,xr:[6,140],xa:50,xb:100,hj:[150,40],neckDir:[.6,-.8],tail:[10,92]},a:{eye:[157,37],er:2.2,nose:[170,43],mouthA:[165,48],mouthB:[152,52],ear:[146,36],muz:[162,46],hc:[150,42],horn:[150,30],pelvis:[50,78],shoulder:[112,70]},
 over:[{d:'M130 80C126 90 118 98 106 99C112 94 116 90 120 80Z',k:'fl'}],w:{},noLegs:1};
/* δελφίνι: στην επιφάνεια του νερού */
PLANS.dolphin={pts:[[22,58],[34,56],[54,54],[76,50],[96,46],[102,44],[108,26,0,1],[118,44],[130,47],[146,48],[158,50],[168,54],[176,58],[184,62,0,1],[186,66],[178,68],[166,68],[158,72],[146,78],[130,84],[104,86],[78,82],[56,74],[38,66],[24,64]],
 ref:{legY:90,gy:92,xr:[10,186],xa:60,xb:130,hj:[160,58],neckDir:[1,0],tail:[22,60]},a:{eye:[161,60],er:2.1,nose:[184,64],mouthA:[179,67],mouthB:[162,68],ear:[0,0],muz:[170,62],hc:[150,58],horn:[180,60],pelvis:[50,62],shoulder:[130,62]},
 over:[{d:'M132 74C124 82 114 90 102 94C112 84 118 80 124 70Z',k:'fl'},{d:'M24 60C14 52 8 46 2 46C6 52 8 58 14 60C8 64 6 70 4 76C12 74 20 68 26 64Z',k:'bd'}],water:80,w:{},noLegs:1,tailFlukes:1};
PLANS.whale={pts:[[22,56],[40,52],[64,48],[90,44],[112,42],[122,30,0,1],[132,42],[146,44],[160,46],[172,50],[182,58],[186,70],[182,82],[170,88],[150,92],[126,92],[100,90],[74,84],[52,74],[36,66],[24,62]],
 ref:{legY:94,gy:96,xr:[10,186],xa:60,xb:130,hj:[170,66],neckDir:[1,0],tail:[22,59]},a:{eye:[170,74],er:1.8,nose:[184,72],mouthA:[182,80],mouthB:[158,82],ear:[0,0],muz:[172,72],hc:[160,66],horn:[184,64],pelvis:[60,62],shoulder:[130,64]},
 over:[{d:'M130 78C122 88 112 96 98 100C110 88 116 84 122 74Z',k:'fl'},{d:'M24 58C14 48 8 42 0 42C4 50 6 56 12 60C6 64 4 72 2 80C10 78 20 70 26 64Z',k:'bd'}],water:80,w:{},noLegs:1,tailFlukes:1};
/* καγκουρό όρθιο */
PLANS.roo={pts:[[38,70],[44,56],[54,42],[66,28],[76,16],[84,9],[92,8],[99,12],[108,17],[116,22],[121,26,0,1],[120,30],[113,31],[104,34],[97,36],[92,42],[93,52],[95,62],[96,72],[96,82],[100,89],[106,94],[114,97],[124,99,0,1],[124,100,0,1],[78,100,0,1],[76,95],[68,92],[54,91],[44,86],[38,78]],
 near:{hind:[19,27]},ref:{legY:84,gy:100,xr:[38,100],xa:50,xb:90,hj:[96,22],neckDir:[.5,-.5],tail:[38,76]},a:{eye:[101,17],er:2.3,nose:[120,27],mouthA:[117,30],mouthB:[103,33],ear:[88,10],muz:[112,25],hc:[96,20],horn:[95,10],pelvis:[58,74],shoulder:[74,44]},w:{},tail:'kang',tl:1.5,tw:1.2,roo:1,
 over:[{d:'M88 46C94 52 100 58 106 62C108 64 106 66 103 65C96 62 88 58 84 52Z',k:'bd'}]};
PLANS.koala={pts:[[50,70],[46,54],[52,40],[62,30],[74,20],[88,15],[100,18],[108,27],[113,31,0,1],[115,37],[111,42],[104,46],[98,50],[93,56],[93,66],[97,72],[99,82],[101,88,0,1],[92,91],[88,82],[85,74],[92,84],[98,94],[100,100,0,1],[58,100,0,1],[48,96],[40,84],[40,70]],
 ref:{legY:84,gy:100,xr:[40,100],xa:50,xb:90,hj:[100,30],neckDir:[.5,-.5],tail:[42,76]},a:{eye:[100,28],er:2,nose:[114,35],mouthA:[110,43],mouthB:[102,45],ear:[80,18],muz:[108,38],hc:[100,30],horn:[100,16],pelvis:[56,76],shoulder:[70,56]},w:{},noLegs:1,tail:'none'};

/* ---------- γεννήτρια σχεδίων για τετράποδα (κορμός+λαιμός+πόδια παραμετρικά, κεφάλι από πρότυπο) ---------- */
const HEADS={
 cat:{cd:.8,cs:.62,sd0:.5,sd1:.4,jw:.1,nt:.07,ex:.5,ey:-.1,er:.085},
 dog:{cd:.5,cs:.46,sd0:.36,sd1:.27,jw:.08,ex:.38,ey:-.11,er:.05},
 horse:{cd:.36,cs:.44,sd0:.3,sd1:.25,jw:.17,ex:.34,ey:-.09,er:.04,nt:.04},
 deer:{cd:.38,cs:.44,sd0:.28,sd1:.2,jw:.1,ex:.34,ey:-.1,er:.045},
 cow:{cd:.42,cs:.4,sd0:.4,sd1:.4,jw:.14,ex:.3,ey:-.1,er:.04,nt:.1},
 bear:{cd:.64,cs:.52,sd0:.5,sd1:.36,jw:.12,ex:.42,ey:-.12,er:.035},
 pig:{cd:.5,cs:.34,sd0:.44,sd1:.4,jw:.1,ex:.3,ey:-.1,er:.035,nt:.12},
 eleph:{cd:.95,cs:.5,sd0:.8,sd1:.6,jw:.15,ex:.38,ey:-.12,er:.035},
 rodent:{cd:.62,cs:.52,sd0:.5,sd1:.36,jw:.12,ex:.42,ey:-.1,er:.07},
 mustel:{cd:.6,cs:.5,sd0:.46,sd1:.34,jw:.1,ex:.42,ey:-.1,er:.07},
 camel:{cd:.36,cs:.42,sd0:.34,sd1:.3,jw:.12,ex:.34,ey:-.1,er:.045,nt:.06},
 giraffe:{cd:.34,cs:.42,sd0:.3,sd1:.24,jw:.1,ex:.34,ey:-.1,er:.05,nt:.06},
 rhino:{cd:.4,cs:.5,sd0:.36,sd1:.36,jw:.14,ex:.36,ey:-.05,er:.035,nt:.08},
 hippo:{cd:.55,cs:.34,sd0:.6,sd1:.62,jw:.12,ex:.3,ey:-.28,er:.04,nt:.12},
 tapir:{cd:.44,cs:.4,sd0:.4,sd1:.3,jw:.1,ex:.34,ey:-.08,er:.04,nt:.16},
 monkey:{cd:.68,cs:.56,sd0:.5,sd1:.4,jw:.1,ex:.44,ey:-.08,er:.07,nt:.04},
 baboon:{cd:.5,cs:.4,sd0:.42,sd1:.36,jw:.1,ex:.36,ey:-.12,er:.05,nt:.06},
 ape:{cd:.78,cs:.5,sd0:.6,sd1:.5,jw:.18,ex:.4,ey:-.12,er:.05,nt:.04,bump:.1},
 snout:{cd:.5,cs:.4,sd0:.4,sd1:.14,jw:.06,ex:.34,ey:-.08,er:.06,nt:.04},
 goat:{cd:.42,cs:.44,sd0:.34,sd1:.26,jw:.12,ex:.34,ey:-.1,er:.045,nt:.06},
 rabbit:{cd:.64,cs:.5,sd0:.52,sd1:.36,jw:.1,ex:.44,ey:-.08,er:.08,nt:.05}
};
const PRE={
 cat:{L:96,hw:56,hc:58,hb:30,hf:22,sag:3,lf:{x:.84,st:'paw',w0:14,w1:8},lh:{x:.16,st:'paw',w0:19,w1:8},neck:{x:.88,a:34,l:20,t0:36,t1:26},head:{ty:'cat',hl:40,ha:12},tail:'cat',ear:{k:'round',w:11,h:11,x:.2,y:-.46,a:4}},
 dog:{L:98,hw:62,hc:62,hb:34,hf:27,sag:2,lf:{x:.84,st:'paw',w0:13,w1:7},lh:{x:.15,st:'paw',w0:18,w1:7},neck:{x:.88,a:36,l:24,t0:30,t1:22},head:{ty:'dog',hl:44,ha:22},tail:'dog',ear:{k:'point',w:12,h:19,x:.18,y:-.42,a:8}},
 horse:{L:104,hw:92,hc:92,hb:48,hf:40,sag:3,lf:{x:.85,st:'hoof',w0:15,w1:6.4},lh:{x:.14,st:'hoof',w0:22,w1:7},neck:{x:.9,a:50,l:46,t0:42,t1:20},head:{ty:'horse',hl:68,ha:62},tail:'horse',ear:{k:'tall',w:8,h:17,x:.12,y:-.34,a:6}},
 deer:{L:94,hw:84,hc:86,hb:42,hf:38,sag:2,lf:{x:.85,st:'hoof',w0:11,w1:5},lh:{x:.15,st:'hoof',w0:17,w1:5.6},neck:{x:.9,a:46,l:38,t0:26,t1:13},head:{ty:'deer',hl:46,ha:52},tail:'flick',ear:{k:'leaf',w:12,h:17,x:.16,y:-.4,a:-38}},
 cow:{L:110,hw:78,hc:80,hb:34,hf:30,sag:2,lf:{x:.84,st:'hoof',w0:18,w1:9},lh:{x:.14,st:'hoof',w0:24,w1:9},neck:{x:.9,a:18,l:28,t0:42,t1:30},head:{ty:'cow',hl:50,ha:55},tail:'cow',ear:{k:'leaf',w:12,h:15,x:.16,y:-.3,a:-80}},
 bear:{L:104,hw:72,hc:68,hb:28,hf:24,sag:1,lf:{x:.8,st:'short',w0:24,w1:15},lh:{x:.16,st:'short',w0:30,w1:15},neck:{x:.86,a:20,l:22,t0:48,t1:34},head:{ty:'bear',hl:42,ha:24},tail:'stub',ear:{k:'round',w:10,h:10,x:.22,y:-.5,a:-6}},
 pig:{L:98,hw:56,hc:56,hb:22,hf:20,sag:1,lf:{x:.84,st:'short',w0:14,w1:8},lh:{x:.16,st:'short',w0:18,w1:8},neck:{x:.88,a:14,l:14,t0:46,t1:38},head:{ty:'pig',hl:44,ha:28},tail:'short',ear:{k:'point',w:14,h:15,x:.22,y:-.46,a:-30}},
 elephant:{L:118,hw:112,hc:108,hb:44,hf:42,sag:0,lf:{x:.82,st:'col',w0:34,w1:30},lh:{x:.16,st:'col',w0:38,w1:30},neck:{x:.92,a:10,l:22,t0:64,t1:54},head:{ty:'eleph',hl:70,ha:14},tail:'tuftdrop',ear:{k:'fan',w:36,h:40,x:.1,y:-.2,a:-10}},
 rodent:{L:62,hw:36,hc:38,hb:17,hf:16,sag:2,lf:{x:.8,st:'short',w0:9,w1:5},lh:{x:.18,st:'short',w0:14,w1:6},neck:{x:.88,a:20,l:10,t0:28,t1:22},head:{ty:'rodent',hl:28,ha:20},tail:'rat',ear:{k:'round',w:8,h:8,x:.3,y:-.52,a:-4}},
 mustel:{L:92,hw:26,hc:27,hb:12,hf:11,sag:1,lf:{x:.84,st:'short',w0:8,w1:5},lh:{x:.14,st:'short',w0:11,w1:5},neck:{x:.9,a:18,l:10,t0:18,t1:15},head:{ty:'mustel',hl:26,ha:14},tail:'mink',ear:{k:'round',w:6,h:6,x:.3,y:-.5}},
 antel:{L:92,hw:78,hc:80,hb:40,hf:36,sag:2,lf:{x:.85,st:'hoof',w0:10,w1:4.6},lh:{x:.15,st:'hoof',w0:16,w1:5},neck:{x:.9,a:48,l:34,t0:24,t1:13},head:{ty:'deer',hl:44,ha:50},tail:'flick',ear:{k:'leaf',w:11,h:15,x:.16,y:-.4,a:-30}},
 goat:{L:88,hw:64,hc:62,hb:30,hf:27,sag:2,lf:{x:.85,st:'hoof',w0:12,w1:6},lh:{x:.15,st:'hoof',w0:17,w1:6.4},neck:{x:.9,a:40,l:22,t0:30,t1:18},head:{ty:'goat',hl:36,ha:42},tail:'flick',ear:{k:'leaf',w:11,h:9,x:.2,y:-.3,a:-60}},
 camel:{L:100,hw:104,hc:100,hb:56,hf:50,sag:2,lf:{x:.86,st:'hoof',w0:13,w1:7},lh:{x:.14,st:'hoof',w0:19,w1:7},neck:{x:.92,a:58,l:58,t0:30,t1:15},head:{ty:'camel',hl:44,ha:50},tail:'flick',ear:{k:'round',w:6,h:8,x:.2,y:-.4,a:0},hum:[.45,28,22]},
 giraffe:{L:84,hw:104,hc:92,hb:60,hf:54,sag:0,lf:{x:.86,st:'hoof',w0:12,w1:6},lh:{x:.14,st:'hoof',w0:17,w1:6.5},neck:{x:.9,a:70,l:86,t0:26,t1:12},head:{ty:'giraffe',hl:38,ha:40},tail:'cow',ear:{k:'leaf',w:10,h:11,x:.2,y:-.3,a:-60}},
 rhino:{L:112,hw:68,hc:68,hb:26,hf:24,sag:1,lf:{x:.82,st:'col',w0:24,w1:20},lh:{x:.16,st:'col',w0:28,w1:20},neck:{x:.9,a:12,l:18,t0:50,t1:42},head:{ty:'rhino',hl:62,ha:36},tail:'cow',ear:{k:'leaf',w:9,h:11,x:.15,y:-.3,a:-10}},
 hippo:{L:112,hw:52,hc:52,hb:16,hf:15,sag:1,lf:{x:.82,st:'col',w0:22,w1:20},lh:{x:.16,st:'col',w0:26,w1:20},neck:{x:.9,a:8,l:14,t0:40,t1:36},head:{ty:'hippo',hl:60,ha:16},tail:'stub',ear:{k:'round',w:7,h:7,x:.18,y:-.5,a:-10}},
 tapir:{L:98,hw:58,hc:62,hb:24,hf:22,sag:1,lf:{x:.83,st:'short',w0:14,w1:10},lh:{x:.16,st:'short',w0:18,w1:10},neck:{x:.9,a:14,l:16,t0:36,t1:32},head:{ty:'tapir',hl:50,ha:30},tail:'stub',ear:{k:'round',w:8,h:10,x:.2,y:-.4,a:-8}},
 cavy:{L:62,hw:36,hc:37,hb:15,hf:14,sag:1,lf:{x:.8,st:'short',w0:9,w1:6},lh:{x:.18,st:'short',w0:13,w1:6},neck:{x:.88,a:20,l:8,t0:26,t1:22},head:{ty:'rodent',hl:26,ha:20},tail:'none',ear:{k:'round',w:7,h:8,x:.3,y:-.52,a:-4}},
 monkey:{L:60,hw:46,hc:48,hb:24,hf:22,sag:2,lf:{x:.8,st:'paw',w0:8,w1:5},lh:{x:.18,st:'paw',w0:13,w1:5.4},neck:{x:.88,a:34,l:12,t0:22,t1:18},head:{ty:'monkey',hl:28,ha:20},tail:'mon',ear:{k:'round',w:6,h:7,x:.3,y:-.5}},
 baboon:{L:82,hw:60,hc:62,hb:30,hf:27,sag:1,lf:{x:.82,st:'paw',w0:10,w1:6},lh:{x:.16,st:'paw',w0:15,w1:6},neck:{x:.88,a:30,l:16,t0:32,t1:26},head:{ty:'baboon',hl:36,ha:26},tail:'flick',ear:{k:'round',w:6,h:7,x:.3,y:-.5}},
 ape:{L:78,hw:84,hc:58,hb:34,hf:30,sag:0,lf:{x:.84,st:'short',w0:22,w1:15,j:[[0,1,0],[.012,.62,.8],[.0,.32,1],[.03,.06,1.05]]},lh:{x:.18,st:'short',w0:26,w1:15},neck:{x:.9,a:26,l:14,t0:60,t1:50},head:{ty:'ape',hl:42,ha:20},tail:'none',ear:{k:'round',w:5,h:7,x:.3,y:-.4}},
 hog:{L:48,hw:28,hc:29,hb:12,hf:11,sag:0,lf:{x:.8,st:'short',w0:7,w1:4},lh:{x:.2,st:'short',w0:9,w1:4.5},neck:{x:.88,a:10,l:6,t0:20,t1:18},head:{ty:'snout',hl:24,ha:10},tail:'short',ear:{k:'round',w:4,h:4,x:.3,y:-.5}},
 rabbit:{L:56,hw:38,hc:46,hb:17,hf:16,sag:3,lf:{x:.82,st:'short',w0:7,w1:4},lh:{x:.2,st:'short',w0:14,w1:5},neck:{x:.88,a:34,l:8,t0:24,t1:20},head:{ty:'rabbit',hl:28,ha:18},tail:'stub',ear:{k:'tall',w:6,h:26,x:.3,y:-.4,a:8}},
 tube:{L:84,hw:42,hc:44,hb:19,hf:18,sag:2,lf:{x:.82,st:'short',w0:12,w1:7},lh:{x:.16,st:'short',w0:14,w1:7},neck:{x:.9,a:6,l:12,t0:28,t1:22},head:{ty:'snout',hl:40,ha:12},tail:'dog',ear:{k:'round',w:5,h:6,x:.3,y:-.5}},
 round:{L:66,hw:40,hc:38,hb:17,hf:16,sag:-2,lf:{x:.8,st:'short',w0:9,w1:6},lh:{x:.18,st:'short',w0:11,w1:6.5},neck:{x:.88,a:10,l:5,t0:30,t1:26},head:{ty:'rodent',hl:24,ha:10},tail:'short',ear:{k:'round',w:5,h:5,x:.3,y:-.5}}
};
const LJ={fpaw:[[0,1,0],[-.012,.64,.35],[.004,.34,.9],[.03,.05,1]],fhoof:[[0,1,0],[.004,.66,.3],[.022,.47,1.35],[.012,.17,1],[.02,.05,1.1]],fcol:[[0,1,0],[0,.6,.9],[.004,.3,1],[.01,.05,1.05]],fshort:[[0,1,0],[-.01,.6,.5],[.01,.3,.9],[.03,.06,1]],
 hpaw:[[.02,1,0],[.1,.64,.42],[-.03,.4,1.2],[.0,.12,1],[.035,.04,1.05]],hhoof:[[.02,1,0],[.095,.62,.45],[-.035,.4,1.25],[-.012,.14,1],[.012,.05,1.1]],hcol:[[0,1,0],[.015,.6,.9],[.005,.3,1],[.01,.05,1.05]],hshort:[[.02,1,0],[.07,.6,.5],[-.01,.3,.95],[.04,.06,1]]};
function genPlan(spec){const q=merge(PRE[spec.pre||'dog']||PRE.dog,spec.q||{}),gy=100,X0=22,Lm=q.L,hw=q.hw,hc=q.hc,hb=q.hb,hf=q.hf,sag=q.sag||0,hh_=hw-hb;
 const X=u=>X0+u*Lm,Y=h=>gy-h;
 const topH=u=>{const xs=[[0,hc-4],[.12,hc],[.5,(hc+hw)/2-sag],[.8,hw],[1,hw-3]];for(let i=1;i<xs.length;i++)if(u<=xs[i][0]){const a=xs[i-1],b=xs[i],t=(u-a[0])/((b[0]-a[0])||1);return a[1]+(b[1]-a[1])*t}return hw-3};
 const nk=q.neck,hd=q.head,S=[X(nk.x),Y(hb+hh_*.55)],na=rad(nk.a),E=[S[0]+Math.cos(na)*nk.l,S[1]-Math.sin(na)*nk.l],hl=hd.hl,ha=rad(hd.ha);
 const hh=Object.assign({cd:.5,cs:.45,sd0:.34,sd1:.26,rm:0,jw:.1,nt:.05,ex:.42,ey:-.08,er:.05},HEADS[hd.ty]||{},hd.h||{});
 const hp=F.headPts(hh),Hx=(x,y)=>{const[a,b]=rot((x-.1)*hl,(y-.04)*hl,ha);return[E[0]+a,E[1]+b]};
 const head=hp.map(a=>Hx(a[0],a[1]));
 const PLk=Hx(.04,-hh.cd*.46),THk=Hx(.16,hh.cd*.5+hh.jw*.55),TW=[X(.76),Y(hw)],BW=[X(1.0),Y(hb+hh_*.22)],nb=nk.bend==null?2:nk.bend;
 const TM=[(TW[0]+PLk[0])/2,(TW[1]+PLk[1])/2-nb-(nk.crest||0)],BM=[(BW[0]+THk[0])/2,(BW[1]+THk[1])/2+(nk.dew||0)];
 /* πόδια */
 const mk=(o,xx,topY,hind)=>{const J=o.j||LJ[(hind?'h':'f')+o.st]||LJ[(hind?'h':'f')+'paw'],h=-topY,w0=o.w0,w1=o.w1;
  const pts=J.map(([dx,fh])=>[xx+dx*Lm,Y(0)-h*fh]),ws=J.map(([,,u])=>u<=1?w0+(w1-w0)*u:w1*u),n=pts.length,Fr=[],Bk=[];
  for(let i=0;i<n;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(n-1,i+1)];let dx=b[0]-a[0],dy=b[1]-a[1];const l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;const w=ws[i]/2;Fr.push([pts[i][0]+dy*w,pts[i][1]-dx*w]);Bk.push([pts[i][0]-dy*w,pts[i][1]+dx*w])}
  const e=pts[n-1],ew=ws[n-1];let ft;
  if(o.st=='hoof')ft=[[e[0]+ew*.6,gy-.6],[e[0]+ew*.5,gy-.1],[e[0]-ew*.45,gy-.1],[e[0]-ew*.5,gy-1.4]];
  else if(o.st=='col')ft=[[e[0]+ew*.62,gy-2.5],[e[0]+ew*.6,gy-.1],[e[0]-ew*.5,gy-.1],[e[0]-ew*.5,gy-2.5]];
  else ft=[[e[0]+ew*.5+3.4,gy-2.6],[e[0]+ew*.5+3,gy-.2],[e[0]-ew*.36,gy-.2],[e[0]-ew*.5,gy-2]];
  Fr.pop();Bk.pop();return{pts,ws,Fr,Bk,ft}};
 const stride=q.stride==null?.6:q.stride,sg=stride*.07*Lm,lf=q.lf,lh=q.lh;
 const hind=mk(lh,X(lh.x)-sg*.9,Y(hb+hh_*.4)-gy,true),fore=mk(lf,X(lf.x)+sg,Y(hf+1)-gy,false);
 let top=[0,.07,.16,.3,.46,.62].map(u=>[X(u),Y(topH(u))]);
 if(q.hum){const[hx,hwd,hht]=q.hum,cx=X(hx),yt=Y(topH(hx));top=top.filter(a=>Math.abs(a[0]-cx)>hwd*.6).concat([[cx-hwd/2,yt+1],[cx-hwd*.3,yt-hht*.8],[cx,yt-hht],[cx+hwd*.3,yt-hht*.85],[cx+hwd/2,yt+1]]).sort((a,b)=>a[0]-b[0])}
 const f0=fore.pts[0],fw=fore.ws[0];
 const belly=[[f0[0]-fw/2-Lm*.05,Y(hf+(hb-hf)*.35)],[X(.55),Y(hb)],[X(.4),Y(hb)-.5]];
 const hFront=[hind.pts[0][0]+hind.ws[0]/2,Y(hb+1.5)];
 const body=[].concat(top,[TW,TM,PLk,THk,BM,BW,[f0[0]+fw/2,f0[1]]],fore.Fr.slice(1),fore.ft,fore.Bk.slice(1).reverse(),[[f0[0]-fw/2,f0[1]]],belly,[hFront],hind.Fr.slice(1),hind.ft,hind.Bk.slice(1).reverse(),[[X0-3,Y(hc*.52)],[X0-4.5,Y(hc*.76)],[X0-3,Y(hc-hh_*.2)]]);
 /* σημεία για τα μακρινά πόδια: ευρετήρια */
 const iF0=top.length+7,iF1=iF0+fore.Fr.length-1+fore.ft.length+fore.Bk.length-1;
 const iH0=iF1+2+belly.length+1,iH1=iH0+hind.Fr.length-1+hind.ft.length+hind.Bk.length-1;
 const ex=hh.ex,ey=hh.ey,mzy=(hh.sd0+hh.sd1)/4*.55;
 const ear=merge(q.ear||{},spec.ear||{});
 const a={eye:Hx(ex,ey),er:hh.er*hl,nose:Hx(1-hh.nt*.5,-hh.sd1*.28),mouthA:Hx(1-hh.nt,hh.sd1*.33),mouthB:Hx(hh.cs*.62,(hh.sd0*.5)*.52+.03),ear:Hx(.1+(ear.x||.2)*.9,-hh.cd*.5+(ear.dy||0)),muz:Hx(hh.cs+(1-hh.cs)*.55,mzy),hc:Hx(.3,0),horn:Hx(.2,-.4),pelvis:[X(.2),Y(hc*.66)],shoulder:[X(.78),Y(hw*.78)]};
 const hornDef=spec.horn||spec.antler;if(hornDef&&hornDef.x!=null)a.horn=Hx(hornDef.x,hornDef.y==null?-.4:hornDef.y);
 const P={gen:true,pts:body,head,neckTop:[TW,TM,PLk],jointE:E,near:{fore:[iF0,iF1],hind:[iH0,iH1]},legTop:{},ref:{legY:Y(hb),gy,xr:[X0,X(1)],xa:0,xb:0,hj:E,neckDir:[1,0],tail:[X0+1,Y(hc-3)]},a:a,earSpec:ear,q:q,w:{}};
 /* προβοσκίδα ελέφαντα */
 if(hd.ty=='eleph'){const n0=Hx(.92,.1),pp=[n0,[n0[0]+8,n0[1]+16],[n0[0]+6,n0[1]+38],[n0[0]+13,n0[1]+(gy-n0[1])*.92],[n0[0]+22,n0[1]+(gy-n0[1])*.93]];P.extra=[rib(pp,t=>26-14*t,4)];P.a.nose=[pp[4][0]-1,pp[4][1]-1];P.trunk=pp}
 return P}

/* ---------- παραμόρφωση ανά είδος ---------- */
function warper(P,w){const R=P.ref,legY=R.legY,xa=R.xa,xb=R.xb,sx=w.sx||1,nl=w.neckL||0,nd=R.neckDir,dep=w.dep||1,legS=w.legS||1;
 const base=pt=>{let[x,y,t=0,c]=pt;
  if(dep!=1&&y<legY)y=legY+(y-legY)*(1+(dep-1)*(1-Math.min(1,t)));
  if(y>legY)y=legY+(y-legY)*legS;
  x+=(sx-1)*Math.min(Math.max(x-xa,0),xb-xa);
  x+=nd[0]*nl*t;y+=nd[1]*nl*t;
  return[x,y,t,c]};
 const hj=base([R.hj[0],R.hj[1],1]),hs=w.hs||1;
 return pt=>{const q=base(pt);if(q[2]>=1&&hs!=1){q[0]=hj[0]+(q[0]-hj[0])*hs;q[1]=hj[1]+(q[1]-hj[1])*hs}else if(q[2]>0&&hs!=1){const u=q[2];q[0]=hj[0]+(q[0]-hj[0])*(1+(hs-1)*u);q[1]=hj[1]+(q[1]-hj[1])*(1+(hs-1)*u)}return q}}

function build(spec,ctx){
 const SC_=L.SC;const {R,p}=ctx,c=spec.c,sz=spec.sz||1,P=spec.pre?genPlan(spec):PLANS[spec.plan||'felid'],w=merge(P.w||{},spec.w||{}),wp=P.gen?(q=>[q[0],q[1],q[2]||0,q[3]]):warper(P,w);
 const bb=[1e9,1e9,-1e9,-1e9],B=(x,y)=>{bb[0]=Math.min(bb[0],x);bb[1]=Math.min(bb[1],y);bb[2]=Math.max(bb[2],x);bb[3]=Math.max(bb[3],y)};
 const pts=P.pts.map(wp),An={};for(const k in P.a){const a=P.a[k];An[k]=Array.isArray(a)?(a.length==2?wp([a[0],a[1],(k=='pelvis'||k=='shoulder')?0:1]):a):a}
 const Lm=(P.ref.xr[1]-P.ref.xr[0])*(w.sx||1),Ls=Lm/100,unit=Math.max(.5,Lm/100);
 const D=[];let defs='',out='';
 const headPts=P.head?P.head.map(a=>[a[0],a[1]]):null,headD=headPts?cr(headPts,true):'',extraD=(P.extra||[]).join(' ');
 const bodyD=crc(pts,true);pts.forEach(a=>B(a[0],a[1]));if(headPts)headPts.forEach(a=>B(a[0],a[1]));if(P.trunk)P.trunk.forEach(a=>B(a[0],a[1]));
 const polys=[flat(pts)].concat(headPts?[flat(headPts)]:[]);
 /* στήλες: ψηλότερο/χαμηλότερο y του περιγράμματος ανά x */
 const colMinMax=x=>{let mn=1e9,mx=-1e9;for(const poly of polys)for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length];if((a[0]<=x&&b[0]>=x)||(b[0]<=x&&a[0]>=x)){const t=(b[0]-a[0])?(x-a[0])/(b[0]-a[0]):0,y=a[1]+(b[1]-a[1])*t;if(y<mn)mn=y;if(y>mx)mx=y}}return[mn,mx]};
 const legY=wp([0,P.ref.legY,0])[1],gy=wp([0,P.ref.gy,0])[1];
 const x0=wp([P.ref.xr[0],0,0])[0],x1=wp([P.ref.xr[1],0,0])[0],Lx_=x1-x0;
 const top=x=>colMinMax(x)[0]+1.5,bot=x=>Math.min(colMinMax(x)[1],legY+2)-1.5;
 /* ---- μακρινά πόδια ---- */
 const farLeg=(rng_,dx)=>{const a=P.near[rng_][0],b=P.near[rng_][1],pp=pts.slice(a,b+1).map(q=>[q[0]+dx,q[1],0,q[3]]);pp.push([pp[pp.length-1][0],legY-14],[pp[0][0],legY-14]);return pp};
 const farF=P.near&&P.near.fore?farLeg('fore',-13):null,farH=P.near&&P.near.hind?farLeg('hind',P.roo?-9:11):null;
 /* ---- ουρά ---- */
 const tt=TAILS[spec.tail||(P.q&&P.q.tail)||'cat'];let tailD='',tailTip='',tailPts=null;
 if(tt){const a0=wp([P.ref.tail[0],P.ref.tail[1],0]);tailPts=tt.p.map(([x,y])=>[a0[0]+x*Lm*(spec.tl||1),a0[1]+y*Lm*(spec.tl||1)]);tailPts.forEach(a=>B(a[0],a[1]));
  tailD=rib(tailPts,t=>tt.w(t)*unit*(spec.tw||1),5);const e=tailPts[tailPts.length-1];
  if(tt.tip=='tuft'){const ww=(spec.tuft||7)*unit;tailTip=`<path d="M${f(e[0])} ${f(e[1]-2)}Q${f(e[0]-ww)} ${f(e[1]+ww*1.2)} ${f(e[0]-1)} ${f(e[1]+ww*2.6)}Q${f(e[0]+ww)} ${f(e[1]+ww*1.2)} ${f(e[0])} ${f(e[1]-2)}Z" fill="${c.tuft||adj(c.d,-14)}"/>`;B(e[0],e[1]+ww*2.6)}
  else if(tt.tip=='bush'&&c.tt)tailTip=`<ellipse cx="${f(e[0])}" cy="${f(e[1]+2)}" rx="${f(6*unit)}" ry="${f(9*unit)}" fill="${c.tt}"/>`;
  else if(tt.tip=='flat')tailTip=`<ellipse cx="${f(e[0]-3)}" cy="${f(e[1]+1)}" rx="${f(15*unit)}" ry="${f(6*unit)}" fill="${adj(c.d,-6)}"/>`;
  else if(tt.tip=='hair')tailTip=`<path d="M${f(e[0]-5)} ${f(e[1]-8)}Q${f(e[0]-9)} ${f(e[1]+10)} ${f(e[0]-2)} ${f(e[1]+16)}Q${f(e[0]+4)} ${f(e[1]+10)} ${f(e[0]+5)} ${f(e[1]-8)}Z" fill="${c.mn||adj(c.d,-10)}"/>`}
 /* ---- διαβαθμίσεις ---- */
 const yT=bb[1],stMain=[[0,adj(c.b,-9)],[.3,c.b],[.62,mixc(c.b,c.l,.5)],[1,c.l]];
 defs+=lgr(p+'bd',0,yT,0,legY,stMain,1)+lgr(p+'lo',0,legY-10,0,gy,[[0,c.legc||mixc(c.b,c.d,.04),0],[.4,c.legc||mixc(c.b,c.d,.04),.8],[1,c.legc2||c.legc||mixc(c.b,c.d,.28),1]],1)
  +lgr(p+'ao',0,yT,0,gy,[[0,'#150e08',0],[.5,'#150e08',0],[((legY-yT)/(gy-yT)),'#150e08',.38],[1,'#150e08',.14]],1)
  +lgr(p+'rl',0,yT,0,yT+(legY-yT)*.4,[[0,'#fff',.36],[1,'#fff',0]],1)
  +rgr(p+'hl',[[0,'#fff',.30],[1,'#fff',0]])+rgr(p+'sh',[[0,'#150e08',.34],[1,'#150e08',0]])+rgr(p+'mz',[[.5,c.m,1],[1,c.m,0]])
  +rgr(p+'ir',[[0,adj(c.e||'#7a5a2a',24)],[.6,c.e||'#7a5a2a'],[1,adj(c.e||'#7a5a2a',-26)]],.4,.35,.75)+lgr(p+'ea',0,0,0,1,[[0,adj(c.b,2)],[1,c.d]])
  +lgr(p+'hn',0,0,1,0,[[0,adj(c.hc||'#7a6a56',10)],[.5,adj(c.hc||'#7a6a56',24)],[1,adj(c.hc||'#7a6a56',-8)]])
  +lgr(p+'fl',0,0,0,1,[[0,adj(c.legc||mixc(c.b,c.d,.3),-10)],[1,adj(c.legc2||c.legc||mixc(c.b,c.d,.3),-14)]]);
 defs+=`<clipPath id="${p}cl"><path d="${bodyD}"/>${headD?`<path d="${headD}"/>`:''}${extraD?`<path d="${extraD}"/>`:''}</clipPath>`;
 /* σκιά εδάφους */
 const cxm=(x0+x1)/2;out+=`<ellipse cx="${f(cxm)}" cy="${f(gy+1)}" rx="${f(Lm*.6)}" ry="${f(Math.max(4,Lm*.05))}" fill="#000" opacity=".28"/>`;
 for(const fl_ of[farH,farF])if(fl_)out+=`<path d="${crc(fl_)}" fill="url(#${p}fl)"/><path d="${crc(fl_)}" fill="#150e08" opacity=".3"/>`;
 if(tailD&&!spec.tailFront)out+=`<path d="${tailD}" fill="${c.tailc||mixc(c.b,c.d,.22)}"/>${tailTip}`;
 /* μάνα πίσω */
 let manesBack='',manesFront='';
 if(spec.mane&&spec.mane.k=='lion'){const mm=spec.mane,n=mm.n||170,hc=An.hc,hl=Lm*.34,cx=hc[0]-hl*.05,cy=hc[1]+hl*.08,r0=hl*.5,r1=hl*(mm.r||1.05),cols=[mm.c1,mm.c2,mm.c3];let s='';
  for(let i=0;i<n;i++){const a=rad(-100+(i/(n-1))*(mm.span||270))+(R()-.5)*.08,rr0=r0*(.8+R()*.3),rr1=r1*(.7+R()*.45),x0_=cx+Math.cos(a)*rr0,y0_=cy+Math.sin(a)*rr0*.9,x1_=cx+Math.cos(a+.1*(R()-.2))*rr1,y1_=cy+Math.sin(a)*rr1*.95+rr1*.1*Math.max(0,Math.sin(a));
   s+=`<path d="${taper([[x0_,y0_],[(x0_+x1_)/2+(R()-.5)*3,(y0_+y1_)/2+(R()-.5)*3],[x1_,y1_]],hl*.2,.5,3)}" fill="${cols[(R()*3)|0]}" opacity="${f(.9-R()*.25)}"/>`;B(x1_,y1_)}
  manesBack=s;let fr='';for(let i=0;i<Math.round(n*.22);i++){const a=rad(70+R()*130),rr=hl*(.8+R()*.4),x0_=cx+Math.cos(a)*r0*.9,y0_=cy+Math.sin(a)*r0*.9,x1_=cx+Math.cos(a)*rr*1.15,y1_=cy+Math.sin(a)*rr*1.2+4;
   fr+=`<path d="${taper([[x0_,y0_],[(x0_+x1_)/2,(y0_+y1_)/2],[x1_,y1_]],hl*.13,.4,3)}" fill="${cols[(R()*3)|0]}" opacity=".95"/>`}manesFront=fr}

 /* χαίτες αλόγου/ζέβρας, κοτσίδες, ακανθες, χαυλιόδοντες */
 const nt=P.neckTop||(pts.length?[[An.shoulder[0],An.shoulder[1]-8],An.hc]:null);
 const along=t=>{const a=nt,n=a.length-1,u=t*n,i=Math.min(n-1,Math.floor(u)),k=u-i;return[a[i][0]+(a[i+1][0]-a[i][0])*k,a[i][1]+(a[i+1][1]-a[i][1])*k]};
 if(spec.mane&&(spec.mane.k=='crest'||spec.mane.k=='stiff')&&nt){const mm=spec.mane,n=mm.n||22;let s_='';
  for(let i=0;i<n;i++){const t=i/(n-1),[ox,oy]=along(t);
   if(mm.k=='stiff'){const l=(mm.l||8)*unit;s_+=`<path d="${taper([[ox-1,oy+2],[ox+1,oy-l*.5],[ox+2.5,oy-l]],(mm.w||4)*unit,.8,3)}" fill="${i%2?(mm.c2||'#f4f2ea'):(mm.c1||'#17181a')}"/>`;B(ox,oy-l)}
   else{const l=(mm.l||20)*unit*(.7+R()*.5);s_+=`<path d="${taper([[ox,oy-1],[ox-3+(R()-.5)*3,oy+l*.45],[ox-7+(R()-.5)*5,oy+l]],(mm.w||3.4)*unit,.4,4)}" fill="${[mm.c1,mm.c2,mm.c3||mm.c1][(R()*3)|0]}" opacity=".95"/>`;B(ox-7,oy+l)}}
  manesFront+=s_;
  if(mm.fore){const e=An.ear;for(let i=0;i<4;i++)manesFront+=`<path d="${taper([[e[0]+i,e[1]],[e[0]+5+i*2,e[1]+6],[e[0]+8+i*3,e[1]+14+i]],2.2*unit,.4,3)}" fill="${mm.c1}"/>`}}
 if(spec.mane&&spec.mane.k=='ruff'){const mm=spec.mane,E_=P.jointE||An.hc,n=mm.n||60;let s_='';
  for(let i=0;i<n;i++){const a=rad(40+R()*190),r0=(mm.r||12)*unit,x0_=E_[0]-Math.cos(a)*r0*.6-4,y0_=E_[1]+Math.sin(a)*r0*.8,l=(mm.l||13)*unit*(.6+R()*.7);
   s_+=`<path d="${taper([[x0_,y0_],[x0_-Math.cos(a)*l*.5,y0_+Math.sin(a)*l*.5+2],[x0_-Math.cos(a)*l+(R()-.5)*3,y0_+Math.sin(a)*l+4]],3*unit,.4,3)}" fill="${[mm.c1||c.b,mm.c2||c.d][(R()*2)|0]}" opacity=".9"/>`}manesFront+=s_}
 let quillBack='';
 if(spec.quills){const qq=spec.quills,n=qq.n||150,cols=[qq.c1||c.d,qq.c2||c.l,qq.c3||adj(c.d,-14)];
  for(let i=0;i<n;i++){const x=x0+Lx_*(.04+.82*R()),tY=top(x),y=tY+4+R()*(qq.depth||18)*unit,a=rad(-95-R()*55),l=(qq.l||13)*unit*(.7+R()*.6),bx=x+Math.cos(a)*l,by=y+Math.sin(a)*l-0;
   quillBack+=`<path d="M${f(x-1.3)} ${f(y)}L${f(bx)} ${f(by)}L${f(x+1.3)} ${f(y)}Z" fill="${cols[i%3]}" opacity=".95"/>`;B(bx,by)}}
 let tuskS='';
 if(spec.tusk){const tk=spec.tusk,mA=An.mouthA,sc=(tk.s||1)*unit,col=c.tusk||'#f1ead8';let pp;
  if(tk.k=='up')pp=[[mA[0]-4*sc,mA[1]+1],[mA[0]-1*sc,mA[1]-3*sc],[mA[0]+2*sc,mA[1]-8*sc]];
  else if(tk.k=='narwhal'){const nz=An.nose;pp=[[nz[0],nz[1]+1],[nz[0]+22*sc,nz[1]+1],[nz[0]+46*sc,nz[1]+2]]}
  else pp=[[mA[0]-6*sc,mA[1]+1],[mA[0]-4*sc,mA[1]+10*sc],[mA[0]+3*sc,mA[1]+18*sc],[mA[0]+10*sc,mA[1]+16*sc]];
  tuskS=`<path d="${taper(pp,3.4*unit,.7,5)}" fill="${col}" stroke="${adj(col,-30)}" stroke-width=".3"/>`;pp.forEach(a=>B(a[0],a[1]))}
 out+=quillBack+`<path d="${bodyD}" fill="url(#${p}bd)"/>`+(headD?`<path d="${headD}" fill="url(#${p}bd)"/>`:'')+(extraD?`<path d="${extraD}" fill="url(#${p}bd)"/>`:'')+manesBack;
 if(tailD&&spec.tailFront)out+=`<path d="${tailD}" fill="url(#${p}bd)"/>${tailTip}`;
 /* ---- επικαλύψεις (clip στο περίγραμμα) ---- */
 let ov=`<g clip-path="url(#${p}cl)">`;
 ov+=`<rect x="-40" y="${f(legY-10)}" width="${f(W*2)}" height="${f(gy-legY+14)}" fill="url(#${p}lo)"/><rect x="-40" y="${f(yT-4)}" width="${f(W*2)}" height="${f(gy-yT+8)}" fill="url(#${p}ao)"/><rect x="-40" y="${f(yT-4)}" width="${f(W*2)}" height="${f((legY-yT)*.5)}" fill="url(#${p}rl)"/>`;
 const vol=(cx,cy,rx,ry,id,rt)=>`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="url(#${p}${id})" transform="rotate(${rt||0} ${f(cx)} ${f(cy)})"/>`;
 const sh=An.shoulder,pe=An.pelvis;
 ov+=vol(sh[0],sh[1]-6*unit,Lm*.13,(legY-yT)*.32,'hl',-12)+vol(sh[0]+4,legY-2,Lm*.1,10*unit,'sh')+vol(pe[0],pe[1]-4*unit,Lm*.17,(legY-yT)*.3,'hl',22)+vol(pe[0]+6,legY+5,Lm*.2,10*unit,'sh');
 /* γούνα */
 const nf=spec.fur==null?340:spec.fur,flen=(spec.furl||4)*unit;let fl='',fd='';
 for(let i=0;i<nf;i++){const x=x0+R()*(Lm*1.15),[tY,bY]=colMinMax(x);if(tY>1e8)continue;const y=tY+R()*(bY-tY),a=rad(95+R()*40+(x>x1-Lm*.2?-10:0)),len=flen*(.6+R()*.9),s=`M${f(x)} ${f(y)}q${f(Math.cos(a)*len*.5-.5)} ${f(Math.sin(a)*len*.5)} ${f(Math.cos(a)*len)} ${f(Math.sin(a)*len)}`;if(R()<.5)fl+=s;else fd+=s}
 ov+=`<g fill="none" stroke-linecap="round" stroke-width=".65"><path d="${fl}" stroke="${adj(c.b,26)}" opacity="${spec.fo||.4}"/><path d="${fd}" stroke="${adj(c.d,-8)}" opacity="${spec.fo||.38}"/></g>`;
 /* σημάδια */
 ov+=marks(spec.m||[],R,{c,P,unit,x0,x1,top,bot,legY,gy,An,tailPts,Lm,colMinMax});
 /* κεφάλι: ανοιχτόχρωμο ρύγχος, σκιά κάτω γνάθου */
 const mz=An.muz;ov+=`<ellipse cx="${f(mz[0]-2*unit)}" cy="${f(mz[1]+1)}" rx="${f(14*unit*(w.mzw||1))}" ry="${f(9*unit)}" fill="url(#${p}mz)" opacity="${spec.mzo==null?.9:spec.mzo}"/>`;
 ov+=hmarks(spec.m||[],R,{c,An,unit,p});
 ov+='</g>';
 out+=ov;
 for(const o of(P.over||[]))out+=`<path d="${o.d}" fill="${o.k=='bd'?`url(#${p}bd)`:`url(#${p}fl)`}"/><path d="${o.d}" fill="#150e08" opacity="${o.k=='bd'?.12:.25}"/>`;
 /* ---- χαρακτηριστικά προσώπου ---- */
 out+=face(spec,P,An,c,p,unit,B)+tuskS;
 if(spec.beard){const ch=An.mouthB;out+=`<path d="M${f(ch[0]+2)} ${f(ch[1]+1)}q${f(-2)} ${f(spec.beard*unit)} ${f(-5)} ${f(spec.beard*1.3*unit)}q${f(5)} ${f(-3)} ${f(7)} ${f(-spec.beard*unit+3)}Z" fill="${c.d}"/>`}
 if(P.water){const wy=P.water,k=(SC_[spec.sc]||SC_.sea);defs+=lgr(p+'wt',0,wy,0,gy+8,[[0,k.g[0],.7],[1,k.g[1],.92]],1);out+=`<rect x="-400" y="${wy}" width="900" height="${f(gy-wy+14)}" fill="url(#${p}wt)"/><path d="M-20 ${wy}Q20 ${wy-2} 60 ${wy}T140 ${wy}T220 ${wy}" stroke="#fff" stroke-width="1.1" fill="none" opacity=".45"/>`}
 /* ---- αυτί, κέρατα ---- */
 const ear=merge(merge({k:'round',w:11,h:11,a:0},P.earSpec||{}),spec.ear||{}),e0=An.ear;
 if(ear.k&&ear.k!='none'){const ed=earD(ear.k,ear.w*unit,ear.h*unit),mk=(far)=>`<g transform="translate(${f(e0[0]+(far?-ear.w*unit*.45:0))} ${f(e0[1]+(far?-1:0))}) rotate(${f((ear.a||0)+(far?-10:0))})"><path d="${ed.d}" fill="${far?adj(c.d,-6):`url(#${p}ea)`}"/>${far?'':`<path d="${ed.in}" fill="${c.i}" opacity=".85"/>`}</g>`;
  out=out.replace('@@EARBACK@@','');out+=mk(false);B(e0[0],e0[1]-ear.h*unit)}
 const hb2=(sp,far)=>{if(!sp)return'';let s='';const base=wp([P.a.horn[0]+(sp.dx||0),P.a.horn[1]+(sp.dy||0),1]),o=far?[-3,1.5]:[0,0];
  if(sp.t){s+=`<g transform="translate(${f(base[0]+o[0])} ${f(base[1]+o[1])}) rotate(${f(sp.rot||-10)}) scale(${(far?-.96:.96)*unit},${unit})">${antlerP(sp,c,far)}</g>`;B(base[0],base[1]-(sp.s||1)*48*unit)}
  else if(sp.k=='cone'){const sc=(sp.s||1)*unit,bw=7*sc,hh_=17*sc;s+=`<g transform="translate(${f(base[0]+o[0])} ${f(base[1]+o[1])}) rotate(${f(sp.rot||0)})"><path d="M${f(-bw/2)} 2C${f(-bw*.5)} ${f(-hh_*.5)} ${f(-bw*.25-hh_*.3)} ${f(-hh_*.8)} ${f(-hh_*.5)} ${f(-hh_)}C${f(bw*.1)} ${f(-hh_*.6)} ${f(bw*.5)} ${f(-hh_*.3)} ${f(bw/2)} 2Z" fill="url(#${p}hn)" stroke="${c.hk||'#4a3a2a'}" stroke-width=".4"/></g>`;B(base[0]-hh_*.5,base[1]-hh_)}
  else{const Hh=HORN[sp.k];if(!Hh)return'';const mirrorK=!/^(cow|bison|yak|buffalo|wilde|musk|spike|ossicone)$/.test(sp.k),sc=(sp.s||1)*(sp.big||1)*unit;
   const hp=Hh.p.map(([x,y])=>[x*sc*(mirrorK?-1:1),y*sc]);s+=`<g transform="translate(${f(base[0]+o[0])} ${f(base[1]+o[1])}) rotate(${f(sp.rot||0)})"><path d="${taper(hp,Hh.w[0]*sc,Hh.w[1]*sc,5)}" fill="${far?adj(c.hk||'#6a5a48',-14):`url(#${p}hn)`}" stroke="${c.hk||'#4a3a2a'}" stroke-width=".4"/>`;
   if(Hh.r&&!far){const sp2=sample(hp,5);let rg='';for(let i=2;i<sp2.length-3;i+=Hh.r>9?2:3){const a=sp2[i-1],b=sp2[i+1],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,ww=(Hh.w[0]+(Hh.w[1]-Hh.w[0])*i/sp2.length)*sc*.5;rg+=`M${f(sp2[i][0]-dy/l*ww)} ${f(sp2[i][1]+dx/l*ww)}L${f(sp2[i][0]+dy/l*ww)} ${f(sp2[i][1]-dx/l*ww)}`}s+=`<path d="${rg}" stroke="${c.hk||'#4a3a2a'}" stroke-width=".6" opacity=".5" fill="none"/>`}
   s+='</g>';hp.forEach(([x,y])=>B(base[0]+x,base[1]+y))}return s};
 out+=hb2(spec.horn,true)+hb2(spec.antler,true);
 out=out+hb2(spec.horn,false)+hb2(spec.antler,false)+manesFront;
 const bw=bb[2]-bb[0],bh=bb[3]-bb[1],kk=Math.min(206/bw,118/bh)*(spec.fit==null?1:spec.fit)*sz;
 const tx=W/2-(bb[0]+bb[2])/2*kk,ty=GY-bb[3]*kk;
 return{defs,body:`<g transform="translate(${f(tx)} ${f(ty)}) scale(${f(kk)})">${out}</g>`,k:kk}}

function antlerP(sp,c,far){const sc=sp.s||1,col1=far?adj(c.an||'#8a6a45',-16):(c.an||'#8a6a45'),T=(pts,w0,w1)=>`<path d="${taper(pts.map(([x,y])=>[x*sc,y*sc]),w0*sc,w1*sc,4)}" fill="${col1}" stroke="${adj(col1,-18)}" stroke-width=".4"/>`;
 let a='';const t=sp.t;
 if(t=='tines')a=T([[0,0],[-6,-10],[-11,-22],[-12,-36],[-6,-50]],3.2,1)+T([[-5,-12],[3,-16],[8,-26]],2,.7)+T([[-9,-26],[-1,-31],[3,-42]],1.8,.6)+T([[-11,-38],[-17,-44],[-19,-54]],1.6,.6)+T([[-2,-4],[2,-9]],1.8,.8);
 else if(t=='palm')a=`<path d="M0 0Q-8 -8 -14 -20Q-22 -26 -32 -22L-34 -30L-28 -36L-26 -44L-19 -40L-14 -50L-8 -40L-4 -28Q0 -12 0 0Z" fill="${col1}" stroke="${adj(col1,-18)}" stroke-width=".5"/>`+T([[0,-2],[4,-12],[8,-22]],2,.8);
 else if(t=='reindeer')a=T([[0,0],[-3,-14],[-10,-30],[-16,-46],[-13,-60]],3.2,1)+T([[-3,-16],[5,-22],[9,-30]],2,.8)+T([[-10,-30],[-18,-34],[-24,-44],[-25,-54]],2,.8)+T([[-1,-8],[6,-12],[10,-4]],2.4,1)+T([[-14,-48],[-8,-56],[-4,-64]],1.6,.6);
 else if(t=='fork')a=T([[0,0],[-3,-12],[-8,-26],[-6,-38]],3,.9)+T([[-4,-16],[3,-22],[5,-34]],2,.7);
 else if(t=='spike')a=T([[0,0],[-2,-10],[-4,-22]],2.6,.7);
 return a}

/* ---------- πρόσωπο: στόμα, μύτη, μάτι, μουστάκια ---------- */
function face(spec,P,An,c,p,u,B){let s='';const e=spec.eye||{},er=(P.a.er||2.3)*(e.s||1)*u*(spec.hsz||1),ex=An.eye[0],ey=An.eye[1],pt=e.pt||'round';
 const nz=An.nose,mA=An.mouthA,mB=An.mouthB;
 s+=`<path d="M${f(mA[0])} ${f(mA[1])}Q${f((mA[0]+mB[0])/2)} ${f((mA[1]+mB[1])/2-1.4*u)} ${f(mB[0])} ${f(mB[1]+.8*u)}" stroke="#1a0f0a" stroke-width="${f(.8*u)}" fill="none" stroke-linecap="round" opacity=".7"/>`;
 const nk=spec.nose||'cat',nc=c.n||'#241812';
 if(nk=='cat')s+=`<path d="M${f(nz[0]-3.6*u)} ${f(nz[1]-2.4*u)}Q${f(nz[0]+1)} ${f(nz[1]-4*u)} ${f(nz[0]+2.4*u)} ${f(nz[1]+1.4*u)}Q${f(nz[0])} ${f(nz[1]+5.6*u)} ${f(nz[0]-3.2*u)} ${f(nz[1]+1.6*u)}Z" fill="${nc}"/>`;
 else if(nk=='dog')s+=`<ellipse cx="${f(nz[0]-1.5*u)}" cy="${f(nz[1]+u)}" rx="${f(3.4*u)}" ry="${f(3.2*u)}" fill="${nc}"/><ellipse cx="${f(nz[0]-3*u)}" cy="${f(nz[1]-.4*u)}" rx="${f(1.3*u)}" ry="${f(.8*u)}" fill="#fff" opacity=".45"/>`;
 else if(nk=='hoof'||nk=='wet')s+=`<ellipse cx="${f(nz[0]-3*u)}" cy="${f(nz[1]+1.4*u)}" rx="${f(2.4*u)}" ry="${f(1.6*u)}" fill="${nc}" transform="rotate(-25 ${f(nz[0]-3*u)} ${f(nz[1]+1.4*u)})"/><ellipse cx="${f(nz[0]-1.5*u)}" cy="${f(nz[1]+7*u)}" rx="${f(6*u)}" ry="${f(5*u)}" fill="${nc}" opacity=".3"/>`;
 else if(nk=='pig')s+=`<ellipse cx="${f(nz[0])}" cy="${f(nz[1]+3*u)}" rx="${f(3.4*u)}" ry="${f(7*u)}" fill="${c.pn||'#d99a9a'}"/><ellipse cx="${f(nz[0])}" cy="${f(nz[1])}" rx="${f(.9*u)}" ry="${f(1.6*u)}" fill="#3a1e1e"/><ellipse cx="${f(nz[0])}" cy="${f(nz[1]+5*u)}" rx="${f(.9*u)}" ry="${f(1.6*u)}" fill="#3a1e1e"/>`;
 else if(nk=='bull')s+=`<ellipse cx="${f(nz[0]-1*u)}" cy="${f(nz[1]+3*u)}" rx="${f(4*u)}" ry="${f(7.5*u)}" fill="${c.pn||'#d6a8a0'}"/><ellipse cx="${f(nz[0]-1*u)}" cy="${f(nz[1]+1*u)}" rx="${f(1.3*u)}" ry="${f(2.2*u)}" fill="#3a1e1e"/>`;
 else if(nk=='rod')s+=`<ellipse cx="${f(nz[0])}" cy="${f(nz[1]+u)}" rx="${f(2.4*u)}" ry="${f(2.6*u)}" fill="${c.pn||'#d99a9a'}"/>`;
 const rr=Math.max(1.6,er),ir=`url(#${p}ir)`;
 s+=`<ellipse cx="${f(ex)}" cy="${f(ey)}" rx="${f(rr*1.5)}" ry="${f(rr*1.3)}" fill="#150e08" opacity=".22"/><ellipse cx="${f(ex)}" cy="${f(ey)}" rx="${f(rr*1.08)}" ry="${f(rr*.98)}" fill="#130c08"/><ellipse cx="${f(ex)}" cy="${f(ey)}" rx="${f(rr*.94)}" ry="${f(rr*.86)}" fill="${ir}"/>`;
 if(pt=='v')s+=`<ellipse cx="${f(ex)}" cy="${f(ey)}" rx="${f(rr*.2)}" ry="${f(rr*.84)}" fill="#050302"/>`;else if(pt=='h')s+=`<ellipse cx="${f(ex)}" cy="${f(ey)}" rx="${f(rr*.66)}" ry="${f(rr*.24)}" fill="#050302"/>`;else s+=`<circle cx="${f(ex)}" cy="${f(ey)}" r="${f(rr*.5)}" fill="#050302"/>`;
 s+=`<ellipse cx="${f(ex-rr*.3)}" cy="${f(ey-rr*.32)}" rx="${f(rr*.3)}" ry="${f(rr*.24)}" fill="#fff" opacity=".95"/><circle cx="${f(ex+rr*.32)}" cy="${f(ey+rr*.3)}" r="${f(rr*.12)}" fill="#fff" opacity=".5"/>`;
 s+=`<path d="M${f(ex-rr*1.1)} ${f(ey+rr*.1)}Q${f(ex)} ${f(ey-rr*1.5)} ${f(ex+rr*1.1)} ${f(ey+rr*.1)}" stroke="#120a06" stroke-width="${f(Math.max(.6,rr*.28))}" fill="none" stroke-linecap="round"/>`;
 if(spec.wh!==0&&/cat|dog|bear|rodent|mustel|seal/.test(spec.whk||spec.plan||'')){let ws='';for(let i=0;i<4;i++){const dy=(i-1.5)*2.2*u;ws+=`M${f(nz[0]-6*u)} ${f(nz[1]+5*u+dy)}q${f(6*u)} ${f(dy*.5+u)} ${f(15*u)} ${f(dy*2.3+4*u)}`}s+=`<path d="${ws}" fill="none" stroke="#f6f0e6" stroke-width=".5" opacity=".7"/>`}
 return s}

/* ---------- σημάδια ---------- */
function marks(list,R,X){const{c,P,unit,x0,x1,top,bot,legY,gy,tailPts,Lm}=X;let s='';const Lx=x1-x0;
 for(const m of list){const k=typeof m=='string'?m:m.k,col=(m&&m.c)||c.k||adj(c.d,-36);
  if(k=='tiger'||k=='zebra'){const zb=k=='zebra',n=zb?(m.n||26):(m.n||17);let st='';
   for(let i=0;i<n;i++){const x=x0+Lx*(.03+.94*i/(n-1))+(R()-.5)*2,yt=top(x),yb=bot(x),dep=(zb?1.02:.55+R()*.4)*(yb-yt),sl=-(zb?.12:.2)*dep,w=(zb?3.2+R()*1.4:3.4+R()*2)*unit;
    st+=`<path d="${taper([[x,yt-2],[x+sl*.3+(R()-.5)*2,yt+dep*.35],[x+sl*.7,yt+dep*.7],[x+sl,yt+dep]],w,.5,4)}" fill="${col}" opacity=".92"/>`;
    if(!zb&&R()<.5)st+=`<path d="${taper([[x+3,yt+dep*.3],[x+6,yt+dep*.5],[x+5,yt+dep*.72]],2.2*unit,.4,3)}" fill="${col}" opacity=".85"/>`}
   /* λαιμός */
   const nA=X.An.shoulder,nB=X.An.hc,nn=zb?9:6;for(let i=0;i<nn;i++){const t=(i+.5)/nn,bx=nA[0]+(nB[0]-nA[0])*t,by=nA[1]-6+(nB[1]-nA[1])*t,hh=(zb?9:11)*unit;st+=`<path d="${taper([[bx-2,by-hh],[bx+1,by],[bx-1,by+hh]],3*unit,.6,4)}" fill="${col}" opacity=".9"/>`}
   /* πόδια */
   const nb=zb?7:4;for(let i=0;i<nb;i++){const y=legY+8+(gy-legY-14)*(i+.4)/nb;st+=`<rect x="-20" y="${f(y)}" width="${W*2}" height="${f((zb?2.4:2.8)*unit)}" fill="${col}" opacity=".9"/>`}
   if(tailPts&&!zb)for(let i=0;i<4;i++){const j=Math.round((i+.5)/4*(tailPts.length-1)),a=tailPts[Math.max(0,j-1)],b=tailPts[Math.min(tailPts.length-1,j+1)],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1;st+=`<path d="M${f(tailPts[j][0]-dy/l*8)} ${f(tailPts[j][1]+dx/l*8)}L${f(tailPts[j][0]+dy/l*8)} ${f(tailPts[j][1]-dx/l*8)}" stroke="${col}" stroke-width="${f(3*unit)}" opacity=".9"/>`}
   s+=st}
  else if(k=='spots'||k=='rosette'||k=='dots'||k=='wspots'){const n=m.n||34,rg=(m.r||[2,3.4]).map(v=>v*unit);let g='';
   for(let i=0;i<n;i++){const x=x0+Lx*(R()*.98)+3,yt=top(x)+3,yb=bot(x)-3;if(yb<=yt)continue;const y=yt+R()*(yb-yt),r=rg[0]+R()*(rg[1]-rg[0]);
    if(k=='rosette'){const a0=R()*6.28;let d='';for(let q=0;q<5;q++){const a=a0+q*1.25,aa=a+.8;d+=`M${f(x+Math.cos(a)*r)} ${f(y+Math.sin(a)*r*.85)}A${f(r)} ${f(r*.85)} 0 0 1 ${f(x+Math.cos(aa)*r)} ${f(y+Math.sin(aa)*r*.85)}`}
     g+=`<path d="${d}" fill="none" stroke="${col}" stroke-width="${f(r*.55)}" stroke-linecap="round" opacity=".9"/>`+(m.core?`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r*.28)}" fill="${col}" opacity=".8"/>`:'')}
    else g+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r)}" ry="${f(r*(.7+R()*.35))}" fill="${col}" opacity=".86"/>`}
   const nA=X.An.shoulder,nB=X.An.hc;for(let i=0;i<Math.round(n*.25);i++){const t=R(),bx=nA[0]+(nB[0]-nA[0])*t,by=nA[1]-4+(nB[1]-nA[1])*t+(R()-.5)*10*unit,r=rg[0]+R()*(rg[1]-rg[0]);g+=`<circle cx="${f(bx)}" cy="${f(by)}" r="${f(r*.8)}" fill="${col}" opacity=".85"/>`}
   for(let i=0;i<(m.legs==null?10:m.legs);i++){const x=x0+Lx*(.08+R()*.8),y=legY+6+R()*(gy-legY-14);g+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(rg[0]*.75)}" fill="${col}" opacity=".8"/>`}
   if(tailPts)for(let i=0;i<4;i++){const j=Math.floor(R()*(tailPts.length-1));g+=`<circle cx="${f(tailPts[j][0])}" cy="${f(tailPts[j][1])}" r="${f(rg[0]*.9)}" fill="${col}" opacity=".85"/>`}
   s+=g}
  else if(k=='patches'){let g='';const n=m.n||6;for(let i=0;i<n;i++){const cx=x0+Lx*(.1+R()*.8),cy=(top(cx)+bot(cx))/2+(R()-.5)*8,rr=(9+R()*12)*unit,pp=[];for(let a=0;a<8;a++){const an=a/8*Math.PI*2,r=rr*(.6+R()*.6);pp.push([cx+Math.cos(an)*r*1.3,cy+Math.sin(an)*r*.9])}g+=`<path d="${cr(pp,true)}" fill="${col}"/>`}s+=g}
  else if(k=='dstripe'){const pp=[];for(let i=0;i<=8;i++){const x=x0+Lx*(.02+.9*i/8);pp.push([x,top(x)+2.5])}s+=`<path d="${taper(pp,4.5*unit,3*unit,5)}" fill="${col}" opacity=".9"/>`}
  else if(k=='sstripe'){const pp=[];for(let i=0;i<=8;i++){const x=x0+Lx*(.1+.8*i/8);pp.push([x,(top(x)*.45+bot(x)*.55)])}s+=`<path d="${taper(pp,(m.w||4)*unit,(m.w||4)*unit,5)}" fill="${col}" opacity=".9"/>`}
  else if(k=='saddle'){const a=x0+Lx*.25,b=x0+Lx*.7,pp=[[a,top(a)-3],[a+4,(top(a)+bot(a))*.45],[b-4,(top(b)+bot(b))*.45],[b,top(b)-3]];s+=`<path d="${cr(pp,true)}" fill="${col}" opacity="${m.o||.8}"/>`}
  else if(k=='band'){const a=x0+Lx*(m.x0||.62),b=x0+Lx*(m.x1||.9);s+=`<rect x="${f(a)}" y="-60" width="${f(b-a)}" height="240" fill="${col}" opacity="${m.o||.95}"/>`}
  else if(k=='legsdark'){s+=`<rect x="-20" y="${f(legY+(m.y||6))}" width="${W*2}" height="${gy-legY}" fill="${col}" opacity="${m.o||.92}"/>`}
  else if(k=='giraffe'){let g='';const cs=(m.cell||13)*unit;for(let yy=-40;yy<110;yy+=cs*.9)for(let xx=-20;xx<220;xx+=cs){const cx=xx+((Math.round(yy/(cs*.9))%2)?cs/2:0)+(R()-.5)*3,cy=yy+(R()-.5)*3,pp=[];for(let a=0;a<6;a++){const an=a/6*Math.PI*2+.3,r=cs*(.36+R()*.1);pp.push([cx+Math.cos(an)*r*1.05,cy+Math.sin(an)*r])}g+=`<path d="${cr(pp,true)}" fill="${col}" opacity=".95"/>`}s+=g}
  else if(k=='scales'){let g='';const w_=(m.w||6)*unit;for(let r=0;r<22;r++)for(let q=-2;q<(Lx/w_)+6;q++){const x=x0+q*w_+(r%2?w_/2:0),y=-10+r*w_*.78;g+=`<path d="M${f(x-w_/2)} ${f(y)}Q${f(x)} ${f(y+w_*.9)} ${f(x+w_/2)} ${f(y)}" fill="none" stroke="${col}" stroke-width=".8" opacity=".6"/>`}s+=g}
  else if(k=='orca'){const e=X.An.eye;s+=`<ellipse cx="${f(e[0]-3*unit)}" cy="${f(e[1]-5*unit)}" rx="${f(9*unit)}" ry="${f(4.2*unit)}" transform="rotate(-18 ${f(e[0])} ${f(e[1])})" fill="#f6f6f2"/><ellipse cx="${f(X.An.shoulder[0]-4)}" cy="${f(X.An.shoulder[1]-12*unit)}" rx="${f(14*unit)}" ry="${f(5*unit)}" fill="#9aa0a4" opacity=".8"/>`}
  else if(k=='rings'&&tailPts){const n=m.n||7,sp=sample(tailPts,5);let g='';for(let i=0;i<n;i++){const j=Math.round((i+.5)/n*(sp.length-1)),a=sp[Math.max(0,j-1)],b=sp[Math.min(sp.length-1,j+1)],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1;g+=`<path d="M${f(sp[j][0]-dy/l*9)} ${f(sp[j][1]+dx/l*9)}L${f(sp[j][0]+dy/l*9)} ${f(sp[j][1]-dx/l*9)}" stroke="${col}" stroke-width="${f((m.w||2.6)*unit)}" opacity=".9"/>`}s+=g}
  else if(k=='legbars'){for(let i=0;i<6;i++){const y=legY+4+(gy-legY-8)*(i+.3)/6;s+=`<rect x="-20" y="${f(y)}" width="${W*2}" height="${f(2.2*unit)}" fill="${col}" opacity=".85"/>`}}
  else if(k=='proboscis'){}
  else if(k=='bands'){let g='';const n=m.n||9;for(let i=0;i<n;i++){const x=x0+Lx*(.06+.9*i/(n-1));g+=`<path d="M${f(x)} ${f(top(x)-2)}Q${f(x-3)} ${f((top(x)+bot(x))/2)} ${f(x-1)} ${f(bot(x)+2)}" stroke="${col}" stroke-width="${f((m.w||1.6)*unit)}" fill="none" opacity=".7"/>`}s+=g}
 }
 return s}
function hmarks(list,R,X){const{c,An,unit,p}=X;let s='';const ey=An.eye,nz=An.nose;
 for(const m of list){const k=typeof m=='string'?m:m.k,col=(m&&m.c)||c.k||adj(c.d,-36);
  if(k=='eyepatch')s+=`<ellipse cx="${f(ey[0]-1)}" cy="${f(ey[1]+2*unit)}" rx="${f(5*unit*(m.w||1))}" ry="${f(7*unit*(m.h||1))}" transform="rotate(${m.rot||-20} ${f(ey[0])} ${f(ey[1])})" fill="${col}"/>`;
  else if(k=='mask')s+=`<path d="M${f(ey[0]-7*unit)} ${f(ey[1]-5*unit)}Q${f(ey[0]+4*unit)} ${f(ey[1]-7*unit)} ${f(nz[0]-6*unit)} ${f(nz[1]-2*unit)}Q${f(nz[0]-4*unit)} ${f(nz[1]+8*unit)} ${f(ey[0]-1*unit)} ${f(ey[1]+7*unit)}Q${f(ey[0]-8*unit)} ${f(ey[1]+3*unit)} ${f(ey[0]-7*unit)} ${f(ey[1]-5*unit)}Z" fill="${col}" opacity=".95"/>`;
  else if(k=='tears')s+=`<path d="${taper([[ey[0]+1,ey[1]+3*unit],[ey[0]+2*unit,ey[1]+10*unit],[nz[0]-6*unit,ey[1]+13*unit]],3*unit,1*unit,4)}" fill="${col}" opacity=".95"/>`;
  else if(k=='blaze')s+=`<path d="${taper([[ey[0]-8*unit,ey[1]-9*unit],[nz[0]-14*unit,nz[1]-6*unit],[nz[0]-2*unit,nz[1]-1*unit]],2.4*unit,(m.w||4)*unit,5)}" fill="${m.c||'#f4efe6'}" opacity=".95"/>`;
  else if(k=='cheek')s+=`<ellipse cx="${f(ey[0]+(m.dx||2)*unit)}" cy="${f(ey[1]+(m.dy||9)*unit)}" rx="${f((m.w||7)*unit)}" ry="${f((m.h||5)*unit)}" fill="${m.c||c.m}" opacity="${m.o||.9}"/>`;
  else if(k=='tiger'||k=='zebra'){const n=k=='zebra'?6:5;for(let i=0;i<n;i++){const x=ey[0]-16*unit+i*4.2*unit;s+=`<path d="${taper([[x,ey[1]-12*unit],[x+2,ey[1]-2*unit],[x-1,ey[1]+8*unit]],2.8*unit,.5,4)}" fill="${col}" opacity=".9"/>`}}
  else if(k=='muzzledark')s+=`<ellipse cx="${f(nz[0]-4*unit)}" cy="${f(nz[1]+3*unit)}" rx="${f(9*unit)}" ry="${f(7*unit)}" fill="${col}" opacity=".95"/>`;
 }
 return s}


/* ---------- νυχτερίδα: μπροστινή όψη με ανοιχτά φτερά ---------- */
function buildBat(spec,ctx){const {R,p}=ctx,c=spec.c,b=spec.bat||{},es=b.ear||1,sp=b.span||1,t=b.t||'plain';let defs='',o='';
 const cx=120,cy=96,mirror=(fn)=>fn(1)+fn(-1),X=(dx)=>cx+dx;
 defs+=lgr(p+'mb',0,0,1,0,[[0,adj(c.d,6),.92],[.5,mixc(c.b,c.d,.4),.9],[1,adj(c.b,-4),.95]])+lgr(p+'bb',0,0,0,1,[[0,adj(c.b,6)],[1,adj(c.d,4)]])+rgr(p+'ir',[[0,adj(c.e||'#3a2a1a',20)],[1,c.e||'#3a2a1a']]);
 const wing=(sg)=>{const sh=[X(sg*8),cy-6],wr=[X(sg*58*sp),cy-40],tips=[[X(sg*106*sp),cy-62],[X(sg*112*sp),cy-18],[X(sg*96*sp),cy+22],[X(sg*70*sp),cy+44]],hip=[X(sg*10),cy+26];
  const pts=[sh,wr].concat([tips[0]]);
  let d=`M${f(sh[0])} ${f(sh[1])}L${f(wr[0])} ${f(wr[1])}L${f(tips[0][0])} ${f(tips[0][1])}`;
  for(let i=1;i<tips.length;i++){const a=tips[i-1],bb=tips[i];d+=`Q${f((a[0]+bb[0])/2-sg*10)} ${f((a[1]+bb[1])/2+4)} ${f(bb[0])} ${f(bb[1])}`}
  d+=`Q${f((tips[3][0]+hip[0])/2)} ${f((tips[3][1]+hip[1])/2+8)} ${f(hip[0])} ${f(hip[1])}Z`;
  let fing='';tips.forEach(t_=>{fing+=`<path d="M${f(wr[0])} ${f(wr[1])}Q${f((wr[0]+t_[0])/2)} ${f((wr[1]+t_[1])/2-3)} ${f(t_[0])} ${f(t_[1])}" stroke="${adj(c.d,-16)}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`});
  fing+=`<path d="M${f(sh[0])} ${f(sh[1])}L${f(wr[0])} ${f(wr[1])}" stroke="${adj(c.d,-16)}" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="${f(wr[0])}" cy="${f(wr[1])}" r="2.6" fill="${adj(c.d,-8)}"/>`;
  let vein='';for(let i=0;i<14;i++){const a=R()*6.28,r=18+R()*60,vx=wr[0]+Math.cos(a)*r*.7*sg,vy=wr[1]+Math.abs(Math.sin(a))*r*.8;vein+=`M${f(vx)} ${f(vy)}l${f(sg*(R()*8-4))} ${f(6+R()*8)}`}
  return`<path d="${d}" fill="url(#${p}mb)" transform="${sg<0?'':''}"/><path d="${d}" fill="none" stroke="${adj(c.d,-20)}" stroke-width=".8" opacity=".7"/><path d="${vein}" stroke="${adj(c.d,-14)}" stroke-width=".5" opacity=".35" fill="none"/>${fing}<path d="M${f(tips[0][0])} ${f(tips[0][1])}l${f(sg*3)} ${f(-3)}M${f(tips[1][0])} ${f(tips[1][1])}l${f(sg*3)} ${f(-1)}" stroke="${adj(c.d,-20)}" stroke-width="1.6" stroke-linecap="round"/>`};
 o+=wing(-1)+wing(1);
 /* σώμα */
 o+=`<ellipse cx="${cx}" cy="${cy+4}" rx="14" ry="24" fill="url(#${p}bb)"/>`;
 let fu='';for(let i=0;i<90;i++){const a=R()*6.28,r=Math.sqrt(R()),x=cx+Math.cos(a)*r*13,y=cy+4+Math.sin(a)*r*22;fu+=`M${f(x)} ${f(y)}l${f((R()-.5)*2)} ${f(2.5+R()*2)}`}
 o+=`<path d="${fu}" stroke="${adj(c.l,10)}" stroke-width=".6" opacity=".4"/><ellipse cx="${cx}" cy="${cy+16}" rx="9" ry="12" fill="${c.l}" opacity=".28"/>`;
 /* πόδια + ουροπατάγιο */
 o+=`<path d="M${cx-12} ${cy+26}L${cx} ${cy+58}L${cx+12} ${cy+26}Q${cx} ${cy+34} ${cx-12} ${cy+26}Z" fill="url(#${p}mb)" stroke="${adj(c.d,-20)}" stroke-width=".6"/>`;
 /* κεφάλι */
 const hy=cy-26,hr=13;
 const earL=(sg)=>{const ew=9*es,eh=(t=='fox'?10:16)*es,bx=cx+sg*8,by=hy-8;return`<path d="M${bx-sg*2} ${by+4}Q${bx+sg*(ew*.5)} ${by-eh} ${bx+sg*(ew*.9)} ${by-eh*1.05}Q${bx+sg*(ew*1.2)} ${by-eh*.2} ${bx+sg*(ew*.6)} ${by+6}Z" fill="${adj(c.b,-2)}" stroke="${adj(c.d,-20)}" stroke-width=".6"/><path d="M${bx+sg*1} ${by+3}Q${bx+sg*(ew*.5)} ${by-eh*.7} ${bx+sg*(ew*.78)} ${by-eh*.9}Q${bx+sg*(ew*.9)} ${by-eh*.3} ${bx+sg*(ew*.5)} ${by+3}Z" fill="${c.i}" opacity=".75"/>`};
 o+=earL(-1)+earL(1);
 defs+=rgr(p+'hd',[[0,adj(c.b,14)],[1,adj(c.b,-8)]],.4,.35,.75);
 o+=`<ellipse cx="${cx}" cy="${hy}" rx="${hr}" ry="${hr*.95}" fill="url(#${p}hd)"/>`;
 let hf='';for(let i=0;i<50;i++){const a=R()*6.28,r=Math.sqrt(R()),x=cx+Math.cos(a)*r*hr,y=hy+Math.sin(a)*r*hr*.9;hf+=`M${f(x)} ${f(y)}l${f((R()-.5)*2)} ${f(2+R()*2)}`}
 o+=`<path d="${hf}" stroke="${adj(c.l,14)}" stroke-width=".5" opacity=".4"/>`;
 /* μουσούδα */
 o+=`<ellipse cx="${cx}" cy="${hy+(t=='fox'?7:5)}" rx="${t=='fox'?7:6}" ry="${t=='fox'?7:5}" fill="${c.m}" opacity=".95"/>`;
 if(t=='leaf'||t=='horse'){o+=t=='leaf'?`<path d="M${cx} ${hy-1}L${cx-4} ${hy+5}Q${cx} ${hy+9} ${cx+4} ${hy+5}Z" fill="${adj(c.m,-10)}" stroke="${adj(c.d,-20)}" stroke-width=".5"/>`:`<path d="M${cx-8} ${hy+3}Q${cx} ${hy-4} ${cx+8} ${hy+3}Q${cx+7} ${hy+11} ${cx} ${hy+11}Q${cx-7} ${hy+11} ${cx-8} ${hy+3}Z" fill="${adj(c.m,-8)}" stroke="${adj(c.d,-20)}" stroke-width=".5"/><path d="M${cx-3} ${hy-4}L${cx} ${hy-12}L${cx+3} ${hy-4}Z" fill="${adj(c.m,-8)}"/>`}
 else o+=`<ellipse cx="${cx}" cy="${hy+(t=='fox'?10:7)}" rx="3" ry="2" fill="${c.n||'#241812'}"/>`;
 o+=`<path d="M${cx-3.5} ${hy+(t=='fox'?14:10.5)}Q${cx} ${hy+(t=='fox'?16:12.5)} ${cx+3.5} ${hy+(t=='fox'?14:10.5)}" stroke="#1a0f0a" stroke-width=".8" fill="none" stroke-linecap="round"/>`;
 for(const sg of[-1,1]){const ex=cx+sg*6,ey=hy-3,r=2.4;o+=`<ellipse cx="${ex}" cy="${ey}" rx="${r*1.2}" ry="${r*1.1}" fill="#130c08"/><ellipse cx="${ex}" cy="${ey}" rx="${r*.9}" ry="${r*.85}" fill="url(#${p}ir)"/><circle cx="${ex}" cy="${ey}" r="${r*.45}" fill="#050302"/><circle cx="${ex-.7}" cy="${ey-.8}" r=".8" fill="#fff" opacity=".95"/>`}
 return{defs,body:o,k:1}}

G.__S={buildBat,PLANS,PRE,HEADS,genPlan,build,crc,flat,warper,merge};
})(__G);

(function(G){
'use strict';
const F=G.__F,L=G.__lib,S=G.__S,{f,hash,rng}=L;
const BUILD={sil:S.build,bat:S.buildBat};
function render(spec,id,sq){
 const seed=hash(String(id)+(spec.key||'')),R=rng(seed),p='n'+(seed%46656).toString(36)+'_';
 const sc=F.scene2(spec.sc||'savanna',R,p),o=(BUILD[spec.t||'sil'])(spec,{R,p,S:sc});
 if(sq){const k=sc.k,vg=sc.vg.replace('<rect ','<rect y="-30" ').replace('height="180"','height="240"');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -30 240 240" width="160" height="160"><defs>${sc.D}${o.defs}</defs><rect y="-31" width="240" height="32" fill="${k.s[0]}"/>${sc.B}<rect y="179" width="240" height="32" fill="${k.g[1]}"/>${o.body}${sc.F}${vg}</svg>`}
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" width="240" height="180"><defs>${sc.D}${o.defs}</defs>${sc.B}${o.body}${sc.F}${sc.vg}</svg>`}
G.Fauna={render,BUILD,scene:F.scene2};
})(__G);

/* Μετατροπή των παλιών προδιαγραφών ειδών (Species.presets) σε προδιαγραφές της νέας μηχανής ολόσωμων πορτρέτων */
(function(G){
'use strict';
const {adj,mixc}=G.__lib;
const AR={cat:{plan:'felid',nose:'cat',tail:'cat'},canid:{pre:'dog',nose:'dog',tail:'dog'},bear:{pre:'bear',nose:'dog',tail:'stub'},mustel:{pre:'mustel',nose:'dog',tail:'mink'},
 antel:{pre:'antel',nose:'wet',tail:'flick'},horse:{pre:'horse',nose:'hoof',tail:'horse'},goat:{pre:'goat',nose:'wet',tail:'flick'},cow:{pre:'cow',nose:'bull',tail:'cow'},deer:{pre:'deer',nose:'wet',tail:'flick'},
 camel:{pre:'camel',nose:'hoof',tail:'flick'},giraffe:{pre:'giraffe',nose:'hoof',tail:'cow'},pig:{pre:'pig',nose:'pig',tail:'short'},elephant:{pre:'elephant',nose:'dog',tail:'tuftdrop'},
 rhino:{pre:'rhino',nose:'hoof',tail:'cow'},hippo:{pre:'hippo',nose:'hoof',tail:'stub'},tapir:{pre:'tapir',nose:'hoof',tail:'stub'},cavy:{pre:'cavy',nose:'rod',tail:'none'},
 ape:{pre:'ape',nose:'dog',tail:'none'},monkey:{pre:'monkey',nose:'rod',tail:'mon'},baboon:{pre:'baboon',nose:'dog',tail:'flick'},lemur:{pre:'monkey',nose:'dog',tail:'ring'},
 rodent:{pre:'rodent',nose:'rod',tail:'rat'},round:{pre:'round',nose:'rod',tail:'short'},rabbit:{pre:'rabbit',nose:'rod',tail:'stub'},hog:{pre:'hog',nose:'dog',tail:'short'},tube:{pre:'tube',nose:'dog',tail:'dog'},
 roo:{plan:'roo',nose:'dog',tail:'kang'},koala:{plan:'koala',nose:'dog',tail:'none'},seal:{plan:'seal',nose:'dog',tail:'none'},bat:{t:'bat'},cet:{plan:'dolphin',nose:'rod',tail:'none'}};
/* ειδικές ρυθμίσεις ανά είδος */
const Q=(o)=>o;
const SPX={
 lion:{mane:{k:'lion',n:210,c1:'#7a4a1f',c2:'#a3682a',c3:'#4e2d12'},tail:'lion'},lioness:{tail:'lion'},
 cheetah:{w:{legS:1.5,dep:.8,hs:.9},tail:'long'},leopard:{tail:'long'},jaguar:{w:{dep:1.06},tail:'cat'},puma:{tail:'long',w:{legS:1.2}},snowleo:{tail:'long',w:{legS:.95}},
 lynx:{tail:'stub',ear:{k:'point',w:9,h:13},w:{legS:1.25}},serval:{w:{legS:1.7,hs:.85},ear:{k:'round',w:13,h:15}},caracal:{ear:{k:'point',w:8,h:16},w:{legS:1.4}},manul:{w:{legS:.78,dep:1.12},ear:{k:'round',w:8,h:8}},
 tabby:{w:{sx:.62,legS:.9,dep:.92,hs:1.15},tail:'catup',sz:.8},orangecat:{w:{sx:.62,legS:.9,dep:.92,hs:1.15},tail:'catup',sz:.8},
 fox:{q:{L:78,hw:46,hc:48,hb:25,hf:21,head:{ty:'dog',hl:36,ha:22}},tail:'fox',tt:1},jackal:{q:{L:84,hw:50,hc:52,hb:28,hf:23,head:{ty:'dog',hl:38,ha:22}},tail:'dog'},coyote:{q:{L:86,hw:52,hc:54}},
 dingo:{q:{L:88,hw:54,hc:56}},fennec:{q:{L:60,hw:32,hc:34,hb:17,hf:14,head:{ty:'dog',hl:28,ha:22}},ear:{k:'tall',w:12,h:30,x:.2},tail:'fox',tt:1},
 hyena:{q:{hw:66,hc:50,hb:30,hf:26,head:{ty:'dog',hl:42,ha:24},neck:{a:30,l:20,t0:36,t1:28}},ear:{k:'round',w:11,h:12},tail:'short',mane:{k:'stiff',c1:'#3a2f26',c2:'#6a5a48',n:16,l:7,w:3}},
 aardwolf:{q:{hw:56,hc:46},tail:'dog',mane:{k:'stiff',c1:'#2a2018',c2:'#cfc0a0',n:14,l:6,w:2.6}},raccoon:{q:{L:70,hw:36,hc:38,hb:16,hf:14,head:{ty:'mustel',hl:30,ha:18}},tail:'ring',ear:{k:'round',w:7,h:7}},
 coati:{q:{L:74,hw:34,hc:36,hb:17,hf:15,head:{ty:'snout',hl:34,ha:14}},tail:'ring'},rdog:{q:{L:84,hw:52,hc:52},tail:'dog',ear:{k:'round',w:16,h:15}},wilddog:{q:{L:86,hw:56,hc:56},tail:'dog',ear:{k:'round',w:15,h:15}},ethwolf:{q:{L:92,hw:62,hc:62,hb:36,hf:30,head:{ty:'dog',hl:48,ha:22}},tail:'dog'},
 polar:{q:{L:110,hw:66,hc:64,neck:{a:12,l:30,t0:44,t1:30},head:{ty:'bear',hl:42,ha:12,h:{sd0:.4,sd1:.3}}}},panda:{q:{L:92,hw:64,hc:62,hb:24,hf:22,head:{ty:'bear',hl:38,ha:18}}},blackbear:{q:{L:96,hw:62,hc:60}},
 otter:{tail:'long'},badger:{q:{L:76,hw:34,hc:34,hb:13,hf:12,head:{ty:'mustel',hl:30,ha:12}},tail:'short',ear:{k:'round',w:5,h:5}},skunk:{tail:'fox',tt:1},wolverine:{q:{L:80,hw:38,hc:40,hb:17,hf:15},tail:'dog'},honeybadger:{q:{L:76,hw:32,hc:34},tail:'short'},stinkbadger:{q:{L:70,hw:30,hc:32},tail:'short'},
 meerkat:{tail:'long'},civet:{q:{L:84},tail:'long'},genet:{q:{L:86,hw:28},tail:'long'},palmcivet:{tail:'long'},fossa:{q:{L:92,hw:34,hc:36,hb:15,hf:13},tail:'long'},mongoose:{tail:'dog'},yellowmongoose:{tail:'dog'},
 horse:{mane:{k:'crest',n:24,fore:1},sz:1},zebra:{mane:{k:'stiff',n:22,c1:'#16110d',c2:'#f4f2ea'},tail:'cow'},donkey:{q:{L:94,hw:76,hc:76,hb:40,hf:34,head:{ty:'horse',hl:62,ha:56}},ear:{k:'tall',w:9,h:26},mane:{k:'stiff',n:20,l:5,w:3.2},tail:'cow',sz:.92},
 mule:{ear:{k:'tall',w:9,h:22},mane:{k:'stiff',n:20,l:5,w:3.2},tail:'horse'},onager:{ear:{k:'tall',w:9,h:20},mane:{k:'stiff',n:20,l:5,w:3.2},tail:'cow'},
 moose:{q:{L:98,hw:100,hc:88,hb:54,hf:48,neck:{a:36,l:34,t0:44,t1:26},head:{ty:'horse',hl:58,ha:50}},sz:1},reindeer:{q:{L:92,hw:74,hc:76,hb:38,hf:34}},fallow:{},roe:{q:{L:76,hw:62,hc:66,hb:32,hf:28},sz:.85},pudu:{q:{L:60,hw:40,hc:42,hb:20,hf:18},sz:.6},
 elephant:{tusk:{k:'down',s:1.5}},boar:{tusk:{k:'up',s:1}},babirusa:{tusk:{k:'up',s:1.6}},warthog:{tusk:{k:'up',s:1.5},q:{hw:60,hc:56,hb:26,hf:24},mane:{k:'stiff',c1:'#3a3028',c2:'#6a5a48',n:18,l:9,w:3}},pig:{},peccary:{q:{L:84,hw:50,hc:50}},riverhog:{},
 walrus:{tusk:{k:'down',s:1.3},ear:{k:'none'},sz:1},sealion:{ear:{k:'point',w:4,h:5}},furseal:{ear:{k:'point',w:4,h:6}},manatee:{plan:'whale',sc:'water',w:{hs:.9}},dugong:{plan:'whale',sc:'water'},elseal:{},
 dolphin:{},rissos:{},porpoise:{sz:.82},beaked:{},pilot:{},orca:{marks:[{k:'orca'}]},beluga:{},narwhal:{tusk:{k:'narwhal',s:1.1}},sperm:{plan:'whale'},humpback:{plan:'whale'},greywhale:{plan:'whale'},bluewhale:{plan:'whale'},
 gorilla:{},chimp:{q:{hw:76,hc:60}},orang:{q:{hw:80,hc:60}},rhino:{horn:{k:'cone',s:1.5,x:.88,y:-.42,rot:-4}},
 squirrel:{tail:'squirrel',q:{L:54,hw:34,hc:42,hb:16,hf:15}},rabbit:{q:{L:50,hw:36,hc:47,hb:18,hf:17,lh:{x:.22,st:'short',w0:18,w1:6}}},hare:{q:{L:56,hw:40,hc:52,hb:18,hf:18,lh:{x:.22,st:'short',w0:18,w1:6}}},chipmunk:{tail:'squirrel',sz:.7},beaver:{tail:'beaver'},hamster:{tail:'short',sz:.7},vole:{tail:'short',sz:.7},mouse:{sz:.7},gerbil:{sz:.7},jerboa:{sz:.7},
 hedgehog:{quills:{n:200,l:11,depth:18},q:{L:46,hw:36,hc:34,hb:14,hf:13}},porcupine:{quills:{n:140,l:22,c2:'#efe6d0',depth:20}},newporc:{quills:{n:140,l:20,depth:20}},tenrec:{quills:{n:90,l:8,depth:14}},
 armadillo:{m:[{k:'bands',n:9,w:2,c:'#3a2c20'}]},pangolin:{m:[{k:'scales',w:6,c:'#5a4a38'}]},
 sloth:{q:{lf:{j:null}},sz:.85},platypus:{tail:'beaver'},wombat:{},devil:{},echidna:{quills:{n:100,l:12}},anteater:{tail:'fox'},aardvark:{tail:'dog'},
 llama:{q:{hum:null,hw:84,hc:82,hb:42,hf:38,L:80,neck:{a:56,l:40,t0:24,t1:14}},tail:'cow'},alpaca:{q:{hum:null,hw:72,hc:70,hb:36,hf:32,L:70,neck:{a:56,l:30,t0:24,t1:14}},tail:'cow'},guanaco:{q:{hum:null,hw:84,hc:82,hb:42,hf:38,L:82}},vicuna:{q:{hum:null,hw:76,hc:74,hb:38,hf:34,L:74},sz:.9},
 kangaroo:{},wallaby:{sz:.8},treeroo:{sz:.75}
};
/* ονομασίες/σημάδια */
function mapMarks(list,arch){const o=[];
 for(const m of list||[]){const k=m.k,c=m.c;
  if(k=='tiger'||k=='zebra')o.push({k,c,n:m.n});
  else if(k=='rosette')o.push({k:'rosette',c,n:m.n?Math.min(m.n,46):40,r:[2.4,3.6],core:1});
  else if(k=='spots'||k=='dots'||k=='wspots'){const r=m.r||[2,3.5],big=r[1]>=8;
   if(arch=='giraffe'||arch=='okapi')o.push({k:'giraffe',c,cell:12});
   else if(big)o.push({k:'patches',c,n:Math.max(4,Math.min(10,m.n||6))});
   else o.push({k:'spots',c,n:Math.min(90,(m.n||30)+14),r:[Math.max(1.3,r[0]*.45),Math.max(2.2,Math.min(4,r[1]*.5))]})}
  else if(k=='gstripe')o.push({k:'sstripe',c,w:Math.max(2.4,(m.w||2.4)*1.4)});
  else if(k=='eyepatch')o.push({k:'eyepatch',c,w:Math.min(1.4,(m.w||9)/8),h:Math.min(1.4,(m.h||12)/9),rot:m.rot==null?-20:m.rot});
  else if(k=='mask')o.push({k:'mask',c});
  else if(k=='cheek'||k=='fpatch')o.push({k:'cheek',c:c||'#f4efe6',w:7,h:5,dy:8,o:.95});
  else if(k=='blaze')o.push({k:'blaze',c:c||'#f4efe6',w:Math.min(6,(m.w1||7)*.7)});
  else if(k=='ringeye')o.push({k:'eyepatch',c,w:.75,h:.75,rot:0});
  else if(k=='band')o.push({k:'band',c,x0:.55,x1:.75});
  else if(k=='scales')o.push({k:'scales',c,w:6});
  else if(k=='okapi')o.push({k:'legbars',c:'#1a1410'});}
 return o}
/* μετατροπή */
function conv(key,p){
 if(!p)return null;
 const arch=p.a||'canid',A=AR[arch]||AR.canid,X=SPX[key]||{},C=p.c||[];
 const c={b:C[0]||'#8a7a6a',l:C[1]||adj(C[0]||'#8a7a6a',16),d:C[2]||adj(C[0]||'#8a7a6a',-20),m:C[3]||C[1],n:C[4]||'#241812',i:C[5]||'#e0b0a4',e:p.ir||(p.o&&p.o.eye&&p.o.eye.ir)||'#7a5a2a',k:C[7]&&C[7]!='#000000'?C[7]:adj(C[2]||C[0]||'#444',-36),hc:p.hc,an:p.an,mn:C[8],hk:p.hc?adj(p.hc,-30):undefined};
 if(X.tt)c.tt=c.l;
 if(c.k==='#000000'||!c.k)c.k=adj(c.d,-36);
 const s={sc:p.s||'savanna',c,m:mapMarks(p.m,key),sz:Math.max(.62,Math.min(1.04,X.sz||p.sc||1))};
 if(A.t=='bat'){s.t='bat';const b=p.o&&p.o.bat||{};s.bat={t:b.t||'plain',ear:b.ear||1,span:.9};c.e='#2a1a10';return s}
 s.t='sil';
 if(X.plan||A.plan)s.plan=X.plan||A.plan;if(A.pre)s.pre=A.pre;
 if(p.o&&p.o.cet){const t=p.o.cet.t;if(/sperm|humpback|grey|blue/.test(t))s.plan='whale';c.e='#14100e';s.wh=0;s.ear={k:'none'}}
 if(s.plan=='seal'||s.plan=='whale'||s.plan=='dolphin'){s.ear=X.ear||(/^(seal|graysea|hooded|elseal|walrus|manatee|dugong)$/.test(key)?{k:'none'}:s.ear||{k:'none'});s.tail='none';s.wh=/dolphin|whale/.test(s.plan)?0:undefined}
 s.nose=(p.o&&p.o.nose&&p.o.nose.k&&/^(cat|dog|wet|hoof|pig|bull|rod)$/.test(p.o.nose.k))?p.o.nose.k:A.nose;
 if(s.plan=='dolphin'||s.plan=='whale'||s.plan=='seal')c.pn=adj(c.d,-8);
 if(s.plan=='dolphin'||s.plan=='whale')s.nose='rod';
 s.tail=X.tail||A.tail;
 if(X.q)s.q=X.q;if(X.w)s.w=X.w;if(X.mane)s.mane=Object.assign({},X.mane);if(X.tusk)s.tusk=X.tusk;if(X.quills)s.quills=X.quills;if(X.horn)s.horn=X.horn;
 if(X.marks)s.m=s.m.concat(X.marks);if(X.m)s.m=s.m.concat(X.m.map(m=>Object.assign({},m)));
 /* μαλλιά χαίτης/μέτωπο σε οπληφόρα με χαίτη (π.χ. βίσωνας) */
 const ex=p.extra||[];
 if(!s.mane&&ex.some(e=>e&&(e.k=='sidemane'||e.k=='forelock'))&&/horse|cow|goat|camel|deer|antel/.test(arch)){s.mane={k:'crest',n:20,l:arch=='cow'?14:20,c1:(p.mc&&p.mc[0])||c.d,c2:(p.mc&&p.mc[1])||c.d,c3:(p.mc&&p.mc[2])||c.d,fore:1}}
 else if(s.mane&&s.mane.k=='crest'){s.mane.c1=(p.mc&&p.mc[0])||'#2a1a12';s.mane.c2=(p.mc&&p.mc[1])||'#3a2418';s.mane.c3=(p.mc&&p.mc[2])||s.mane.c1}
 if(!s.mane&&ex.some(e=>e&&e.k=='ruffle'))s.mane={k:'ruff',n:60,l:12,c1:c.b,c2:c.d};
 for(const e of ex){if(!e||typeof e!='object')continue;
  if(e.k=='tusks'&&!s.tusk)s.tusk={k:/boar|pig|hog|babirusa/.test(arch)?'up':'down',s:Math.min(1.6,(e.s||1)*.8)};
  if(e.k=='quills'&&!s.quills)s.quills={n:Math.min(220,e.n||150),l:Math.max(8,(e.l||16)*.6),c2:e.c2};
  if(e.k=='beard'&&/goat|cow/.test(arch))s.beard=8}
 if(arch=='goat'&&/goat|bezoar|ibex|markhor|barbary/.test(key))s.beard=8;
 if(s.tail=='ring'||/lemur/.test(arch)||key=='ringtail'||key=='raccoon'||key=='coati')s.m.push({k:'rings',c:'#2a2018',n:8});
 /* κέρατα και κέρατα ελαφιού */
 const o=p.o||{};
 if(!s.horn&&o.horn&&o.horn.k){const hk=o.horn.k;s.horn={k:hk,s:(o.horn.s||.8)*.9,x:/cow|bison|buffalo|yak|wilde|musk|takin|spike|ossicone/.test(hk)?.36:.3,y:-.46,rot:(o.horn.rot||0)*1.1}}
 if(o.antler&&o.antler.t){s.antler={t:o.antler.t,s:(o.antler.s||.8)*1.05,x:.22,y:-.5,rot:-12}}
 /* αυτιά */
 if(o.ear&&o.ear.k&&!s.ear)s.ear={k:o.ear.k};
 if(o.ear&&o.ear.w&&!s.ear&&/cat|canid|antel|deer|goat|cow/.test(arch)){}
 s.fur=/ape|round|hog|tube|rodent|cavy|mustel|bear|monkey|baboon/.test(arch)?420:(/seal|cet/.test(arch)?120:300);
 if(/cet/.test(arch))s.fur=40;
 return s}
G.FaunaMap={conv,SPX,AR};
})(__G);


const Species=__G.Species,Portrait=__G.Portrait;
const __CSS=":host{--ink:#2a2a22;--muted:#756f60;--paper:#f3eee2;--panel:#fffdf8;--line:#e2dac7;--accent:#2f5d50;--accent-soft:#e3eee9;--warm:#b8703d;--warm-soft:#f8ebdc;--chip:#f1ecdf;--shadow:0 10px 30px rgba(60,48,25,.09);--bk:rgba(20,28,22,.66)}\n:host(.dark){--ink:#ece8dc;--muted:#a9a38f;--paper:#161b18;--panel:#1f2622;--line:#34403a;--accent:#7cc4ad;--accent-soft:#25382f;--warm:#e0a070;--warm-soft:#3a2d22;--chip:#2a332e;--shadow:0 10px 30px rgba(0,0,0,.35);--bk:rgba(0,0,0,.72)}\n*{box-sizing:border-box}:host{all:initial;display:block;color:var(--ink);font:15px/1.55 system-ui,-apple-system,\"Segoe UI\",Roboto,Arial,sans-serif}\n:host(.dark){color:var(--ink)}\n.app{container-type:inline-size;background:var(--paper);border-radius:16px;padding:1px 0}\nbutton,input,select{font:inherit;color:inherit}button{cursor:pointer}\n.top{background:linear-gradient(120deg,#1d3a33,#2f5d50 60%,#5d6b3a);color:#fff;padding:22px max(20px,calc((100vw - 1400px)/2));display:flex;align-items:center;justify-content:space-between;gap:20px}\n.embed .top{display:none}\n.brand{display:flex;align-items:center;gap:14px}.brand svg{width:52px;height:52px;flex:none}.brand h1{margin:0;font-size:clamp(21px,3vw,29px);letter-spacing:-.03em}.brand p{margin:2px 0 0;color:#cfe0d8;font-size:13px}\n.top-meta{font-size:12px;color:#cfe0d8;text-align:right}.top-meta b{display:block;color:#fff;font-size:16px}\n.layout{max-width:1400px;margin:24px auto;padding:0 20px;display:grid;grid-template-columns:250px minmax(0,1fr);gap:22px;align-items:start}\n.side{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:16px;box-shadow:var(--shadow);position:sticky;top:14px;max-height:calc(100vh - 28px);display:flex;flex-direction:column}\n.side h2{font-size:12px;letter-spacing:.08em;margin:0 0 10px;color:var(--muted)}\n.cats{overflow:auto;display:flex;flex-direction:column;gap:3px}\n.cat{display:flex;align-items:center;gap:9px;width:100%;border:0;background:transparent;border-radius:10px;padding:5px 8px;color:var(--ink);font-size:13px;text-align:left}.cat:hover{background:var(--chip)}.cat.on{background:var(--accent-soft);color:var(--accent);font-weight:700}.cat img{width:30px;height:30px;border-radius:50%;object-fit:cover;flex:none;background:var(--chip)}.cat span{flex:1}.cat i{font-style:normal;font-size:11px;color:var(--muted);background:var(--chip);border-radius:99px;padding:1px 7px}\n.daily{display:flex;gap:18px;align-items:center;background:linear-gradient(115deg,var(--panel),var(--accent-soft));border:1px solid var(--line);border-radius:18px;padding:14px 18px;margin-bottom:14px;box-shadow:var(--shadow)}\n.daily .dimg{width:160px;height:160px;border-radius:18px;flex:none;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,.18);cursor:pointer;transition:transform .25s}.daily .dimg:hover{transform:rotate(-1.5deg) scale(1.03)}.daily .dimg img{width:100%;height:100%;object-fit:cover;display:block}\n.daily small{color:var(--accent);font-weight:800;letter-spacing:.08em;font-size:11px}.daily h2{margin:2px 0 6px;font-size:24px;letter-spacing:-.02em}.daily p{margin:0 0 10px;color:var(--muted);font-size:14px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}\n.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}.stat{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:11px 14px}.stat b{font-size:22px;letter-spacing:-.03em;display:block;line-height:1.2}.stat span{font-size:11px;color:var(--muted)}\n.tools{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:12px;box-shadow:var(--shadow);margin-bottom:14px}\n.row{display:grid;grid-template-columns:minmax(0,1fr) 170px;gap:9px}.search,.sort{height:42px;border:1px solid var(--line);border-radius:11px;background:var(--paper);padding:0 13px;outline:none;width:100%}.search:focus,.sort:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(47,93,80,.15)}\n.acts{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:10px}.btn{border:1px solid var(--line);background:var(--paper);border-radius:99px;padding:6px 13px;font-size:12px;text-decoration:none;display:inline-block}.btn:hover{background:var(--accent-soft)}.btn.on{background:var(--accent);color:#fff;border-color:var(--accent)}.btn[disabled]{opacity:.5}.btn.pri{background:var(--accent);color:#fff;border-color:var(--accent)}.count{margin-left:auto;font-size:12px;color:var(--muted)}\n.seg{display:inline-flex;border:1px solid var(--line);border-radius:99px;overflow:hidden}.seg button{border:0;background:var(--paper);padding:6px 11px;font-size:12px}.seg button.on{background:var(--accent);color:#fff}\n.facets{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;align-items:center}.facets small{color:var(--muted);font-size:11px;margin-right:2px}.fc{border:1px solid var(--line);background:var(--paper);border-radius:99px;padding:3px 10px;font-size:12px}.fc.on{background:var(--warm);border-color:var(--warm);color:#fff}\n.cloud{display:flex;flex-wrap:wrap;gap:6px 8px;margin-top:11px;align-items:baseline}.cloud button{border:0;background:var(--warm-soft);color:var(--warm);border-radius:8px;padding:2px 9px}.cloud button:hover{filter:brightness(.95)}.cloud small{color:var(--muted);font-size:11px}\n.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(236px,1fr));gap:14px}\n.card{background:var(--panel);border:1px solid var(--line);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 2px 10px rgba(60,48,25,.05);transition:transform .16s,box-shadow .16s;animation:in .4s both;position:relative}.card:hover{transform:translateY(-3px);box-shadow:var(--shadow)}\n@keyframes in{from{opacity:0;transform:translateY(8px)}}\n.pt{position:relative;width:100%;aspect-ratio:1;overflow:hidden;display:block;cursor:pointer}\n.pt img{width:100%;height:100%;object-fit:cover;display:block;opacity:0;transform:scale(1.03);transition:opacity .45s,transform .6s}.pt.ok img{opacity:1;transform:none}.card:hover .pt img{transform:scale(1.045)}\n.pt::before{content:\"\";position:absolute;inset:0;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.55) 50%,transparent 70%);background-size:220% 100%;animation:sh 1.2s infinite}.pt.ok::before{display:none}\n@keyframes sh{from{background-position:120% 0}to{background-position:-120% 0}}\n.fav,.cmp{position:absolute;top:8px;z-index:2;border:0;background:rgba(255,253,248,.88);color:#8a8470;border-radius:50%;width:30px;height:30px;font-size:15px}.fav{right:8px}.cmp{left:8px;font-size:14px}.fav.on{color:#c2412f}.cmp.on{background:var(--accent);color:#fff}.new{position:absolute;top:42px;left:8px;z-index:2;background:var(--warm);color:#fff;font-size:10px;border-radius:99px;padding:2px 8px}\n.body{padding:12px 15px 15px;display:flex;flex-direction:column;flex:1}.meta{font-size:11px;color:var(--muted);margin-bottom:4px}.card h3{margin:0 0 6px;font-size:17px;line-height:1.3;letter-spacing:-.015em}.sn{color:var(--muted);font-size:13px;margin:0 0 10px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}\n.kw{display:flex;gap:5px;flex-wrap:wrap;margin-top:auto}.kw button,.tag{border:0;font-size:10.5px;border-radius:7px;padding:3px 8px;background:var(--warm-soft);color:var(--warm)}.tag{background:var(--accent-soft);color:var(--accent)}\n.open{align-self:flex-start;margin-top:11px;border:0;background:transparent;padding:0;color:var(--accent);font-weight:700;font-size:12px}.open:hover{text-decoration:underline}\n.cards.wall{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px}.wall .card{border-radius:14px;border:0}.wall .pt{aspect-ratio:1;background:none!important}.wall .pt img{width:100%;height:100%;border-radius:14px;box-shadow:none}.wall .body{position:absolute;inset:auto 0 0 0;padding:22px 10px 8px;background:linear-gradient(transparent,rgba(0,0,0,.72));opacity:0;transition:.2s;pointer-events:none}.wall .card:hover .body{opacity:1}.wall .body *{color:#fff!important}.wall .meta,.wall .sn,.wall .kw,.wall .open{display:none}.wall .card h3{margin:0;font-size:14px}.wall .pt::before{width:100%;height:100%}\n.empty{grid-column:1/-1;background:var(--panel);border:1px dashed var(--line);border-radius:16px;padding:44px 20px;text-align:center;color:var(--muted)}\n#sent{height:1px}.note{margin:18px 2px 30px;color:var(--muted);font-size:11px}\n.cmpbar{position:fixed;left:50%;bottom:18px;transform:translate(-50%,120px);background:var(--accent);color:#fff;border-radius:99px;padding:8px 10px 8px 18px;display:flex;gap:10px;align-items:center;z-index:30;box-shadow:0 10px 30px rgba(0,0,0,.3);transition:.3s;font-size:13px}.cmpbar.on{transform:translate(-50%,0)}.cmpbar button{border:0;border-radius:99px;padding:6px 14px;background:#fff;color:#1d3a33;font-weight:700}.cmpbar button.g{background:transparent;color:#fff}\n/* modal */\n.bk{position:fixed;inset:0;background:var(--bk);z-index:50;display:none;align-items:center;justify-content:center;padding:18px;backdrop-filter:blur(3px)}.bk.show{display:flex}\n.modal{position:relative;width:min(1000px,100%);max-height:94vh;background:var(--panel);border-radius:20px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 24px 80px rgba(0,0,0,.35);color:var(--ink)}\n.mh{padding:18px 64px 16px 20px;border-bottom:1px solid var(--line);display:grid;grid-template-columns:200px minmax(0,1fr);column-gap:18px;align-items:start;background:linear-gradient(120deg,var(--panel),var(--accent-soft))}.mh .hero{grid-row:1/3}.mh .mt{grid-column:2}.mh .mx{grid-column:2;min-width:0}.mh .acts{margin:0}.mbody{padding:20px 24px 8px}\n.hero{position:relative;width:200px;height:200px;flex:none;border-radius:20px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.25);perspective:600px;background:var(--chip)}.hero svg,.hero img{width:100%;height:100%;display:block;object-fit:cover;transition:transform .15s ease-out}\n.hero .lid{transform-box:fill-box;transform-origin:50% 0;animation:blink 5.5s infinite}@keyframes blink{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(3.4)}}\n.mh h2{margin:0;font-size:26px;line-height:1.2;letter-spacing:-.02em}.mh .aka{font-size:13px;color:var(--muted);margin:3px 0 8px;font-style:italic}.mh .tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}\n.facts{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}.fact{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:3px 10px;font-size:12px}.fact b{color:var(--accent)}\n.x{position:absolute;top:12px;right:12px;z-index:5;border:0;border-radius:10px;background:var(--chip);width:38px;height:38px;font-size:22px;flex:none}\n.mc{padding:0;overflow:auto;flex:1;min-height:0;overscroll-behavior:contain}\n.toc{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 14px}.toc button{border:1px solid var(--line);background:var(--paper);border-radius:99px;padding:2px 10px;font-size:12px}\n.art{font-size:16px;line-height:1.75;overflow-wrap:anywhere;max-width:78ch;margin:0 auto}.art::after{content:\"\";display:block;clear:both}\n.art p{margin:0 0 .85em}.art p.lead{font-size:17.5px;line-height:1.7}.art .lead::first-letter{font-size:2.4em;font-weight:800;float:left;line-height:.9;margin:.06em .1em 0 0;color:var(--accent)}\n.art h4{margin:1.3em 0 .5em;font-size:17px;color:var(--accent);display:flex;align-items:center;gap:8px;scroll-margin-top:8px}.art h4::before{content:\"\";width:5px;height:1em;background:var(--warm);border-radius:3px}\n.art ul{margin:.2em 0 1em;padding:0;list-style:none;display:grid;gap:6px}.art li{background:var(--paper);border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:10px;padding:8px 12px;font-size:15px;line-height:1.6}\n.art a{color:var(--accent)}.art a.sp{font-weight:700;text-decoration:none;border-bottom:1px dashed var(--accent);cursor:pointer}\n.art figure{margin:0;position:relative}.art figure img{display:block;width:100%;height:100%;object-fit:cover;border-radius:12px;cursor:zoom-in;background:var(--chip)}\n.art figure.hf{float:right;width:min(44%,330px);aspect-ratio:4/3;margin:.2em 0 1em 22px;box-shadow:0 8px 24px rgba(0,0,0,.18);border-radius:12px}\n.art figure.wide{margin:1.1em auto;max-width:560px;aspect-ratio:16/10;box-shadow:0 8px 24px rgba(0,0,0,.14);border-radius:12px;clear:both}\n.art .gal{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin:1.1em 0;clear:both}.art .gal figure{aspect-ratio:1}\n.art figure .zm{position:absolute;right:8px;bottom:8px;background:rgba(0,0,0,.55);color:#fff;border-radius:99px;font-size:11px;padding:2px 8px;pointer-events:none}\n.sim{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:9px;margin:10px 0 18px}.sim button{border:1px solid var(--line);background:var(--paper);border-radius:12px;padding:8px;text-align:center;font-size:12px}.sim button:hover{background:var(--accent-soft)}.sim img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:10px;display:block;margin:0 auto 4px}.sim small{display:block;color:var(--muted)}\n.mf{display:flex;align-items:center;gap:8px;padding:10px 16px;border-top:1px solid var(--line);background:var(--panel)}.mf .mid{flex:1;text-align:center;font-size:12px;color:var(--muted)}\n.mc h3.sh{margin:18px 0 0;font-size:15px}\n/* lightbox */\n.lb{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:80;display:none;flex-direction:column;align-items:center;justify-content:center;padding:16px}.lb.show{display:flex}.lb img{max-width:96vw;max-height:80vh;border-radius:8px;object-fit:contain}.lb .lbb{position:absolute;top:50%;transform:translateY(-50%);border:0;background:rgba(255,255,255,.14);color:#fff;font-size:28px;width:46px;height:46px;border-radius:50%}.lb .lbb.p{left:14px}.lb .lbb.n{right:14px}.lb .lbx{position:absolute;top:14px;right:14px;border:0;background:rgba(255,255,255,.18);color:#fff;font-size:22px;width:42px;height:42px;border-radius:50%}.lb .cap{color:#ddd;font-size:13px;margin-top:10px}\n/* panel (quiz/compare) */\n.pn{width:min(860px,100%);max-height:94vh;overflow:auto;background:var(--panel);border-radius:20px;padding:20px 22px;box-shadow:0 24px 80px rgba(0,0,0,.35);color:var(--ink)}.pn h2{margin:0 0 4px;font-size:22px}.pn .sub{color:var(--muted);font-size:13px;margin-bottom:14px}\n.qz{display:grid;grid-template-columns:240px 1fr;gap:20px;align-items:center}.qz .qa{width:240px;height:240px;border-radius:22px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.28)}.qz .qa svg,.qz .qa img{width:100%;height:100%;display:block;object-fit:cover}.qo{display:grid;grid-template-columns:1fr 1fr;gap:9px}.qo button{border:1px solid var(--line);background:var(--paper);border-radius:12px;padding:12px;font-size:14px;text-align:left}.qo button:hover:not([disabled]){background:var(--accent-soft)}.qo button.ok{background:#2f7d4a;color:#fff;border-color:#2f7d4a}.qo button.no{background:#b0413a;color:#fff;border-color:#b0413a}\n.qbar{display:flex;gap:8px;align-items:center;margin-bottom:12px;font-size:13px}.qbar .pg{flex:1;height:8px;background:var(--chip);border-radius:9px;overflow:hidden}.qbar .pg i{display:block;height:100%;background:var(--accent);transition:width .3s}\n.cmpg{display:grid;grid-template-columns:repeat(var(--n,2),1fr);gap:12px}.cc{border:1px solid var(--line);border-radius:14px;padding:12px;text-align:center;background:var(--paper)}.cc img{width:160px;height:160px;border-radius:16px;max-width:100%}.cc h3{margin:8px 0 6px;font-size:16px}.cc dl{margin:0;text-align:left;font-size:12.5px}.cc dt{color:var(--muted);font-size:11px;margin-top:6px}.cc dd{margin:0}\n.simrow{margin:12px 0 0;font-size:13px}.simrow b{color:var(--accent)}\n.toast{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);background:#1d3a33;color:#fff;border-radius:99px;padding:9px 18px;font-size:13px;z-index:90;opacity:0;pointer-events:none;transition:.3s}.toast.on{opacity:1}\n@media(max-width:900px){.layout{grid-template-columns:minmax(0,1fr)}.side{position:static;max-height:none}.cats{flex-direction:row;overflow-x:auto;padding-bottom:4px}.cat{width:auto;white-space:nowrap}.stats{grid-template-columns:repeat(2,1fr)}.top-meta{display:none}}\n@media(max-width:700px){.layout{padding:0 12px}.row{grid-template-columns:1fr}.cards{grid-template-columns:1fr 1fr;gap:10px}.pt{aspect-ratio:1}.card h3{font-size:15px}.daily{flex-direction:column;text-align:center}.bk{padding:0}.modal{width:100%;height:100vh;height:100dvh;max-height:none;border-radius:0}.mh{grid-template-columns:112px minmax(0,1fr);column-gap:12px;padding:14px 56px 12px 14px;align-items:center}.mh .hero{grid-row:1;width:112px;height:112px;border-radius:14px}.mh .mt{grid-column:2}.mh .mx{grid-column:1/-1;margin-top:10px}.mh h2{font-size:21px}.mh .aka{margin:2px 0 0;font-size:12.5px}.mh .tags{margin-bottom:6px}.facts{margin-bottom:8px}.mh .mx{display:flex;flex-wrap:wrap;gap:6px}.mh .mx .tags,.mh .mx .facts{margin:0}.mh .acts{gap:6px;flex:1 1 100%}.mh .btn{padding:5px 11px;font-size:12.5px}.x{top:10px;right:10px}.mf{padding:8px 12px}.mf .btn{padding:6px 12px;font-size:13px}.art figure.hf{float:none;width:100%;margin:0 0 1em}.qz{grid-template-columns:1fr;justify-items:center}.qo{grid-template-columns:1fr}.cmpg{grid-template-columns:1fr}.mbody{padding:14px 16px 8px}}\n@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}\n\npicture{display:contents}.hsw{position:absolute;right:8px;bottom:8px;width:32px;height:32px;border-radius:50%;border:0;background:rgba(0,0,0,.55);color:#fff;font-size:15px;line-height:1;cursor:pointer;backdrop-filter:blur(4px)}.hsw:hover{background:rgba(0,0,0,.75)}.sim img{aspect-ratio:1;object-fit:cover}\n",__HTML="<div class=\"app\" id=\"app\"><header class=\"top\"><div class=\"brand\"><svg viewBox=\"0 0 48 48\" aria-hidden=\"true\"><rect width=\"48\" height=\"48\" rx=\"14\" fill=\"#ffffff22\"/><g fill=\"#fff\"><ellipse cx=\"24\" cy=\"31\" rx=\"9\" ry=\"7.5\"/><ellipse cx=\"11\" cy=\"23\" rx=\"4\" ry=\"5.3\"/><ellipse cx=\"19\" cy=\"14\" rx=\"4\" ry=\"5.3\"/><ellipse cx=\"29\" cy=\"14\" rx=\"4\" ry=\"5.3\"/><ellipse cx=\"37\" cy=\"23\" rx=\"4\" ry=\"5.3\"/></g></svg><div><h1>Θηλαστικά</h1><p>Blog Analyzer · TF-IDF · πορτρέτα ειδών</p></div></div><div class=\"top-meta\"><b id=\"tTot\"></b>Δεδομένα ιστολογίου · ζωντανός συγχρονισμός με το Blogger</div></header>\n<div class=\"layout\">\n<aside class=\"side\"><h2>ΚΑΤΗΓΟΡΙΕΣ</h2><div class=\"cats\" id=\"cats\"></div></aside>\n<main>\n<section class=\"daily\" id=\"daily\"></section>\n<section class=\"stats\"><div class=\"stat\"><b id=\"s1\"></b><span>Αναρτήσεις</span></div><div class=\"stat\"><b id=\"s2\"></b><span>Κατηγορίες</span></div><div class=\"stat\"><b id=\"s3\"></b><span>Όροι στο ευρετήριο TF-IDF</span></div><div class=\"stat\"><b id=\"s4\"></b><span>Τελευταία ενημέρωση</span></div></section>\n<section class=\"tools\">\n<div class=\"row\"><input class=\"search\" id=\"q\" type=\"search\" placeholder=\"Αναζήτηση με βάρος TF-IDF… (πάτα / )\" autocomplete=\"off\"><select class=\"sort\" id=\"sort\"><option value=\"rel\">Συνάφεια</option><option value=\"new\">Νεότερες πρώτα</option><option value=\"old\">Παλαιότερες πρώτα</option><option value=\"az\">Τίτλος Α–Ω</option><option value=\"za\">Τίτλος Ω–Α</option><option value=\"rnd\">Τυχαία σειρά</option></select></div>\n<div class=\"acts\"><button class=\"btn\" id=\"bFav\">♥ Αγαπημένα</button><button class=\"btn\" id=\"bRnd\">🎲 Τυχαίο είδος</button><button class=\"btn pri\" id=\"bQuiz\">🎯 Κουίζ πορτραίτων</button><button class=\"btn\" id=\"bSync\">⟳ Ανανέωση από Blogger</button><span class=\"seg\"><button id=\"vGrid\" class=\"on\" title=\"Κάρτες\">▦ Κάρτες</button><button id=\"vWall\" title=\"Τοίχος πορτραίτων\">▩ Τοίχος</button></span><button class=\"btn\" id=\"bDark\" title=\"Σκούρο θέμα\">🌙</button><span class=\"count\" id=\"cnt\" aria-live=\"polite\"></span></div>\n<div class=\"facets\" id=\"facets\"></div>\n\n</section>\n<section class=\"cards\" id=\"cards\"></section><div id=\"sent\"></div>\n<p class=\"note\">Τα πορτρέτα είναι σχέδια SVG 160×160 που παράγονται εξ ολοκλήρου από κώδικα: κεφάλι, γούνα, μάτια, κέρατα, χαίτη και σχέδια ανά είδος, με θολό φόντο του βιότοπου. Τα βάρη TF-IDF υπολογίζονται τοπικά από το κείμενο των αναρτήσεων· οι ήπειροι και η διατροφή εντοπίζονται αυτόματα από το κείμενο.</p>\n</main></div></div>\n<div class=\"cmpbar\" id=\"cmpbar\"><span id=\"cmpn\"></span><button id=\"cmpGo\">Σύγκριση</button><button class=\"g\" id=\"cmpClr\">✕</button></div>\n<div class=\"bk\" id=\"bk\" role=\"dialog\" aria-modal=\"true\"><article class=\"modal\"><button class=\"x\" id=\"mX\" aria-label=\"Κλείσιμο\">×</button><div class=\"mc\" id=\"mc\"><header class=\"mh\"><div class=\"hero\" id=\"mHero\"></div><div class=\"mt\"><h2 id=\"mT\"></h2><div class=\"aka\" id=\"mAka\"></div></div><div class=\"mx\"><div class=\"tags\" id=\"mK\"></div><div class=\"facts\" id=\"mFacts\"></div><div class=\"acts\"><a class=\"btn pri\" id=\"mL\" target=\"_blank\" rel=\"noopener\">Άνοιγμα στο ιστολόγιο ↗</a><button class=\"btn\" id=\"mCmp\">⇄ Σύγκριση</button><button class=\"btn\" id=\"mDl\" title=\"Λήψη του πορτραίτου\">⤓ Πορτραίτο</button></div></div></header><div class=\"mbody\"><div class=\"toc\" id=\"mToc\"></div><div class=\"art\" id=\"mA\"></div><h3 class=\"sh\">Παρόμοια είδη (συνημίτονο TF-IDF)</h3><div class=\"sim\" id=\"mSim\"></div></div></div><footer class=\"mf\"><button class=\"btn\" id=\"mPrev\">‹ Προηγούμενο</button><span class=\"mid\" id=\"mPos\"></span><button class=\"btn\" id=\"mNext\">Επόμενο ›</button></footer></article></div>\n<div class=\"bk\" id=\"bk2\" role=\"dialog\" aria-modal=\"true\"><div class=\"pn\" id=\"pn\"></div></div>\n<div class=\"lb\" id=\"lb\"><button class=\"lbx\" id=\"lbX\" aria-label=\"Κλείσιμο\">×</button><button class=\"lbb p\" id=\"lbP\">‹</button><img id=\"lbI\" alt=\"\"><button class=\"lbb n\" id=\"lbN\">›</button><div class=\"cap\" id=\"lbC\"></div></div>\n<div class=\"toast\" id=\"toast\"></div>\n";
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
const PK=p=>{if(p.spk&&Species.presets[p.spk]){const b=Species.presets[p.spk];return{key:p.spk,spec:p.spo?Object.assign({},b,p.spo):b}}return Species.pick(p)};
const A_=p=>{let a=AR.get(p.id);if(!a){const pk=PK(p),ns=__G.FaunaMap.conv(pk.key,pk.spec),svg=ns?__G.Fauna.render(ns,p.id,1):Portrait.render(pk.spec,p.id),sc=Portrait.SC[pk.spec.s]||Portrait.SC.savanna;a={svg,key:pk.key,bg:sc.s,uri:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)};AR.set(p.id,a)}return a};
const art=p=>A_(p).uri;
const BADF=/(^|[-_.\d])(map|range|distribution|skull|logo|icon|banner|chart|spacer|divider|blank|pixel)([-_.\d]|$)|\.gif$/i;
function photo(p){if(p._ph!==undefined)return p._ph;const c=[p.image];(p.content||'').replace(/<img[^>]+?src="([^"]+)"/g,(m,u)=>c.push(u));let u='';for(const x of c){if(x&&/^https?:\/\/[^\/]*(googleusercontent|ggpht|blogspot)\./.test(x)&&!BADF.test(x.split(/[?#]/)[0].split('/').pop())){u=x;break}}return p._ph=u}
const thr=(u,n,rw)=>u.replace(/\/(?:s\d+|w\d+-h\d+)(?:-c)?(?:-rw)?\//,'/s'+n+'-c'+(rw?'-rw':'')+'/').replace(/=(?:s\d+|w\d+-h\d+)[^?#&\/]*$/,'=s'+n+'-c'+(rw?'-rw':''));
/* φωτογραφία n×n (WebP μέσω -rw, lazy), με πτώση σε σχέδιο SVG αν λείπει/αποτύχει */
const ph=(p,n,na)=>{const u=photo(p),al=na?'':esc(p.title);if(!u)return `<img src="${art(p)}" alt="${na?'':'Πορτρέτο: '+al}" width="${n}" height="${n}" loading="lazy" decoding="async">`;
  return `<picture><source type="image/webp" srcset="${thr(u,n,1)} 1x, ${thr(u,n*2,1)} 2x"><img src="${thr(u,n)}" srcset="${thr(u,n)} 1x, ${thr(u,n*2)} 2x" alt="${al}" width="${n}" height="${n}" loading="lazy" decoding="async" data-ph="${esc(p.id)}"></picture>`};
R.addEventListener('error',ev=>{const t=ev.target;if(!t||t.tagName!='IMG'||!t.dataset||!t.dataset.ph)return;const p=byId(t.dataset.ph);if(!p)return;p._ph='';const pic=t.closest('picture')||t,n=document.createElement('img');n.src=art(p);n.alt=t.alt;n.width=n.height=+t.getAttribute('width')||160;n.decoding='async';pic.replaceWith(n);const pt=n.closest('.pt');if(pt)pt.classList.add('ok')},true);
/* ---------- φίλτρα / λίστα ---------- */
function filter(){const q=nw(qs.trim()),qk=q?[...new Set(words(qs).map(a=>a[0]))]:[];
  let r=posts.filter(p=>(!cat||p.categories.includes(cat))&&(!favOnly||FAV.has(p.id))&&(!fc.cont||p._f.cont.includes(fc.cont))&&(!fc.diet||p._f.diet.includes(fc.diet)));
  if(q){r=r.map(p=>({p,s:score(p,q,qk)+(p._h.includes(q)?.05:0)})).filter(o=>o.s>0).map(o=>(o.p._s=o.s,o.p))}
  const t=p=>Date.parse(p.published)||0;
  if(sortM=='rnd')return shuffle(r);
  r.sort((a,b)=>sortM=='az'?a.title.localeCompare(b.title,'el'):sortM=='za'?b.title.localeCompare(a.title,'el'):sortM=='old'?t(a)-t(b):sortM=='rel'&&q?b._s-a._s:t(b)-t(a));return r}
function card(p){const a=A_(p);return `<article class="card"><div class="pt" style="background:linear-gradient(180deg,${a.bg[0]},${a.bg[1]})" data-o="${esc(p.id)}">${p.fresh?'<span class="new">Νέο</span>':''}<button class="cmp ${CMP.has(p.id)?'on':''}" data-m="${esc(p.id)}" aria-label="Σύγκριση" title="Προσθήκη στη σύγκριση">⇄</button><button class="fav ${FAV.has(p.id)?'on':''}" data-f="${esc(p.id)}" aria-label="Αγαπημένο">♥</button>${ph(p,160)}</div><div class="body"><div class="meta">${p.categories.slice(0,2).map(esc).join(' · ')} · ${fd(p.published)}</div><h3>${esc(p.title)}</h3><p class="sn">${esc(p.snippet)}</p><div class="kw">${p._kw.slice(0,3).map(s=>`<button data-k="${esc(s)}">${esc(kw(s))}</button>`).join('')}</div><button class="open" data-o="${esc(p.id)}">Άνοιγμα →</button></div></article>`}
function more(){const c=$('cards'),b=list.slice(shown,shown+BATCH);if(!b.length)return;c.insertAdjacentHTML('beforeend',b.map(card).join(''));shown+=b.length;
  c.querySelectorAll('.pt:not(.ok) img').forEach(im=>{const ok=()=>im.parentNode.classList.add('ok');im.complete?requestAnimationFrame(ok):im.addEventListener('load',ok,{once:true})})}
function render(){list=filter();shown=0;$('cards').innerHTML=list.length?'':'<div class="empty"><b>Δεν βρέθηκαν είδη</b><br>Δοκίμασε άλλη λέξη, κατηγορία ή φίλτρο.</div>';more();
  $('cnt').textContent=`${list.length} από ${posts.length}`;}
function facetsUI(){const cc=CONT.map(c=>c[0]),dd=DIET.map(c=>c[0]);
  $('facets').innerHTML='<small>Ήπειρος / ενδιαίτημα:</small>'+cc.map(c=>`<button class="fc ${fc.cont==c?'on':''}" data-fc="cont:${c}">${c}</button>`).join('')+'<small style="margin-left:8px">Διατροφή:</small>'+dd.map(c=>`<button class="fc ${fc.diet==c?'on':''}" data-fc="diet:${c}">${c}</button>`).join('')}
function cats(){const cn={};posts.forEach(p=>p.categories.forEach(c=>cn[c]=(cn[c]||0)+1));const GRC='Ελληνικά είδη',names=Object.keys(cn).sort((a,b)=>a==GRC?-1:b==GRC?1:a.localeCompare(b,'el'));
  $('cats').innerHTML=[['Όλες',null,posts.length],...names.map(c=>[c,c,cn[c]])].map(([n,v,c])=>{const f=v&&posts.find(p=>p.categories.includes(v));return `<button class="cat ${cat===v?'on':''}" data-c="${v===null?'':esc(v)}">${f?`<img src="${art(f)}" alt="" width="30" height="30" loading="lazy" decoding="async">`:''}<span>${v===GRC?'🇬🇷 ':''}${esc(n)}</span><i>${c}</i></button>`}).join('');
  $('s2').textContent=names.length}
function stats(){$('tTot').textContent=posts.length+' αναρτήσεις';$('s1').textContent=posts.length;$('s3').textContent=DF.size.toLocaleString('el');$('s4').textContent=fd(posts.reduce((m,p)=>!p.atlas&&p.updated>m?p.updated:m,''))}
function daily(){const p=posts[Math.floor(Date.now()/864e5)%posts.length];if(!p)return;$('daily').innerHTML=`<div class="dimg" data-o="${esc(p.id)}">${ph(p,160)}</div><div><small>ΕΙΔΟΣ ΤΗΣ ΗΜΕΡΑΣ</small><h2>${esc(p.title)}</h2><p>${esc(p.snippet)}</p><button class="btn pri" data-o="${esc(p.id)}">Διάβασε περισσότερα →</button></div>`}
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
  const HSW=photo(p)?'<button class="hsw" type="button" title="Εναλλαγή φωτογραφίας / σχεδίου" aria-label="Εναλλαγή φωτογραφίας / σχεδίου">🎨</button>':'';$('mHero').classList.remove('draw');$('mHero').innerHTML=(photo(p)?ph(p,200):a.svg)+HSW;$('mT').textContent=p.title;$('mAka').textContent=B.aka;$('mAka').style.display=B.aka?'':'none';
  $('mK').innerHTML=p.categories.map(c=>`<button class="tag" data-c="${esc(c)}">${esc(c)}</button>`).join('');
  $('mFacts').innerHTML=f.cont.map(c=>`<span class="fact">🌍 ${esc(c)}</span>`).join('');
  $('mA').innerHTML=B.html||'<p style="color:var(--muted)">Η ανάρτηση δεν έχει κείμενο.</p>';
  $('mToc').innerHTML=B.hs.length>=3?B.hs.map(([i,t])=>`<button data-h="${i}">${esc(t)}</button>`).join(''):'';
  $('mA').querySelectorAll('img').forEach(im=>im.addEventListener('error',()=>{const f=im.closest('figure');if(f)f.remove()},{once:true}));
  const L=$('mL');L.href=p.url||BLOG+'/search?q='+encodeURIComponent(p.title);L.textContent=p.atlas?'Περισσότερα στη Wikipedia ↗':'Άνοιγμα στο ιστολόγιο ↗';$('mCmp').dataset.m=p.id;$('mCmp').classList.toggle('on',CMP.has(p.id));$('mDl').dataset.id=p.id;
  const s=posts.filter(o=>o!==p).map(o=>[o,sim(p,o)]).sort((a,b)=>b[1]-a[1]).slice(0,8);
  $('mSim').innerHTML=s.map(([o,v])=>`<button data-o="${esc(o.id)}">${ph(o,112,1)}${esc(o.title)}<small>${Math.round(v*100)}%</small></button>`).join('');
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
  let h=`<h2>Σύγκριση ειδών</h2><div class="sub">Στοιχεία που εντοπίστηκαν αυτόματα στο κείμενο κάθε ανάρτησης</div><div class="cmpg" style="--n:${ps.length}">`+ps.map(p=>{const f=p._f;return `<div class="cc">${ph(p,160,1)}<h3>${esc(p.title)}</h3><dl><dt>Κατηγορίες</dt><dd>${p.categories.map(esc).join(', ')||'—'}</dd><dt>Μήκος</dt><dd>${esc(f.len||'—')}</dd><dt>Βάρος</dt><dd>${esc(f.kg||'—')}</dd><dt>Περιοχή</dt><dd>${f.cont.join(', ')||'—'}</dd><dt>Διατροφή</dt><dd>${f.diet.join(', ')||'—'}</dd><dt>Βασικοί όροι</dt><dd>${p._kw.map(kw).map(esc).join(', ')}</dd></dl><button class="btn" data-o="${esc(p.id)}" style="margin-top:10px">Άνοιγμα →</button></div>`}).join('')+'</div>';
  for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++)h+=`<div class="simrow"><b>${Math.round(sim(ps[i],ps[j])*100)}%</b> ομοιότητα TF-IDF · ${esc(ps[i].title)} ↔ ${esc(ps[j].title)} · κοινοί όροι: ${shared(ps[i],ps[j]).map(esc).join(', ')||'—'}</div>`;
  h+='<div class="acts" style="margin-top:16px"><button class="btn" id="pnClose">Κλείσιμο</button></div>';showPn(h)}
function showPn(h){$('pn').innerHTML=h;$('bk2').classList.add('show');document.body.style.overflow='hidden'}
function closePn(){$('bk2').classList.remove('show');if(!$('bk').classList.contains('show'))document.body.style.overflow=''}
/* ---------- κουίζ ---------- */
function quiz(){const T=10;let r=0,sc=0,st=0,bs=+ls.get('thil-best')||0,Q=[];
  const pool=shuffle(posts.filter(p=>!/ίδες$|ειδή$|μορφα$|^Θηλαστικά$/.test(p.title)));
  for(const p of pool.slice(0,T)){const same=pool.filter(o=>o!==p&&o.categories[0]==p.categories[0]),oth=pool.filter(o=>o!==p);const d=new Set();shuffle(same).slice(0,2).forEach(o=>d.add(o));shuffle(oth).forEach(o=>{if(d.size<3)d.add(o)});Q.push({p,o:shuffle([p,...d])})}
  const view=()=>{if(r>=T){const nb=sc>bs;if(nb){bs=sc;ls.set('thil-best',bs)}showPn(`<h2>Τέλος! ${sc}/${T}</h2><div class="sub">${nb?'Νέο ρεκόρ! 🏆':'Καλύτερο σκορ: '+bs+'/'+T}</div><p>${sc>=9?'Άριστος ζωολόγος!':sc>=6?'Πολύ καλά — ξέρεις καλά τα ζώα.':'Δοκίμασε ξανά και δες τις αναρτήσεις για περισσότερα!'}</p><div class="acts"><button class="btn pri" id="qAgain">Παίξε ξανά</button><button class="btn" id="pnClose">Κλείσιμο</button></div>`);return}
    const q=Q[r];showPn(`<h2>🎯 Ποιο ζώο είναι;</h2><div class="qbar"><span>Ερώτηση ${r+1}/${T}</span><div class="pg"><i style="width:${r/T*100}%"></i></div><span>Σκορ ${sc}${st>1?' · 🔥 '+st:''}</span></div><div class="qz"><div class="qa">${ph(q.p,240,1)}</div><div><div class="qo">${q.o.map((o,i)=>`<button data-qa="${i}">${esc(o.title)}</button>`).join('')}</div><p class="sn" id="qf" style="margin-top:12px"></p><div class="acts"><button class="btn" id="qHint">💡 Υπόδειξη</button><button class="btn pri" id="qNext" style="display:none">Επόμενη →</button><button class="btn" id="pnClose">Έξοδος</button></div></div></div>`)};
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
$('mHero').onclick=e=>{if(!e.target.closest('.hsw'))return;const h=$('mHero'),p=byId(cur.id);if(!p)return;const d=h.classList.toggle('draw');h.innerHTML=(d?A_(p).svg:ph(p,200))+'<button class="hsw" type="button" title="Εναλλαγή φωτογραφίας / σχεδίου" aria-label="Εναλλαγή φωτογραφίας / σχεδίου">'+(d?'📷':'🎨')+'</button>'};
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
async function sync(quiet){const b=$('bSync');b.disabled=true;try{const last=posts.reduce((m,p)=>!p.atlas&&p.updated>m?p.updated:m,'');
  const j=await(await fetch(`${BLOG}/feeds/posts/default?alt=json&max-results=150&updated-min=${encodeURIComponent(last)}`)).json();let n=0;
  (j.feed.entry||[]).forEach(e=>{const id=e.id.$t,c=cleanHtml(e.content?e.content.$t:''),al=(e.link||[]).find(l=>l.rel=='alternate'),o={id,title:e.title.$t.replace(/[​-‏﻿]/g,'').trim(),originalTitle:e.title.$t,published:e.published.$t,updated:e.updated.$t,categories:(e.category||[]).map(x=>x.term=='Ελλάδα'?'Ελληνικά είδη':x.term),content:c,snippet:strip(c).replace(/\s+/g,' ').trim().slice(0,200),url:al&&al.href,fresh:true};
   const i=posts.findIndex(p=>p.id==id);if(i<0)posts.push(o);else if(posts[i].updated!=o.updated)posts[i]=o;else return;AR.delete(id);n++});
  if(n){index();cats();stats();render()}if(!quiet||n)toast(n?`${n} νέες/ενημερωμένες αναρτήσεις από το Blogger`:'Όλα ενημερωμένα')}
  catch(e){if(!quiet)toast('Δεν υπάρχει σύνδεση με το Blogger αυτή τη στιγμή')}b.disabled=false}
$('bSync').onclick=()=>sync(false);
index();cats();facetsUI();stats();daily();render();
const m=location.hash.match(/p=(\d+)/);if(m){const p=posts.find(x=>sid(x)==m[1]);if(p)open(p.id,false)}
const u=opts.cat||new URLSearchParams(location.search).get('cat');if(u&&posts.some(p=>p.categories.includes(u))){cat=u;cats();render()}
if(navigator.onLine)setTimeout(()=>sync(true),2500);
};

const S=document.currentScript,B=S&&S.src?S.src.replace(/[^\/]*([?#].*)?$/,''):'./';
const SEL='[data-poulia4-library],[data-thilastika-library],[data-thilastika]';
let hosts=[...document.querySelectorAll(SEL)];
if(!hosts.length&&S){const d=document.createElement('div');d.setAttribute('data-thilastika','');S.parentNode.insertBefore(d,S);hosts=[d]}
let ld;const data=()=>ld||(ld=window.THILASTIKA_DATA?Promise.resolve():new Promise((ok,no)=>{const s=document.createElement('script');s.src=B+'data.js?v=7';s.onload=ok;s.onerror=no;document.head.appendChild(s)}));
hosts.forEach(h=>{if(h.shadowRoot)return;const R=h.attachShadow({mode:'open'});
 R.innerHTML='<div style="padding:40px 16px;text-align:center;font:14px system-ui,sans-serif;color:#756f60">Φόρτωση βιβλιοθήκης θηλαστικών…</div>';
 const go=()=>data().then(()=>{R.innerHTML='<style>'+__CSS+'</style>'+__HTML;if(!h.hasAttribute('data-standalone'))R.getElementById('app').classList.add('embed');
   APP(R,h,{cat:h.dataset.cat,dark:h.dataset.theme=='dark'})}).catch(e=>{console.error(e);R.innerHTML='<div style="padding:30px;text-align:center;font:14px system-ui,sans-serif">Δεν φορτώθηκαν τα δεδομένα της βιβλιοθήκης.</div>'});
 if('IntersectionObserver'in window){const io=new IntersectionObserver(e=>{if(e[0].isIntersecting){io.disconnect();go()}},{rootMargin:'600px'});io.observe(h)}else go()});

})();
