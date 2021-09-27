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
import Menu from "./menu";
import { preloader } from "./preloader";
import LocomotiveScroll from "locomotive-scroll";

// menu (<nav> element)
const menuEl = document.querySelector(".menu");
const menu__item = document.querySelectorAll(".menu__item");
// preload the images set as data attrs in the menu items
preloader("menu__item").then(() => {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  });
  // initialize menu
  new Menu(menuEl);
});

// overlay animation
TweenMax.to(".overlay-1-1", 1, {
  left: "-100%",
  ease: Expo.easeInOut,
});

TweenMax.to(".overlay-1-2", 1, {
  delay: 0.4,
  left: "-100%",
  ease: Expo.easeInOut,
});

TweenMax.from("span", 2, {
  delay: 0.2,
  opacity: 0,
  y: "100%",
  ease: Expo.easeInOut,
});

// reverse transition of pages

const span_all = document.querySelectorAll("span");
const anchors = document.querySelectorAll(".transition-btn");

for (let i = 0; i < anchors.length; i++) {
  const anchor = anchors[i];

  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    let target = e.target;

    if (target.nodeName === "SPAN") {
      target = target.parentElement.href;
    }

    TweenLite.to(span_all, 1, {
      opacity: 0,
      y: "100%",
      ease: Expo.easeInOut,
    });

    TweenLite.to(".overlay-1-1", 1, {
      left: 0,
      delay: 1,
      ease: Expo.easeInOut,
    });

    TweenLite.to(".overlay-1-2", 1, {
      left: 0,
      delay: 0.6,
      ease: Expo.easeInOut,
    });

    setTimeout(() => {
      window.location.href = target;
    }, 3000);
  });
}

// // nav flexibility
// const nav = document.getElementById("nav");

// window.addEventListener("scroll", function () {
//   if (window.pageYOffset > 100) {
//     nav.classList.add("active");
//   } else {
//     nav.classList.remove("active");
//   }
// });

// smooth scroll
// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// let container = document.querySelector("#scroll-container");

// let height;
// function setHeight() {
//   height = container.clientHeight;
//   document.body.style.height = height + "px";
// }
// ScrollTrigger.addEventListener("refreshInit", setHeight);

// // smooth scrolling container
// gsap.to(container, {
//   y: () => -(height - document.documentElement.clientHeight),
//   ease: "none",
//   scrollTrigger: {
//     trigger: document.body,
//     start: "top top",
//     end: "bottom bottom",
//     scrub: 1,
//     invalidateOnRefresh: true,
//   },
// });

// // nav btns initialize for smooth transition

// var btn_nav = document.querySelectorAll(".top-btn");

// function setupLinks(scroller) {
//   let linkElements = gsap.utils.toArray(btn_nav),
//     linkTargets = linkElements.map((e) =>
//       document.querySelector(e.getAttribute("href"))
//     ),
//     linkPositions = [],
//     calculatePositions = () => {
//       let offset = gsap.getProperty(scroller, "y");
//       linkTargets.forEach(
//         (e, i) => (linkPositions[i] = e.getBoundingClientRect().top - offset)
//       );
//     };

//   linkElements.forEach((element, i) => {
//     element.addEventListener("click", (e) => {
//       e.preventDefault();
//       gsap.to(window, {
//         scrollTo: linkPositions[i],
//         ease: "power4",
//         overwrite: true,
//       });
//     });
//   });

//   ScrollTrigger.addEventListener("refresh", calculatePositions);
// }

// setupLinks(container);
