const dial = document.getElementById("dial");
const dialNumbers = document.getElementById("dialNumbers");
const dialTicks = document.getElementById("dialTicks");

const sequence = document.getElementById("sequence");
const rollingTrack = document.getElementById("rollingTrack");

const statusText = document.getElementById("statusText");
const statusDots = document.querySelectorAll(".status-dot");

const safe = document.getElementById("safe");
const cinematicLight = document.getElementById("cinematicLight");
const particles = document.getElementById("particles");

const numbers = [...dialNumbers.querySelectorAll("span")];

const combination = [30, 5, 2026];

/*
    Visible dial:
    0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10

    Actual combination:
    30 → 05 → 2026

    Visible dial mapping:
    3 → 30
    0 → 05
    2 → 2026
*/

const unlockSequence = [3, 0, 2];

let rotation = 0;
let lastAngle = 0;
let dragging = false;

let selectedNumber = 0;
let sequenceIndex = 0;

let unlocked = false;
let checking = false;

for (let i = 0; i < 44; i++) {
    const tick = document.createElement("span");

    tick.className =
        i % 4 === 0
            ? "tick major"
            : "tick";

    tick.style.transform =
        `rotate(${i * (360 / 44)}deg)`;

    dialTicks.appendChild(tick);
}

const totalNumbers = numbers.length;

numbers.forEach((number, index) => {

    const angle =
        index * (360 / totalNumbers);

    number.style.setProperty(
        "--angle",
        `${angle}deg`
    );

    number.style.setProperty(
        "--radius",
        "78%"
    );
});

function normalizeAngle(angle) {
    return ((angle % 360) + 360) % 360;
}

function getPointerAngle(event) {

    const rect =
        dial.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height / 2;

    return Math.atan2(
        event.clientY - centerY,
        event.clientX - centerX
    ) * (180 / Math.PI);
}

function getSelectedNumber() {

    const normalized =
        normalizeAngle(rotation);

    const step =
        360 / totalNumbers;

    let index =
        Math.round(normalized / step);

    index =
        ((index % totalNumbers) + totalNumbers)
        % totalNumbers;

    return index;
}

function updateRollingNumber() {

    const itemHeight = 18;

    rollingTrack.style.transform =
        `translateY(-${selectedNumber * itemHeight}px)`;
}

function updateDial() {

    selectedNumber =
        getSelectedNumber();

    dialNumbers.style.transform =
        `rotate(${-rotation}deg)`;

    numbers.forEach(number => {

        const value =
            Number(number.dataset.number);

        number.classList.toggle(
            "selected",
            value === selectedNumber
        );
    });

    updateRollingNumber();
}

function setSequenceValue(value, index) {

    const slots =
        sequence.querySelectorAll(
            ".sequence-slot"
        );

    if (!slots[index]) return;

    slots[index].textContent =
        value;

    slots[index].classList.add(
        "filled"
    );

    slots[index].classList.remove(
        "active"
    );

    if (slots[index + 1]) {
        slots[index + 1].classList.add(
            "active"
        );
    }
}

function resetSequence() {

    const slots =
        sequence.querySelectorAll(
            ".sequence-slot"
        );

    slots.forEach((slot, index) => {

        slot.textContent = "—";

        slot.classList.remove(
            "filled",
            "active"
        );

        if (index === 0) {
            slot.classList.add(
                "active"
            );
        }
    });

    sequenceIndex = 0;

    updateStatusDots();
}

function updateStatusDots() {

    statusDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === sequenceIndex
        );
    });
}

function setStatus(text) {
    statusText.textContent = text;
}

function correctStep() {

    const actualValue =
        combination[sequenceIndex];

    setSequenceValue(
        actualValue,
        sequenceIndex
    );

    sequenceIndex++;

    updateStatusDots();

    if (sequenceIndex === 1) {

        setStatus(
            "Second number"
        );

    } else if (sequenceIndex === 2) {

        setStatus(
            "Final number"
        );

    } else {

        unlockSafe();
    }
}

function wrongStep() {

    safe.classList.remove(
        "unlocking"
    );

    void safe.offsetWidth;

    safe.classList.add(
        "unlocking"
    );

    setStatus(
        "Wrong combination"
    );

    statusDots.forEach(dot => {
        dot.classList.add("wrong");
    });

    setTimeout(() => {

        statusDots.forEach(dot => {
            dot.classList.remove("wrong");
        });

        resetSequence();

        setStatus(
            "Turn the dial"
        );

    }, 850);
}

function checkCombination() {

    if (
        unlocked ||
        checking
    ) {
        return;
    }

    checking = true;

    const expected =
        unlockSequence[sequenceIndex];

    if (
        selectedNumber === expected
    ) {

        correctStep();

    } else {

        wrongStep();
    }

    setTimeout(() => {

        checking = false;

    }, 500);
}

function unlockSafe() {

    unlocked = true;

    setStatus(
        "Unlocked"
    );

    statusDots.forEach(dot => {
        dot.classList.add("active");
    });

    safe.classList.remove(
        "unlocking"
    );

    void safe.offsetWidth;

    safe.classList.add(
        "unlocking"
    );

    setTimeout(() => {

        safe.classList.remove(
            "unlocking"
        );

        safe.classList.add(
            "opening"
        );

        cinematicLight.classList.add(
            "active"
        );

        particles.classList.add(
            "active"
        );

        createParticles();

        setTimeout(() => {

            window.location.href =
                "home.html";

        }, 1750);

    }, 650);
}

function createParticles() {

    particles.innerHTML = "";

    for (
        let i = 0;
        i < 30;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );

        particle.className =
            "particle";

        particle.style.left =
            `${32 + Math.random() * 36}%`;

        particle.style.top =
            `${48 + Math.random() * 18}%`;

        particle.style.setProperty(
            "--drift",
            `${(Math.random() - 0.5) * 120}px`
        );

        particle.style.setProperty(
            "--duration",
            `${1.2 + Math.random() * 1.4}s`
        );

        particle.style.animationDelay =
            `${Math.random() * 0.35}s`;

        particles.appendChild(
            particle
        );
    }
}

dial.addEventListener(
    "pointerdown",
    event => {

        if (unlocked) return;

        dragging = true;

        dial.setPointerCapture(
            event.pointerId
        );

        lastAngle =
            getPointerAngle(event);

        dial.style.transition =
            "none";
    }
);

dial.addEventListener(
    "pointermove",
    event => {

        if (
            !dragging ||
            unlocked
        ) {
            return;
        }

        const currentAngle =
            getPointerAngle(event);

        let delta =
            currentAngle - lastAngle;

        if (delta > 180) {
            delta -= 360;
        }

        if (delta < -180) {
            delta += 360;
        }

        rotation += delta;

        lastAngle =
            currentAngle;

        updateDial();
    }
);

dial.addEventListener(
    "pointerup",
    event => {

        if (
            !dragging ||
            unlocked
        ) {
            return;
        }

        dragging = false;

        dial.releasePointerCapture(
            event.pointerId
        );

        dial.style.transition =
            "filter 0.25s ease";

        const step =
            360 / totalNumbers;

        const closest =
            Math.round(
                rotation / step
            );

        rotation =
            closest * step;

        updateDial();

        setTimeout(() => {

            checkCombination();

        }, 220);
    }
);

dial.addEventListener(
    "pointercancel",
    () => {

        dragging = false;
    }
);

rotation = 0;
selectedNumber = 0;

updateDial();
updateStatusDots();
setStatus("Turn the dial");