declare namespace Express {
    interface Request {
        tenantId?: string;
        user?: {
            email: string;
            role: string;
            username: string;
        };
    }
}
