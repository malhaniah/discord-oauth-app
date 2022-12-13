import { Router } from "express";
import { getCredentials } from "../controllers";

const router = Router();

router.get('/api/callback', getCredentials);

export default router;