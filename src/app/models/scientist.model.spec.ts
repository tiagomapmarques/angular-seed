import { baseModelTests } from './base.model.spec';
import { Scientist, ScientistJsonObject, ScientistInterface } from './scientist.model';
import { TitleType } from '../types';

describe('Scientist', () => {

  baseModelTests<ScientistJsonObject|ScientistInterface>({
    model: Scientist,
    objects: [
      {
        input: { id: 1, name: 'T', title: 'mister' },
        modelled: new Scientist({ id: 1, name: 'T', title: 'mister' }),
        output: { id: 1, name: 'T', title: 'mister' },
      },
      {
        input: { name: 'T', title: TitleType.MISTER },
        modelled: new Scientist({ name: 'T', title: TitleType.MISTER }),
        output: { name: 'T', title: 'mister' },
      },
    ],
  });
});
