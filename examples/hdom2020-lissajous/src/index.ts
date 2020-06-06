import type { IDeref } from "@thi.ng/api";
import { $canvas, $compile } from "@thi.ng/hdom2020";
import {
    fromDOMEvent,
    fromRAF,
    ISubscribable,
    stream,
    Subscription,
    sync,
} from "@thi.ng/rstream";
import { map, slidingWindow } from "@thi.ng/transducers";

const slider = (
    dest: Subscription<number, number>,
    label: string,
    attribs?: any
) => [
    "div",
    {},
    ["span.dib.w-50", {}, `${label}: `, dest],
    [
        "input.dib.w-50",
        {
            type: "range",
            min: 0,
            max: 10,
            step: 0.1,
            ...attribs,
            value: dest,
            oninput: (e: InputEvent) =>
                dest.next(parseFloat((<HTMLInputElement>e.target).value)),
        },
    ],
];

const lissajous = (
    a: number,
    b: number,
    d: number,
    scale: number,
    t: number
) => [scale * Math.sin(a * t + d), scale * Math.sin(b * t)];

const a = stream<number>();
const b = stream<number>();
const num = stream<number>();
const scale = stream<number>();
const radius = stream<number>();
const size = fromDOMEvent(window, "resize").transform(
    map(() => [window.innerWidth, window.innerHeight - 100])
);

a.next(3);
b.next(4);
num.next(50);
radius.next(10);
scale.next(0.5);
size.next(<any>null);

interface Lissajous {
    a: number;
    b: number;
    time: number;
    scale: number;
    size: number[];
}

// combine various reactive parameters
// and transform via transducers
const dots: ISubscribable<any[]> = sync<any, Lissajous>({
    src: { a, b, scale, size, time: fromRAF() },
}).transform(
    // compute next lissajous point
    map(({ a, b, time, scale, size }) =>
        lissajous(
            a,
            b,
            Math.PI / 4,
            (scale / 2) * Math.min(size[0], size[1]),
            time * 0.05
        )
    ),
    // only keep `num` last points
    slidingWindow(<IDeref<number>>num, true),
    // transform into a group of hiccup circle shapes
    // (drawing done thi.ng/hdom-canvas)
    map((points: number[][]) => {
        const [width, height] = size.deref()!;
        const r = radius.deref();
        return [
            "g",
            { fill: "purple", translate: [width / 2, height / 2] },
            points.map((pos, i) => [
                "circle",
                { alpha: (i + 1) / points.length },
                pos,
                r,
            ]),
        ];
    })
);

// compile UI/DOM component from hiccup syntax
$compile([
    "div",
    {},
    [
        "div.w-50-ns.center-ns.ma3",
        {},
        slider(a, "A"),
        slider(b, "B"),
        slider(num, "Length", { min: 1, max: 100, step: 1 }),
        slider(radius, "Radius", { min: 1, max: 50 }),
        slider(scale, "Scale", { max: 1, step: 0.01 }),
    ],
    // subscribe canvas component to above reactive value
    $canvas(dots, size),
]).mount(document.body);
