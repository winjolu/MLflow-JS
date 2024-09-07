import fetch from 'node-fetch';
import { ModelVersionManagement } from './ModelVersionManagement.js';

const trackingUri = 'http://localhost:5001'; 
console.log(`Tracking URI in test: ${trackingUri}`);

const modelManager = new ModelVersionManagement();

// define the model name and artifact path
const modelName = 'iris-rf-model';
const artifactPath = 'mlflow-artifacts:/933426838722935527/b43262e4bded4d39afaa803a97c14f7f/artifacts/iris-rf-model';

// test 1: create a new model version
async function testCreateModelVersion() {
  try {
    const response = await modelManager.createModelVersion(modelName, artifactPath);
    console.log('model version created:', response);
  } catch (error) {
    console.error('error:', error);
  }
}

// test 2: fetch details of a specific model version
async function testGetModelVersion() {
  try {
    const response = await modelManager.getModelVersion(modelName, '1');
    console.log('model version details:', response);
  } catch (error) {
    console.error('error:', error);
  }
}

// test 3: update a specific model version
async function testUpdateModelVersion() {
  try {
    const response = await modelManager.updateModelVersion(modelName, '1', { description: 'updated description' });
    console.log('model version updated:', response);
  } catch (error) {
    console.error('error:', error);
  }
}

// test 4: delete a specific model version
async function testDeleteModelVersion() {
  try {
    await modelManager.deleteModelVersion(modelName, '1');
    console.log('model version deleted');
  } catch (error) {
    console.error('error:', error);
  }
}

// test 5: search for model versions
async function testSearchModelVersions() {
  try {
    const response = await modelManager.searchModelVersions(`name = '${modelName}'`);
    console.log('search results:', response);
  } catch (error) {
    console.error('error:', error);
  }
}

// test 6: retrieve the download uri for model version artifacts
async function testGetDownloadUriForModelVersionArtifacts() {
  try {
    const response = await modelManager.getDownloadUriForModelVersionArtifacts(modelName, '1');
    console.log('download uri:', response);
  } catch (error) {
    console.error('error:', error);
  }
}

// test 7: transition a model version to a different stage
async function testTransitionModelVersionStage() {
  try {
    const response = await modelManager.transitionModelVersionStage(modelName, '1', 'Production');
    console.log('model version stage transitioned:', response);
  } catch (error) {
    console.error('error:', error);
  }
}

// test 8: set a tag on a specific model version
async function testSetModelVersionTag() {
  try {
    await modelManager.setModelVersionTag(modelName, '1', 'key1', 'value1');
    console.log('model version tag set');
  } catch (error) {
    console.error('error:', error);
  }
}

// test 9: delete a tag from a specific model version
async function testDeleteModelVersionTag() {
  try {
    await modelManager.deleteModelVersionTag(modelName, '1', 'key1');
    console.log('model version tag deleted');
  } catch (error) {
    console.error('error:', error);
  }
}

// uncomment one test at a time to run it

// testCreateModelVersion();
// testGetModelVersion();
// testUpdateModelVersion();
// testDeleteModelVersion();
// testSearchModelVersions();
// testGetDownloadUriForModelVersionArtifacts();
// testTransitionModelVersionStage();
// testSetModelVersionTag();
// testDeleteModelVersionTag();
