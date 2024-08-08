import axios from "axios";
import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const[filteredUsers,setFilteredUsers]=useState([]);
  const[ismodelOpen,setIsmodelOpen]=useState(false);
  const[userData,setUserData]=useState({name:"",age:"",city:""})

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      console.log(response.data);
      setUsers(response.data);
      setFilteredUsers(response.data);

    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(()=>
  {
    getAllUsers();
  },[])

  const handleSearchChange=(e)=>
  {
      const searchText=e.target.value.toLowerCase();
      const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.city.toLowerCase().includes(searchText.toLowerCase()) ||
        user.age.toString().includes(searchText)
    );
    
      setFilteredUsers(filteredUsers);
  }
  const handleDelete= async(id)=>
  {
    const isConfirmed=window.confirm("Are you sure you want to delte this user?")
    if(isConfirmed)
    {
      await axios.delete(`http://localhost:8000/users/${id}`).then((response)=>
        {
          setUsers(response.data);
          setFilteredUsers(response.data);
        })
    }
  }
  const handleAddrecord =()=>
  {
    setUserData({name:"",age:"",city:""})
    setIsmodelOpen(true)
  }

  const closeModal=()=>
  {
    setIsmodelOpen(false);
    getAllUsers();
  }
  const handleData=(e)=>
  {
    setUserData({...userData,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (userData.id) {
        response = await axios.patch(`http://localhost:8000/users/${userData.id}`, userData);
      } else {
        response = await axios.post("http://localhost:8000/users", userData);
      }
      console.log(response);
      setIsmodelOpen(false);
      getAllUsers();
      setUserData({ ...userData, [e.target.name]: e.target.value });
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  
  const updateRecord=(user)=>
  {
setUserData(user);
setIsmodelOpen(true);
  }
  return (
    
    <>
      <div className='container'>
        <h3>CRUD Application</h3>
        <div className="input-search" >
          <input type="search" placeholder="Search Text Here" onChange={handleSearchChange}/>
          <button onClick={handleAddrecord} className='btn green'>Add Record</button>
        </div>
      
      <table className='table'>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          { filteredUsers && filteredUsers.map((user,index)=>
          {
            return(
              <tr key={user.id}>
            <td>{index+1}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.city}</td>
            <td><button onClick={()=>updateRecord(user)} className= 'btn green'>Edit</button></td>
            <td><button onClick={()=>handleDelete(user.id)} className='btn red'>Delete</button></td>
          </tr>
            )
          })}
         
        </tbody>
      </table>
      {ismodelOpen && (
        <div className="modal">
         
          <div className="model-content">
          <span onClick={closeModal} className="close">&times;</span>
            <h2>User record</h2>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" name="name" id="name" value={userData.name} onChange={handleData}/>
            </div>
            <div className="input-group">
              <label htmlFor="age">Age</label>
              <input type="number" name="age" id="age" value={userData.age} onChange={handleData}/>
            </div>
            <div className="input-group">
              <label htmlFor="city"> City</label>
              <input type="text" name="city" id="city" value={userData.city}  onChange={handleData} />
            </div>
            <button className="btn green" onClick={handleSubmit}>Add User</button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default App;
