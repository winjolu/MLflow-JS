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
    async createModelVersion(modelName, source, runId = null) {
        // is model name provided?

        // is source provided?

        // construct url for create model version endpoint

        // build the request body with required and optional fields

        // fire off a post request to create the model version

        // parse the response

        // is response ok? else throw error

        // return the model version obj 
    }

    /**
     * fetches details of a specific model version.
     *
     * @param {string} modelName - the name of the registered model (required)
     * @param {string} version - the version number of the model to fetch (required)
     * @returns {Promise<Object>} - the fetched model version object
     */
    async getModelVersion(modelName, version) {
        // is model name provided?

        // is version provided?

        // construct url for get model version endpoint

        // build request query params

        // fire off a get request to get the model version

        // parse the response 

        // is response ok? else throw error

        // return the model version obj

        
    }
  
    /**
 * updates a specific model version.
 *
 * @param {string} modelName - the name of the registered model (required)
 * @param {string} version - the version number of the model to update (required)
 * @param {Object} updates - the fields to update in the model version (required)
 * @returns {Promise<Object>} - the updated model version object
 */
async updateModelVersion(modelName, version, updates) {
    // is model name provided?

    // is version provided?

    // are updates provided?

    // construct url for update model version endpoint

    // build the request body with update fields

    // fire off a patch request to update the model version

    // parse the response

    // is response ok? else throw error

    // return the updated model version obj
}

/**
 * deletes a specific model version.
 *
 * @param {string} modelName - the name of the registered model (required)
 * @param {string} version - the version number of the model to delete (required)
 * @returns {Promise<void>} - a promise that resolves when the model version is deleted
 */
async deleteModelVersion(modelName, version) {
    // is model name provided?

    // is version provided?

    // construct url for delete model version endpoint

    // build request query params

    // fire off a delete request to remove the model version

    // parse the response

    // is response ok? else throw error

    // return nothing, just resolve
}

/**
 * searches for model versions based on provided filters.
 *
 * @param {string} [filter=''] - the filter criteria for searching model versions (optional)
 * @param {number} [maxResults=100] - the maximum number of results to return (optional)
 * @returns {Promise<Array>} - an array of model versions that match the search criteria
 */
async searchModelVersions(filter = '', maxResults = 100) {
    // construct url for search model versions endpoint

    // build request query params with filter and maxResults

    // fire off a get request to search for model versions

    // parse the response

    // is response ok? else throw error

    // return an array of model versions that match the criteria
}

/**
 * retrieves the download uri for model version artifacts.
 *
 * @param {string} modelName - the name of the registered model (required)
 * @param {string} version - the version number of the model to fetch the uri for (required)
 * @returns {Promise<string>} - the uri for downloading the model version artifacts
 */
async getDownloadUriForModelVersionArtifacts(modelName, version) {
    // is model name provided?

    // is version provided?

    // construct url for get download uri for model version artifacts endpoint

    // build request query params

    // fire off a get request to fetch the download uri

    // parse the response

    // is response ok? else throw error

    // return the download uri as a string
}

/**
 * transitions a model version to a different stage.
 *
 * @param {string} modelName - the name of the registered model (required)
 * @param {string} version - the version number of the model to transition (required)
 * @param {string} stage - the stage to transition the model version to (e.g., 'staging', 'production') (required)
 * @returns {Promise<Object>} - the updated model version object after the stage transition
 */
async transitionModelVersionStage(modelName, version, stage) {
    // is model name provided?

    // is version provided?

    // is stage provided?

    // construct url for transition model version stage endpoint

    // build the request body with stage information

    // fire off a post request to transition the model version stage

    // parse the response

    // is response ok? else throw error

    // return the updated model version obj
}

/**
 * sets a tag on a specific model version.
 *
 * @param {string} modelName - the name of the registered model (required)
 * @param {string} version - the version number of the model to tag (required)
 * @param {string} key - the key of the tag (required)
 * @param {string} value - the value of the tag (required)
 * @returns {Promise<void>} - a promise that resolves when the tag is set
 */
async setModelVersionTag(modelName, version, key, value) {
    // is model name provided?

    // is version provided?

    // is key provided?

    // is value provided?

    // construct url for set model version tag endpoint

    // build the request body with tag key and value

    // fire off a post request to set the tag on the model version

    // parse the response

    // is response ok? else throw error

    // return nothing, just resolve
}

/**
 * deletes a tag from a specific model version.
 *
 * @param {string} modelName - the name of the registered model (required)
 * @param {string} version - the version number of the model to untag (required)
 * @param {string} key - the key of the tag to delete (required)
 * @returns {Promise<void>} - a promise that resolves when the tag is deleted
 */
async deleteModelVersionTag(modelName, version, key) {
    // is model name provided?

    // is version provided?

    // is key provided?

    // construct url for delete model version tag endpoint

    // build request query params

    // fire off a delete request to remove the tag from the model version

    // parse the response

    // is response ok? else throw error

    // return nothing, just resolve
}
