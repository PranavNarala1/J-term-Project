/*Authors: Dr. Morrison and Pranav */
/* New features: Undo and Redo, Layers, Shapes, Background, Transparency, TODO- Eraser, TODO - Shapes */
addEventListener("load", main);
function main()
{
    let surface = document.getElementById("surface");
    let pen = surface.getContext("2d");
    let sizeSlider = document.getElementById("sizeSlider");
    let sizeShow = document.getElementById("sizeShow");
    let colorChooser = document.getElementById("colorChooser");
    let backgroundColorChooser = document.getElementById("backgroundColorChooser");
    let redoButton = document.getElementById("redoButton");
    let undoButton = document.getElementById("undoButton");
    let resetCanvasButton = document.getElementById("resetCanvasButton");
    let saveLayerButton = document.getElementById("saveLayerButton");
    let layerInput = document.getElementById("layerInput");
    let loadLayerButton = document.getElementById("loadLayerButton");
    let colorTransparency = document.getElementById("colorTransparency");
    let colorTransparencyValue = 0.5;
    let layerToLoad = -1;
    let drawing = false;
    let curve = [];
    pen.fillStyle = "white";
    pen.fillRect(0, 0, surface.width, surface.height);
    let currentColor = "#000000";
    let currentBackgroundColor = "white";
    let currentSize = 1;
    let layers = [];
    let curves = [];
    let removedCurves = [];
    let layersDisplay = document.getElementById("layersDisplay");
    let layerNameInput = document.getElementById("layerNameInput");
    let transparencyShow = document.getElementById("transparencyShow");
    let layerNames = [];
    let currentLayerName = "";
    layersDisplay.innerHTML += " Layers: ";

    colorTransparency.addEventListener("input", () => {
        colorTransparencyValue = colorTransparency.value / 100;
        transparencyShow.innerHTML = colorTransparencyValue;
    });
    layerNameInput.addEventListener("input", () => {
        currentLayerName = layerNameInput.value;
    });
    layerInput.addEventListener("input", () => {
        layerToLoad = layerInput.value;
    });
    loadLayerButton.addEventListener("click", () => {
        let layerToLoadIndex = layerNames.indexOf(layerToLoad);
        if(layerToLoadIndex >= 0 && layerToLoadIndex <= layers.length - 1){
        for(let i of layers[layerToLoadIndex]){
            curves.push(i);
            i.draw(pen);
            }
        }
        layerToLoad = "";
        layerInput.value = "";
    });
    saveLayerButton.addEventListener("click", () => {
        layers.push(curves);
        if(currentLayerName == ""){
            layerNames.push(`Layer ${layers.length - 1}`);
        } else{
            layerNames.push(currentLayerName);
        }
        
        layersDisplay.innerHTML += `${layerNames[layers.length - 1]} `;
        currentLayerName = "";
        layerNameInput.value = "";
    });
    resetCanvasButton.addEventListener("click", () => {
        //Create a method for this duplicate code
        pen.fillStyle = "white";
        pen.fillRect(0, 0, surface.width, surface.height);
        currentBackgroundColor = "white";
        curves = [];
        removedCurves = [];
    });
    redoButton.addEventListener("click", () => {
        if(removedCurves.length >= 1){
        curves.push(removedCurves.pop());
        pen.fillStyle = currentBackgroundColor;
        pen.fillRect(0, 0, surface.width, surface.height);
        for(let i of curves){
            i.draw(pen);
            }
        }
    });
    undoButton.addEventListener("click", () => {
        if(curves.length >= 1){
        removedCurves.push(curves.pop());
        pen.fillStyle = currentBackgroundColor;
        pen.fillRect(0, 0, surface.width, surface.height);
        for(let i of curves){
            i.draw(pen);
            }
        }
    });
    colorChooser.addEventListener("input", () =>{
        currentColor = colorChooser.value;
    });
    backgroundColorChooser.addEventListener("input", () =>{
        currentBackgroundColor = backgroundColorChooser.value;
        pen.fillStyle = currentBackgroundColor;
        pen.fillRect(0, 0, surface.width, surface.height);
        for(let i of curves){
            i.draw(pen);
        }
    });
    surface.addEventListener("mousedown", (e) =>
    {
        curve = new Curve(currentColor, currentSize, colorTransparencyValue);
        curve.push(new Point(e.offsetX, e.offsetY));
        drawing = true;
    });
    surface.addEventListener("mousemove", (e) =>
    {
        if(drawing)
        {
            curve.push(new Point(e.offsetX, e.offsetY));
            pen.fillStyle = currentBackgroundColor;
            pen.fillRect(0, 0, surface.width, surface.height);
            for(let i of curves){
                i.draw(pen);
            }
            curve.draw(pen);
        }
    });
    surface.addEventListener("mouseup", (e) =>
    {
        curve.push(new Point(e.offsetX, e.offsetY));
        drawing = false;
        curves.push(curve);
        pen.fillStyle = currentBackgroundColor;
        pen.fillRect(0, 0, surface.width, surface.height);
        for(let i of curves){
            i.draw(pen);
        }
    });
    sizeSlider.addEventListener("input", () =>
    {
        currentSize = Number(sizeSlider.value);
        sizeShow.innerText = sizeSlider.value;
    });
}
