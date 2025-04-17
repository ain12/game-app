import React from "react"
import Spinner from "../Spinner"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


interface SidebarProps {
  gameGenres: any[]
  selectedGameGenreId: string | number
  showSidebar: boolean
  handleGameGenreSelected: (genre: string) => void
  setShowSidebar: (show: boolean) => void
  clearFilter: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  gameGenres,
  handleGameGenreSelected,
  showSidebar,
  setShowSidebar,
  clearFilter,
  selectedGameGenreId,
}) => {
  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden sm:block w-64 p-8 border-r border-none min-h-screen bg-[#1a1a1a] text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Genres</h2>
          <span
            onClick={clearFilter}
            className="text-sm text-gray-400 cursor-pointer hover:text-red-400"
          >
            Clear Filter
          </span>
        </div>
        {gameGenres.length > 0 ? (
          gameGenres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGameGenreSelected(genre.id)}
              className={`flex items-center gap-2 w-full text-left p-2 rounded transition-colors ${
                selectedGameGenreId == genre.id
                  ? "bg-[#FEBA17] text-black font-semibold"
                  : "hover:bg-[#2a2a2a]"
              }`}
            >
              <img
                src={genre.image_background}
                alt={genre.name}
                className="w-6 h-6 object-cover rounded"
              />
              {genre.name}
            </button>
          ))
        ) : (
          <Spinner />
        )}
      </aside>

      {/* Sidebar Mobile */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setShowSidebar(false)}
          />
          <div className="w-64 bg-[#1a1a1a] text-white h-full p-4 shadow-lg overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Genres</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="text-xl"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="text-right mt-4">
              <span
                onClick={() => {
                  clearFilter()
                  setShowSidebar(false)
                }}
                className="text-sm text-gray-400 cursor-pointer hover:text-red-400"
              >
                Clear Filters
              </span>
            </div>

            {gameGenres.length > 0 ? (
              gameGenres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGameGenreSelected(genre.id)}
                  className="flex items-center gap-2  text-left p-2 rounded hover:bg-[#2a2a2a]"
                >
                  <img
                    src={genre.image_background}
                    alt={genre.name}
                    className="w-6 h-6 object-cover rounded"
                  />
                  {genre.name}
                </button>
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
