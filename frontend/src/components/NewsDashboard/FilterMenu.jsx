import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { handleFilterClick } from "./Handlers";

const FilterMenu = ({ setFilterCondition }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (filterType) => {
        handleFilterClick(filterType, setFilterCondition);
        handleMenuClose();
    };

    
    return (
        <div>
      <IconButton onClick={handleMenuClick}>
        <FilterListIcon />
      </IconButton>
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
                <MenuItem onClick={() => handleMenuItemClick("today")} className="px-3 py-2">Today's News</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("2_days")} className="px-3 py-2">News of the past 2 Days</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("3_days")} className="px-3 py-2">News of the past 3 Days</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("1_week")} className="px-3 py-2">News of the past Week</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("clear_filter")} className="px-3 py-2">Clear Filter</MenuItem>
            </Menu>
        </div>
    );
};

export default FilterMenu;


