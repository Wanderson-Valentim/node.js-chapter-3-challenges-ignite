import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder('game')
      .where('game.title ilike :query', { query: `%${param}%`})
      .getMany()
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(
      `SELECT COUNT(*) FROM games`
    );
  }

  async findUsersByGameId(id: string): Promise<User[]>{
    const userRepository = getRepository(User)
      .createQueryBuilder('user')
      .leftJoin('user.games', 'games')
      .where('games.id = :gameId', { gameId: id })

    return userRepository.getMany()
  }
}
