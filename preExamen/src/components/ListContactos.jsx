function ListContactos({ agenda, onDelete }) {
    return (
      <ul className="space-y-2">
        {agenda.map((item) => (
          <li
            key={item.id}
            id={item.id}
            className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-gray-200 flex justify-between items-center animate-fadeIn"
          >
            <span>
              <span className="font-bold">{item.contacto}</span>: {item.numero}
            </span>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg transition-colors"
              onClick={() => onDelete(item.id)}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
    );
  }
  
  export default ListContactos;