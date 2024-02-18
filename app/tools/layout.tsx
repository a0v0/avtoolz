export default function ToolLayout({children}: {children: React.ReactNode}) {
  return (
    // <section className="h-[calc(100vh_-_64px)] 2xl:h-[calc(84vh_-_64px)] lg:mx-64 mx-6">
    //   {/* <div>{children}</div> */}
    //   {children}
    // </section>

    <main className="container mx-auto max-w-7xl px-6 flex-grow">
      <section className="flex flex-col items-center justify-center">{children}</section>
    </main>
  );
}
