import User from "../models/user.model.js";

export const FriendRequest = async(req,res) => {
    const {receiverId} = req.body;
    const senderId = req.user._id;

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!receiverId) {
        return res.status(400).json({ message: "Both sender and receiver IDs are required." });
    }

    if (!sender || !receiver) {
        return res.status(404).json({ message: "Sender or receiver not found." });
    }
  
    if (receiver.friendRequests.includes(senderId)) {
        return res.status(400).json({ message: "Friend request already sent." });
    }
  
    if (receiver.friends.includes(senderId)) {
        return res.status(400).json({ message: "You are already friends." });
    }
  
    receiver.friendRequests.push(senderId);
    await receiver.save();
  
    res.status(200).json({ message: "Friend request sent successfully." });
}

export const AcceptRequest = async(req,res) => {
    const { userId, requestId } = req.body;

    // Validate input
    if (!userId || !requestId) {
      return res.status(400).json({ message: "Both userId and requestId are required." });
    }

    const user = await User.findById(userId);
    const requester = await User.findById(requestId);

    if (!user || !requester) {
      return res.status(404).json({ message: "User or requester not found." });
    }

    if (!user.friendRequests.includes(requestId)) {
      return res.status(400).json({ message: "No pending friend request from this user." });
    }

    // Add each other as friends
    user.friends.push(requestId);
    requester.friends.push(userId);

    // Remove the friend request
    user.friendRequests = user.friendRequests.filter((id) => id.toString() !== requestId);

    await user.save();
    await requester.save();

    res.status(200).json({ message: "Friend request accepted successfully." });
}

export const RejectRequest = async(req,res)=>{
    const { userId, requestId } = req.body;

    // Validate input
    if (!userId || !requestId) {
      return res.status(400).json({ message: "Both userId and requestId are required." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.friendRequests.includes(requestId)) {
      return res.status(400).json({ message: "No pending friend request from this user." });
    }

    // Remove the friend request
    user.friendRequests = user.friendRequests.filter((id) => id.toString() !== requestId);

    await user.save();

    res.status(200).json({ message: "Friend request rejected successfully." });

}

export const Unfriend = async(req,res)=>{
    const { userId, friendId } = req.body;

    // Validate input
    if (!userId || !friendId) {
      return res.status(400).json({ message: "Both userId and friendId are required." });
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found." });
    }

    // Check if they are friends
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: "You are not friends with this user." });
    }

    // Remove each other from friends lists
    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    friend.friends = friend.friends.filter((id) => id.toString() !== userId);

    await user.save();
    await friend.save();

    res.status(200).json({ message: "User unfriended successfully." });
}

export const MyFriends = async(req,res)=>{
  try {
    const users = await User.find({ _id: { $in: req.user.friends } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export const SearchFriends = async(req, res) => {
  const {query} = req.query || "";
  const userId = req.user._id;
  try {
    const currentUser = await User.findById(userId).select('friends friendRequests');
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const friendsList = currentUser.friends;
    
    const users = await User.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                { fullName: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
              ]
            },
            { _id: { $nin: friendsList } },
            // { _id: { $in: currentUser.friendRequests } },
            { _id: { $ne: userId } }
          ]
        }
      },
      {
        $addFields: {
          invited: {
            $cond: [
              { $in: ["$_id", currentUser.friendRequests] }, // Check if the user is in the `friendRequests` list
              true,
              false            
            ]
          },
        }
      },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          invited: 1,
          profilePic: 1
        }
      }
    ]);

    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for users.' });
  }
}
