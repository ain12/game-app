import React from "react"

const Spinner: React.FC = () => {
  return (
    <div className="col-span-full flex justify-center py-12">
    <div className="w-10 h-10 border-4 border-[#FEBA17] border-t-transparent rounded-full animate-spin" />
  </div>
  )
}

export default Spinner
