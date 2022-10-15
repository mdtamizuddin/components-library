import { useEffect, useState } from "react";
import api from "./instance";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    if (user) {
      api.get(`/api/members/${user.email}`).then((res) => setAdmin(res.data));
    }
  }, [user]);
  return admin;
};

export default useAdmin;
