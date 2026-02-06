export default function SubdomainLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { subdomain: string };
}) {
  return (
    <div className="subdomain-layout">
      {/* Multi-tenant subdomain-specific components will go here */}
      {children}
    </div>
  );
}
