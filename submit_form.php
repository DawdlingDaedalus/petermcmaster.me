<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$env = parse_ini_file(".env");
$emailUser = $env['EMAIL_USER'];
$emailPass = $env['EMAIL_PASS'];
$server = $env['SERVER'];
$secretKey = $env['SECRET_KEY'];

$recaptchaSecret = $secretKey;
$recaptchaResponse = $_POST['g-recaptcha-response'];


// Check if it's a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $recaptchaSecret = $secretKey;
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse");
    $responseKeys = json_decode($response, true);

    // Verify the CAPTCHA
    if (intval($responseKeys["success"]) !== 1) {
        http_response_code(400); // Bad Request
        echo json_encode(["success" => false, "message" => "Please complete the CAPTCHA."]);
        exit; // Stop further processing
    } else {
        // CAPTCHA was completed successfully
        // Continue processing the form
        $name = $_POST['name'];
        $email = $_POST['email'];
        $subject = $_POST['subject'];
        $messageBody = $_POST['message'];

        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->isSMTP();
            $mail->Host       = $server;  // Your SMTP server
            $mail->SMTPAuth   = true;
            $mail->Username   = $emailUser;      // SMTP username
            $mail->Password   = $emailPass;      // SMTP password
            $mail->SMTPSecure = 'ssl';  // 'ssl' or 'tls'
            $mail->Port       = 465;    // TCP port to connect to; 465 for ssl

            //Recipients
            $mail->setFrom($email, $name);
            $mail->addAddress($emailUser);

            // Content
            $mail->isHTML(true);  // Set email format to HTML
            $mail->Subject = $subject;
            $mail->Body    = $messageBody;

            $mail->send();
            http_response_code(200);  // OK
            echo json_encode(['success' => true]); // For success
            exit; // Stop further processing
        } catch (Exception $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(["success" => false, "message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
            exit; // Stop further processing
        }
    }
}
