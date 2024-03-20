import{_ as x,c as y}from"./slint_wasm_interpreter-bd523307.js";(async function(){await x();let a="";const l=new Map;let s=`
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
        source: @image-url("https://slint.dev/logo/slint-logo-full-light.svg");
    }
}
`;function _(){const n=document.getElementById("preview");setTimeout(function(){f(s,a,n)},1)}async function f(n,w,c){const p="canvas_"+Math.random().toString(36).slice(2,11),o=document.createElement("canvas");o.width=800,o.height=600,o.id=p,c.innerHTML="",c.appendChild(o);const{component:m,error_string:u}=await y(n,w,h,async e=>{const t=l.get(e);if(t===void 0){const g=await(await fetch(e)).text();return l.set(e,g),g}return t});if(u!=""){const e=document.createTextNode(u),t=document.createElement("pre");t.appendChild(e),c.innerHTML="<pre style='color: red; background-color:#fee; margin:0'>"+t.innerHTML+"</pre>"}else{const e=document.getElementById("spinner");e!==null&&e.remove()}m!==void 0&&m.run(p)}const i=new URLSearchParams(window.location.search),d=i.get("snippet"),r=i.get("load_url"),h=i.get("style")||"";d?s=d:r&&(a=r,s=await(await fetch(r)).text()),_()})();
