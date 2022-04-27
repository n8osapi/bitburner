import { fn } from "./tools"

/** @param {import(".").NS} ns **/
export async function main(ns) {
    var f = ns.flags([['all',false]])
    var p = ns.getPlayer()
    var money = p.money 
    var myram = ns.getServerMaxRam("home")
    ns.tprintf("  %13s | %12s | %12s","Size","Price","")
    ns.tprintf("  %13s + %12s + %12s","------------","------------","------------")
    for (var i=0;i<=20;i++){
        var ram = Math.pow(2,i);
        if (ram < myram && !f.all) continue;

        //ns.tprintf("%8d | %10s",i,"----------")
        
        var price = ns.getPurchasedServerCost(ram)
        if (price<=money)
        {
            ns.tprintf("%2d) %11s | %12s | %12s",i,ns.nFormat(ram,"0,0"),fn(price),"")
        }
        else
        {
            ns.tprintf("%2d) %11s | %12s | %12s",i,ns.nFormat(ram,"0,0"),"",fn(price))
        }
    }
}


function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}


function formatMillions(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) + 'm';
}