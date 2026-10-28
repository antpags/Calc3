import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-[80vh] place-items-center px-6 text-center">
      <div>
        <Compass className="mx-auto mb-6 h-10 w-10 text-gold-400" aria-hidden="true" />
        <p className="eyebrow">Lost coordinate</p>
        <h1 className="serif mt-3 text-5xl font-semibold">This point is outside the domain.</h1>
        <p className="mx-auto mt-5 max-w-xl text-stone-400">The lesson you requested does not exist or has moved.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-5 py-3 text-sm font-semibold text-gold-300 hover:bg-gold-400/10">
          <ArrowLeft className="h-4 w-4" /> Return to the course map
        </Link>
      </div>
    </main>
  );
}
