// import resources
// import anime from "animejs/lib/anime.es.js";
// import { Curtains, Plane } from "curtainsjs";

import { Curtains, Plane } from "../node_modules/curtainsjs/src/index.mjs";

window.addEventListener("load", () => {
  // set up our WebGL context and append the canvas to our wrapper
  const curtains = new Curtains({
    container: "canvas",
    pixelRatio: Math.min(1.5, window.devicePixelRatio), // limit pixel ratio for performance
  });

  curtains
    .onRender(() => {
      // update our planes deformation
      // increase/decrease the effect
      planesDeformations = curtains.lerp(planesDeformations, 0, 0.075);
    })
    .onScroll(() => {
      // get scroll deltas to apply the effect on scroll
      const delta = curtains.getScrollDeltas();

      // invert value for the effect
      delta.y = -delta.y;

      // threshold
      if (delta.y > 80) {
        delta.y = 80;
      } else if (delta.y < -80) {
        delta.y = -80;
      }

      if (Math.abs(delta.y) > Math.abs(planesDeformations)) {
        planesDeformations = curtains.lerp(planesDeformations, delta.y, 0.5);
      }
    })
    .onError(() => {
      // we will add a class to the document body to display original images
      document.body.classList.add("no-curtains", "planes-loaded");
    })
    .onContextLost(() => {
      // on context lost, try to restore the context
      curtains.restoreContext();
    });

  // we will keep track of all our planes in an array
  const planes = [];
  let planesDeformations = 0;

  // get our planes elements
  let planeElements = document.getElementsByClassName("plane");

  const vs = `
        precision mediump float;
    
        // default mandatory variables
        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;
    
        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;
    
        uniform mat4 planeTextureMatrix;
    
        // custom variables
        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;
    
        uniform float uPlaneDeformation;
    
        void main() {
            vec3 vertexPosition = aVertexPosition;
    
            // cool effect on scroll
            vertexPosition.y += sin(((vertexPosition.x + 1.0) / 2.0) * 3.141592) * (sin(uPlaneDeformation / 90.0));
    
            gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    
            // varyings
            vVertexPosition = vertexPosition;
            vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
        }
    `;

  const fs = `
        precision mediump float;
    
        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;
    
        uniform sampler2D planeTexture;
    
        void main() {
            // just display our texture
            gl_FragColor = texture2D(planeTexture, vTextureCoord);
        }
    `;

  // all planes will have the same parameters
  const params = {
    vertexShader: vs,
    fragmentShader: fs,
    widthSegments: 10,
    heightSegments: 10,
    fov: 45,
    drawCheckMargins: {
      top: 100,
      right: 0,
      bottom: 100,
      left: 0,
    },
    uniforms: {
      planeDeformation: {
        name: "uPlaneDeformation",
        type: "1f",
        value: 0,
      },
    },
  };

  // add our planes and handle them
  for (let i = 0; i < planeElements.length; i++) {
    planes.push(new Plane(curtains, planeElements[i], params));

    handlePlanes(i);
  }

  // handle all the planes
  function handlePlanes(index) {
    const plane = planes[index];

    // check if our plane is defined and use it
    plane
      .onReady(() => {
        // once everything is ready, display everything
        if (index === planes.length - 1) {
          document.body.classList.add("planes-loaded");
        }
      })
      .onRender(() => {
        // update the uniform
        plane.uniforms.planeDeformation.value = planesDeformations;
      });
  }

  // this will simulate an ajax lazy load call
  // additionnalPlanes string could be the response of our AJAX call
});
