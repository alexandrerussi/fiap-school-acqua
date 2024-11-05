// src/context/PlayerContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    const addPlayer = player => {
        setPlayers(prevPlayers => {
            const newPlayers = [...prevPlayers, player];
            if (newPlayers.length === 3) {
                navigate('/display'); // Redireciona para a tela de exibição
            }
            return newPlayers;
        });
    };

    const resetPlayers = () => {
        setPlayers([]); // Limpa a lista de jogadores
    };

    return (
        <PlayerContext.Provider value={{ players, addPlayer, resetPlayers }}>
            {children}
        </PlayerContext.Provider>
    );
}

export const usePlayers = () => useContext(PlayerContext);
