'use strict';

const cloudant = require('../../../server/datastores/cloudant');

/**
 * Create a new database, it not existing.
 * @param {string} db_name - The database name.
 * @returns {Promise} - The Promise object representing the database creation or failure.
 */
function create_db(db_name) {
  return new Promise((resolve, reject) => {
    cloudant('database')
      .db.create(db_name)
      .then(() => {
        console.debug(`Database was created successfully: ${db_name}`);
        return resolve();
      })
      .catch((err) => {
        if (err.statusCode !== 412) {
          console.error(err);
          return reject();
        }
        return resolve();
      });
  });
}

/**
 * List documents of a database.
 * @param {string} db_name - The database name.
 * @returns {Promise} - The Promise object representing the database creation or failure.
 */
const list = (db_name) =>
  new Promise(async (resolve, reject) => {
    await create_db(db_name);
    cloudant('database')
      .db.use(db_name)
      .list({ include_docs: true })
      .then((data) => {
        const docs = [];
        if (data.rows) {
          data.rows.forEach((row) => {
            if (row.doc) {
              docs.push(row.doc);
            }
          });
          resolve(docs);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Find documents in a database, based on a selector object.
 * @param {string} db_name - The database name.
 * @param {Object} selector - The selector object with the criteria to find documents.
 * @returns {Promise} - The Promise object representing an array of the documents found or failure.
 */
const find = (db_name, selector = {}) =>
  new Promise(async (resolve, reject) => {
    await create_db(db_name);
    cloudant('database')
      .db.use(db_name)
      .find(selector)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Get documents from database view.
 * @param {string} db_name - The database name.
 * @param {string} designDoc - The design doc name, which contains the view.
 * @param {string} view - The view name.
 * @param {Object} params - The object with the params to query the view.
 * @returns {Promise} - The Promise object representing an array of the documents found or failure.
 */
const view = (db_name, design_doc, view_name, params = null) =>
  new Promise(async (resolve, reject) => {
    await create_db(db_name);
    if (!params) {
      params = {};
    }
    params.include_docs = true;

    cloudant('database')
      .db.use(db_name)
      .view(design_doc, view_name, params)
      .then((data) => {
        const docs = [];
        if (data.rows) {
          data.rows.forEach((row) => {
            if (row.doc) {
              docs.push(row.doc);
            }
          });
          resolve(docs);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Get a document from the database, based on the document id.
 * @param {string} db_name - The database name.
 * @param {string} id - The document id.
 * @returns {Promise} - The Promise object representing the document found or failure.
 */
const get = (db_name, id) =>
  new Promise(async (resolve, reject) => {
    await create_db(db_name);
    cloudant('database')
      .db.use(db_name)
      .get(id)
      .then((data) => resolve(data))
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Insert a new document into the database.
 * @param {string} db_name - The database name.
 * @param {Object} doc - The document to be inserted. If _id is provided and not existing, new document
 * is inserted with that; otherwise, 409 conflict error is generated.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
function insert_doc(db_name, doc) {
  return new Promise(async (resolve, reject) => {
    await create_db(db_name);
    // Delete _rev element, if existing, as it is not used to insert new documents
    if (doc._rev) {
      delete doc._rev; // eslint-disable-line no-param-reassign
    }
    cloudant('database')
      .db.use(db_name)
      .insert(doc)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Insert a new document into the database.
 * @param {string} db_name - The database name.
 * @param {Object} doc - The document to be inserted. If _id is provided and not existing, new document
 * is inserted with that; otherwise, 409 conflict error is generated.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
const insert = (db_name, doc) => insert_doc(db_name, doc);

/**
 * Update an existing document in the database.
 * @param {string} db_name - The database name.
 * @param {Object} doc - The document to be updated. Element _id should be provided, otherwise it is an insert.
 * Element _rev should be provided ,otherwise 409 conflict error is generated.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
function update_doc(db_name, doc) {
  return new Promise(async (resolve, reject) => {
    await create_db(db_name);
    cloudant('database')
      .db.use(db_name)
      .insert(doc)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Update an existing document in the database.
 * @param {string} db_name - The database name.
 * @param {Object} doc - The document to be updated. Element _id should be provided, otherwise it is an insert.
 * Element _rev should be provided ,otherwise 409 conflict error is generated.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
const update = (db_name, doc) => update_doc(db_name, doc);

/**
 * Save a document in the database.
 * If _id is not provided, insert a new document.
 * If _id is provided and does not exist, insert a new document.
 * If _id is provided and exists, update an existing document.
 * @param {string} db_name - The database name.
 * @param {Object} doc - The document to be saved.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
const save = (db_name, doc) =>
  new Promise(async (resolve, reject) => {
    await create_db(db_name);
    // If the doc to be saved has _id, check if a doc with the _id exists
    if (doc._id) {
      cloudant('database')
        .db.use(db_name)
        .get(doc._id)
        // If a doc with the _id exists, update it
        .then(() => resolve(update_doc(db_name, doc)))

        .catch((err) => {
          // If a doc with the _id does not exist, insert as a new doc
          if (err.statusCode === 404) {
            resolve(insert_doc(db_name, doc));
          } else {
            reject(err);
          }
        });
    }
    // If doc to be inserted does not have _id, insert as a new doc
    else {
      resolve(insert_doc(db_name, doc));
    }
  });

/**
 * Delete a document from the database.
 * @param {string} db_name - The database name.
 * @param {string} id - The document id.
 * @returns {Promise} - The Promise object representing the result of the operation or failure.
 */
const remove = (db_name, id) =>
  new Promise(async (resolve, reject) => {
    await create_db(db_name);
    cloudant('database')
      .db.use(db_name)
      .get(id)
      .then((doc) => {
        cloudant('database')
          .db.use(db_name)
          .destroy(id, doc._rev)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = {
  list,
  find,
  view,
  get,
  insert,
  update,
  save,
  remove,
};
