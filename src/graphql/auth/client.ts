import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { notificationService } from '@components/Notification/NotificationSerivice';
import { authService } from './authService';

const httpLink = new HttpLink({
  uri: 'https://cv-project-js.inno.ws/api/graphql'
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${authService.access_token$()}`
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      notificationService.Error(message);
      console.error(message);
      if (message === 'Unauthorized') {
        authService.clearStorage();
      }
    });
  }
  if (networkError) {
    notificationService.Error(networkError.message);
    console.error(networkError);
  }
});

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache()
});
