import React from "react";
import PropTypes from "prop-types";

import {
    TextField,
    InputAdornment,
    IconButton,
} from "@material-ui/core";

import { Close, MoreHoriz } from "@material-ui/icons";

const SearchBar = (props) => {

    const { searchValue, setSearchValue, className, handleAdvancedOptionsButtonClick, advancedOptions } = props;

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <TextField
            label="Search"
            name="search"
            margin="dense"
            value={searchValue}
            onChange={handleChange}
            className={className}
            InputProps={{
                "endAdornment":
    <InputAdornment position="end">
        <IconButton
            aria-label="Toggle Advanced Search"
            onClick={handleAdvancedOptionsButtonClick}
            color="secondary"
        >
            {advancedOptions ? <Close fontSize="small"/> : <MoreHoriz/>}
        </IconButton>
    </InputAdornment>,
            }}
        />
    );
};

SearchBar.propTypes = {
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    className: PropTypes.string,
    handleAdvancedOptionsButtonClick: PropTypes.func.isRequired,
    advancedOptions: PropTypes.bool.isRequired,
};

export default SearchBar;
