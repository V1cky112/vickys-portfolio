/* =========================================================
   PORTFOLIO SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LANGUAGE
    ====================================================== */

    let currentLanguage = "de";

    const languageButtons =
        document.querySelectorAll(".lang-btn");

    function setLanguage(language) {

        currentLanguage = language;

        document.documentElement.lang =
            language;

        languageButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.lang === language
            );

        });

        document
            .querySelectorAll("[data-de][data-en]")
            .forEach(element => {

                const value =
                    element.dataset[language];

                if (value !== undefined) {
                    element.innerHTML = value;
                }

            });

        document
            .querySelectorAll(
                "[data-aria-de][data-aria-en]"
            )
            .forEach(element => {

                const key =
                    language === "de"
                        ? "ariaDe"
                        : "ariaEn";

                const value =
                    element.dataset[key];

                if (value) {

                    element.setAttribute(
                        "aria-label",
                        value
                    );

                }

            });

        if (
            activeProject &&
            modal &&
            modal.classList.contains("open")
        ) {

            const project =
                projects[activeProject];

            if (project) {

                updateModalText(project);
                updateModalImage(false);

            }

        }

    }


    languageButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                setLanguage(
                    button.dataset.lang
                );

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".scroll-object, .fade-left, .fade-right"
        );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            /*
                             * Wichtig:
                             * Dein CSS verwendet teilweise
                             * noch .visible.
                             */
                            entry.target.classList.add(
                                "visible"
                            );

                        } else {

                            /*
                             * Beim Heraus-scrollen
                             * wieder verschwinden lassen.
                             */
                            entry.target.classList.remove(
                                "is-visible"
                            );

                            entry.target.classList.remove(
                                "visible"
                            );

                        }

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin: "-8% 0px -8% 0px"
                }
            );

        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "is-visible"
            );

            element.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       SMOOTH ANCHORS
    ====================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       PROJECT DATA
    ====================================================== */

    const projects = {

        "project-one": {

            image:
                "images/taekwondo-bild.png",

            de: {
                title:
                    "Taekwondo Werbespot",

                

                description:
                    "Für dieses Projekt habe ich einen einminütigen Werbespot für meinen Taekwondo-Verein erstellt, bei dem ich selbst Mitglied bin. Mein Ziel war es, einen authentischen Einblick in unser Training zu geben und sowohl Interesse am Verein als auch am Taekwondo-Sport zu wecken. Ich habe das gesamte Projekt selbst umgesetzt – von der ersten Idee und dem Storyboard über die Planung und Aufnahmen bis hin zum Schnitt und fertigen Video. Besonders viel Spaß hatte ich beim Filmen und Editieren, da ich dabei mit verschiedenen Aufnahmen und Schnitten arbeiten konnte. Eine Herausforderung beim Dreh war, dass meine Kamera während des Filmens überhitzt ist. Trotzdem konnte ich das Projekt erfolgreich fertigstellen und meine Idee für den Werbespot umsetzen",

                tags: [
                    "Werbespot",
                    "Video",
                    
                ]
            },

            en: {
                title:
                    "Taekwondo Advertisement",

                

                description:
                    "For this project, I created a one-minute promotional video for my Taekwondo club, where I am also a member. My goal was to give an authentic insight into our training and spark interest not only in the club, but also in Taekwondo as a sport. I worked on the entire project myself — from the initial idea and storyboard to planning, filming, editing, and the final video. My favorite parts were filming and editing, as I enjoyed experimenting with different shots and cuts to bring the video together. One challenge during the production was that my camera overheated while filming. Despite this, I managed to complete the project and bring my idea for the promotional video to life.",

                tags: [
                    "Advertisement",
                    "Videography",
                ]
            }

        },


        "project-two": {

            images: [
                "images/bild-01.jpg",
                "images/bild-02.jpg",
                "images/bild-03.jpg",
                "images/bild-04.jpg"
            ],

            de: {
                title:
                    "Kleine Momente",


                description:
                    "Eine Sammlung von Fotos, die ich auf Reisen spontan aufgenommen habe – einfach Momente und Dinge, die mir gefallen haben.",

                tags: [
                    "Fotografie",
                ]
            },

            en: {
                title:
                    "Through my lens.",


                description:
                    "A collection of photos I took while travelling — just moments and things that caught my eye.",

                tags: [
                    "Photography",
                ]
            }

        },


        "project-three": {

            image:
                "images/bild-07.jpg",

            de: {
                title:
                    "Fotografie Projekt",


                description:
                    "Fotografie Projekt im Basislehrjahr.",

                tags: [
                    "Fotografie",
                    "Projekt"
                ]
            },

            en: {
                title:
                    "Photography project",


                description:
                    "Photography project, Foundation Year – First Year of My Apprenticeship",

                tags: [
                    "Photography",
                    "project"
                ]
            }

        }

    };


    /* =====================================================
       MODAL ELEMENTS
    ====================================================== */

    const modal =
        document.getElementById(
            "projectModal"
        );

    const modalBackground =
        document.querySelector(
            ".modal-background"
        );

    const modalContent =
        document.querySelector(
            ".modal-content"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );

    const modalImage =
        document.getElementById(
            "modalImage"
        );

    const modalCategory =
        document.getElementById(
            "modalCategory"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );

    const modalTags =
        document.getElementById(
            "modalTags"
        );

    const modalPrev =
        document.getElementById(
            "modalPrev"
        );

    const modalNext =
        document.getElementById(
            "modalNext"
        );

    const modalCounter =
        document.getElementById(
            "modalCounter"
        );

    const modalImageArea =
        document.querySelector(
            ".modal-image"
        );


    /* =====================================================
       GALLERY STATE
    ====================================================== */

    let currentImages = [];
    let currentImageIndex = 0;
    let isChangingImage = false;
    let activeProject = null;

    let touchStartX = 0;
    let touchStartY = 0;


    /* =====================================================
       PRELOAD
    ====================================================== */

    function preloadImages(images) {

        images.forEach(src => {

            if (!src) {
                return;
            }

            const image =
                new Image();

            image.src = src;

        });

    }


    function preloadAdjacentImages() {

        if (currentImages.length <= 1) {
            return;
        }

        const nextIndex =
            (
                currentImageIndex + 1
            ) %
            currentImages.length;

        const previousIndex =
            (
                currentImageIndex -
                1 +
                currentImages.length
            ) %
            currentImages.length;

        const nextImage =
            new Image();

        nextImage.src =
            currentImages[nextIndex];

        const previousImage =
            new Image();

        previousImage.src =
            currentImages[previousIndex];

    }


    /* =====================================================
       MODAL TEXT
    ====================================================== */

    function updateModalText(project) {

        if (!project) {
            return;
        }

        const languageData =
            project[currentLanguage] ||
            project.de;

        if (!languageData) {
            return;
        }

        if (modalCategory) {

            modalCategory.textContent =
                languageData.category || "";

        }

        if (modalTitle) {

            modalTitle.textContent =
                languageData.title || "";

        }

        if (modalDescription) {

            modalDescription.textContent =
                languageData.description || "";

        }

        if (modalTags) {

            modalTags.innerHTML = "";

            if (
                Array.isArray(
                    languageData.tags
                )
            ) {

                languageData.tags.forEach(tag => {

                    const tagElement =
                        document.createElement(
                            "span"
                        );

                    tagElement.textContent =
                        tag;

                    modalTags.appendChild(
                        tagElement
                    );

                });

            }

        }

    }


    /* =====================================================
       MODAL IMAGE
    ====================================================== */

    function updateModalImage(
        animate = false
    ) {

        if (
            !modalImage ||
            currentImages.length === 0
        ) {
            return;
        }

        const imageSrc =
            currentImages[currentImageIndex];

        const title =
            modalTitle?.textContent ||
            "Projekt";

        /*
         * Normales Aktualisieren.
         */
        if (!animate) {

            modalImage.src =
                imageSrc;

            modalImage.alt =
                `${title} – Bild ${currentImageIndex + 1}`;

        }

        if (modalCounter) {

            modalCounter.textContent =
                `${currentImageIndex + 1} / ${currentImages.length}`;

        }

        const hasMultipleImages =
            currentImages.length > 1;

        if (modalPrev) {

            modalPrev.style.display =
                hasMultipleImages
                    ? "flex"
                    : "none";

        }

        if (modalNext) {

            modalNext.style.display =
                hasMultipleImages
                    ? "flex"
                    : "none";

        }

        if (modalCounter) {

            modalCounter.style.display =
                hasMultipleImages
                    ? "block"
                    : "none";

        }

        preloadAdjacentImages();

    }


    /* =====================================================
       OPEN PROJECT
    ====================================================== */

    function openProject(projectId) {

        const project =
            projects[projectId];

        if (!project || !modal) {
            return;
        }

        activeProject =
            projectId;

        if (
            Array.isArray(project.images) &&
            project.images.length > 0
        ) {

            currentImages =
                project.images.filter(Boolean);

        } else if (project.image) {

            currentImages = [
                project.image
            ];

        } else {

            currentImages = [];

        }

        currentImageIndex = 0;
        isChangingImage = false;

        resetGalleryAnimation();

        updateModalText(project);

        updateModalImage(false);

        if (currentImages.length > 1) {
            preloadImages(currentImages);
        }

        modal.classList.add(
            "open"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       CLOSE PROJECT
    ====================================================== */

    function closeProject() {

        if (!modal) {
            return;
        }

        modal.classList.remove(
            "open"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

        document.body.style.overflow =
            "";

        activeProject = null;
        currentImages = [];
        currentImageIndex = 0;
        isChangingImage = false;

        resetGalleryAnimation();

    }


    /* =====================================================
       RESET GALLERY ANIMATION
    ====================================================== */

    function resetGalleryAnimation() {

        if (!modalImage) {
            return;
        }

        modalImage.classList.remove(
            "slide-out-left",
            "slide-out-right",
            "slide-in-left",
            "slide-in-right",
            "gallery-out-left",
            "gallery-out-right",
            "gallery-in"
        );

    }


   function changePhoto(direction) {

    if (
        !modal ||
        !modal.classList.contains("open") ||
        !modalImage ||
        currentImages.length <= 1 ||
        isChangingImage
    ) {
        return;
    }

    if (
        direction !== "next" &&
        direction !== "previous"
    ) {
        return;
    }

    isChangingImage = true;

    /* =================================================
       NÄCHSTES / VORHERIGES BILD
    ================================================= */

    if (direction === "next") {

        currentImageIndex =
            (
                currentImageIndex + 1
            ) %
            currentImages.length;

    } else {

        currentImageIndex =
            (
                currentImageIndex - 1 +
                currentImages.length
            ) %
            currentImages.length;

    }

    const newSrc =
        currentImages[currentImageIndex];

    const newImage =
        new Image();

    /*
     * Neues Bild zuerst vollständig laden.
     * Das alte Bild bleibt solange sichtbar.
     */
    newImage.onload = () => {

        if (
            !modal ||
            !modal.classList.contains("open")
        ) {
            isChangingImage = false;
            return;
        }

        /*
         * Altes Bild NICHT ausblenden.
         * Einfach durch das neue ersetzen.
         */
        modalImage.src =
            newSrc;

        modalImage.alt =
            `${modalTitle?.textContent || "Projekt"} – Bild ${currentImageIndex + 1}`;

        /*
         * Keine Galerie-Animationsklassen.
         */
        modalImage.classList.remove(
            "slide-out-left",
            "slide-out-right",
            "slide-in-left",
            "slide-in-right",
            "gallery-out-left",
            "gallery-out-right",
            "gallery-in"
        );

        /*
         * Counter aktualisieren.
         */
        if (modalCounter) {

            modalCounter.textContent =
                `${currentImageIndex + 1} / ${currentImages.length}`;

        }

        preloadAdjacentImages();

        isChangingImage = false;

    };

    /*
     * Falls ein Bild nicht geladen werden kann,
     * bleibt das bisherige Bild stehen.
     */
    newImage.onerror = () => {

        isChangingImage = false;

    };

    newImage.src =
        newSrc;

}


    /* =====================================================
       PROJECT CARDS
    ====================================================== */

    document
        .querySelectorAll(".project-card")
        .forEach(card => {

            const projectId =
                card.dataset.project;

            if (!projectId) {
                return;
            }

            const openButton =
                card.querySelector(
                    ".project-open"
                );

            if (openButton) {

                openButton.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();
                        event.stopPropagation();

                        openProject(
                            projectId
                        );

                    }
                );

            }

            card.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            "button"
                        ) ||
                        event.target.closest(
                            "video"
                        ) ||
                        event.target.closest(
                            "a"
                        ) ||
                        event.target.closest(
                            ".project-hotspot"
                        )
                    ) {
                        return;
                    }

                    openProject(
                        projectId
                    );

                }
            );

        });


    /* =====================================================
       PREVIOUS
    ====================================================== */

    if (modalPrev) {

        modalPrev.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                changePhoto(
                    "previous"
                );

            }
        );

    }


    /* =====================================================
       NEXT
    ====================================================== */

    if (modalNext) {

        modalNext.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                changePhoto(
                    "next"
                );

            }
        );

    }


    /* =====================================================
       CLOSE
    ====================================================== */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                closeProject();

            }
        );

    }


    /* =====================================================
       BACKGROUND CLOSE
    ====================================================== */

    if (modalBackground) {

        modalBackground.addEventListener(
            "click",
            closeProject
        );

    }


    if (modalContent) {

        modalContent.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );

    }


    /* =====================================================
       TOUCH SWIPE
       NO WHEEL
    ====================================================== */

    if (modalImageArea) {

        modalImageArea.addEventListener(
            "touchstart",
            event => {

                if (
                    !modal ||
                    !modal.classList.contains("open") ||
                    currentImages.length <= 1
                ) {
                    return;
                }

                const touch =
                    event.changedTouches[0];

                touchStartX =
                    touch.clientX;

                touchStartY =
                    touch.clientY;

            },
            {
                passive: true
            }
        );


        modalImageArea.addEventListener(
            "touchend",
            event => {

                if (
                    !modal ||
                    !modal.classList.contains("open") ||
                    currentImages.length <= 1
                ) {
                    return;
                }

                const touch =
                    event.changedTouches[0];

                const touchEndX =
                    touch.clientX;

                const touchEndY =
                    touch.clientY;

                const distanceX =
                    touchEndX -
                    touchStartX;

                const distanceY =
                    touchEndY -
                    touchStartY;

                if (
                    Math.abs(distanceY) >
                    Math.abs(distanceX)
                ) {
                    return;
                }

                if (
                    Math.abs(distanceX) < 60
                ) {
                    return;
                }

                if (distanceX < 0) {

                    changePhoto(
                        "next"
                    );

                } else {

                    changePhoto(
                        "previous"
                    );

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       KEYBOARD
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal?.classList.contains("open")
            ) {

                closeProject();
                return;

            }

            if (
                !modal ||
                !modal.classList.contains("open")
            ) {
                return;
            }

            if (
                event.key === "ArrowLeft"
            ) {

                event.preventDefault();

                changePhoto(
                    "previous"
                );

            }

            if (
                event.key === "ArrowRight"
            ) {

                event.preventDefault();

                changePhoto(
                    "next"
                );

            }

        }
    );


    /* =====================================================
       RANDOM IDEA
    ====================================================== */

    const randomIdea =
        document.getElementById(
            "randomIdea"
        );

    const ideaBubble =
        document.getElementById(
            "ideaBubble"
        );

    const ideas = {

        de: [
            "Mach aus einer Idee ein echtes Projekt.",
            "Ein gutes Foto braucht nicht immer einen Plan.",
            "Probier etwas aus, das du noch nie gemacht hast.",
            "Vielleicht ist Chaos einfach ein Teil des Prozesses.",
            "Mach heute etwas nur, weil es interessant ist.",
            "Nicht alles muss perfekt sein.",
            "Eine kleine Idee kann ziemlich groß werden.",
            "Kamera raus. Einfach machen."
        ],

        en: [
            "Turn an idea into a real project.",
            "A good photo doesn't always need a plan.",
            "Try something you've never done before.",
            "Maybe chaos is just part of the process.",
            "Make something today just because it's interesting.",
            "Not everything has to be perfect.",
            "A small idea can become something big.",
            "Get the camera out. Just make it."
        ]

    };

    let ideaTimeout;

    if (
        randomIdea &&
        ideaBubble
    ) {

        randomIdea.addEventListener(
            "click",
            () => {

                const availableIdeas =
                    ideas[currentLanguage] ||
                    ideas.de;

                const randomIndex =
                    Math.floor(
                        Math.random() *
                        availableIdeas.length
                    );

                ideaBubble.textContent =
                    availableIdeas[randomIndex];

                ideaBubble.classList.add(
                    "show"
                );

                clearTimeout(
                    ideaTimeout
                );

                ideaTimeout =
                    setTimeout(
                        () => {

                            ideaBubble.classList.remove(
                                "show"
                            );

                        },
                        3500
                    );

            }
        );

    }


    /* =====================================================
       INTERACTION HOTSPOTS
    ====================================================== */

    const interactionMessage =
        document.getElementById(
            "interactionMessage"
        );

    let interactionTimeout;

    function showInteractionMessage(
        element
    ) {

        if (
            !interactionMessage ||
            !element
        ) {
            return;
        }

        const key =
            currentLanguage === "de"
                ? "messageDe"
                : "messageEn";

        const message =
            element.dataset[key];

        if (!message) {
            return;
        }

        interactionMessage.textContent =
            message;

        interactionMessage.classList.add(
            "show"
        );

        clearTimeout(
            interactionTimeout
        );

        interactionTimeout =
            setTimeout(
                () => {

                    interactionMessage.classList.remove(
                        "show"
                    );

                },
                2800
            );

    }


    document
        .querySelectorAll(
            ".image-hotspot, .project-hotspot"
        )
        .forEach(hotspot => {

            hotspot.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    showInteractionMessage(
                        hotspot
                    );

                }
            );

        });


    /* =====================================================
       MAGNETIC BUTTON
    ====================================================== */

    document
        .querySelectorAll(".magnetic")
        .forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    if (
                        window.matchMedia(
                            "(hover: none)"
                        ).matches
                    ) {
                        return;
                    }

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `translate(${x * 0.12}px, ${y * 0.12}px)`;

                }
            );

            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });


    /* =====================================================
       PROJECT IMAGE MOVEMENT
    ====================================================== */

    document
        .querySelectorAll(".project-image")
        .forEach(imageContainer => {

            imageContainer.addEventListener(
                "mousemove",
                event => {

                    if (
                        window.matchMedia(
                            "(hover: none)"
                        ).matches
                    ) {
                        return;
                    }

                    const rect =
                        imageContainer.getBoundingClientRect();

                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width -
                        0.5;

                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height -
                        0.5;

                    const image =
                        imageContainer.querySelector(
                            "img"
                        );

                    if (!image) {
                        return;
                    }

                    image.style.transform = `
                        scale(1.07)
                        translate(
                            ${x * 10}px,
                            ${y * 10}px
                        )
                    `;

                }
            );

            imageContainer.addEventListener(
                "mouseleave",
                () => {

                    const image =
                        imageContainer.querySelector(
                            "img"
                        );

                    if (!image) {
                        return;
                    }

                    image.style.transform =
                        "";

                }
            );

        });


    /* =====================================================
       STAR PARALLAX
    ====================================================== */

    const stars =
        document.querySelectorAll(
            ".star"
        );

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX /
                window.innerWidth -
                0.5;

            mouseY =
                event.clientY /
                window.innerHeight -
                0.5;

        }
    );


    function animateStars() {

        stars.forEach(
            (star, index) => {

                const depth =
                    (index + 1) * 0.6;

                star.style.marginLeft =
                    `${mouseX * depth * 12}px`;

                star.style.marginTop =
                    `${mouseY * depth * 12}px`;

            }
        );

        requestAnimationFrame(
            animateStars
        );

    }

    animateStars();


    /* =====================================================
       STAR CURSOR
    ====================================================== */

    const starCursor =
        document.querySelector(
            ".star-cursor"
        );

    const mouseGlow =
        document.querySelector(
            ".mouse-glow"
        );

    const particleContainer =
        document.querySelector(
            ".particle-container"
        );

    let cursorX = 0;
    let cursorY = 0;

    let targetX = 0;
    let targetY = 0;

    let lastParticleTime = 0;


    document.addEventListener(
        "mousemove",
        event => {

            targetX =
                event.clientX;

            targetY =
                event.clientY;

            if (mouseGlow) {

                mouseGlow.style.left =
                    `${targetX}px`;

                mouseGlow.style.top =
                    `${targetY}px`;

            }

            const now =
                performance.now();

            if (
                particleContainer &&
                now - lastParticleTime > 32
            ) {

                createCursorParticle(
                    targetX,
                    targetY
                );

                lastParticleTime =
                    now;

            }

        }
    );


    function createCursorParticle(
        x,
        y
    ) {

        if (!particleContainer) {
            return;
        }

        const particle =
            document.createElement(
                "span"
            );

        particle.className =
            "cursor-particle";

        const size =
            2 + Math.random() * 4;

        const moveX =
            (Math.random() - 0.5) * 14;

        const moveY =
            (Math.random() - 0.5) * 14;

        const moveXEnd =
            (Math.random() - 0.5) * 50;

        const moveYEnd =
            (Math.random() - 0.5) * 50;

        const duration =
            700 + Math.random() * 700;

        particle.style.setProperty(
            "--size",
            `${size}px`
        );

        particle.style.setProperty(
            "--x",
            `${x}px`
        );

        particle.style.setProperty(
            "--y",
            `${y}px`
        );

        particle.style.setProperty(
            "--move-x",
            `${moveX}px`
        );

        particle.style.setProperty(
            "--move-y",
            `${moveY}px`
        );

        particle.style.setProperty(
            "--move-x-end",
            `${moveXEnd}px`
        );

        particle.style.setProperty(
            "--move-y-end",
            `${moveYEnd}px`
        );

        particle.style.setProperty(
            "--duration",
            `${duration}ms`
        );

        particleContainer.appendChild(
            particle
        );

        setTimeout(
            () => particle.remove(),
            duration + 100
        );

    }


    function animateCursor() {

        cursorX +=
            (targetX - cursorX) * 0.18;

        cursorY +=
            (targetY - cursorY) * 0.18;

        if (starCursor) {

            starCursor.style.left =
                `${cursorX}px`;

            starCursor.style.top =
                `${cursorY}px`;

        }

        requestAnimationFrame(
            animateCursor
        );

    }

    animateCursor();


    /* =====================================================
       CURSOR HOVER
    ====================================================== */

    document.addEventListener(
        "mouseover",
        event => {

            if (
                event.target.closest(
                    "a, button, .project-card"
                )
            ) {

                document.body.classList.add(
                    "star-hover"
                );

            }

        }
    );


    document.addEventListener(
        "mouseout",
        event => {

            if (
                event.target.closest(
                    "a, button, .project-card"
                )
            ) {

                document.body.classList.remove(
                    "star-hover"
                );

            }

        }
    );


    /* =====================================================
       CURSOR CLICK
    ====================================================== */

    document.addEventListener(
        "click",
        () => {

            if (!starCursor) {
                return;
            }

            starCursor.classList.remove(
                "clicking"
            );

            void starCursor.offsetWidth;

            starCursor.classList.add(
                "clicking"
            );

        }
    );


    /* =====================================================
       IMAGE ERROR HANDLING
    ====================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.opacity =
                        "0.25";

                }
            );

        });


    /* =====================================================
       LAZY LOADING
    ====================================================== */

    document
        .querySelectorAll(
            "img:not(.hero-image)"
        )
        .forEach(image => {

            image.loading =
                "lazy";

            image.decoding =
                "async";

        });


    /* =====================================================
       CLEANUP
    ====================================================== */

    window.addEventListener(
        "beforeunload",
        () => {

            document.body.style.overflow =
                "";

        }
    );


    /* =====================================================
       INITIAL LANGUAGE
    ====================================================== */

    setLanguage("de");

});