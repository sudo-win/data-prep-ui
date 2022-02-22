import React from 'react'
import './Nav.css'

function NavBar(metadata) {
    return (
        <nav className="navbar navbar-light">
            <div className="container-fluid">
                <a
                    className="navbar-brand btn-margin-left"
                    href="#transform"
                    onClick={(e) => metadata.showTransformMethod(e)}
                >
                    Transform
                </a>

                <a className="navbar-brand btn-margin-left disabled">
                    Download
                </a>
            </div>
        </nav>
    )
}

export default NavBar
