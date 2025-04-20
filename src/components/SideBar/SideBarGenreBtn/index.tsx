import React from "react"
import { GameGenre } from "../../../types/game.types";

interface SideBarGenreBtnProps {
  gameGenre: GameGenre
  selectedGameGenreId: string | null
  onSelectGameGenre: (id: string) => void
}

const SideBarGenreBtn: React.FC<SideBarGenreBtnProps> = ({ gameGenre, selectedGameGenreId, onSelectGameGenre }) => {
  const isSelected = selectedGameGenreId === String(gameGenre.id)
  return (
    <button
      onClick={() => onSelectGameGenre(String(gameGenre.id))}
      className={`flex items-center gap-2 w-full text-left p-2 rounded transition-colors ${
        isSelected
          ? "bg-[#FEBA17] text-black font-semibold"
          : "hover:bg-[#2a2a2a]"
      }`}
    >
      <img
        src={gameGenre.image_background}
        alt={gameGenre.name}
        className="w-6 h-6 object-cover rounded"
      />
      {gameGenre.name}
    </button>
  );
};

export default SideBarGenreBtn
