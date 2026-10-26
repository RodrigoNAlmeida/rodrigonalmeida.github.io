/** Right-hand illustrations for the Blok proof reader.
 * These scenes supplement, and never replace, the source's prose.
 * SVGs have no listeners; the reader owns navigation and popup handling.
 */

const captions={
 adjunction:['The smaller Grz region has the same shape and size as the intuitionistic lattice.','The map ρ runs from the modal lattice to the intuitionistic lattice.','The map σ runs in the opposite direction, into the Grz region.'],
 operations:['The open elements of a product are exactly its coordinatewise open tuples.','The functor ρ preserves homomorphic images, subalgebras and arbitrary products.','The functor σ preserves H, S and finite products.','An infinite product can contain Boolean tuples with no uniform finite open description.'],
 dual:['A finite S4 preorder may have a cluster of mutually related points.','The cluster relation identifies x and •.','The quotient ρY is a partial order.','For this finite quotient, σρY has the same underlying ordered space.'],
 embedding:['Begin with a finite Boolean subalgebra N of the Grz-algebra M.','The embedding preserves □ whenever the relevant □-value lies in its domain.','Adjoin one element x and finitely many open elements C.','The new embedding h′ extends h and continues to fix open elements.'],
 stable:['A two-point antichain maps onto a two-point chain.','The displayed map is surjective and order preserving.','The successor 1 of f(a)=0 has no lift above a.','BDC holds for the coarse domain {∅,Y}.','Adding the singleton {1} to the domain makes BDC fail.'],
 passive:['Choose U={0,1,3,4} in the five-point chain.','Starting at 0, the path passes through 1∈U, then 2∉U, and returns at 3∈U.','The passive part of this U is exactly {3,4}.','Every point of U lies below one of the passive points 3 and 4.'],
 recursive:['Choose a compatible finite stable surjection f onto the two-point cluster.','The fibre of x is the entire a-branch.','The fibre of • is the entire b-branch.','The two fibre maxima are a₁ and b₁.','Cluster collapse on the finite Grz source is the identity.','Partition U into the two clopen branches Vₓ and V•.','Define h by this partition; here h=f.','The displayed h is stable, onto, and satisfies BDC for the specified domain.','The last picture shows the shape of the inverse chain schematically.'],
 conclusion:['Every finite Boolean part has a compatible □-embedding into σρM.','The finite embeddings give an embedding into an ultrapower of σρM.','Thus Grz-algebras lie in IS Pᵤ(σρM), giving generation by skeletal algebras.','The induced maps restrict to the Blok–Esakia lattice isomorphism.'],
 equivalence:['The three statements in the proposition are equivalent.'],
 terms:['Choose xₖ₊₁ and an element c of Nₖ.','Form u_c=¬xₖ₊₁∨c.','Form □u_c and the implication u_c→□u_c.','Apply □ to the implication and compare with □u_c.','Negate the resulting implication to obtain w_c.'],
 none:['']
};
const normalScene=scene=>Object.hasOwn(captions,scene)?scene:'adjunction';
const index=(scene,step)=>Math.max(0,Math.min(captions[scene].length-1,Number.isFinite(+step)?Math.trunc(+step):0));
export const visualStepCount=scene=>captions[normalScene(scene)].length;
export function visualCaption(scene,step=0){scene=normalScene(scene);return captions[scene][index(scene,step)]}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const style=`<style>
.blok-visual{--bv-ink:var(--ink);--bv-accent:var(--accent-strong);--bv-light:var(--soft-blue);--bv-line:var(--line);color:var(--bv-ink);font:14px/1.55 system-ui,sans-serif;width:100%;min-width:0}.blok-visual *{box-sizing:border-box}.blok-visual svg{width:100%;height:auto;display:block;overflow:visible}.blok-visual svg text{font-family:system-ui,sans-serif;fill:var(--bv-ink);font-size:15px}.blok-visual svg .bv-math{font-family:Georgia,'Times New Roman',serif;font-size:20px}.blok-visual svg .bv-small{font-size:12px}.blok-visual svg .bv-label{font-size:14px}.blok-visual svg .bv-title{font-weight:650;font-size:16px}.blok-visual svg .bv-order{stroke:var(--bv-ink);stroke-width:1.5;fill:none}.blok-visual svg .bv-map{stroke:var(--bv-accent);stroke-width:1.7;fill:none;stroke-dasharray:5 4}.blok-visual svg .bv-strongmap{stroke:var(--bv-accent);stroke-width:2.5;fill:none}.blok-visual svg .bv-point{fill:var(--bv-ink);stroke:var(--panel);stroke-width:1}.blok-visual svg .bv-selected{fill:var(--bv-accent);stroke:var(--panel);stroke-width:2}.blok-visual svg .bv-ring{fill:none;stroke:var(--bv-accent);stroke-width:2.5}.blok-visual svg .bv-region{fill:var(--bv-light);stroke:var(--accent);stroke-width:1}.blok-visual svg .bv-faint{opacity:.28}.blok-visual svg .bv-ghost{stroke:var(--accent);stroke-width:1.5;fill:var(--panel);stroke-dasharray:4 4}.blok-visual svg .bv-red{fill:#a83d4c}.blok-visual svg .bv-green{fill:#35694f}.blok-visual h3{font-size:18px;margin:0 0 12px}.blok-visual p{margin:9px 0}.blok-visual .bv-note{font-size:12px;color:var(--muted);line-height:1.6}.blok-visual .bv-callout{border:1px solid var(--bv-line);border-left:3px solid var(--bv-accent);padding:12px 14px;background:var(--panel);margin:12px 0}.blok-visual .bv-formula{font-family:Georgia,'Times New Roman',serif;font-size:19px;text-align:center;margin:13px 0;overflow-wrap:anywhere}.blok-visual .bv-table-wrap{overflow:auto}.blok-visual table{border-collapse:collapse;width:100%;font-size:13px;table-layout:auto}.blok-visual td,.blok-visual th{padding:10px 12px;border-bottom:1px solid var(--bv-line);text-align:left;vertical-align:top}.blok-visual th{font-weight:650}.blok-visual .bv-yes{color:#35694f;font-weight:650}.blok-visual .bv-no{color:#a83d4c;font-weight:650}.blok-visual .bv-muted{color:var(--muted)}.blok-visual button{font:inherit;color:var(--bv-accent);border:1px solid var(--accent);border-radius:5px;background:var(--panel);padding:8px 12px;cursor:pointer}.blok-visual button:hover{background:var(--bv-light)}.blok-visual button:focus-visible{outline:3px solid var(--accent-strong);outline-offset:3px}.blok-visual .bv-kicker{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}.blok-visual .bv-legend{display:flex;gap:16px;flex-wrap:wrap;font-size:11px;color:var(--muted);margin:6px 0}.blok-visual .bv-legend span{display:inline-flex;align-items:center;gap:6px}.blok-visual .bv-legend i{width:25px;height:1px;border-top:1px solid var(--ink);display:inline-block}.blok-visual .bv-legend .bv-map-key{border-color:var(--accent-strong);border-top-style:dashed}.blok-visual .bv-appear{animation:bv-in .28s ease-out both}.blok-visual .bv-alt-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:14px 0}.blok-visual .bv-alt-name{min-width:54px;font-family:Georgia,serif;font-size:18px}.blok-visual .bv-alt-cells{display:flex;gap:3px}.blok-visual .bv-alt-cells b{display:grid;place-items:center;width:27px;height:29px;background:var(--panel);border:1px solid var(--accent);font-size:11px;font-weight:400}.blok-visual .bv-alt-cells b.is-in{background:var(--accent-strong);color:white}.blok-visual .bv-badges{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}.blok-visual .bv-badges span{padding:5px 9px;border:1px solid var(--bv-line);border-radius:4px;font-size:12px}.blok-visual .bv-stage-status{min-height:1.7em}.blok-visual .bv-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}@keyframes bv-in{from{opacity:.15;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}@media(prefers-reduced-motion:reduce){.blok-visual .bv-appear{animation:none}}@media(max-width:520px){.blok-visual{font-size:13px}.blok-visual td,.blok-visual th{padding:8px}.blok-visual .bv-formula{font-size:17px}.blok-visual .bv-alt-cells b{width:22px;height:26px}.blok-visual svg .bv-small{font-size:13px}}
.blok-visual svg .bv-lattice{fill:var(--panel);stroke:var(--accent);stroke-width:1.4}.blok-visual svg .bv-lattice-grz{fill:var(--line);stroke:var(--accent);stroke-width:1.5}.blok-visual .bv-equivalence{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.blok-visual .bv-equivalence>div{display:flex;align-items:center;justify-content:center;text-align:center;min-height:150px;padding:18px 12px;border:1px solid var(--accent);border-radius:10px;background:var(--panel);font-size:clamp(12px,1.5vw,16px);line-height:1.65}.blok-visual .bv-term-card{padding:13px 10px;border:1px solid var(--line-strong);border-radius:8px;background:var(--panel);text-align:center}.blok-visual .bv-term-card math{font-size:clamp(17px,2.2vw,23px);max-width:100%;overflow-x:auto;overflow-y:hidden;padding:3px}.blok-visual .bv-term-card .bv-term-label{font-size:11px;color:var(--muted);margin:0 0 5px}.blok-visual .bv-term-arrow{text-align:center;color:var(--muted);font-size:22px;line-height:1.4}.blok-visual .bv-formula math{font-size:1em;max-width:100%;overflow:auto}.blok-visual math mo[data-modal-box]{font-family:'Latin Modern Math',math,serif!important;font-style:normal}
</style>`;
const text=(x,y,label,cls='',anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" class="${cls}">${esc(label)}</text>`;
const line=(x1,y1,x2,y2,cls='bv-order',more='')=>`<path class="${cls}" d="M${x1} ${y1}L${x2} ${y2}" ${more}/>`;
const point=(x,y,label='',selected=false,side='below')=>`<circle class="${selected?'bv-selected':'bv-point'}" cx="${x}" cy="${y}" r="5"/>${label?text(x+(side==='right'?16:side==='left'?-16:0),y+(side==='above'?-15:side==='right'||side==='left'?5:26),label,'bv-math',side==='right'?'start':side==='left'?'end':'middle'):''}`;
const ring=(x,y)=>`<circle class="bv-ring" cx="${x}" cy="${y}" r="12"/>`;
function svg(scene,title,body,height=420,width=760){return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="bv-${scene}-title bv-${scene}-description"><title id="bv-${scene}-title">${esc(title)}</title><desc id="bv-${scene}-description">${esc(title)}. The controls add the next labeled component of the illustration.</desc><defs><marker id="bv-${scene}-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L9 5L1 9" fill="none" stroke="var(--accent-strong)" stroke-width="1.4"/></marker><marker id="bv-${scene}-blackarrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L9 5L1 9" fill="none" stroke="var(--ink)" stroke-width="1.4"/></marker></defs>${body}</svg>`}
const arrow=(scene,x1,y1,x2,y2,label='',cls='bv-map',dy=-10)=>line(x1,y1,x2,y2,cls,`marker-end="url(#bv-${scene}-arrow)"`)+(label?text((x1+x2)/2,(y1+y2)/2+dy,label,'bv-math'):'' );
const relationLegend=()=>'<div class="bv-legend"><span><i></i>order relation</span><span><i class="bv-map-key"></i>map between spaces</span></div>';

const blob=(cx,top,width,height,cls='bv-lattice')=>`<path class="${cls}" d="M${cx} ${top} C${cx-width*.35} ${top-9} ${cx-width*.54} ${top+height*.20} ${cx-width*.49} ${top+height*.47} C${cx-width*.45} ${top+height*.79} ${cx-width*.22} ${top+height} ${cx} ${top+height} C${cx+width*.26} ${top+height+3} ${cx+width*.48} ${top+height*.78} ${cx+width*.49} ${top+height*.49} C${cx+width*.54} ${top+height*.18} ${cx+width*.31} ${top-9} ${cx} ${top} Z"/>`;
function latticeDrawing(step=2){
 let b=blob(565,48,285,370)+blob(185,75,180,245)+blob(565,75,180,245,'bv-lattice-grz');
 b+=text(185,30,'Ext(IPC)','bv-title')+text(565,30,'NExt(S4)','bv-title')+text(565,130,'NExt(Grz)','bv-label')+text(185,288,'IPC','bv-math')+text(565,288,'Grz','bv-math')+text(565,393,'S4','bv-math');
 if(step>=1)b+=`<g class="bv-appear">${arrow('adjunction',462,235,288,235,'ρ','bv-strongmap',-13)}</g>`;
 if(step>=2)b+=`<g class="bv-appear">${arrow('adjunction',288,170,462,170,'σ','bv-strongmap',-13)}</g>`;
 return b;
}
function adjunction(step){return svg('adjunction','The intuitionistic lattice and the Grz region inside the modal lattice',latticeDrawing(step),445)}

function operations(step){
 let h='<div class="bv-formula">ρ(∏ᵢ Mᵢ) ≅ ∏ᵢ ρMᵢ</div><p class="bv-note">□(aᵢ)=(aᵢ) exactly when □aᵢ=aᵢ in every coordinate.</p>';
 h+='<div class="bv-table-wrap"><table aria-label="Preservation of algebra constructions"><thead><tr><th>Algebra construction</th><th>ρ</th><th>σ</th></tr></thead><tbody>';
 for(const [name,rv,sv]of [['H · homomorphic images','✓','✓'],['S · subalgebras','✓','✓'],['Finite P · direct products','✓','✓'],['Arbitrary P · direct products','✓','Fails in general']])h+=`<tr><th scope="row">${name}</th><td class="${step>=1?'bv-yes':'bv-muted'}">${step>=1?rv:'—'}</td><td class="${step>=2?(sv==='✓'?'bv-yes':step>=3?'bv-no':'bv-muted'):'bv-muted'}">${step>=2?(sv==='✓'?sv:step>=3?sv:'—'):'—'}</td></tr>`;
 h+='</tbody></table></div>';
 if(step>=1)h+='<div class="bv-callout bv-appear"><strong>Induced lattice map</strong><div class="bv-formula">ρ(⋀ᵢ Vᵢ)=⋀ᵢρ(Vᵢ)<br>ρ(⋁ᵢ Vᵢ)=⋁ᵢρ(Vᵢ)</div><p class="bv-note">Here Vᵢ are varieties. P in the table means a direct product of algebras; ⋀ and ⋁ are operations in a lattice of varieties.</p></div>';
 if(step>=3)h+='<p class="bv-appear"><button type="button" data-proof-popup="products">Why can σ fail to preserve an infinite product?</button></p>';
 return h;
}

function dual(step){
 let b=`${text(180,30,'Y','bv-title')}${text(180,56,'finite S4 preorder','bv-small')}<rect x="75" y="90" width="210" height="105" rx="36" class="bv-region"/>${line(180,345,120,135)}${line(180,345,240,135)}${point(120,135,'x',false,'left')}${point(240,135,'•',false,'right')}${point(180,345,'q')}`;
 if(step>=1)b+=`<g class="bv-appear">${line(136,126,224,126,'bv-order',`marker-end="url(#bv-dual-blackarrow)"`)}${line(224,144,136,144,'bv-order',`marker-end="url(#bv-dual-blackarrow)"`)}${text(180,80,'xR• and •Rx','bv-small')}</g>`;
 if(step>=2)b+=`<g class="bv-appear">${text(590,30,step>=3?'σρY':'ρY','bv-title')}${text(590,56,step>=3?'the associated skeletal S4-space':'quotient partial order','bv-small')}${line(590,345,590,135)}${point(590,135,'c',false,'right')}${point(590,345,'q̄',false,'right')}${arrow('dual',333,240,485,240,'ρ','bv-strongmap',-14)}</g>`;
 return svg('dual','Collapsing a two-point cluster',b,405)+relationLegend()+(step>=2?'<div class="bv-formula bv-appear">ρ(x)=ρ(•)=c, ρ(q)=q̄</div>':'')+(step>=3?'<div class="bv-formula">σρY=(ρY,≤)</div>':'');
}

function embedding(step){
 let b=blob(175,75,270,290,'bv-region')+blob(615,85,210,270,'bv-region')+`${text(175,35,'M','bv-title')}${text(615,35,'σρM','bv-title')}<rect x="85" y="125" width="180" height="130" rx="10" fill="var(--panel)" stroke="var(--accent)"/>${text(175,172,'N','bv-math')}${text(175,205,'finite Boolean','bv-small')}${text(175,224,'subalgebra','bv-small')}`;
 if(step>=1)b+=`<g class="bv-appear">${arrow('embedding',275,170,535,170,'h','bv-strongmap',-16)}${text(615,235,'open elements','bv-small')}${text(615,255,'are fixed','bv-small')}</g>`;
 if(step>=2)b+=`<g class="bv-appear"><rect x="62" y="105" width="226" height="194" rx="14" fill="none" stroke="var(--accent-strong)" stroke-width="2"/>${text(175,282,'N′','bv-math')}</g>`;
 if(step>=3)b+=`<g class="bv-appear"><path class="bv-strongmap" d="M294 287 C365 330 440 325 535 285" marker-end="url(#bv-embedding-arrow)"/>${text(405,340,'h′','bv-math')}</g>`;
 return svg('embedding','A finite Boolean embedding into the skeletal algebra and its extension',b,395)+(step>=1?'<div class="bv-formula">h(□a)=□h(a) whenever a,□a∈N</div>':'')+(step>=2?'<div class="bv-formula">N′=⟨N∪{x}∪C⟩, C finite and open</div>':'')+(step>=3?'<div class="bv-formula">h′↾N=h</div>':'');
}

// The model data are exported for mathematical verification, not as a second UI.
export const finiteVisualExamples={
 stable:{source:['a','b'],sourceEdges:[],target:['0','1'],targetEdges:[['0','1']],map:{a:'0',b:'1'},domain:[[],['0','1']]},
 recursive:{source:['r','a0','a1','b0','b1'],sourceEdges:[['r','a0'],['a0','a1'],['r','b0'],['b0','b1']],target:['q','x','bullet'],targetEdges:[['q','x'],['q','bullet'],['x','bullet'],['bullet','x']],map:{r:'q',a0:'x',a1:'x',b0:'bullet',b1:'bullet'},domain:[[],['x','bullet'],['q','x','bullet']]},
 passive:{source:['0','1','2','3','4'],sourceEdges:[['0','1'],['1','2'],['2','3'],['3','4']],U:['0','1','3','4']}
};
function closure(points,edges){const R=new Map(points.map(p=>[p,new Set([p])]));for(const[a,b]of edges)R.get(a).add(b);for(const k of points)for(const i of points)if(R.get(i).has(k))for(const j of R.get(k))R.get(i).add(j);return R}
function mapEvidence(m,domain=m.domain){
 const R=closure(m.source,m.sourceEdges),S=closure(m.target,m.targetEdges),onto=m.target.every(y=>m.source.some(x=>m.map[x]===y));
 const stable=m.source.every(x=>[...R.get(x)].every(z=>S.get(m.map[x]).has(m.map[z])));
 const backFailures=[];for(const x of m.source)for(const y of S.get(m.map[x]))if(![...R.get(x)].some(z=>m.map[z]===y))backFailures.push({x,y});
 const bdcFailures=[];for(const U of domain)for(const x of m.source)if([...S.get(m.map[x])].some(y=>U.includes(y))&&![...R.get(x)].some(z=>U.includes(m.map[z])))bdcFailures.push({x,U});
 return {onto,stable,pMorphism:backFailures.length===0,backFailures,bdc:bdcFailures.length===0,bdcFailures};
}
export function finiteVisualEvidence(){
 const stable=finiteVisualExamples.stable,recursive=finiteVisualExamples.recursive,p=finiteVisualExamples.passive,R=closure(p.source,p.sourceEdges);
 const dia=U=>p.source.filter(x=>[...R.get(x)].some(y=>U.includes(y)));
 const bad=dia(p.U).filter(x=>!p.U.includes(x)),passive=p.U.filter(x=>!dia(bad).includes(x));
 const sourceR=closure(recursive.source,recursive.sourceEdges);
 const maxima=label=>recursive.source.filter(x=>recursive.map[x]===label&&![...sourceR.get(x)].some(y=>y!==x&&recursive.map[y]===label));
 const g={...recursive,target:['q','c'],targetEdges:[['q','c']],map:{r:'q',a0:'c',a1:'c',b0:'c',b1:'c'},domain:[[],['c'],['q','c']]};
 return {stable:mapEvidence(stable),stableRefined:mapEvidence(stable,[...stable.domain,['1']]),recursive:mapEvidence(recursive),recursiveCollapsed:mapEvidence(g),recursiveMaxX:maxima('x'),recursiveMaxBullet:maxima('bullet'),recursiveSourceAntisymmetric:recursive.source.every(x=>[...sourceR.get(x)].every(y=>x===y||!sourceR.get(y).has(x))),passive,passiveCofinal:p.U.every(x=>[...R.get(x)].some(y=>passive.includes(y)))};
}

function stable(step){
 const ev=finiteVisualEvidence();
 let b=blob(170,75,265,270,'bv-region')+`${text(170,35,'X · clopen antichain','bv-title')}${text(585,35,'Y · chain 0 < 1','bv-title')}${line(585,305,585,105)}${point(115,235,'a',step>=2)}${point(225,235,'b')}${point(585,305,'0',false,'right')}${point(585,105,'1',step>=4,'right')}`;
 if(step>=1)b+=`<g class="bv-appear"><path class="bv-map" d="M130 245 C285 310 410 315 565 305" marker-end="url(#bv-stable-arrow)"/><path class="bv-map" d="M239 222 C345 170 445 103 565 105" marker-end="url(#bv-stable-arrow)"/>${text(400,347,'f(a)=0','bv-math')}${text(400,136,'f(b)=1','bv-math')}</g>`;
 if(step>=2)b+=`<g class="bv-appear"><circle class="bv-ghost" cx="115" cy="125" r="10"/>${text(173,100,'no lift above a','bv-small')}${text(115,130,'×','bv-red')}</g>`;
 let h=svg('stable','A stable surjection from a clopen antichain onto a chain',b,380)+relationLegend();
 if(step>=1)h+=`<div class="bv-badges"><span class="bv-yes">${ev.stable.onto?'✓':'×'} surjective</span><span class="bv-yes">${ev.stable.stable?'✓':'×'} stable</span>${step>=2?'<span class="bv-no">× p-morphism</span>':''}</div>`;
 if(step>=3)h+='<div class="bv-callout bv-appear"><strong>D={∅,Y}</strong><p class="bv-yes">✓ BDC holds for this domain.</p><p class="bv-note">For Y, choose the source point itself; the empty set gives no obligation.</p></div>';
 if(step>=4)h+='<div class="bv-callout bv-appear"><strong>D′={∅,Y,{1}}</strong><p class="bv-no">× BDC fails at a and U={1}.</p><p>f(a)=0≤1∈U, but no point above a maps into U.</p></div>';
 if(step>=2)h+='<div class="bv-formula">↑a={a}, f[↑a]={0}</div>';
 return h;
}

function passive(step){
 const ys=[365,285,205,125,45],U=new Set(['0','1','3','4']);let b='';
 for(let i=0;i<5;i++)if(U.has(String(i)))b+=`<rect class="bv-region" x="221" y="${ys[i]-24}" width="68" height="48" rx="9"/>`;
 for(let i=0;i<4;i++)b+=line(255,ys[i],255,ys[i+1]);
 for(let i=0;i<5;i++){
  b+=point(255,ys[i],String(i),step>=2&&i>=3,'right');
 }
 b+=text(450,65,'U={0,1,3,4}','bv-math','start');
 if(step>=1)b+=`<g class="bv-appear">${text(450,158,'0≤1∈U','bv-math','start')}${text(450,208,'2∉U','bv-math','start')}${text(450,258,'3∈U','bv-math','start')}</g>`;
 if(step>=2)b+=`<g class="bv-appear">${ring(255,ys[3])}${ring(255,ys[4])}${text(450,333,'πU={3,4}','bv-math','start')}</g>`;
 return svg('passive','Passive points in the five-point chain 0 less than 1 less than 2 less than 3 less than 4',b,405)+(step>=1?'<div class="bv-formula">πU=U ∖ ◇(◇U ∖ U)</div>':'')+(step>=3?'<div class="bv-callout bv-appear">✓ Every u∈U has a passive successor in {3,4}.</div>':'')+'<p class="bv-note">Blue boxes mark U; the rings mark the passive part.</p>';
}

function recursiveChain(){
 let b=text(400,28,'Inverse cluster-expansion chain · schematic','bv-title');
 const centers=[140,400,660];
 for(let j=0;j<3;j++){
  const cx=centers[j],count=j+1;b+=`<rect class="bv-region" x="${cx-75}" y="65" width="150" height="115" rx="35"/>`;
  for(let k=0;k<count;k++){const x=cx+(k-(count-1)/2)*45;b+=point(x,120,k===0?'x':k===1?'•':'z')+line(cx,290,x,120)}
  b+=point(cx,290,'q')+text(cx,335,'Y'+['₀','₁','₂'][j],'bv-math');
 }
 b+=arrow('recursive',315,210,220,210,'ϱ₀')+arrow('recursive',575,210,480,210,'ϱ₁');
 return svg('recursive','An inverse chain of one-point cluster expansions',b,375,800)+'<p class="bv-note">Each shaded oval is a cluster of mutually related points. Each arrow identifies one additional point inside a cluster.</p>';
}
function recursive(step){
 if(step===8)return recursiveChain();
 const showA=step>=1,showB=step>=2,max=step>=3,partition=step>=5;
 let b=`${text(150,25,step>=4?'σρX=X · identity collapse':'X · finite Grz poset','bv-title')}${text(470,25,'Y′','bv-title')}${text(710,25,'Y','bv-title')}`;
 if(showA)b+=`<rect class="bv-region" x="45" y="55" width="100" height="200" rx="12"/>`;
 if(showB)b+=`<rect class="bv-region" x="185" y="55" width="100" height="200" rx="12"/>`;
 b+=line(165,340,95,210)+line(95,210,95,90)+line(165,340,235,210)+line(235,210,235,90);
 b+=point(165,340,'r')+point(95,210,'a₀',showA,'left')+point(95,90,'a₁',showA,'left')+point(235,210,'b₀',showB,'right')+point(235,90,'b₁',showB,'right');
 if(max)b+=ring(95,90)+ring(235,90);
 b+=`<rect class="bv-region" x="390" y="65" width="170" height="100" rx="30"/>`+line(470,340,425,110)+line(470,340,525,110)+point(425,110,'x',showA,'left')+point(525,110,'•',showB,'right')+point(470,340,'q');
 b+=line(440,101,510,101,'bv-order',`marker-end="url(#bv-recursive-blackarrow)"`)+line(510,120,440,120,'bv-order',`marker-end="url(#bv-recursive-blackarrow)"`);
 const mapClass=step>=6?'bv-strongmap':'bv-map';
 b+=`<path class="${mapClass}" d="M110 80 Q270 25 411 94" marker-end="url(#bv-recursive-arrow)"/><path class="${mapClass}" d="M252 90 Q360 45 513 94" marker-end="url(#bv-recursive-arrow)"/>${arrow('recursive',183,340,450,340,step>=6?'h(r)=q':'f(r)=q',mapClass)}${text(326,55,step>=6?'h':'f','bv-math')}`;
 b+=line(710,340,710,110)+point(710,110,'c',false,'right')+point(710,340,'q̄',false,'right')+arrow('recursive',575,110,680,110,'ϱ')+arrow('recursive',500,340,685,340,'ϱ');
 if(partition)b+=text(95,275,'Vₓ','bv-math')+text(235,275,'V•','bv-math');
 if(step===1)b+=text(150,398,'f⁻¹{x}={a₀,a₁}','bv-math');
 else if(step===2)b+=text(150,398,'f⁻¹{•}={b₀,b₁}','bv-math');
 else if(step===3||step===4)b+=text(160,398,'max fibres: a₁ and b₁','bv-label');
 else if(step>=5)b+=text(380,398,'U=Vₓ ⊔ V•={a₀,a₁,b₀,b₁}','bv-math');
 let h=svg('recursive','A one-step surjection from a finite Grz poset',b,430,800)+relationLegend();
 h+='<div class="bv-formula">f(aᵢ)=x, f(bᵢ)=•, f(r)=q<br>D={∅,{x,•},Y′}</div>';
 if(step>=3&&step<5)h+='<p class="bv-note">a₁ and b₁ are the maxima of the two fibres. Their images under ρ remain the same two points.</p>';
 if(step>=4)h+='<p class="bv-note">The source is already a finite partial order, so ρ is the identity. The collapsed map is g(r)=q̄ and g(aᵢ)=g(bᵢ)=c.</p>';
 if(step>=5)h+='<p class="bv-note">Every subset is clopen in this finite space. Choose Vₓ={a₀,a₁} and V•={b₀,b₁}; both contain their respective fibre maxima.</p>';
 if(step>=6)h+='<div class="bv-formula">h[Vₓ]={x}, h[V•]={•}, h(r)=q</div><p class="bv-note">Here h=f.</p>';
 if(step>=7)h+='<div class="bv-badges bv-appear"><span class="bv-yes">✓ surjective</span><span class="bv-yes">✓ stable</span><span class="bv-yes">✓ BDC for D</span></div><p class="bv-note">Above r both branches are available. Above a branch point, its own image lies in the cluster {x,•}; this meets every required nonempty domain set.</p>';
 return h;
}

function equivalence(){return '<div class="bv-equivalence"><div>(1) Blok’s Lemma</div><div>(2) The algebraic stable embedding lemma</div><div>(3) The stable surjection lemma</div></div>'}

const math=body=>`<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">${body}</math>`;
const inlineMath=body=>`<math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">${body}</math>`;
const mathSub=(base,sub)=>`<msub><mi>${base}</mi>${sub}</msub>`;
const mathProduct=(variable,set,body)=>`<mrow><munder><mo>∏</mo><mrow><mi>${variable}</mi><mo>∈</mo>${set}</mrow></munder>${body}</mrow>`;
const modalBox='<mo data-modal-box="true" mathvariant="normal">□</mo>';
const uc='<msub><mi>u</mi><mi>c</mi></msub>',wc='<msub><mi>w</mi><mi>c</mi></msub>',xnext='<msub><mi>x</mi><mrow><mi>k</mi><mo>+</mo><mn>1</mn></mrow></msub>',nk='<msub><mi>N</mi><mi>k</mi></msub>';
const boxu=`<mrow>${modalBox}${uc}</mrow>`,uImpBox=`<mrow><mo>(</mo>${uc}<mo>→</mo>${boxu}<mo>)</mo></mrow>`,boxedImp=`<mrow>${modalBox}${uImpBox}</mrow>`,innerW=`<mrow><mo>(</mo>${boxedImp}<mo>→</mo>${boxu}<mo>)</mo></mrow>`;
function terms(step){
 const cards=[
  ['Inputs',math(`${xnext}<mo>∈</mo><mi>M</mi><mspace width="2em"/><mi>c</mi><mo>∈</mo>${nk}`)],
  ['Form u_c',math(`${uc}<mo>:=</mo><mo>¬</mo>${xnext}<mo>∨</mo><mi>c</mi>`)],
  ['Apply □',math(`${boxu}<mspace width="2em"/>${uImpBox}`)],
  ['Combine',math(innerW)],
  ['Negate',math(`${wc}<mo>:=</mo><mo>¬</mo>${innerW}`)]
 ];
 return cards.slice(0,step+1).map(([label,formula],i)=>`${i?'<div class="bv-term-arrow" aria-hidden="true">↓</div>':''}<div class="bv-term-card ${i===step?'bv-appear':''}"><div class="bv-term-label">${label}</div>${formula}</div>`).join('');
}

function conclusion(step){
 let h='<div class="bv-callout"><strong>Finite Boolean part</strong><div class="bv-formula">N ⊆ M, N finite<br>hₙ:N ↪ σρM</div></div>';
 if(step>=1)h+='<div class="bv-callout bv-appear"><strong>Finite consistency → ultrapower</strong><div class="bv-formula">M ↪ (σρM)ᴵ/𝒰</div></div>';
 if(step>=2)h+='<div class="bv-callout bv-appear"><strong>Blok’s Lemma</strong><div class="bv-formula">M ∈ IS Pᵤ(σρM)</div></div>';
 if(step>=3)h+='<div class="bv-callout bv-appear"><strong>Blok–Esakia</strong><div class="bv-formula">Ext(IPC) ≅ NExt(Grz)</div></div>';
 return h;
}

const renderers={adjunction,operations,dual,embedding,stable,passive,recursive,conclusion,equivalence,terms,none:()=>''};
export function renderVisual(scene,step=0){scene=normalScene(scene);step=index(scene,step);return `${style}<div class="blok-visual bv-appear" data-visual-scene="${scene}" data-visual-step="${step}">${renderers[scene](step)}</div>`}

export function productPopupHTML(){
 const n='<mi>n</mi>',cn=mathSub('c',n),hn=mathSub('H',n),chain=mathSub('C',n),naturals='<mi mathvariant="double-struck">N</mi>';
 const apply=(symbol,argument)=>`<mrow><mi>${symbol}</mi><mo>(</mo>${argument}<mo>)</mo></mrow>`;
 const sigmaH=apply('σ',hn),productH=mathProduct('n',naturals,hn),sigmaProduct=apply('σ',productH),productSigma=mathProduct('n',naturals,sigmaH);
 const indexedH=mathSub('H','<mi>i</mi>'),keyTerm=apply('σ',mathProduct('i','<mi>I</mi>',indexedH));
 const rows=[3,5,9].map(size=>`<div class="bv-alt-row"><span class="bv-alt-name">${inlineMath(mathSub('C',`<mn>${size}</mn>`))}</span><span class="bv-alt-cells" aria-label="${size} positions with alternating membership">${Array.from({length:size},(_,i)=>`<b class="${i%2===0?'is-in':''}">${i+1}</b>`).join('')}</span><span>${size-1} membership changes</span></div>`).join('');
 const paragraph=`We construct an element ${inlineMath('<mi>c</mi>')} which belongs to the first but not the second. Namely, for each ${inlineMath(n)} we can construct the boolean element ${inlineMath(cn)} in ${inlineMath(sigmaH)} which picks exactly the odd elements of the chain. Then ${inlineMath(`${apply('c',n)}<mo>=</mo>${cn}`)}. It is clear that ${inlineMath('<mi>c</mi>')} belongs to ${inlineMath('<mi>M</mi>')}, but not to ${inlineMath(sigmaProduct)}: if it did, there would be a bound on the size of odd numbers appearing.`;
 return `${style}<div class="blok-visual"><p>Let ${inlineMath(chain)} be the ${inlineMath(n)}-point chain, ${inlineMath(`${hn}<mo>=</mo><mi mathvariant="normal">Up</mi><mo>(</mo>${chain}<mo>)</mo>`)}, and ${inlineMath(`${sigmaH}<mo>=</mo><mi mathvariant="script">P</mi><mo>(</mo>${chain}<mo>)</mo>`)} with its upset interior. Put ${inlineMath(`<mi>M</mi><mo>=</mo>${productSigma}`)}.</p><div class="bv-formula">${math(`<mi>M</mi><mo>=</mo>${productSigma}<mo>⟵</mo>${sigmaProduct}`)}</div><div class="bv-callout"><strong>Key idea:</strong> In ${inlineMath(keyTerm)}, all terms are finite unions of Boolean differences.</div><p>${paragraph}</p>${rows}<p>The comparison map is therefore not surjective.</p></div>`;
}
