<?php
	header('Access-Control-Allow-Origin:*');

    include "connect.php";
     
    $title = isset($_POST["title"]) ? $_POST["title"] : '';//搜索的标题
    $type = isset($_POST["type"]) ? $_POST["type"] : '';//操作的类型
    $id = isset($_POST["id"]) ? $_POST["id"] : '';//编辑的id
    $datas = isset($_POST["datas"]) ? $_POST["datas"] : '';//编辑、添加传输的json数据

    // 初始化，防止报错
    if($type == ''){
        $row = 'error connect database!';
    }
    
    else if($type == 'search'){
        if($title != ''){
            $sql = "select * from buycarorder where productName like '%$title%' or username='$title'";
        }else {
            $sql = "select * from buycarorder";
        }
        $result = $conn->query($sql);
        $row = $result->fetch_all(MYSQLI_ASSOC);
    }

    // 编辑
    else if($type == 'edit'){
        $arr = json_decode($datas, true);
        $result = '';
        foreach ($arr as $key => $value) {
            $result .= "$key='$value',";
        }
        $res = substr($result, 0, -1);
        $sql = "update buycarorder set $res where id=$id";
        $row = $conn->query($sql);
    }

    // 用完数据清掉释放内存
    $conn->close();

    echo json_encode($row,JSON_UNESCAPED_UNICODE);
?>