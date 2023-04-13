import { useState, useEffect } from "react";
import parties from "../data/parties.json";

export const useGetUserRole = (address) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const user = parties.find((party) => party.address === address);
        setUserRole(user ? user.role : null);
    }, [address]);

    return userRole;
};

