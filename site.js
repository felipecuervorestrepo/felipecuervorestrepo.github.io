let language = 'en';
let filter = 'all';
const words = {
 en:{open:'Open access',paid:'Purchase / institutional access',publisher:'Publisher · check access',read:'Read online ↗',pdf:'PDF ↓',book:'Full book PDF ↓',issue:'Full issue PDF ↓',empty:'No publications match your search.',search:'Search publications…',count:'publications'},
 es:{open:'Acceso abierto',paid:'Compra / acceso institucional',publisher:'Editorial · consultar acceso',read:'Leer en línea ↗',pdf:'PDF ↓',book:'Libro completo PDF ↓',issue:'Número completo PDF ↓',empty:'No hay publicaciones que coincidan con la búsqueda.',search:'Buscar publicaciones…',count:'publicaciones'}
};
function render(){
 const w=words[language],query=document.querySelector('#search').value.toLocaleLowerCase();
 const rows=publications.filter(p=>(filter==='all'||p.type===filter)&&(p.title+' '+p.venue+' '+p.year).toLocaleLowerCase().includes(query));
 document.querySelector('#publication-list').innerHTML=rows.map(p=>`<article class="publication"><div class="year">${p.year}</div><div><h3><a href="${p.url}">${p.title}</a></h3><div class="meta">${language==='es'?p.venue.replace('With Andrea','Con Andrea').replace('Coedited with','Coeditado con').replace('Translated by','Traducción de').replace('Translated with','Traducción con').replace(/^In /,'En '):p.venue}</div><div class="links"><span class="badge ${p.access==='paid'?'paid':''}">${w[p.access]}</span><a href="${p.url}">${w.read}</a>${p.pdf?`<a href="${p.pdf}">${w[p.pdfLabel||'pdf']}</a>`:''}</div></div></article>`).join('')||`<p class="empty">${w.empty}</p>`;
 document.querySelector('#count').textContent=`${rows.length} ${rows.length===1?(language==='es'?'publicación':'publication'):w.count}`;
}
function setLanguage(lang){
 language=lang;document.documentElement.lang=lang;
 document.querySelectorAll('[data-en]').forEach(el=>el.innerHTML=el.dataset[lang]);
 document.querySelector('#search').placeholder=words[lang].search;
 document.querySelector('#search').setAttribute('aria-label',words[lang].search.replace('…',''));
 document.querySelector('nav').setAttribute('aria-label',lang==='en'?'Main navigation':'Navegación principal');
 document.querySelector('.filters').setAttribute('aria-label',lang==='en'?'Publication type':'Tipo de publicación');
 for(const code of ['en','es'])document.getElementById(code).setAttribute('aria-pressed',String(lang===code));
 try{localStorage.setItem('profile-language',lang)}catch{}
 render();
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render()}));
document.querySelector('#search').addEventListener('input',render);
for(const code of ['en','es'])document.getElementById(code).addEventListener('click',()=>setLanguage(code));
let saved;try{saved=localStorage.getItem('profile-language')}catch{}
setLanguage(saved==='es'?'es':'en');
