import { Request, Response, NextFunction } from 'express';

// Error handler middleware
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

// Not found middleware
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Request logger
export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path} [${new Date().toISOString()}]`);
  next();
};
