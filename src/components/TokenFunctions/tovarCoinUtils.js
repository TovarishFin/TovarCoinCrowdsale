export default {

  toPromise: function(cbFunction) {
    return new Promise(function(resolve, reject) {
      cbFunction((err, res) => {
        if(err) {
          reject(err);
        } else {
          resolve(res);
        }

      })
    });
  }

}
