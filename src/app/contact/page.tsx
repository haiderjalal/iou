import { Clock, FileText, Mail, MapPin } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { PageTransition } from "@/components/shared/PageTransition";
import { SITE } from "@/content/site";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import heroImage from "@public/images/stock/youth-workshop.jpg";

const TITLE = "Contact us — partner, volunteer or collaborate";
const DESCRIPTION =
  "Get in touch with the Institute of Urbanism in Islamabad to partner on research, join campaigns, volunteer or make a media enquiry.";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: "/contact" });

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Contact"
        title="Let's build greener cities together."
        description="Whether you represent a government body, a business, a university or yourself — we'd love to hear from you."
        image={heroImage}
        imageAlt="Participants gathered around a table during a hands-on community workshop"
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section aria-label="Contact details and form" className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="space-y-5 lg:col-span-4">
            <h2 className="reveal text-3xl font-semibold text-forest-900">Reach us directly</h2>
            <ul className="stagger space-y-4">
              <li className="reveal flex gap-4 rounded-3xl bg-white p-6 ring-1 ring-forest-900/5">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-leaf-100 text-leaf-700">
                  <Mail className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-bold text-forest-900">Email</span>
                  <a href={`mailto:${SITE.email}`} className="text-leaf-700 underline-offset-4 hover:underline">
                    {SITE.email}
                  </a>
                </span>
              </li>
              <li className="reveal flex gap-4 rounded-3xl bg-white p-6 ring-1 ring-forest-900/5">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-leaf-100 text-leaf-700">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-bold text-forest-900">Based in</span>
                  <span className="text-muted">{SITE.location}</span>
                </span>
              </li>
              <li className="reveal flex gap-4 rounded-3xl bg-white p-6 ring-1 ring-forest-900/5">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-leaf-100 text-leaf-700">
                  <Clock className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-bold text-forest-900">Response</span>
                  <span className="text-muted">Every message is read by our team.</span>
                </span>
              </li>
              <li className="reveal flex gap-4 rounded-3xl bg-white p-6 ring-1 ring-forest-900/5">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-leaf-100 text-leaf-700">
                  <FileText className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-bold text-forest-900">Transparency</span>
                  <a
                    href={SITE.transparencyDocument}
                    target="_blank"
                    rel="noopener"
                    className="text-leaf-700 underline-offset-4 hover:underline"
                  >
                    Read our transparency document
                    <span className="sr-only"> (PDF, opens in a new tab)</span>
                  </a>
                </span>
              </li>
            </ul>
          </aside>

          <div className="reveal rounded-[2rem] bg-paper p-6 ring-1 ring-forest-900/10 sm:p-10 lg:col-span-8 lg:bg-white lg:shadow-xl lg:shadow-forest-900/5">
            <h2 className="text-3xl font-semibold text-forest-900">Send us a message</h2>
            <p className="mt-2 mb-8 text-muted">All fields are required unless marked optional.</p>
            <ContactForm />
          </div>
        </Container>
      </section>

      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/contact" })} />
    </PageTransition>
  );
}
