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

const words = [
  'Python Developer',
  'Web Designer',
  'Java Developer',
  'Content Creator',
  'C++ Developer',
  'Digital Marketer',
];

function typingEffect () {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const delay = 900;
  const wordElement = document.getElementById ('value');

  function type () {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      wordElement.style.transition = 'opacity 0.2s ease-in-out'; // Smooth transition when deleting
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

//metadata parsing

// Get the metadata.xml file contents
fetch ('/metadata.xml')
  .then (response => response.text ())
  .then (metadataXml => {
    // Parse the XML contents
    const parser = new DOMParser ();
    const xmlDoc = parser.parseFromString (metadataXml, 'text/xml');

    // Extract the metadata values
    const metadata = {};
    xmlDoc.documentElement.childNodes.forEach (node => {
      if (node.nodeType === 1) {
        // Element node
        const nodeName = node.nodeName;
        const nodeValue = node.textContent;
        metadata[nodeName] = nodeValue;
      }
    });

    // Generate the HTML metadata tags
    const head = document.head;
    Object.keys (metadata).forEach (key => {
      const value = metadata[key];
      switch (key) {
        case 'author':
          head.appendChild (createMetaTag ('author', value));
          break;
        case 'description':
          head.appendChild (createMetaTag ('description', value));
          break;
        case 'keywords':
          head.appendChild (createMetaTag ('keywords', value));
          break;
        case 'og:title':
          head.appendChild (createMetaTag ('og:title', value, 'property'));
          break;
        case 'og:image':
          head.appendChild (createMetaTag ('og:image', value, 'property'));
          break;
        case 'og:description':
          head.appendChild (
            createMetaTag ('og:description', value, 'property')
          );
          break;
        case 'og:type':
          head.appendChild (createMetaTag ('og:type', value, 'property'));
          break;
        case 'og:url':
          head.appendChild (createMetaTag ('og:url', value, 'property'));
          break;
        case 'canonical':
          head.appendChild (createLinkTag ('canonical', value));
          break;
        case 'base':
          head.appendChild (createBaseTag (value));
          break;
        case 'title':
          document.title = value;
          break;
        case 'shortcut-icon':
          head.appendChild (createLinkTag ('shortcut icon', value, 'icon'));
          break;
        default:
          // Handle additional metadata
          if (key.startsWith ('og:')) {
            head.appendChild (createMetaTag (key, value, 'property'));
          }
      }
    });
  });

// Helper functions
function createMetaTag (name, content, propertyType = 'name') {
  const meta = document.createElement ('meta');
  meta.setAttribute (propertyType, name);
  meta.setAttribute ('content', content);
  return meta;
}

function createLinkTag (rel, href, type = 'text/html') {
  const link = document.createElement ('link');
  link.setAttribute ('rel', rel);
  link.setAttribute ('href', href);
  link.setAttribute ('type', type);
  return link;
}

function createBaseTag (href) {
  const base = document.createElement ('base');
  base.setAttribute ('href', href);
  return base;
}
