import {Request} from "express";

export function renderData(req : Request, ){

}
export function adminCheck(id, pw){
    return (id === process.env.ADMIN_ID && pw === process.env.ADMIN_PW)? true : false
}