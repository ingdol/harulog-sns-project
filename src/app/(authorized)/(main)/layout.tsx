export default async function MainLayout({
  children,
  search,
}: Readonly<{
  children: React.ReactNode;
  search: React.ReactNode;
}>) {
  return (
    <div className="flex w-full gap-10 max-w-screen-lg">
      <div className="flex-1">
        <div className="flex flex-col gap-6 h-full">{children}</div>
      </div>
      <div className="hidden lg:block w-[300px]">{search}</div>
    </div>
  );
}
