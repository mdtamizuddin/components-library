
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../../pages/user/login";
import auth from "./firebase.init";

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return;
    } else if (user) {
        return children;
    }
    else {
        return <Login />
    }
};

export default RequireAuth;
