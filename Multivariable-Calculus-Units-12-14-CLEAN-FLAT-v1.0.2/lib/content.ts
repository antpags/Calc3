import { unit12Modules } from "@/lib/unit12-content";
import { motionInSpaceModule } from "@/lib/unit13-motion";
import type { Module } from "@/lib/content-types";

export type {
  Chapter,
  DesmosConfig,
  KeyIdea,
  LessonStep,
  Module,
  PracticeProblem,
  WorkedExample,
} from "@/lib/content-types";

export const modules: Module[] = [
  ...unit12Modules,
  {
    slug: "vector-valued-functions",
    chapter: "Unit 13",
    section: "13.1–13.2",
    unit: "Motion in Space",
    number: 7,
    title: "Vector-Valued Functions",
    eyebrow: "From a parameter to a path",
    summary:
      "Model curves and motion in two or three dimensions, then differentiate and integrate component by component.",
    keywords: ["vector function", "position", "velocity", "acceleration", "tangent", "parametric curve"],
    objectives: [
      "Interpret a vector-valued function as a parametrized curve.",
      "Compute limits, derivatives, and integrals componentwise.",
      "Use velocity and acceleration to describe motion.",
      "Build a tangent line from position and velocity.",
    ],
    signatureFormula: String.raw`\mathbf r(t)=\langle x(t),y(t),z(t)\rangle,\qquad \mathbf r'(t)=\langle x'(t),y'(t),z'(t)\rangle`,
    keyIdeas: [
      {
        title: "Componentwise calculus",
        explanation:
          "A vector-valued function is differentiated and integrated one component at a time. The parameter is the single input shared by every component.",
        formula: String.raw`\frac{d}{dt}\langle x,y,z\rangle=\langle x',y',z'\rangle`,
      },
      {
        title: "Motion vocabulary",
        explanation:
          "Position locates the particle, velocity gives instantaneous direction and speed, and acceleration measures the change in velocity.",
        formula: String.raw`\mathbf v(t)=\mathbf r'(t),\quad \mathbf a(t)=\mathbf r''(t),\quad \text{speed}=\|\mathbf v(t)\|`,
      },
      {
        title: "Tangent line",
        explanation:
          "At a regular point, the velocity vector points along the tangent line. Use a new line parameter so it is not confused with the curve parameter.",
        formula: String.raw`\mathbf L(s)=\mathbf r(t_0)+s\,\mathbf r'(t_0)`,
        note: String.raw`\mathbf r'(t_0)\neq\mathbf 0` + " is required for this standard tangent direction.",
      },
    ],
    workedExamples: [
      {
        title: "Velocity, acceleration, and tangent line",
        prompt: "Analyze the curve at t = 1.",
        display: String.raw`\mathbf r(t)=\langle t^2,\,t^3-2t,\,\ln(t+1)\rangle`,
        steps: [
          {
            label: "Differentiate once",
            explanation: "Differentiate each component to obtain velocity.",
            math: String.raw`\mathbf v(t)=\langle 2t,\,3t^2-2,\,\tfrac1{t+1}\rangle`,
          },
          {
            label: "Differentiate again",
            explanation: "Differentiate velocity componentwise.",
            math: String.raw`\mathbf a(t)=\langle 2,\,6t,\,-\tfrac1{(t+1)^2}\rangle`,
          },
          {
            label: "Evaluate at the target time",
            explanation: "Compute the point and direction at t = 1.",
            math: String.raw`\mathbf r(1)=\langle1,-1,\ln2\rangle,\qquad \mathbf v(1)=\langle2,1,\tfrac12\rangle`,
          },
          {
            label: "Write the line",
            explanation: "Use position plus a scalar multiple of velocity.",
            math: String.raw`\mathbf L(s)=\langle1,-1,\ln2\rangle+s\langle2,1,\tfrac12\rangle`,
          },
        ],
        answer: String.raw`\mathbf a(1)=\langle2,6,-\tfrac14\rangle\text{ and }\mathbf L(s)=\langle1,-1,\ln2\rangle+s\langle2,1,\tfrac12\rangle`,
      },
      {
        title: "Recover position from velocity",
        prompt: "Find the position given velocity and an initial point.",
        display: String.raw`\mathbf v(t)=\langle 3t^2,\,2\cos t,\,e^t\rangle,\qquad \mathbf r(0)=\langle1,-2,4\rangle`,
        steps: [
          {
            label: "Integrate velocity",
            explanation: "Introduce one constant in each component.",
            math: String.raw`\mathbf r(t)=\langle t^3+C_1,\,2\sin t+C_2,\,e^t+C_3\rangle`,
          },
          {
            label: "Apply the initial condition",
            explanation: "At t = 0, match components with the given position.",
            math: String.raw`\langle C_1,C_2,1+C_3\rangle=\langle1,-2,4\rangle`,
          },
          {
            label: "Solve the constants",
            explanation: "Thus C₁ = 1, C₂ = −2, and C₃ = 3.",
            math: String.raw`\mathbf r(t)=\langle t^3+1,\,2\sin t-2,\,e^t+3\rangle`,
          },
        ],
        answer: String.raw`\mathbf r(t)=\langle t^3+1,\,2\sin t-2,\,e^t+3\rangle`,
      },
    ],
    practice: [
      {
        id: "v-1",
        prompt: "Find velocity, acceleration, and speed at t = 0.",
        display: String.raw`\mathbf r(t)=\langle e^t,\,\sin t,\,t^2\rangle`,
        hint: "Differentiate componentwise, then take the magnitude of velocity.",
        solution: String.raw`\mathbf v=\langle e^t,\cos t,2t\rangle` + ", " + String.raw`\mathbf a=\langle e^t,-\sin t,2\rangle` + ". At t = 0, velocity is ⟨1,1,0⟩, so speed is √2.",
        answer: String.raw`\mathbf v(0)=\langle1,1,0\rangle,\quad \mathbf a(0)=\langle1,0,2\rangle,\quad \|\mathbf v(0)\|=\sqrt2`,
      },
      {
        id: "v-2",
        prompt: "Find a vector equation of the tangent line at t = 2.",
        display: String.raw`\mathbf r(t)=\langle t,\,t^2,\,t^3\rangle`,
        hint: "Use r(2) as the point and r′(2) as the direction.",
        solution: "The point is ⟨2,4,8⟩ and the derivative is ⟨1,2t,3t²⟩, which becomes ⟨1,4,12⟩.",
        answer: String.raw`\mathbf L(s)=\langle2,4,8\rangle+s\langle1,4,12\rangle`,
      },
      {
        id: "v-3",
        prompt: "Determine all times when the particle is at rest.",
        display: String.raw`\mathbf r(t)=\langle t^3-3t,\,t^2-2t,\,5\rangle`,
        hint: "A particle is at rest only when every component of velocity is zero at the same time.",
        solution: "Velocity is ⟨3t²−3, 2t−2, 0⟩. The second component requires t = 1, and that value also zeros the first component.",
        answer: String.raw`t=1`,
      },
    ],
    desmos: {
      title: "Trace a space curve",
      description: "Open the 3D calculator and enter the parametric curve to inspect position and tangent direction.",
      url: "https://www.desmos.com/3d?embed",
      entries: ["(cos(t), sin(t), t/3)", "t = 0", "(cos(t), sin(t), t/3) + s(-sin(t), cos(t), 1/3)"],
    },
    connections: ["arc-length", "curvature", "tnb-frenet-frame"],
  },
  {
    slug: "arc-length",
    chapter: "Unit 13",
    section: "13.3",
    unit: "Motion in Space",
    number: 8,
    title: "Arc Length",
    eyebrow: "Measure distance along a curve",
    summary:
      "Accumulate speed to measure distance and use arc length to build a parameter that moves at unit speed.",
    keywords: ["arc length", "speed", "distance", "unit speed", "reparameterization"],
    objectives: [
      "Distinguish displacement from distance traveled.",
      "Compute the length of a smooth space curve.",
      "Construct and interpret the arc-length function.",
      "Recognize a unit-speed parametrization.",
    ],
    signatureFormula: String.raw`L=\int_a^b\|\mathbf r'(t)\|\,dt`,
    keyIdeas: [
      {
        title: "Length accumulates speed",
        explanation: "The norm of velocity is scalar speed. Integrating it adds infinitesimal distances along the path.",
        formula: String.raw`L=\int_a^b\sqrt{[x'(t)]^2+[y'(t)]^2+[z'(t)]^2}\,dt`,
      },
      {
        title: "Arc-length function",
        explanation: "Choose a starting parameter a. Then s(t) records how far the particle has traveled from that starting point.",
        formula: String.raw`s(t)=\int_a^t\|\mathbf r'(u)\|\,du,\qquad \frac{ds}{dt}=\|\mathbf r'(t)\|`,
      },
      {
        title: "Unit-speed reparameterization",
        explanation: "If s(t) can be inverted, substitute t(s) into the original curve. The resulting derivative has magnitude one.",
        formula: String.raw`\mathbf R(s)=\mathbf r(t(s)),\qquad \|\mathbf R'(s)\|=1`,
      },
    ],
    workedExamples: [
      {
        title: "Length of a helix segment",
        prompt: "Find the length over the given interval.",
        display: String.raw`\mathbf r(t)=\langle3\cos t,3\sin t,4t\rangle,\qquad 0\le t\le2\pi`,
        steps: [
          {
            label: "Differentiate",
            explanation: "Compute the velocity vector.",
            math: String.raw`\mathbf r'(t)=\langle-3\sin t,3\cos t,4\rangle`,
          },
          {
            label: "Find speed",
            explanation: "Use the Pythagorean identity to simplify the norm.",
            math: String.raw`\|\mathbf r'(t)\|=\sqrt{9\sin^2t+9\cos^2t+16}=5`,
          },
          {
            label: "Integrate",
            explanation: "The constant speed makes the accumulation immediate.",
            math: String.raw`L=\int_0^{2\pi}5\,dt=10\pi`,
          },
        ],
        answer: String.raw`L=10\pi`,
      },
      {
        title: "Reparameterize a line by arc length",
        prompt: "Use s measured from t = 0.",
        display: String.raw`\mathbf r(t)=\langle1+2t,\,3-t,\,4+2t\rangle,\qquad t\ge0`,
        steps: [
          {
            label: "Compute speed",
            explanation: "The direction vector is constant.",
            math: String.raw`\mathbf r'(t)=\langle2,-1,2\rangle,\qquad \|\mathbf r'(t)\|=3`,
          },
          {
            label: "Build and invert s(t)",
            explanation: "Distance from t = 0 is speed times time.",
            math: String.raw`s=\int_0^t3\,du=3t,\qquad t=\frac{s}{3}`,
          },
          {
            label: "Substitute",
            explanation: "Replace t by s/3 in every component.",
            math: String.raw`\mathbf R(s)=\langle1+\tfrac{2s}{3},\,3-\tfrac{s}{3},\,4+\tfrac{2s}{3}\rangle`,
          },
        ],
        answer: String.raw`\mathbf R(s)=\langle1+\tfrac{2s}{3},3-\tfrac{s}{3},4+\tfrac{2s}{3}\rangle,\ s\ge0`,
      },
    ],
    practice: [
      {
        id: "a-1",
        prompt: "Find the arc length on 0 ≤ t ≤ 1.",
        display: String.raw`\mathbf r(t)=\langle3t,4t,t^2\rangle`,
        hint: "The speed is √(25 + 4t²); use the standard integral for √(a² + u²).",
        solution: "Speed is √(9+16+4t²)=√(25+4t²). With u=2t, the antiderivative gives the stated exact value.",
        answer: String.raw`L=\frac12\sqrt{29}+\frac{25}{4}\ln\!\left(\frac{2+\sqrt{29}}5\right)`,
      },
      {
        id: "a-2",
        prompt: "Find the distance traveled from t = 1 to t = 4.",
        display: String.raw`\mathbf r(t)=\langle2t,-t,2t\rangle`,
        hint: "This curve has constant speed.",
        solution: "Velocity is ⟨2,−1,2⟩ and speed is 3. Integrate 3 over an interval of length 3.",
        answer: String.raw`L=9`,
      },
      {
        id: "a-3",
        prompt: "Is this a unit-speed parametrization?",
        display: String.raw`\mathbf r(s)=\left\langle\frac35s,\frac45s,7\right\rangle`,
        hint: "Differentiate and compute the norm.",
        solution: "The derivative is ⟨3/5,4/5,0⟩, whose magnitude is 1.",
        answer: String.raw`\text{Yes, because }\|\mathbf r'(s)\|=1.`,
      },
    ],
    connections: ["vector-valued-functions", "curvature", "tnb-frenet-frame"],
  },
  {
    slug: "curvature",
    chapter: "Unit 13",
    section: "13.3",
    unit: "Motion in Space",
    number: 9,
    title: "Curvature",
    eyebrow: "Quantify how sharply a path turns",
    summary:
      "Measure change in the unit tangent per unit of distance rather than per unit of parameter.",
    keywords: ["curvature", "turning", "unit tangent", "radius of curvature", "cross product"],
    objectives: [
      "Explain curvature as turning per unit arc length.",
      "Compute curvature using either standard formula.",
      "Connect curvature with the osculating circle.",
      "Separate curve geometry from traversal speed.",
    ],
    signatureFormula: String.raw`\kappa=\left\|\frac{d\mathbf T}{ds}\right\|=\frac{\|\mathbf r'\times\mathbf r''\|}{\|\mathbf r'\|^3}`,
    keyIdeas: [
      {
        title: "Geometry, not speed",
        explanation: "Curvature measures how the direction of motion changes as distance is traveled. Reparameterizing a regular curve does not change its curvature at a point.",
        formula: String.raw`\kappa(t)=\frac{\|\mathbf T'(t)\|}{\|\mathbf r'(t)\|}`,
      },
      {
        title: "Cross-product formula",
        explanation: "This formula usually avoids differentiating a normalized vector and is often the fastest computational route in three dimensions.",
        formula: String.raw`\kappa(t)=\frac{\|\mathbf r'(t)\times\mathbf r''(t)\|}{\|\mathbf r'(t)\|^3}`,
      },
      {
        title: "Radius of curvature",
        explanation: "When curvature is nonzero, its reciprocal is the radius of the best-fitting circle at the point.",
        formula: String.raw`\rho=\frac1\kappa`,
      },
    ],
    workedExamples: [
      {
        title: "Curvature of a plane parabola",
        prompt: "Find the curvature at t = 0.",
        display: String.raw`\mathbf r(t)=\langle t,t^2,0\rangle`,
        steps: [
          {
            label: "Differentiate twice",
            explanation: "Compute velocity and acceleration.",
            math: String.raw`\mathbf r'=\langle1,2t,0\rangle,\qquad \mathbf r''=\langle0,2,0\rangle`,
          },
          {
            label: "Cross the derivatives",
            explanation: "The cross product points in the z-direction.",
            math: String.raw`\mathbf r'\times\mathbf r''=\langle0,0,2\rangle`,
          },
          {
            label: "Substitute",
            explanation: "At t = 0, speed is 1 and the cross-product magnitude is 2.",
            math: String.raw`\kappa(0)=\frac2{1^3}=2`,
          },
        ],
        answer: String.raw`\kappa(0)=2\quad\text{and}\quad\rho(0)=\tfrac12`,
      },
      {
        title: "Curvature of a circular helix",
        prompt: "Find curvature for all t.",
        display: String.raw`\mathbf r(t)=\langle a\cos t,a\sin t,bt\rangle,\qquad a>0`,
        steps: [
          {
            label: "Compute derivatives",
            explanation: "Differentiate the trigonometric and linear components.",
            math: String.raw`\mathbf r'=\langle-a\sin t,a\cos t,b\rangle,\quad \mathbf r''=\langle-a\cos t,-a\sin t,0\rangle`,
          },
          {
            label: "Compute magnitudes",
            explanation: "Both simplify using sin²t + cos²t = 1.",
            math: String.raw`\|\mathbf r'\|=\sqrt{a^2+b^2},\qquad \|\mathbf r'\times\mathbf r''\|=a\sqrt{a^2+b^2}`,
          },
          {
            label: "Simplify",
            explanation: "Cancel one factor of √(a²+b²).",
            math: String.raw`\kappa=\frac{a}{a^2+b^2}`,
          },
        ],
        answer: String.raw`\kappa=\frac{a}{a^2+b^2}`, 
      },
    ],
    practice: [
      {
        id: "c-1",
        prompt: "Find the curvature at t = 1.",
        display: String.raw`\mathbf r(t)=\langle t,t^2,t^3\rangle`,
        hint: "Use the cross-product formula and evaluate after computing both derivatives.",
        solution: "At t=1, r′=⟨1,2,3⟩ and r″=⟨0,2,6⟩. Their cross product is ⟨6,−6,2⟩ with magnitude 2√19; speed is √14.",
        answer: String.raw`\kappa(1)=\frac{\sqrt{19}}{7\sqrt{14}}`,
      },
      {
        id: "c-2",
        prompt: "Find the radius of curvature at the origin.",
        display: String.raw`y=\frac14x^2`,
        hint: "Use κ = |y″|/(1+(y′)²)^(3/2), then take the reciprocal.",
        solution: "Here y′=x/2 and y″=1/2. At x=0, κ=1/2, so ρ=2.",
        answer: String.raw`\rho=2`,
      },
      {
        id: "c-3",
        prompt: "A curve has constant curvature 1/5 and lies in a plane. What is the radius of its osculating circle?",
        hint: "Radius of curvature is the reciprocal of curvature.",
        solution: "Compute ρ=1/κ=1/(1/5).",
        answer: String.raw`\rho=5`,
      },
    ],
    desmos: {
      title: "Compare bending",
      description: "Graph two planar curves together, then vary coefficients to see how tighter bending corresponds to larger curvature.",
      url: "https://www.desmos.com/calculator?embed",
      entries: ["y=x^2", "y=x^2/4", "k(x)=abs(2a)/(1+(2ax)^2)^(3/2)"],
    },
    connections: ["arc-length", "tnb-frenet-frame"],
  },
  {
    slug: "tnb-frenet-frame",
    chapter: "Unit 13",
    section: "13.3",
    unit: "Motion in Space",
    number: 10,
    title: "The TNB / Frenet Frame",
    eyebrow: "A moving coordinate system",
    summary:
      "Attach an orthonormal frame to a regular curve to track forward motion, inward turning, and binormal orientation.",
    keywords: ["TNB", "Frenet frame", "unit tangent", "principal normal", "binormal", "osculating plane"],
    objectives: [
      "Compute the unit tangent, principal normal, and binormal.",
      "Verify that the frame is orthonormal.",
      "Identify the osculating, normal, and rectifying planes.",
      "Use the frame to decompose acceleration.",
    ],
    signatureFormula: String.raw`\mathbf T=\frac{\mathbf r'}{\|\mathbf r'\|},\qquad \mathbf N=\frac{\mathbf T'}{\|\mathbf T'\|},\qquad \mathbf B=\mathbf T\times\mathbf N`,
    keyIdeas: [
      {
        title: "Three perpendicular directions",
        explanation: "T points forward, N points toward instantaneous turning, and B is perpendicular to the osculating plane.",
        formula: String.raw`\mathbf T\cdot\mathbf N=\mathbf N\cdot\mathbf B=\mathbf B\cdot\mathbf T=0`,
      },
      {
        title: "Acceleration decomposition",
        explanation: "Acceleration has a tangential part that changes speed and a normal part that changes direction.",
        formula: String.raw`\mathbf a=v'\mathbf T+\kappa v^2\mathbf N`,
      },
      {
        title: "Frenet planes",
        explanation: "The osculating plane is spanned by T and N; the normal plane by N and B; the rectifying plane by T and B.",
        formula: String.raw`\text{Osculating normal: }\mathbf B,\quad \text{Normal-plane normal: }\mathbf T,\quad \text{Rectifying normal: }\mathbf N`,
      },
    ],
    workedExamples: [
      {
        title: "The Frenet frame of a helix",
        prompt: "Find T, N, and B at t = 0.",
        display: String.raw`\mathbf r(t)=\langle\cos t,\sin t,t\rangle`,
        steps: [
          {
            label: "Find T",
            explanation: "Velocity has constant magnitude √2.",
            math: String.raw`\mathbf T(t)=\frac1{\sqrt2}\langle-\sin t,\cos t,1\rangle`,
          },
          {
            label: "Find N",
            explanation: "Differentiate T and normalize. Its derivative has magnitude 1/√2.",
            math: String.raw`\mathbf N(t)=\langle-\cos t,-\sin t,0\rangle`,
          },
          {
            label: "Find B",
            explanation: "Take T × N in that order to preserve orientation.",
            math: String.raw`\mathbf B(t)=\frac1{\sqrt2}\langle\sin t,-\cos t,1\rangle`,
          },
          {
            label: "Evaluate",
            explanation: "Substitute t = 0.",
            math: String.raw`\mathbf T(0)=\tfrac1{\sqrt2}\langle0,1,1\rangle,\ \mathbf N(0)=\langle-1,0,0\rangle,\ \mathbf B(0)=\tfrac1{\sqrt2}\langle0,-1,1\rangle`,
          },
        ],
        answer: String.raw`\left(\mathbf T,\mathbf N,\mathbf B\right)_{t=0}=\left(\tfrac1{\sqrt2}\langle0,1,1\rangle,\langle-1,0,0\rangle,\tfrac1{\sqrt2}\langle0,-1,1\rangle\right)`,
      },
      {
        title: "Tangential and normal acceleration",
        prompt: "Resolve acceleration into Frenet components at t = 1.",
        display: String.raw`\mathbf r(t)=\langle t,t^2,0\rangle`,
        steps: [
          {
            label: "Compute speed and acceleration",
            explanation: "Use v = ||r′|| and a = r″.",
            math: String.raw`v=\sqrt{1+4t^2},\qquad \mathbf a=\langle0,2,0\rangle`,
          },
          {
            label: "Tangential component",
            explanation: "a_T is the derivative of speed.",
            math: String.raw`a_T=v'=\frac{4t}{\sqrt{1+4t^2}}\Rightarrow a_T(1)=\frac4{\sqrt5}`,
          },
          {
            label: "Normal component",
            explanation: "Use a_N = κv² or √(||a||²−a_T²).",
            math: String.raw`a_N(1)=\sqrt{4-\frac{16}{5}}=\frac2{\sqrt5}`,
          },
        ],
        answer: String.raw`\mathbf a=\frac4{\sqrt5}\mathbf T+\frac2{\sqrt5}\mathbf N\quad\text{at }t=1`,
      },
    ],
    practice: [
      {
        id: "t-1",
        prompt: "Find T at t = 0.",
        display: String.raw`\mathbf r(t)=\langle e^t,e^{-t},\sqrt2t\rangle`,
        hint: "Evaluate r′(0) and normalize.",
        solution: "r′(0)=⟨1,−1,√2⟩ has magnitude 2.",
        answer: String.raw`\mathbf T(0)=\frac12\langle1,-1,\sqrt2\rangle`,
      },
      {
        id: "t-2",
        prompt: "For the helix r(t)=⟨cos t,sin t,t⟩, write the osculating plane at t = 0.",
        hint: "The osculating plane passes through r(0) and has normal B(0).",
        solution: "The point is (1,0,0) and a normal parallel to B(0) is ⟨0,−1,1⟩.",
        answer: String.raw`-y+z=0`,
      },
      {
        id: "t-3",
        prompt: "If speed is 3, speed is increasing at 2 units/s², and κ = 1/4, find a_T and a_N.",
        hint: "Use a_T=v′ and a_N=κv².",
        solution: "The tangential component is the rate of change of speed. The normal component is (1/4)(3²).",
        answer: String.raw`a_T=2,\qquad a_N=\frac94`,
      },
    ],
    desmos: {
      title: "Build a moving frame",
      description: "Graph the helix and add vectors based at the moving point to see the frame rotate through space.",
      url: "https://www.desmos.com/3d?embed",
      entries: ["P=(cos(t),sin(t),t)", "T=(-sin(t),cos(t),1)/sqrt(2)", "N=(-cos(t),-sin(t),0)", "B=(sin(t),-cos(t),1)/sqrt(2)"],
    },
    connections: ["vector-valued-functions", "arc-length", "curvature"],
  },
  motionInSpaceModule,
  {
    slug: "multivariable-functions",
    chapter: "Unit 14",
    section: "14.1–14.2",
    unit: "Functions of Several Variables",
    number: 12,
    title: "Multivariable Functions",
    eyebrow: "Inputs become points and surfaces",
    summary:
      "Read domains, ranges, surfaces, level curves, and local behavior for functions with two or more independent variables.",
    keywords: ["multivariable", "domain", "range", "surface", "level curve", "level surface", "continuity"],
    objectives: [
      "Determine domains from algebraic restrictions.",
      "Interpret graphs and level sets.",
      "Evaluate limits along useful paths.",
      "Use continuity to justify direct substitution.",
    ],
    signatureFormula: String.raw`z=f(x,y),\qquad \text{level curve: }f(x,y)=c`,
    keyIdeas: [
      {
        title: "Domain is geometric",
        explanation: "Restrictions on radicals, denominators, and logarithms define regions in the input plane or input space.",
        formula: String.raw`\sqrt{g(x,y)}:\ g\ge0,\qquad \ln g(x,y):\ g>0,\qquad \frac1{g(x,y)}:\ g\ne0`,
      },
      {
        title: "Level sets compress dimension",
        explanation: "A level curve is a top-down contour of a surface. Nearby contours indicate how rapidly height changes.",
        formula: String.raw`f(x,y)=c`,
      },
      {
        title: "Multivariable limits",
        explanation: "A limit exists only if all approaches give the same value. Two disagreeing paths prove nonexistence; matching paths alone do not prove existence.",
        formula: String.raw`\lim_{(x,y)\to(a,b)}f(x,y)=L`,
      },
    ],
    workedExamples: [
      {
        title: "Describe a domain",
        prompt: "Find and describe the domain.",
        display: String.raw`f(x,y)=\frac{\sqrt{9-x^2-y^2}}{x-y}`,
        steps: [
          {
            label: "Apply the radical restriction",
            explanation: "The radicand must be nonnegative.",
            math: String.raw`9-x^2-y^2\ge0\Longleftrightarrow x^2+y^2\le9`,
          },
          {
            label: "Apply the denominator restriction",
            explanation: "The denominator cannot be zero.",
            math: String.raw`x-y\ne0\Longleftrightarrow x\ne y`,
          },
          {
            label: "Intersect the conditions",
            explanation: "Keep the closed disk but remove the portion of the line y = x inside it.",
            math: String.raw`D=\{(x,y):x^2+y^2\le9,\ x\ne y\}`,
          },
        ],
        answer: String.raw`D=\{(x,y)\in\mathbb R^2:x^2+y^2\le9\text{ and }x\ne y\}`,
      },
      {
        title: "Interpret level curves",
        prompt: "Describe the level curves and the surface.",
        display: String.raw`f(x,y)=x^2+4y^2`,
        steps: [
          {
            label: "Set the output equal to c",
            explanation: "Level curves satisfy x² + 4y² = c.",
            math: String.raw`x^2+4y^2=c`,
          },
          {
            label: "Classify by c",
            explanation: "There are no points for c<0, one point for c=0, and ellipses for c>0.",
            math: String.raw`\frac{x^2}{c}+\frac{y^2}{c/4}=1\qquad(c>0)`,
          },
          {
            label: "Identify the surface",
            explanation: "The graph z=x²+4y² is an upward-opening elliptic paraboloid.",
            math: String.raw`z=x^2+4y^2`,
          },
        ],
        answer: "Elliptical level curves for c > 0; the surface is an elliptic paraboloid.",
      },
    ],
    practice: [
      {
        id: "m-1",
        prompt: "Find the domain.",
        display: String.raw`g(x,y)=\ln(4-x^2-y^2)`,
        hint: "A logarithm requires a strictly positive input.",
        solution: "Require 4−x²−y²>0, so the domain is the interior of the circle of radius 2.",
        answer: String.raw`x^2+y^2<4`,
      },
      {
        id: "m-2",
        prompt: "Describe the level curves for c > 0.",
        display: String.raw`f(x,y)=\sqrt{x^2+y^2}`, 
        hint: "Square both sides after setting f=c.",
        solution: "√(x²+y²)=c gives x²+y²=c², a circle centered at the origin with radius c.",
        answer: String.raw`x^2+y^2=c^2\text{, circles of radius }c`,
      },
      {
        id: "m-3",
        prompt: "Show that the limit does not exist by comparing two paths.",
        display: String.raw`\lim_{(x,y)\to(0,0)}\frac{x^2-y^2}{x^2+y^2}`,
        hint: "Try the coordinate axes.",
        solution: "Along y=0 the expression is 1. Along x=0 it is −1. Since the path limits disagree, the two-variable limit does not exist.",
        answer: String.raw`\text{DNE}`, 
      },
    ],
    desmos: {
      title: "Surface and contours",
      description: "Graph an elliptic paraboloid in 3D, then compare it with level curves in the 2D calculator.",
      url: "https://www.desmos.com/3d?embed",
      entries: ["z=x^2+4y^2", "z=1", "z=4"],
    },
    connections: ["partial-derivatives", "clairauts-theorem", "gradient"],
  },
  {
    slug: "partial-derivatives",
    chapter: "Unit 14",
    section: "14.3",
    unit: "Local Change",
    number: 13,
    title: "Partial Derivatives",
    eyebrow: "Change one input at a time",
    summary:
      "Freeze all but one variable to measure coordinate-direction rates of change and build local linear information.",
    keywords: ["partial derivative", "fx", "fy", "higher order", "tangent plane", "linearization"],
    objectives: [
      "Compute first- and higher-order partial derivatives.",
      "Interpret partial derivatives as coordinate-direction slopes.",
      "Construct a local linearization.",
      "Track which variables are held constant.",
    ],
    signatureFormula: String.raw`f_x=\frac{\partial f}{\partial x},\qquad f_y=\frac{\partial f}{\partial y}`, 
    keyIdeas: [
      {
        title: "Hold the other variables constant",
        explanation: "For fₓ, treat y and any other independent variables as constants. For fᵧ, treat x and the remaining variables as constants.",
        formula: String.raw`f_x(a,b)=\lim_{h\to0}\frac{f(a+h,b)-f(a,b)}h`,
      },
      {
        title: "Higher-order partials",
        explanation: "Differentiate again in the order indicated. In fxy, first differentiate with respect to x, then with respect to y.",
        formula: String.raw`f_{xy}=\frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right)`,
      },
      {
        title: "Linearization",
        explanation: "Near a point, a differentiable function is approximated by a plane whose coefficients are its first partial derivatives.",
        formula: String.raw`L(x,y)=f(a,b)+f_x(a,b)(x-a)+f_y(a,b)(y-b)`,
      },
    ],
    workedExamples: [
      {
        title: "First and second partials",
        prompt: "Compute all first- and second-order partial derivatives.",
        display: String.raw`f(x,y)=x^2e^y+y^3\sin x`,
        steps: [
          {
            label: "Differentiate with respect to x",
            explanation: "Treat y as constant.",
            math: String.raw`f_x=2xe^y+y^3\cos x`,
          },
          {
            label: "Differentiate with respect to y",
            explanation: "Treat x as constant.",
            math: String.raw`f_y=x^2e^y+3y^2\sin x`,
          },
          {
            label: "Differentiate again",
            explanation: "Compute pure and mixed second partials.",
            math: String.raw`f_{xx}=2e^y-y^3\sin x,\quad f_{xy}=2xe^y+3y^2\cos x`,
          },
          {
            label: "Complete the set",
            explanation: "Differentiate fᵧ with respect to x and y.",
            math: String.raw`f_{yx}=2xe^y+3y^2\cos x,\quad f_{yy}=x^2e^y+6y\sin x`,
          },
        ],
        answer: String.raw`f_x=2xe^y+y^3\cos x,\ f_y=x^2e^y+3y^2\sin x` + "; second partials are shown in the steps.",
      },
      {
        title: "Build a linearization",
        prompt: "Find the linearization at (1, 0), then estimate f(1.02, −0.03).",
        display: String.raw`f(x,y)=\sqrt{x^2+y+3}`,
        steps: [
          {
            label: "Evaluate the base value",
            explanation: "Substitute the center point.",
            math: String.raw`f(1,0)=2`,
          },
          {
            label: "Find partial derivatives",
            explanation: "Apply the chain rule to the square root.",
            math: String.raw`f_x=\frac{x}{\sqrt{x^2+y+3}},\qquad f_y=\frac1{2\sqrt{x^2+y+3}}`,
          },
          {
            label: "Evaluate coefficients",
            explanation: "At (1,0), fₓ=1/2 and fᵧ=1/4.",
            math: String.raw`L(x,y)=2+\frac12(x-1)+\frac14y`,
          },
          {
            label: "Estimate",
            explanation: "Use Δx=0.02 and Δy=−0.03.",
            math: String.raw`L(1.02,-0.03)=2+0.01-0.0075=2.0025`,
          },
        ],
        answer: String.raw`L(x,y)=2+\tfrac12(x-1)+\tfrac14y,\qquad f(1.02,-0.03)\approx2.0025`,
      },
    ],
    practice: [
      {
        id: "p-1",
        prompt: "Find fₓ and fᵧ.",
        display: String.raw`f(x,y)=x^3y^2+\ln(x+y)`,
        hint: "Treat the other independent variable as a constant in each derivative.",
        solution: "Differentiate x³y² by the power rule and ln(x+y) by the one-variable chain rule.",
        answer: String.raw`f_x=3x^2y^2+\frac1{x+y},\qquad f_y=2x^3y+\frac1{x+y}`,
      },
      {
        id: "p-2",
        prompt: "Evaluate the indicated partial derivative.",
        display: String.raw`f(x,y,z)=xe^{yz}+z^2\cos x,\qquad f_z(0,2,1)`,
        hint: "For fz, x and y are constants.",
        solution: "f_z=xy e^{yz}+2z cos x. At (0,2,1), the exponential term vanishes and 2z cos x=2.",
        answer: String.raw`f_z(0,2,1)=2`,
      },
      {
        id: "p-3",
        prompt: "Find fxx, fxy, fyx, and fyy.",
        display: String.raw`f(x,y)=x^2y+4xy^2`,
        hint: "Find fx and fy first, then differentiate each again.",
        solution: "fₓ=2xy+4y² and fᵧ=x²+8xy. Differentiating again gives the four requested derivatives.",
        answer: String.raw`f_{xx}=2y,\quad f_{xy}=2x+8y,\quad f_{yx}=2x+8y,\quad f_{yy}=8x`,
      },
    ],
    connections: ["multivariable-functions", "tangent-planes-linearization", "clairauts-theorem", "multivariable-chain-rule", "gradient"],
  },
  {
    slug: "tangent-planes-linearization",
    chapter: "Unit 14",
    section: "14.4",
    unit: "Local Linear Models",
    number: 14,
    title: "Tangent Planes, Normal Lines & Linearization",
    eyebrow: "A surface becomes a plane nearby",
    summary:
      "Use first partial derivatives or an implicit gradient to build tangent planes and normal lines, then turn the same local data into a linear approximation.",
    keywords: ["Section 14.4", "tangent plane", "normal line", "linearization", "linear approximation", "differential", "differentiability"],
    objectives: [
      "Construct the tangent plane to a graph z = f(x,y).",
      "Use the gradient of F(x,y,z) = c to find tangent planes and normal lines.",
      "Build a linearization and use it to estimate nearby function values.",
      "Connect differentiability, differentials, and local approximation error.",
    ],
    signatureFormula: String.raw`L(x,y)=f(a,b)+f_x(a,b)(x-a)+f_y(a,b)(y-b)`,
    keyIdeas: [
      {
        title: "Tangent plane to a graph",
        explanation:
          "At a differentiable point, the two first partial derivatives give the plane's slopes in the coordinate directions. The plane passes through (a,b,f(a,b)).",
        formula: String.raw`z-f(a,b)=f_x(a,b)(x-a)+f_y(a,b)(y-b)`,
        note: "Evaluate the function and both partial derivatives at the same base point before writing the plane.",
      },
      {
        title: "Implicit surfaces and normal lines",
        explanation:
          "For a level surface F(x,y,z)=c, the gradient is perpendicular to the surface. It supplies both the normal vector to the tangent plane and the direction of the normal line.",
        formula: String.raw`\nabla F(P)\cdot\langle x-x_0,y-y_0,z-z_0\rangle=0,\qquad \mathbf r(t)=P+t\nabla F(P)`,
        note: String.raw`\nabla F(P)\ne\mathbf0` + " is required for the standard tangent-plane formula.",
      },
      {
        title: "Linearization",
        explanation:
          "The tangent plane, rewritten as a function L(x,y), is the best first-order approximation to f near the base point. Small input changes should be measured from that point.",
        formula: String.raw`f(a+\Delta x,b+\Delta y)\approx f(a,b)+f_x(a,b)\Delta x+f_y(a,b)\Delta y`,
      },
      {
        title: "Differentiability and the differential",
        explanation:
          "Continuous first partial derivatives near a point are a convenient sufficient condition for differentiability there. For a differentiable function, the error beyond the linear part is small relative to the input displacement.",
        formula: String.raw`dz=f_x(a,b)\,dx+f_y(a,b)\,dy,\qquad \frac{f(a+\Delta x,b+\Delta y)-L(a+\Delta x,b+\Delta y)}{\sqrt{(\Delta x)^2+(\Delta y)^2}}\to0`,
      },
    ],
    workedExamples: [
      {
        title: "Tangent plane to an explicit surface",
        prompt: "Find the tangent plane at (1,1,3).",
        display: String.raw`z=f(x,y)=x^2+xy+y^2`,
        steps: [
          {
            label: "Compute the partial derivatives",
            explanation: "Differentiate with respect to each input.",
            math: String.raw`f_x=2x+y,\qquad f_y=x+2y`,
          },
          {
            label: "Evaluate the slopes",
            explanation: "At (1,1), both coordinate-direction slopes equal 3.",
            math: String.raw`f_x(1,1)=3,\qquad f_y(1,1)=3`,
          },
          {
            label: "Use point-slope form",
            explanation: "The plane must pass through (1,1,3).",
            math: String.raw`z-3=3(x-1)+3(y-1)`,
          },
          {
            label: "Simplify",
            explanation: "An equivalent standard form is often easier to graph.",
            math: String.raw`z=3x+3y-3`,
          },
        ],
        answer: String.raw`z=3x+3y-3`,
      },
      {
        title: "Tangent plane and normal line to a level surface",
        prompt: "Find both at P=(1,2,3).",
        display: String.raw`F(x,y,z)=x^2+y^2+z^2=14`,
        steps: [
          {
            label: "Find the gradient",
            explanation: "The gradient is normal to the sphere.",
            math: String.raw`\nabla F=\langle2x,2y,2z\rangle`,
          },
          {
            label: "Evaluate the normal vector",
            explanation: "At P, the gradient is ⟨2,4,6⟩, parallel to ⟨1,2,3⟩.",
            math: String.raw`\nabla F(1,2,3)=\langle2,4,6\rangle`,
          },
          {
            label: "Write the tangent plane",
            explanation: "Use the gradient as the plane's normal.",
            math: String.raw`2(x-1)+4(y-2)+6(z-3)=0\Longleftrightarrow x+2y+3z=14`,
          },
          {
            label: "Write the normal line",
            explanation: "Use P as the starting point and the same normal direction.",
            math: String.raw`\mathbf r(t)=\langle1,2,3\rangle+t\langle1,2,3\rangle`,
          },
        ],
        answer: String.raw`\text{Plane: }x+2y+3z=14;\qquad \text{line: }\mathbf r(t)=\langle1,2,3\rangle+t\langle1,2,3\rangle`,
      },
      {
        title: "Use a linearization to estimate",
        prompt: "Linearize at (0,1), then estimate f(0.08,0.96).",
        display: String.raw`f(x,y)=\sqrt{4-x^2-y^2}`,
        steps: [
          {
            label: "Evaluate the base value",
            explanation: "The nearby, easy point is (0,1).",
            math: String.raw`f(0,1)=\sqrt3`,
          },
          {
            label: "Find and evaluate the partials",
            explanation: "Differentiate the square root, then substitute the base point.",
            math: String.raw`f_x=-\frac{x}{\sqrt{4-x^2-y^2}},\quad f_y=-\frac{y}{\sqrt{4-x^2-y^2}};\quad f_x(0,1)=0,\ f_y(0,1)=-\frac1{\sqrt3}`,
          },
          {
            label: "Build the linearization",
            explanation: "Use Δx=x and Δy=y−1.",
            math: String.raw`L(x,y)=\sqrt3-\frac{y-1}{\sqrt3}`,
          },
          {
            label: "Estimate",
            explanation: "Substitute the nearby coordinates into L rather than f.",
            math: String.raw`f(0.08,0.96)\approx L(0.08,0.96)=\sqrt3+\frac{0.04}{\sqrt3}\approx1.7551`,
          },
        ],
        answer: String.raw`L(x,y)=\sqrt3-\frac{y-1}{\sqrt3},\qquad f(0.08,0.96)\approx1.7551`,
      },
    ],
    practice: [
      {
        id: "tp-1",
        prompt: "Find the tangent plane at (3,0,4).",
        display: String.raw`z=\sqrt{25-x^2-y^2}`,
        hint: "Evaluate fx and fy at (3,0), then use the point (3,0,4).",
        solution: "The partial derivatives are −x/√(25−x²−y²) and −y/√(25−x²−y²). At (3,0), they are −3/4 and 0, so z−4=−(3/4)(x−3).",
        answer: String.raw`3x+4z=25`,
      },
      {
        id: "tp-2",
        prompt: "Find a vector equation of the normal line at (2,1,2).",
        display: String.raw`x^2+2y^2+3z^2=18`,
        hint: "Use the gradient of F(x,y,z)=x²+2y²+3z² as the line's direction.",
        solution: "The gradient at (2,1,2) is ⟨4,4,12⟩, which is parallel to ⟨1,1,3⟩.",
        answer: String.raw`\mathbf r(t)=\langle2,1,2\rangle+t\langle1,1,3\rangle`,
      },
      {
        id: "tp-3",
        prompt: "Find the linearization at (1,0), then estimate f(1.02,−0.03).",
        display: String.raw`f(x,y)=xe^{xy}`,
        hint: "Compute f, fx, and fy at (1,0) before substituting the nearby point.",
        solution: "Here fx=e^(xy)(1+xy) and fy=x²e^(xy). At (1,0), f=fx=fy=1, so L=1+(x−1)+y=x+y.",
        answer: String.raw`L(x,y)=x+y,\qquad f(1.02,-0.03)\approx0.99`,
      },
      {
        id: "tp-4",
        prompt: "Use differentials to estimate the change in f when x increases by 0.02 and y decreases by 0.01 from (1,2).",
        display: String.raw`f(x,y)=x^2y+\sin y`,
        hint: "Compute dz=fx dx+fy dy at (1,2).",
        solution: "At (1,2), fx=2xy=4 and fy=x²+cos y=1+cos 2. With dx=0.02 and dy=−0.01, dz=4(0.02)+(1+cos 2)(−0.01).",
        answer: String.raw`\Delta f\approx dz=0.07-0.01\cos2\approx0.07416`,
      },
    ],
    desmos: {
      title: "A surface and its tangent plane",
      description: "Compare a surface with its tangent plane near the point of tangency, then move away from the point to see the linear approximation lose accuracy.",
      url: "https://www.desmos.com/3d?embed",
      entries: ["z=x^2+xy+y^2", "z=3x+3y-3", "P=(1,1,3)"],
    },
    connections: ["partial-derivatives", "gradient", "extrema-second-derivative-test"],
  },
  {
    slug: "clairauts-theorem",
    chapter: "Unit 14",
    section: "14.3",
    unit: "Local Change",
    number: 15,
    title: "Clairaut’s Theorem",
    eyebrow: "When mixed partials agree",
    summary:
      "Use continuity of mixed partial derivatives near a point to justify equality of the two differentiation orders.",
    keywords: ["Clairaut", "mixed partials", "symmetry", "fxy", "fyx", "continuity"],
    objectives: [
      "State Clairaut’s theorem with its continuity condition.",
      "Compute mixed partial derivatives in the correct order.",
      "Verify the theorem for a smooth function.",
      "Avoid assuming equality when the hypotheses are unknown.",
    ],
    signatureFormula: String.raw`f_{xy}(a,b)=f_{yx}(a,b)\quad\text{when the mixed partials are continuous near }(a,b)`,
    keyIdeas: [
      {
        title: "Order matters in notation",
        explanation: "The subscript closest to f acts first. Thus fxy means differentiate with respect to x first, then y.",
        formula: String.raw`f_{xy}=\frac{\partial}{\partial y}\!\left(\frac{\partial f}{\partial x}\right)`,
      },
      {
        title: "Continuity is the guarantee",
        explanation: "If fxy and fyx are continuous on an open region containing the point, then the mixed partials are equal there.",
        formula: String.raw`f\in C^2\Longrightarrow f_{xy}=f_{yx}`, 
      },
      {
        title: "Equality is not just notation",
        explanation: "Without suitable regularity, both mixed partials can exist at a point and still be unequal. Check the theorem’s conditions before invoking it.",
        formula: String.raw`\text{existence alone}\not\Rightarrow f_{xy}=f_{yx}`, 
      },
    ],
    workedExamples: [
      {
        title: "Verify Clairaut’s theorem",
        prompt: "Find the mixed partial derivatives and verify Clairaut’s theorem.",
        display: String.raw`f(x,y)=x^3y^2+e^{xy}`,
        steps: [
          {
            label: "Differentiate x first",
            explanation: "Find fₓ while holding y constant.",
            math: String.raw`f_x=3x^2y^2+ye^{xy}`,
          },
          {
            label: "Then differentiate with respect to y",
            explanation: "Use the product rule on y e^(xy).",
            math: String.raw`f_{xy}=6x^2y+e^{xy}+xye^{xy}`,
          },
          {
            label: "Reverse the route",
            explanation: "Find fᵧ, then differentiate with respect to x.",
            math: String.raw`f_y=2x^3y+xe^{xy}`, 
          },
          {
            label: "Compare",
            explanation: "The reverse order produces the same expression. Both are continuous everywhere.",
            math: String.raw`f_{yx}=6x^2y+e^{xy}+xye^{xy}=f_{xy}`,
          },
        ],
        answer: String.raw`f_{xy}=f_{yx}=6x^2y+(1+xy)e^{xy}`, 
      },
      {
        title: "Use symmetry efficiently",
        prompt: "Find fzy without recomputing from the original function after obtaining fyz.",
        display: String.raw`f(x,y,z)=x^2yz+\sin(yz)`,
        steps: [
          {
            label: "Compute one order",
            explanation: "Differentiate with respect to y, then z.",
            math: String.raw`f_y=x^2z+z\cos(yz)`,
          },
          {
            label: "Differentiate with respect to z",
            explanation: "Use the product rule on z cos(yz).",
            math: String.raw`f_{yz}=x^2+\cos(yz)-yz\sin(yz)`,
          },
          {
            label: "Invoke smoothness",
            explanation: "Polynomial and trigonometric compositions are continuous with continuous derivatives everywhere.",
            math: String.raw`f_{zy}=f_{yz}`, 
          },
        ],
        answer: String.raw`f_{zy}=x^2+\cos(yz)-yz\sin(yz)`,
      },
    ],
    practice: [
      {
        id: "cl-1",
        prompt: "Find fxy and fyx, then verify Clairaut’s theorem.",
        display: String.raw`f(x,y)=x^2\sin y+y^2\cos x`,
        hint: "Compute each route independently and simplify.",
        solution: "fₓ=2x sin y−y² sin x, so fxy=2x cos y−2y sin x. Also fᵧ=x² cos y+2y cos x, so fyx gives the same expression.",
        answer: String.raw`f_{xy}=f_{yx}=2x\cos y-2y\sin x`,
      },
      {
        id: "cl-2",
        prompt: "Explain why Clairaut’s theorem applies everywhere.",
        display: String.raw`f(x,y)=\frac{x^2+y^2}{1+x^2+y^2}`,
        hint: "Focus on where the denominator can be zero and on continuity of rational functions.",
        solution: "The denominator is always at least 1, so f and all of its partial derivatives are rational functions with nonzero denominator. The mixed partials are continuous everywhere.",
        answer: String.raw`f_{xy}=f_{yx}\text{ on }\mathbb R^2\text{ because }f\in C^2(\mathbb R^2).`,
      },
      {
        id: "cl-3",
        prompt: "True or false: if fxy(0,0) and fyx(0,0) both exist, then they must be equal.",
        hint: "Existence at a single point is weaker than continuity in a neighborhood.",
        solution: "False. Clairaut’s theorem needs a regularity condition such as continuity of the mixed partials near the point.",
        answer: String.raw`\text{False}`, 
      },
    ],
    connections: ["partial-derivatives", "multivariable-chain-rule", "gradient"],
  },
  {
    slug: "multivariable-chain-rule",
    chapter: "Unit 14",
    section: "14.5",
    unit: "Composed Change",
    number: 16,
    title: "The Multivariable Chain Rule",
    eyebrow: "Trace every dependency path",
    summary:
      "Differentiate a composition by summing the contributions from every route connecting an input to the final output.",
    keywords: ["chain rule", "dependency tree", "total derivative", "dzdt", "composition", "Jacobian"],
    objectives: [
      "Draw a dependency tree for a composition.",
      "Apply the one-parameter multivariable chain rule.",
      "Handle compositions with multiple independent variables.",
      "Interpret the chain rule as a gradient dot velocity.",
    ],
    signatureFormula: String.raw`\frac{dz}{dt}=f_x\frac{dx}{dt}+f_y\frac{dy}{dt}=\nabla f\cdot\mathbf r'(t)`,
    keyIdeas: [
      {
        title: "Sum over all paths",
        explanation: "For each route from an independent variable to the final output, multiply derivatives along the route; then add the route products.",
        formula: String.raw`\frac{\partial z}{\partial u}=f_xx_u+f_yy_u`,
      },
      {
        title: "Evaluate at matching inputs",
        explanation: "The outer partial derivatives are evaluated at (x(t),y(t)); the inner derivatives are evaluated at t.",
        formula: String.raw`\frac{dz}{dt}=f_x(x(t),y(t))x'(t)+f_y(x(t),y(t))y'(t)`,
      },
      {
        title: "Vector form",
        explanation: "The total rate of change equals the projection of the gradient onto the velocity vector.",
        formula: String.raw`\frac{d}{dt}f(\mathbf r(t))=\nabla f(\mathbf r(t))\cdot\mathbf r'(t)`,
      },
    ],
    workedExamples: [
      {
        title: "One parameter drives two inputs",
        prompt: "Find dz/dt at t = 0.",
        display: String.raw`z=x^2y+\sin y,\qquad x=t^2,\qquad y=e^t`,
        steps: [
          {
            label: "Write the chain rule",
            explanation: "There are two dependency paths from t to z.",
            math: String.raw`\frac{dz}{dt}=z_xx'+z_yy'`,
          },
          {
            label: "Compute ingredients",
            explanation: "Find outer partials and inner derivatives.",
            math: String.raw`z_x=2xy,\ z_y=x^2+\cos y,\ x'=2t,\ y'=e^t`,
          },
          {
            label: "Evaluate the inner variables",
            explanation: "At t = 0, x = 0 and y = 1.",
            math: String.raw`x(0)=0,\quad y(0)=1,\quad x'(0)=0,\quad y'(0)=1`,
          },
          {
            label: "Assemble",
            explanation: "Substitute all values at the same point.",
            math: String.raw`\left.\frac{dz}{dt}\right|_{t=0}=0\cdot0+(0+\cos1)\cdot1=\cos1`,
          },
        ],
        answer: String.raw`\left.\frac{dz}{dt}\right|_{t=0}=\cos1`,
      },
      {
        title: "Two independent variables",
        prompt: "Find wu and wv.",
        display: String.raw`w=x^2+xy+y^2,\qquad x=u^2-v,\qquad y=u+v^2`,
        steps: [
          {
            label: "Find outer partials",
            explanation: "Differentiate w with respect to x and y.",
            math: String.raw`w_x=2x+y,\qquad w_y=x+2y`,
          },
          {
            label: "Find inner partials",
            explanation: "Differentiate x and y with respect to u and v.",
            math: String.raw`x_u=2u,\ y_u=1,\ x_v=-1,\ y_v=2v`,
          },
          {
            label: "Build wu",
            explanation: "Sum the u-path products.",
            math: String.raw`w_u=(2x+y)(2u)+(x+2y)`,
          },
          {
            label: "Build wv",
            explanation: "Sum the v-path products.",
            math: String.raw`w_v=-(2x+y)+2v(x+2y)`,
          },
        ],
        answer: String.raw`w_u=2u(2x+y)+x+2y,\qquad w_v=-(2x+y)+2v(x+2y)`,
      },
    ],
    practice: [
      {
        id: "ch-1",
        prompt: "Find dz/dt at t = 1.",
        display: String.raw`z=xe^y,\qquad x=t^3,\qquad y=\ln t`,
        hint: "Compute zₓ, zᵧ, x′, and y′ before evaluating.",
        solution: "zₓ=eʸ and zᵧ=xeʸ. At t=1, x=1, y=0, x′=3, and y′=1, so dz/dt=1·3+1·1.",
        answer: String.raw`\left.\frac{dz}{dt}\right|_{t=1}=4`,
      },
      {
        id: "ch-2",
        prompt: "Find ∂z/∂u.",
        display: String.raw`z=\ln(x^2+y^2),\qquad x=u+v,\qquad y=u-v`,
        hint: "Both x and y depend on u.",
        solution: "zₓ=2x/(x²+y²), zᵧ=2y/(x²+y²), and xu=yu=1. Thus zu=2(x+y)/(x²+y²). Substituting x+y=2u and x²+y²=2u²+2v² simplifies the result.",
        answer: String.raw`z_u=\frac{2u}{u^2+v^2}`, 
      },
      {
        id: "ch-3",
        prompt: "Write the chain rule for w = f(x,y,z), where x, y, and z all depend on t.",
        hint: "There is one term for each path from t to w.",
        solution: "Multiply each outer partial by the derivative of its associated inner variable, then add.",
        answer: String.raw`\frac{dw}{dt}=f_x\frac{dx}{dt}+f_y\frac{dy}{dt}+f_z\frac{dz}{dt}`, 
      },
    ],
    connections: ["partial-derivatives", "gradient", "directional-derivatives"],
  },
  {
    slug: "gradient",
    chapter: "Unit 14",
    section: "14.6",
    unit: "Directional Change",
    number: 17,
    title: "The Gradient",
    eyebrow: "Collect every coordinate rate",
    summary:
      "Package first partial derivatives into a vector that points toward greatest increase and stands normal to level sets.",
    keywords: ["gradient", "nabla", "steepest ascent", "level curve", "normal vector", "maximum rate"],
    objectives: [
      "Compute and evaluate a gradient vector.",
      "Interpret the gradient as the direction of steepest ascent.",
      "Find maximum and minimum directional rates.",
      "Use the gradient as a normal to a level curve or surface.",
    ],
    signatureFormula: String.raw`\nabla f=\left\langle f_x,f_y,f_z\right\rangle`,
    keyIdeas: [
      {
        title: "Direction of fastest increase",
        explanation: "At a point where the gradient is nonzero, the unit gradient direction produces the largest possible directional derivative.",
        formula: String.raw`\mathbf u_{\max}=\frac{\nabla f}{\|\nabla f\|},\qquad D_{\mathbf u_{\max}}f=\|\nabla f\|`,
      },
      {
        title: "Normal to level sets",
        explanation: "Motion tangent to a level set does not change f to first order, so tangent directions are perpendicular to the gradient.",
        formula: String.raw`f(x,y,z)=c\Longrightarrow \nabla f\perp\text{ level surface}`, 
      },
      {
        title: "Critical points",
        explanation: "For differentiable f, interior local extrema can occur where the gradient is zero, though a zero gradient does not guarantee an extremum.",
        formula: String.raw`\nabla f(a,b)=\mathbf0`,
      },
    ],
    workedExamples: [
      {
        title: "Steepest increase and decrease",
        prompt: "Find the directions and rates of fastest increase and decrease at (1, −1).",
        display: String.raw`f(x,y)=x^2+3y^2`,
        steps: [
          {
            label: "Find the gradient",
            explanation: "Collect the first partial derivatives.",
            math: String.raw`\nabla f=\langle2x,6y\rangle`,
          },
          {
            label: "Evaluate",
            explanation: "At (1,−1), the gradient is ⟨2,−6⟩.",
            math: String.raw`\nabla f(1,-1)=\langle2,-6\rangle`,
          },
          {
            label: "Normalize",
            explanation: "The gradient magnitude is √40=2√10.",
            math: String.raw`\mathbf u_{\max}=\frac1{\sqrt{10}}\langle1,-3\rangle`,
          },
          {
            label: "Reverse for decrease",
            explanation: "The minimum rate is the negative gradient magnitude in the opposite direction.",
            math: String.raw`\mathbf u_{\min}=\frac1{\sqrt{10}}\langle-1,3\rangle,\quad D_{\mathbf u_{\min}}f=-2\sqrt{10}`,
          },
        ],
        answer: String.raw`\max D_{\mathbf u}f=2\sqrt{10}\text{ in }\tfrac1{\sqrt{10}}\langle1,-3\rangle;\quad \min D_{\mathbf u}f=-2\sqrt{10}`, 
      },
      {
        title: "A normal to a level surface",
        prompt: "Find a normal vector to the level surface through (1, 2, 2).",
        display: String.raw`F(x,y,z)=x^2+y^2+z^2`,
        steps: [
          {
            label: "Identify the level value",
            explanation: "The point lies on x²+y²+z²=9.",
            math: String.raw`F(1,2,2)=9`,
          },
          {
            label: "Find the gradient",
            explanation: "The gradient is normal to the sphere.",
            math: String.raw`\nabla F=\langle2x,2y,2z\rangle`,
          },
          {
            label: "Evaluate",
            explanation: "Substitute the point.",
            math: String.raw`\nabla F(1,2,2)=\langle2,4,4\rangle`,
          },
        ],
        answer: String.raw`\mathbf n=\langle1,2,2\rangle\text{ (or any nonzero scalar multiple)}`, 
      },
    ],
    practice: [
      {
        id: "g-1",
        prompt: "Find ∇f at the given point.",
        display: String.raw`f(x,y,z)=xe^{yz}+z^2,\qquad (1,0,2)`,
        hint: "Compute all three first partial derivatives before substituting.",
        solution: "fₓ=eʸᶻ, fᵧ=xz eʸᶻ, and f_z=xy eʸᶻ+2z. At (1,0,2), e⁰=1.",
        answer: String.raw`\nabla f(1,0,2)=\langle1,2,4\rangle`,
      },
      {
        id: "g-2",
        prompt: "Find the maximum rate of increase and its unit direction at (3,4).",
        display: String.raw`f(x,y)=\sqrt{x^2+y^2}`, 
        hint: "The maximum rate is ||∇f||.",
        solution: "∇f=⟨x/r,y/r⟩. At (3,4), this is ⟨3/5,4/5⟩, which already has magnitude 1.",
        answer: String.raw`\text{Maximum rate}=1,\qquad \mathbf u=\left\langle\frac35,\frac45\right\rangle`,
      },
      {
        id: "g-3",
        prompt: "Find a tangent direction to the level curve through (1,1).",
        display: String.raw`f(x,y)=x^2+xy+y^2`,
        hint: "Any tangent direction must be perpendicular to ∇f(1,1).",
        solution: "∇f=⟨2x+y,x+2y⟩, so ∇f(1,1)=⟨3,3⟩. A perpendicular vector is ⟨1,−1⟩.",
        answer: String.raw`\mathbf v=\langle1,-1\rangle\text{ (or any nonzero scalar multiple)}`, 
      },
    ],
    desmos: {
      title: "Gradient over a contour map",
      description: "Plot the surface or its contours, then compare gradient vectors with the level curves.",
      url: "https://www.desmos.com/calculator?embed",
      entries: ["f(x,y)=x^2+3y^2", "x^2+3y^2=[1,4,9]", "gradient at (a,b): (2a,6b)"],
    },
    connections: ["partial-derivatives", "tangent-planes-linearization", "multivariable-chain-rule", "directional-derivatives", "extrema-second-derivative-test"],
  },
  {
    slug: "directional-derivatives",
    chapter: "Unit 14",
    section: "14.6",
    unit: "Directional Change",
    number: 18,
    title: "Directional Derivatives",
    eyebrow: "Measure change along a chosen direction",
    summary:
      "Project the gradient onto a unit direction to find the instantaneous rate of change along any path through a point.",
    keywords: ["directional derivative", "unit vector", "projection", "gradient", "rate of change", "direction"],
    objectives: [
      "Normalize a direction vector before using it.",
      "Compute a directional derivative from the gradient.",
      "Interpret the sign and magnitude of a directional rate.",
      "Connect directional derivatives to the multivariable chain rule.",
    ],
    signatureFormula: String.raw`D_{\mathbf u}f(\mathbf a)=\nabla f(\mathbf a)\cdot\mathbf u,\qquad \|\mathbf u\|=1`,
    keyIdeas: [
      {
        title: "Normalize first",
        explanation: "A direction vector specifies orientation but not a standardized rate. Divide by its magnitude before taking the dot product.",
        formula: String.raw`\mathbf u=\frac{\mathbf v}{\|\mathbf v\|}`, 
      },
      {
        title: "Projection of the gradient",
        explanation: "The directional derivative is the scalar projection of the gradient onto the chosen unit direction.",
        formula: String.raw`D_{\mathbf u}f=\nabla f\cdot\mathbf u`,
      },
      {
        title: "Meaning of the value",
        explanation: "Positive means f increases, negative means f decreases, and zero means the chosen direction is tangent to the level set to first order.",
        formula: String.raw`D_{\mathbf u}f>0:\ \text{increase},\quad D_{\mathbf u}f<0:\ \text{decrease},\quad D_{\mathbf u}f=0:\ \text{level direction}`, 
      },
    ],
    workedExamples: [
      {
        title: "A three-dimensional directional derivative",
        prompt: "Find the directional derivative at P in the direction of v.",
        display: String.raw`f(x,y,z)=x^2y+yz^2,\quad P=(1,2,-1),\quad \mathbf v=\langle2,-1,2\rangle`,
        steps: [
          {
            label: "Normalize the direction",
            explanation: "The magnitude of v is 3.",
            math: String.raw`\mathbf u=\frac13\langle2,-1,2\rangle`,
          },
          {
            label: "Find the gradient",
            explanation: "Compute all first partial derivatives.",
            math: String.raw`\nabla f=\langle2xy,x^2+z^2,2yz\rangle`,
          },
          {
            label: "Evaluate at P",
            explanation: "Substitute x=1, y=2, z=−1.",
            math: String.raw`\nabla f(1,2,-1)=\langle4,2,-4\rangle`,
          },
          {
            label: "Take the dot product",
            explanation: "Project the gradient onto the unit direction.",
            math: String.raw`D_{\mathbf u}f=\langle4,2,-4\rangle\cdot\tfrac13\langle2,-1,2\rangle=-\frac23`,
          },
        ],
        answer: String.raw`D_{\mathbf u}f(1,2,-1)=-\frac23`, 
      },
      {
        title: "Direction from one point to another",
        prompt: "Find the rate of change at P toward Q.",
        display: String.raw`f(x,y)=x^2-xy+2y^2,\quad P=(1,1),\quad Q=(4,5)`,
        steps: [
          {
            label: "Build the direction vector",
            explanation: "Toward Q means Q−P.",
            math: String.raw`\mathbf v=\langle4-1,5-1\rangle=\langle3,4\rangle`,
          },
          {
            label: "Normalize",
            explanation: "The 3-4-5 triangle gives the magnitude immediately.",
            math: String.raw`\mathbf u=\left\langle\frac35,\frac45\right\rangle`,
          },
          {
            label: "Evaluate the gradient",
            explanation: "∇f=⟨2x−y,−x+4y⟩.",
            math: String.raw`\nabla f(1,1)=\langle1,3\rangle`,
          },
          {
            label: "Project",
            explanation: "Take the dot product with the unit direction.",
            math: String.raw`D_{\mathbf u}f=\langle1,3\rangle\cdot\left\langle\frac35,\frac45\right\rangle=3`,
          },
        ],
        answer: String.raw`D_{\mathbf u}f(1,1)=3`, 
      },
    ],
    practice: [
      {
        id: "d-1",
        prompt: "Find the directional derivative at (2,−1) in the direction ⟨−3,4⟩.",
        display: String.raw`f(x,y)=x^2y+y^3`,
        hint: "Normalize ⟨−3,4⟩ to a unit vector first.",
        solution: "∇f=⟨2xy,x²+3y²⟩, so ∇f(2,−1)=⟨−4,7⟩. The unit direction is ⟨−3/5,4/5⟩. Their dot product is 12/5+28/5=8.",
        answer: String.raw`D_{\mathbf u}f(2,-1)=8`,
      },
      {
        id: "d-2",
        prompt: "Find a unit direction in which the directional derivative is zero at (1,2).",
        display: String.raw`f(x,y)=x^2+xy`,
        hint: "Choose a vector perpendicular to the gradient.",
        solution: "∇f=⟨2x+y,x⟩, so ∇f(1,2)=⟨4,1⟩. A perpendicular vector is ⟨1,−4⟩; normalize it.",
        answer: String.raw`\mathbf u=\frac1{\sqrt{17}}\langle1,-4\rangle\text{ or its opposite}`, 
      },
      {
        id: "d-3",
        prompt: "Interpret a directional derivative value of −5.",
        hint: "Discuss sign, rate, and the requirement that the direction be unit length.",
        solution: "Moving from the point in the specified unit direction, the function decreases instantaneously by approximately 5 output units per input-distance unit.",
        answer: "The function decreases at an instantaneous rate of 5 units per unit of distance in that direction.",
      },
    ],
    desmos: {
      title: "Direction versus steepest direction",
      description: "Compare a chosen unit direction with the gradient and inspect how their dot product changes.",
      url: "https://www.desmos.com/calculator?embed",
      entries: ["f(x,y)=x^2-xy+2y^2", "P=(1,1)", "gradient at P: (1,3)", "u=(cos(t),sin(t))"],
    },
    connections: ["multivariable-chain-rule", "gradient", "extrema-second-derivative-test"],
  },
  {
    slug: "extrema-second-derivative-test",
    chapter: "Unit 14",
    section: "14.7",
    unit: "Optimization",
    number: 19,
    title: "Extrema & the Second Derivative Test",
    eyebrow: "Classify local behavior",
    summary:
      "Find critical points, organize second partial derivatives in the Hessian, classify local maxima, minima, and saddle points, and check boundaries for absolute extrema.",
    keywords: ["Section 14.7", "extrema", "critical point", "local maximum", "local minimum", "saddle point", "Hessian", "discriminant", "Second Derivative Test", "absolute extrema"],
    objectives: [
      "Find critical points from the first partial derivatives or their failure to exist.",
      "Build the Hessian and compute the discriminant D.",
      "Classify local maxima, local minima, and saddle points with the Second Derivative Test.",
      "Recognize inconclusive cases and compare interior and boundary candidates for absolute extrema.",
    ],
    signatureFormula: String.raw`D(a,b)=f_{xx}(a,b)f_{yy}(a,b)-[f_{xy}(a,b)]^2`,
    keyIdeas: [
      {
        title: "Critical points are candidates",
        explanation:
          "For a differentiable function, an interior local extremum must have a horizontal tangent plane. Also inspect interior points where a first partial derivative does not exist.",
        formula: String.raw`f_x(a,b)=0,\quad f_y(a,b)=0\qquad\text{or a first partial is undefined}`,
        note: "A critical point need not be a maximum or minimum; it may be a saddle point or remain unclassified.",
      },
      {
        title: "The Hessian and discriminant",
        explanation:
          "The Hessian records second-order bending. When the mixed partials are continuous, its determinant is the discriminant used by the two-variable Second Derivative Test.",
        formula: String.raw`H_f=\begin{pmatrix}f_{xx}&f_{xy}\\f_{yx}&f_{yy}\end{pmatrix},\qquad D=\det H_f=f_{xx}f_{yy}-f_{xy}^2`,
      },
      {
        title: "Classification table",
        explanation:
          "A positive discriminant means the surface bends the same way in every nearby direction; fxx determines up or down. A negative discriminant means opposite bending directions.",
        formula: String.raw`\begin{aligned}D>0,\ f_{xx}>0&:\ \text{local minimum}\\D>0,\ f_{xx}<0&:\ \text{local maximum}\\D<0&:\ \text{saddle point}\\D=0&:\ \text{inconclusive}\end{aligned}`,
      },
      {
        title: "Absolute extrema on closed regions",
        explanation:
          "On a closed, bounded region, compare function values at all interior critical points, all boundary critical points, and any corners or endpoints. The largest and smallest values are the absolute extrema.",
        formula: String.raw`\text{absolute candidates}=\text{interior}+\text{boundary}+\text{corners/endpoints}`,
        note: "The Second Derivative Test is local; it does not replace the boundary comparison required for absolute extrema.",
      },
    ],
    workedExamples: [
      {
        title: "One critical point: local minimum",
        prompt: "Find and classify every critical point.",
        display: String.raw`f(x,y)=x^2+y^2-4x+6y+7`,
        steps: [
          {
            label: "Solve the first-derivative system",
            explanation: "Set both first partial derivatives equal to zero.",
            math: String.raw`f_x=2x-4=0,\qquad f_y=2y+6=0\Longrightarrow(2,-3)`,
          },
          {
            label: "Compute second partials",
            explanation: "This quadratic has a constant Hessian.",
            math: String.raw`f_{xx}=2,\quad f_{yy}=2,\quad f_{xy}=0`,
          },
          {
            label: "Apply the test",
            explanation: "The discriminant is positive and fxx is positive.",
            math: String.raw`D=(2)(2)-0^2=4>0,\qquad f_{xx}=2>0`,
          },
          {
            label: "Report the point and value",
            explanation: "The surface has a local minimum at (2,−3).",
            math: String.raw`f(2,-3)=-6`,
          },
        ],
        answer: String.raw`(2,-3)\text{ is a local minimum, with }f(2,-3)=-6`,
      },
      {
        title: "Multiple critical points",
        prompt: "Find and classify every critical point.",
        display: String.raw`f(x,y)=x^3-3x+y^2`,
        steps: [
          {
            label: "Find critical points",
            explanation: "Solve the two first-partial equations simultaneously.",
            math: String.raw`f_x=3x^2-3=0\Longrightarrow x=\pm1,\qquad f_y=2y=0\Longrightarrow y=0`,
          },
          {
            label: "Compute the discriminant",
            explanation: "Here fxx=6x, fyy=2, and fxy=0.",
            math: String.raw`D(x,y)=(6x)(2)-0=12x`,
          },
          {
            label: "Classify (1,0)",
            explanation: "D is positive and fxx is positive.",
            math: String.raw`D(1,0)=12>0,\quad f_{xx}(1,0)=6>0\Longrightarrow\text{local minimum}`,
          },
          {
            label: "Classify (−1,0)",
            explanation: "A negative discriminant signals a saddle point.",
            math: String.raw`D(-1,0)=-12<0\Longrightarrow\text{saddle point}`,
          },
        ],
        answer: String.raw`(1,0)\text{ is a local minimum; }(-1,0)\text{ is a saddle point}`,
      },
      {
        title: "Three critical points from a coupled system",
        prompt: "Find and classify every critical point.",
        display: String.raw`f(x,y)=x^4+y^4-4xy`,
        steps: [
          {
            label: "Solve for critical points",
            explanation: "The equations x³=y and y³=x produce three real solutions.",
            math: String.raw`f_x=4x^3-4y=0,\quad f_y=4y^3-4x=0\Longrightarrow(0,0),(1,1),(-1,-1)`,
          },
          {
            label: "Build D",
            explanation: "Use fxx=12x², fyy=12y², and fxy=−4.",
            math: String.raw`D=144x^2y^2-16`,
          },
          {
            label: "Classify the origin",
            explanation: "The discriminant is negative.",
            math: String.raw`D(0,0)=-16<0\Longrightarrow(0,0)\text{ is a saddle point}`,
          },
          {
            label: "Classify the remaining points",
            explanation: "At each, D=128 and fxx=12.",
            math: String.raw`D(\pm1,\pm1)=128>0,\quad f_{xx}=12>0\Longrightarrow\text{local minima}`,
          },
        ],
        answer: String.raw`(0,0)\text{ is a saddle point; }(1,1)\text{ and }(-1,-1)\text{ are local minima}`,
      },
      {
        title: "Absolute extrema on a disk",
        prompt: "Find the absolute extrema on x²+y²≤1.",
        display: String.raw`f(x,y)=x^2+2y^2`,
        steps: [
          {
            label: "Check the interior",
            explanation: "The only interior critical point is the origin.",
            math: String.raw`f_x=2x=0,\quad f_y=4y=0\Longrightarrow(0,0),\qquad f(0,0)=0`,
          },
          {
            label: "Restrict to the boundary",
            explanation: "On x²+y²=1, replace x² by 1−y².",
            math: String.raw`f=(1-y^2)+2y^2=1+y^2`,
          },
          {
            label: "Find boundary extremes",
            explanation: "Since 0≤y²≤1, the boundary values range from 1 to 2.",
            math: String.raw`f=1\text{ at }(\pm1,0),\qquad f=2\text{ at }(0,\pm1)`,
          },
          {
            label: "Compare all candidates",
            explanation: "The interior value 0 is below every boundary value.",
            math: String.raw`f_{\min}=0,\qquad f_{\max}=2`,
          },
        ],
        answer: String.raw`\text{Absolute minimum }0\text{ at }(0,0);\quad\text{absolute maximum }2\text{ at }(0,\pm1)`,
      },
    ],
    practice: [
      {
        id: "ex-1",
        prompt: "Classify a critical point whose Hessian is shown.",
        display: String.raw`H_f(a,b)=\begin{pmatrix}4&1\\1&3\end{pmatrix}`,
        hint: "Compute the determinant, then inspect fxx.",
        solution: "The discriminant is 4·3−1²=11>0, and fxx=4>0.",
        answer: String.raw`(a,b)\text{ is a local minimum}`,
      },
      {
        id: "ex-2",
        prompt: "Find and classify every critical point.",
        display: String.raw`f(x,y)=-x^2-2y^2+6x+8y`,
        hint: "Solve fx=0 and fy=0, then use the constant second partials.",
        solution: "The first partials give x=3 and y=2. Here D=(−2)(−4)=8>0 and fxx=−2<0.",
        answer: String.raw`(3,2)\text{ is a local maximum, with }f(3,2)=17`,
      },
      {
        id: "ex-3",
        prompt: "State the conclusion of the Second Derivative Test at the origin.",
        display: String.raw`f(x,y)=x^4+y^4`,
        hint: "Evaluate the Hessian and D at (0,0). Do not force a classification from an inconclusive test.",
        solution: "At the origin, fxx=fyy=fxy=0, so the Hessian is the zero matrix and D=0.",
        answer: String.raw`D(0,0)=0;\ \text{the Second Derivative Test is inconclusive}`,
      },
      {
        id: "ex-4",
        prompt: "Find the absolute maximum and minimum on the rectangle 0≤x≤2, 0≤y≤3.",
        display: String.raw`f(x,y)=x^2+y^2-2x-4y`,
        hint: "Check the interior critical point and then each of the four boundary segments, including corners.",
        solution: "The interior critical point is (1,2), where f=−5. Checking the boundary quadratics and corners gives the largest value 0 at (0,0) and (2,0).",
        answer: String.raw`\text{Absolute minimum }-5\text{ at }(1,2);\quad\text{absolute maximum }0\text{ at }(0,0),(2,0)`,
      },
    ],
    desmos: {
      title: "See minima, maxima, and saddles",
      description: "Graph representative quadratic surfaces and compare how the sign pattern in the Hessian appears geometrically.",
      url: "https://www.desmos.com/3d?embed",
      entries: ["z=x^2+y^2", "z=-x^2-y^2+6", "z=x^2-y^2"],
    },
    connections: ["partial-derivatives", "tangent-planes-linearization", "gradient", "directional-derivatives"],
  },
];

