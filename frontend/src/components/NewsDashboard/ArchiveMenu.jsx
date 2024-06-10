import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { handleBulkArchiveClick } from "./Handlers";


const ArchiveMenu = ({ fetchData }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = async (archiveType) => {
        await handleBulkArchiveClick(archiveType, fetchData);
        handleMenuClose();
    };

    return (
        <div className="flex items-center justify-end mr-8">
            <Button onClick={handleMenuClick} variant="contained"
                style={{ backgroundColor: "#B96663", color: "white", borderRadius: "9999px", padding: "6px 12px"}}
            >
                Archive News
            </Button>
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
        </div>
    );
};

export default ArchiveMenu;