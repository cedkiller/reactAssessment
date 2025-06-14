import '../assets/css/Header.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Header() {
    const navigate = useNavigate();

    const logout = async () => {
        Swal.fire({
            title: 'Are You Sure?',
            text: 'Do you want to logout?',
            icon: 'info',
            showDenyButton: true,
            confirmButtonText: 'Logout',
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                navigate('/');
            } else if (result.isDenied) {
                window.location.reload();
            }
        });
    };

    return (
        <>
            <div className='topBar shadow-sm'>
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <h4 className="mb-0 fw-bold text-black">React JS Assessment Blog</h4>

                    <div className="dropdown">
                        <button className="btn btn-outline-primary dropdown-toggle px-4 py-2 rounded-pill shadow-sm" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            Manage Account
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end mt-2 shadow rounded-3" aria-labelledby="dropdownMenuButton">
                            <li>
                                <button className="dropdown-item" onClick={logout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
