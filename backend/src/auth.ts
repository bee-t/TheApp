import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from './database';
import { User, AuthRequest, AuthResponse } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
  static async signup(userData: AuthRequest): Promise<AuthResponse> {
    try {
      const { email, password, name } = userData;

      // Check if user already exists
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (existingUser.rows.length > 0) {
        return { success: false, message: 'User already exists' };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const result = await pool.query(
        'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at',
        [email, hashedPassword, name]
      );

      const user: User = result.rows[0];

      // Generate token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return {
        success: true,
        message: 'User created successfully',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          created_at: user.created_at
        }
      };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Internal server error' };
    }
  }

  static async login(credentials: AuthRequest): Promise<AuthResponse> {
    try {
      const { email, password } = credentials;

      // Find user
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return { success: false, message: 'Invalid credentials' };
      }

      const user: User = result.rows[0];

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return { success: false, message: 'Invalid credentials' };
      }

      // Generate token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return {
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          created_at: user.created_at
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Internal server error' };
    }
  }

  static async verifyToken(token: string): Promise<{ valid: boolean; userId?: number }> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      return { valid: true, userId: decoded.userId };
    } catch (error) {
      return { valid: false };
    }
  }
}