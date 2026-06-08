import { useLayoutEffect, useMemo, type ReactNode } from "react";
import { createPortal } from "react-dom";
import createWrapperAndAppendToBody from "../wrappers/createWrapperAndAppendToBody";

interface ReactPortalProps {
  children: ReactNode;
  wrapperId: string;
}

function ReactPortal({ children, wrapperId }: ReactPortalProps) {
  const element = useMemo(() => {
    let wrapper = document.getElementById(wrapperId);

    if (!wrapper) {
      wrapper = createWrapperAndAppendToBody(wrapperId);
    }

    return wrapper;
  }, [wrapperId]);

  useLayoutEffect(() => {
    return () => {
      if (element.childElementCount === 0) {
        element.parentNode?.removeChild(element);
      }
    };
  }, [element]);

  return createPortal(children, element);
}

export default ReactPortal;