const r=self,a=[];function c(e){for(const[t,n]of a.entries())if(e.startsWith(n[0]))return[n[0],n[1],t];return["",null,-1]}function d(e,t){return new Promise(n=>{const s=new MessageChannel;s.port1.onmessage=i=>{s.port1.close(),n(i.data)},e.postMessage({type:"MapUrl",url:t},[s.port2])})}r.addEventListener("install",e=>{r.skipWaiting()});r.addEventListener("activate",e=>{e.waitUntil(r.clients.claim())});r.addEventListener("message",e=>{if(e.data.type==="EditorOpened"){const t=e.data.url_prefix;t!=null&&a.push([t,e.ports[0]])}else console.error("Service Worker: Got an unexpected message",e.data)});r.addEventListener("fetch",e=>{const t=e.request.url,[n,s,i]=c(t);if(s!=null){const l=d(s,t).then(o=>fetch(o)).catch(o=>{throw delete a[i],o});e.respondWith(l)}});