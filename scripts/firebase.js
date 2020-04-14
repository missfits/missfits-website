// Your web app's Firebase configuration
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAZHFYGpDW1a1Qhggt6BOJpDEeNWBFyGuM",
  authDomain: "missfits-website.firebaseapp.com",
  databaseURL: "https://missfits-website.firebaseio.com",
  projectId: "missfits-website",
  storageBucket: "missfits-website.appspot.com",
  messagingSenderId: "851319718079",
  appId: "1:851319718079:web:c1e98c129ea2bbe0b8060a",
  measurementId: "G-WZYYREQVEP"
};

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

let db = firebase.firestore();

function isEmpty(element) {
  if (!element.value) {
    if (!element.classList.contains("invalid")) {
      element.classList.add("invalid");
    }
    return true;
  }
  if (element.classList.contains("invalid")) {
    element.classList.remove("invalid");
  }
  return false;
}

function invalidEmail(element) {
  let errorMessage = document.getElementById(element.id + "-error");
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(element.value))) {
    if (!errorMessage.classList.contains("error-shown")) {
      errorMessage.classList.add("error-shown");
    }
    if (!element.classList.contains("invalid")) {
      element.classList.add("invalid");
    }
    return true;
  }
  if (errorMessage.classList.contains("error-shown")) {
    errorMessage.classList.remove("error-shown");
  }
  if (element.classList.contains("invalid")) {
    element.classList.remove("invalid");
  }
  return false;
}

function validateProspectiveForm(form) {
  let fname = isEmpty(form.fname);
  let lname = isEmpty(form.lname);
  let email = isEmpty(form.email) || invalidEmail(form.email);
  let parentEmail = isEmpty(form["parent-email"]) || invalidEmail(form["parent-email"]);
  let school = isEmpty(form.school);
  return !(fname || lname || email || parentEmail || school);
}

function onProspectiveFormSubmit(form) {
  if (!validateProspectiveForm(form)) {
    return false;
  }

  let name = form.fname.value + " " + form.lname.value;
  let email = form.email.value;
  let grade = parseInt(form.grade.value, 10);
  let parentEmail = form["parent-email"].value;
  let school = form.school.value;
  let teamSource = form["team-source"].value;
  let comments = form.comments.value;

  db.collection("applications").add({
    name,
    email,
    grade,
    parentEmail,
    school,
    teamSource,
    comments
  }).then(() => console.log("success!"))
    .catch((error) => console.log("error", error));
  return false;
}

function validateDemoForm() {
  let fname = isEmpty(document.getElementById("fname-demo"));
  let lname = isEmpty(document.getElementById("lname-demo"));
  let email = isEmpty(document.getElementById("email-demo"))
    || invalidEmail(document.getElementById("email-demo"));
  return !(fname || lname || email);
}