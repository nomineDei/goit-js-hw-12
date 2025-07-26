import{a as w,S as v,i as l}from"./assets/vendor-DqB7j7Ix.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const q="51334256-c1710c37c982a8ca30afac428";async function h(a,t=1,o=15){const{data:i}=await w("https://pixabay.com/api/",{params:{key:q,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:o}});return i}const c=document.querySelector(".load-more-btn"),f=document.querySelector(".gallery");let S=new v(".gallery a",{captions:!0,captionsData:"alt",captionsDelay:250});function p(a){const t=a.map(({webformatURL:o,largeImageURL:i,tags:e,likes:r,views:n,comments:b,downloads:L})=>`
     <li class="gallery-item">
        <a class="gallery-link" href="${i}">
            <img
             class="gallery-image"
             src="${o}"
             alt="${e}"
             width="360"
            />
        </a>
        <div class="image-info">
            <p><b>Likes</b> ${r}</p>
            <p><b>Views</b> ${n}</p>
            <p><b>Comments</b> ${b}</p>
            <p><b>Downloads</b> ${L}</p>
        </div>
    </li>
    `).join("");f.insertAdjacentHTML("beforeend",t),S.refresh()}function P(){f.innerHTML="",window.scrollTo({top:0,behavior:"smooth"})}function M(){document.querySelector(".loader").classList.remove("is-hidden")}function y(){document.querySelector(".loader").classList.add("is-hidden")}function T(){c.classList.remove("is-hidden")}function u(){c.classList.add("is-hidden")}const $=document.querySelector(".form");let s=1,d=15,m=0,g="";$.addEventListener("submit",B);c.addEventListener("click",E);async function B(a){P(),a.preventDefault(),s=1;const t=a.currentTarget.elements.searchText,o=t.value.trim();if(g=o,!o){l.info({title:"Please!",message:"Enter request!",position:"topRight",timeout:3e3}),t.value="",y(),u();return}await h(o,s,d).then(i=>{if(i.hits.length===0)throw new Error("No result");p(i.hits),m=Math.ceil(i.totalHits/d),s<m&&T()}).catch(i=>{l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3}),u()}).finally(()=>{t.value=""})}async function E(){s++,c.disabled=!0,M();try{const a=await h(g,s,d);p(a.hits),setTimeout(()=>{const t=document.querySelector(".gallery-item");if(t){const o=t.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}},100),s>=m&&(u(),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:3e3}))}catch{l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3})}finally{c.disabled=!1,y()}}
//# sourceMappingURL=index.js.map
