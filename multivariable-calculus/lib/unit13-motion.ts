import type { Module } from "@/lib/content-types";

export const motionInSpaceModule: Module = {
  slug: "motion-in-space",
  chapter: "Unit 13",
  section: "13.4",
  unit: "Motion in Space",
  number: 11,
  title: "Motion in Space",
  eyebrow: "Connect position, velocity, and acceleration",
  summary: "Model particle motion, recover position from acceleration, decompose acceleration into tangential and normal components, and solve projectile problems.",
  keywords: ["motion", "position", "velocity", "speed", "acceleration", "tangential", "normal", "projectile"],
  objectives: [
    "Compute velocity, speed, and acceleration from a position function.",
    "Recover velocity and position from acceleration and initial conditions.",
    "Decompose acceleration into tangential and normal components.",
    "Model projectile motion with constant gravitational acceleration.",
  ],
  signatureFormula: String.raw`\mathbf v=\mathbf r',\quad \mathbf a=\mathbf r'',\quad a_T=\frac{\mathbf v\cdot\mathbf a}{\|\mathbf v\|},\quad a_N=\frac{\|\mathbf v\times\mathbf a\|}{\|\mathbf v\|}`,
  keyIdeas: [
    {
      title: "Position, velocity, and acceleration",
      explanation: "Velocity is the derivative of position, speed is the magnitude of velocity, and acceleration is the derivative of velocity.",
      formula: String.raw`\mathbf v(t)=\mathbf r'(t),\qquad \text{speed}=\|\mathbf v(t)\|,\qquad \mathbf a(t)=\mathbf r''(t)`,
    },
    {
      title: "Tangential and normal acceleration",
      explanation: "The tangential component changes speed; the normal component changes direction. Their perpendicular sum is the acceleration vector.",
      formula: String.raw`\mathbf a=a_T\mathbf T+a_N\mathbf N,\qquad a_N=\kappa\|\mathbf v\|^2`,
      note: "The sign of a_T indicates speeding up or slowing down; a_N is nonnegative.",
    },
    {
      title: "Constant acceleration",
      explanation: "When acceleration is constant, integrate twice or use the vector kinematics formula. Near Earth's surface, ideal projectile acceleration is vertical and downward.",
      formula: String.raw`\mathbf r(t)=\mathbf r_0+t\mathbf v_0+\frac12t^2\mathbf a`,
    },
  ],
  workedExamples: [
    {
      title: "Recover motion from acceleration",
      prompt: "Given a(t)=⟨2,−6t,12t²⟩, v(0)=⟨−1,4,0⟩, and r(0)=⟨3,2,−5⟩, find v(t) and r(t).",
      steps: [
        { label: "Integrate acceleration", explanation: "Introduce a constant vector and use the initial velocity.", math: String.raw`\mathbf v(t)=\langle2t-1,\,-3t^2+4,\,4t^3\rangle` },
        { label: "Integrate velocity", explanation: "Integrate componentwise.", math: String.raw`\mathbf r(t)=\langle t^2-t+C_1,\,-t^3+4t+C_2,\,t^4+C_3\rangle` },
        { label: "Apply initial position", explanation: "Use r(0)=⟨3,2,−5⟩.", math: String.raw`\mathbf r(t)=\langle t^2-t+3,\,-t^3+4t+2,\,t^4-5\rangle` },
      ],
      answer: String.raw`\mathbf v(t)=\langle2t-1,-3t^2+4,4t^3\rangle,\quad \mathbf r(t)=\langle t^2-t+3,-t^3+4t+2,t^4-5\rangle`,
    },
    {
      title: "Tangential and normal components",
      prompt: "For r(t)=⟨t,t²,t³⟩, find a_T and a_N at t=1.",
      steps: [
        { label: "Evaluate velocity and acceleration", explanation: "Differentiate and substitute t=1.", math: String.raw`\mathbf v(1)=\langle1,2,3\rangle,\quad \mathbf a(1)=\langle0,2,6\rangle,\quad \|\mathbf v\|=\sqrt{14}` },
        { label: "Tangential component", explanation: "Project acceleration onto the velocity direction.", math: String.raw`a_T=\frac{\mathbf v\cdot\mathbf a}{\|\mathbf v\|}=\frac{22}{\sqrt{14}}` },
        { label: "Normal component", explanation: "Use the cross-product formula.", math: String.raw`a_N=\frac{\|\mathbf v\times\mathbf a\|}{\|\mathbf v\|}=\frac{\sqrt{76}}{\sqrt{14}}=\sqrt{\frac{38}{7}}` },
      ],
      answer: String.raw`a_T=\frac{22}{\sqrt{14}},\qquad a_N=\sqrt{\frac{38}{7}}`,
    },
    {
      title: "Projectile from an elevated point",
      prompt: "A ball starts at ⟨0,0,5⟩ ft with velocity ⟨36,0,52⟩ ft/s under a=⟨0,0,−32⟩ ft/s². Find r(t) and the maximum height.",
      steps: [
        { label: "Build the model", explanation: "Use r=r₀+tv₀+(1/2)t²a.", math: String.raw`\mathbf r(t)=\langle36t,0,5+52t-16t^2\rangle` },
        { label: "Find peak time", explanation: "The vertical velocity is zero at maximum height.", math: String.raw`v_z(t)=52-32t=0\quad\Rightarrow\quad t=\frac{13}{8}` },
        { label: "Evaluate height", explanation: "Substitute the peak time into z(t).", math: String.raw`z\!\left(\frac{13}{8}\right)=\frac{189}{4}=47.25\text{ ft}` },
      ],
      answer: String.raw`\mathbf r(t)=\langle36t,0,5+52t-16t^2\rangle,\qquad z_{\max}=\frac{189}{4}\text{ ft}`,
    },
  ],
  practice: [
    {
      id: "u13m-1",
      prompt: "Find v(t), a(t), and the speed at t=0.",
      display: String.raw`\mathbf r(t)=\langle e^t,t^3-3t,4\sin t\rangle`,
      hint: "Differentiate once and twice, then take the magnitude of v(0).",
      solution: "Velocity is ⟨eᵗ,3t²−3,4 cos t⟩ and acceleration is ⟨eᵗ,6t,−4 sin t⟩. At t=0, v=⟨1,−3,4⟩.",
      answer: String.raw`\mathbf v=\langle e^t,3t^2-3,4\cos t\rangle,\quad \mathbf a=\langle e^t,6t,-4\sin t\rangle,\quad \|\mathbf v(0)\|=\sqrt{26}`,
    },
    {
      id: "u13m-2",
      prompt: "At one instant v=⟨2,−1,2⟩ and a=⟨3,4,−1⟩. Find a_T and a_N, and describe the speed.",
      hint: "Compute v·a and ||v×a||, then divide by ||v||.",
      solution: "The speed is 3 and v·a=0, so a_T=0. Also ||v×a||=3√26, so a_N=√26. The speed is momentarily constant.",
      answer: String.raw`a_T=0,\qquad a_N=\sqrt{26};\qquad \text{speed is momentarily constant}`, 
    },
    {
      id: "u13m-3",
      prompt: "A particle has speed 12, curvature 1/5, and a_T=−3. Find a_N and ||a||, then interpret the sign of a_T.",
      hint: "Use a_N=κv² and ||a||²=a_T²+a_N².",
      solution: "a_N=(1/5)(12²)=144/5. Then ||a||=√(9+(144/5)²)=3√2329/5. The negative tangential component means the particle is slowing down.",
      answer: String.raw`a_N=\frac{144}{5},\qquad \|\mathbf a\|=\frac{3\sqrt{2329}}5;\qquad \text{slowing down}`,
    },
  ],
  desmos: {
    title: "Explore projectile motion",
    description: "Graph the vertical trajectory and vary the initial height and velocity.",
    url: "https://www.desmos.com/calculator?embed",
    entries: ["z(t)=5+52t-16t^2", "x(t)=36t", "(x(t),z(t))"],
  },
  connections: ["vector-valued-functions", "arc-length", "curvature", "tnb-frenet-frame"],
};
