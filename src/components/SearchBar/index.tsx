import React from "react"

interface SearchBarProps {
  searchWord: string
  handleSearchWord: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchWord, handleSearchWord }) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <input
        type="text"
        value={searchWord}
        onChange={handleSearchWord}
        placeholder="Search for games..."
        className={'flex-1 p-2 rounded-full bg-[#999999] placeholder:text-black hover:placeholder:text-gray-400 text-white border border-transparent focus:outline-none hover:bg-white hover:text-gray-900 focus:bg-white focus:placeholder-gray-400 focus:text-gray-900 '}
      />
    </div>
  )
}

export default SearchBar
