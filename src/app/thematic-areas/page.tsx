import { Container } from "@/components/shared/Container";
import { GetInvolvedBand } from "@/components/shared/GetInvolvedBand";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { ThematicCard } from "@/features/thematic-areas/components/ThematicCard";
import { THEMATIC_AREAS } from "@/features/thematic-areas/data/thematicAreas";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import heroImage from "@public/images/stock/islamabad-hill-portrait.jpg";

const TITLE = "Thematic areas — our programmes";
const DESCRIPTION =
  "IoU works across four thematic areas: Redefining Urban Mobility, Sustainable Consumption Patterns, Solid Waste as Resource and Eco-Entrepreneurship.";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: "/thematic-areas" });

export default function ThematicAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Thematic areas"
        title="Where we focus our research and advocacy."
        description="Four interconnected programmes that address how Pakistan's cities move, consume, manage waste and create green livelihoods."
        image={heroImage}
        imageAlt="Islamabad at dusk seen from the Margalla Hills, with the Faisal Mosque in the distance"
        breadcrumbs={[{ name: "Thematic Areas", path: "/thematic-areas" }]}
      />

      <section aria-label="Programmes" className="py-20 lg:py-28">
        <Container className="grid gap-6 md:grid-cols-2">
          {THEMATIC_AREAS.map((area) => (
            <ThematicCard key={area.slug} area={area} headingLevel="h2" />
          ))}
        </Container>
      </section>

      <GetInvolvedBand />
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/thematic-areas" })} />
    </>
  );
}
