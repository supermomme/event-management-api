// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    if(!hook.result.role) return Promise.resolve(hook);
    let rolePermissions = hook.result.role.permissions || [];
    let permissions = hook.result.permissions || [];
    permissions = [
      ...permissions,
      ...rolePermissions
    ];
    hook.result.permissions = permissions;

    return Promise.resolve(hook);
  };
};
