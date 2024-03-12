import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetchDrinks();
  }, []);

  const fetchDrinks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/drinks/');
      setDrinks(response.data);
    } catch (error) {
      console.error('Error fetching drinks:', error);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:8000/drinks/${id}`);
  //     fetchDrinks();
  //   } catch (error) {
  //     console.error('Error deleting drink:', error);
  //   }
  // };

  // const handleEdit = async (id) => {
  //   // Implementirajte logiku za izmenu pića
  // };
  
  return (
    <div className='global'>
      <div className="nav">
        <h1 style={{ fontFamily: "fantasy", fontSize: "45px", letterSpacing: "5px" }}>DRINKS</h1>
      </div>
      <div className="tableOfdrinks">
        <table className="drink-table">
          <thead>
            <tr>
              <th>Redni broj</th>
              <th>Ime pica</th>
              <th>Deskripcija</th>
              <th>Izmeni</th>
              <th>Obriši</th>
            </tr>
          </thead>
          <tbody>
            {drinks.map((drink, index) => (
              <tr key={drink.id}>
                <td>{index + 1}</td>
                <td>{drink.name}</td>
                <td>{drink.description}</td>
                <td>
                  {/* <button className="edit-btn" onClick={() => handleEdit(drink.id)}>Izmeni</button> */}
                </td>
                <td>
                  {/* <button className="delete-btn" onClick={() => handleDelete(drink.id)}>Obriši</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
