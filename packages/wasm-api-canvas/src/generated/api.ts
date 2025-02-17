/**
 * Generated by @thi.ng/wasm-api-bindgen at 2023-01-29T19:33:09.599Z
 * DO NOT EDIT!
 */

// @ts-ignore possibly includes unused imports
import { MemorySlice, Pointer, WasmStringPtr, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

export enum LineCap {
	butt,
	round,
	square,
}

export enum LineJoin {
	bevel,
	round,
	miter,
}

export enum TextAlign {
	start,
	end,
	left,
	right,
	center,
}

export enum TextBaseline {
	top,
	hanging,
	middle,
	alphabetic,
	ideographic,
	bottom,
}

export enum TextDirection {
	inherit,
	ltr,
	rtl,
}

export enum FontKerning {
	auto,
	normal,
	none,
}

export enum FillRule {
	nonzero,
	evenodd,
}

export enum PatternRepeat {
	repeat,
	repeat_x,
	repeat_y,
	no_repeat,
}

export enum GlobalCompositeOp {
	color,
	color_burn,
	color_dodge,
	copy,
	darken,
	destination_atop,
	destination_in,
	destination_out,
	destination_over,
	difference,
	exclusion,
	hard_light,
	hue,
	lighten,
	lighter,
	luminosity,
	multiply,
	overlay,
	saturation,
	screen,
	soft_light,
	source_atop,
	source_in,
	source_out,
	source_over,
	xor,
}

export interface GradientColorStop extends WasmTypeBase {
	/**
	 * Normalized position of this color stop
	 * 
	 * @remarks
	 * Zig type: `f32`
	 */
	pos: number;
	/**
	 * CSS color string associated with this stop
	 */
	color: WasmStringPtr;
}

export const $GradientColorStop: WasmTypeConstructor<GradientColorStop> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 8;
	},
	instanceArray(base, num) {
		const items: GradientColorStop[] = [];
		for (; num --> 0; base += 8) items.push(this.instance(base));
		return items;
	},
	instance: (base) => {
		let $color: WasmStringPtr | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 8);
			},
			get pos(): number {
				return mem.f32[base >>> 2];
			},
			set pos(x: number) {
				mem.f32[base >>> 2] = x;
			},
			get color(): WasmStringPtr {
				return $color || ($color = new WasmStringPtr(mem, (base + 4), true));
			},
		};
	}
});

/**
 * The dimensions of a piece of text in the canvas, as created by the
 * CanvasRenderingContext2D.measureText() method.
 */
export interface TextMetrics extends WasmTypeBase {
	/**
	 * Zig type: `f32`
	 */
	actualBoundingBoxAscent: number;
	/**
	 * Zig type: `f32`
	 */
	actualBoundingBoxDescent: number;
	/**
	 * Zig type: `f32`
	 */
	actualBoundingBoxLeft: number;
	/**
	 * Zig type: `f32`
	 */
	actualBoundingBoxRight: number;
	/**
	 * Zig type: `f32`
	 */
	fontBoundingBoxAscent: number;
	/**
	 * Zig type: `f32`
	 */
	fontBoundingBoxDescent: number;
	/**
	 * Zig type: `f32`
	 */
	width: number;
	
	/**
	 * Populate all fields from a canvas TextMetrics JS object
	 */
	fromMetrics(m: globalThis.TextMetrics): void;
}

export const $TextMetrics: WasmTypeConstructor<TextMetrics> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 28;
	},
	instanceArray(base, num) {
		const items: TextMetrics[] = [];
		for (; num --> 0; base += 28) items.push(this.instance(base));
		return items;
	},
	instance: (base) => {
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 28);
			},
			get actualBoundingBoxAscent(): number {
				return mem.f32[base >>> 2];
			},
			set actualBoundingBoxAscent(x: number) {
				mem.f32[base >>> 2] = x;
			},
			get actualBoundingBoxDescent(): number {
				return mem.f32[(base + 4) >>> 2];
			},
			set actualBoundingBoxDescent(x: number) {
				mem.f32[(base + 4) >>> 2] = x;
			},
			get actualBoundingBoxLeft(): number {
				return mem.f32[(base + 8) >>> 2];
			},
			set actualBoundingBoxLeft(x: number) {
				mem.f32[(base + 8) >>> 2] = x;
			},
			get actualBoundingBoxRight(): number {
				return mem.f32[(base + 12) >>> 2];
			},
			set actualBoundingBoxRight(x: number) {
				mem.f32[(base + 12) >>> 2] = x;
			},
			get fontBoundingBoxAscent(): number {
				return mem.f32[(base + 16) >>> 2];
			},
			set fontBoundingBoxAscent(x: number) {
				mem.f32[(base + 16) >>> 2] = x;
			},
			get fontBoundingBoxDescent(): number {
				return mem.f32[(base + 20) >>> 2];
			},
			set fontBoundingBoxDescent(x: number) {
				mem.f32[(base + 20) >>> 2] = x;
			},
			get width(): number {
				return mem.f32[(base + 24) >>> 2];
			},
			set width(x: number) {
				mem.f32[(base + 24) >>> 2] = x;
			},
			
			fromMetrics(m: globalThis.TextMetrics) {
				this.actualBoundingBoxAscent = m.actualBoundingBoxAscent;
				this.actualBoundingBoxDescent = m.actualBoundingBoxDescent;
				this.actualBoundingBoxLeft = m.actualBoundingBoxLeft;
				this.actualBoundingBoxRight = m.actualBoundingBoxRight;
				this.fontBoundingBoxAscent = m.fontBoundingBoxAscent;
				this.fontBoundingBoxDescent = m.fontBoundingBoxDescent;
				this.width = m.width;
			}
			
		};
	}
});
