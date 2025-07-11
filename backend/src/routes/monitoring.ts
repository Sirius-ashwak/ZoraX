import express from 'express';
import { z } from 'zod';

const router = express.Router();

// Error tracking endpoint
const errorSchema = z.object({
  message: z.string(),
  stack: z.string().optional(),
  url: z.string(),
  userAgent: z.string(),
  userId: z.string().optional(),
  timestamp: z.string(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  context: z.record(z.any()).optional()
});

router.post('/errors', (req, res) => {
  try {
    const errorData = errorSchema.parse(req.body);
    
    // In production, send to error tracking service (Sentry, LogRocket, etc.)
    console.error('Frontend Error:', {
      ...errorData,
      timestamp: new Date(errorData.timestamp)
    });
    
    res.json({ success: true, message: 'Error logged successfully' });
  } catch (error) {
    console.error('Failed to log error:', error);
    res.status(400).json({ success: false, message: 'Invalid error data' });
  }
});

// Analytics endpoint
const analyticsEventSchema = z.object({
  name: z.string(),
  properties: z.record(z.any()).optional(),
  userId: z.string().optional(),
  timestamp: z.string(),
  sessionId: z.string()
});

router.post('/analytics/events', (req, res) => {
  try {
    const event = analyticsEventSchema.parse(req.body);
    
    // In production, send to analytics service (Mixpanel, Amplitude, etc.)
    console.log('Analytics Event:', {
      ...event,
      timestamp: new Date(event.timestamp)
    });
    
    res.json({ success: true, message: 'Event tracked successfully' });
  } catch (error) {
    console.error('Failed to track event:', error);
    res.status(400).json({ success: false, message: 'Invalid event data' });
  }
});

// Performance metrics endpoint
const performanceMetricSchema = z.object({
  name: z.string(),
  value: z.number(),
  timestamp: z.string(),
  url: z.string(),
  userAgent: z.string(),
  userId: z.string().optional()
});

router.post('/performance', (req, res) => {
  try {
    const metric = performanceMetricSchema.parse(req.body);
    
    // In production, send to performance monitoring service
    console.log('Performance Metric:', {
      ...metric,
      timestamp: new Date(metric.timestamp)
    });
    
    res.json({ success: true, message: 'Metric recorded successfully' });
  } catch (error) {
    console.error('Failed to record metric:', error);
    res.status(400).json({ success: false, message: 'Invalid metric data' });
  }
});

// User feedback endpoint
const feedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'improvement', 'question']),
  message: z.string(),
  email: z.string().email().optional(),
  rating: z.number().min(1).max(5).optional(),
  page: z.string(),
  userAgent: z.string(),
  timestamp: z.string(),
  userId: z.string().optional()
});

router.post('/feedback', (req, res) => {
  try {
    const feedback = feedbackSchema.parse(req.body);
    
    // In production, save to database or send to support system
    console.log('User Feedback:', {
      ...feedback,
      timestamp: new Date(feedback.timestamp)
    });
    
    res.json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Failed to submit feedback:', error);
    res.status(400).json({ success: false, message: 'Invalid feedback data' });
  }
});

// System status endpoint
router.get('/status', (_req, res) => {
  try {
    const status = {
      status: 'operational',
      timestamp: new Date().toISOString(),
      services: {
        api: 'operational',
        database: 'operational', // Check actual DB connection
        blockchain: 'operational', // Check RPC connection
        storage: 'operational'
      },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: '1.0.0'
    };
    
    res.json(status);
  } catch (error) {
    console.error('Failed to get status:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to retrieve system status' 
    });
  }
});

export default router;
