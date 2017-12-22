<?php
    header('Access-Control-Allow-Origin:*');

    include "DBHelper.php";
    

    $username = isset($_GET["username"]) ? $_GET["username"] : '';
    $password = isset($_GET["password"]) ? $_GET["password"] : '';

    $key = md5($password);

    $sql = "select * from merchantuser where username = '$username' and password = '$key'";

    $result = $conn->query($sql);
    $row = $result->fetch_row();

    if($row[0]){
        echo 'ok';
    }else{
        echo 'fail';
    }
    // 释放查询内存(销毁)
    $result->free();

    //关闭连接
    $conn->close();
?>