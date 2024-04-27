# RESTful API with Node.js and Express

This project implements a RESTful API using Node.js and Express. It provides routes for managing hiking users, trails, and ratings. Additionally, it includes middleware for logging and error handling, as well as rendering views using the EJS template engine.

## Objectives

- Create a server application with Node and Express.
- Develop a RESTful API using Express.
- Implement Express middleware for logging and error handling.
- Use a template engine (EJS) to render views.
- Interact with a self-made API through HTML forms.

## Technologies Used
- Node.js
- Express.js
- EJS (Embedded JavaScript) - Template Engine
- Body-parser - Middleware for parsing request bodies

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start the server: `node index.js`.
4. Access the API endpoints and views via the specified routes.


## Project Requirements

### Custom Middleware

1. **Two custom middleware functions are implemented(5%)**: Logging middleware to log request information and timestamps. 

2. **Error-handling middleware is used(5%)**: Error-handling middleware to handle and log errors.

3. **Three different data categories are used(5%)**: Three data categories are utilized: Users, Trails, Ratings

4. **Utilize reasonable data structuring practices(5%)**: Good data scrtucturing practices are used throughout.

5. 6. 7. 8. **Create GET, POST, PATCH/PUT and DELETE routes for the client(20%)**: GET, POST, PATCH/PUT, and DELETE routes are implemented for each data category.

9. **Include query parameters for data filtering(5%)**: Each data category uses query parameters for filtering data.

10. **Utilize route parameters(5%)**: Route parameters are used throughout.

11. **Adhere to the guiding principles of REST(10%)**:
**Client-Server Architecture**: The application follows a client-server architecture where the server provides RESTful services.
**Stateless Communication**: Each request from the client to the server contains all the information necessary to understand and fulfill the request. The server does not store any client state between requests.
**Uniform Interface**: The API endpoints follow a uniform interface, including resource URIs, HTTP methods (GET, POST, PUT/PATCH, DELETE), and representations (JSON data).
**Resource-Based**: Resources are the key abstraction in a RESTful API. In this project, users, trails, and ratings are treated as resources, each with its own URI and CRUD operations.
**Manipulation of Resources Through Representations**: Clients interact with resources through representations (JSON data) exchanged between the client and server.
**Self-Descriptive Messages**: Each message includes metadata, such as content type, which enables the client to interpret the response correctly.
**Hypermedia as the Engine of Application State (HATEOAS)**: HATEOAS is implemented by including links in API responses that guide clients on possible next actions. This is demonstrated in the project by providing links for related operations (e.g., PATCH and DELETE) along with resource representations.

12. **Create and render at least one view using a view template and template engine.(8%)**: Views are rendered using the EJS template engine.

13. **Use simple CSS to style the rendered views.(2%)**: Simple CSS is used for styling the rendered views.

14. **Include a form within a rendered view.(3%)**: Each rendered view has a form.

15. **Utilize reasonable code organization practices.(5%)**: This is applied through modularization, middleware seperation, data seperation, consistent naming conventions, dependency management, and directory structure.

16. **Ensure the program runs without errors.(10%)**: The program runs without errors.

17. **Commit frequrently to the git repository.(5%)**: Commits were made regularly throughout the project.

18. **Includes a README.(2%)**: This is the readme file.

19. **Level of effort displayed in creativity, presentation, and user experience.(5%)**: Much effort went into making sure the overall presentation is appealing to the user.

## Credits
- Fonts provided by [Google Fonts](https://fonts.google.com/)
- Color Palette Provided by [Coolors](https://coolors.co/)

## License

This project is licensed under the [MIT License](LICENSE).

