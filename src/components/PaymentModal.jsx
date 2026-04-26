import payImage from '../assets/images/pay.png';

const paymentEmail = 'shivmangal.sm@gmail.com';

function PaymentModal({ isOpen, onClose, planName }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="payment-modal-backdrop" onClick={onClose}>
      <div
        className="payment-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Payment details"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="payment-close-button" onClick={onClose} aria-label="Close payment modal">
          X
        </button>
        <h3>Complete Enrollment</h3>
        {planName && <p className="payment-selected-plan">Selected Course: {planName}</p>}
        <img src={payImage} alt="Payment QR code" className="payment-image" />
        <p className="payment-help-text">
          Pay and send the mail at <a href={`mailto:${paymentEmail}`}>{paymentEmail}</a>
        </p>
      </div>
    </div>
  );
}

export default PaymentModal;
