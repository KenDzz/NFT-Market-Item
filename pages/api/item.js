// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fsp = require('fs').promises

export default async function handler(req, res) {
  const file_data = await fsp.readFile('data/item.content.json')
  const json_data = JSON.parse(file_data)

  res.status(200).json(json_data)
}
