import React from "react";
import { Card, CardHeader, CardContent, CardActions, Link, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    content: {
        textAlgin: "justify",
    },
    actions: {
        margin: theme.spacing(1),
    },
    secondText: {
        marginTop: theme.spacing(2),
    },
}));

const ApplicationConfirmation = () => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader title="Application Submitted" />
            <CardContent className={classes.content}>
                <Typography variant="body2">
                    Application Submitted, you should receive a confirmation email shortly. If not, please contact us:
                    {" "}
                    <Link color="secondary" href="mailto:ni@aefeup.pt">ni@aefeup.pt</Link>
                </Typography>
                <Typography variant="body2" className={classes.secondText}>
                    {"Once you're approved, you will receive an email, and then you can log into NiJobs! "}
                    Do not forget your password, you will need it on the first login.
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Link
                    href="/"
                >
                Go to Homepage
                </Link>
            </CardActions>
        </Card>
    );
};

export default ApplicationConfirmation;
