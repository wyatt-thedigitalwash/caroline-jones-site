import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      aria-label="About"
      data-bg="dark"
      className="relative bg-fixed bg-cover bg-center px-6 py-20 md:py-28"
      style={{
        backgroundImage:
          "url(/backgrounds/CarolineJones_DesktopBackground_2.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-[#000000]/45" />

      <div className="relative z-10">
      <h2 className="sr-only">About Caroline Jones</h2>
      <p className="mb-14 text-center font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.25em] text-[#DDE2CD] md:mb-20" aria-hidden="true">
        About
      </p>

      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 md:grid-cols-[400px_1fr] md:gap-16">
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/backgrounds/CaolineJones_MobileBackground_3.jpg"
            alt="Caroline Jones, singer-songwriter and multi-instrumentalist"
            width={400}
            height={500}
            sizes="(min-width: 768px) 400px, 100vw"
            className="h-auto w-full md:w-[400px]"
          />
        </div>

        <div className="font-[family-name:var(--font-body)] text-base leading-[1.8] text-[#DDE2CD]">
          <p>
            Lauded by <em>Rolling Stone</em> as &ldquo;an ambitious,
            entrepreneurial guitar heroine primed to bring back the pop-country
            glory of the Nineties,&rdquo; Caroline Jones is a singer-songwriter
            and multi-instrumentalist whose musicianship and commanding stage
            presence has led her to becoming a full-time band member of Zac Brown
            Band and to building out an impressive solo career.
          </p>
          <p className="mt-6">
            Her album <em>Good Omen</em>, her first release with Nashville
            Harbor Records &amp; Entertainment, marks the most personal and
            emotionally resonant chapter of her career to-date. Co-produced
            alongside Julian Raymond and Ric Wake, the album reflects a profound
            shift in perspective, embracing vulnerability, growth, and creative
            clarity, drawing directly from Jones&rsquo; evolution as a songwriter
            and her experience on the road.
          </p>
          <p className="mt-6">
            Caroline&rsquo;s earlier releases include{" "}
            <em>Homesite</em> (2023), featuring guest appearances from Zac Brown
            Band and Vince Gill, and <em>Antipodes</em> (2021), which debuted at
            No. 4 on the iTunes Country Chart and spawned her first Top 30
            Country radio hit, &ldquo;Come In (But Don&rsquo;t Make Yourself
            Comfortable).&rdquo; Alongside her solo work, Jones has collaborated
            with and toured alongside artists including Jimmy Buffett, Kenny
            Chesney, the Eagles, Carrie Underwood, Faith Hill, Tim McGraw, and
            Trisha Yearwood, among others, building a career defined by growth,
            craft, and artistic conviction.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
