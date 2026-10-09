import { useEffect, useId, useRef } from 'react';

const SEGMENTS = 112;
const PERIOD = 32;
const TRAIL_SECONDS = 7.6;
const TAU = Math.PI * 2;

export function HeroComet() {
  const gradientId = 'comet-corona-' + useId().replace(/:/g, '');
  const svgRefs = useRef<(SVGSVGElement | null)[]>([]);
  const headRefs = useRef<(SVGGElement | null)[][]>([[], []]);
  const trailRefs = useRef<(SVGPathElement | null)[][]>([[], []]);

  useEffect(() => {
    const svg = svgRefs.current[0];
    if (!svg) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Random phases are chosen once; smooth waves keep the motion irregular without jitter.
    const wavePhases = Array.from({ length: 3 }, () => Math.random() * TAU);
    let frame = 0;
    let elapsed = 0;
    let lastTime: number | null = null;
    let inView = false;

    const position = (seconds: number, comet: number) => {
      const angle = (.22 + seconds / PERIOD) * TAU + comet * Math.PI;
      const drift = 12 * Math.sin(seconds * TAU / 8.7 + wavePhases[0])
        + 5 * Math.sin(seconds * TAU / 13.9 + wavePhases[1])
        + 2 * Math.sin(seconds * TAU / 5.3 + wavePhases[2]);
      return {
        x: 600 + 582 * Math.cos(angle),
        y: 164 + 105 * Math.sin(angle) + (comet === 0 ? drift : -drift),
        // Increasing x is the far side; decreasing x is the near side.
        layer: Math.sin(angle) < 0 ? 0 : 1,
      };
    };
    const paint = (seconds: number) => {
      for (let comet = 0; comet < 2; comet++) {
        let leading = position(seconds, comet);
        for (let layer = 0; layer < 2; layer++) {
          const head = headRefs.current[layer][comet];
          head?.setAttribute('transform', `translate(${leading.x.toFixed(2)} ${leading.y.toFixed(2)})`);
          head?.setAttribute('visibility', layer === leading.layer ? 'visible' : 'hidden');
        }
        for (let index = 0; index < SEGMENTS; index++) {
          const age = TRAIL_SECONDS * (index + 1) / SEGMENTS;
          const trailing = position(seconds - age, comet);
          const midpoint = position(seconds - age + TRAIL_SECONDS / SEGMENTS / 2, comet);
          for (let layer = 0; layer < 2; layer++) {
            const segment = trailRefs.current[layer][comet * SEGMENTS + index];
            segment?.setAttribute('visibility', layer === midpoint.layer ? 'visible' : 'hidden');
            if (layer === midpoint.layer) segment?.setAttribute('d', `M${leading.x.toFixed(2)} ${leading.y.toFixed(2)} L${trailing.x.toFixed(2)} ${trailing.y.toFixed(2)}`);
          }
          leading = trailing;
        }
      }
    };
    const tick = (now: number) => {
      if (lastTime !== null) elapsed += Math.min((now - lastTime) / 1000, .05);
      lastTime = now;
      paint(elapsed);
      frame = requestAnimationFrame(tick);
    };
    const syncPlayback = () => {
      cancelAnimationFrame(frame);
      lastTime = null;
      if (inView && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(tick);
    };
    const resizeHeads = () => {
      const scale = svg.getBoundingClientRect().width / 1200;
      if (!scale) return;
      for (const layer of svgRefs.current) {
        layer?.querySelectorAll('.comet-corona').forEach(circle => circle.setAttribute('r', String(6 / scale)));
        layer?.querySelectorAll('.comet-head').forEach(circle => circle.setAttribute('r', String(1.8 / scale)));
        layer?.querySelectorAll('.comet-core').forEach(circle => circle.setAttribute('r', String(.55 / scale)));
      }
    };
    const visibility = new IntersectionObserver(entries => {
      inView = entries[0]?.isIntersecting ?? false;
      syncPlayback();
    });
    const resize = new ResizeObserver(resizeHeads);
    paint(0);
    resizeHeads();
    visibility.observe(svg);
    resize.observe(svg);
    reducedMotion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resize.disconnect();
      reducedMotion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  return <>{[0, 1].map(layer => <svg key={layer} ref={element => { svgRefs.current[layer] = element; }} className={`hero-orbit hero-comet hero-comet-${layer === 0 ? 'back' : 'front'}`} viewBox="0 0 1200 320" fill="none" aria-hidden="true" focusable="false">
    <defs><radialGradient id={`${gradientId}-${layer}`}><stop stopColor="currentColor" stopOpacity=".28" /><stop offset=".35" stopColor="currentColor" stopOpacity=".1" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient></defs>
    {[0, 1].map(comet => <g key={comet} data-comet={comet}>
      <g className="comet-trail">{Array.from({ length: SEGMENTS }, (_, index) => {
        const strength = 1 - index / SEGMENTS;
        return <path key={index} ref={element => { trailRefs.current[layer][comet * SEGMENTS + index] = element; }} stroke="currentColor" strokeWidth={.18 + .68 * strength} strokeOpacity={.76 * strength ** 2.7} strokeLinecap="round" vectorEffect="non-scaling-stroke" visibility="hidden" />;
      })}</g>
      <g className="comet-tip" ref={element => { headRefs.current[layer][comet] = element; }} visibility="hidden"><circle className="comet-corona" r="6" fill={`url(#${gradientId}-${layer})`} /><circle className="comet-head" r="1.8" fill="currentColor" /><circle className="comet-core" r=".55" /></g>
    </g>)}
  </svg>)}</>;
}
