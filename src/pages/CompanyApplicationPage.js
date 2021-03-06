import React from "react";
import PropTypes from "prop-types";

import { MainMask } from "../components/HomePage/MainMask";
import useToggle from "../hooks/useToggle";

import ApplicationConfirmation from "../components/Apply/Company/ApplicationConfirmation";
import CenteredComponent from "../components/HomePage/CenteredComponent";
import CompanyApplicationForm from "../components/Apply/Company/CompanyApplicationForm";


const CompanyApplicationPage = ({ showConfirmation = false }) => {


    const [showConfirmationModal, toggleConfirmationModal] = useToggle(showConfirmation);

    return (
        <React.Fragment>
            <MainMask/>
            {showConfirmationModal ?
                <CenteredComponent>
                    <ApplicationConfirmation open={showConfirmationModal} />
                </CenteredComponent>
                :
                <CompanyApplicationForm toggleConfirmationModal={toggleConfirmationModal} />
            }
        </React.Fragment>
    );
};

export default CompanyApplicationPage;

CompanyApplicationPage.propTypes = {
    showConfirmation: PropTypes.bool,
};
