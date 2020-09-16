import React from 'react';
import ArticleCard from "./ArticleCard";
import '../css/articleBoard/findArticleStyle.css';
import Axios from "axios";

let list = [];
const ArticleCardList = () => {

    const [imagePath, setImagePath] = React.useState('../../../images/articleBoard/ticly_thumbnail.png');
    const [articleSeq, setArticleSeq] = React.useState(0);
    const [categoryTitle, setCategoryTitle] = React.useState('디자인');
    const [hashtag, setHashtag] = React.useState('none');
    const [title, setTitle] = React.useState('title');
    const [summary, setSummary] = React.useState('summary');
    const [applyCount, setApplyCount] = React.useState(0);
    const [regDate, setRegDate] = React.useState('20.08.10');

    const findLatestMyTypeArticle = () => {
        Axios({
            url: '/articleBoard/findLatestMyTypeArticle',
            method: 'GET',
            params: {categories: '디자인'}
        }).then(response => {

                console.log(response.data);
                list = response.data;
            // for (let i = 0; i < response.data.length; i++){
            //     console.log(response.data[i].image_path);
            //     setImagePath(response.data[i].image_path);
            //     setArticleSeq(response.data[i].article_seq);
            //     setCategoryTitle(response.data[i].category_title);
            //     setHashtag(response.data[i].hashtag);
            //     setTitle(response.data[i].title);
            //     setSummary(response.data[i].summary);
            //     setApplyCount(response.data[i].apply_count);
            //     setRegDate(response.data[i].reg_date);
            // }

            return response.data;
        });
    }

        return (
            <div className="card__outer" onClick={findLatestMyTypeArticle} style={{backgroundColor: "red", margin: "50px"}}>
                hello
                {list.map( (it, i) => {
                    setImagePath(it.image_path);
                    setArticleSeq(it.article_seq);
                    setCategoryTitle(it.category_title);
                    setHashtag(it.hashtag)
                    setTitle(it.title);
                    setSummary(it.summary);
                    setApplyCount(it.apply_count);
                    setRegDate(it.reg_date);

                    return (
                        <ArticleCard imagePath={imagePath}
                                     articleSeq={articleSeq}
                                     categoryTitle={categoryTitle}
                                     hashtag={hashtag}
                                     title={title}
                                     summary={summary}
                                     applyCount={applyCount}
                                     regDate={regDate}
                                     key={i}
                        />
                    );
                })}
            </div>
        )
    }

export default ArticleCardList;