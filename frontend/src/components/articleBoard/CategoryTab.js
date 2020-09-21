import React from 'react';
import {useSelector} from "react-redux";
import CategoryBtn from './CategoryBtn';


const CategoryTab = () => {
    const {categories} = useSelector((state) => state.articleReducer);


    return (
        <div className="category__tab-wrapper">
            {/* 관심분야 버튼 추가하기 */}
            {(categories.length > 1)
                ?
                    <div>
                        <CategoryBtn
                            btnText={'ALL'}
                            categoryLength={categories.length}
                        />
                        {categories.map((it, i) => {
                            return (
                                <CategoryBtn
                                    btnText={it}
                                    categoryLength={categories.length}
                                    key={i}
                                />
                            )
                        })}
                    </div>
                : <CategoryBtn
                    btnText={categories}
                    categoryLength={categories.length}
                />
            }

            {/*관심분야 설정 버튼 추가하기*/}
            <button className="btn btn-tab hide js-category-setting-btn js-category-modal-trigger"
                    name="tooltip"
                    data-placement="bottom"
                    title="관심분야 설정">
                <i className="icon_setting"/>
            </button>
        </div>
    )
}

export default CategoryTab;