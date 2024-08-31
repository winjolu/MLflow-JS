// model_version_management.js

class ModelVersionManagement {
    constructor(trackingUri) {
      this.trackingUri = trackingUri;
    }
  
    /**
     * creates a new version of a registered model.
     *
     * @param {string} modelName - the name of the registered model (required)
     * @param {string} source - the source path where the model artifacts are stored (required)
     * @param {string} [runId=null] - the id of the run that generated this version (optional)
     * @returns {Promise<Object>} - the created model version object
     */
    async createModelVersion(modelName, source, runId = null) {}
  
    /**
     * fetches details of a specific model version.
     *
     * @param {string} modelName - the name of the registered model (required)
     * @param {string} version - the version number of the model to fetch (required)
     * @returns {Promise<Object>} - the fetched model version object
     */
    async getModelVersion(modelName, version) {}
  
    /**
     * updates a specific model version.
     *
     * @param {string} modelName - the name of the registered model (required)
     * @param {string} version - the version number of the model to update (required)
     * @param {Object} updates - the fields to update in the model version (required)
     * @returns {Promise<Object>} - the updated model version object
     */
    async updateModelVersion(modelName, version, updates) {}
  
    /**
     * deletes a specific model version.
     *
     * @param {string} modelName - the name of the registered model (required)
     * @param {string} version - the version number of the model to delete (required)
     * @returns {Promise<void>} - a promise that resolves when the model version is deleted
     */
    async deleteModelVersion(modelName, version) {}
  
    /**
     * searches for model versions based on provided filters.
     *
     * @param {string} [filter=''] - the filter criteria for searching model versions (optional)
     * @param {number} [maxResults=100] - the maximum number of results to return (optional)
     * @returns {Promise<Array>} - an array of model versions that match the search criteria
     */
    async searchModelVersions(filter = '', maxResults = 100) {}
  
    /**
     * retrieves the download uri for model version artifacts.
     *
     * @param {string} modelName - the name of the registered model (required)
     * @param {string} version - the version number of the model to fetch the uri for (required)
     * @returns {Promise<string>} - the uri for downloading the model version artifacts
     */
    async getDownloadUriForModelVersionArtifacts(modelName, version) {}
  
    /**
     * transitions a model version to a different stage.
     *
     * @param {string} modelName - the name of the registered model (required)
     * @param {string} version - the version number of the model to transition (required)
     * @param {string} stage - the stage to transition the model version to (e.g., 'staging', 'production') (required)
     * @returns {Promise<Object>} - the updated model version object after the stage transition
     */
    async transitionModelVersionStage(modelName, version, stage) {}
  
    /**
     * sets a tag on a specific model version.
     *
     * @param {string} modelName - the name of the registered model (required)
     * @param {string} version - the version number of the model to tag (required)
     * @param {string} key - the key of the tag (required)
     * @param {string} value - the value of the tag (required)
     * @returns {Promise<void>} - a promise that resolves when the tag is set
     */
    async setModelVersionTag(modelName, version, key, value) {}
  
    /**
     * deletes a tag from a specific model version.
     *
     * @param {string} modelName - the name of the registered model (required)
     * @param {string} version - the version number of the model to untag (required)
     * @param {string} key - the key of the tag to delete (required)
     * @returns {Promise<void>} - a promise that resolves when the tag is deleted
     */
    async deleteModelVersionTag(modelName, version, key) {}
  }
  
  export { modelVersionManagement };