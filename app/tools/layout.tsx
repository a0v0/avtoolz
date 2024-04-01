export default function ToolLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="container mx-auto max-w-8xl px-6 flex-grow">
      <section className="flex-grow overflow-y-auto h-screen flex flex-col items-center pt-0">
        {children}
      </section>
    </main>
  );
}
