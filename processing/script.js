

/*function setup() {
  createCanvas(450, 450);
}

function draw() {
  background(220);
}// Sketch p5.js: réplica fiel do mostrador enviado

*/
function setup() {
  createCanvas(450, 450);
  angleMode(DEGREES);
  textFont('Koulen');
  rectMode(CENTER);
  noSmooth();
}

function draw() {
  background(0);

  // ---------------- Fundo arredondado do relógio ----------------
  fill(10);
  noStroke();
  rect(width/2, height/2, 380, 380, 34);

  // ---------------- Parâmetros centrais (ajuste rápido) ----------------
  const cx = 200;         // centro dos arcos (à esquerda)
  const cy = height/2;
  const outerDiam = 330;  // diâmetro do arco exterior
  const gap = 55;         // espaço entre arcos
  const thicknessOuter = 40;
  const thicknessMiddle = 40;
  const thicknessInner = 40;

  // ângulo do arco: inicio e sweep (define abertura direita livre)
  const startAng = +85 +2;            // ponto inicial do arco (no sentido horário)
  const sweepDeg = 290;             // comprimento do arco em graus (280° -> deixa abertura à direita)

  // progresso (0..1) — coloque os valores que quiser; ajustei para coincidir visualmente
  const pctSteps = 0.64;   // amarelo
  const pctKcal  = 0.64;   // ciano
  const pctBpm   = 0.64;   // vermelho

  // ---------------- Cores exatas aproximadas da imagem ----------------
  const colSteps = color(204,170,18);   // amarelo mostarda
  const colKcal  = color(0,220,200);    // ciano/turquesa
  const colBpm   = color(220,18,60);    // vermelho vivo
  const colBattery = color(0,255,80);   // verde bateria

  strokeCap(ROUND);

  // ----- Arco exterior (steps) -----
  drawRingWithBackground(cx, cy, outerDiam, thicknessOuter, startAng, sweepDeg, colSteps, pctSteps);

  // ----- Arco médio (kcal) -----
  drawRingWithBackground(cx, cy, outerDiam - (thicknessOuter + gap), thicknessMiddle, startAng, sweepDeg, colKcal, pctKcal);

  // ----- Arco interior (bpm) -----
  drawRingWithBackground(cx, cy, outerDiam - 2*(thicknessOuter + gap), thicknessInner, startAng, sweepDeg, colBpm, pctBpm);

  noStroke();

  // ---------------- Etiquetas pequenas ao lado dos arcos ----------------
  textAlign(LEFT, CENTER);
  textSize(16);
  fill(colSteps);
  text('NEW\nTASK', cx - 40 + outerDiam/4.2  , cx -77 - outerDiam*0.18);
  fill(colKcal);
  text('TIME\nLEFT', cx - 40 + outerDiam/ + 4.2, cy -113);
  fill(colBpm);
  text('086\nBPM', cx - 40 + outerDiam/ + 4.2, cy + outerDiam*0.-67);

  // ---------------- Ícones verticais (entre arcos e números) ----------------
  // coração (vermelho, ligeiramente à direita do centro dos arcos)
  drawHeart(cx  + outerDiam/2 - 116, cy +74, 30);
  // chama (ciano)
  drawFlame(cx + outerDiam/2 - 116, cy + 110, 30);
  // pegadas (amarelo)
  drawStepsIcon(cx + outerDiam/2 - 116, cy + 165, 20);

  // ---------------- Cartão vermelho atrás dos números (bloco arredondado) ----------------
  const cardX = 350;
  const cardY = cy - 20;
  const cardW = 0;
  const cardH = 0;
  const cardR = 0;
  fill(210,13,62); // vermelho do bloco
  noStroke();
  rect(cardX, cardY, cardW, cardH, cardR);

  // ---------------- Data em balão acima ----------------
  push();
  translate(cardX + 5, cardY - 150);
  fill(0,0,0);
  noStroke();
  ellipse(0, 0, 0, 0);             // bolha oval
  fill(255);
  textSize(30);
  textAlign(CENTER);
  text('SUN 25', 0, 0);
  pop();


  // agora desenha o contorno branco grosso sobre os números (para obter o anel branco nítido)
  // desenhar stroke sobre o texto: primeiro stroke grosso branco, depois preencha com branco novamente
  /*stroke(255);
  strokeWeight(8);
  fill(255);
  textSize(120);
  text('08', cardX + 75, cardY - 40 -15)
  text('30', cardX + 75, cardY + 60 - 15);
  noStroke();*/
  
  //Clock
  const segundos = second();
  const minutos  = minute();
  const hora     = hour();
  
  const segundos_mapeados = map (segundos, 0, 59, 0, 255);
  const minutos_mapeados  = map (minutos,  0, 59, 0, 255);
  const hora_mapeada      = map (hora,     0, 23, 0, 255);
  
  colorMode (RGB, 255, 255, 255, 100);
  
  stroke(255);
  strokeWeight();
  fill(255);
  textSize(120);
  textAlign(CENTER);
  text (hora,    cardX + 10, cardY - 40 - 15);
  text (minutos, cardX + 10, cardY + 60 - 15);
  
  //Calendar
  
  const dia = day();
  const mes = month();
  const ano = year();
  const num_dias_mes = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  const dia_mapeado = map (dia, 1, num_dias_mes[mes-1], 0, 360);
  const mes_mapeado = map (mes, 1, 12, 0, 100);
  const ano_mapeado = 100;

  // ---------------- Círculo de bateria (anéis verdes) ----------------
  const bx = cardX + 9
  const by = cardY + 152;
  const br = 100;
  // anel de fundo (leve)
  stroke(0, 0, 0);
  strokeWeight(0);
  noFill();
  ellipse(bx, by, br, br);
  // arco de carga (verde brilhante completo)
  stroke(colBattery);
  strokeWeight(8);
  let batPct = 2.0; // 100%
  let batSweep = batPct * 360;
  arc(bx, by, br - 10, br - 10, -90, -90 + batSweep);
  noStroke();
  // texto % no centro
  fill(0,255,80);
  textSize(20);
  textAlign(CENTER, CENTER);
  text('100%', bx, by);

  strokeCap(SQUARE);
}

