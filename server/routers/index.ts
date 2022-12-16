import { Router } from "express";
import { getCredentials, getUser } from "../controllers";

const router = Router();

router.get('/api/callback', getCredentials);
router.get('/api/user', getUser)

export default router;