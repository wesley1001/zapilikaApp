'use strict';
//Permutations without replacements


Permutations.prototype.init = function(n, k){
  this.n = n;
  this.k = k;

  this.i = new Array(this.k);
  this.a = new Array(this.n);

  this.index = 0;
  this.i[0] = -1;
  this.add();

  return this;
};

//return count of all possible permutations
Permutations.prototype.number = function () {
  var i;
  var r = 1;
  // result = n(n-1)(n-2)...(n-k+1)
  for (i = this.n - this.k + 1; i <= this.n; i++) {
    r *= i;
  } 
  
  return r;
};

Permutations.prototype.add = function() {
  var j = this.index;
  var m, l;
  this.i[j]++;

  //set to zero indexes after i[j]
  for (j++; j < this.k; j++) {
    this.i[j] = 0
  }

  //remove used indexes values
  for (j = 0; j < this.n; j++) {
    this.a[j] = j;
  }
  for (j = 0; j < this.k; j++) {
    m = j + this.i[j];
    l = this.a[m];
    for (; j != this.k - 1 && m > j; m--) {
      this.a[m] = this.a[m - 1];
    }
    this.a[j] = l;
  }

};

Permutations.prototype.next  = function() {
  var l, j;

  //from last index to first
  for (j = this.k - 1; j >= 0; j--) {
    l = j;
    if (this.n - 1 != this.i[j] + l) {
      break;
    }
  }

  this.index = j;
  if (this.index == -1) {
    return false;
  }

  this.add();
  return true;
};

Permutations.prototype.process = function(){
  //todo refactoring
  var indexArray = [];

  do {
    var indexes = [];
    for (var i = 0; i < this.k; i++) {
      indexes.push(this.a[i]);
    }

    indexArray.push(indexes);
  } while (this.next());

  return indexArray;
};


export default function Permutations(n, k) {
  if (k == undefined || n == undefined) return;
  return this.init(n, k);
}

