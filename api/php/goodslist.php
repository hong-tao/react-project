<?php
    header('Access-Control-Allow-Origin:*');
    include './DBHelper.php';

    $sql = "select  * from product";

    $result = excute_oop($sql);

    $row = $result->fetch_all(MYSQLI_ASSOC);

    $row = json_encode($row,JSON_UNESCAPED_UNICODE);

    echo $row



?>