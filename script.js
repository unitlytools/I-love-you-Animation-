const qs = document.querySelector.bind(document);
const easingHeart = mojs.easing.path('M0,100C2.9,86.7,33.6-7.3,46-7.3s15.2,22.7,26,22.7S89,0,100,0');

const el = {
  container: qs('.mo-container'),

  i: qs('.lttr--I'),
  l: qs('.lttr--L'),
  o: qs('.lttr--O'),
  v: qs('.lttr--V'),
  e: qs('.lttr--E'),
  y: qs('.lttr--Y'),
  o2: qs('.lttr--O2'),
  u: qs('.lttr--U'),

  lineLeft: qs('.line--left'),
  lineRight: qs('.line--rght'),

  colTxt: "#763c8c",
  colHeart: "#fa4843",

  blup: qs('.blup'),
  blop: qs('.blop'),
  sound: qs('.sound') };


class Heart extends mojs.CustomShape {
  getShape() {
    return '<path d="M50,88.9C25.5,78.2,0.5,54.4,3.8,31.1S41.3,1.8,50,29.9c8.7-28.2,42.8-22.2,46.2,1.2S74.5,78.2,50,88.9z"/>';
  }
  getLength() {return 200;}}

mojs.addShape('heart', Heart);

const crtBoom = (delay = 0, x = 0, rd = 46) => {
  parent = el.container;
  const crcl = new mojs.Shape({
    shape: 'circle',
    fill: 'none',
    stroke: el.colTxt,
    strokeWidth: { 5: 0 },
    radius: { [rd]: [rd + 20] },
    easing: 'quint.out',
    duration: 500 / 3,
    parent,
    delay,
    x });


  const brst = new mojs.Burst({
    radius: { [rd + 15]: 110 },
    angle: 'rand(60, 180)',
    count: 3,
    timeline: { delay },
    parent,
    x,
    children: {
      radius: [5, 3, 7],
      fill: el.colTxt,
      scale: { 1: 0, easing: 'quad.in' },
      pathScale: [.8, null],
      degreeShift: ['rand(13, 60)', null],
      duration: 1000 / 3,
      easing: 'quint.out' } });



  return [crcl, brst];
};

