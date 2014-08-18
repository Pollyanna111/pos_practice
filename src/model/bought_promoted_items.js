function Bought_promoted_items(bought_items,promotion_items){
    this.bought_items = bought_items;
    this.promotion_items = promotion_items;
}




Bought_promoted_items.prototype.detail_of_items = function () {
    var text = new Array(this.bought_items.length);
    var count_number;
    _(text.length).times(function (i) {
        count_number = get_the_item_number_after_promotion(this.promotion_items,this.bought_items[i]);
        text[i] = '名称：'+this.bought_items[i].name+'，数量：'+this.bought_items[i].number+this.bought_items[i].unit+
            '，单价：'+this.bought_items[i].price.toFixed(2)+'(元)，小计：'+(this.bought_items[i].price*count_number).toFixed(2)+'(元)\n';
    },this);
    return text.join('');
};



Bought_promoted_items.prototype.detail_of_cost = function(){
    var text = new Array(2);
    var cost = this.compute_the_cost();
    text[0] = '总计：'+cost[0].toFixed(2)+'(元)\n';
    text[1] = '节省：'+cost[1].toFixed(2)+'(元)\n';
    return text.join('');
};


Bought_promoted_items.prototype.compute_the_cost = function () {
    var count_number,total,actual_cost;
    total = 0;
    actual_cost = 0;
    _(this.bought_items.length).times(function (i) {
        count_number = get_the_item_number_after_promotion(this.promotion_items,this.bought_items[i]);
        actual_cost = actual_cost + count_number * this.bought_items[i].price;
        total = total + this.bought_items[i].price * this.bought_items[i].number;
    },this);
    var money_saved = total - actual_cost;
    return [actual_cost,money_saved]
};
