<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require 'conexao_app.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["error" => "Método não permitido"]);
    exit;
}

$id = $_GET['id'] ?? null;

if (!$id || !is_numeric($id)) {
    http_response_code(400);
    echo json_encode(["error" => "ID inválido"]);
    exit;
}

$id = isset($_GET['id']) ? intval($_GET['id']) : null;

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE user_id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode($user);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Usuário não encontrado"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro ao buscar o usuário: " . $e->getMessage()]);
}
?>
