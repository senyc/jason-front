import type { Metadata } from 'next';

export default function RootLayout({ children, }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-grow">
        {children}
      </main>
    </>
  );
}
