require('dotenv').config();
const express = require('express');
const server = express();

const cors = require('cors');
server.use(cors());

const expressFormidable = require('express-formidable');
server.use(expressFormidable());

const mailgun = require('mailgun-js')({  apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN  });

/*------------*/

server.post('/form', (request, response) => {
    console.log("Route /form");

    console.log(request.fields);

    const data = {
        from: `${request.fields.firstname} ${request.fields.lastname}  <${request.fields.email}>`,
        to: "isaak.nicolas@epitech.eu",
        subject: "Formulaire rempli",
        text: `${request.fields.message}`,
    };

    mailgun.messages().send(data, (error, body) => {
        console.log(body);
        console.log(error);

        if (error === undefined)
            response.json({ message: "Données du form bien reçues, mail envoyé." });
        else
            response.json(error);

    });

});

/*------------*/

server.all('*', (request, response) => {
    response.status(400).json({ message: "Page not found" });
});

server.listen(process.env.PORT, () => {
    console.log("Server start ! 😎");
});