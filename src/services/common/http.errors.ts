export class AccessDeniedError extends Error {
    constructor(message: string){
        super(message)
        this.name = "AccessDeniedError"
    }
}
export class ConflictError extends Error {
    constructor(message: string){
        super(message)
        this.name = "ConflictError"
    }
}

export class ApiError extends Error{
    code: number | undefined
    constructor(message: string, code?: number ){
        super(message)
        this.name = "ServiceError"
        this.code = code
    }
}