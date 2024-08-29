class RunManagement {
  constructor(trackingUri) {
    this.trackingUri = trackingUri;
  }

  /**
   * Creates a new run.
   *
   * @param {string} experiment_id - The ID of the associated experiment (required)
   * @param {string} [run_name] - The name of the run (optional)
   * @param {Array<{key: string, value: string}>} [tags=[]] - Additional metadata for the run (optional)
   * @returns {Promise<Object>} - The created run object
   */
  async createRun(experiment_id, run_name = null, tags = []) {
    if (!experiment_id) {
      throw new Error('Experiment ID is required');
    }

    const startTime = Date.now();

    const url = `${this.trackingUri}/api/2.0/mlflow/runs/create`;

    const body = {
      experiment_id,
      start_time: startTime,
      tags,
    };

    if (run_name) {
      body.run_name = run_name;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error creating run: ${data.message || response.statusText}`
      );
    }

    return data.run;
  }

  /**
   * Deletes a run.
   *
   * @param {string} run_id - The ID of the run to delete (required)
   * @returns {Promise<void>} - A promise that resolves when the run is deleted
   */
  async deleteRun(run_id) {
    if (!run_id) {
      throw new Error('Run ID is required.');
    }

    const url = `${this.trackingUri}/api/2.0/mlflow/runs/delete`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ run_id }),
    });

    if (!response.ok) {
      throw new Error(
        `Error deleting run: ${data.message || response.statusText}`
      );
    }

    return;
  }

  /**
   * Restores a run.
   *
   * @param {string} run_id - The ID of the run to restore (required)
   * @returns {Promise<void>} - A promise that resolves when the run is restored
   */
  async restoreRun(run_id) {
    if (!run_id) {
      throw new Error('Run ID is required.');
    }

    const url = `${this.trackingUri}/api/2.0/mlflow/runs/restore`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ run_id }),
    });

    if (!response.ok) {
      throw new Error(
        `Error restoring run: ${data.message || response.statusText}`
      );
    }

    return;
  }

  /**
   * Fetches a run.
   *
   * @param {string} run_id - The ID of the run to fetch (required)
   * @returns {Promise<Object>} - The fetched run object
   */
  async getRun(run_id) {
    if (!run_id) {
      throw new Error('Run ID is required.');
    }

    const url = `${this.trackingUri}/api/2.0/mlflow/runs/get?run_id=${run_id}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error fetching run: ${data.message || response.statusText}`
      );
    }

    return data.run;
  }

  /**
   * updates a run.
   *
   * @param {string} run_id - The ID of the run to update (required)
   * @param {string} [status] - The status of the updated run (optional)
   * @param {string} [run_name] - The updated name of the run (optional)
   * @param {number} [end_time] - The end time fo the run in milliseconds since epoch (optional)
   * @returns {Promise<Object>} - The updated metadata of the run object
   */
  async updateRun(run_id, status = null, run_name = null, end_time = null) {
    if (!run_id) {
      throw new Error('Run ID is required.');
    }

    const url = `${this.trackingUri}/api/2.0/mlflow/runs/update`;

    const body = { run_id };
    if (status) body.status = status;
    if (run_name) body.run_name = run_name;
    if (end_time) body.end_time = end_time;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error creating run: ${data.message || response.statusText}`
      );
    }

    return data;
  }

  /**
   * Logs a metric for a run.
   *
   * @param {string} run_id - The ID of the run under which to log the metric (required)
   * @param {string} key - The name of the metric (required)
   * @param {number} value - The double value of the metric being logged (required)
   * @param {number} timestamp - The unix timestamp in milliseconds at the time metric was logged (required)
   * @param {number} [step=0] - The step at which to log the metric (optional)
   * @returns {Promise<void>} - A promise that resolves when the metric is logged
   */
  async logMetric(run_id, key, value, timestamp, step = 0) {}

  /**
   * Logs a batch of metrics, params, and tags for a run.
   *
   * @param {string} run_id - The ID of the run to log under (required)
   * @param {Array<{key: string, value: number, timestamp: number, step?: number}>} [metrics] - The metrics to log (up to 1000 metrics) (optional)
   * @param {Array<{key: string, value: string}>} [params] - The params to log (up to 100 params) (optional)
   * @param {Array<{key: string, value: string}>} [tags=[]] - The tags to log (up to 100 tags) (optional)
   * @returns {Promise<void>} - A promise that resolves when the logging is complete
   */
  async logBatch(run_id, metrics = [], params = [], tags = []) {}

  /**
   * Logs a model.
   *
   * @param {string} run_id - The ID of the run to log under (required)
   * @param {object} model_json - The MLmodel data in JSON format (required)
   * @returns {Promise<Object>} - A promise that resolves when the model is successfully logged
   */
  async logModel(run_id, model_json) {}

  /**
   * Logs inputs.
   *
   * @param {string} run_id - The ID of the run to log under (required)
   * @param {Array<Object>} datasets - The dataset inputs in JSON format (required)
   * @returns {Promise<void>} - A promise that resolves when the logging is complete
   */
  async logInputs(run_id, datasets) {}
}

export { RunManagement };
