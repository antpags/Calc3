import type { Metadata, Viewport } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { ProgressProvider } from "@/components/progress-provider";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "Multivariable Calculus",
    template: "%s · Multivariable Calculus",
  },
  description:
    "Interactive lessons, worked examples, and practice for multivariable calculus.",
  applicationName: "Multivariable Calculus",
  keywords: ["multivariable calculus", "vector calculus", "tangent plane", "normal line", "linearization", "extrema", "gradient", "directional derivative", "Frenet frame"],
  openGraph: {
    title: "Multivariable Calculus",
    description: "Interactive lessons, worked examples, and practice for multivariable calculus.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ProgressProvider>
          <SiteShell>{children}</SiteShell>
        </ProgressProvider>
      </body>
    </html>
  );
}
