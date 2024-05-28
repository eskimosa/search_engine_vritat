import React, { useState, useEffect, useCallback } from "react";
import DataTable from "./DataTable";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import OutboxIcon from "@mui/icons-material/Outbox";
import SendIcon from "@mui/icons-material/Send";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import DeleteIcon from "@mui/icons-material/Delete";

const NewsTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("Fetching news");
      const response = await axios.get("http://localhost:8000/api/list_news/");
      const filteredData = response.data.filter((article) => !article.deleted);
      setData(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
        setIsLoading(false);
      }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);



  const handleRefreshClick = async () => {
    fetchData();
  };

  const handlePostClick = (id) => {
    console.log(`Action clicked for row with ID: ${id}`);
  };

  const handleScheduleClick = (id) => {
    console.log(`Schedule clicked for row with ID: ${id}`);
  };

  const handleDeleteClick = async (index) => {
    const id = data[index].id;
    try {
      await axios.post("http://localhost:8000/api/delete_news/", {
        article_id: id,
      });
      console.log(`Article with ID ${id} marked as deleted`);
      await fetchData();
    } catch (error) {
      console.error("Error marking article as deleted:", error);
    }
  };

  const columns = [
    {
      field: "sentiment",
      headerName: "Sentiment",
      width: 100,
      align: "center",
    },
    { field: "published", headerName: "Published", width: 100 },
    { field: "category", headerName: "Category", width: 110, align: "center" },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: (params) => (
        <a
        href={params.row.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline hover:text-blue-700"
      >
          {params.value}
        </a>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <IconButton
            onClick={() => handlePostClick(params.row.id)}
            style={{ flex: 1 }}
          >
            <SendIcon />
          </IconButton>
          <IconButton
            onClick={() => handleScheduleClick(params.row.id)}
            style={{ flex: 1 }}
          >
            <ScheduleSendIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteClick(params.row.id)}
            style={{ flex: 1 }}
          >
            <DeleteIcon />
          </IconButton>
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
    <div style={{ width: "75%", margin: "0 auto" }}>
      <div style={{ textAlign: "right" }}>
        <IconButton
          onClick={handleRefreshClick}
          style={{
            fontWeight: "bold",
            fontSize: "large",
          }}
        >
          <CachedOutlinedIcon />
        </IconButton>
      </div>
      <div>
        <DataTable
          rows={rows}
          columns={columns}
          loading={!data.length}
          autoHeight
        />
      </div>
    </div>
  );
};

export default NewsTable;
