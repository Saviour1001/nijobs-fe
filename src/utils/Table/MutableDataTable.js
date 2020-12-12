import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { RowPropTypes } from "./PropTypes";
import { ApplicationStateLabel } from "../../components/Review/Applications/ApplicationsReviewTableSchema";
import { format } from "date-fns";

const MutableDataTable = ({ rows: initialRows, tableType: Table, setInitialRows, ...props }) => {
    const [rows, setRows] = useState(() => initialRows);

    const approveApplicationRow = useCallback(({ key, fields }) => {

        setInitialRows((rows) => ({
            ...rows,
            [key]: {
                ...rows[key],
                fields: { ...fields, state: { value: ApplicationStateLabel.APPROVED } },
            } }));
    }, [setInitialRows]);

    const rejectApplicationRow = useCallback(({ key, fields, payload }, rejectReason) => {

        setInitialRows((rows) => ({
            ...rows,
            [key]: {
                ...rows[key],
                fields: { ...fields, state: { value: ApplicationStateLabel.REJECTED } },
                payload: {
                    ...payload,
                    rejectReason,
                    rejectedAt: format(Date.now(), "yyyy-MM-dd"),
                },
            } }));
    }, [setInitialRows]);

    return (
        <Table
            key={JSON.stringify(initialRows).substring(0, 20)}
            initialRows={initialRows}
            rows={rows}
            setRows={setRows}
            RowActionsProps={{
                approveApplicationRow,
                rejectApplicationRow,
            }}
            {...props}
        />

    );
};

MutableDataTable.propTypes = {
    rows: PropTypes.objectOf(RowPropTypes),
    setInitialRows: PropTypes.func.isRequired,
    tableType: PropTypes.elementType,
};

export default MutableDataTable;
