// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/texts.json');

function validLevel(string) {
  if (string !== 'easy' && string !== 'medium' && string !== 'hard') return false;
  return true;
}

function readAllTexts(level) {
  const texts = parse(jsonDbPath);

  if (level === undefined) return texts;

  if (!validLevel(level)) return undefined;

  const textsLevel = texts.filter((text) => text.level === level);
  return textsLevel;
}

function readOneText(id) {
  const texts = parse(jsonDbPath);
  const indexOfTextFound = texts.findIndex((text) => text.id === id);
  if (indexOfTextFound < 0) return undefined;

  return texts[indexOfTextFound];
}

function createOneText(content, level) {
  const texts = parse(jsonDbPath);

  const createdText = { id: uuidv4(), content, level };

  texts.push(createdText);

  serialize(jsonDbPath, texts);

  return createdText;
}

function deleteOneText(id) {
  const texts = parse(jsonDbPath);
  const foundIndex = texts.findIndex((text) => text.id === id);
  if (foundIndex < 0) return undefined;

  const deletedTexts = texts.splice(foundIndex, 1);
  const deletedText = deletedTexts[0];
  serialize(jsonDbPath, texts);

  return deletedText;
}

function updateOneText(id, textProps) {
  const texts = parse(jsonDbPath);
  const indexOfTextFound = texts.findIndex((text) => text.id === id);

  if (indexOfTextFound < 0) return undefined;

  const textPriorToChange = texts[indexOfTextFound];

  const updatedText = {
    ...textPriorToChange,
    ...textProps
  };

  texts[indexOfTextFound] = updatedText;

  serialize(jsonDbPath, texts);

  return updatedText;
}

module.exports = {
  validLevel,
  readAllTexts,
  readOneText,
  createOneText,
  deleteOneText,
  updateOneText,
};
