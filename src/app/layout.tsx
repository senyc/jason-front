import './globals.css';

import type { Viewport } from 'next';

export const viewport: Viewport = {
  colorScheme: "light dark"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className="h-full w-full">
        {children}
      </html>
    </>
  );
}
