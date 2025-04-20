import React from "react"

interface ClearFilterProps {
  onClearFilter: () => void
}

const ClearFilter: React.FC<ClearFilterProps> = ({ onClearFilter }) => {
  return (
    <span onClick={onClearFilter} className="text-sm text-gray-400 cursor-pointer hover:text-red-400">
        Clear Filter
    </span>
  )
}

export default ClearFilter