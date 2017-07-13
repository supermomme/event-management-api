'use strict';

const assert = require('assert');
const app = require('../../src/app');

describe('\'program\' service', () => {
  it('registered the service', () => {
    const service = app.service('program');

    assert.ok(service, 'Registered the service');
  });
});
