# Business rules

## Introduction

The MovieReview API is an app to create users, sign in with a user credentials and create reviews or comments, interact with other users with replies and quotes on their comments.

## Description

- In the MovieReview API it's possible to create a new user
  - Users are created with email and password.
  - An user email is unique.
  - A new users starts with the READER role.
- Exists 4 roles of users in the app.
  - Every user has a score that increases when it does certain actions.
    - Every new user starts with score 0.
    - The actions that increases the score by 1 point are:
      - Review a movie.
      - Create a comment.
      - Quote a comment.
      - Reply a comment.
  - READER.
    - Can sign in and search for a movie.
      - Can see the informations of a movie and its comments.
    - Can review a movie and give it a score, from 0 to 10.
    - Can edit own reviews.
    - A READER turns into a BASIC user when their score reaches 20 points.
  - BASIC.
    - Can do everything that a READER does.
    - Can write comments.
    - Can reply comments.
    - Can edit own comments.
    - A BASIC turns into a ADVANCED user when their score reaches 100 points.
  - ADVANCED.
    - Can do everything that a BASIC does.
    - Can quote comments from others.
    - Can like or dislike a comment.
    - A ADVANCED turns into a MODERATOR user when their score reaches 1000 points.
  - MODERATOR.
    - There is 2 ways of a user turns into a MODERATOR:
      - Reaching a score of 1000 poins.
      - Getting turned into a MODERATOR by another MODERATOR.
    - Can do everything that a ADVANCED does.
    - Can edit any comment, including of other users.
    - Can edit any review, including of other users.
    - Can mark or unmark a comment as repeated.
    - Can delete a review.
    - Can delete a comment.

[Link to the main document.](../../README.md)
