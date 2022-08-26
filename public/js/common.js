const STATIC_URL = "http://localhost:3000";

async function axios_valid(type, data){
    const result = await axios({
        method: "post",
        url: STATIC_URL + "/user/valid",
        data:{
            type,
            data,
        }
    })
    return result.data === 'success';
}

function check_reset(s){
    document.querySelector(`.${s}`).innerHTML = '';
}

function id_check(id){
    const err_div = document.querySelector('.check_msg_id');
    let match = 0;
    if(/[a-zA-Z]/gi.test(id)) match++;
    if(/[0-9]/gi.test(id)) match++;
    if(/[가-힣]/gi.test(id)) match++;
    const pattern_id = /^[가-힣0-9a-zA-Z]{3,8}/gi;
    const result = pattern_id.test(id);

    if(result && match >= 2){
        try {
            axios_valid('id', id)
                .then((res) => {
                    if (res === true) {
                        err_div.innerHTML = '이미 존재하는 아이디입니다.';
                        return false;
                    }
                })
            return true;
        }catch (error){
            return false;
        }
    }else if(match < 2){
        err_div.innerHTML = '두가지 이상 문자를 포함시켜 주세요. ';
        return false;
    }else{
        err_div.innerHTML = '한글, 숫자, 알파벳만 사용하여 3~8글자사이로 입력해주세요.';
        return false;
    }

}
function pw_check(pw){
    const err_div = document.querySelector('.check_msg_pw');

    let match = 0;

    if(/[a-zA-Z]/gi.test(pw)) match++;
    if(/[0-9]/gi.test(pw)) match++;
    if(/[!@#$^&*]/gi.test(pw))
    const pattern_pw = /^[가-힣0-9a-zA-Z!@#$^&*]{8,15}/gi;
}
function pw_re_check(pw_re){

}
function email_check(email){

}
function name_check(name){

}