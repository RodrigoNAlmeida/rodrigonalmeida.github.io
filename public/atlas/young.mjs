import {node,closeOrder} from './constructions.mjs';
import {markerScaffoldDiagram} from './diagrams.mjs';

export function partitionsOf(n,max=n){
 if(n===0)return [[]];
 const result=[];for(let first=Math.min(max,n);first>=1;first--)for(const rest of partitionsOf(n-first,first))result.push([first,...rest]);
 return result;
}
export const partitionSize=p=>p.reduce((sum,n)=>sum+n,0);
export const partitionContains=(larger,smaller)=>smaller.every((n,i)=>(larger[i]||0)>=n);
export const partitionLabel=p=>p.length?'('+p.join(',')+')':'∅';
export const youngPartitions=size=>Array.from({length:size+1},(_,n)=>partitionsOf(n)).flat();
export const youngSteps=[
 ['COMPACT BASE','Begin with the compact ladder','Young diagrams encode integer partitions. We place the RN ladder on top, and an incomparable q-point b.','p = {1}, q = {b}','Ladder + b'],
 ['SUPPORT ANTICHAIN','Attach one support per partition','Enumerate shapes by box count. Each support sees b and both points of its assigned ladder level.','g<sub>λ</sub> &lt; b, ℓ<sub>2k+1</sub>, ℓ<sub>2k+2</sub>','Supports'],
 ['YOUNG MAST','Replace the ascending chain','Use diagram inclusion for the mast: each cover adds one box. The empty diagram is least.','x<sub>λ</sub> ≤ x<sub>μ</sub> ⇔ λ ⊆ μ','First mast'],
 ['GROW THE MAST','Grow through different shapes','Adding boxes creates branching paths through partitions. A path from ∅ to a shape records a standard Young tableau.','x<sub>λ</sub> &lt; g<sub>μ</sub> ⇔ λ ⊆ μ','Continue'],
 ['COMPACT BOUNDARY','Complete the Fine-style sail','Supports and mast points escaping every finite region converge to z. The existing empty diagram remains the isolated least point.','g<sub>λ</sub> → z, x<sub>λ</sub> → z','Boundary']
];
export const youngSource='Young’s lattice of integer partitions; its one-box growth is the standard Young-tableau branching graph. The Fine-style support and boundary attachments are specified in the construction.';
export const youngDetails=`<p>An integer partition λ is a finite nonincreasing list of positive row lengths. Draw those rows as a Young diagram.</p>
<figure class="young-partition-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156 106" width="234" height="159" role="img" aria-label="Young diagram of the partition (4, 2, 1), with four boxes in the first row, two in the second, and one in the third"><g fill="none" stroke="currentColor" stroke-width="1.5"><rect x="16" y="8" width="30" height="30"/><rect x="46" y="8" width="30" height="30"/><rect x="76" y="8" width="30" height="30"/><rect x="106" y="8" width="30" height="30"/><rect x="16" y="38" width="30" height="30"/><rect x="46" y="38" width="30" height="30"/><rect x="16" y="68" width="30" height="30"/></g></svg><figcaption>λ = (4, 2, 1)</figcaption></figure>
<p>The lattice corresponding to this order is an object of study in algebraic combinatorics, and other fields. One key use is in irreducible representations of symmetric groups of order n.</p>
<p>For our purposes, its complex branching structure, paired with sufficient regularity, made it an attractive example to test various conjectures in superintuitionistic logic.</p>
<p>This Fine-style analogue attaches a Rieger-Nishimura poset to Young’s lattice We enumerate all finite partitions by increasing box count, breaking ties lexicographically. If λ has enumeration index k, attach a support g<sub>λ</sub> below b and both ladder points at level k.</p>
<div class="math-block">g<sub>λ</sub> &lt; b, ℓ<sub>2k+1</sub>, ℓ<sub>2k+2</sub><br>x<sub>λ</sub> ≤ x<sub>μ</sub> ⇔ λ ⊆ μ<br>x<sub>λ</sub> &lt; g<sub>μ</sub> ⇔ λ ⊆ μ</div>
<p>There is an additional point z which is incomparable with the Rieger-Nishimura, and above every antichain point.</p>
<p>Choose a support or mast point to inspect its partition as a Young diagram.</p>`;

