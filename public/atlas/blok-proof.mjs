import {renderVisual,visualStepCount,visualCaption,productPopupHTML} from './blok-visuals.mjs';

const slides=JSON.parse(document.querySelector('#proof-slide-data').textContent);
const aliases=JSON.parse(document.querySelector('#proof-route-aliases')?.textContent||'{}');
const articles=[...document.querySelectorAll('[data-proof-slide]')];
const select=document.querySelector('#proof-slide-select');
const previous=document.querySelector('#proof-previous');
const next=document.querySelector('#proof-next');
const slideCount=document.querySelector('#proof-slide-count');
const progress=document.querySelector('#proof-progress');
const visual=document.querySelector('#proof-visual');
const visualPanel=document.querySelector('.proof-visual-panel');
const workspace=document.querySelector('.proof-workspace');
const caption=document.querySelector('#proof-visual-caption');
const controls=document.querySelector('.proof-animation-controls');
const reveal=document.querySelector('#proof-reveal');
const restart=document.querySelector('#proof-restart');
const animationCount=document.querySelector('#proof-animation-count');
const popup=document.querySelector('#proof-popup');
let slideIndex=0,substep=0,popupOpener=null;
const stepsFor=scene=>Math.max(1,Math.trunc(Number(visualStepCount(scene)))||1);
const clamp=(n,min,max)=>Math.min(max,Math.max(min,Math.trunc(Number(n))||0));
const initialStep=slide=>slide.segments?slide.segments[0].visualStep:clamp(slide.initialStep||0,0,stepsFor(slide.scene)-1);
const segmentIndex=(slide,step)=>Math.max(0,slide.segments.findLastIndex(segment=>segment.visualStep<=step));
function updateURL(){history.replaceState(null,'','#'+new URLSearchParams({slide:slides[slideIndex].id,step:substep}));}
function draw({sync=true}={}){
 const slide=slides[slideIndex],scene=slide.scene,total=stepsFor(scene),hasVisual=scene!=='none';
 let current=0,count=total;
 if(slide.segments){
  current=segmentIndex(slide,substep);count=slide.segments.length;substep=slide.segments[current].visualStep;
  for(const button of document.querySelectorAll('[data-proof-segment]'))if(button.dataset.proofOwner===slide.id)button.setAttribute('aria-pressed',Number(button.dataset.proofSegment)===current);
  for(const panel of document.querySelectorAll('[data-proof-segment-panel]'))if(panel.dataset.proofOwner===slide.id)panel.hidden=Number(panel.dataset.proofSegmentPanel)!==current;
 }else{substep=clamp(substep,0,total-1);current=substep;}
 visualPanel.hidden=!hasVisual;workspace.classList.toggle('proof-full-width',!hasVisual);
 visual.innerHTML=hasVisual?renderVisual(scene,substep):'';
 caption.textContent=hasVisual?(visualCaption(scene,substep)||''):'';
 controls.hidden=!hasVisual||count<=1;
 animationCount.textContent=count>1?`${current+1} of ${count}`:'';
 reveal.disabled=current>=count-1;restart.disabled=substep===initialStep(slide);
 if(sync)updateURL();
}
function changeSlide(index,{step,sync=true,scroll=true}={}){
 slideIndex=clamp(index,0,slides.length-1);substep=step===undefined?initialStep(slides[slideIndex]):step;
 const slide=slides[slideIndex];
 for(const article of articles)article.hidden=article.dataset.proofSlide!==slide.id;
 select.value=slide.id;slideCount.textContent=`${slideIndex+1} of ${slides.length}`;
 previous.disabled=slideIndex===0;next.disabled=slideIndex===slides.length-1;
 progress.value=slideIndex+1;
 if(scroll)document.querySelector('.proof-source-panel').scrollTop=0;
 draw({sync});
}
function restore(){
 const params=new URLSearchParams(location.hash.slice(1)),requested=params.get('slide'),resolved=aliases[requested]||requested;
 const found=slides.findIndex(slide=>slide.id===resolved);
 changeSlide(found>=0?found:0,{step:params.has('step')?params.get('step'):undefined,sync:false});
}
previous.addEventListener('click',()=>changeSlide(slideIndex-1));
next.addEventListener('click',()=>changeSlide(slideIndex+1));
select.addEventListener('change',()=>changeSlide(slides.findIndex(slide=>slide.id===select.value)));
restart.addEventListener('click',()=>{substep=initialStep(slides[slideIndex]);draw();});
reveal.addEventListener('click',()=>{
 const slide=slides[slideIndex];
 if(slide.segments){const current=segmentIndex(slide,substep);substep=slide.segments[Math.min(current+1,slide.segments.length-1)].visualStep;}
 else substep=Math.min(substep+1,stepsFor(slide.scene)-1);
 draw();
});
document.addEventListener('keydown',event=>{
 if(popup.open||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||event.target.closest('input,textarea,select,[contenteditable="true"]'))return;
 if(event.key==='ArrowLeft'&&slideIndex>0){event.preventDefault();changeSlide(slideIndex-1);}
 if(event.key==='ArrowRight'&&slideIndex<slides.length-1){event.preventDefault();changeSlide(slideIndex+1);}
});
const sourceNotes='<p><a href="proofs/blok/abstract.pdf" target="_blank" rel="noreferrer">Original abstract and bibliography</a></p><p><a href="proofs/blok/author-slides.pdf" target="_blank" rel="noreferrer">Author slides</a></p>';
document.addEventListener('click',event=>{
 const segment=event.target.closest('[data-proof-segment]');
 if(segment){
  const slide=slides[slideIndex];
  if(slide.id===segment.dataset.proofOwner&&slide.segments){substep=slide.segments[Number(segment.dataset.proofSegment)].visualStep;draw();}
  return;
 }
 const trigger=event.target.closest('[data-proof-popup]');
 if(!trigger)return;
 const kind=trigger.dataset.proofPopup;
 if(!['products','source-notes'].includes(kind))return;
 event.preventDefault();popupOpener=trigger;
 document.querySelector('#proof-popup-title').textContent=kind==='products'?'An example of failure of infinite product preservation':'Source notes';
 document.querySelector('#proof-popup-body').innerHTML=kind==='products'?productPopupHTML():sourceNotes;
 popup.showModal();popup.scrollTop=0;
 document.querySelector('#proof-popup-close').focus();
});
document.querySelector('#proof-popup-close').addEventListener('click',()=>popup.close());
popup.addEventListener('click',event=>{
 if(event.target!==popup)return;
 const box=popup.getBoundingClientRect();
 if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)popup.close();
});
popup.addEventListener('close',()=>popupOpener?.focus());
window.addEventListener('hashchange',restore);
restore();
