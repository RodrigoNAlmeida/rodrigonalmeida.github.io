import {glossaryHTML} from './content.mjs';

let glossary;
function openGlossary(){
  if(!glossary){
    glossary=document.createElement('dialog');
    glossary.className='atlas-glossary';
    glossary.setAttribute('aria-labelledby','atlas-glossary-title');
    const referenceURL=new URL('references.html',import.meta.url).href;
    const copy=glossaryHTML.replace('<button class="inline-link" data-dialog="references">references</button>',`<a href="${referenceURL}">references</a>`);
    glossary.innerHTML=`<div class="dialog-header"><h2 id="atlas-glossary-title">Glossary and notation</h2><button type="button" aria-label="Close glossary">×</button></div><div class="atlas-glossary-copy prose">${copy}</div>`;
    glossary.querySelector('button').addEventListener('click',()=>glossary.close());
    glossary.addEventListener('click',event=>{if(event.target===glossary){const rect=glossary.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)glossary.close();}});
    document.body.append(glossary);
  }
  if(!glossary.open)glossary.showModal();
}
document.addEventListener('click',event=>{if(event.target.closest('[data-atlas-glossary]')){event.preventDefault();openGlossary();}});
if(location.hash==='#glossary')openGlossary();
