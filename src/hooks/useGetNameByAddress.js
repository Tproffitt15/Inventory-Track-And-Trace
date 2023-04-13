import { useState, useEffect } from "react";
import parties from "../data/parties.json";

export function useGetNameByAddress(address) {
    const [name, setName] = useState("");

    useEffect(() => {
        const foundParty = parties.find((party) => party.address === address);
        if (foundParty) {
            setName(foundParty.name);
        }
    }, [address]);

    return name;
}
