import {glossaryHTML,aboutHTML,references as bibliographyEntries} from './content.mjs';
import {examples,cycleChord,sub} from './constructions.mjs';
import {rnDiagram,rnSteps,rnDetails,rnSource} from './rn.mjs';
import {hasseEdges,orderEdgeKind} from './order.mjs';
import {mardaevDiagram,dgDiagram} from './diagrams.mjs';
import {fineDiagram,fineSteps,fineDetails} from './fine.mjs';
import {bellissimaDiagram,bellissimaSteps,bellissimaDetails} from './bellissima.mjs';
import {youngDiagram,youngSteps} from './young.mjs';
import {referenceTopics} from './reference-topics.mjs';
import {constructionDetails} from './construction-details.mjs';
import {motivations} from './motivation.mjs';
const catalog={mardaev:examples.mardaev,wb:{...examples.dg,title:'WB graph frame'},bellissima:{title:'Bellissima’s construction',steps:bellissimaSteps},fine:{title:'Fine general frame',steps:fineSteps},rn:{title:'The Rieger–Nishimura ladder',steps:rnSteps},young:{title:'Young lattice Fine frame',steps:youngSteps},hmmq:{title:'Hyttinen–Martins–Moraschini–Quadrellaro',comingSoon:true},localic:{title:'Double omega frame',comingSoon:true}};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state={example:'fine',step:0,selected:null,zoom:1,gap:3,graphLayer:0,graphEdge:0,mode:'both',expanded:false,fineDepth:5,youngSize:3};
let diagram=null;
const labelHTML=p=>esc(p.base)+(p.sub?`<sub>${esc(p.sub)}</sub>`:'');
function labelSVG(p,x,y,extra=''){return `<text class="node-label ${extra}" text-anchor="middle" x="${x}" y="${y}">${esc(p.base)}${p.sub?`<tspan baseline-shift="sub" font-size="11">${esc(p.sub)}</tspan>`:''}</text>`}
function nodeLabel(p){
 if(p.hideLabel)return '';
 const shown=state.example==='wb'&&p.index!==undefined?{...p,base:String(p.index),sub:''}:p;
 const side=p.labelSide||(/^l\d+$/.test(p.id)?(Number(p.id.slice(1))%2?'left':'right'):p.id==='infinity'?'left':p.id==='cap'||p.id==='b'||p.id==='root'||p.id==='guard'||p.id.startsWith('sample')||['c0','cfinal'].includes(p.id)||p.kernel?'right':null);
 return labelSVG(shown,side==='left'?p.x-34:side==='right'?p.x+34:p.x,side==='above'?p.y-25:side?p.y+5:p.y+31,state.example==='wb'?'compact-label':'');
}
function steps(){return catalog[state.example].steps||[]}
function hash(){history.replaceState(null,'','#'+new URLSearchParams({construction:state.example,step:state.step,...(state.example==='mardaev'?{gap:state.gap}:{}),...(state.example==='wb'?{graph:state.graphLayer,edge:state.graphEdge,mode:state.mode}:{}),...(state.example==='fine'?{depth:state.fineDepth}:{}),...(state.example==='young'?{size:state.youngSize}:{}),...(state.selected?{point:state.selected}:{})}).toString())}
function selectPoint(id,{syncGraph=true}={}){
 const item=[...diagram.points,...(diagram.regions||[])].find(p=>p.id===id);if(!item)return;state.selected=id;
 if(state.example==='wb'&&syncGraph){const m=id.match(/^d([1-3])v(\d+)$/);if(m){state.graphLayer=+m[1]-1;state.graphEdge=+m[2];$('#graph-layer').value=state.graphLayer}}
 renderFrame();
 if(state.example==='wb')renderGraph();hash();$('#live-status').textContent='Selected '+(item.label||item.base||id);
}
function setStep(n){if(catalog[state.example].comingSoon)return;state.step=Math.max(0,Math.min(steps().length-1,Math.trunc(n)));state.selected=null;state.zoom=1;if(state.example==='wb'&&state.step>0&&state.step<=3){state.graphLayer=state.step-1;state.graphEdge=0}render();$('.stage-list').open=false;followDepth();hash()}
function parameterControls(){
 if(state.example==='fine')return `<div class="parameter-group"><div class="inline-control"><label for="fine-depth">Displayed layers</label><span class="parameter-value">${state.fineDepth}</span></div><input id="fine-depth" type="range" min="3" max="9" value="${state.fineDepth}" aria-label="Fine frame displayed layers"><div class="depth-window-actions"><button id="depth-top">↑ Upper part</button><button id="depth-bottom">Ascending chain ↓</button></div></div>`;
 if(state.example==='young')return `<div class="parameter-group"><label for="young-size">Partition window</label><select id="young-size">${[1,2,3].map(n=>`<option value="${n}" ${n===state.youngSize?'selected':''}>Partitions with at most ${n} ${n===1?'box':'boxes'}</option>`).join('')}</select><p class="parameter-hint">Choose a support or partition to inspect its attachment.</p><div class="depth-window-actions"><button id="depth-top">↑ Ladder</button><button id="depth-bottom">Mast ↓</button></div></div>`;
 if(state.example==='mardaev')return `<div class="parameter-group"><label for="marker-gap">Mardaev letter</label><select id="marker-gap">${[3,4,5].map(n=>`<option value="${n}" ${n===state.gap?'selected':''}>M${sub(n)} · ${n} layers</option>`).join('')}</select></div>`;
 if(state.example==='wb')return `<div class="parameter-group"><label for="graph-layer">Inspect an omission graph</label><select id="graph-layer">${[0,1,2].map(n=>`<option value="${n}" ${n===state.graphLayer?'selected':''}>G${sub(n)} · ${n+4} vertices → ${n+5} points</option>`).join('')}</select></div>`;
 return '';
}
function switchExample(id){state.example=id in catalog?id:'fine';state.step=0;state.selected=null;state.zoom=1;state.expanded=false;$('#construction-select').value=state.example;render();hash()}
function render({parameters=true}={}){
 const paused=!!catalog[state.example].comingSoon;
 $('#coming-soon').hidden=!paused;$('.canvas-card').hidden=paused;$('.stage-list').hidden=paused;
 for(const selector of ['#parameter-controls','.advance-control','.stage-caption','.control-bottom'])$(selector).hidden=paused;
 $('#construction-title').textContent=catalog[state.example].title;
 if(paused){state.step=0;state.selected=null;diagram=null;$('#result-tag').hidden=true;$('#live-status').textContent=catalog[state.example].title+'. Coming soon';return;}
 const ss=steps();state.step=Math.min(state.step,ss.length-1);const s=ss[state.step];
 if(parameters)$('#parameter-controls').innerHTML=parameterControls();else if($('.parameter-value'))$('.parameter-value').textContent=state.fineDepth;$('#construction-title').textContent=catalog[state.example].title;$('#motivation-copy').innerHTML='<p>'+motivations[state.example]+'</p>';
 $('#step-counter').textContent=`Stage ${state.step+1} of ${ss.length}`;$('#stage-tag').textContent=s[0];$('#stage-name').textContent=s[1];$('#stage-description').innerHTML=s[2];$('#stage-formula').innerHTML=s[3];
 $('#advance').disabled=state.step===ss.length-1;$('#previous').disabled=state.step===0;$('#finish').disabled=state.step===ss.length-1;
 $('#advance').innerHTML=state.step===ss.length-1?'Construction complete <span>✓</span>':'Advance construction <span>→</span>';
 $('#result-tag').textContent=state.step===ss.length-1?({fine:'Fine general frame · two generators',mardaev:'Compact Mardaev · two generators',wb:'Compact WB · two generators',rn:'Free on one generator',young:'Young mast · isolated least point',bellissima:'Four selected layers of X₂'}[state.example]||'Isolated root · SI · two generators'):`Step ${state.step+1} of ${ss.length}`;$('#result-tag').classList.toggle('complete',state.step===ss.length-1);$('#result-tag').hidden=state.step!==ss.length-1;
 $('#step-timeline').innerHTML=ss.map((s,i)=>`<button class="${i===state.step?'current':i<state.step?'past':''}" data-step="${i}" aria-label="Step ${i+1}: ${esc(s[1])}" aria-pressed="${i===state.step}"><span class="number">${i<state.step?'✓':i+1}</span><span class="title">${esc(s[4])}</span></button>`).join('');
 $('#mode-controls').innerHTML=state.example==='wb'?`<div class="mode-buttons" role="group" aria-label="WB visualization mode">${['frame','both','graph'].map(m=>`<button data-mode="${m}" class="${state.mode===m?'active':''}" aria-pressed="${state.mode===m}">${{frame:'Frame',both:'Frame + graph',graph:'Graph'}[m]}</button>`).join('')}</div>`:'';
 $('#graph-pane').hidden=state.example!=='wb'||state.mode==='frame';$('#canvas-layout').className='canvas-layout'+(state.example==='wb'&&state.mode==='both'?' both':state.example==='wb'&&state.mode==='graph'?' graph-only':'');
 $('#expand-window').hidden=!['fine','young'].includes(state.example);$('#expand-window').textContent=state.expanded?'Restore view ↙':'Expand view ↗';$('#expand-window').setAttribute('aria-pressed',state.expanded);$('#canvas-layout').classList.toggle('depth-window',['fine','young'].includes(state.example));$('.canvas-card').classList.toggle('expanded-window',['fine','young'].includes(state.example)&&state.expanded);
 diagram=state.example==='rn'?rnDiagram(state.step):state.example==='young'?youngDiagram(state.step,state.youngSize):state.example==='fine'?fineDiagram(state.step,state.fineDepth):state.example==='mardaev'?mardaevDiagram(state.step,state.gap):state.example==='wb'?dgDiagram(state.step):bellissimaDiagram(state.step);
 if(state.selected&&![...diagram.points,...(diagram.regions||[])].some(p=>p.id===state.selected))state.selected=null;
 renderLegend();renderFrame();if(state.example==='wb')renderGraph();
 $('#canvas-caption').textContent=state.example==='wb'?'Select a point or graph edge.':state.example==='bellissima'?'18 selected points in four layers: 4, 4, 5, 5.':'Select a point to inspect it.';
 $('#live-status').textContent=`${catalog[state.example].title}. Step ${state.step+1}: ${s[1]}`;
}
function renderFrame(){
 if(!diagram)return;
 const svg=$('#frame-svg'),map=Object.fromEntries([...diagram.points,...(diagram.regions||[])].map(p=>[p.id,p])),up=diagram.up[state.selected]||new Set(),order=$('#show-order').checked,labels=$('#show-labels').checked,limits=$('#show-limits').checked;
 const graph=state.example==='wb'?cycleChord(state.graphLayer+4):null,omissions=graph?.[state.graphEdge]||[];
 const defs='<defs><marker id="limit-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L7 4L1 7" fill="none" stroke="#c09a59" stroke-width="1.1"/></marker></defs>';
 const lines=order?hasseEdges(diagram.points,diagram.edges).map(edge=>{
  const [a,b,kind]=edge,presentation=orderEdgeKind(edge);if(presentation==='hidden')return '';
  if(!map[a]||!map[b])return '';const selected=a===state.selected,attached=a===(state.selected||diagram.defaultPoint);
  if(['attach','guard','root','cut','ordinal','dg'].includes(kind)&&!attached)return '';
  const p=map[a],q=map[b],dx=q.x-p.x,dy=q.y-p.y,len=Math.hypot(dx,dy);if(!len)return '';const pad=15,x1=p.x+dx/len*pad,y1=p.y+dy/len*pad,x2=q.x-dx/len*pad,y2=q.y-dy/len*pad;
  return `<path class="edge ${presentation==='gap'?'interval-gap':''} ${selected?'selected':state.selected&&!up.has(a)?'dim':''}" data-from="${a}" data-to="${b}" d="M${x1} ${y1}L${x2} ${y2}"/>${presentation==='gap'&&labels?`<text class="interval-break" x="${(x1+x2)/2+10}" y="${(y1+y2)/2+5}">⋮</text>`:''}`;
 }).join(''):'';
 const convergences=limits?(diagram.convergences||[]).map(c=>`<path class="convergence" d="${c.path}" marker-end="url(#limit-arrow)"/>${labels?`<text class="limit-label" x="${c.x}" y="${c.y}">${c.kind==='young-support'?'g<tspan baseline-shift="sub" font-size="10">λ</tspan> → z':c.kind==='young-mast'?'|λ| → ∞ : x<tspan baseline-shift="sub" font-size="10">λ</tspan> → z':esc(c.label)}</text>`:''}`).join(''):'';
 const nodes=diagram.points.map(p=>`<g class="point colour-${p.colour} ${p.id===state.selected?'selected':''} ${up.has(p.id)?'upset':''} ${p.emphasis||p.localicClass||''} ${state.example==='wb'&&p.layer===state.graphLayer&&omissions.includes(p.index)?'omitted':''}" data-point="${p.id}" role="button" tabindex="0" aria-label="Point ${esc(p.label)}${p.rank?', depth '+esc(p.rank):''}" aria-pressed="${p.id===state.selected}"><title>${esc(p.label)}${p.rank?' · depth '+esc(p.rank):''}</title><rect x="${p.x-27}" y="${p.y-24}" width="66" height="64" fill="transparent" pointer-events="all"/>${p.id===state.selected?`<circle class="halo" cx="${p.x}" cy="${p.y}" r="20"/>`:''}<circle class="ring" cx="${p.x}" cy="${p.y}" r="11"/><circle class="core" cx="${p.x}" cy="${p.y}" r="3.8"/>${labels?nodeLabel(p):''}</g>`).join('');
 svg.setAttribute('aria-label',diagram.alt?`Construction step ${state.step+1} of ${steps().length}. ${diagram.alt}`:`${catalog[state.example].title}. Construction step ${state.step+1}: ${steps()[state.step][1]}.`);svg.innerHTML=defs+diagram.decorations+lines+convergences+nodes;svg.classList.toggle('hide-order',!order);for(const el of svg.querySelectorAll('[data-region]'))el.classList.toggle('selected',el.dataset.region===state.selected);svg.classList.toggle('hide-labels',!labels);svg.classList.toggle('hide-colours',!$('#show-colours').checked);$('#clear-selection').disabled=!state.selected;svg.setAttribute('width',diagram.width);svg.setAttribute('height',diagram.height);applyZoom();
 const p=map[state.selected];$('#point-note').hidden=!p;$('#partition-preview').hidden=!p?.partition;if(p?.partition)$('#partition-preview').innerHTML=ferrers(p.partition);if(p){$('#point-name').innerHTML=labelHTML(p);$('#point-description').textContent=(p.rank&&!p.rank.includes('d(cβ)')?'Depth '+p.rank+'. ':'')+(p.note||'Select another point to inspect the construction.')}
}
function renderLegend(){$('#colour-key').innerHTML='<span><i class="key-dot p"></i>{p}</span><span><i class="key-dot q"></i>{q}</span><span><i class="key-dot pq"></i>{p,q}</span><span><i class="key-dot empty"></i>∅</span>'}
function ferrers(partition){if(!partition.length)return '<span class="empty-partition">∅</span>';const unit=8,w=partition[0]*unit,h=partition.length*unit;return `<svg viewBox="0 0 ${w+2} ${h+2}" width="${w+2}" height="${h+2}" role="img" aria-label="Young diagram ${partition.join(', ')}">${partition.map((n,r)=>Array.from({length:n},(_,c)=>`<rect x="${1+c*unit}" y="${1+r*unit}" width="${unit}" height="${unit}"/>`).join('')).join('')}</svg>`}
function followDepth(where='selected'){if(!['fine','young'].includes(state.example))return;const pane=$('#frame-scroll');if(state.example==='fine'&&where==='selected'&&state.step<3){pane.scrollTo({top:0,behavior:'auto'});return}const p=diagram.points.find(p=>p.id===(state.selected||diagram.defaultPoint)),scale=$('#frame-svg').getBoundingClientRect().height/diagram.height;pane.scrollTo({top:where==='top'?0:where==='bottom'?pane.scrollHeight:p?Math.max(0,p.y*scale-pane.clientHeight*.65):0,behavior:'auto'})}
function applyZoom(){const w=diagram.width/state.zoom,h=diagram.height/state.zoom;$('#frame-svg').setAttribute('viewBox',`${(diagram.width-w)/2} ${(diagram.height-h)/2} ${w} ${h}`);$('#zoom-reset').textContent=Math.round(state.zoom*100)+'%'}
function renderGraph(){
 const k=state.graphLayer,n=k+4,g=cycleChord(n),selected=Math.min(state.graphEdge,g.length-1);state.graphEdge=selected;const endpoints=g[selected],v=Array.from({length:n},(_,j)=>({x:180+119*Math.cos(-Math.PI/2+j*2*Math.PI/n),y:180+119*Math.sin(-Math.PI/2+j*2*Math.PI/n)}));
 $('#graph-title').textContent=`G${sub(k)} · ${n} vertices, ${n+1} edges`;
 $('#graph-svg').innerHTML=g.map(([a,b],i)=>`<g class="graph-edge-group" role="button" tabindex="0" data-graph-edge="${i}" aria-label="Edge ${i+1}: omit vertices ${a} and ${b}" aria-pressed="${i===selected}"><title>Omit v${sub(k)},${sub(a)} and v${sub(k)},${sub(b)}</title><circle cx="${(v[a].x+v[b].x)/2}" cy="${(v[a].y+v[b].y)/2}" r="11" fill="transparent" pointer-events="all"/><line class="graph-edge ${i===selected?'active':''}" x1="${v[a].x}" y1="${v[a].y}" x2="${v[b].x}" y2="${v[b].y}"/><line class="graph-edge-hit" x1="${v[a].x}" y1="${v[a].y}" x2="${v[b].x}" y2="${v[b].y}"/></g>`).join('')+v.map((p,j)=>`<g class="graph-vertex ${endpoints.includes(j)?'omitted':'successor'}" data-graph-vertex="${j}" role="button" tabindex="0" aria-label="Upper-layer vertex ${j}"><circle cx="${p.x}" cy="${p.y}" r="15"/><text text-anchor="middle" x="${p.x}" y="${p.y+5}">v<tspan baseline-shift="sub" font-size="10">${j}</tspan></text></g>`).join('');
 $('#graph-equation').innerHTML=`v<sub>${k+1},${selected}</sub> misses {v<sub>${k},${endpoints[0]}</sub>, v<sub>${k},${endpoints[1]}</sub>}<br><small>It sees the other ${n-2} points of D<sub>${k}</sub>.</small>`;
}
function showDialog(title,body,kicker='THIS CONSTRUCTION'){$('#detail-dialog').classList.remove('wide-dialog');$('#dialog-kicker').textContent=kicker;$('#dialog-kicker').hidden=!kicker;$('#detail-dialog').setAttribute('aria-label',title);$('#dialog-content').innerHTML='<h2>'+title+'</h2>'+body;$('#detail-dialog').scrollTop=0;if(!$('#detail-dialog').open)$('#detail-dialog').showModal()}
function sourceReferences(ids){return '<div class="construction-sources">'+ids.map(id=>{const ref=bibliographyEntries.find(r=>r.id===id);return ref?`<p>${esc(ref.authors)} (${esc(ref.year)}). <em>${esc(ref.title)}</em>. ${esc(ref.publication)}${ref.url?` <a href="${ref.url}" target="_blank" rel="noreferrer">${esc(ref.link)} ↗</a>`:''}</p>`:''}).join('')+'</div>'}
const sources={rn:sourceReferences(['rieger','nishimura','bezhanishvili']),fine:sourceReferences(['fine','shehtman','bgj']),mardaev:sourceReferences(['mardaev','almeida-carai']),young:sourceReferences(['young-original','stanley','fulton']),wb:sourceReferences(['theta-graphs','subdivision-complement','nonincidence','crowns','layered-crowns','hmmq','girth-packing']),bellissima:sourceReferences(['bellissima','darniere','bezhanishvili'])};
function glossary(){showDialog('Glossary and notation',glossaryHTML,'')}
function references(){location.href='references.html'}
function about(){showDialog('About',aboutHTML,'')}

