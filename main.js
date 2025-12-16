//this is js
let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");

menu.onclick = () =>{
  menu.classList.toggle('fa-time');
  navbar.classList.toggle('active');
}

// Animated wishlist panel elements
const animatedWishlist = document.getElementById('animated-wishlist');
const animatedWishlistClose = document.getElementById('animated-wishlist-close');
const wishlistItemsContainer = document.getElementById('wishlist-items');
// Load wishlist from localStorage or initialize empty array
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Function to save wishlist to localStorage
function saveWishlist() {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Function to render wishlist items in the animated panel
function renderWishlist() {
  wishlistItemsContainer.innerHTML = '';
  if (wishlist.length === 0) {
    wishlistItemsContainer.innerHTML = '<li>Your watch later list is empty.</li>';
    return;
  }
  wishlist.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.title;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => {
      removeFromWishlist(item.title);
    });
    li.appendChild(removeBtn);
    wishlistItemsContainer.appendChild(li);
  });
}

// Function to add item to wishlist
function addToWishlist(title, video) {
  console.log('addToWishlist called with:', title, video);
  if (!video || video === '#' || !wishlist.some(item => item.title === title)) {
    if (!video || video === '#') {
      console.warn('Invalid video URL, not adding to wishlist:', video);
      return;
    }
    wishlist.push({ title, video });
    saveWishlist();
    renderWishlist();
    updateWishlistButtons();
  }
}

// Function to remove item from wishlist
function removeFromWishlist(title) {
  console.log('removeFromWishlist called with:', title);
  wishlist = wishlist.filter(item => item.title !== title);
  saveWishlist();
  renderWishlist();
  updateWishlistButtons();
}

// Function to update wishlist buttons state
function updateWishlistButtons() {
  const buttons = document.querySelectorAll('.wishlist-btn');
  buttons.forEach(button => {
    const title = button.getAttribute('data-title');
    if (wishlist.some(item => item.title === title)) {
      button.textContent = '♥ Added';
      button.classList.add('added');
      // Remove disabling of button to allow toggling
      // button.disabled = true;
    } else {
      button.textContent = '♡ Watch Later';
      button.classList.remove('added');
      // button.disabled = false;
    }
  });
}



var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 7500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop:true,
    on: {
      init: function () {
        updateWishlistButtons();
      },
      slideChange: function () {
        updateWishlistButtons();
      }
    }
  });

  var swiper = new Swiper(".anime-slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".anime-pagination",
      clickable: true,
    },
    loop:true
  });

  

  var swiper = new Swiper(".action-slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".action-pagination",
      clickable: true,
    },
    loop:true
  });


  var swiper = new Swiper(".child-slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".child-pagination",
      clickable: true,
    },
    loop:true
  });

  var swiper = new Swiper(".family-slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".family-pagination",
      clickable: true,
    },
    loop:true
  });

  // Initialize AOS library for scroll animations
  AOS.init();

const searchForm = document.querySelector('.searchbox form');
let searchInput = null;
const allSections = ['.home', '.anime', '.action', '.child', '.family'];
let allSlides = [];

allSections.forEach(sectionClass => {
  const section = document.querySelector(sectionClass);
  if (section) {
    const slides = section.querySelectorAll('.swiper-slide');
    allSlides = allSlides.concat(Array.from(slides));
  }
});

if (searchForm) {
  // Adjust selector for input with space in name attribute
  searchInput = searchForm.querySelector('input[name="search anime"], input[name="search\\ anime"]');

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase().trim();
    console.log('Search query:', query);

    let found = false;
    allSlides.forEach(slide => {
      let titleElement, watchLink;
      if (slide.closest('.home')) {
        titleElement = slide.querySelector('.content h3');
        watchLink = slide.querySelector('.content a.btn');
      } else {
        titleElement = slide.querySelector('.card-front h3, .content h3');
        watchLink = slide.querySelector('.buttons a.btn');
      }
      if (!titleElement || !watchLink) return;

      const title = titleElement.textContent.toLowerCase();
      console.log('Checking title:', title);
      if (title.includes(query)) {
        found = true;
        console.log('Match found:', title);
        window.location.href = watchLink.href;
      }
    });

    if (!found) {
      alert('Anime not found');
    }
  });
}

// New code to toggle searchbox visibility on search icon click
const searchIcon = document.getElementById('search-icon');
const searchBox = document.querySelector('.searchbox');

if (searchIcon && searchBox) {
  searchIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    if (searchBox.style.display === 'none' || searchBox.style.display === '') {
      searchBox.style.display = 'flex';
      searchInput.focus();
    } else {
      searchBox.style.display = 'none';
    }
  });

  // Hide searchbox when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target) && e.target !== searchIcon) {
      searchBox.style.display = 'none';
    }
  });
}

document.body.addEventListener('click', (event) => {
  const button = event.target.closest('.wishlist-btn');
  if (button) {
    console.log('Wishlist button clicked:', button);
    const title = button.getAttribute('data-title');
    const video = button.getAttribute('data-video');
    console.log('Button data-title:', title, 'data-video:', video);
    if (!title || !video || video === '#') {
      console.error('Wishlist button missing or invalid data-title or data-video attribute');
      return;
    }
    if (wishlist.some(item => item.title === title)) {
      console.log('Removing from wishlist:', title);
      removeFromWishlist(title);
      console.log('Wishlist after removal:', wishlist);
    } else {
      console.log('Adding to wishlist:', title);
      addToWishlist(title, video);
      console.log('Wishlist after addition:', wishlist);
    }
  }
});

// Keyboard shortcut 'W' to toggle animated wishlist panel
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'w') {
    animatedWishlist.classList.toggle('show');
  }
});

// Close button in animated wishlist panel
animatedWishlistClose.addEventListener('click', () => {
  animatedWishlist.classList.remove('show');
});

// New event listener for watch later toggle button
const watchLaterToggleBtn = document.getElementById('watch-later-toggle');
if (watchLaterToggleBtn) {
  watchLaterToggleBtn.addEventListener('click', () => {
    animatedWishlist.classList.toggle('show');
  });
}

// Initial render of wishlist buttons state and wishlist panel
renderWishlist();
updateWishlistButtons();

// 3D card flip effect for anime cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', (e) => {
    // Prevent flipping when clicking on wishlist buttons or links inside the card
    if (e.target.closest('.wishlist-btn') || e.target.closest('a')) return;
    card.classList.toggle('flipped');
  });

});

// Add event listeners to all close buttons inside card-back divs to flip back the card
document.querySelectorAll('.card-back .close-btn').forEach(closeBtn => {
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = closeBtn.closest('.card');
    if (card) {
      card.classList.remove('flipped');
    }
  });
});
// Genre dropdown toggle
const genreLink = document.getElementById('genre-link');
const genreDropdown = document.getElementById('genre-dropdown');

if (genreLink && genreDropdown) {
  genreLink.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (genreDropdown.style.display === 'flex') {
      genreDropdown.style.display = 'none';
    } else {
      genreDropdown.style.display = 'flex';
    }
  });

  // Close genre dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!genreDropdown.contains(e.target) && e.target !== genreLink) {
      genreDropdown.style.display = 'none';
    }
  });
}