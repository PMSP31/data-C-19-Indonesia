document.addEventListener("DOMContentLoaded", function () {
  getDataInd();
  getDataProv();
});

const btn = document.querySelector('button.mobile-menu-button');
const menu = document.querySelector('.mobile-menu');

btn.addEventListener('click',function(){
    menu.classList.toggle('hidden');
})

function getDataInd() {
  return fetch("https://covid19.mathdro.id/api/countries/indonesia")
    .then((res) => res.json())
    .then(async (res) => {
      const data = document.querySelector(".data");
      data.innerHTML = await dataIndo(res);
    })
    .catch((e) => {
      const data = document.querySelector(".data");
      data.innerHTML = `<h1>${e.responseText}</h1>`;
    });
}

function getDataProv() {
  return fetch("https://indonesia-covid-19.mathdro.id/api/provinsi")
    .then((res) => res.json())
    .then(async (res) => {
      const tbody = document.querySelector("tbody");
      tbody.innerHTML = await dataProv(res);
    })
    .catch((e) => {
      const tbody = document.querySelector("tbody");
      tbody.innerHTML = `<h1>${e.responseText}</h1>`;
    });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function dataIndo(res) {
  return `<ul class="grid grid-rows-5 px-5 lg:grid-cols-4 grid-rows-none gap-5 text-white">
            <li class="confirm bg-gray-200 p-5 rounded-md text-left shadow-2xl bg-gray-700">
            <p class="text-md"> Terkonfirmasi Positif : <br /> <span><strong>${numberWithCommas(
              res.confirmed.value
            )}</strong> <br /><i class="fas fa-frown text-6xl float-right"></i> Orang</span></p></li>
            <li class="healing bg-gray-200 p-5 rounded-md text-left shadow-2xl bg-blue-500"
            ><p class="text-md"> Dalam Perawatan : <br /> <span><strong>${numberWithCommas(
              res.confirmed.value - (res.recovered.value + res.deaths.value)
            )}</strong> <br /><i class="fas fa-frown-open text-6xl float-right"></i> Orang</span></p></li>
            <li
              class="recover bg-gray-200 p-5 rounded-md text-left shadow-2xl bg-green-500"
            ><p class="text-md"> Sembuh : <br /> <span><strong>${numberWithCommas(
              res.recovered.value
            )}</strong> <br /><i class="fas fa-smile-beam text-6xl float-right"></i> Orang</span></p></li>
            <li
              class="death bg-gray-200 p-5 rounded-md text-left shadow-2xl bg-red-500"
            ><p class="text-md"> Meninggal Dunia : <br /> <span><strong>${numberWithCommas(
              res.deaths.value
            )}</strong> <br /><i class="fas fa-sad-cry text-6xl float-right"></i> Orang</span></p></li>
          </ul>
          <p class="lastUpdate my-5 text-gray-500 text-sm">Terakhir di Update : ${
            res.lastUpdate
          }</p>`;
}

function dataProv(res) {
  return res.data
    .map((item, index) => {
      if (item.kodeProvi !== 0) {
        return `<tr>
                  <td class="border hidden md:block py-2">${index + 1}</td>
                  <td class="border">${item.provinsi}</td>
                  <td class="border">${numberWithCommas(item.kasusPosi)}</td>
                  <td class="border">${numberWithCommas(item.kasusSemb)}</td>
                  <td class="border">${numberWithCommas(item.kasusMeni)}</td>
                </tr>`;
      }
    })
    .join("");
}