export function youngDiagram(step,size=3){
 const stage=Math.max(0,Math.min(4,Math.trunc(step)||0)),bound=[1,2,3].includes(Number(size))?Number(size):3;
 const base=markerScaffoldDiagram(2),points=base.points.map(p=>({...p,note:p.note?.replace('the least point of R.','the least point of the RN ladder.')})),edges=base.edges.map(e=>[...e]),parts=youngPartitions(bound);
 let decorations=base.decorations.replace('COMPACT LADDER R','RN LADDER'),convergences=base.convergences.map(c=>({...c}));
 if(stage>=1){
  decorations+='<text class="component-label" x="100" y="405">INCOMPARABLE SUPPORTS</text><text class="ellipsis" x="782" y="466">⋯</text>';
  parts.forEach((partition,k)=>{
   points.push(node('g'+k,'g',k,100+k*105,460,0,{partition,index:k,rank:String(k+1),note:`Support for partition ${partitionLabel(partition)}, enumeration index ${k}. It sees b and both ladder points at level ${k}. It is incomparable with all other supports and with z.`}));
   edges.push(['g'+k,'b','attach']);
   for(const i of [2*k+1,2*k+2])edges.push(['g'+k,'l'+Math.min(i,i%2?7:8),i<=8?'attach':'cut']);
  });
 }
 if(stage>=2){
  decorations+='<rect class="component-box" x="85" y="555" width="805" height="415" rx="9"/><text class="component-label" x="112" y="580">YOUNG MAST · NON-NOETHERIAN</text>';
  const shown=parts.map((partition,k)=>({partition,k})).filter(({partition})=>partitionSize(partition)<=Math.min(bound,stage===2?2:3));
  for(const {partition,k}of shown){
   const rank=partitionSize(partition),peers=shown.filter(p=>partitionSize(p.partition)===rank),position=peers.findIndex(p=>p.k===k),x=490+(position-(peers.length-1)/2)*185;
   points.push(node('y'+k,'x',k,x,930-rank*110,0,{partition,index:k,kernel:true,note:`Partition ${partitionLabel(partition)} (${rank} ${rank===1?'box':'boxes'}). ${rank===0?'This is the existing isolated least point. ':''}Its mast successors are the partitions containing it; its support successors are exactly their matching supports. The full upper cone has infinite ascending chains.`}));
  }
  for(const {partition,k}of shown){
   edges.push(['y'+k,'infinity','limit-order']);
   for(const {partition:upper,k:j}of shown)if(partitionSize(upper)===partitionSize(partition)+1&&partitionContains(upper,partition))edges.push(['y'+k,'y'+j,'base']);
   parts.forEach((upper,j)=>{if(partitionContains(upper,partition))edges.push(['y'+k,'g'+j,j===k?'attach':'cut'])});
  }
  if(stage>=3)decorations+='<text class="ellipsis" x="735" y="607">⋮</text><text class="hint" x="750" y="610">more boxes</text>';
 }
 if(stage>=4){
  points.push(node('z','z',null,850,460,0,{rank:'ω + 1',note:'The compact boundary of the mast and supports. It is incomparable with each support, lies above every Young mast point, and has strict successors the RN ladder together with b.'}));
  edges.push(['z','infinity','attach'],['z','b','attach']);
  for(const p of points)if(p.kernel)edges.push([p.id,'z','limit-order']);
  convergences.push({path:'M290 414 Q615 365 826 438',label:'gλ → z',kind:'young-support',x:625,y:395},{path:'M910 875 L910 535 Q910 480 872 466',label:'|λ| → ∞ : xλ → z',kind:'young-mast',x:690,y:1000});
 }
 return {points,edges,up:closeOrder(points,edges),width:1000,height:stage>=2?1040:660,decorations,convergences,defaultPoint:stage>=4?'y0':stage>=2?'y'+(stage===2?Math.min(parts.length-1,3):parts.length-1):stage>=1?'g'+(parts.length-1):'infinity'};
}
