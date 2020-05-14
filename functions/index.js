const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();

function emailMessage(data, emailId, to) {
  return {
    to,
    from: functions.config().emails.from,
    replyTo: data.email,
    templateId: emailId,
    dynamicTemplateData: data,
    substitutions: data
  }
}

function sendEmail(data, emailId, to) {
  const msg = emailMessage(data, emailId, to);
  console.log(msg);
  sgMail.setApiKey(functions.config()["send-grid"].key);
  sgMail.setSubstitutionWrappers("{{", "}}");
  sgMail
    .send(msg)
    .then(() => console.log("Email successfully sent."))
    .catch((error) => {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    });
}

exports.sendApplicationEmail = functions.firestore
  .document("applications/{applicationId}")
  .onCreate((snap, context) => {
    console.log("Executing application function...");
    const data = snap.data();
    if (!data) {
      return;
    }
    sendEmail(data, functions.config()["send-grid"]["new-member-email-id"], functions.config().emails["application-to"]);
  });

exports.sendContactEmail = functions.firestore
  .document("contact/{contactId}")
  .onCreate((snap, context) => {
    console.log("Executing contact function...");
    const data = snap.data();
    if (!data) {
      return;
    }
    sendEmail(data, functions.config()["send-grid"]["contact-email-id"], functions.config().emails["contact-to"]);
  });