const fetch = require('node-fetch');

const MLFLOW_TRACKING_URI = 'http://localhost:5001/api/2.0/mlflow';

/**
 * Create an experiment with a name. Returns the ID of the newly created experiment. 
 * Validates that another experiment with the same name does not already exist and fails if another experiment with the same name already exists.
 * Throws RESOURCE_ALREADY_EXISTS if a experiment with the given name exists.
 */
async function createExperiment(name, artifact_location, tags) {
  try {
    const response = await fetch(`${MLFLOW_TRACKING_URI}/experiments/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, artifact_location, tags }),
    });

    if (response.status === 400) {
      const errorBody = await response.json();
      console.error('400 Error:', errorBody.message);
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    const data = await response.json();
    console.log('data.experiment_id: ', data.experiment_id);
    return data.experiment_id;
  } 
  catch (error) {
    console.error('Error creating experiment:', error);
  }
}

// createExperiment('test_experiment_postman10');

async function searchExperiment(filter, max_results, page_token, order_by, view_type) {
  try {
    const response = await fetch(`${MLFLOW_TRACKING_URI}/experiments/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, max_results, page_token, order_by, view_type }),
    })
  
    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    const data = await response.json();
    console.log('data.experiments: ', data.experiments);
    return data.experiments
  }
  catch (error) {
    console.error('Error searching for experiment:', error);
  }
}

// searchExperiment("name = 'test_experiment_postmanx'", 1000);