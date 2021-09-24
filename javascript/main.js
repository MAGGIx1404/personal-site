// import resorceses from node-modules
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";
import Parallax from "parallax-js";
import LocomotiveScroll from "locomotive-scroll";

// smooth scroll (locomotive-scroll init)
const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
});

// nav flexibility
const nav = document.getElementById("nav");

window.addEventListener("scroll", function () {
  if (this.pageYOffset > 100) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
});
