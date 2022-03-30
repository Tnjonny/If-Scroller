const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const count = 10;
const apiKey = '8QI3AvNlYA4iEYTSoCQAO4YhuBbwJDPvm3kz2lfwK7Y';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];

function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  photosArray.forEach((photo) => {
    const item = document.createElement('a');

    const img = document.createElement('img');

    setAttribute(item, {
      href: photo.links.html,
      target: 'blank',
    });

    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos();
  }
});

getPhotos();
