import { Suspense, lazy, useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, Route, Routes, useLocation, useOutletContext } from 'react-router-dom';
import shivImage from './assets/images/shiv.jpg';
import HarmonicPatterns from './components/HarmonicPatterns.jsx';
import YoutubeCarousel from './components/YoutubeCarousel.jsx';
import ContactSection from './components/ContactSection.jsx';
import PaymentModal from './components/PaymentModal.jsx';
import RegisterCheckoutPreview from './components/RegisterCheckoutPreview.jsx';
import { navItems } from './data/navItems.js';
import { feedbackImages } from './data/feedbackImages.js';
import { coursePlans } from './data/coursePlans.js';
import { recommendations } from './data/recommendations.js';
import { formatWebinarDate } from './utils/nextSunday.js';

const PerformanceWorkbookPage = lazy(() => import('./components/PerformanceWorkbookPage.jsx'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
}

function SiteLayout() {
  const [isRegisterPreviewOpen, setIsRegisterPreviewOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleOpenRegisterPreview = () => {
    setIsRegisterPreviewOpen(true);
  };

  const handleCloseRegisterPreview = () => {
    setIsRegisterPreviewOpen(false);
  };

  const handleOpenPaymentModal = (planName = 'Financial Freedom Webinar') => {
    setSelectedPlan(planName);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedPlan('');
  };

  return (
    <div className="page-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-inner" />
          </span>
          <span className="brand-text">TradeX</span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && <span className="nav-dot" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </header>

      <Outlet context={{ openPaymentModal: handleOpenPaymentModal }} />

      <button
        type="button"
        className="register-btn-fixed"
        onClick={handleOpenRegisterPreview}
      >
        <span className="register-btn-main">Register NOW &mdash; <s>&#8377;5000</s> &#8377;97</span>
        <span className="register-btn-sub">{formatWebinarDate()}</span>
      </button>

      <RegisterCheckoutPreview
        isOpen={isRegisterPreviewOpen}
        onClose={handleCloseRegisterPreview}
        onPay={() => {
          handleCloseRegisterPreview();
          handleOpenPaymentModal('Financial Freedom Webinar');
        }}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        planName={selectedPlan}
      />

      <footer className="site-footer">
        <div>
          <h3>Ready to trade smarter?</h3>
          <p>Connect for portfolio strategy, active trading design, and digital finance products.</p>
        </div>
        <div className="footer-links">
          <span>Dream</span>
          <span className="footer-separator" aria-hidden="true">•</span>
          <span>Believe</span>
          <span className="footer-separator" aria-hidden="true">•</span>
          <span>Achieve</span>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <main className="hero-section">
        <section className="hero-copy">
          <div className="eyebrow">Market Intelligence</div>
          <h1>Trader Perspective for Modern Markets</h1>
          <p>
            Strategy-led performance design for active traders and finance professionals.
            Build confidence with clean data, clear navigation, and bold market storytelling.
          </p>
          <div className="hero-actions">
            <Link className="primary-btn" to="/view-my-work">View My Work</Link>
            <Link className="secondary-btn" to="/contact">Get In Touch</Link>
          </div>
        </section>

        <section className="hero-image-card">
          <div className="profile-ring">
            <div className="profile-circle">
              <img src={shivImage} alt="Shiv Singh" className="profile-image" />
            </div>
          </div>
          <div className="stats-panel">
            <div className="stat-card">
              <span>50+</span>
              <p>Trades Guided</p>
            </div>
            <div className="stat-card">
              <span>15+</span>
              <p>Years Market Experience</p>
            </div>
            <div className="stat-card">
              <span>10+</span>
              <p>Insights Published</p>
            </div>
          </div>
        </section>
      </main>

      <AboutSection />
    </>
  );
}

function AboutSection() {
  return (
    <section className="featured-section about-section">
      <div className="section-heading about-heading">
        <p className="eyebrow">Who I Am</p>
        <h2>About Shiv Singh</h2>
      </div>

      <div className="about-intro">
        <p>
          Trading is not about random calls or prediction. It is about preparation, structure, risk control,
          and disciplined execution. I focus on helping traders read the market clearly and act only when the
          setup, logic, and reward profile are aligned.
        </p>
      </div>

      <div className="cards-grid about-grid">
        <article className="feature-card about-card">
          <h3>Trading Philosophy</h3>
          <p>
            I believe in disciplined, data-driven trading with a strong focus on risk management and market
            structure. My approach combines technical analysis, harmonic patterns, volume shockers, and
            supply-demand zones to identify high-probability trading opportunities. I focus on preserving
            capital first, managing position sizing carefully, and executing only high-conviction trades with
            clear risk-reward setups.
          </p>
        </article>

        <article className="feature-card about-card">
          <h3>Market Expertise</h3>
          <p>
            I work across equities, derivatives, and swing trading setups with a practical focus on how real
            traders can improve decision-making. My analysis is rooted in chart structure, momentum, volume,
            and context, not noise. The goal is to simplify complex market behavior into repeatable frameworks
            that traders can actually apply with confidence.
          </p>
        </article>

        <article className="feature-card about-card">
          <h3>What I Teach</h3>
          <p>
            My learning modules cover price action, harmonic patterns, hedging, and execution planning from
            basic to advanced levels. I emphasize practical understanding over theory-heavy content so traders
            can build systems they trust. Every framework is designed to improve clarity, discipline, and
            consistency in live markets.
          </p>
        </article>

        <article className="feature-card about-card">
          <h3>Mission</h3>
          <p>
            Trading is not about prediction. It is about preparation, discipline, and execution. My mission is
            to help traders move from emotional decision-making to a rule-based trading system that creates
            consistency and confidence in the market.
          </p>
        </article>
      </div>
    </section>
  );
}

function RecChartCard({ item }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <a href={item.url} target="_blank" rel="noreferrer" className="rec-chart-card">
      <div className="rec-chart-img">
        {!imgFailed ? (
          <img
            src={item.thumb}
            alt={item.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="rec-chart-placeholder">
            <span className="rec-chart-placeholder-letter">{item.name[0].toUpperCase()}</span>
            <span className="rec-chart-placeholder-label">{item.name}</span>
            <span className="rec-chart-placeholder-sub">View on TradingView ↗</span>
          </div>
        )}
      </div>
      <div className="rec-chart-info">
        <span className="rec-chart-name">#{item.name}</span>
      </div>
    </a>
  );
}

function RecommendationsPage() {
  return (
    <section className="recommendation-section">
      <div className="section-heading">
        <p className="eyebrow">TradingView Picks</p>
        <h2>Recommendations</h2>
      </div>

      <div className="recommendation-data-grid-wrap">
        <table className="recommendation-data-grid">
          <thead>
            <tr>
              <th>Name</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((item, index) => (
              <tr key={`${item.name}-${index}`}>
                <td>{item.name}</td>
                <td>
                  <a href={item.url} target="_blank" rel="noreferrer" title={item.url}>
                    {item.url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TestimonialsPage() {
  return (
    <section className="feedback-section">
      <div className="section-heading">
        <p className="eyebrow">Social Feedback</p>
        <h2>Testimonials</h2>
      </div>

      <div className="feedback-masonry">
        {feedbackImages.map((item) => (
          <div key={item.alt} className="feedback-image-card">
            <img src={item.src} alt={item.alt} />
          </div>
        ))}
      </div>
    </section>
  );
}

function YoutubePage() {
  return (
    <section className="featured-section">
      <div className="section-heading">
        <p className="eyebrow">Video Library</p>
        <h2>YouTube Insights</h2>
      </div>
      <div style={{ marginTop: '24px' }}>
        <YoutubeCarousel />
      </div>
    </section>
  );
}

function CoursesPage() {
  const { openPaymentModal } = useOutletContext();

  return (
    <>
      <section className="featured-section">
        <div className="section-heading">
          <p className="eyebrow">Learning Path</p>
          <h2>Course and Trading</h2>
        </div>

        <div className="recommendation-grid course-grid">
          {coursePlans.map((plan) => (
            <article key={plan.name} className="recommendation-card course-card">
              <div className="card-symbol">
                <div className="symbol-ring">{plan.name.slice(0, 1)}</div>
                <div>
                  <p>{plan.name}</p>
                  <span>{plan.discount}</span>
                </div>
              </div>

              <div className="price-row">
                <strong>{plan.price}</strong>
                <span className="price-change positive">{plan.discount}</span>
              </div>

              <div className="chart-meta">
                <span style={{ textDecoration: 'line-through' }}>{plan.oldPrice}</span>
                {plan.curriculum ? (
                  <span>Full Syllabus</span>
                ) : (
                  <span>{plan.features.length}+ lessons</span>
                )}
              </div>

              {plan.curriculum ? (
                <div className="course-curriculum">
                  {plan.curriculum.map((section) => (
                    <div key={section.heading} className="course-curriculum-section">
                      <p className="course-curriculum-heading">{section.heading}</p>
                      {section.items && (
                        <ul className="course-feature-list">
                          {section.items.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      )}
                      {section.groups && section.groups.map((group) => (
                        <div key={group.label} className="course-curriculum-group">
                          <p className="course-curriculum-group-label">{group.label}</p>
                          <ul className="course-feature-list course-feature-list--sub">
                            {group.items.map((item) => <li key={item}>{item}</li>)}
                          </ul>
                        </div>
                      ))}
                      {section.extras && (
                        <ul className="course-feature-list course-curriculum-extras">
                          {section.extras.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="course-feature-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              )}

              <div className="course-cta-row">
                <button
                  type="button"
                  className="primary-btn"
                  style={{ width: '100%' }}
                  onClick={() => openPaymentModal(plan.name)}
                >
                  Enroll Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="harmonic-patterns" element={<HarmonicPatterns />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="recommendations" element={<RecommendationsPage />} />
          <Route
            path="view-my-work"
            element={(
              <Suspense fallback={<section className="performance-page"><p className="performance-status">Loading workbook page...</p></section>}>
                <PerformanceWorkbookPage />
              </Suspense>
            )}
          />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="youtube" element={<YoutubePage />} />
          <Route path="contact" element={<ContactSection />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;