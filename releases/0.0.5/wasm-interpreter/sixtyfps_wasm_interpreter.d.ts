/* tslint:disable */
/* eslint-disable */
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
export function compile_from_string(source: string, base_url: string, optional_resolve_import_callback?: Function, optional_import_callback?: Function): any;
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
  readonly sixtyfps_new_path_elements: (a: number, b: number, c: number) => void;
  readonly sixtyfps_new_path_events: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly sixtyfps_shared_string_bytes: (a: number) => number;
  readonly sixtyfps_shared_string_drop: (a: number) => void;
  readonly sixtyfps_shared_string_clone: (a: number, b: number) => void;
  readonly sixtyfps_shared_string_from_bytes: (a: number, b: number, c: number) => void;
  readonly sixtyfps_shared_string_from_number: (a: number, b: number) => void;
  readonly sixtyfps_shared_string_append: (a: number, b: number, c: number) => void;
  readonly sixtyfps_component_window_drop: (a: number) => void;
  readonly sixtyfps_component_window_clone: (a: number, b: number) => void;
  readonly sixtyfps_component_window_show: (a: number) => void;
  readonly sixtyfps_component_window_hide: (a: number) => void;
  readonly sixtyfps_component_window_get_scale_factor: (a: number) => number;
  readonly sixtyfps_component_window_set_scale_factor: (a: number, b: number) => void;
  readonly sixtyfps_component_window_free_graphics_resources: (a: number, b: number) => void;
  readonly sixtyfps_component_window_set_focus_item: (a: number, b: number) => void;
  readonly sixtyfps_component_window_set_component: (a: number, b: number) => void;
  readonly sixtyfps_component_window_show_popup: (a: number, b: number, c: number, d: number) => void;
  readonly solve_grid_layout: (a: number) => void;
  readonly grid_layout_info: (a: number, b: number, c: number, d: number) => void;
  readonly solve_box_layout: (a: number, b: number) => void;
  readonly box_layout_info: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly solve_path_layout: (a: number) => void;
  readonly sixtyfps_property_init: (a: number) => void;
  readonly sixtyfps_property_update: (a: number, b: number) => void;
  readonly sixtyfps_property_set_changed: (a: number, b: number) => void;
  readonly sixtyfps_property_set_binding: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly sixtyfps_property_set_binding_internal: (a: number, b: number) => void;
  readonly sixtyfps_property_is_dirty: (a: number) => number;
  readonly sixtyfps_property_drop: (a: number) => void;
  readonly sixtyfps_property_set_animated_value_int: (a: number, b: number, c: number, d: number) => void;
  readonly sixtyfps_property_set_animated_value_float: (a: number, b: number, c: number, d: number) => void;
  readonly sixtyfps_property_set_animated_value_color: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly sixtyfps_property_set_animated_binding_int: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly sixtyfps_property_set_animated_binding_float: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly sixtyfps_property_set_animated_binding_color: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly sixtyfps_property_set_state_binding: (a: number, b: number, c: number, d: number) => void;
  readonly sixtyfps_property_tracker_init: (a: number) => void;
  readonly sixtyfps_property_tracker_evaluate: (a: number, b: number, c: number) => void;
  readonly sixtyfps_property_tracker_is_dirty: (a: number) => number;
  readonly sixtyfps_property_tracker_drop: (a: number) => void;
  readonly sixtyfps_mock_elapsed_time: (a: number) => void;
  readonly sixtyfps_send_mouse_click: (a: number, b: number, c: number, d: number) => void;
  readonly send_keyboard_string_sequence: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly sixtyfps_timer_start: (a: number, b: number, c: number, d: number) => number;
  readonly sixtyfps_timer_singleshot: (a: number, b: number, c: number, d: number) => void;
  readonly sixtyfps_timer_stop: (a: number) => void;
  readonly sixtyfps_callback_init: (a: number) => void;
  readonly sixtyfps_callback_call: (a: number, b: number, c: number) => void;
  readonly sixtyfps_callback_set_handler: (a: number, b: number, c: number, d: number) => void;
  readonly sixtyfps_callback_drop: (a: number) => void;
  readonly sixtyfps_visit_item_tree: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly sixtyfps_component_init_items: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly sixtyfps_shared_vector_allocate: (a: number, b: number) => number;
  readonly sixtyfps_shared_vector_free: (a: number, b: number, c: number) => void;
  readonly sixtyfps_shared_vector_empty: () => number;
  readonly sixtyfps_component_window_init: (a: number) => void;
  readonly sixtyfps_run_event_loop: () => void;
  readonly compile_from_string: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly __wbg_wrappedcompiledcomp_free: (a: number) => void;
  readonly wrappedcompiledcomp_run: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h1a54cc4735bea04b: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hcbdc531a689b2ee8: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h9ca171ad494024c9: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h6c915ba91cad2854: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbe311bedb0f652a9: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbc86fe490b142faa: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hca0e877634243db0: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hebd1800524f9ebcd: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4e20958b42b45499: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hc18ba0a3af9d7937: (a: number, b: number, c: number) => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h436083ec99751b68: (a: number, b: number, c: number, d: number) => void;
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
        