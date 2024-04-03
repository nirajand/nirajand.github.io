/*--------------------
Vars
--------------------*/
let progress = 0;
let startX = 0;
let active = 0;
let isDown = false;

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02;
const speedDrag = -0.02;

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) =>
  array.map (
    (_, i) => (index === i ? array.length : array.length - Math.abs (index - i))
  );

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll ('.carousel-item');
const $cursors = document.querySelectorAll ('.cursor');

const displayItems = (item, index, active) => {
  const zIndex = getZindex ([...$items], active)[index];
  item.style.setProperty ('--zIndex', zIndex);
  item.style.setProperty ('--active', (index - active) / $items.length);
};

// Update all image elements to load super fast and super smooth
const $images = document.querySelectorAll ('.carousel-item img');

$images.forEach ($img => {
  // Lazy load images
  $img.loading = 'lazy';

  // Preload images
  const src = $img.getAttribute ('src');
  const img = new Image ();
  img.src = src;

  // Optimize image format (replace 'src' attribute with 'data-src' for lazy loading)
  if (
    src.endsWith ('.jpg') ||
    src.endsWith ('.jpeg') ||
    src.endsWith ('.png')
  ) {
    const webpSrc = src.replace (/\.(jpg|jpeg|png)$/, '.webp');
    img.onload = () => {
      $img.src = webpSrc;
      $img.loading = 'eager'; // Load immediately after preload
    };
    img.src = webpSrc;
  }
});

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max (0, Math.min (progress, 100));
  active = Math.floor (progress / 100 * ($items.length - 1));

  $items.forEach ((item, index) => displayItems (item, index, active));
};
animate ();

/*--------------------
Click on Items
--------------------*/
$items.forEach ((item, i) => {
  item.addEventListener ('click', () => {
    progress = i / $items.length * 100 + 10;
    animate ();
  });
});

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel;
  progress += wheelProgress;
  animate ();
};

const handleMouseMove = e => {
  if (e.type === 'mousemove') {
    $cursors.forEach ($cursor => {
      $cursor.style.transition = 'transform 0.3s ease'; // Smooth transition for cursor movement
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * speedDrag;
  progress += mouseProgress;
  startX = x;
  animate ();
};

const handleMouseDown = e => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

const handleMouseUp = () => {
  isDown = false;
};

/*--------------------
Listeners
--------------------*/
document.addEventListener ('mousewheel', handleWheel);
document.addEventListener ('mousedown', handleMouseDown);
document.addEventListener ('mousemove', handleMouseMove);
document.addEventListener ('mouseup', handleMouseUp);
document.addEventListener ('touchstart', handleMouseDown);
document.addEventListener ('touchmove', handleMouseMove);
document.addEventListener ('touchend', handleMouseUp);

// Add event listeners for previous and next buttons
const $prevButton = document.getElementById ('prevButton');
const $nextButton = document.getElementById ('nextButton');

$prevButton.addEventListener ('click', () => {
  progress -= 100 / $items.length; // Adjust progress based on the number of items
  animate ();
});

$nextButton.addEventListener ('click', () => {
  progress += 100 / $items.length; // Adjust progress based on the number of items
  animate ();
});

// Add event listener for keyboard navigation
document.addEventListener ('keydown', e => {
  if (e.key === 'ArrowLeft') {
    progress -= 100 / $items.length; // Move to the previous card
    animate ();
  } else if (e.key === 'ArrowRight') {
    progress += 100 / $items.length; // Move to the next card
    animate ();
  }
});

const cursor = document.querySelector ('.cursor');

document.addEventListener ('mousedown', () => {
  cursor.classList.add ('cursor--clicked');
});

document.addEventListener ('mouseup', () => {
  cursor.classList.remove ('cursor--clicked');
});
