//model_registry.js

let domain = 'http://localhost:'
const port = 5001;
if (port) {
  domain = domain + port;
}

const version = '2.0';

const MLFLOW_TRACKING_URI = domain + '/api/' + version + '/mlflow';

class ModelRegistry {
  constructor(trackingUri) {
    this.trackingUri = trackingUri;
  }

  /**
   * Creates a new registered model.
   *
   * @param {string} name - The name of the model to register (required)
   * @param {Array<{key: string, value: string}>} [tags=[]] - Optional tags for the model
   * @param {string} [description=''] - Optional description for the model
   * @returns {Promise<Object>} The created registered model object
   */
  async createRegisteredModel(name, tags = [], description = "") {
    if (!name) {
      throw new Error("Model name is required");
    }

    const url = `${this.trackingUri}/api/2.0/mlflow/registered-models/create`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, tags, description }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error creating registered model: ${
          data.message || response.statusText
        }`
      );
    }
    return data.registered_model;
  }

  /**
   * Gets a registered model.
   *
   * @param {string} name - The name of the registered model to retrieve (required)
   * @returns {Promise<Object>} The registered model object
   */
  async getRegisteredModel(name) {
    // Implementation similar to createRegisteredModel
  }

  /**
   * Renames a registered model.
   *
   * @param {string} name - The current name of the registered model (required)
   * @param {string} newName - The new name for the registered model (required)
   * @returns {Promise<Object>} The updated registered model object
   */
  async renameRegisteredModel(name, newName) {
    // Implementation
  }

  /**
   * Updates a registered model.
   *
   * @param {string} name - The name of the registered model to update (required)
   * @param {string} [description] - The new description for the model
   * @returns {Promise<Object>} The updated registered model object
   */
  async updateRegisteredModel(name, description) {
    // Implementation
  }

  /**
   * Deletes a registered model.
   *
   * @param {string} name - The name of the registered model to delete (required)
   * @returns {Promise<void>}
   */
  async deleteRegisteredModel(name) {
    // Implementation
  }

  /**
   * Gets the latest model versions for a registered model.
   *
   * @param {string} name - The name of the registered model (required)
   * @param {Array<string>} [stages=[]] - The stages to get the latest versions from
   * @returns {Promise<Array<Object>>} The latest model version objects
   */
  async getLatestModelVersions(name, stages = []) {
    // Implementation
  }

  /**
   * Searches for registered models.
   *
   * @param {string} [filter] - String filter condition
   * @param {number} [maxResults] - Maximum number of models desired
   * @param {Array<string>} [orderBy] - List of columns for ordering search results
   * @param {string} [pageToken] - Token for pagination
   * @returns {Promise<Object>} Object containing matching models and next page token
   */
  async searchRegisteredModels(filter, maxResults, orderBy, pageToken) {
    // Implementation
  }

  /**
   * Sets a tag on a registered model.
   *
   * @param {string} name - The name of the registered model (required)
   * @param {string} key - The tag key (required)
   * @param {string} value - The tag value (required)
   * @returns {Promise<void>}
   */
  async setRegisteredModelTag(name, key, value) {
    // Implementation
  }

  /**
   * Deletes a tag from a registered model.
   *
   * @param {string} name - The name of the registered model (required)
   * @param {string} key - The tag key to delete (required)
   * @returns {Promise<void>}
   */
  async deleteRegisteredModelTag(name, key) {
    // Implementation
  }

  /**
    * Sets an alias for a registered model version.
   \*
    * @param {string} name - The name of the registered model (required)
    * @param {string} alias - The alias to set (required)
    * @param {string} version - The version number to alias (required)
    * @returns {Promise<void>}
   */
   async setRegisteredModelAlias(name, alias, version) {
    if (!name) {
      throw new Error("name is required");
    } else if (!alias) {
      throw new Error("alias is required");
    } else if (!version) {
      throw new Error("version is required");
    }

    const url = `${this.trackingUri}/registered-models/alias`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, alias, version}),
    });

    // data is an empty object
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error setting model alias: ${
          response.statusText
        }`
      );
    }
    return data;
  }

  /**
    * Deletes an alias for a registered model.
   \*
    * @param {string} name - The name of the registered model (required)
    * @param {string} alias - The alias to delete (required)
    * @returns {Promise<void>}
   */
  async deleteRegisteredModelAlias(name, alias) {
    if (!name) {
      throw new Error("name is required");
    } else if (!alias) {
      throw new Error("alias is required");
    }

    const url = `${this.trackingUri}/registered-models/alias`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, alias}),
    });

    // data is an empty object
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error deleting model alias: ${
          response.statusText
        }`
      );
    }
    return data;
  }

  /**
    * Gets a model version by its alias.
   \*
    * @param {string} name - The name of the registered model (required)
    * @param {string} alias - The alias of the model version to retrieve (required)
    * @returns {Promise<Object>} The model version object
   */
  async getModelVersionByAlias(name, alias) {
    if (!name) {
      throw new Error("name is required");
    } else if (!alias) {
      throw new Error("alias is required");
    }
    const url = `${this.trackingUri}/registered-models/alias`;
    const response = await fetch(`${url}?name=${name}&alias=${alias}`);

    /**
     * data has the field:
     * model_version
     */
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error getting model version by alias: ${
          data.message || response.statusText
        }`
      );
    }
    return data;
  }
}

export { ModelRegistry };
