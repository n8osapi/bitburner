import {post} from './tools'
/** @param {import(".").NS} ns **/
export async function main(ns) {
    post(ns,"/api/sell",{test:"test"})
}