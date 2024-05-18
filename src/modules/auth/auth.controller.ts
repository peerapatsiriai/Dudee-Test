import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from '../../utils/authUtils';
import * as authService from "../../repository/authRepository";
import * as memberService from "../../repository/memberRepository";
import * as accountService from "../../repository/accountRepository";

// Create a new account
export const registerAccount = async (req: Request, res: Response) => {
    try {
        const { account_username, account_password, member_first_name, member_last_name } = req.body;

        // Validate the request body content
        if (
            !account_username.trim() ||
            !account_password.trim() ||
            !member_first_name.trim() ||
            !member_last_name.trim()
        ) {
            return res.status(400).json({ error: "Invalid request body format" });
        }

        // Validate the request body types
        if (
            typeof account_username !== "string" ||
            typeof account_password !== "string" ||
            typeof member_first_name !== "string" ||
            typeof member_last_name !== "string"
        ) {
            return res.status(400).json({ error: "Invalid  request body type" });
        }

        const data = {
            account_username,
            account_password,
            member_first_name,
            member_last_name,
        };
        const { account, member } = await authService.createAccountAndMember(data);

        return res.status(201).json({ account, member });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

// Login member
export const loginMember = async (req: Request, res: Response) => {
    try {
        const { account_username, account_password } = req.body;

        // Validate the request body types
        if (
            typeof account_username !== "string" ||
            typeof account_password !== "string"
        ) {
            return res.status(400).json({ error: "Invalid request body format" });
        }

        // Validate the request body content
        if (!account_username.trim() || !account_password.trim()) {
            return res.status(400).json({error: "Account username and password cannot be empty",});
        }

        const account = await accountService.getAccountByUsername(account_username);

        if (!account) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(account_password,account.account_password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const member = await memberService.getMemberByAccountId(account.account_id);

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        // Generate a JWT for the member
        const token = generateToken(member.member_id);

        return res.status(200).json({ message: "Login successful", token, account, member });
    } catch (error) {
        return res.status(500).json({ error: "Failed to log in" });
    }
};

// Logout
export const logoutMember = async (req: Request, res: Response) => {
    const memberId = (req as any).memberID;    
    return res.status(200).json({ message: `MemberID: ${memberId} logout successfully` });
}