const dataBlock = document.createElement("div");
dataBlock.classList = "";

async function getDataForImage(filename) {
  let data = await fetch(`/getData/${filename}`);
  let res = await data.json();
  return res;
}

Dropzone.options.myAwesomeDropzone = {
  paramName: "file", // The name that will be used to transfer the file
  maxFilesize: 5, // MB
  init: function () {
    this.on("success", async function (file, filename) {
      let data = await getDataForImage(filename);
      data = data.data;
      console.log(data);
      dataBlock.innerHTML = "";
      for (let i = 0; i < 20; i++) {
        let el = `<div class="my-2">
        
        <span class="title text-2xl font-bold">${data.tags[i].tag.en}</span><br>
        <span class="value">Confidence: ${data.tags[i].confidence.toFixed(
          2
        )} %</span>
        <div class="relative pt-1">
  <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
    <div style="width:${
      data.tags[i].confidence
    }%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
  </div>
</div>
        </div>`;
        dataBlock.innerHTML += el;
      }
      document.querySelector("section").appendChild(dataBlock);
    });
  },
};
