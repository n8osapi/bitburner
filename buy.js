import {fm,fn,post} from './tools.js'
/** @param {import(".").NS} ns **/

export async function main(ns) {
    var stock = ns.args[0]
    var shares = ns.args[1] || "max"
    var p = ns.stock.getAskPrice(stock);
    var m = ns.getPlayer().money;

    if (shares=="max")
    {
        var max = Math.floor((m-100000)/p);
        shares = Math.min(max, ns.stock.getMaxShares(stock));
    }

    ns.tprintf("Purchasing %s shares of %s at %s for %s",fn(shares),stock,fm(p),fm(shares*p))

    var result = ns.stock.buy(stock,shares)

    if (result>0){
        ns.tprintf("Purchased %s shares of %s at %s for %s",fn(shares),stock,fm(result),fm(shares*result))
        post(ns,"/api/buy",{type:"long",shares:shares,symbol:stock,pricePer:result,priceTot:(shares*result),time:Date.now()})
        ns.exec("position.js","home")
    }
    else{
        ns.tprintf("Did not purchase stock");
    }
}