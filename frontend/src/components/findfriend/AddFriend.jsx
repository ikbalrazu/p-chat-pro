import React, { useState } from 'react'
import { axiosInstance } from '../../lib/axios';
import debounce from 'lodash.debounce';
import { useAuthStore } from '../../store/useAuthStore';

const AddFriend = () => {
  const { friendRequestList } = useAuthStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  return (
    <>
      <div className="p-4 flex flex-col items-center justify-between">
        <h2 className="text-md font-semibold text-gray-800 dark:text-white mb-1">Add Friend</h2>
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
      </div>

      <div
        className="h-[86%] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
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

                <button
                  // onClick={() => sendFriendRequest(user._id)}
                  // disabled={requestedFriends.has(user._id)}
                  // className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  className={`px-1 py-1 rounded-md text-xs 
                    ${user.invited
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                    }`
                  }
                >
                  {user.invited ? 'INVITED' : 'INVITE'}
                </button>

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