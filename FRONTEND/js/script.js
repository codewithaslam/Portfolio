// ---------- TYPEWRITER ----------
const text = "Aspiring AI Developer";
let i = 0;
(function type(){
  if(i < text.length){
    document.getElementById("typing").textContent += text[i++];
    setTimeout(type, 45);
  }
})();

// ---------- THEME (PERSIST) ----------
const toggle = document.getElementById("themeToggle");
const saved = localStorage.getItem("theme");
if(saved === "light") document.body.classList.add("light");

toggle.onclick = () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
};

// ---------- CURSOR ----------
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e=>{
  cursor.style.left = e.clientX + "px";
  cursor.style.top  = e.clientY + "px";
});

// ---------- TILT (GPU-FRIENDLY) ----------
document.querySelectorAll(".tilt").forEach(card=>{
  let raf = null;
  card.addEventListener("mousemove", e=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(()=>{
      card.style.transform = `rotateX(${(-y*8).toFixed(2)}deg) rotateY(${(x*10).toFixed(2)}deg)`;
    });
  });
  card.addEventListener("mouseleave", ()=>{
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});

// ---------- SCROLLSPY ----------
const links = document.querySelectorAll("[data-link]");
const sections = [...links].map(a => document.querySelector(a.getAttribute("href")));
window.addEventListener("scroll", ()=>{
  let index = sections.length - 1;
  for(let i=0;i<sections.length;i++){
    if(window.scrollY < sections[i].offsetTop - 120){ index = i - 1; break; }
  }
  links.forEach(l=>l.classList.remove("active"));
  if(index >= 0) links[index].classList.add("active");
});

// ---------- COMMAND PALETTE (⌘K / Ctrl+K) ----------
const cmdk = document.getElementById("cmdk");
const input = document.getElementById("cmdkInput");
const list  = document.getElementById("cmdkList");

const items = [
  {label:"Home", href:"#home"},
  {label:"About", href:"#about"},
  {label:"Skills", href:"#skills"},
  {label:"Projects", href:"#projects"},
  {label:"Contact", href:"#contact"}
];

function openCmdk(){
  cmdk.classList.remove("hidden");
  input.value = "";
  render(items);
  input.focus();
}
function closeCmdk(){ cmdk.classList.add("hidden"); }

function render(arr){
  list.innerHTML = "";
  arr.forEach(i=>{
    const li = document.createElement("li");
    li.textContent = i.label;
    li.onclick = ()=>{ location.hash = i.href; closeCmdk(); };
    list.appendChild(li);
  });
}

document.addEventListener("keydown", e=>{
  if((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k"){
    e.preventDefault(); openCmdk();
  }
  if(e.key === "Escape") closeCmdk();
});

input.addEventListener("input", ()=>{
  const q = input.value.toLowerCase();
  render(items.filter(i => i.label.toLowerCase().includes(q)));
});

// ---------- CONTACT (DEMO) ----------
document.getElementById("contactForm").addEventListener("submit", e=>{
  e.preventDefault();
  alert("Message sent!");
});