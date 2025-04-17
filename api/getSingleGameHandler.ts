import { VercelRequest, VercelResponse } from '@vercel/node'

const getSingleGameHandler = async (req: VercelRequest, res: VercelResponse) => {
  const API_KEY = process.env.RAWG_API_KEY
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key missing' })
  }
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ error: 'Id is required' })
  }
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    if (!response.ok) {
        const textResponse = await response.text()
        return res.status(response.status).json({ error: 'Rawg API error', message: textResponse })
      }
    const data = await response.json()
    if (!response.ok) {
      return res.status(response.status).json({ error: data })
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: 'Server error getting data' })
  }
}

export default getSingleGameHandler
