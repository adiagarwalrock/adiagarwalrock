/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  /*Active link*/
  navLink.forEach((n) => n.classList.remove("active"));
  this.classList.add("active");

  /*Remove menu mobile*/
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: true,
});

/*SCROLL HOME*/
sr.reveal(".home__title", {});
sr.reveal(".button", { delay: 200 });
sr.reveal(".home__img", { delay: 400 });
sr.reveal(".home__social-icon", { interval: 200 });

/*SCROLL ABOUT*/
sr.reveal(".about__img", {});
sr.reveal(".about__subtitle", { delay: 400 });
sr.reveal(".about__text", { delay: 400 });

/*SCROLL SKILLS*/
sr.reveal(".skills__subtitle", {});
sr.reveal(".skills__text", {});
sr.reveal(".skills__data", { interval: 200 });
sr.reveal(".skills__img", { delay: 600 });

/*SCROLL PROJECTS*/
sr.reveal(".projects__img", { interval: 200 });

/*SCROLL CONTACT*/
sr.reveal(".contact__input", {});

/*SCROLL TIMELINE*/
// sr.reveal(".timeline", { interval: 200 });
// sr.reveal(".content", { interval: 400 });





$("textarea").keyup(function () {
    var characterCount = $(this).val().length,
        current = $("#current"),
        maximum = $("#maximum"),
        theCount = $("#the-count");

    current.text(characterCount);

    /*This isn't entirely necessary, just playin around*/
    if (characterCount < 70) {
        current.css("color", "#666");
    }
    if (characterCount > 70 && characterCount < 90) {
        current.css("color", "#6d5555");
    }
    if (characterCount > 90 && characterCount < 100) {
        current.css("color", "#793535");
    }
    if (characterCount > 100 && characterCount < 120) {
        current.css("color", "#841c1c");
    }
    if (characterCount > 120 && characterCount < 139) {
        current.css("color", "#8f0001");
    }

    if (characterCount >= 140) {
        maximum.css("color", "#8f0001");
        current.css("color", "#8f0001");
        theCount.css("font-weight", "bold");
    } else {
        maximum.css("color", "#666");
        theCount.css("font-weight", "normal");
    }
});