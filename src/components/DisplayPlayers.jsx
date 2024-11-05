import React, { useState, useEffect } from 'react';
import './DisplayPlayers.css';
import { useNavigate } from 'react-router-dom';
import { usePlayers } from '../context/PlayerContext';
import soundEffect from '../assets/effect.mp3';
import interstelarSoundEffect from '../assets/FirstStepMin.mp3';
import astronautMask from '../assets/astronaut.png'; // Ensure the path is correct
import fiapLogo from '../assets/acqua_robot.svg';
import cube from '../assets/cube.webp';
import ball from '../assets/ball.webp';
import circle from '../assets/circle.webp';
import cone from '../assets/cone.webp';
import cylinder from '../assets/cylinder.webp';
import square from '../assets/square.webp';
import triangle_fill from '../assets/triangle-fill.webp';

function DisplayPlayers() {
    const { players, resetPlayers } = usePlayers();
    const navigate = useNavigate();
    const [rovers, setRovers] = useState([
        { nome: "Equipe1", turma: "8EFA" },
        { nome: "Equipe2", turma: "8EFA" },
        { nome: "Equipe3", turma: "8EFA" },
        { nome: "Equipe4", turma: "8EFA" },
        { nome: "Equipe5", turma: "8EFA" },
        { nome: "Equipe6", turma: "8EFB" },
        { nome: "Equipe7", turma: "8EFB" },
        { nome: "Equipe8", turma: "8EFB" },
        { nome: "Equipe9", turma: "8EFB" },
        { nome: "Equipe10", turma: "8EFB" },
        { nome: "Equipe11", turma: "8EFC" },
        { nome: "Equipe12", turma: "8EFC" },
        { nome: "Equipe13", turma: "8EFC" },
        { nome: "Equipe14", turma: "8EFC" },
        { nome: "Equipe15", turma: "8EFC" }
    ]);
    const [assignedRovers, setAssignedRovers] = useState([]);
    const [currentRoverIndex, setCurrentRoverIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(80); // 60 seconds for 1 minute
    const [timerActive, setTimerActive] = useState(false);
    const [sound, setSound] = useState(null);
    const [interstelarSound, setInterstelarSound] = useState(null);

    useEffect(() => {
        setSound(new Audio(soundEffect));
        setInterstelarSound(new Audio(interstelarSoundEffect));

        return () => {
            sound && sound.pause();
            interstelarSound && interstelarSound.pause();
        };
    }, []);

    useEffect(() => {
        let interval = null;
        if (timerActive && timerSeconds > 0) {
            interval = setInterval(() => {
                setTimerSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (!timerActive && timerSeconds !== 0) {
            clearInterval(interval);
            interstelarSound && interstelarSound.pause();
            interstelarSound && (interstelarSound.currentTime = 0);
        } else if (timerSeconds === 0) {
            // Quando o timer chega a zero
            interstelarSound && interstelarSound.pause();
            interstelarSound && (interstelarSound.currentTime = 0);
            setTimerActive(false);  // Desativa o timer
            clearInterval(interval);
            setTimerSeconds(80); // Reset to 1 minutes
        }
        return () => clearInterval(interval);
    }, [timerActive, timerSeconds, interstelarSound]);

    useEffect(() => {
        if (animating) {
            const interval = setInterval(() => {
                setCurrentRoverIndex(Math.floor(Math.random() * rovers.length));
            }, 200); // Fast enough to create a "spinning" effect

            // sound && sound.play();

            const randomTimeout = Math.random() * (8000 - 4000) + 4000; // Random duration between 4 and 8 seconds
            setTimeout(() => {
                clearInterval(interval);
                // sound && sound.pause();
                sound && (sound.currentTime = 0);
                finalizeAssignment();
            }, randomTimeout);

            return () => {
                clearInterval(interval);
                // sound && sound.pause();
                sound && (sound.currentTime = 0);
            };
        }
    }, [animating, rovers.length]);  // Depend on animating and rovers.length only

    const finalizeAssignment = () => {
        if (assignedRovers.length < players.length) {
            // Determine the appropriate turma based on the current player
            let turma = '';
            if (assignedRovers.length === 0) turma = '8EFA'; // First astronaut
            else if (assignedRovers.length === 1) turma = '8EFB'; // Second astronaut
            else if (assignedRovers.length === 2) turma = '8EFC'; // Third astronaut
    
            // Filter rovers based on the turma
            const filteredRovers = rovers.filter(rover => rover.turma === turma);
    
            if (filteredRovers.length > 0) {
                // Select a random rover from the filtered list
                const selectedRover = filteredRovers[Math.floor(Math.random() * filteredRovers.length)];
                const newRovers = rovers.filter(rover => rover.nome !== selectedRover.nome);
                const updatedAssignedRovers = [
                    ...assignedRovers,
                    { ...players[assignedRovers.length], rover: selectedRover }
                ];
                setAssignedRovers(updatedAssignedRovers);
                setRovers(newRovers);
                setAnimating(false);
            }
        }
    };

    const handleAssignRover = () => {
        setCurrentRoverIndex(Math.floor(Math.random() * rovers.length)); // Set initial random index here
        setAnimating(true);
    };

    const handleStartTimer = () => {
        interstelarSound && interstelarSound.play();
        setTimerActive(true);
    };

    const handlePauseTimer = () => {
        interstelarSound && interstelarSound.pause();
        setTimerActive(false);
    };

    const handleStopTimer = () => {
        interstelarSound && interstelarSound.pause();
        interstelarSound && (interstelarSound.currentTime = 0);
        setTimerActive(false);
        setTimerSeconds(80); // Reset to 1 minutes
    };

    const handleBack = () => {
        resetPlayers();
        navigate('/');
    };

    return (
        <div>
            <div className='grid'>
                <div className='players'>
                    {players.map((player, index) => (
                        <div key={index}>
                            <div className='player-container'>
                                <img src={player.photo} alt={`Foto de ${player.nickname}`} className='player-photo' />
                                <img src={astronautMask} alt="Astronaut Mask" className="astronaut-mask" />
                            </div>
                            <div className='player-text'>
                                <h2>{player.nickname}</h2>
                                {assignedRovers[index] && assignedRovers[index].rover ? (
                                    <p>{`${assignedRovers[index].rover.nome} (${assignedRovers[index].rover.turma})`}</p>
                                ) : <p>Aguardando sorteio...</p>}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='sort-reel'>
                    {/* <h2>Equipes</h2> */}
                    <img className='fiap-logo' src={fiapLogo} />
                    <ul>
                        {rovers.map((rover, index) => (
                            <li key={index} style={{ color: currentRoverIndex === index ? '#e3135c' : 'white' }}>
                                {`${rover.turma}: ${rover.nome}`}
                                {currentRoverIndex === index && animating && <span> ←</span>}
                            </li>
                        ))}
                    </ul>
                    <div className='botoes-controle'>
                        <button className='btn-sortear' onClick={handleAssignRover} disabled={assignedRovers.length >= players.length || animating}>
                            Sortear
                        </button>

                        <div className="timer-controls">
                            <p>{Math.floor(timerSeconds / 60)}:{("0" + (timerSeconds % 60)).slice(-2)}</p>
                            <div className='timer-controls--div'>
                                <button className='btn-play' onClick={handleStartTimer} disabled={timerActive}>Play</button>
                                <button className='btn-pause' onClick={handlePauseTimer} disabled={!timerActive}>Pause</button>
                                <button className='btn-stop' onClick={handleStopTimer}>Stop</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className='btn-voltar' onClick={handleBack}>Voltar</button>
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

export default DisplayPlayers;
