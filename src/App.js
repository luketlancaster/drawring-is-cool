import HelpScout, { NOTIFICATION_TYPES } from "@helpscout/javascript-sdk";
import { Button, DefaultStyle, Heading } from "@helpscout/ui-kit";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
const canvasName = "canvas-123";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#1292EE";
let isDrawing = false;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

const loadFromLocalStorage = () => {
  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0); // Or at whatever offset you like
  };
  img.src = localStorage.getItem(canvasName);
  console.log(img.src);
};

loadFromLocalStorage();

document.querySelector("#color-form").addEventListener("change", (event) => {
  const color = event.target.value;
  document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    if (checkbox.value !== color) {
      checkbox.checked = false;
    }
  });
  ctx.strokeStyle = color;
});

function startDrawing(event) {
  isDrawing = true;

  draw(event);
}

function draw(event) {
  if (!isDrawing) return;

  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;

  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

document.querySelector("#save").addEventListener("click", () => {
  localStorage.setItem(canvasName, canvas.toDataURL());
});

document.querySelector("#load").addEventListener("click", loadFromLocalStorage);

document.querySelector("#clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})
  }, []);


  return (
    <div style={{
      --canvasWidth: '500px',
      --canvasHeight: '500px',
    }}>
      <canvas id="canvas"
        style={{
          border: '1px solid #000',
          width: 'var(--canvasWidth)',
          height: 'var(--canvasHeight)',
        }}
      ></canvas>
      <form id="color-form"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: 'var(--canvasWidth)',
          margin: '20px 0',
        }}
      >
        <div>
          <input type="checkbox" name="color-red" value="#D5DCE1" />
          <label for="color-red">Red</label>
        </div>
        <div>
          <input type="checkbox" name="color-orange" value="#FFB3C3" />
          <label for="color-orange">Orange</label>
        </div>
        <div>
          <input type="checkbox" name="color-yellow" value="#56C288" />
          <label for="color-yellow">Yellow</label>
        </div>
        <div>
          <input type="checkbox" name="color-green" value="#405261" />
          <label for="color-green">Green</label>
        </div>
        <div>
          <input type="checkbox" name="color-blue" value="#1292EE" checked />
          <label for="color-blue">Blue</label>
        </div>
      </form>

      <div class="buttons" style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: 'var(--canvasWidth)',
      }}>
        <button id="save">Save</button>
        <button id="load">Load</button>
        <button id="clear">Clear</button>
      </div>
    <div/>
  );
}

export default App;
