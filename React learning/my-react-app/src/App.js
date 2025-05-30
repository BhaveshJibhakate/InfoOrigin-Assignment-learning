import './App.css';
import React from 'react';
// import Divcheck from './Divcheck';
// import Home from './Styledcomponent';
import 'bootstrap/dist/css/bootstrap.min.css';
// import MyComponent from './ThemeDemo';
// import MarginDemo from './MarginDemo';
// import AnchorDemo from './AnchorDemo';
// import { EffectDemo } from './EffectDemo';
// import { Table } from './Table';
// import Parent from './NestedComponents/Parent';
// import Floating from './Floating';
import FloatingButton from './FloatingButton';

function App() {
  // const [data, setData] = useState([{
  //   id: 1,
  //   name: "Bhavesh",
  //   like:0,
  //   dislike:0
  // }, {
  //   id: 2,
  //   name: "Digesh",
  //   like:0,
  //   dislike:0
  // }]);

  // const [inputvalue, setInputvalue] = useState();
  // function handlechange(e) {
  //   setInputvalue(e.target.value)
  // }
  // function handleclick(e) {
  //   if (inputvalue.trim()) {
  //     const newdata = {
  //       id: data.length + 1,
  //       name: inputvalue,
  //       like:0,
  //       dislike:0
  //     }
  //     setData([...data, newdata]);
  //   }

  // }

  // const handledelete = (id) => {
  //   setData(data.filter((prev) => prev.id !== id))
  // }

  // const handlelike=(id,like)=>{
 
  //   const new_data=data.map((item)=>item.id===id ?{...item,like:like+1}:item)
  //   setData(new_data);

  // }
  // const handledislike=(id,dislike)=>{
  //   const new_data=data.map((item)=>item.id===id ?{...item,dislike:dislike+1}:item)
  //   setData(new_data);
  // }
  // const handlesort=()=>{
  //   const new_sorted=[...data].sort((a,b)=>b.like-a.like)
  //   setData(new_sorted);
  // }

  return (
    <>
    {/* <button onClick={handlesort}>Sort</button>
      <input type='text' placeholder='add here' value={inputvalue} onChange={handlechange} /><button onClick={handleclick}>Add</button>
      <h1>This are the values from the array i have added</h1>
      {data.map((item) => {
        return (<div key={item.id} style={{ border: "solid 1px red", backgroundColor: "aqua", textAlign: "center" }}>
          <h3>
            <span style={{ marginRight: "25px" }}>{item.id}</span>{item.name}
          </h3>
          <div>Like:{item.like}</div>
          <div>Dislike:{item.dislike}</div>
          <button onClick={() => { handlelike(item.id,item.like) }}>like</button>
          <button onClick={() => { handledislike(item.id,item.dislike) }}>Dislike</button>
          <button onClick={() => { handledelete(item.id) }}>Delete</button>
          </div>)
      })} */}
      {/* <Divcheck/>
      <Home/>
      <MyComponent/>
      <MarginDemo/> */}
      {/* <AnchorDemo/> */}
      {/* <EffectDemo/> */}
      {/* <Table/>
      <Parent/> */}
      <FloatingButton/>
    </>
  );
}

export default App;
