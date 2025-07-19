import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../models/User/service';
import { generateToken, validatePassword } from '../services/authService';
import { sendEmail } from '../services/resendEmailService';
import { successResponse, errorResponse } from '../config/response';
import { AuthRequest } from '../middlewares/auth';
import { createCompany } from '../models/Company/service';

// POST /register
export const registerCompany = async (req: Request, res: Response) => {
  try {
      console.log("Request body register user:", req.body)
    const {adminEmail,adminFirstName,adminLastName,companyName,plan,trialDays,message} = req.body
   const name = adminFirstName + ' ' + adminLastName;
   const email = adminEmail;
   const password = 'TEST!@#123'
    if (!companyName || !plan) {
      return errorResponse(res, 'Company name and plan are required', 400);
    }

    if (!name || !email ) {
      return errorResponse(res, 'Name, email are required', 400);
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return errorResponse(res, 'Email already registered', 409);
    }
    const company : any = await createCompany({
      name: companyName,
      website: adminEmail,
      plan,
      foundingYear: new Date().getFullYear(),
      isActive: true,
    }); 
    const company_id = company._id.toString();
    const user = await createUser({ company_id, name, email, password });

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


// GET /profile
export const getCompanyProfile = async (req: AuthRequest, res: Response) => {
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