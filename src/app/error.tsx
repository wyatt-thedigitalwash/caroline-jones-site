'use client';

import Link from 'next/link';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center pt-20">
      <h1 className="font-[family-name:var(--font-heading)] text-4xl italic text-[#5D3635] mb-4">Something went wrong</h1>
      <p className="font-[family-name:var(--font-body)] text-lg text-[#5D3635] mb-8">An unexpected error occurred.</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="border border-[#5D3635] px-8 py-3 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-[#5D3635] transition-colors hover:bg-[#5D3635]/10"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-[#5D3635] px-8 py-3 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-[#5D3635] transition-colors hover:bg-[#5D3635]/10"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
