import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase, pool } from './database';
import { AuthService } from './auth';
import { AuthRequest } from './types';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/signup', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      message: 'Email, password, and name are required'
    });
  }

  const result = await AuthService.signup({ email, password, name });
  const status = result.success ? 201 : 400;
  res.status(status).json(result);
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  const result = await AuthService.login({ email, password });
  const status = result.success ? 200 : 401;
  res.status(status).json(result);
});

app.get('/api/verify', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ valid: false, message: 'No token provided' });
  }

  const result = await AuthService.verifyToken(token);
  res.json(result);
});

app.get('/api/me', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const verification = await AuthService.verifyToken(token);
    
    if (!verification.valid || !verification.userId) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Fetch user data from database
    const result = await pool.query(
      'SELECT id, email, name, created_at FROM users WHERE id = $1',
      [verification.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = result.rows[0];
    
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();