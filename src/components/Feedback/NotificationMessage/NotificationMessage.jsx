import PropTypes from 'prop-types';
import { Notification } from './NotificationMessage.styled';

export const NotificationMessage = ({ message }) => (
  <Notification>{message}</Notification>
);

NotificationMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
