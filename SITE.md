# Caroline Jones -- Site Memory

## Project Overview
- Artist: Caroline Jones
- Site: carolinejones.com
- Type: Single-page site with anchor nav
- Framework: Next.js, TypeScript, Tailwind, App Router, src/ directory
- Deployed to: Vercel

---

## Brand Colors
- Background (Cream): #DDE2CD
- Primary text / foreground (Brown): #5D3635
- Use cream as the default page background. Use brown for all text, borders, and UI elements unless a section inverts (brown background, cream text).

---

## Typography
- Headlines / subheads: Playfair Display (Google Fonts) -- placeholder for Professor Regular (Adobe Fonts), to be swapped before launch
- Body copy: Libre Baskerville (Google Fonts) -- placeholder for Benguiat Pro ITC Book Condensed (Adobe Fonts), to be swapped before launch
- Load both via next/font/google
- Headline font: use for all h1, h2, h3 and section titles
- Body font: use for all paragraph copy, labels, nav links, form fields

---

## Logo
- Cursive script wordmark, two versions:
  - Dark on light: public/logos/CarolineJones_LogoBlack.png
  - Light on dark: public/logos/CarolineJones_LogoWhite.png
- Use LogoWhite on cream backgrounds, LogoBlack on brown backgrounds (inverted from what you might expect -- the "Black" logo is dark brown, reads on cream)
- Never add a background behind the logo
- Minimum width: 375px equivalent in display, scale proportionally
- Do not stretch or alter aspect ratio

---

## Visual Direction
- Reference points: early-70s country album artwork, Gram Parsons era; vintage editorial photography from Rolling Stone circa 1972; the warmth and earthiness of a Dolly Parton or Emmylou Harris gatefold
- Warm, sun-drenched, slightly faded -- not slick or modern
- Fringe, sky, open air -- the album art sets the visual tone
- Typography should feel hand-crafted and editorial, not techy or geometric
- No gradients, no drop shadows, no pill buttons, no icon grids
- Buttons: simple text with a thin border in brown, or plain text links with an underline treatment
- Spacing: generous, unhurried -- this site should breathe

---

## Page Structure (Single Page, Anchor Nav)
Sections in order:
1. Hero -- album art / banner, "Good Omen out now," Listen Now CTA
2. Music -- album listing with covers and Listen Now links
3. Videos -- 4 YouTube embeds
4. Shop -- merch visual and external link
5. About -- bio and artist photo
6. Subscribe -- fan signup form (placeholder wiring)
7. Footer -- logo, socials

Nav items: Music | Videos | Shop | About | Subscribe
(No Tour section -- no current dates)

---

## Key Links
- Good Omen (album): https://carolinejones.ffm.to/goodomenalbum
- You're It For Me Honey (album): https://carolinejones.ffm.to/youreitformehoney
- Merch shop: https://www.richardsandsouthern.com/collections/caroline-jones
- Facebook: https://www.facebook.com/carolinejonesmusic
- Instagram: https://www.instagram.com/carolinejones
- TikTok: https://www.tiktok.com/@carolinejonesmusic
- YouTube: https://www.youtube.com/channel/UCB8e-AfK22U3VvLlwBqqXKA

---

## Music Videos (YouTube)
- https://youtu.be/RqUYw2_Hjco
- https://youtu.be/gb3bbkFsYSI
- https://youtu.be/IyPD6AnWlRg
- https://youtu.be/pkCzUqWKK5o

---

## Albums
1. Good Omen -- cover: public/covers/CarolineJones_GoodOmen_CoverA... (find exact filename in public/covers/)
2. You're It For Me Honey -- cover: public/covers/CarolineJones_YoureItForMeHoney... (find exact filename in public/covers/)

---

## Bio (Edited, Final)
Lauded by Rolling Stone as "an ambitious, entrepreneurial guitar heroine primed to bring back the pop-country glory of the Nineties," Caroline Jones is a singer-songwriter and multi-instrumentalist whose musicianship and commanding stage presence has led her to becoming a full-time band member of Zac Brown Band and to building out an impressive solo career. Her album Good Omen, her first release with Nashville Harbor Records & Entertainment, marks the most personal and emotionally resonant chapter of her career to-date. Co-produced alongside Julian Raymond and Ric Wake, the album reflects a profound shift in perspective, embracing vulnerability, growth, and creative clarity, drawing directly from Jones' evolution as a songwriter and her experience on the road. Caroline's earlier releases include Homesite (2023), featuring guest appearances from Zac Brown Band and Vince Gill, and Antipodes (2021), which debuted at No. 4 on the iTunes Country Chart and spawned her first Top 30 Country radio hit, "Come In (But Don't Make Yourself Comfortable)." Alongside her solo work, Jones has collaborated with and toured alongside artists including Jimmy Buffett, Kenny Chesney, the Eagles, Carrie Underwood, Faith Hill, Tim McGraw, and Trisha Yearwood, among others, building a career defined by growth, craft, and artistic conviction.

---

## Subscribe Form Fields
- First Name
- Last Name
- Email
- Phone
- Zip Code
- Country
- Integration: Laylo (email + phone)

---

## Assets In Public Directory
- public/logos/ -- CarolineJones_LogoBlack.png, CarolineJones_LogoWhite.png
- public/covers/ -- Good Omen cover, You're It For Me Honey cover
- public/banners/ -- CarolineJones_GoodOmenOutNow (two variants)
- public/merch/ -- GoodOmens_MerchVisual.webp
- public/backgrounds/ -- (contents unknown, check directory)

---

## Placeholder Log
- Font swap pending: Playfair Display standing in for Professor Regular; Libre Baskerville standing in for Benguiat Pro ITC. Swap when Adobe Fonts kit is available.
- Subscribe form: fields built, Laylo wired (email + phone). Requires LAYLO_API_KEY in env.

---

## Anti-Patterns (Do Not Use)
- No gradients
- No drop shadows
- No pill-shaped buttons
- No icon grids or feature card layouts
- No blue, teal, or generic "professional" colors outside the approved palette
- No stock photography
- No centered hero with feature grid below
- No bold section headers like "Our Music" or "About Us"
