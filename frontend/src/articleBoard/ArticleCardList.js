import React, {useState, useEffect} from 'react';
import ArticleCard from "./ArticleCard";
import '../css/articleBoard/findArticleStyle.css';
import Axios from "axios";

const ArticleCardList = () => {
    const [list, setList] = useState([]);
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
            url: '',
            method: 'GET',
            params: {categories: '디자인'}
        }).then(response => {

            console.log(response.data);
            setList(response.data);
        });
    }
    useEffect(findLatestMyTypeArticle, []);

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