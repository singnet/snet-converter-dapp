import Container from '@mui/material/Container';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menubar from '../components/snet-navigation';
import SnetModal from '../components/snet-modal';
import { getAvailableBlockchains } from '../services/redux/slices/blockchain/blockchainActions';
import { useWalletHook } from '../components/snet-wallet-connector/walletHook';
import { supportedEthereumNetworks } from '../utils/ConverterConstants';

const GeneralLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { entities } = useSelector((state) => state.blockchains);
  const { userSelecteNetworkId } = useWalletHook();
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    const expectedNetworkId = Number(process.env.REACT_APP_INFURA_NETWORK_ID);
    const currentNetworkId = Number(userSelecteNetworkId);
    setOpenModal(expectedNetworkId !== currentNetworkId);
  }, [userSelecteNetworkId]);

  useEffect(() => {
    if (entities.length < 1) {
      dispatch(getAvailableBlockchains());
    }
  }, []);

  const getNetworkName = () => {
    const networkName = supportedEthereumNetworks[process.env.REACT_APP_INFURA_NETWORK_ID];
    return `Please Switch to Ethereum ${networkName} Network`;
  };

  return (
    <>
      <SnetModal open={openModal} handleClose={handleClose} heading="Unsupported Network" message={getNetworkName()} />
      <Menubar blockchains={entities} />
      <Container sx={{ marginTop: 8 }}>{children}</Container>
    </>
  );
};

GeneralLayout.propTypes = {
  children: propTypes.node.isRequired
};

export default GeneralLayout;
