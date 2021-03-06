import { Typography } from '@mui/material';
import { lazy, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import TxnHistoryTable from './TxnHistoryTable';
import { useStyles } from './styles';
import SnetButton from '../../components/snet-button';
import SnetConnectWallet from '../../components/snet-connect-wallets';

const GeneralLayout = lazy(() => import('../../layouts/GeneralLayout'));

const Transactions = () => {
  const classes = useStyles();

  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const state = useSelector((state) => state);
  const { wallets, isWalletInitializing } = state.wallet;
  const { entities } = state.blockchains;

  const toggleWalletConnecting = () => {
    setIsWalletConnecting(!isWalletConnecting);
  };

  return (
    <>
      <Helmet>
        <title>SingularityNet Bridge | Transactions History</title>
      </Helmet>
      <GeneralLayout>
        {isWalletConnecting ? <SnetConnectWallet isDialogOpen={isWalletConnecting} onDialogClose={toggleWalletConnecting} blockchains={entities} /> : null}
        <div className={classes.transactionHistoryContainer}>
          <Typography>Transactions History</Typography>
          {!isEmpty(wallets) ? <TxnHistoryTable /> : null}
          {isEmpty(wallets) && !isWalletInitializing ? (
            <div className={classes.EmptyTransactionHistoryContainer}>
              <span>Wallet not connected.</span>
              <Typography>Please connect both your wallets to view the transaction history</Typography>
              <SnetButton name="Connect Wallets" variant="outlined" onClick={toggleWalletConnecting} />
            </div>
          ) : null}
        </div>
      </GeneralLayout>
    </>
  );
};

export default Transactions;
