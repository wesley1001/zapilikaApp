'use strict';
//Permutations without replacements
/*
 Алгоритм:
 Перебор всех комбинации из n объектов по k элементов с опцией размещение без повторений.
 1) справа налево увеличиваем индекс до тех пор i[j] = n-1-j. На каждой иттерации получается 
 набор рабочих индексов подобных [0,0,0] [0,0,1] [0,1,0] [0,1,1] [0,2,0] [0,2,1] и т.д. (this.i)
 2) преобразовываем рабочие индексы(this.i) в результирующее размещение без повторений.(this.r)
 Для каждого набора рабочих индексов:
 Формируем массив arr = [0,1,2,3...n-1].  
 Например, рабочий набор индексов [1,2,1].
 1. i[0] = 1 => r[0] = arr[1] = 1. удаляем из arr, arr[1] -> [0,2,3..n]
 2. i[1] = 2 => r[1] = arr[2] = 3. удялаем -> [0,2,...n]
 и так далее.
 */

export default function Permutations(n, k) {
  if (k == undefined || n == undefined) return;
  return this.init(n, k);
}

Permutations.prototype.init = function (n, k) {
  this.n = n;
  this.k = k;

  this.i = new Array(this.k); //working indexes array
  this.r = new Array(this.k); //result indexes array without repetition

  this.index = 0; //current working index
  this.i[0] = -1; //init first working index as endpoint of alg
  this.add();

  return this;
};

//return count of all possible permutations
Permutations.prototype.number = function () {
  var result = 1;
  // result = n(n-1)(n-2)...(n-k+1)
  for (let i = this.n - this.k + 1; i <= this.n; i++) {
    result *= i;
  }

  return result;
};

Permutations.prototype.add = function () {
  var j = this.index;
  this.i[j]++;

  //set to zero indexes after i[j]
  for (j++; j < this.k; j++) {
    this.i[j] = 0
  }

  //form prim array [0,1..n-1];
  let arr = [];
  for (let i = 0; i < this.n; i++) {
    arr[i] = i;
  }

  //form result array without repetition
  for (let j = 0; j < this.k; j++) {
    this.r[j] = arr[this.i[j]];
    arr.splice(this.i[j], 1);
  }
};

Permutations.prototype.next = function () {
  //from last index to first so far  i[j] = n-1-j
  for (var j = this.k - 1; j >= 0; j--) {
    if (this.n - 1 - j != this.i[j]) {
      break;
    }
  }

  this.index = j;

  if (this.index == -1) return false;

  this.add();
  return true;
};

Permutations.prototype.process = function () {
  let placementArray = [];

  do {
    placementArray.push([].concat(this.r)); //cause of reference array types
  } while (this.next());

  return placementArray;
};
