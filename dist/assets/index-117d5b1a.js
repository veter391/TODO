(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();class l{constructor(t){this.db=[{id:1,text:"Run tasker.js",completed:!0},{id:2,text:"Learn javascript",completed:!1}],this.parent=document==null?void 0:document.querySelector(t),this.list=document.createElement("ul"),this.form=document.createElement("form"),this.ID=this.db.length+1}newToDo(){const t={id:++this.ID,text:this.form.querySelector("input").value.replace(/[<,>]/g,""),completed:!1};this.db=[...this.db,t],this.form.querySelector("input").value="",this.render()}deleteToDo(t){this.db=[...this.db].filter((i,s)=>s!==+t),this.render()}start(){this.list.classList.add("task-list-part"),this.form.classList.add("task-form-part"),this.form.innerHTML=`
      <input class="task-input-part" type="text">
      <button class="task-brn-search-part">+</button>
    `,this.parent.appendChild(this.form),this.parent.appendChild(this.list),this.form.addEventListener("submit",t=>{t.preventDefault(),this.form.querySelector("input").value.trim()?(this.form.querySelector("input").style.cssText="color:inherit; border-color:transparent;",this.newToDo()):this.form.querySelector("input").style.cssText="color:red; border-color:red;"}),this.list.addEventListener("click",t=>{t.target.getAttribute("data-id")&&this.deleteToDo(t.target.getAttribute("data-id")),t.target.getAttribute("data-checkId")&&(this.db.map((i,s)=>{s===+t.target.getAttribute("data-checkId")&&(i.completed=!i.completed)}),this.render())}),localStorage.getItem("taskDB")&&(this.db=JSON.parse(localStorage.getItem("taskDB"))),this.render()}render(){this.list.innerHTML="";for(const t in this.db)this.list.innerHTML+=`
        <li class="task-item-part">
          <label class="${this.db[t].completed?"completed":""} task-label-part">
            <input data-checkId="${t}" ${this.db[t].completed?"checked":""} class="task-checkbox-part" type="checkbox">
            <span class="task-span-part">${this.db[t].text}</span>
          </label>
          <button data-id="${t}" class="task-brn-delete-part">+</button>
        </li>
      `;localStorage.removeItem("taskDB"),localStorage.setItem("taskDB",JSON.stringify(this.db))}}new l(".parent").start();
