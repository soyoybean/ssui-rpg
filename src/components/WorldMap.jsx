import { useState, useRef, useEffect } from "react";

export default function WorldMap({ onEnterLocation, setIsHoveringInteractive }) {
  const containerRef = useRef(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  // Load actual dimensions of the rendered image
  const updateSize = () => {
    if (containerRef.current) {
      const img = containerRef.current.querySelector("img");
      if (img) {
        setImgSize({
          width: img.clientWidth,
          height: img.clientHeight,
        });
      }
    }
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Hotspot definitions in ORIGINAL image coordinates
  // main.png resolution: 2000 x 1125 (example — you can give me the exact resolution if needed)
  const hotspots = [
    {
      id: "fionna",
      x: 1050, 
      y: 550,
      w: 450,
      h: 300,
    },
    {
      id: "beanie",
      x: 450,
      y: 400,
      w: 350,
      h: 350,
    },
  ];

  // ORIGINAL SIZE OF main.png (replace these with the real dimensions)
  const ORIGINAL_WIDTH = 2000;
  const ORIGINAL_HEIGHT = 1125;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        overflow: "hidden",
      }}
    >
      {/* The actual map image */}
      <img
        src="/assets/main.png"
        alt="World Map"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
          userSelect: "none",
          pointerEvents: "none",
        }}
        onLoad={updateSize}
      />

      {/* Hotspots, scaled to image */}
      {imgSize.width > 0 &&
        hotspots.map((spot) => {
          const scaleX = imgSize.width / ORIGINAL_WIDTH;
          const scaleY = imgSize.height / ORIGINAL_HEIGHT;

          return (
            <div
  key={spot.id}
  onClick={() => onEnterLocation(spot.id)}
  onMouseEnter={() => setIsHoveringInteractive(true)}
  onMouseLeave={() => setIsHoveringInteractive(false)}
  style={{
    position: "absolute",
    left: `calc(50% - ${imgSize.width / 2}px + ${spot.x * scaleX}px)`,
    top: `calc(50% - ${imgSize.height / 2}px + ${spot.y * scaleY}px)`,
    width: `${spot.w * scaleX}px`,
    height: `${spot.h * scaleY}px`,
    background: "transparent", // since you're using image icons again
    cursor: "none",
  }}
>
   <img src={`/assets/${spot.id}_house.png`} style={{width:"100%",height:"100%",pointerEvents:"none"}}/>
</div>

          );
        })}
    </div>
  );
}
