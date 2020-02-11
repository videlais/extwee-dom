import pkg from './version.json';
/**
 * @class Story
 * @module Story
 */
class Story {
  /**
   * @function Story
   * @class
   */
  constructor () {
    this.name = 'Unknown';
    this.metadata = {
      ifid: '',
      format: '',
      formatVersion: '',
      zoom: '',
      start: ''
    };

    this.passages = [];

    // Store the creator and version
    this.creator = pkg.name;
    this.creatorVersion = pkg.version;
  }

  /**
   * Get all passages tagged with 'stylesheet'
   *
   * @function getStylePassages
   * @returns {Array} Return an array of any 'stylesheet' passages
   */
  getStylePassages () {
    let stylePassages = [];

    if (this.passages.length > 0) {
      stylePassages = this.passages.filter(function (passage) {
        const results = passage.tags.filter(tag => tag === 'stylesheet');

        return (results.length > 0);
      });
    }

    return stylePassages;
  }

  /**
   * Get passages tagged with 'script'
   *
   * @function getScriptPassages
   * @returns {Array} Return an array of any 'script' passages
   */
  getScriptPassages () {
    let scriptPassages = [];

    if (this.passages.length > 0) {
      scriptPassages = this.passages.filter(function (passage) {
        const results = passage.tags.filter(tag => tag === 'script');

        return (results.length > 0);
      });
    }

    return scriptPassages;
  }

  /**
   * Delete passages passed on their tags
   *
   * @function deleteAllByTag
   * @param {string} searchTag - Tags to search for
   */
  deleteAllByTag (searchTag) {
    if (this.passages.length > 0) {
      this.passages = this.passages.filter(function (passage) {
        return !passage.tags.includes(searchTag);
      });
    }
  }

  /**
   * Find the starting passage
   *
   * @function getStartingPassage
   * @returns {string} The starting passage
   */
  getStartingPassage () {
    let pid = null;
    let searchName = null;

    if (Object.prototype.hasOwnProperty.call(this.metadata, 'start')) {
      // Check if the property is an empty string
      // If so, ignore it.
      if (this.metadata.start !== '') {
        searchName = this.metadata.start;
      }
    }

    if (this.passages.length > 0) {
      for (const passage in this.passages) {
        if (this.passages[passage].name === searchName) {
          pid = this.passages[passage].pid;
          break;
        }

        if (this.passages[passage].name === 'Start') {
          pid = this.passages[passage].pid;
        }
      }
    }

    if (pid === null) {
      throw new Error('Starting passage not found!');
    } else {
      return pid;
    }
  }
}

export default Story;
