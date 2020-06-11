var x = "";
var y = "";
var i;
var hash = 1;

window.onload = async () => {
  data = await getProductos();
};

function actFAQs() {
  for (i in data) {
    console.log('hash-->' + hash);
    y += `<div class="card faq"><div class="card-header headFaq"><div class="mb-0"><button class="btn btn-link question collapsed" data-toggle="collapse" data-target="#id${hash}" aria-expanded="false" aria-controls="">${data[i].question}</button></div></div><div id="id${hash}" class="collapse" aria-labelledby="" data-parent="#accordion"><div class="card-body answer">${data[i].answer}</div></div></div>`;
    hash++;
  }
  document.getElementById("accordion").innerHTML = y;
  console.log(data)
}
async function getFaqs() {
  var jqxhr;
  await $.post('http://127.0.0.1:5000/get_faqs', function (data) {
    console.log(data);
    jqxhr = data;
  })
    .done(function (result) {
      console.log('Datos regreso')
      console.log(result);
    });
  return jqxhr;
}

window.onload = async () => {
  data = await getFaqs();
  actFAQs();
};
