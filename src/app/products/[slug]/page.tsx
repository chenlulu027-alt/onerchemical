import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMeta, SITE } from '@/lib/seo';
import { getProduct, PRODUCTS } from '@/lib/products';
import { JsonLd } from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema } from '@/lib/schema';
import { LocalizedLink } from '@/components/LocalizedLink';
import { ProductQuoteCTA } from './ProductQuoteCTA';

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = getProduct(params.slug);
  if (!p) return buildMeta({ title: 'Not found', description: '', path: '/404', noindex: true });
  return buildMeta({
    title: p.name,
    description: p.shortDescription,
    path: `/products/${p.slug}`,
  });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: product.name,
            slug: product.slug,
            description: product.shortDescription,
            serviceType: product.serviceType,
            category: product.category,
          }),
          breadcrumbSchema([
            { name: 'Home', url: `${SITE.url}/` },
            { name: 'Preservatives', url: `${SITE.url}/products/${product.slug}` },
            { name: product.name, url: `${SITE.url}/products/${product.slug}` },
          ]),
        ]}
      />

      <article className="mx-auto max-w-4xl px-6 py-16">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-ink-500">
          <LocalizedLink href="/" className="hover:text-brand-800">Home</LocalizedLink>
          <span className="mx-2">/</span>
          <span className="text-ink-700">Preservatives</span>
        </nav>

        <header className="mb-10 border-b border-ink-100 pb-10">
          <div className="mb-3 text-[11px] uppercase tracking-[1.5px] text-brand-800">
            {product.serviceType}
          </div>
          <h1 className="mb-4 font-serif text-4xl font-normal text-ink-900 md:text-[42px]">
            {product.name}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-500">
            {product.shortDescription}
          </p>
        </header>

        <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
          <div className="prose-blog">
            <h2>What we supply</h2>
            <p>
              USP/EP-grade material produced to cosmetic standards, with per-batch documentation
              suitable for CPSR, FDA, and NMPA submissions. Minimum order: 25 kg (sample) to
              container quantities.
            </p>

            <h2>Documentation included per batch</h2>
            <ul>
              <li>Certificate of Analysis (CoA) with assay by GC/HPLC</li>
              <li>Material Safety Data Sheet (MSDS / SDS)</li>
              <li>Residual solvent profile (ICH Q3C)</li>
              <li>Allergen declaration</li>
              <li>Country-of-origin and REACH statement</li>
            </ul>

            <h2>Lead time and logistics</h2>
            <p>
              Stock samples ship within 3 business days from our Wuhan warehouse. Commercial orders
              lead 2–3 weeks for standard spec, longer for custom specifications. We ship DAP via
              sea, air, or express as the quantity and destination warrant.
            </p>
          </div>

          <aside className="h-fit rounded-lg border border-ink-100 bg-paper p-6">
            <h3 className="mb-2 font-serif text-lg text-ink-900">Request a sample</h3>
            <p className="mb-5 text-sm leading-relaxed text-ink-700">
              Business-grade samples with full documentation. We reply within one business day.
            </p>
            <ProductQuoteCTA slug={product.slug} />
          </aside>
        </div>
      </article>
    </>
  );
}
