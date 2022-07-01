# Swagger Guide

## Description

Swagger is a simple form of creating a UI where is possible to see all the api endpoints, the possible responses and the required parameters for an endpoint in expecific.

For this app the default screen of swagger is showed below.

![image screen](../imgs/swagger-page.png)

Because the app works with a JWT validation, some endpoints will not be available if a valid token is not set on this page.

![image of the authorize](../imgs/swagger-authorize.png)

The token can be obtained through the sign in endpoint ```/user/login```.

![image of the endpoint](../imgs/swagger-endpoint.png)

Sending the correct credentials of a real user it's possible to get the access token obtained through the response of this endpoint.

![image of the endpoint](../imgs/swagger-response.png)

Now just click on the ```Authorize``` button in the top right side of the page.

![authorize button](../imgs/swagger-authorize-button.png)

Paste the access token and click on ```Authorize```.

![authorize value](../imgs/swagger-authorizarions.png)
