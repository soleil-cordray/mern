import React from 'react';

// import components (functions)
// ../ = previous directory
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

// create page
const LoginPage = () =>
{
    // implement components
    return(
        <div>
            <PageTitle />
            <Login />
        </div>
    );
};

export default LoginPage;