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
      await axios.post(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/schedule_post/`, {
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
      await axios.post(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/delete_news/`, {
        article_id: id,
      });
      console.log(`Article with ID ${id} marked as deleted`);
      await fetchData();
    } catch (error) {
      console.error("Error marking article as deleted:", error);
    }
  };

  export const handleSingleArchiveClick = async (id, fetchData) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/archive_article/`, {
        article_id: id,
      });
      console.log(`Article with ID ${id} marked as archived`);
      await fetchData();
    } catch (error) {
      console.error("Error marking article as archived:", error);
    }
};

export const handleBulkArchiveClick = async (archiveType, fetchData) => {
  try {
    await axios.post(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/archive_news/`, {
      archive_type: archiveType,
    });
    console.log(`Archived news older than ${archiveType}`);
    await fetchData();
  } catch (error) {
    console.error("Error archiving news:", error);
}
};

export const handleFilterClick = (filterType, setFilterCondition) => {
  const now = new Date();
  now.setHours(23, 59, 59, 999);  // End of today

  let filterFunction;

  switch (filterType) {
      case "today":
          filterFunction = (article) => {
              const publishedDate = new Date(article.published);
              return !article.archived && !article.deleted && publishedDate.toDateString() === now.toDateString();
          };
          break;
      case "2_days":
          filterFunction = (article) => {
              const publishedDate = new Date(article.published);
              const twoDaysAgo = new Date(now);
              twoDaysAgo.setDate(now.getDate() - 1);
              twoDaysAgo.setHours(0, 0, 0, 0); // Start of two days ago
              return !article.archived && !article.deleted && publishedDate >= twoDaysAgo && publishedDate <= now;
          };
          break;
      case "3_days":
          filterFunction = (article) => {
              const publishedDate = new Date(article.published);
              const threeDaysAgo = new Date(now);
              threeDaysAgo.setDate(now.getDate() - 2);
              threeDaysAgo.setHours(0, 0, 0, 0); // Start of three days ago
              return !article.archived && !article.deleted && publishedDate >= threeDaysAgo && publishedDate <= now;
          };
          break;
      case "1_week":
          filterFunction = (article) => {
              const publishedDate = new Date(article.published);
              const oneWeekAgo = new Date(now);
              oneWeekAgo.setDate(now.getDate() - 6);
              oneWeekAgo.setHours(0, 0, 0, 0); // Start of one week ago
              return !article.archived && !article.deleted && publishedDate >= oneWeekAgo && publishedDate <= now;
          };
          break;
      case "clear_filter":
          filterFunction = (article) => !article.archived && !article.deleted; // Default filter condition
          break;
      default:
          filterFunction = (article) => !article.archived && !article.deleted;
  }

  setFilterCondition(() => filterFunction);
};