// thing:no-export
import type { FnAny } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { Transducer } from "@thi.ng/transducers";
import { comp } from "@thi.ng/transducers/comp";
import { flatten } from "@thi.ng/transducers/flatten";
import { map } from "@thi.ng/transducers/map";
import { permutations } from "@thi.ng/transducers/permutations";
import { repeat } from "@thi.ng/transducers/repeat";
import { str } from "@thi.ng/transducers/str";
import { transduce } from "@thi.ng/transducers/transduce";
import type { CSSOpts, RuleFn } from "./api.js";

const EMPTY = new Set<string>();

const NO_SPACES = ":[";

const xfSel = comp<any, string, string>(
	flatten(),
	map((x) => (NO_SPACES.indexOf(x.charAt(0)) >= 0 ? x : " " + x))
);

const withScope = (xf: Transducer<any, any>, scope: string) =>
	comp(
		xf,
		map((x) => (isString(x) && x.indexOf(" .") == 0 ? x + scope : x))
	);

/** @internal */
export const expand = (
	acc: string[],
	parent: any[],
	rules: any[],
	opts: CSSOpts
) => {
	const n = rules.length;
	const sel: string[] = [];
	let curr: any, isFn;

	const process = (i: number, r: any) => {
		let rfn: FnAny<RuleFn> | null = null;
		if (isArray(r)) {
			expand(acc, makeSelector(parent, sel), r, opts);
		} else if (isIterable(r) && !isString(r)) {
			expand(acc, makeSelector(parent, sel), [...r], opts);
		} else if ((isFn = isFunction(r)) || (rfn = opts.fns[r])) {
			if (!parent.length) {
				if (rfn) {
					rfn.apply(null, <any>rules.slice(i + 1))(acc, opts);
					return true;
				}
				r(acc, opts);
			} else if (isFn) {
				process(i, r());
			} else {
				illegalArgs(`quoted fn ('${r}') only allowed at head position`);
			}
		} else if (isPlainObject(r)) {
			curr = Object.assign(curr || {}, r);
		} else if (r != null) {
			sel.push(r);
		}
	};

	for (let i = 0; i < n; i++) {
		if (process(i, rules[i])) {
			return acc;
		}
	}
	curr && acc.push(formatRule(parent, sel, curr, opts));
	return acc;
};

const makeSelector = (parent: any[], curr: any[]) =>
	parent.length ? [...permutations(parent, curr)] : curr;

const formatRule = (parent: any[], sel: any[], curr: any, opts: CSSOpts) => {
	const f = opts.format;
	const space = indent(opts);
	const xf = opts.scope ? withScope(xfSel, opts.scope) : xfSel;
	return [
		space,
		transduce(
			map((sel: any[]) =>
				transduce(xf, str(), isArray(sel) ? sel : [sel]).trim()
			),
			str(f.ruleSep),
			makeSelector(parent, sel)
		),
		f.declStart,
		formatDecls(curr, opts),
		space,
		f.declEnd,
	].join("");
};

/** @internal */
export const formatDecls = (rules: any, opts: CSSOpts) => {
	const f = opts.format;
	const prefixes = <Set<string>>(opts.autoprefix || EMPTY);
	const space = indent(opts, opts.depth + 1);
	const acc = [];
	for (let r in rules) {
		if (rules.hasOwnProperty(r)) {
			let val = rules[r];
			if (isFunction(val)) {
				val = val(rules);
			}
			if (isArray(val)) {
				val = val
					.map((v) => (isArray(v) ? v.join(" ") : v))
					.join(f.ruleSep);
			}
			if (prefixes.has(r)) {
				for (let v of opts.vendors) {
					acc.push(`${space}${v}${r}:${f.valSep}${val};`);
				}
			}
			acc.push(`${space}${r}:${f.valSep}${val};`);
		}
	}
	return acc.join(f.decls) + f.decls;
};

/** @internal */
export const indent = (opts: CSSOpts, d = opts.depth) =>
	d > 1
		? [...repeat(opts.format.indent, d)].join("")
		: d > 0
		? opts.format.indent
		: "";
