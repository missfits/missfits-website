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

  db.collection("applications").add({ name, email, grade, parentEmail, school, teamSource, comments }).then(() => {
    form.fname.value = "";
    form.lname.value = "";
    form.email.value = "";
    form.grade.value = "9";
    form["parent-email"].value = "";
    form.school.value = "";
    form["team-source"].value = "";
    form.comments.value = "";
    alert("Your application has been received.");
  }).catch((error) => {
    alert("There was a problem submitting your application:\n" + error.message);
  });
  return false;
}

function validateDemoForm(form) {
  let fname = isEmpty(form.fname);
  let lname = isEmpty(form.lname);
  let email = isEmpty(form.email) || invalidEmail(form.email);
  return !(fname || lname || email);
}

function onDemoFormSubmit(form) {
  if (!validateDemoForm(form)) {
    return false;
  }

  let name = form.fname.value + " " + form.lname.value;
  let email = form.email.value;
  let comments = form.comments.value;

  db.collection("contact").add({ name, email, comments }).then(() => {
    form.fname.value = "";
    form.lname.value = "";
    form.email.value = "";
    form.comments.value = "";
    alert("Your submission has been received. We will get in touch with you as soon as possible.");
  }).catch((error) => {
    alert("There was a problem submitting your request.\n" + error.message);
  });
  return false;
}