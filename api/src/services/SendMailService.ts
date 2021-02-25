import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

class SendMailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
          user: account.user,
          pass: account.pass
      }
    });

    this.client = transporter;
    });
  }

  async execute(to: string, subject: string, variables: object, path: string) {
    // read mail file
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    // compile file to handlebars
    const mailTemplateParse = handlebars.compile(templateFileContent);

    // send variables to template
    const html = mailTemplateParse(variables);

    // build email
    const message = await this.client.sendMail({
      to,
      subject,
      html: html,
      from: "NPS <noreply@nps.com.br>"
    });

    console.log(`Message sent: ${message.messageId}`);
    // Preview only available when sending through an Ethereal account
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
}

export default new SendMailService()
