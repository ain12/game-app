import React, { useCallback, useEffect, useRef, useState } from "react"
import Sidebar from "../../components/SideBar"
import GameCard from "../../components/VideoGameCard"
import Spinner from "../../components/Spinner"
import Navbar from "../../components/NavBar"
import PaginationBar from "../../components/PaginationBar"
import { Game, GameGenre } from "../../types/game.types"
import SearchBar from "../../components/SearchBar"
import { API_KEY } from "../../constants/api"

const HomePage: React.FC = () => {
  const {
    clearFilter,
    games,
    gameGenres,
    handleGameGenreSelected,
    handleNextPage,
    handlePreviousPage,
    handleSearchWord,
    loading,
    showSidebar,
    currentPage,
    searchWord,
    setShowSidebar,
    totalPages,
    selectedGameGenreId,
  } = useHomePageLogic()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar {...{searchWord, handleSearchWord, setShowSidebar}} />
      <div className="flex flex-1">
        <Sidebar {...{ gameGenres, handleGameGenreSelected, showSidebar, setShowSidebar, clearFilter, selectedGameGenreId}}/>
        <div className="flex-1 py-3 px-8">
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">Video Games</h1>
          <h3 className="text-lg">All your favorite games here</h3>
          <div className="w-full mt-4 md:hidden">
            <SearchBar {...{searchWord, handleSearchWord}}/>
          </div>
          <PaginationBar {...{ currentPage, totalPages, handleNextPage, handlePreviousPage}} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading &&     gameGenres.length > 0 ? (
              <div className="flex justify-center items-center h-40 col-span-full">
                <div className={`transition-opacity duration-300 ${loading ? "opacity-100" : "opacity-0"}`}>
                  <Spinner />
                </div>
              </div>
            ) : games.length > 0 ? (
              games.map((game, index) => (
                <GameCard key={game.id} {...{ game, index}} />
              ))
            ) : (
              <p className="col-span-full text-center">No games found...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const useHomePageLogic = () => {
  const [infoState, setInfoState] = useState({
    showSidebar: false,
    currentPage: 1,
    totalPages: 0,
    searchWord: "",
    selectedGameGenreId: "",
    loading: false,
  })

  const [games, setGames] = useState<Game[]>([])
  const [gameGenres, setGameGenres] = useState<GameGenre[]>([])
  const pageSize = 10;
  const sidebarRef = useRef<HTMLDivElement | null>(null)

  const setShowSidebar = useCallback((show: boolean) => {
    setInfoState((old) => ({ ...old, showSidebar: show }))
  }, [])

  const handleNextPage = useCallback(() => {
    if (infoState.currentPage < infoState.totalPages) {
      setInfoState((old) => ({ ...old, currentPage: old.currentPage + 1 }))
    }
  }, [infoState.currentPage, infoState.totalPages])

  const handlePreviousPage = useCallback(() => {
    if (infoState.currentPage > 1) {
      setInfoState((old) => ({ ...old, currentPage: old.currentPage - 1 }))
    }
  }, [infoState.currentPage])

  const handleSearchWord = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInfoState((old) => ({ ...old, searchWord: e.target.value }))
    }, [])

  const handleGameGenreSelected = useCallback((selectedGameGenreId: string) => {
    setInfoState((old) => ({
      ...old,
      selectedGameGenreId,
      // showSidebar: false,
    }))
  }, [])

  const clearFilter = useCallback(() => {
    setInfoState((old) => ({
      ...old,
      selectedGameGenreId: "",
      currentPage: 1,
    }))
  }, [])

  const getGenres = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      )
      const data = await response.json()
      if (response.ok) {
        setGameGenres(data.results)
      }
    } catch (error) {
      console.error("Error getting genres:", error)
    }
  }, [])

  const getGames = useCallback(async () => {
    setInfoState((old) => ({ ...old, loading: true }))
    try {
      let url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${infoState.currentPage}&page_size=${pageSize}`
      if (infoState.searchWord) {
        url += `&search=${infoState.searchWord}`
      } 
      if (infoState.selectedGameGenreId) {
        url += `&genres=${infoState.selectedGameGenreId}`
      }

      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        let results = data.results
      
        if (infoState.searchWord.trim()) {
          const searchLower = infoState.searchWord.trim().toLowerCase()
          results = results.filter((game: Game) =>
            game.name.toLowerCase().includes(searchLower)
          )
          setGames(results)
          setInfoState((old) => ({
            ...old,
            totalPages: Math.ceil(results.length / pageSize),
          }));
        } else {
          setGames(data.results)
          setInfoState((old) => ({
            ...old,
            totalPages: Math.ceil(data.count / pageSize),
          }))
        }
      }
    } catch (error) {
      console.error("Error getting games:", error)
    } finally {
      setInfoState((old) => ({ ...old, loading: false }))
    }
  }, [infoState.currentPage, infoState.searchWord, infoState.selectedGameGenreId])

  useEffect(() => {
    getGenres()
    getGames()
  }, [getGenres, getGames])

  useEffect(() => {
    const myDebounce = setTimeout(() => {
      setInfoState((old) => ({ ...old, currentPage: 1 }))
    }, 300)
    return () => clearTimeout(myDebounce)
  }, [infoState.searchWord])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setShowSidebar(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return {
    games,
    gameGenres,
    clearFilter,
    handleGameGenreSelected,
    handleSearchWord,
    handlePreviousPage,
    handleNextPage,
    setShowSidebar,
    searchWord: infoState.searchWord,
    currentPage: infoState.currentPage,
    totalPages: infoState.totalPages,
    loading: infoState.loading,
    showSidebar: infoState.showSidebar,
    selectedGameGenreId: infoState.selectedGameGenreId,
    sidebarRef,
  }
}

export default HomePage
