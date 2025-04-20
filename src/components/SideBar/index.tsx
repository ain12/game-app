import React from "react"
import Spinner from "../Spinner"
import { GameGenre } from "../../types/game.types"
import SideBarGenreBtn from "./SideBarGenreBtn"
import SidebarHeader from "./SideBarHeader"


interface SidebarProps {
  gameGenres: GameGenre[]
  selectedGameGenreId: string
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
  let renderThis: React.JSX.Element | React.JSX.Element[] = []

  if(gameGenres && gameGenres.length > 0) {
    for(let genre of gameGenres){
      renderThis.push(
        <SideBarGenreBtn
          key={genre.id}
          gameGenre={genre}
          selectedGameGenreId={selectedGameGenreId}
          onSelectGameGenre={(id) => {
            handleGameGenreSelected(String(id))
          }}
        />
      )
    }
  }else {
    renderThis = <Spinner />
  }
  
  return (
    <>
      <aside className="hidden sm:block w-64 p-8 border-r border-none min-h-screen bg-[#1a1a1a] text-white">
        <SidebarHeader onClearFilter={clearFilter} />
        {renderThis}
      </aside>
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setShowSidebar(false)}
          />
          <div className="w-64 bg-[#1a1a1a] text-white h-full p-4 shadow-lg overflow-y-auto">
            <SidebarHeader
              onClearFilter={() => {
                clearFilter()
              }}
              showCloseButton
              onCloseButton={() => setShowSidebar(false)}
            />
            {renderThis}
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
