import axios from "axios";

export const handleRefreshClick = async (fetchData) => {
    fetchData();
  };

export const handlePostClick = (id) => {
    console.log(`Action clicked for row with ID: ${id}`);
  };

export const handleScheduleClick = async (id, setSelectedArticleId, setOpen) => {
    setSelectedArticleId(id);
    setOpen(true);
  };

export const handleDateChange = (date, setSelectedDate) => {
    setSelectedDate(date);
  };

export const handleScheduleSubmit = async (selectedArticleId, selectedDate, setOpen, fetchData) => {
    try {
      await axios.post("http://localhost:8000/api/schedule_post/", {
        article_id: selectedArticleId,
        scheduled_time: selectedDate.toISOString(),
      });
      console.log(`Article with ID ${selectedArticleId} scheduled for ${selectedDate}`);
      setOpen(false);
      await fetchData();
    } catch (error) {
      console.error("Error scheduling article:", error);
    }
  };

export const handleDeleteClick = async (id, fetchData) => {
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