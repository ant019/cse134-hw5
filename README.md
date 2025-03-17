# Portfolio Website

## Overview
This portfolio website showcases the work and experiences of Alex. It is structured using semantic HTML elements to enhance accessibility and SEO. The website includes various pages detailing projects, student organizations, academic history, personal information, and a contact form.

## Project Structure
The website consists of the following files:

- **index.html**: The main page of the portfolio.
  
- **projects.html**: A dedicated page for showcasing various projects.

- **orgs.html**: This page lists student organizations that I was or am involved in.

- **contact.html**: Contains a contact form.

- **crud.html**: Contains a project form for adding, updating, and deleting projects.

## Paragraph (Part 3)
The changes I made from Homework 4 to Homework 5 is mainly utilizing Javascript to load project cards from both local storage and a remote bin. I created a custom project-card element with title, description, and a link, and optional media for images and iframes. To load locally, I created a file "db.json" to initially load the projects I have already written in previous assignments into local storage and displayed the projects from local storage. To load remotely, I used jsonbin.io to create a bin with my current projects, and used their API to fetch and display my projects. I have also created a new page "/crud.html" where you can create, update, view, and delete projects using the form on the page.