/**
 * @class Passage
 * @module Passage
 */
class Passage {
  /**
   * @function Passage
   * @class
   * @param {string} name - Name of Passage
   * @param {Array} tags - Any tags
   * @param {object} metadata - Any metadata
   * @param {string} text - Content of passage
   * @param {number} pid - Passage ID
   */
  constructor (name = '', tags = [], metadata = {}, text = '', pid = 1) {
    this.name = name;
    this.tags = tags;
    this.metadata = metadata;
    this.text = text;
    this.pid = pid;
  }
}

export default Passage;
