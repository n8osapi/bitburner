export default class BaseStock{
/** @param {import("..").NS} ns **/
    #ns
    constructor(ns,symbol)
    {
        this.symbol = symbol
        this.#ns = ns
    }
    get maxShares(){
        return this.#ns.stock.getMaxShares(this.symbol)
    }
    get price(){
        return {
            ask: this.#ns.stock.getAskPrice(this.symbol),
            bid: this.#ns.stock.getBidPrice(this.symbol),
            tick: this.#ns.stock.getPrice(this.symbol)
        }
    }
    get position(){
        var pos=this.#ns.stock.getPosition(this.symbol)
        return {
            longShares: pos[0],
            longAvgPrice: pos[1],
            shortShares: pos[2],
            shortAvgPrice: pos[3]
        }
    }
    get max_long_shares(){
        let shares = (this.#ns.getServerMoneyAvailable("home") - 100000) / this.price.ask
        return Math.min(Math.floor(shares),this.maxShares - (this.position.longShares+this.position.shortShares) )
    }

    get max_short_shares(){
        let shares = (this.#ns.getServerMoneyAvailable("home") - 100000) / this.price.ask
        return Math.min(Math.floor(shares),this.maxShares - (this.position.longShares+this.position.shortShares) )
    }

    cost(shares){
        return (shares * this.price.ask) + 100000
    }

    toJSON(){
        return {
            symbol:this.symbol,
            price:this.price,
            maxShares:this.maxShares,
            position: this.position,
            max_long: {
                shares: this.max_long_shares,
                cost: this.cost(this.max_long_shares)
            },
            max_short: {
                shares: this.max_short_shares,
                cost: this.cost(this.max_short_shares)
            },
        }
    }
}