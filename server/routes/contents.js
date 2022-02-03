/** Routes for contents */

// const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError } = require('../expressError');
// const inputContentSchema = require('../schemas/inputContent.json');

const router = new express.Router();

// NOTE: using require to synchronously load data here as current data is an array;
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
  // NOTE:here choosing manual validation for simplicity,
  // if dealing with more complicated data, use below example to validate json.

  // const validator = jsonschema.validate(req.body, inputContentSchema);
  // if (!validator.valid) {
  //   const errs = validator.errors.map(e => e.stack);
  //   throw new BadRequestError(errs);
  // }

  const { content } = req.body;

  if (content.length < 1) {
    throw new BadRequestError('Input length too short, must be at least 1.');
  } else if (content.length > 1000) {
    throw new BadRequestError('Input length too long, max is 1000.');
  } else if (Object.keys(req.body).length > 1) {
    throw new BadRequestError("You can't input extra field.");
  }
  contentCollection.push(content);

  return res.status(201).json({ content });
});

module.exports = router;
