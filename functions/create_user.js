const admin = require('firebase-admin')

module.exports = (req, res) => {
  //veryify user provided a phone
  if (!req.body.phone){
    return res.status(422).send({error: 'Bad Input'})
  }

  //format the phone number to remove dashes and parens
  const phone = String(req.body.phone).replace(/[^\d]/g, "")

  //create a new user accout using that phone number
  admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(error => res.status(422).send({ error }))
  //respond to user request

}
