require(['jquery', 'graph/graph'], function ($, graph) {
    /*
     * 搜索条的Label高亮样式
     */
    $(".search-header label").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        location.search = "?" + $(this).parents("form").serialize(); // 修改Url参数会直接重新加载
    });

    /*
     * fixed 悬浮搜索框
     */

    // 获取搜索框的位置
    var $searchHeader = $(".search-header");
    if ($searchHeader.length == 0) return;
    var searchHeaderTop = $searchHeader.offset().top;

    // 检测滚动
    $(window).scroll(function () {
        if ($("body").scrollTop() >= searchHeaderTop) {
            $searchHeader.children().addClass('search-header-fixed');
        } else {
            $searchHeader.children().removeClass('search-header-fixed');
        }
    });
    $(window).scroll();

    /*
     * 获得知识图谱
     */

    // 只有第一页论文才有知识图谱
    if ($(".paging li.active").text() == 1 && $("label.active").text() == "论文") {

        // 获取querystring
        var keyword = $("input[name=qs]")[0].value;
        var depth = 2;
        var query = {
            keyword: keyword,
            depth: depth,
            type: 1 //知识图谱
        }
        // 开始加载知识图谱
        graph.getForce("/search/graph", query, {
            success: function(){
                $(".graph").slideDown("slow");
            },
            dblclick: function(d, i){
                location.search = "?qs=" + d.name;
            }
        });
    }

});
