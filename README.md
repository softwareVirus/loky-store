<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="https://user-images.githubusercontent.com/63147096/273959056-e93b85d9-f722-493d-8c8c-c91083167622.png" alt="logo">
  <h3 align="center">Loky Store</h3>

  <p align="center">
    A shopping website you can sell your products
    <br />
    <br />
    <a href="https://www.ibrahimhalilsakli.tech">View Demo</a>
    ·
    <a href="https://github.com/softwareVirus/loky-store/issues">Report Bug</a>
  </p>
</div>






<!-- ABOUT THE PROJECT -->
## About The Project
![Product Name Screen Shot](https://user-images.githubusercontent.com/63147096/273904007-9c4403ea-3f0d-46d4-8ee2-3e567cb08437.png)
Loky Store is my portfolio project, showcasing my web development skills. It's a straightforward e-commerce website concept, highlighting some key features:

- **Horizontal Product List:** Browse products conveniently with a horizontal scrolling product list.
- **Minimap of Product List:** A minimap provides an overview of available products for easy navigation.
- **Smooth Scrolling:** Scroll vertically and horizontally for improved navigation.
- **Product Cart Details:** View product details, dimensions, sizes, and quantities in the cart.
- **User Basket:** Keep track of added products in the user's basket.
- **User Authentication:** Sign in, sign up, and contact features for a personalized experience.
- **Admin Panel:** Admins can manage users, products, contacts, and orders.


### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

### Frontend:

- **Vue.js:** A progressive JavaScript framework for building interactive web interfaces.
- **Vuex:** A state management pattern and library for Vue.js applications, helping manage and synchronize data across components.
- **Fuse.js:** A lightweight fuzzy-search library for implementing search functionality.
- **Axios:** A promise-based HTTP client for making API requests.

### Backend:

- **Node.js:** A JavaScript runtime that powers the server-side logic of the application.
- **Express:** A minimal and flexible Node.js web application framework used to build the API.
- **Express Session:** Middleware for managing user sessions.
- **Passport.js:** Authentication middleware for Node.js applications.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB, simplifying database interactions.

### DevOps:

- **Docker:** Containerization technology used to package the application and its dependencies.
- **Docker Compose:** Simplifies multi-container Docker application management.
- **Google Cloud:** The project is deployed to Google Cloud, leveraging its scalable and reliable cloud infrastructure.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get this project up and running locally, follow these simple steps:

1. **Clone the Repository:** 
   ```bash
   git clone https://github.com/softwareVirus/lokystore.git

## Running the stack

```sh
$ docker-compose up
```

## Accessing the stack from a browser

The starter stack works with a load balancer that binds to ports 80 and 443. It currently serves the domain http://stack.localhost. In order to reach the frontend through the stack, you need to edit your `hosts` file (usually under `/etc/hosts` in UNIX environments and `C:\Windows\System32\Drivers\etc\hosts` in Windows) and add the following line:

```
127.0.0.1 stack.localhost
```

Now if you visit http://stack.localhost, you will be greeted with the frontend starter project.

## Changing the local domain

If you wish to use a domain name other than http://stack.localhost, simply set the environment variable `DOMAIN` to any domain you want.

```sh
$ DOMAIN=another-domain.localhost docker-compose up
```

You then also need to update your `hosts` file accordingly.

## Debugging

You can debug the backend while it's running in VSCode. Instead of running `docker-compose up`, run the following command:

```sh
$ docker-compose -f docker-compose.yml -f docker-compose.debug.yml up
```

This starts the backend service in the debug mode, so you can use the built-in debug task `Attach to backend` to debug your backend service.

# Running tests

## Running backend tests

```sh
$ cd backend
$ npm i
$ npm test
```

## Running frontend tests

```sh
$ cd frontend
$ npm i
$ npm test:unit
$ npm test:e2e
```

# Linting

Run `npm install` on the root folder and it will set up a pre-commit hook to lint the staged files. You will also have two lint commands, `npm run lint` and `npm run lint-staged` that you can run on the root folder.

These commands run the individual `lint` and `lint-staged` scripts in both the `frontend` and the `backend` folders, and they will respect individual configurations of these folders.


# Contributing

We welcome contributions from the open-source community to make Loky Store even better. If you're interested in contributing, please refer to our [Contribution Guidelines](link-to-guidelines.md).


# License

MIT License

Copyright (c) 2020 Coyotiv®

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/softwareVirus/loky-store.svg?style=for-the-badge
[contributors-url]: https://github.com/softwareVirus/loky-store/graphs/contributors
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/softwareVirus/loky-store/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/ibrahim-halil-sakli-83a5061b1/
