import type { ReactNode } from 'react';
import { LocalizedLink } from '@/components/LocalizedLink';
import { CLUSTERS, type ClusterKey } from '@/lib/blog-registry';
import { AUTHOR } from '@/lib/seo';
import type { TOCEntry } from '@/lib/toc';
import { TOCDesktop, TOCMobile } from '@/components/blog/TOC';
import { ScrollProgressBar, BackToTop } from '@/components/ui/animations';

type Props = {
  cluster: ClusterKey;
  title: string;
  excerpt: string;
  datePublished: string;
  readingMinutes: number;
  toc?: TOCEntry[];
  children: ReactNode;
};

export function BlogArticleLayout({
  cluster,
  title,
  excerpt,
  datePublished,
  readingMinutes,
  toc,
  children,
}: Props) {
  const clusterMeta = CLUSTERS[cluster];
  const hasTOC = !!toc && toc.length > 0;

  return (
    <>
      <ScrollProgressBar />

      <article className="mx-auto max-w-6xl px-6 py-12">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-ink-500">
          <LocalizedLink href="/" className="hover:text-brand-800">Home</LocalizedLink>
          <span className="mx-2">/</span>
          <LocalizedLink href="/blog" className="hover:text-brand-800">Research</LocalizedLink>
          <span className="mx-2">/</span>
          <span className="text-ink-700">{clusterMeta.label}</span>
        </nav>

        <header className="mb-10 border-b border-ink-100 pb-10">
          <div className="mb-3 text-[11px] uppercase tracking-[1.5px] text-brand-800">
            {clusterMeta.label}
          </div>
          <h1 className="mb-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink-900 md:text-[42px]">
            {title}
          </h1>
          <p className="mb-6 max-w-3xl text-lg leading-relaxed text-ink-500">{excerpt}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-500">
            <span>
              By{' '}
              <a href={AUTHOR.profileUrl} target="_blank" rel="noopener author" className="text-brand-800 hover:underline">
                {AUTHOR.name}
              </a>
            </span>
            <span>
              Published{' '}
              <time dateTime={datePublished}>
                {new Date(datePublished).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </span>
            <span>{readingMinutes} min read</span>
          </div>
        </header>

        {hasTOC ? (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="min-w-0">
              <TOCMobile entries={toc!} />
              <div className="prose-blog">{children}</div>
            </div>
            <TOCDesktop entries={toc!} />
          </div>
        ) : (
          <div className="mx-auto max-w-3xl prose-blog">{children}</div>
        )}
      </article>

      <BackToTop />
    </>
  );
}
