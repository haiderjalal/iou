import { cssVars, delayStyle } from "@/lib/motion";

/** Tree positions along the skyline: x, crown radius, grow delay (ms). */
const TREES: Array<[number, number, number]> = [
  [70, 18, 1300],
  [128, 13, 1450],
  [262, 20, 1550],
  [410, 15, 1700],
  [470, 22, 1800],
  [606, 14, 1950],
  [948, 16, 2050],
  [1010, 23, 2150],
  [1158, 14, 2250],
  [1290, 19, 2350],
  [1372, 13, 2450],
];

/** Lit windows that twinkle slowly: x, y, duration (s), delay (s). */
const WINDOWS: Array<[number, number, number, number]> = [
  [56, 186, 5, -1],
  [74, 214, 7, -3],
  [206, 142, 6, -2],
  [216, 170, 8, -5],
  [312, 200, 5, -4],
  [380, 128, 7, -1],
  [384, 160, 6, -6],
  [1012, 162, 6, -2],
  [1030, 196, 8, -4],
  [1124, 152, 5, -3],
  [1160, 114, 7, -1],
  [1168, 150, 6, -5],
  [1300, 182, 7, -2],
  [1394, 170, 5, -4],
];

/** Clouds: y, scale, duration (s), delay (s) — negative delays spread them across the sky. */
const CLOUDS: Array<[number, number, number, number]> = [
  [36, 1, 95, -20],
  [62, 0.7, 120, -75],
  [24, 0.85, 105, -50],
];

/** Vehicles: lane ("east" | "west"), kind, duration (s), delay (s). */
const VEHICLES: Array<["east" | "west", "bus" | "car", number, number]> = [
  ["east", "bus", 22, -4],
  ["east", "car", 15, -11],
  ["east", "car", 15, -3],
  ["west", "car", 17, -6],
  ["west", "bus", 26, -16],
  ["west", "car", 17, -14],
];

const LINE = "fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round]";

function Cloud() {
  return (
    <g className="fill-white/10">
      <ellipse cx="60" cy="16" rx="60" ry="12" />
      <ellipse cx="44" cy="8" rx="26" ry="12" />
      <ellipse cx="82" cy="6" rx="22" ry="10" />
    </g>
  );
}

function Vehicle({ kind }: { kind: "bus" | "car" }) {
  if (kind === "bus") {
    // A Metrobus-style articulated bus: IoU's urban mobility theme in motion.
    return (
      <g>
        <rect width="84" height="11" rx="3" className="fill-leaf-500" />
        <rect x="4" y="2" width="76" height="3.5" rx="1" className="fill-forest-950/60" />
        <circle cx="14" cy="11.5" r="2.4" className="fill-forest-950" />
        <circle cx="70" cy="11.5" r="2.4" className="fill-forest-950" />
      </g>
    );
  }
  return (
    <g>
      <rect width="30" height="8" rx="3" className="fill-white/70" />
      <rect x="7" y="-4" width="15" height="5" rx="2" className="fill-white/50" />
      <circle cx="7" cy="8.5" r="2" className="fill-forest-950" />
      <circle cx="23" cy="8.5" r="2" className="fill-forest-950" />
    </g>
  );
}

/**
 * Motion graphic for the home hero: the Margalla Hills, Islamabad's skyline and the
 * Faisal Mosque draw themselves, trees grow and sway, clouds and birds drift past and
 * buses and cars travel the road — the city IoU works for, alive. Pure SVG + CSS.
 * With reduced motion it renders as a still illustration.
 */
