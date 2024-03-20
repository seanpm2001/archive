import"./modulepreload-polyfill-3cfb730f.js";import*as x from"../../wasm-interpreter/slint_wasm_interpreter.js";import v from"../../wasm-interpreter/slint_wasm_interpreter.js";(async function(){await v();let a="";const l=new Map;let i=`
import { SpinBox, Button, CheckBox, Slider, GroupBox } from "std-widgets.slint";
export Demo := Window {
    width:  300px;   // Width in logical pixels. All 'px' units are automatically scaled with screen resolution.
    height: 300px;
    t:= Text {
        text: "Hello World";
        font-size: 24px;
    }
    Image {
        y: 50px;
        source: @image-url("https://slint-ui.com/logo/slint-logo-full-light.svg");
    }
}
`;function g(){const n=document.getElementById("preview");setTimeout(function(){w(i,a,n)},1)}async function w(n,h,c){const d="canvas_"+Math.random().toString(36).slice(2,11),o=document.createElement("canvas");o.width=800,o.height=600,o.id=d,c.innerHTML="",c.appendChild(o);const{component:m,error_string:u}=await x.compile_from_string_with_style(n,h,_,async e=>{const t=l.get(e);if(t===void 0){const f=await(await fetch(e)).text();return l.set(e,f),f}return t});if(u!=""){const e=document.createTextNode(u),t=document.createElement("pre");t.appendChild(e),c.innerHTML="<pre style='color: red; background-color:#fee; margin:0'>"+t.innerHTML+"</pre>"}else{const e=document.getElementById("spinner");e!==null&&e.remove()}m!==void 0&&m.run(d)}const s=new URLSearchParams(window.location.search),p=s.get("snippet"),r=s.get("load_url"),_=s.get("style")||"";p?i=p:r&&(a=r,i=await(await fetch(r)).text()),g()})();
