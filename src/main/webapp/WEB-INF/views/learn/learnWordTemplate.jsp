<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="leaning-contents-left">
    <div class="leaning-contents-left-top">
        <div class="leaning-progress">
            <div class="leaning-circle-bg">
                            <span class="leaning-progress-percent">
                                <span>0</span>
                                <span class="leaning-progress-span">단어 학습 진도</span>
                            </span>
            </div>
            <canvas class="leaning-progress-canvas" width="210" height="210"/>
        </div>
    </div>
    <div class="leaning-contents-left-down">
        <ul class="leaning-contents-word-set" id="wordSet">

        </ul>
        <button class="btn btn-secondary btn-custom-option" id="wordSetAdd">
            <i class="icon_plus"></i>
            세트 추가하기
        </button>
    </div>
</div>
<div class="leaning-contents-right">
    <div class="leaning-contents-right-top">
        <div class="leaning-contents-right-title">
            <h1 id="contentTitle">단어 세트 1</h1>
        </div>
        <div class="leaning-contents-right-word">
            <div class="leaning-contents-card-prev" id="wordSwipeLeft">
                <i class="icon_chevron-left"></i>
            </div>
            <div class="leaning-contents-card-wrap">
                <ul class="word-list" id="wordList">
                    <li class="act">
                        <div class="leaning-contents-card-front leaning-card">
                            <div class="text leaning-contents-card-word display-4 text-weight-black front">
                                Null Pointer Exception
                            </div>
                            <div class="leaning-contents-card-information text alert-info body1 text-weight-medium">
                                <span class="card-information"><i class="icon_info_circle"></i>클릭하시면 두더지 입니다.</span>
                            </div>
                        </div>
                        <div class="leaning-contents-card-back leaning-card">
                            <div class="text leaning-contents-card-word display-4 text-weight-black back">
                                <%-- 카드 뒷면이 될곳 --%>
                                눌 포인트 익셉션
                            </div>
                        </div>
                    </li>
                    <li class="word-list-hide">
                        <div class="leaning-contents-card-front leaning-card">
                            <div class="text leaning-contents-card-word display-4 text-weight-black front">
                                author
                            </div>
                            <div class="leaning-contents-card-information text alert-info body1 text-weight-medium">
                                <span class="card-information"><i class="icon_info_circle"></i>클릭하시면 두더지 입니다.</span>
                            </div>
                        </div>
                        <div class="leaning-contents-card-back leaning-card">
                            <div class="text leaning-contents-card-word display-4 text-weight-black back">
                                <%-- 카드 뒷면이 될곳 --%>
                                오쓰도 잡아주시구요
                            </div>
                        </div>
                    </li>
                    <li class="word-list-hide">
                        <div class="leaning-contents-card-front leaning-card">
                            <div class="text leaning-contents-card-word display-4 text-weight-black front">
                                apply
                            </div>
                            <div class="leaning-contents-card-information text alert-info body1 text-weight-medium">
                                <span class="card-information"><i class="icon_info_circle"></i>클릭하시면 두더지 입니다.</span>
                            </div>
                        </div>
                        <div class="leaning-contents-card-back leaning-card">
                            <div class="text leaning-contents-card-word display-4 text-weight-black back">
                                <%-- 카드 뒷면이 될곳 --%>
                                애플리 잡아주시구요
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="leaning-contents-card-next" id="wordSwipeRight">
                <i class="icon_chevron-right"></i>
            </div>
        </div>
        <div class="leaning-contents-card-status">
            <ul id="contentInformation">
                <li>공부한 단어 <span class="font-point">1</span>개</li>
                <li>전체 단어 10개</li>
            </ul>
        </div>
    </div>
    <div class="leaning-contents-right-down">
        <div class="leaning-contents-right-top-info mb-3">
            <div class="leaning-contents-table-info" id="tableInformation">
                <span>[단어세트3]의 목록</span>
                <span class="table-word-set-count">(10)</span>
            </div>
            <div class="leaning-contents-table-add-word">
                <button class="btn btn-outline-danger table-word-delet-btn" id="tableWordRemove">
                    삭제하기
                </button>
            </div>
        </div>
        <div class="leaning-contents-table-contents">
            <table class="leaning-table" data-state="read">
                <thead>
                <tr>
                    <th>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" id="tableAllCheck" class="custom-control-input learning-table-checkbox">
                            <label class="custom-control-label" for="tableAllCheck"></label>
                        </div>
                    </th>
                    <th>
                        <span class="text">단어</span>
                        <span>
                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                        </span>
                    </th>
                    <th>
                        <span class="text">뜻</span>
                        <span>
                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                        </span>
                    </th>
                    <th>
                        <span class="text">상태</span>
                        <span>
                            <img src="${pageContext.request.contextPath}/images/learn/con_sort.svg">
                        </span>
                    </th>
                    <th>

                    </th>
                </tr>
                </thead>
                <tbody id="articleWordTable">

                </tbody>
            </table>
            <div class="leaning-contents-table-down">
                <button class="btn btn-outline-primary table-word-delet-btn" id="tableWordAdd">
                    단어 추가하기
                </button>
            </div>
        </div>
    </div>
</div>