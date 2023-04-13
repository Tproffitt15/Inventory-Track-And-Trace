import styles from "./CustReturnOrder.module.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import partiesData from "data/parties.json"
import { uploadJSONToIPFS } from "../pinata";
import OrderJSON from "../order.json";

import IncomingOrderTable from "components/IncomingOrderTable";

const CustReturnOrder = () => {

    const [drugs, setDrugs] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState("");
    const [selectedDistributor, setSelectedDistributor] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");

    const orderData = {
        "order_number": 1,
        "issue_date": "22/12/22",
        "expected_date": "23/01/22",
        "manufacturer": "Cardinal Health",
        "customer": "Miami Uni",
        "tracking_number": "12984791",
        "tracking_URL": "tracking_URL.com",
        "status": "completed"
    };

    useEffect(() => {
        // Call the OpenFDA API to get the list of drugs
        axios
            .get("https://api.fda.gov/drug/label.json?count=openfda.brand_name.exact&limit=200")
            .then((response) => {
                const results = response.data.results.map(result => result.term);
                // console.log(results);
                results.sort();
                setDrugs(results);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const handleDrugChange = (selectedDrug) => {
        setSelectedDrug(selectedDrug);
    };

    const drugOptions = drugs.map((result) => ({
        label: result,
        value: result,
    }));

    const handleDistributorChange = (selectedDistributor) => {
        setSelectedDistributor(selectedDistributor);
    };

    const handleCustomerChange = (selectedCustomer) => {
        setSelectedCustomer(selectedCustomer);
    };

    const partiesOptions = partiesData.map((result) => ({
        label: result.name,
        value: result.address
    }));


    const handleFormSubmit = async (event) => {
        event.preventDefault(); // prevent the default form submission behavior

        // get the form field values
        const drug = selectedDrug;
        const distributor = selectedDistributor;
        const customer = selectedCustomer;
        const deliveryDate = event.target.elements.deliveryDate.value;
        const quantity = event.target.elements.quantity.value;

        // do something with the form data, e.g. send it to the server

        const order1 = { drug, distributor, customer, deliveryDate };
        console.log(order1);
        const order = {
            name: `${customer.label}'s ${drug.label} Order`,
            description: `${customer.label} order ${quantity} of ${drug.label} from ${distributor.label}`,
            estimatedDate: deliveryDate,
            quantity: quantity
        };
        // const addresses = [walletAddress1, walletAddress2, walletAddress3];
        // const metadataURL = await uploadMetadataToIPFS(order);

        // // console.log(metadataURL);
        // mintOrderNFT(metadataURL, [distributor.value, customer.value]);
        // setPinataURL(metadataURL);
    };


    return (
        <div className="container">
            <h1>Create A Return Order</h1>
            <div className={styles.content}>
                <IncomingOrderTable orderData={orderData} />
            </div>
            <div className={styles.buttonGroup}>
                <button id="submitButton" className={styles.button}>Cancel</button>
                <button type="submit" id="submitButton" className={styles.button}>Create Order</button>
            </div>

            {/* {pinataURL && (
                <div id="upload-success">
                    Order metadata uploaded to IPFS: <a href={pinataURL}>{pinataURL}</a>
                </div>
            )} */}
        </div>

    );
};

export default CustReturnOrder;