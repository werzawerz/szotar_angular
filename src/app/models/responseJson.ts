export interface ResponseJson {
    head : string,
    def : { pos : string, text : string, tr : {
        mean : string[],
        pos : string,
        text : string,
    }[], 
    }[]
}