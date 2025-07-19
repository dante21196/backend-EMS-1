import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../models/User/service';
import { generateToken, validatePassword } from '../services/authService';
import { sendEmail } from '../services/resendEmailService';
import { successResponse, errorResponse } from '../config/response';
import { AuthRequest } from '../middlewares/auth';

// POST /register
export const registerUser = async (req: Request, res: Response) => {
  try {
      console.log("Request body register user:", req.body)

    const { name, email, password, role_id } = req.body; 

    if (!name || !email || !password) {
      return errorResponse(res, 'Name, email, and password are required', 400);
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return errorResponse(res, 'Email already registered', 409);
    }

    const user = await createUser({ name, email, password, role_id });
    
       const emailResponse = await sendEmail({
      to: email,
      subject: `Welcome to Trackspace EMS, ${name}!`,
      html: `<h2>Greetings Dear ${name},</h2><p>Your account is ready to go. Set your password and begin tracking. Let's get tracking!</p>`,
    });
     if (!emailResponse.success) {
      console.warn('Email not sent, but user created.');
          return errorResponse(res, 'Registration failed', 500, {msg : "Email not sent"});
    }
    else
    return successResponse(res, 'User created', { id: user._id, email: user.email,emailResponse  }, 201);
  } catch (err) {
    return errorResponse(res, 'Registration failed', 500, err instanceof Error ? err.message : err);
  }
};

// POST /login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Email and password are required', 400);
    }

    const user = await getUserByEmail(email);
    if (!user || !(await validatePassword(password, user.password))) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    const token = generateToken(user);
    return successResponse(res, 'Login successful', { token,user },200);
  } catch (err) {
    return errorResponse(res, 'Login failed', 500, err instanceof Error ? err.message : err);
  }
};

// GET /profile
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return errorResponse(res, 'Unauthorized', 401);
    }

    const { email, id } = req.user;
    return successResponse(res, 'Profile fetched', { id, email });
  } catch (err) {
    return errorResponse(res, 'Failed to fetch profile', 500, err instanceof Error ? err.message : err);
  }
};

export const test = (req: Request, res: Response) => {
       return successResponse(res, 'Test Route', 200);
 
};