import React, { useCallback, useState } from "react"
import { ContactFormData } from "../../types/contactform.types"
import MessageBubble from "../../components/MessageBubble"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

const ContactPage: React.FC = () => {
  const {data, handleOnChangeInputs, showMessageBubble, handleOnSubmit, localStorageDataParsed} = useContactPageLogic()
  const navigate = useNavigate()  
  return (
    <div className="flex flex-col min-h-screen">
     <div className="p-6 flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center flex-col md:flex-row gap-5 px-6 md:px-10">
        <div className="flex-1 p-6 md:p-20 flex flex-col text-center md:text-left gap-5">
          <h1 className="text-5xl">Any questions?</h1>
          <p className="text-justify">This is not a real form, it's just an example. The send message button triggers a bubble message of successs with the name introduced in the input name.
            The name is saved in localStorage. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Tenetur error, blanditiis sint consequuntur eveniet itaque laboriosam ex dolores veniam repudiandae iusto 
            ipsa commodi, molestias numquam cum possimus recusandae asperiores consequatur.
            lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea reprehenderit nam repellat non ratione nostrum tempore 
            ut provident minus voluptatum magnam numquam, quo maxime veniam distinctio tenetur eveniet, expedita doloremque!
          </p>
        </div>
        <div className="flex flex-1 mb-4 md:mb-0 flex-col p-6 md:p-10 bg-gray-100 rounded-lg shadow-lg gap-4 w-full max-w-xl">
          <h1 className="text-2xl text-black font-semibold ">Contact Us</h1>
          <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
            <input type="text" name="name" placeholder="name" className="text-black p-3 rounded-lg border-2 border-gray-200 focus:border-[#FEBA17] focus:outline-none" value={data.name} onChange={handleOnChangeInputs} required/>
            <input type="email" name="email" placeholder="email"  className="text-black p-3 rounded-lg border-2 border-gray-200 focus:border-[#FEBA17] focus:outline-none" value={data.email}onChange={handleOnChangeInputs} required/>
            <input type="text" name="subject" placeholder="subject"  className="text-black p-3 rounded-lg border-2 border-gray-200 focus:border-[#FEBA17] focus:outline-none" value={data.subject}onChange={handleOnChangeInputs} required/>
            <textarea name="message" placeholder="Your message here..."  className="text-black p-3 rounded-lg border-2 border-gray-200 focus:border-[#FEBA17] focus:outline-none" value={data.message} onChange={handleOnChangeInputs} required></textarea>
            <button type="submit" className="mt-4 p-3 rounded-full w-[200px] ml-auto bg-[#FEBA17] text-white hover:bg-[#F2A500]">Send Message</button>
          </form>
          {showMessageBubble && <MessageBubble name={localStorageDataParsed ? localStorageDataParsed.name : ''} />}
        </div>
      </div>
    </div>
  )
}

const useContactPageLogic = () => {
  const [data, setData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [showMessageBubble, setShowMessageBubble] = useState<boolean>(false)
  const localStorageData = localStorage.getItem('contactFormData')
  const localStorageDataParsed = localStorageData ? JSON.parse(localStorageData) : null

  const handleOnChangeInputs = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setData(old => ({...old, [name]: value}))
  }, [])

  const handleOnSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('contactFormData', JSON.stringify(data))
    setShowMessageBubble(true)    
    setTimeout(() => setShowMessageBubble(false), 4000)
    setData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }, [data])

  return {handleOnChangeInputs, data, showMessageBubble, handleOnSubmit, localStorageDataParsed}
}

export default ContactPage
