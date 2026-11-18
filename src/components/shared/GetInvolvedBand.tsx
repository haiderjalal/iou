import { ArrowRight, Handshake, Megaphone, Sprout } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { cssVars } from "@/lib/motion";
import volunteersImage from "@public/images/stock/volunteers-portrait.jpg";

import { Container } from "./Container";

const WAYS_TO_HELP = [
  {
    icon: Handshake,
    title: "Partner with us",
    description: "Government, private sector, academia and civil society — co-create nature-centric urban solutions.",
  },
  {
    icon: Sprout,
    title: "Volunteer & join campaigns",
    description: "Lend your time and skills to awareness drives, research and community action in your city.",
  },
  {
    icon: Megaphone,
    title: "Amplify the conversation",
    description: "Journalists, researchers and young leaders — help make green, inclusive cities a policy priority.",
  },
];

/** Shared "Get involved" call-to-action used at the end of most pages. */
export function GetInvolvedBand() {
  return (
    <section aria-labelledby="get-involved-heading" className="py-20 lg:py-28">
      <Container>
        <div className="bg-topo relative grid overflow-hidden rounded-[2rem] bg-forest-900 text-white lg:grid-cols-5">
          <div className="reveal-wipe relative min-h-72 lg:col-span-2">
            <Image
              src={volunteersImage}
              alt="Two volunteers with shovels smiling after planting a young tree"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-forest-900/70 to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-forest-900/60"
            />
          </div>

          <div className="p-8 sm:p-12 lg:col-span-3 lg:p-16">
            <p className="reveal text-xs font-bold tracking-[0.22em] text-leaf-300 uppercase">Get involved</p>
            <h2 id="get-involved-heading" className="reveal mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
              Greener cities are built together.
            </h2>
            <p className="reveal mt-4 max-w-xl text-lg text-white/75">
              IoU grew out of citizens standing up for their city. There is a place for you in that movement.
            </p>

            <ul className="stagger mt-10 grid gap-6 sm:grid-cols-3">
              {WAYS_TO_HELP.map(({ icon: Icon, title, description }, index) => (
                <li key={title} className="reveal">
                  <span
                    className="anim-bob grid size-11 place-items-center rounded-xl bg-leaf-500/15 text-leaf-300 ring-1 ring-leaf-400/30"
                    style={cssVars({ "--delay": `${index * -1.3}s` })}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-sans text-base font-bold tracking-normal">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{description}</p>
                </li>
              ))}
            </ul>

            <ButtonLink href="/contact" variant="secondary" className="reveal mt-10">
              Start a conversation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
