function htmlEncode(value) {
  return $("<div/>").text(value).html();
}

$(function () {
  $("#generate").click(function () {
    var inputValue = $("#content").val();
    let finalURL =
      "https://chart.googleapis.com/chart?cht=qr&chl=" +
      htmlEncode(`https://api-payment-zerot.onrender.com/order/${inputValue}`) +
      "&chs=160x160&chld=L|0";

    $(".qr-code").attr("src", finalURL);
  });
});
setInterval(function () {
  checkPayment();
}, 1000);
var successNone = document
  .querySelector(".success")
  .classList.add("display-none");

async function checkPayment() {
  var id = $("#content").val();
  await axios.get("https://api-zerot.onrender.com/order").then((response) => {
    var payment = response.data.find((pm) => Number(pm.id) === Number(id));
    if (payment && payment.status === "success") {
      var qrCodeElement = document.querySelector(".qr-code");
      var success = document.querySelector(".success");
      if (qrCodeElement && success) {
        success.classList.add("display-block");
        // Đặt lớp của phần tử thành "display: none"
        qrCodeElement.classList.add("display-none");
      }
    }
  });
}
