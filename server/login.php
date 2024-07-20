
<?php
require_once "./connection/connection.php";

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'testLogin':

            $data = json_decode($_POST['credential'], true);
            $username = $data['username'];
            $password = $data['password'];

            $result = $conn->query("select*from user where username = '$username' and userpassword = '$password'");

            if ($result->num_rows > 0) {
                echo json_encode(['islogin' => true, 'isrouteprotected' => true]);
            } else {
                echo json_encode(['islogin' => false, 'isrouteprotected' => false]);
            }

            $conn->close();
            break;

            case 'getUserData':

                $username = json_decode($_POST['credential'], true);
    
                $result = $conn->query("select*from user where username = '$username'");
    
                    $data = '';
                    while ($row = $result->fetch_assoc()) {
                        $data = $row;
                    }
    
                    echo json_encode($data);
                $conn->close();
                break;

    }
}
?>