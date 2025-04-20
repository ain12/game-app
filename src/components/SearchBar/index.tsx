import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

interface SearchBarProps {
  searchWord: string
  handleSearchWord: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchWord, handleSearchWord }) => {
  return (
    <div className="flex items-center gap-2 w-full bg-[#4d4d4d] rounded-full px-4 py-2 border border-transparent focus-within:bg-white focus-within:text-gray-900 hover:bg-white hover:text-gray-900 ">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400" />
      <input
        type="text"
        value={searchWord}
        onChange={handleSearchWord}
        placeholder="Search for games..."
        className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 hover:placeholder:text-gray-400 focus:placeholder:text-gray-400 focus:text-gray-900"
      />
    </div>
  )
}

export default SearchBar
