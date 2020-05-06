Missfits Website
================

This is the code for the [official website](https://team6418.org) for the Missfits (FRC Team 6418). It uses
[Firebase](https://firebase.google.com) for hosting, functions, and image & data storage,
[FontAwesome](https://fontawesome.com) for vector icons, and [Google Fonts](https://fonts.google.com) for fonts Cabin
Sketch and Sen. Dustan Kastan's [smoothscroll](https://github.com/iamdustan/smoothscroll) is implemented to enable
smooth scrolling in Safari (which currently does not support `window.scrollTo(props)`). Scripts are written in pure JS
and JQuery.

Navigation Bar
--------------

The navigation bar uses standard links (e.g. "/about.html"), but it also implements # references (which don't reference
any particular ID) to enable smooth scrolling on the same and between pages. References to sections are formatted as:
`href="/[page (blank if index.html)]#[section]`. To enable smooth scrolling, set `onclick="scrollToSection([section])`.
on the corresponding page. Add `[section]` to the section element's class list. For references to pages,
`href="/[page]"` and `onclick="scrollToTop()"` on `[page]`.

Updating Recurring Elements
---------------------------

Unfortunately, there is currently no feature that allows for recurring elements to be used on all pages. This means
that if you change an element like the `navbar` on one page, you must update it on all other pages :grimacing:. However,
this should change soon.

Styles and Variables
--------------------

The website uses Sass/SCSS for stylesheets. There are some constants in
[`stylesheets/variables`](public/stylesheets/variables.scss) that will affect styles globally. The main stylesheet is
[`styles.scss`](public/stylesheets/styles.scss), and each page (or group of related pages) has its own stylesheet.

Media and Images
----------------

Images are stored using Firebase storage. Each "photo album" (media subpage) has a corresponding folder in the project's
storage bucket. Adding or removing an image from a folder will automatically add/remove it from the site. To create a
new album, create a section with the following format:

```html
<div class="section background1 photo-album">
    <h1>Build Season 2017</h1>
    <div id="images"></div>
</div>
```

At the bottom of the body, import the Firebase and execution scripts (this won't work in `live-server` testing, since it
relies on Firebase hosting, but should work when testing with `firebase serve`):

```html
<script src="/__/firebase/7.14.0/firebase-app.js"></script>
<script src="/__/firebase/7.14.0/firebase-storage.js"></script>
<script src="/__/firebase/init.js"></script>
<script src="/scripts/firebase-storage.js"></script>
```

Finally, add `onload="getImages([path to images])"` to the `<body>` tag.

Contact (Firebase)
------------------

The contact form sends its data to Firebase, which will then send an email to
[missfitsrobotics@gmail.com](mailto:missfitsrobotics@gmail.com) or
[pr.missfitsrobotics@gmail.com](mailto:pr.missfitsrobotics@gmail.com) (soon to be implemented using Firebase functions),
rather than using the PHP mail function or something similar.