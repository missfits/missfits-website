const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

const MY_EMAIL = "emily@sturman.org";
const FROM_EMAIL = "noreply.missfitsrobotics@gmail.com";
const CONTACT_EMAIL_ID = "d-8d313d994f8f407ea698fe8ca0bedc23";
const NEW_MEMBER_EMAIL_ID = "d-1744b4760fda43f684cff485cf2dbecb";

admin.initializeApp();

exports.sendTestEmail = () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.setSubstitutionWrappers("{{", "}}");
  const msg = {
    to: MY_EMAIL,
    from: FROM_EMAIL,
    templateId: CONTACT_EMAIL_ID,
    substitutions: {
      name: "Emily Sturman",
      email: "emily@sturman.org",
      comments: "This is a test. Can you see this?"
    }
  };

  sgMail
    .send(msg)
    .then(() => console.log("Contact email successfully sent."))
    .catch((error) => {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    });
};

exports.sendEmail = functions.firestore
  .document("applications/{applicationId}")
  .onCreate((snap, context) => {
    console.log("Executing function...");
    const data = snap.data();
    if (!data) {
      return;
    }
  });
