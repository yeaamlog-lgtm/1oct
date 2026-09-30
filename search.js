const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const luckyButton = document.getElementById("luckyButton");
const clearSearch = document.getElementById("clearSearch");
const suggestions = document.getElementById("searchSuggestions");

const googleCenter = document.getElementById("googleCenter");
const resultsPage = document.getElementById("resultsPage");

const resultsInput = document.getElementById("resultsInput");
const resultsClear = document.getElementById("resultsClear");
const resultsContainer = document.getElementById("resultsContainer");
const resultCount = document.getElementById("resultCount");


/* =========================
   QUESTIONS
========================= */

const questions = [
    "What is her name?",
    "What is her boyfriend's name?",
    "When is her birthday?",
    "When is her boyfriend's birthday?",
    "How tall is she?",
    "What can instantly make her happy?",
    "Which colour feels the most like her?",
    "What are the two things she can never stay away from?",
    "What's one thing she wishes could remain the same forever?",
    "What does her perfect playlist sound like?"
];


/* =========================
   ANSWERS
========================= */

const answers = {

    "what is her name?": {
        title: "What is her name? ♡",
        answer: "Her name is [pratishtha]. ♡"
    },

    "what is her boyfriend's name?": {
        title: "What is her boyfriend's name? ♡",
        answer: "Her boyfriend's name is Prakhar. ♡"
    },

    "when is her birthday?": {
        title: "When is her birthday? 🎂♡",
        answer: "Her birthday is on 31st July. ♡"
    },

    "when is her boyfriend's birthday?": {
        title: "When is her boyfriend's birthday? 🎂♡",
        answer: "Her boyfriend's birthday is on 4th November. ♡"
    },

    "how tall is she?": {
        title: "How tall is she? ♡",
        answer: `She's 4'11" — chhoti si, but somehow takes up a huge space in my heart. ♡`
    },

    "what can instantly make her happy?": {
        title: "What can instantly make her happy?",
        answer: "Golgappe, chocolate, ice cream aur momos. Basically, good food = instant happiness. ♡"
    },

    "which colour feels the most like her?": {
        title: "Which colour feels the most like her?",
        answer: "Black. Simple, classy and somehow just feels very her."
    },

    "what are the two things she can never stay away from?": {
        title: "What are the two things she can never stay away from?",
        answer: "Food and phone. The two constants. 😂♡"
    },

    "what's one thing she wishes could remain the same forever?": {
        title: "What's one thing she wishes could remain the same forever?",
        answer: "Her friend group staying exactly the way it is, forever. ♡"
    },

    "what does her perfect playlist sound like?": {
        title: "What does her perfect playlist sound like?",
        answer: "Arijit Singh, Karan Aujla, Shreya Ghoshal, Kishore Kumar, Lata Mangeshkar and Asha Bhosle."
    }

};


/* =========================
   HELPERS
========================= */

function normalize(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[’‘]/g, "'")
        .replace(/\s+/g, " ");
}

function updateClearButton() {
    if (searchInput.value.trim()) {
        clearSearch.classList.add("visible");
    } else {
        clearSearch.classList.remove("visible");
    }
}


/* =========================
   SUGGESTIONS
========================= */

function createSuggestion(question) {

    const item = document.createElement("button");

    item.className = "suggestion-item";
    item.type = "button";

    item.innerHTML = `
        <span class="suggestion-icon">⌕</span>
        <strong>${question}</strong>
    `;

    item.addEventListener("click", () => {

        searchInput.value = question;

        updateClearButton();
        hideSuggestions();

        setTimeout(() => {
            performSearch(question);
        }, 150);

    });

    return item;
}

function showSuggestions() {

    suggestions.innerHTML = "";

    questions.forEach(question => {
        suggestions.appendChild(
            createSuggestion(question)
        );
    });

    suggestions.classList.add("show");
}

function hideSuggestions() {
    suggestions.classList.remove("show");
}


/* =========================
   RESULT CARDS
========================= */

