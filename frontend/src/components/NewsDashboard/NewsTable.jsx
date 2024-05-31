import React, { useState, useEffect, useCallback } from "react";
import DataTable from "../DataTable";
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
import { handleRefreshClick, handlePostClick, handleScheduleClick, handleDeleteClick, handleDateChange, handleScheduleSubmit, } from "./Handlers";
import ScheduleDialog from "./DateTimePicker";

const NewsTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedArticleId, setSelectedArticleId] = useState(null);

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
            onClick={() => handleScheduleClick(params.row.id, setSelectedArticleId, setOpen)}
            style={{ flex: 1 }}
          >
            <ScheduleSendIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteClick(params.row.id, fetchData)}
            style={{ flex: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = data.map((item, index) => ({
    id: data[index].id,
    sentiment: item.sentiment,
    published: item.published,
    category: item.category,
    title: item.title,
    link: item.link,
    scheduled: item.scheduled_time,
  }));

  return (
    <div style={{ width: "75%", margin: "0 auto" }}>
      <div style={{ textAlign: "right" }}>
        <IconButton
          onClick={() => handleRefreshClick(fetchData)}
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
      <ScheduleDialog
        open={open}
        selectedDate={selectedDate}
        onDateChange={(date) => handleDateChange(date, setSelectedDate)}
        onCancel={() => setOpen(false)}
        onSubmit={() => handleScheduleSubmit(selectedArticleId, selectedDate, setOpen, fetchData)}
      />
    </div>
  );
};

export default NewsTable;
