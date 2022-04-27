import {state} from './state'
import {post} from './tools'
/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.disableLog("scan");
    var maxSharePer = 1.00
    var stockBuyPer = 0.60
    var stockVolPer = 0.05
    var minSharePer = 5
    
    while (true) {
        
        var s = state(ns)
        //ns.tprintf(JSON.stringify(s.stocks))
        var moneyKeep = 0.0 * s.stocks["ME"].tick.total
        
        ns.disableLog('disableLog');
        ns.disableLog('sleep');
        ns.disableLog('getServerMoneyAvailable');
        var stocks = ns.stock.getSymbols()
        for (const stock of stocks) {
            var position = ns.stock.getPosition(stock);
            if (position[0]) {
                ns.print('Long Position: ' + stock + ', ')
                sellPositions(stock);
            }
            buyPositions(stock);
        }
        ns.print('Long Cycle Complete');
        await ns.sleep(6000);
    }
    function buyPositions(stock) {
        var maxShares = (ns.stock.getMaxShares(stock) * maxSharePer) - (position[0] + position[2]);
        var askPrice = ns.stock.getAskPrice(stock);
        var forecast = ns.stock.getForecast(stock);
        var volPer = ns.stock.getVolatility(stock);
        var playerMoney = ns.getServerMoneyAvailable('home');
        
        if (forecast >= stockBuyPer && volPer <= stockVolPer) {
            if (playerMoney - moneyKeep > ns.stock.getPurchaseCost(stock,minSharePer, "Long")) {
                var shares = Math.floor(Math.min((playerMoney - moneyKeep - 100000) / askPrice, maxShares));
                var bought = ns.stock.buy(stock, shares);
                if (bought>0) {
                var m = x(shares * bought)
                ns.print('Long Bought: ' + x(shares) + ' of ' + stock + ' for ' + m)
                ns.print("Long Reserving:" + ns.nFormat(moneyKeep))
                post(ns,"/api/buy",{type:"long",shares:shares,symbol:stock,pricePer:bought,priceTot:(shares*bought),time:Date.now()})
                //ns.tprint('Bought: ' + x(shares) + ' of ' + stock + ' for ' + m)
                //ns.toast('Bought: ' + x(shares) + ' of ' + stock + ' for ' + m)
                }}
        }      
    }
    function sellPositions(stock) {
        var forecast = ns.stock.getForecast(stock);
        if (forecast < 0.5) {
            var price = ns.stock.sell(stock, position[0]);
            if (price>0){
            var m = x(position[0] * price)
            ns.print('Long Sold: '+ stock + ' for ' + m)
            ns.tprint('                                        Sold: '+ stock + ' for ' + m)
            ns.toast('Long Sold: '+ stock + ' for ' + m)
            post(ns,"/api/sell",{type:"long",shares:position[0],symbol:stock,cost:position[1],pricePer:price,priceTot:(position[0]*price),time:Date.now()})
        }}
    }
}

function fm(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) + 'm';
}

function fk(number) {
	return (number / 1000.0).toLocaleString('en-US', { minimumFractionDigits: 2 }) + 'k';
}

const COUNT_ABBRS = [ '', 'k', 'm', 'b', 't', 'p'];

function x(count, withAbbr = true, decimals = 3) {
    const i     = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000));
    let result  = parseFloat((count / Math.pow(1000, i)).toFixed(decimals));
    if(withAbbr) {
        result += `${COUNT_ABBRS[i]}`; 
    }
    return result;
}