function createNormalResult(query) {

    return `
        <article class="result-card">

            <div class="result-url">
                special-search.local ›
                ${query.toLowerCase().replace(/\s+/g, "-")}
            </div>

            <div class="result-title">
                ${query}
            </div>

            <div class="result-description">
                A little search result about someone who is
                <strong>very special ♡</strong>
            </div>

        </article>
    `;
}

function createSpecialResult(data) {

    return `
        <article class="result-card special-result">

            <div class="result-url">
                my-favourite-person.local › answer
            </div>

            <div class="result-title">
                ${data.title}
            </div>

            <div class="result-description">
                Here's something you should know about her.
            </div>

            <div class="special-answer">
                <span class="answer-heart">♡</span>
                ${data.answer}
            </div>

        </article>
    `;
}


/* =========================
   SEARCH
========================= */

function performSearch(value) {

    const query = value.trim();

    if (!query) {
        return;
    }

    const normalizedQuery = normalize(query);
    const exactAnswer = answers[normalizedQuery];

    googleCenter.hidden = true;
    resultsPage.hidden = false;

    resultsInput.value = query;

    if (exactAnswer) {

        resultCount.textContent =
            `About 1 result for "${query}"`;

        resultsContainer.innerHTML = `
            ${createSpecialResult(exactAnswer)}
            ${createNormalResult(query)}
        `;

    } else {

        resultCount.textContent =
            `Search results for "${query}"`;

        resultsContainer.innerHTML = `
            ${createNormalResult(query)}

            <article class="result-card special-result">

                <div class="result-url">
                    special-search.local › little-secret
                </div>

                <div class="result-title">
                    Maybe you should ask something about her ♡
                </div>

                <div class="result-description">
                    Try one of the questions that appear
                    when you click the search bar.
                </div>

            </article>
        `;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   SEARCH INPUT
========================= */

searchInput.addEventListener("focus", () => {
    showSuggestions();
});

searchInput.addEventListener("click", () => {
    showSuggestions();
});

searchInput.addEventListener("input", () => {

    updateClearButton();

    const typed = normalize(searchInput.value);

    if (!typed) {
        showSuggestions();
        return;
    }

    const filteredQuestions = questions.filter(question =>
        normalize(question).includes(typed)
    );

    suggestions.innerHTML = "";

    filteredQuestions.forEach(question => {
        suggestions.appendChild(
            createSuggestion(question)
        );
    });

    if (filteredQuestions.length) {
        suggestions.classList.add("show");
    } else {
        hideSuggestions();
    }

});

searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        event.preventDefault();

        hideSuggestions();

        performSearch(searchInput.value);
    }

});


/* =========================
   SEARCH BUTTONS
========================= */

searchButton.addEventListener("click", () => {

    hideSuggestions();

    performSearch(searchInput.value);

});

luckyButton.addEventListener("click", () => {

    const randomQuestion =
        questions[
            Math.floor(Math.random() * questions.length)
        ];

    searchInput.value = randomQuestion;

    updateClearButton();

    setTimeout(() => {
        performSearch(randomQuestion);
    }, 250);

});


/* =========================
   CLEAR SEARCH
========================= */

clearSearch.addEventListener("click", () => {

    searchInput.value = "";

    updateClearButton();

    searchInput.focus();

    showSuggestions();

});


/* =========================
   RESULTS SEARCH
========================= */

resultsInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        event.preventDefault();

        performSearch(resultsInput.value);

    }

});

resultsInput.addEventListener("focus", () => {
    resultsInput.select();
});

resultsClear.addEventListener("click", () => {

    resultsInput.value = "";

    resultsInput.focus();

});


/* =========================
   OUTSIDE CLICK
========================= */

document.addEventListener("click", event => {

    if (
        !event.target.closest(".google-search-box") &&
        !event.target.closest(".search-suggestions")
    ) {
        hideSuggestions();
    }

});


/* =========================
   INITIAL STATE
========================= */

updateClearButton();