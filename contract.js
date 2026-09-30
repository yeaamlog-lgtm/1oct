document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("signatureCanvas");
    const clearButton = document.getElementById("clearSignature");
    const agreeButton = document.getElementById("agreeButton");
    const hint = document.getElementById("signatureHint");

    const sealOverlay = document.getElementById("sealOverlay");
    const downloadButton = document.getElementById("downloadContract");

    const ctx = canvas.getContext("2d");

    let drawing = false;
    let hasSignature = false;
    let lastPoint = null;

    const HER_NAME = "[HER NAME]";
    const YOUR_NAME = "Prakhar";

    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();

        const oldCanvas = document.createElement("canvas");
        oldCanvas.width = canvas.width;
        oldCanvas.height = canvas.height;

        if (canvas.width && canvas.height) {
            oldCanvas
                .getContext("2d")
                .drawImage(canvas, 0, 0);
        }

        const ratio = Math.max(
            window.devicePixelRatio || 1,
            1
        );

        canvas.width = rect.width * ratio;
        canvas.height = rect.height * ratio;

        ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 2.1;
        ctx.strokeStyle = "#7b3f4a";

        if (oldCanvas.width && oldCanvas.height) {
            const oldRatioX =
                rect.width / oldCanvas.width;

            const oldRatioY =
                rect.height / oldCanvas.height;

            if (hasSignature) {
                ctx.drawImage(
                    oldCanvas,
                    0,
                    0,
                    oldCanvas.width,
                    oldCanvas.height,
                    0,
                    0,
                    rect.width,
                    rect.height
                );
            }
        }
    }

    function getPoint(event) {
        const rect = canvas.getBoundingClientRect();

        let clientX;
        let clientY;

        if (event.touches && event.touches.length) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    function startDrawing(event) {
        event.preventDefault();

        drawing = true;
        lastPoint = getPoint(event);

        ctx.beginPath();
        ctx.moveTo(
            lastPoint.x,
            lastPoint.y
        );
    }

    function draw(event) {
        if (!drawing) {
            return;
        }

        event.preventDefault();

        const point = getPoint(event);

        ctx.beginPath();

        ctx.moveTo(
            lastPoint.x,
            lastPoint.y
        );

        ctx.lineTo(
            point.x,
            point.y
        );

        ctx.stroke();

        lastPoint = point;

        hasSignature = true;

        hideHint();
    }

    function stopDrawing() {
        if (!drawing) {
            return;
        }

        drawing = false;
        lastPoint = null;
    }

    function clearSignature() {
        const rect = canvas.getBoundingClientRect();

        ctx.clearRect(
            0,
            0,
            rect.width,
            rect.height
        );

        hasSignature = false;

        hint.textContent = "";
        hint.classList.remove("visible");

        agreeButton.disabled = false;
    }

    function showHint(message) {
        hint.textContent = message;
        hint.classList.add("visible");
    }

    function hideHint() {
        hint.textContent = "";
        hint.classList.remove("visible");
    }

    function sealContract() {
        if (!hasSignature) {
            showHint(
                "Please add your signature first ♡"
            );

            return;
        }

        agreeButton.disabled = true;

        showHint(
            "Sealing our little agreement..."
        );

        setTimeout(() => {
            sealOverlay.classList.add("active");

            sealOverlay.setAttribute(
                "aria-hidden",
                "false"
            );
        }, 450);
    }

    function getSignatureDataURL() {
        return canvas.toDataURL("image/png");
    }

    function escapeHTML(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function createContractHTML(signatureURL) {
        const date = new Date();

        const formattedDate =
            date.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

        return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Our Little Contract ♡</title>

<style>
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 40px 20px;
        background: #f7f1e8;
        color: #5f5148;
        font-family: Georgia, "Times New Roman", serif;
    }

    .page {
        width: min(760px, 100%);
        margin: auto;
        padding: 55px;
        background: #fffaf2;
        border: 1px solid #c9ad78;
        box-shadow: 0 20px 60px rgba(95,81,72,.15);
        position: relative;
    }

    .inner {
        border: 1px solid rgba(201,173,120,.35);
        padding: 40px;
    }

    .header {
        text-align: center;
    }

    .heart {
        color: #7b3f4a;
        font-size: 34px;
    }

    .eyebrow {
        color: #a99582;
        font-family: Arial, sans-serif;
        font-size: 10px;
        letter-spacing: 3px;
        text-transform: uppercase;
        margin: 15px 0;
    }

    h1 {
        color: #7b3f4a;
        font-size: 48px;
        font-style: italic;
        font-weight: 400;
        margin: 0;
    }

    .subtitle {
        color: #78695f;
        margin-top: 12px;
    }

    .divider {
        color: #c9ad78;
        margin: 25px 0 35px;
        text-align: center;
    }

    .intro {
        text-align: center;
        line-height: 1.8;
        font-size: 16px;
    }

    .clause {
        margin-top: 22px;
        padding: 22px;
        border: 1px solid rgba(201,173,120,.35);
        background: #fffdf9;
    }

    .clause h2 {
        color: #7b3f4a;
        font-size: 19px;
        font-weight: 500;
        margin: 0 0 8px;
    }

    .clause p {
        line-height: 1.7;
        margin: 0;
    }

    .signatures {
        margin-top: 50px;
        display: flex;
        gap: 35px;
        justify-content: space-between;
    }

    .signature-box {
        flex: 1;
        text-align: center;
    }

    .signature-box img {
        width: 100%;
        max-width: 260px;
        height: 100px;
        object-fit: contain;
        object-position: bottom;
    }

    .line {
        border-top: 1px solid #78695f;
        margin-top: 5px;
        padding-top: 8px;
    }

    .date {
        text-align: center;
        margin-top: 35px;
        color: #a99582;
        font-size: 12px;
    }

    .seal {
        width: 95px;
        height: 95px;
        border-radius: 50%;
        background: #7b3f4a;
        color: #e3cfaa;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 35px auto 0;
        font-size: 32px;
        border: 5px solid rgba(255,255,255,.12);
    }

    .accepted {
        text-align: center;
        color: #7b3f4a;
        font-style: italic;
        font-size: 20px;
        margin-top: 12px;
    }

    @media (max-width: 600px) {
        body {
            padding: 15px 8px;
        }

        .page {
            padding: 20px;
        }

        .inner {
            padding: 20px;
        }

        h1 {
            font-size: 36px;
        }

        .signatures {
            flex-direction: column;
        }
    }
</style>
</head>

<body>

<div class="page">

    <div class="inner">

        <div class="header">

            <div class="heart">♡</div>

            <div class="eyebrow">
                A Very Serious Agreement
            </div>

            <h1>
                Our Little Contract
            </h1>

            <p class="subtitle">
                Officially unofficial. Completely from the heart.
            </p>

            <div class="divider">
                ✦ ───────── ♡ ───────── ✦
            </div>

        </div>

        <div class="intro">
            <p>
                This agreement is made between
                <strong>${escapeHTML(YOUR_NAME)}</strong>
                and
                <strong>${escapeHTML(HER_NAME)}</strong>.
            </p>

            <p>
                No lawyers. No complicated terms.
                Just two people choosing each other.
            </p>
        </div>

        <div class="clause">
            <h2>
                I. The Teasing Clause
            </h2>

            <p>
                We shall always keep bothering,
                teasing, annoying and irritating
                each other — affectionately, of course.
            </p>
        </div>

        <div class="clause">
            <h2>
                II. The Never-Give-Up Clause
            </h2>

            <p>
                We promise not to leave each other
                without talking things through.
                Problems ko solve karna hai,
                person ko nahi.
            </p>
        </div>

        <div class="clause">
            <h2>
                III. The Everything-Sharing Clause
            </h2>

            <p>
                We shall share our talks, photos,
                random updates, little moments,
                big moments and basically everything
                we want to share with each other.
            </p>
        </div>

        <div class="signatures">

            <div class="signature-box">
                <div class="line">
                    ${escapeHTML(YOUR_NAME)}
                </div>
            </div>

            <div class="signature-box">
                <img
                    src="${signatureURL}"
                    alt="Handwritten signature"
                >

                <div class="line">
                    ${escapeHTML(HER_NAME)}
                </div>
            </div>

        </div>

        <div class="date">
            ${escapeHTML(formattedDate)}
        </div>

        <div class="seal">
            ♡
        </div>

        <div class="accepted">
            Agreement Accepted ♡
        </div>

    </div>

</div>

</body>
</html>
        `;
    }

    function downloadContract() {
        if (!hasSignature) {
            showHint(
                "Please add your signature first ♡"
            );

            return;
        }

        const signatureURL =
            getSignatureDataURL();

        const html =
            createContractHTML(
                signatureURL
            );

        const blob = new Blob(
            [html],
            {
                type: "text/html;charset=utf-8"
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "Our-Little-Contract.html";

        document.body.appendChild(link);

        link.click();

        link.remove();

        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    }

    canvas.addEventListener(
        "mousedown",
        startDrawing
    );

    canvas.addEventListener(
        "mousemove",
        draw
    );

    window.addEventListener(
        "mouseup",
        stopDrawing
    );

    canvas.addEventListener(
        "mouseleave",
        stopDrawing
    );

    canvas.addEventListener(
        "touchstart",
        startDrawing,
        { passive: false }
    );

    canvas.addEventListener(
        "touchmove",
        draw,
        { passive: false }
    );

    canvas.addEventListener(
        "touchend",
        stopDrawing
    );

    canvas.addEventListener(
        "touchcancel",
        stopDrawing
    );

    clearButton.addEventListener(
        "click",
        clearSignature
    );

    agreeButton.addEventListener(
        "click",
        sealContract
    );

    downloadButton.addEventListener(
        "click",
        downloadContract
    );

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    resizeCanvas();
});