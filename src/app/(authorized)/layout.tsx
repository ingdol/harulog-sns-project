export default async function Layout({
  sidebar,
  children,
}: Readonly<{
  sidebar: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      <aside className="w-[20%] md:w-[9%] lg:w-[22%] xl:w-[17%] p-6 border-r border-Slate-50 max-w-80">
        {sidebar}
      </aside>
      <main className="flex-grow overflow-scroll overflow-x-hidden px-10 py-6">
        <div className="flex justify-center">{children}</div>
      </main>
    </div>
  );
}
