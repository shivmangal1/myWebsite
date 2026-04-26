import { useState } from 'react';

const contactEmail = 'shivmangal.sm@gmail.com';

function ContactSection() {
  const [formValues, setFormValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedValues = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      subject: formValues.subject.trim(),
      message: formValues.message.trim(),
    };

    if (!trimmedValues.name || !trimmedValues.email || !trimmedValues.subject || !trimmedValues.message) {
      setFormStatus('Please fill in all fields before sending your message.');
      return;
    }

    const emailSubject = encodeURIComponent(trimmedValues.subject);
    const rawEmailBody =
      `Name: ${trimmedValues.name}\nEmail: ${trimmedValues.email}\n\nMessage:\n${trimmedValues.message}`;
    const emailBody = encodeURIComponent(rawEmailBody);
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}&su=${emailSubject}&body=${emailBody}`;
    const mailtoUrl = `mailto:${contactEmail}?subject=${emailSubject}&body=${emailBody}`;
    const composeWindow = window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');

    if (!composeWindow) {
      window.location.href = mailtoUrl;
      setFormStatus('Opening your default email client with your message.');
    } else {
      setFormStatus('Opening Gmail compose with your message.');
    }

    setFormValues({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="contact-section" id="get-in-touch">
      <div className="contact-header">
        <div className="contact-title">
          <h1>Get In Touch</h1>
          <div className="contact-divider" />
          <p>Let's discuss opportunities, collaborations, or just connect</p>
        </div>
      </div>
      <div className="contact-grid">
        <div className="contact-card form-card">
          <h3>Send a Message</h3>
          <p>Fill out the form below and I'll get back to you as soon as possible.</p>
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formValues.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formValues.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Subject
              <input
                type="text"
                name="subject"
                placeholder="What is this about?"
                value={formValues.subject}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Message
              <textarea
                rows="6"
                name="message"
                placeholder="Your message..."
                value={formValues.message}
                onChange={handleInputChange}
                required
              />
            </label>
            {formStatus && <p className="form-status">{formStatus}</p>}
            <button type="submit" className="primary-btn send-button">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-card info-card">
          <h3>Contact Information</h3>
          <p>Prefer to reach out directly? Use any of the contact methods below.</p>
          <div className="info-list">
            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div>
                <strong>Email</strong>
                <p>
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">🔗</div>
              <div>
                <strong>LinkedIn</strong>
                <p>
                  <a href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer">
                    linkedin.com/feed
                  </a>
                </p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">🐦</div>
              <div>
                <strong>X</strong>
                <p>
                  <a href="https://x.com/sm_harmonic" target="_blank" rel="noreferrer">
                    x.com/sm_harmonic
                  </a>
                </p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">▶️</div>
              <div>
                <strong>YouTube</strong>
                <p>
                  <a href="https://www.youtube.com/@smsingh369" target="_blank" rel="noreferrer">
                    youtube.com/@smsingh369
                  </a>
                </p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <strong>Location</strong>
                <p>Banglore, Karnataka</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
