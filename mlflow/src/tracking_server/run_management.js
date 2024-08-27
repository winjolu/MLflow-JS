class RunManagement {
  constructor(trackingUri) {
    this.trackingUri = trackingUri;
  }

  /**
   * Creates a new run.
   *
   * @param {string} experiment_id - The ID of the associated experiment (required)
   * @param {string} run_name - The name of the run (required)
   * @param {Array<{key: string, value: string}>} [tags=[]] - Optional metadata for the run
   * @returns {Promise<Object>} - The created run object
   */
  async createRun(experiment_id, run_name, tags = []) {
    if (!experiment_id || !run_name) {
      throw new Error('Experiment ID and run name are required');
    }

    console.log('Tracking URI: ', this.trackingUri);
    const startTime = Date.now();

    const url = `${this.trackingUri}/api/2.0/mlflow/runs/create`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        experiment_id,
        run_name,
        start_time: startTime,
        tags,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error creating run: ${data.message || response.statusText}`
      );
    }

    return data.run;
  }
}

export { RunManagement };
