import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import MenuLayout from "./main/MenuLayout";
import '../css/bootstrap.css';

const Home = () => {
    return (
        <>
            <MenuLayout>
                <h1>기본 컨텐츠 </h1>
            </MenuLayout>
        </>
    )
}

export default Home;

ReactDOM.render(<Home/>, document.querySelector('#root'));