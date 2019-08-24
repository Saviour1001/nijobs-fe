import React, { useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { addSnackbar } from "../../../actions/notificationActions";

import useToggle from "../../../hooks/useToggle";

import JOB_TYPES from "./jobTypes";

import {
    FormControl,
    Typography,
    Paper,
    Slider,
    TextField,
    MenuItem,
    Collapse,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import searchAreaStyle from "./SearchArea.module.css";

import SearchBar from "./SearchBar";
import ShowAdvancedOptionsButton from "./ShowAdvancedOptionsButton";
import SliderValueTooltip from "./SliderValueTooltip";

const INITIAL_JOB_TYPE = "";
const INITIAL_JOB_DURATION = 1;

const useStyles = makeStyles({
    wrapperInner: {
        display: "grid",
        "grid-template-columns": "1fr 1fr",
        "grid-template-rows": "1fr",
        "align-items": "center",
        "grid-gap": "1em",
    },
});

export const SearchArea = (props) => {

    const { addSnackbar, onSubmit } = props;
    const classes = useStyles();

    // Set initial form values
    const [searchValue, setSearchValue] = useState("");
    const [advancedOptions, toggleAdvancedOptions] = useToggle(false);
    const [jobType, setJobType] = useState(INITIAL_JOB_TYPE);
    const [jobDuration, setJobDuration] = useState(INITIAL_JOB_DURATION);

    const handleAdvancedOptionsButtonClick = () => {
        if (advancedOptions) {
            resetAdvancedFields();
        }
        toggleAdvancedOptions();
    };

    const resetAdvancedFields = () => {
        setJobType(INITIAL_JOB_TYPE);
        setJobDuration(INITIAL_JOB_DURATION);
    };

    const submitForm = (e) => {
        e.preventDefault();

        addSnackbar({
            // mind the jobType.value || '' when passing value to api,
            // because for simple search, the initial jobType value will be an empty string, which has no atrribute .value
            message: `Search for: ${searchValue} :: Job type: ${jobType || ""} :: Job Duration: ${jobDuration}`,
            options: {
                variant: "info",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
            },
        });

        onSubmit();
    };

    const updateJobDuration = (_, val) => {
        setJobDuration(val);
    };

    const updateJobType = (value) => {
        setJobType(value.target.value);
    };

    return (
        <Paper
            className={searchAreaStyle.searchArea}
            elevation={8}
        >
            <form
                onSubmit={submitForm}
                autoComplete="off"
                id={"search_form"}
            >
                <SearchBar
                    className={searchAreaStyle.searchBar}
                    submitSearchForm={submitForm}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <Collapse
                    in={advancedOptions}
                    classes={{
                        wrapperInner: classes.wrapperInner,
                    }}
                >
                    <TextField
                        id="job_type"
                        select
                        label="Job Type"
                        className={searchAreaStyle.jobTypeSelector}
                        value={jobType}
                        onChange={updateJobType}
                        helperText="Please select your job type"
                    >
                        {JOB_TYPES.map(({ value, label }) => (
                            <MenuItem
                                key={value}
                                value={value}
                            >
                                {label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormControl
                        className={searchAreaStyle.durationSlider}
                    >
                        <Typography
                            id="duration-label"
                            variant="body2"
                        >
                            Job Duration
                        </Typography>
                        <Slider
                            valueLabelDisplay="auto"
                            value={jobDuration}
                            ValueLabelComponent={SliderValueTooltip}
                            name="jobDuration"
                            min={1}
                            max={12}
                            step={1}
                            onChange={updateJobDuration}
                        />
                    </FormControl>
                </Collapse>
            </form>
            <ShowAdvancedOptionsButton
                onClick={handleAdvancedOptionsButtonClick}
                isOpen={advancedOptions}
            />
        </Paper>
    );
};

SearchArea.propTypes = {
    addSnackbar: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
};

export const mapStateToProps = () => ({
});

export const mapActionsToProps = { addSnackbar };

export default connect(mapStateToProps, mapActionsToProps)(SearchArea);
