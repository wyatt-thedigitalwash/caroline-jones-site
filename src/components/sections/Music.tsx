import Image from "next/image";

const albums = [
  {
    title: "Good Omen",
    cover: "/covers/CarolineJones_GoodOmen_CoverArt.jpg",
    alt: "Caroline Jones -- Good Omen album cover",
    href: "https://carolinejones.ffm.to/goodomenalbum",
  },
  {
    title: "You\u2019re It For Me, Honey",
    cover: "/covers/CarolineJones_YoureItForMeHoney_CoverArt.jpg",
    alt: "Caroline Jones -- You're It For Me, Honey album cover",
    href: "https://carolinejones.ffm.to/youreitformehoney",
  },
];

export default function Music() {
  return (
    <section
      id="music"
      aria-label="Music"
      data-bg="light"
      className="bg-[#DDE2CD] px-6 py-20 md:py-28"
    >
      <h2 className="sr-only">Music</h2>
      <p className="mb-14 text-center font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.25em] text-[#5D3635] md:mb-20" aria-hidden="true">
        Music
      </p>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
        {albums.map((album) => (
          <div key={album.title} className="flex flex-col items-center">
            <Image
              src={album.cover}
              alt={album.alt}
              width={600}
              height={600}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="aspect-square w-full object-cover"
            />

            <h3 className="mt-6 font-[family-name:var(--font-heading)] text-2xl italic text-[#5D3635]">
              {album.title}
            </h3>

            <a
              href={album.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-[#5D3635] underline underline-offset-4 decoration-[0.5px] hover:opacity-70"
            >
              Listen Now
              <span className="sr-only"> - {album.title} (opens in new tab)</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
