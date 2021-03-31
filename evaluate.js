function eval_from_canvas() {
    //console.log("test")

    let canvas = document.getElementById("drawing-canvas");
    let ctx = canvas.getContext("2d");

    let w = canvas.width;
    let h = canvas.height;

    let imgData = ctx.getImageData(0,0,w,h);
    //console.log(imgData);

    //console.log(imgData.data);

    
    //get pixel values into a smaller array
    let blkValues = [];
    for (let i = 3; i < imgData.data.length; i+=4) {
        blkValues.push(imgData.data[i]);
    }

    //console.log(blkValues.length);
    //console.log(blkValues);
    
    let intermediate = tf.tensor(blkValues);
    let inputTensor = tf.reshape(intermediate, [1,28,28,1]);

    //console.log(inputTensor);
    //tf.print(inputTensor);

    return inputTensor;
}


