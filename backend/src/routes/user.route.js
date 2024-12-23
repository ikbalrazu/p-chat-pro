import express from "express"; 
import { AcceptRequest, AllFriends, FriendRequest, RejectRequest, Unfriend } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/friend-request",FriendRequest);
router.post("/accept-request",AcceptRequest);
router.post("/reject-request",RejectRequest);
router.post("/unfriend",Unfriend);
router.post("/all-friends",AllFriends);

export default router;