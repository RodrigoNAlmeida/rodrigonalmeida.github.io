/**
 * Reduce a finite partial order's generating edges to its cover relation.
 * Retained tuples are returned unchanged, in their original order. Duplicate
 * endpoint pairs keep their first tuple, and reflexive edges are omitted.
 *
 * This is a finite-window calculation: a compactification's limit-order edges
 * must still be hidden by the renderer, since the omitted infinite tail means
 * that the visible window cannot determine genuine covers at a limit point.
 */
export function hasseEdges(points, edges) {
 const ids=points.map(p=>typeof p==='object'&&p!==null?p.id:p);
 if(ids.some(id=>id===undefined)||new Set(ids).size!==ids.length)throw new Error('Order points must have distinct defined ids');
 const adjacent=new Map(ids.map(id=>[id,new Set()])), unique=[];
 for(const edge of edges){
  if(!Array.isArray(edge)||edge.length<2)throw new Error('An order edge needs two endpoints');
  const [a,b]=edge;
  if(!adjacent.has(a)||!adjacent.has(b))throw new Error('Undefined order endpoint');
  if(a===b||adjacent.get(a).has(b))continue;
  adjacent.get(a).add(b);unique.push(edge);
 }
 const above=new Map();
 for(const id of ids){
  const seen=new Set(),pending=[...adjacent.get(id)];
  while(pending.length){
   const next=pending.pop();
   if(next===id)throw new Error('Hasse reduction requires an acyclic partial order');
   if(seen.has(next))continue;
   seen.add(next);pending.push(...adjacent.get(next));
  }
  above.set(id,seen);
 }
 return unique.filter(([a,b])=>![...above.get(a)].some(middle=>middle!==b&&above.get(middle).has(b)));
}

/** Visual treatment, independent of finite-order reduction. Root edges are
 * ordinary cover candidates even when they meet sampled ordinal points. */
export function orderEdgeKind(edge) {
 if(edge[2]==='limit-order')return 'hidden';
 if(edge[2]==='ordinal-gap'||edge[2]==='cut')return 'gap';
 return 'cover';
}
