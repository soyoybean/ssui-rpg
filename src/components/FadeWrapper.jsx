import { useEffect, useState } from "react";

export default function FadeWrapper({ mode, children }) {
  const [opacity, setOpacity] = useState(1);
  const [renderedChildren, setRenderedChildren] = useState(children);

  // When mode changes → fade out, swap content, fade in
  useEffect(() => {
    // Step 1: Fade out
    setOpacity(0);

    // Step 2: After fade-out ends, change the screen
    const timeout = setTimeout(() => {
      setRenderedChildren(children);

      // Step 3: Fade in
      requestAnimationFrame(() => {
        setOpacity(1);
      });
    }, 250); // must match CSS transition length

    return () => clearTimeout(timeout);
  }, [mode]);


  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        opacity,
        transition: "opacity 250ms ease",
      }}
    >
      {renderedChildren}
    </div>
  );
}
