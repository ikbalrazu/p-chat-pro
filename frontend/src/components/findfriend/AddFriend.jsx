import React,{useState} from 'react'

const AddFriend = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 22 },
        { id: 4, name: 'Diana', age: 35 },
    ]);
    // IDs to match
    const matchingIds = [2, 4, 3];

    const filterUsersByIds = (ids) => {
        return users.filter((user) => ids.includes(user.id));
    };

    const filteredUsers = filterUsersByIds(matchingIds);

  return (
    <>
    <div className="p-4 flex flex-col items-center justify-between">
        <h2 className="text-md font-semibold text-gray-800 dark:text-white mb-1">Add Friend</h2>
        <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search friends..."
        //   value={searchTerm}
        //   onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 h-1 text-sm rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2"
        />
        </div>
        <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Filtered Users</h1>
      {filteredUsers.length > 0 ? (
        <ul className="space-y-2">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="p-3 bg-gray-100 rounded-md shadow-sm flex justify-between"
            >
              <span>{user.name} (ID: {user.id}, Age: {user.age})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found matching the specified IDs.</p>
      )}
    </div>
    </div></>
  )
}

export default AddFriend