import { VercelRequest, VercelResponse } from '@vercel/node'

const getGenresHandler = async (req: VercelRequest, res: VercelResponse) => {
  const API_KEY = process.env.RAWG_API_KEY 
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key missing' })
  }
  try {
    const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({ error: data })
    }
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: 'Server error getting data' })
  }
}

export default getGenresHandler
