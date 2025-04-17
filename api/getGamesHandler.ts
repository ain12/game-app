import { VercelRequest, VercelResponse } from '@vercel/node'

const getGamesHandler = async(req: VercelRequest, res: VercelResponse) => {
  const API_KEY = process.env.RAWG_API_KEY
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key missing' })
  }
  const { page = '1', page_size = '10', search = '', genres = '' } = req.query
  let url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${page_size}`
  if (search) {
    url += `&search=${search}`
  }
  if (genres) {
    url += `&genres=${genres}`
  }
  try {
    const response = await fetch(url)
    const data = await response.json()
    if (!response.ok) {
      return res.status(response.status).json({ error: data })
    }
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: 'Server error getting data' })
  }
}

export default getGamesHandler
