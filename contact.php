<?php
// Optional contact handler. Saves messages to data/messages.txt and tries to email them.
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !empty($_POST['website'])) { echo json_encode(['ok'=>false]); exit; }
$name  = substr(trim(strip_tags($_POST['name']  ?? '')), 0, 80);
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$msg   = substr(trim(strip_tags($_POST['message'] ?? '')), 0, 1500);
if (!$name || !$email || !$msg) { echo json_encode(['ok'=>false]); exit; }
$line = date('Y-m-d H:i') . " | $name <$email>\n$msg\n---\n";
@file_put_contents(__DIR__ . '/data/messages.txt', $line, FILE_APPEND | LOCK_EX);
@mail('kaydenmoodley38@gmail.com', "Portfolio message from $name", $msg, "Reply-To: $email"); // works only if the server can send mail
echo json_encode(['ok'=>true]);
