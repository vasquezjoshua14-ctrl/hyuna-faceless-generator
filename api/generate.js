export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }


  const {
    hand,
    background,
    camera,
    nails,
    accessories,
    product
  } = req.body;


  const systemPrompt = `
You are an expert AI product photography prompt generator.

Create professional faceless product photography prompts.

Rules:

- Product must always be the hero.
- Never show a face.
- Use feminine Korean-style model hands.
- Create realistic beautiful hands.
- Match hand pose with the product.
- Match background with product mood.
- Match nails and accessories with the product.

Always include:

Ultra realistic product photography,
professional commercial photoshoot,
realistic skin texture,
sharp product details,
cinematic lighting,
natural shadows,
high resolution,
premium advertising quality.

Generate only the final image prompt.
Do not explain.
`;


  const userPrompt = `
Product:
${product}

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

Create the final AI image generation prompt.
`;


  try {

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
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userPrompt
            }
          ]
        })
      }
    );


    const data = await response.json();


    res.status(200).json({
      prompt: data.choices[0].message.content
    });


  } catch(error) {

    res.status(500).json({
      error: error.message
    });

  }

}
