function toggleHeader() {
  let scrollPos = window.scrollY;
  let navBar = document.getElementsByClassName("navbar")[0];
  if (navBar.classList.contains("no-scroll")) {
    return;
  }
  if (scrollPos <= 0 && navBar.classList.contains("scrolling")) {
    navBar.classList.remove("scrolling");
    navBar.classList.add("top");
  } else if (scrollPos > 0 && navBar.classList.contains("top")) {
    navBar.classList.remove("top");
    navBar.classList.add("scrolling");
  }
}

function scrollPastHeader() {
  let navBarHeight = document.getElementsByClassName("navbar")[0].offsetHeight;
  window.scrollTo({
    top: window.innerHeight - navBarHeight,
    left: 0,
    behavior: "smooth"
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
  return false;
}

function scrollToSection(section) {
  let elementPos = document.getElementsByClassName(section)[0].getBoundingClientRect().y;
  let navBarHeight = document.getElementsByClassName("navbar")[0].offsetHeight;
  window.scrollTo({
    top: pageYOffset + elementPos - navBarHeight,
    left: 0,
    behavior: "smooth"
  });
  return false;
}

function showOnScroll() {
  let windowHeight = window.innerHeight;
  let elementsToShow = document.getElementsByClassName("scroll-to-hidden");
  for (let element of elementsToShow) {
    if (element.getBoundingClientRect().y < windowHeight * 2 / 3) {
      element.classList.add("scroll-to-shown");
      element.classList.remove("scroll-to-hidden");
    }
  }
}

function showOnLoad() {
  let elements = document.getElementsByClassName("hidden-onload");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add("shown-onload");
    elements[i].classList.remove("hidden-onload");
  }
}

function scrollListener() {
  $('.open').removeClass("oppenned");
  toggleHeader();
  showOnScroll();
}

function checkSection() {
  if (window.location.hash.length > 1) {
    scrollToSection(window.location.hash.substring(1));
  }
}

function toggleNavbar() {
  $(document).ready(function() {
    $(document).delegate('.open', 'click', function(event){
      $(this).addClass('oppenned');
      event.stopPropagation();
    });
    $(document).delegate('body', 'click', function(event) {
      $('.open').removeClass('oppenned');
    });
    $(document).delegate('.cls', 'click', function(event){
      $('.open').removeClass('oppenned');
      event.stopPropagation();
    });
  });
}

window.addEventListener("scroll", scrollListener);

window.onload = function() {
  scrollListener();
  showOnLoad();
  checkSection();
  toggleNavbar();
};