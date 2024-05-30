// script.js

document.addEventListener("DOMContentLoaded", function() {
    const formSteps = document.querySelectorAll(".form-step");
    const nextStepButtons = document.querySelectorAll(".next-step");
    const prevStepButtons = document.querySelectorAll(".prev-step");
    const outfitYes = document.getElementById("outfitYes");
    const outfitUpload = document.getElementById("outfitUpload");
    const outfitImage = document.getElementById("outfitImage");
    const previewImage = document.getElementById("previewImage");

    let currentStep = 0;

    nextStepButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (validateStep(currentStep)) {
                formSteps[currentStep].classList.remove("active");
                currentStep++;
                formSteps[currentStep].classList.add("active");
            }
        });
    });

    prevStepButtons.forEach(button => {
        button.addEventListener("click", () => {
            formSteps[currentStep].classList.remove("active");
            currentStep--;
            formSteps[currentStep].classList.add("active");
        });
    });

    document.getElementById("occasion").addEventListener("change", function() {
        const customOccasion = document.getElementById("customOccasion");
        if (this.value === "Custom") {
            customOccasion.style.display = "block";
            customOccasion.setAttribute("required", "required");
        } else {
            customOccasion.style.display = "none";
            customOccasion.removeAttribute("required");
        }
    });

    outfitYes.addEventListener("change", () => {
        if (outfitYes.checked) {
            outfitUpload.style.display = "block";
        }
    });

    document.getElementById("outfitNo").addEventListener("change", () => {
        if (document.getElementById("outfitNo").checked) {
            outfitUpload.style.display = "none";
        }
    });

    outfitImage.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    function validateStep(step) {
        const inputs = formSteps[step].querySelectorAll("input, select");
        for (const input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return false;
            }
        }
        return true;
    }
});
