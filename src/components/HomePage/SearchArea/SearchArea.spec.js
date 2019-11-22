import React from "react";
import { SearchArea, mapDispatchToProps, mapStateToProps } from "./SearchArea";
import { addSnackbar } from "../../../actions/notificationActions";
import { setSearchValue, setJobDuration, setJobType, resetAdvancedSearchFields } from "../../../actions/searchOffersActions";
import SearchBar from "./SearchBar";
import SubmitSearchButton from "./SubmitSearchButton";

import {
    FormControl,
    Paper,
    TextField,
    Collapse,
    Fab,
} from "@material-ui/core";
import { mockDateNow, mockRandomMath } from "../../../../testUtils";
import { INITIAL_JOB_TYPE, INITIAL_JOB_DURATION } from "../../../reducers/searchOffersReducer";

describe("SearchArea", () => {
    let onSubmit;
    beforeEach(() => {
        onSubmit = jest.fn();
    });

    describe("render", () => {
        it("should render a paper", () => {
            expect(shallow(<SearchArea onSubmit={onSubmit} />).find(Paper).exists()).toBe(true);
        });

        it("should render a form", () => {
            expect(shallow(<SearchArea onSubmit={onSubmit} />).find("form").first().prop("id")).toEqual("search_form");
        });

        it("should render a SearchBar", () => {

            const searchBar = shallow(<SearchArea onSubmit={onSubmit} />).find(SearchBar).first();
            expect(searchBar.exists()).toBe(true);
        });

        it("should render a Collapse", () => {
            expect(shallow(<SearchArea onSubmit={onSubmit} />).find(Collapse).first().prop("in")).toBe(false);
        });

        it("should contain a TextField with 'job_type' id", () => {
            expect(shallow(<SearchArea onSubmit={onSubmit} />).find(TextField).first().prop("id")).toEqual("job_type");
        });

        it("should contain a FormControl", () => {
            expect(
                shallow(<SearchArea onSubmit={onSubmit} />)
                    .find(FormControl).exists()
            ).toBe(true);
        });
    });

    describe("interaction", () => {
        it("should call onSubmit callback on form submit", () => {
            const addSnackbar = () => {};
            const searchOffersMock = jest.fn();
            const form = shallow(
                <SearchArea
                    onSubmit={onSubmit}
                    addSnackbar={addSnackbar}
                    searchOffers={searchOffersMock}
                />
            ).find("form#search_form").first();

            form.simulate("submit", {
                preventDefault: () => {},
            });
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(searchOffersMock).toHaveBeenCalledTimes(1);
        });

        it("should call searchOffers and onSubmit callback on search button click", () => {
            const searchValue = "test";
            const setSearchValue = () => {};

            const searchOffers = jest.fn();
            const onSubmit = jest.fn();
            const addSnackbar = () => {};

            const wrapper = mount(
                <SearchArea
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    searchOffers={searchOffers}
                    addSnackbar={addSnackbar}
                    onSubmit={onSubmit}
                />
            );
            wrapper.find(Fab).first().simulate("click", { e: { preventDefault: () => {} } });

            expect(searchOffers).toHaveBeenCalledTimes(1);
            expect(onSubmit).toHaveBeenCalledTimes(1);
        });
    });

    describe("redux", () => {
        it("should mapStateToProps", () => {
            const mockState = {
                offerSearch: {
                    searchValue: "searchValue",
                    jobType: "jobType",
                    jobDuration: "jobDuration",
                },
            };
            expect(mapStateToProps(mockState)).toEqual({
                searchValue: "searchValue",
                jobType: "jobType",
                jobDuration: "jobDuration",
            });
        });

        it("should mapDispatchToProps", () => {

            const RANDOM_VALUE = 0.5;
            const DATE_NOW = 1;

            const originalMathObj = mockRandomMath(RANDOM_VALUE);
            const originalDateNowFn = mockDateNow(DATE_NOW);

            const dispatch = jest.fn();
            const props = mapDispatchToProps(dispatch);
            props.addSnackbar({ message: "message" });
            expect(dispatch).toHaveBeenCalledWith(addSnackbar({
                message: "message",
            }));

            global.Math = originalMathObj;
            Date.now = originalDateNowFn;

            props.setSearchValue("searchValue");
            expect(dispatch).toHaveBeenCalledWith(setSearchValue("searchValue"));

            props.setJobDuration(null, 2);
            expect(dispatch).toHaveBeenCalledWith(setJobDuration(2));

            const jobType = {
                target: {
                    value: "jobType",
                },
            };

            props.setJobType(jobType);
            expect(dispatch).toHaveBeenCalledWith(setJobType("jobType"));

        });
    });
});
