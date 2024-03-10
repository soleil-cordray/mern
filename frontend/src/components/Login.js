import React, { useState } from 'react';

function Login()
{
    const app_name = 'cop4331-mern'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }

    var loginName;
    var loginPassword;

    // help us set a message
    const [message, setMessage] = useState('');

    // things either asynchronous or synchronous 
    const doLogin = async event =>
    {
        event.preventDefault();

        // stringify json object
        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {
            // willing to wait for response bc want it (even tho ansynch)
            const response = await
            fetch(buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type':'application/json'}});
        
            
            // need "await" here too bc even parse is asynch
            var res = JSON.parse(await response.text()); // call response

            if( res.id <= 0 ) // can't log in
            {
                setMessage('User/Password combination incorrect');
            }
            else // log in
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                // save into local storage so later on know the name
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/cards'; // reroute
            }
            }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    // return markup
    // every time user types in a character, the login gets that character
        // might be a backspace (which is fine)
        // this is how we achieve data persistence in login field
    return(
        <div id="loginDiv">
            <form onSubmit={doLogin}>
            <span id="inner-title">PLEASE LOG IN</span><br />
            <input type="text" id="loginName" placeholder="Username" 
                ref={(c) => loginName = c} /><br />
            <input type="password" id="loginPassword" placeholder="Password"
                ref={(c) => loginPassword = c} /><br />
            <input type="submit" id="loginButton" class="buttons" value = "Do It"
                onClick={doLogin} />
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
};

// export so external code can call it
export default Login;