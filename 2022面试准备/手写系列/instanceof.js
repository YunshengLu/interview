/* eslint-disable no-constant-condition */
function instaceofFc(l,r) {
  let lpro = l.__proto__;
  const rpro = r.prototype;
//   const flag =false
  while (true) {
    if(lpro===null){
        return  false;
    }
   if(lpro ===rpro){
    return true;
   }
   lpro= lpro.__proto__;
  }
}
const arr=[1,2];
console.log(123);
console.log(instaceofFc(arr,Object));