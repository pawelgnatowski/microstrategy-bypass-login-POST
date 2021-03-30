"use strict";

const userCredentials = (username, password, authMode = ENUM_MSTR_AUTHENTICATION_MODE.Standard) => {
    return {
        "uid": username,
        "pwd": encodeURIComponent(password),
        "connMode": authMode
    };
};
const WebCreateRequestBody = (credentials, serverString) => {
    
    //any valid string of report ID is okay even fake one - as long it is valid ID string , project ID is not required...
    let fakeReport = "evt=4001&src=mstrWeb.4001&reportViewMode=1&reportID=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    return fakeReport + serverString + `&` + Object.entries(credentials).map(ar => ar.join('=')).join("&");

};

// this is fetch example.

let mstrWebAuthRequest = async (endpointURL, postBody) => {
    return await fetch(endpointURL, {
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
        },

        "body": postBody,
        "method": "POST",
        "redirect": "follow",
        "mode": "cors",
        "credentials": "include"
    }).then(response => {
        if (response.ok) {
            return response.text();
        }
        else {
            return false;
        }
    }).then(text => {
        // response can be 200 but since this is HTML response it can have error inside the response body. we need to look for 'class="mstrLoginFields"' indicating out auth method failed... not very efficient, but works.
        
        if (!text || text.indexOf('class="mstrLoginFields"') > -1) {
            return false;
        }

        return true;
    }).catch(error => {
        console.log(error);
        return error.message;
    });
};

const mstrPOSTlogin = async ({ login, password, authMode }, endpointURL, serverString) => {
    const credentials = userCredentials(login, password, authMode);
    const postBody = WebCreateRequestBody(credentials, serverString);
    const isLoggedIn = mstrWebAuthRequest(endpointURL, postBody);
    console.log(await isLoggedIn);
    return isLoggedIn;
};

// logout mstr user to terminate the session.

const mstrLogout = () => {
    let endpointURL = document.getElementById('biEnv').value;
    fetch(endpointURL + `?evt=3008&src=mstrWeb.3008`, {
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        "mode": "cors",
        "credentials": "include"
    });
};
