export class TailLight {
  constructor(stageWidth, stageHeight, speed) {
    this.cx = stageWidth / 2;
    this.cy = stageHeight / 2;
    this.radius = 60;
    this.gap = 60;

    this.numRows = 5;
    this.numCols = 15;

    this.initSpeed = speed;
    this.speed = speed;
    this.isBreak = false;
    this.breakBtn = document.createElement('button');
    this.resize(stageWidth, stageHeight);

    this.breakBtn.addEventListener('mousedown', () => {
      this.isBreak = true;
    });
    this.breakBtn.addEventListener('mouseup', () => {
      this.isBreak = false;
    });
  }

  resize(stageWidth, stageHeight) {
    document.body.appendChild(this.breakBtn);
    this.breakBtn.innerText = 'BREAK';
    this.breakBtn.style.position = 'absolute';
    this.breakBtn.style.zIndex = 1;

    this.breakBtn.style.left = `${stageWidth / 20 + 270 + 15}px`;
    this.breakBtn.style.top = `${stageHeight / 20}px`;
  }

  fillLight(ctx, fillCoords, row, color) {
    const startXR = this.cx + this.gap * 35;
    const startXL = this.cx - this.gap * 35;

    if (this.isBreak) {
      fillCoords.push(
        { row: 1, colStart: 10, colEnd: 12, color: '#fe9ca9' },
        { row: 3, colStart: 3, colEnd: 8, color: '#fe9ca9' }
      );
    }

    for (let col = -this.numCols + 1; col < this.numCols; col++) {
      let x, shouldFill, dictColor;

      if (col < 0) {
        // 왼쪽 채우기
        x = startXL + col * (this.radius * 2 + this.gap);
        shouldFill = fillCoords.some((coord) => {
          if (
            coord.row === row &&
            col >= -coord.colEnd &&
            col <= -coord.colStart
          ) {
            dictColor = coord.color;
            return true;
          }
          return false;
        });
      } else {
        // 오른쪽 채우기
        x = startXR + col * (this.radius * 2 + this.gap);
        shouldFill = fillCoords.some((coord) => {
          if (
            coord.row === row &&
            col >= coord.colStart &&
            col <= coord.colEnd
          ) {
            dictColor = coord.color;
            return true;
          }
          return false;
        });
      }

      const y = this.cy + row * (this.radius * 2 + this.gap);
      ctx.beginPath();
      ctx.fillStyle = shouldFill ? dictColor : '#1e1e1e';
      ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    }
  }

  break(ctx) {
    let breakSpeed = 0.02;
    let curSpeed = this.speed;

    if (curSpeed - breakSpeed < 0) {
      this.speed = 0;
    } else {
      this.speed -= breakSpeed;
    }

    ctx.fillStyle = '#fe9ca9';
    for (let i = -4; i <= 4; i++) {
      ctx.beginPath();
      ctx.arc(
        this.cx + i * (this.radius * 2 + this.gap),
        this.cy + -4 * (this.radius * 2 + this.gap),
        this.radius,
        0,
        Math.PI * 2,
        false
      );
      ctx.fill();
    }
  }

  draw(ctx) {
    if (this.isBreak) {
      this.break(ctx);
    }

    // Acceletate
    if (!this.isBreak && this.speed < this.initSpeed) {
      let accelSpeed = 0.01;
      let curSpeed = this.speed;

      if (curSpeed + accelSpeed > this.initSpeed) {
        this.speed = this.initSpeed;
      } else {
        this.speed += accelSpeed;
      }
    }

    this.radius -= this.speed;
    this.gap -= this.speed;

    if (this.radius <= 0) {
      this.radius = 60;
      this.gap = 60;
      return;
    }

    // 색을 채울 좌표 배열
    const fillCoords = [
      { row: 0, colStart: 2, colEnd: 14, color: '#d73304' },
      { row: 1, colStart: 1, colEnd: 9, color: '#d73304' },
      { row: 3, colStart: 9, colEnd: 12, color: '#d73304' },
      { row: 4, colStart: 0, colEnd: 11, color: '#d73304' },
    ];

    for (let row = 0; row < this.numRows; row++) {
      this.fillLight(ctx, fillCoords, row, '#d73304');
    }
  }
}
