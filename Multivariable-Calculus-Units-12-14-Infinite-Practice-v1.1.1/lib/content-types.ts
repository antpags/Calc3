export type Chapter = "Unit 12" | "Unit 13" | "Unit 14";

export type LessonStep = {
  label: string;
  explanation: string;
  math?: string;
};

export type WorkedExample = {
  title: string;
  prompt: string;
  display?: string;
  steps: LessonStep[];
  answer: string;
};

export type PracticeProblem = {
  id: string;
  prompt: string;
  display?: string;
  hint: string;
  solution: string;
  answer: string;
};

export type KeyIdea = {
  title: string;
  explanation: string;
  formula: string;
  note?: string;
};

export type DesmosConfig = {
  title: string;
  description: string;
  url: string;
  entries: string[];
};

export type Module = {
  slug: string;
  chapter: Chapter;
  section: string;
  unit: string;
  number: number;
  title: string;
  eyebrow: string;
  summary: string;
  keywords: string[];
  objectives: string[];
  signatureFormula: string;
  keyIdeas: KeyIdea[];
  workedExamples: WorkedExample[];
  practice: PracticeProblem[];
  desmos?: DesmosConfig;
  connections: string[];
};
