import Breadcrumb from "@/components/breadcrumb";

export default function ToolLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <main className="container mx-auto  min-h-[calc(100vh_-_64px_-_108px)] flex-grow ">
        <Breadcrumb />
        {children}
      </main>
    </>
  );
}
