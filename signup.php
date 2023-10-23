<?php
// Database configuration
$host = "127.0.0.1";
$database = "admin";
$username = "root";
$password = "";

// Connect to the database
try {
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $newUsername = $_POST["new-username"];
    $newEmail = $_POST["new-email"];
    $newPassword = $_POST["new-password"];
    $confirmPassword = $_POST["confirm-password"];

    // Perform data validation and checks here (e.g., check if passwords match)

    // If data is valid, insert it into the database
    // Remember to hash the password for security before storing it

    // Example code to insert data into the 'users' table
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$newUsername, $newEmail, $hashedPassword]);

    // Provide feedback to the user
    if ($stmt->rowCount() > 0) {
        echo "Registration successful. You can now log in.";
    } else {
        echo "Registration failed. Please try again.";
    }
}
?>
