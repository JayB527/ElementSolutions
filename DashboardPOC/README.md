# Element FHIR Dashboard - Proof of Concept

The dashboad represents an idea for a possible solution for displaying FHIR metrics from database data. The frontend for the project is built through React. The backend server is ran with Express.js and is used as the API for the frontend to pull data from the PostgreSQL AWS RDS database.

The **Data Analytics** section on the webpage provides the numbers for six values. The descriptions and values in each box can be changed to anything that may be needed in the future as they currently serve as filler information for the six values mentioned in the JIRA ticket.

The **Patients Table** section is where the table data fetched from the PostgreSQL database will be displayed. Currently, the table contains data for the `ID`, `First name`, `Last name`, `Cholesterol`, and `Age` of each patient. The table columns can be easily expanded/reduced based on future need.

## Development Guide

1. Make sure you change directory into the `DashboardPOC` folder if you haven't already as all the following steps will treat this directory as the root.
```
cd DashboardPOC
```

<br>2. Install all of the dependencies.
```
npm install
```

<br>3. The repository does not include the `.env` file filled with database secrets for security reasons. Feel free to ask **Devin** for the following values when you are developing using live RDS table data. You can copy and paste the following format directly into your `.env` file.

```
RDS_HOSTNAME=""
RDS_USERNAME=""
RDS_PASSWORD=""
RDS_PORT=""
RDS_DBNAME=""
```
**IMPORTANT:** Make sure your `.env` file is located *inside* the `DashboardPOC` folder for this project.

<br>4. If you are using live RDS data for development, start up the Express.js server by running the following the npm script:
```
npm run server
```

The server code is located within the directory `./server/index.js`

<br>5. Boot up the frontend of the app by running the following script:
```
npm start
```

## Available Scripts (Kept from the `create-react-app` documentation)

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
