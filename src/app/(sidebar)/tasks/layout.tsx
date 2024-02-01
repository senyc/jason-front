export default async function TaskLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full">
      {children}
    </main >
  );
}
