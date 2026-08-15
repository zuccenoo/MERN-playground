export default async function handler(req, res) {
    try {
        const response = await fetch(
            'https://www.reddit.com/user/zuccenoo/submitted.json?limit=10',
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; portfolio-bot/1.0)'
                }
            }
        )

        const text = await response.text()
        const data = JSON.parse(text)

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}