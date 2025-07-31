let heatmap;
let dataPoints = [];

// Guardamos los puntos mientras está corriendo webgazer
window.onload = () => {
  webgazer.setGazeListener((data, elapsedTime) => {
    if (data == null) return;
    const x = Math.round(data.x);
    const y = Math.round(data.y);
    dataPoints.push({ x, y, value: 1 });
  }).begin();

  document.getElementById("btnStop").addEventListener("click", () => {
    webgazer.end();
    mostrarModalConHeatmap();
    document.getElementById("btnStop").style.display = "none";
  });
};

function mostrarModalConHeatmap() {
  const modal = document.getElementById("heatmapModal");
  modal.style.display = "flex";

  // Crear el heatmap después de mostrar el modal y el contenedor visible
  if (heatmap) {
    heatmap.setData({ max: 5, data: dataPoints });
  } else {
    heatmap = h337.create({
      container: document.getElementById("heatmapContainer"),
      radius: 40,
    });
    heatmap.setData({ max: 5, data: dataPoints });
  }
}

function cerrarModal() {
  const modal = document.getElementById("heatmapModal");
  modal.style.display = "none";
}
