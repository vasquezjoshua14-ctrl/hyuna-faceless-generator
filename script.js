let selected = {
  background: "Auto Match",
  camera: "Auto Match",
  hand: "Auto Match",
  nails: "Auto Match",
  accessories: "Auto Match"
};


const boxes = document.querySelectorAll(".box");


boxes.forEach(box => {
  const title = box.querySelector("h2")?.innerText || "";

  const buttons = box.querySelectorAll("button");

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      buttons.forEach(btn => {
        btn.style.background = "#ffd6e8";
        btn.style.color = "#6b4056";
      });

      button.style.background = "#d66fa0";
      button.style.color = "white";


      if(title.includes("Background")) {
        selected.background = button.innerText;
      }

      if(title.includes("Camera")) {
        selected.camera = button.innerText;
      }

      if(title.includes("Hand")) {
        selected.hand = button.innerText;
      }

      if(title.includes("Nail")) {
        selected.nails = button.innerText;
      }

      if(title.includes("Accessories")) {
        selected.accessories = button.innerText;
      }

    });

  });

});



function generatePrompt(){

let prompt = 
`Vertical 9:16 ultra realistic product photography.

Product:
Uploaded product image. Keep the exact product shape, color, design, and details.

Create a premium faceless Korean feminine hand model style.

Hand presentation:
${selected.hand}

Background:
${selected.background}

Camera angle:
${selected.camera}

Nail style:
${selected.nails}

Accessories:
${selected.accessories}

Photography direction:

- The product is always the main hero.
- Beautiful realistic feminine hands.
- Korean beauty advertisement aesthetic.
- Natural elegant finger placement.
- Premium commercial product photoshoot.
- Soft cinematic lighting.
- Realistic shadows.
- Sharp product details.
- Luxury lifestyle atmosphere.
- High resolution professional photography.

Rules:
- Never show a face.
- Do not change the product design.
- Make the hand pose natural and attractive.
- Background must match the product mood.

Professional advertising quality, realistic textures, premium brand campaign style.`;

document.getElementById("result").value = prompt;

}
