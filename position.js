import { fn } from 'tools.js'

/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.disableLog('disableLog');
    ns.disableLog('sleep');
    ns.disableLog('getServerMoneyAvailable');
    var stocks = ns.stock.getSymbols()
    ns.tprintf("┌%-5s─┬─%10s─┬─%10s─%10s─%10s─%10s─┬─%10s─%10s─%10s─%10s─┐","─────","──────────","──────────","── LONG ──","──────────","──────────","──────────","── SHORT ─","──────────","──────────");
    ns.tprintf("│%-5s | %10s | %10s %10s %10s %10s | %10s %10s %10s %10s │","stock","max","shares","current","cost","gain","shares","current","cost","gain","shares","current","cost","gain");
    ns.tprintf("├%-5s─┼─%10s─┼─%10s─%10s─%10s─%10s─┼─%10s─%10s─%10s─%10s─┤","─────","──────────","──────────","──────────","──────────","──────────","──────────","──────────","──────────","──────────");
    var tcur= 0;
    var tcost=0;
    var tgain=0;
    var tcurs= 0;
    var tcosts=0;
    var tgains=0;
    for (const stock of stocks) {
        var position = ns.stock.getPosition(stock);
        if (!position[0] && !position[2]) continue;
        var gain = ns.stock.getSaleGain(stock,position[0],'Long')
        var sgain = ns.stock.getSaleGain(stock,position[2],'Short')
        var max = ns.stock.getMaxShares(stock)
        var val = position[1] * position[0]
        var sval = position[3] * position[2]
        var profit = gain - val;
        var sprofit = sgain - sval;
        if (profit>0) profit -= 100000
        if (sprofit>0) sprofit -= 100000
        ns.tprintf("│%-5s | %10s | %10s %10s %10s %10s | %10s %10s %10s %10s │",
            stock,
            fn(max),
            fn(position[0]),
            fn(gain),
            fn(val),
            fn(profit),
            fn(position[2]),
            fn(sgain),
            fn(sval),
            fn(sprofit)
            );
            tcur += gain
            tcost += val
            tgain += (gain - val)
            tcurs += sgain
            tcosts += sval
            tgains += (sgain - sval)
            }
    ns.tprintf("├%-5s─┼─%10s─┼─%10s─%10s─%10s─%10s─┼─%10s─%10s─%10s─%10s─┤","─────","──────────","──────────","══════════","══════════","══════════","──────────","══════════","══════════","══════════");
    ns.tprintf("│%-5s | %10s | %10s %10s %10s %10s | %10s %10s %10s %10s │","","","",fn(tcur),fn(tcost),fn(tgain),"",fn(tcurs),fn(tcosts),fn(tgains));
    ns.tprintf("└%-5s─┴─%10s─┴─%10s─%10s─%10s─%10s─┴─%10s─%10s─%10s─%10s─┘","─────","──────────","──────────","──────────","──────────","──────────","──────────","──────────","──────────","──────────");
}

/*
  ┌┬┐ ╔╦╗ ─ │═ ║                
  ├┼┤ ╠╬╣ ▀ ▄ █ ▌ ▐  
  └┴┘ ╚╩╝ ░ ▒ ▓
  ╒╤╕ ╓╥╖ ←↑→↓↔↕↨≡≠∙
  ╞╪╡ ╟╫╢ ■□▪▫▬▲►▼◄◊○
  ╘╧╛ ╙╨╜ ◌●◘◙◦☺☻☼♠♣♥♦♪♫♯₿
*/