import type { Fn, Fn0, IObjectOf, Nullable } from "@thi.ng/api";
import { ParseContext } from "./context";

export interface ParseScope<T> {
    id: string;
    state: Nullable<ParseState<T>>;
    children: Nullable<ParseScope<T>[]>;
    result: any;
}

export interface ParseState<T> {
    p: number;
    l: number;
    c: number;
    done?: boolean;
    last?: T;
}

export interface IReader<T> {
    read(state: ParseState<T>): T;
    next(state: ParseState<T>): void;
    isDone(state: ParseState<T>): boolean;
    format(state: ParseState<T>): string;
}

export type Parser<T> = Fn<ParseContext<T>, boolean>;

export type DynamicParser<T> = Parser<T> & {
    set: Fn<Parser<T>, void>;
};

export type PassValue<T> = T | Fn0<T>;

export type ScopeTransform<T> = (
    scope: Nullable<ParseScope<T>>,
    ctx: ParseContext<T>,
    user?: any
) => Nullable<ParseScope<T>>;

export type Rules = IObjectOf<DynamicParser<string>>;

export type RuleTransforms = IObjectOf<ScopeTransform<string>>;

export interface Language {
    grammar: ParseContext<string>;
    env: RuleTransforms;
    rules: Rules;
}
