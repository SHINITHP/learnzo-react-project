class ApiError extends Error{
    public statusCode: number;

    constructor(statusCode: number, message: string){
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export default ApiError;
