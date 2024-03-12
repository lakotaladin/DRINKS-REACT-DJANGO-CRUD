import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [drinks, setDrinks] = useState([]);
  const [ime, setIme] = useState("");
  const [opis, setOpis] = useState("");
  const [selectedDrink, setSelectedDrink] = useState(null);

  useEffect(() => {
    fetchDrinks();
  }, []);

  const fetchDrinks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/drinks/");
      setDrinks(response.data);
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/drinks/${id}`);
      fetchDrinks();
    } catch (error) {
      console.error("Error deleting drink:", error);
    }
  };

  const handleImeChange = (e) => {
    setIme(e.target.value);
  };

  const handleOpisChange = (e) => {
    setOpis(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/drinks/", { name: ime, description: opis });
      setIme("");
      setOpis("");
      fetchDrinks();
    } catch (error) {
      console.error("Error adding drink:", error);
    }
  };

  const handleClick = (drink) => {
    setSelectedDrink(drink);
    setIme(drink.name);
    setOpis(drink.description);
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:8000/drinks/${selectedDrink.id}/`, { name: ime, description: opis });
      setSelectedDrink(null);
      setIme("");
      setOpis("");
      fetchDrinks();
    } catch (error) {
      console.log("Error editing drink:", error);
    }
  };

  return (
    <div className="global">
      <div className="nav">
        <h1 style={{ fontFamily: "fantasy", fontSize: "45px", letterSpacing: "5px" }}>PIĆA CRUD</h1>
      </div>

      <div className="nav2">
        <h1 style={{ fontFamily: "fantasy", fontSize: "25px", letterSpacing: "5px" }}>Kreiraj piće / Izmeni piće:</h1>
      </div>
      <div className="create-drink">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Ime pića:</label>
            <input type="text" placeholder="Naziv pića" name="name" id="name" value={ime} onChange={handleImeChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Deskripcija:</label>
            <input type="text" placeholder="Opis pića" name="description" id="description" value={opis} onChange={handleOpisChange} required />
          </div>
          <button type="submit">Dodaj piće</button>
          {" "}
          <button style={{backgroundColor: "orange"}} type="button" onClick={handleEdit}>Izmeni piće</button>
        </form>
      </div>

      <div className="nav2">
        <h1 style={{ fontFamily: "fantasy", fontSize: "25px", letterSpacing: "5px" }}>Sva pića:</h1>
      </div>
      <div className="tableOfdrinks">
        <table className="drink-table">
          <thead>
            <tr>
              <th>Red. broj</th>
              <th>Ime pica</th>
              <th>Deskripcija</th>
              <th>Obriši</th>
            </tr>
          </thead>
          <tbody>
            {drinks.map((drink, index) => (
              <tr onClick={() => handleClick(drink)} key={drink.id}>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td>{drink.name}</td>
                <td>{drink.description}</td>
                <td style={{ textAlign: "center" }}>
                  <button className="delete-btn" onClick={() => handleDelete(drink.id)}>Obriši</button>
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
