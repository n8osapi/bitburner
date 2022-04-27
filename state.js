import {
    Symbols, 
    Servers  // 2.02 GB
} from 'tools.js'
/** @param {import(".").NS} ns **/
export function state(ns) {
var state = {};
state.version="1.11"
state.time = Date.now();
state.player = ns.getPlayer(); // 0.50 GB
state.player.factions = state.player.factions.map(f=>({
    name:f,
    favor:ns.getFactionFavor(f),   // 1.00 GB
    rep:ns.getFactionRep(f),       // 1.00 GB
    gain:ns.getFactionFavorGain(f) // 0.75 GB
}))
state.stocks = {"ME":{tick:{price:state.player.money}}};

if (state.player.hasTixApiAccess)
{
    var symbols = ns.stock.getSymbols(); // 2.00 GB
    symbols.forEach(s=>
    {
        state.stocks[s]={company:Symbols[s]}
        state.stocks[s].maxShares = ns.stock.getMaxShares(s) // 2.00 GB
        state.stocks[s].tick={
            price:ns.stock.getPrice(s),  //TIX 2.00 GB
            ask:ns.stock.getAskPrice(s), //TIX 2.00 GB
            bid:ns.stock.getBidPrice(s), //TIX 2.00 GB
        }
        state.stocks[s].price = state.stocks[s].tick.price
        state.stocks[s].symbol = s
        if (state.player.has4SDataTixApi) 
        {
            state.stocks[s].forecast = ns.stock.getForecast(s)     //4S 2.50 GB
            state.stocks[s].volatility = ns.stock.getVolatility(s) //4s 2.50 GB
        }
        var pos = ns.stock.getPosition(s) //TIX 2.00 GB
        state.stocks[s].position={
            longShares:pos[0],
            longAvgPrice: pos[1],
            shortShares:pos[2],
            shortAvgPrice:pos[3],
        }
        state.stocks[s].direction = "none"
        if (state.stocks[s].position.longShares>0) state.stocks[s].direction = "long"
        if (state.stocks[s].position.shortShares>0) state.stocks[s].direction = "short"
        if (state.stocks[s].position.longShares>0 && state.stocks[s].position.shortShares>0) state.stocks[s].direction="both"
        //state.orders = ns.stock.getOrders();  // BN8 or SF8:3 ? + 2.50 GB
        state.stocks[s].sharesMaxxed = (state.stocks[s].maxShares==state.stocks[s].position.longShares+state.stocks[s].position.shortShares)
        state.stocks[s].shares = (state.stocks[s].position.longShares + state.stocks[s].position.shortShares)
        state.stocks[s].hasShares = (state.stocks[s].position.longShares + state.stocks[s].position.shortShares)>0
    })
}
state.servers=Servers(ns);
state.servers.forEach(s=>{
    s.stuff={
        hackTime:ns.getHackTime(s.hostname),         // 0.05 GB
        growTime:ns.getGrowTime(s.hostname),         // 0.05 GB
        weakenTime:ns.getWeakenTime(s.hostname),     // 0.05 GB
        hackAnalyze:ns.hackAnalyze(s.hostname),      // 1.00 GB
        hackChance:ns.hackAnalyzeChance(s.hostname)  // 1.00 GB
    }
})

state.income=ns.getScriptIncome() // 0.01 GB
var totlongCost=0
var totlongValue=0
var totlongGain=0
var totlongLoss=0
var totshortCost=0
var totshortValue=0
var totshortGain=0
var totshortLoss=0

var s = Object.keys(state.stocks).filter(z=>z!="ME").filter(z=>(state.stocks[z].position.longShares + state.stocks[z].position.shortShares)>0);
s.forEach(z=>{
    var pos = state.stocks[z].position
    var val = state.stocks[z].tick.price
    pos.longCost=pos.longShares*pos.longAvgPrice
    pos.longValue=pos.longShares*val
    
    pos.longGain=Math.max(0,pos.longShares*(val-pos.longAvgPrice))
    pos.longLoss=(pos.longShares>0?-100000:0)+Math.min(0,pos.longShares*(val-pos.longAvgPrice))

    pos.shortCost=pos.shortShares*pos.shortAvgPrice
    pos.shortValue=pos.shortShares*val

    pos.shortGain=Math.max(0,(pos.shortShares)*(pos.shortAvgPrice-val))
    pos.shortLoss=(pos.shortShares>0?-100000:0)+Math.min(0,(pos.shortShares)*(pos.shortAvgPrice-val))
    state.stocks[z].position = pos

    totlongCost+=pos.longCost
    totlongValue+=pos.longValue
    totlongGain+=pos.longGain
    totlongLoss+=pos.longLoss
    totshortCost+=pos.shortCost
    totshortValue+=pos.shortValue
    totshortGain+=pos.shortGain
    totshortLoss+=pos.shortLoss
})

state.stocks["ME"].tick={
    price:state.player.money,
    longCost:totlongCost,
    longValue:totlongValue,
    longGain:totlongGain,
    longLoss:totlongLoss,
    shortCost:totshortCost,
    shortValue:totshortValue,
    shortGain:totshortGain,
    shortLoss:totshortLoss,
    total:state.player.money + totlongValue + totshortValue + totlongLoss + totshortLoss
}


symbols.filter(z=>z!="ME").forEach(s=>
    {
        state.stocks[s].investmentPercent = (state.stocks[s].position.longValue + state.stocks[s].position.shortValue) / (state.stocks["ME"].tick.longValue + state.stocks["ME"].tick.shortValue) || 0
    })


//ns.print(JSON.stringify(state))
return state
}


/** @param {import(".").NS} ns **/
export async function main(ns) {
    var s = state(ns)
     ns.tprintf(JSON.stringify(s,null,2))
 }