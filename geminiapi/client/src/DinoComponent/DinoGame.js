import React, { useEffect, useState, useRef } from 'react';
import './DinoGame.css';

const DinoGame = () => {
    const [isJumping, setIsJumping] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [currentScore, setCurrentScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const dinoRef = useRef(null);
    const cactusRef = useRef(null);
    const gameContainerRef = useRef(null);
    const scoreIntervalRef = useRef(null);

    useEffect(() => {
        const handleJump = (event) => {
            if (event.code === 'Space' && !isJumping && !isGameOver) {
                setIsJumping(true);
                setTimeout(() => {
                    setIsJumping(false);
                }, 300);
            }
        };

        document.addEventListener('keydown', handleJump);

        return () => {
            document.removeEventListener('keydown', handleJump);
        };
    }, [isJumping, isGameOver]);

    useEffect(() => {
        const checkCollision = () => {
            const dino = dinoRef.current;
            const cactus = cactusRef.current;

            if (dino && cactus) {
                const dinoRect = dino.getBoundingClientRect();
                const cactusRect = cactus.getBoundingClientRect();

                if (
                    dinoRect.right > cactusRect.left &&
                    dinoRect.left < cactusRect.right &&
                    dinoRect.bottom > cactusRect.top
                ) {
                    setIsGameOver(true);
                }
            }
        };

        let interval;
        if (!isGameOver) {
            interval = setInterval(checkCollision, 10);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isGameOver]);

    useEffect(() => {
        if (!isGameOver) {
            scoreIntervalRef.current = setInterval(() => {
                setCurrentScore(prevScore => prevScore + 1);
            }, 100);
        } else {
            clearInterval(scoreIntervalRef.current);
            if (currentScore > highestScore) {
                setHighestScore(currentScore);
            }
        }
        return () => {
            clearInterval(scoreIntervalRef.current);
        };
    }, [isGameOver, currentScore, highestScore]);

    const handleRetry = () => {
        setIsGameOver(false);
        setCurrentScore(0);
        cactusRef.current.style.animation = 'none';
        requestAnimationFrame(() => {
            cactusRef.current.style.animation = '';
        });
    };

    return (
        <div ref={gameContainerRef} className="game-container">
            <div className="score-board">
                <p>Score: {currentScore}</p>
                <p>High Score: {highestScore}</p>
            </div>
            <div
                ref={dinoRef}
                className={`dino ${isJumping ? 'jump' : ''}`}
            ></div>
            <div
                ref={cactusRef}
                className={`cactus ${isGameOver ? 'stopped' : ''}`}
            ></div>
            {isGameOver && (
                <div className="game-over">
                    <p>Game Over</p>
                    <button onClick={handleRetry}>Retry</button>
                </div>
            )}
        </div>
    );
};

export default DinoGame;
