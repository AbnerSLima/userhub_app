<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 3600");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'conexao_app.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método não permitido"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$login = $data['login'] ?? '';
$senha = $data['senha'] ?? '';

if (!$login || !$senha) {
    http_response_code(400);
    echo json_encode(["error" => "Login e senha são obrigatórios"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE login = :login");
    $stmt->bindParam(':login', $login, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($senha, $user['senha'])) {
        echo json_encode(["success" => true, "message" => "Login bem-sucedido"]);
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Credenciais inválidas"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro no servidor: " . $e->getMessage()]);
}
?>
