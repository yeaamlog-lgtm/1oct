document.addEventListener("DOMContentLoaded", () => {
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");
    const hint = document.getElementById("proposalHint");
    const transition = document.getElementById("contractTransition");

    let noScale = 1;
    let noClicks = 0;

    const hints = [
        "Are you sure? ♡",
        "Think again...",
        "Really? 🥺",
        "I'm still hoping...",
        "One more thought? ♡",
        "Okay... I'll wait.",
        "You know which button to press ♡"
    ];

    noButton.addEventListener("click", () => {
        noClicks++;

        noScale = Math.max(
            0.55,
            noScale - 0.07
        );

        noButton.style.transform = `scale(${noScale})`;

        hint.textContent =
            hints[
                Math.min(
                    noClicks - 1,
                    hints.length - 1
                )
            ];

        hint.classList.add("visible");
    });

    yesButton.addEventListener("click", () => {
        yesButton.disabled = true;
        noButton.disabled = true;

        yesButton.style.transform = "scale(1.05)";

        setTimeout(() => {
            transition.classList.add("active");
            transition.setAttribute(
                "aria-hidden",
                "false"
            );
        }, 250);

        setTimeout(() => {
            window.location.href = "contract.html";
        }, 1800);
    });
});