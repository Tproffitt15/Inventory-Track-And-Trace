import "./CreateOrder.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import partiesData from "data/parties.json"
import { uploadJSONToIPFS } from "../pinata";
import OrderJSON from "../order.json";
import { Modal, Spinner } from 'react-bootstrap';

const CreateOrder = () => {

    const [drugs, setDrugs] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState("");
    const [selectedDistributor, setSelectedDistributor] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [showModal, setShowModal] = useState(false);

    // const [pinataURL, setPinataURL] = useState("");

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
        const currentDate = new Date().toLocaleDateString();
        // console.log(currentDate);
        // do something with the form data, e.g. send it to the server

        const order1 = { drug, distributor, customer, deliveryDate };
        console.log("Debug ", order1);
        const order = {
            issueDate: currentDate,
            expectedDate: deliveryDate,
            distributor: distributor.label,
            customer: customer.label
        };
        const metadataURL = await uploadMetadataToIPFS(order);

        // console.log(metadataURL);
        setShowModal(true);
        await mintOrderNFT(metadataURL, [distributor.value, customer.value]);
        setShowModal(false);

        // setPinataURL(metadataURL);
    };


    return (
        <section class="container">
            <h2>Create New Order</h2>
            <form onSubmit={handleFormSubmit}>
                <div class="form-group">
                    <label for="drugSelect">Search for a drug</label>
                    <Select
                        id="drugSelect"
                        class="form-control"
                        options={drugOptions}
                        value={selectedDrug}
                        onChange={handleDrugChange}
                        isSearchable={true}
                    />
                </div>

                <div class="form-group">
                    <label for="distributorSelect">Choose distributor</label>
                    <Select
                        id="distributorSelect"
                        class="form-control"
                        options={partiesOptions}
                        value={selectedDistributor}
                        onChange={handleDistributorChange}
                        isSearchable={true}
                    />
                </div>

                <div class="form-group">
                    <label for="customerSelect">Choose customer</label>
                    <Select
                        id="customerSelect"
                        class="form-control"
                        options={partiesOptions}
                        value={selectedCustomer}
                        onChange={handleCustomerChange}
                        isSearchable={true}
                    />
                </div>
                <div>
                    <label for="quantity">Quantity</label>
                    <input type="number" id="quantity" name="quantity" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="deliveryDate">Deliver By</label>
                    <input type="date" id="deliveryDate" name="deliveryDate" class="form-control" />
                </div>

                <button type="submit" id="submitButton" class="btn btn-primary float-left create">Create Order</button>
            </form>

            {/* {pinataURL && (
                <div id="upload-success">
                    Order metadata uploaded to IPFS: <a href={pinataURL}>{pinataURL}</a>
                </div>
            )} */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="spinner"></div>
                        <p className="loading-text">Please do not close or refresh the tab while your NFT is being minted...</p>
                    </div>
                </div>
            )}

        </section>

    );
};

export default CreateOrder;