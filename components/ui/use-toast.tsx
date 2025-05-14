// use-toast.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

type ToastOptions = {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // in milliseconds
};

type ToastContextType = {
  showToast: (options: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const showToast = (options: ToastOptions) => {
    setToasts((prevToasts) => [...prevToasts, options]);

    if (options.duration) {
      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast !== options)
        );
      }, options.duration);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts }: { toasts: ToastOptions[] }) => {
  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
      {toasts.map((toast, index) => (
        <div
          key={index}
          style={{
            backgroundColor: toast.type === 'success' ? 'green' : toast.type === 'error' ? 'red' : 'blue',
            color: 'white',
            padding: '10px',
            margin: '5px 0',
            borderRadius: '5px',
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};
