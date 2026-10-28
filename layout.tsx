import type { Metadata, Viewport } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { ProgressProvider } from "@/components/progress-provider";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "The Golden Gradient · Multivariable Calculus",
    template: "%s · The Golden Gradient",
  },
  description:
    "An interactive, worked-example-first learning studio for vector calculus, multivariable differentiation, local linearization, and extrema.",
  applicationName: "The Golden Gradient",
  keywords: ["multivariable calculus", "vector calculus", "tangent plane", "normal line", "linearization", "extrema", "gradient", "directional derivative", "Frenet frame"],
  openGraph: {
    title: "The Golden Gradient",
    description: "Interactive multivariable calculus, carefully worked from first principle to final answer.",
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
