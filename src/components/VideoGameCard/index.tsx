import React from "react"
import { Link } from "react-router-dom"
import { Game } from "../../types/game.types"

interface GameCardProps {
  game: Game
  index: number
}

const GameCard: React.FC<GameCardProps> = ({ game, index }) => {
  return (
    <Link to={`/detail/${game.id}`} key={game.id}>
      <div className="group transition-all duration-300 ease-in-out animate-fade-in-up opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
        <div className="p-4 rounded-lg bg-[#262626] hover:bg-[#333333] transform group-hover:scale-105 group-hover:shadow-xl transition duration-300 ease-in-out">
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-48 rounded object-cover"
            />
          <h2 className="text-xl mt-2">{game.name}</h2>
          <p className="text-sm text-gray-500">Released: {game.released}</p>
        </div>
      </div>
    </Link>
  )
}

export default GameCard

 {/* <div 
        className="p-4 rounded-lg bg-[#262626] hover:bg-[#333333] transition-all duration-300 ease-in-out animate-fade-in-up transform hover:scale-105 hover:shadow-xl  opacity-0"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-48 rounded object-cover"
        />
        <h2 className="text-xl mt-2">{game.name}</h2>
        <p className="text-sm text-gray-500">Released: {game.released}</p>
      </div> */}