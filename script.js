window.addEventListener ('scroll', function () {
  const header = document.querySelector ('header');
  const body = document.querySelector ('body');
  if (window.scrollY > 0) {
    header.classList.add ('scrolled');
  } else {
    header.classList.remove ('scrolled');
  }
});
