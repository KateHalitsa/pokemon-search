import { useEffect, useRef, type ReactNode } from "react";
import "./modalStyles.css";
import ReactPortal from "../ReactPortal";
interface Props {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

function Modal({ children, isOpen, handleClose }: Props) {
     const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);
useEffect(() => {
        if (!isOpen) return;

        previousActiveElement.current =
            document.activeElement as HTMLElement;

        modalRef.current?.focus();
    

    return () => {
        previousActiveElement.current?.focus();
    };
}, [isOpen]);
    useEffect(() => {
    if (!isOpen) return;

    const closeOnEscapeKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            handleClose();
        }
    };

    document.addEventListener("keydown", closeOnEscapeKey);

    return () => {
        document.removeEventListener("keydown", closeOnEscapeKey);
    };
}, [isOpen, handleClose]);
  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div className="overlay" onClick={handleClose}>

    <div className="modal"
    ref={modalRef}  
    tabIndex={-1} 
    role="dialog"
    onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="close-btn" >
        Close
      </button>
      <div className="modal-content">{children}</div>
    </div>
    </div>
    </ReactPortal>
  );
}
export default Modal;