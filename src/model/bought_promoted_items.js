function Bought_promoted_items(bought_items,promotion_items){
    this.bought_items = bought_items;
    this.promotion_items = promotion_items;
}


Bought_promoted_items.prototype.detail_of_items = function () {
    var text = '';
    var count_number;
    _(this.bought_items.length).times(function (i) {
        count_number = get_the_item_number_after_promotion(this.promotion_items,this.bought_items[i]);
        text += '名称：'+this.bought_items[i].name+'，数量：'+this.bought_items[i].number+this.bought_items[i].unit+
            '，单价：'+this.bought_items[i].price.toFixed(2)+'(元)，小计：'+(this.bought_items[i].price*count_number).toFixed(2)+'(元)\n';
    },this);
    return text;
};



Bought_promoted_items.prototype.detail_of_cost = function(){
    var cost = this.compute_the_cost();
    var text = '总计：'+cost.actual_cost.toFixed(2)+'(元)\n';
    text += '节省：'+cost.money_saved.toFixed(2)+'(元)\n';
    return text;
};


Bought_promoted_items.prototype.compute_the_cost = function () {
    var count_number,total = 0,actual_cost = 0;
    _(this.bought_items.length).times(function (i) {
        count_number = get_the_item_number_after_promotion(this.promotion_items,this.bought_items[i]);
        actual_cost = actual_cost + count_number * this.bought_items[i].price;
        total = total + this.bought_items[i].price * this.bought_items[i].number;
    },this);
    return {actual_cost:actual_cost,money_saved:total - actual_cost}
};