function details(){
 if(catalog[state.example].comingSoon)return;
 const topic=referenceTopics.find(t=>t.construction===state.example);
 showDialog(catalog[state.example].title,`<section class="motivation-intro"><strong>Motivation</strong><p>${motivations[state.example]}</p></section><section class="construction-details"><h3>Details of the construction</h3>${constructionDetails[state.example]}</section><div class="source-label">MATHEMATICAL SOURCES</div><div class="source-content">${sources[state.example]}${topic?`<a class="topic-reference-link" href="references/${topic.id}.html">References and background for this construction ↗</a>`:''}</div>`);
}
function girth(){showDialog('How do later graphs gain width?','<p>Section to be finished.</p>','')}
$('#construction-select').addEventListener('change',e=>switchExample(e.target.value));$('#advance').addEventListener('click',()=>setStep(state.step+1));$('#previous').addEventListener('click',()=>setStep(state.step-1));$('#restart').addEventListener('click',()=>setStep(0));$('#finish').addEventListener('click',()=>setStep(steps().length-1));
document.addEventListener('change',e=>{
 if(e.target.id==='young-size'){state.youngSize=+e.target.value;state.selected=null;render();followDepth();hash()}
 if(e.target.id==='marker-gap'){state.gap=+e.target.value;state.selected=null;render();hash()}
 if(e.target.id==='graph-layer'){state.graphLayer=+e.target.value;state.graphEdge=0;if(state.step<=state.graphLayer)state.step=state.graphLayer+1;state.selected=`d${state.graphLayer+1}v0`;render();hash()}
});
document.addEventListener('input',e=>{if(e.target.id==='fine-depth'){state.fineDepth=+e.target.value;state.selected=null;const scroll=$('#frame-scroll').scrollTop;render({parameters:false});$('#frame-scroll').scrollTop=scroll;hash()}});
document.addEventListener('click',e=>{const info=e.target.closest('[data-dialog]');if(info){({references,about,glossary,girth}[info.dataset.dialog])?.();return}const region=e.target.closest('[data-region]');if(region){selectPoint(region.dataset.region);return}if(e.target.closest('#depth-top')){followDepth('top');return}if(e.target.closest('#depth-bottom')){followDepth('bottom');return}const t=e.target.closest('[data-step],[data-point],[data-graph-edge],[data-graph-vertex],[data-mode]');if(!t)return;
 if(t.dataset.step!==undefined)setStep(+t.dataset.step);
 else if(t.dataset.point)selectPoint(t.dataset.point);
 else if(t.dataset.graphEdge!==undefined){state.graphEdge=+t.dataset.graphEdge;if(state.step<state.graphLayer+1)state.step=state.graphLayer+1;state.selected=`d${state.graphLayer+1}v${state.graphEdge}`;render();hash()}
 else if(t.dataset.graphVertex!==undefined)selectPoint(`d${state.graphLayer}v${t.dataset.graphVertex}`,{syncGraph:false});
 else if(t.dataset.mode){state.mode=t.dataset.mode;render();hash()}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.expanded&&!$('#detail-dialog').open){state.expanded=false;render();return}if((e.key==='Enter'||e.key===' ')&&e.target.matches('svg [role="button"]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}))}});
for(const id of ['show-order','show-limits','show-labels','show-colours'])$('#'+id).addEventListener('change',renderFrame);
$('#zoom-in').addEventListener('click',()=>{state.zoom=Math.min(1.6,state.zoom+.15);applyZoom()});$('#zoom-out').addEventListener('click',()=>{state.zoom=Math.max(.7,state.zoom-.15);applyZoom()});$('#zoom-reset').addEventListener('click',()=>{state.zoom=1;applyZoom()});
$('#expand-window').addEventListener('click',()=>{state.expanded=!state.expanded;render();followDepth()});
$('#clear-selection').addEventListener('click',()=>{state.selected=null;renderFrame();hash()});$('#close-point').addEventListener('click',()=>{state.selected=null;renderFrame();hash()});$('#details-button').addEventListener('click',details);$('#girth-button').addEventListener('click',girth);$('#close-dialog').addEventListener('click',()=>$('#detail-dialog').close());$('#detail-dialog').addEventListener('click',e=>{if(e.target===$('#detail-dialog'))$('#detail-dialog').close()});
function route(){if($('#detail-dialog').open)$('#detail-dialog').close();const p=new URLSearchParams(location.hash.slice(1)),requested=p.get('construction');state.example=requested==='dg'?'wb':requested==='ordinal'?'localic':requested in catalog?requested:'fine';state.step=Math.max(0,Math.trunc(+p.get('step')||0));state.gap=[3,4,5].includes(+p.get('gap'))?+p.get('gap'):3;state.graphLayer=Math.max(0,Math.min(2,+p.get('graph')||0));state.graphEdge=Math.max(0,+p.get('edge')||0);state.fineDepth=Math.max(3,Math.min(9,+p.get('depth')||5));state.youngSize=[1,2,3].includes(+p.get('size'))?+p.get('size'):3;state.mode=['frame','graph','both'].includes(p.get('mode'))?p.get('mode'):'both';state.selected=p.get('point');$('#construction-select').value=state.example;render();followDepth();if(requested==='dg')hash()}


route();window.addEventListener('hashchange',route);
