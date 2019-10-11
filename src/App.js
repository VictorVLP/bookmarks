import React from 'react';
import './App.css';

import BookmarksView from "./components/Bookmarks/BookmarksView.js"

function App() {

    return (
    <div className='container'>
    	<h1>Bookmarks App</h1>
	        <BookmarksView />
    </div>
    )
}

export default App
