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
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h504f52c434737989(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_29(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__he610e4467bcba3c6(arg0, arg1);
}

function __wbg_adapter_32(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb45b4166f24810bc(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_35(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hc6ab28fb62253779(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_38(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd9b33f8e7d54290a(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_41(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h116d79ad975d4618(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_44(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__he32a4b965cffea12(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_47(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd8dbb418ebaddd56(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_50(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h78601caed24c050d(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_53(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h745ec44f371851b2(arg0, arg1, addHeapObject(arg2));
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
function __wbg_adapter_72(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__hb058c597affa78d3(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
* Compile the content of a string.
*
* Returns a promise to a compiled component which can be run with ".run()"
* @param {string} source
* @param {string} base_url
* @param {Function | undefined} optional_import_callback
* @returns {Promise<CompilationResult>}
*/
export function compile_from_string(source, base_url, optional_import_callback) {
    var ptr0 = passStringToWasm0(source, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(base_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.compile_from_string(ptr0, len0, ptr1, len1, isLikeNone(optional_import_callback) ? 0 : addHeapObject(optional_import_callback));
    return takeObject(ret);
}

/**
* Same as [`compile_from_string`], but also takes a style parameter
* @param {string} source
* @param {string} base_url
* @param {string} style
* @param {Function | undefined} optional_import_callback
* @returns {Promise<CompilationResult>}
*/
export function compile_from_string_with_style(source, base_url, style, optional_import_callback) {
    var ptr0 = passStringToWasm0(source, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(base_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passStringToWasm0(style, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len2 = WASM_VECTOR_LEN;
    var ret = wasm.compile_from_string_with_style(ptr0, len0, ptr1, len1, ptr2, len2, isLikeNone(optional_import_callback) ? 0 : addHeapObject(optional_import_callback));
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
export class CompilationResult {

    static __wrap(ptr) {
        const obj = Object.create(CompilationResult.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compilationresult_free(ptr);
    }
    /**
    * @returns {WrappedCompiledComp | undefined}
    */
    get component() {
        var ret = wasm.compilationresult_component(this.ptr);
        return ret === 0 ? undefined : WrappedCompiledComp.__wrap(ret);
    }
    /**
    * @returns {Array<any>}
    */
    get diagnostics() {
        var ret = wasm.compilationresult_diagnostics(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    get error_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compilationresult_error_string(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
}
/**
*/
export class WrappedCompiledComp {

    static __wrap(ptr) {
        const obj = Object.create(WrappedCompiledComp.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
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

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbg_then_f040b93e57f11d67(arg0, arg1, arg2) {
    var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
};

export function __wbindgen_string_get(arg0, arg1) {
    const obj = getObject(arg1);
    var ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbindgen_string_new(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export function __wbg_new_d53590a4dbd169d4() {
    var ret = new Array();
    return addHeapObject(ret);
};

export function __wbg_new_d537305b59fc353d() {
    var ret = new Object();
    return addHeapObject(ret);
};

export function __wbindgen_number_new(arg0) {
    var ret = arg0;
    return addHeapObject(ret);
};

export function __wbg_push_84b8dc290d3c24fc(arg0, arg1) {
    var ret = getObject(arg0).push(getObject(arg1));
    return ret;
};

export function __wbg_createShader_ef171c856fb49871(arg0, arg1) {
    var ret = getObject(arg0).createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createShader_51d8b138b7a9a555(arg0, arg1) {
    var ret = getObject(arg0).createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_shaderSource_8d77f1b58d544eb9(arg0, arg1, arg2, arg3) {
    getObject(arg0).shaderSource(getObject(arg1), getStringFromWasm0(arg2, arg3));
};

export function __wbg_shaderSource_5910f0f849793916(arg0, arg1, arg2, arg3) {
    getObject(arg0).shaderSource(getObject(arg1), getStringFromWasm0(arg2, arg3));
};

export function __wbg_compileShader_86034162d2750fa0(arg0, arg1) {
    getObject(arg0).compileShader(getObject(arg1));
};

export function __wbg_compileShader_dc2d5d344e104ba7(arg0, arg1) {
    getObject(arg0).compileShader(getObject(arg1));
};

export function __wbg_getShaderParameter_9cb2e8dca5f6497d(arg0, arg1, arg2) {
    var ret = getObject(arg0).getShaderParameter(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_getShaderParameter_3f1e2ab0eeb1cf60(arg0, arg1, arg2) {
    var ret = getObject(arg0).getShaderParameter(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbindgen_boolean_get(arg0) {
    const v = getObject(arg0);
    var ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
};

export function __wbg_getShaderInfoLog_6c1b8ea071469485(arg0, arg1, arg2) {
    var ret = getObject(arg1).getShaderInfoLog(getObject(arg2));
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_getShaderInfoLog_cc1ddacf5e0ae0c9(arg0, arg1, arg2) {
    var ret = getObject(arg1).getShaderInfoLog(getObject(arg2));
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_getUniformLocation_c33ac369426e3f23(arg0, arg1, arg2, arg3) {
    var ret = getObject(arg0).getUniformLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_getUniformLocation_07b2d367ed388a0d(arg0, arg1, arg2, arg3) {
    var ret = getObject(arg0).getUniformLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_uniform2fv_e5be1b4cf0a0246a(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform2fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2fv_8a4493123c8c4fcb(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform2fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_getContext_1970faebf8544b69() { return handleError(function (arg0, arg1, arg2, arg3) {
    var ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2), getObject(arg3));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}, arguments) };

export function __wbg_instanceof_WebGlRenderingContext_c837a7a1630ab279(arg0) {
    var ret = getObject(arg0) instanceof WebGLRenderingContext;
    return ret;
};

export function __wbg_getSupportedExtensions_218870ca541759da(arg0) {
    var ret = getObject(arg0).getSupportedExtensions();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_length_de2dae7a089c8f67(arg0) {
    var ret = getObject(arg0).length;
    return ret;
};

export function __wbg_get_fa3e061cf24f546c(arg0, arg1) {
    var ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
};

export function __wbg_createProgram_a4b4dcbd12f5074e(arg0) {
    var ret = getObject(arg0).createProgram();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createProgram_423e552f15789a1f(arg0) {
    var ret = getObject(arg0).createProgram();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_attachShader_b71a941dbde2f06a(arg0, arg1, arg2) {
    getObject(arg0).attachShader(getObject(arg1), getObject(arg2));
};

export function __wbg_attachShader_f542bc1ffd19b410(arg0, arg1, arg2) {
    getObject(arg0).attachShader(getObject(arg1), getObject(arg2));
};

export function __wbg_bindAttribLocation_69cc69bba0f8b13a(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).bindAttribLocation(getObject(arg1), arg2 >>> 0, getStringFromWasm0(arg3, arg4));
};

export function __wbg_bindAttribLocation_51aedb908915bdd7(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).bindAttribLocation(getObject(arg1), arg2 >>> 0, getStringFromWasm0(arg3, arg4));
};

export function __wbg_linkProgram_10db6bca776dad11(arg0, arg1) {
    getObject(arg0).linkProgram(getObject(arg1));
};

export function __wbg_linkProgram_09bd455e5aa5e84a(arg0, arg1) {
    getObject(arg0).linkProgram(getObject(arg1));
};

export function __wbg_getProgramParameter_514228e301d883a1(arg0, arg1, arg2) {
    var ret = getObject(arg0).getProgramParameter(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_getProgramParameter_752b126ee61add0d(arg0, arg1, arg2) {
    var ret = getObject(arg0).getProgramParameter(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_detachShader_bf3565618ebfb24f(arg0, arg1, arg2) {
    getObject(arg0).detachShader(getObject(arg1), getObject(arg2));
};

export function __wbg_detachShader_0030a6b3861c0456(arg0, arg1, arg2) {
    getObject(arg0).detachShader(getObject(arg1), getObject(arg2));
};

export function __wbg_getProgramInfoLog_1fb1ab4435c625b0(arg0, arg1, arg2) {
    var ret = getObject(arg1).getProgramInfoLog(getObject(arg2));
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_getProgramInfoLog_b403ac06b96d8f26(arg0, arg1, arg2) {
    var ret = getObject(arg1).getProgramInfoLog(getObject(arg2));
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_createVertexArrayOES_8294d8adb68f7f08(arg0) {
    var ret = getObject(arg0).createVertexArrayOES();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createVertexArray_b4635ed4ee325b2c(arg0) {
    var ret = getObject(arg0).createVertexArray();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createBuffer_1a7d3ead6934c72b(arg0) {
    var ret = getObject(arg0).createBuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createBuffer_70609557beb6328a(arg0) {
    var ret = getObject(arg0).createBuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_getError_ad517a8653216ddf(arg0) {
    var ret = getObject(arg0).getError();
    return ret;
};

export function __wbg_getError_e7f25beb3f278378(arg0) {
    var ret = getObject(arg0).getError();
    return ret;
};

export function __wbg_createFramebuffer_ea3800404236687e(arg0) {
    var ret = getObject(arg0).createFramebuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createFramebuffer_a0f2a25360a9174d(arg0) {
    var ret = getObject(arg0).createFramebuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createRenderbuffer_8b54b1d073d6c849(arg0) {
    var ret = getObject(arg0).createRenderbuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createRenderbuffer_fe34f0362dee4729(arg0) {
    var ret = getObject(arg0).createRenderbuffer();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_scissor_76167a43e274fced(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).scissor(arg1, arg2, arg3, arg4);
};

export function __wbg_scissor_25178779edb32faf(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).scissor(arg1, arg2, arg3, arg4);
};

export function __wbg_clearColor_1bea576858a1b6ee(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).clearColor(arg1, arg2, arg3, arg4);
};

export function __wbg_clearColor_997c3f5e6f9f08d6(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).clearColor(arg1, arg2, arg3, arg4);
};

export function __wbg_clear_6035c51172b3fcdb(arg0, arg1) {
    getObject(arg0).clear(arg1 >>> 0);
};

export function __wbg_clear_7f7cbe327101511a(arg0, arg1) {
    getObject(arg0).clear(arg1 >>> 0);
};

export function __wbg_uniform4fv_1d20816015dd5692(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform4fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4fv_a06522de781559ec(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform4fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_deleteTexture_e3c76a05372155cc(arg0, arg1) {
    getObject(arg0).deleteTexture(getObject(arg1));
};

export function __wbg_deleteTexture_06b9f5bf8e1e9488(arg0, arg1) {
    getObject(arg0).deleteTexture(getObject(arg1));
};

export function __wbg_width_7adafbd7a6b01fef(arg0) {
    var ret = getObject(arg0).width;
    return ret;
};

export function __wbg_height_069e2c74728d5cff(arg0) {
    var ret = getObject(arg0).height;
    return ret;
};

export function __wbg_createTexture_122b948b07df3423(arg0) {
    var ret = getObject(arg0).createTexture();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_createTexture_8a51782037c34283(arg0) {
    var ret = getObject(arg0).createTexture();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_deleteFramebuffer_aa0ef382e4a51307(arg0, arg1) {
    getObject(arg0).deleteFramebuffer(getObject(arg1));
};

export function __wbg_deleteFramebuffer_854a708728101f3c(arg0, arg1) {
    getObject(arg0).deleteFramebuffer(getObject(arg1));
};

export function __wbg_deleteRenderbuffer_5b51eb4a87ae5a52(arg0, arg1) {
    getObject(arg0).deleteRenderbuffer(getObject(arg1));
};

export function __wbg_deleteRenderbuffer_88f88ece57a59648(arg0, arg1) {
    getObject(arg0).deleteRenderbuffer(getObject(arg1));
};

export function __wbg_deleteShader_4899c8d2212152c1(arg0, arg1) {
    getObject(arg0).deleteShader(getObject(arg1));
};

export function __wbg_deleteShader_e9f94ecf1dfb8e16(arg0, arg1) {
    getObject(arg0).deleteShader(getObject(arg1));
};

export function __wbg_deleteProgram_8a9cdc935784d06e(arg0, arg1) {
    getObject(arg0).deleteProgram(getObject(arg1));
};

export function __wbg_deleteProgram_916cc3ff29d3366b(arg0, arg1) {
    getObject(arg0).deleteProgram(getObject(arg1));
};

export function __wbg_useProgram_39874f6f12a8845b(arg0, arg1) {
    getObject(arg0).useProgram(getObject(arg1));
};

export function __wbg_useProgram_ee4a6346a3af060e(arg0, arg1) {
    getObject(arg0).useProgram(getObject(arg1));
};

export function __wbg_bindBuffer_c63c000cae2827a7(arg0, arg1, arg2) {
    getObject(arg0).bindBuffer(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindBuffer_7d0fa67b9824b872(arg0, arg1, arg2) {
    getObject(arg0).bindBuffer(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindFramebuffer_8ac3fbda184a07cd(arg0, arg1, arg2) {
    getObject(arg0).bindFramebuffer(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindFramebuffer_550800f08ff6afb4(arg0, arg1, arg2) {
    getObject(arg0).bindFramebuffer(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindRenderbuffer_c239c7d05c370d52(arg0, arg1, arg2) {
    getObject(arg0).bindRenderbuffer(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindRenderbuffer_c4ddc48bc69d4fa8(arg0, arg1, arg2) {
    getObject(arg0).bindRenderbuffer(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindVertexArray_d4e9c27876b2db68(arg0, arg1) {
    getObject(arg0).bindVertexArray(getObject(arg1));
};

export function __wbg_bindVertexArrayOES_6c03e0ec8ab15cf3(arg0, arg1) {
    getObject(arg0).bindVertexArrayOES(getObject(arg1));
};

export function __wbg_pixelStorei_ccfe1ba5b9fcc3c7(arg0, arg1, arg2) {
    getObject(arg0).pixelStorei(arg1 >>> 0, arg2);
};

export function __wbg_pixelStorei_7cbc86618e815f2f(arg0, arg1, arg2) {
    getObject(arg0).pixelStorei(arg1 >>> 0, arg2);
};

export function __wbg_checkFramebufferStatus_ba285053c0c83291(arg0, arg1) {
    var ret = getObject(arg0).checkFramebufferStatus(arg1 >>> 0);
    return ret;
};

export function __wbg_checkFramebufferStatus_8cf88de2abe3459c(arg0, arg1) {
    var ret = getObject(arg0).checkFramebufferStatus(arg1 >>> 0);
    return ret;
};

export function __wbg_disable_a00ba808192589ac(arg0, arg1) {
    getObject(arg0).disable(arg1 >>> 0);
};

export function __wbg_disable_ab3246f27a493a7b(arg0, arg1) {
    getObject(arg0).disable(arg1 >>> 0);
};

export function __wbg_disableVertexAttribArray_f9b7d12de5afeeac(arg0, arg1) {
    getObject(arg0).disableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_disableVertexAttribArray_5b686757d907fb17(arg0, arg1) {
    getObject(arg0).disableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_drawArrays_a9e4af2a62f2e3ee(arg0, arg1, arg2, arg3) {
    getObject(arg0).drawArrays(arg1 >>> 0, arg2, arg3);
};

export function __wbg_drawArrays_e351b7e1443f5c43(arg0, arg1, arg2, arg3) {
    getObject(arg0).drawArrays(arg1 >>> 0, arg2, arg3);
};

export function __wbg_enable_b68d0096e1cf7257(arg0, arg1) {
    getObject(arg0).enable(arg1 >>> 0);
};

export function __wbg_enable_76253bb6a6d1c2fd(arg0, arg1) {
    getObject(arg0).enable(arg1 >>> 0);
};

export function __wbg_enableVertexAttribArray_817eb356245a0a23(arg0, arg1) {
    getObject(arg0).enableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_enableVertexAttribArray_3c8b80f0852aad0d(arg0, arg1) {
    getObject(arg0).enableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_framebufferRenderbuffer_1e3408209b2b1574(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4));
};

export function __wbg_framebufferRenderbuffer_fe3478ae4467ab5f(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4));
};

export function __wbg_framebufferTexture2D_8ba44ac97622f6e4(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4), arg5);
};

export function __wbg_framebufferTexture2D_c85086243d9b5c37(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4), arg5);
};

export function __wbg_renderbufferStorage_9e88415e4c0ad512(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
};

export function __wbg_renderbufferStorage_16e5b512041552fd(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
};

export function __wbg_generateMipmap_49ae09ccdcd2f62a(arg0, arg1) {
    getObject(arg0).generateMipmap(arg1 >>> 0);
};

export function __wbg_generateMipmap_6fc16e4a6de8e587(arg0, arg1) {
    getObject(arg0).generateMipmap(arg1 >>> 0);
};

export function __wbg_texImage2D_9ed128828aa3fcfc() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
}, arguments) };

export function __wbg_texImage2D_2a6f44da8e392b64() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
}, arguments) };

export function __wbg_uniform1i_50cd6b8ea817127c(arg0, arg1, arg2) {
    getObject(arg0).uniform1i(getObject(arg1), arg2);
};

export function __wbg_uniform1i_ff83cd14eeaae333(arg0, arg1, arg2) {
    getObject(arg0).uniform1i(getObject(arg1), arg2);
};

export function __wbg_colorMask_84e2b124a0c32d3c(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
};

export function __wbg_colorMask_c3b30304aa07216b(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
};

export function __wbg_bindTexture_d3e14d55f480c87c(arg0, arg1, arg2) {
    getObject(arg0).bindTexture(arg1 >>> 0, getObject(arg2));
};

export function __wbg_bindTexture_032c59f593fe72e4(arg0, arg1, arg2) {
    getObject(arg0).bindTexture(arg1 >>> 0, getObject(arg2));
};

export function __wbg_activeTexture_b1a48defe102b8b4(arg0, arg1) {
    getObject(arg0).activeTexture(arg1 >>> 0);
};

export function __wbg_activeTexture_01fc5074f685836a(arg0, arg1) {
    getObject(arg0).activeTexture(arg1 >>> 0);
};

export function __wbg_texParameteri_b2c6bdb098d2d85b(arg0, arg1, arg2, arg3) {
    getObject(arg0).texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
};

export function __wbg_texParameteri_1d3e4ea04be20d49(arg0, arg1, arg2, arg3) {
    getObject(arg0).texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
};

export function __wbg_texSubImage2D_fa1db9fc94d136ad() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_7a2a1816a3786e80() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
}, arguments) };

export function __wbg_texSubImage2D_8ff29776c291f341() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
}, arguments) };

export function __wbg_vertexAttribPointer_7c93677ed5cd7ee2(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    getObject(arg0).vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
};

export function __wbg_vertexAttribPointer_f317dbb314cc891f(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    getObject(arg0).vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
};

export function __wbg_viewport_fb7b9098d880a2e5(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).viewport(arg1, arg2, arg3, arg4);
};

export function __wbg_viewport_c0b8e58acb57439a(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).viewport(arg1, arg2, arg3, arg4);
};

export function __wbg_stencilFunc_90950f52bd0b6232(arg0, arg1, arg2, arg3) {
    getObject(arg0).stencilFunc(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_stencilFunc_ac90f1b021381eda(arg0, arg1, arg2, arg3) {
    getObject(arg0).stencilFunc(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_stencilMask_1c5e2352417de381(arg0, arg1) {
    getObject(arg0).stencilMask(arg1 >>> 0);
};

export function __wbg_stencilMask_61121eff49d9bfda(arg0, arg1) {
    getObject(arg0).stencilMask(arg1 >>> 0);
};

export function __wbg_stencilOp_fb97920d901f7081(arg0, arg1, arg2, arg3) {
    getObject(arg0).stencilOp(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
};

export function __wbg_stencilOp_3a42087cca715923(arg0, arg1, arg2, arg3) {
    getObject(arg0).stencilOp(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
};

export function __wbg_stencilOpSeparate_a2d3a0d24ecfe8c5(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_stencilOpSeparate_f302bbc5b6309e40(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_get_ed86ad8212b73674() { return handleError(function (arg0, arg1) {
    var ret = Reflect.get(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_now_e3cde1a07a4d3e37(arg0) {
    var ret = getObject(arg0).now();
    return ret;
};

export function __wbindgen_object_clone_ref(arg0) {
    var ret = getObject(arg0);
    return addHeapObject(ret);
};

export function __wbg_self_bce917bbd61b0be0() { return handleError(function () {
    var ret = self.self;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_window_08048ce184ae3496() { return handleError(function () {
    var ret = window.window;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_globalThis_d6f1ff349571af81() { return handleError(function () {
    var ret = globalThis.globalThis;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_global_63b22b64d239db75() { return handleError(function () {
    var ret = global.global;
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_is_undefined(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

export function __wbg_newnoargs_ac91a24e57fcaec8(arg0, arg1) {
    var ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export function __wbg_call_9e1eb05d905a21d9() { return handleError(function (arg0, arg1) {
    var ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_call_6cdbeff3b536233f() { return handleError(function (arg0, arg1, arg2) {
    var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_memory() {
    var ret = wasm.memory;
    return addHeapObject(ret);
};

export function __wbg_buffer_fbad716641c158a5(arg0) {
    var ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

export function __wbg_newwithbyteoffsetandlength_403faa90cb44b1fb(arg0, arg1, arg2) {
    var ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_set_3276f2af88398f64() { return handleError(function (arg0, arg1, arg2) {
    var ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
    return ret;
}, arguments) };

export function __wbg_log_5ff10a50f270898f(arg0, arg1) {
    console.log(getStringFromWasm0(arg0, arg1));
};

export function __wbg_width_37834ac59a35e1e8(arg0) {
    var ret = getObject(arg0).width;
    return ret;
};

export function __wbg_height_163c7f5f1560dc9e(arg0) {
    var ret = getObject(arg0).height;
    return ret;
};

export function __wbg_requestAnimationFrame_69e903cfce563326() { return handleError(function (arg0, arg1) {
    var ret = getObject(arg0).requestAnimationFrame(getObject(arg1));
    return ret;
}, arguments) };

export function __wbg_setTimeout_9fae816b718a8753() { return handleError(function (arg0, arg1, arg2) {
    var ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
    return ret;
}, arguments) };

export function __wbg_new_b6dcf75182eb4345() { return handleError(function () {
    var ret = new Image();
    return addHeapObject(ret);
}, arguments) };

export function __wbg_setcrossOrigin_8b0becaa33c2e41e(arg0, arg1, arg2) {
    getObject(arg0).crossOrigin = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
};

export function __wbg_setonload_f9897741a46f69f8(arg0, arg1) {
    getObject(arg0).onload = getObject(arg1);
};

export function __wbg_setsrc_da46616038607c3e(arg0, arg1, arg2) {
    getObject(arg0).src = getStringFromWasm0(arg1, arg2);
};

export function __wbg_deleteVertexArrayOES_870b569184f3e8da(arg0, arg1) {
    getObject(arg0).deleteVertexArrayOES(getObject(arg1));
};

export function __wbg_deleteVertexArray_78e15c0d00e758ce(arg0, arg1) {
    getObject(arg0).deleteVertexArray(getObject(arg1));
};

export function __wbg_deleteBuffer_7df094eb78419aab(arg0, arg1) {
    getObject(arg0).deleteBuffer(getObject(arg1));
};

export function __wbg_deleteBuffer_8c5ad4beb33c9227(arg0, arg1) {
    getObject(arg0).deleteBuffer(getObject(arg1));
};

export function __wbg_document_40cc17d69aad887e(arg0) {
    var ret = getObject(arg0).document;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_getElementById_97cfcb57d9ef46b3(arg0, arg1, arg2) {
    var ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_instanceof_HtmlCanvasElement_6c2ace70ed374c47(arg0) {
    var ret = getObject(arg0) instanceof HTMLCanvasElement;
    return ret;
};

export function __wbg_clientWidth_0bc16e27b6bd8789(arg0) {
    var ret = getObject(arg0).clientWidth;
    return ret;
};

export function __wbg_clientHeight_fae4f1411f5ed4b9(arg0) {
    var ret = getObject(arg0).clientHeight;
    return ret;
};

export function __wbg_texSubImage2D_36494b153d8ed680() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, getObject(arg7));
}, arguments) };

export function __wbg_texSubImage2D_e787e5ee45de005f() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, getObject(arg7));
}, arguments) };

export function __wbg_matches_d2d9bd8de571a128(arg0) {
    var ret = getObject(arg0).matches;
    return ret;
};

export function __wbg_stopPropagation_e8771a6d4a5c3c5e(arg0) {
    getObject(arg0).stopPropagation();
};

export function __wbg_cancelBubble_08e47e6c86a61885(arg0) {
    var ret = getObject(arg0).cancelBubble;
    return ret;
};

export function __wbg_preventDefault_e121cdcccef1e0ee(arg0) {
    getObject(arg0).preventDefault();
};

export function __wbg_deltaX_4fc71517926b97b2(arg0) {
    var ret = getObject(arg0).deltaX;
    return ret;
};

export function __wbg_deltaY_f6f00b37939ded4f(arg0) {
    var ret = getObject(arg0).deltaY;
    return ret;
};

export function __wbg_deltaMode_5841e202184877c4(arg0) {
    var ret = getObject(arg0).deltaMode;
    return ret;
};

export function __wbg_key_4561659253ce92e8(arg0, arg1) {
    var ret = getObject(arg1).key;
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_ctrlKey_7508ba8766c257c1(arg0) {
    var ret = getObject(arg0).ctrlKey;
    return ret;
};

export function __wbg_altKey_7c54a09919382401(arg0) {
    var ret = getObject(arg0).altKey;
    return ret;
};

export function __wbg_getModifierState_00573b64f33fad52(arg0, arg1, arg2) {
    var ret = getObject(arg0).getModifierState(getStringFromWasm0(arg1, arg2));
    return ret;
};

export function __wbg_keyCode_d7ae20ee69131a64(arg0) {
    var ret = getObject(arg0).keyCode;
    return ret;
};

export function __wbg_charCode_4acbbb5246e634d4(arg0) {
    var ret = getObject(arg0).charCode;
    return ret;
};

export function __wbg_innerWidth_1ebaf8a7e1a14dac() { return handleError(function (arg0) {
    var ret = getObject(arg0).innerWidth;
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_number_get(arg0, arg1) {
    const obj = getObject(arg1);
    var ret = typeof(obj) === 'number' ? obj : undefined;
    getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
};

export function __wbg_innerHeight_5036fb5a241360f1() { return handleError(function (arg0) {
    var ret = getObject(arg0).innerHeight;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_pointerId_0e63ab2dcf9ebd33(arg0) {
    var ret = getObject(arg0).pointerId;
    return ret;
};

export function __wbg_offsetX_2e647ec0bd236dea(arg0) {
    var ret = getObject(arg0).offsetX;
    return ret;
};

export function __wbg_offsetY_d185bcaa5e449f67(arg0) {
    var ret = getObject(arg0).offsetY;
    return ret;
};

export function __wbg_setPointerCapture_328e13c4c239db54() { return handleError(function (arg0, arg1) {
    getObject(arg0).setPointerCapture(arg1);
}, arguments) };

export function __wbg_target_83d783603c7cbaab(arg0) {
    var ret = getObject(arg0).target;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_is_5530a9697a80e568(arg0, arg1) {
    var ret = Object.is(getObject(arg0), getObject(arg1));
    return ret;
};

export function __wbg_buttons_1eb1535455e0252e(arg0) {
    var ret = getObject(arg0).buttons;
    return ret;
};

export function __wbg_getBoundingClientRect_d3dd218166366f7b(arg0) {
    var ret = getObject(arg0).getBoundingClientRect();
    return addHeapObject(ret);
};

export function __wbg_clientX_356d72e5d45d20b0(arg0) {
    var ret = getObject(arg0).clientX;
    return ret;
};

export function __wbg_x_23c9b8b20e8fb048(arg0) {
    var ret = getObject(arg0).x;
    return ret;
};

export function __wbg_clientY_2be90f8fd44a2457(arg0) {
    var ret = getObject(arg0).clientY;
    return ret;
};

export function __wbg_y_d8466c1f81bb0445(arg0) {
    var ret = getObject(arg0).y;
    return ret;
};

export function __wbg_movementX_1eb04d70fcd232d2(arg0) {
    var ret = getObject(arg0).movementX;
    return ret;
};

export function __wbg_movementY_39df2a5391e8a6dc(arg0) {
    var ret = getObject(arg0).movementY;
    return ret;
};

export function __wbindgen_cb_drop(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    var ret = false;
    return ret;
};

export function __wbg_error_17d8d25f3979b162(arg0, arg1) {
    console.error(getObject(arg0), getObject(arg1));
};

export function __wbg_createElement_2b9dbef12990d2d6() { return handleError(function (arg0, arg1, arg2) {
    var ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_get_5493e8294369c2da(arg0, arg1, arg2) {
    var ret = getObject(arg0)[getStringFromWasm0(arg1, arg2)];
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_addEventListener_7bcf19dfb3d56d96() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3), getObject(arg4));
}, arguments) };

export function __wbg_cullFace_037aebaa4cc715d8(arg0, arg1) {
    getObject(arg0).cullFace(arg1 >>> 0);
};

export function __wbg_cullFace_4547ff0aff8aa63c(arg0, arg1) {
    getObject(arg0).cullFace(arg1 >>> 0);
};

export function __wbg_frontFace_5909cc32ec04835e(arg0, arg1) {
    getObject(arg0).frontFace(arg1 >>> 0);
};

export function __wbg_frontFace_cc0ac9786bd9859f(arg0, arg1) {
    getObject(arg0).frontFace(arg1 >>> 0);
};

export function __wbg_bufferData_8dcff40bb7ea4e13(arg0, arg1, arg2, arg3) {
    getObject(arg0).bufferData(arg1 >>> 0, getObject(arg2), arg3 >>> 0);
};

export function __wbg_bufferData_2a7070d86f2279b9(arg0, arg1, arg2, arg3) {
    getObject(arg0).bufferData(arg1 >>> 0, getObject(arg2), arg3 >>> 0);
};

export function __wbg_blendFuncSeparate_292b98a4e0009c18(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_blendFuncSeparate_a7ed75f73f0897e8(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_compilationresult_new(arg0) {
    var ret = CompilationResult.__wrap(arg0);
    return addHeapObject(ret);
};

export function __wbg_new_31636366544febdf(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_72(a, state0.b, arg0, arg1);
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

export function __wbindgen_debug_string(arg0, arg1) {
    var ret = debugString(getObject(arg1));
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbg_then_fe720822c4da5711(arg0, arg1) {
    var ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_resolve_89251e936a5e00ac(arg0) {
    var ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbg_addEventListener_ba672fd0a86ea7c0() { return handleError(function (arg0, arg1, arg2, arg3) {
    getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
}, arguments) };

export function __wbg_removeEventListener_8c1c2b6321430eb2() { return handleError(function (arg0, arg1, arg2, arg3) {
    getObject(arg0).removeEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
}, arguments) };

export function __wbg_instanceof_Window_c4e9146e14ca4a40(arg0) {
    var ret = getObject(arg0) instanceof Window;
    return ret;
};

export function __wbg_getExtension_c5bac62c2df9b51f() { return handleError(function (arg0, arg1, arg2) {
    var ret = getObject(arg0).getExtension(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}, arguments) };

export function __wbg_requestFullscreen_bb4168ecffec8088() { return handleError(function (arg0) {
    getObject(arg0).requestFullscreen();
}, arguments) };

export function __wbg_setAttribute_3caf282df384d72c() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_devicePixelRatio_81c875524d455070(arg0) {
    var ret = getObject(arg0).devicePixelRatio;
    return ret;
};

export function __wbg_setwidth_6b276650fdafc277(arg0, arg1) {
    getObject(arg0).width = arg1 >>> 0;
};

export function __wbg_setheight_705eb5fd16a41367(arg0, arg1) {
    getObject(arg0).height = arg1 >>> 0;
};

export function __wbg_style_f582a03a2fedfede(arg0) {
    var ret = getObject(arg0).style;
    return addHeapObject(ret);
};

export function __wbg_setProperty_bb5ef041aa234119() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_fullscreenElement_d2a1cc175184e9e9(arg0) {
    var ret = getObject(arg0).fullscreenElement;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_matches_081caf14c84df8f4(arg0) {
    var ret = getObject(arg0).matches;
    return ret;
};

export function __wbg_matchMedia_570f99cfe245a04f() { return handleError(function (arg0, arg1, arg2) {
    var ret = getObject(arg0).matchMedia(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}, arguments) };

export function __wbg_addListener_6ed7397abc8055e0() { return handleError(function (arg0, arg1) {
    getObject(arg0).addListener(getObject(arg1));
}, arguments) };

export function __wbg_removeListener_12de50e3b77ad554() { return handleError(function (arg0, arg1) {
    getObject(arg0).removeListener(getObject(arg1));
}, arguments) };

export function __wbg_clearTimeout_e6806a27611cf6e8(arg0, arg1) {
    getObject(arg0).clearTimeout(arg1);
};

export function __wbg_cancelAnimationFrame_432d79936b84dcd4() { return handleError(function (arg0, arg1) {
    getObject(arg0).cancelAnimationFrame(arg1);
}, arguments) };

export function __wbg_button_d26f7934bec41270(arg0) {
    var ret = getObject(arg0).button;
    return ret;
};

export function __wbg_shiftKey_d6ea87288375d0d6(arg0) {
    var ret = getObject(arg0).shiftKey;
    return ret;
};

export function __wbg_ctrlKey_6524b1ff1ec7c0d9(arg0) {
    var ret = getObject(arg0).ctrlKey;
    return ret;
};

export function __wbg_altKey_c6e36625694ae4d3(arg0) {
    var ret = getObject(arg0).altKey;
    return ret;
};

export function __wbg_metaKey_756c220b0900cfe6(arg0) {
    var ret = getObject(arg0).metaKey;
    return ret;
};

export function __wbg_code_c0e1eeba85990f8a(arg0, arg1) {
    var ret = getObject(arg1).code;
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_shiftKey_66fbffa2937afdb2(arg0) {
    var ret = getObject(arg0).shiftKey;
    return ret;
};

export function __wbg_metaKey_2ca09c032d0be9e1(arg0) {
    var ret = getObject(arg0).metaKey;
    return ret;
};

export function __wbindgen_closure_wrapper342(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 326, __wbg_adapter_26);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper6302(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 302, __wbg_adapter_29);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper6436(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 287, __wbg_adapter_32);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper6541(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 272, __wbg_adapter_35);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper6546(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 276, __wbg_adapter_38);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper6551(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 280, __wbg_adapter_41);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper6556(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 284, __wbg_adapter_44);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper6565(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 291, __wbg_adapter_47);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper6570(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 295, __wbg_adapter_50);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper6575(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 299, __wbg_adapter_53);
    return addHeapObject(ret);
};

