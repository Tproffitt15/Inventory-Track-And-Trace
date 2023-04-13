import "./CreateOrder.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import partiesData from "data/parties.json"
import { uploadJSONToIPFS } from "../pinata";
import OrderJSON from "../order.json";
// import { Modal, Spinner } from 'react-bootstrap';

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

    const distributors = partiesData.filter((person) => person.role === 1);
    const distributorOptions = distributors.map((distributor) => ({
        label: distributor.name,
        value: distributor.address,
    }));

    const customers = partiesData.filter((person) => person.role === 2);
    const customerOptions = customers.map((distributor) => ({
        label: distributor.name,
        value: distributor.address,
    }));

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

    const getUserWalletAddress = async () => {
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.enable();
        const signer = provider.getSigner();

        const signerAddress = await signer.getAddress();
        return signerAddress;
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
            alert("Upload NFT error: " + error);
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
        const issueDate = new Date().toISOString().substring(0, 10);
        const signerAddress = await getUserWalletAddress();
        // console.log(drug);
        // do something with the form data, e.g. send it to the server

        const order = {
            drug: drug.value,
            issueDate: issueDate,
            expectedDate: deliveryDate,
            distributor: distributor.value,
            customer: customer.value,
            manufacturer: signerAddress,
            quantity: quantity
        };

        console.log(order);

        const metadataURL = await uploadMetadataToIPFS(order);

        setShowModal(true);
        await mintOrderNFT(metadataURL, [distributor.value, customer.value]);
        setShowModal(false);

    };


    return (
        <section className="container">
            <h2>Create New Order</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="drugSelect">Search for a drug</label>
                    <Select
                        id="drugSelect"
                        className="form-control"
                        options={drugOptions}
                        value={selectedDrug}
                        onChange={handleDrugChange}
                        isSearchable={true}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="distributorSelect">Choose distributor</label>
                    <Select
                        id="distributorSelect"
                        className="form-control"
                        options={distributorOptions}
                        value={selectedDistributor}
                        onChange={handleDistributorChange}
                        isSearchable={true}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="customerSelect">Choose customer</label>
                    <Select
                        id="customerSelect"
                        className="form-control"
                        options={customerOptions}
                        value={selectedCustomer}
                        onChange={handleCustomerChange}
                        isSearchable={true}
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" id="quantity" name="quantity" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="deliveryDate">Deliver By</label>
                    <input type="date" id="deliveryDate" name="deliveryDate" className="form-control" />
                </div>

                <button type="submit" id="submitButton" className="btn btn-primary float-left create">Create Order</button>
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