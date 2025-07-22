import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../models/User/service';
import { generateToken, validatePassword } from '../services/authService';
import { sendEmail } from '../services/resendEmailService';
import { successResponse, errorResponse } from '../config/response';
import { AuthRequest } from '../middlewares/auth';
import { createCompany } from '../models/Company/service';
import { RoleService } from '../models/Roles/service';
import { PermissionService } from '../models/Permissions/service';

// POST /register
 const registerCompany = async (req: Request, res: Response) => {
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
    const user = await createUser({ company_id, name, email, role_id: 1, password });
    const setupLink = `http://localhost:3000/auth/set-password`;
    const emailResponse = await sendEmail({
      to: email,
      subject: `Welcome to Trackspace EMS, ${name}!`,
      html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to Trackspace</title>
  </head>
  <body style="font-family: Arial, sans-serif; color: #333; background-color: #f8f8f8; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 5px rgba(0,0,0,0.05); padding: 40px;">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h1 style="color: #4f46e5; margin: 0;">Welcome to Trackspace 🚀</h1>
              </td>
            </tr>
            <tr>
              <td>
                <h2 style="color: #222;">Hi ${name},</h2>
                <p style="font-size: 16px; line-height: 1.6;">
                  Your account is all set up and ready to go.
                  <br /><br />
                  Click the button below to set your password and start tracking like a boss.
                </p>

                <div style="margin: 30px 0; text-align: center;">
                  <a href="${setupLink}" style="background-color: #4f46e5; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px;">
                    Set Your Password
                  </a>
                </div>

                <p style="font-size: 14px; color: #555;">
                  Need help getting started? Our team’s just a ping away.
                  <br />
                  Until then — stay sharp, stay tracked.
                </p>

                <p style="font-size: 14px; color: #777; margin-top: 40px;">
                  — The Trackspace Team
                </p>
              </td>
            </tr>
          </table>

          <p style="font-size: 12px; color: #aaa; margin-top: 20px;">
            If you didn’t request this, you can safely ignore this email.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
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
 const getCompanyProfile = async (req: AuthRequest, res: Response) => {
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

 const test = (req: Request, res: Response) => {
       return successResponse(res, 'Test Route', 200);
 
};

// POST /permission
 const createPermission = async (req: Request, res: Response) => {
  try {
    const permission = await PermissionService.create(req.body);
    return successResponse(res, 'Permission created', permission, 201);
  } catch (err) {
    return errorResponse(res, 'Failed to create permission', 500, err instanceof Error ? err.message : err);
  }
};

// POST /role
 const createRole = async (req: Request, res: Response) => {
  try {
    const role = await RoleService.create(req.body);
    return successResponse(res, 'Role created', role, 201);
  } catch (err) {
    return errorResponse(res, 'Failed to create role', 500, err instanceof Error ? err.message : err);
  }
};
export  { registerCompany, getCompanyProfile, createPermission, createRole, test };