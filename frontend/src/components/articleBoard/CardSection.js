import React from 'react';
import '../../css/articleBoard/findArticleStyle.css';
import ArticleCardList from "./ArticleCardList";

const CardSection = (props) => {
    console.log(props.sectionPath);

    return (
        <div className="findArticle__section">
            <p className="text text-color-green text-weight-medium"
               style={{
                   fontSize: '15px'
            }}>
                {props.sectionSubTitle}
            </p>
            <div>
                <a href="#"
                   className="findArticle__section-title text h3 text-color-gray100 text-weight-medium">
                    {props.sectionTitle}
                    <i className="text text-color-green icons icon_chevron-right lg"/>
                </a>
            </div>
            <ArticleCardList sectionPath={props.sectionPath} />
        </div>
    );
}

export default CardSection;