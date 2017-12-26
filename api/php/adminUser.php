<?php
    header('Access-Control-Allow-Origin:*');

    include "connect.php";
    

    $username = isset($_POST["username"]) ? $_POST["username"] : '';
    $password = isset($_POST["password"]) ? $_POST["password"] : '';

    $key = md5($password);

    $sql = "select * from adminuser where username = '$username' and password = '$key'";

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