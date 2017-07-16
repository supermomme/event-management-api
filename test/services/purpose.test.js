'use strict';

const assert = require('assert');
const app = require('../../src/app');

describe('\'purpose\' service', () => {
  it('registered the service', () => {
    const service = app.service('purpose');

    assert.ok(service, 'Registered the service');
  });
});
