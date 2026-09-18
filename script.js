let selected = {
  background: "Auto Match",
  camera: "Auto Match",
  hand: "Auto Match",
  nails: "Auto Match",
  accessories: "Auto Match"
};


// BUTTON SELECT
document.querySelectorAll(".box").forEach(box => {

  const buttons = box.querySelectorAll("button");
  const title = box.querySelector("h2")?.innerText || "";

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      if (title.includes("Background")) {
        selected.background = button.innerText;
      }

      if (title.includes("Camera")) {
        selected.camera = button.innerText;
      }

      if (title.includes("Hand")) {
        selected.hand = button.innerText;
      }

      if (title.includes("Nail")) {
        selected.nails = button.innerText;
      }

      if (title.includes("Accessories")) {
        selected.accessories = button.innerText;
      }

    });

  });

});


// GENERATE PROMPT

async function generatePrompt(){

  const result = document.getElementById("result");

  result.value = "✨ Generating professional prompt...";


  const fileInput = document.getElementById("product");

  let productName = "Product image";

  if(fileInput && fileInput.files.length > 0){
    productName = fileInput.files[0].name;
  }


  try{

    const response = await fetch("/api/generate",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        product: productName,

        background:selected.background,

        camera:selected.camera,

        hand:selected.hand,

        nails:selected.nails,

        accessories:selected.accessories

      })

    });


    const data = await response.json();


    if(data.prompt){

      result.value = data.prompt;

    }else{

      result.value = 
`Professional faceless product photography:

Product: ${productName}
Background: ${selected.background}
Camera: ${selected.camera}
Hand Style: ${selected.hand}
Nails: ${selected.nails}
Accessories: ${selected.accessories}

High quality studio lighting, realistic luxury product photo.`;

    }


  }catch(error){

    console.log(error);


    result.value =
`Professional faceless product photography:

Product: ${productName}
Background: ${selected.background}
Camera: ${selected.camera}
Hand Style: ${selected.hand}
Nails: ${selected.nails}
Accessories: ${selected.accessories}

High quality, realistic product photography.`;

  }

}



// COPY

async function copyPrompt(){

 const text = document.getElementById("result").value;


 if(!text){
   alert("No prompt available");
   return;
 }


 try{

   await navigator.clipboard.writeText(text);

   alert("Prompt copied ✨");

 }catch(e){

   alert("Copy failed");

 }

}
