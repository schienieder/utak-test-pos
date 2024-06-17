import React from 'react';
import MySideBar from './components/MySideBar';
import Main from './components/Main';
import ItemBuilder from './components/ItemBuilder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gray-100 grid grid-cols-custom gap-8 font-mont">
      <MySideBar />
      {/* MAIN CONTENT */}
      <Main />
      {/* MENU BUILDER */}
      <ItemBuilder />
      {/* TOASTIFY */}
      <ToastContainer />
    </div>
  );
};

export default App;
