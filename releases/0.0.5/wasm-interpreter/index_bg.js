import * as wasm from './index_bg.wasm';

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachegetFloat64Memory0 = null;
function getFloat64Memory0() {
    if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachegetFloat64Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_26(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h1a54cc4735bea04b(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_29(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hcbdc531a689b2ee8(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_32(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h9ca171ad494024c9(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_35(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h6c915ba91cad2854(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_38(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbe311bedb0f652a9(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_41(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbc86fe490b142faa(arg0, arg1);
}

function __wbg_adapter_44(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hca0e877634243db0(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_47(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hebd1800524f9ebcd(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_50(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4e20958b42b45499(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_53(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hc18ba0a3af9d7937(arg0, arg1, addHeapObject(arg2));
}

function handleError(f) {
    return function () {
        try {
            return f.apply(this, arguments);

        } catch (e) {
            wasm.__wbindgen_exn_store(addHeapObject(e));
        }
    };
}
function __wbg_adapter_70(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h436083ec99751b68(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
* Compile the content of a string.
*
* Returns a promise to a compiled component which can be run with ".run()"
* @param {string} source
* @param {string} base_url
* @param {Function | undefined} optional_resolve_import_callback
* @param {Function | undefined} optional_import_callback
* @returns {any}
*/
export function compile_from_string(source, base_url, optional_resolve_import_callback, optional_import_callback) {
    var ptr0 = passStringToWasm0(source, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(base_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.compile_from_string(ptr0, len0, ptr1, len1, isLikeNone(optional_resolve_import_callback) ? 0 : addHeapObject(optional_resolve_import_callback), isLikeNone(optional_import_callback) ? 0 : addHeapObject(optional_import_callback));
    return takeObject(ret);
}

let cachegetFloat32Memory0 = null;
function getFloat32Memory0() {
    if (cachegetFloat32Memory0 === null || cachegetFloat32Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat32Memory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachegetFloat32Memory0;
}

function getArrayF32FromWasm0(ptr, len) {
    return getFloat32Memory0().subarray(ptr / 4, ptr / 4 + len);
}
/**
*/
export class WrappedCompiledComp {

    static __wrap(ptr) {
        const obj = Object.create(WrappedCompiledComp.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_wrappedcompiledcomp_free(ptr);
    }
    /**
    * Run this compiled component in a canvas.
    * The HTML must contains a <canvas> element with the given `canvas_id`
    * where the result is gonna be rendered
    * @param {string} canvas_id
    */
    run(canvas_id) {
        var ptr0 = passStringToWasm0(canvas_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.wrappedcompiledcomp_run(this.ptr, ptr0, len0);
    }
}

export const __wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

export const __wbg_then_3d9a54b0affdf26d = function(arg0, arg1, arg2) {
    var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
};

export const __wbindgen_string_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    var ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export const __wbg_new_1abc33d4f9ba3e80 = function() {
    var ret = new Array();
    return addHeapObject(ret);
};

export const __wbg_new_dc5b27cfd2149b8f = function() {
    var ret = new Object();
    return addHeapObject(ret);
};

export const __wbindgen_number_new = function(arg0) {
    var ret = arg0;
    return addHeapObject(ret);
};

export const __wbg_push_44968dcdf4cfbb43 = function(arg0, arg1) {
    var ret = getObject(arg0).push(getObject(arg1));
    return ret;
};

export const __wbg_new_f59cbefd64f2876f = function(arg0, arg1) {
    var ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export const __wbindgen_object_clone_ref = function(arg0) {
    var ret = getObject(arg0);
    return addHeapObject(ret);
};

export const __wbg_wrappedcompiledcomp_new = function(arg0) {
    var ret = WrappedCompiledComp.__wrap(arg0);
    return addHeapObject(ret);
};

export const __wbg_getContext_11f724663952b3c1 = handleError(function(arg0, arg1, arg2, arg3) {
    var ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2), getObject(arg3));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
});

export const __wbg_instanceof_WebGlRenderingContext_5f4db52925ef5603 = function(arg0) {
    var ret = getObject(arg0) instanceof WebGLRenderingContext;
    return ret;
};

export const __wbg_createProgram_7f512be46ef2090e = function(arg0) {
    var ret = getObject(arg0).createProgram();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_createProgram_19eb97f37bc7d978 = function(arg0) {
    var ret = getObject(arg0).createProgram();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_attachShader_435c833d3ca8f564 = function(arg0, arg1, arg2) {
    getObject(arg0).attachShader(getObject(arg1), getObject(arg2));
};

export const __wbg_attachShader_b10f3a6e94e2e190 = function(arg0, arg1, arg2) {
    getObject(arg0).attachShader(getObject(arg1), getObject(arg2));
};

export const __wbg_bindAttribLocation_074f9fa5504af0c7 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).bindAttribLocation(getObject(arg1), arg2 >>> 0, getStringFromWasm0(arg3, arg4));
};

export const __wbg_bindAttribLocation_cf003aad4fcdc520 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).bindAttribLocation(getObject(arg1), arg2 >>> 0, getStringFromWasm0(arg3, arg4));
};

export const __wbg_linkProgram_8bc3021aa40f0948 = function(arg0, arg1) {
    getObject(arg0).linkProgram(getObject(arg1));
};

export const __wbg_linkProgram_dc8c83ec66322d5e = function(arg0, arg1) {
    getObject(arg0).linkProgram(getObject(arg1));
};

export const __wbg_getProgramParameter_4e13e6daab89623e = function(arg0, arg1, arg2) {
    var ret = getObject(arg0).getProgramParameter(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
};

export const __wbg_getProgramParameter_f1068d691eca8e1f = function(arg0, arg1, arg2) {
    var ret = getObject(arg0).getProgramParameter(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
};

export const __wbindgen_boolean_get = function(arg0) {
    const v = getObject(arg0);
    var ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
};

export const __wbg_detachShader_2f64caf6e33f8a82 = function(arg0, arg1, arg2) {
    getObject(arg0).detachShader(getObject(arg1), getObject(arg2));
};

export const __wbg_detachShader_6a0744139188a37c = function(arg0, arg1, arg2) {
    getObject(arg0).detachShader(getObject(arg1), getObject(arg2));
};

export const __wbg_getProgramInfoLog_41d3ebfde4246fd9 = function(arg0, arg1, arg2) {
    var ret = getObject(arg1).getProgramInfoLog(getObject(arg2));
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbg_getProgramInfoLog_efa3ee9c01a6c5d6 = function(arg0, arg1, arg2) {
    var ret = getObject(arg1).getProgramInfoLog(getObject(arg2));
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbg_createVertexArray_51acb43e08d168a2 = function(arg0) {
    var ret = getObject(arg0).createVertexArray();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_createVertexArrayOES_8119c8c9653537fa = function(arg0) {
    var ret = getObject(arg0).createVertexArrayOES();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_createBuffer_34aca55d34936cb7 = function(arg0) {
    var ret = getObject(arg0).createBuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_createBuffer_bad9101b9d0e33e7 = function(arg0) {
    var ret = getObject(arg0).createBuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_getError_210c9ea9291bc6a2 = function(arg0) {
    var ret = getObject(arg0).getError();
    return ret;
};

export const __wbg_getError_091fa8c22e01cfae = function(arg0) {
    var ret = getObject(arg0).getError();
    return ret;
};

export const __wbg_createTexture_2e23958a641af64b = function(arg0) {
    var ret = getObject(arg0).createTexture();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_createTexture_3008adb3eb4b8e63 = function(arg0) {
    var ret = getObject(arg0).createTexture();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_deleteTexture_25d82ac6b74470b3 = function(arg0, arg1) {
    getObject(arg0).deleteTexture(getObject(arg1));
};

export const __wbg_deleteTexture_731b93b5cc5af47d = function(arg0, arg1) {
    getObject(arg0).deleteTexture(getObject(arg1));
};

export const __wbg_width_e2288c6b7927b379 = function(arg0) {
    var ret = getObject(arg0).width;
    return ret;
};

export const __wbg_height_3478f03a55caa6c1 = function(arg0) {
    var ret = getObject(arg0).height;
    return ret;
};

export const __wbg_deleteFramebuffer_869e81cf43a711d4 = function(arg0, arg1) {
    getObject(arg0).deleteFramebuffer(getObject(arg1));
};

export const __wbg_deleteFramebuffer_b830c1d342d4e950 = function(arg0, arg1) {
    getObject(arg0).deleteFramebuffer(getObject(arg1));
};

export const __wbg_deleteRenderbuffer_690c8fa812c08bdf = function(arg0, arg1) {
    getObject(arg0).deleteRenderbuffer(getObject(arg1));
};

export const __wbg_deleteRenderbuffer_105165d29bad9c22 = function(arg0, arg1) {
    getObject(arg0).deleteRenderbuffer(getObject(arg1));
};

export const __wbg_createShader_c08686de7661eff0 = function(arg0, arg1) {
    var ret = getObject(arg0).createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_createShader_16e76257819c682b = function(arg0, arg1) {
    var ret = getObject(arg0).createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_shaderSource_2dcc20f3552ae568 = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).shaderSource(getObject(arg1), getStringFromWasm0(arg2, arg3));
};

export const __wbg_shaderSource_d8cce8917aa7df4a = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).shaderSource(getObject(arg1), getStringFromWasm0(arg2, arg3));
};

export const __wbg_compileShader_d9cf97450ba46b86 = function(arg0, arg1) {
    getObject(arg0).compileShader(getObject(arg1));
};

export const __wbg_compileShader_406e03b35834cb67 = function(arg0, arg1) {
    getObject(arg0).compileShader(getObject(arg1));
};

export const __wbg_getShaderParameter_05fa9af4df7ed8dd = function(arg0, arg1, arg2) {
    var ret = getObject(arg0).getShaderParameter(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
};

export const __wbg_getShaderParameter_f330a1f677514bd0 = function(arg0, arg1, arg2) {
    var ret = getObject(arg0).getShaderParameter(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
};

export const __wbg_getShaderInfoLog_c9bbabb140e03d0f = function(arg0, arg1, arg2) {
    var ret = getObject(arg1).getShaderInfoLog(getObject(arg2));
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbg_getShaderInfoLog_c942a4f3fa1537cf = function(arg0, arg1, arg2) {
    var ret = getObject(arg1).getShaderInfoLog(getObject(arg2));
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbg_getUniformLocation_39124d965f679564 = function(arg0, arg1, arg2, arg3) {
    var ret = getObject(arg0).getUniformLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_getUniformLocation_e97e7d6bc3036b6d = function(arg0, arg1, arg2, arg3) {
    var ret = getObject(arg0).getUniformLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_deleteShader_9cba962f67fc9740 = function(arg0, arg1) {
    getObject(arg0).deleteShader(getObject(arg1));
};

export const __wbg_deleteShader_913f6c4e5843248d = function(arg0, arg1) {
    getObject(arg0).deleteShader(getObject(arg1));
};

export const __wbg_deleteProgram_e7ea9d6ced585bad = function(arg0, arg1) {
    getObject(arg0).deleteProgram(getObject(arg1));
};

export const __wbg_deleteProgram_4954a8bcd2e3c6b9 = function(arg0, arg1) {
    getObject(arg0).deleteProgram(getObject(arg1));
};

export const __wbg_useProgram_e1334a2752ff3d80 = function(arg0, arg1) {
    getObject(arg0).useProgram(getObject(arg1));
};

export const __wbg_useProgram_5a83ef734fbc034b = function(arg0, arg1) {
    getObject(arg0).useProgram(getObject(arg1));
};

export const __wbg_bindBuffer_b45faf4508424c2a = function(arg0, arg1, arg2) {
    getObject(arg0).bindBuffer(arg1 >>> 0, getObject(arg2));
};

export const __wbg_bindBuffer_cdca8a246dc033e5 = function(arg0, arg1, arg2) {
    getObject(arg0).bindBuffer(arg1 >>> 0, getObject(arg2));
};

export const __wbg_bindFramebuffer_8e18497643e2e97b = function(arg0, arg1, arg2) {
    getObject(arg0).bindFramebuffer(arg1 >>> 0, getObject(arg2));
};

export const __wbg_bindFramebuffer_3849179fb37471ea = function(arg0, arg1, arg2) {
    getObject(arg0).bindFramebuffer(arg1 >>> 0, getObject(arg2));
};

export const __wbg_bindRenderbuffer_a31400499bc3441a = function(arg0, arg1, arg2) {
    getObject(arg0).bindRenderbuffer(arg1 >>> 0, getObject(arg2));
};

export const __wbg_bindRenderbuffer_13574cbc2d2443ca = function(arg0, arg1, arg2) {
    getObject(arg0).bindRenderbuffer(arg1 >>> 0, getObject(arg2));
};

export const __wbg_bindVertexArrayOES_b2d1a15566a7fa7e = function(arg0, arg1) {
    getObject(arg0).bindVertexArrayOES(getObject(arg1));
};

export const __wbg_bindVertexArray_1c571a32554cb96d = function(arg0, arg1) {
    getObject(arg0).bindVertexArray(getObject(arg1));
};

export const __wbg_pixelStorei_2f4fcd552ae27dd2 = function(arg0, arg1, arg2) {
    getObject(arg0).pixelStorei(arg1 >>> 0, arg2);
};

export const __wbg_pixelStorei_fca9dd56da4e09ed = function(arg0, arg1, arg2) {
    getObject(arg0).pixelStorei(arg1 >>> 0, arg2);
};

export const __wbg_checkFramebufferStatus_866a6fc349d76546 = function(arg0, arg1) {
    var ret = getObject(arg0).checkFramebufferStatus(arg1 >>> 0);
    return ret;
};

export const __wbg_checkFramebufferStatus_fbf278c7159c6747 = function(arg0, arg1) {
    var ret = getObject(arg0).checkFramebufferStatus(arg1 >>> 0);
    return ret;
};

export const __wbg_disable_5a475e28b2154fa9 = function(arg0, arg1) {
    getObject(arg0).disable(arg1 >>> 0);
};

export const __wbg_disable_b943997108c3320a = function(arg0, arg1) {
    getObject(arg0).disable(arg1 >>> 0);
};

export const __wbg_disableVertexAttribArray_87802f3a7704cd13 = function(arg0, arg1) {
    getObject(arg0).disableVertexAttribArray(arg1 >>> 0);
};

export const __wbg_disableVertexAttribArray_62687ba4c9b7d4cc = function(arg0, arg1) {
    getObject(arg0).disableVertexAttribArray(arg1 >>> 0);
};

export const __wbg_drawArrays_c98946b902ad6be5 = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).drawArrays(arg1 >>> 0, arg2, arg3);
};

export const __wbg_drawArrays_903c4ac52018b0da = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).drawArrays(arg1 >>> 0, arg2, arg3);
};

export const __wbg_enable_93767887882fa986 = function(arg0, arg1) {
    getObject(arg0).enable(arg1 >>> 0);
};

export const __wbg_enable_98a346f4f5f740b7 = function(arg0, arg1) {
    getObject(arg0).enable(arg1 >>> 0);
};

export const __wbg_enableVertexAttribArray_bb2bba2941e17b92 = function(arg0, arg1) {
    getObject(arg0).enableVertexAttribArray(arg1 >>> 0);
};

export const __wbg_enableVertexAttribArray_c7db971134fe1d3c = function(arg0, arg1) {
    getObject(arg0).enableVertexAttribArray(arg1 >>> 0);
};

export const __wbg_framebufferRenderbuffer_02b3d8bbde324f93 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4));
};

export const __wbg_framebufferRenderbuffer_16c6e16d62c25437 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4));
};

export const __wbg_framebufferTexture2D_0bb40f642fbd0309 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4), arg5);
};

export const __wbg_framebufferTexture2D_b7533fafdee7f41f = function(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4), arg5);
};

export const __wbg_renderbufferStorage_59c3f2b9a7c56723 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
};

export const __wbg_renderbufferStorage_d4b86c886edf98b6 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
};

export const __wbg_generateMipmap_1bfea84cda0b5c28 = function(arg0, arg1) {
    getObject(arg0).generateMipmap(arg1 >>> 0);
};

export const __wbg_generateMipmap_ff0cba00f6b3d1fa = function(arg0, arg1) {
    getObject(arg0).generateMipmap(arg1 >>> 0);
};

export const __wbg_texImage2D_c1a2a832253557cf = handleError(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
});

export const __wbg_texImage2D_d7b327f14a7a8478 = handleError(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
});

export const __wbg_uniform1i_5e235ac3cc8f8e9f = function(arg0, arg1, arg2) {
    getObject(arg0).uniform1i(getObject(arg1), arg2);
};

export const __wbg_uniform1i_7b9b67ffae83a0d7 = function(arg0, arg1, arg2) {
    getObject(arg0).uniform1i(getObject(arg1), arg2);
};

export const __wbg_uniform2fv_101c67c8bdaf0bf5 = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform2fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
};

export const __wbg_uniform2fv_e9990d07935b491f = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform2fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
};

export const __wbg_uniform4fv_11b4adaa4cd05eba = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform4fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
};

export const __wbg_uniform4fv_cee0ce0735f7a457 = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform4fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
};

export const __wbg_colorMask_72a670689f1e3a76 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
};

export const __wbg_colorMask_0f05faa68e555aa1 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
};

export const __wbg_bindTexture_13c5db7bd22b86cd = function(arg0, arg1, arg2) {
    getObject(arg0).bindTexture(arg1 >>> 0, getObject(arg2));
};

export const __wbg_bindTexture_36a5955154ca7269 = function(arg0, arg1, arg2) {
    getObject(arg0).bindTexture(arg1 >>> 0, getObject(arg2));
};

export const __wbg_activeTexture_ce973e4a1ff281c1 = function(arg0, arg1) {
    getObject(arg0).activeTexture(arg1 >>> 0);
};

export const __wbg_activeTexture_cfc15ec752ffb9c4 = function(arg0, arg1) {
    getObject(arg0).activeTexture(arg1 >>> 0);
};

export const __wbg_texParameteri_c36a2e80bbd50560 = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
};

export const __wbg_texParameteri_d05bbe24288d7efb = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
};

export const __wbg_texSubImage2D_8402d163bc7ded1c = handleError(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
});

export const __wbg_texSubImage2D_d8f39423d50e5d82 = handleError(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
});

export const __wbg_texSubImage2D_11548dd90b0b3eaa = handleError(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
});

export const __wbg_vertexAttribPointer_8781b6e5c846817e = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    getObject(arg0).vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
};

export const __wbg_vertexAttribPointer_e809b011773856d1 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    getObject(arg0).vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
};

export const __wbg_viewport_7e9633b09867dbf5 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).viewport(arg1, arg2, arg3, arg4);
};

export const __wbg_viewport_d6e0a7f81b3499c9 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).viewport(arg1, arg2, arg3, arg4);
};

