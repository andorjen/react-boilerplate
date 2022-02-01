/** Routes for contents */

const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError } = require('../expressError');
const inputContentSchema = require('../schemas/inputContent.json');

const router = new express.Router();

// using require to synchronously load data here as current data is an array;
// if using database, need to use ORM and change view functions to async;
const contentCollection = require('../data/data');

/** GET /api/contents  =>  { contents }
 *  contents: ["string1", "string2", "string3", ...]
 */
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => res.json({ contents: contentCollection }));

/** POST /api/contents/add  => { content }
 *  adds a string to contents, contents is an array of strings
 */
// eslint-disable-next-line no-unused-vars
router.post('/add', (req, res, next) => {
  const validator = jsonschema.validate(req.body, inputContentSchema);

  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const { content } = req.body;
  contentCollection.push(content);

  return res.status(201).json({ content });
});

module.exports = router;
