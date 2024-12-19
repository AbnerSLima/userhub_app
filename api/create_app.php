<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 3600");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'conexao_app.php';

$data = json_decode(file_get_contents("php://input"), true);
$nome = $data['nome'];
$login = $data['login'];
$password = $data['senha'];

if ($nome && $login && $password) {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (nome, login, senha) VALUES (:nome, :login, :senha)");
    $stmt->execute([':nome' => $nome, ':login' => $login, ':senha' => $hashedPassword]);
    echo json_encode(["message" => "Usuário criado com sucesso!"]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "Dados incompletos"]);
}
?>
