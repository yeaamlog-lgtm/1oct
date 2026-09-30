/* =========================================================
   GMAIL - FULL WORKING JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const mailSearch = document.getElementById("mailSearch");
    const clearSearch = document.getElementById("clearSearch");
    const mailList = document.getElementById("mailList");
    const noResults = document.getElementById("noResults");

    const selectAll = document.getElementById("selectAll");
    const refreshMail = document.getElementById("refreshMail");

    const composeButton = document.getElementById("composeButton");

    const mailOverlay = document.getElementById("mailOverlay");
    const closeMail = document.getElementById("closeMail");

    const modalSubject = document.getElementById("modalSubject");
    const modalBody = document.getElementById("modalBody");

    const toast = document.getElementById("toast");

    const menuButton = document.getElementById("menuButton");
    const gmailSidebar = document.getElementById("gmailSidebar");

    const categoryTabs =
        document.querySelectorAll(".category-tab");

    const sidebarItems =
        document.querySelectorAll(".sidebar-item");


    /* =====================================================
       MAIL DATA
       ===================================================== */

    const messages = [
        {
            id: 1,
            sender: "Prakhar",
            subject: "Aaj phir uski smile...",
            preview:
                "Honestly, ek smile aur mera pura din automatically better.",
            time: "6:42 PM",
            folder: "inbox",
            unread: true,
            starred: false,
            important: false
        },

        {
            id: 2,
            sender: "Prakhar",
            subject: "She's actually adorable",
            preview:
                "Official observation: way too cute for absolutely no reason.",
            time: "5:58 PM",
            folder: "inbox",
            unread: true,
            starred: false,
            important: false
        },

        {
            id: 3,
            sender: "Prakhar",
            subject: "Baabeee appreciation mail ♡",
            preview:
                "Just a reminder that you're genuinely one of my favourite people.",
            time: "5:21 PM",
            folder: "inbox",
            unread: true,
            starred: true,
            important: false
        },

        {
            id: 4,
            sender: "Prakhar",
            subject: "4'11 but 10/10",
            preview:
                "Height may be tiny. Impact? Completely unfair.",
            time: "4:47 PM",
            folder: "inbox",
            unread: true,
            starred: false,
            important: true
        },

        {
            id: 5,
            sender: "Prakhar",
            subject: "Why is she this cute?",
            preview:
                "Serious question. Still waiting for a scientifically valid explanation.",
            time: "3:35 PM",
            folder: "inbox",
            unread: false,
            starred: false,
            important: false
        },

        {
            id: 6,
            sender: "Prakhar",
            subject: "Official complaint: Too Pretty",
            preview:
                "Please stop being this pretty. It's becoming a serious distraction.",
            time: "2:56 PM",
            folder: "inbox",
            unread: false,
            starred: false,
            important: true
        },

        {
            id: 7,
            sender: "Prakhar",
            subject: "Things I secretly love about her",
            preview:
                "Her laugh. Her voice. Her random talks. Her little moods. Basically... her.",
            time: "1:42 PM",
            folder: "inbox",
            unread: false,
            starred: true,
            important: false
        },

        {
            id: 8,
            sender: "Prakhar",
            subject: "Her laugh deserves its own email",
            preview:
                "Because apparently one email wasn't enough to appreciate that laugh.",
            time: "12:18 PM",
            folder: "inbox",
            unread: false,
            starred: false,
            important: false
        },

        {
            id: 9,
            sender: "Prakhar",
            subject: "A very important reminder",
            preview:
                "You are loved, appreciated and slightly over-teased. In that order.",
            time: "11:37 AM",
            folder: "inbox",
            unread: false,
            starred: false,
            important: true
        },

        {
            id: 10,
            sender: "Prakhar",
            subject: "Subject: You",
            preview:
                "That's it. That's the entire email. ♡",
            time: "10:54 AM",
            folder: "inbox",
            unread: false,
            starred: false,
            important: false
        },

        {
            id: 11,
            sender: "Prakhar",
            subject: "Golgappe emergency",
            preview:
                "In case of bad mood, deploy golgappe immediately.",
            time: "10:17 AM",
            folder: "inbox",
            unread: false,
            starred: false,
            important: false
        },

        {
            id: 12,
            sender: "Prakhar",
            subject: "You're my favourite notification",
            preview:
                "No matter how busy the day gets, seeing your name still hits different.",
            time: "Yesterday",
            folder: "inbox",
            unread: false,
            starred: true,
            important: false
        },

        {
            id: 13,
            sender: "Prakhar",
            subject: "Small girl, huge personality",
            preview:
                "Somehow 4'11 manages to occupy approximately 100% of my thoughts.",
            time: "Yesterday",
            folder: "inbox",
            unread: false,
            starred: false,
            important: false
        },

        {
            id: 14,
            sender: "Prakhar",
            subject: "One tiny confession",
            preview:
                "Talking to you is probably one of my favourite parts of the day.",
            time: "Yesterday",
            folder: "inbox",
            unread: false,
            starred: false,
            important: false
        },

        {
            id: 15,
            sender: "Prakhar",
            subject: "Please don't change",
            preview:
                "Especially the silly, annoying, adorable version of you.",
            time: "Monday",
            folder: "inbox",
            unread: false,
            starred: false,
            important: false
        },

        {
            id: 16,
            sender: "Prakhar",
            subject: "I miss you a little",
            preview:
                "Okay, maybe more than a little.",
            time: "Monday",
            folder: "inbox",
            unread: false,
            starred: true,
            important: false
        },

        {
            id: 17,
            sender: "Prakhar",
            subject: "For the girl with the pretty smile",
            preview:
                "I hope you know how beautiful you look when you're genuinely happy.",
            time: "Sunday",
            folder: "inbox",
            unread: false,
            starred: false,
            important: false
        },

        {
            id: 18,
            sender: "Prakhar",
            subject: "One last thing ♡",
            preview:
                "Out of everything I could have written today, I just wanted to say: I adore you.",
            time: "Sunday",
            folder: "inbox",
            unread: false,
            starred: false,
            important: false
        }
    ];


    /* =====================================================
       STATE
       ===================================================== */

    let currentFolder = "inbox";
    let currentCategory = "primary";
    let currentSearch = "";
    let selectedIds = new Set();
    let openedMailId = null;

    let customDrafts = [];
    let customSent = [];


    /* =====================================================
       HELPERS
       ===================================================== */

    function showToast(message) {

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }


    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    function getAllMessages() {

        return [
            ...messages,
            ...customSent,
            ...customDrafts
        ];
    }


    function getVisibleMessages() {

        let list = getAllMessages();


        if (currentFolder === "starred") {

            list = list.filter(
                mail => mail.starred
            );
        }


        else if (currentFolder === "sent") {

            list = list.filter(
                mail => mail.folder === "sent"
            );
        }


        else if (currentFolder === "drafts") {

            list = list.filter(
                mail => mail.folder === "draft"
            );
        }


        else if (currentFolder === "trash") {

            list = list.filter(
                mail => mail.folder === "trash"
            );
        }


        else if (currentFolder === "archive") {

            list = list.filter(
                mail => mail.folder === "archive"
            );
        }


        else {

            list = list.filter(
                mail => mail.folder === "inbox"
            );
        }


        if (currentSearch) {

            const query =
                currentSearch.toLowerCase();

            list = list.filter(mail => {

                const searchable = [
                    mail.sender,
                    mail.subject,
                    mail.preview
                ]
                    .join(" ")
                    .toLowerCase();

                return searchable.includes(query);
            });
        }


        return list;
    }


    /* =====================================================
       RENDER MAIL LIST
       ===================================================== */

    function renderMails() {

        if (!mailList) return;

        const visible =
            getVisibleMessages();


        selectedIds = new Set(
            [...selectedIds].filter(
                id =>
                    visible.some(
                        mail => mail.id === id
                    )
            )
        );


        mailList.innerHTML = "";


        visible.forEach((mail, index) => {

            const article =
                document.createElement("article");

            article.className =
                `mail ${mail.unread ? "unread" : ""}`;

            article.dataset.id = mail.id;


            article.innerHTML = `

                <div class="mail-selection">

                    <input
                        type="checkbox"
                        class="mail-check"
                        aria-label="Select mail"
                        ${selectedIds.has(mail.id) ? "checked" : ""}
                    >

                </div>


                <button
                    class="mail-star ${mail.starred ? "starred" : ""}"
                    type="button"
                    aria-label="Star mail"
                >
                    ${mail.starred ? "★" : "☆"}
                </button>


                <button
                    class="mail-important ${mail.important ? "marked" : ""}"
                    type="button"
                    aria-label="Mark important"
                >
                    ${mail.important ? "»" : "›"}
                </button>


                <div class="sender">
                    ${escapeHTML(mail.sender)}
                </div>


                <button
                    class="mail-content"
                    type="button"
                >
                    <strong>
                        ${escapeHTML(mail.subject)}
                    </strong>

                    <span>
                        — ${escapeHTML(mail.preview)}
                    </span>
                </button>


                <time>
                    ${escapeHTML(mail.time)}
                </time>
            `;


            const checkbox =
                article.querySelector(".mail-check");

            const star =
                article.querySelector(".mail-star");

            const important =
                article.querySelector(".mail-important");

            const content =
                article.querySelector(".mail-content");


            checkbox.addEventListener(
                "click",
                event => {
                    event.stopPropagation();
                }
            );


            checkbox.addEventListener(
                "change",
                () => {

                    if (checkbox.checked) {
                        selectedIds.add(mail.id);
                    } else {
                        selectedIds.delete(mail.id);
                    }

                    updateSelectButton();
                }
            );


            star.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    mail.starred =
                        !mail.starred;

                    renderMails();

                    showToast(
                        mail.starred
                            ? "Starred"
                            : "Unstarred"
                    );
                }
            );


            important.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    mail.important =
                        !mail.important;

                    renderMails();

                    showToast(
                        mail.important
                            ? "Marked important"
                            : "Importance removed"
                    );
                }
            );


            content.addEventListener(
                "click",
                () => {
                    openMail(mail.id);
                }
            );


            article.style.animationDelay =
                `${index * 0.025}s`;

            mailList.appendChild(article);
        });


        if (noResults) {

            noResults.hidden =
                visible.length !== 0;
        }


        updateMailRange(
            visible.length
        );

        updateSelectButton();
    }


    /* =====================================================
       RANGE
       ===================================================== */

    function updateMailRange(count) {

        const range =
            document.querySelector(".mail-range");

        if (!range) return;

        range.textContent =
            count > 0
                ? `1–${count} of ${count}`
                : "0 of 0";
    }


    /* =====================================================
       SELECT ALL
       ===================================================== */

    function updateSelectButton() {

        if (!selectAll) return;

        const visible =
            getVisibleMessages();

        const allSelected =
            visible.length > 0 &&
            visible.every(
                mail =>
                    selectedIds.has(mail.id)
            );


        selectAll.textContent =
            allSelected ? "☑" : "□";
    }


    if (selectAll) {

        selectAll.addEventListener(
            "click",
            () => {

                const visible =
                    getVisibleMessages();

                const allSelected =
                    visible.length > 0 &&
                    visible.every(
                        mail =>
                            selectedIds.has(mail.id)
                    );


                if (allSelected) {

                    visible.forEach(
                        mail =>
                            selectedIds.delete(
                                mail.id
                            )
                    );

                } else {

                    visible.forEach(
                        mail =>
                            selectedIds.add(
                                mail.id
                            )
                    );
                }


                renderMails();
            }
        );
    }

