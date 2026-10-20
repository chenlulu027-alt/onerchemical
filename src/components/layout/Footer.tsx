import { LocalizedLink } from '@/components/LocalizedLink';
import { ORG, SITE } from '@/lib/seo';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-ink-100 bg-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-brand-800 font-serif text-xs text-white">
              O
            </span>
            <span className="text-sm font-medium text-ink-900">{SITE.name}</span>
          </div>
          <p className="text-xs leading-relaxed text-ink-500">
            Published by {ORG.legalName}. Technical content for cosmetic formulators and contract
            manufacturers.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-xs uppercase tracking-wider text-ink-500">Research</h3>
          <ul className="space-y-2 text-sm">
            <li><LocalizedLink href="/blog" className="text-ink-700 hover:text-brand-800">All articles</LocalizedLink></li>
            <li><LocalizedLink href="/yang-ruosong" className="text-ink-700 hover:text-brand-800">Author</LocalizedLink></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs uppercase tracking-wider text-ink-500">Supply</h3>
          <ul className="space-y-2 text-sm">
            <li><LocalizedLink href="/products/phenoxyethanol-supply" className="text-ink-700 hover:text-brand-800">Preservatives</LocalizedLink></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs uppercase tracking-wider text-ink-500">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><LocalizedLink href="/about" className="text-ink-700 hover:text-brand-800">About</LocalizedLink></li>
            </ul>
        </div>
      </div>

      <div className="border-t border-ink-100">
        <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-ink-500">
          © {year} {ORG.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
