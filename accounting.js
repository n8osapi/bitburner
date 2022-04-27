import {fn} from './tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.tprint(JSON.stringify(ns.getScriptIncome().map(z=>fn(z)),null,2))
}