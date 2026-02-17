export const adminOnly = async (req, res, next) => {
    try {
        // User should already be attached by protect middleware
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        // Check if user has admin role
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }
        next();
    }
    catch (error) {
        console.error("Admin middleware error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
//# sourceMappingURL=adminMiddleware.js.map