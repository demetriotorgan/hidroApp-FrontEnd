import "./LoadingModal.css";

function LoadingModal({ isOpen, message = "Processando..." }) {

  if (!isOpen) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-box">

        <div className="spinner"></div>

        <p>{message}</p>

      </div>
    </div>
  );
}

export default LoadingModal;