const crtLoveTl = () => {
  const move = 1000;
  const boom = 200;
  const easing = 'sin.inOut';
  const easingBoom = 'sin.in';
  const easingOut = 'sin.out';
  const opts = { duration: move, easing, opacity: 1 };
  const delta = 150;

  return new mojs.Timeline().add([
  new mojs.Tween({
    duration: move,
    onStart: () => {
      [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(el => {
        el.style.opacity = 1;
        el.style = 'transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: 1;';
      });
    },
    onComplete: () => {
      [el.l, el.o, el.v, el.e].forEach(el => el.style.opacity = 0);
      el.blop.play();
    } }),


  new mojs.Tween({
    duration: move * 2 + boom,
    onComplete: () => {
      [el.y, el.o2].forEach(el => el.style.opacity = 0);
      el.blop.play();
    } }),


  new mojs.Tween({
    duration: move * 3 + boom * 2 - delta,
    onComplete: () => {
      el.i.style.opacity = 0;
      el.blop.play();
    } }),


  new mojs.Tween({
    duration: move * 3 + boom * 2,
    onComplete: () => {
      el.u.style.opacity = 0;
      el.blup.play();
    } }),


  new mojs.Tween({
    duration: 50,
    delay: 4050,
    onUpdate: progress => {
      [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(el => {
        el.style = `transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: ${1 * progress};`;
      });
    },
    onComplete: () => {
      [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(el => {
        el.style.opacity = 1;
        el.style = 'transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: 1;';
      });
    } }),


  new mojs.Html({
    ...opts,
    el: el.lineLeft,
    x: { 0: 52 } }).
  then({
    duration: boom + move,
    easing,
    x: { to: 52 + 54 } }).
  then({
    duration: boom + move,
    easing,
    x: { to: 52 + 54 + 60 } }).
  then({
    duration: 150, // 3550
    easing,
    x: { to: 52 + 54 + 60 + 10 } }).
  then({
    duration: 300 }).
  then({
    duration: 350,
    x: { to: 0 },
    easing: easingOut }),


  new mojs.Html({
    ...opts,
    el: el.lineRight,
    x: { 0: -52 } }).
  then({
    duration: boom + move,
    easing,
    x: { to: -52 - 54 } }).
  then({
    duration: boom + move,
    easing,
    x: { to: -52 - 54 - 60 } }).
  then({
    duration: 150,
    easing,
    x: { to: -52 - 54 - 60 - 10 } }).
  then({
    duration: 300 }).
  then({
    duration: 350,
    x: { to: 0 },
    easing: easingOut }),


  new mojs.Html({ // [I] LOVE YOU
    ...opts,
    el: el.i,
    x: { 0: 34 } }).
  then({
    duration: boom,
    easing: easingBoom,
    x: { to: 34 + 19 } }).
  then({
    duration: move,
    easing,
    x: { to: 34 + 19 + 40 } }).
  then({
    duration: boom,
    easing: easingBoom,
    x: { to: 34 + 19 + 40 + 30 } }).
  then({
    duration: move,
    easing,
    x: { to: 34 + 19 + 40 + 30 + 30 } }),


  new mojs.Html({ // I [L]OVE YOU
    ...opts,
    el: el.l,
    x: { 0: 15 } }),


  new mojs.Html({ // I L[O]VE YOU
    ...opts,
    el: el.o,
    x: { 0: 11 } }),


  new mojs.Html({ // I LO[V]E YOU
    ...opts,
    el: el.v,
    x: { 0: 3 } }),


  new mojs.Html({ // I LOV[E] YOU
    ...opts,
    el: el.e,
    x: { 0: -3 } }),


  new mojs.Html({ // I LOVE [Y]OU
    ...opts,
    el: el.y,
    x: { 0: -20 } }).
  then({
    duration: boom,
    easing: easingBoom,
    x: { to: -20 - 33 } }).
  then({
    duration: move,
    easing,
    x: { to: -20 - 33 - 24 } }),


  new mojs.Html({ // I LOVE Y[O]U
    ...opts,
    el: el.o2,
    x: { 0: -27 } }).
  then({
    duration: boom,
    easing: easingBoom,
    x: { to: -27 - 27 } }).
  then({
    duration: move,
    easing,
    x: { to: -27 - 27 - 30 } }),


  new mojs.Html({ // I LOVE YO[U]
    ...opts,
    el: el.u,
    x: { 0: -32 } }).
  then({
    duration: boom,
    easing: easingBoom,
    x: { to: -32 - 21 } }).
  then({
    duration: move,
    easing,
    x: { to: -32 - 21 - 36 } }).
  then({
    duration: boom,
    easing: easingBoom,
    x: { to: -32 - 21 - 36 - 31 } }).
  then({
    duration: move,
    easing,
    x: { to: -32 - 21 - 36 - 31 - 27 } }),


  new mojs.Shape({
    parent: el.container,
    shape: 'heart',
    delay: move,
    fill: el.colHeart,
    x: -64,
    scale: { 0: 0.95, easing: easingHeart },
    duration: 500 }).
  then({
    x: { to: -62, easing },
    scale: { to: 0.65, easing },
    duration: boom + move - 500 }).
  then({
    duration: boom - 50,
    x: { to: -62 + 48 },
    scale: { to: 0.90 },
    easing: easingBoom }).
  then({
    duration: 125,
    scale: { to: 0.8 },
    easing: easingOut }).
  then({
    duration: 125,
    scale: { to: 0.85 },
    easing: easingOut }).
  then({
    duration: move - 200,
    scale: { to: 0.45 },
    easing }).
  then({
    delay: -75,
    duration: 150,
    x: { to: 0 },
    scale: { to: 0.90 },
    easing: easingBoom }).
  then({
    duration: 125,
    scale: { to: 0.8 },
    easing: easingOut }).
  then({
    duration: 125, // 3725
    scale: { to: 0.85 },
    easing: easingOut }).
  then({
    duration: 125 // 3850
  }).then({
    duration: 350,
    scale: { to: 0 },
    easing: easingOut }),


  ...crtBoom(move, -64, 46),
  ...crtBoom(move * 2 + boom, 18, 34),
  ...crtBoom(move * 3 + boom * 2 - delta, -64, 34),
  ...crtBoom(move * 3 + boom * 2, 45, 34)]);

};

const loveTl = crtLoveTl().play();
setInterval(() => {loveTl.replay();}, 4300);

const volume = 0.2;
el.blup.volume = volume;
el.blop.volume = volume;

const toggleSound = () => {
  let on = true;
  return () => {
    if (on) {
      el.blup.volume = 0.0;
      el.blop.volume = 0.0;
      el.sound.classList.add('sound--off');
    } else
    {
      el.blup.volume = volume;
      el.blop.volume = volume;
      el.sound.classList.remove('sound--off');
    }
    on = !on;
  };
};
el.sound.addEventListener('click', toggleSound());
/* ================= CUSTOM NAME + ZIP download (Save triggers ZIP) ================= */

// utility: load JSZip and wait until ready
function loadJSZip() {
  return new Promise((resolve, reject) => {
    if (window.JSZip) return resolve(window.JSZip);
    const s = document.createElement('script');
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
    s.onload = () => resolve(window.JSZip);
    s.onerror = () => reject(new Error('Failed to load JSZip'));
    document.head.appendChild(s);
  });
}

// show popup
const addNameBtn = document.querySelector('.add-name-btn');
const popup = document.getElementById('popup');
const nameInput = document.getElementById('nameInput');
const saveNameBtn = document.getElementById('saveName');
const closePopupBtn = document.getElementById('closePopup');
const customNameDiv = document.getElementById('customName');

addNameBtn.addEventListener('click', () => {
  popup.style.display = 'flex';
  // put popup on top and focus input
  nameInput.focus();
  // prevent animation from intercepting pointer events while popup open
  document.querySelector('.container').style.pointerEvents = 'none';
});

// close popup (cancel)
closePopupBtn.addEventListener('click', () => {
  popup.style.display = 'none';
  nameInput.value = '';
  document.querySelector('.container').style.pointerEvents = 'auto';
});

// Save name -> inject and trigger ZIP download (only on Save)
saveNameBtn.addEventListener('click', async () => {
  const rawName = nameInput.value || '';
  const name = rawName.trim();
  if (!name) {
    alert('Please enter a name!');
    nameInput.focus();
    return;
  }

  // show on page under animation
  customNameDiv.innerText = name;

  // close popup and restore pointer events
  popup.style.display = 'none';
  document.querySelector('.container').style.pointerEvents = 'auto';
  nameInput.value = '';

  // Prepare files for ZIP: generate index.html template with injected name
  // NOTE: Use a clean minimal template so downloaded index.html is ready-to-deploy.
  const indexHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>I Love You - ${escapeHtml(name)}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <svg class="svg-container" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200">
      <line class="line line--left" x1="10" y1="17" x2="10" y2="183"></line>
      <line class="line line--rght" x1="490" y1="17" x2="490" y2="183"></line>
      <g>
        <path class="lttr lttr--I" d="M42.2,73.9h11.4v52.1H42.2V73.9z"></path>
        <path class="lttr lttr--L" d="M85.1,73.9h11.4v42.1h22.8v10H85.1V73.9z"></path>
        <path class="lttr lttr--O" d="M123.9,100c0-15.2,11.7-26.9,27.2-26.9s27.2,11.7,27.2,26.9-11.7,26.9-27.2,26.9S123.9,115.2,123.9,100z"></path>
        <path class="lttr lttr--V" d="M180.7,73.9H193l8.4,22.9c1.7,4.7,3.5,9.5,5,14.2h0.1c1.7-4.8,3.4-9.4,5.2-14.3l8.6-22.8h11.7l-19.9,52.1h-11.5L180.7,73.9z"></path>
        <path class="lttr lttr--E" d="M239.1,73.9h32.2v10h-20.7v10.2h17.9v9.5h-17.9v12.4H272v10h-33V73.9z"></path>
        <path class="lttr lttr--Y" d="M315.8,102.5l-20.1-28.6H309l6.3,9.4c2,3,4.2,6.4,6.3,9.6h0.1c2-3.2,4.1-6.4,6.3-9.6l6.3-9.4h12.9l-19.9,28.5v23.6h-11.4V102.5z"></path>
        <path class="lttr lttr--O2" d="M348.8,100c0-15.2,11.7-26.9,27.2-26.9s27.2,11.7,27.2,26.9-11.7,26.9-27.2,26.9S348.8,115.2,348.8,100z"></path>
        <path class="lttr lttr--U" d="M412.4,101.1V73.9h11.4v26.7c0,10.9,2.4,15.9,11.5,15.9c8.4,0,11.4-4.6,11.4-15.8V73.9h11v26.9c0,7.8-1.1,13.5-4,17.7c-3.7,5.3-10.4,8.4-18.7,8.4c-8.4,0-15.1-3.1-18.8-8.5C413.4,114.2,412.4,108.5,412.4,101.1z"></path>
      </g>
    </svg>
    <div class="mo-container"></div>
  </div>

  <div class="custom-name">${escapeHtml(name)}</div>

  <audio class="blup" style="display:none">
    <source src="https://www.freesound.org/data/previews/265/265115_4373976-lq.mp3" type="audio/ogg">
  </audio>
  <audio class="blop" style="display:none">
    <source src="https://www.freesound.org/data/previews/265/265115_4373976-lq.mp3" type="audio/ogg">
  </audio>

  <div class="sound">sound</div>

  <script src="//cdn.jsdelivr.net/mojs/latest/mo.min.js"></script>
  <script src="script.js"></script>
</body>
</html>`;

  try {
    // ensure JSZip loaded
    await loadJSZip();
    // fetch existing style & script files (from same origin)
    const [cssText, jsText] = await Promise.all([
      fetch('style.css').then(r => r.ok ? r.text() : ''),
      fetch('script.js').then(r => r.ok ? r.text() : '')
    ]);

    // create zip
    const zip = new JSZip();
    zip.file('index.html', indexHtml);
    zip.file('style.css', cssText);
    zip.file('script.js', jsText);

    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `I_Love_You_${sanitizeFilename(name)}.zip`;
    a.click();

    // small user feedback
    alert('Downloaded project ZIP — upload extracted files to GitHub to share the custom version.');
  } catch (err) {
    console.error(err);
    alert('Sorry — failed to prepare ZIP. Check console for details.');
  }
});

// helper: escape HTML to avoid injection in template
function escapeHtml(str) {
  return String(str).replace(/[&<>"]/g, s => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[s]));
}
function sanitizeFilename(s) {
  return s.replace(/[^a-z0-9\-_\s]/gi,'').replace(/\s+/g,'_').slice(0,60);
}
