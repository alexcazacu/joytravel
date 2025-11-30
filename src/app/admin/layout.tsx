import AdminNavbar from '@/components/nav/AdminNavbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNavbar />
      <main>{children}</main>
    </>
  );
}
