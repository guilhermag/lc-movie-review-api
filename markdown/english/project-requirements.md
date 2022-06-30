# Project requirements

## Functional requirements

- A user will not be able to log in without having registered.
- A user will not be able to see movie info, comments or reviews without being logged.
- A user will not be able of create, edit, delete a comment or review without being logged.
- A user from a determined profile will not be able of doing actions that not correspond to its profile.
- All the features of the app must receive an authentication token, generated from the Auth API.
- A user not authenticated will not be able(without a token) of doing any actions in the app.
- All the failed login attempts must be stored in a cache.
- If a user has 3 failed login attempts, on the fourth time the app um block the login for 2 minutes and show a message ```Number of login attempts was exceeded, wait for 2 MINUTES```.

## Non functional requirements

- Store the data in a database of your choice.
- Create a cache for failed login attempts.
- Develop your API with one of the following languages:
  - Java.
  - C#.
  - Typescript/Javascript.
  - Python.
- The data from movies must come from a external API, like OMDb API.
- Create all the documentation for the app.

[Link to the main document.](../../README.md)