// ---------------- Função que desenha um anel com fundo mais escuro e progresso ----------------
function drawRingWithBackground(x, y, diameter, thickness, startAngle, sweepDeg, col, pct) {
  // fundo escurecido
  let darkCol = color(red(col)*0.0, green(col)*0.0, blue(col)*0.0);
  stroke(darkCol);
  strokeWeight(thickness);
  noFill();
  arc(x, y, diameter, diameter, startAngle, startAngle + sweepDeg);

  // arco de progresso
  stroke(col);
  strokeWeight(thickness);
  let sweep = sweepDeg * constrain(pct, 0, 2);
  arc(x, y, diameter, diameter, startAngle, startAngle + sweep);

  noStroke();
}

// ---------------- Ícones: coração, chama e pegadas ----------------
function drawHeart(x, y, s) {
  push();
  translate(x, y);
  noStroke();
  fill(220,18,60);
  beginShape();
  vertex(0, s*0.45);
  bezierVertex(-s* 1, -s*0.25, -s*0.6, -s*1.1, 0, -s*0.6);
  bezierVertex(s* 0.65, -s* 1, s*0.9, -s*0.25, 0, s*0.40);
  endShape(CLOSE);
  pop();
}

function drawFlame(x, y, s) {
  function setup() {
  createCanvas(30, 30);
  background(0);
  noLoop();
}

function draw() {
  translate(width / 5, height / 2 + 40);
  scale(1.4);            // ajuste de tamanho
  drawFlame();
}

function drawTimeleft() {
  noStroke();
  fill(0, 255, 220);     // cor ciano da imagem

  beginShape();
  vertex(0, -120);

  bezierVertex(
    8,0 -50,
    40, 20,
    0, 80
  );

  bezierVertex(
    -40, 120,
    -100, 40,
    -60, -10
  );

  bezierVertex(
    -120, -80,
    -20, -140,
    0, -120
  );

  endShape(CLOSE);

  // chama interna (recorte visual)
  fill(0);
  beginShape();
  vertex(0, -60);

  bezierVertex(
    30, -20,
    10, 30,
    0, 60
  );

  bezierVertex(
    -10, 30,
    -30, -20,
    0, -60
  );

  endShape(CLOSE);
}

  bezierVertex(-s*0.1, s*0.25, -s*0.2, -s*0.7, 0, -s*0.25);
  bezierVertex(s*0.2, -s*0.7, s*0.6, s*0.25, 0, s*0.9);
  endShape(CLOSE);
  pop();
}

function drawStepsIcon(x, y, s) {
  push();
  translate(x, y);
  noStroke();
  fill(204,170,18);
  ellipse(-s*0.5, 0, s*0.6, s);
  ellipse( s*0.6, 0, s*0.6, s);
  pop();

  push()
  bezierVertex(-s*0.1, s*0.25, -s*0.2, -s*0.7, 0, -s*0.25);
  bezierVertex(s*0.2, -s*0.7, s*0.6, s*0.25, 0, s*0.9);
  endShape(CLOSE);
  pop();
}