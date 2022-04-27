import BaseStock from "/classes/if.stock"
export default class TIXStock extends BaseStock{
/** @param {import("..").NS} ns **/
    constructor(ns,symbol)
    {
        super(ns,symbol)
    }
}