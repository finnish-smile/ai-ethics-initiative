import { Link } from 'react-router-dom'
import PullQuote from './PullQuote.jsx'
import CaseStudyCard from './CaseStudyCard.jsx'
import PrincipleTabs from './PrincipleTabs.jsx'
import HarderThanItLooksToggle from './widgets/HarderThanItLooksToggle.jsx'
import HallucinationSpotter from './widgets/HallucinationSpotter.jsx'
import IntuitionQuiz from './widgets/IntuitionQuiz.jsx'
import ConstitutionBuilder from './widgets/ConstitutionBuilder.jsx'

// Widgets are looked up by name from step data, so the content files stay
// plain data (no JSX) and new widgets just need one line added here.
const WIDGETS = {
  HarderThanItLooksToggle,
  HallucinationSpotter,
  IntuitionQuiz,
  PrincipleTabs,
  ConstitutionBuilder,
}

function isExternal(href) {
  return /^https?:\/\//.test(href)
}

function LinkOutCallout({ title, text, href, cta }) {
  const external = isExternal(href)
  return (
    <div className="ks-callout ks-callout--link-out">
      <p className="ks-callout__title">{title}</p>
      <p>{text}</p>
      {external ? (
        <a className="link-more" href={href} target="_blank" rel="noopener noreferrer">
          {cta}
          <span className="arrow">&rarr;</span>
        </a>
      ) : (
        <Link className="link-more" to={href}>
          {cta}
          <span className="arrow">&rarr;</span>
        </Link>
      )}
    </div>
  )
}

function PlaceholderCallout({ note }) {
  return (
    <div className="ks-callout ks-callout--placeholder">
      <p className="ks-callout__title">Placeholder</p>
      <p>{note}</p>
    </div>
  )
}

export default function StepContent({ blocks }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'text':
            return (
              <p key={i} style={{ whiteSpace: 'pre-line' }}>
                {block.text}
              </p>
            )
          case 'quote':
            return <PullQuote key={i} text={block.text} attribution={block.attribution} />
          case 'case-study':
            return <CaseStudyCard key={i} {...block} />
          case 'callout':
            return block.variant === 'placeholder' ? (
              <PlaceholderCallout key={i} note={block.note} />
            ) : (
              <LinkOutCallout key={i} {...block} />
            )
          case 'widget': {
            const Widget = WIDGETS[block.component]
            if (!Widget) return null
            return <Widget key={i} {...(block.props || {})} />
          }
          default:
            return null
        }
      })}
    </>
  )
}
