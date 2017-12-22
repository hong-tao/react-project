<?php
	header('Access-Control-Allow-Origin:*');

    include "DBHelper.php";
     
    $title = isset($_POST["title"]) ? $_POST["title"] : '';//搜索的标题
    $type = isset($_POST["type"]) ? $_POST["type"] : '';//操作的类型
    $id = isset($_POST["id"]) ? $_POST["id"] : '';//编辑、搜索的id
    $ids = isset($_POST["ids"]) ? $_POST["ids"] : '';//批量删除的id字符串集合
    $datas = isset($_POST["datas"]) ? $_POST["datas"] : '';//编辑、添加传输的json数据

    // 初始化，防止报错
    if($type == ''){
        $row = 'error connect database!';
    }
    else if($type == 'search'){
        if($title != ''){
            $sql = "select * from facehotel where name like '%$title%'";
        }else {
            $sql = "select * from facehotel";  
        }
        $result = $conn->query($sql);

        $row = $result->fetch_all(MYSQLI_ASSOC);
    }
    // 单项删除
    else if($type == 'remove'){

        $sql = "delete from facehotel where id=$id";
        $row = $conn->query($sql);
    }
    // 批量删除
    else if($type == 'dels'){
        $idxs = explode(',', $ids);
        $row = Array();
        foreach ($idxs as $idx) {
            $numIdx = (int)$idx;
            $sql = "delete from facehotel where id=$numIdx";
            $result = $conn->query($sql);
            Array_push($row, $result);
        }
    }
    // 添加
    else if($type == 'add'){
        $arr = json_decode($datas, true);
        $resKey = '(';
        $resVal = '(';
        foreach ($arr as $key => $value) {
            $resKey .= "$key,";
            $resVal .= "'$value',";
        }
        $resKey = substr($resKey, 0, -1).')';
        $resVal = substr($resVal, 0, -1).')';
        $sql = "insert into facehotel $resKey values $resVal";
        $row = $conn->query($sql);
    }
    // 编辑
    else if($type == 'edit'){
        $arr = json_decode($datas, true);
        $result = '';
        foreach ($arr as $key => $value) {
            $result .= "$key='$value',";
        }
        $res = substr($result, 0, -1);
        $sql = "update facehotel set $res where id=$id";
        $row = $conn->query($sql);
    }
    // 用完数据清掉释放内存
    $conn->close();

    echo json_encode($row,JSON_UNESCAPED_UNICODE);
?>