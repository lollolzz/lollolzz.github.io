// 1. 박스 2개 만들기 
// 2. 드랍다운 리스트 만들기 
// 2. 환율정보 들고 오기 
// 3. 드랍다운 리스트에서 아이템 선택하면 아이템이 바뀜
// 4. 금액을 입력하면 환전이 된다.
// 5. 드랍다운 리스트에서 아이템을 선택하면 다시 그  단위 기준으로 환전이 됨
// 6. 숫자를 한국어로 읽는 법
// 7. 반대로 밑에 박스에서 숫자를 바꿔도 위에 박스에 환율이 적용이 된다.


// 환율 정보 들고 오기 
const currencyRatio = { // let은 변수에 재할당이 가능하다
    // 어떤 값에 대하여 여러가지 정보가 필요 할때 객체가 필요하다 
    VND: {
        USD: 0.000043,
        KRW: 0.051,
        VND: 1,
        unit: "동",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2560px-Flag_of_Vietnam.svg.png",
      },
      USD: {
        USD: 1,
        KRW: 1182.35,
        VND: 23235.5,
        unit: "달러",
        img: "https://cdn-icons-png.flaticon.com/512/555/555526.png",
      },
      KRW: {
        USD: 0.00085,
        KRW: 1,
        VND: 19.47,
        unit: "원",
        img: "https://cdn.countryflags.com/thumbs/south-korea/flag-400.png",
      },
    };
// 1.console.log(currencyRatio.VND.unit);
// 2.console.log(currencyRatio["VND"]["unit"]);


// 드랍다운 리스트에서 아이템 선택하면 아이템이 바뀜
//document.querySelector(All) -> html 요소를 javascript로 가져오는 역활을 한다.
//list여서 forEach를 사용한다.
let fromCurrency = 'USD'
let toCurrency = 'USD'
var unitWords = ["", "만", "억", "조", "경"];
var splitUnit = 10000;
let toButton = document.getElementById("to-button");
let fromButton = document.getElementById("from-button");

// document
//     .querySelectorAll("#from-currency-list a")
//     .forEach(menu=>menu.addEventListener("click", function () {
//         // 1. 버튼을 가져온다.
//         // document.getElementById("from-button")

//         // 2. 버튼의 값을 바꾼다.
//         // 내가 선택한 textContent값을 가져와서 버튼의 텍스트로 바꾸어 준다.
//         document.getElementById("from-button").textContent = this.textContent; // 여기서 this는 내가 선택한 것을 의미한다.

//         // 3. 선택된 currency값을 변수에 저장해준다.
//         fromCurrency = this.textContent
//         console.log("fromCurrency는",fromCurrency);
//         })
//     );

// document
//     .querySelectorAll("#to-currency-list a")
//     .forEach(menu=>menu.addEventListener("click", function(){
//         // 1. 버튼을 가져온다.
//         // 2. 버튼의 값을 바꾼다.
//         document.getElementById("to-button").textContent = this.textContent
//         // 3. 선택된 currency값을 변수에 저장해준다.
//         toCurrency = this.textContent;
//     })
// );

document.querySelectorAll("#from-currency-list li").forEach(function (item) { // function () -> 이 안에 들어 있는 코드를 바로 실행하라
    // item이라는 변수이름의 함수에 addEventListener(이벤트를 추가)해주고 클릭 이벤트를 즉시 실행 시켜라
    item.addEventListener("click", function () {
      fromCurrency = this.id;
      fromButton.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
      // index.html에서 id가 from-button 인것을 fromButton에 대입해주었는데
      // 여기에 innerHTML을 사용해서 출력되는 내용을 
      // `<img class="flag-img"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`으로 바꾸어 준다.
      convert("from");
    });
  });
  
  document.querySelectorAll("#to-currency-list li").forEach(function (item) {
    item.addEventListener("click", function () {
      toCurrency = this.id;
      toButton.innerHTML = `<img class="flag-img"src="${currencyRatio[toCurrency].img}"/>${toCurrency}`;
      convert("from");
    });
  });
  
  function convert(type) {
    console.log("here");
    let amount = 0;
    if (type == "from") {
      //입력값 받기
      // getElementById html에서 마크업 되어진 id값을 불러온다.
      amount = document.getElementById("fromAmount").value;
      // 환전하기
      let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
      // 환전한값 보여주기
      // .value input태그의 입력되어진 값을 가져 올때 사용 한다.
      document.getElementById("toAmount").value = convertedAmount;
      //환전한값 한국어로
      renderKoreanNumber(amount, convertedAmount);
    } else {
      amount = document.getElementById("toAmount").value;
      let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
      document.getElementById("fromAmount").value = convertedAmount;
      renderKoreanNumber(convertedAmount, amount);
    }
  }
  function renderKoreanNumber(from, to) {
    document.getElementById("fromNumToKorea").textContent =
      readNum(from) + currencyRatio[fromCurrency].unit;
    document.getElementById("toNumToKorea").textContent =
      readNum(to) + currencyRatio[toCurrency].unit;
  }
  function readNum(num) {
    let resultString = "";
    let resultArray = [];
    for (let i = 0; i < unitWords.length; i++) {
      let unitResult =
        (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        // Math.pow를 이용하여 거듭제곱을 계산할 수 있다. pow는 power를 의미하고 power의 뜻은 거듭제곱이다.
        // pow() 인자로 a와b를 전달하며, a의 b제곱이 리턴됩니다. 즉, a를 b번 곱한 값이 리턴 된다.
      unitResult = Math.floor(unitResult);
      if (unitResult > 0) {
        resultArray[i] = unitResult;
      }
    }
    for (let i = 0; i < resultArray.length; i++) {
      if (!resultArray[i]) continue;
      // continue문은 현재 또는 레이블이 지정된 루프의 현재 반복에서 명령문의 실행을 종료하고 반복문의 처음으로 돌아가
      // 루프문의 다음 코드를 실행
      resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }
    return resultString;
  }
