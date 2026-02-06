export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      {/* Admin-specific components will go here */}
      {children}
    </div>
  );
}
