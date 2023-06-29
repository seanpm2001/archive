/* tslint:disable */
/* eslint-disable */
/**
*/
export function main(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly slint_native_style_metrics_init: (a: number) => void;
  readonly slint_native_style_metrics_deinit: (a: number) => void;
  readonly slint_mock_elapsed_time: (a: number) => void;
  readonly slint_send_mouse_click: (a: number, b: number, c: number, d: number) => void;
  readonly send_keyboard_string_sequence: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly main: () => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hdf3ef99a7205266b: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__he11f4700d15d627c: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4b6596c6099557f4: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4150697a474d32a9: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4be9a6e6e82bc437: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h80b1906c419a0ba4: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h6ca96541cdda0e51: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb9c3129a7e0f6572: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h85f3385888163a12: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h896e03dd23003b12: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hffcfe9538f1748f8: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h3046cef1f64900f8: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h6e2f9ffd02f0ffe5: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

/**
* Synchronously compiles the given `bytes` and instantiates the WebAssembly module.
*
* @param {BufferSource} bytes
*
* @returns {InitOutput}
*/
export function initSync(bytes: BufferSource): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
