export default function HeroTimeline() {
  return (
    <div aria-hidden className="hero-timeline">
      <div className="hero-timeline__line" />
      <div className="hero-timeline__dot hero-timeline__dot--now">СЕЙЧАС</div>
      <div className="hero-timeline__dot hero-timeline__dot--future">БУДУЩЕЕ</div>
    </div>
  );
}
