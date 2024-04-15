import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable/DataTable';
import axios from 'axios';

const columns = [
    {field: 'category', headerName: 'Category', width: 150},
    {field: 'title', headerName: 'Title', width: 150},
    {field: 'summary', headerName: 'Summary', width: 150},
    {field: 'content', headerName: 'Content', width: 150},
    {field: 'published', headerName: 'Published', width: 150},
    {field: 'link', headerName: 'Link', width: 150},
    {field: 'sentiment', headerName: 'Sentiment', width: 150},
];

const NewsTable = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        console.log("fetching data")
        const response = await axios.get('http://localhost:8000/api/news/');
        setData(response.data);
        } catch (error) {
        console.error('Error fetching news:', error);
        }
    };

    const rows = data.map((item, index) => ({
        id: index,
        category: item.category,
        title: item.title,
        summary: item.summary,
        content: item.content,
        published: item.published,
        link: item.link,
        sentiment: item.sentiment,
    }));
    
    return (
        <DataTable 
            rows = {data}
            columns = {columns}
            loading = {!data.length}

        />
    );
};

export default NewsTable;

