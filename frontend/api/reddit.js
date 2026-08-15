export default async function handler(req, res) {
    try {
        const response = await fetch(
            'https://www.reddit.com/user/zuccenoo/submitted.json?limit=10',
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.9',
                }
            }
        )

        const text = await response.text()

        if (!text.startsWith('{')) {
            console.error('Reddit returned non-JSON:', text.slice(0, 200))
            res.status(502).json({ error: 'Reddit blocked the request', preview: text.slice(0, 200) })
            return
        }

        const data = JSON.parse(text)
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}