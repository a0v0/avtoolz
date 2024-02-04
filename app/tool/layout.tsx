export default function ToolLayout({children}: {children: React.ReactNode}) {
  return (
    <section className="h-[calc(100vh_-_64px)] 2xl:h-[calc(84vh_-_64px)]">
      {/* <div>{children}</div> */}
      {children}
    </section>
  );
}
