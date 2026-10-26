export const sub=n=>String(n).replace(/[0-9-]/g,c=>c==='-'?'₋':'₀₁₂₃₄₅₆₇₈₉'[+c]);
export const sup=n=>String(n).replace(/[0-9]/g,c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]);
export const node=(id,base,idx,x,y,colour=0,extra={})=>({id,base,sub:idx===null?'':String(idx),label:base+(idx===null?'':sub(idx)),x,y,colour,...extra});
export function closeOrder(points,edges){
 const up=Object.fromEntries(points.map(p=>[p.id,new Set([p.id])]));
 for(const [a,b]of edges){if(!up[a]||!up[b])throw new Error('Undefined order endpoint');up[a].add(b)}
 let changed=true;while(changed){changed=false;for(const p of points)for(const q of [...up[p.id]])for(const r of up[q])if(!up[p.id].has(r)){up[p.id].add(r);changed=true}}
 return up;
}
export function cycleChord(n){return [...Array.from({length:n},(_,i)=>[i,(i+1)%n]),[0,Math.floor(n/2)]]}
export function finiteDG(last=3,finish=false){
 const points=[],edges=[],graphs=[];
 for(let k=0;k<=last;k++)for(let j=0;j<k+4;j++)points.push({id:`d${k}v${j}`,colour:k===0?j:0,layer:k,index:j});
 for(let k=0;k<last;k++){const g=cycleChord(k+4);graphs.push(g);for(let e=0;e<g.length;e++)for(let j=0;j<k+4;j++)if(!g[e].includes(j))edges.push([`d${k+1}v${e}`,`d${k}v${j}`])}
 if(finish){points.push({id:'guard',colour:0});for(let j=0;j<3;j++)edges.push(['guard',`d0v${j}`]);points.push({id:'root',colour:0});for(const p of points)if(p.id!=='root')edges.push(['root',p.id])}
 return {points,edges,graphs,up:closeOrder(points,edges)};
}
export function finiteMardaev(last=10,gap=3,finish=false){
 const points=[{id:'cap',colour:3,layer:0}],edges=[],marks=[1];
 for(let k=1+gap;k<last;k+=gap)marks.push(k);
 for(let i=1;i<=last;i++){points.push({id:'x'+i,colour:i===1?1:0,layer:i},{id:'y'+i,colour:i===1?2:0,layer:i});if(i>1)edges.push(['x'+i,'x'+(i-1)],['y'+i,'y'+(i-1)])}
 points.push({id:'z1',colour:0,layer:1});edges.push(['x1','cap'],['y1','cap'],['z1','cap']);if(last>=2)edges.push(['x2','z1'],['y2','z1']);
 for(let k=2;k<last;k++)if(marks.includes(k)){points.push({id:'z'+k,colour:0,layer:k});for(const a of ['x','y']){edges.push([a+(k+1),'z'+k],['z'+k,a+(k-1)])}}else edges.push(['x'+(k+1),'y'+(k-1)],['y'+(k+1),'x'+(k-1)]);
 if(finish){points.push({id:'guard',colour:0});edges.push(['guard','x1'],['guard','y1']);points.push({id:'root',colour:0});for(const p of points)if(p.id!=='root')edges.push(['root',p.id])}
 return {points,edges,marks,up:closeOrder(points,edges)};
}
export function finiteMarker(n=12,guard=false,root=false){
 const points=[],edges=[];
 for(let i=1;i<=n;i++){points.push({id:'l'+i,colour:i===1?1:0});for(let j=1;j<=i-2;j++)edges.push(['l'+i,'l'+j])}
 points.push({id:'b',colour:2});for(let k=0;k<n;k++){points.push({id:'m'+k,colour:0});edges.push(['m'+k,'l'+(k+1)],['m'+k,'b'])}
 if(guard){points.push({id:'guard',colour:0});edges.push(['guard','l1'],['guard','l2'],['guard','b'])}
 if(root){points.push({id:'root',colour:0});for(const p of points)if(p.id!=='root')edges.push(['root',p.id])}
 return {points,edges,up:closeOrder(points,edges)};
}
export function checkColouring(model){
 const {points,up}=model,failures=[];
 for(const p of points){const strict=new Set([...up[p.id]].filter(x=>x!==p.id));for(const q of points){if(p.id===q.id)continue;if(strict.size===up[q.id].size&&[...strict].every(x=>up[q.id].has(x))&&p.colour===q.colour)failures.push(['A',p.id,q.id]);const qs=[...up[q.id]].filter(x=>x!==q.id);if(strict.size===qs.length&&qs.every(x=>strict.has(x))&&p.colour===q.colour)failures.push(['B',p.id,q.id]);if(up[p.id].has(q.id)&&(p.colour&q.colour)!==p.colour)failures.push(['monotone',p.id,q.id])}}
 return failures;
}

