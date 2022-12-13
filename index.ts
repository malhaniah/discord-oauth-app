import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import { config } from 'dotenv';
import router from './routers';


async function main() {
    const app = express();
    
    config();
    
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', router);


    app.listen(process.env.PORT, () => console.log(chalk.blue(`Server is running on port ${process.env.PORT}`)));
}


main();