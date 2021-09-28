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
// nav flexibility
const nav = document.getElementById("nav");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 100) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
});

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

// nav btns initialize for smooth transition

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

// overlay animation

TweenMax.to(".overlay-s1", 1, {
  x: "-100%",
  ease: Expo.easeInout,
});

TweenMax.to(".overlay-s2", 1, {
  x: "-100%",
  delay: 0.4,
  ease: Expo.easeInout,
});

TweenMax.from(".site-heading", 1, {
  y: 120,
  delay: 0.8,
  ease: Expo.easeInout,
});

// after overlay effect
const anchors = document.querySelectorAll(".transition-btn");

for (let i = 0; i < anchors.length; i++) {
  const anchor = anchors[i];

  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    let target = e.target;

    if (target.nodeName === "SPAN") {
      target = target.parentElement.href;
    }

    TweenMax.to(".overlay-s1", 1, {
      x: 0,
      delay: 1,
      ease: Expo.easeInOut,
    });

    TweenMax.to(".overlay-s2", 1, {
      x: 0,
      delay: 0.6,
      ease: Expo.easeInOut,
    });

    TweenMax.to(".site-heading", 1, {
      y: 120,
      delay: 0.8,
      ease: Expo.easeInout,
    });

    setTimeout(() => {
      window.location.href = target;
    }, 3000);
  });
}
