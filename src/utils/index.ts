import { generateQueryStr } from "./qs";
import { getHateOsLinks, getPagination, getTransformItems } from "./query";

const qs = {generateQueryStr}

const query = {
    getTransformItems,
    getPagination,
    getHateOsLinks
}


export {query, qs}