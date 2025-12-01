import { useEffect, useRef, useState } from "react";

export default function CustomCursor({
  mode = "world",             
  isHoveringInteractive = false
}) {

  // smoothed position
  const [smoothPos, setSmoothPos] = useState({ x: -100, y: -100 });

  // target position
  const targetPos = useRef({ x: -100, y: -100 });

  // rotation angle (world only)
  const [rotation, setRotation] = useState(0);

  // footprints
  const [prints, setPrints] = useState([]);
  const lastPrintRef = useRef(0);
  const pawSideRef = useRef("left");

  // click state
  const [isClicking, setIsClicking] = useState(false);

  // WORLD MODE SPRITES
  const spriteIdle = "/assets/cursor.png";
  const spriteHover = "/assets/cursor_hover.png";
  const spriteClick = "/assets/cursor_click.png";

  // DIALOGUE MODE SPRITE
  const spriteDialogue = "/assets/paw.png";

  // PICK SPRITE BASED ON MODE
  let sprite = spriteIdle;

  if (mode === "dialogue") {
    sprite = spriteDialogue;
  } else {
    if (isHoveringInteractive) sprite = spriteHover;
    if (isClicking) sprite = spriteClick;
  }

  // Cat sprite faces DOWN → rotate -90° to face movement direction
  const rotationOffset = -90;

  // === HANDLE MOUSE MOVEMENT ===
  useEffect(() => {
    const handleMove = (e) => {
      const { clientX, clientY } = e;

      targetPos.current = { x: clientX, y: clientY };

      // DIALOGUE MODE → no rotation, no footprints
      if (mode === "dialogue") return;

      const dx = clientX - smoothPos.x;
      const dy = clientY - smoothPos.y;

      // movement angle
      if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        setRotation(angle + rotationOffset);
      }

      // FOOTPRINT SPAWNING (world mode only)
      const now = Date.now();
      if (now - lastPrintRef.current > 40) {
        lastPrintRef.current = now;

        const dist = 22;
        const angleRad = (rotation - rotationOffset) * (Math.PI / 180);

        // point behind cursor
        const tailX = smoothPos.x - Math.cos(angleRad) * dist;
        const tailY = smoothPos.y - Math.sin(angleRad) * dist;


        const sideOffset = pawSideRef.current === "left" ? -6 : 6;
        pawSideRef.current = pawSideRef.current === "left" ? "right" : "left";

        const perpAngle = angleRad + Math.PI / 2;
        const pawX = tailX + Math.cos(perpAngle) * sideOffset;
        const pawY = tailY + Math.sin(perpAngle) * sideOffset;

        setPrints((prev) => [...prev, { id: now, x: pawX, y: pawY }]);
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [smoothPos, rotation, mode]);

  // === SMOOTH FOLLOWING ===
  useEffect(() => {
    let anim;
    const smooth = () => {
      setSmoothPos((prev) => {
        const lerp = mode === "dialogue" ? 1 : 0.22; // instant in dialogue
        return {
          x: prev.x + (targetPos.current.x - prev.x) * lerp,
          y: prev.y + (targetPos.current.y - prev.y) * lerp,
        };
      });
      anim = requestAnimationFrame(smooth);
    };
    anim = requestAnimationFrame(smooth);
    return () => cancelAnimationFrame(anim);
  }, [mode]);

  // === FOOTPRINT FADE OUT ===
  useEffect(() => {
    const interval = setInterval(() => {
      if (mode === "dialogue") {
        // remove ALL prints when entering dialogue
        setPrints([]);
        return;
      }

      const now = Date.now();
      const lifespan = 600;

      setPrints((prev) => prev.filter((fp) => now - fp.id < lifespan));
    }, 60);

    return () => clearInterval(interval);
  }, [mode]);

  // === CLICK STATE ===
  useEffect(() => {
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    if (mode === "dialogue") {
      setIsClicking(false);
      return; // disable click state in dialogue
    }

    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [mode]);

  return (
    <>
      {/* FOOTPRINTS — WORLD ONLY */}
      {mode === "world" &&
        prints.map((p) => {
          const now = Date.now();
          const age = now - p.id;
          const lifespan = 600;
          const opacity = Math.max(0, 1 - age / lifespan);

          return (
            <div
              key={p.id}
              style={{
                position: "fixed",
                left: p.x,
                top: p.y,
                width: "10px",
                height: "12px",
                background: `rgba(0,0,0,${0.25 * opacity})`,
                borderRadius: "50%",
                transform: "translate(-50%, -50%) rotate(25deg)",
                pointerEvents: "none",
                zIndex: 2000,
              }}
            />
          );
        })}

      {/* CURSOR SPRITE */}
      <img
        src={sprite}
        alt=""
        style={{
          position: "fixed",
          left: smoothPos.x,
          top: smoothPos.y,
          width: mode === "dialogue" ? "80px" : "32px", // smaller in dialogue
          height: "auto",
          transform:
            mode === "dialogue"
              ? "translate(-50%, -50%)"
              : `translate(-50%, -50%) rotate(${rotation}deg)`,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
}
