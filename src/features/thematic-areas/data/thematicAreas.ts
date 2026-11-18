import metroImage from "@public/images/iou/islamabad-metro.jpg";
import busyStreetImage from "@public/images/stock/busy-street.jpg";
import plasticWasteImage from "@public/images/stock/plastic-waste.jpg";
import youngInnovatorsImage from "@public/images/stock/young-innovators.jpg";

import type { ThematicArea } from "../types/thematicArea";

/**
 * The four IoU programmes. Copy is taken from the thematic area pages on iupk.org.
 * Images are statically imported so Next.js knows their dimensions and generates blur placeholders.
 */
export const THEMATIC_AREAS: ThematicArea[] = [
  {
    slug: "redefining-urban-mobility",
    code: "RUM",
    title: "Redefining Urban Mobility",
    summary: "Influence policies and legislation to ensure that urban mobility is inclusive and environment-centric.",
    image: metroImage,
    imageAlt: "Islamabad Metrobus station with red buses running along a dedicated corridor",
    keyFact: { value: "1/4", label: "of Pakistan's greenhouse gas emissions come from transport" },
    context: [
      "With an average growth rate of 3 percent, Pakistan is the fastest urbanizing country in South Asia. Yet, there is no formal urban development policy. This is leading to the unplanned expansion of cities, which in turn is increasing intra-city distances.",
      "The administration's response to rising transportation demand has so far been to expand road infrastructure. While this facilitates vehicular flow, it intensifies traffic congestion and parking issues in the long run, and discourages walking and cycling — limiting overall mobility in the city.",
      "The car-centric mobility landscape is no longer sustainable against the backdrop of the climate crisis: the transport sector accounts for one-quarter of the country's total greenhouse gas emissions, and 43% of the air pollutants responsible for smog in Punjab are contributed by motorized road vehicles.",
      "Green areas and open spaces are cleared for roads and parking. Concrete-dominated surfaces prevent aquifer recharge, increase the risk of urban flooding and intensify the urban heat island effect. These impacts underscore the need to shift towards integrated mass transit, pedestrian pathways and safe bicycle lanes.",
    ],
    objectives: [
      "Influence policies and legislation to ensure that urban mobility is inclusive and environment-centric.",
      "Through empirical research, advocacy and dialogue, introduce urban mobility as a policy priority and highlight planning needs — especially environmental conservation and social inclusion.",
      "Promote and explore transport options that reduce the carbon footprint of the transport sector and serve the masses, especially women, youth and persons with disabilities.",
      "Generate demand for inclusive and eco-friendly urban mobility through engagement of stakeholders, especially the private sector and key transport sector representatives.",
    ],
  },
  {
    slug: "sustainable-consumption-patterns",
    code: "SCP",
    title: "Sustainable Consumption Patterns",
    summary: "Transform community consumption patterns for the conservation of natural resources and their products.",
    image: busyStreetImage,
    imageAlt: "A busy commercial street in Pakistan lined with shops, cars and motorbikes",
    keyFact: { value: "4 of 9", label: "planetary boundaries already overstepped by humanity" },
    context: [
      "Sustainable consumption and production refers to “the use of services and related products, which respond to basic needs and bring a better quality of life while minimizing the use of natural resources and toxic materials as well as the emissions of waste and pollutants over the life cycle of the service or product so as not to jeopardize the needs of future generations” (Oslo Symposium, 1994).",
      "It is about resource efficiency and decoupling economic growth from emissions and environmental degradation. Humanity has overstepped 4 of the 9 planetary boundaries — including climate change, land-system change, biodiversity loss and interference with the nitrogen and phosphorus cycles (Hinterthuer, 2015) — because of unsustainable models of growth and lifestyles.",
      "The transition towards a low-carbon, green economy requires partnerships, rethinking consumption models and bringing in efficient innovations. IoU considers sustainable consumption an important pillar of nature-inclusive urban settings.",
    ],
    objectives: [
      "Engage media, parliamentarians, academia, youth, adolescents, children, the private sector and CSOs in transforming community consumption patterns through behavioural change initiatives and campaigns.",
      "Explore and promote alternatives that conserve resources such as water, energy, forests and land.",
      "Highlight alternative business models through partnerships with the private sector and promote action-oriented research.",
    ],
  },
  {
    slug: "solid-waste-as-resource",
    code: "SWR",
    title: "Solid Waste as Resource",
    summary:
      "Strengthen governance for responsive waste management systems by engaging the public and private sectors.",
    image: plasticWasteImage,
    imageAlt: "A heap of discarded plastic bottles and cans collected for recycling",
    keyFact: { value: "48.5M", label: "tons of municipal solid waste produced in Pakistan each year" },
    context: [
      "The World Bank estimates that, with rising urbanization and economic development, global waste will increase to 3.40 billion tons in 2050 compared to 2.01 billion tons in 2016. Worryingly, 33% of the waste produced is not managed in an environmentally friendly way.",
      "Urban waste management is a major issue in Pakistan. Every year 48.5 million tons of municipal solid waste is produced, with an annual increase of 2% (International Trade Administration, 2019). Burning, dumping and burying remain the options adopted by municipalities and communities alike.",
      "Informal collection, recycling and reuse are limited and traditional. A lack of infrastructure, municipal capacity and segregation at source are major issues, while research, innovation and circular-economy business models around waste-to-resource remain scarce.",
    ],
    objectives: [
      "Partner with the public and private sectors to find and scale innovative, hybrid and collaborative waste management solutions.",
      "Support policy interventions on waste management that promote a circular economy and incorporate best practices.",
      "Engage the public sector and communities for collaborative governance and awareness around waste management.",
    ],
  },
  {
    slug: "eco-entrepreneurship",
    code: "EE",
    title: "Eco-Entrepreneurship",
    summary:
      "Create an enabling environment for innovative eco-skills and green entrepreneurship through youth engagement, with a special focus on girls.",
    image: youngInnovatorsImage,
    imageAlt: "Young women working together on laptops",
    keyFact: { value: "64%", label: "of Pakistan's population is under the age of 30" },
    context: [
      "Pakistan has consistently ranked among the top 10 countries most vulnerable to the impacts of climate change. The social, economic and environmental setbacks of climate-induced disasters are expected to worsen under business-as-usual pathways — and the key to climate solutions is innovation.",
      "With over 64 percent of the population below the age of 30, Pakistan has a major demographic advantage that can be harnessed to transition towards a climate-resilient country.",
      "Engaging youth in green, innovative enterprises would accelerate ecosystem restoration, provide solutions for responsible resource use and sensitise society to environmental protection — while lowering youth unemployment and ensuring young people's voices shape a climate-compatible future.",
    ],
    objectives: [
      "Provide an enabling environment and platforms for youth to co-create solutions to ecosystem damage caused by excessive consumption, the transport sector, unwarranted waste production and the linear economy.",
      "Collaborate with and assist existing youth-led initiatives of the Government of Pakistan, linking environment and urban development to youth development.",
      "Cooperate with public and private actors on women-led eco-enterprise initiatives.",
    ],
  },
];

export function getThematicArea(slug: string): ThematicArea | undefined {
  return THEMATIC_AREAS.find((area) => area.slug === slug);
}
