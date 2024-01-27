export default function ToolLayout({children}: {children: React.ReactNode}) {
  return (
    // <section className="flex flex-col gap-4 overflow-hidden lg:overflow-visible w-full flex-nowrap justify-between items-center h-[calc(100vh_-_64px)] 2xl:h-[calc(84vh_-_64px)]">
    <div>{children}</div>
    // </section>
  );
}
