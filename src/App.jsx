import { useState } from "react";
import WorldMap from "./components/WorldMap";
import DialogueScreen from "./components/DialogueScreen";
import CustomCursor from "./components/CustomCursor";
import FadeWrapper from "./components/FadeWrapper";

import { beanieDialogue } from "./dialogue/beanie";
import { fionnaDialogue } from "./dialogue/fionna";

import { useEffect } from "react";

import QuestLog from "./components/QuestLog";
import QuestCompleteBanner from "./components/QuestCompleteBanner";
import Confetti from "./components/Confetti.jsx";


export default function App() {
  const [mode, setMode] = useState("world");
  const [currentNPC, setCurrentNPC] = useState(null);

  // Quest state
  const [visitedBeanie, setVisitedBeanie] = useState(false);
  const [visitedFionna, setVisitedFionna] = useState(false);
  const allQuestsComplete = visitedBeanie && visitedFionna;

  // Confetti trigger
  const [showConfetti, setShowConfetti] = useState(false);


  // Pass this to cursor and world map
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const [showQuestBanner, setShowQuestBanner] = useState(false);


  const enterLocation = (id) => {
    setCurrentNPC(id);
    setMode("dialogue");

    // QUEST PROGRESS LOGIC
    if (id === "beanie") setVisitedBeanie(true);
    if (id === "fionna") setVisitedFionna(true);
  };

  const exitDialogue = () => {
  let updatedBeanie = visitedBeanie;
  let updatedFionna = visitedFionna;

  if (currentNPC === "beanie") updatedBeanie = true;
  if (currentNPC === "fionna") updatedFionna = true;

  setVisitedBeanie(updatedBeanie);
  setVisitedFionna(updatedFionna);

  setMode("world");
  setCurrentNPC(null);

  // ONLY show confetti when BOTH quests are finished
  if (updatedBeanie && updatedFionna) {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  }
};




  useEffect(() => {
  if (visitedBeanie && visitedFionna) {
    setShowConfetti(true);
  }
}, [visitedBeanie, visitedFionna]);



  return (
  <div className="app-container">
    <CustomCursor
      mode={mode}
      isHoveringInteractive={isHoveringInteractive}
    />


    <QuestLog visitedBeanie={visitedBeanie} visitedFionna={visitedFionna} />

    <QuestCompleteBanner show={showQuestBanner} />

    {mode === "world" && showConfetti && <Confetti />}


    <FadeWrapper mode={mode}>
      {mode === "world" && (
        <WorldMap
  onEnterLocation={enterLocation}
  setIsHoveringInteractive={setIsHoveringInteractive}
/>

      )}

      {mode === "dialogue" && (
        <DialogueScreen
          npc={currentNPC}
          lines={currentNPC === "beanie" ? beanieDialogue : fionnaDialogue}
          onExit={exitDialogue}
        />
      )}
    </FadeWrapper>
  </div>
);


}
