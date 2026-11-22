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
})(typeof window!=='undefined'?window:globalThis);
