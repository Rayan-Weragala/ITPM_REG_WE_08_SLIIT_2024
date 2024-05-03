import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import deleteIcn from "../../Images/trash (1).png";
import updateIcn from "../../Images/refresh.png";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import Dashboard from './Dashboard';


const TableComponent = () => {
  
  const [userData, setusersData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [updatedPayment, setUpdatedPayment] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Function to handle click event of update icon
  const handleUpdatePayment = (userId) => {
    setSelectedUserId(userId);
  };
  const handleGenerateReport = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Set the header for the PDF
    doc.setFontSize(16);
    doc.text('Client Details Report', 10, 10);

    // Create a table for the data
    const rows = userData.map((user, index) => {
      return [
        index + 1,
        user.username,
        user.email,
        user.phone,
        user.ongoing ? user.ongoing.join(', ') : ''
      ];
    });

    doc.autoTable({
      head: [['#', 'Username', 'Email', 'Phone', 'Ongoing Tours']],
      body: rows,
      startY: 20
    });

    // Save the PDF
    doc.save('Client_Details_Report.pdf');
  };




  // Function to fetch data from backend
  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8090/user");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setusersData(data); // Update state with fetched data

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle updating user data
  const updateUserPayment = async (userId, paymentStatus) => {
    try {
      const response = await fetch(`http://localhost:8090/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payments: paymentStatus }),
      });
      if (response.ok) {
        // Update state after successful update
        fetchUserData();
        toast.success("Payment status updated successfully", {
          position: "top-center",
        });
      } else {
        throw new Error("Failed to update payment status");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Failed to update payment status");
    }
  };


  // Function to fetch user data along with ongoing tour information from backend
  const fetchUserData2 = async () => {
    try {
      const response = await fetch("http://localhost:8090/user/withOngoingTours");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setusersData(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // delete user
  // delete user
  const deleteUser = async (userId, username) => {
    try {
      toast.info(
        <div>
          <p>{`Are you sure you want to delete ${username}?`}</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={async () => {
                const response = await fetch(`http://localhost:8090/user/${userId}`, {
                  method: "DELETE",
                });
                if (response.ok) {
                  // Update state after deletion
                  setusersData(userData.filter((user) => user._id !== userId));
                  toast.success(`${username} deleted successfully`, {
                    position: "top-center"
                  });

                } else {
                  throw new Error("Failed to delete user");
                }
              }}
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss()}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              No
            </button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };


  // Fetch data on component mount
  useEffect(() => {
    fetchUserData();
    fetchUserData2();
  }, []);



  return (
    <>

    <Dashboard/>

    <div className="container mx-auto mt-5">
      <ToastContainer />
      <div className='flex justify-left mb-7'> {/* Adjusted alignment to center */}
        <p style={{ fontWeight: 'bold', fontSize: '2rem', fontFamily: 'Arial, sans-serif' }}>Client Details</p> {/* Applied bold font and increased font size */}
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <button
            className="px-4 py-2 font-semibold bg-yellow-500 text-black rounded-lg hover:bg-yellow-400"
            onClick={handleGenerateReport}
          >
            Report PDF
          </button>
        </div>
        <div className="flex items-center mx-auto">
          <span className="mr-2">Filter</span>
          <select className="border p-1 rounded"/* onChange={handleFilterChange}*/>
            <option value="">All</option> {/* Default option */}
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="relative flex">
          <input
            type="text"
            placeholder="Search..."
            className={`px-4 py-2 border rounded-l-lg flex-1 ${(searchInput.length > 0 && /^[0-9]/.test(searchInput)) ||
                (searchInput.length > 0 && /^[^a-zA-Z]/.test(searchInput))
                ? 'border-red-500'
                : 'border-gray-300'
              }`}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput.length > 0 && /^[0-9]/.test(searchInput) && (
            <p className="text-red-500 text-sm mt-1 absolute left-0 bottom-full">Search term cannot start with a number</p>
          )}
          {searchInput.length > 0 && /^[^a-zA-Z]/.test(searchInput) && (
            <p className="text-red-500 text-sm mt-1 absolute left-0 bottom-full">Search term cannot start with a special character</p>
          )}
          <button className="px-4 font-semibold bg-gray-900 text-white rounded-r-lg hover:bg-gray-700 hover:text-white">
            Search
          </button>

        </div>

      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">UserName</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Ongoing</th>
            <th className="px-4 py-2">Payment</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {/* Populate table rows with data */}
          {userData
            .filter((user) => {
              const searchTerm = searchInput ? searchInput.toLowerCase() : '';
              const username = user.username ? user.username.toLowerCase() : '';
              const email = user.email ? user.email.toLowerCase() : '';

              // Check if the search term contains only letters
              const isAlphaNumeric = /^[a-zA-Z]+$/.test(searchTerm);

              // Check if the search term is empty or contains only letters
              if (searchTerm === '' || isAlphaNumeric) {
                // Filter by username or email containing the search term
                return (
                  (username.includes(searchTerm) && !/^[\d]/.test(searchTerm)) ||
                  (email.includes(searchTerm) && !/^[\d]/.test(searchTerm))
                );
              } else {
                // Filter only by username or email starting with the search term
                return (
                  (username.startsWith(searchTerm) && !/^[\d]/.test(searchTerm)) ||
                  (email.startsWith(searchTerm) && !/^[\d]/.test(searchTerm))
                );
              }
            })
            .map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user._id.toString().substring(0, 8)}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.ongoing ? user.ongoing.join(', ') : ''}</td>
                <td className="border px-4 py-2">
                  {selectedUserId === user._id ?
                    <select
                      value={updatedPayment}
                      onChange={(e) => {
                        setUpdatedPayment(e.target.value);
                        updateUserPayment(user._id, e.target.value);
                      }}
                    >
                      <option value="None">-</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Verified">Verified</option>
                    </select>
                    : (
                      user.payments
                    )}
                </td>

                <td className="border px-4 py-2" style={{ textAlign: "right" }}>
                  <img
                    src={updateIcn}
                    alt="Update"
                    style={{ width: "20px", height: "20px", display: "inline-block", marginRight: "20px" }}
                    onClick={() => handleUpdatePayment(user._id)}
                  />
                  <img
                    src={deleteIcn}
                    alt="Delete"
                    style={{ width: "20px", height: "20px", display: "inline-block", cursor: "pointer" }}
                    onClick={() => deleteUser(user._id, user.username)}
                  />
                </td>
              </tr>

            ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default TableComponent;
