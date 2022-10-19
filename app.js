alert(
  'Hello! Welcome to "Color Palette". If you want to change the color, press the space bar. If you want to copy a color, click on its tag.'
);

const columns = document.querySelectorAll('.column');

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === 'space') {
    addRandomColor();
  }
});

document.addEventListener('click', (event) => {
  const dataType = event.target.dataset.type;

  if (dataType === 'lock') {
    const tagName =
      event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0];

    tagName.classList.toggle('fa-lock-open');
    tagName.classList.toggle('fa-lock');
  } else if (dataType === 'copy') {
    clickToCopy(event.target.textContent);
  }
});

function createRandomColor() {
  const colorCode = '0123456789abcdef';
  let color = '';

  for (let i = 0; i < 6; i++) {
    color += colorCode[Math.floor(Math.random() * colorCode.length)];
  }
  return '#' + color;
}

function clickToCopy(text) {
  return navigator.clipboard.writeText(text);
}

function addRandomColor(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  columns.forEach((column, index) => {
    const isLocked = column.querySelector('i').classList.contains('fa-lock');
    const h2 = column.querySelector('h2');
    const button = column.querySelector('button');
    const color = isInitial ? colors[index] : createRandomColor();

    if (isLocked) {
      colors.push(h2.textContent);
      return;
    }

    if (!isInitial) {
      colors.push(color);
    }

    h2.textContent = color;
    column.style.background = color;

    changeTextColor(h2, color);
    changeTextColor(button, color);
  });

  colorsHash(colors);
}

function changeTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function colorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join('-');
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map((color) => '#' + color);
  }
  return [];
}

addRandomColor(true);
