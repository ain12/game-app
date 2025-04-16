import React from "react"
import SearchBar from "../SearchBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

interface NavbarProps {
  searchWord: string
  handleSearchWord: (e: React.ChangeEvent<HTMLInputElement>) => void
  setShowSidebar: (show: boolean) => void
}

const Navbar: React.FC<NavbarProps> = ({
  searchWord,
  handleSearchWord,
  setShowSidebar,
}) => {
  return (
    <nav className="flex items-center gap-4 px-8 py-5 border-none bg-[#1a1a1a] text-white">
      <h1 className="text-2xl font-bold whitespace-nowrap">Game Finder</h1>

      <div className="flex-1">
        <SearchBar {...{searchWord, handleSearchWord}}/>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/contactPage"
          className="relative text-white whitespace-nowrap hover:text-gray-300"
        >
          Contact Us
        </Link>
        </div>

      {/* hamburguer menu mobile */}
      <button onClick={() => setShowSidebar(true)} className="sm:hidden text-white">
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>
    </nav>
  )
}

export default Navbar
