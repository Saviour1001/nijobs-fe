import React from "react";
import PropTypes from "prop-types";
import { Link as ReactRouterLink, Route, Redirect, useLocation  } from "react-router-dom";
import { Link, LinearProgress } from "@material-ui/core";
import useSession from "../hooks/useSession";

export const smoothScrollToRef = (ref) => {

    if (!ref || !ref.current) return;

    ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
};

export const capitalize = (str) => {
    if (typeof str !== "string") throw new Error("Trying to capitalize non string object: ", str);

    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const Wrap = ({ Wrapper, on, children }) => (
    <>
        {on ?
            <Wrapper>
                {children}
            </Wrapper>
            :
            <>
                { children }
            </>
        }
    </>
);

Wrap.propTypes = {
    Wrapper: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    children: PropTypes.element.isRequired,
    on: PropTypes.bool.isRequired,
};


export const RouterLink = ({ to, children, ...props }) => {
    const renderLink = React.useMemo(
        () =>
            // eslint-disable-next-line react/display-name
            React.forwardRef((linkProps, ref) => (
                <ReactRouterLink innerRef={ref} to={to} {...linkProps} />
            )),
        [to],
    );

    return (
        <Link component={renderLink} {...props}>
            {children}
        </Link>
    );
};

RouterLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};

/**
 *
 * Only allows this route to be accessed when logged in.
 * Additionally, if an `authorize` function is given, it must return true for the route to accessable
 * The authorize function receives the logged in user details as an object
 */
export const ProtectedRoute = ({ authorize, unauthorizedRedirectPath, children, ...routeProps }) => {
    const { isValidating, isLoggedIn, data } = useSession();

    const location = useLocation();
    return (
        <Route
            {...routeProps}
        >
            {data === null || isValidating ?
                <LinearProgress /> :
                <>
                    {isLoggedIn && authorize && authorize(data) ?
                        children
                        :
                        <Redirect
                            to={{
                                pathname: unauthorizedRedirectPath,
                                state: { from: location },
                            }}
                        />
                    }
                </>
            }
        </Route>
    );
};

ProtectedRoute.propTypes = {
    /**
     * The component to be rendered if the user is authenticated and authorized
     */
    children: PropTypes.element.isRequired,
    /**
     * A function that receives the currently logged in user data and
     * should return true if it is authorized to view the contents of the route, or a falsy value otherwise
     */
    authorize: PropTypes.func,
    /**
     * The path for which the site redirects in case the user can't access this route
     */
    unauthorizedRedirectPath: PropTypes.string.isRequired,
};
