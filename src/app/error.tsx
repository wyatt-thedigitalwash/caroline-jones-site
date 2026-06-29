'use client';

import Link from 'next/link';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-lg mb-8">An unexpected error occurred.</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-black text-white rounded hover:opacity-80 transition-opacity"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-black rounded hover:bg-black hover:text-white transition-colors"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
