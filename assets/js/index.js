var mySwiper;
window.onload = function() {
//banner图的获取
$.ajax({url:"https://www.fastmock.site/mock/cf7283e160506f8479ad9b00440923f8/api/getBannerInfo",success:function(result){
    if(result.code==='200'){
        // let imgBox =  result.data.map(item =>{
        //     return `<div class="swiper-slide"><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019a8657db209a0000018c1b1a539f.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638603110&t=d92ccd37e1d84e01d47f6c45625eaaad" data-src=${item.imgSrc} alt="banner3" class="banner lazyload"></div>`
        // })
        let imgBox =  
        `<div class="swiper-slide"><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019a8657db209a0000018c1b1a539f.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638603110&t=d92ccd37e1d84e01d47f6c45625eaaad" alt="banner1" class="banner lazyload" data-sizes="auto" data-src="assets/img/1-480.png" data-srcset="assets/img/1-480.png 480w, assets/img/1-800.png 800w, assets/img/1-1600.png 1600w"></div>
            <div class="swiper-slide"><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019a8657db209a0000018c1b1a539f.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638603110&t=d92ccd37e1d84e01d47f6c45625eaaad" alt="banner2" class="banner lazyload" data-sizes="auto" data-src="assets/img/2-480.png" data-srcset="assets/img/2-480.png 480w, assets/img/2-800.png 800w, assets/img/2-1600.png 1600w"></div>
            <div class="swiper-slide"><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019a8657db209a0000018c1b1a539f.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638603110&t=d92ccd37e1d84e01d47f6c45625eaaad" alt="banner3" class="banner lazyload" data-sizes="auto" data-src="assets/img/3-480.png" data-srcset="assets/img/3-480.png 480w, assets/img/3-800.png 800w, assets/img/3-1600.png 1600w"></div> `
        $("#swiper-wrapper").html(imgBox);
        mySwiper = new Swiper(".swiper-container", {
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                bulletActiveClass: 'my-bullet-active',
            },
            loop : true,
            autoplay: {
            delay: 3000,//1秒切换一次
            },
        });     
       }
 }});
}
let page = 1,pageSize = 9;
//获取新闻详情
const getNewsDetail = id=>{
    console.log(window.history.pushState)
    window.location.href = `./newsDetail.html?id=${id}`;
}
//新闻资讯列表(首页)
$.ajax({url:`https://www.fastmock.site/mock/cf7283e160506f8479ad9b00440923f8/api/getNewLists?page=${page}&pageSize=${pageSize}`,success:function(result){
    if(result.code==='200'){
        let data = result.data.content.data.slice(0,6);
        // window.pageNum = result.data.content.pageSum;
        let newItem =  data.map(item =>{
            return `
            <li data-id=${item.id}>
                <div class="new-img"><img data-src=${item.detail.img} src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019a8657db209a0000018c1b1a539f.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638603110&t=d92ccd37e1d84e01d47f6c45625eaaad" class="lazyload"></div>
                <div>
                <div class="new-title hidden1">${item.detail.title}</div>
                <div class="new-time">${item.detail.time}</div>
                <div class="new-article hidden2">${item.detail.content}</div>
                </div>
            </li>
            `
        })
        $("#news-list").html(newItem);
        $('#news-list').find("li").on('click',function(e) {
            let id = $(this).attr('data-id');
            console.log($(this).attr('data-id'))
            getNewsDetail(id)
        })
    }
}});
