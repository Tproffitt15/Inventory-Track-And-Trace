import parties from "../data/parties.json";

function getNameFromAddress(address) {

    const party = parties.find(party => party.address === address);

    return party ? party.name : 'Not found';
}

export default getNameFromAddress;