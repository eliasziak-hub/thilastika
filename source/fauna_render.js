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
})(typeof window!=='undefined'?window:globalThis);
