import useAdmin from "./useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";

const RequireAdmin = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const admin = useAdmin(user);
  if (loading) {
    return;
  } else if (admin?.role === "admin") {
    return children;
  }
};

export default RequireAdmin;
