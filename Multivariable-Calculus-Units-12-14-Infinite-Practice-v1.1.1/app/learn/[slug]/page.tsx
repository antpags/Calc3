import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  Lightbulb,
  ListChecks,
  Network,
} from "lucide-react";
import { DesmosEmbed } from "@/components/desmos-embed";
import { Math } from "@/components/math";
import { ModuleCompletion } from "@/components/module-completion";
import { PracticeSet } from "@/components/practice-set";
import { WorkedExample } from "@/components/worked-example";
import { getAdjacentModules, moduleBySlug, modules } from "@/lib/content";
import type { Module } from "@/lib/content-types";

export const dynamicParams = false;

export function generateStaticParams() {
  return modules.map((module) => ({ slug: module.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const module = moduleBySlug(slug);
  if (!module) return {};
  return {
    title: module.title,
    description: module.summary,
  };
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const currentModule: Module = moduleBySlug(slug) ?? notFound();
  const adjacent = getAdjacentModules(currentModule.slug);
  const connected = currentModule.connections.map((connection) => moduleBySlug(connection)).filter(Boolean);

  return (
    <main>
      <section className="grid-field relative overflow-hidden border-b border-white/10 px-5 py-14 sm:px-8 sm:py-20 xl:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-2 text-[.68rem] text-stone-600">
            <Link href="/" className="hover:text-gold-300">Course map</Link>
            <span>/</span>
            <span>{currentModule.chapter}</span>
            <span>/</span>
            <span>Section {currentModule.section}</span>
            <span>/</span>
            <span className="text-stone-400">Module {String(currentModule.number).padStart(2, "0")}</span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <p className="eyebrow">{currentModule.eyebrow}</p>
              <h1 className="serif mt-4 text-balance text-5xl font-semibold leading-[.98] tracking-[-.035em] sm:text-7xl">{currentModule.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-stone-400 sm:text-lg">{currentModule.summary}</p>
            </div>
            <div className="panel rounded-2xl p-5">
              <p className="eyebrow">Key formula</p>
              <div className="mt-4"><Math block>{currentModule.signatureFormula}</Math></div>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-16 z-20 overflow-x-auto border-b border-white/10 bg-ink/90 px-5 backdrop-blur-xl sm:px-8 xl:px-12" aria-label="On this page">
        <div className="mx-auto flex h-12 max-w-6xl min-w-max items-center gap-6 text-[.68rem] font-semibold uppercase tracking-[.12em] text-stone-500">
          <a href="#overview" className="hover:text-gold-300">Overview</a>
          <a href="#concepts" className="hover:text-gold-300">Core ideas</a>
          <a href="#examples" className="hover:text-gold-300">Worked examples</a>
          <a href="#practice" className="hover:text-gold-300">Practice</a>
          {currentModule.desmos && <a href="#explore" className="hover:text-gold-300">Explore</a>}
        </div>
      </nav>

      <div className="px-5 py-14 sm:px-8 sm:py-20 xl:px-12">
        <div className="mx-auto max-w-6xl">
          <section id="overview" className="scroll-mt-32 grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <SectionLabel icon={<BookOpen className="h-4 w-4" />} text="Learning objectives" />
              <h2 className="serif mt-4 text-3xl font-semibold sm:text-4xl">What you will be able to do.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {currentModule.objectives.map((objective, index) => (
                <div key={objective} className="flex gap-3 rounded-xl border border-white/10 bg-white/[.02] p-4">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold-400/30 font-mono text-[.6rem] text-gold-300">{index + 1}</span>
                  <p className="text-sm leading-6 text-stone-400">{objective}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="my-16 gold-rule" />

          <section id="concepts" className="scroll-mt-32">
            <SectionLabel icon={<Lightbulb className="h-4 w-4" />} text="Core ideas" />
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="serif max-w-3xl text-3xl font-semibold sm:text-4xl">Review the main ideas.</h2>
              <p className="max-w-md text-sm leading-6 text-stone-500">Each explanation includes the notation and formula needed for the topic.</p>
            </div>
            <div className="mt-9 grid gap-4 lg:grid-cols-3">
              {currentModule.keyIdeas.map((idea, index) => (
                <article key={idea.title} className="panel rounded-2xl p-6">
                  <span className="font-mono text-xs text-gold-300">0{index + 1}</span>
                  <h3 className="serif mt-7 text-2xl font-semibold">{idea.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-500">{idea.explanation}</p>
                  <div className="mt-6 border-t border-white/10 pt-5"><Math block>{idea.formula}</Math></div>
                  {idea.note && <p className="mt-3 text-xs leading-5 text-stone-600">{idea.note}</p>}
                </article>
              ))}
            </div>
          </section>

          <div className="my-16 gold-rule" />

          <section id="examples" className="scroll-mt-32">
            <SectionLabel icon={<FlaskConical className="h-4 w-4" />} text="Worked examples" />
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="serif max-w-3xl text-3xl font-semibold sm:text-4xl">Work through examples.</h2>
              <p className="max-w-md text-sm leading-6 text-stone-500">Open one step at a time, or display the full solution when reviewing.</p>
            </div>
            <div className="mt-9 space-y-4">
              {currentModule.workedExamples.map((example, index) => <WorkedExample key={example.title} example={example} index={index} />)}
            </div>
          </section>

          <div className="my-16 gold-rule" />

          <section id="practice" className="scroll-mt-32 grid gap-9 lg:grid-cols-[.68fr_1.32fr]">
            <div>
              <SectionLabel icon={<ListChecks className="h-4 w-4" />} text="Practice set" />
              <h2 className="serif mt-4 text-3xl font-semibold sm:text-4xl">Practice the topic.</h2>
              <p className="mt-4 text-sm leading-7 text-stone-500">Every card is an infinite parameterized generator. Create a new version, try it independently, then reveal the hint or code-computed steps.</p>
            </div>
            <PracticeSet problems={currentModule.practice} />
          </section>

          {currentModule.desmos && (
            <>
              <div className="my-16 gold-rule" />
              <section id="explore" className="scroll-mt-32">
                <SectionLabel icon={<Network className="h-4 w-4" />} text="Interactive exploration" />
                <h2 className="serif mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">Explore the topic with Desmos.</h2>
                <div className="mt-8"><DesmosEmbed config={currentModule.desmos} /></div>
              </section>
            </>
          )}

          <div className="mt-16">
            <ModuleCompletion slug={currentModule.slug} problemIds={currentModule.practice.map((problem) => problem.id)} />
          </div>

          {connected.length > 0 && (
            <section className="mt-16 border-t border-white/10 pt-12">
              <p className="eyebrow">Conceptual connections</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {connected.map((item) => item && (
                  <Link key={item.slug} href={`/learn/${item.slug}`} className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-stone-400 transition hover:border-gold-400/35 hover:text-gold-300">{item.title}</Link>
                ))}
              </div>
            </section>
          )}

          <nav className="mt-14 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2" aria-label="Adjacent modules">
            {adjacent.previous ? (
              <Link href={`/learn/${adjacent.previous.slug}`} className="panel panel-hover flex items-center gap-4 rounded-2xl p-5">
                <ArrowLeft className="h-4 w-4 text-gold-300" />
                <span><span className="block text-[.62rem] uppercase tracking-wider text-stone-600">Previous module</span><span className="serif mt-1 block text-lg font-semibold">{adjacent.previous.title}</span></span>
              </Link>
            ) : <div />}
            {adjacent.next && (
              <Link href={`/learn/${adjacent.next.slug}`} className="panel panel-hover flex items-center justify-end gap-4 rounded-2xl p-5 text-right">
                <span><span className="block text-[.62rem] uppercase tracking-wider text-stone-600">Next module</span><span className="serif mt-1 block text-lg font-semibold">{adjacent.next.title}</span></span>
                <ArrowRight className="h-4 w-4 text-gold-300" />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </main>
  );
}

function SectionLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-[.68rem] font-bold uppercase tracking-[.16em] text-gold-300">
      <span className="grid h-8 w-8 place-items-center rounded-full border border-gold-400/25 bg-gold-400/[.07]">{icon}</span>
      {text}
    </div>
  );
}
