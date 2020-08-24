<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    .learning__sentence-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 32px;
        padding: 0 24px;
        transition: all 0.2s;
        cursor: pointer;
        min-width: 446px;
    }

    .learning__sentence-item-eng {
        height: 60px;
        width: 100%;
        color: #2B2D36;
        font-size: 18px;
        letter-spacing: -0.1px;
        line-height: 30px;
        flex: 1;
    }

    .learning__sentence-item-kor {
        flex: 1;
    }
    .learning__sentence-item-kor p {
        display: flex;
        align-items: center;
        height: 100%;
        /*min-height: 50px;*/
    }

    .learning__sentence-item:hover {
        width: 100%;
        border-radius: 15px;
        padding: 24px;
        background-color: #FFFFFF;
        box-shadow: 0 -1px 5px 0 rgba(225,225,232,0.2), 0 1px 3px 0 rgba(0,0,0,0.2);
    }

    .learning__sentence-item.active {
        width: 100%;
        border-radius: 15px;
        padding: 24px 24px 0 24px;
        background-color: #FFFFFF;
        box-shadow: 0 -1px 5px 0 rgba(225,225,232,0.2), 0 1px 3px 0 rgba(0,0,0,0.2);
    }

    .learning__sentence-item-kor input {
        width: 100%;
        height: 48px;
        border: 0;
        border-bottom: 2px solid #2B2D36;
        margin-top: 8px;
        font-size: 16px;
        letter-spacing: -0.1px;
        line-height: 28px;
    }

    .learning__sentence-item-kor input:focus {
        outline: none;
    }

    .learning__sentence-item-kor input::placeholder {
        color: #858899;
        font-size: 16px;
        letter-spacing: -0.1px;
        line-height: 28px;
    }
    .learning__sentence-item-options {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0;
    }
    .learning__sentence-item-options-left span {
        height: 40px;
        width: 40px;
        padding: 8px;
    }
    .learning__sentence-item-options-left span>i {
        font-size: 20px;
    }
    .learning__sentence-item-options-right {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .learning__sentence-item-options-right button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 94px;
        height: 32px;
        position: relative;
    }
    .learning__sentence-item-options-right button:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .learning__sentence-item-options-right button:first-child {
        margin-right: 12px;
    }
    .n-none {
        display: none !important;
    }

</style>
<div class="leaning-contents-left">
    <div class="leaning-contents-left-top">
        <div class="leaning-progress">
            <div class="leaning-circle-bg">
                <span class="leaning-progress-percent">
                    <span>0</span>
                    <span class="leaning-progress-span">문장 학습 진도</span>
                </span>
            </div>
            <canvas class="leaning-progress-canvas" width="210" height="210"/>
        </div>
    </div>
</div>
<div class="leaning-contents-right">
    <ul class="learning__sentence-wrap" id="learningSentence">
    </ul>
</div>