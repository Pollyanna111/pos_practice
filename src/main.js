var printInventory = function (inputs) {

    var order = get_details_of_bought_item_after_promotion(inputs);

    var text =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + get_the_current_time() + '\n' +
        '----------------------\n' +
        order.detail_of_items() +
        '----------------------\n' +
        order.detail_of_promotion() +
        '----------------------\n' +
        order.detail_of_cost() +
        '**********************';

    console.log(text);
};

var get_details_of_bought_item_after_promotion = function(inputs){
    var order = new Order();
    order.get_the_bought_items(inputs);
    order.recompute_it_with_promotion();
    return order;
};



