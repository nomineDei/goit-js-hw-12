import{a as v,S as q,i as c}from"./assets/vendor-DqB7j7Ix.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const S="51334256-c1710c37c982a8ca30afac428";async function f(a,t=1,r=15){const{data:i}=await v("https://pixabay.com/api/",{params:{key:S,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:r}});return i}const l=document.querySelector(".load-more-btn"),p=document.querySelector(".gallery");let P=new q(".gallery a",{captions:!0,captionsData:"alt",captionsDelay:250});function y(a){const t=a.map(({webformatURL:r,largeImageURL:i,tags:e,likes:o,views:n,comments:L,downloads:w})=>`
     <li class="gallery-item">
        <a class="gallery-link" href="${i}">
            <img
             class="gallery-image"
             src="${r}"
             alt="${e}"
             width="360"
            />
        </a>
        <div class="image-info">
            <p><b>Likes</b> ${o}</p>
            <p><b>Views</b> ${n}</p>
            <p><b>Comments</b> ${L}</p>
            <p><b>Downloads</b> ${w}</p>
        </div>
    </li>
    `).join("");p.insertAdjacentHTML("beforeend",t),P.refresh()}function M(){p.innerHTML="",window.scrollTo({top:0,behavior:"smooth"})}function g(){document.querySelector(".loader").classList.remove("is-hidden")}function d(){document.querySelector(".loader").classList.add("is-hidden")}function T(){l.classList.remove("is-hidden")}function u(){l.classList.add("is-hidden")}const $=document.querySelector(".form");let s=1,m=15,h=0,b="";$.addEventListener("submit",B);l.addEventListener("click",E);async function B(a){M(),a.preventDefault(),g(),s=1;const t=a.currentTarget.elements.searchText,r=t.value.trim();if(b=r,!r){c.info({title:"Please!",message:"Enter request!",position:"topRight",timeout:3e3}),t.value="",d(),u();return}try{const i=await f(r,s,m);if(i.hits.length===0)throw new Error("No result");y(i.hits),h=Math.ceil(i.totalHits/m),s<h?T():(u(),c.info({message:"That's all we found for your search.",position:"topRight",timeout:3e3}))}catch{c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3}),u()}t.value="",d()}async function E(){s++,l.disabled=!0,g();try{const a=await f(b,s,m);y(a.hits),setTimeout(()=>{const t=document.querySelector(".gallery-item");if(t){const r=t.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}},100),s>=h&&(u(),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:3e3}))}catch{c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3})}finally{l.disabled=!1}d()}
//# sourceMappingURL=index.js.map
