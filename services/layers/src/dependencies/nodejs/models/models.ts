
export interface ModelsInterface {
}

export interface Models {
  getModels(): ModelsInterface;
}

export class ModelsImpl implements Models {
  private _models: ModelsInterface = {
  };

  constructor() {
    this.init();
    this.associate();
  }

  public getModels(): ModelsInterface {
    return this._models;
  }

  private init() {
  }

  private associate() {
  }
}
