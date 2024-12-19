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

// Tratar requisições OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(["error" => "Método não permitido"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['user_id'] ?? null;

if (!$id || !is_numeric($id)) {
    http_response_code(400);
    echo json_encode(["error" => "ID inválido"]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM users WHERE user_id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(["message" => "Usuário deletado com sucesso"]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Usuário não encontrado"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro ao deletar o usuário: " . $e->getMessage()]);
}
?>
