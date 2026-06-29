import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Link
        href="/"
        className="px-6 py-3 bg-black text-white rounded hover:opacity-80 transition-opacity"
      >
        Go Home
      </Link>
    </main>
  );
}
