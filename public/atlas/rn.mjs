import {closeOrder} from './constructions.mjs';
import {markerScaffoldDiagram} from './diagrams.mjs';

export const rnSteps=[
 ['ONE GENERATOR','Begin with two maxima','The point 1 carries p; the other maximal point has empty colour.','p = {1}','Maxima'],
 ['FIRST ROUNDS','Build the first ladder rounds','Add points whose strict successors are exactly the earlier points at least two indices away.','i < j ⇔ i ≥ j + 2','First rounds'],
 ['REPEAT THE LADDER','Continue the same rule','The next finite rounds retain the old points and add deeper ladder positions.','d(i) = ⌊(i − 1)/2⌋','Repeat'],
 ['COMPACT LIMIT','Complete the RN ladder','Continue the finite rounds and add the nonisolated least limit ∞.','d(∞) = ω','Compactify']
];

export const rnDetails=`<p>The Rieger–Nishimura ladder can be described in several ways (see <a class="inline-link" href="constructions.html#construction=bellissima">Bellissima’s construction</a>). The one given here is taken from Esakia. We define the space <span class="mathsf">RN</span> = <span class="math">ℕ ∪ {∞}</span>, with the following order.</p>
<div class="math-block"><span class="mathsf">RN</span> = ℕ ∪ {∞}<br>i ≤ j ⇔ i = j or i ≥ j + 2<br>∞ ≤ i &nbsp; for every finite i<br>p = {1}</div>
<p>The topology has a basis consisting of the finite subsets of <span class="math">ℕ</span> and the cofinite subsets containing <span class="math">∞</span>. This makes the "finite points" converge to <span class="math">∞</span>. The clopen-upsets are then each finite upset of <span class="mathsf">RN</span> and the whole space.</p>`;
export const rnSource='Rieger (1949); Nishimura (1960); Nick Bezhanishvili (2006), Lattices of Intermediate and Cylindric Modal Logics.';

export function rnDiagram(step){
 const stage=Math.max(0,Math.min(3,Math.trunc(step)||0));
 const compact=stage===3,limit=[2,4,8,8][stage],base=markerScaffoldDiagram(compact?1:0);
 const points=base.points.filter(p=>p.id==='infinity'||Number(p.id.slice(1))<=limit).map(p=>({...p,note:p.id==='infinity'?'The nonisolated least point of the compact RN ladder. Every finite ladder point lies above it.':Number(p.base)<=2?`Point ${p.base} is maximal and has no strict successors. Only point 1 carries p.`:`Point ${p.base} has precisely the finite strict successors 1,…,${Number(p.base)-2}. Only point 1 carries p.`}));
 const ids=new Set(points.map(p=>p.id)),edges=base.edges.filter(([a,b])=>ids.has(a)&&ids.has(b)).map(edge=>[...edge]);
 return {...base,points,edges,up:closeOrder(points,edges),decorations:base.decorations.replace('COMPACT LADDER R','RN LADDER R'),defaultPoint:compact?'infinity':'l'+limit,convergences:compact?base.convergences:[]};
}
