/* eslint-env node, mocha */
/* eslint no-sync:0 */
/* eslint no-unused-expressions: 0 */

// Include external dependencies
var ZSchema = require('z-schema');
var chai = require("chai");
var fs = require('fs');
var expect = chai.expect;

// Setup
var schema = require('../schema.json');
var interagentSchema = JSON.parse(fs.readFileSync('interagent-hyper-schema'));

var car = require('./data/valid/car');
var coloredCar = require('./data/valid/colored-car');
var cars = require('./data/valid/cars');
var color = require('./data/valid/color');
var colors = require('./data/valid/colors');
var extraPropCar = require('./data/invalid/extra-prop-car');
var invalidColorCar = require('./data/invalid/invalid-color-car');
var invalidColor = require('./data/invalid/invalid-color');
var validJson = [
    {
      data: car,
      path: "definitions.car"
    },
    {
      data: cars,
      path: "definitions.car.definitions.cars"
    },
    {
      data: color,
      path: "definitions.color"
    },
    {
      data: colors,
      path: "definitions.color.definitions.colors"
    },
    {
      data: coloredCar,
      path: "definitions.car"
    }
    //coloredCar,
    //cars,
    //color,
    //colors
];
var invalidJson = [
    {
      data: invalidColorCar,
      path: "definitions.car"
    },
    {
      data: invalidColor,
      path: "definitions.color"
    },
    {
      data: extraPropCar,
      path: "definitions.car"
    }
];

var validator = new ZSchema({});
chai.config.includeStack = true;

validator.setRemoteReference('http://interagent.github.io/interagent-hyper-schema', interagentSchema);

describe("Schema Validation", function validTests() {
  it("should handle valid json", function validateValid() {
    var i;
    var valid;
    var entry;
    var path;
    var json;
    for (i = 0; i < validJson.length; i++) {
      entry = validJson[i];
      json = entry.data;
      path = entry.path;
      if (path) {
        valid = validator.validate(json, schema, {
          schemaPath: path
        });
      } else {
        valid = validator.validate(json, schema);
      }
      if (valid !== true) {
        console.log("error validating json", json);
        console.log(validator.getLastErrors());
      }
      expect(valid).to.be.true;
    }
  });
  it("should handle invalid json", function validateInvalid() {
    var i;
    var valid;
    var entry;
    var path;
    var json;
    for (i = 0; i < invalidJson.length; i++) {
      entry = invalidJson[i];
      json = entry.data;
      path = entry.path;
      if (path) {
        valid = validator.validate(json, schema, {
          schemaPath: path
        });
      } else {
        valid = validator.validate(json, schema);
      }
      if (valid !== false) {
        console.log("error, validating invalid json succeeded", json);
      }
      expect(valid).to.be.false;
    }
  });
});
