const admin = require('firebase-admin')
const twilio = require('./twilio')

module.exports = (req, res) => {

  if (!req.body.phone) {
    //error status
    return res.status(422).send({error: 'You must provide a phone'})
  }
  const phone = String(req.body.phone).replace(/[^\d]/g, "")

  admin.auth().getUser(phone)
  .then((userRecord) => {
    const code = Math.floor((Math.random() * 8999 + 1000))

    twilio.massages.create({
      body: "Your code is" + code,
      to: phone,
      from: '16312121817'
    }, (error) => {
      if (error){ return res.status(422).send({ error }) }

      //save code to user on firebase
      admin.database().ref('users/' + phone)
      .update({ code: code, codeValid: true }, () => {
        res.send({ success: true })
      })
    })
    return null
  })
  .catch((error) => {
    res.status(422).send({ error })
  })
}
