const Header = () => {
    return (
        <header className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img className="mx-2" width="30" height="30" src="https://img.icons8.com/pastel-glyph/64/paper-plane--v2.png" alt="paper-plane--v2"/>
                <h1 className="text-black dark:text-white">Tecsa</h1>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="#" className="text-black dark:text-white">Home</a></li>
                    <li><a href="#" className="text-black dark:text-white">About</a></li>
                    <li><a href="#" className="text-black dark:text-white">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;