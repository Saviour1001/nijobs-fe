import { API_HOSTNAME } from "../index";
import {
    setCompanyApplication,
    setCompanyApplicationSending,
    setCompanyApplicationSubmissionError,
} from "../actions/companyApplicationActions";


export const submitCompanyApplication = (formData) => async (dispatch) => {
    dispatch(setCompanyApplicationSending(true));

    try {
        // CHANGE THIS TO USE HOSTNAME
        const res = await fetch(`${API_HOSTNAME}/apply/company`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Accept": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const json = await res.json();

        if (!res.ok) {
            dispatch(setCompanyApplicationSubmissionError(json.errors));
            dispatch(setCompanyApplicationSending(false));
            // TODO count metrics
            return;
        }

        dispatch(setCompanyApplication(json));

        dispatch(setCompanyApplicationSending(false));
        // TODO count metrics

    } catch (error) {
        dispatch(setCompanyApplicationSubmissionError({
            error,
        }));
        dispatch(setCompanyApplicationSending(false));
        // TODO count metrics
    }
};

export const parseSearchFiltersToURL = (filters) => Object.keys(filters).map((key) => `${key}=${filters[key]}`).join("&");
