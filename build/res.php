<?php
    //一時ファイルができているか（アップロードされているか）チェック
    if(is_uploaded_file($_FILES['up_file']['tmp_name'])) {
        //一時ファイルを保存ファイルにコピーできたか
        if(move_uploaded_file($_FILES['up_file']['tmp_name'],"./log/".$_FILES['up_file']['name'])) {
            //正常
            echo "uploaded";
        } else {
            // コピーに失敗（ディレクトリがない or パーミッションエラー）
            echo "error while saving.";
        }
    } else {
        echo "file not uploaded.";
    }
