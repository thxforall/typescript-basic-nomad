function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

function prepend<T, U>(arr: T[], item: U): (T | U)[] {
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

function mix<T, U>(arr1: T[], arr2: U[]): (T | U)[] {
  const combinedArray = [...arr1, ...arr2];
  return shuffle(combinedArray);
}

function count<T>(arr: T[]): number {
  return arr.length;
}

function findIndex<T, U extends T>(arr: T[], item: U): number | null {
  const idx = arr.findIndex((element) => element === item);
  return idx !== -1 ? idx : null;
}

function slice<T>(arr: T[], startIndex: number, endIndex?: number): T[] {
  return arr.slice(startIndex, endIndex);
}

// 예제 실행
console.log(last([1, 2, 3, 4])); // 4
console.log(prepend([2, 3, 4], 1)); // [1, 2, 3, 4]
console.log(prepend(['b', 'c'], 'a')); // ['a', 'b', 'c']
console.log(prepend([true, false], 42)); // [42, true, false]

console.log(shuffle([1, 2, 3, 4])); // 랜덤 섞인 배열
console.log(mix([1, 2], ['a', 'b'])); // 랜덤 섞인 배열
console.log(mix([true, false], [1, 2, 3])); // 랜덤 섞인 배열

console.log(count([1, 2, 3, 4])); // 4
console.log(findIndex([1, 2, 3, 4], 3)); // 2
console.log(slice([1, 2, 3, 4], 1, 3)); // [2, 3]
