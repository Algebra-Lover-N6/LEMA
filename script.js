const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.main-nav');
if(toggle){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open');});}
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));

const tabs=[...document.querySelectorAll('.day-tab')];
const panels=[...document.querySelectorAll('.schedule-day')];
tabs.forEach(tab=>tab.addEventListener('click',()=>{
  tabs.forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});
  panels.forEach(p=>{p.classList.remove('active');p.hidden=true});
  tab.classList.add('active');tab.setAttribute('aria-selected','true');
  const panel=document.querySelector('[data-panel="'+tab.dataset.day+'"]');
  if(panel){panel.hidden=false;panel.classList.add('active')}
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const countdown=document.querySelector('[data-countdown]');
if(countdown){
  const target=new Date(countdown.dataset.countdown).getTime();
  const tick=()=>{
    const diff=Math.max(0,target-Date.now());
    const d=Math.floor(diff/86400000);
    const h=Math.floor((diff%86400000)/3600000);
    const m=Math.floor((diff%3600000)/60000);
    countdown.querySelector('[data-days]').textContent=d;
    countdown.querySelector('[data-hours]').textContent=String(h).padStart(2,'0');
    countdown.querySelector('[data-minutes]').textContent=String(m).padStart(2,'0');
    if(diff===0) countdown.innerHTML='<div style="grid-column:1/-1"><strong>¡L.E.M.A. 2026!</strong><span>El encuentro ha comenzado</span></div>';
  };
  tick();setInterval(tick,60000);
}
