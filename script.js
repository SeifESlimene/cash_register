let validatedCidObj = {};
let currencyArray = [...document.getElementsByTagName("tbody")[0].children];
currencyArray.map((currency, index) => {
  currency.childNodes[3].childNodes[0].addEventListener("blur", () => {
    if (!!parseFloat(currency.childNodes[3].childNodes[0].value) === !!NaN) {
      currency.childNodes[3].childNodes[0].value = "";
      delete validatedCidObj[index];
    } else if (
      ((parseFloat(currency.childNodes[3].childNodes[0].value) * 100).toFixed(
        3
      ) %
        (parseFloat(currency.childNodes[5].innerText) * 100).toFixed(3)) /
        100 !==
      0
    ) {
      let regulatedNum = (
        parseFloat(currency.childNodes[3].childNodes[0].value) -
        parseFloat(
          parseFloat(currency.childNodes[3].childNodes[0].value) %
            parseFloat(currency.childNodes[5].innerText)
        ).toFixed(3)
      ).toFixed(3);
      // var semiRegulatedNum = Math.floor(
      //   parseFloat(
      //     parseFloat(currency.childNodes[3].childNodes[0].value) /
      //       parseFloat(currency.childNodes[5].innerText)
      //   ).toFixed(3)
      // ).toFixed(3);
      // console.log(semiRegulatedNum);
      // if (semiRegulatedNum === 0) {
      //   currency.childNodes[3].childNodes[0].value = "";
      //   validatedCidObj[index] = parseFloat(
      //     currency.childNodes[3].childNodes[0].value
      //   );
      // } else {
      currency.childNodes[3].childNodes[0].value = regulatedNum;
      validatedCidObj[index] = parseFloat(
        currency.childNodes[3].childNodes[0].value
      );
      // currency.childNodes[3].childNodes[0].disabled = true;
      // currency.childNodes[3].childNodes[0].style.backgroundColor = "#84C68C";
      // }
    } else {
      currency.childNodes[3].childNodes[0].value = parseFloat(
        currency.childNodes[3].childNodes[0].value
      ).toFixed(3);
      validatedCidObj[index] = parseFloat(
        currency.childNodes[3].childNodes[0].value
      );
      // currency.childNodes[3].childNodes[0].disabled = true;
      // currency.childNodes[3].childNodes[0].style.backgroundColor = "#84C68C";
    }
  });
});

function checkCashRegister() {
  let purchase = document.getElementById("purchase").value;
  let payment = document.getElementById("payment").value;
  if (purchase !== "$" && payment !== "$") {
    if (purchase.startsWith("$")) {
      purchase = purchase.slice(1);
    } else {
      purchase = parseFloat(document.getElementById("purchase").value);
    }
    if (payment.startsWith("$")) {
      payment = payment.slice(1);
    } else {
      payment = parseFloat(document.getElementById("payment").value);
    }
    let change = payment - purchase + "$";
    document.getElementsByClassName(
      "change-output"
    )[0].childNodes[3].childNodes[1].innerText = change;
    let total = 0;
    for (const [key, value] of Object.entries(validatedCidObj)) {
      total += value;
    }
    if (total < parseFloat(change.slice(0, change.length))) {
      document.getElementsByClassName(
        "change-output"
      )[1].childNodes[3].childNodes[1].innerText = "IF";
    }
    if (total === parseFloat(change.slice(0, change.length))) {
      document.getElementsByClassName(
        "change-output"
      )[1].childNodes[3].childNodes[1].innerText = "CL";
    }
  }
}
