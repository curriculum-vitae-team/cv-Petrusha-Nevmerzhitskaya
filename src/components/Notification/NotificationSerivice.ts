import { makeVar, ReactiveVar } from '@apollo/client';

export enum AlertValues {
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface IAlert {
  type: AlertValues.SUCCESS | AlertValues.ERROR;
  message: string;
  id: number;
}

export interface INotification {
  alerts: ReactiveVar<IAlert[]>;
  alertId: number;
  Error(message: string): void;
  Success(message: string): void;
}

class Notification implements INotification {
  alerts = makeVar<IAlert[]>([]);

  alertId = 0;

  Error(message: string) {
    this.addAlert(AlertValues.ERROR, message);
  }

  Success(message: string) {
    this.addAlert(AlertValues.SUCCESS, message);
  }

  addAlert(type: AlertValues, message: string) {
    const alertData: IAlert = {
      id: this.alertId + 1,
      message,
      type
    };
    const alerts = this.alerts();
    this.alerts([...alerts, alertData]);
    this.autoCloseAlert(alertData.id);
  }

  autoCloseAlert(id: number) {
    setTimeout(() => {
      const alerts = this.alerts();
      this.alerts(alerts.filter((alert) => alert.id !== id));
    }, 4000);
  }
}

export const notificationService = new Notification();
