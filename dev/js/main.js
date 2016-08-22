var GLOBAL = {};      //全局对象 存放全局变量及全局方法
GLOBAL.namespace = function (str) {
    var arr = str.split("."), o = GLOBAL;
    for (i = (arr[0] = "GLOBAL")? 1 : 0; i < arr.length; i++) {
        o[arr[i]] = o[arr[i]]||{};
        o = o[arr[i]];
    }
};
GLOBAL.BASEURL = "";

document.addEventListener('DOMContentLoaded', function () {
    // 回到顶部按钮 start
    var div = document.createElement("a");
    div.id = "toTop";
    div.className = "animated flipInX";
    div.innerHTML = '<i class="fa fa-caret-square-o-up" aria-hidden="true"></i>';
    document.body.appendChild(div);
    document.querySelector("#toTop").onclick = function (){
        $("body").animate({"scrollTop":0},300);
    }

    window.onscroll = function (){
        var dh = $(document).height(),
            wh = $(window).height(),
            bt = document.body.scrollTop;
        var totop = document.querySelector("#toTop");
        if (bt>100) {
            totop.style.display = "block";
        }
        else{
            totop.style.display = "none";
        }
		//console.log(dh+","+wh+","+bt);
        if(dh - wh - bt < 1) {
            if (scrollDownFn) {
                scrollDownFn();
            }
        }
    }
	// 回到顶部按钮 end
});

GLOBAL.Toast = function (content,time = "3000") {
    var div = document.createElement("div");
    div.id = "Toast";
    div.className = "ui-toast animated fadeIn";

    var divson = document.createElement("div");
    divson.className = "ui-toast-content";
    divson.innerHTML = content;

    div.appendChild(divson);
    document.body.appendChild(div);
    setTimeout(function(){
        div.classList.remove("fadeIn");
        div.classList.add("fadeOut");
        document.body.appendChild(div);
	}, time);
};