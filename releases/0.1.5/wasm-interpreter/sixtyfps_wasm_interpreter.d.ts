/* tslint:disable */
/* eslint-disable */
/**
* Compile the content of a string.
*
* Returns a promise to a compiled component which can be run with ".run()"
* @param {string} source
* @param {string} base_url
* @param {Function | undefined} optional_import_callback
* @returns {Promise<CompilationResult>}
*/
export function compile_from_string(source: string, base_url: string, optional_import_callback?: Function): Promise<CompilationResult>;
/**
* Same as [`compile_from_string`], but also takes a style parameter
* @param {string} source
* @param {string} base_url
* @param {string} style
* @param {Function | undefined} optional_import_callback
* @returns {Promise<CompilationResult>}
*/
export function compile_from_string_with_style(source: string, base_url: string, style: string, optional_import_callback?: Function): Promise<CompilationResult>;
/**
*/
export class CompilationResult {
  free(): void;
/**
* @returns {WrappedCompiledComp | undefined}
*/
  readonly component: WrappedCompiledComp | undefined;
/**
* @returns {Array<any>}
*/
  readonly diagnostics: Array<any>;
/**
* @returns {string}
*/
  readonly error_string: string;
}
/**
*/
export class WrappedCompiledComp {
  free(): void;
/**
* Run this compiled component in a canvas.
* The HTML must contains a <canvas> element with the given `canvas_id`
* where the result is gonna be rendered
* @param {string} canvas_id
*/
  run(canvas_id: string): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly sixtyfps_flickable_data_init: (a: number) => void;
  readonly sixtyfps_flickable_data_free: (a: number) => void;
  readonly sixtyfps_mock_elapsed_time: (a: number) => void;
  readonly sixtyfps_send_mouse_click: (a: number, b: number, c: number, d: number) => void;
  readonly send_keyboard_string_sequence: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly sixtyfps_qt_get_widget: (a: number) => number;
  readonly __wbg_compilationresult_free: (a: number) => void;
  readonly compilationresult_component: (a: number) => number;
  readonly compilationresult_diagnostics: (a: number) => number;
  readonly compilationresult_error_string: (a: number, b: number) => void;
  readonly compile_from_string: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly compile_from_string_with_style: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly __wbg_wrappedcompiledcomp_free: (a: number) => void;
  readonly wrappedcompiledcomp_run: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hcbef8dcce81d1a22: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hcebbc3fabd48a71a: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb59f8048b31db7a7: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd53e5ba311ad1381: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h377fb4d1fc64d544: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__ha2b3f1f40a0d2ca3: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hc08cbf9d3336f1c2: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h1710ae5b784ab934: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4dd48a318760b9e2: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4718588e1ee2cef7: (a: number, b: number, c: number) => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__hf291c1f0776fe258: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
