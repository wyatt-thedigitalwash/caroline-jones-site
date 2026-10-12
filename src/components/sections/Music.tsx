import Image from "next/image";
import { PRESAVE_URL, isReleased } from "@/lib/funeral";

const albums = [
  {
    title: "Your Wife Is Dead",
    cover: "/covers/CarolineJones_YourWifeIsDead_Cover.jpg",
    alt: "Caroline Jones -- Your Wife Is Dead single cover",
    href: PRESAVE_URL,
    // Pre-save until release (midnight ET, 10/30), then a normal listen link.
    upcoming: true,
  },
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
  const released = isReleased();
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

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-3 md:gap-12 lg:gap-16">
        {albums.map((album) => (
          <div key={album.title} className="flex flex-col items-center">
            <Image
              src={album.cover}
              alt={album.alt}
              width={600}
              height={600}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="aspect-square w-full object-cover"
            />

            <a
              href={album.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.2em] text-[#5D3635] underline underline-offset-4 decoration-[0.5px] hover:opacity-70"
            >
              {"upcoming" in album && !released ? "Pre-Save" : "Listen Now"}
              <span className="sr-only"> - {album.title} (opens in new tab)</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
