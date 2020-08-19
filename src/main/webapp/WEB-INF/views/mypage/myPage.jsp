<%--
  Created by IntelliJ IDEA.
  User: Charles
  Date: 2020-08-12
  Time: 오전 11:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>myPage</title>
    <link rel="stylesheet" href="/css/mypage/myPage.css" />
    <link rel="stylesheet" href="/css/default.css" />
    <link rel="stylesheet" href="/css/bootstrap.css" />
    <link rel="stylesheet" href="/css/fonticon.css" />
</head>
<body>
<div class="container myPage_Nav"></div>
<div class="container myPage_Container">
<div class="myPage_Div">
    <span class="text h3 text-weight-bold myPage_Title">내 정보 수정</span>
    <div class="basicInfo_Div">
        <span class="myPage_Subtitle">기본 정보</span>
        <div class="basicInfo_DivContents">
            <span class="div_Contents">닉네임</span>
            <div class="nickname_Change">
                <input
                        type="text"
                        class="form-control nickname_Input"
                        placeholder="변경할 닉네임을 입력하세요."
                        id="nickname_Change_Input"
                />
                <button type="submit"
                        class="btn btn-outline-primary"
                        id="nickname_Change_Button">
                        변경하기
                </button>
            </div>
            <p class="myPage_Error_Message"></p>
            <span class="div_Contents">이메일</span><br>
            <span class="text h5 text-color-gray100 basicInfo_Email">kkh@ticly.com</span>
        </div>
    </div>
    <div class="rectangle myPage_Rectangle"></div>
    <div class="password_Div">
        <span class="myPage_Subtitle">비밀번호 변경</span>
        <div class="password_DivContents">
            <span class="div_Contents">현재 비밀번호</span>
            <input
                    type="password"
                    class="form-control"
                    id="password_PresentType"
                    placeholder="현재 비밀번호를 입력하세요."
            />
            <p class="myPage_Error_Message"></p>
            <span class="div_Contents">새로운 비밀번호</span>
            <input
                    type="password"
                    class="form-control"
                    id="password_NewType"
                    placeholder="새로운 비밀번호를 입력하세요."
            />
            <p class="myPage_Error_Message"></p>
            <button type="submit"
                    class="btn btn-outline-primary"
                    id="password_Change_Button">
                변경하기
            </button>
        </div>
    </div>
    <div class="rectangle myPage_Rectangle"></div>
    <div class="withdraw_Div">
        <span class="myPage_Subtitle">회원 탈퇴</span>
        <div class="withdraw_DivContents">
            <div class="withdraw_Warning">
            <span class="text text-color-gray100">탈퇴하기를 누르시면 </span
            ><span class="text text-weight-bold withdraw_Nickname"
            >코드짜개님</span
            ><span>의 </span
            ><span class="text text-weight-bold text-color-red"
            >계정이 영구적으로 삭제</span
            ><span>됩니다.</span><br />
                <span>모든 데이터가 삭제되며 되돌릴 수 없습니다.</span>
            </div>
            <button type="submit"
                    class="btn btn-outline-danger"
                    id="membership_Withdrawal_Button">
                탈퇴하기
            </button>
        </div>
    </div>
</div>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    (() => {
        const nicknameChangeInputElement = document.getElementById("nickname_Change_Input");
        const nicknameChangeButtonElement = document.getElementById("nickname_Change_Button");
        const passwordPresentTypeElement = document.getElementById("password_PresentType");
        const passwordNewTypeElement = document.getElementById("password_NewType");
        const passwordChangeButtonElement = document.getElementById("password_Change_Button");
        const myPageErrorMessageElement = document.getElementsByClassName("myPage_Error_Message");
        const membershipWithdrawalButtonElement = document.getElementById("membership_Withdrawal_Button");
        const myPageEmailElement = document.getElementById("myPage_Email");
        let myPageNicknameCheckElement = false;
        let myPagePresentPasswordCheckElement = false;
        let myPageNewPasswordCheckElement = false;
        let myPageWithdrawalCheckElement = false;
        let myPageEmailShowElement = false;
        const myPagePasswordCompareElement = false;

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
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            } else {
                alert("잘못 된 닉네임 입니다.");
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
                        alert("회원탈퇴 되었습니다.");
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


            /*
            if(membershipWithdrawalButtonElement){
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
                        } else {
                            alert("잘못된 비밀번호입니다. 다시 입력해주세요.");
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

             */


        nicknameChangeInputElement.addEventListener('blur', myPageNicknameCheck);
        passwordPresentTypeElement.addEventListener('blur', myPageLoginPasswordCheck);
        passwordNewTypeElement.addEventListener('blur', myPageNewPasswordCheck);
        nicknameChangeButtonElement.addEventListener("click", myPageNicknameCheckButton);
        passwordChangeButtonElement.addEventListener("click", myPagePasswordCheckButton);
        membershipWithdrawalButtonElement.addEventListener("click", myPageWithdrawalCheckButton);
    })();



</script>

</body>
</html>
