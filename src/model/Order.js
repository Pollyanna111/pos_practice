function Order(){
    this.bought_items = null;
}


Order.prototype.get_the_bought_items = function(inputs){
    var all_item = loadAllItems(), bought_items = {}, barcode, number,has_bind_sign, item;
    _(inputs).each(function (input) {
        has_bind_sign = input.indexOf('-');
        barcode = has_bind_sign === -1 ? input : input.slice(0,has_bind_sign);
        number = has_bind_sign === -1 ? 1 : Number(input.slice(has_bind_sign+1,input.length));
        item = bought_items[barcode] || _(all_item).findWhere({barcode:barcode});
        item.count += number;
        bought_items[barcode] = item;
    });
    this.bought_items = bought_items;
};



Order.prototype.recompute_it_with_promotion = function () {
    var buy_two_get_one_free = _(loadPromotions()).findWhere({type:'BUY_TWO_GET_ONE_FREE'});
    if(buy_two_get_one_free){
        _(buy_two_get_one_free.barcodes).each(function(barcode) {
            if(this.bought_items[barcode]){
                this.bought_items[barcode].free_number = Math.floor(this.bought_items[barcode].count / 3);
            }
        },this);
    }
};


Order.prototype.detail_of_items = function () {
    var text = '';
    _(this.bought_items).each(function(each_item){
        text += '名称：' + each_item.name +
            '，数量：' + each_item.count + each_item.unit+
            '，单价：' + each_item.price.toFixed(2) + '(元)，小计：'+
            (each_item.price*(each_item.count - each_item.free_number)).toFixed(2)+'(元)\n';
    });
    return text;
};


Order.prototype.detail_of_promotion = function() {
    var text = '挥泪赠送商品：\n';
    _(this.bought_items).each(function(each_item){
        if(each_item.free_number !== 0){
            text += '名称：'+each_item.name+'，数量：'+each_item.free_number+each_item.unit+'\n';
        }
    });
    return text;
};


Order.prototype.detail_of_cost = function(){
    var cost = this.compute_the_cost();
    var text = '总计：'+cost.actual_cost.toFixed(2)+'(元)\n';
    text += '节省：'+cost.money_saved.toFixed(2)+'(元)\n';
    return text;
};


Order.prototype.compute_the_cost = function () {
    var actual_cost = 0, money_saved = 0;
    _(this.bought_items).each(function(each_item){
        actual_cost += (each_item.count - each_item.free_number) * each_item.price;
        money_saved += each_item.free_number * each_item.price;
    });
    return {actual_cost:actual_cost,money_saved:money_saved}
};
