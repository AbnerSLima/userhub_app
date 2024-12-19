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

$id = $data['user_id'] ?? null;
$nome = $data['nome'] ?? null;
$login = $data['login'] ?? null;
$password = $data['senha'] ?? null;

if (!$id || !$nome || !$login || !$password) {
    http_response_code(400);
    echo json_encode(["error" => "Dados incompletos"]);
    exit();
}

try {
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("UPDATE users SET nome = :nome, login = :login, senha = :senha WHERE user_id = :id");
    $stmt->execute([
        ':id' => $id,
        ':nome' => $nome,
        ':login' => $login,
        ':senha' => $hashedPassword
    ]);

    echo json_encode(["message" => "Usuário atualizado com sucesso!"]);
} catch (Exception $e) {
    error_log("Erro ao atualizar usuário: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "Erro interno ao atualizar usuário"]);
}