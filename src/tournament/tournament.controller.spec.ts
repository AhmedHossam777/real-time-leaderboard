import { Test, TestingModule } from '@nestjs/testing';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';

describe('TournamentController', () => {
  let controller: TournamentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentController],
      providers: [TournamentService],
    }).compile();

    controller = module.get<TournamentController>(TournamentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
