import harmonic1 from '../assets/images/harmonic/harmonic-1.png';
import harmonic2 from '../assets/images/harmonic/harmonic-2.png';
import harmonic3 from '../assets/images/harmonic/harmonic-3.png';
import harmonic4 from '../assets/images/harmonic/harmonic-4.png';
import harmonic5 from '../assets/images/harmonic/harmonic-5.png';

const harmonicImages = [
  { src: harmonic1, alt: 'AB=CD Harmonic Pattern' },
  { src: harmonic2, alt: 'Reciprocal AB=CD Harmonic Pattern' },
  { src: harmonic3, alt: '5-Point XABCD Harmonic Patterns' },
  { src: harmonic4, alt: 'Potential Reversal Zone — PRZ' },
  { src: harmonic5, alt: '5-0 Harmonic Pattern' },
];

const fibonacciTopics = [
  'Introduction to Fibonacci Series',
  'Fibonacci Ratio',
  'Derived Ratio',
  'How to plot Fibonacci Lines on a chart',
  'Fibonacci Retracement and Extension',
];

const fourPointHarmonics = ['AB=CD Harmonic Pattern', 'Reciprocal AB=CD Pattern'];

const fivePointHarmonics = [
  'BAT Harmonic Pattern',
  'GARTLEY Harmonic Pattern',
  'BUTTERFLY Harmonic Pattern',
  'CRAB Harmonic Pattern',
  'CYPHER Harmonic Pattern',
  'SHARK Harmonic Pattern',
];

const riskAndExecutionTopics = [
  'Understanding the Potential Reversal Zone (PRZ)',
  'Pattern Failure Protection',
];

function HarmonicPatterns() {
  return (
    <section className="featured-section harmonic-section" id="harmonic-patterns">
      <div className="section-heading harmonic-heading">
        <p className="eyebrow">Pattern Intelligence</p>
        <h2>Harmonic Patterns, Simplified</h2>
      </div>

      <div className="harmonic-intro">
        <p>
          Harmonic trading converts market swings into measurable geometry using Fibonacci ratios.
          Instead of guessing reversals, you wait for a structured pattern to complete inside a
          high-probability zone and execute with predefined risk.
        </p>
      </div>

      <div className="harmonic-curriculum">
        <article className="harmonic-syllabus-card">
          <h3>Introduction to Fibonacci</h3>
          <ul>
            {fibonacciTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </article>

        <article className="harmonic-syllabus-card">
          <h3>Harmonic Patterns</h3>

          <div className="harmonic-subgroup">
            <h4>1. 4-Point Harmonics</h4>
            <ul>
              {fourPointHarmonics.map((pattern) => (
                <li key={pattern}>{pattern}</li>
              ))}
            </ul>
          </div>

          <div className="harmonic-subgroup">
            <h4>2. 5-Point Harmonics (XABCD Pattern)</h4>
            <ul>
              {fivePointHarmonics.map((pattern) => (
                <li key={pattern}>{pattern}</li>
              ))}
            </ul>
          </div>

          <ul className="harmonic-risk-list">
            {riskAndExecutionTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="harmonic-image-grid">
        {harmonicImages.map((img) => (
          <div key={img.alt} className="harmonic-image-card">
            <img src={img.src} alt={img.alt} />
            <p className="harmonic-image-label">{img.alt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HarmonicPatterns;
