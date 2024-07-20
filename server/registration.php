

<?php
require_once "./connection/connection.php";

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'insertRegisterData':        

            $data = json_decode($_POST['credential'], true);

            $userregisterusername = $data['userregisterusername'];
            $userregisteremail = $data['userregisteremail'];
            $userregisterpassword = $data['userregisterpassword'];

            $file = $_FILES['imagecredential'];

            $sql = "select*from user where username = '$userregisterusername' or userpassword = '$userregisterpassword'";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                echo json_encode(true); // if client already exist
            }
            else {
                echo json_encode(false);

                $clientProfileName = $file['name'];

                $pathInfo = pathinfo($clientProfileName);
    
                $filename = $pathInfo['filename']; // name of the image
                $extension = $pathInfo['extension']; // jpg, png etc
                $timestamp = date("YmdHis");
    
                $uniqueClientProfileName = $filename . "_" . $timestamp . "." . $extension;
                $clientProfileTMP = $file['tmp_name'];
                $clientProfileDestination = '../public/asset/user/' . $uniqueClientProfileName;
    
                move_uploaded_file($clientProfileTMP, $clientProfileDestination);

                $sql = "INSERT INTO user (username, useremail, userpassword, userphoto) VALUES ('$userregisterusername', '$userregisteremail', '$userregisterpassword', '$uniqueClientProfileName')";
                $conn->query($sql);
            }
    
            $conn->close();
            break;
        }
}

?>