import Breadcrumb from "@/components/breadcrumb";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto  min-h-[calc(100vh_-_30px_-_108px)] flex-grow ">
      <Breadcrumb />
      {children}
    </main>
  );
}
