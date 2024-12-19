<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'conexao_app.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($id) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE user_id = :id");
    $stmt->execute([':id' => $id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode($user);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Usuário não encontrado"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "ID inválido"]);
}
?>