'use strict';
import $ from "jquery";
var holder = $('holder');
/** hoverエリアにドラッグされた場合 */
holder.ondragover = function () {
    return false;
};
/** hoverエリアから外れた or ドラッグが終了した */
holder.ondragleave = holder.ondragend = function () {
    return false;
};
/** hoverエリアにドロップされた */
holder.ondrop = (e) => {
    e.preventDefault(); // イベントの伝搬を止めて、アプリケーションのHTMLとファイルが差し替わらないようにする

    var file = e.dataTransfer.files[0];
    holder.innerText = file.name;
    console.log(file.path);

    return false;
};

function check(params) {
    
}
