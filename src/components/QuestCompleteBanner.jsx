import { useEffect, useState } from "react";

export default function QuestCompleteBanner({ show }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className="quest-banner">
      🎉 Quest Complete! 🎉
    </div>
  );
}