export const __wbg_stencilFunc_eac78bc5ddf7dab7 = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).stencilFunc(arg1 >>> 0, arg2, arg3 >>> 0);
};

export const __wbg_stencilFunc_f882799e85d96565 = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).stencilFunc(arg1 >>> 0, arg2, arg3 >>> 0);
};

export const __wbg_stencilMask_645fa33e02a0a489 = function(arg0, arg1) {
    getObject(arg0).stencilMask(arg1 >>> 0);
};

export const __wbg_stencilMask_bbac7c3f51604d6a = function(arg0, arg1) {
    getObject(arg0).stencilMask(arg1 >>> 0);
};

export const __wbg_stencilOp_9215f4edd20b85d0 = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).stencilOp(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
};

export const __wbg_stencilOp_b77ba3a1c3728617 = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).stencilOp(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
};

export const __wbg_stencilOpSeparate_f0686d9de8f85697 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export const __wbg_stencilOpSeparate_3c26b1ec9c6c7c2a = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export const __wbg_get_4bab9404e99a1f85 = handleError(function(arg0, arg1) {
    var ret = Reflect.get(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
});

export const __wbg_now_5ae3d18d57dd226f = function(arg0) {
    var ret = getObject(arg0).now();
    return ret;
};

export const __wbg_self_77eca7b42660e1bb = handleError(function() {
    var ret = self.self;
    return addHeapObject(ret);
});

export const __wbg_window_51dac01569f1ba70 = handleError(function() {
    var ret = window.window;
    return addHeapObject(ret);
});

export const __wbg_globalThis_34bac2d08ebb9b58 = handleError(function() {
    var ret = globalThis.globalThis;
    return addHeapObject(ret);
});

export const __wbg_global_1c436164a66c9c22 = handleError(function() {
    var ret = global.global;
    return addHeapObject(ret);
});

export const __wbindgen_is_undefined = function(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

export const __wbg_newnoargs_ab5e899738c0eff4 = function(arg0, arg1) {
    var ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export const __wbg_call_ab183a630df3a257 = handleError(function(arg0, arg1) {
    var ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
});

export const __wbg_call_7a2b5e98ac536644 = handleError(function(arg0, arg1, arg2) {
    var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
});

export const __wbindgen_memory = function() {
    var ret = wasm.memory;
    return addHeapObject(ret);
};

export const __wbg_buffer_bc64154385c04ac4 = function(arg0) {
    var ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

export const __wbg_newwithbyteoffsetandlength_3c8748473807c7cf = function(arg0, arg1, arg2) {
    var ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export const __wbg_set_3afd31f38e771338 = handleError(function(arg0, arg1, arg2) {
    var ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
    return ret;
});

export const __wbindgen_cb_drop = function(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    var ret = false;
    return ret;
};

export const __wbg_texSubImage2D_75f7111706b6361f = handleError(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, getObject(arg7));
});

export const __wbg_texSubImage2D_71daa1e4521779af = handleError(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, getObject(arg7));
});

export const __wbg_matches_b0b5c3f4db00c9b8 = function(arg0) {
    var ret = getObject(arg0).matches;
    return ret;
};

export const __wbg_stopPropagation_a8397a950849e3f6 = function(arg0) {
    getObject(arg0).stopPropagation();
};

export const __wbg_target_62e7aaed452a6541 = function(arg0) {
    var ret = getObject(arg0).target;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_is_e8ad5aa6da4b8c83 = function(arg0, arg1) {
    var ret = Object.is(getObject(arg0), getObject(arg1));
    return ret;
};

export const __wbg_buttons_7c50ee2fdde8e486 = function(arg0) {
    var ret = getObject(arg0).buttons;
    return ret;
};

export const __wbg_getBoundingClientRect_813f74e2f4f344e2 = function(arg0) {
    var ret = getObject(arg0).getBoundingClientRect();
    return addHeapObject(ret);
};

export const __wbg_clientX_df24871aabb01061 = function(arg0) {
    var ret = getObject(arg0).clientX;
    return ret;
};

export const __wbg_x_11fb85648a0b7137 = function(arg0) {
    var ret = getObject(arg0).x;
    return ret;
};

export const __wbg_clientY_b91be9a030c7bd7c = function(arg0) {
    var ret = getObject(arg0).clientY;
    return ret;
};

export const __wbg_y_b7910e55f598e1dc = function(arg0) {
    var ret = getObject(arg0).y;
    return ret;
};

export const __wbg_offsetX_94c9b1e16e81033a = function(arg0) {
    var ret = getObject(arg0).offsetX;
    return ret;
};

export const __wbg_offsetY_7a5e47fc44c400e9 = function(arg0) {
    var ret = getObject(arg0).offsetY;
    return ret;
};

export const __wbg_cancelBubble_a4349da6fa1d1e4f = function(arg0) {
    var ret = getObject(arg0).cancelBubble;
    return ret;
};

export const __wbg_key_3cc6551a67a37a79 = function(arg0, arg1) {
    var ret = getObject(arg1).key;
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbg_ctrlKey_3b651d58cff29579 = function(arg0) {
    var ret = getObject(arg0).ctrlKey;
    return ret;
};

export const __wbg_altKey_9a5448cda4b8c161 = function(arg0) {
    var ret = getObject(arg0).altKey;
    return ret;
};

export const __wbg_getModifierState_1eeb36fe47208eb3 = function(arg0, arg1, arg2) {
    var ret = getObject(arg0).getModifierState(getStringFromWasm0(arg1, arg2));
    return ret;
};

export const __wbg_preventDefault_4eb36ec8e5563ad6 = function(arg0) {
    getObject(arg0).preventDefault();
};

export const __wbg_keyCode_9de4c14bf3d88f3c = function(arg0) {
    var ret = getObject(arg0).keyCode;
    return ret;
};

export const __wbg_charCode_c6dcb643d56248cd = function(arg0) {
    var ret = getObject(arg0).charCode;
    return ret;
};

export const __wbg_pointerId_3d3249dda347fa45 = function(arg0) {
    var ret = getObject(arg0).pointerId;
    return ret;
};

export const __wbg_width_8225e9e48185d280 = function(arg0) {
    var ret = getObject(arg0).width;
    return ret;
};

export const __wbg_height_c55678b905b560e1 = function(arg0) {
    var ret = getObject(arg0).height;
    return ret;
};

export const __wbg_innerWidth_c4fa0fec0fd477b8 = handleError(function(arg0) {
    var ret = getObject(arg0).innerWidth;
    return addHeapObject(ret);
});

export const __wbindgen_number_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    var ret = typeof(obj) === 'number' ? obj : undefined;
    getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
};

export const __wbg_innerHeight_6344b1c89c013158 = handleError(function(arg0) {
    var ret = getObject(arg0).innerHeight;
    return addHeapObject(ret);
});

export const __wbg_setPointerCapture_32e6c85c6de6003f = handleError(function(arg0, arg1) {
    getObject(arg0).setPointerCapture(arg1);
});

export const __wbg_deltaX_6db9b75fa9a51024 = function(arg0) {
    var ret = getObject(arg0).deltaX;
    return ret;
};

export const __wbg_deltaY_f2e82bfd030f24e4 = function(arg0) {
    var ret = getObject(arg0).deltaY;
    return ret;
};

export const __wbg_deltaMode_6e3c8d5ed2afcaf8 = function(arg0) {
    var ret = getObject(arg0).deltaMode;
    return ret;
};

export const __wbg_error_b0449737f51f454d = function(arg0, arg1) {
    console.error(getObject(arg0), getObject(arg1));
};

export const __wbg_addEventListener_e8fdfac380f9ea25 = handleError(function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3), getObject(arg4));
});

