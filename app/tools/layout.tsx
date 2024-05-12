import Breadcrumb from "@/components/breadcrumb";

export default function ToolLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Breadcrumb />
      <main className="h-screen overflow-auto px-2">{children}</main>
    </>
  );
}
