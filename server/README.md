# Customer Lighthouse Audits
Internal application running daily reports on customer websites using [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) guidelines.

## Development
With [npm](https://npmjs.org/) installed , run the following script in `/server` folder and `/client`
```shell
npm install
```

To start server run the following script in `/server` folder
```shell
npm run dev
```

## Technologies
##### Backend
- NodeJS
- Express
- SQLite
- Sequelize
- Nodemailer
- Lighthouse Batch

##### Frontend
- React
- React Google Charts

## Roadmap
To be implemented:
- Ability to add/delete customers/pages
- Scheduler to run daily reports
- Compare reports and depending on report differences fire email to responsible PMs or RMs in the project 
