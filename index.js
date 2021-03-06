let model;

async function getModel() {
    model = await tf.loadLayersModel('https://jnigrelli.github.io/digit-classifier/model/model.json');
}


async function predict() {
    document.getElementById("prediction").innerHTML = "Predicting...";
    downscale();
    getModel().then(() => {
        let input = eval_from_canvas();
        let predictionTensor = model.predict(input);
        let value = predictionTensor.argMax(1).dataSync();
        document.getElementById("prediction").innerHTML = value;
    });
}

getModel();