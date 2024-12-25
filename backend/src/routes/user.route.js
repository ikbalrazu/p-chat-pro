import express from "express"; 
import { AcceptRequest, AllFriends, FriendRequest, RejectRequest, SearchFriends, Unfriend } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/friend-request",FriendRequest);
router.post("/accept-request",AcceptRequest);
router.post("/reject-request",RejectRequest);
router.post("/unfriend",Unfriend);
router.post("/all-friends",AllFriends);
router.get("search-friends", SearchFriends);

export default router;