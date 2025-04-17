import { useCallback, useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import { useParams, useNavigate } from "react-router-dom"
import { API_KEY } from "../../constants/api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { regex } from "../../constants/utils"
import { Game } from "../../types/game.types"

const DetailPage: React.FC = () => {
  const navigate = useNavigate()
  const {gameDetail} = useDetailPageLogic()

  if (!gameDetail) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <Spinner />
      </div>
    )
  }
  
  return (
  <div className="p-6 max-w-6xl mx-auto text-white">
    <button
      onClick={() => navigate(-1)}
      className="px-4 py-2 mb-6 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a]"
    >
      <FontAwesomeIcon icon={faArrowLeft} /> Back
    </button>
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <img
          src={gameDetail.background_image}
          alt={gameDetail.name}
          className="w-full h-auto rounded-xl shadow-lg object-cover"
        />
    </div>
    <div className="md:w-1/2 space-y-4">
        <h1 className="text-4xl font-bold">{gameDetail.name}</h1>
        <p className="text-sm text-gray-400">Released: {gameDetail.released}</p>
        <p className="text-sm font-semibold text-[#FEBA17]">Rating: {gameDetail.rating}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {gameDetail.genres?.map((genre) => (
            <span
              key={genre.id}
              className="bg-[#333] px-3 py-1 rounded-full text-sm text-gray-300"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">About</h2>
      <p>{gameDetail.description.replace(regex, "")}</p>
    </div>
</div>

  )
}

const useDetailPageLogic = () => {
  const [gameDetail, setGameDetail] = useState<Game | null>(null)
  const { id } = useParams<{ id: string }>()

  const getSingleGame = useCallback(async() => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      const data = await response.json()
      if(data) {
        setGameDetail(data)
      }
    } catch (error) {
      console.error("Error getting game:", error)
    }
  }, [id])

  useEffect(() => {
    getSingleGame()
  }, [getSingleGame])

  return {gameDetail}
}

export default DetailPage;