export const __wbg_cullFace_5c5866af3997fe0b = function(arg0, arg1) {
    getObject(arg0).cullFace(arg1 >>> 0);
};

export const __wbg_cullFace_85aed0f69213ec77 = function(arg0, arg1) {
    getObject(arg0).cullFace(arg1 >>> 0);
};

export const __wbg_frontFace_a0e3bbab429652a4 = function(arg0, arg1) {
    getObject(arg0).frontFace(arg1 >>> 0);
};

export const __wbg_frontFace_19eb4e66a5eee9b2 = function(arg0, arg1) {
    getObject(arg0).frontFace(arg1 >>> 0);
};

export const __wbg_bufferData_813f25df0c990663 = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).bufferData(arg1 >>> 0, getObject(arg2), arg3 >>> 0);
};

export const __wbg_bufferData_283c9170f3c599d2 = function(arg0, arg1, arg2, arg3) {
    getObject(arg0).bufferData(arg1 >>> 0, getObject(arg2), arg3 >>> 0);
};

export const __wbg_blendFuncSeparate_0cede3ddb2462689 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export const __wbg_blendFuncSeparate_4932bb360c8a2d96 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export const __wbg_createFramebuffer_1c214bda6f062062 = function(arg0) {
    var ret = getObject(arg0).createFramebuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_createFramebuffer_3ca3a1ed57fa5a46 = function(arg0) {
    var ret = getObject(arg0).createFramebuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_scissor_19ca00c5404b43a5 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).scissor(arg1, arg2, arg3, arg4);
};

