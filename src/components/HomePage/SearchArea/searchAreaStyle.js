/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    searchArea: {
        padding: "1em 3em 3em 3em",
        position: "relative",
        "& > form": {
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "1fr auto",
            alignItems: "center",
            gridGap: "1em",
        },
    },
    searchBar: {
        gridColumn: 1,
    },
    advancedSearchContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr",
        alignItems: "center",
        gridGap: "1em",
    },
    jobTypeSelector: {
        gridColumn: 1,
    },
    advancedSearchBtnWrapper: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        bottom: "-2em",
        left: 0,
    },
}));