import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {

    try {
        await mongoose.connect(config.db_url as string); // atalas url will be used here 

        //const port = 5000;

        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.PORT}`)
        })
    } catch (error) {

    }
}

main().catch(err => console.log(err)); //calling the main function to run 