/* =====================================================
       OPEN MAIL
       ===================================================== */

    function openMail(id) {

        const mail =
            getAllMessages()
                .find(
                    item =>
                        item.id === id
                );

        if (!mail) return;

        openedMailId = id;

        mail.unread = false;


        if (modalSubject) {
            modalSubject.textContent =
                mail.subject;
        }


        if (modalBody) {

            modalBody.textContent =
                getFullMessage(mail);
        }


        if (mailOverlay) {

            mailOverlay.hidden = false;

            document.body.style.overflow =
                "hidden";
        }


        renderMails();
    }


    function getFullMessage(mail) {

        const bodies = {

            "Aaj phir uski smile...":
                `Honestly, ek smile aur mera pura din automatically better.

Kabhi kabhi bas tumhari smile dekhna hi enough hota hai mood theek karne ke liye.

Tumhe shayad idea bhi nahi hai ki tumhari ek chhoti si smile kitna difference kar deti hai.`,

            "She's actually adorable":
                `Official observation:

You're way too cute for absolutely no reason.

Tum kuch bhi kar rahi hoti ho, somehow adorable hi lagti ho.

This is honestly becoming unfair.`,

            "Baabeee appreciation mail ♡":
                `Just a reminder that you're genuinely one of my favourite people.

Tumhare saath baat karna, tumhe tease karna, tumhari random stories sunna...

I genuinely love all of it.

You're special, Baabeee.`,

            "4'11 but 10/10":
                `Height may be tiny.

Impact?

Completely unfair.

4'11 ka package hai but personality aur attitude full-size.

And somehow that makes you even more adorable.`,

            "Why is she this cute?":
                `Serious question.

Why are you this cute?

I've tried finding a scientifically valid explanation but unfortunately none exists.

So I guess I'll just accept that you're ridiculously adorable.`,

            "Official complaint: Too Pretty":
                `Dear Baabeee,

Please stop being this pretty.

It's becoming a serious distraction.

Especially when you smile.

Consider this an official complaint that I will probably never actually want you to fix.`,

            "Things I secretly love about her":
                `Her laugh.

Her voice.

Her random talks.

Her little moods.

The way she gets excited about things.

Basically...

her.`,

            "Her laugh deserves its own email":
                `Because apparently one email wasn't enough to appreciate that laugh.

It's genuinely one of those sounds that can instantly make things feel better.

So yes, this email exists purely because your laugh deserves appreciation.`,

            "A very important reminder":
                `You are loved.

You are appreciated.

You are important.

And you're also slightly over-teased.

In that exact order.

Never forget that.`,

            "Subject: You":
                `That's it.

That's the entire email.

You.

Because somehow you're the subject of a lot of my favourite thoughts.`,

            "Golgappe emergency":
                `EMERGENCY NOTICE

In case of bad mood:

Step 1 — Get golgappe.

Step 2 — Eat golgappe.

Step 3 — Repeat until mood improves.

If that doesn't work, call Prakhar.`,

            "You're my favourite notification":
                `No matter how busy the day gets, seeing your name still hits different.

Some notifications are just notifications.

Yours somehow makes me want to check my phone immediately.

Favourite notification.

Always.`,

            "Small girl, huge personality":
                `Somehow 4'11 manages to occupy approximately 100% of my thoughts.

That's honestly an impressive achievement.

Small girl.

Huge personality.

And somehow an even bigger place in my heart.`,

            "One tiny confession":
                `Talking to you is probably one of my favourite parts of the day.

Even the random conversations.

Even the pointless arguments.

Even the silly things.

I wouldn't trade those moments for anything.`,

            "Please don't change":
                `Especially the silly, annoying, adorable version of you.

The random talks.

The teasing.

The little moods.

The laugh.

All of it.

Please stay exactly as wonderfully yourself as you are.`,

            "I miss you a little":
                `Okay...

Maybe more than a little.

Maybe I just don't want to admit how much I miss talking to you sometimes.

So let's officially call it "a little."`,

            "For the girl with the pretty smile":
                `I hope you know how beautiful you look when you're genuinely happy.

Not because someone told you.

Not because you tried.

Just because that's you.

And honestly, that smile is one of my favourite things.`,

            "One last thing ♡":
                `Out of everything I could have written today, I just wanted to say:

I adore you.

That's all.

No complicated explanation.

Just you.

And a very simple truth.

♡`
        };


        return bodies[mail.subject] ||
            mail.preview ||
            "No message content.";
    }


    /* =====================================================
       CLOSE MAIL
       ===================================================== */

    function closeMailModal() {

        if (!mailOverlay) return;

        mailOverlay.hidden = true;

        document.body.style.overflow = "";

        openedMailId = null;
    }


    if (closeMail) {

        closeMail.addEventListener(
            "click",
            closeMailModal
        );
    }


    if (mailOverlay) {

        mailOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    mailOverlay
                ) {
                    closeMailModal();
                }
            }
        );
    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                mailOverlay &&
                !mailOverlay.hidden
            ) {
                closeMailModal();
            }
        }
    );


    /* =====================================================
       SEARCH
       ===================================================== */

    if (mailSearch) {

        mailSearch.addEventListener(
            "input",
            () => {

                currentSearch =
                    mailSearch.value.trim();

                renderMails();
            }
        );


        mailSearch.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    currentSearch =
                        mailSearch.value.trim();

                    renderMails();

                    showToast(
                        currentSearch
                            ? `Searching for "${currentSearch}"`
                            : "Showing all mail"
                    );
                }


                if (event.key === "Escape") {

                    mailSearch.value = "";

                    currentSearch = "";

                    renderMails();

                    mailSearch.blur();
                }
            }
        );
    }


    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            () => {

                mailSearch.value = "";

                currentSearch = "";

                renderMails();

                mailSearch.focus();
            }
        );
    }


    /* =====================================================
       REFRESH
       ===================================================== */

    if (refreshMail) {

        refreshMail.addEventListener(
            "click",
            () => {

                refreshMail.classList.add(
                    "refreshing"
                );

                renderMails();

                setTimeout(() => {

                    refreshMail.classList.remove(
                        "refreshing"
                    );

                    showToast(
                        "Inbox refreshed"
                    );

                }, 500);
            }
        );
    }


    /* =====================================================
       SIDEBAR
       ===================================================== */

    if (menuButton && gmailSidebar) {

        menuButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                gmailSidebar.classList.toggle(
                    "open"
                );
            }
        );
    }


    sidebarItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const label =
                    item.querySelector(
                        ".sidebar-label"
                    )?.textContent
                    .trim()
                    .toLowerCase();


                if (!label) return;


                if (label === "inbox") {
                    currentFolder = "inbox";
                }

                else if (label === "starred") {
                    currentFolder = "starred";
                }

                else if (label === "sent") {
                    currentFolder = "sent";
                }

                else if (label === "drafts") {
                    currentFolder = "drafts";
                }

                else if (label === "settings") {

                    showToast(
                        "Settings opened"
                    );

                    return;
                }

                else if (label === "snoozed") {

                    showToast(
                        "No snoozed mail"
                    );

                    return;
                }

                else if (label === "more") {

                    showToast(
                        "More folders coming soon"
                    );

                    return;
                }


                sidebarItems.forEach(
                    button =>
                        button.classList.remove(
                            "active"
                        )
                );


                item.classList.add("active");


                renderMails();


                if (
                    window.innerWidth <= 650
                ) {
                    gmailSidebar.classList.remove(
                        "open"
                    );
                }
            }
        );
    });


    /* =====================================================
       CATEGORIES
       ===================================================== */

    categoryTabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                categoryTabs.forEach(
                    button =>
                        button.classList.remove(
                            "active"
                        )
                );

                tab.classList.add("active");

                const text =
                    tab.textContent
                        .trim()
                        .toLowerCase();


                if (text.includes("primary")) {
                    currentCategory = "primary";
                }

                else if (
                    text.includes("promotions")
                ) {
                    currentCategory = "promotions";
                }

                else {
                    currentCategory = "social";
                }


                renderMails();
            }
        );
    });


    /* =====================================================
       COMPOSE
       ===================================================== */

    if (composeButton) {

        composeButton.addEventListener(
            "click",
            openCompose
        );
    }


    function openCompose() {

        if (
            document.getElementById(
                "composeWindow"
            )
        ) {
            return;
        }


        const compose =
            document.createElement("div");

        compose.id =
            "composeWindow";

        compose.className =
            "compose-window";


        compose.innerHTML = `

            <div class="compose-header">

                <strong>
                    New Message
                </strong>

                <button
                    type="button"
                    class="compose-close"
                    aria-label="Close"
                >
                    ×
                </button>

            </div>


            <div class="compose-fields">

                <input
                    class="compose-to"
                    type="text"
                    placeholder="Recipients"
                >

                <input
                    class="compose-subject"
                    type="text"
                    placeholder="Subject"
                >

                <textarea
                    class="compose-body"
                    placeholder="Write a message..."
                ></textarea>

            </div>


            <div class="compose-footer">

                <button
                    type="button"
                    class="compose-send"
                >
                    Send
                </button>

                <button
                    type="button"
                    class="compose-discard"
                >
                    🗑
                </button>

            </div>
        `;


        document.body.appendChild(compose);


        compose
            .querySelector(".compose-close")
            .addEventListener(
                "click",
                () => compose.remove()
            );


        compose
            .querySelector(".compose-discard")
            .addEventListener(
                "click",
                () => {

                    compose.remove();

                    showToast(
                        "Draft discarded"
                    );
                }
            );


        compose
            .querySelector(".compose-send")
            .addEventListener(
                "click",
                () => {

                    const to =
                        compose
                            .querySelector(
                                ".compose-to"
                            )
                            .value
                            .trim();

                    const subject =
                        compose
                            .querySelector(
                                ".compose-subject"
                            )
                            .value
                            .trim();

                    const body =
                        compose
                            .querySelector(
                                ".compose-body"
                            )
                            .value
                            .trim();


                    if (!to) {

                        showToast(
                            "Add a recipient"
                        );

                        return;
                    }


                    if (!subject) {

                        showToast(
                            "Add a subject"
                        );

                        return;
                    }


                    customSent.unshift({

                        id:
                            Date.now(),

                        sender:
                            "me",

                        subject,

                        preview:
                            body || "(no message body)",

                        time:
                            "Just now",

                        folder:
                            "sent",

                        unread:
                            false,

                        starred:
                            false,

                        important:
                            false,

                        to,

                        body
                    });


                    compose.remove();


                    currentFolder = "sent";

                    renderMails();


                    showToast(
                        "Message sent"
                    );
                }
            );


        compose
            .querySelector(".compose-to")
            .focus();
    }


    /* =====================================================
       MODAL ACTIONS
       ===================================================== */

    const modalToolbar =
        document.querySelector(
            ".modal-toolbar"
        );


    if (modalToolbar) {

        const tools =
            modalToolbar.querySelectorAll(
                ".modal-tool"
            );


        if (tools[1]) {

            tools[1].addEventListener(
                "click",
                () => {

                    if (!openedMailId) return;

                    const mail =
                        getAllMessages()
                            .find(
                                item =>
                                    item.id ===
                                    openedMailId
                            );

                    if (!mail) return;

                    mail.folder = "archive";

                    closeMailModal();

                    renderMails();

                    showToast(
                        "Conversation archived"
                    );
                }
            );
        }


        if (tools[2]) {

            tools[2].addEventListener(
                "click",
                () => {

                    if (!openedMailId) return;

                    const mail =
                        getAllMessages()
                            .find(
                                item =>
                                    item.id ===
                                    openedMailId
                            );

                    if (!mail) return;

                    mail.folder = "trash";

                    closeMailModal();

                    renderMails();

                    showToast(
                        "Conversation moved to Trash"
                    );
                }
            );
        }
    }


    /* =====================================================
       INITIAL RENDER
       ===================================================== */

    renderMails();

});