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
})(typeof window!=='undefined'?window:globalThis);
