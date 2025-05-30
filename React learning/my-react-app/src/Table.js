import React, { useState } from "react";

export const Table = () => {
    const [flag, setFlag] = useState(false)

    const array = [{ id: 1, name: "bhavesh", age: 23, city: "bhandara" },
    { id: 2, name: "suraj", age: 23, city: "mumbai" }, { id: 3, name: "deepam", age: 23, city: "pune" }]

    const another = [{ id: 1, name: "bhavesh", age: 23, city: "bhandara" },
    { id: 2, name: "suraj", age: 23, city: "mumbai" }, { id: 3, name: "deepam", age: 23, city: "pune" }]

    return (
        <>
            {flag ?
            (<table border="1" style={{ width: "50%", border: "1px solid red" }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {array.map((item) => (<tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.city}</td>
                    </tr>))}
                </tbody>
            </table>):"change the button value to show or hide the table" }
            <button style={{ font: "20px" }} onClick={() => { setFlag(!flag) }}>show Table</button>

            <div>
                <h4>Another array</h4>
                <ol>{another.map((item)=>(<li>{item.name}</li>))}</ol>
            </div>
        </>
    );

}