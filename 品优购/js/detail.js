$(() => {
  let id = location.search.substring(4);
  /* phoneData.forEach(e => {
        if(e.pID == id){

        }
    }) */
  let target = phoneData.find(e => {
    return e.pID == id;
  });
  // 修改商品价格
  $('.summary-price .dd em').text(`¥${target.price}`);
  // 修改商品介绍
  $('.sku-name').text(`¥${target.name}`);
  // 修改商品图片
  $('.preview-img>img').attr('src', target.imgSrc);
});
