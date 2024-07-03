const clapper = document.querySelector(".clapper");
const r = 50;

function makeShadow(element, func, options, left = 10, top = 15) {
  const target = func({
    left,
    top,
    opacity: 1,
    ...options });


  func({
    left: left * 2,
    top: top * 2,
    opacity: 0.2,
    ...options },
  target);

  element.appendChild(target);

  return target;
}
for (let i = 1; i <= 6; ++i) {
  const size = 170 - (i - 1) * 20;
  const stroke = r * 12 / size;
  const ir = r - stroke;

  const target = makeShadow(clapper, Shape.oval, {
    "className": `svg_circle svg_circle${i} center`,
    "r": ir,
    "strokeWidth": stroke,
    "strokeLinejoin": "round",
    "stroke-linecap": "round",
    "stroke": "#333",
    "rotate": -360,
    "origin": "50% 50%" },
  5, 5);

  target.style.cssText = `width: ${size}px; height: ${size}px;`;

}

makeShadow(clapper, Shape.poly, {
  className: "play-btn back",
  side: 3,
  width: 60,
  strokeWidth: 8,
  strokeLinejoin: "round",
  rotate: 90,
  stroke: "#333",
  fill: "#333",
  origin: "50% 50%" });

makeShadow(clapper, Shape.poly, {
  className: "play-btn front",
  side: 3,
  width: 60,
  strokeWidth: 8,
  strokeLinejoin: "round",
  rotate: 90,
  stroke: "#333",
  fill: "#333",
  origin: "50% 50%" });

const nextStep = 2.6;
const nextStep2 = nextStep + 4;
const scene1 = new Scene({
  ".logo1 .scene1.circle": i => ({
    0: {
      transform: "scale(0)" },

    0.2: {
      "border-width": "50px" },

    0.5: {
      opacity: 1 },

    1: {
      "transform": "scale(1)",
      "border-width": "0px",
      "opacity": 0 },

    options: {
      delay: i * 0.4 } }),


  ".logo1 ellipse": (i, el) => {
    const opacity = el.getAttribute("opacity");
    const index = Math.floor(i / 2);

    return {
      0: {
        "opacity": 0,
        "stroke-dasharray": "0 1000",
        "transform": `scaleX(${index % 2 ? -1 : 1}) rotate(${-90 + index * 180}deg)` },

      0.1: {
        opacity },

      [0.6]: {
        "stroke-dasharray": `${70} 1000`,
        "stroke-dashoffset": 0 },

      [1.1 - index * 0.06]: {
        opacity },

      [1.2 - index * 0.06]: {
        "stroke-dashoffset": -76,
        "stroke-dasharray": "0 1000",
        "transform": `rotate(${180 + index * 180}deg)`,
        "opacity": 0 },

      options: {
        delay: nextStep + index * 0.16 } };


  },
  ".play-btn.back": {
    0: {
      transform: 'translate(-50%, -50%) scale(1)' },

    1: {
      transform: 'scale(0.5)' },

    2: {
      transform: 'scale(1)' },

    options: {
      delay: nextStep + 1 } },


  ".play-btn.front": {
    0: {
      transform: 'translate(-50%, -50%) scale(0)' },

    1: {
      transform: 'scale(1)' },

    options: {
      delay: nextStep + 2.4 } },


  ".play-circle": {
    0: {
      transform: 'translate(-50%, -50%) scale(0)' },

    1: {
      transform: 'scale(1)' },

    options: {
      delay: nextStep + 2.1 } },


  ".background": {
    0: {
      transform: 'translate(-50%, -50%) scale(0)' },

    1: {
      transform: 'scale(1)' },

    options: {
      delay: nextStep + 1.8 } },


  ".stick1 .rect": i => ({
    0: {
      transform: {
        scale: 0,
        skew: "15deg" } },


    0.7: {
      transform: {
        scale: 1 } },


    options: {
      delay: nextStep + 2.8 + i * 0.1 } }),


  ".stick2 .rect": i => ({
    0: {
      transform: {
        scale: 0,
        skew: "-15deg" } },


    0.7: {
      transform: {
        scale: 1 } },


    options: {
      delay: nextStep + 3 + i * 0.1 } }),


  ".stick1": {
    0: {
      transform: {
        rotate: "0deg" } },


    0.5: {
      transform: {
        rotate: "-20deg" } },


    1: {
      transform: {
        rotate: "0deg" } },


    1.5: {
      transform: {
        rotate: "-10deg" } },


    options: {
      delay: nextStep2,
      easing: Scene.EASE_IN_OUT } },


  ".clapper": {
    0: {
      transform: "rotate(0deg)" },

    0.5: {
      transform: "rotate(-15deg)" },

    1: {
      transform: "rotate(0deg)" },

    1.5: {
      transform: "rotate(-10deg)" },

    options: {
      delay: nextStep2,
      easing: Scene.EASE_IN_OUT } } },


{
  easing: Scene.EASE_IN_OUT,
  selector: true,
  iterationCount: 'infinite' }).

playCSS();