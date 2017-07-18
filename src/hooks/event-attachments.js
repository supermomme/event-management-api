'use strict';

module.exports = function (options = {}) {
  return function (hook) {
    if (hook.type !== "after") return Promise.reject(new errors.Unprocessable('eventAttachments must be a before hook'));
    if (hook.method !== "get") return Promise.reject(new errors.Unprocessable('eventAttachments must be a get hook'));

    let promises = [
      hook.app.service('purpose').find({query:{event:hook.id}})
      .then(res=>res.data),

      hook.app.service('program').find({query:{event:hook.id}})
      .then(res=>res.data),
    ]
    
    return Promise.all(promises)
    .then(val=>{
      hook.result.purpose = val[0];
      hook.result.program = val[1];
      return hook;
    })
  };
};
