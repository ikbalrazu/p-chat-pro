import React, { useState } from 'react'
import { axiosInstance } from '../../lib/axios';
import debounce from 'lodash.debounce';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserStore } from '../../store/useUserStore';

const AddFriend = () => {
  const { friendRequestList, authUser } = useAuthStore();
  const { friendRequest } = useUserStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [activeComponent, setActiveComponent] = useState(null);

  const searchFriendsHandler = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setMessage('');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const response = await axiosInstance.get(`/user/search-friends?query=${searchQuery}`);
      console.log(response);
      if (response.data.users.length === 0) {
        setMessage('No users found.');
      } else {
        setResults(response.data.users);
      }
    } catch (error) {
      setMessage('Error fetching search results.');
    } finally {
      setLoading(false);
    }
  };

  // Debounced version of the search function
  const debouncedSearch = debounce((searchQuery) => searchFriendsHandler(searchQuery), 500);

  // Handle input change and trigger search
  const handleInputChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    debouncedSearch(searchQuery);
  };

  const friendsActionHandler = async (id) => {
    console.log(id);
    const res = await axiosInstance.post(`/user/friend-request`, { receiverId: id });
    console.log(res);
    if(res.status === 200){
      setResults((prevResults)=>
        prevResults.map((user)=> user._id === id ? {...user, sendRequests:true} : user )
      )
    }
    
  }

  const invaitedCancelHandler = async (id) => {
    console.log(id);
    try {
      const res = await axiosInstance.post(`/user/cancel-request`, { friendId: id });
      console.log(res);
      setResults((prevResults)=>
        prevResults.map((user)=> user.sendRequests._id === id ? {...user, sendRequests:false} : user )
      )
    } catch (error) {
      console.error("Error canceling friend request:", error);
    }
  }

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Add":
        return <div>Add Friend Component</div>;
      case "Request":
        return <div>Request Component</div>;
      case "SendRequest":
        return <div>Send Request Component</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="p-4 flex flex-col items-center justify-between">
        <h2 className="text-md font-semibold text-gray-800 dark:text-white mb-1">Add Friend</h2>
        <button onClick={() => console.log(results)}>check</button>
        <div
          className="flex rounded-md items-center max-w-md w-full">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search by name or email"
            className='w-full p-3 h-1 text-sm border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2'
          />
        </div>

        {/* <div className='flex justify-between gap-5'>
          <button
          className={`px-4 py-2 rounded-md ${
            activeComponent === "Add" ? "bg-blue-700 text-white" : "bg-blue-500 text-white"
          }`}
          onClick={() => setActiveComponent("Add")}
          >Add
          </button>
          <button
          className={`px-4 py-2 rounded-md ${
            activeComponent === "Request" ? "bg-green-700 text-white" : "bg-green-500 text-white"
          }`}
          onClick={() => setActiveComponent("Request")}
          >Request</button>
          <button
          className={`px-4 py-2 rounded-md ${
            activeComponent === "SendRequest" ? "bg-purple-700 text-white" : "bg-purple-500 text-white"
          }`}
          onClick={() => setActiveComponent("SendRequest")}
          >Send Request</button>
        </div> */}
        {/* Render the active component */}
        {/* <div className="mt-6 w-full">{renderActiveComponent()}</div> */}

      </div>

      <div
        className="h-[80%] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
      >
        {loading ? (
          <p className="text-center text-sm text-gray-500">Loading...</p>
        ) : (

          <ul
            className="space-y-2 flex-1"
          >
            {results?.map((user) => (
              <li
                key={user._id}
                className="flex items-center justify-between p-2 border rounded-md mx-2"
              >
                <div
                  className="w-12 h-10 text-white rounded-full flex items-center justify-center"
                >
                  <img
                    src={user.profilePic || "https://randomuser.me/api/portraits/men/1.jpg"}
                    width="45"
                    height="45"
                    alt={user?.fullName}
                    className='overflow-hidden rounded-full'
                  />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800 dark:text-white">{user.fullName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className='flex flex-col gap-1 justify-center items-center'>

                  {/* Already friends */}
                  {user.friends ? (
                    <p className="text-xs text-gray-500">Friends</p>
                  ) : (
                    <>
                      {/* Invite or Pending Button */}
                      {user.sendRequests && !user.friendRequests && (
                        <>
                          <button
                            className="
                              px-4 py-1 
                              rounded-md
                              text-black 
                              text-xs 
                              cursor-not-allowed
                              "
                            disabled
                          >
                            Pending
                          </button>
                          <button
                            onClick={() => invaitedCancelHandler(user._id)}
                            className="px-4 py-1 rounded-md bg-gray-400 text-white text-xs hover:bg-gray-500 transition-all"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {/* Accept/Decline Buttons */}
                      {user.friendRequests && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => acceptRequestHandler(user._id)}
                            className="px-4 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-all"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => declineRequestHandler(user._id)}
                            className="px-4 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition-all"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                      {!user.sendRequests && !user.friendRequests && (
                        <button
                          onClick={() => friendsActionHandler(user._id)}
                          className="px-4 py-1 rounded-md bg-green-500 text-white text-xs hover:bg-green-600 transition-all"
                        >
                          Invite
                        </button>
                      )}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>

        )}
      </div>
      {message && <p className="text-center text-sm mt-2">{message}</p>}

    </>
  )
}

export default AddFriend