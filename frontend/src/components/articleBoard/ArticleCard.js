import React from 'react';
import '../../css/articleBoard/findArticleStyle.css';

const ArticleCard = (props) => {

    const goToLeaningApply = () => {
        location.href = '../learningApply/goToLeaningApply?seq=' + props.articleSeq;
    }

    return (
        <div className="card__wrapper">
            <div className="card__img_wrapper card" onClick={goToLeaningApply}>
                <img className="card__img" src={props.imagePath} alt="thumbnail" />
            </div>
            <div className="card__body" onClick={goToLeaningApply}>
                <div className="card__body-tag-wrapper">
                    <p className="badge badge-neutral">
                        {props.categoryTitle}
                    </p>
                    <p className="card__body-tag text text-color-purple text-weight-medium">
                        {props.hashtag}
                    </p>
                </div>
                <div className="card__body-content">
                    <h4 className="card__body-title text text-color-gray100 text-weight-medium">
                        {props.title}
                    </h4>
                    <p className="text body1">
                        {props.summary}
                    </p>
                </div>
            </div>
            <div className="card__footer">
                <p className="text body2 text-color-gray300">
                    <i className="{ (props.applyCount > 100) ? icon_show : icon_link }"></i>
                    { (props.applyCount > 100) ? `${props.applyCount}명` : `${props.regDate}` }
                </p>
            </div>
        </div>
    );
}

export default ArticleCard;