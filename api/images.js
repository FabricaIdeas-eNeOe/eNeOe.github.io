export default async function handler(req, res) {

  try {

    const cloud = "du4pmuch7";
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const folder = req.query.folder;

    const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/search`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": "Basic " + btoa(apiKey + ":" + apiSecret),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        expression: `folder:${folder}`,
        max_results: 500
      })
    });

    const data = await response.json();

    if (!data.resources) {
      return res.status(500).json(data);
    }

    const images = data.resources.map(r => r.public_id);

    res.status(200).json(images);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}
