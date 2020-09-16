export const ARTICLE_SEARCH_REQUEST = 'ARTICLE_SEARCH_REQUEST';
export const ARTICLE_SEARCH_SUCCESS = 'ARTICLE_SEARCH_SUCCESS';
export const ARTICLE_SEARCH_FAILURE = 'ARTICLE_SEARCH_FAILURE';

export const articleSearchRequestAction = (categories) => {
    return {
        type: ARTICLE_SEARCH_REQUEST,
        data: {
            categories: categories
        }
    }
}
