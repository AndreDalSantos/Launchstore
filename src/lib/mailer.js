const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "29fd2baf06c18b",
      pass: "ce5f9a3efffed7"
    }
  })

