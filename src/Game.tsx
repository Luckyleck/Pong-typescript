import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  width: 800px;
  height: 600px;
  background: black;
  border: 2px solid white;
  position: relative;
`;

const Paddle = styled.div<{ positionY: number }>`
  width: 20px;
  height: 100px;
  background: white;
  position: absolute;
  left: 20px;
  top: ${({ positionY }) => positionY}px;
`;

const Ball = styled.div<{ positionX: number; positionY: number }>`
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  position: absolute;
  left: ${({ positionX }) => positionX}px;
  top: ${({ positionY }) => positionY}px;
`;

const Game: React.FC = () => {
    const [paddleY, setPaddleY] = useState(250);
    const [ballX, setBallX] = useState(390);
    const [ballY, setBallY] = useState(290);
    const [ballDirectionX, setBallDirectionX] = useState(1);
    const [ballDirectionY, setBallDirectionY] = useState(1);
    const gameRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
          setPaddleY((prev) => Math.max(prev - 20, 0));
        } else if (e.key === 'ArrowDown') {
          setPaddleY((prev) => Math.min(prev + 20, 500));
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setBallX((prev) => prev + ballDirectionX * 5);
        setBallY((prev) => prev + ballDirectionY * 5);
  
        if (ballY <= 0 || ballY >= 580) {
          setBallDirectionY((prev) => -prev);
        }
  
        if (ballX <= 40 && ballY >= paddleY && ballY <= paddleY + 100) {
          setBallDirectionX((prev) => -prev);
        }
  
        if (ballX >= 780 || ballX <= 0) {
          setBallX(390);
          setBallY(290);
          setBallDirectionX(1);
          setBallDirectionY(1);
        }
      }, 30);
  
      return () => clearInterval(interval);
    }, [ballX, ballY, ballDirectionX, ballDirectionY, paddleY]);
  
    return (
      <GameContainer ref={gameRef}>
        <Paddle positionY={paddleY} />
        <Ball positionX={ballX} positionY={ballY} />
      </GameContainer>
    );
  };
  
  export default Game;
