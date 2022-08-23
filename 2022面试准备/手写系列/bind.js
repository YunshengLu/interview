Function.prototype.myBind = function(context) {
    const self = this;
    const args = [...arguments].slice(1);
    return function (){
        const newargs = [...arguments];
        return self.apply(context,args.concat(newargs));
    };
}; 