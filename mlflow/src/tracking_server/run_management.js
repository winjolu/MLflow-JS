let domain = 'http://localhost:'
const port = 5001;
if (port) {
  domain = domain + port;
}

const version = '2.0';

const MLFLOW_TRACKING_URI = domain + '/api/' + version + '/mlflow';

const path = 'artifacts';

// Can initiate the comments above the function by doing /**, right above the function

class RunManagement {
  constructor(trackingUri, path) {
    this.trackingUri = trackingUri;
    this.path = path;
  }

  /**
   * 
   * @param {string} run_id - ID of the run which to log the tag. Required
   * @param {string} key - Name of the tag. Maximum size depends on storage backend. All storage backends
   * are guaranteed to support key values up to 250 bytes in size. Required
   * @param {string} value - String value of the tag being logged. Maximum size depends on storage
   * backend. All storage backends are guaranteed to support key values up to 5000 bytes in size. Required
   * @returns {Promise<Object} - Empty promise object
   */
  async setTag (run_id, key, value) {
    if (!run_id) {
      throw new Error("run_id is required");
    } else if (!key) {
      throw new Error("key is required");
    } else if (!value) {
      throw new Error("value is required");
    }
    const url = `${this.trackingUri}/runs/set-tag`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ run_id, key, value}),
    });

    // data is an empty object
    const data = await response.json();
    // console.log('data: ', data);
    if (!response.ok) {
      throw new Error(
        `Error logging param: ${
          response.statusText
        }`
      );
    }
    return data;
  }

  /**
   * 
   * @param {string} run_id - ID of the run that the tag was logged under. Required
   * @param {string} key - Name of the tag. Maximum size is 255 bytes. Required
   * @returns {Promise<Void>} - Empty promise object
   */
  async deleteTag (run_id, key) {
    if (!run_id) {
      throw new Error("run_id is required");
    } else if (!key) {
      throw new Error("key is required");
    }
    const url = `${this.trackingUri}/runs/delete-tag`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ run_id, key}),
    });

    // data is an empty object
    const data = await response.json();
    // console.log('data: ', data);
    if (!response.ok) {
      throw new Error(
        `Error logging param: ${
          response.statusText
        }`
      );
    }
    return data;
  }

  /**
   * 
   * @param {string} run_id - ID of the run under which to log the param. Required
   * @param {string} key - Name of the param. Maximum size is 255 bytes. Required
   * @param {string} value  - String value of the param being logged. Maximum size is 6000 bytes. Required
   * @returns {Promise<Void>} - Empty promise object
   * Note: A param can be logged only once for a run
   */
  async logParam (run_id, key, value) {
    if (!run_id) {
      throw new Error("run_id is required");
    } else if (!key) {
      throw new Error("key is required");
    } else if (!value) {
      throw new Error("value is required");
    }
    const url = `${this.trackingUri}/runs/log-parameter`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ run_id, key, value }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        `Error logging param: ${
          response.statusText
        }`
      );
    }
    return data;
  }

  /**
   * 
   * @param {string} run_id - ID of the run from which to fetch metric values. Required
   * @param {string} metric_key - Name of the metric. Required
   * @param {string} page_token - Token indicating the page of metric history to fetch
   * @param {INT32} max_results - Maximum number of logged instances of a metric for a run to return per call.
   * Backend servers may restrict the value of max_results depending on performance requirements. Requests that do not 
   * specify this value will behave as non-paginated queries where all metric history values for a given metric 
   * within a run are returned in a single response.
   * @returns {Promise<Void>} - The values for the specified metric, as a promise object
   */
  async getMetricHistory(run_id, metric_key, page_token, max_results) {
    if (!run_id) {
      throw new Error("run_id is required");
    } else if (!metric_key) {
      throw new Error("metric_key is required");
    }
    const url = `${this.trackingUri}/metrics/get-history?run_id=${run_id}&metric_key=${metric_key}&page_token=${page_token}&max_results=${max_results}`;
    const response = await fetch(url);
    /**
     * data can have the fields:
     * metrics {An array of Metric} - All logged values for this metric
     * next_page_token {string} - Token that can be used to issue a query for the next page of metric history values. A 
     * missing token indicates that no additional metrics are available to fetch.
     */
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        `Error finding metric for given run: ${
          data.message || response.statusText
        }`
      );
    }
    // console.log('data: ', data);
    return data;
  }

  /**
   * 
   * @param {Array<{key: string, value: string}>} experiment_ids - List of experiment IDs to search over.
   * @param {string} filter - A filter expression over params, metrics, and tags, that allows returning a subset of runs. 
   * The syntax is a subset of SQL that supports ANDing together binary operations between a param, metric, or tag and a constant.
   * Example: metrics.rmse < 1 and params.model_class = 'LogisticRegression'
   * You can select columns with special characters (hyphen, space, period, etc.) by using 
   * double quotes: metrics."model class" = 'LinearRegression' and tags."user-name" = 'Tomas'
   * Supported operators are =, !=, >, >=, <, and <=.
   * @param {ViewType} run_view_type - Whether to display only active, only deleted, or all runs. Defaults to active runs.
   * @param {INT32} max_results  - Maximum number of runs desired. If unspecified, defaults to 1000. All servers are
   * guaranteed to support a max_results theshold of at least 50,000 but may support more. Callers of this endpoint are
   * encouraged to pass max_results explicitly and leverage page_token to iterate through experiments.
   * @param {Array<{key: string, value: string}>} order_by - List of columns to be ordered by, including attributes, params, metrics, 
   * and tags with an optional "DESC" or "ASC" annotation, where "ASC" is the default. 
   * Example: ["params.input DESC","metrics.alpha ASC", "metrics.rmse"] Tiebreaks are done by start_time DESC followed by run_id for 
   * runs with the same start time (and this is the default ordering criterion if order_by is not provided).
   * @param {string} page_token 
   * @returns {Promise<Object} - The runs that satisfy the expressions, as a promise object
   */
  async searchRuns(experiment_ids, filter, run_view_type, max_results, order_by, page_token) {
    const url = `${this.trackingUri}/runs/search`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ experiment_ids, filter, run_view_type, max_results, order_by, page_token }),
    });
    /**
     * data can have the fields:
     * runs {An array of Run} - Runs that match the search criteria
     * next_page_token {string} - Token that can be used to retrieve the next page of run results. A missing token indicates
     * that there are no additional run results to be fetched.
     */
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        `Error finding run that satisfies expressions: ${
          data.message || response.statusText
        }`
      );
    }
    // console.log('data: ', data);
    // console.log('data.runs: ', data.runs);
    return data;
  }

  /**
   * 
   * @param {string} run_id - ID of the run whose artifacts to list. Required
   * @param {string} artifact_path - Filter artifacts matching this path (a relative path from the root artifact directory). Not required
   * @param {string} page_token  - Token indicating the page of artifact results to fetch. Not required
   * @returns {Promise<Object>} - The list artifacts for the specified run, as a promise object
   */
  async listArtifacts(run_id, artifact_path = '', page_token = '') {
    if (!run_id) {
      throw new Error("run_id is required");
    }
    const response = await fetch(`${this.trackingUri}/${this.path}/list?run_id=${run_id}&run_uuid=${run_id}&path=${artifact_path}&page_token=${page_token}`);
    /**
     * data can have the fields:
     * root_uri {string} - Root artifact directory for the run
     * files {An array of FileInfo} - File location and metadata for artifacts
     * next_page_token {string} - Token that can be used to retrieve the next page of artifact results. A missing token indicates
     * that there are no additional artifact results to be fetched.
     */
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        `Error retrieving artifacts from run: ${
          data.message || response.statusText
        }`
      );
    }
    console.log('data: ', data);
    return data;
  };
}

let runManagement = new RunManagement(MLFLOW_TRACKING_URI, path);
// console.log(runManagement.listArtifacts('b3457c87f50440388da9d9ddabb1baaa', 'mlflow-artifacts:/784321942139901150/b3457c87f50440388da9d9ddabb1baaa/artifacts/iris_model'));
// console.log(runManagement.listArtifacts('b3457c87f50440388da9d9ddabb1baaa'));
// console.log(runManagement.searchRuns(['784321942139901150']));
// console.log(runManagement.searchRuns());
// console.log(runManagement.getMetricHistory('df87d99de65a42f5bc52d6f5774364b6'));
// console.log(runManagement.logParam('df87d99de65a42f5bc52d6f5774364b6','test2', '008'));
// console.log(runManagement.setTag('df87d99de65a42f5bc52d6f5774364b6', 'testTag1', 'testTag1Val'))
// console.log(runManagement.deleteTag('df87d99de65a42f5bc52d6f5774364b6', 'testTag1'))

export { RunManagement };