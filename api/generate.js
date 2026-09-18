export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }


  try {

    const {
      hand = "Auto Match",
      background = "Auto Match",
      camera = "Auto Match",
      nails = "Auto Match",
      accessories = "Auto Match",
      product = "Product image"
    } = req.body;


    const prompt = `
Create ONE professional AI image generation prompt for faceless product photography.

Product:
${product}

Scene Requirements:

- Style: ultra realistic faceless feminine product photography
- Format: vertical 9:16 portrait
- Product must be the main hero
- Preserve the product design, color, shape, texture and branding
- No face visible

Hand Style:
${hand}

Background:
${background}

Camera Angle:
${camera}

Nail Style:
${nails}

Accessories:
${accessories}

Create a premium commercial photoshoot scene.

Include:
- realistic feminine hands
- natural product interaction
- correct anatomy
- realistic skin texture
- professional lighting
- realistic shadows
- sharp product details
- luxury UGC advertising style
- Pinterest and TikTok Shop aesthetic

The final image should look like a high-end product advertisement.

Return ONLY the final image generation prompt.
`;


    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({

          model: "gpt-4o-mini",

          messages: [
            {
              role: "user",
              content: prompt
            }
          ],

          temperature: 0.8

        })

      }
    );


    const data = await response.json();


    if (!data.choices) {

      return res.status(500).json({
        error: data
      });

    }


    res.status(200).json({

      prompt: data.choices[0].message.content

    });


  } catch(error) {

    res.status(500).json({

      error: error.message

    });

  }

}
