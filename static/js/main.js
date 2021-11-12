/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: true,
});

/*SCROLL HOME*/
sr.reveal(".home__title", {});
sr.reveal(".home__img", { delay: 200 });
sr.reveal(".home__social-icon", { delay: 200 });

/*SCROLL ABOUT*/
// sr.reveal(".about__img", {});
// sr.reveal(".about__subtitle", { delay: 400 });
sr.reveal(".about__text", { delay: 400 });

/*SCROLL SKILLS*/
sr.reveal(".all__skills", { delay: 200 });

/*SCROLL PROJECTS*/
sr.reveal(".project__card", { delay: 200 });

/*SCROLL CERTIFICATES*/
sr.reveal(".certifi__all", { delay: 200 });


function countChar(val) {
  var len = val.value.length;
  if (len >= 500) {
    val.value = val.value.substring(0, 500);
  } else {
    $('#charNum').text(500 - len);
  }
};


$(window).on("load", function () { $(".loader-wrapper").fadeOut("slow"); });



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


