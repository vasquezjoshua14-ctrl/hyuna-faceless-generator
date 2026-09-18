const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", function () {

    // Generate button hiwalay
    if (this.classList.contains("generate")) {
      alert("Prompt generation will be added next ✨");
      return;
    }

    // alisin ang selected sa kaparehong section
    const box = this.closest(".box");

    if (box) {
      const sectionButtons = box.querySelectorAll("button");

      sectionButtons.forEach(btn => {
        btn.style.background = "#ffd6e8";
      });
    }

    // piliin ang napindot
    this.style.background = "#d66fa0";
    this.style.color = "white";

  });
});
