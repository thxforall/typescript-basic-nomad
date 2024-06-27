// eunm 분류표

type Words = {
  [key: string]: string;
};

class Dictionary {
  private words: Words;
  constructor() {
    this.words = {};
  }

  add(word: Word) {
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }

  getDef(term: string) {
    return this.words[term];
  }
}

class Word {
  constructor(public term: string, public def: string) {}
}

const kimchi = new Word('kimchi', 'korean food');

const dict = new Dictionary();

dict.add(kimchi);

console.log(kimchi);
console.log(dict);
console.log(dict.getDef('kimchi'));
