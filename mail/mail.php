<?php
define('__ROOT__', dirname(__FILE__));

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __ROOT__.'/phpmailer/Exception.php';
require_once __ROOT__.'/phpmailer/PHPMailer.php';
require_once __ROOT__.'/phpmailer/SMTP.php';

if(isset($_POST['name']) && isset($_POST['email'])){
  
  $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
  $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
  }
  
  // debug only
  //var_dump($name, $email);

  // Subject
  $subject = 'Feliz Natal';

  // Message
  $message = "
  <html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">
    <link href=\"https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap\" rel=\"stylesheet\">

  </head>
  <body class=\"clean-body\" style=\"margin: 0; padding: 0; text-align: center; font-family: Arial, Helvetica, sans-serif;\">
    <h1>${name} enviou-lhe um postal!</h1>
    <table cellpadding=\"0\" cellspacing=\"0\" class=\"nl-container\" role=\"presentation\"
      style=\"vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; table-layout: fixed;\" valign=\"top\" width=\"600\">
      <tbody>
        <tr>
          <td>
            <table cellpadding=\"0\" cellspacing=\"0\" class=\"nl-container\" role=\"presentation\"
              style=\"vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse;text-align:left; \" valign=\"top\" width=\"600\">
              <tbody style=\"width:600px;background-color:tomato;color:#fff;\">
                <tr style=\"height:20px;\">
                  <td>
                    <img style=\"width:600px;\" src=\"https://uppartner.pt/raquel/surpresa-de-natal/surpresa-de-natal/mail/Email_postal_natal.png\" />
                  </td>
                </tr>
                <tr style=\"height:60px;text-align:center;\">
                  <td>
                    <a href=\"https://uppartner.pt/raquel/surpresa-de-natal/surpresa-de-natal/postal.html\"><button style=\"color:#fff;border:1px solid #fff;background-color:tomato;padding:20px 50px 20px 50px;cursor:pointer;\">LER MENSAGEM</button></a>
                  </td>
                </tr>
                <tr style=\"height:60px;text-align:center;\">
                  <td>
                    <img />
                    <img />
                    <img />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
  </html>
  ";

  $mail = new PHPMailer(true);  
  try {
      //Server settings
      $mail->SMTPDebug = 0;                                 // Enable verbose debug output
      $mail->isSMTP();                                      // Set mailer to use SMTP
      $mail->Host = "smtp.gmail.com";
      $mail->SMTPAutoTLS = true;
      $mail->SMTPAuth = true;                               // Enable SMTP authentication
      $mail->Username = "noreply.uppartner@gmail.com";
      $mail->Password = "Dez-2020";
      //$mail->SMTPSecure = 'ssl';                            // Enable SSL encryption, TLS also accepted with port 465
      $mail->Port = 587;                                    // TCP port to connect to

      //Recipients
      $mail->setFrom('noreply.uppartner@gmail.com', 'Uppartner');          //This is the email your form sends From
      $mail->addAddress($email); // Add a recipient address
      //$mail->addAddress('contact@example.com');               // Name is optional
      //$mail->addReplyTo('info@example.com', 'Information');
      //$mail->addCC('cc@example.com');
      //$mail->addBCC('bcc@example.com');

      //Attachments
      //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
      //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

      //Content
      $mail->isHTML(true);                                  // Set email format to HTML
      $mail->Subject = $subject;
      $mail->Body    = $message;
      //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

      $mail->send();
      print_r('Message has been sent');
  } catch (Exception $e) {
      http_response_code(400);  
      print_r('Message could not be sent.');
      print_r('Mailer Error: ' . $mail->ErrorInfo);
  }
}