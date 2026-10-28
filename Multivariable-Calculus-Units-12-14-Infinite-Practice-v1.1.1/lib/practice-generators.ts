import type { PracticeProblem } from "./content-types.js";

export type PracticeStep = {
  label: string;
  explanation: string;
  math?: string;
};

export type GeneratedPracticeProblem = PracticeProblem & {
  seed: number;
  parameters: Record<string, number | string | boolean>;
  steps: PracticeStep[];
};

type Body = Omit<GeneratedPracticeProblem, "id" | "seed">;
type Rng = ReturnType<typeof makeRng>;
type Generator = (rng: Rng) => Body;

function makeRng(seed: number) {
  let state = seed >>> 0;
  const next = () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (min: number, max: number) => Math.floor(next() * (max - min + 1)) + min;
  const pick = <T,>(items: readonly T[]) => items[int(0, items.length - 1)];
  const sign = () => (next() < 0.5 ? -1 : 1);
  const nonzero = (min = -5, max = 5) => {
    let value = 0;
    while (value === 0) value = int(min, max);
    return value;
  };
  return { next, int, pick, sign, nonzero };
}

function hash(text: string) {
  let value = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    value ^= text.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

export function initialPracticeSeed(id: string) {
  return hash(`mv-calculus:${id}:v1`);
}

export function nextPracticeSeed(previous: number) {
  let value = previous >>> 0;
  value ^= value << 13;
  value ^= value >>> 17;
  value ^= value << 5;
  return value >>> 0 || 0x9e3779b9;
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function fraction(numerator: number, denominator = 1) {
  if (denominator === 0) throw new Error("A generated denominator cannot be zero.");
  const sign = denominator < 0 ? -1 : 1;
  const n = numerator * sign;
  const d = Math.abs(denominator);
  const divisor = gcd(n, d);
  const reducedN = n / divisor;
  const reducedD = d / divisor;
  if (reducedD === 1) return String(reducedN);
  return `${reducedN < 0 ? "-" : ""}\\frac{${Math.abs(reducedN)}}{${reducedD}}`;
}

function decimal(value: number, places = 4) {
  return Number(value.toFixed(places)).toString();
}

function radical(value: number) {
  for (let factor = Math.floor(Math.sqrt(value)); factor >= 2; factor -= 1) {
    if (value % (factor * factor) === 0) {
      const remainder = value / (factor * factor);
      return remainder === 1 ? String(factor) : `${factor}\\sqrt{${remainder}}`;
    }
  }
  return value === 1 ? "1" : `\\sqrt{${value}}`;
}

function tuple(values: Array<number | string>) {
  return `\\langle${values.join(",")}\\rangle`;
}

function point(values: Array<number | string>) {
  return `(${values.join(",")})`;
}

function signed(value: number, variable = "") {
  if (value === 0) return "";
  const magnitude = Math.abs(value);
  const coefficient = magnitude === 1 && variable ? "" : String(magnitude);
  return `${value > 0 ? "+" : "-"}${coefficient}${variable}`;
}

function shifted(variable: string, center: number) {
  return `(${variable}${signed(-center)})`;
}

function coefficient(value: number, variable: string) {
  if (value === 1) return variable;
  if (value === -1) return `-${variable}`;
  return `${value}${variable}`;
}

function linear2(a: number, x: string, b: number, y: string) {
  const first = a === -1 ? `-${x}` : a === 1 ? x : `${a}${x}`;
  return `${first}${signed(b, y)}`;
}

function linear3(a: number, x: string, b: number, y: string, c: number, z: string) {
  return `${linear2(a, x, b, y)}${signed(c, z)}`;
}

function cross(a: number[], b: number[]) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function dot(a: number[], b: number[]) {
  return a.reduce((sum, value, index) => sum + value * b[index], 0);
}

function normSquared(vector: number[]) {
  return dot(vector, vector);
}

function body(
  parameters: Body["parameters"],
  prompt: string,
  display: string | undefined,
  hint: string,
  steps: PracticeStep[],
  answer: string,
): Body {
  return {
    parameters,
    prompt,
    display,
    hint,
    steps,
    solution: steps.map((step) => step.explanation).join(" "),
    answer,
  };
}

const triples = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
] as const;

const triples3 = [
  [1, 2, 2, 3],
  [2, 3, 6, 7],
  [4, 4, 7, 9],
  [6, 6, 7, 11],
] as const;

const generators: Record<string, Generator> = {
  "u12c-1": (r) => {
    const [a, b, c] = r.pick(triples); const scale = r.int(1, 3); const p = [r.sign() * a * scale, r.sign() * b * scale, r.sign() * c * scale];
    const d2 = normSquared(p);
    return body({ p: p.join(","), d2 }, `Find the distance from the origin to P${point(p)}.`, undefined, "Use the three-dimensional distance formula.", [
      { label: "Set up", explanation: "Square each coordinate and add.", math: `d=\\sqrt{${p[0]}^2+${p[1]}^2+${p[2]}^2}` },
      { label: "Evaluate", explanation: `The sum of the squares is ${d2}.`, math: `d=\\sqrt{${d2}}` },
    ], `d=${radical(d2)}`);
  },
  "u12c-2": (r) => {
    const zeroIndex = r.int(0, 2); const coordinates = [r.nonzero(), r.nonzero(), r.nonzero()]; coordinates[zeroIndex] = 0;
    const planes = ["yz", "xz", "xy"]; const plane = planes[zeroIndex];
    return body({ zeroIndex, coordinates: coordinates.join(",") }, `State the coordinate plane containing the point ${point(coordinates)}.`, undefined, "A point lies in a coordinate plane when the omitted coordinate is zero.", [
      { label: "Inspect coordinates", explanation: `The ${["x", "y", "z"][zeroIndex]}-coordinate is zero.`, math: `${["x", "y", "z"][zeroIndex]}=0` },
      { label: "Name the plane", explanation: `Therefore the point lies in the ${plane}-plane.` },
    ], `\\text{The }${plane}\\text{-plane}`);
  },
  "u12c-3": (r) => {
    const center = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)]; const radius = r.int(2, 9);
    const factor = (variable: string, value: number) => value === 0 ? variable : `(${variable}${signed(-value)})`;
    const equation = `${factor("x", center[0])}^2+${factor("y", center[1])}^2+${factor("z", center[2])}^2=${radius ** 2}`;
    return body({ center: center.join(","), radius }, "Find the center and radius of the sphere.", equation, "Compare with (x−h)²+(y−k)²+(z−ℓ)²=r².", [
      { label: "Read the shifts", explanation: "Reverse the signs inside the three squared factors.", math: `C=${point(center)}` },
      { label: "Take the square root", explanation: "The radius is the positive square root of the right side.", math: `r=\\sqrt{${radius ** 2}}=${radius}` },
    ], `C=${point(center)},\\qquad r=${radius}`);
  },
  "u12v-1": (r) => {
    const p = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)]; const delta = [r.nonzero(-6, 6), r.nonzero(-6, 6), r.nonzero(-6, 6)]; const q = p.map((value, i) => value + delta[i]);
    return body({ p: p.join(","), q: q.join(",") }, `Find the vector from P${point(p)} to Q${point(q)}.`, undefined, "Compute Q−P component by component.", [
      { label: "Subtract endpoints", explanation: "Terminal point minus initial point gives the displacement.", math: `\\overrightarrow{PQ}=${tuple(q)}-${tuple(p)}` },
      { label: "Simplify", explanation: "Subtract corresponding coordinates.", math: `\\overrightarrow{PQ}=${tuple(delta)}` },
    ], `\\overrightarrow{PQ}=${tuple(delta)}`);
  },
  "u12v-2": (r) => {
    const [a, b, c, magnitude] = r.pick(triples3); const vector = [r.sign() * a, r.sign() * b, r.sign() * c];
    return body({ vector: vector.join(",") }, `Find the magnitude of ${tuple(vector)}.`, undefined, "Square the components, add, and take the square root.", [
      { label: "Use the norm", explanation: "The Euclidean norm is the square root of the sum of component squares.", math: `\\|\\mathbf v\\|=\\sqrt{(${vector[0]})^2+(${vector[1]})^2+(${vector[2]})^2}` },
      { label: "Evaluate", explanation: "Simplify the square root.", math: `\\|\\mathbf v\\|=${magnitude}` },
    ], String(magnitude));
  },
  "u12v-3": (r) => {
    const [a, b, c, magnitude] = r.pick(triples3); const vector = [r.sign() * a, r.sign() * b, r.sign() * c];
    return body({ vector: vector.join(",") }, `Find a unit vector in the direction of ${tuple(vector)}.`, undefined, "Divide the vector by its magnitude.", [
      { label: "Find the norm", explanation: "Compute the length of the given vector.", math: `\\|\\mathbf v\\|=${magnitude}` },
      { label: "Normalize", explanation: "Divide every component by the norm.", math: `\\mathbf u=\\frac{1}{${magnitude}}${tuple(vector)}` },
    ], `\\mathbf u=${tuple(vector.map((value) => fraction(value, magnitude)))}`);
  },
  "u12d-1": (r) => {
    const u = [r.nonzero(), r.nonzero(), r.nonzero()]; const v = [r.nonzero(), r.nonzero(), r.nonzero()]; const result = dot(u, v);
    return body({ u: u.join(","), v: v.join(",") }, "Compute the dot product.", `\\mathbf u=${tuple(u)},\\qquad\\mathbf v=${tuple(v)}`, "Multiply corresponding components and add.", [
      { label: "Multiply components", explanation: "Pair entries in the same positions.", math: `\\mathbf u\\cdot\\mathbf v=(${u[0]})(${v[0]})+(${u[1]})(${v[1]})+(${u[2]})(${v[2]})` },
      { label: "Add", explanation: "Combine the three products.", math: `\\mathbf u\\cdot\\mathbf v=${result}` },
    ], String(result));
  },
  "u12d-2": (r) => {
    const a = r.nonzero(-4, 4); const b = r.nonzero(-4, 4); const c = r.nonzero(-4, 4); const d = r.nonzero(-4, 4); const k = r.int(-5, 5); const e = -(a * c + b * d * k); const u = [a, b * k, 1]; const v = [c, d, e];
    return body({ a, b, c, d, e, k }, "Find k so the vectors are orthogonal.", `${tuple([a, `${b}k`, 1])}\\quad\\text{and}\\quad${tuple(v)}`, "Set the dot product equal to zero.", [
      { label: "Form the dot product", explanation: "Orthogonal vectors have dot product zero.", math: `${a * c}${signed(b * d, "k")}${signed(e)}=0` },
      { label: "Solve", explanation: "Isolate k in the linear equation.", math: `k=${k}` },
    ], `k=${k}`);
  },
  "u12d-3": (r) => {
    const v = r.pick([[1, 2, 2], [2, 1, 2], [2, 2, 1]] as const).map((value) => value * r.sign()); const multiplier = r.int(-3, 3) || 2; const perpendicular = [v[1], -v[0], 0]; const u = v.map((value, i) => multiplier * value + perpendicular[i]); const uv = dot(u, v); const vv = normSquared(v);
    return body({ u: u.join(","), v: v.join(",") }, "Find the vector projection of u onto v.", `\\mathbf u=${tuple(u)},\\qquad\\mathbf v=${tuple(v)}`, "Use projᵥu=((u·v)/(v·v))v.", [
      { label: "Compute the scalar", explanation: "Find both dot products in the projection coefficient.", math: `\\mathbf u\\cdot\\mathbf v=${uv},\\qquad\\mathbf v\\cdot\\mathbf v=${vv}` },
      { label: "Scale v", explanation: "Multiply v by the resulting coefficient.", math: `\\operatorname{proj}_{\\mathbf v}\\mathbf u=${fraction(uv, vv)}${tuple(v)}` },
    ], `\\operatorname{proj}_{\\mathbf v}\\mathbf u=${tuple(v.map((value) => fraction(uv * value, vv)))}`);
  },
  "u12x-1": (r) => {
    const a = [r.nonzero(), r.nonzero(), r.nonzero()]; const b = [r.nonzero(), r.nonzero(), r.nonzero()]; const result = cross(a, b);
    return body({ a: a.join(","), b: b.join(",") }, "Compute a×b.", `\\mathbf a=${tuple(a)},\\qquad\\mathbf b=${tuple(b)}`, "Use the determinant expansion and check the middle-component sign.", [
      { label: "Set up components", explanation: "Apply (a₂b₃−a₃b₂, a₃b₁−a₁b₃, a₁b₂−a₂b₁).", math: `\\mathbf a\\times\\mathbf b=${tuple([`(${a[1]})(${b[2]})-(${a[2]})(${b[1]})`, `(${a[2]})(${b[0]})-(${a[0]})(${b[2]})`, `(${a[0]})(${b[1]})-(${a[1]})(${b[0]})`])}` },
      { label: "Simplify", explanation: "Evaluate each component.", math: `\\mathbf a\\times\\mathbf b=${tuple(result)}` },
    ], tuple(result));
  },
  "u12x-2": (r) => {
    const p = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)]; const a = r.int(2, 7); const b = r.int(2, 7); const q = [p[0] + a, p[1], p[2]]; const s = [p[0], p[1] + b, p[2]]; const area = a * b / 2;
    return body({ p: p.join(","), q: q.join(","), r: s.join(",") }, `Find the area of the triangle with P${point(p)}, Q${point(q)}, and R${point(s)}.`, undefined, "The triangle area is one half the magnitude of PQ×PR.", [
      { label: "Build side vectors", explanation: "Use two sides with a common initial point.", math: `\\overrightarrow{PQ}=${tuple([a, 0, 0])},\\qquad\\overrightarrow{PR}=${tuple([0, b, 0])}` },
      { label: "Cross and halve", explanation: "The cross-product magnitude is the parallelogram area.", math: `A=\\frac12\\left\\|${tuple([0, 0, a * b])}\\right\\|=${fraction(a * b, 2)}` },
    ], `A=${fraction(a * b, 2)}`);
  },
  "u12x-3": (r) => {
    const a = [r.nonzero(-3, 3), r.nonzero(-3, 3), r.nonzero(-3, 3)]; const b = [r.nonzero(-3, 3), r.nonzero(-3, 3), r.nonzero(-3, 3)]; const coplanar = r.next() < 0.5; const c = coplanar ? a.map((value, i) => r.int(-2, 2) * value + b[i]) : [a[0] + b[0], a[1] + b[1], a[2] + b[2] + r.sign()]; const triple = dot(a, cross(b, c));
    return body({ a: a.join(","), b: b.join(","), c: c.join(",") }, "Determine whether the three vectors are coplanar.", `${tuple(a)},\\quad${tuple(b)},\\quad${tuple(c)}`, "Compute a scalar triple product.", [
      { label: "Evaluate the triple product", explanation: "Three vectors are coplanar exactly when a·(b×c)=0.", math: `\\mathbf a\\cdot(\\mathbf b\\times\\mathbf c)=${triple}` },
      { label: "Classify", explanation: triple === 0 ? "A zero triple product proves coplanarity." : "A nonzero triple product gives nonzero volume, so the vectors are not coplanar." },
    ], triple === 0 ? "\\text{Coplanar}" : "\\text{Not coplanar}");
  },
  "u12l-1": (r) => {
    const p = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)]; const direction = [r.nonzero(), r.nonzero(), r.nonzero()]; const q = p.map((value, i) => value + direction[i]);
    return body({ p: p.join(","), q: q.join(",") }, `Parameterize the segment from P${point(p)} to Q${point(q)}.`, undefined, "Use P+t(Q−P), 0≤t≤1.", [
      { label: "Find the direction", explanation: "Subtract the initial point from the terminal point.", math: `\\overrightarrow{PQ}=${tuple(direction)}` },
      { label: "Parameterize", explanation: "Start at P and travel a fraction t of the displacement.", math: `\\mathbf r(t)=${tuple(p)}+t${tuple(direction)},\\quad0\\le t\\le1` },
    ], `\\mathbf r(t)=${tuple(p)}+t${tuple(direction)},\\quad0\\le t\\le1`);
  },
  "u12l-2": (r) => {
    const normal = r.pick([[1, 2, 2], [2, -2, 1], [3, 4, 0]] as const).map(Number); const normalLength = Math.sqrt(normSquared(normal)); const p = [r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)]; const distance = r.int(1, 5); const constant = -dot(normal, p) + r.sign() * distance * normalLength; const numerator = Math.abs(dot(normal, p) + constant);
    return body({ normal: normal.join(","), point: p.join(","), constant, distance }, `Find the distance from ${point(p)} to the plane.`, `${linear3(normal[0], "x", normal[1], "y", normal[2], "z")}${signed(constant)}=0`, "Use |Ax₀+By₀+Cz₀+D|/√(A²+B²+C²).", [
      { label: "Substitute the point", explanation: "Evaluate the plane expression at the point and take its absolute value.", math: `|Ax_0+By_0+Cz_0+D|=${numerator}` },
      { label: "Divide by the normal length", explanation: `The normal has magnitude ${normalLength}.`, math: `d=\\frac{${numerator}}{${normalLength}}=${distance}` },
    ], `d=${distance}`);
  },
  "u12l-3": (r) => {
    const n = [r.nonzero(-4, 4), r.nonzero(-4, 4), r.nonzero(-4, 4)]; const d = r.nonzero(-8, 8); const scale = r.pick([-3, -2, 2, 3]); const coincident = r.next() < 0.5; const d2 = coincident ? scale * d : scale * d + r.sign() * r.int(1, 4);
    return body({ normal: n.join(","), d, scale, d2, coincident }, "Classify the two planes.", `${linear3(n[0], "x", n[1], "y", n[2], "z")}=${d},\\qquad${linear3(scale * n[0], "x", scale * n[1], "y", scale * n[2], "z")}=${d2}`, "Compare normal vectors, then compare the complete equations.", [
      { label: "Compare normals", explanation: `The second normal is ${scale} times the first, so the planes are parallel or coincident.` },
      { label: "Compare constants", explanation: coincident ? "The right side scales by the same factor, so both equations describe the same plane." : "The right side does not scale by the same factor, so the planes are distinct." },
    ], coincident ? "\\text{Coincident planes}" : "\\text{Distinct parallel planes}");
  },
  "u12q-1": (r) => {
    const missing = r.pick(["x", "y", "z"] as const); const present = ["x", "y", "z"].filter((item) => item !== missing); const a = r.int(2, 6); const b = r.next() < 0.5 ? a : r.int(2, 7); const rhs = (a * b) ** 2; const equation = `${b ** 2}${present[0]}^2+${a ** 2}${present[1]}^2=${rhs}`; const kind = a === b ? "Circular" : "Elliptic";
    return body({ missing, a, b }, "Classify the surface and state its direction of extension.", equation, "The missing variable identifies the direction of the cylinder.", [
      { label: "Identify the cross-section", explanation: `${equation} is ${kind.toLowerCase()} in the ${present.join("")}-plane.` },
      { label: "Use the missing variable", explanation: `${missing} is unrestricted, so the cross-section extends parallel to the ${missing}-axis.` },
    ], `\\text{${kind} cylinder parallel to the }${missing}\\text{-axis}`);
  },
  "u12q-2": (r) => {
    const axis = r.pick(["x", "y", "z"] as const); const twoSheets = r.next() < 0.5; const others = ["x", "y", "z"].filter((item) => item !== axis); const a = r.int(2, 5); const b = r.int(2, 5); const c = r.int(2, 5); const equation = twoSheets ? `\\frac{${axis}^2}{${a ** 2}}-\\frac{${others[0]}^2}{${b ** 2}}-\\frac{${others[1]}^2}{${c ** 2}}=1` : `\\frac{${others[0]}^2}{${b ** 2}}+\\frac{${others[1]}^2}{${c ** 2}}-\\frac{${axis}^2}{${a ** 2}}=1`;
    return body({ axis, twoSheets, a, b, c }, "Classify the surface and state its axis.", equation, "Count the positive and negative squared terms after the equation is set equal to 1.", [
      { label: "Inspect signs", explanation: twoSheets ? "One squared term is positive and two are negative: this is a two-sheet hyperboloid." : "Two squared terms are positive and one is negative: this is a one-sheet hyperboloid." },
      { label: "Identify the axis", explanation: `The distinguished ${axis}-term determines the ${axis}-axis.` },
    ], `\\text{Hyperboloid of ${twoSheets ? "two sheets" : "one sheet"} with }${axis}\\text{-axis}`);
  },
  "u12q-3": (r) => {
    const axis = r.pick(["x", "y", "z"] as const); const others = ["x", "y", "z"].filter((item) => item !== axis); const direction = r.sign(); const a = r.int(1, 6); const b = r.int(1, 6); const equation = `${direction < 0 ? "-" : ""}${axis}=${a}${others[0]}^2+${b}${others[1]}^2`;
    return body({ axis, direction, a, b }, "Classify the surface and state its opening direction.", equation, "The first-power variable is the axis; its sign determines the opening direction.", [
      { label: "Classify", explanation: "A first-power variable equal to a sum of positive squared terms describes an elliptic paraboloid." },
      { label: "Determine direction", explanation: `Solving for ${axis} shows that it opens in the ${direction > 0 ? "positive" : "negative"} ${axis}-direction.` },
    ], `\\text{Elliptic paraboloid opening in the }${direction > 0 ? "+" : "-"}${axis}\\text{ direction}`);
  },
  "v-1": (r) => {
    const a = r.nonzero(-4, 4); const b = r.nonzero(-4, 4); const c = r.nonzero(-4, 4); const t0 = r.int(-2, 2); const velocity = [2 * a * t0, b, 2 * c * t0]; const acceleration = [2 * a, 0, 2 * c]; const speed2 = normSquared(velocity);
    return body({ a, b, c, t0 }, `Find velocity, acceleration, and speed at t=${t0}.`, `\\mathbf r(t)=${tuple([`${a}t^2`, `${b}t`, `${c}t^2`])}`, "Differentiate componentwise, evaluate, and take the velocity magnitude.", [
      { label: "Differentiate", explanation: "Velocity is r′ and acceleration is r″.", math: `\\mathbf v(t)=${tuple([`${2 * a}t`, b, `${2 * c}t`])},\\quad\\mathbf a(t)=${tuple(acceleration)}` },
      { label: "Evaluate", explanation: `Substitute t=${t0}.`, math: `\\mathbf v(${t0})=${tuple(velocity)},\\quad\\mathbf a(${t0})=${tuple(acceleration)}` },
      { label: "Find speed", explanation: "Speed is the magnitude of velocity.", math: `\\|\\mathbf v(${t0})\\|=\\sqrt{${speed2}}` },
    ], `\\mathbf v(${t0})=${tuple(velocity)},\\quad\\mathbf a(${t0})=${tuple(acceleration)},\\quad\\text{speed}=\\sqrt{${speed2}}`);
  },
  "v-2": (r) => {
    const a = r.nonzero(-3, 3); const b = r.nonzero(-3, 3); const c = r.nonzero(-3, 3); const t0 = r.nonzero(-2, 2); const p = [a * t0, b * t0 ** 2, c * t0 ** 3]; const v = [a, 2 * b * t0, 3 * c * t0 ** 2];
    return body({ a, b, c, t0 }, `Find a vector equation of the tangent line at t=${t0}.`, `\\mathbf r(t)=${tuple([coefficient(a, "t"), coefficient(b, "t^2"), coefficient(c, "t^3")])}`, "Use r(t₀) as the point and r′(t₀) as the direction.", [
      { label: "Find the point", explanation: "Evaluate the curve at the target parameter.", math: `\\mathbf r(${t0})=${tuple(p)}` },
      { label: "Find the direction", explanation: "Differentiate and evaluate.", math: `\\mathbf r'(${t0})=${tuple(v)}` },
      { label: "Write the line", explanation: "Use point plus a new scalar times direction.", math: `\\mathbf L(s)=${tuple(p)}+s${tuple(v)}` },
    ], `\\mathbf L(s)=${tuple(p)}+s${tuple(v)}`);
  },
  "v-3": (r) => {
    const t0 = r.int(-3, 3); const a = r.int(1, 4); const b = r.int(1, 4); const first = `${a}t^2${signed(-2 * a * t0, "t")}`; const second = `${b}t^3${signed(-3 * b * t0, "t^2")}${signed(3 * b * t0 ** 2, "t")}`;
    return body({ t0, a, b }, "Determine all times when the particle is at rest.", `\\mathbf r(t)=${tuple([first, second, r.int(-5, 5)])}`, "Set every component of r′(t) equal to zero at the same time.", [
      { label: "Differentiate", explanation: "Factor the nonconstant velocity components.", math: `\\mathbf v(t)=${tuple([`${2 * a}${shifted("t", t0)}`, `${3 * b}${shifted("t", t0)}^2`, 0])}` },
      { label: "Solve simultaneously", explanation: "Both nonconstant components vanish only at the shared root.", math: `t=${t0}` },
    ], `t=${t0}`);
  },
  "a-1": (r) => {
    const [a, b, c] = r.pick(triples); const duration = r.int(1, 5); const start = r.int(-3, 2); const end = start + duration; const velocity = [r.sign() * a, r.sign() * b, 0];
    return body({ velocity: velocity.join(","), start, end }, `Find the arc length on ${start}≤t≤${end}.`, `\\mathbf r(t)=${tuple([`${velocity[0]}t`, `${velocity[1]}t`, c])}`, "This line has constant speed.", [
      { label: "Differentiate", explanation: "The velocity vector is constant.", math: `\\mathbf r'(t)=${tuple([velocity[0], velocity[1], 0])}` },
      { label: "Find speed", explanation: "Use the matching Pythagorean triple.", math: `\\|\\mathbf r'(t)\\|=${c}` },
      { label: "Integrate", explanation: "Multiply constant speed by the interval length.", math: `L=\\int_{${start}}^{${end}}${c}\\,dt=${c * duration}` },
    ], `L=${c * duration}`);
  },
  "a-2": (r) => {
    const [a, b, c] = r.pick(triples); const duration = r.int(2, 7); const start = r.int(-4, 1); const end = start + duration;
    return body({ a, b, c, start, end }, `Find the distance traveled from t=${start} to t=${end}.`, `\\mathbf r(t)=${tuple([`${a}t`, `${b}t`, r.int(-5, 5)])}`, "Distance traveled is the integral of speed.", [
      { label: "Find speed", explanation: "The derivative is constant and has magnitude from the Pythagorean triple.", math: `\\|\\mathbf r'(t)\\|=\\sqrt{${a ** 2}+${b ** 2}}=${c}` },
      { label: "Accumulate distance", explanation: "Integrate over the time interval.", math: `\\int_{${start}}^{${end}}${c}\\,dt=${c * duration}` },
    ], `L=${c * duration}`);
  },
  "a-3": (r) => {
    const [a, b, c] = r.pick(triples); const unit = r.next() < 0.5; const multiplier = unit ? 1 : r.int(2, 4); const denominator = c; const speed = multiplier;
    return body({ a, b, c, multiplier, unit }, "Is this a unit-speed parametrization?", `\\mathbf r(s)=${tuple([`${fraction(multiplier * a, denominator)}s`, `${fraction(multiplier * b, denominator)}s`, r.int(-5, 5)])}`, "Differentiate and compute the derivative magnitude.", [
      { label: "Differentiate", explanation: "The derivative is the constant direction vector." },
      { label: "Compute speed", explanation: "Use a²+b²=c².", math: `\\|\\mathbf r'(s)\\|=${speed}` },
      { label: "Decide", explanation: unit ? "The speed equals 1, so the parametrization is unit-speed." : "The speed is not 1, so the parametrization is not unit-speed." },
    ], unit ? "\\text{Yes}" : `\\text{No; speed }=${speed}`);
  },
  "c-1": (r) => {
    const radius = r.int(2, 8); const pitch = r.int(0, 5); const denominator = radius ** 2 + pitch ** 2;
    return body({ radius, pitch }, "Find the curvature of the curve for all t.", `\\mathbf r(t)=${tuple([`${radius}\\cos t`, `${radius}\\sin t`, `${pitch}t`])}`, "Use κ=||r′×r″||/||r′||³.", [
      { label: "Differentiate", explanation: "Compute velocity and acceleration.", math: `\\mathbf r'=${tuple([`-${radius}\\sin t`, `${radius}\\cos t`, pitch])},\\quad\\mathbf r''=${tuple([`-${radius}\\cos t`, `-${radius}\\sin t`, 0])}` },
      { label: "Use the helix simplification", explanation: "The derivative norms are constant.", math: `\\|\\mathbf r'\\|=\\sqrt{${denominator}},\\quad\\|\\mathbf r'\\times\\mathbf r''\\|=${radius}\\sqrt{${denominator}}` },
      { label: "Simplify", explanation: "Cancel the common square-root factor.", math: `\\kappa=${fraction(radius, denominator)}` },
    ], `\\kappa=${fraction(radius, denominator)}`);
  },
  "c-2": (r) => {
    const rho = r.int(2, 10); const denominator = 2 * rho;
    return body({ rho }, "Find the radius of curvature at the origin.", `y=\\frac{x^2}{${denominator}}`, "For y=f(x), use κ=|y″|/(1+(y′)²)^(3/2), then take the reciprocal.", [
      { label: "Differentiate", explanation: "Find the first two derivatives.", math: `y'=\\frac{x}{${rho}},\\qquad y''=\\frac1{${rho}}` },
      { label: "Evaluate curvature", explanation: "At x=0, the slope term vanishes.", math: `\\kappa(0)=\\frac1{${rho}}` },
      { label: "Take the reciprocal", explanation: "Radius of curvature is ρ=1/κ.", math: `\\rho=${rho}` },
    ], `\\rho=${rho}`);
  },
  "c-3": (r) => {
    const numerator = r.int(1, 5); const denominator = r.int(numerator + 1, 12);
    return body({ numerator, denominator }, `A plane curve has constant curvature ${fraction(numerator, denominator)}. Find the radius of its osculating circle.`, undefined, "Radius of curvature is the reciprocal of curvature.", [
      { label: "Use the reciprocal relationship", explanation: "Substitute the given curvature into ρ=1/κ.", math: `\\rho=\\frac{1}{${fraction(numerator, denominator)}}` },
      { label: "Simplify", explanation: "Invert the fraction.", math: `\\rho=${fraction(denominator, numerator)}` },
    ], `\\rho=${fraction(denominator, numerator)}`);
  },
  "t-1": (r) => {
    const radius = r.int(1, 6); const pitch = r.int(1, 6); const norm2 = radius ** 2 + pitch ** 2;
    return body({ radius, pitch }, "Find T at t=0.", `\\mathbf r(t)=${tuple([`${radius}\\cos t`, `${radius}\\sin t`, `${pitch}t`])}`, "Evaluate r′(0), then normalize.", [
      { label: "Find velocity", explanation: "Differentiate and substitute t=0.", math: `\\mathbf r'(0)=${tuple([0, radius, pitch])}` },
      { label: "Normalize", explanation: "Divide by the velocity magnitude.", math: `\\mathbf T(0)=\\frac1{\\sqrt{${norm2}}}${tuple([0, radius, pitch])}` },
    ], `\\mathbf T(0)=\\frac1{\\sqrt{${norm2}}}${tuple([0, radius, pitch])}`);
  },
  "t-2": (r) => {
    const radius = r.int(1, 6); const pitch = r.int(1, 6);
    return body({ radius, pitch }, `For r(t)=⟨${radius}cos t,${radius}sin t,${pitch}t⟩, find the osculating plane at t=0.`, undefined, "The osculating plane passes through r(0) and has normal r′(0)×r″(0).", [
      { label: "Find the point", explanation: "Evaluate the curve at zero.", math: `\\mathbf r(0)=${tuple([radius, 0, 0])}` },
      { label: "Find a normal", explanation: "A binormal direction is r′×r″.", math: `\\mathbf n\\parallel${tuple([0, -pitch, radius])}` },
      { label: "Write the plane", explanation: "Use n·((x,y,z)−r(0))=0.", math: `${-pitch}y${signed(radius, "z")}=0` },
    ], `${-pitch}y${signed(radius, "z")}=0`);
  },
  "t-3": (r) => {
    const speed = r.int(2, 8); const rate = r.int(-5, 5); const kNumerator = r.int(1, 5); const kDenominator = r.int(2, 8); const normalNumerator = kNumerator * speed ** 2;
    return body({ speed, rate, kNumerator, kDenominator }, `A particle has speed ${speed}, dv/dt=${rate}, and κ=${fraction(kNumerator, kDenominator)}. Find a_T and a_N.`, undefined, "Use a_T=dv/dt and a_N=κv².", [
      { label: "Tangential component", explanation: "Tangential acceleration is the rate of change of speed.", math: `a_T=${rate}` },
      { label: "Normal component", explanation: "Substitute curvature and speed into κv².", math: `a_N=${fraction(kNumerator, kDenominator)}(${speed})^2=${fraction(normalNumerator, kDenominator)}` },
    ], `a_T=${rate},\\qquad a_N=${fraction(normalNumerator, kDenominator)}`);
  },
  "u13m-1": (r) => {
    const a = r.nonzero(-4, 4); const b = r.nonzero(-4, 4); const c = r.nonzero(-4, 4); const t0 = r.int(-2, 2); const velocity = [2 * a * t0, b, 3 * c * t0 ** 2]; const acceleration = [2 * a, 0, 6 * c * t0]; const speed2 = normSquared(velocity);
    return body({ a, b, c, t0 }, `Find v(t), a(t), and the speed at t=${t0}.`, `\\mathbf r(t)=${tuple([coefficient(a, "t^2"), coefficient(b, "t"), coefficient(c, "t^3")])}`, "Differentiate componentwise twice.", [
      { label: "Velocity", explanation: "Differentiate position once.", math: `\\mathbf v(t)=${tuple([`${2 * a}t`, b, `${3 * c}t^2`])}` },
      { label: "Acceleration", explanation: "Differentiate velocity.", math: `\\mathbf a(t)=${tuple([2 * a, 0, `${6 * c}t`])}` },
      { label: "Speed", explanation: "Evaluate velocity and take its magnitude.", math: `\\mathbf v(${t0})=${tuple(velocity)},\\quad\\|\\mathbf v(${t0})\\|=\\sqrt{${speed2}}` },
    ], `\\mathbf v(t)=${tuple([`${2 * a}t`, b, `${3 * c}t^2`])},\\quad\\mathbf a(t)=${tuple([2 * a, 0, `${6 * c}t`])},\\quad\\text{speed at }t=${t0}\\text{ is }\\sqrt{${speed2}}`);
  },
  "u13m-2": (r) => {
    const [a, b, c] = r.pick(triples); const k = r.nonzero(-4, 4); const velocity = [a, b, 0]; const acceleration = [-k * b, k * a, 0]; const normal = Math.abs(k) * c;
    return body({ velocity: velocity.join(","), acceleration: acceleration.join(",") }, `At one instant v=${tuple(velocity)} and a=${tuple(acceleration)}. Find a_T and a_N and describe the speed.`, undefined, "Use a_T=(v·a)/||v|| and a_N=||v×a||/||v||.", [
      { label: "Tangential part", explanation: "The dot product is zero.", math: `a_T=\\frac{\\mathbf v\\cdot\\mathbf a}{\\|\\mathbf v\\|}=0` },
      { label: "Normal part", explanation: "The acceleration is perpendicular to velocity, so all of it is normal.", math: `a_N=\\|\\mathbf a\\|=${normal}` },
      { label: "Interpret", explanation: "Because a_T=0, speed is momentarily constant." },
    ], `a_T=0,\\qquad a_N=${normal};\\qquad\\text{speed is momentarily constant}`);
  },
  "u13m-3": (r) => {
    const speed = r.int(2, 8); const kNum = r.int(1, 4); const kDen = r.int(2, 6); const tangential = r.nonzero(-6, 6); const normalNum = kNum * speed ** 2; const accelerationSquaredNum = tangential ** 2 * kDen ** 2 + normalNum ** 2;
    return body({ speed, kNum, kDen, tangential }, `A particle has speed ${speed}, curvature ${fraction(kNum, kDen)}, and a_T=${tangential}. Find a_N and ||a||, then interpret the sign of a_T.`, undefined, "Use a_N=κv² and ||a||=√(a_T²+a_N²).", [
      { label: "Normal acceleration", explanation: "Multiply curvature by speed squared.", math: `a_N=${fraction(normalNum, kDen)}` },
      { label: "Acceleration magnitude", explanation: "Tangential and normal components are perpendicular.", math: `\\|\\mathbf a\\|=\\sqrt{${tangential}^2+(${fraction(normalNum, kDen)})^2}=\\frac{\\sqrt{${accelerationSquaredNum}}}{${kDen}}` },
      { label: "Interpret", explanation: tangential > 0 ? "Positive tangential acceleration means the particle is speeding up." : "Negative tangential acceleration means the particle is slowing down." },
    ], `a_N=${fraction(normalNum, kDen)},\\qquad\\|\\mathbf a\\|=\\frac{\\sqrt{${accelerationSquaredNum}}}{${kDen}};\\qquad\\text{${tangential > 0 ? "speeding up" : "slowing down"}}`);
  },
  "m-1": (r) => {
    const a = r.int(1, 5); const b = r.int(1, 5); const radius = r.int(2, 7);
    return body({ a, b, radius }, "Find the domain.", `f(x,y)=\\ln(${radius ** 2}-${a}x^2-${b}y^2)`, "The argument of a logarithm must be strictly positive.", [
      { label: "Impose the restriction", explanation: "Set the logarithm's input greater than zero.", math: `${radius ** 2}-${a}x^2-${b}y^2>0` },
      { label: "Rearrange", explanation: "Write the domain as the interior of an ellipse.", math: `${a}x^2+${b}y^2<${radius ** 2}` },
    ], `${a}x^2+${b}y^2<${radius ** 2}`);
  },
  "m-2": (r) => {
    const a = r.int(1, 6); const b = r.int(1, 6);
    return body({ a, b }, "Describe the level curves for c>0.", `f(x,y)=\\sqrt{${a}x^2+${b}y^2}`, "Set f=c and square both sides.", [
      { label: "Set the level", explanation: "Replace the function value by c.", math: `\\sqrt{${a}x^2+${b}y^2}=c` },
      { label: "Square", explanation: "Because c>0, squaring preserves the level set.", math: `${a}x^2+${b}y^2=c^2` },
      { label: "Classify", explanation: a === b ? "These are circles centered at the origin." : "These are ellipses centered at the origin." },
    ], `${a}x^2+${b}y^2=c^2\\text{, ${a === b ? "circles" : "ellipses"} centered at the origin}`);
  },
  "m-3": (r) => {
    const a = r.int(1, 8);
    return body({ a }, "Determine the limit, or show that it does not exist.", `\\lim_{(x,y)\\to(0,0)}\\frac{x^2-${a}y^2}{x^2+${a}y^2}`, "Compare the paths y=0 and x=0.", [
      { label: "Path y=0", explanation: "Substitution gives a constant value away from the origin.", math: `\\frac{x^2}{x^2}=1` },
      { label: "Path x=0", explanation: "Substitution gives a different constant value.", math: `\\frac{-${a}y^2}{${a}y^2}=-1` },
      { label: "Compare", explanation: "Different path limits mean the two-variable limit does not exist." },
    ], "\\text{DNE}");
  },
  "p-1": (r) => {
    const a = r.int(2, 5); const b = r.int(2, 5); const sign = r.sign(); const inside = sign > 0 ? "x+y" : "x-y";
    return body({ a, b, sign }, "Find f_x and f_y.", `f(x,y)=x^{${a}}y^{${b}}+\\ln(${inside})`, "Hold the other independent variable constant in each partial derivative.", [
      { label: "Differentiate with respect to x", explanation: "Apply the power rule and the one-variable chain rule.", math: `f_x=${a}x^{${a - 1}}y^{${b}}+\\frac1{${inside}}` },
      { label: "Differentiate with respect to y", explanation: "Now treat x as constant.", math: `f_y=${b}x^{${a}}y^{${b - 1}}${sign > 0 ? "+" : "-"}\\frac1{${inside}}` },
    ], `f_x=${a}x^{${a - 1}}y^{${b}}+\\frac1{${inside}},\\qquad f_y=${b}x^{${a}}y^{${b - 1}}${sign > 0 ? "+" : "-"}\\frac1{${inside}}`);
  },
  "p-2": (r) => {
    const a = r.int(1, 5); const b = r.int(1, 5); const y0 = r.int(1, 5); const answer = a * y0 + b;
    return body({ a, b, y0 }, "Evaluate the indicated partial derivative.", `f(x,y,z)=${a}ye^{xz}+${b}x^2\\sin z,\\qquad f_z(1,${y0},0)`, "For f_z, treat x and y as constants.", [
      { label: "Differentiate", explanation: "Apply the chain rule to the exponential and differentiate sin z.", math: `f_z=${a}xye^{xz}+${b}x^2\\cos z` },
      { label: "Substitute", explanation: "Use e⁰=1 and cos 0=1.", math: `f_z(1,${y0},0)=${a}(${y0})+${b}=${answer}` },
    ], `f_z(1,${y0},0)=${answer}`);
  },
  "p-3": (r) => {
    const a = r.int(1, 5); const b = r.int(1, 5);
    return body({ a, b }, "Find f_xx, f_xy, f_yx, and f_yy.", `f(x,y)=${coefficient(a, "x^3y")}+${coefficient(b, "xy^2")}`, "Find the first partials, then differentiate again.", [
      { label: "First partials", explanation: "Differentiate with respect to x and y separately.", math: `f_x=${coefficient(3 * a, "x^2y")}+${coefficient(b, "y^2")},\\qquad f_y=${coefficient(a, "x^3")}+${coefficient(2 * b, "xy")}` },
      { label: "Second partials", explanation: "Differentiate each first partial once more.", math: `f_{xx}=${coefficient(6 * a, "xy")},\\quad f_{xy}=${coefficient(3 * a, "x^2")}+${coefficient(2 * b, "y")},\\quad f_{yx}=${coefficient(3 * a, "x^2")}+${coefficient(2 * b, "y")},\\quad f_{yy}=${coefficient(2 * b, "x")}` },
    ], `f_{xx}=${coefficient(6 * a, "xy")},\\quad f_{xy}=f_{yx}=${coefficient(3 * a, "x^2")}+${coefficient(2 * b, "y")},\\quad f_{yy}=${coefficient(2 * b, "x")}`);
  },
  "tp-1": (r) => {
    const [x0, z0, radius] = r.pick(triples); const sx = r.sign(); const sz = r.sign(); const x = sx * x0; const z = sz * z0;
    return body({ x, z, radius }, `Find the tangent plane at ${point([x, 0, z])}.`, `z=${sz < 0 ? "-" : ""}\\sqrt{${radius ** 2}-x^2-y^2}`, "For the sphere x²+y²+z²=R², the radius vector is normal to the tangent plane.", [
      { label: "Find a normal", explanation: "The gradient of x²+y²+z² is parallel to the radius vector.", math: `\\mathbf n=${tuple([x, 0, z])}` },
      { label: "Use point-normal form", explanation: "Expand n·((x,y,z)−P)=0.", math: `${x}x${signed(z, "z")}=${radius ** 2}` },
    ], `${x}x${signed(z, "z")}=${radius ** 2}`);
  },
  "tp-2": (r) => {
    const [a, b, c] = r.pick(triples); const p = [r.sign() * a, r.sign() * b, 0];
    return body({ p: p.join(","), radius: c }, `Find a vector equation of the normal line at ${point(p)}.`, `x^2+y^2+z^2=${c ** 2}`, "The gradient of the implicit surface gives a normal direction.", [
      { label: "Compute the gradient", explanation: "For F=x²+y²+z², ∇F=⟨2x,2y,2z⟩.", math: `\\nabla F${point(p)}=${tuple(p.map((value) => 2 * value))}` },
      { label: "Simplify the direction", explanation: "Any nonzero scalar multiple of the gradient works.", math: `\\mathbf n=${tuple(p)}` },
      { label: "Write the line", explanation: "Use point plus parameter times normal direction.", math: `\\mathbf r(t)=${tuple(p)}+t${tuple(p)}` },
    ], `\\mathbf r(t)=${tuple(p)}+t${tuple(p)}`);
  },
  "tp-3": (r) => {
    const a = r.int(1, 4); const b = r.int(1, 4); const dxHundredths = r.int(1, 4); const dyHundredths = r.int(-4, 4); const dx = dxHundredths / 100; const dy = dyHundredths / 100; const estimate = 1 + a * dx + b * dy;
    return body({ a, b, dx, dy }, `Find the linearization at (0,0), then estimate f(${decimal(dx, 2)},${decimal(dy, 2)}).`, `f(x,y)=e^{${coefficient(a, "x")}+${coefficient(b, "y")}}`, "Compute f, f_x, and f_y at the base point.", [
      { label: "Base-point data", explanation: "Evaluate the function and its first partials at the origin.", math: `f(0,0)=1,\\quad f_x(0,0)=${a},\\quad f_y(0,0)=${b}` },
      { label: "Linearization", explanation: "Use L=f(a,b)+f_x(a,b)(x−a)+f_y(a,b)(y−b).", math: `L(x,y)=1+${coefficient(a, "x")}+${coefficient(b, "y")}` },
      { label: "Estimate", explanation: "Substitute the nearby coordinates into L.", math: `f(${decimal(dx, 2)},${decimal(dy, 2)})\\approx${decimal(estimate, 4)}` },
    ], `L(x,y)=1+${coefficient(a, "x")}+${coefficient(b, "y")},\\qquad f(${decimal(dx, 2)},${decimal(dy, 2)})\\approx${decimal(estimate, 4)}`);
  },
  "tp-4": (r) => {
    const a = r.int(1, 5); const y0 = r.int(1, 5); const dxHundredths = r.nonzero(-5, 5); const dyHundredths = r.nonzero(-5, 5); const dx = dxHundredths / 100; const dy = dyHundredths / 100; const fx = a * y0 ** 2; const change = fx * dx;
    return body({ a, y0, dx, dy }, `Use differentials to estimate the change when x changes by ${decimal(dx, 2)} and y changes by ${decimal(dy, 2)} from (0,${y0}).`, `f(x,y)=${a}xy^2+\\cos x`, "Compute dz=f_x dx+f_y dy at the base point.", [
      { label: "Compute partials", explanation: "Differentiate the function.", math: `f_x=${a}y^2-\\sin x,\\qquad f_y=${2 * a}xy` },
      { label: "Evaluate", explanation: "At the base point, the y-part is zero.", math: `f_x(0,${y0})=${fx},\\qquad f_y(0,${y0})=0` },
      { label: "Apply the differential", explanation: "Substitute the coordinate changes.", math: `dz=${fx}(${decimal(dx, 2)})+0(${decimal(dy, 2)})=${decimal(change, 4)}` },
    ], `\\Delta f\\approx dz=${decimal(change, 4)}`);
  },
  "cl-1": (r) => {
    const a = r.int(1, 5); const b = r.int(1, 5);
    return body({ a, b }, "Find f_xy and f_yx, then verify Clairaut's theorem.", `f(x,y)=${coefficient(a, "x^3\\cos y")}+${coefficient(b, "y^3\\sin x")}`, "Compute the mixed partials independently and compare them.", [
      { label: "Differentiate x then y", explanation: "First find f_x, then differentiate it with respect to y.", math: `f_{xy}=-${3 * a}x^2\\sin y+${3 * b}y^2\\cos x` },
      { label: "Differentiate y then x", explanation: "Reverse the order.", math: `f_{yx}=-${3 * a}x^2\\sin y+${3 * b}y^2\\cos x` },
      { label: "Compare", explanation: "The expressions agree everywhere, as expected for this smooth function." },
    ], `f_{xy}=f_{yx}=-${3 * a}x^2\\sin y+${3 * b}y^2\\cos x`);
  },
  "cl-2": (r) => {
    const a = r.int(1, 5); const b = r.int(1, 5);
    return body({ a, b }, "Explain why Clairaut's theorem applies everywhere.", `f(x,y)=e^{${coefficient(a, "x^2")}+${coefficient(b, "y^2")}}`, "Check whether the second partial derivatives are continuous.", [
      { label: "Identify the building blocks", explanation: "Polynomials and the exponential function are smooth everywhere." },
      { label: "Use closure under composition", explanation: "Their composition has continuous partial derivatives of every order on ℝ²." },
      { label: "Apply Clairaut", explanation: "Continuous mixed second partials imply equality of the two orders." },
    ], `f_{xy}=f_{yx}\\text{ on }\\mathbb R^2\\text{ because }f\\in C^2(\\mathbb R^2)`);
  },
  "cl-3": (r) => {
    const trueStatement = r.next() < 0.5; const statement = trueStatement ? "If f_xy and f_yx are continuous in a neighborhood of (a,b), then f_xy(a,b)=f_yx(a,b)." : "If both first partial derivatives exist at (a,b), then f_xy(a,b)=f_yx(a,b).";
    return body({ trueStatement }, `True or false: ${statement}`, undefined, "Distinguish existence of first partials from continuity of mixed second partials.", [
      { label: "Recall the theorem", explanation: "Clairaut's standard sufficient condition is continuity of the mixed second partials near the point." },
      { label: "Evaluate the claim", explanation: trueStatement ? "The statement gives exactly that sufficient condition." : "Existence of first partials alone neither guarantees that the mixed partials exist nor that they are equal." },
    ], trueStatement ? "\\text{True}" : "\\text{False}");
  },
  "ch-1": (r) => {
    const power = r.int(1, 4); const xPower = r.int(1, 3); const q = r.int(1, 4); const resultCoefficient = power * xPower + q;
    const xExpression = power === 1 ? "x" : `x^{${power}}`; const tExpression = xPower === 1 ? "t" : `t^{${xPower}}`;
    const zx = power === 1 ? "y" : `${power}x^{${power - 1}}y`; const xp = xPower === 1 ? "1" : `${xPower}t^{${xPower - 1}}`;
    return body({ power, xPower, q }, "Find dz/dt at t=1.", `z=${xExpression}y,\\qquad x=${tExpression},\\qquad y=e^{${q}t}`, "Use dz/dt=z_x x′+z_y y′.", [
      { label: "Find derivatives", explanation: "Compute outer partials and inner derivatives.", math: `z_x=${zx},\\ z_y=${xExpression},\\ x'=${xp},\\ y'=${q}e^{${q}t}` },
      { label: "Evaluate at t=1", explanation: `At t=1, x=1 and y=e^${q}.`, math: `\\left.\\frac{dz}{dt}\\right|_{t=1}=(${power * xPower}+${q})e^{${q}}=${resultCoefficient}e^{${q}}` },
    ], `\\left.\\frac{dz}{dt}\\right|_{t=1}=${resultCoefficient}e^{${q}}`);
  },
  "ch-2": (r) => {
    const a = r.nonzero(-3, 3); const b = r.nonzero(-3, 3); const c = r.nonzero(-3, 3); const coefficientU = 2 + 2 * b ** 2; const coefficientV = -2 * a + 2 * b * c;
    return body({ a, b, c }, "Find ∂z/∂u.", `z=x^2+y^2,\\qquad x=u${signed(-a, "v")},\\qquad y=${coefficient(b, "u")}${signed(c, "v")}`, "Both x and y depend on u.", [
      { label: "Apply the chain rule", explanation: "Use z_u=z_x x_u+z_y y_u.", math: `z_u=2x(1)+2y(${b})` },
      { label: "Substitute x and y", explanation: "Replace the intermediate variables and collect like terms.", math: `z_u=${coefficientU}u${signed(coefficientV, "v")}` },
    ], `z_u=${coefficientU}u${signed(coefficientV, "v")}`);
  },
  "ch-3": (r) => {
    const variable = r.pick(["u", "v", "s"] as const);
    return body({ variable }, `Write the chain rule for w=f(x,y,z), where x, y, and z depend on ${variable}, to find dw/d${variable}.`, undefined, "Include one term for each path from the independent variable to w.", [
      { label: "Trace the dependencies", explanation: `Changes in ${variable} affect w through x, y, and z.` },
      { label: "Add the three contributions", explanation: "Multiply each outer partial by the matching inner derivative.", math: `\\frac{dw}{d${variable}}=f_x\\frac{dx}{d${variable}}+f_y\\frac{dy}{d${variable}}+f_z\\frac{dz}{d${variable}}` },
    ], `\\frac{dw}{d${variable}}=f_x\\frac{dx}{d${variable}}+f_y\\frac{dy}{d${variable}}+f_z\\frac{dz}{d${variable}}`);
  },
  "g-1": (r) => {
    const a = r.int(1, 5); const b = r.int(1, 5); const p = [r.nonzero(-2, 2), r.nonzero(-2, 2), r.nonzero(-2, 2)]; const gradient = [2 * a * p[0] * p[1], a * p[0] ** 2 + b * p[2] ** 2, 2 * b * p[1] * p[2]];
    return body({ a, b, p: p.join(",") }, "Find ∇f at the given point.", `f(x,y,z)=${coefficient(a, "x^2y")}+${coefficient(b, "yz^2")},\\qquad${point(p)}`, "Compute all three first partial derivatives before substituting.", [
      { label: "Find the gradient formula", explanation: "Differentiate with respect to x, y, and z.", math: `\\nabla f=${tuple([coefficient(2 * a, "xy"), `${coefficient(a, "x^2")}+${coefficient(b, "z^2")}`, coefficient(2 * b, "yz")])}` },
      { label: "Evaluate", explanation: "Substitute the coordinates into each component.", math: `\\nabla f${point(p)}=${tuple(gradient)}` },
    ], `\\nabla f${point(p)}=${tuple(gradient)}`);
  },
  "g-2": (r) => {
    const [a, b, c] = r.pick(triples); const scale = r.int(1, 3); const x = r.sign() * a * scale; const y = r.sign() * b * scale; const radius = c * scale; const rate = 2 * radius;
    return body({ x, y }, `Find the maximum rate of increase and its unit direction at ${point([x, y])}.`, `f(x,y)=x^2+y^2`, "The maximum rate is ||∇f|| and its direction is ∇f/||∇f||.", [
      { label: "Evaluate the gradient", explanation: "For f=x²+y², ∇f=⟨2x,2y⟩.", math: `\\nabla f${point([x, y])}=${tuple([2 * x, 2 * y])}` },
      { label: "Find the rate", explanation: "Take the gradient magnitude.", math: `\\|\\nabla f\\|=${rate}` },
      { label: "Normalize", explanation: "Divide the gradient by its magnitude.", math: `\\mathbf u=${tuple([fraction(x, radius), fraction(y, radius)])}` },
    ], `\\text{Maximum rate}=${rate},\\qquad\\mathbf u=${tuple([fraction(x, radius), fraction(y, radius)])}`);
  },
  "g-3": (r) => {
    const a = r.int(1, 5); const b = r.int(1, 5); const x = r.nonzero(-3, 3); const y = r.nonzero(-3, 3); const tangent = [b * y, -a * x];
    return body({ a, b, x, y }, `Find a tangent direction to the level curve through ${point([x, y])}.`, `f(x,y)=${a}x^2+${b}y^2`, "Choose a nonzero vector perpendicular to the gradient.", [
      { label: "Find the gradient", explanation: "The gradient is normal to the level curve.", math: `\\nabla f${point([x, y])}=${tuple([2 * a * x, 2 * b * y])}` },
      { label: "Rotate ninety degrees", explanation: "Swapping components and negating one produces a perpendicular vector.", math: `\\mathbf v=${tuple(tangent)}` },
      { label: "Verify", explanation: "Their dot product is zero.", math: `\\nabla f\\cdot\\mathbf v=0` },
    ], `\\mathbf v=${tuple(tangent)}\\text{ (or any nonzero scalar multiple)}`);
  },
  "d-1": (r) => {
    const a = r.int(1, 5); const b = r.int(1, 5); const x = r.nonzero(-3, 3); const y = r.nonzero(-3, 3); const [u, v, length] = r.pick(triples); const direction = [r.sign() * u, r.sign() * v]; const gradient = [2 * a * x, 2 * b * y]; const numerator = dot(gradient, direction);
    return body({ a, b, x, y, direction: direction.join(",") }, `Find the directional derivative at ${point([x, y])} in the direction ${tuple(direction)}.`, `f(x,y)=${a}x^2+${b}y^2`, "Normalize the direction before taking the dot product with the gradient.", [
      { label: "Evaluate the gradient", explanation: "Compute ∇f at the point.", math: `\\nabla f${point([x, y])}=${tuple(gradient)}` },
      { label: "Normalize the direction", explanation: "Divide by the direction vector's length.", math: `\\mathbf u=${tuple(direction.map((value) => fraction(value, length)))}` },
      { label: "Take the dot product", explanation: "Dᵤf=∇f·u.", math: `D_{\\mathbf u}f=${fraction(numerator, length)}` },
    ], `D_{\\mathbf u}f${point([x, y])}=${fraction(numerator, length)}`);
  },
  "d-2": (r) => {
    const a = r.int(1, 5); const b = r.int(1, 5); const x = r.nonzero(-3, 3); const y = r.nonzero(-3, 3); const gradient = [2 * a * x, 2 * b * y]; const perpendicular = [gradient[1], -gradient[0]]; const length2 = normSquared(perpendicular);
    return body({ a, b, x, y }, `Find a unit direction in which the directional derivative is zero at ${point([x, y])}.`, `f(x,y)=${a}x^2+${b}y^2`, "Choose a vector perpendicular to the gradient and normalize it.", [
      { label: "Evaluate the gradient", explanation: "The gradient controls directional derivatives.", math: `\\nabla f=${tuple(gradient)}` },
      { label: "Choose a perpendicular", explanation: "A perpendicular vector makes the dot product zero.", math: `\\mathbf v=${tuple(perpendicular)}` },
      { label: "Normalize", explanation: "Divide by its magnitude.", math: `\\mathbf u=\\frac1{\\sqrt{${length2}}}${tuple(perpendicular)}` },
    ], `\\mathbf u=\\pm\\frac1{\\sqrt{${length2}}}${tuple(perpendicular)}`);
  },
  "d-3": (r) => {
    const value = r.nonzero(-8, 8); const direction = r.pick(["north", "east", "the specified unit direction"] as const);
    return body({ value, direction }, `Interpret a directional derivative value of ${value} at a point in ${direction}.`, undefined, "Discuss the sign, instantaneous rate, and distance normalization.", [
      { label: "Use the sign", explanation: value > 0 ? "A positive value means the function increases in that direction." : "A negative value means the function decreases in that direction." },
      { label: "Use the magnitude", explanation: `The output changes at an instantaneous rate of ${Math.abs(value)} units per unit of distance.` },
    ], `\\text{The function ${value > 0 ? "increases" : "decreases"} at ${Math.abs(value)} output units per unit distance in ${direction}.}`);
  },
  "ex-1": (r) => {
    const kind = r.pick(["minimum", "maximum", "saddle"] as const); const a = r.int(1, 6); const c = r.int(1, 6); const fxx = kind === "maximum" ? -a : a; const fyy = kind === "saddle" || kind === "maximum" ? -c : c; const discriminant = fxx * fyy;
    return body({ kind, fxx, fyy }, "Classify a critical point whose Hessian is shown.", `H_f(a,b)=\\begin{pmatrix}${fxx}&0\\\\0&${fyy}\\end{pmatrix}`, "Compute D=f_xx f_yy−(f_xy)², then inspect f_xx when D>0.", [
      { label: "Compute D", explanation: "Use the determinant of the Hessian.", math: `D=(${fxx})(${fyy})-0^2=${discriminant}` },
      { label: "Classify", explanation: discriminant < 0 ? "D<0, so the Hessian is indefinite and the point is a saddle." : fxx > 0 ? "D>0 and f_xx>0, so the point is a local minimum." : "D>0 and f_xx<0, so the point is a local maximum." },
    ], `(a,b)\\text{ is a ${kind === "minimum" ? "local minimum" : kind === "maximum" ? "local maximum" : "saddle point"}}`);
  },
  "ex-2": (r) => {
    const h = r.int(-4, 4); const k = r.int(-4, 4); const a = r.nonzero(-5, 5); const b = a > 0 ? r.int(1, 5) : -r.int(1, 5); const c = r.int(-9, 9); const kind = a > 0 ? "minimum" : "maximum";
    return body({ h, k, a, b, c }, "Find and classify every critical point.", `f(x,y)=${a}${shifted("x", h)}^2${signed(b, `${shifted("y", k)}^2`)}${signed(c)}`, "Set both first partial derivatives to zero, then apply the Second Derivative Test.", [
      { label: "Solve the gradient equations", explanation: "Each derivative vanishes at the center of its square.", math: `f_x=${2 * a}${shifted("x", h)}=0,\\quad f_y=${2 * b}${shifted("y", k)}=0` },
      { label: "Critical point", explanation: "Solve for x and y.", math: `(x,y)=${point([h, k])}` },
      { label: "Classify", explanation: `D=(${2 * a})(${2 * b})>0 and f_xx=${2 * a}${a > 0 ? ">0" : "<0"}.`, math: `f(${h},${k})=${c}` },
    ], `${point([h, k])}\\text{ is a local ${kind}, with }f(${h},${k})=${c}`);
  },
  "ex-3": (r) => {
    const a = r.int(1, 6); const b = r.int(1, 6); const sign = r.sign();
    return body({ a, b, sign }, "State the conclusion of the Second Derivative Test at the origin.", `f(x,y)=${a}x^4${sign > 0 ? "+" : "-"}${b}y^4`, "Evaluate f_xx, f_yy, and f_xy at (0,0).", [
      { label: "Evaluate second partials", explanation: "Every second partial contains a factor x², y², or xy and vanishes at the origin.", math: `f_{xx}(0,0)=f_{yy}(0,0)=f_{xy}(0,0)=0` },
      { label: "Compute D", explanation: "The discriminant equals zero.", math: `D(0,0)=0` },
      { label: "Conclude", explanation: "When D=0, the Second Derivative Test is inconclusive." },
    ], `D(0,0)=0;\\quad\\text{the Second Derivative Test is inconclusive}`);
  },
  "ex-4": (r) => {
    const width = r.int(3, 7); const height = r.int(3, 7); const h = r.int(1, width - 1); const k = r.int(1, height - 1); const corners = [[0, 0], [width, 0], [0, height], [width, height]]; const values = corners.map(([x, y]) => (x - h) ** 2 + (y - k) ** 2); const max = Math.max(...values); const maxPoints = corners.filter((_, index) => values[index] === max);
    return body({ width, height, h, k }, `Find the absolute maximum and minimum on 0≤x≤${width}, 0≤y≤${height}.`, `f(x,y)=(x-${h})^2+(y-${k})^2`, "Check the interior critical point and the entire boundary, including corners.", [
      { label: "Interior", explanation: "The squared-distance function is minimized at its center.", math: `f(${h},${k})=0` },
      { label: "Boundary", explanation: "On a rectangle, the farthest boundary point from an interior center is a corner." },
      { label: "Compare corners", explanation: "Evaluate all four corners and retain every tie for the largest value.", math: corners.map((corner, index) => `f${point(corner)}=${values[index]}`).join(",\\quad") },
    ], `\\text{Absolute minimum }0\\text{ at }${point([h, k])};\\quad\\text{absolute maximum }${max}\\text{ at }${maxPoints.map((p) => point(p)).join(",")}`);
  },
};

export const generatedPracticeIds = Object.freeze(Object.keys(generators));

export function generatePracticeProblem(id: string, seed: number, fallback?: PracticeProblem): GeneratedPracticeProblem {
  const generator = generators[id];
  if (!generator) {
    if (!fallback) throw new Error(`No practice generator or fallback exists for ${id}.`);
    return {
      ...fallback,
      seed,
      parameters: {},
      steps: [
        { label: "Work", explanation: fallback.solution },
        { label: "Answer", explanation: "Compare your result with the computed answer.", math: fallback.answer },
      ],
    };
  }
  return { id, seed, ...generator(makeRng(seed)) };
}
