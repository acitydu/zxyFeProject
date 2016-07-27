var List = function(method,agmts,pagesize,list="list",count="page_count"){
    var pagenow = 1,
        isloading = false,
        islastpage = false;
    var loadpage = function (page,isnext,callback){
        if (!isloading && !islastpage) {
            isloading = true;
            var data = {
                page:page,
                page_size:pagesize
            };
            data = $.extend(data,agmts);    //合并固定参数和动态参数
            $("#loadingmore").css("visibility","visible");
            $.ajax({
                async: true,
                url: GLOBAL.BASEURL + 'api.php/' + method,
                type: 'POST',
                dataType: 'json',
                data: data,
                error: function () {
                    $("#loadingmore").css("visibility","hidden");
                    isloading = false;
                    return false;
                },
                success: function (result) {
                    $("#loadingmore").css("visibility","hidden");
                    if (result.error == 0) {
                        var pagecount = result.content[count];
                        pagenow = page;
                        if (pagenow>=pagecount) {
                            islastpage = true;
                            $("#loadingmore").html("没有更多了").css("visibility","visible");
                        }
                        if (result.content[list]==null || result.content[list] == "" || result.content[list].length == 0  && isnext==0 ) {
                            $("#list").html("<div id='nodata'>╮(╯▽╰)╭ 暂无数据</div>");
                        }
                        else{
                            if (isnext==0) {
                                vm.lists = result.content[list];
                            }
                            else if (isnext==1){
                                vm.lists = vm.lists.concat(result.content[list]);
                            }
                        }
                    }
                    else {
                        alert(result.msg);
                    }
                    isloading = false;
                }
            });
        }
    };

    var getpagenow = function(){
        return pagenow;
    };

    var getloadstatus = function(){
        return isloading;
    };

    var getlastpage = function(){
        return islastpage;
    };

    return {
        loadpage:loadpage,
        getpagenow:getpagenow,
        getloadstatus:getloadstatus,
        getlastpage:getlastpage
    }
}