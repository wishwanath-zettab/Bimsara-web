import React, { useEffect } from "react";
import "./ConfirmDialog.css";

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
      <button type="button" className="confirm-dialog__backdrop" aria-label="Cancel action" onClick={onCancel} />
      <div className="confirm-dialog__panel">
        <h3 id="confirm-dialog-title">{title}</h3>
        <p>{message}</p>
        <div className="confirm-dialog__actions">
          <button type="button" className="confirm-dialog__cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="confirm-dialog__confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
