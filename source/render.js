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
})(typeof window!=='undefined'?window:globalThis);
