const errors = require('feathers-errors');

module.exports = function (options = {}) {
  return function (hook) {
    if (hook.method != "create" || hook.type != "after")
      return Promise.reject(new errors.BadRequest('Use setDefaultPermissions hook as create and after hook!'));
    if (!options || !options.service)
      return Promise.reject(new errors.BadRequest('Set in options the user service name'));

    let permissions = [
      ...hook.result.permissions,
      `${options.service}:get:${hook.result._id}`,
      `${options.service}:patch:${hook.result._id}`,
      `event:get`,
      `event:find`,
      `registration:create`
    ]

    return hook.app.service(options.service).patch(hook.result._id, {
      permissions:permissions
    }).then(user => {
      hook.result = user;
      return hook;
    });
  };
};
