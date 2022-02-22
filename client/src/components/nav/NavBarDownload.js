import React from 'react'
import './Nav.css'
import axios from 'axios'

function NavBarDownload(metadata) {
    const downloadFile = (e) => {
        axios
            .get('/download', {
                responseType: 'arraybuffer',
            })

            .then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data], { type: 'text/csv' })
                )
                const filename =
                    response.headers['content-disposition'].split('filename=')
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', filename)
                document.body.appendChild(link)
                link.click()
            })
    }

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

                <a
                    className="navbar-brand btn-margin-left"
                    href="#download"
                    onClick={(e) => downloadFile(e)}
                >
                    Download
                </a>
            </div>
        </nav>
    )
}

export default NavBarDownload
