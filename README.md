Usage:

This sample will run Tutorial Project dashboard in embedded iframe.

Provide your user credentials in mstrWebLogin.html file for the sample to run correctly.
Adjust const authMode = ENUM_MSTR_AUTHENTICATION_MODE.Standard; to a different mode if necessary.

Run a sample from a different web server than your MSTR server to test if you meet prerequistes.
Localhost will not work - it will be blocked by default by browser.

More about them in this post:
[link]

for HTTP request (.http file) you need to alter the following:
Origin: http://kubernetes.docker.internal:5500
Referer: http://kubernetes.docker.internal:5500/

as those values are just an example for my local DEV environment web server.

read the full story about this approach [link]

