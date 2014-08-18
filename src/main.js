var printInventory = function (inputs) {

    var details_to_print = get_the_details_to_print(inputs);

    var text =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + details_to_print[0] + '\n' +
        '----------------------\n' +
        details_to_print[1] +
        '----------------------\n' +
        details_to_print[2] +
        '----------------------\n' +
        details_to_print[3]+
        '**********************';
    console.log(text);
};


var get_the_details_to_print = function(inputs){

    var bought_items = Bought_item.get_the_bought_items(inputs);

    var after_promotion = Bought_item.recompute_it_with_promotion(bought_items);

    var print_items = detail_of_items(bought_items,after_promotion);

    var print_promotion = detail_of_promotion(after_promotion);

    var print_the_cost = detail_of_cost(bought_items,after_promotion);

    var formattedDateString = get_the_current_time();

    return [formattedDateString,print_items,print_promotion,print_the_cost];
};



var detail_of_items = function (bought_items,after_promotion) {
    var text = new Array(bought_items.length);
    var count_number;
    _(text.length).times(function (i) {
        count_number = get_the_item_number_after_promotion(after_promotion,bought_items[i]);
        text[i] = '名称：'+bought_items[i].name+'，数量：'+bought_items[i].number+bought_items[i].unit+
            '，单价：'+bought_items[i].price.toFixed(2)+'(元)，小计：'+(bought_items[i].price*count_number).toFixed(2)+'(元)\n';
    });
    return text.join('');
};

var get_the_item_number_after_promotion = function(after_promotion,bought_item){
    var promotion_item = _(after_promotion).findWhere({name:bought_item.name});
    return promotion_item ? bought_item.number-promotion_item.number : bought_item.number;
};


var detail_of_cost = function(bought_items,after_promotion){
    var text = new Array(2);
    var cost = compute_the_cost(bought_items,after_promotion);
    text[0] = '总计：'+cost[0].toFixed(2)+'(元)\n';
    text[1] = '节省：'+cost[1].toFixed(2)+'(元)\n';
    return text.join('');
};

var compute_the_cost = function (bought_items,after_promotion) {
    var count_number,total,actual_cost;
    total = 0;
    actual_cost = 0;
    _(bought_items.length).times(function (i) {
        count_number = get_the_item_number_after_promotion(after_promotion,bought_items[i]);
        actual_cost = actual_cost + count_number * bought_items[i].price;
        total = total + bought_items[i].price * bought_items[i].number;
    });
    var money_saved = total - actual_cost;
    return [actual_cost,money_saved]
};



var detail_of_promotion = function (after_promotion) {
    var text = new Array(after_promotion.length+1);
    text[0] = '挥泪赠送商品：\n';
    _(text.length-1).times(function (i) {
        text[i+1] = '名称：'+after_promotion[i].name+'，数量：'+after_promotion[i].number+after_promotion[i].unit+'\n'
    });
    return text.join('');
};


