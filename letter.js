const envelopeScene = document.getElementById("envelopeScene");
const envelope = document.getElementById("envelope");
const waxSeal = document.getElementById("waxSeal");
const openLetter = document.getElementById("openLetter");
const letterPaper = document.getElementById("letterPaper");
const letterPage = document.getElementById("letterPage");

let opened = false;
let opening = false;


/* =========================
   OPEN LETTER
========================= */

function openEnvelope() {

    if (opened || opening) {
        return;
    }

    opening = true;

    envelopeScene.classList.add("opening");

    waxSeal.setAttribute(
        "aria-label",
        "Letter opened"
    );

    setTimeout(() => {

        envelopeScene.classList.add("opened");

    }, 1050);


    setTimeout(() => {

        letterPaper.classList.add("show");

        letterPaper.setAttribute(
            "aria-hidden",
            "false"
        );

        opened = true;

        opening = false;

        requestAnimationFrame(() => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }, 1250);
}


/* =========================
   CLICK EVENTS
========================= */

waxSeal.addEventListener(
    "click",
    openEnvelope
);

openLetter.addEventListener(
    "click",
    openEnvelope
);


/* =========================
   KEYBOARD
========================= */

waxSeal.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openEnvelope();
        }

    }
);


/* =========================
   SUBTLE ENVELOPE TILT
========================= */

if (
    window.matchMedia("(pointer: fine)").matches
) {

    envelope.addEventListener(
        "pointermove",
        event => {

            if (opened || opening) {
                return;
            }

            const rect =
                envelope.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width;

            const y =
                (event.clientY - rect.top)
                / rect.height;

            const rotateX =
                (0.5 - y) * 3;

            const rotateY =
                (x - 0.5) * 4;

            envelope.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    );


    envelope.addEventListener(
        "pointerleave",
        () => {

            envelope.style.transform =
                "rotateX(0deg) rotateY(0deg)";
        }
    );

}


/* =========================
   INITIAL STATE
========================= */

letterPaper.setAttribute(
    "aria-hidden",
    "true"
);