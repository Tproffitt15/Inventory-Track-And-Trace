import Injector from "components/Injector";
import { useWeb3React } from "@web3-react/core"
import "./ConnectWallet.css"

const ConnectWallet = () => {
	const { active, account, library, connector, activate, deactivate } = useWeb3React()

  	async function connect() {
    	try {
      		await activate(Injector)
		} catch (ex) {
			console.log(ex)
		}
  	}

	async function disconnect() {
		try {
			deactivate()
		} catch (ex) {
			console.log(ex)
		}
	}

    return (
        <div data-v-a11c9dcc="">
		<button onClick={connect} class="enableEthereumButton">
			Connect to MetaMask
		</button>
		<h2>Account: <span class="showAccount"></span></h2>
	</div>
    );
};

export default ConnectWallet;