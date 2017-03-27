
export type SimpleData = number|string|boolean|Json;

export interface Json {
  [key: string]: SimpleData|SimpleData[];
}

export interface JsonObject extends Json {
  id: number;
}

export class BaseModel<T> {
  /* tslint:disable:variable-name */
  private __BaseModel__properties: string[];
  private __BaseModel__original_json: T;
  private __BaseModel__history: Json[];
  /* tslint:enable:variable-name */

  constructor(json: T, props: string[] = null) {
    this.__BaseModel__original_json = json;
    this.__BaseModel__properties = props || (json && Object.keys(json)) || [];
    this.__BaseModel__properties.forEach((property) => {
      const propertyToModel = `${property}ToModel`;
      const value = json[property];
      if (this[propertyToModel]) {
        this[propertyToModel](value);
      } else {
        this[property] = value;
      }
    });
    this.__BaseModel__history = [];
  }

  /* tslint:disable:variable-name */
  /* tslint:disable:no-any */
  protected __BaseModel__property_modified(property: string, value: any) {
    /* tslint:enable:variable-name */
    /* tslint:enable:no-any */
    if (this.__BaseModel__history) {
      this.__BaseModel__history.push({ [property]: value });
    }

  }

  public toJson(): Json {
    const json = {};
    this.__BaseModel__properties.forEach((property) => {
      const propertyToJson = `${property}ToJson`;
      const value = this[property];
      Object.assign(json, this[propertyToJson] ? this[propertyToJson](value) : { [property]: value });
    });
    return json;
  }
}
