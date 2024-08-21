import React from 'react';
import telaAgendamento from '../assets/imagens/telaAgendamento.jpg';
import styles from '../styles/ImageBanner.module.css';

const ImageBanner: React.FC = () => {
  return (
    <div className={styles.imageContainer}>
      <img src={telaAgendamento} alt="Tela de Agendamento" className={styles.image} />
    </div>
  );
};

export default ImageBanner;
