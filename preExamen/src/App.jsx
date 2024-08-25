import { useEffect, useState } from "react";
import axios from "axios";
import ListContactos from "./components/ListContactos";

function App() {
  const url = 'http://localhost:3000/';
  const [contacto, setContacto] = useState('');
  const [numero, setNumero] = useState('');
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/contactos')
      .then(response => {
        setAgenda(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los contactos:', error);
      });
  }, []);

  const updateCon = (event) => {
    setContacto(event.target.value);
  };

  const updateNum = (event) => {
    setNumero(event.target.value);
  };

  const saveContact = () => {
    if (contacto && numero) {
      const newContact = { contacto, numero };

      axios.post('http://localhost:3000/contactos', newContact)
        .then(response => {
          setAgenda([...agenda, response.data]);
          setContacto('');
          setNumero('');
        })
        .catch(error => {
          console.error('Hubo un error al guardar el contacto:', error);
        });
    }
  };

  const deleteContact = (id) => {
    const contactToDelete = document.getElementById(id);
    if (contactToDelete) {
      contactToDelete.classList.add('animate-slideOutRight');
      setTimeout(() => {
        axios.delete('http://localhost:3000/contactos/id')
          .then(() => {
            setAgenda(prevAgenda => prevAgenda.filter(item => item.id !== id));
          })
          .catch(error => {
            console.error('Hubo un error al borrar el contacto:', error);
          });
      }, 500); // Esperar a que termine la animación
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">Agenda Telefónica</h1>

      <div className="w-full max-w-md">
        <div className="flex flex-col mb-4">
          <input
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 mb-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={updateCon}
            value={contacto}
            type="text"
            placeholder="Nombre del contacto"
          />
          <input
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={updateNum}
            value={numero}
            type="tel"
            placeholder="Número de teléfono"
          />
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            onClick={saveContact}
          >
            Guardar!
          </button>
        </div>
      </div>

      <div className="w-full max-w-md mt-8">
        <h2 className="text-xl font-semibold mb-4 flex justify-center">Contactos Guardados</h2>
        <ListContactos agenda={agenda} onDelete={deleteContact} />
      </div>
    </div>
  );
}

export default App;