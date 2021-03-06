import Alert from '@mui/material/Alert';
import propTypes from 'prop-types';
import { useMemo } from 'react';
import { useStyles } from './styles';

const SnetAlert = ({ error, type = 'error', iconPresence }) => {
  const classes = useStyles();

  const className = useMemo(() => {
    switch (type) {
      case 'success':
        return classes.successMsg;
      case 'info':
        return classes.pandingMsg;
      default:
        return {};
    }
  });
  return (
    <Alert icon={iconPresence} severity={type} variant="outlined" className={`${classes.alertBox} ${className}`}>
      {error}
    </Alert>
  );
};

SnetAlert.propTypes = {
  error: propTypes.string.isRequired,
  type: propTypes.string,
  iconPresence: propTypes.bool
};

export default SnetAlert;
