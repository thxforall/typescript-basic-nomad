 <!-- eunm 분류표
 https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking


  // findBookByGenresNumber(genresNumber: DCCKeys) {}
  // findBookByRating(number: number) {}

a. 主類表
 000 컴퓨터 과학, 정보, 총류- Computer science, information & general works
 100 철학 - Philosophy & psychology
 200 종교 - Religion
 300 사회과학 - Social Sciences
 400 어학 - Language
 500 순수과학 - Science
 600 기술과학 - Technology
 700 예술 - Art & recreation
 800 문학 - Literature
 900 역사 - History & geography -->

 안녕하세요 '기요리' 입니다.
https://huchu.link/s84KmfR

 먼저 코드입니다. 주어진 '사전' 대신 '도서관' 으로 접근해봤습니다. DCC(듀이 십진분류법) 에 꽂혀 DCC를 상수로 만들고 나누면 재밌을 것 같다는 생각에 먼저 시작했습니다... 그런데 그게 화근이었죠...  가장 어려웠던 부분은 Class의 구조를 설정하는게 가장 어려웠습니다. method를 만들때에도 return의 타입과 재사용성을 고려하여 이것저것 손을 대다보니... 코드가 엉키기도 하더군요... 구조를 조금더 명확하게 설정하고 계획을 세워야한다는 걸 깨달았습니다... 
 
여러분들은 코드들을 짜기전에 어떻게 계획하고 고민하는지 궁금합니다! 

--- 

 **1. Enum**
 분류표의 수를 상수로 하여 타입을 나누려했습니다. 그래서 단순히 `enum`으로 작성하려 구글링 했는데 좋은 내용의 글을 발견해 적용해보았습니다.
https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking <TypeScript enum을 사용하지 않는 게 좋은 이유를 Tree-shaking 관점에서 소개합니다.> 위 내용 말고도 다른 `enum`의사용을 지양하는 내용들이 많더군요. 

```typescript
const DCC = {
  0o0: 'Computer science, information & general works',
  100: 'Philosophy & psychology',
....
} as const;

type DCCKeys = keyof typeof DCC;

type Library = {
  [title: string]: {
    genres: DCCKeys;
    rating: number;
  };
};

class Book {
  constructor(
    public title: string,
    public genres: DCCKeys,
    public rating: number
  ) {}
}

class Librarian {
  public library: Library;

  constructor() {
    this.library = {};
  }
}

```

**2. 구조**
먼저 구조를 설정할 때 배열로 설정하여 진행했습니다.  배열로 설정하여 DCC를 키로 설정하였더니 중복된 키 값이 나오는걸 늦게 깨달았습니다. add 될때 id 값을 주고자 하였지만... 너무 어려워지는 것 같아 패스했습니다. 이것 저것 고민하다 구조를 뜯어 고치면서  코드가 많이 꼬이기도 했습니다. 
