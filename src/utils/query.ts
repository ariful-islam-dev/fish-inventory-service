
import { number } from "zod";
import { generateQueryStr } from "./qs";

// added data link
export const getTransformItems = (items:any[]=[], selection:any[]=[], path="/") => {
    if(!Array.isArray(items) && !Array.isArray(selection)) {
        throw new Error("Invalid Arguments");
    }

    if(selection.length === 0) {
        return items.map(item=>({...items, link: `${path}/${item.id}`}));
    }


    return items.map((item) => {
        const result = {};
        selection.forEach((key)=>{
            result[key] = item[key];
        });
        result["link"] = `${path}/${item.id}`;
        return result;
    });


};

export const getPagination = (totalItems = 0, page = 1, limit = 10) => {
    const totalPages = Math.ceil(totalItems / limit);

    const pagination = {
        page:Number(page),
        limit:Number(limit),
        totalPages:Number(totalPages),
        totalItems:Number(totalItems),
    
    };

    if(page < totalPages) {
        pagination['next'] = page + 1;
    }

    if(page > 1) {
        pagination['prev'] = page - 1;
    }
    
    
    return pagination
};


export const getHateOsLinks=(url="/", hasNext=false, hasPrev=false, path="", query={}, page=1) => {
    const links = {
        self: url
    };

    if(hasNext) {
        const queryStr = generateQueryStr({...query, page: page +1 });
        links['next'] = `${path}?${queryStr}`;
    };

    if(hasPrev) {
        const queryStr = generateQueryStr({...query, page: page -1 });
        links['prev'] = `${path}?${queryStr}`;
    };

    return links;
}