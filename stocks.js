import {fm,fn} from './tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {
    var p = ns.getPlayer();
    var stocks = ns.stock.getSymbols();

    ns.tprintf("%-5s %10s%% %9s %9s %9s %8s %7s %8s %10s %10s %10s %9s %9s %9s", 
    "Stock", 
    "Forecast",
    "Price",
    "Ask",
    "Bid",
    "Max", 
    "L#", 
    "L$",
    "Lg",
    "Lv",
    "Lp",
    "S#",
    "S$",
    "Sp"
    )


    for(var s of stocks.sort())
    {
        var p = ns.stock.getPrice(s)
        var a = ns.stock.getAskPrice(s)
        var b = ns.stock.getBidPrice(s)
        var max = ns.stock.getMaxShares(s)
        var pos = ns.stock.getPosition(s)
        var lgain = ns.stock.getSaleGain(s,pos[0],'Long')
        var sgain = ns.stock.getSaleGain(s,pos[2],'Short')
        var lval = pos[1] * pos[0]
        var sval = pos[3] * pos[2]
        var f = p.has4SDataTixApi ? ns.stock.getForecast(s):"N/A";

        ns.tprintf("%-5s %10s%% %9s %9s %9s %8s %7s %8s %10s %10s %10s %9s %9s %9s", 
            s, 
            (f=="N/A")?"N/A":Math.round((f-0.5)*1000)/10,
            fm(ns.stock.getPrice(s)),
            fm(a),
            fm(b),
            fn(max), 
            fnb(pos[0]), 
            fmb(pos[1]),
            fmb(lgain),
            fmb(lval),
            fmb(lgain-lval),
            fnb(pos[2]),
            fmb(pos[3]),
            fmb(sgain-sval)
            )
    }

}

function fmb(v)
{
    var vv = fm(v)
    if (vv.trim()=="$0.000") vv=""
    return vv
}
function fnb(v)
{
    var vv = fn(v).trim()
    if (vv.trim()=="0.000") vv=""
    return vv
}