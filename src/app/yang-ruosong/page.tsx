import type { Metadata } from 'next';
import { buildMeta, AUTHOR, ORG } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { personSchema } from '@/lib/schema';
import { LocalizedLink } from '@/components/LocalizedLink';
import { publishedArticles } from '@/lib/blog-registry';

export const metadata: Metadata = buildMeta({
  title: `${AUTHOR.name} — ${AUTHOR.jobTitle}`,
  description: `${AUTHOR.name}, ${AUTHOR.jobTitle} at ${ORG.tradingName}. Technical articles on cosmetic preservation science.`,
  path: '/yang-ruosong',
});

export default function AuthorPage() {
  const articles = publishedArticles();

  return (
    <>
      <JsonLd data={personSchema()} />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 border-b border-ink-100 pb-10">
          <h1 className="mb-2 font-serif text-4xl font-normal text-ink-900">{AUTHOR.name}</h1>
          <p className="text-lg text-ink-500">{AUTHOR.jobTitle} · {ORG.tradingName}</p>
        </div>

        <div className="prose-blog">
          <p>
            Yang Ruosong leads technical content at {ORG.tradingName}, writing on cosmetic
            preservation chemistry, challenge-test methodology, and preservative regulation across
            EU 1223/2009, US FDA, China NMPA, and ASEAN markets.
          </p>

          <h2>Topics covered</h2>
          <ul>
            <li>Preservative selection by product form, pH, and distribution channel</li>
            <li>Challenge testing — ISO 11930, USP 51 methodology and failure diagnosis</li>
            <li>Regulatory compliance across major cosmetic markets</li>
            <li>Preservative-booster interactions and chelator-boosted systems</li>
          </ul>

          <h2>Primary profile</h2>
          <p>
            Full biographical profile is maintained on the main site:{' '}
            <a href={AUTHOR.profileUrl} target="_blank" rel="noopener author">
              onerchem.com/yang-ruosong
            </a>
            .
          </p>
        </div>

        {articles.length > 0 && (
          <section className="mt-12 border-t border-ink-100 pt-10">
            <h2 className="mb-6 font-serif text-2xl font-normal text-ink-900">Articles</h2>
            <ul className="space-y-4">
              {articles.map((a) => (
                <li key={a.slug}>
                  <LocalizedLink
                    href={`/blog/${a.slug}`}
                    className="group block border-b border-ink-100 pb-4"
                  >
                    <div className="font-serif text-lg text-ink-900 group-hover:text-brand-900">
                      {a.title}
                    </div>
                    <div className="mt-1 text-xs text-ink-500">
                      {new Date(a.datePublished).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      · {a.readingMinutes} min read
                    </div>
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
