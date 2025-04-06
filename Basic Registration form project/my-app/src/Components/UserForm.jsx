import React, { useState } from "react";
import { registerUser } from "../reducers/actions";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'


const UserForm = () => {
    const dispatch=useDispatch();
    const {user,loading,error}=useSelector((state)=>state.user)
    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: "",
        gender:null
    })
   const handleChange=(e)=>{
         setformData({
            ...formData,
            [e.target.name]:e.target.value
         })
   }

   const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(registerUser(formData));
   }

   const options = [
     { value: "male", label: "male" },
     { value: "female", label: "female" },
     { value: "other", label: "other" },
   ];
   const inputstyle = {
     width: "100%",
     boxSizing: "border-box",
     border: "1px solid #999",
     padding: "10px",
     margin: "10px 0",
     borderRadius: "4px",
     display: "block",
   };
   const buttonstyle = {
     width: "100%",
     padding: "10px",
     backgroundColor: "#007bff",
     border: "none",
     borderRadius: "4px",
     cursor: "pointer",
   };
   const customstyle = {
     control: (base, state) => ({   // is se visible input field ki styling hogi
       ...base,
       backgroundColor: "white",
       borderColor: state.isFocused ? "blue" : "#ccc", // click ya focus krne pr border blue hoga 
       '&:hover': {
        borderColor: 'blue'                  // hover hone par border blue
      }
     }),
     option: (base,state)=>({  // is se dropdown expand hone pr jo options dikhte hai unki styling
        // is me isSelected true hoga agar option wo particular option selected ho tab styling
        // isFocussed true hoga jab option pe apan hover kr rhe ho tab ki styling
       ...base,
       backgroundColor: state.isFocused ? "red": "pink",  // jab option pe hover krenge tab red else other option pink me honge
    
     })             

   };

    return (
      <>
        <div
          style={{
            width: "350px",
            border: "2px solid black",
            margin: " 100px auto",
            padding: "10px",
            backgroundColor: "lightblue",
          }}
        >
          <h1>Registration Form</h1>
          <form onSubmit={handleSubmit}>
            <input
              style={inputstyle}
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              required
              onChange={handleChange}
            />
            <input
              style={inputstyle}
              name="email"
              type="text"
              placeholder="email"
              value={formData.email}
              required
              onChange={handleChange}
            />
            <input
              style={inputstyle}
              name="password"
              type="password"
              placeholder="password"
              value={formData.password}
              required
              onChange={handleChange}
            />
            {/* this is to test react-select */}
            <Select
              //   value={formData.gender}
              value={options.find((option) => option.value === formData.gender)}
              options={options}
              placeholder="select gender"
              isClearable={true}
              //   onChange={(selectedOption) =>
              //     setformData({ ...formData, gender: selectedOption })
              //   }
              onChange={(selectedOption) =>
                setformData({
                  ...formData,
                  gender: selectedOption ? selectedOption.value : null,
                })
              }
              styles={customstyle}
            />
            <br></br>
            <button type="submit" disabled={loading} style={buttonstyle}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          {user && <p style={{ color: "green" }}>Welcome {user.name}!</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <FontAwesomeIcon icon={faPenToSquare}/>
        </div>
      </>
    );
}
export default UserForm