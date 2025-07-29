import cors from 'cors'
import express, { Application, Request, Response } from 'express'
const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

const getController = (req: Request, res: Response) => {
  var a = 5
  //res.send('Hello World!')
  res.send(a)
}

app.get('/', getController)

export default app
