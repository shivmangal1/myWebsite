const harmonicPatterns = [
  {
    symbol: 'GARTLEY',
    name: 'Classic Reversal',
    ratio: '0.786 PRZ',
    bias: 'Bullish',
    timeframe: 'XA-AB-BC-CD',
    url: '#',
  },
  {
    symbol: 'BAT',
    name: 'Deep Retracement',
    ratio: '0.886 PRZ',
    bias: 'Bullish',
    timeframe: 'AB=CD Focus',
    url: '#',
  },
  {
    symbol: 'BUTTERFLY',
    name: 'Extension Reversal',
    ratio: '1.272 XA',
    bias: 'Bearish',
    timeframe: 'Expansion Zone',
    url: '#',
  },
  {
    symbol: 'CRAB',
    name: 'Extreme Completion',
    ratio: '1.618 XA',
    bias: 'Bearish',
    timeframe: 'High Volatility',
    url: '#',
  },
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

      <div className="recommendation-grid harmonic-grid">
        {harmonicPatterns.map((pattern) => (
          <article key={pattern.symbol} className="recommendation-card harmonic-card">
            <div className="card-symbol">
              <div className="symbol-ring">{pattern.symbol.slice(0, 1)}</div>
              <div>
                <p>{pattern.symbol}</p>
                <span>{pattern.name}</span>
              </div>
            </div>
            <div className="price-row">
              <strong>{pattern.ratio}</strong>
              <span className={`price-change ${pattern.bias === 'Bullish' ? 'positive' : 'negative'}`}>
                {pattern.bias}
              </span>
            </div>
            <div className="chart-meta">
              <span>{pattern.timeframe}</span>
              <a href={pattern.url}>View Structure</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HarmonicPatterns;
