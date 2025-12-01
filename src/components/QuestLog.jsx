export default function QuestLog({ visitedBeanie, visitedFionna }) {
  const allComplete = visitedBeanie && visitedFionna;

  // Find which quest is next
  const nextQuest =
    !visitedBeanie ? "beanie" :
    !visitedFionna ? "fionna" :
    null;

  return (
    <div className="quest-log">
      <h3 className="quest-title">Quests</h3>

      {/* Beanie Quest */}
      <div className={`quest-item ${nextQuest === "beanie" ? "glow-next" : ""}`}>
        <span>🍳 Meet Beanie</span>

        {visitedBeanie && (
          <span className="unlock-icon">🎀</span>
        )}
      </div>

      {/* Fionna Quest */}
      <div className={`quest-item ${nextQuest === "fionna" ? "glow-next" : ""}`}>
        <span>🧵 Visit Fionna</span>

        {visitedFionna && (
          <span className="unlock-icon">🧚‍♀️</span>
        )}
      </div>

      {allComplete && (
        <div className="quest-sub">All quests completed!</div>
      )}
    </div>
  );
}
