import { post } from "./tools";
/** @param {import(".").NS} ns **/
export async function main(ns) {
  var stock = ns.args[0] || "all";
  for (var s of ns.stock.getSymbols()) {
    if (s == stock || stock == "all") {
      var position = ns.stock.getPosition(s);
      var sqty = ns.args[1] ?? position[2];
      if (position[2] > 0) {
          var sprice = ns.stock.sellShort(s, sqty);
          post(ns, "/api/sell", {
              type: "short",
              shares: sqty,
              symbol: stock,
              cost: position[3],
              pricePer: sprice,
              priceTot: sqty * sprice,
              time: Date.now(),
            });
        }
    var lqty = ns.args[1] ?? position[0];
      if (position[0] > 0) {
        var lprice = ns.stock.sell(s, lqty);
        post(ns, "/api/sell", {
          type: "long",
          shares: lqty,
          symbol: stock,
          cost: position[1],
          pricePer: lprice,
          priceTot: lqty * lprice,
          time: Date.now(),
        });
      }
    }
  }
}


