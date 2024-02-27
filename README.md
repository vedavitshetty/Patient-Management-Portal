# Patient Management Portal

## Description
This project is a patient management portal that allows healthcare professionals to manage patient records.

## Features
- User authentication: Secure login and registration system for healthcare professionals.
- Patient records: Create, update, and delete patient records with relevant information such as name, contact details, and medical history.
- Medical history tracking: Keep track of patient medical history, including diagnoses, treatments, and medications.
- Search and filter: Easily search and filter patient records based on various criteria such as name, date of birth, or location.

## Installation
To set up the Patient Management Portal first clone the repository: `git clone https://github.com/vedavitshetty/Patient-Management-Portal.git`

Then cd `Patient-Management-Portal/backend` to set up the database and server
### Django Setup:
1. Install Python dependencies: `pip install -r requirements.txt`
2. Set up the database: `python manage.py migrate` `python manage.py createsuperuser`
3. Start the Django server: `python manage.py runserver` which will run on localhost:8000

To setup the frontend go to `Patient-Management-Portal/frontend` and follow these steps:
### React Setup
1. Install dependencies: `npm install`
2. Start the server: `npm start`

## Usage
1. Open the application in your web browser.
2. Log in using your credentials or create a new account if you don't have one.
3. Use the search and filter functionality to find specific patient records or appointments.
4. Perform necessary actions such as creating, updating, or deleting patient records or appointments.

## Technologies Used
- Front-end: HTML, CSS, JavaScript, React.js, TailwindCSS, Ant Design
- Back-end: Python, Django
- Database: SQLite
