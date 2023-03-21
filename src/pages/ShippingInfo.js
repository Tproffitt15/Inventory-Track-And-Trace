import "./ShippingInfo.css"

const ShippingInfo = () => {
    return (
        <div id="timelineDiv">
            <ul class="timeline" id="timeline">
                <li class="li complete">
                    <div class="status">
                        <h4> Manufacturer </h4>
                    </div>
                </li>
                <li class="li complete">
                    <div class="status">
                        <h4> distributor </h4>
                    </div>
                </li>
                <li class="li">
                    <div class="status">
                        <h4> Customer </h4>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default ShippingInfo;
