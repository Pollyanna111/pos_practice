function Bought_items(barcode,name,unit,price,number){
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price;
    this.number = number;
}


Bought_items.get_the_bought_items = function(inputs){
    var all_item = loadAllItems();
    var bought_items = new Array(0);
    var number_of_each_goods;
    _(all_item.length).times(function (i) {
        number_of_each_goods = 0;
        _(inputs).each(function(input){
            var has_bind_sign = input.indexOf('-');
            if(has_bind_sign !== -1){
                if(input.slice(0,has_bind_sign) === all_item[i].barcode){
                    number_of_each_goods = Number(input.slice(has_bind_sign+1,input.length));
                }
            }
            else{
                if(input === all_item[i].barcode){
                    number_of_each_goods = number_of_each_goods+1;
                }
            }
        });
        if(number_of_each_goods != 0){
            var item = new Bought_items(all_item[i].barcode,all_item[i].name,all_item[i].unit,all_item[i].price,number_of_each_goods);
            bought_items.push(item);
        }
    });
    return bought_items;
};



Bought_items.recompute_it_with_promotion = function (bought_items) {
    var after_promotion = [];
    var each_item;
    var promotion = loadPromotions();
    for(var i = 0; i< bought_items.length; i++) {
        for (var j = 0; j < promotion[0].barcodes.length; j++) {
            if (bought_items[i].barcode === promotion[0].barcodes[j]) {
                each_item={name:bought_items[i].name,number:Math.floor(bought_items[i].number / 3),unit:bought_items[i].unit};
                after_promotion.push(each_item);
            }
        }
    }
    return after_promotion;
};