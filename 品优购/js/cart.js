$(() => {
    let arr = kits.loadData('cartListData');
    let html = '';
    arr.forEach(function (e) {
        html += `<div class="item" data-id="${e.pID}">
                    <div class="row">
                        <div class="cell col-1 row">
                            <div class="cell col-1">
                                <input type="checkbox" class="item-ck" checked="">
                            </div>
                            <div class="cell col-4">
                                <img src="${e.imgSrc}" alt="">
                            </div>
                        </div>
                        <div class="cell col-4 row">
                            <div class="item-name">${e.name}</div>
                        </div>
                        <div class="cell col-1 tc lh70">
                            <span>￥</span>
                            <em class="price">${e.price}</em>
                        </div>
                        <div class="cell col-1 tc lh70">
                            <div class="item-count">
                                <a href="javascript:void(0);" class="reduce fl">-</a>
                                <input autocomplete="off" type="text" class="number fl" value="${e.number}">
                                <a href="javascript:void(0);" class="add fl">+</a>
                            </div>
                        </div>
                        <div class="cell col-1 tc lh70">
                            <span>￥</span>
                            <em class="computed">${e.price * e.number}</em>
                        </div>
                        <div class="cell col-1">
                             <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
                        </div>
                    </div>
                </div>`;

    });
    $(".item-list").append(html);

    if (arr.length != 0) {
        // 隐藏空空如也提示
        $('.empty-tip.tc').addClass('hidden');
        // 显示列表和综合栏
        $('.total-of').removeClass('hidden');
        $('.cart-header').removeClass('hidden');
    }



})