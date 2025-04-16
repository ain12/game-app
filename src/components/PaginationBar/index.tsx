import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  handleNextPage: () => void
  handlePreviousPage: () => void
}

const PaginationBar: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePreviousPage,
}) => {
  return (
    <div className="flex justify-center items-center gap-4 my-8 text-white">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] disabled:opacity-40 transition"
      >
        <FontAwesomeIcon icon={faChevronLeft} /> Previous
      </button>

      <span className="px-4 py-2 rounded-full border border-gray-600 bg-[#1f1f1f] text-sm">
        Page <span className="font-bold">{currentPage}</span> of {totalPages}
      </span>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] disabled:opacity-40 transition"
      >
        Next <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

export default PaginationBar