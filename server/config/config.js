module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        dialect: 'mssql',
        dialectOptions: {
            instanceName: process.env.DB_INSTANCE
        }
    },
    // test: {
    //     dialect: 'sqlite',
    //     storage: ':memory:'
    // },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        dialect: 'mssql',
        dialectOptions: {
            instanceName: process.env.DB_INSTANCE
        }
    }
};

