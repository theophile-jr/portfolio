express = require('express');
bodyParser = require('body-parser');
app = express();
var nodemailer = require('nodemailer');
require('dotenv').config()
logger = require('./logger');
//importing



//using middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('frontend')); //routing frontend page
logger.info("Middlewares loaded")

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

app.post('/sendcontact', function (req, res) { //serves angular
/*Should check mail, et c....*/
    mail = req.body.mail
    identity = req.body.identity
    phone = req.body.phone
    message = req.body.message.replace(/<[^>]*>?/gm, ''); //to be sure there isn't any html
    if(validateEmail(mail) && identity && (message.length > 30)){
    
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
         user: process.env.mail,
        pass: process.env.password,
        }
    });

var mailOptions = { //prevent site owner
  from: process.env.mail,
  to: 'theophilejeromerocher44@gmail.com',
  subject: 'Nouveau message reçu !',
  text: `identité: ${identity} \n phone : ${phone} \n mail : ${mail} \n message : ${message}`,
};


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    logger.warn("error while sending mail")
    return res.status(500).json({success: false, message: "Une erreur s'est produite lors de l'envoie du message !"});
  } else {
    logger.info("Mail sent correctly")
    return res.status(200).json({success: true, message: "Le message a bien été envoyé ! "});
  }
});
    }else{
      logger.warn("One form badly completed")
      return res.status(500).json({success: false, message: "Une erreur s'est produite lors de l'envoie du message : formulaire mal complété ! !"});
    }
});

app.listen(process.env.port, function () {
    logger.info(`Website on http://localhost:${process.env.port} !`)
  })

