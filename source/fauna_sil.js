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
})(typeof window!=='undefined'?window:globalThis);
