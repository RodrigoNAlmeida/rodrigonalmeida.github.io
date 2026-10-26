const filter=document.querySelector('#catalog-filter');
const rows=[...document.querySelectorAll('[data-catalog-row]')];
const count=document.querySelector('#catalog-count');
const empty=document.querySelector('#catalog-no-results');
const noun=location.pathname.endsWith('properties.html')?'properties':'examples';
function filterRows(){
 const query=filter.value.trim().toLocaleLowerCase();
 let shown=0;
 for(const row of rows){row.hidden=!row.textContent.toLocaleLowerCase().includes(query);if(!row.hidden)shown++;}
 count.textContent=`${shown} of ${rows.length} ${noun}`;
 empty.hidden=shown!==0;
}
filter?.addEventListener('input',filterRows);

const dialog=document.querySelector('#example-preview');
let opener;
if(dialog){
 document.addEventListener('click',event=>{
  const target=event.target.closest('[data-example]');
  if(!target||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const template=document.getElementById(`preview-${target.dataset.example}`);
  if(!template||typeof dialog.showModal!=='function')return;
  event.preventDefault();
  opener=target;
  document.querySelector('#example-preview-body').replaceChildren(template.content.cloneNode(true));
  dialog.showModal();
  dialog.scrollTop=0;
  document.querySelector('#close-example-preview').focus();
 });
 document.querySelector('#close-example-preview').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const bounds=dialog.getBoundingClientRect();
  if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();
 });
 dialog.addEventListener('close',()=>opener?.focus());
}
