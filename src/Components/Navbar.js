import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-black p-6">
            
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-semibold text-xl">Yizbet</div>
                
                <div className="hidden lg:flex flex-grow items-center justify-center">
                    <Link to="/euro24" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">Euro 2024</Link>
                </div>
                <div className="hidden lg:flex flex-grow items-start justify-start">
                    <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">Accueil</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
