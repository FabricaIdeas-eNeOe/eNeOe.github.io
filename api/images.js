export default async function handler(req, res) {

  const cloud = "du4pmuch7";
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const folder = req.query.folder;

  const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/search`;

  const body = {
    expression: `folder:${folder}`,
    max_results: 500
  };

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  const images = data.resources.map(r => r.public_id);

  res.status(200).json(images);
}
