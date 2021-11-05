//获取新闻详情
const getNewsDetail = id=>{
    console.log('开始请求详情',id);
    console.log(window.history.pushState)
    window.location.href = `./newsDetail.html?id=${id}`;
}
let page = 1,pageSize = 9;
const getNewList=(page,pageSize,isFirst=true)=>{
//新闻资讯列表
$.ajax({url:`https://www.fastmock.site/mock/cf7283e160506f8479ad9b00440923f8/api/getNewLists?page=${page}&pageSize=${pageSize}`,success:function(result){
    if(result.code==='200'){
        let data = result.data;
        window.pageNum = data.content.pageSum
        console.log('新闻数据',window.pageNum);
        let newItem =  data.content.data.map(item =>{
            // <div class="new-img"><img data-src=${item.detail.img} alt="" class="lazyload"></div>
            return `
            <li data-id=${item.id} class="newList-item">
             <div class="new-img"><img data-src=${item.detail.img} src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019a8657db209a0000018c1b1a539f.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638603110&t=d92ccd37e1d84e01d47f6c45625eaaad" class="lazyload"></div>
                <div>
                <div class="new-list-title hidden1">${item.detail.title}</div>
                <div class="new-time">${item.detail.time}</div>
                <div class="new-article hidden2">${item.detail.content}</div>
                </div>
            </li>
            `
        })
        $("#newsList").html(newItem);
        $('#newsList').find("li").on('click',function(e) {
            let id = $(this).attr('data-id');
            console.log($(this).attr('data-id'))
            getNewsDetail(id)
        })
        if(isFirst){
            $(".zxf_pagediv").createPage({
                pageNum: window.pageNum,
                current: page,
                backfun: function(e) {
                    console.log('current',e);//回调
                    getNewList(e.current,pageSize, false);
                }
            });
        }
        // zp.addhtml($(".zxf_pagediv"),{
        //     pageNum: window.pageNum,
        //     current: page,
        //     // backfun: function(e) {
        //     //     console.log('current',e);//回调
        //     //     getNewList(e.current,pageSize);
        //     // }
        // });
    }
}});
};
getNewList(page,pageSize);
var zp = {
    init:function(obj,pageinit){
        return (function(){
            zp.addhtml(obj,pageinit);
            zp.bindEvent(obj,pageinit);
        }());
    },
    addhtml:function(obj,pageinit){
        return (function(){
            obj.empty();
            /*上一页*/
            if (pageinit.current > 1) {
                obj.append('<a href="javascript:;" class="prebtn">上一页</a>');
            } else{
                obj.remove('.prevPage');
                obj.append('<span class="disabled">上一页</span>');
            }
            // /*中间页*/
            // if (pageinit.current >4 && pageinit.pageNum > 4) {
            //  obj.append('<a href="javascript:;" class="zxfPagenum">'+1+'</a>');
            //  obj.append('<a href="javascript:;" class="zxfPagenum">'+2+'</a>');
            //  obj.append('<span>...</span>');
            // }
            if (pageinit.current >4 && pageinit.current <= pageinit.pageNum-5) {
                var start  = pageinit.current - 2,end = start + 4;
            }else if(pageinit.current >4 && pageinit.current > pageinit.pageNum-5){
                var start  = pageinit.pageNum - 4,end = pageinit.pageNum;
            }else{
                var start = 1,end = Math.ceil((pageinit.pageNum)/9)||5;
            }
            for (;start <= end;start++) {
                if (start <= pageinit.pageNum && start >=1) {
                    if (start == pageinit.current) {
                        obj.append('<span class="current">'+ start +'</span>');
                    } else if(start == pageinit.current+1){
                        obj.append('<a href="javascript:;" class="zxfPagenum nextpage">'+ start +'</a>');
                    }else{
                        obj.append('<a href="javascript:;" class="zxfPagenum">'+ start +'</a>');
                    }
                }
            }
            // if (end < pageinit.pageNum) {
            //  obj.append('<span>...</span>');
            // }
            /*下一页*/
            if (pageinit.current >= Math.ceil((pageinit.pageNum)/9)) {
                obj.remove('.nextbtn');
                obj.append('<span class="disabled">下一页</span>');
            } else{
                obj.append('<a href="javascript:;" class="nextbtn">下一页</a>');
            }
            /*尾部*/
            obj.append('<span style={disply:inline-block,marginLeft:20px}>'+'共'+'<b>'+Math.ceil(((pageinit.pageNum)/9))+'</b>'+'页'+'</span>');
            // obj.append('<span>'+'到第'+'<input type="number" class="zxfinput" placeholder="1"/>'+'页'+'</span>');
            // obj.append('<span class="zxfokbtn">'+'确定'+'</span>');
        }());
    },
    bindEvent:function(obj,pageinit){
        return (function(){
            obj.on("click","a.prebtn",function(){
                var cur = parseInt(obj.children("span.current").text());
                var current = $.extend(pageinit, {"current":cur-1});
                zp.addhtml(obj,current);
                if (typeof(pageinit.backfun)=="function") {
                    pageinit.backfun(current);
                }
            });
            obj.on("click","a.zxfPagenum",function(){
                var cur = parseInt($(this).text());
                var current = $.extend(pageinit, {"current":cur});
                zp.addhtml(obj,current);
                if (typeof(pageinit.backfun)=="function") {
                    pageinit.backfun(current);
                }
            });
            obj.on("click","a.nextbtn",function(){
                var cur = parseInt(obj.children("span.current").text());
                var current = $.extend(pageinit, {"current":cur+1});
                zp.addhtml(obj,current);
                if (typeof(pageinit.backfun)=="function") {
                    pageinit.backfun(current);
                }
            });
            // obj.on("click","span.zxfokbtn",function(){
            //     var cur = parseInt($("input.zxfinput").val());
            //     // $("input.zxfinput").val(cur);
            //     var current = $.extend(pageinit, {"current":cur});
            //     zp.addhtml(obj,{"current":cur,"pageNum":pageinit.pageNum});
            //     if (typeof(pageinit.backfun)=="function") {
            //         pageinit.backfun(current);
            //     }
            // });
        }());
    }
}
$.fn.createPage = function(options){
    console.log('自定义',options)
    var pageinit = $.extend({
        pageNum : 15,
        current : 1,
        backfun : function(){}
    },options);
    zp.init(this,pageinit);
}
    