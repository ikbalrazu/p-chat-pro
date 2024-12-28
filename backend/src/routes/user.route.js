import express from "express"; 
import { AcceptRequest, FriendRequest, MyFriends, RejectRequest, SearchFriends, Unfriend } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/friend-request",protectRoute, FriendRequest);
router.post("/accept-request",AcceptRequest);
router.post("/reject-request",RejectRequest);
router.post("/unfriend",Unfriend);
router.get("/my-friends",protectRoute, MyFriends);
router.get("/search-friends",protectRoute, SearchFriends);

export default router;