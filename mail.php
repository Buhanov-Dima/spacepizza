<?php
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

//HTML
$street = $_POST['userStr'];
$home = $_POST['userHou'];
$numKv = $_POST['userApa'];
$commit = $_POST['userCom'];
$name = $_POST['userName'];
$phone = $_POST['userTel'];

//Ajax
$productName = $_POST['productName'];
$productSize = $_POST['productSize'];
$productID = $_POST['productID'];
$productCost = $_POST['productCost'];
$productItems = $_POST['productItems'];
$productQuantity = $_POST['productQuantity'];
$priceCommon = $_POST['all__items__cost'];
$dostavka = $_POST['radio1'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.com';                                               // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'spacepizza.perm@yandex.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'gt197382465'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('spacepizza.perm@yandex.ru'); // от кого будет уходить письмо?
$mail->addAddress('spacepizza.perm@yandex.ru');     // Кому будет уходить письмо 
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с сайта';

$string = 
  "Имя клиента: " .$name. " <br>
  Телефон клиента: $phone <br>
  № дома: $home <br>
  Улица: $street <br>
  Номер квартиры: $numKv <br>
  Комментарий к заказу: $commit<br>
  <br>";

for ($i = 0; $i < count($productID); $i++) {
    $string .=
    "Название товара: $productName[$i] <br> 
    Размер: $productSize[$i] <br> 
    ID товара: $productID[$i] <br> 
    Цена: $productCost[$i] <br> 
    Колличество: $productItems[$i] <br> 
    Общая цена: $productQuantity[$i] <br>
    <br>";
}

$string .= "<br>Общая стоимость всех товаров: $priceCommon<br> Оплата $dostavka";

$mail->Body    = $string;

$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Заявка не отправлена, свяжитесь пожалуйста по телефону 283-99-09';
} else{
	header("Location: /");
}
?>