(function(){
  var hd=document.querySelector("header"),nav=document.getElementById("nav"),bg=document.getElementById("burger");
  addEventListener("scroll",function(){hd.classList.toggle("on",scrollY>8)},{passive:true});
  function close(){nav.classList.remove("open");bg.setAttribute("aria-expanded","false")}
  bg.addEventListener("click",function(){var o=nav.classList.toggle("open");bg.setAttribute("aria-expanded",o)});
  nav.addEventListener("click",function(e){if(e.target.tagName==="A")close()});
  addEventListener("keydown",function(e){if(e.key==="Escape")close()});
  var still=matchMedia("(prefers-reduced-motion:reduce)").matches;
  document.querySelectorAll("[data-n]").forEach(function(el){
    var n=+el.dataset.n,s=el.dataset.s;
    if(still){el.textContent=n+s;return}
    var t0=performance.now()+500;
    (function f(t){var p=Math.min(Math.max((t-t0)/1400,0),1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)))+(p===1?s:"");if(p<1)requestAnimationFrame(f)})(t0);
  });
  if(!still&&matchMedia("(hover:hover)").matches){
    document.querySelectorAll(".item").forEach(function(c){
      c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform="perspective(700px) rotateY("+x*10+"deg) rotateX("+-y*10+"deg) translateY(-6px)"});
      c.addEventListener("pointerleave",function(){c.style.transform=""});
    });
  }
})();

(function(){
var $=function(q){return document.querySelector(q)},$$=function(q){return Array.prototype.slice.call(document.querySelectorAll(q))};
var still=matchMedia("(prefers-reduced-motion:reduce)").matches,fine=matchMedia("(hover:hover)").matches,root=document.documentElement;
try{var th=localStorage.getItem("th");if(th)root.dataset.theme=th}catch(e){}
$("#tg").onclick=function(){var c=root.dataset.theme||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"),n=c==="dark"?"light":"dark";root.dataset.theme=n;try{localStorage.setItem("th",n)}catch(e){}};
var h=$("#h1");h.setAttribute("aria-label",h.textContent);
h.innerHTML=h.textContent.split(" ").map(function(w,i){return '<span class="w" aria-hidden="true"><span style="--i:'+i+'">'+w+'</span></span>'}).join(" ");
var hd=$("header"),pr=$("#prog"),hero=$("#home"),ly=0,tk=false;
function onS(){var y=scrollY,m=root.scrollHeight-innerHeight;pr.style.transform="scaleX("+(m>0?y/m:0)+")";
hd.classList.toggle("hide",y>ly&&y>240&&!$("#nav").classList.contains("open"));ly=y;if(y<1400)hero.style.setProperty("--sy",y);tk=false}
addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(onS)}},{passive:true});
if(fine&&!still)hero.addEventListener("pointermove",function(e){var r=hero.getBoundingClientRect();
hero.style.setProperty("--gx",e.clientX-r.left+"px");hero.style.setProperty("--gy",e.clientY-r.top+"px");
hero.style.setProperty("--mx",(e.clientX/innerWidth-.5).toFixed(3));hero.style.setProperty("--my",((e.clientY-r.top)/r.height-.5).toFixed(3))});
if(!still){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;el.classList.add("on");io.unobserve(el);
  setTimeout(function(){el.classList.remove("rv","on")},2000+(parseFloat(el.style.getPropertyValue("--d"))||0)*1000)})},{threshold:.15,rootMargin:"0px 0px -6% 0px"});
 $$(".head,.card,.blend,.item,.quote,.split>*,.banner .wrap>*").forEach(function(el){
  el.style.setProperty("--d",(Array.prototype.indexOf.call(el.parentElement.children,el)%4)*.12+"s");el.classList.add("rv");io.observe(el)});
 if(fine)$$(".btn").forEach(function(b){
  b.addEventListener("pointermove",function(e){var r=b.getBoundingClientRect();b.style.transform="translate("+(e.clientX-r.left-r.width/2)*.22+"px,"+(e.clientY-r.top-r.height/2)*.3+"px)"});
  b.addEventListener("pointerleave",function(){b.style.transform=""})});
}
var tr=$(".track");tr.innerHTML+=tr.innerHTML;
var n=0,cart=$("#cart"),cnt=$("#cnt"),ts=$("#toast"),tt;
function toast(t){ts.textContent=t;ts.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){ts.classList.remove("on")},2300)}
function add(name,price,from){n++;cnt.textContent=n;cart.classList.add("has");hd.classList.remove("hide");
 if(!still){var r=from.getBoundingClientRect(),c=cart.getBoundingClientRect(),d=document.createElement("i");d.className="fly";
  d.style.left=r.left+r.width/2-9+"px";d.style.top=r.top+r.height/2-9+"px";document.body.appendChild(d);
  d.animate([{transform:"translate(0,0) scale(1)"},{transform:"translate("+(c.left+c.width/2-r.left-r.width/2)+"px,"+(c.top+c.height/2-r.top-r.height/2)+"px) scale(.3)",opacity:.5}],{duration:750,easing:"cubic-bezier(.5,0,.2,1)"})
  .onfinish=function(){d.remove();cart.classList.remove("bump");void cart.offsetWidth;cart.classList.add("bump")}}
 toast("Додано: "+name+" · "+price)}
$$(".blend .btn").forEach(function(b){b.addEventListener("click",function(e){e.preventDefault();var c=b.closest(".blend");add(c.querySelector("h3").textContent,c.querySelector("b").textContent,b)})});
$$(".item").forEach(function(c){c.tabIndex=0;c.setAttribute("role","button");
 function go(){add(c.querySelector("h3").textContent,c.querySelector("b").textContent,c)}
 c.addEventListener("click",go);c.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}})});
cart.onclick=function(){toast(n?"Позицій у замовленні: "+n:"Додайте каву з меню")};
var R={es:["1 : 2","25–30 с","93 °C","Концентрований смак із щільною кремою. Основа для капучино та флет вайт.","170px","#4a1d0c",0],
fl:["1 : 16","3–4 хв","94 °C","Чистий прозорий смак із яскравими фруктовими нотами.","105px","#8a4a1c",0],
cb:["1 : 8","12–16 год","холодна","Холодне заварювання: м’яка солодкість без гіркоти. Основа для тоніка та айс-лате.","62px","#b26a2e",1]};
var box=$("#rbox"),tabs=$$("#ritual [role=tab]");
tabs.forEach(function(t){t.onclick=function(){tabs.forEach(function(x){x.setAttribute("aria-selected",x===t)});var d=R[t.dataset.k];
 box.style.setProperty("--y",d[4]);box.style.setProperty("--liq",d[5]);box.classList.toggle("ice",!!d[6]);
 ["ra","rt","rw","rd"].forEach(function(id,i){$("#"+id).textContent=d[i]});var s=$("#spec");s.classList.remove("sw");void s.offsetWidth;s.classList.add("sw")}});
})();
