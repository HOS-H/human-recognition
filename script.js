const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}
//fonction de recuperatiom de l'expression dominante
function comparaison(table){
var valeur =table[0]
var indice = 0
var nombre_de_foix = 0
var test1 = 0
var test2 = 0

for (var index = 0; index < table.length; index++) {
  if (valeur < table[index]) {

    valeur = table[index]
    indice = index
    
  }
}
  nombre_de_foix ++
  test1[nombre_de_foix -1 ] = indice
  if (nombre_de_foix > 5) {
  for (var index1 = 0; index1 < test1.length; index1++) {
    if (condition) {
      indice != test1[index1]
      test2 = 1
    }
    
  }
    
  }
  
 
  if (indice==0 && test2 == 0) {
    console.log("L'expression est neutre et a pour valeur", valeur)
  }
  else if (indice==1) {
    console.log("L'expression est Heureux et a pour valeur", valeur)  
  } else if (indice==2) {
    console.log("L'expression est colere et a pour valeur", valeur)  
  } else if (indice==3) {
    console.log("L'expression est degout et a pour valeur", valeur)
  } else if (indice==4) {
    console.log("L'expression est surprise et a pour valeur", valeur)
  } else if (indice==5) {
    console.log("L'expression est peur et a pour valeur", valeur)
  } else if (indice==6) {
    console.log("L'expression est triste et a pour valeur", valeur) 
  }
  }


video.addEventListener('play', () => {
  
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    //tansformer l'object detecter (expressions) en element JSON
    var toJSON = JSON.stringify(detections[0].expressions)
    var tab = Array (7)

    tab[0] = detections[0].expressions.neutral
    tab[1]  = detections[0].expressions.happy
    tab[2]  = detections[0].expressions.angry
    tab[3]  = detections[0].expressions.disgusted
    tab[4]  = detections[0].expressions.surprised
    tab[5]  = detections[0].expressions.fearful
    tab[06] = detections[0].expressions.sad

    var neutre = detections[0].expressions.neutral
    var joie  = detections[0].expressions.happy
    var colere  = detections[0].expressions.angry
    var degout  = detections[0].expressions.disgusted
    var surprise  = detections[0].expressions.surprised
    var peur  = detections[0].expressions.fearful
    var triste = detections[0].expressions.sad

    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    comparaison(tab)
    localStorage.setItem("Detection",toJSON)
  }, 500)

})