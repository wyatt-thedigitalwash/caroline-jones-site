import { Cormorant_Garamond } from "next/font/google";

// Closest web match to the invite's spaced roman caps. Shared by the campaign
// page and the main-site splash, which use the same invitation design.
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-funeral",
  display: "swap",
});
