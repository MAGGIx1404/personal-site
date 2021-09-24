// import resorceses from node-modules
import {
  gsap,
  ScrollTrigger,
  Draggable,
  MotionPathPlugin,
  ScrollToPlugin,
} from "gsap/all";
import Parallax from "parallax-js";

// nav flexibility
const nav = document.getElementById("nav");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 100) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
});

// parallax effect in banner

var scene = document.getElementById("scene");
var scene_four = document.getElementById("scene-4");
var scene_five = document.getElementById("scene-5");
var parallaxInstance = new Parallax(scene);
var parallaxInstance_four = new Parallax(scene_four);
var parallaxInstance_five = new Parallax(scene_five);

// smooth scroll
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let container = document.querySelector("#scroll-container");

let height;
function setHeight() {
  height = container.clientHeight;
  document.body.style.height = height + "px";
}
ScrollTrigger.addEventListener("refreshInit", setHeight);

// smooth scrolling container
gsap.to(container, {
  y: () => -(height - document.documentElement.clientHeight),
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    invalidateOnRefresh: true,
  },
});

var btn_nav = document.querySelectorAll(".nav-btn");

function setupLinks(scroller) {
  let linkElements = gsap.utils.toArray(btn_nav),
    linkTargets = linkElements.map((e) =>
      document.querySelector(e.getAttribute("href"))
    ),
    linkPositions = [],
    calculatePositions = () => {
      let offset = gsap.getProperty(scroller, "y");
      linkTargets.forEach(
        (e, i) => (linkPositions[i] = e.getBoundingClientRect().top - offset)
      );
    };

  linkElements.forEach((element, i) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      gsap.to(window, {
        scrollTo: linkPositions[i],
        ease: "power4",
        overwrite: true,
      });
    });
  });

  ScrollTrigger.addEventListener("refresh", calculatePositions);
}

setupLinks(container);
