export default async function handler(req, res) {
    try {
        const response = await fetch(
            'https://www.reddit.com/user/zuccenoo/submitted.json?limit=10',
            {
                headers: {
                    // Reddit requires a user agent or it blocks the request
                    'User-Agent': 'portfolio-site/1.0'
                }
            }
        )
        const data = await response.json()
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Reddit data' })
    }
}