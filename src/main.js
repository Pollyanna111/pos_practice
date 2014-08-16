var printInventory = function (inputs) {
    var bought_items = Bought_items.get_the_bought_items(inputs);
    //1.找到买了哪几种商品，价格，条码，单位，数量

    var after_promotion = Bought_items.recompute_it_with_promotion(bought_items);
    //2.有哪些商品有促销。促销后的减免几件

    var print_items = detail_of_items(bought_items,after_promotion);

    console.log(print_items);

    var print_promotion = detail_of_promotion(after_promotion);

    var print_the_cost = detail_of_cost(bought_items,after_promotion);

    var formattedDateString = get_the_current_time();

    var text =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + formattedDateString + '\n' +
        '----------------------\n' +
        print_items+
        '----------------------\n' +
        print_promotion +
        '----------------------\n' +
        print_the_cost+
        '**********************';

//    console.log(text);
    //3.打印信息
};


var dateDigitToString = function (num) {
    return num < 10 ? '0' + num : num;
};


var get_the_current_time = function(){
    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        text = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
    return text;
};



var detail_of_items = function (bought_items,after_promotion) {
    var text = new Array(bought_items.length);
    var promotion_item, count_number;
    _(text.length).times(function (i) {
        promotion_item = _(after_promotion).findWhere({name:bought_items[i].name});
        count_number = promotion_item ? bought_items[i].number-promotion_item.number : bought_items[i].number;
        text[i] = '名称：'+bought_items[i].name+'，数量：'+bought_items[i].number+bought_items[i].unit+
            '，单价：'+bought_items[i].price.toFixed(2)+'(元)，小计：'+(bought_items[i].price*count_number).toFixed(2)+'(元)\n';
    });
    return text.join('');
};

var detail_of_promotion = function (after_promotion) {
    var text = new Array(after_promotion.length+1);
    text[0] = '挥泪赠送商品：\n';
    for(var i = 0; i<text.length-1 ; i++){
        text[i+1] = '名称：'+after_promotion[i].name+'，数量：'+after_promotion[i].number+after_promotion[i].unit+'\n'
    }
    return text.join('');
};

var detail_of_cost = function(bought_items,after_promotion){
    var text = new Array(2);
    var promotion_item,count_number,total,actual_cost;
    total = 0;
    actual_cost = 0;
    _(bought_items.length).times(function (i) {
        promtotalotion_item = _(after_promotion).findWhere({name:bought_items[i].name});
        count_number = promotion_item ? bought_items[i].number-promotion_item.number : bought_items[i].number;
        actual_cost = actual_cost + count_number * bought_items[i].price;
        total = total + bought_items[i].price * bought_items[i].number;
    });
    var money_saved = total - actual_cost;
    text[0] = '总计：'+actual_cost.toFixed(2)+'(元)\n';
    text[1] = '节省：'+money_saved.toFixed(2)+'(元)\n';
    return text.join('');
};



