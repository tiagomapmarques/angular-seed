
export interface Json {
  [key: string]: number|string|Json|Json[];
}

export interface JsonObject extends Json {
  id: number;
}

export class BaseModel<T> {
  /* tslint:disable:variable-name */
  private __BaseModel__original_json: T;
  /* tslint:enable:variable-name */

  constructor(json: T) {
    this.__BaseModel__original_json = json;
    const jsonProperties = Object.keys(json);
    if (jsonProperties && jsonProperties.length) {
      jsonProperties.forEach((property) => {
        const propertyToModel = `${property}ToModel`;
        const value = json[property];
        if (this[propertyToModel]) {
          this[propertyToModel](value);
        } else {
          this[property] = value;
        }
      });
    }
  }

  public toJson() {
    const json = {};
    const jsonProperties = Object.keys(this.__BaseModel__original_json);
    if (jsonProperties && jsonProperties.length) {
      jsonProperties.forEach((property) => {
        const propertyToJson = `${property}ToJson`;
        const value = this[property];
        Object.assign(json, this[propertyToJson] ? this[propertyToJson](value) : { [property]: value });
      });
    }
    return json;
  }
}
