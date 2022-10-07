'use strict';

const cloudant = require('../../config/datasources/cloudant-connector');

/**
 * Create a new database, it not existing.
 * @param {string} dbName - The database name.
 * @returns {Promise} - The Promise object representing the database creation or failure.
 */
function createDb(dbName) {
  return new Promise((resolve, reject) => {
    const service = cloudant();

    service
      .putDatabase({ db: dbName })
      .then(() => {
        console.debug(`Database was created successfully: ${dbName}`);
        return resolve();
      })
      .catch((err) => {
        if (err.status !== 412) {
          return reject(err);
        }
        return resolve();
      });
  });
}

/**
 * List documents of a database.
 * @param {string} dbName - The database name.
 * @returns {Promise} - The Promise object representing an array of the documents found or failure.
 */
const list = (dbName) =>
  new Promise(async (resolve, reject) => {
    await createDb(dbName).catch((err) => reject(err));

    const service = cloudant();

    service
      .postAllDocs({ db: dbName, includeDocs: true })
      .then((data) => {
        resolve(data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Find documents in a database, based on a selector object.
 * @param {string} dbName - The database name.
 * @param {Object} selector - The selector object with the criteria to find documents.
 * @returns {Promise} - The Promise object representing an array of the documents found or failure.
 */
const find = (dbName, selector = {}) =>
  new Promise(async (resolve, reject) => {
    await createDb(dbName).catch((err) => reject(err));

    const service = cloudant();

    service
      .postFind({ db: dbName, selector })
      .then((data) => {
        resolve(data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Get a document from the database, based on the document id.
 * @param {string} dbName - The database name.
 * @param {string} id - The document id.
 * @returns {Promise} - The Promise object representing the document found or failure.
 */
const get = (dbName, id) =>
  new Promise(async (resolve, reject) => {
    await createDb(dbName).catch((err) => reject(err));

    const service = cloudant();

    service
      .getDocument({ db: dbName, docId: id })
      .then((data) => {
        resolve(data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Insert a new document into the database.
 * @param {string} dbName - The database name.
 * @param {Object} doc - The document to be inserted. If _id is provided and not existing, new document
 * is inserted with that; otherwise, 409 conflict error is generated.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
function insertDoc(dbName, doc) {
  return new Promise(async (resolve, reject) => {
    await createDb(dbName).catch((err) => reject(err));

    const service = cloudant();

    service
      .postDocument({ db: dbName, document: doc })
      .then((data) => {
        resolve(data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Insert a new document into the database.
 * @param {string} dbName - The database name.
 * @param {Object} doc - The document to be inserted. If _id is provided and not existing, new document
 * is inserted with that; otherwise, 409 conflict error is generated.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
const insert = (dbName, doc) => insertDoc(dbName, doc);

/**
 * Update an existing document in the database.
 * @param {string} dbName - The database name.
 * @param {Object} doc - The document to be updated. Element _id should be provided, otherwise it is an insert.
 * Element _rev should be provided ,otherwise 409 conflict error is generated.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
function updateDoc(dbName, doc) {
  return new Promise(async (resolve, reject) => {
    await createDb(dbName).catch((err) => reject(err));

    const service = cloudant();

    service
      .postDocument({ db: dbName, document: doc })
      .then((data) => {
        resolve(data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Update an existing document in the database.
 * @param {string} dbName - The database name.
 * @param {Object} doc - The document to be updated. Element _id should be provided, otherwise it is an insert.
 * Element _rev should be provided ,otherwise 409 conflict error is generated.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
const update = (dbName, doc) => updateDoc(dbName, doc);

/**
 * Delete a document from the database.
 * @param {string} dbName - The database name.
 * @param {string} id - The document id.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
const remove = (dbName, id) =>
  new Promise(async (resolve, reject) => {
    await createDb(dbName).catch((err) => reject(err));

    const service = cloudant();

    service
      .deleteDocument({ db: dbName, docId: id })
      .then((data) => {
        resolve(data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = {
  list,
  find,
  get,
  insert,
  update,
  remove,
};
