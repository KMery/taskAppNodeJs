const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
    to: 'kmerydelirio@gmail.com',
    from: 'kmerydelirio@gmail.com',
    subject: 'This is my firs sendgrid Mail',
    text: 'It work!'
});