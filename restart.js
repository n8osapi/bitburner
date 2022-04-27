import {post} from './tools'
/** @param {import(".").NS} ns **/
export async function main(ns) {
  post(ns,'/apiv2/reset/all',{})
  ns.installAugmentations("init.js");
}

