(() => {
    const nicknameChangeInputElement = document.getElementById("nickname_Change_Input");
    const nicknameChangeButtonElement = document.getElementById("nickname_Change_Button");
    const passwordPresentTypeElement = document.getElementById("password_PresentType");
    const passwordNewTypeElement = document.getElementById("password_NewType");
    const passwordChangeButtonElement = document.getElementById("password_Change_Button");
    const myPageErrorMessageElement = document.getElementsByClassName("myPage_Error_Message");
    const membershipWithdrawalButtonElement = document.getElementById("membership_Withdrawal_Button");
    let myPageNicknameCheckElement = false;
    let myPagePresentPasswordCheckElement = false;
    let myPageNewPasswordCheckElement = false;

    const isJobPassword = (asValue) => {
        const checkNumber = asValue.search(/[0-9]/g);
        const checkEnglish = asValue.search(/[a-z]/ig);
        if(checkNumber <0 || checkEnglish <0){
            //숫자와 영문을 혼용하지 않은 경우
            return false;
        }else{
            return true;
        }
        //    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/; //  8자 이상, 숫자 조합
        //   return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
    };

    /*  닉네임 입력창 경고문 출력  */
    const myPageNicknameCheck = () => {
        /*  닉네임 입력 안했을 경우 경고문 */
        if(nicknameChangeInputElement.value.trim()==""){
            myPageErrorMessageElement[0].innerHTML =
                '<span class="text body2 text-color-gray300 sixPassword_Input"><i class="icon_info_circle InfoIcon_Size sixPassword_Icon"></i>닉네임을 입력해주세요.</span>';
        } else {
            axios({
                method: 'post',
                url: '/nicknameChangeInput',
                params: {
                    nickname: nicknameChangeInputElement.value.trim()
                }
            })
                .then(function (response){
                    /*  새로운 닉네임 입력 했을 경우 경고문 */
                    if(response.data==0){
                        myPageErrorMessageElement[0].innerHTML = '<span class="text body2 text-color-gray300 sixPassword_Input"><i class="icon_info_circle InfoIcon_Size sixPassword_Icon"></i>사용 가능한 닉네임입니다.</span>';
                        myPageNicknameCheckElement = true;
                        /*  기존 닉네임 입력 했을 경우 경고문 */
                    } else {
                        myPageErrorMessageElement[0].innerHTML = '<span class="text body2 text-color-gray300 sixPassword_Input"><i class="icon_info_circle InfoIcon_Size sixPassword_Icon"></i>이미 사용 중인 닉네임입니다.</span>';
                        myPageNicknameCheckElement = false;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    /*  현재 비밀번호 입력창 경고문 출력  */
    const myPageLoginPasswordCheck = () => {
        if(passwordPresentTypeElement.value.trim()==""){
            myPageErrorMessageElement[1].innerHTML =
                '<span class="text body2 text-color-gray300 sixPassword_Input"><i class="icon_info_circle InfoIcon_Size sixPassword_Icon"></i>현재 비밀번호를 입력해주세요.</span>';
        } else {
            axios({
                method: 'post',
                url: '/presentPasswordChangeInput',
                params: {
                    password: passwordPresentTypeElement.value.trim()
                }
            })
                .then(function (response) {
                    if (response.data == 0) {
                        myPageErrorMessageElement[1].innerHTML = '<span class="text body2 text-color-gray300 sixPassword_Input"><i class="icon_info_circle InfoIcon_Size sixPassword_Icon"></i>비밀번호가 일치하지 않습니다. 다시 입력해주십시오.</span>';
                        myPagePresentPasswordCheckElement = false;
                    } else if (response.data == 1) {
                        myPageErrorMessageElement[1].innerHTML = '<span class="text body2 text-color-gray300 sixPassword_Input"><i class="icon_info_circle InfoIcon_Size sixPassword_Icon"></i>비밀번호가 일치합니다.</span>';
                        myPagePresentPasswordCheckElement = true;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    /*  새로운 비밀번호 입력창 경고문 출력  */
    const myPageNewPasswordCheck = () => {
        if(passwordNewTypeElement.value.trim()==""){
            myPageErrorMessageElement[2].innerHTML =
                '<span class="text body2 text-color-gray300 sixPassword_Input"><i class="icon_info_circle InfoIcon_Size sixPassword_Icon"></i>새로운 비밀번호를 입력해주세요.</span>';
            myPageNewPasswordCheckElement = false;
        } else if(passwordNewTypeElement.value.length<8) {
            myPageErrorMessageElement[2].innerHTML =
                '<span class="text body2 text-color-gray300 sixPassword_Input"><i class="icon_info_circle InfoIcon_Size sixPassword_Icon"></i>8자 이상의 비밀번호를 입력하세요.</span>';
            myPageNewPasswordCheckElement = false;
        } else if(!isJobPassword(passwordNewTypeElement.value)) {
            myPageErrorMessageElement[2].innerHTML =
                '<span class="text body2 text-color-gray300 sixPassword_Input"><i class="icon_info_circle InfoIcon_Size sixPassword_Icon"></i>숫자와 영문자를 혼용하여야 합니다.</span>';
            myPageNewPasswordCheckElement = false;
        } else {
            myPageErrorMessageElement[2].innerHTML =
                '<span class="text body2 text-color-gray300 sixPassword_Input"><i class="icon_info_circle InfoIcon_Size sixPassword_Icon"></i>사용 가능한 비밀번호입니다.</span>';
            myPageNewPasswordCheckElement = true;
        }
    }

    /* 닉네임 변경 버튼 클릭 후 출력 */
    const myPageNicknameCheckButton  = () => {
        if(myPageNicknameCheckElement){
            const nickname = nicknameChangeInputElement.value;
            // console.log(nickname)
            // console.log("axios go");
            axios({
                method: 'post',
                url: '/nicknameChangeButton',
                params: {
                    nickname: nickname
                }
            })
                .then(function (result){
                    if(result.data == "1"){
                        alert("닉네임 변경이 완료되었습니다.");
                        myPageNicknameCheckElement = true;
                        location.reload();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("잘못된 닉네임 입니다.");
        }
    }

    /* 비밀번호 변경 버튼 클릭 후 출력 */
    const myPagePasswordCheckButton  = () => {
        if(myPagePresentPasswordCheckElement == false || myPageNewPasswordCheckElement == false){
            alert("잘못된 비밀번호입니다. 다시 입력해주세요");
        }else {
            const password = passwordNewTypeElement.value;
            axios({
                method: 'post',
                url: '/passwordChangeButton',
                params: {
                    password: password
                }
            })
                .then(function (result){
                    if(result.data == "1"){
                        alert("비밀번호 변경이 완료되었습니다.");
                        passwordPresentTypeElement.value = "";
                        passwordNewTypeElement.value = "";
                        // location.reload();
                    } else {
                        alert("잘못된 비밀번호입니다. 다시 입력해주세요.");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    /* 탈퇴하기 버튼 클릭 후 출력 */
    const myPageWithdrawalCheckButton  = () => {
        let withdrawal_Message;
        withdrawal_Message = confirm("정말로 탈퇴하시겠습니까?");

        if(withdrawal_Message) {
            axios({
                method: 'post',
                url: '/withdrawalButton'
            })
                .then(function (result){
                    if(result.data == "1"){
                        alert("회원탈퇴 완료되었습니다.");
                    } else {
                        alert("취소되었습니다.");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else
        {
        }
    }

    //눈표시 클릭 시 패스워드 보이기(현재 비밀번호)
    document.getElementById('password-eyes-box').addEventListener("click",function (){
        if(passwordPresentTypeElement.type=='password'){
            document.getElementById('password-eyes-icon').className="icon_hide";
            passwordPresentTypeElement.type='text'
        }else if(passwordPresentTypeElement.type=='text'){
            document.getElementById('password-eyes-icon').className="icon_show";
            passwordPresentTypeElement.type='password'
        }
    });

    //눈표시 클릭 시 패스워드 보이기(새로 비밀번호)
    document.getElementById('new-password-eyes-box').addEventListener("click",function (){
        if(passwordNewTypeElement.type=='password'){
            document.getElementById('new-password-eyes-icon').className="icon_hide";
            passwordNewTypeElement.type='text'
        }else if(passwordNewTypeElement.type=='text'){
            document.getElementById('new-password-eyes-icon').className="icon_show";
            passwordNewTypeElement.type='password'
        }
    });


    nicknameChangeInputElement.addEventListener('blur', myPageNicknameCheck);
    passwordPresentTypeElement.addEventListener('blur', myPageLoginPasswordCheck);
    passwordNewTypeElement.addEventListener('blur', myPageNewPasswordCheck);
    nicknameChangeButtonElement.addEventListener("click", myPageNicknameCheckButton);
    passwordChangeButtonElement.addEventListener("click", myPagePasswordCheckButton);
    membershipWithdrawalButtonElement.addEventListener("click", myPageWithdrawalCheckButton);

})();