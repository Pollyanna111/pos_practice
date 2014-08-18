function Bought_item(barcode,name,unit,price,number){
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price;
    this.number = number;
}


Bought_item.get_the_bought_items = function(inputs){
    var all_item = loadAllItems();
    var bought_items = new Array(0);
    var number_of_each_goods;
//    _(inputs.length).times(function (i) {
//        var has_bind_sign = inputs[i].indexOf('-');
//        if(has_bind_sign !== -1){
//            abc.push(_(all_item).where({barcode:inputs[i].slice(0,has_bind_sign)}));
//        }
//        else{
//            abc.push(_(all_item).where({barcode:inputs[i]}));
//        }
//    });
//
    _(all_item.length).times(function (i) {
        number_of_each_goods = 0;
        _(inputs).each(function(input){
            var has_bind_sign = input.indexOf('-');
            if(has_bind_sign !== -1 && input.slice(0,has_bind_sign) === all_item[i].barcode){
                number_of_each_goods = Number(input.slice(has_bind_sign+1,input.length));
            }
            if(has_bind_sign === -1 && input === all_item[i].barcode){
                number_of_each_goods = number_of_each_goods+1;
            }
        });
        if(number_of_each_goods != 0){
            bought_items.push(new Bought_item(all_item[i].barcode,all_item[i].name,all_item[i].unit,all_item[i].price,number_of_each_goods));
        }
    });
    return bought_items;
};



Bought_item.recompute_it_with_promotion = function (bought_items) {
    var after_promotion = [];
    var each_item;
    var promotion = loadPromotions();
    _(bought_items.length).times(function (i) {
        _(promotion[0].barcodes.length).times(function(j){
            if (bought_items[i].barcode === promotion[0].barcodes[j]) {
                each_item={name:bought_items[i].name,number:Math.floor(bought_items[i].number / 3),unit:bought_items[i].unit};
                after_promotion.push(each_item);
            }
        });
    });
    return after_promotion;
};