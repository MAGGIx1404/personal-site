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

// transition

const anchors = document.querySelectorAll(".transition-btn");

for (let i = 0; i < anchors.length; i++) {
  const anchor = anchors[i];

  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    let target = e.target;

    if (target.nodeName === "SPAN") {
      target = target.parentElement.href;
    }

    TweenLite.to(".overlay-1", 1, {
      left: 0,
      ease: Expo.easeInOut,
    });

    TweenLite.to(".overlay-2", 1, {
      left: 0,
      delay: 0.4,
      ease: Expo.easeInOut,
    });

    setTimeout(() => {
      window.location.href = target;
    }, 2500);
  });
}
