import React, { Component } from 'react';
import '../../css/articleBoard/findArticleStyle.css';
import ArticleCardList from "/articleBoard/ArticleCardList";
import Axios from "axios";

class CardSection extends Component{
    state = {
        information : [
            {
                imagePath: '../../../images/articleBoard/ticly_thumbnail.png',
                articleSeq: 0,
                categoryTitle: 'none',
                hashtag: '#none',
                title: 'title-1',
                summary: 'summary',
                applyCount: 0,
                regDate: new date()
            },
            {
                imagePath: '../../../images/articleBoard/ticly_thumbnail.png',
                articleSeq: 0,
                categoryTitle: 'none',
                hashtag: '#none',
                title: 'title-2',
                summary: 'summary',
                applyCount: 0,
                regDate: new date()
            }
        ]
    }
    goToLeaningApply = (articleSeq) => {
        location.href = '../learningApply/goToLeaningApply?seq=' + articleSeq;
    }
    render() {
        return (
            <div>
                <ArticleCardList data={this.state.information}/>
            </div>
        );
    }
}

export default CardSection;