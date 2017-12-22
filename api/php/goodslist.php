<?php
    header('Access-Control-Allow-Origin:*');

    include './DBHelper.php';

    $params = isset($_POST["params"]) ? $_POST["params"] : null;
    
    
    $sql = "select  * from product";

    if($params){
        $sql .=" where aclass='$params'";
    }

    $result = excute_oop($sql);

    $row = $result->fetch_all(MYSQLI_ASSOC);

    $row = json_encode($row,JSON_UNESCAPED_UNICODE);

    echo $row



?>