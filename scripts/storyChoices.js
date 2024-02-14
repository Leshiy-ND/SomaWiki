document.querySelectorAll("[story-consequence]").forEach(element => {
    element.style.color = "#ffddaa";
});

document.querySelectorAll("[story-result]").forEach(elemResult => {
    const result = elemResult.getAttribute("story-result");

    elemResult.style.display = ("" == result) ? "initial" : "none";
});

document.querySelectorAll("[story-option]").forEach(button => {
    button.className = (button === button.parentElement.firstElementChild) ? "option-selected" : "option-normal";

    button.addEventListener("click", () => {
        if (button.className != "option-normal") return;

        const choise = button.parentElement.getAttribute("story-choice");
        const option = button.getAttribute("story-option");

        for (var otherButton of button.parentElement.children) {
            otherButton.className = (button === otherButton) ? "option-selected" : "option-normal";
        }

        document.querySelectorAll("[story-consequence]").forEach(elemConsequence => {
            const consequence = elemConsequence.getAttribute("story-consequence");
            if (choise != consequence) return;

            for (var elemResult of elemConsequence.children) {
                result = elemResult.getAttribute("story-result");
                elemResult.style.display = (option == result) ? "initial" : "none";
            }
        });
    });
});