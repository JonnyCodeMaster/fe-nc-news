# 'Not Fake News' - Front End Web App

Link to deployed version - ['Not Fake News' Web App](https://not-fake-news.netlify.app)

Link to front-end repo - [Github Repo](https://github.com/JonnyCodeMaster/fe-nc-news)

---

Built by Jonny Farmer - [Github Profile](https://github.com/JonnyCodeMaster)

## Description

'Not Fake News' is a web application that allows users to read and interact with news articles. This front-end application incorporates JavaScript, HTML and CSS. It is built with React and connects to the 'Not Fake News' back-end API to fetch and display articles, comments, and other related data.

Link to hosted back-end API - ['Not Fake News' API](https://not-fake-news.onrender.com/api)

Link to back-end repo - [Github Repo](https://github.com/JonnyCodeMaster/be-nc-news)

# Features

- View a list of articles with various sorting options.
- Read individual articles with detailed content.
- Vote on articles and comments.
- View comments for each article.
- Post new comments and delete existing comments.

## Set Up / Installation Instructions

### Prerequisites

- Node.js (minimum version 21.x) [Node.js](https://nodejs.org/en/)

### Dependencies

Run the following commands in your terminal to install the dependencies:

- axios (minimum version 1.7.2) [axios](https://www.npmjs.com/package/axios) - $ npm install axios
- react (minimum version 18.2.0) & react-dom (minimum version 6.23.1) [react](https://react.dev/learn/add-react-to-an-existing-project) - $ npm install react react-dom
- react-router-dom (minimum version 6.23.1) [react](https://react.dev/learn/add-react-to-an-existing-project) $ npm install react-router-dom

### Clone The Repository

Run the following commands in your terminal:

- $ git clone https://github.com/JonnyCodeMaster/fe-nc-news.git
- $ cd fe-nc-news

## How To Run The Application

### Initialise Node And Install Dependencies

Run the following command in your terminal:

- $ npm install

### Running the Application Locally

Run the following command in your terminal:

- $ npm run dev

This will start the development server and open the application in your default web browser. If it doesn't open automatically, click or copy and paste the host link in the terminal into your browser manually.

### Build for Production

Run the following command in your terminal:

- $ npm run build

This will create a build directory with all the optimized static files.

## How To Run The Application

### Deploying a draft version to Netlify

If you want to deploy this project to Netlify, run the following command in your terminal::

$ npm install -g netlify-cli

Sign up to Netlify - [netlify](https://app.netlify.com)

Authorise Netlify with GitHub, following the prompts in the browser.

Select Create & configure a new site.

Provide your choice of site name, or update this later.

Provide a deploy path. This needs to point to your build directory and should be ./dist (as we're in the root of our react app).

Your draft version should now be deployed on a url, e.g. https://5c13ab16055b9be1725868e6--your-site-name.netlify.com. Test it out, make sure that everything is working as expected.


### Deploying A Production Version To Netlify

Run the following command in your terminal:

$ netlify deploy --prod

Follow the prompts to specify the build directory. Specify your build path again. This will deploy the site to your actual url, e.g. https://your-site-name.netlify.com.

---

Thank you for your interest in my project.

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/).
