let model;

async function getModel() {
    model = await tf.loadLayersModel('https://jnigrelli.github.io/digit-classifier/model/model.json');
    model.summary();
}


async function predict() {
    

    getModel().then(() => {
        let input = eval_from_canvas()
        let p = model.predict(input);
        p.print();
        p.argMax(1).print();

        //TODO this outputs "Tensor[n]" atm so change this
        document.getElementById("prediction").innerHTML = p.argMax(1).toString();
    });

}

getModel();