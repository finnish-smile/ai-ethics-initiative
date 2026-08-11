import newsfeed from '../data/newsfeed.json'

export default function Newsfeed() {
  return (
    <div className="page-wide">
      <h1>Newsfeed</h1>
      <p className="body-text muted">{newsfeed.meta.note}</p>

      <div className="newsfeed-list">
        {newsfeed.items.map((item) => (
          <a className="newsfeed-item" href={item.url} key={item.title}>
            <div className="newsfeed-meta">
              <span className="eyebrow">{item.category}</span>
              <span className="newsfeed-date">{item.date}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <div className="newsfeed-source">{item.source}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
