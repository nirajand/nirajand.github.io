// scroll to top

window.addEventListener ('scroll', function () {
  const header = document.querySelector ('header');
  const body = document.querySelector ('body');
  if (window.scrollY > 0) {
    header.classList.add ('scrolled');
  } else {
    header.classList.remove ('scrolled');
  }
});

// Text replace with animation

const words = ['Python', 'Web', 'Java', 'C++'];

function typingEffect () {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const delay = 1000;
  const wordElement = document.getElementById ('value');

  function type () {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      wordElement.style.transition = 'opacity 0.3s ease-in-out'; // Smooth transition when deleting
      wordElement.textContent = currentWord.substring (0, charIndex - 1);
      charIndex--;
    } else {
      wordElement.style.transition = 'none'; // Disable transition when typing
      wordElement.textContent = currentWord.substring (0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout (type, delay);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Restart from the beginning of the array
      setTimeout (type, delay);
    } else {
      setTimeout (type, typingSpeed);
    }
  }

  type ();
}

typingEffect ();

// Hamburger Menu JS Script

document.addEventListener ('DOMContentLoaded', function () {
  const hamburger = document.querySelector ('.hamburger');

  hamburger.addEventListener ('click', function () {
    // Toggle the checked state of the checkbox
    this.checked = !this.checked;
  });
});
