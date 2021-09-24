// import resorceses from node-modules
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";
import Parallax from "parallax-js";
// import * as THREE from "three";
// import hoverEffect from "hover-effect";

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
var scene_two = document.getElementById("scene-2");
var scene_three = document.getElementById("scene-3");
var scene_four = document.getElementById("scene-4");
var scene_five = document.getElementById("scene-5");
var parallaxInstance = new Parallax(scene);
var parallaxInstance_two = new Parallax(scene_two);
var parallaxInstance_three = new Parallax(scene_three);
var parallaxInstance_four = new Parallax(scene_four);
var parallaxInstance_five = new Parallax(scene_five);
// about section picture hover effect
