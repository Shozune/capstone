export default function CCModal({
  open,
  title,
  onClose,
  children,
}) {
  if (!open) return null;

  return (
    <div
      className="cc-modal-overlay"
      role="dialog"
      aria-modal="true"
      onMouseDown={onClose}
    >
      <div
        className="cc-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="cc-modal-header">
          <div className="cc-modal-title">{title}</div>
          <button
            className="cc-modal-close"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

