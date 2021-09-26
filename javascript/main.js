// import resorceses from node-modules
import {
  gsap,
  ScrollTrigger,
  Draggable,
  MotionPathPlugin,
  ScrollToPlugin,
  TweenLite,
  TweenMax,
  CSSPlugin,
  EasePack,
  Expo,
} from "gsap/all";
import Parallax from "parallax-js";
import AOS from "aos";

// nav flexibility
const nav = document.getElementById("nav");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 100) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
});

// forward btn setting

const forward_btn = document.getElementById("forward-btn");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 200) {
    forward_btn.classList.add("active");
  } else {
    forward_btn.classList.remove("active");
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

// nav btns initialize for smooth transition

var btn_nav = document.querySelectorAll(".top-btn");

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

// loading animation

TweenLite.to(".loader-slide-2", 2, {
  y: "-100%",
  opacity: 0,
  delay: 2,
  ease: Expo.easeInOut,
});

TweenLite.to(".loader-slide-1", 2, {
  y: "-100%",
  opacity: 0,
  delay: 2.4,
  ease: Expo.easeInOut,
});

TweenLite.from(".loader-animation", 1.2, {
  opacity: 0,
  ease: Expo.easeInOut,
});

TweenLite.from(".banner .banner-content h1", 1, {
  opacity: 0,
  x: -100,
  delay: 3,
  ease: Expo.ease,
});

TweenLite.from(".banner .banner-content p", 1, {
  opacity: 0,
  x: -100,
  delay: 3.4,
  ease: Expo.ease,
});

TweenLite.from(".banner .banner-content a", 1, {
  opacity: 0,
  x: -100,
  delay: 3.8,
  ease: Expo.ease,
});

TweenLite.from(".banner .banner-pic img", 1, {
  opacity: 0,
  delay: 4.2,
  ease: Expo.ease,
});

// loader setting
const loader_container = document.getElementById("loader");

window.addEventListener("load", function () {
  setTimeout(() => {
    loader_container.classList.add("close");
  }, 4500);
  AOS.init();
});

// scroll animation
gsap.utils.toArray(".revealUp").forEach(function (elem) {
  ScrollTrigger.create({
    trigger: elem,
    start: "top 95%",
    end: "bottom 5%",
    // markers: true,
    onEnter: function () {
      gsap.fromTo(
        elem,
        { y: 100, autoAlpha: 0 },
        {
          duration: 1.25,
          y: 0,
          autoAlpha: 1,
          ease: "back",
          overwrite: "auto",
        }
      );
    },
    onLeave: function () {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    },
    onEnterBack: function () {
      gsap.fromTo(
        elem,
        { y: -100, autoAlpha: 0 },
        {
          duration: 1.25,
          y: 0,
          autoAlpha: 1,
          ease: "back",
          overwrite: "auto",
        }
      );
    },
    onLeaveBack: function () {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    },
  });
});
