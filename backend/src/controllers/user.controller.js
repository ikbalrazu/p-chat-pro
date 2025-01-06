import mongoose from "mongoose";
import User from "../models/user.model.js";
import { sendNotification } from "../utils/socket.js";

export const FriendRequest = async(req,res) => {
    const {receiverId} = req.body;
    const loggedInUserId = req.user._id;
    try {
      // const sender = await User.findById(senderId);
      // const receiver = await User.findById(receiverId);

      const [sender, receiver] = await Promise.all([
        User.findById(loggedInUserId),
        User.findById(receiverId),
      ])

      if (!receiverId || !loggedInUserId) {
          return res.status(400).json({ message: "Both sender and receiver IDs are required." });
      }
      // Check if a friend request already exists
      if (receiver.friendRequests.includes(loggedInUserId)) {
        return res.status(400).json({ message: "Friend request already sent." });
      }

      // Check if they are already friends
      if (receiver.friends.includes(loggedInUserId)) {
        return res.status(400).json({ message: "You are already friends." });
      }

      // Update friend requests lists
      receiver.friendRequests.push(loggedInUserId);
      sender.sendRequests.push(receiverId);

      // Save sender and receiver
      await Promise.all([receiver.save(), sender.save()]);
      
      return res.status(200).json({ 
        message: "Friend request sent successfully."
      });
    } catch (error) {
      res.status(500).json({message:error.message})
    }
    
    // try {
    //   const [sender, receiver] = await Promise.all([
    //     User.findById(senderId),
    //     User.findById(receiverId),
    //   ]);

    //   if (!sender || !receiver) {
    //     return res.status(404).json({ message: "Sender or receiver not found." });
    //   }

    //   if (receiver.friendRequests.includes(senderId)) {
    //     return res.status(400).json({ message: "Friend request already sent." });
    //   }

    //   if (receiver.friends.includes(senderId)) {
    //     return res.status(400).json({ message: "You are already friends." });
    //   }

    //   // Update friend requests using a transaction
    //   const session = await mongoose.startSession();
    //   session.startTransaction();

    //   try {
    //     receiver.friendRequests.push(senderId);
    //     sender.sendRequests.push(receiverId);

    //     await receiver.save({ session });
    //     await sender.save({ session });

    //     await session.commitTransaction();
    //     session.endSession();

    //     // Notify receiver in real time
    //     sendNotification(receiverId, {
    //       type: "friend-request",
    //       message: `${senderId} sent you a friend request.`,
    //     });

    //     return res.status(200).json({ message: "Friend request sent successfully." });

    //   } catch (error) {
    //     await session.abortTransaction();
    //     session.endSession();
    //     throw transactionError;
    //   }

    // } catch (error) {
    //   return res.status(500).json({ message: "An error occurred. Please try again later." });
    // }

    // receiver.friendRequests.push(senderId);
    // sender.sendRequests.push(receiverId);
    // await receiver.save();
    // await sender.save();
  
    // res.status(200).json({ message: "Friend request sent successfully." });
}

export const SendRequest = async(req,res)=>{
  const {receiverId} = req.body;
}

export const AcceptRequest = async(req,res) => {
    const { userId, requestId } = req.body;

  // Notify sender in real time
  sendNotification(senderId, {
    type: "friend-request-accepted",
    message: `${requestId} accepted your friend request.`,
  });

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

export const CancelRequest = async(req,res)=>{
  const {friendId, userId } = req.body;
  // const userId = req.user._id;

  // Validate input
  if (!userId || !friendId) {
    return res.status(400).json({ message: "Both userId and friendId are required." });
  }

  const [user, friend] = await Promise.all([
    User.findById(userId),
    User.findById(friendId),
  ])
  // const friendObjectId = new mongoose.Types.ObjectId(friendId);
  // const isFriendRequested = user.sendRequests.some(id => id._id.equals(friendObjectId));
  // console.log(friendObjectId);
  // console.log(user.sendRequests.includes(friendObjectId));
  // console.log(isFriendRequested);

  if (!user || !friend) {
    return res.status(404).json({ message: "User or friend not found." });
  }

  // Check if they are friends
  // if (!user.sendRequests.includes(friendId)) {
  //   return res.status(400).json({ message: "You are not friends with this user." });
  // }

  // Check if the user has sent a friend request to the friend (userId should be in sendRequests of the friend)
  const friendObjectId = new mongoose.Types.ObjectId(friendId); // Convert friendId to ObjectId
  const userObjectId = new mongoose.Types.ObjectId(userId); // Convert userId to ObjectId

  const hasSentRequest = user.sendRequests.some(id => id.equals(friendObjectId)); 
  const hasReceivedRequest = friend.friendRequests.some(id => id.equals(userObjectId));
  console.log(hasSentRequest);
 
  if (!hasSentRequest || !hasReceivedRequest) {
    return res.status(400).json({ message: "No request found to cancel." });
  }

  // Remove each other from friends lists
  

  // await user.save();
  // await friend.save();

  res.status(200).json({ message: "User Cancel Request successfully." });

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
    const currentUser = await User.findById(userId).select('friends friendRequests sendRequests');
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
            // { _id: { $nin: friendsList } },
            // { _id: { $in: currentUser.friendRequests } },
            { _id: { $ne: userId } }
          ]
        }
      },
      {
        $addFields: {
          friendRequests: {
            $cond: [
              { $in: ["$_id", currentUser.friendRequests] }, // Check if the user is in the `friendRequests` list
              true,
              false            
            ]
          },
          sendRequests: {
            $cond: [
              { $in: ["$_id", currentUser.sendRequests] }, // Check if the user is in the `friendRequests` list
              true,
              false            
            ]
          },
          friends: {
            $cond: [
              { $in: ["$_id", currentUser.friends] }, // Check if the user is in the `friendRequests` list
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
          friendRequests: 1,
          sendRequests: 1,
          friends: 1,
          profilePic: 1
        }
      }
    ]);
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for users.' });
  }
}
