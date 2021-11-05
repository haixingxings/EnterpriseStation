//新闻资讯详情
$.ajax({url:`https://www.fastmock.site/mock/cf7283e160506f8479ad9b00440923f8/api/getNewsDetail?id=${window.location.search.slice(4)}`,success:function(result){
    if(result.code==='200'){
        let data = result.data.content;
        let newItem =  `
            <div class="container">
          <div class="detail-article" id="detailArticle">
            <section class="info">
              <div class="detail-logo">
                  <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019a8657db209a0000018c1b1a539f.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638603110&t=d92ccd37e1d84e01d47f6c45625eaaad" data-src=${data.detail.img} class="lazyload">
              </div>
              <div class="detail-decoration">
                  <h3 class="detail-title">${data.detail.title}</h3>
                  <p class="detail-point">
                      时间：${data.detail.time}
                  </p>
              </div>
          </section>
          <section class="m-product-detail" id="productDetail">
              <div class="info-text">介绍</div>
              <div class="product-title">
                  <span class="title-icon"></span><span class="product-tro">内容</span>
              </div>
              <div class="detail-word">
                  <p class="text-indent">
                      <p class="text-indent">${data.detail.content}
                        </p>
                  </p>
              </div>
          </section>
          </div>
      </div>
            `
        $("#newsDetail").html(newItem);
    }
}});