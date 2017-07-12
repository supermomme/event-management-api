'use strict';

const assert = require('assert');
const app = require('../../src/app');

describe('\'role\' service', () => {
  it('registered the service', () => {
    const service = app.service('role');

    assert.ok(service, 'Registered the service');
  });
});
