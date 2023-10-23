<?php
$servername = "127.0.0.1";
$username = "admin";
$password = "password123";
$database = "admin";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM admin_credentials WHERE username = '$username' AND password = '$password'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $response = array('success' => true);
} else {
    $response = array('success' => false);
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
