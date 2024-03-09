# react-pro-sidebar
creaction of the sidebar
# formik and yup 
validation of the form
# @mui/icons-material 
icons
# formik and yup 
validation of the form
# fullcalendar 
calendar library
# nivo (charts)
nivo provides a rich set of dataviz components, built on top of D3 and React




# Backend

## Description

## API Overview

This API serves as the robust backend for our social media application, offering : 
  - secure user authentication.
  - user management.
  - interaction functionalities.
  - efficient data management.
It leverages NestJS's :
  - modular structure.
  - JWT authentication with separate access and refresh tokens.
  - Multer for file storage.
  - Class Validator for data integrity.
  - Prisma for efficient database interactions.

### User Interactions

The API empowers users to connect and engage with one another through features like:

- **Following and Unfollowing:** Users can follow other users to see their posts and updates in their feeds.
- **Liking Posts:** Users can express appreciation for posts by liking them, potentially influencing post visibility or ranking.
- **Commenting on Posts:** Users can add comments to posts, fostering discussions and deeper engagement.

### Additional Considerations

- **Authorization:** Specific API endpoints might require valid access tokens for user interaction actions to ensure authenticated users are performing actions.
- **Data Validation:** Utilize Class Validator or a similar library to enforce data integrity for user-generated content (e.g., comment length).
- **Security:** Implement security measures to sanitize user input and prevent vulnerabilities like Cross-Site Scripting (XSS).

By incorporating these functionalities, our API lays the foundation for a thriving social media platform. Remember to implement the specific API endpoints and associated details for each user interaction based on your application's requirements.




### API endpoints
  ## Auth
   # register 
    - Post : http://localhost:5005/auth/register
   # login
    - Post : http://localhost:5005/auth/login
  ## Users
  