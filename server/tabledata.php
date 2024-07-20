


<?php
require_once "./connection/connection.php";

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'insertTableData':

            $data = json_decode($_POST['credential'], true);
            $firstname = $data['firstname'];
            $lastname = $data['lastname'];

            $conn->query("insert into data (firstname, lastname) values ('$firstname', '$lastname')");

            if ($conn->affected_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }

            $conn->close();
            break;

            case 'getTableData':
   
                $result = $conn->query("select*from data");
    
                    $data = [];
                    while ($row = $result->fetch_assoc()) {
                        $data[] = $row;
                    }
                    echo json_encode($data);
                $conn->close();
                break;

    }
}
?>