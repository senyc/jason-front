import './globals.css';

import type { Viewport } from 'next';
import InitializeColorScheme from './initializeColorScheme';
import Script from 'next/script';

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
      <html lang="en" className="hidden h-full w-full">
        <InitializeColorScheme />
        {children}
      </html>
    </>
  );
}
