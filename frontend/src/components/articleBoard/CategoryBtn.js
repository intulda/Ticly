import React, {useEffect} from 'react';
import {articleSearchRequestAction} from "../../action/acticle";

const CategoryBtn = (props) => {

    const categoryTabBtn = document.querySelectorAll(".js-category-tab");

    // category tab 영역의 버튼 클릭시 상태가 바뀌도록 처리하는 함수
    function handleCategoryTabClickEvent(ev) {
        let target = ev.target;
        console.log(target);
        categoryTabBtn.forEach(el => {
            el.classList.remove("active");
        });
        target.classList.add("active");
    }

    return (
        <>
            {(props.btnText == 'ALL' || props.categoryLength == 1)
                ?
                    <button className="category__tab btn btn-tab active js-category-tab" onClick={handleCategoryTabClickEvent}>
                        {props.btnText}
                    </button>
                :
                    <button className="category__tab btn btn-tab js-category-tab" onClick={handleCategoryTabClickEvent}>
                        {props.btnText}
                    </button>
            }

        </>
    )
}

export default CategoryBtn;