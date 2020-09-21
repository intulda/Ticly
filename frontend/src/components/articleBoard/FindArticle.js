import React from 'react';

import CardSection from './CardSection';
import CategoryTab from './CategoryTab';

const FindArticle = () => {
    return (
        <div className="container container-xxl ticly__basic-content-layout">

            {/* Content Header Section*/}
            <div className="findArticle__header">
                {/* Category tab */}
                <CategoryTab/>

                {/* Search Bar */}
            </div>

            {/* Last learning Article Section */}

            {/* New article section */}
            <CardSection
                sectionSubTitle={'아티클 배달 왔습니다!'}
                sectionTitle={'새로운 아티클'}
                sectionPath={'findLatestMyTypeArticle'}
            />

             {/*popular article section*/}
            <CardSection
                sectionSubTitle={'꼭 읽어보세요!'}
                sectionTitle={'필독 아티클'}
                sectionPath={'findPopularMyTypeArticle'}
            />
        </div>
    );
}

export default FindArticle;
