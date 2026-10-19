import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SunMark } from "@/components/site/blocks";

export const metadata = { title: "Page not found", robots: { index: false } };

const POPULAR: [string, string][] = [
  ["Solar prices", "/pricing"],
  ["Savings calculator", "/calculator"],
  ["Towns we cover", "/solar-installation"],
  ["Solar guides", "/blog"],
  ["Get a quote", "/contact"],
];

export default function NotFound() {
  return (
    <>
      <Navbar solid />
      <main className="nf">
        <div style={{ maxWidth: 560 }}>
          <div style={{ width: 72, margin: "0 auto" }}><SunMark color="var(--lime)" /></div>
          <h1 className="display" style={{ fontSize: "clamp(40px, 9vw, 72px)", marginTop: 8 }}>Light don go.</h1>
          <p className="lead" style={{ marginTop: 14 }}>
            We couldn&apos;t find that page. It may have moved. These will get you where you need to be:
          </p>
          <div className="tag-row" style={{ justifyContent: "center", marginTop: 24 }}>
            {POPULAR.map(([l, h]) => <Link key={h} href={h} className="fchip">{l}</Link>)}
          </div>
          <div style={{ marginTop: 28 }}>
            <Link href="/" className="btn btn--ink btn--lg">Back to the homepage</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
