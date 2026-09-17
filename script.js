// ============================================= //
// MOBILE NAV TOGGLE
// ============================================= //

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {

    navToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close the mobile menu after a link is tapped
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open menu");
        });
    });
}


// ============================================= //
// PRESENTATION MODALS (PBL + Jigsaw)
// ============================================= //
// Each modal is wired the same way: an id, an "open" trigger button,
// and a "close" button inside it. Add more presentations later by
// adding another entry to this array plus the matching markup in HTML.

const modalConfigs = [
    { modalId: "pblModal", openId: "openPBL", closeId: "closePBL" },
    { modalId: "jigsawModal", openId: "openJigsaw", closeId: "closeJigsaw" }
];

let lastFocusedElement = null;
let activeModal = null;

function openModal(modal, closeButton) {
    if (!modal) return;

    lastFocusedElement = document.activeElement;
    activeModal = modal;

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";

    // Move focus into the modal for keyboard and screen-reader users
    if (closeButton) closeButton.focus();
}

function closeModal() {
    if (!activeModal) return;

    activeModal.classList.remove("is-open");
    document.body.style.overflow = "auto";

    // Return focus to whatever triggered the modal
    if (lastFocusedElement) lastFocusedElement.focus();

    activeModal = null;
}

modalConfigs.forEach(function (config) {
    const modal = document.getElementById(config.modalId);
    const openButton = document.getElementById(config.openId);
    const closeButton = document.getElementById(config.closeId);

    if (openButton) {
        openButton.addEventListener("click", function () {
            openModal(modal, closeButton);
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    // Close when clicking the dark overlay outside the modal content
    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});

// Close with the Escape key, whichever modal is open
window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activeModal) {
        closeModal();
    }
});


// ============================================= //
// FOOTER YEAR
// ============================================= //

const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
