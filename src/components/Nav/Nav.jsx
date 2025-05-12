import './Nav.css'
export const Nav = () => {
    return(

    <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md" >
        <div className="flex justify-between bg- items-center  p-4 rounded rouded-full">
           
            <div className="flex space-x-4" >
                <a href="#about" className="text-white hover:text-gray-400">À propos</a>
                <a href="#projects" className="text-white hover:text-gray-400">Projets</a>
                <a href="#skills" className="text-white hover:text-gray-400">Compétences</a>
                <a href="#experience" className="text-white hover:text-gray-400">Expérience</a>
                <a href="#contact" className="text-white hover:text-gray-400">Contact</a>
            </div>
        </div>
    </nav>
    )
}