export const moduleBySlug = (slug: string): Module | undefined =>
  modules.find((module) => module.slug === slug);

export const searchRecords = modules.flatMap((module) => [
  {
    id: module.slug,
    type: "module" as const,
    title: module.title,
    description: module.summary,
    href: `/learn/${module.slug}`,
    keywords: [module.chapter, module.section, module.unit, module.eyebrow, ...module.keywords].join(" "),
  },
  ...module.keyIdeas.map((idea, index) => ({
    id: `${module.slug}-concept-${index}`,
    type: "concept" as const,
    title: idea.title,
    description: `${module.title} · ${idea.explanation}`,
    href: `/learn/${module.slug}#concepts`,
    keywords: [module.chapter, module.section, module.title, ...module.keywords].join(" "),
  })),
  ...module.workedExamples.map((example, index) => ({
    id: `${module.slug}-example-${index}`,
    type: "example" as const,
    title: example.title,
    description: `${module.title} · ${example.prompt}`,
    href: `/learn/${module.slug}#examples`,
    keywords: [module.chapter, module.section, module.title, example.prompt, ...module.keywords].join(" "),
  })),
]);

export const getAdjacentModules = (slug: string) => {
  const index = modules.findIndex((module) => module.slug === slug);
  return {
    previous: index > 0 ? modules[index - 1] : undefined,
    next: index >= 0 && index < modules.length - 1 ? modules[index + 1] : undefined,
  };
};
