<?
if ((isset($_POST['name']) && $_POST['name'] != "") && (isset($_POST['email']) && $_POST['email'] != "")) { //Проверка отправилось ли наше поля name и не пустые ли они

    $to = 'srubets@speroteck.com'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = 'ЗАЯВКА НА РЕГИСТРАЦИЮ ООО'; //Загаловок сообщения
    $message = 'Привет, вы получили письмо<br>' .
        'Имя - ' . $_POST['name'] .
        '<br>Телефон - ' . $_POST['email'];
    $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Отправитель <from@example.com>\r\n"; //Наименование и почта отправителя
    mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail

    echo 'ok';
}
