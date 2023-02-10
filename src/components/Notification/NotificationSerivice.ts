import { makeVar, ReactiveVar } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

export enum AlertValues {
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface IAlert {
  type: AlertValues.SUCCESS | AlertValues.ERROR;
  message: string;
  id: string;
}

export interface INotification {
  alerts: ReactiveVar<IAlert[]>;
  Error(message: string): void;
  Success(message: string): void;
}

class Notification implements INotification {
  alerts = makeVar<IAlert[]>([]);

  Error(message: string) {
    this.addAlert(AlertValues.ERROR, message);
  }

  Success(message: string) {
    this.addAlert(AlertValues.SUCCESS, message);
  }

  addAlert(type: AlertValues, message: string) {
    const alertData: IAlert = {
      id: uuidv4(),
      message,
      type
    };
    const alerts = this.alerts();
    this.alerts([...alerts, alertData]);
    this.autoCloseAlert(alertData.id);
  }

  autoCloseAlert(id: string) {
    setTimeout(() => {
      const alerts = this.alerts();
      this.alerts(alerts.filter((alert) => alert.id !== id));
    }, 4000);
  }
}

export const notificationService = new Notification();
