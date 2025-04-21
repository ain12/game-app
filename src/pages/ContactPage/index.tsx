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
    <div className="flex flex-col min-h-screen bg-[#121212] text-white px-4 py-8 md:px-10 max-w-6xl mx-auto">
  <div className="mb-6">
    <button
      onClick={() => navigate(-1)}
      className="px-4 py-2 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white flex items-center gap-2"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
      Back
    </button>
  </div>

  <div className="flex flex-col md:flex-row items-center justify-between gap-10">
    <div className="flex-1 text-center md:text-left space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold">
        Got Questions?
      </h1>
      <p className="text-gray-300 text-lg leading-relaxed">
        This is a fictional form meant to show you how messages would work. The form information is saved in localStorage to show the success message.
      </p>
    </div>
    <div className="flex-1 bg-[#1f1f1f] rounded-2xl p-8 shadow-lg w-full max-w-xl border border-[#333]">
      <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
      <form onSubmit={handleOnSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={data.name}
          onChange={handleOnChangeInputs}
          required
          className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#FEBA17] transition"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={data.email}
          onChange={handleOnChangeInputs}
          required
          className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#FEBA17] transition"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={data.subject}
          onChange={handleOnChangeInputs}
          required
          className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#FEBA17] transition"
        />
        <textarea
          name="message"
          placeholder="Your message..."
          value={data.message}
          onChange={handleOnChangeInputs}
          required
          rows={5}
          className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#FEBA17] transition resize-none"
        />
        <button
          type="submit"
          className="mt-2 block ml-auto px-6 py-3 bg-[#FEBA17] text-black rounded-full hover:bg-[#ffd54f] font-semibold w-[160px]"
        >
          Send Message
        </button>
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
