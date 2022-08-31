import {Request} from "express";


export function renderData(req : Request, ){

}
// 관리자 아이디 비번 체크
export function adminCheck(id, pw){
    return (id === process.env.ADMIN_ID && pw === process.env.ADMIN_PW)? true : false
}
export function isMobile(user_agent: string): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        user_agent,
    );
}
export function getParamList(req): Array<string>{
    let query = req.params[0];
    if(query !== ''){
        if(query.endsWith('/')) query = query.slice(0, -1);
        if(query.startsWith('/')) query = query.substring(1);
    }

    return query.split('/');
}
export function undefinedToString(s){
    return s ?? ''
}
export function getYmdHis(time){
    const Y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const i = time.getMinutes();
    const s = time.getSeconds();
    return `${Y}-${m}-${d} ${h}:${i}:${s}`;
}