'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
//Operations
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// SMOOTH SCROLL
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////
// Page navigation

// An event occcurs on every element
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//Using EVENT DELEGATION - event occurs on parent
//1. Add event listener on common parent element
//2. Determine what element originated the element

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////////////////////////////////////////
//OPERATIONS
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //Guard clause
  if (!clicked) return;

  //Remove active classes
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));

  //Active tab
  clicked.classList.add('operations__tab--active');

  //Active content area
  const id = clicked.dataset.tab;
  document
    .querySelector(`.operations__content--${id}`)
    .classList.add('operations__content--active');
});

//////////////////////////
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//Passing arguments into function
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////
// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', () => {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//////////////////////////////////
// Sticky navigation
//Intersection observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: 0.4,
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

//INTERSECTION OBSERVER API
//SHOW STICKY NAVBAR AFTER HEADER SECTION
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Reveals section
//Great usage of IntersectionObserver API
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////
//LAZY LOADIN IMAGES STRATEGY
const imgTargets = document.querySelectorAll('.features__img[data-src]');

const loadImg = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);
  entry.target.src = entry.target.dataset.src;

  if (!entry.isIntersecting) return;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.4,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

////////////////////////////////////////
//SLIDER
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const maxSlides = slides.length - 1;
const dotsContainer = document.querySelector('.dots');

let currentSlide = 0;

const slider = function () {
  // FUNCTIONS
  const creatingDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide='${i}'></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlides) currentSlide = 0;
    else currentSlide++;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  btnRight.addEventListener('click', nextSlide);

  const previousSlide = function () {
    if (currentSlide === 0) currentSlide = maxSlides;
    else currentSlide--;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    creatingDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnLeft.addEventListener('click', previousSlide);
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') previousSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
//////////////////////////
//CREATING, DELETING and INSERTING elements
//.insertAdjacentHTML

// const message = document.createElement('div');
// message.classList.add('cookie-message');

// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.before(message.cloneNode(true));
// header.after(message);
// header.after(message.cloneNode(true));

// Deleting
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => message.remove());

// // STYLES
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// // console.log(getComputedStyle(message).color);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// // console.log(message.style.height);

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // ATTRIBUTES
// const logo = document.querySelector('.nav__logo');
// const link = document.querySelector('.nav__link--btn');
// logo.alt = 'Beauttifull minimalist logo';
// console.log(logo.alt);
// console.log(logo.id);
// console.log(logo.src);
// console.log(logo.className);
// // console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');
// console.log(logo.getAttribute('company'));

// // Link attr
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // DATA attr's
// console.log(logo.dataset.versionNumber);

// //CLASSES
// logo.classList.add('c', 'j');
// logo.classList.remove('j');
// logo.classList.toggle('d');
// console.log(logo.classList.contains('d'));

// //Don't use this because it's overrides all the classes
// logo.className = 'heyah';

// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
//   h1.removeEventListener('mouseenter', alertH1);
// };
// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 3000);

// h1.onmouseenter=function(e){
//   alert('addEventListener: Great! You are reading the heading :D');
// }
////CREATING  AN EVENT - CHANGE BACKGROUND RANDOM COLOR ON CLICK
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)}, 0.6)`;
// // console.log(randomColor(0, 255));

// document.querySelectorAll('.nav__link--color').forEach(function (link) {
//   link.addEventListener('click', function (e) {
//     this.style.backgroundColor = randomColor(0, 255);
//     console.log('LINK', e.target, e.currentTarget);
//     console.log(e.currentTarget === this);

//     //Stop propagation - stop bubbling
//     // In general its not a ver
//     e.stopPropagation();
//   });
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor(0, 255);
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor(0, 255);
//   console.log('NAV', e.target, e.currentTarget);
// });

////////////////
// DOM TRAVERSING - looking for relative(closest) elements
//QS works on every child, grandchild etc
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// childnodes works on direct children

//Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
//closest() metchd works the oposite like queryselector. It finds the closest parent
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// //For childNodesonsole.log(h1.previousElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// //All the siblings
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) el.style.transform = 'rotate(50deg)';
// });
