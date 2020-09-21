import React, {useState, useEffect} from 'react';
import ArticleCard from "./ArticleCard";
import '../../css/articleBoard/findArticleStyle.css';
import {useSelector, useDispatch} from "react-redux";
import {ARTICLE_SEARCH_REQUEST, articleSearchRequestAction} from "../../action/acticle";

const ArticleCardList = (props) => {

    const {categories, list} = useSelector((state) => state.articleReducer);
    const dispatch = useDispatch();

    const init = () => {
        dispatch(articleSearchRequestAction(categories, props.sectionPath));
    }
    useEffect(init, [])

        return (
            <div className="card__outer">
                {list.map( (it, i) => {
                    return (
                        <ArticleCard imagePath={it.image_path}
                                     articleSeq={it.article_seq}
                                     categoryTitle={it.category_title}
                                     hashtag={it.hashtag}
                                     title={it.title}
                                     summary={it.summary}
                                     applyCount={it.apply_count}
                                     regDate={it.reg_date}
                                     key={i}
                        />
                    );
                })}
            </div>
        )
    }

export default ArticleCardList;