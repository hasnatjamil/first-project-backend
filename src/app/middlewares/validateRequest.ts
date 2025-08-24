import express, { Request, Response, NextFunction } from 'express'
import { ZodObject, ZodRawShape } from 'zod'

const validateRequest = (schema: ZodObject<ZodRawShape>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const zodParseData = await schema.parseAsync({
        body: req.body,
      })

      next()
    } catch (err) {
      next(err)
    }
  }
}

export default validateRequest
