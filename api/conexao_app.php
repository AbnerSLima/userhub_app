<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$host = 'bd_abnerthiago.mysql.dbaas.com.br';
$dbname = 'bd_abnerthiago';
$username = 'bd_abnerthiago';
$password = 'Py9Qlp03#';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro ao conectar ao banco de dados: " . $e->getMessage()]);
    exit;
}
?>