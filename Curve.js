/*Authors: Dr. Morrison and Pranav*/
class Curve
{
    constructor(color, width, transparency)
    {
        this.points = [];
        this.color = color;
        this.width = width;
        this.transparency = transparency;
    }
    push(point)
    {
        this.points.push(point);
    }
    draw(pen)
    {
        pen.lineWidth = this.width;
        var redValue = parseInt(this.color.substring(1, 3), 16);
        var greenValue = parseInt(this.color.substring(3, 5), 16);
        var blueValue = parseInt(this.color.substring(5, 7), 16);
        pen.strokeStyle = `rgba(${redValue.toString(10)},${greenValue.toString(10)},${blueValue.toString(10)},${this.transparency})`;
        pen.lineCap="round";
        pen.lineJoin="round";
        pen.beginPath();
        pen.moveTo(this.points[0].getX(), this.points[0].getY());
        for(let k = 0; k <= this.points.length - 1; k++)
        {
            pen.lineTo(this.points[k].getX(), this.points[k].getY());
        }
        pen.stroke();
    }
}
