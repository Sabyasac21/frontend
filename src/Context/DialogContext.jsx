import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import "../Components/Dialog/Dialog.css";

const DialogContext = createContext(null);

export const useDialog = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }

  return context;
};

const initialDialogState = {
  open: false,
  title: "",
  message: "",
  confirmLabel: "OK",
  cancelLabel: "Cancel",
  tone: "default",
  variant: "alert",
};

export const DialogProvider = ({ children }) => {
  const resolverRef = useRef(null);
  const [dialog, setDialog] = useState(initialDialogState);

  const closeDialog = (result = false) => {
    setDialog((prev) => ({ ...prev, open: false }));
    if (resolverRef.current) {
      resolverRef.current(result);
      resolverRef.current = null;
    }
  };

  const showAlert = ({ title, message, confirmLabel = "Understood", tone = "default" }) =>
    new Promise((resolve) => {
      resolverRef.current = resolve;
      setDialog({
        open: true,
        title,
        message,
        confirmLabel,
        cancelLabel: "",
        tone,
        variant: "alert",
      });
    });

  const showConfirm = ({
    title,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    tone = "default",
  }) =>
    new Promise((resolve) => {
      resolverRef.current = resolve;
      setDialog({
        open: true,
        title,
        message,
        confirmLabel,
        cancelLabel,
        tone,
        variant: "confirm",
      });
    });

  const value = useMemo(
    () => ({
      showAlert,
      showConfirm,
    }),
    []
  );

  return (
    <DialogContext.Provider value={value}>
      {children}
      {dialog.open ? (
        <div className="dialog-backdrop" role="presentation">
          <div className={`dialog-card ${dialog.tone}`}>
            <div className="dialog-copy">
              <span className="dialog-kicker">
                {dialog.variant === "confirm" ? "Please confirm" : "Notice"}
              </span>
              <h3>{dialog.title}</h3>
              <p>{dialog.message}</p>
            </div>
            <div className="dialog-actions">
              {dialog.variant === "confirm" ? (
                <button
                  type="button"
                  className="dialog-button secondary"
                  onClick={() => closeDialog(false)}
                >
                  {dialog.cancelLabel}
                </button>
              ) : null}
              <button
                type="button"
                className="dialog-button primary"
                onClick={() => closeDialog(true)}
              >
                {dialog.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </DialogContext.Provider>
  );
};
