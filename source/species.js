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
})(typeof window!=='undefined'?window:globalThis);
