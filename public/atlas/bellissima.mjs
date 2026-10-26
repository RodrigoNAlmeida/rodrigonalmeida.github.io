import {node,sub,closeOrder} from './constructions.mjs';

// Successor order: a lower point sees precisely its listed covers and all their
// successors. The sample is upward closed in U(2), not a full layer truncation.
const layers=[
 [
  {id:'a0',colour:0,covers:[]},
  {id:'a1',colour:1,covers:[]},
  {id:'a2',colour:2,covers:[]},
  {id:'a3',colour:3,covers:[]}
 ],
 [
  {id:'b0',colour:1,covers:['a3']},
  {id:'b1',colour:2,covers:['a3']},
  {id:'b2',colour:0,covers:['a1','a2']},
  {id:'b3',colour:0,covers:['a0','a3']}
 ],
 [
  {id:'c0',colour:1,covers:['b0','a1']},
  {id:'c1',colour:2,covers:['b1','a2']},
  {id:'c2',colour:0,covers:['b0','b1']},
  {id:'c3',colour:0,covers:['b2','b3']},
  {id:'c4',colour:0,covers:['b0','b3']}
 ],
 [
  {id:'d0',colour:0,covers:['c0','c1']},
  {id:'d1',colour:0,covers:['c0','c2']},
  {id:'d2',colour:0,covers:['c1','c3']},
  {id:'d3',colour:0,covers:['c2','c3']},
  {id:'d4',colour:0,covers:['c2','c4']}
 ]
];
const colourName=c=>['∅','{p}','{q}','{p,q}'][c];
const pointName=id=>id[0]+sub(id.slice(1));
const positions=[[160,386,613,840],[613,840,386,160],[613,840,386,160,500],[613,386,840,160,500]];

export const bellissimaSteps=[
 ['FOUR MAXIMAL COLOURS','Start with all four maxima','The four maximal points carry the four subsets of {p,q}.','col(a₀)=∅, col(a₁)={p}, col(a₂)={q}, col(a₃)={p,q}','Maxima'],
 ['FIRST RECURSIVE LAYER','Choose supports and colours','A singleton support requires a strict colour drop. A larger antichain allows any colour contained in all its colours.','col(x) ⊆ ⋂{col(a):a∈A}','First layer'],
 ['MIXED SUPPORTS','Combine earlier points','Choose five more antichains. A support may mix different earlier layers, as for c₀ and c₁.','↑x ∖ {x} = ↑A','Second layer'],
 ['ITERATE THE RECURSION','Add a fourth displayed layer','Repeat the same rule. Every ancestor of every selected point remains visible. Later rows are samples of much larger layers.','A = the complete set of immediate successors','Third layer']
];

export const bellissimaDetails=`<p>Choose a nonempty finite antichain A in the existing model, containing a point from the preceding layer. For each colour C contained in every colour on A, add the unique point x whose immediate successors are exactly A. A singleton support requires a strict colour drop.</p><div class="math-block">col(x) = C ⊆ ⋂<sub>a∈A</sub> col(a)<br>↑x ∖ {x} = ↑A<br>A = {a} ⇒ C ⊊ col(a)</div><p>This partial view has 18 points across four layers: all four maxima, followed by 4, 5, and 5 selected points. Every ancestor of every selected point is included, so all displayed Hasse lines are genuine covers in U(2), including lines that skip a row.</p><p>The two colour upsets are p = {x : p ∈ col(x)} and q = {x : q ∈ col(x)}.</p>`;

export function bellissimaDiagram(step){
 const stage=Math.max(0,Math.min(3,Math.trunc(step)||0));
 const points=[],edges=[];let decorations='';
 for(let layer=0;layer<=stage;layer++){
  const y=90+layer*140;
  decorations+=`<rect class="component-box" x="95" y="${y-29}" width="810" height="77" rx="8"/><text class="component-label" x="115" y="${y-43}">LAYER ${layer} · ${layer?(layers[layer].length===4?'FOUR':'FIVE')+' SELECTED POINTS':'ALL FOUR MAXIMA'}</text>`;
  for(let i=0;i<layers[layer].length;i++){
   const record=layers[layer][i],id=record.id,covers=[...record.covers];
   points.push(node(id,id[0],id.slice(1),positions[layer][i],y,record.colour,{layer,rank:String(layer),covers,note:layer?`Colour ${colourName(record.colour)}. Exact immediate successors: {${covers.map(pointName).join(', ')}}. Its other successors are their ancestors; all are shown.`:`A maximal point of colour ${colourName(record.colour)}. All four maximal colours are displayed.`}));
   for(const upper of covers)edges.push([id,upper,'base']);
  }
 }
 return {points,edges,up:closeOrder(points,edges),decorations,width:1000,height:660,alt:`Bellissima’s construction, stage ${stage+1} of four. ${points.length} displayed points across ${stage+1} layers, with row counts ${layers.slice(0,stage+1).map(row=>row.length).join(', ')}. The maximal layer is complete; later layers are selected subsets, with every ancestor retained and only genuine Hasse covers drawn.`,convergences:[],defaultPoint:['a3','b3','c4','d4'][stage],partial:true,selectedPerLayer:layers.slice(0,stage+1).map(row=>row.length),actualLayerSizes:[4,18,null,null].slice(0,stage+1),sourceRefs:['bellissima','darniere','bezhanishvili']};
}
