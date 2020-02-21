class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        this.drawRectangle({x: 100, y:100}, {x:400, y:300}, [155,0,155,255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        this.drawCirle({x:400, y: 300}, 100, [0,155,155,255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        this.drawBezierCurve({x:100, y: 100}, {x:300, y: 500}, {x:450, y: 400}, {x:500, y: 200}, [155,155,0,255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        
    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawRectangle(left_bottom, right_top, color, framebuffer) {
        this.drawLine(left_bottom, {x: right_top.x, y: left_bottom.y}, color, framebuffer);
        this.drawEndPoint(left_bottom, 2, [0, 0, 0, 255], framebuffer);
        this.drawLine({x: right_top.x, y: left_bottom.y}, right_top, color, framebuffer);
        this.drawEndPoint({x: right_top.x, y: left_bottom.y}, 2, [0, 0, 0, 255], framebuffer);
        this.drawLine(right_top, {x: left_bottom.x, y: right_top.y}, color, framebuffer);
        this.drawEndPoint(right_top, 2, [0, 0, 0, 255], framebuffer);
        this.drawLine({x: left_bottom.x, y: right_top.y}, left_bottom, color, framebuffer);
        this.drawEndPoint({x: left_bottom.x, y: right_top.y}, 2, [0, 0, 0, 255], framebuffer);
        
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCirle(center, radius, color, framebuffer) {
        var x0, x1, y0, y1, pt0, pt1;
        for(var i = 0; i < 2 * Math.PI; i = i + (2 * Math.PI) / this.num_curve_sections)
        {
            x0 = Math.round(center.x + radius * Math.cos(i - ((2 * Math.PI) / this.num_curve_sections)));
            y0 = Math.round(center.y + radius * Math.sin(i - ((2 * Math.PI) / this.num_curve_sections)));
            x1 = Math.round(center.x + radius * Math.cos(i));
            y1 = Math.round(center.y + radius * Math.sin(i));
            pt0 = {x: x0, y: y0};
            pt1 = {x: x1, y: y1};
            this.drawLine(pt0, pt1, color, framebuffer);
            this.drawEndPoint(pt0, 2, [0, 0, 0, 255], framebuffer);
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(pt0, pt1, pt2, pt3, color, framebuffer) {
        var x0, x1, y0, y1, point0, point1;
        var t = 0;
        var t_add =(1/ this.num_curve_sections);
        for(var i = 0; i < this.num_curve_sections; i++)
        {
            x0 = Math.round(Math.pow((1 - t), 3) * pt0.x + 3 * Math.pow((1-t), 2) * t * pt1.x + 3 * (1 - t) * Math.pow(t, 2) * pt2.x + Math.pow(t, 3) * pt3.x);
            y0 = Math.round(Math.pow((1 - t), 3) * pt0.y + 3 * Math.pow((1-t), 2) * t * pt1.y + 3 * (1 - t) * Math.pow(t, 2) * pt2.y + Math.pow(t, 3) * pt3.y);
            t = t + t_add;
            x1 = Math.round(Math.pow((1 - t), 3) * pt0.x + 3 * Math.pow((1-t), 2) * t * pt1.x + 3 * (1 - t) * Math.pow(t, 2) * pt2.x + Math.pow(t, 3) * pt3.x);
            y1 = Math.round(Math.pow((1 - t), 3) * pt0.y + 3 * Math.pow((1-t), 2) * t * pt1.y + 3 * (1 - t) * Math.pow(t, 2) * pt2.y + Math.pow(t, 3) * pt3.y);
            point0 = {x: x0, y: y0};
            point1 = {x: x1, y: y1};
            this.drawLine(point0, point1, color, framebuffer);
            this.drawEndPoint(point0, 2, [0, 0, 0, 255], framebuffer);
        }
    }

    drawEndPoint(center, radius, color, framebuffer) {
        if(this.show_points)
        {
            var x0, x1, y0, y1, pt0, pt1;
            for(var i = 0; i < 2 * Math.PI; i = i + (2 * Math.PI) / 20)
            {
            x0 = Math.round(center.x + radius * Math.cos(i - ((2 * Math.PI) / this.num_curve_sections)));
            y0 = Math.round(center.y + radius * Math.sin(i - ((2 * Math.PI) / this.num_curve_sections)));
            x1 = Math.round(center.x + radius * Math.cos(i));
            y1 = Math.round(center.y + radius * Math.sin(i));
            pt0 = {x: x0, y: y0};
            pt1 = {x: x1, y: y1};
            this.drawLine(pt0, pt1, color, framebuffer);
            }
        }
    }


    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawLine(pt0, pt1, color, framebuffer)
    {
	    if (Math.abs(pt1.y - pt0.y) <= Math.abs(pt1.x - pt0.x))
	    {
		    if (pt0.x < pt1.x)
		    {
			    this.drawLineLow(pt0, pt1, color, framebuffer);

		    }
		    else
		    {
			    this.drawLineLow(pt1, pt0, color, framebuffer);
		    }
	    }
	    else
	    {
		    if (pt0.y < pt1.y)
		    {
			    this.drawLineHigh(pt0, pt1, color, framebuffer); 
		    }
		    else
		    {
			    this.drawLineHigh(pt1, pt0, color, framebuffer);
		    }
	    }
    }

    drawLineLow(pt0, pt1, color, framebuffer)
    {
	    var A = pt1.y - pt0.y;
	    var B = pt0.x - pt1.x;
	    var iy = 1;
	    if (A < 0) {
		    iy = -1;
		    A *= -1;
	    }
	    var D = 2 * A + B;
	    var x = pt0.x;
	    var y = pt0.y;
	    var px;
	    while (x <= pt1.x)
	    {
		    px = this.pixelIndex(x, y, framebuffer);
		    this.setFramebufferColor(framebuffer, px, color);
		    x += 1;
		    if (D <= 0)
		    {
			    D += 2 * A;
		    }
		    else
		    {
			    D += 2 * A + 2 * B;
			    y += iy;
		    }
	    }
    }

    drawLineHigh(pt0, pt1, color, framebuffer)
    {
	    var A = pt1.x - pt0.x;
	    var B = pt0.y - pt1.y;
	    var ix = 1;
	    if (A < 0) {
		    ix = -1;
		    A *= -1;
	    }
	    var D = 2 * A + B;
	    var x = pt0.x;
	    var y = pt0.y;
	    var px;
	    while (y <= pt1.y)
	    {
		    px = this.pixelIndex(x, y, framebuffer);
		    this.setFramebufferColor(framebuffer, px, color);
		    y += 1;
		    if (D <= 0)
		    {
			    D += 2 * A;
		    }
		    else
		    {
			    D += 2 * A + 2 * B;
			    x += ix;
		    }
	    }
    }
    pixelIndex(x, y, framebuffer)
    {
        return 4 * y * framebuffer.width + 4 * x;
    }

    setFramebufferColor(framebuffer, px, color)
    {
        framebuffer.data[px + 0] = color[0];
        framebuffer.data[px + 1] = color[1];
        framebuffer.data[px + 2] = color[2];
        framebuffer.data[px + 3] = color[3];
    }
};
