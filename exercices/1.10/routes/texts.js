const express = require('express');
const {
    validLevel,
    readAllTexts,
    readOneText,
    createOneText,
    deleteOneText,
    updateOneText
} = require('../models/texts');

const router = express.Router();

// Read all the texts, filtered by level if the query param exists
router.get('/', (req, res) => {
    const textFiltered = readAllTexts(req?.query?.level);

    if (textFiltered === undefined) return res.sendStatus(400);

    return res.json(textFiltered);
});

// Read a text from its id
router.get('/:id', (req, res) => {
    const foundText = readOneText(req?.params?.id);

    if (!foundText) return res.sendStatus(404);

    return res.json(foundText);
});

// Create a text
router.post('/', (req, res) => {
    const content = req?.body?.content?.trim()?.length !== 0 ? req.body.content : undefined;
    const level = validLevel(req?.body?.level) ? req.body.level : undefined;

    if (!content || !level) return res.sendStatus(400);

    const createdText = createOneText(content, level);

    return res.json(createdText);
});

// Delete a text
router.delete('/:id', (req, res) => {
    const deletedText = deleteOneText(req?.params?.id);

    if (!deletedText) return res.sendStatus(404);

    return res.json(deletedText);
});


// Update a text only if all properties are given or create it if it does not exist and the id is not existant
router.put('/:id', (req, res) => {
    const content = req?.body?.content;
    const level = validLevel(req?.body?.level) ? req.body.level : undefined;

  if (!req.body || !content || !content.trim() || !level) return res.sendStatus(400);

    const updatedOrNewText = updateOneText(req?.params?.id, req.body);
    
    if (!updatedOrNewText) res.sendStatus(404);

    return res.json(updatedOrNewText);
});

module.exports = router;
