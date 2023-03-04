import logo from './logo.svg';
import './Header.css';

export function Header({searchQuery, setSearchQuery}) {
    return (
        <header className="Header">
            <img src={logo} className="Header-logo" height="70" width="70" alt="logo" />
            <input type="search" placeholder='Search...' value={searchQuery} onChange={(e) => setSearchQuery(e.currentTarget.value)} className="Header-search" />
            <div className="Header-sign">Sign in</div>
        </header>
    );
}
