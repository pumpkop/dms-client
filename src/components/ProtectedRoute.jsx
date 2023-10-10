import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import {auth} from "../../firebase.client.js";

export default function ProtectedRoute({children}) {
    const user = auth.currentUser;
    console.log(user)
    if(!user){
        return <Navigate to="/login" />
    }
    return children
}

ProtectedRoute.propTypes = {
    children : PropTypes.element.isRequired
}