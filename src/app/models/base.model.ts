
export class BaseModel<T> {
  private __BaseModel__original_json: T;

  constructor(json: T) {
    this.__BaseModel__original_json = json;
    const jsonProperties = Object.keys(json);
    if (jsonProperties && jsonProperties.length) {
      jsonProperties.forEach((property) => {
        const propertyToModel = `${property}ToModel`;
        const value = json[property];
        this[property] = this[propertyToModel] ? this[propertyToModel](value) : value;
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
        json[property] = this[propertyToJson] ? this[propertyToJson](value) : value;
      });
    }
  }
}
