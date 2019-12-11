import React from "react";
import { SearchArea, mapDispatchToProps, mapStateToProps } from "./SearchArea";
import { setSearchValue, setJobDuration, setJobType } from "../../../actions/searchOffersActions";
import SearchBar from "./SearchBar";
import SubmitSearchButton from "./SubmitSearchButton";

import {
    Paper,
    TextField,
    Collapse,
    Fab,
    createMuiTheme,
    ThemeProvider,
} from "@material-ui/core";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import AdvancedSearchMobile from "./AdvancedSearch/AdvancedSearchMobile";
import { mountWithStore, mountWithTheme } from "../../../test-utils";

describe("SearchArea", () => {
    let onSubmit;
    const theme = createMuiTheme();
    beforeEach(() => {
        onSubmit = jest.fn();
    });

    describe("render", () => {
        it("should render a paper", () => {
            expect(
                mountWithTheme(
                    <SearchArea onSubmit={onSubmit} />,
                    theme
                ).find(Paper).exists()
            ).toBe(true);
        });

        it("should render a form", () => {
            expect(mountWithTheme(
                <SearchArea onSubmit={onSubmit} />,
                theme
            ).find("form").first().prop("id")).toEqual("search_form");
        });

        it("should render a SearchBar", () => {
            const searchBar = mountWithTheme(
                <SearchArea onSubmit={onSubmit} />,
                theme
            ).find(SearchBar).first();
            expect(searchBar.exists()).toBe(true);
        });

        it("should render an Advanced Search Area", () => {
            const wrapper = mountWithTheme(
                <SearchArea onSubmit={onSubmit} />,
                theme
            );
            expect(wrapper.find(AdvancedSearch).exists() || wrapper.find(AdvancedSearchMobile).exists()).toBe(true);
        });

        it("should render a SearchButton", () => {
            const searchArea = mountWithTheme(
                <SearchArea onSubmit={onSubmit} />,
                theme
            );
            const button = searchArea.find(SubmitSearchButton).first();
            expect(button.exists()).toBe(true);
        });
    });

    describe("interaction", () => {
        it("should call onSubmit callback on form submit", () => {
            const addSnackbar = () => {};
            const searchOffersMock = jest.fn();
            const form = mountWithTheme(
                <SearchArea
                    onSubmit={onSubmit}
                    addSnackbar={addSnackbar}
                    searchOffers={searchOffersMock}
                />,
                theme
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

            const wrapper = mountWithTheme(
                <SearchArea
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    searchOffers={searchOffers}
                    addSnackbar={addSnackbar}
                    onSubmit={onSubmit}
                />,
                theme
            );
            wrapper.find(Fab).simulate("click", { e: { preventDefault: () => {} } });

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
                    jobDuration: [1, 2],
                },
            };
            expect(mapStateToProps(mockState)).toEqual({
                searchValue: "searchValue",
                jobType: "jobType",
                minJobDuration: 1,
                maxJobDuration: 2,
            });
        });

        it("should mapDispatchToProps", () => {
            const dispatch = jest.fn();
            const props = mapDispatchToProps(dispatch);

            props.setSearchValue("searchValue");
            expect(dispatch).toHaveBeenCalledWith(setSearchValue("searchValue"));

            props.setJobDuration(null, [1, 2]);
            expect(dispatch).toHaveBeenCalledWith(setJobDuration(1, 2));

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
