import TopBar from "@/components/custom/TopBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <TopBar></TopBar>
      {children}
    </section>
  );
}
