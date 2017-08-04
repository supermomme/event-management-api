// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    if(!hook.result.role) return Promise.resolve(hook);
    const mongooseClient = hook.app.get('mongooseClient');
    let promises = [
      new Promise((resolve, reject)=>{
        resolve(hook.result.permissions || [])
      }),

      new Promise((resolve, reject)=>{
        resolve(hook.result.role.permissions || []);
      }),

      hook.app.service('registration').find({query:{user:hook.result._id}})
      .then(res=>res.data.reduce((acc,val)=>{
        acc.push(val.purpose)
        return acc;
      }, []))
      .then(purposes=>purposes.reduce((acc,val)=>acc.concat(val.permissions),[]))

    ]



    return Promise.all(promises)
    .then(res=>res.reduce((acc,val)=>acc.concat(val),[]))
    .then((permissions)=>{
      hook.result.permissions = permissions;
      return hook;
    })

  };
};
