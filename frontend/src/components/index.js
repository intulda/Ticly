import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import MenuLayout from "./main/MenuLayout";
import '../css/bootstrap.css';
import {configureStore} from '../store/configureStore'
import withReduxSaga from 'redux-saga';

const Home = () => {
    const store = configureStore();
    return (
        <Provider store={store}>
            <MenuLayout>
                <h1>기본 컨텐츠</h1>
            </MenuLayout>
        </Provider>
    )
}

export default withReduxSaga(Home);

ReactDOM.render(<Home/>, document.querySelector('#root'));