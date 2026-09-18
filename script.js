let selected = {
  background: "Auto Match",
  camera: "Auto Match",
  hand: "Auto Match",
  nails: "Auto Match",
  accessories: "Auto Match"
};


// pili ng buttons
document.querySelectorAll(".box").forEach(box => {

  const buttons = box.querySelectorAll("button");
  const title = box.querySelector("h2").innerText;


  buttons.forEach(button => {

    button.addEventListener("click", () => {


      buttons.forEach(btn => {
        btn.classList.remove("active");
      });


      button.classList.add("active");


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




// GENERATE PROMPT

async function generatePrompt(){

const result = document.getElementById("result");

result.value = "✨ Generating professional prompt...";


const productText = document.getElementById("product").value;


try {


const response = await fetch("/api/generate", {

method:"POST",

headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

product: productText,

hand:selected.hand,

background:selected.background,

camera:selected.camera,

nails:selected.nails,

accessories:selected.accessories

})

});



const data = await response.json();



if(data.prompt){

result.value = data.prompt;

}

else{

result.value = "No prompt generated.";

}



}

catch(error){

console.log(error);

result.value = "Error generating prompt.";

}


}





// COPY BUTTON

async function copyPrompt(){

const text = document.getElementById("result").value;


try{

await navigator.clipboard.writeText(text);

alert("Prompt copied ✨");


}

catch(error){

alert("Copy failed. Select manually.");

}


}
