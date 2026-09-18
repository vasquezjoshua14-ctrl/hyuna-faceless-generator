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



async function copyPrompt(){

const text = document.getElementById("result").value;

try {
  await navigator.clipboard.writeText(text);
  alert("Prompt copied ✨");
} catch (error) {
  alert("Copy failed. Please select the text manually.");
}

}
