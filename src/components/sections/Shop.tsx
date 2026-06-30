import Image from "next/image";

export default function Shop() {
  return (
    <section
      id="shop"
      aria-label="Shop"
      data-bg="light"
      className="bg-[#DDE2CD] px-6 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-12 md:grid-cols-[720px_1fr] md:gap-16">
        <Image
          src="/merch/GoodOmens_MerchVisual.webp"
          alt="Caroline Jones Good Omen merch"
          width={720}
          height={720}
          sizes="(min-width: 768px) 720px, 100vw"
          className="h-auto w-full max-w-[720px]"
        />

        <div className="flex flex-col justify-center">
          <p className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.25em] text-[#5D3635]">
            Shop
          </p>

          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl italic text-[#5D3635]">
            Good Omen Merch
          </h2>

          <p className="mt-6 font-[family-name:var(--font-body)] text-base leading-[1.8] text-[#5D3635]">
            Rep the album. Official Caroline Jones merchandise available now.
          </p>

          <a
            href="https://www.richardsandsouthern.com/collections/caroline-jones"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block w-fit border border-[#5D3635] px-10 py-3 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-[#5D3635] transition-colors hover:bg-[#5D3635]/10"
          >
            Visit the Shop
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
