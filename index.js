import{a as v,S,i as s}from"./assets/vendor-DqB7j7Ix.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const q="51334256-c1710c37c982a8ca30afac428";async function h(r,t={}){const{page:i=1,limit:a=15}=t,{data:e}=await v("https://pixabay.com/api/",{params:{key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:a}});return e}const l=document.querySelector(".load-more-btn"),p=document.querySelector(".gallery");let M=new S(".gallery a",{captions:!0,captionsData:"alt",captionsDelay:250});function g(r){const t=r.map(({webformatURL:i,largeImageURL:a,tags:e,likes:o,views:c,comments:L,downloads:w})=>`
     <li class="gallery-item">
        <a class="gallery-link" href="${a}">
            <img
             class="gallery-image"
             src="${i}"
             alt="${e}"
             width="360"
            />
        </a>
        <div class="image-info">
            <p><b>Likes</b> ${o}</p>
            <p><b>Views</b> ${c}</p>
            <p><b>Comments</b> ${L}</p>
            <p><b>Downloads</b> ${w}</p>
        </div>
    </li>
    `).join("");p.insertAdjacentHTML("beforeend",t),M.refresh()}function P(){p.innerHTML="",window.scrollTo({top:0,behavior:"smooth"})}function B(r){l.addEventListener("click",r)}function y(){document.querySelector(".loader").classList.remove("is-hidden")}function d(){document.querySelector(".loader").classList.add("is-hidden")}function E(){l.classList.remove("is-hidden")}function u(){l.classList.add("is-hidden")}function R(){l.disabled=!0}function T(){l.disabled=!1}const $=document.querySelector(".form"),m=15;let n=1,f=0,b="";$.addEventListener("submit",O);B(x);async function O(r){r.preventDefault(),P(),u(),n=1;const t=r.currentTarget.elements.searchText,i=t.value.trim();if(b=i,!i){s.info({title:"Please!",message:"Enter request!",position:"topRight",timeout:3e3});return}y();try{const a=await h(i,{page:n,limit:m});if(a.hits.length===0){s.error({message:"No images found!",position:"topRight",timeout:3e3}),d();return}f=Math.ceil(a.totalHits/m),g(a.hits),n<f?E():(u(),s.info({message:"That's all we found for your search.",position:"topRight",timeout:3e3})),t.value=""}catch{s.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3}),u()}finally{d()}}async function x(){n++,R(),y();try{const r=await h(b,{page:n,limit:m});g(r.hits),setTimeout(()=>{const t=document.querySelector(".gallery-item");if(t){const i=t.getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}},100),n>=f&&(u(),s.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:3e3}))}catch{s.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3})}finally{T(),d()}}
//# sourceMappingURL=index.js.map
