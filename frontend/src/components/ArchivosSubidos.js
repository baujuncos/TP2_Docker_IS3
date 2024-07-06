// components/ArchivosSubidos.js
import React from 'react';

const ArchivosSubidos = ({ files }) => {
    return (
        <div className="ArchivosSubidos">
            <h2>Archivos Subidos</h2>
            {files.map(file => (
                <div key={file} className="File">
                    <a href={`http://localhost:8080/uploads/${file}`} target="_blank" rel="noopener noreferrer">{file}</a>
                </div>
            ))}
        </div>
    );
};

export default ArchivosSubidos;

//estos va en components