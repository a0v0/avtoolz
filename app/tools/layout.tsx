export default function ToolLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="container mx-auto max-w-7xl px-6 flex-grow">
      <section className="flex flex-col items-center justify-center">{children}</section>
    </main>
  );
}