const O=(...pairs)=>pairs.map(([e,c])=>({e,c}));
export const ordinalTargets=[
 {id:'omega',label:'ω',terms:O([1,1])},{id:'omega1',label:'ω + 1',terms:O([1,1],[0,1])},{id:'omega2',label:'ω + 2',terms:O([1,1],[0,2])},
 {id:'omega-times2',label:'ω · 2',terms:O([1,2])},{id:'omega-square',label:'ω²',terms:O([2,1])},{id:'mixed',label:'ω² + ω + 3',terms:O([2,1],[1,1],[0,3])},
 {id:'omega-cube',label:'ω³',terms:O([3,1])},{id:'omega-omega',label:'ω^ω',terms:O(['ω',1])},{id:'arbitrary',label:'Countable limit α (symbolic)',terms:null}
];
const exp=e=>e==='ω'?Infinity:e;
export function addOrd(a,b){
 if(!b.length)return a.map(t=>({...t}));const lead=b[0],r=a.filter(t=>exp(t.e)>exp(lead.e)).map(t=>({...t})),same=a.find(t=>t.e===lead.e);
 r.push({e:lead.e,c:lead.c+(same?.c||0)},...b.slice(1).map(t=>({...t})));return r;
}
export function formatOrd(a){if(a===null)return 'α';if(!a.length)return '0';return a.map(t=>t.e===0?String(t.c):'ω'+(t.e===1?'':t.e==='ω'?'^ω':sup(t.e))+(t.c===1?'':'·'+t.c)).join(' + ')}
export function formatOrdHTML(a){if(a===null)return 'α';if(!a.length)return '0';return a.map(t=>t.e===0?String(t.c):'ω'+(t.e===1?'':`<sup>${t.e}</sup>`)+(t.c===1?'':'·'+t.c)).join(' + ')}
export function cofinal(a,n){
 if(a===null)return null;if(!a.length)return [];
 const tail=a.at(-1),head=a.slice(0,-1).map(x=>({...x}));
 if(tail.e===0)return [...head,...(tail.c>1?[{e:0,c:tail.c-1}]:[])];
 if(tail.c>1)head.push({e:tail.e,c:tail.c-1});
 head.push({e:tail.e==='ω'?n:tail.e-1,c:tail.e==='ω'?1:n+1});return head;
}
export function ordinalPlan(id='omega-square',n=2){
 const target=ordinalTargets.find(t=>t.id===id)||ordinalTargets[4],a=target.terms;
 if(a&&a.length===1&&a[0].e===1&&a[0].c===1)return {target,beta:null,base:'infinity',rank:a,rankLabel:'ω',sample:[],limit:true};
 if(id==='omega1')return {target,beta:null,base:'z',rank:a,rankLabel:'ω + 1',sample:[],limit:false};
 let beta;
 if(!a)beta=null;
 else if(a[0].e===1){const finite=a.find(t=>t.e===0)?.c||0;if(a[0].c===1)beta=finite===2?[]:O([0,finite-2]);else beta=[{e:1,c:a[0].c-1},...(finite?[{e:0,c:finite}]:[])];}
 else beta=a.map(t=>({...t}));
 const rank=a?addOrd(O([1,1],[0,2]),beta):null,limit=!beta||!!beta.length&&beta.at(-1).e!==0;
 const sample=Array.from({length:4},(_,i)=>beta===null?null:limit?cofinal(beta,i+1):beta.length?[...beta.slice(0,-1),{e:0,c:Math.max(0,beta.at(-1).c-(4-i))}].filter(t=>t.c):[]);
 return {target,beta,base:null,rank,rankLabel:rank?formatOrd(rank):'(ω + 2) + α',sample,limit,n,chosen:beta===null?'α':formatOrd(beta)};
}

