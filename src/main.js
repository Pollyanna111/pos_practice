var printInventory = function (inputs) {

    var details_to_print = get_the_details_to_print(inputs);

    var text =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + details_to_print.time + '\n' +
        '----------------------\n' +
        details_to_print.items +
        '----------------------\n' +
        details_to_print.promotion +
        '----------------------\n' +
        details_to_print.cost +
        '**********************';
    console.log(text);
};


var get_the_details_to_print = function(inputs){

    var bought_items = Bought_item.get_the_bought_items(inputs);

    var promotion_items = Bought_item.recompute_it_with_promotion(bought_items);

    var bought_promoted_items = new Bought_promoted_items(bought_items,promotion_items);

    var formattedDateString = get_the_current_time();

    var print_items = bought_promoted_items.detail_of_items();

    var print_promotion = detail_of_promotion(promotion_items);

    var print_the_cost = bought_promoted_items.detail_of_cost();

    return {time:formattedDateString,items:print_items,promotion:print_promotion,cost:print_the_cost};
};




var get_the_item_number_after_promotion = function(promotion_item,bought_item){
    var promotion_item = _(promotion_item).findWhere({name:bought_item.name});
    return promotion_item ? bought_item.number-promotion_item.number : bought_item.number;
};


var detail_of_promotion = function (promotion_item) {
    var text = '挥泪赠送商品：\n';
    _(promotion_item.length).times(function (i) {
        text += '名称：'+promotion_item[i].name+'，数量：'+promotion_item[i].number+promotion_item[i].unit+'\n';
    });
    return text;
};


