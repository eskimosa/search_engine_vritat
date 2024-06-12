import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { handleBulkArchiveClick } from "./Handlers";
import IconButton from "@mui/material/IconButton";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import ArchiveIcon from '@mui/icons-material/Archive';


const ArchiveMenu = ({ fetchData, anchorEl, setAnchorEl }) => {

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = async (archiveType) => {
        await handleBulkArchiveClick(archiveType, fetchData);
        handleMenuClose();
    };

    return (
        <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            borderRadius: "8px",
            marginTop: "8px",
          },
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick("1_week")} className="px-3 py-2">Older than 1 week</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("3_days")} className="px-3 py-2">Older than 3 days</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("1_day")} className="px-3 py-2">Older than 1 day</MenuItem>
      </Menu>
    );
  };

export default ArchiveMenu;