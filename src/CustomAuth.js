import React from 'react';
import { Authenticator, TextField, Button, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const CustomAuth = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <View>
          <h1>Welcome, {user.username}</h1>
          <Button onClick={signOut}>Sign out</Button>
        </View>
      )}
    </Authenticator>
  );
};

export default CustomAuth;
