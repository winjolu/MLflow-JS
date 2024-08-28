const MLFLOW_TRACKING_URI = 'http://localhost:5001/api/2.0/mlflow';

/**
 * Create an experiment with a name. Returns the ID of the newly created experiment.
 * Validates that another experiment with the same name does not already exist and fails if another experiment with the same name already exists.
 * Throws RESOURCE_ALREADY_EXISTS if a experiment with the given name exists.
 *
 * @param {string} name Experiment name.  (required)
 * @param {string} artifact_location Optional location where all artifacts for the experiment are stored.
 *    If not provided, the remote server will select an appropriate default.
 * @param {Array<{key: string, value: string}>} tags Optional collection of tags to set on the experiment.
 * @returns {Promise<Object>} Returns the ID of the newly created experiment in an object.
 */
async function createExperiment(name, artifact_location = '', tags = []) {
  try {
    if (!name) {
      throw new Error('Experiment name is required');
    }

    const url = `${MLFLOW_TRACKING_URI}/experiments/create`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, artifact_location, tags }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        `HTTP error from tracking server, status: ${response.status}.  ${errorBody.message}`
      );
    }

    const data = await response.json();
    console.log('data: ', data);
    return data;
  } catch (error) {
    console.error('Error creating experiment: ', error);
  }
}

// run the next line to test ********************************************************************
// createExperiment('test_experiment_postman16');

/**
 * Search experiments.
 *
 * @param {string} filter A filter expression over experiment attributes and tags that allows returning a subset of experiments
 *    The syntax is a subset of SQL.  (required)
 * @param {int64} max_results Maximum number of experiments desired.  (required)
 * @param {string} page_token Optional token indicating the page of experiments to fetch.
 * @param {Array<string>} order_by Optional list of columns for ordering search results.
 * @param {string} view_type Optional qualifier for type of experiments to be returned.
 *    See https://mlflow.org/docs/latest/rest-api.html#mlflowviewtype
 * @returns {Promise<Object>} Returns object containing an array of experiment objects matching the filter,
 *    and optionally a next_page_token that can be used to retrieve the next page of experiments.
 */
async function searchExperiment(
  filter,
  max_results,
  page_token = '',
  order_by = [],
  view_type = ''
) {
  try {
    if (!filter) {
      throw new Error('Filter is required');
    }
    if (!max_results) {
      throw new Error('Max results is required');
    }

    const url = `${MLFLOW_TRACKING_URI}/experiments/search`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filter,
        max_results,
        page_token,
        order_by,
        view_type,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        `HTTP error from tracking server, status: ${response.status}.  ${errorBody.message}`
      );
    }

    const data = await response.json();
    console.log('data: ', data);
    return data;
  } catch (error) {
    console.error('Error searching for experiment: ', error);
  }
}

// run the next line to test ********************************************************************
// searchExperiment("name = 'test_experiment_postman'", 1);

/**
 * Get metadata for an experiment. This method works on deleted experiments.
 *
 * @param {string} experiment_id ID of the associated experiment.  (required)
 * @returns {Promise<Object>} Returns object containing the matched experiment.
 */
async function getExperiment(experiment_id) {
  try {
    if (!experiment_id) {
      throw new Error('Experiment ID is required');
    }

    const url = `${MLFLOW_TRACKING_URI}/experiments/get?experiment_id=${experiment_id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ experiment_id }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        `HTTP error from tracking server, status: ${response.status}.  ${errorBody.message}`
      );
    }

    const data = await response.json();
    console.log('data.experiment: ', data.experiment);
    return data.experiment;
  } catch (error) {
    console.error('Error getting experiment: ', error);
  }
}

// run the next line to test ********************************************************************
getExperiment('292357850348085316');
