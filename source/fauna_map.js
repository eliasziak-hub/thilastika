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
})(typeof window!=='undefined'?window:globalThis);
