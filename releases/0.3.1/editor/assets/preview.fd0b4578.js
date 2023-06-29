import"./modulepreload-polyfill.b7f2da20.js";import*as x from"../../wasm-interpreter/slint_wasm_interpreter.js";import y from"../../wasm-interpreter/slint_wasm_interpreter.js";(async function(){await y();let a="";const l=new Map;let i=`
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
`;function g(){const n=document.getElementById("preview");setTimeout(function(){h(i,a,n)},1)}async function h(n,_,c){const p="canvas_"+Math.random().toString(36).slice(2,11),o=document.createElement("canvas");o.width=800,o.height=600,o.id=p,c.innerHTML="",c.appendChild(o);const{component:m,error_string:u}=await x.compile_from_string_with_style(n,_,w,async e=>{const t=l.get(e);if(t===void 0){const f=await(await fetch(e)).text();return l.set(e,f),f}return t});if(u!=""){const e=document.createTextNode(u),t=document.createElement("pre");t.appendChild(e),c.innerHTML="<pre style='color: red; background-color:#fee; margin:0'>"+t.innerHTML+"</pre>"}else{const e=document.getElementById("spinner");e!==null&&e.remove()}m!==void 0&&m.run(p)}const s=new URLSearchParams(window.location.search),d=s.get("snippet"),r=s.get("load_url"),w=s.get("style")||"";d?i=d:r&&(a=r,i=await(await fetch(r)).text()),g()})();
