<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require realpath(dirname(__FILE__) . '/../PHPMailer/src/Exception.php');
require realpath(dirname(__FILE__) . '/../PHPMailer/src/PHPMailer.php');
require realpath(dirname(__FILE__) . '/../PHPMailer/src/SMTP.php');

echo realpath(dirname(__FILE__) . '/instrukcja połączenia JITSI.docx');


$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host       = 'poczta.wroclaw.sa.gov.pl';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'S-4235-wideo';
    $mail->Password   = ''; // email password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet = 'UTF-8';
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    
    $mail->setFrom('wideokonferencja@szczecin-pz.sr.gov.pl', 'Wideokonferencja SR Szczecin');
	$mail->addAddress("wideokonferencja@szczecin-pz.sr.gov.pl");
    for($i=0;$i<count($data['emails']);$i++){
        if (strpos($data['emails'][$i], '@') !== false) {
            $mail->addAddress("{$data['emails'][$i]}");
        }

    }
    $mail->addAttachment(realpath(dirname(__FILE__) . '/instrukcja połączenia JITSI.docx'));

    $mail->isHTML(true);
    $mail->Subject = "[{$data['signature']}] Sąd Rejonowy Szczecin Prawobrzeże i Zachód";
    $mail->Body    = "Dzień dobry,<br/>
    Przesyłam link do wideokonferencji w sprawie {$data['signature']}, która odbędzie się {$data['date']} o godzinie {$data['time_from']}.<br/>
    Załączam również instrukcję podłączenia się.​<br/>​<br/>
    {$data['link']}<br/>​<br/>
    Z poważaniem<br/>
    Odział informatyczny</br>
    tel. 91 46 03 515</br>
    tel. 91 46 03 517</br>";
    $mail->AltBody = "Dzień dobry,
    Przesyłam link do wideokonferencji w sprawie {$data['signature']}, która odbędzie się {$data['date']} o godzinie {$data['time_from']}.
    Załączam również instrukcję podłączenia się.​
    {$data['link']}";

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}