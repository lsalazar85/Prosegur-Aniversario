<?php

include_once("lib/email.config.php");

@$link = mysql_connect($config->myhost, $config->myuser, $config->mypassw);

if (false === $link) {
	header('HTTP/1.1 500 Internal Server Error');
	die(mysql_error());
}

$db = mysql_select_db($config->mybd);
if (false === $db) {
	header('HTTP/1.1 500 Internal Server Error');
	die (mysql_error());
}



$nombre = mysql_real_escape_string($_POST['nombre']);
$localidad = mysql_real_escape_string($_POST['localidad']);
$email = mysql_real_escape_string($_POST['email']);
//$prefijo = mysql_real_escape_string($_POST['prefijo']);
$telefono = mysql_real_escape_string($_POST['telefono']);
$consulta = trim(mysql_real_escape_string($_POST['consulta']));
$source = mysql_real_escape_string($_POST['source']);
$medium = mysql_real_escape_string($_POST['medium']);
$campaign = mysql_real_escape_string($_POST['campaign']);
$id_dinamico = mysql_real_escape_string(substr(number_format(time() * mt_rand(), 0, '', ''), 0, 10));
$origen_url = mysql_real_escape_string($_POST['origen_url']);
$fecha = date('Y-m-d');
$hora = date('H:i:s');

$errors = array();
    
/* la variable source toma el valor del parametro source de la url, con strpos busca la palabra Messina y si la encuentra envia email a todos los de abajo. */
if (strpos($source,'Messina') !== false) {
    $config = (object) array(
	'myhost' => 'localhost',
	'myuser' => 'prosegur_us',
	'mypassw' => '7aqScVHcb2CZ',
	'mybd' => 'wprosegur_20',
	'smtp_from' => 'contacto@alarmamonitoreada.com',
	'smtp_subject' => 'Prosegur 20',
	'smtp_user' => 'dnsadmin',
	'smtp_pass' => 'b4YDDksprsBh',
	'smtp_emails' => array(
		'leads@nextperience.net',
		'prosegur@nextperience.net',
        'Next@messina-mailing.com'
	)
);
}

if (0 === preg_match('/[A-Za-z]{2} [A-Za-z]{2}/', $nombre)) {
	$errors['nombre'] = true;
}

if (empty($localidad)) {
	$errors['localidad'] = true;
}


if (false === filter_var($email, FILTER_VALIDATE_EMAIL)) {
	$errors['email'] = true;
}

if (0 === preg_match('/^\d+$/', $telefono)) {
	$errors['telefono'] = true;
}

if (empty($consulta)) {
	$errors['consulta'] = true;
}

if (!empty($errors)) {
	header('HTTP/1.1 422 Unprocessable Entity');
	die(json_encode($errors));
}

$sql = ('INSERT INTO prosegur (fecha_lead, hora_lead, nombre, email, localidad, telefono, consulta, source_lead, medium, campaign, origen) VALUES ("'.$fecha.'", "'.$hora.'",  "'.$nombre.'", "'.$email.'", "'.$localidad.'", "'.$telefono.'", "'.$consulta.'", "'.$source.'", "'.$medium.'", "'.$campaign.'", "'.$origen_url.'")');


if (false === mysql_query($sql)) {
    header('HTTP/1.1 500 Internal Server Error');
	die (mysql_error());
} 

$id_real = mysql_insert_id();
//echo $id_real;
mysql_close($link);


require 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer();
$mail->CharSet = "UTF-8";
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->Host = "smtp.sendgrid.net"; // SMTP a utilizar. Por ej. smtp.elserver.com
$mail->Username = $config->smtp_user; // Correo completo a utilizar
$mail->Password = $config->smtp_pass; // Contraseña
$mail->Port = 587; // Puerto a utilizar
$mail->From = "no-reply@proseguralarmas.com"; // Desde donde enviamos (Para mostrar)
$mail->FromName = "Prosegur";

foreach ($config->smtp_emails as $item) {
	$mail->AddAddress($item);
}

$mail->IsHTML(true); // El correo se envía como HTML

//$mail->Subject = 'Formulario - Campaña'.$campaign.' - Origen: '.$source.' - ID: '.$id; // Este es el titulo del email.
$mail->Subject = 'Formulario Prosegur 20 - Campaña : '.$campaign.' - Origen: '.$source.' - ID: '.$id_real; // Este es el titulo del email.

$body  = '<div><strong>Nombre: </strong>'.$nombre.'</div>';
$body .= '<div><strong>Localidad: </strong>'.$localidad.'</div>';
$body .= '<div><strong>Email: </strong>'.$email.'</div>';
$body .= '<div><strong>Telefono: </strong>'.$telefono.'</div>';
$body .= '<div><strong>Consultas: </strong>'.$consulta.'</div>';
$body .= '<div><strong>source: </strong>'.$source.'</div>';
$body .= '<div><strong>medium: </strong>'.$medium.'</div>';
$body .= '<div><strong>campaign: </strong>'.$campaign.'</div>';
$body .= '<div><strong>id_dinamico: </strong>'.$id_real.'</div>';
$body .= '<div><strong>origen_url: </strong>'.$origen_url.'</div>';

$mail->Body = $body; // Mensaje a enviar

// Envía el correo.
if (!$mail->Send()) {
	header('HTTP/1.1 500 Internal Server Error');
	echo $mail->ErrorInfo;
}
