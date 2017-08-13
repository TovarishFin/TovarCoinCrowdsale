export default function toPromise(cbFunction) {
  return new Promise(function(resolve, reject) {
    cbFunction((err, res) => {
      if(err) {
        reject(err);
      } else {
        resolve(res);
      }

    })
  });
};
