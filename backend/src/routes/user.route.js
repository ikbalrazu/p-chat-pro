import express from "express"; 
import { AcceptRequest, FriendRequest, RejectRequest, Unfriend } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/friend-request",FriendRequest);
router.post("/accept-request",AcceptRequest);
router.post("/reject-request",RejectRequest);
router.post("/unfriend",Unfriend);

export default router;