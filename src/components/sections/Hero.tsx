import { getImageProps } from "next/image";
import { LISTEN_URL } from "@/lib/funeral";

// "Your Wife Is Dead" key art, art-directed: the tall cut (with its dark band
// for copy at the bottom) on phones, the wide cut from 768px up. Fonts and
// colors follow the label spec (styles under "Hero" in globals.css).
const alt =
  "Caroline Jones in a black dress, hand on hip and holding a shovel, in a dusty field with two women behind her.";

export default function Hero() {
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    alt,
    sizes: "100vw",
    width: 1920,
    height: 1080,
    src: "/backgrounds/CarolineJones_A_DIGITAL_YourWifeIsDead_NoCopy_General_1920x1080_2026.10.19_FNL.jpg",
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    alt,
    sizes: "100vw",
    width: 900,
    height: 1600,
    src: "/backgrounds/CarolineJones_A_DIGITAL_YourWifeIsDead_NoCopy_Mobile_900x1600_2026.10.19_FNL.jpg",
  });

  return (
    <section id="hero" aria-label="Hero" className="relative min-h-screen overflow-hidden md:h-screen">
      <picture>
        <source media="(min-width: 768px)" srcSet={desktop} />
        <source srcSet={mobile} />
        <img
          {...rest}
          alt={alt}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      <div className="ywid-shade" aria-hidden="true" />

      {/* Per the label's graphics: phones put the release line and a dark
          title in the sky with the button down in the dark band; desktop sets
          a light title across her, with the release line and button beneath. */}
      <div className="ywid-content">
        <p className="ywid-eyebrow">
          Out Now | Listen Now
        </p>

        {/* The label's lockup art (traced to SVG from the final PNG), tinted
            per breakpoint in CSS. The text is there for search and screen
            readers. */}
        <h1 className="ywid-lockup">
          <span className="sr-only">Your Wife Is Dead, Caroline Jones</span>
          <span className="ywid-lockup-art" aria-hidden="true" />
        </h1>

        <a href={LISTEN_URL} target="_blank" rel="noopener noreferrer" className="ywid-btn">
          Listen Now
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </div>
    </section>
  );
}
