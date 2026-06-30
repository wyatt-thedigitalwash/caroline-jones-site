import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Caroline Jones',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center pt-20">
      <h1 className="font-[family-name:var(--font-heading)] text-6xl italic text-[#5D3635] mb-4">404</h1>
      <p className="font-[family-name:var(--font-body)] text-lg text-[#5D3635] mb-8">Page not found</p>
      <Link
        href="/"
        className="border border-[#5D3635] px-8 py-3 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-[#5D3635] transition-colors hover:bg-[#5D3635]/10"
      >
        Go Home
      </Link>
    </div>
  );
}
