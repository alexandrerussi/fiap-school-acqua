// src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import './RegistrationForm.css'; // Importa o CSS para RegistrationForm
import Webcam from 'react-webcam';
import { usePlayers } from '../context/PlayerContext';
import cube from '../assets/cube.webp';
import ball from '../assets/ball.webp';
import circle from '../assets/circle.webp';
import cone from '../assets/cone.webp';
import cylinder from '../assets/cylinder.webp';
import square from '../assets/square.webp';
import triangle_fill from '../assets/triangle-fill.webp';

function RegistrationForm() {
    const { addPlayer, players, resetPlayers } = usePlayers();
    const [nickname, setNickname] = useState('');
    const webcamRef = React.useRef(null);

    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        return imageSrc;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const photoBase64 = capturePhoto();
        addPlayer({ nickname, photo: photoBase64 });
        setNickname(''); // Limpa o campo de nickname após o registro
    };

    const handleReset = () => {
        resetPlayers(); // Reseta a lista de jogadores
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='input-div'>
                    <label>Nickname:</label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                </div>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width="100%"
                    className='webcam'
                />
                <div>
                    <button type="submit">Registrar</button>
                    <button type="button" onClick={handleReset}>Resetar</button>  {/* Botão de reset */}
                </div>
            </form>
            <div>
                <p>Jogadores cadastrados: {players.length}</p>
                {/* {players.length > 0 && <p>Jogadores cadastrados: {players.length}</p>} */}
            </div>
            <img className='img-cube' src={cube} alt="" />
            <img className='img-ball' src={ball} alt="" />
            <img className='img-circle' src={circle} alt="" />
            <img className='img-cone' src={cone} alt="" />
            <img className='img-cylinder' src={cylinder} alt="" />
            <img className='img-square' src={square} alt="" />
            <img className='img-triangle-fill' src={triangle_fill} alt="" />
        </div>
    );
}

export default RegistrationForm;
