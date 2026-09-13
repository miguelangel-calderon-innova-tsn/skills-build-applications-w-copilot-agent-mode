export function CollectionPage({ children, eyebrow, intro, title }) {
  return <section className="collection-page"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="lead-copy">{intro}</p><div className="collection-content">{children}</div></section>
}