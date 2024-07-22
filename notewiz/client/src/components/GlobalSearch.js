// src/components/GlobalSearch.js

import React, { useState, useEffect } from 'react';
import initialDetails from '../data/initialDetails';
import Scroll from './Scroll';
import SearchList from './SearchList';
import axios from 'axios'
import './GlobalSearch.css'

function GlobalSearch() {
    const [details, setDetails] = useState([]);
    const [searchField, setSearchField] = useState('');



    useEffect(() => {
        async function retrieveNotes() {
            try {
                const response = await axios.post("http://localhost:8000/GlobalSearch", {}, {withCredentials: true});
                setDetails(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        retrieveNotes();
    }, []); // 空依赖数组表示这个效果只在组件挂载时运行一次


    const filteredNotes = details.filter(
        note => {
            return (
                note.title.toLowerCase().includes(searchField.toLowerCase()) ||
                note.content.toLowerCase().includes(searchField.toLowerCase()) ||
                note.owner.toLowerCase().includes(searchField.toLowerCase())
            );
        }
    );

    const handleChange = e => {
        setSearchField(e.target.value);
    };

    function searchList() {
        return (
            <Scroll>
                <SearchList filteredNotes={filteredNotes} />
            </Scroll>
        );
    }

    return (
        <div className='Global'>
            <div className="main-content">
                <section className="note-section">
                    <div className="header">
                        <h2 className="title">Search Public Notes</h2>
                    </div>
                    <div className="search-container">
                        <input
                            className="search-input"
                            type="search"
                            placeholder="Search Notes"
                            onChange={handleChange}
                        />
                    </div>
                    {searchList()}
                </section>
            </div>
        </div>
    );

}

export default GlobalSearch;