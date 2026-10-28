import {
  generatePracticeProblem,
  generatedPracticeIds,
  initialPracticeSeed,
  nextPracticeSeed,
} from "../lib/practice-generators.js";

const expectedIds = [
  "u12c-1", "u12c-2", "u12c-3", "u12v-1", "u12v-2", "u12v-3",
  "u12d-1", "u12d-2", "u12d-3", "u12x-1", "u12x-2", "u12x-3",
  "u12l-1", "u12l-2", "u12l-3", "u12q-1", "u12q-2", "u12q-3",
  "v-1", "v-2", "v-3", "a-1", "a-2", "a-3", "c-1", "c-2", "c-3",
  "t-1", "t-2", "t-3", "u13m-1", "u13m-2", "u13m-3",
  "m-1", "m-2", "m-3", "p-1", "p-2", "p-3", "tp-1", "tp-2", "tp-3", "tp-4",
  "cl-1", "cl-2", "cl-3", "ch-1", "ch-2", "ch-3", "g-1", "g-2", "g-3",
  "d-1", "d-2", "d-3", "ex-1", "ex-2", "ex-3", "ex-4",
].sort();

const actualIds = [...generatedPracticeIds].sort();
if (JSON.stringify(actualIds) !== JSON.stringify(expectedIds)) {
  const missing = expectedIds.filter((id) => !actualIds.includes(id));
  const extra = actualIds.filter((id) => !expectedIds.includes(id));
  throw new Error(`Generator coverage mismatch. Missing: ${missing.join(", ") || "none"}. Extra: ${extra.join(", ") || "none"}.`);
}

let generated = 0;
for (const id of actualIds) {
  let seed = initialPracticeSeed(id);
  const signatures = new Set<string>();

  for (let index = 0; index < 200; index += 1) {
    const problem = generatePracticeProblem(id, seed);
    if (!problem.prompt || !problem.answer || !problem.hint || problem.steps.length < 2) {
      throw new Error(`Generator ${id} returned an incomplete problem for seed ${seed}.`);
    }

    const values = [
      problem.prompt,
      problem.answer,
      ...(problem.display ? [problem.display] : []),
      ...problem.steps.flatMap((step) => [step.explanation, ...(step.math ? [step.math] : [])]),
    ];
    if (values.some((value) => /NaN|undefined|Infinity/.test(value))) {
      throw new Error(`Generator ${id} returned an invalid numeric value for seed ${seed}.`);
    }

    signatures.add(`${problem.prompt}|${problem.display ?? ""}|${problem.answer}`);
    seed = nextPracticeSeed(seed);
    generated += 1;
  }

  if (signatures.size < 2) {
    throw new Error(`Generator ${id} did not vary across 200 seeds.`);
  }
}

console.log(`Validated ${generated} instances across all ${actualIds.length} practice generators.`);
