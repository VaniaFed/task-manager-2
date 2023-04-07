!function(){"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),function(){var e;t.g.importScripts&&(e=t.g.location+"");var o=t.g.document;if(!e&&o&&(o.currentScript&&(e=o.currentScript.src),!e)){var s=o.getElementsByTagName("script");s.length&&(e=s[s.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e}();t.p;const e=document.querySelector(".todo-title").childNodes[0],o=t=>{switch(t){case"All":e.textContent="Все задачи";break;case"Active":e.textContent="Активные";break;case"Completed":e.textContent="Завершенные"}},s=document.querySelector(".todo-title__counter"),n=t=>{s.textContent=`(${t})`},c=()=>{"All"===i()?n(P().length):n(z(i()).length)},r=document.querySelectorAll(".filter__item"),a=()=>JSON.parse(localStorage.getItem("filter"))||"All";let l=a();const i=()=>l||a(),d=t=>{l=t,(t=>{localStorage.setItem("filter",JSON.stringify(t))})(t)},u=t=>{t.forEach((t=>{t.classList.remove("filter__item_active")}))},m=t=>{t.classList.add("filter__item_active")},p=document.querySelectorAll(".filter__item"),_=()=>[...p].filter((t=>t.dataset.filter===i()))[0],f=document.querySelector("[data-filter-counter=All]"),h=document.querySelector("[data-filter-counter=Active]"),y=document.querySelector("[data-filter-counter=Completed]"),v=()=>{const t=P(),e=z("Active"),o=z("Completed");f.textContent=String(t.length),h.textContent=String(e.length),y.textContent=String(o.length)},g=document.querySelector(".clear-completed"),k=()=>{z("Completed").length>0?g.classList.remove("hidden"):g.classList.add("hidden")},S=()=>0===P().length&&"All"===i()||0===z("Active").length&&"Active"===i()||0===z("Completed").length&&"Completed"===i(),L=document.querySelector(".empty-state"),b=()=>{L.classList.add("hidden")},E=()=>{L.classList.remove("hidden"),(()=>{const t=document.querySelector(".empty-state__image"),e=document.querySelector(".empty-state__text");switch(i()){case"All":t.classList.remove("hidden"),e.textContent="Как-то пустовато... Добавим новую задачу?";break;case"Active":t.classList.add("hidden"),e.textContent="Активных задач пока нет";break;case"Completed":t.classList.add("hidden"),e.textContent="Вы еще не закончили ни одну задачу"}})()},C=document.querySelector(".clear-completed"),A=document.querySelector(".todo__input-wrapper__icon"),w=()=>A.classList.remove("todo__input-wrapper_icon_shown"),x=document.querySelector(".input"),q=document.querySelector(".todo__input-wrapper__icon"),N=document.querySelector(".input");N.addEventListener("input",(({target:t})=>{t.value.length>0?A.classList.add("todo__input-wrapper_icon_shown"):w()})),N.addEventListener("blur",(()=>{w()}));N.addEventListener("keydown",(t=>{"Escape"!==t.key&&"Tab"!==t.key||(N.value="",N.blur())})),document.addEventListener("keypress",(()=>{N.focus()})),N.focus();const U=document.querySelector(".input"),I=t=>{t.addEventListener("click",(({target:t})=>{const{id:e}=t.closest(".todo-task").dataset;W(e),ot(e),c(),v(),k(),S()&&E(),U.focus()}))},D=t=>{t.addEventListener("click",(({target:e})=>{if(!e.classList.contains("todo-task__remove-btn")){const{id:e}=t.dataset;t.classList.contains("todo-task_completed")?(Z(e),ct(t)):(tt(e),nt(t)),v(),k(),"All"!==i()&&(ot(e),c()),S()&&E()}}))},O=[I,D],T=t=>{if("Enter"===t.key||"blur"===t.type){const e=t.target.value;if(e){const t=K(e);Q(t),"Active"!==i()&&"All"!==i()||(st(t,O),S()||b()),c(),v()}N.value=""}},$=()=>(JSON.parse(localStorage.getItem("tasks"))||[]).filter((t=>(t=>!!t.id&&!!t.status&&!!t.text)(t)));var j={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let B;const J=new Uint8Array(16);function R(){if(!B&&(B="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!B))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return B(J)}const V=[];for(let t=0;t<256;++t)V.push((t+256).toString(16).slice(1));function H(t,e=0){return(V[t[e+0]]+V[t[e+1]]+V[t[e+2]]+V[t[e+3]]+"-"+V[t[e+4]]+V[t[e+5]]+"-"+V[t[e+6]]+V[t[e+7]]+"-"+V[t[e+8]]+V[t[e+9]]+"-"+V[t[e+10]]+V[t[e+11]]+V[t[e+12]]+V[t[e+13]]+V[t[e+14]]+V[t[e+15]]).toLowerCase()}var M=function(t,e,o){if(j.randomUUID&&!e&&!t)return j.randomUUID();const s=(t=t||{}).random||(t.rng||R)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,e){o=o||0;for(let t=0;t<16;++t)e[o+t]=s[t];return e}return H(s)};let F=$()||[];const P=()=>F||$(),z=t=>P().filter((e=>e.status===t))||[],G=(t=[])=>{F=t,(t=>{localStorage.setItem("tasks",JSON.stringify(t))})(t)},K=t=>({id:M(),status:"Active",text:t}),Q=t=>{const e=P()||[];G([...e,t])},W=t=>{const e=P().filter((e=>e.id!==t));G(e)},X=t=>{const e=P().filter((e=>e.status!==t));G(e)},Y=(t,e)=>{const o=P().map((o=>o.id===t?((t,e)=>Object.assign(Object.assign({},t),{status:e}))(o,e):o));G(o)},Z=t=>{Y(t,"Active")},tt=t=>{Y(t,"Completed")},et=document.getElementsByClassName("todo__list")[0],ot=t=>{et.childNodes.forEach((e=>{if(e.dataset.id===t)return e.remove(),0}))},st=(t,e)=>{et.prepend((({id:t,status:e,text:o},s=[])=>{const n=document.createElement("div");return n.classList.add("todo-task"),"Completed"===e&&n.classList.add("todo-task_completed"),n.dataset.id=t,n.dataset.status=e,n.innerHTML=`<div class="checkbox todo-task__checkbox"><input type="checkbox" ${"Completed"===e&&"checked"} class="checkbox__input"> <span class="fake-control fake-control_type_checkbox"></span><p class="task__text">${o}</p><img class="todo-task__remove-btn" src="assets/cross-23.svg" alt="Remove"></div>`,((t,e)=>{e.forEach(((e,o)=>e(t[o])))})([n.querySelector(".todo-task__remove-btn"),n],s),n})(t,e))},nt=t=>{t.classList.add("todo-task_completed"),t.getElementsByClassName("checkbox__input")[0].checked=!0},ct=t=>{t.classList.remove("todo-task_completed"),t.getElementsByClassName("checkbox__input")[0].checked=!1},rt=t=>{const e="All"!==i()?z(i()):P();et.innerHTML="",S()?E():(b(),e.forEach((e=>{st(e,t)})))},at=()=>{[...et.childNodes].forEach((t=>{t.classList.contains("todo-task_completed")&&t.remove()}))};rt(),document.querySelectorAll(".todo-task").forEach((t=>D(t))),document.querySelectorAll(".todo-task__remove-btn").forEach((t=>{I(t)})),N.addEventListener("keypress",(t=>{"Enter"===t.key&&(T(t),w())})),N.addEventListener("blur",(t=>{T(t),w()})),r.forEach((t=>{t.addEventListener("click",(t=>{const e=t.target;if((t=>!t.classList.contains("filter__item_active"))(e)){u(r),m(e);const t=e.dataset.filter;d(t),o(t),c(),rt(O)}}))})),m(_()),v(),o(i()),c(),k(),C.addEventListener("click",(()=>{X("Completed"),at(),c(),v(),k(),S()&&E()})),q.addEventListener("mousedown",(t=>{t.preventDefault(),x.value="",w()}))}();