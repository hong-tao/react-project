<?php
	header('Access-Control-Allow-Origin:*');

    include "connect.php";
     
    $title = isset($_POST["title"]) ? $_POST["title"] : '';//搜索的标题
    $type = isset($_POST["type"]) ? $_POST["type"] : '';//操作的类型
    $id = isset($_POST["id"]) ? $_POST["id"] : '';//编辑、删除的id
    $ids = isset($_POST["ids"]) ? $_POST["ids"] : '';//批量删除、上下架的id字符串集合
    $state = isset($_POST["state"]) ? $_POST["state"] : '';//上下架的状态
    $datas = isset($_POST["datas"]) ? $_POST["datas"] : '';//编辑、添加传输的json数据

    // 初始化，防止报错
    if($type == ''){
        $row = 'error connect database!';
    }
    else if($type == 'upSearch'){
        if($title != ''){
            $sql = "select * from product where productName like '%$title%' and state='up'";
        }else {
            $sql = "select * from product where state='up'";
        }
        
        $result = $conn->query($sql);

        $row = $result->fetch_all(MYSQLI_ASSOC);
    }
    // 下架搜索或者初始化
    else if($type == 'downSearch'){
        if($title != ''){
            $sql = "select * from product where productName like '%$title%' and state='down' ";
        }else {
            $sql = "select * from product where state='down'";
        }
        $result = $conn->query($sql);

        $row = $result->fetch_all(MYSQLI_ASSOC);
    }
    // 单项删除
    else if($type == 'del'){
        $sql = "delete from product where id=$id";
        $row = $conn->query($sql);
    }
    // 批量删除
    else if($type == 'dels'){
        $idxs = explode(',', $ids);
        $row = Array();
        foreach ($idxs as $idx) {
            $numIdx = (int)$idx;
            $sql = "delete from product where id=$numIdx";
            $result = $conn->query($sql);
            Array_push($row, $result);
        }
    }
    // 单项下架
    else if($type == 'unShelve'){
        $sql = "update product set state='down' where id=$id";
        $row = $conn->query($sql);
    }
    // 批量下架
    else if($type == 'unShelves'){
        $idxs = explode(',', $ids);
        $row = Array();
        foreach ($idxs as $idx) {
            $numIdx = (int)$idx;
            $sql = "update product set state='down' where id=$numIdx";
            echo $sql;
            $result = $conn->query($sql);
            Array_push($row, $result);
        }
    }
    // 单项上架
    else if($type == 'shelve'){
        $sql = "update product set state='up' where id=$id";
        $row = $conn->query($sql);
    }
    // 批量上架
    else if($type == 'shelves'){
        $idxs = explode(',', $ids);
        $row = Array();
        foreach ($idxs as $idx) {
            $numIdx = (int)$idx;
            $sql = "update product set state='up' where id=$numIdx";
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
        $sql = "insert into product $resKey values $resVal";
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
        $sql = "update product set $res where id=$id";
        $row = $conn->query($sql);
    }

    // 用完数据清掉释放内存
    $conn->close();

    echo json_encode($row,JSON_UNESCAPED_UNICODE);
?>