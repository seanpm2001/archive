import"./modulepreload-polyfill.b7f2da20.js";import*as h from"../../wasm-interpreter/sixtyfps_wasm_interpreter.js";import y from"../../wasm-interpreter/sixtyfps_wasm_interpreter.js";(async function(){await y();var l="",p=new Map;let n=`
import { SpinBox, Button, CheckBox, Slider, GroupBox } from "sixtyfps_widgets.60";
export Demo := Window {
    width:  300px;   // Width in logical pixels. All 'px' units are automatically scaled with screen resolution.
    height: 300px;
    t:= Text {
        text: "Hello World";
        font-size: 24px;
    }
    Image {
        y: 50px;
        source: @image-url("https://sixtyfps.io/resources/logo_scaled.png");
    }
}
`;function _(){let r=document.getElementById("preview");setTimeout(function(){w(n,l,r)},1)}async function w(r,g,a){let d="canvas_"+Math.random().toString(36).substr(2,9),o=document.createElement("canvas");o.width=800,o.height=600,o.id=d,a.innerHTML="",a.appendChild(o);let{component:m,error_string:u}=await h.compile_from_string_with_style(r,g,x,async e=>{let t=p.get(e);if(t===void 0){let f=await(await fetch(e)).text();return p.set(e,f),f}return t});if(u!=""){let e=document.createTextNode(u),t=document.createElement("pre");t.appendChild(e),a.innerHTML="<pre style='color: red; background-color:#fee; margin:0'>"+t.innerHTML+"</pre>"}else document.getElementById("spinner").remove();m!==void 0&&m.run(d)}const i=new URLSearchParams(window.location.search),c=i.get("snippet"),s=i.get("load_url"),x=i.get("style")||"";c?n=c:s&&(l=s,n=await(await fetch(s)).text()),_()})();
