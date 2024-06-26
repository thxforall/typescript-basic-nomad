function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

function prepend<T>(arr: T[], item: T): T[] {
  return [item, ...arr];
}

function shuffle<T>(arr: T[]): T[] {
  const arrCopy = [...arr];
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[randomPosition]] = [
      arrCopy[randomPosition],
      arrCopy[i],
    ];
  }
  return arrCopy;
}

function mix<T>(arr1: T[], arr2: T[]): T[] {
  const combinedArray = [...arr1, ...arr2];
  return shuffle(combinedArray);
}

function count<T>(arr: T[]): number {
  return arr.length;
}

function findIndex<T>(arr: T[], item: T): number | null {
  const index = arr.findIndex((element) => element === item);
  return index !== -1 ? index : null;
}

function slice<T>(arr: T[], startIndex: number, endIndex?: number): T[] {
  return arr.slice(startIndex, endIndex);
}

console.log(last([1, 2, 3, 4])); // 4
console.log(prepend([2, 3, 4], 1)); // [1, 2, 3, 4]
console.log(shuffle([1, 2, 3, 4])); // 랜덤 섞인 배열
console.log(mix([1, 2], [3, 4])); // 랜덤 섞인 배열
console.log(count([1, 2, 3, 4])); // 4
console.log(findIndex([1, 2, 3, 4], 3)); // 2
console.log(slice([1, 2, 3, 4], 1, 3)); // [2, 3]