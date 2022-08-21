import {Request} from "express";


export function renderData(req : Request, ){

}
// 관리자 아이디 비번 체크
export function adminCheck(id, pw){
    return (id === process.env.ADMIN_ID && pw === process.env.ADMIN_PW)? true : false
}