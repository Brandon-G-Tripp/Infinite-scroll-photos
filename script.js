const imageCountainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'FS2fyVJP9KwjaFEarTl2oDRy0_1hicaxzj0mNJeMbGk';

let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded

function imageLoaded() {
   imagesLoaded++;
   if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
      count = 30;
   }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
   for(const key in attributes) {
      element.setAttribute(key, attributes[key]);
   }
}
// Create Elements for Links and Photos, add to DOM

function displayPhotos() {
   imagesLoaded = 0;
   totalImages = photosArray.length;
   // run function for each object in photosArray
   photosArray.forEach( photo => {
      // Create anchor element to link to Unsplash
      const item = document.createElement('a');
      setAttributes(item, {
         href: photo.links.html,
         target: '_blank',
      });
      // Create img for photo
      const img = document.createElement('img');
      setAttributes(img, {
         src: photo.urls.regular,
         alt: photo.alt_description,
         title: photo.alt_description,
      });
      // Event listener, check when each is finished loading
      img.addEventListener('load', imageLoaded)
      // Put img inside a tag, then put both inside imageContainer
      item.appendChild(img);
      imageCountainer.appendChild(item);
   });
}

// Get photos from Unsplash API

async function getPhotos() {
   try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
   } catch (error) {
      // catch error here
   }
}

// Check to see if scrolling near bottom of page, Load more photos

window.addEventListener('scroll', () => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
      ready = false;
      getPhotos();
   }
})

// On load

getPhotos();