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
* Register DOM event handlers on all instance and set up the event loop for that.
* You can call this function only once. It will throw an exception but that is safe
* to ignore.
*/
export function run_event_loop(): void;
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
/**
* Creates this compiled component in a canvas.
* The HTML must contains a <canvas> element with the given `canvas_id`
* where the result is gonna be rendered.
* You need to call `show()` on the returned instance for rendering and
* `slint.run_event_loop()` loop to make it interactive.
* @param {string} canvas_id
* @returns {WrappedInstance}
*/
  create(canvas_id: string): WrappedInstance;
}
/**
*/
export class WrappedInstance {
  free(): void;
/**
* Marks this instance for rendering and input handling.
*/
  show(): void;
/**
* Hides this instance and prevents further updates of the canvas element.
*/
  hide(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly _critical_section_acquire: () => number;
  readonly _critical_section_release: (a: number) => void;
  readonly slint_qt_get_widget: (a: number) => number;
  readonly slint_flickable_data_init: (a: number) => void;
  readonly slint_flickable_data_free: (a: number) => void;
  readonly slint_mock_elapsed_time: (a: number) => void;
  readonly slint_send_mouse_click: (a: number, b: number, c: number, d: number) => void;
  readonly send_keyboard_string_sequence: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly __wbg_compilationresult_free: (a: number) => void;
  readonly compilationresult_component: (a: number) => number;
  readonly compilationresult_diagnostics: (a: number) => number;
  readonly compilationresult_error_string: (a: number, b: number) => void;
  readonly compile_from_string: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly compile_from_string_with_style: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly __wbg_wrappedcompiledcomp_free: (a: number) => void;
  readonly wrappedcompiledcomp_run: (a: number, b: number, c: number) => void;
  readonly wrappedcompiledcomp_create: (a: number, b: number, c: number, d: number) => void;
  readonly __wbg_wrappedinstance_free: (a: number) => void;
  readonly wrappedinstance_show: (a: number) => void;
  readonly wrappedinstance_hide: (a: number) => void;
  readonly run_event_loop: (a: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hf986dbd1ea08ce4e: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hfb28df74edc8b10d: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h9c7badd059644a31: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h82b9cb8d31e6d840: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h7c9e9b05f70bcf53: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h30ec056f128231cb: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hc837c3bafa179555: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hf0d078fb14d925fb: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb7bfe09f4713d3d4: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h8efe8d739736d5a6: (a: number, b: number, c: number) => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h2e7df5ea10428aa6: (a: number, b: number, c: number, d: number) => void;
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
