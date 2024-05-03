const notFount = (msg: string = "Resources Not Found") => {
    const error = new Error(msg);
    error["status"] = 404;
    return error;
}

const serverError= (msg: string = "Internal Server Error") => {
    const error = new Error(msg);
    error["status"] = 500;
    return error;
};

const badRequest = (msg: string = "Bad Request") => {
    const error = new Error(msg);
    error["status"] = 400;
    return error;   
}

export { notFount, serverError, badRequest }