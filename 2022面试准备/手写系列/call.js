Function.prototype.myCall = function (context,...args){
    context = context ||window;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
};
Function.prototype.myApply = function (context,array=[]){
    context = context ||window;
    context.fn = this;
    const result = context.fn(...array);
    delete context.fn;
    return result;
};
const a= {
    name:"lsj"
};
function b(x){
    console.log(this.name);
    console.log(x);
} 
b.myApply(a,[12,123]);