export const examples={
 mardaev:{title:'A Mardaev frame',steps:[
 ['INITIAL POINTS','Begin with the maximum','Begin with the maximum and the three differently colored points.','p = {x<sub>1</sub>,z<sub>0</sub>}, q = {y<sub>1</sub>,z<sub>0</sub>}','Initial points'],
 ['MARDAEV LETTER','Add a Mardaev letter','For the Mardaev letter M<sub>n</sub>, add n many layers of points. Points are attached by skipping one level.','x<sub>i+1</sub> &lt; x<sub>i</sub>, y<sub>i+1</sub> &lt; y<sub>i</sub>','Letter'],
 ['SEPARATING LEVEL','Insert a comma','Add the separating level between consecutive Mardaev letters. The comma point replaces the two ordinary crossings.','x<sub>k+1</sub>,y<sub>k+1</sub> &lt; z<sub>k</sub> &lt; x<sub>k−1</sub>,y<sub>k−1</sub>','Comma'],
 ['MARDAEV WORD','Repeat with different Mardaev letters','Depending on the alphabet Σ, add as many Mardaev letters as desired, until you reach the desired Mardaev word.','Σ = {M<sub>n</sub> : n ≥ 1}, w ∈ Σ<sup>ω</sup>','Word'],
 ['COMPACT LIMIT','Add the least limit λ','All finite levels converge to λ. The compact Mardaev space is Noetherian.','d(λ) = ω','Compactify']
 ]},
 dg:{title:'The WB graph construction',steps:[
 ['FOUR ATOMIC COLOURS','Start with four points','The four points of the top layer receive the four different generator colours.','|D₀| = 4','Top layer'],
 ['GRAPH TO ORDER','Turn each edge into a point','An edge becomes a lower point. Its two endpoints are precisely the upper points it misses.','D<sub>i+1</sub> = E(G<sub>i</sub>)','First graph'],
 ['ITERATE THE RECIPE','Use the edges as new vertices','The preceding graph’s edges are now vertices of the next omission graph.','|D<sub>i</sub>| = i + 4','Second graph'],
 ['GROW THE LAYERS','Repeat the pair-omission rule','The finite layers grow by one point. Select an edge or lower point to inspect its two omissions.','y &lt; x ⇔ x ∉ endpoints(y)','Third graph'],
 ['COMPACT LIMIT','Complete the WB frame','Compactify the infinite frame by its nonisolated least point ∞. The drawing retains the three initial omission graphs.','d(∞) = ω','Compactify']
 ]}
};
export function ordinalSteps(plan){
 if(!plan.base&&plan.beta?.length===0)return [
 ['DESIRED DEPTH','Choose the target ω + 2','The first ordinal point already reaches this target.','α = ω + 2','Target'],
 ['MARKER SCAFFOLD','Construct the compact marker space','The ladder, q-point and convergent antichain form N.','d(z) = ω + 1','Scaffold'],
 ['CHOOSE THE POINT','Add c₀ below z and m₀','No further ordinal cuts are needed: choose β = 0.','d(c₀) = ω + 2 = α','Choose c₀'],
 ['ISOLATED ROOT','Complete the SI cone','Add the shared-maxima guard and an isolated root below the space.','d(r) = ω + 3','SI cone']
 ];
 if(plan.base)return [
 ['DESIRED DEPTH','Choose a target depth','The marker scaffold already contains a point at the requested depth.','α = '+plan.target.label,'Target'],
 ['MARKER SCAFFOLD','Construct the compact marker space','Build the ladder, q-point, and convergent marker antichain.','d(∞) = ω, d(z) = ω + 1','Scaffold'],
 ['CHOOSE THE POINT','The target is reached',plan.base==='z'?'Choose z, the marker limit.':'Choose ∞, the ladder limit.','d('+ (plan.base==='z'?'z':'∞') +') = α','Choose point'],
 ['ISOLATED ROOT','Complete an SI cone','Adjoin an isolated root below N. The chosen deep point lies in its principal cone.','d(r) = ω + 2','SI cone']
 ];
 return [
 ['DESIRED DEPTH','Choose how deep to go','Fix a countable target α. We will choose a point whose depth is at least α.','α = '+(plan.target.terms?formatOrdHTML(plan.target.terms):'an arbitrary countable ordinal'),'Target'],
 ['MARKER SCAFFOLD','Start with N','The ladder and marker antichain provide a reusable two-colour scaffold.','d(z) = ω + 1','Scaffold'],
 ['ORDINAL INDEX','Choose the index β','Choose β so that (ω + 2) + β reaches the desired depth.','β = '+(plan.beta===null?'α':formatOrdHTML(plan.beta)),'Choose β'],
 ['REVERSED INTERVAL','Start the ordinal component','Put c₀ below z and m₀. Reverse ordinal order, so larger indices lie deeper.','d(c₀) = ω + 2','Start interval'],
 [plan.limit?'COFINAL APPROXIMATION':'SUCCESSOR STEP',plan.limit?'Choose a cofinal sequence':'Add successor levels',plan.limit?'Choose β₀ < β₁ < ⋯ with supremum β. Move the slider to see deeper approximations.':'At a successor index, one more point below its predecessor adds one to the depth.',plan.limit?'β<sub>n</sub> ↗ β':'d(c<sub>γ+1</sub>) = d(c<sub>γ</sub>) + 1','Go deeper'],
 ['DISTINCT MARKER PROFILES','Assign markers to ordinal cuts','Choose an injection e from β into the positive integers. Each cut receives a distinct marker.','c<sub>ξ</sub> &lt; m<sub>e(γ)</sub> ⇔ γ &lt; ξ','Mark cuts'],
 ['CLOSE THE INTERVAL','Reach the chosen depth','Complete [0,β] in its ordinal topology. The last point has the required depth.','d(c<sub>β</sub>) = '+(plan.rank?formatOrdHTML(plan.rank):'(ω + 2) + α ≥ α'),'Reach α'],
 ['ISOLATED ROOT','Place it inside an SI cone','Add a finite guard sharing the old maxima, then an isolated least point r.','d(r) = d(c<sub>β</sub>) + 1','SI cone']
 ];
}
