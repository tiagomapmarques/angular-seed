import { BaseModel, Json } from './base.model';

/* tslint:disable:no-any */
type Model = any;
/* tslint:enable:no-any */

export interface BaseModellingObjects<T> {
  input: T;
  modelled?: Model;
  output: Json;
}

export interface BaseModelTestDefinition<T> {
  model: Model;
  objects: BaseModellingObjects<T>[];
}

export const baseModelTests = <T>(definition: BaseModelTestDefinition<T>) => {

  describe('roundtrip', () => {
    definition.objects.forEach((object, index) => {

      it(`is possible for ${JSON.stringify(object.input)}`, () => {
        const model = < BaseModel<T> > new definition.model(object.input);
        if (object.modelled) {
          expect(model).toEqual(object.modelled);
        }
        const newObject = model.toJson();
        expect(object.output).toEqual(newObject);
      });
    });
  });
};
