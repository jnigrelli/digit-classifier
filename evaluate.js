function eval_from_canvas() {
    let canvas = document.getElementById("eval-canvas");
    let ctx = canvas.getContext("2d");

    let w = canvas.width;
    let h = canvas.height;

    let imgData = ctx.getImageData(0,0,w,h);

    //get pixel values into a smaller array
    let blkValues = [];
    for (let i = 3; i < imgData.data.length; i+=4) {
        blkValues.push(imgData.data[i]);
    }
    
    let intermediate = tf.tensor(blkValues);
    let inputTensor = tf.reshape(intermediate, [1,28,28,1]);

    return inputTensor;
}


