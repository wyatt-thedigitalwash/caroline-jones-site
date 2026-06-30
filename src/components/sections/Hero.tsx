import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" aria-label="Hero" className="relative min-h-screen md:h-screen">
      <Image
        src="/backgrounds/CarolineJones_GoodOmen_DesktopBackground.jpg"
        alt="Caroline Jones in fringe jacket against a sun-drenched sky"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-[#000000]/25" />

      <div className="absolute inset-0 flex items-end justify-center px-6 pb-[12vh] md:pb-[120px]">
        <div className="flex flex-col items-center text-center text-[#DDE2CD]">

          <p className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.3em] md:text-sm">
            New Album Out Now
          </p>

          <h1 className="mt-5 font-[family-name:var(--font-heading)] italic text-[clamp(48px,7vw,96px)] leading-[0.95]">
            good omen
          </h1>

          <hr className="mx-auto mt-10 w-full max-w-[180px] border-t border-[#DDE2CD]/50" aria-hidden="true" />

          <a
            href="https://carolinejones.ffm.to/goodomenalbum"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block border border-[#DDE2CD] px-12 py-4 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-[#DDE2CD] transition-colors hover:bg-[#DDE2CD]/10"
          >
            Listen Now
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
