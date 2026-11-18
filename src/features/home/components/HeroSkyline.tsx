import { delayStyle } from "@/lib/motion";

/** Tree positions along the skyline: x, ground y, crown radius, animation delay (ms). */
const TREES: Array<[number, number, number, number]> = [
  [70, 240, 18, 1300],
  [128, 240, 13, 1450],
  [262, 240, 20, 1550],
  [410, 240, 15, 1700],
  [470, 240, 22, 1800],
  [606, 240, 14, 1950],
  [948, 240, 16, 2050],
  [1010, 240, 23, 2150],
  [1158, 240, 14, 2250],
  [1290, 240, 19, 2350],
  [1372, 240, 13, 2450],
];

/**
 * Motion graphic for the home hero: the Margalla Hills, Islamabad's skyline and the Faisal
 * Mosque are drawn as lines, then trees grow along the street — the IoU story in one image.
 * Pure SVG + CSS; static (fully drawn) when the user prefers reduced motion.
 */
export function HeroSkyline() {
  const line = "fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round]";

  return (
    <svg
      viewBox="0 0 1440 260"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-white sm:h-52 lg:h-64"
    >
      {/* Margalla Hills ridge */}
      <path
        pathLength={1}
        className={`animate-draw ${line} text-leaf-300/60`}
        strokeWidth={2}
        style={delayStyle(200, { "--length": 1 })}
        d="M0 150C110 96 190 118 300 78S500 34 620 92 820 58 960 100 1180 44 1300 86 1400 96 1440 104"
      />

      {/* City skyline (left) */}
      <path
        pathLength={1}
        className={`animate-draw ${line} text-white/55`}
        strokeWidth={1.6}
        style={delayStyle(500, { "--length": 1 })}
        d="M0 240V206H44V176H96V206H150V160H196V132H236V160H280V240M300 240V188H342V150H370V118H404V150H430V240M520 240V196H560V170H600V240"
      />

      {/* Faisal Mosque: four minarets and the tent-shaped prayer hall */}
      <path
        pathLength={1}
        className={`animate-draw ${line} text-white/80`}
        strokeWidth={1.8}
        style={delayStyle(800, { "--length": 1 })}
        d="M664 240V112L668 96 672 112V240M716 240 780 166 844 240M740 240 780 194 820 240M888 240V112L892 96 896 112V240M694 240V140L697 128 700 140V240M860 240V140L863 128 866 140V240"
      />

      {/* City skyline (right) */}
      <path
        pathLength={1}
        className={`animate-draw ${line} text-white/55`}
        strokeWidth={1.6}
        style={delayStyle(650, { "--length": 1 })}
        d="M960 240V184H1000V150H1050V184H1090V240M1110 240V140H1150V104H1186V140H1224V240M1240 240V196H1290V170H1330V196H1380V158H1420V240"
      />

      {/* Ground */}
      <path
        pathLength={1}
        className={`animate-draw ${line} text-leaf-300/70`}
        strokeWidth={2}
        style={delayStyle(300, { "--length": 1 })}
        d="M0 240H1440"
      />

      {/* Trees growing along the street */}
      {TREES.map(([x, ground, radius, delay]) => (
        <g key={x} className="animate-grow" style={delayStyle(delay)}>
          <line x1={x} y1={ground} x2={x} y2={ground - radius * 1.4} className="stroke-leaf-200/80" strokeWidth={2} />
          <circle cx={x} cy={ground - radius * 1.9} r={radius} className="fill-leaf-500/85" />
          <circle cx={x - radius * 0.35} cy={ground - radius * 2.15} r={radius * 0.45} className="fill-leaf-300/70" />
        </g>
      ))}
    </svg>
  );
}
