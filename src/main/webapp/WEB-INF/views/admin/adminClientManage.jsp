<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<head>
    <title>adminClientManage</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/admin/adminClientManage.css" />
    <c:import url="/WEB-INF/views/layout/globalImport.jsp"></c:import>
</head>
<body>
<div class="ticly__basic-layout">
    <c:import url="/WEB-INF/views/layout/globalNav.jsp"></c:import>
    <div class="container adminClientManage_Container ticly__basic-content-layout">
        <div class="adminClientManage_Div">
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="customSwitch">
                <label class="custom-control-label filter_Title" for="customSwitch">검색 설정</label>
            </div>
            <div class="filter_Div" id="customSwitchContent">
                <div class="clientRadio">
                    <span class="filter_SubTitle">회원 구분</span>
                    <div class="custom-control custom-radio clientRadioContents">
                        <input type="radio" id="clientRadioTotal" name="client_radio" class="custom-control-input custom-radio" value="allClientType" checked="checked"/>
                        <label class="custom-control-label" for="clientRadioTotal">전체</label>
                    </div>
                    <div class="custom-control custom-radio clientRadioContents">
                        <input type="radio" id="clientRadioNormal" name="client_radio" class="custom-control-input custom-radio" value="0"/>
                        <label class="custom-control-label" for="clientRadioNormal">일반</label>
                    </div>
                    <div class="custom-control custom-radio clientRadioContents">
                        <input type="radio" id="clientRadioWithdrawal" name="client_radio" class="custom-control-input custom-radio" value="1"/>
                        <label class="custom-control-label" for="clientRadioWithdrawal">탈퇴</label>
                    </div>
                </div>
                <div class="marketingRadio">
                    <span class="filter_SubTitle">마케팅 수신 정보</span>
                    <div class="custom-control custom-radio marketingRadioContents">
                        <input type="radio" id="marketingRadioTotal" name="marketing_radio" class="custom-control-input" value="allMarketingType" checked="checked"/>
                        <label class="custom-control-label" for="marketingRadioTotal">전체</label>
                    </div>
                    <div class="custom-control custom-radio marketingRadioContents">
                        <input type="radio" id="marketingRadioAgree" name="marketing_radio" class="custom-control-input" value="1"/>
                        <label class="custom-control-label" for="marketingRadioAgree" >수신허용</label>
                    </div>
                    <div class="custom-control custom-radio marketingRadioContents">
                        <input type="radio" id="marketingRadioDisAgree" name="marketing_radio" class="custom-control-input" value="0"/>
                        <label class="custom-control-label" for="marketingRadioDisAgree">수신거부</label>
                    </div>
                </div>
                <div class="accountCheckbox">
                    <span class="filter_SubTitle">계정 구분</span>
                    <div class="custom-control custom-checkbox accountCheckboxContents">
                        <input type="checkbox" id="accountCheckboxEmail" class="custom-control-input" checked="checked" value="EMAIL"/>
                        <label class="custom-control-label" for="accountCheckboxEmail">일반 이메일</label>
                    </div>
                    <div class="custom-control custom-checkbox accountCheckboxContents">
                        <input type="checkbox" id="accountCheckboxNaver" class="custom-control-input" checked="checked" value="NAVER"/>
                        <label class="custom-control-label" for="accountCheckboxNaver">네이버</label>
                    </div>
                </div>
            </div>
            <div class="searchCategoryBar">
                <span class="filter_SubTitle">검색어</span>
                <select class="form-control" id="searchCategory">
                    <option value="allSearchType"> 전체 </option>
                    <option value="EMAIL"> 이메일 </option>
                    <option value="NICKNAME"> 닉네임 </option>
                </select>
                <div>
                    <input type="text" id="searchInput" class="form-control"/>
                </div>
            </div>
            <div class="searchButton">
                <button type="submit"
                        class="btn btn-outline-primary"
                        id="search_Client_Button">
                    검색하기
                </button>
            </div>
            <div class="rectangle adminClientManage_Rectangle"></div>
            <span class="filter_Title">검색 결과</span>
            <div class="searchResult">
                <table class="searchResultTable">
                    <thead>
                    <tr>
                        <th>
                            <span class="text">회원 번호</span>
                            <span>
                                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                                        </span>
                        </th>
                        <th>
                            <span class="text">권한</span>
                            <span>
                                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                                        </span>
                        </th>
                        <th>
                            <span class="text">이메일</span>
                            <span>
                                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                                        </span>
                        </th>
                        <th>
                            <span class="text">닉네임</span>
                            <span>
                                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                                        </span>
                        </th>
                        <th>
                            <span class="text">회원 구분</span>
                            <span>
                                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                                        </span>
                        </th>
                        <th>
                            <span class="text">계정 구분</span>
                            <span>
                                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                                        </span>
                        </th>
                        <th>
                            <span class="text">마케팅 수신 정보</span>
                            <span>
                                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                                        </span>
                        </th>
                        <th>
                            <span class="text">가입일</span>
                            <span>
                                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                                        </span>
                        </th>
                        <th>
                            <span class="text">최근 접속일</span>
                            <span>
                                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                                        </span>
                        </th>
                        <th>

                        </th>
                    </tr>
                    </thead>
                    <tbody id="search_Result_Table_Content">
                    <!--
                    <tr>
                        <td class="text">1111</td>
                        <td class="text">관리자</td>
                        <td class="text">heycharles@naver.com</td>
                        <td class="text">심필용</td>
                        <td class="text">탈퇴</td>
                        <td class="text">네이버</td>
                        <td class="text">수신거부</td>
                        <td class="text">2020-08-20</td>
                        <td class="text">2020-08-21</td>
                        <td class="clientUpdateDeleteButton">
                            <i class="icon_pen md"></i>
                        </td>
                    </tr>
                    <tr>
                        <td class="text">1112</td>
                        <td class="text">사용자</td>
                        <td class="text">intulda@gmail.com</td>
                        <td class="text">두더지</td>
                        <td class="text">일반</td>
                        <td class="text">일반 이메일</td>
                        <td class="text">수신허용</td>
                        <td class="text">2020-08-22</td>
                        <td class="text">2020-08-23</td>
                        <td class="clientUpdateButton">
                            <i class="icon_pen md"></i>
                        </td>
                    </tr>
                    -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <c:import url="/WEB-INF/views/layout/globalFooter.jsp"></c:import>
</div>

<script type="module" src="${pageContext.request.contextPath}/js/admin/AdminClientManage.js"></script>
</body>
</html>