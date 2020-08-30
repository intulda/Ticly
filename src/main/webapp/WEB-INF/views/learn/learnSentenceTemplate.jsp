<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="leaning-contents-left">
    <div class="leaning-contents-left-top">
        <div class="leaning-progress" id="test">
            <div class="leaning-circle-bg">
                <span class="leaning-progress-percent">
                    <span>0</span>
                    <span class="leaning-progress-span">문장 학습 진도</span>
                </span>
            </div>
<%--            <canvas class="leaning-progress-canvas" width="210" height="210"/>--%>
            <svg viewBox="0 0 36 36" id="leaning-progress" class="circular-chart" width="162px" height="162px">
                        <path  class="circle"
                              stroke-dasharray="0, 100"
                              d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                />
            </svg>
        </div>
    </div>
</div>
<div class="leaning-contents-right">
    <ul class="learning__sentence-wrap" id="learningSentence">
    </ul>
</div>

