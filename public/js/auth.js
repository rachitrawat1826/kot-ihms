document.querySelectorAll("input").forEach(input => {
    input.addEventListener("focus", () => {
        input.style.background = "#f9f9ff";
    });

    input.addEventListener("blur", () => {
        input.style.background = "#fff";
    });
});