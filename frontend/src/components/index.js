import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import MenuLayout from "./main/MenuLayout";
import FindArticle from "./articleBoard/FindArticle";
import '../css/bootstrap.css';
import {configureStore} from '../store/configureStore'
import withReduxSaga from 'redux-saga';

const Home = () => {
    const store = configureStore();
    return (
        <Provider store={store}>
            <MenuLayout>
                <FindArticle/>
            </MenuLayout>
        </Provider>
    )
}

export default withReduxSaga(Home);

ReactDOM.render(<Home/>, document.querySelector('#root'));