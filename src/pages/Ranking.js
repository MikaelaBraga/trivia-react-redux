import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ranking.css';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="container-ranking">
        {ranking.sort((a, b) => (b.score - a.score))
          .map((player, index) => (
            <div className="ranking-card" key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${player.gravatarEmail}` }
                alt="Imagem Avatar"
              />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{`Pontuação: ${player.score}`}</p>
            </div>
          ))}
        <Link to="/">
          <button className="return-button" type="button" data-testid="btn-go-home">Voltar para o Início</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
