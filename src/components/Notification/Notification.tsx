import { useReactiveVar } from '@apollo/client';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react';

import { Container } from './Notification.styles';
import { notificationService } from './NotificationSerivice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={10} ref={ref} {...props} />;
});

export const Notification = () => {
  const alerts = useReactiveVar(notificationService.alerts);

  return (
    <Container>
      {alerts.map(({ id, type, message }) => (
        <Alert key={id} severity={type}>
          {message}
        </Alert>
      ))}
    </Container>
  );
};
