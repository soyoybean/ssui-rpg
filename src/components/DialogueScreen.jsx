import { useState, useEffect } from "react";

export default function DialogueScreen({ npc, lines, onExit }) {
  const [index, setIndex] = useState(0);

  // typewriter state
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  const currentLine = lines[index];

  // Reset typewriter when line changes
  useEffect(() => {
    setDisplayText("");
    setCharIndex(0);
    setIsTyping(true);
  }, [index]);

  // Typewriter effect
  useEffect(() => {
    if (!isTyping) return;

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentLine[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 22); // typing speed
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [charIndex, isTyping, currentLine]);

  // Click behavior
  const advance = () => {
    if (isTyping) {
      // Finish text instantly
      setDisplayText(currentLine);
      setIsTyping(false);
      setCharIndex(currentLine.length);
    } else {
      // Next line or exit
      if (index < lines.length - 1) {
        setIndex(index + 1);
      } else {
        onExit();
      }
    }
  };

  const npcPortrait = `/assets/${npc}.png`;
  //const npcPlate = `/assets/${npc}_dialogue.png`;

  return (
    <div style={styles.screen}>
      <div style={styles.illustrationArea}>
        <img src={npcPortrait} alt={npc} style={styles.portrait} />
      </div>

      <div style={styles.dialogueBox} onClick={advance}>
        <div style={styles.npcName}>{npc.toUpperCase()}</div>

        <div style={styles.text}>
          {displayText}
        </div>

        <div style={styles.hint}>
          {isTyping ? "…" : "(click to continue)"}
        </div>
      </div>
    </div>
  );
}

const styles = {
  screen: {
    width: "100vw",
    height: "100vh",
    background: "white",
    display: "flex",
    flexDirection: "column",
    cursor: "none",
    overflow: "hidden",
  },
  illustrationArea: {
    flex: "1 0 70%",
    position: "relative",
    width: "100%",
  },
  namePlate: {
    position: "absolute",
    left: "3vw",
    top: "50%",
    transform: "translateY(-50%)",
    width: "260px",
    maxWidth: "30vw",
    userSelect: "none",
  },
  portrait: {
    position: "absolute",
    right: "5vw",
    bottom: "0",
    height: "70vh",
    maxHeight: "75%",
    userSelect: "none",
  },
  dialogueBox: {
    flex: "0 0 30%",
    background: "#f7f7f7",
    borderTop: "2px solid #d0d0d0",
    padding: "24px 40px",
    boxSizing: "border-box",
    cursor: "pointer",
  },
  npcName: {
    fontWeight: "bold",
    fontSize: "20px",
    marginBottom: "12px",
    fontFamily: "sans-serif",
  },
  text: {
    fontSize: "18px",
    lineHeight: "1.45",
    fontFamily: "sans-serif",
    minHeight: "60px",
  },
  hint: {
    opacity: 0.45,
    fontSize: "13px",
    marginTop: "14px",
    fontFamily: "sans-serif",
  },
};
