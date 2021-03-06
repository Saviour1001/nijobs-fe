import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import { useDesktop } from "../../utils/media-queries";


const useStyle = makeStyles((theme) => ({
    maskWrapper: {
        height: "100vh",
        width: "100vw",
        position: "absolute",
        zIndex: -1,
        top: 0,
    },
    mainMask: ({ isMobile }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50%",
        width: "100%",
        backgroundColor: theme.palette.primary.main,

        // Only cut on desktop
        clipPath: !isMobile && "polygon(25vw 50vh, 50vh 50vh, 75vw 50vh, 100vw 40vh, 100vw 0vh, 0vw 0vh, 0vw 40vh)",
    }),
}));

export const MainMask = ({ children }) => {
    const classes = useStyle({ isMobile: !useDesktop() });
    return (
        <div className={classes.maskWrapper}>
            <div className={classes.mainMask}>
                {children}
            </div>
        </div>
    );
};

MainMask.propTypes = {
    children: PropTypes.element,
};
