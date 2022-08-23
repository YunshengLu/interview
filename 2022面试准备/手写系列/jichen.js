function parent() {
    this.name="father";
    this.age="20";
}
parent.prototype.why=function(){
    console.log(123);
};

function chlid (){
    parent.call(this);
    this.friends = "lsj";
}

chlid.prototype = Object.create(parent.prototype);
chlid.prototype.constructor = chlid;
chlid.prototype.hhy=function(){
    console.log(345);
};

const a= new chlid ();
const b =new parent();
console.log(a.name);
console.log(a.friends);
a.hhy();
b.why();