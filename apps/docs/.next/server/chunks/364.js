exports.id=364,exports.ids=[364],exports.modules={4043:(e,t)=>{"use strict";Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},406:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Image",{enumerable:!0,get:function(){return b}});let n=r(5157),i=r(8301),o=r(997),l=i._(r(6689)),s=n._(r(6405)),a=n._(r(3312)),u=r(220),d=r(314),c=r(3226);r(1849);let f=r(8114),p=n._(r(3237)),g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function m(e,t,r,n,i,o,l){let s=null==e?void 0:e.src;e&&e["data-loaded-src"]!==s&&(e["data-loaded-src"]=s,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&i(!0),null==r?void 0:r.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let n=!1,i=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>n,isPropagationStopped:()=>i,persist:()=>{},preventDefault:()=>{n=!0,t.preventDefault()},stopPropagation:()=>{i=!0,t.stopPropagation()}})}(null==n?void 0:n.current)&&n.current(e)}}))}function h(e){let[t,r]=l.version.split(".",2),n=parseInt(t,10),i=parseInt(r,10);return n>18||18===n&&i>=3?{fetchPriority:e}:{fetchpriority:e}}globalThis.__NEXT_IMAGE_IMPORTED=!0;let y=(0,l.forwardRef)((e,t)=>{let{src:r,srcSet:n,sizes:i,height:s,width:a,decoding:u,className:d,style:c,fetchPriority:f,placeholder:p,loading:g,unoptimized:y,fill:v,onLoadRef:b,onLoadingCompleteRef:_,setBlurComplete:x,setShowAltText:P,sizesInput:w,onLoad:j,onError:S,...C}=e;return(0,o.jsx)("img",{...C,...h(f),loading:g,width:a,height:s,decoding:u,"data-nimg":v?"fill":"1",className:d,style:c,sizes:i,srcSet:n,src:r,ref:(0,l.useCallback)(e=>{t&&("function"==typeof t?t(e):"object"==typeof t&&(t.current=e)),e&&(S&&(e.src=e.src),e.complete&&m(e,p,b,_,x,y,w))},[r,p,b,_,x,S,y,w,t]),onLoad:e=>{m(e.currentTarget,p,b,_,x,y,w)},onError:e=>{P(!0),"empty"!==p&&x(!0),S&&S(e)}})});function v(e){let{isAppRouter:t,imgAttributes:r}=e,n={as:"image",imageSrcSet:r.srcSet,imageSizes:r.sizes,crossOrigin:r.crossOrigin,referrerPolicy:r.referrerPolicy,...h(r.fetchPriority)};return t&&s.default.preload?(s.default.preload(r.src,n),null):(0,o.jsx)(a.default,{children:(0,o.jsx)("link",{rel:"preload",href:r.srcSet?void 0:r.src,...n},"__nimg-"+r.src+r.srcSet+r.sizes)})}let b=(0,l.forwardRef)((e,t)=>{let r=(0,l.useContext)(f.RouterContext),n=(0,l.useContext)(c.ImageConfigContext),i=(0,l.useMemo)(()=>{let e=g||n||d.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r}},[n]),{onLoad:s,onLoadingComplete:a}=e,m=(0,l.useRef)(s);(0,l.useEffect)(()=>{m.current=s},[s]);let h=(0,l.useRef)(a);(0,l.useEffect)(()=>{h.current=a},[a]);let[b,_]=(0,l.useState)(!1),[x,P]=(0,l.useState)(!1),{props:w,meta:j}=(0,u.getImgProps)(e,{defaultLoader:p.default,imgConf:i,blurComplete:b,showAltText:x});return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(y,{...w,unoptimized:j.unoptimized,placeholder:j.placeholder,fill:j.fill,onLoadRef:m,onLoadingCompleteRef:h,setBlurComplete:_,setShowAltText:P,sizesInput:e.sizes,ref:t}),j.priority?(0,o.jsx)(v,{isAppRouter:!r,imgAttributes:w}):null]})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5882:(e,t)=>{"use strict";function r(e){let{ampFirst:t=!1,hybrid:r=!1,hasQuery:n=!1}=void 0===e?{}:e;return t||r&&n}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return r}})},220:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImgProps",{enumerable:!0,get:function(){return s}}),r(1849);let n=r(3957),i=r(314);function o(e){return void 0!==e.default}function l(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function s(e,t){var r;let s,a,u,{src:d,sizes:c,unoptimized:f=!1,priority:p=!1,loading:g,className:m,quality:h,width:y,height:v,fill:b=!1,style:_,overrideSrc:x,onLoad:P,onLoadingComplete:w,placeholder:j="empty",blurDataURL:S,fetchPriority:C,layout:O,objectFit:E,objectPosition:z,lazyBoundary:A,lazyRoot:M,...I}=e,{imgConf:R,showAltText:k,blurComplete:G,defaultLoader:D}=t,T=R||i.imageConfigDefault;if("allSizes"in T)s=T;else{let e=[...T.deviceSizes,...T.imageSizes].sort((e,t)=>e-t),t=T.deviceSizes.sort((e,t)=>e-t);s={...T,allSizes:e,deviceSizes:t}}if(void 0===D)throw Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config");let U=I.loader||D;delete I.loader,delete I.srcSet;let N="__next_img_default"in U;if(N){if("custom"===s.loader)throw Error('Image with src "'+d+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')}else{let e=U;U=t=>{let{config:r,...n}=t;return e(n)}}if(O){"fill"===O&&(b=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[O];e&&(_={..._,...e});let t={responsive:"100vw",fill:"100vw"}[O];t&&!c&&(c=t)}let L="",F=l(y),B=l(v);if("object"==typeof(r=d)&&(o(r)||void 0!==r.src)){let e=o(d)?d.default:d;if(!e.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(e));if(!e.height||!e.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(e));if(a=e.blurWidth,u=e.blurHeight,S=S||e.blurDataURL,L=e.src,!b){if(F||B){if(F&&!B){let t=F/e.width;B=Math.round(e.height*t)}else if(!F&&B){let t=B/e.height;F=Math.round(e.width*t)}}else F=e.width,B=e.height}}let W=!p&&("lazy"===g||void 0===g);(!(d="string"==typeof d?d:L)||d.startsWith("data:")||d.startsWith("blob:"))&&(f=!0,W=!1),s.unoptimized&&(f=!0),N&&d.endsWith(".svg")&&!s.dangerouslyAllowSVG&&(f=!0),p&&(C="high");let V=l(h),H=Object.assign(b?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:E,objectPosition:z}:{},k?{}:{color:"transparent"},_),$=G||"empty"===j?null:"blur"===j?'url("data:image/svg+xml;charset=utf-8,'+(0,n.getImageBlurSvg)({widthInt:F,heightInt:B,blurWidth:a,blurHeight:u,blurDataURL:S||"",objectFit:H.objectFit})+'")':'url("'+j+'")',q=$?{backgroundSize:H.objectFit||"cover",backgroundPosition:H.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:$}:{},J=function(e){let{config:t,src:r,unoptimized:n,width:i,quality:o,sizes:l,loader:s}=e;if(n)return{src:r,srcSet:void 0,sizes:void 0};let{widths:a,kind:u}=function(e,t,r){let{deviceSizes:n,allSizes:i}=e;if(r){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let n;n=e.exec(r);n)t.push(parseInt(n[2]));if(t.length){let e=.01*Math.min(...t);return{widths:i.filter(t=>t>=n[0]*e),kind:"w"}}return{widths:i,kind:"w"}}return"number"!=typeof t?{widths:n,kind:"w"}:{widths:[...new Set([t,2*t].map(e=>i.find(t=>t>=e)||i[i.length-1]))],kind:"x"}}(t,i,l),d=a.length-1;return{sizes:l||"w"!==u?l:"100vw",srcSet:a.map((e,n)=>s({config:t,src:r,quality:o,width:e})+" "+("w"===u?e:n+1)+u).join(", "),src:s({config:t,src:r,quality:o,width:a[d]})}}({config:s,src:d,unoptimized:f,width:F,quality:V,sizes:c,loader:U});return{props:{...I,loading:W?"lazy":g,fetchPriority:C,width:F,height:B,decoding:"async",className:m,style:{...H,...q},sizes:J.sizes,srcSet:J.srcSet,src:x||J.src},meta:{unoptimized:f,priority:p,placeholder:j,fill:b}}}},3312:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return m},defaultHead:function(){return c}});let n=r(5157),i=r(8301),o=r(997),l=i._(r(6689)),s=n._(r(5052)),a=r(9422),u=r(3604),d=r(5882);function c(e){void 0===e&&(e=!1);let t=[(0,o.jsx)("meta",{charSet:"utf-8"})];return e||t.push((0,o.jsx)("meta",{name:"viewport",content:"width=device-width"})),t}function f(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===l.default.Fragment?e.concat(l.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}r(1849);let p=["name","httpEquiv","charSet","itemProp"];function g(e,t){let{inAmpMode:r}=t;return e.reduce(f,[]).reverse().concat(c(r).reverse()).filter(function(){let e=new Set,t=new Set,r=new Set,n={};return i=>{let o=!0,l=!1;if(i.key&&"number"!=typeof i.key&&i.key.indexOf("$")>0){l=!0;let t=i.key.slice(i.key.indexOf("$")+1);e.has(t)?o=!1:e.add(t)}switch(i.type){case"title":case"base":t.has(i.type)?o=!1:t.add(i.type);break;case"meta":for(let e=0,t=p.length;e<t;e++){let t=p[e];if(i.props.hasOwnProperty(t)){if("charSet"===t)r.has(t)?o=!1:r.add(t);else{let e=i.props[t],r=n[t]||new Set;("name"!==t||!l)&&r.has(e)?o=!1:(r.add(e),n[t]=r)}}}}return o}}()).reverse().map((e,t)=>{let n=e.key||t;if(!r&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t={...e.props||{}};return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,l.default.cloneElement(e,t)}return l.default.cloneElement(e,{key:n})})}let m=function(e){let{children:t}=e,r=(0,l.useContext)(a.AmpStateContext),n=(0,l.useContext)(u.HeadManagerContext);return(0,o.jsx)(s.default,{reduceComponentsToState:g,headManager:n,inAmpMode:(0,d.isInAmpMode)(r),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3957:(e,t)=>{"use strict";function r(e){let{widthInt:t,heightInt:r,blurWidth:n,blurHeight:i,blurDataURL:o,objectFit:l}=e,s=n?40*n:t,a=i?40*i:r,u=s&&a?"viewBox='0 0 "+s+" "+a+"'":"";return"%3Csvg xmlns='http://www.w3.org/2000/svg' "+u+"%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='"+(u?"none":"contain"===l?"xMidYMid":"cover"===l?"xMidYMid slice":"none")+"' style='filter: url(%23b);' href='"+o+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},314:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{VALID_LOADERS:function(){return r},imageConfigDefault:function(){return n}});let r=["default","imgix","cloudinary","akamai","custom"],n={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:60,formats:["image/webp"],dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"inline",remotePatterns:[],unoptimized:!1}},5303:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return a},getImageProps:function(){return s}});let n=r(5157),i=r(220),o=r(406),l=n._(r(3237));function s(e){let{props:t}=(0,i.getImgProps)(e,{defaultLoader:l.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let a=o.Image},3237:(e,t)=>{"use strict";function r(e){let{config:t,src:r,width:n,quality:i}=e;return t.path+"?url="+encodeURIComponent(r)+"&w="+n+"&q="+(i||75)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n}}),r.__next_img_default=!0;let n=r},5052:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return l}});let n=r(6689),i=()=>{},o=()=>{};function l(e){var t;let{headManager:r,reduceComponentsToState:l}=e;function s(){if(r&&r.mountedInstances){let t=n.Children.toArray(Array.from(r.mountedInstances).filter(Boolean));r.updateHead(l(t,e))}}return null==r||null==(t=r.mountedInstances)||t.add(e.children),s(),i(()=>{var t;return null==r||null==(t=r.mountedInstances)||t.add(e.children),()=>{var t;null==r||null==(t=r.mountedInstances)||t.delete(e.children)}}),i(()=>(r&&(r._pendingUpdate=s),()=>{r&&(r._pendingUpdate=s)})),o(()=>(r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null),()=>{r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null)})),null}},1849:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},7081:(e,t)=>{"use strict";var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},9422:(e,t,r)=>{"use strict";e.exports=r(8663).vendored.contexts.AmpContext},3226:(e,t,r)=>{"use strict";e.exports=r(8663).vendored.contexts.ImageConfigContext},7998:(e,t,r)=>{e.exports=r(5303)},158:(e,t,r)=>{"use strict";r.d(t,{a:()=>a});var n=r(8496),i=r(7998),o=r.n(i),l=r(6689);let s={img:e=>(0,l.createElement)("object"==typeof e.src?o():"img",e)},a=e=>(0,n.a)({...s,...e})},6516:(e,t,r)=>{"use strict";r.d(t,{c:()=>u});var n=r(997),i=r(2261),o=r(2234);let l=(0,r(6689).createContext)({}),s=l.Provider;l.displayName="SSG";var a=r(158);function u(e,t,r,n){let o=globalThis[i.ud];return o.route=t,o.pageMap=r.pageMap,o.context[t]={Content:e,pageOpts:r,useTOC:n},d}function d({__nextra_pageMap:e=[],__nextra_dynamic_opts:t,...r}){let l=globalThis[i.ud],{Layout:a,themeConfig:u}=l,{route:d,locale:f}=(0,o.t)(),p=l.context[d];if(!p)throw Error(`No content found for the "${d}" route. Please report it as a bug.`);let{pageOpts:g,useTOC:m,Content:h}=p;for(let{route:t,children:r}of e){let e=t.split("/").slice(f?2:1);(function e(t,[r,...n]){for(let i of t)if("children"in i&&r===i.name)return n.length?e(i.children,n):i})(g.pageMap,e).children=r}if(t){let{title:e,frontMatter:r}=t;g={...g,title:e,frontMatter:r}}return(0,n.jsx)(a,{themeConfig:u,pageOpts:g,pageProps:r,children:(0,n.jsx)(s,{value:r,children:(0,n.jsx)(c,{useTOC:m,children:(0,n.jsx)(h,{...r})})})})}function c({children:e,useTOC:t}){let{wrapper:r}=(0,a.a)();return(0,n.jsx)(f,{useTOC:t,wrapper:r,children:e})}function f({children:e,useTOC:t,wrapper:r,...i}){let o=t(i);return r?(0,n.jsx)(r,{toc:o,children:e}):e}}};