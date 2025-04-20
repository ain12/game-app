import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import ClearFilter from "../../ClearFilter"

interface SidebarHeaderProps {
  showCloseButton?: boolean
  onClearFilter: () => void
  onCloseButton?: () => void
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onClearFilter, showCloseButton = false, onCloseButton }) => {
  return (
    <>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Genres</h2>
      {showCloseButton && onCloseButton ? (
        <button onClick={onCloseButton} className="text-xl">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      ) : (
        <ClearFilter {...{onClearFilter}} />
      )}
    </div>

    {showCloseButton && (
      <div className="text-right mt-4">
        <ClearFilter {...{onClearFilter}} />
      </div>
    )}
  </>
  )
}

export default SidebarHeader