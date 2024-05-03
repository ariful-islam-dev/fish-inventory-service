export const generateQueryStr = (query: {[key: string]: any})=>{
    return Object.keys(query).map(key=>`${key}=${query[key]}`).join('&')
}

