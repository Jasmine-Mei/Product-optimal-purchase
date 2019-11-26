$(() => {
    // 先读取本地存储的数据
    let arr = kits.loadData('cartListData');
    // 准备一个空字符串,用于后面存储新创建的元素
    let html = '';
    arr.forEach(e => {
        html += `<div class="item" data-id="${e.pID}">
                    <div class="row">
                        <div class="cell col-1 row">
                            <div class="cell col-1">
                                <input type="checkbox" class="item-ck" ${e.isChecked ? "checked" : ''}>
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

    // 读取本地数据,得到里面的数据是否有勾选
    let noCkAll = arr.find(e => {
        return !e.isChecked;
    })
    $('.pick-all').prop('checked', !noCkAll);// prop是开关属性 

    // 全选和点选
    $('.pick-all').on('click', function () {
        let status = $(this).prop('checked');
        $('.item-ck').prop('checked', status);
        $('.pick-all').prop('checked', status);
        // 先把本地数据里面的所有的数据都勾选
        arr.forEach(e => {
            e.isChecked = status;
        })
        // 重新存进本地数据
        kits.saveData('cartListData', arr);
        // 更新商品数量和商品总价
        calcTotal();
    })

    // 点选事件 由于数据是动态生成的所以需要注册委托事件
    $('.item-list').on('click', '.item-ck', function () {
        //判断可点选的个数是否和列表数量已勾选的数量是否一致
        let ckAll = $('.item-ck').length === $('.item-ck:checked').length;
        // 设置全选的状态和ckall一致就行
        $('.pick-all').prop('checked', ckAll);
        // 获取当前商品的 id, 可通过 id 进行修改当前 isChecked 的状态
        let pID = $(this).parents('.item').attr('data-id');
        // 获取当前这个单选是否是选中
        let isChecked = $(this).prop('checked');

        // 遍历本地存储数组
        arr.forEach(e => {
            // 判断id是否一致 找到对应的id商品
            if (e.pID == pID) {
                // 当id对应时执行
                // 将当前勾选状态和数据里的状态修改为一致的
                e.isChecked = isChecked;
            }
        });
        // 并将其重新存入本地数据当中
        kits.saveData('cartListData', arr);
        // 更新商品数量和商品总价
        calcTotal();
    })

    function calcTotal() {
        // 计算商品总数量和价格总和
        let totalCount = 0;//数量总和
        let totalMoney = 0;//价格总和
        arr.forEach(e => {
            if (e.isChecked) {
                totalCount += parseInt(e.number);
                totalMoney += e.price * e.number;
            }
        })
        // 把总价和总件数更新到页面里面
        $('.selected').text(totalCount);
        $('.total-money').text(totalMoney);
    }
    calcTotal();


    // 实现数量的加减
    // 增加按钮
    $('.item-count').on('click', '.add', function () {
        // 让输入框里的数量增加
        // prev 取得一个包含匹配的元素集合中每一个元素紧邻的前一个同辈元素的元素集合
        let current = $(this).prev().val();
        $(this).prev().val(++current);
        // 将这个数据页更新到本地数据当中
        let id = $(this).parents('.item').attr('data-id');
        let obj = arr.find(e => {
            return e.pID == id;
        });
        obj.number = current;
        // 把数据存到本地
        kits.saveData('cartListData', arr);
        // 更新商品数量和商品总价
        calcTotal();
        // 更新右边的总价
        // console.log($(this).parents('.item').find('.computed')); // find这个方法用于查找某个元素的后代元素中，满足条件的部分
        $(this).parents('.item').find('.computed').text(obj.number * obj.price);
    })
    // 减少按钮
    $('.item-count').on('click', '.reduce', function () {
        // next()用于 一个有效选择器并且紧接着第一个选择器
        let next = $(this).next();
        // 获取当前的数量值
        let current = next.val();

        // 判断当前数量，给定条件降低损失的可能性
        if (current <= 1) {
            alert('商品数量已降至最低，如不需请移除商品');
            current = 1;
        } else {
            next.val(--current);
        }
        // 更新本地存储的数量
        let id = $(this).parents('.item').attr('data-id');
        let obj = arr.find(e => {
            return e.pID == id;
        });
        obj.number = current;
        // 把更新的数据重新存到本地存储
        kits.saveData('cartListData', arr);
        // 更新商品数量和商品总价
        calcTotal();
        // 更新右边的总价
        // console.log($(this).parents('.item').find('.computed')); // find这个方法用于查找某个元素的后代元素中，满足条件的部分
        $(this).parents('.item').find('.computed').text(obj.number * obj.price);
    })

    // 先把当文本框得到焦点时的值保存起来
    $('.item-list').on('focus', '.number', function () {
        // 把旧的，正确的数量先存储起来
        let oldCount = $(this).val();
        $(this).attr('data-old', oldCount);
    })

    // 当输入框失去焦点的时候,同时也要把数据存起来更新到本地存储
    let current;
    $('.item-list').on('blur', '.number', function () {
        // 获取此时的数量值
        current = $(this).val();
        // 每次让用户自己输入的内容，一定要做合法性判断
        if (current.trim().length === 0 || isNaN(current) || parseInt(current) <= 0) {
            let old = $(this).attr('data-old');
            $(this).val(old); // 如果用户输入的不正确，恢复以前的正确的数字
            alert('商品数量不正确，请输入一个阿拉伯数字');
            return;
        }
        // 当验证通过后则可以更新数据，并将其存入本地存储
        let id = $(this).parents('.item').attr('data-id');
        console.log(id);
        arr = kits.loadData('cartListData');
        let obj = arr.find((e) => {
            return e.pID == id;
        });

        // 找到id相对应的对象 并将其number值进行重新赋值
        obj.number = current;
        // 重新存储数据
        kits.saveData('cartListData', arr);
        // 更新数量总和 价格总和
        calcTotal();
        // find这个方法用于查找某个元素的后代元素中，满足条件的部分
        $(this).parents('.item').find('.computed').text(obj.number * obj.price);
    })



    // 实现回车键保存数据
    // 实现发布效果
    $('.number').on('keydown', function (e) {
        if (e.keyCode === 13) {
            // 获取此时的数量值
            current = $(this).val();
            // 每次让用户自己输入的内容，一定要做合法性判断
            if (current.trim().length === 0 || isNaN(current) || parseInt(current) <= 0) {
                let old = $(this).attr('data-old');
                $(this).val(old); // 如果用户输入的不正确，恢复以前的正确的数字
                alert('商品数量不正确，请输入一个阿拉伯数字');
                return;
            }
            // 当验证通过后则可以更新数据，并将其存入本地存储
            let id = $(this).parents('.item').attr('data-id');
            console.log(id);
            arr = kits.loadData('cartListData');
            let obj = arr.find((e) => {
                return e.pID == id;
            });

            // 找到id相对应的对象 并将其number值进行重新赋值
            obj.number = current;
            // 重新存储数据
            kits.saveData('cartListData', arr);
            // 更新数量总和 价格总和
            calcTotal();
            // find这个方法用于查找某个元素的后代元素中，满足条件的部分
            $(this).parents('.item').find('.computed').text(obj.number * obj.price);
        }
    })

    // 实现移除商品列表
    // 由于商品列表是动态生成的,所以需要使用事件委托来实现移除效果
    $('.item-list').on('click', '.item-del', function () {
        // layer.confirm('你确定要删除吗?', { icon: 0, title: '警告' }, (index) => {
        //     layer.close(index);
            // 在这里执行 删除的逻辑
            // 先得到要删除的数据的id
            let id = $(this).parents('.item').attr('data-id');
            // 把当前点击的这个删除对应的这一行删掉
            $(this).parents('.item').remove();
            // 还要把本地存储里面的数据删除
            arr = arr.filter(e => {
                return e.pID != id;
            });
            kits.saveData('cartListData', arr);
            // 重新更新总件数和总价
            calcTotal();
        // });
    });

});