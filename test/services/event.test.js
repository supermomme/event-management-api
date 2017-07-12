'use strict';

const assert = require('assert');
const app = require('../../src/app');

describe('\'event\' service', () => {
  it('registered the service', () => {
    const service = app.service('event');

    assert.ok(service, 'Registered the service');
  });
});
