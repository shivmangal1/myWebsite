import { useState } from 'react';
import { youtubeVideos } from '../data/youtubeVideos.js';

function YoutubeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? youtubeVideos.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === youtubeVideos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const visibleVideos = [
    youtubeVideos[currentIndex],
    youtubeVideos[(currentIndex + 1) % youtubeVideos.length],
    youtubeVideos[(currentIndex + 2) % youtubeVideos.length],
  ];

  return (
    <div className="carousel-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
        <button
          onClick={goToPrev}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#1f755d',
            padding: '8px',
          }}
        >
          ‹
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            width: '100%',
            maxWidth: '1200px',
          }}
        >
          {visibleVideos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              <article className="feedback-card" style={{ height: '100%', display: 'grid' }}>
                <img
                  src={`//img.youtube.com/vi/${video.id}/0.jpg`}
                  alt={video.title}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    marginBottom: '12px',
                    objectFit: 'cover',
                    aspectRatio: '16 / 9',
                  }}
                />
                <h3 style={{ margin: '0', fontSize: '1.1rem', fontWeight: '700' }}>
                  {video.title}
                </h3>
              </article>
            </a>
          ))}
        </div>

        <button
          onClick={goToNext}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#1f755d',
            padding: '8px',
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default YoutubeCarousel;
