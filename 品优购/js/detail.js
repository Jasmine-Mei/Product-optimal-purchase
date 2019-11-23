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

  // 注册点击事件
  // 增加数量
  let count = 1;
  $('.choose-amount').on('click', '.add', function () {
    ++count
    $('.choose-amount .reduce').removeClass('disabled');
    counts.val(count);
  })
  // 减少数量
  // 获取数量的元素
  let counts = $('.choose-amount .choose-number');
  if (counts.val() > 1) {
    $('.choose-amount .reduce').removeClass('disabled');
  }
  $('.choose-amount').on('click', '.reduce', function () {
    if (counts.val() > 1) {
      --count
      $(counts.val(count));
    }
    if (counts.val() == 1) {
      $('.choose-amount .reduce').addClass('disabled');
    }
  })

  // 点击加入购物车的处理函数
  $('.addshopcar').on('click', function () {
    let num = counts.val();
    // 判断数据是否有效
    if (num.trim().length === 0 || isNaN(num) || parseInt(num) <= 0) {
      alert('请输入有效的数量');
    }
    // 先从本地数据中读取住一个指定的键--键是自己定义的
    let arr = kits.loadData('cartListData');

    // 判断是否在数组里面有满足条件的元素,exist就是一个对象,否则是undefind
    let exist = arr.find(e => {
      return e.pID == id;
    });
    num = parseInt(num);
    if (exist) {
      exist.number += num;
    } else {
      // 构建数据对象
      let obj = {
        pID: target.pID,
        imgSrc: target.imgSrc,
        name: target.name,
        price: target.price,
        number: num
      };
      arr.push(obj);
    }
    kits.saveData('cartListData', arr)

    location.href = './cart.html';

  })



});
