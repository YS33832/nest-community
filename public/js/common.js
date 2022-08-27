const STATIC_URL = "http://localhost:3000";

async function user_valid(type, data){
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
            user_valid('id', id)
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
    let spc = 0;
    if(/[a-zA-Z]/gi.test(pw)) match++;
    if(/[0-9]/gi.test(pw)) match++;
    if(/[!@#$^&*]/gi.test(pw)) spc++;
    const pattern_pw = /^[가-힣0-9a-zA-Z!@#$^&*]{8,15}/gi;
    const result = pattern_pw.test(pw);
    if(match < 2){
        err_div.innerHTML = '특수문자 외에 두가지 이상 문자를 포함시켜 주세요.';
        return false;
    }else if(spc === 0){
        err_div.innerHTML = '특수문자를 포함시켜 주세요.';
        return false;
    }else if(!result){
        err_div.innerHTML = '특수문자를 포함하여 8~15자 사이로 입력해주세요.';
        return false;
    }else{
        return true;
    }
}
function pw_re_check(pw_re){
    const err_div = document.querySelector('.check_msg_pw_re');
    const pw = document.querySelector("input[name='user_password']").value;
    if(pw_re !== pw){
        err_div.innerHTML = '비밀번호와 동일하게 입력해주세요.';
        return false;
    }else{
        return true;
    }
}
function name_check(name){
    const err_div = document.querySelector('.check_msg_nick');
    const pattern_name = /^[가-힣0-9a-zA-Z]{2,8}/gi;
    const result = pattern_name.test(name);
    if(!result){
        err_div.innerHTML = '닉네임은 한글,숫자,영문 2~5글자 사이로 입력해주세요.';
    }else{
        try{
            user_valid('name', name)
                .then((res)=>{
                    if(res === true){
                        err_div.innerHTML = '이미 존재하는 닉네임입니다.';
                        return false;
                    }
                })
            return true;
        }catch(error){
            return false;
        }
    }
}
function email_check(email){
    const err_div = document.querySelector('.check_msg_email');
    const pattern_name = /[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]+/gi;
    const result = pattern_name.test(email);
    if(!result){
        err_div.innerHTML = '이메일 형식에 맞춰 작성해주세요.';
    }else{
        try{
            user_valid('email', email)
                .then((res)=>{
                    if(res === true){
                        err_div.innerHTML = '이미 존재하는 이메일입니다.';
                        return false;
                    }
                })
            return true;
        }catch(error){
            return false;
        }
    }
}

// 회원가입 전송전 체크
function joinFormCheck(form){
    const user_id = form.user_id;
    const user_pw = form.user_password;
    const user_pw_re = form.user_password_check;
    const user_name = form.user_name;
    const user_email = form.user_email;

    if(!id_check(user_id.value)) {user_id.focus(); return false;};
    if(!pw_check(user_pw.value)) {user_pw.focus(); return false;}
    if(!pw_re_check(user_pw_re.value)) {user_pw_re.focus(); return false;};
    if(!name_check(user_name.value)) {user_name.focus(); return false;}
    if(!email_check(user_email.value)) {user_email.focus(); return false;}

    return true;
}
function loginCheck(form){
    if(!form.user_id.value || !form.user_password.value){
        alert("아이디와 비밀번호를 입력해주세요.")
        return false;
    }
}

function open_menu(){

}