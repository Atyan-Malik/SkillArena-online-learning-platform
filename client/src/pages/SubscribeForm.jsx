import { CheckCircle, X } from "lucide-react";
import "../styles/SubscriptionModal.css";

const SubscriptionModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <CheckCircle size={60} className="success-icon" />
        <h2>Subscription Successful</h2>
        <p>You have successfully subscribed to this course !</p>
      </div>
    </div>
  );
};

export default SubscriptionModal;
