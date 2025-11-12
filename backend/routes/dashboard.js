import express from "express";
import { authMiddleware, authorizeRoles } from "../middleware/authmiddleware.js";
const router = express.Router();

router.get("/admin", authMiddleware, authorizeRoles("admin"), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}` });
});

router.get("/manager", authMiddleware, authorizeRoles("manager", "admin"), (req, res) => {
  res.json({ message: `Welcome Manager ${req.user.name}` });
});

router.get("/user", authMiddleware, authorizeRoles("user", "manager", "admin"), (req, res) => {
  res.json({ message: `Welcome User ${req.user.name}` });
});

const dashboardRouter = router;
export default dashboardRouter;