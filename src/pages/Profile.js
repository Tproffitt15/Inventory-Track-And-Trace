import "./Profile.css"

const Profile = () => {
    return (
        <div>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h1 className="text-right">Profile Details</h1>
                            </div>
                            <div className="row mt-2">
                                <div className="col-25">
                                    <label className="labels">Company Name</label>
                                    <input type="text" className="form-control" placeholder="name" defaultValue=""></input>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Email Address</label>
                                    <input type="text" className="form-control" placeholder="enter email address" defaultValue=""></input>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label className="labels">Wallet Address</label>
                                    <input type="text" className="form-control" placeholder="wallet address" defaultValue=""></input>
                                </div>
                                <div className="mt-5 text-center">
                                    <button className="btn btn-primary profile-button" type="button">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Profile;