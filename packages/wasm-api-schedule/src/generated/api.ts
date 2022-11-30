/**
 * Generated by @thi.ng/wasm-api-bindgen at 2022-11-30T15:23:27.746Z
 * DO NOT EDIT!
 */

// @ts-ignore possibly includes unused imports
import { MemorySlice, Pointer, WasmStringPtr, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

export enum ScheduleType {
	/**
	 * One-off execution in the future
	 */
	ONCE,
	/**
	 * Recurring execution at fixed interval
	 */
	INTERVAL,
	/**
	 * As soon as possible execution
	 */
	IMMEDIATE,
}
