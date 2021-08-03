'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

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

//////////////////////////
//CREATING, DELETING and INSERTING elements
//.insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.before(message.cloneNode(true));
// header.after(message);
// header.after(message.cloneNode(true));

// Deleting
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

// STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// console.log(getComputedStyle(message).color);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// console.log(message.style.height);

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

// SMOOTH SCROLL
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  //Current window position
  // console.log(e.target.getBoundingClientRect());
  //Current scroll
  console.log('Current scroll (X/Y)', window.pageYOffset, pageXOffset);

  console.log(
    'height and witdth viewport',
    document.documentElement.clientWidth,
    document.documentElement.clientHeight
  );

  //Scrolling - current scroll position
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Scrolling smooth
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // NEW smooth scroll
  // section1.scrollIntoView({ behavior: 'smooth' });
});
