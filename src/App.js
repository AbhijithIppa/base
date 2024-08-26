import React from 'react';
import CustomAuth from './CustomAuth';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);

function App() {
  return (
    <Authenticator>
      <CustomAuth />
    </Authenticator>
  );
}

export default App;
