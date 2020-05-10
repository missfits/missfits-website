const functions = require('firebase-functions');
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const inLineCSS = require("nodemailer-juice");

admin.initializeApp();

const MY_EMAIL = "emily@sturman.org";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MY_EMAIL,
    pass: "Q!3qptzPM^^0qERe4x$y"
  }
});
transporter.use('compile', inLineCSS());

exports.sendEmail = functions.firestore
  .document("applications/{doc-id}")
  .onCreate((snap, context) => {
    const data = snap.data();
    if (!data) {
      return;
    }
    const mailOptions = {
      from: "contact@team6418.org",
      to: MY_EMAIL,
      subject: "New Member Application",
      html: `
        <link href="https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@700&family=Sen&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: Sen, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
      
          h1 {
            font-family: "Cabin Sketch", cursive;
          }
      
          th, td {
            border: 1px solid black;
            padding: 10px;
          }
      
          td {
            max-width: 500px;
          }
      
          th {
            background-color: lightgrey;
            text-align: center;
            max-width: 90px;
          }
      
          table {
            margin: 0;
            border: 1px solid black;
            border-collapse: collapse;
          }
        </style>
        <h1>New Member Application</h1>
        <table>
          <tr>
            <th>Name</th>
            <td>${data.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>${data.email}</td>
          </tr>
          <tr>
            <th>Grade</th>
            <td>${data.grade}</td>
          </tr>
          <tr>
            <th>Parent's Email</th>
            <td>${data.parentEmail}</td>
          </tr>
          <tr>
            <th>School</th>
            <td>${data.school}</td>
          </tr>
          <tr>
            <th>Team Source</th>
            <td>${data.teamSource}</td>
          </tr>
          <tr>
            <th>Comments</th>
            <td>${data.comments}</td>
          </tr>
        </table>`
    };
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error);
        return
      }
      console.log("Sent!")
    });
  });
