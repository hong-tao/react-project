<?php
    header('Access-Control-Allow-Origin:*');

    include './DBHelper.php';

    $id = isset($_POST["id"]) ? $_POST["id"] : null;

    $sql = "select  * from product";

    if($id){
        $sql .=" where id='$id'";
    }

    $result = excute_oop($sql);

    $row = $result->fetch_all(MYSQLI_ASSOC);

    $row = json_encode($row,JSON_UNESCAPED_UNICODE);

    echo $row

?>