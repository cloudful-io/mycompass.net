import Header from './components/Header'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  console.log("Rendering PublicLayout with children:", children)
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}
