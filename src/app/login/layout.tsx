export default function RootLayout({ children, }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <body className="h-full w-full">
        {children}
      </body>
    </>
  );
}
