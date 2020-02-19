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
        
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {

    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {

    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {

    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawRectangle(left_bottom, right_top, color, framebuffer) {
        
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCirle(center, radius, color, framebuffer) {
        
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(pt0, pt1, pt2, pt3, color, framebuffer) {
        
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
			    drawLineLow(pt0.x, pt0.y, pt1.x, pt1.y, color, framebuffer);
		    }
		    else
		    {
			    drawLineLow(pt1.x, pt1.y, pt0.x, pt0.y, color, framebuffer);
		    }
	    }
	    else
	    {
		    if (pt0.y < pt1.y)
		    {
			    drawLineHigh(pt0.x, pt0.y, pt1.x, pt1.y, color, framebuffer);
		    }
		    else
		    {
			    drawLineHigh(pt1.x, pt1.y, pt0.x, pt0.y, color, framebuffer);
		    }
	    }
    }

    drawLineLow(pt0, pt1, color, framebuffer)
    {
	    var A = y1 - y0;
	    var B = x0 - x1;
	    var iy = 1;
	    if (A < 0) {
		    iy = -1;
		    A *= -1;
	    }
	    var D = 2 * A + B;
	    var x = x0;
	    var y = y0;
	    var px;
	    while (x <= x1)
	    {
		    px = pixelIndex(x, y, framebuffer);
		    setFramebufferColor(framebuffer, px, color);
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

    drawLineHigh(x0, y0, x1, y1, color, framebuffer)
    {
	    var A = x1 - x0;
	    var B = y0 - y1;
	    var ix = 1;
	    if (A < 0) {
		    ix = -1;
		    A *= -1;
	    }
	    var D = 2 * A + B;
	    var x = x0;
	    var y = y0;
	    var px;
	    while (y <= y1)
	    {
		    px = pixelIndex(x, y, framebuffer);
		    setFramebufferColor(framebuffer, px, color);
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
};
