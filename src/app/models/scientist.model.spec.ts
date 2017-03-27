import { baseModelTests } from './base.model.spec';
import { Json } from './base.model';
import { Scientist, ScientistJsonObject, ScientistInterface } from './scientist.model';
import { TitleType, TITLE } from '../types';

describe('Scientist', () => {
  const jsonObject: ScientistJsonObject = {
    id: 1,
    name: 'T',
    title: 'mister',
  };
  const interfaceObject: ScientistInterface = {
    name: 'T',
    title: TitleType.MISTER,
  };
  const interfaceObjectResult: Json = {
    name: 'T',
    title: TITLE.toJson(TitleType.MISTER),
  };

  baseModelTests<ScientistJsonObject|ScientistInterface>({
    model: Scientist,
    objects: [
      {
        input: jsonObject,
        modelled: new Scientist(jsonObject),
        output: jsonObject,
      },
      {
        input: interfaceObject,
        modelled: new Scientist(interfaceObject),
        output: interfaceObjectResult,
      },
    ],
  });
});