export const __wbg_scissor_2cbe53f411318ac2 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).scissor(arg1, arg2, arg3, arg4);
};

export const __wbg_clearColor_816770046d61cafd = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).clearColor(arg1, arg2, arg3, arg4);
};

export const __wbg_clearColor_8b13b519ef2dd2d7 = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).clearColor(arg1, arg2, arg3, arg4);
};

export const __wbg_clear_e3b5c108ec1393b3 = function(arg0, arg1) {
    getObject(arg0).clear(arg1 >>> 0);
};

export const __wbg_clear_c7bb0cc46853ad89 = function(arg0, arg1) {
    getObject(arg0).clear(arg1 >>> 0);
};

export const __wbg_createRenderbuffer_d32720549cda2e06 = function(arg0) {
    var ret = getObject(arg0).createRenderbuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_createRenderbuffer_4cd1b5f279ae0388 = function(arg0) {
    var ret = getObject(arg0).createRenderbuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_new_72aa46ede1a52e07 = handleError(function() {
    var ret = new Image();
    return addHeapObject(ret);
});

export const __wbg_setcrossOrigin_c71214d15b663eaf = function(arg0, arg1, arg2) {
    getObject(arg0).crossOrigin = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
};

export const __wbg_setonload_2288267f14fd8110 = function(arg0, arg1) {
    getObject(arg0).onload = getObject(arg1);
};

export const __wbg_setsrc_43904731d885a248 = function(arg0, arg1, arg2) {
    getObject(arg0).src = getStringFromWasm0(arg1, arg2);
};

export const __wbg_document_2b44f2a86e03665a = function(arg0) {
    var ret = getObject(arg0).document;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_getElementById_5bd6efc3d82494aa = function(arg0, arg1, arg2) {
    var ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_instanceof_HtmlCanvasElement_bd2459c62d076bcd = function(arg0) {
    var ret = getObject(arg0) instanceof HTMLCanvasElement;
    return ret;
};

export const __wbg_clientWidth_725008becfa6f008 = function(arg0) {
    var ret = getObject(arg0).clientWidth;
    return ret;
};

export const __wbg_clientHeight_cd4d7e2d713d4b5f = function(arg0) {
    var ret = getObject(arg0).clientHeight;
    return ret;
};

export const __wbg_get_8d1433ebd6a5186d = function(arg0, arg1, arg2) {
    var ret = getObject(arg0)[getStringFromWasm0(arg1, arg2)];
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_deleteVertexArray_97d2121cc69fc033 = function(arg0, arg1) {
    getObject(arg0).deleteVertexArray(getObject(arg1));
};

export const __wbg_deleteVertexArrayOES_54ed1e0994b72905 = function(arg0, arg1) {
    getObject(arg0).deleteVertexArrayOES(getObject(arg1));
};

export const __wbg_deleteBuffer_f10f1dd760bb72fb = function(arg0, arg1) {
    getObject(arg0).deleteBuffer(getObject(arg1));
};

export const __wbg_deleteBuffer_36be51077cf3e581 = function(arg0, arg1) {
    getObject(arg0).deleteBuffer(getObject(arg1));
};

export const __wbg_requestAnimationFrame_65ebf8f2415064e2 = handleError(function(arg0, arg1) {
    var ret = getObject(arg0).requestAnimationFrame(getObject(arg1));
    return ret;
});

export const __wbg_setTimeout_62ddbd1dbc58b759 = handleError(function(arg0, arg1, arg2) {
    var ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
    return ret;
});

export const __wbg_new_bae826039151b559 = function(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_70(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        var ret = new Promise(cb0);
        return addHeapObject(ret);
    } finally {
        state0.a = state0.b = 0;
    }
};

export const __wbindgen_debug_string = function(arg0, arg1) {
    var ret = debugString(getObject(arg1));
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export const __wbg_then_b4358f6ec1ee6657 = function(arg0, arg1) {
    var ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
};

export const __wbg_resolve_9b0f9ddf5f89cb1e = function(arg0) {
    var ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
};

export const __wbg_instanceof_Window_fbe0320f34c4cd31 = function(arg0) {
    var ret = getObject(arg0) instanceof Window;
    return ret;
};

export const __wbg_requestFullscreen_3908b12ff707a58a = handleError(function(arg0) {
    getObject(arg0).requestFullscreen();
});

export const __wbg_setAttribute_b638fce95071fff6 = handleError(function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
});

export const __wbg_getExtension_3ce292edc1f35484 = handleError(function(arg0, arg1, arg2) {
    var ret = getObject(arg0).getExtension(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
});

export const __wbg_addEventListener_63378230aa6735d7 = handleError(function(arg0, arg1, arg2, arg3) {
    getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
});

export const __wbg_removeEventListener_19da1e4551104118 = handleError(function(arg0, arg1, arg2, arg3) {
    getObject(arg0).removeEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
});

export const __wbg_button_d650056716876a47 = function(arg0) {
    var ret = getObject(arg0).button;
    return ret;
};

export const __wbg_shiftKey_31c1bdd985f9be8e = function(arg0) {
    var ret = getObject(arg0).shiftKey;
    return ret;
};

export const __wbg_ctrlKey_eb7dba635c32dc7f = function(arg0) {
    var ret = getObject(arg0).ctrlKey;
    return ret;
};

export const __wbg_altKey_a40ec4c5074686f1 = function(arg0) {
    var ret = getObject(arg0).altKey;
    return ret;
};

export const __wbg_metaKey_d67dff8c6652544a = function(arg0) {
    var ret = getObject(arg0).metaKey;
    return ret;
};

export const __wbg_code_5f0608a8d1b7d1db = function(arg0, arg1) {
    var ret = getObject(arg1).code;
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbg_shiftKey_64fbb7a0afa8c5fa = function(arg0) {
    var ret = getObject(arg0).shiftKey;
    return ret;
};

export const __wbg_metaKey_4a44b03d9be0f1aa = function(arg0) {
    var ret = getObject(arg0).metaKey;
    return ret;
};

export const __wbg_devicePixelRatio_36c226e2b5d4b9c7 = function(arg0) {
    var ret = getObject(arg0).devicePixelRatio;
    return ret;
};

export const __wbg_setwidth_80b60efe20240a3e = function(arg0, arg1) {
    getObject(arg0).width = arg1 >>> 0;
};

export const __wbg_setheight_5c308278bb4139ed = function(arg0, arg1) {
    getObject(arg0).height = arg1 >>> 0;
};

export const __wbg_style_854f82bcc16efd28 = function(arg0) {
    var ret = getObject(arg0).style;
    return addHeapObject(ret);
};

export const __wbg_setProperty_e3d42ccff5ebac2f = handleError(function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
});

export const __wbg_fullscreenElement_c5e89c878e199ef8 = function(arg0) {
    var ret = getObject(arg0).fullscreenElement;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __wbg_matches_cfe9c516ae19f39b = function(arg0) {
    var ret = getObject(arg0).matches;
    return ret;
};

export const __wbg_matchMedia_033fe3caf7d12eb5 = handleError(function(arg0, arg1, arg2) {
    var ret = getObject(arg0).matchMedia(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
});

export const __wbg_addListener_4dbcd9f3252931c8 = handleError(function(arg0, arg1) {
    getObject(arg0).addListener(getObject(arg1));
});

export const __wbg_removeListener_8e03ee7295ded298 = handleError(function(arg0, arg1) {
    getObject(arg0).removeListener(getObject(arg1));
});

export const __wbg_clearTimeout_691ea78b4285bbea = function(arg0, arg1) {
    getObject(arg0).clearTimeout(arg1);
};

export const __wbg_cancelAnimationFrame_594443705ec1f21d = handleError(function(arg0, arg1) {
    getObject(arg0).cancelAnimationFrame(arg1);
});

export const __wbindgen_closure_wrapper302 = function(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 310, __wbg_adapter_26);
    return addHeapObject(ret);
};

export const __wbindgen_closure_wrapper5984 = function(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 249, __wbg_adapter_29);
    return addHeapObject(ret);
};

export const __wbindgen_closure_wrapper5990 = function(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 253, __wbg_adapter_32);
    return addHeapObject(ret);
};

export const __wbindgen_closure_wrapper5996 = function(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 257, __wbg_adapter_35);
    return addHeapObject(ret);
};

export const __wbindgen_closure_wrapper6002 = function(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 261, __wbg_adapter_38);
    return addHeapObject(ret);
};

export const __wbindgen_closure_wrapper6008 = function(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 265, __wbg_adapter_41);
    return addHeapObject(ret);
};

export const __wbindgen_closure_wrapper6013 = function(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 269, __wbg_adapter_44);
    return addHeapObject(ret);
};

export const __wbindgen_closure_wrapper6019 = function(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 273, __wbg_adapter_47);
    return addHeapObject(ret);
};

export const __wbindgen_closure_wrapper6025 = function(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 277, __wbg_adapter_50);
    return addHeapObject(ret);
};

export const __wbindgen_closure_wrapper6031 = function(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 281, __wbg_adapter_53);
    return addHeapObject(ret);
};

