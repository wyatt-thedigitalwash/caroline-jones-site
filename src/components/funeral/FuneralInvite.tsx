import Image from "next/image";
import { PRESAVE_URL, SERVICE_DATE, SERVICE_TIME } from "@/lib/funeral";

// The invitation, opened. Two "pages": the lockup (garland arch framing "The
// Funeral of Her.") and the details (date, the invitation line, RSVP, seal).
// Phones stack them; from 1024px they sit side by side with a fold between.
// Lockup lettering is sized in cqw of the arch so it always sits inside the
// vines; everything else is normal flow.
export default function FuneralInvite({ released }: { released: boolean }) {
  return (
    <article className="fi-invite" aria-labelledby="fi-title">
      <section className="fi-lockup" aria-label="Invitation">
        <Image
          src="/funeral/garland.png"
          alt="A gold engraved garland of ribbons and hanging roses."
          width={965}
          height={904}
          sizes="(min-width: 1024px) 44vw, 94vw"
          className="fi-garland"
          preload
        />
        <h1 id="fi-title" className="fi-title">
          <span className="fi-caps fi-funeral">The Funeral</span>
          <span className="fi-caps fi-of">of</span>
          <span className="fi-her">
            <Image
              src="/funeral/her-script.png"
              alt="Her."
              width={900}
              height={462}
              sizes="(min-width: 1024px) 21vw, 44vw"
            />
          </span>
        </h1>

        {/* Desktop only: memorial cameo portrait under "Her." */}
        <figure className="fi-portrait">
          <Image
            src="/funeral/portrait-oval.png"
            alt="Memorial portrait of Caroline Jones in an oval cameo frame"
            width={840}
            height={1142}
            sizes="220px"
          />
        </figure>
      </section>

      <div className="fi-fold" aria-hidden="true" />

      <section className="fi-details" aria-label="Service details">
        <div className="fi-when">
          <Image
            src="/funeral/divider-long.png"
            alt=""
            width={710}
            height={102}
            sizes="240px"
            className="fi-rule fi-rule-long"
          />
          <p className="fi-caps fi-date">
            <time dateTime="2026-10-30T00:00:00-04:00">{SERVICE_DATE}</time>
          </p>
          <p className="fi-caps fi-time">{SERVICE_TIME}</p>
          <Image
            src="/funeral/divider-short.png"
            alt=""
            width={570}
            height={100}
            sizes="180px"
            className="fi-rule fi-rule-short"
          />
        </div>

        <div className="fi-cta">
          <p className="fi-cordial">You are cordially invited.</p>
          <a href={PRESAVE_URL} target="_blank" rel="noopener noreferrer" className="fi-rsvp">
            <span className="fi-rsvp-label">{released ? "Listen Now" : "Pre-Save to RSVP"}</span>
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <p className="fi-song">
            {released ? "Listen to" : "Pre-save"} <cite>Your Wife Is Dead</cite>, the new song
            from Caroline Jones.
          </p>
        </div>

        <div className="fi-seal">
          <Image
            src="/funeral/seal.png"
            alt="Red wax seal stamped CJ"
            width={396}
            height={454}
            sizes="120px"
          />
        </div>
      </section>
    </article>
  );
}