export function HeroSkyline() {
  return (
    <svg
      viewBox="0 0 1440 272"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full text-white sm:h-56 lg:h-72"
    >
      {/* Sun glowing over the hills */}
      <circle cx="1190" cy="62" r="56" className="anim-glow fill-leaf-300/10" />
      <circle cx="1190" cy="62" r="24" className="fill-leaf-200/25" />

      {/* Drifting clouds */}
      {CLOUDS.map(([y, scale, duration, delay]) => (
        <g key={`cloud-${y}`} transform={`translate(0 ${y})`}>
          <g className="anim-cloud" style={cssVars({ "--duration": `${duration}s`, "--delay": `${delay}s` })}>
            <g transform={`scale(${scale})`}>
              <Cloud />
            </g>
          </g>
        </g>
      ))}

      {/* Birds */}
      {[
        [48, 30, -6],
        [72, 34, -19],
      ].map(([y, duration, delay]) => (
        <g key={`bird-${y}`} transform={`translate(0 ${y})`}>
          <g className="anim-fly" style={cssVars({ "--duration": `${duration}s`, "--delay": `${delay}s` })}>
            {[0, 18, 30].map((offset) => (
              <path
                key={offset}
                d={`M${offset} ${offset % 2 ? 6 : 0}q5 -5 10 0q5 -5 10 0`}
                className={`anim-flap ${LINE} text-white/60`}
                strokeWidth={1.6}
              />
            ))}
          </g>
        </g>
      ))}

      {/* Margalla Hills ridge */}
      <path
        pathLength={1}
        className={`animate-draw ${LINE} text-leaf-300/60`}
        strokeWidth={2}
        style={delayStyle(200, { "--length": 1 })}
        d="M0 150C110 96 190 118 300 78S500 34 620 92 820 58 960 100 1180 44 1300 86 1400 96 1440 104"
      />

      {/* City skyline (left) */}
      <path
        pathLength={1}
        className={`animate-draw ${LINE} text-white/55`}
        strokeWidth={1.6}
        style={delayStyle(500, { "--length": 1 })}
        d="M0 240V206H44V176H96V206H150V160H196V132H236V160H280V240M300 240V188H342V150H370V118H404V150H430V240M520 240V196H560V170H600V240"
      />

      {/* Faisal Mosque: four minarets and the tent-shaped prayer hall */}
      <path
        pathLength={1}
        className={`animate-draw ${LINE} text-white/80`}
        strokeWidth={1.8}
        style={delayStyle(800, { "--length": 1 })}
        d="M664 240V112L668 96 672 112V240M716 240 780 166 844 240M740 240 780 194 820 240M888 240V112L892 96 896 112V240M694 240V140L697 128 700 140V240M860 240V140L863 128 866 140V240"
      />

      {/* City skyline (right) */}
      <path
        pathLength={1}
        className={`animate-draw ${LINE} text-white/55`}
        strokeWidth={1.6}
        style={delayStyle(650, { "--length": 1 })}
        d="M960 240V184H1000V150H1050V184H1090V240M1110 240V140H1150V104H1186V140H1224V240M1240 240V196H1290V170H1330V196H1380V158H1420V240"
      />

      {/* Lit windows */}
      {WINDOWS.map(([x, y, duration, delay]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={6}
          height={8}
          rx={1}
          className="anim-twinkle fill-leaf-200"
          style={cssVars({ "--duration": `${duration}s`, "--delay": `${delay}s` })}
        />
      ))}

      {/* Ground and road */}
      <path
        pathLength={1}
        className={`animate-draw ${LINE} text-leaf-300/70`}
        strokeWidth={2}
        style={delayStyle(300, { "--length": 1 })}
        d="M0 240H1440"
      />
      <path d="M0 251H1440" className={`anim-lane ${LINE} text-white/25`} strokeWidth={1.2} strokeDasharray="18 14" />

      {/* Traffic: eastbound on the upper lane, westbound on the lower lane */}
      {VEHICLES.map(([lane, kind, duration, delay], index) => (
        <g key={`${lane}-${index}`} transform={`translate(0 ${lane === "east" ? 241 : 251.5})`}>
          <g
            className={lane === "east" ? "anim-drive-right" : "anim-drive-left"}
            style={cssVars({ "--duration": `${duration}s`, "--delay": `${delay}s` })}
          >
            <g transform={lane === "west" ? "scale(-1 1)" : undefined}>
              <Vehicle kind={kind} />
            </g>
          </g>
        </g>
      ))}

      {/* Trees grow in, then sway in the breeze */}
      {TREES.map(([x, radius, delay], index) => (
        <g key={x} className="animate-grow" style={delayStyle(delay)}>
          <g className="anim-sway" style={cssVars({ "--duration": `${5 + (index % 4)}s`, "--delay": `${-index}s` })}>
            <line x1={x} y1={240} x2={x} y2={240 - radius * 1.4} className="stroke-leaf-200/80" strokeWidth={2} />
            <circle cx={x} cy={240 - radius * 1.9} r={radius} className="fill-leaf-500/85" />
            <circle cx={x - radius * 0.35} cy={240 - radius * 2.15} r={radius * 0.45} className="fill-leaf-300/70" />
          </g>
        </g>
      ))}
    </svg>
  );
}
