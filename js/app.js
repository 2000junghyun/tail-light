import { TailLight } from './TailLight.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.input = document.createElement('input');
    this.speedBtn = document.createElement('button');

    document.body.appendChild(this.canvas);
    document.body.appendChild(this.input);
    document.body.appendChild(this.speedBtn);

    this.input.type = 'number';
    this.input.style.position = 'absolute';
    this.input.style.zIndex = 1;

    this.speedBtn.innerText = 'SET SPEED';
    this.speedBtn.style.position = 'absolute';
    this.speedBtn.style.zIndex = 1;

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    this.speedBtn.addEventListener('click', this.selectSpeed.bind(this));

    window.requestAnimationFrame(this.animate.bind(this));
  }

  selectSpeed() {
    if (this.input.value > 100 || this.input.value < 20) {
      alert('INPUT ERROR! (Insert a number between 20 and 100)');
      return;
    }
    this.speed = this.input.value / 100;
    this.light = new TailLight(this.stageWidth, this.stageHeight, this.speed);
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    this.input.style.left = `${this.stageWidth / 20}px`;
    this.input.style.top = `${this.stageHeight / 20}px`;

    this.speedBtn.style.left = `${this.stageWidth / 20 + 150 + 15}px`;
    this.speedBtn.style.top = `${this.stageHeight / 20}px`;
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    if (this.speed) {
      this.light.draw(this.ctx);
    }
  }
}

window.onload = () => {
  new App();
};
