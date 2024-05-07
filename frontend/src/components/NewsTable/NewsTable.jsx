import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable/DataTable';
import axios from 'axios';
import Link from '@mui/material/Link';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';



const NewsTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("fetching data")
                const response = await axios.get('http://localhost:8000/api/list_news/');
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchData();
    }, []);

    const handlePostClick = (id) => {
       
        console.log(`Action clicked for row with ID: ${id}`);
    };

    const handleScheduleClick = (id) => {

        console.log(`Schedule clicked for row with ID: ${id}`);
    };

    const columns = [
        {field: 'sentiment', headerName: 'Sentiment', width: 150},
        {field: 'published', headerName: 'Published', width: 150},
        {field: 'category', headerName: 'Category', width: 150},
        {
            field: 'title',
            headerName: 'Title',
            width: 600,
            renderCell: (params) => (
                <a href={params.row.link} target="_blank" rel="noopener">
                    {params.value}
                </a>
            ),
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 400,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handlePostClick(params.row.id)}
                        style={{ marginRight: 8 }}
                    >
                        Publish Now
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleScheduleClick(params.row.id)}
                    >
                        Schedule
                    </Button>
                </div>
            ),
        },
    ];

    const rows = data.map((item, index) => ({
        id: index,
        sentiment: item.sentiment,
        published: item.published,
        category: item.category,
        title: item.title,
        link: item.link,

    }));
    
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataTable 
                rows = {rows}
                columns = {columns}
                loading = {!data.length}
                autoHeight
            />
        </div>
    );
};

export default NewsTable;

