export default function CCModal({
  open,
  title,
  onClose,
  children,
  centered = false,
  wide = false,
  showHeader = true,
}) {
  if (!open) return null;

  return (
    <div
      className={`cc-modal-overlay${centered ? " cc-modal-overlay--center" : ""}`}
      role="dialog"
      aria-modal="true"
      onMouseDown={onClose}
    >
      <div
        className={`cc-modal${wide ? " cc-modal--wide" : ""}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {showHeader ? (
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
        ) : (
          <button
            className="cc-modal-close"
            type="button"
            aria-label="Close"
            onClick={onClose}
            style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}
          >
            ✕
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
