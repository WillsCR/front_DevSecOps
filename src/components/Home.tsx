import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center">
      <p className="text-4xl mb-4">Este es el home</p>
      <Link
        to="/notas"
        className="bg-green-400 text-white px-16 py-2 rounded-sm hover:bg-green-600"
      >
        Ir a Notas
      </Link>
    </div>
  );
};

export default Home;
