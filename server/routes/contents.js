/** Routes for contents */

const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError } = require('../expressError');
const inputContentSchema = require('../schemas/inputContent.json');

const router = new express.Router();

const contentCollection = require('../data/data');

/** GET /contents  =>  { contents }
 *  contents: ["string1", "string2", "string3", ...]
 */
// eslint-disable-next-line no-unused-vars
router.get('/', function getAllContents(req, res, next) {
  return res.json({ contents: contentCollection });
});

/** POST /contents  => { content }
 *  adds a string to contents, contents is an array of strings
 */
// eslint-disable-next-line no-unused-vars
router.post('/add', function postNewString(req, res, next) {
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
