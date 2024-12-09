# Blog API

This is a simple blog API built using node and express.js. It provides endpoints for creating, reading, updating and deleting blog posts, as well as registering and authenticating users.
The user also have a profile section where they can update their profile information.

## NOTE:
All the endpoints except for `/register` and `/login` are secured using JWT tokens. The user needs to provide a valid token in the request header to access any of the endpoints.

## ENDPOINTS
1. `POST /register` - Register a new user
    request body as Form data:
    - `name` - string
    - `email` - string
    - `password` - string 
    - `phoneNumber` - string
    - `photo` - file jpeg/png (required)
2. `POST /login` - Login a user
    request body as JSON:
    ```
    {
        "username" : "email",
        "password" : "password"
    }
    ```
3. `GET /profile` - Get user profile information
4. `PUT /profile` - Update user profile information
    request body as Form data:
    - `briefDescription` - string a brief description of the user (optional)
    - `detailedDescription` - string a detailed description of the user (optional)
    - `address` - string the user's address (optional)
    - `favouriteItems` - string a list of the user's favourite posts (optional)
5. `DELETE /profile` - Delete user profile along with the user's account
6. `POST /blog` - Create a new blog post
    request body as Form data:
    - `title` - string(required)
    - `description` - string(required)
    - `image` - file jpeg/png (optional)
7. `GET /blog` - Get all blog posts
8. `PUT /blog` - Update a blog post
    request body as Form data:
    - `title` - string(optional)
    - `description` - string(optional)
    - `image` - file jpeg/png (optional)
    - `id` - string(required) - the id of the blog post to be updated
    atleast one field should be present in the request body
9. `DELETE /blog` - Delete a blog post
    request body as JSON:
    ```
    {
        "id" : "postId"
    }
    ```
10. `POST /blog/:id/like` - Like a blog post
    request body not required. The id of the blog post to be liked should be present in the url.

### For Examples refer the attached Postman collection.
