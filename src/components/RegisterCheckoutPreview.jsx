import { useEffect, useState } from 'react';

function RegisterCheckoutPreview({ isOpen, onClose, onPay }) {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormValues({ name: '', email: '', phone: '' });
      setErrors({ name: '', email: '', phone: '' });
    }
  }, [isOpen]);

  const validateField = (fieldName, value) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }

    if (fieldName === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(trimmed)) {
        return 'Please enter a valid email';
      }
    }

    if (fieldName === 'phone') {
      const phonePattern = /^[6-9]\d{9}$/;
      if (!phonePattern.test(trimmed)) {
        return 'Please enter a valid 10-digit phone';
      }
    }

    return '';
  };

  const handleFieldChange = (fieldName, value) => {
    setFormValues((previous) => ({
      ...previous,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((previous) => ({
        ...previous,
        [fieldName]: validateField(fieldName, value),
      }));
    }
  };

  const handleFieldBlur = (fieldName) => {
    setErrors((previous) => ({
      ...previous,
      [fieldName]: validateField(fieldName, formValues[fieldName]),
    }));
  };

  const handlePayClick = () => {
    const nextErrors = {
      name: validateField('name', formValues.name),
      email: validateField('email', formValues.email),
      phone: validateField('phone', formValues.phone),
    };

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      return;
    }

    onPay();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="checkout-preview-backdrop" onClick={onClose}>
      <div
        className="checkout-preview-shell"
        role="dialog"
        aria-modal="true"
        aria-label="Payment details preview"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="checkout-preview-close"
          onClick={onClose}
          aria-label="Close payment preview"
        >
          X
        </button>

        <section className="checkout-preview-left">
          <div className="checkout-company-row">
            <span className="checkout-company-badge" aria-hidden="true">TradeX</span>
            <strong>Harmonic Patterns</strong>
          </div>

          <h3>Financial Freedom Webinar</h3>
          <span className="checkout-preview-line" aria-hidden="true" />

          <p>
            Webinar on Sunday at 10:00 AM IST : Achieve Financial Freedom through proven strategies.
            Learn directly from Shiv Singh.
          </p>

          <div className="checkout-preview-contact">
            <p><strong>Contact Us:</strong></p>
            <p>shivmangal.sm@gmail.com</p>
            <p>WhatsApp-9962401437</p>
          </div>

          <p className="checkout-preview-terms-title"><strong>Terms and Conditions:</strong></p>
          <p className="checkout-preview-terms-text">
            You agree to share information entered on this page with Harmonic Patterns 
            and Razorpay, adhering to applicable laws.
          </p>
        </section>

        <section className="checkout-preview-right">
          <h4>Payment Details - Financial Freedom Webinar</h4>
          <span className="checkout-preview-line" aria-hidden="true" />

          <div className="checkout-form-row">
            <label>Amount</label>
            <input type="text" value="Rs. 97.00" readOnly />
          </div>

          <div className="checkout-form-row">
            <label>Name</label>
            <div className="checkout-input-wrap">
              <input
                type="text"
                placeholder="Name"
                value={formValues.name}
                onChange={(event) => handleFieldChange('name', event.target.value)}
                onBlur={() => handleFieldBlur('name')}
                className={errors.name ? 'input-invalid' : ''}
              />
              {errors.name && <p className="checkout-field-error">{errors.name}</p>}
            </div>
          </div>

          <div className="checkout-form-row">
            <label>Email</label>
            <div className="checkout-input-wrap">
              <input
                type="email"
                placeholder="Email"
                value={formValues.email}
                onChange={(event) => handleFieldChange('email', event.target.value)}
                onBlur={() => handleFieldBlur('email')}
                className={errors.email ? 'input-invalid' : ''}
              />
              {errors.email && <p className="checkout-field-error">{errors.email}</p>}
            </div>
          </div>

          <div className="checkout-form-row">
            <label>Phone</label>
            <div className="checkout-input-wrap">
              <input
                type="tel"
                placeholder="Phone"
                value={formValues.phone}
                onChange={(event) => handleFieldChange('phone', event.target.value)}
                onBlur={() => handleFieldBlur('phone')}
                className={errors.phone ? 'input-invalid' : ''}
              />
              {errors.phone && <p className="checkout-field-error">{errors.phone}</p>}
            </div>
          </div>

          <div className="checkout-footer">
            <span className="checkout-cards">UPI</span>
            <button type="button" className="checkout-pay-btn" onClick={handlePayClick}>
              Pay Rs. 97.00
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RegisterCheckoutPreview;
