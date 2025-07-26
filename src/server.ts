import mongoose from 'mongoose'
import app from './app'
import config from './app/config'

async function main() {
  try {
    await mongoose.connect(config.database_url as string) // atalas url will be used here

    //const port = 5000;

    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main().catch(err => console.log(err)) //calling the main function to run
