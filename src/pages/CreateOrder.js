import styles from "./CreateOrder.module.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import partiesData from "data/parties.json"
import { uploadJSONToIPFS } from "../pinata";
import OrderJSON from "../order.json";

const CreateOrder = () => {

    const [drugs, setDrugs] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState("");
    const [selectedDistributor, setSelectedDistributor] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [pinataURL, setPinataURL] = useState("");

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


    const uploadMetadataToIPFS = async (metadataJSON) => {

        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(metadataJSON);
            if (response.success === true) {
                console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }
        catch (e) {
            console.log("error uploading JSON metadata:", e)
        }
    }

    const mintOrderNFT = async (metadataURL, formAddresses) => {
        try {
            const ethers = require("ethers");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await window.ethereum.enable();
            const signer = provider.getSigner();

            let contract = new ethers.Contract(OrderJSON.address, OrderJSON.abi, signer)
            const signerAddress = await signer.getAddress();
            const addresses = [signerAddress, formAddresses[0], formAddresses[1]];

            let transaction = await contract.createOrder(metadataURL, addresses);
            await transaction.wait();
            alert("Successfully listed your Order NFT!");
        } catch (error) {
            alert("Upload NFT error" + error);
        }

    }


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
        const metadataURL = await uploadMetadataToIPFS(order);

        // console.log(metadataURL);
        mintOrderNFT(metadataURL, [distributor.value, customer.value]);
        setPinataURL(metadataURL);
    };


    return (
        <div className="container">
            <h1>Create New Order</h1>
            <form onSubmit={handleFormSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="drugSelect">Search for a drug</label>
                    <Select
                        id="drugSelect"
                        class="form-control"
                        options={drugOptions}
                        value={selectedDrug}
                        onChange={handleDrugChange}
                        isSearchable={true}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="distributorSelect">Choose distributor</label>
                    <Select
                        id="distributorSelect"
                        class="form-control"
                        options={partiesOptions}
                        value={selectedDistributor}
                        onChange={handleDistributorChange}
                        isSearchable={true}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="customerSelect">Choose customer</label>
                    <Select
                        id="customerSelect"
                        class="form-control"
                        options={partiesOptions}
                        value={selectedCustomer}
                        onChange={handleCustomerChange}
                        isSearchable={true}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" id="quantity" name="quantity" className="form-control" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="deliveryDate">Deliver By</label>
                    <input type="date" id="deliveryDate" name="deliveryDate" className="form-control" />
                </div>
            </form>
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

export default CreateOrder;