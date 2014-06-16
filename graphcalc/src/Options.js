/*
    Copyright 2008-2011
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with JSXGraph.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * Options Namespace
 * @description These are the default options of the board and of all geometry elements.
 */
JXG.Options = {
    /* Options that are used directly within the board class */
    showCopyright : true,
    showNavigation : true,
    takeSizeFromFile : false, // If true, the construction - when read from a file or string - the size of the div can be changed.
    renderer: 'svg',
    takeFirst : false, // if true the first element with hasPoint==true is taken.

    /* zoom options */
    zoom : {
        factorX : 1.25,
        factorY : 1.25
    },

    /* navbar options */
    navbar: {
        strokeColor: '#aaaaaa',
        fillColor: '#f5f5f5',
        padding: '2px',
        position: 'absolute',
        fontSize: '10px',
        cursor: 'pointer',
        zIndex: '100',
        right: '5px',
        bottom: '5px'
    },

    /**
     * Generic options 
     */
    
    /* geometry element options */
    elements : {
        // the following tag is a meta tag: http://code.google.com/p/jsdoc-toolkit/wiki/MetaTags

        /**#@+
         * @visprop
         */

        /**
         * The stroke color of the given geometry element.
         * @type String
         * @name JXG.GeometryElement#strokeColor
         * @see JXG.GeometryElement#highlightStrokeColor
         * @see JXG.GeometryElement#strokeWidth
         * @see JXG.GeometryElement#strokeOpacity
         * @see JXG.GeometryElement#highlightStrokeOpacity
         * @default {@link JXG.Options.elements.color#strokeColor}
         */
        strokeColor: '#0000ff',

        /**
         * The stroke color of the given geometry element when the user moves the mouse over it.
         * @type String
         * @name JXG.GeometryElement#highlightStrokeColor
         * @see JXG.GeometryElement#strokeColor
         * @see JXG.GeometryElement#strokeWidth
         * @see JXG.GeometryElement#strokeOpacity
         * @see JXG.GeometryElement#highlightStrokeOpacity
         * @default {@link JXG.Options.elements.color#highlightStrokeColor}
         */
        highlightStrokeColor: '#C3D9FF',

        /**
         * The fill color of this geometry element.
         * @type String
         * @name JXG.GeometryElement#fillColor
         * @see JXG.GeometryElement#highlightFillColor
         * @see JXG.GeometryElement#fillOpacity
         * @see JXG.GeometryElement#highlightFillOpacity
         * @default {@link JXG.Options.elements.color#fillColor}
         */
        fillColor: 'red',

        /**
         * The fill color of the given geometry element when the mouse is pointed over it.
         * @type String
         * @name JXG.GeometryElement#highlightFillColor
         * @see JXG.GeometryElement#fillColor
         * @see JXG.GeometryElement#fillOpacity
         * @see JXG.GeometryElement#highlightFillOpacity
         * @default {@link JXG.Options.elements.color#highlightFillColor}
         */
        highlightFillColor: 'none',

        /**
         * Opacity for element's stroke color.
         * @type number
         * @name JXG.GeometryElement#strokeOpacity
         * @see JXG.GeometryElement#strokeColor
         * @see JXG.GeometryElement#highlightStrokeColor
         * @see JXG.GeometryElement#strokeWidth
         * @see JXG.GeometryElement#highlightStrokeOpacity
         * @default {@link JXG.Options.elements#strokeOpacity}
         */
        strokeOpacity: 1,

        /**
         * Opacity for stroke color when the object is highlighted.
         * @type number
         * @name JXG.GeometryElement#highlightStrokeOpacity
         * @see JXG.GeometryElement#strokeColor
         * @see JXG.GeometryElement#highlightStrokeColor
         * @see JXG.GeometryElement#strokeWidth
         * @see JXG.GeometryElement#strokeOpacity
         * @default {@link JXG.Options.elements#highlightStrokeOpacity}
         */
        highlightStrokeOpacity: 1,

        /**
         * Opacity for fill color.
         * @type number
         * @name JXG.GeometryElement#fillOpacity
         * @see JXG.GeometryElement#fillColor
         * @see JXG.GeometryElement#highlightFillColor
         * @see JXG.GeometryElement#highlightFillOpacity
         * @default {@link JXG.Options.elements.color#fillOpacity}
         */
        fillOpacity: 1,

        /**
         * Opacity for fill color when the object is highlighted.
         * @type number
         * @name JXG.GeometryElement#highlightFillOpacity
         * @see JXG.GeometryElement#fillColor
         * @see JXG.GeometryElement#highlightFillColor
         * @see JXG.GeometryElement#fillOpacity
         * @default {@link JXG.Options.elements.color#highlightFillOpacity}
         */
        highlightFillOpacity: 1,

        /**
         * Width of the element's stroke.
         * @type number
         * @name JXG.GeometryElement#strokeWidth
         * @see JXG.GeometryElement#strokeColor
         * @see JXG.GeometryElement#highlightStrokeColor
         * @see JXG.GeometryElement#strokeOpacity
         * @see JXG.GeometryElement#highlightStrokeOpacity
         * @default {@link JXG.Options.elements#strokeWidth}
         */
        strokeWidth: 2,

        /**
         * Width of the element's stroke when the mouse is pointed over it.
         * @type number
         * @name JXG.GeometryElement#highlightStrokeWidth
         * @see JXG.GeometryElement#strokeColor
         * @see JXG.GeometryElement#highlightStrokeColor
         * @see JXG.GeometryElement#strokeOpacity
         * @see JXG.GeometryElement#highlightStrokeOpacity
         * @see JXG.GeometryElement#highlightFillColor
         * @default {@link JXG.Options.elements#strokeWidth}
         */
        highlightStrokeWidth: 2,


        /**
         * If true the element is fixed and can not be dragged around. The element
         * will be repositioned on zoom and moveOrigin events.
         * @type Boolean
         * @default false
         * @name JXG.GeometryElement#fixed
         */
        fixed: false,

        /**
         * If true the element is fixed and can not be dragged around. The element
         * will even stay at its position on zoom and moveOrigin events.
         * Only free elements like points, texts, curves can be frozen.
         * @type Boolean
         * @default false
         * @name JXG.GeometryElement#frozen
         */
        frozen: false,

        /**
         * If true a label will display the element's name.
         * @type Boolean
         * @default false
         * @name JXG.GeometryElement#withLabel
         */
        withLabel: false,

        /**
         * If false the element won't be visible on the board, otherwise it is shown.
         * @type boolean
         * @name JXG.GeometryElement#visible
         * @see JXG.GeometryElement#hideElement
         * @see JXG.GeometryElement#showElement
         * @default true
         */
        visible: true,

        /**
         * Display layer which will contain the element.
         * @see JXG.Options#layer
         * @default See {@link JXG.Options#layer}
         */
        layer: 0,

        /**
         * Determines the elements border-style.
         * Possible values are:
         * <ul><li>0 for a solid line</li>
         * <li>1 for a dotted line</li>
         * <li>2 for a line with small dashes</li>


         * <li>3 for a line with medium dashes</li>
         * <li>4 for a line with big dashes</li>
         * <li>5 for a line with alternating medium and big dashes and large gaps</li>
         * <li>6 for a line with alternating medium and big dashes and small gaps</li></ul>
         * @type Number
         * @name JXG.GeometryElement#dash
         * @default 0
         */
        dash: 0,

        /**
         * If true the element will get a shadow.
         * @type boolean
         * @name JXG.GeometryElement#shadow
         * @default false
         */
        shadow: false,

        /**
         * If true the element will be traced, i.e. on every movement the element will be copied
         * to the background. Use {@link JXG.GeometryElement#clearTrace} to delete the trace elements.
         * @see JXG.GeometryElement#clearTrace
         * @see JXG.GeometryElement#traces
         * @see JXG.GeometryElement#numTraces
         * @type Boolean
         * @default false
         * @name JXG.GeometryElement#trace
         */
        trace: false,

        /**
         * If this is set to true, the element is updated in every update
         * call of the board. If set to false, the element is updated only after
         * zoom events or more generally, when the bounding box has been changed.
         * Examples for the latter behaviour should be axes.
         * @type Boolean
         * @default true
         * @see JXG.GeometryElement#needsRegularUpdate
         * @name JXG.GeometryElement#needsRegularUpdate
         */
        needsRegularUpdate: true,

        /*draft options */
        draft : {
            /**
             * If true the element will be drawn in grey scale colors to visualize that it's only a draft.
             * @type boolean
             * @name JXG.GeometryElement#draft
             * @default {@link JXG.Options.elements.draft#draft}
             */
            draft : false,
            strokeColor : '#565656',
            fillColor : '#565656',
            strokeOpacity : 0.8,
            fillOpacity : 0.8,
            strokeWidth : 1
        }
        // close the meta tag
        /**#@-*/
    },

    ticks : {
        /**#@+
         * @visprop
         */

        /**
         * Draw labels yes/no
         * @type Boolean
         * @name JXG.Ticks#drawLabels
         * @default false
         */
        drawLabels: false,
        
        /**
         * Draw the zero tick, that lies at line.point1?
         * @type Boolean
         * @name JXG.Ticks#drawZero
         * @default false
         */
        drawZero: false,

        /**
         * If the distance between two ticks is too big we could insert new ticks. If insertTicks
         * is <tt>true</tt>, we'll do so, otherwise we leave the distance as is.
         * This option is ignored if equidistant is false.
         * @type Boolean
         * @name JXG.Ticks#insertTicks
         * @see JXG.Ticks#equidistant
         * @see JXG.Ticks#maxTicksDistance
         * @default false
         */
        insertTicks: false,
        minTicksDistance: 50,

        /**
         * Total height of a minor tick. If negative the full height of the board is taken.
         * @type Number
         * @name JXG.Ticks#minorHeight
         */
        minorHeight: 4,

        /**
         * Total height of a major tick. If negative the full height of the board is taken.
         * @type Number
         * @name JXG.Ticks#majorHeight
         */
        majorHeight: 10,

        /**
         * The number of minor ticks between two major ticks.
         * @type Number
         * @name JXG.Ticks#minorTicks
         */
        minorTicks: 4,

        /**
         * The default distance between two ticks. Please be aware that this value does not have
         * to be used if {@link JXG.Ticks#insertTicks} is set to true.
         * @type Boolean
         * @name JXG.Ticks#ticksDistance
         * @see JXG.Ticks#equidistant
         * @see JXG.Ticks#insertTicks
         * @default 1
         */
        ticksDistance: 1,
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeColor: 'black',
        highlightStrokeColor: '#888888'
        // close the meta tag
        /**#@-*/
    },

    /* precision options */
    precision : {
        touch    : 30,
        mouse    : 4,
        epsilon  : 0.0001,
        hasPoint : 4
    },

    /* Default ordering of the layers */
    layer : {
        numlayers: 20, // only important in SVG
        text  : 9,
        point : 9,   
        arc   : 8,
        line  : 7,
        circle: 6, 
        curve : 5,
        polygon: 3,
        sector: 3,
        angle : 3, 
        integral : 3,
        grid  : 1,
        image : 0,
        trace: 0
    },

    /**
     * element type specific options 
     */ 
    /* special angle options */
    angle : {
        withLabel:true,
        radius : 1.0,
        fillColor : '#FF7F00',
        highlightFillColor : '#FF7F00',
        strokeColor : '#FF7F00',
        textColor : '#0000FF',
        fillOpacity : 0.3,
        highlightFillOpacity : 0.3,
        point: {
            withLabel: false,
            visible: false,
            name: ''
        },
        dot: {
            visible: false,
            strokeColor: 'none',
            fillColor: 'black',
            size: 2,
            face: 'o',
            withLabel: false,
            name: ''
        }
    },

    /* special arc options */
    arc : {
        firstArrow : false,
        lastArrow : false,
        fillColor : 'none',
        highlightFillColor : 'none',
        strokeColor : '#0000ff',
        highlightStrokeColor : '#C3D9FF',
        useDirection: false, 
        center: {
            visible: false,
            withLabel: false,
            fixed: true,
            name: ''
        }
    },

    /* special axis options */
    axis: {
        needsRegularUpdate : false,         // Axes only updated after zooming and moving of the origin.
        strokeWidth: 1,
        strokeColor : '#666666',
        highlightStrokeWidth: 1,
        highlightStrokeColor : '#888888',
        withTicks: true,
        straightFirst : true,
        straightLast : true,
        lastArrow: true,
        withLabel: false, 
        /* line ticks options */
        ticks : {
            needsRegularUpdate : false,            
            strokeWidth: 1,
            strokeColor : '#666666',
            highlightStrokeColor : '#888888',
            drawLabels : true,
            drawZero : true,
            insertTicks : true,
            minTicksDistance : 50,
            minorHeight : 4,          // if <0: full width and height
            majorHeight : -1,         // if <0: full width and height
            minorTicks : 4,
            ticksDistance: 1,         // TODO doc
            strokeOpacity : 0.25
        },
        point1 : {                  // Default values for point1 if created by line
            needsRegularUpdate : false
        },
        point2 : {                  // Default values for point2 if created by line
            needsRegularUpdate : false
        }
    },
    
    /* special options for bisector of 3 points */
    bisector : {
        strokeColor: '#000000', // Bisector line
        point : {               // Bisector point
            visible: false,
            fixed: true,
            withLabel: false,
            name: ''
        }
    },

    /* special options for the 2 bisectors of 2 lines */
    bisectorlines : {
        line1 : {               // 
            strokeColor: 'red'
        },
        line2 : {               // 
            strokeColor: 'black'
        }
    },

    /* special chart options */
    chart: {
        chartStyle: 'line',
        colors: ['#B02B2C','#3F4C6B','#C79810','#D15600','#FFFF88','#C3D9FF','#4096EE','#008C00'],
        highlightcolors: null,
        fillcolor: null,
        highlightonsector: false,
        highlightbysize: false
    },

    /*special circle options */
    circle : {
        fillColor : 'none',
        highlightFillColor : 'none',
        strokeColor : '#0000ff',
        highlightStrokeColor : '#C3D9FF',
        center: {
            visible: false,
            withLabel: false,
            fixed: true,
            name: ''
        }
    },

    /* special options for circumcircle of 3 points */
    circumcircle : {
        fillColor : 'none',
        highlightFillColor : 'none',
        strokeColor : '#0000ff',
        highlightStrokeColor : '#C3D9FF',
        point : {               // center point
            visible: false,
            fixed: true,
            withLabel: false,
            name: ''
        }
    },

    /* special options for circumcircle sector of 3 points */
    circumcirclesector: {
        useDirection: true,
        fillColor: '#00FF00',
        highlightFillColor: '#00FF00',
        fillOpacity: 0.3,
        highlightFillOpacity: 0.3,
        strokeColor : '#0000ff',
        highlightStrokeColor : '#C3D9FF',
        //fillOpacity: 0.3,
        //highlightFillOpacity: 0.3,
        point: {
            visible: false,
            fixed: true,
            withLabel: false,
            name: ''
        }
    },
    
    /* special conic options */
    conic : {
        fillColor : 'none',
        highlightFillColor : 'none',
        strokeColor : '#0000ff',
        highlightStrokeColor : '#C3D9FF',
        foci: {
            // points
            fixed: true,
            visible: false,
            withLabel: false,
            name: ''
        }
    },

    /* special curve options */
    curve : {
        strokeWidth : 1,
        strokeColor : '#0000ff',
        fillColor: 'none',

        /**#@+
         * @visprop
         */

        /**
         * The curveType is set in @see generateTerm and used in {@link JXG.Curve#updateCurve}.
         * Possible values are <ul>
         * <li>'none'</li>
         * <li>'plot': Data plot</li>
         * <li>'parameter': we can not distinguish function graphs and parameter curves</li>
         * <li>'functiongraph': function graph</li>
         * <li>'polar'</li>
         * <li>'implicit' (not yet)</li></ul>
         * Only parameter and plot are set directly. Polar is set with setProperties only.
         * @name JXG.Curve#curveType
         */
        curveType: null,
        RDPsmoothing : false,       // Apply the Ramen-Douglas-Peuker algorithm
        numberPointsHigh : 1600,  // Number of points on curves after mouseUp
        numberPointsLow : 400,    // Number of points on curves after mousemove
        doAdvancedPlot : true       // Use the algorithm by Gillam and Hohenwarter
                                 // It is much slower, but the result is better

        /**#@-*/
    },

    /* special grid options */
    grid : {
        /**#@+
         * @visprop
         */

        /* grid styles */
        needsRegularUpdate : false,
        hasGrid : false,
        gridX : 1,
        gridY : 1,
        strokeColor : '#C0C0C0',
        strokeOpacity : '0.5',
        strokeWidth: 1,
        dash : 2,
        /* snap to grid options */
        snapToGrid : false,
        snapSizeX : 2,
        snapSizeY : 2

        /**#@-*/
    },

    /* special grid options */
    image: {
        imageString : null,
        fillOpacity: 1.0
    },
    
    /* special options for incircle of 3 points */
    incircle : {
        fillColor : 'none',
        highlightFillColor : 'none',
        strokeColor : '#0000ff',
        highlightStrokeColor : '#C3D9FF',
        point : {               // center point
            visible: false,
            fixed: true,
            withLabel: false,
            name: ''
        }
    },

    /* special options for integral */
    integral: {
        withLabel: true,    // Show integral value as text
        strokeWidth: 0,
        strokeOpacity: 0,
        start: {    // Start point
            visible: true
        },
        startproject: {    // Start point
            visible: false,
            fixed: true,
            withLabel: false,
            name: ''
        },
        end: {      // End point
            visible: true
        },
        endproject: {      // End point
            visible: false,
            fixed: true,
            withLabel: false,
            name: ''
        },
        text: {
            fontSize: 20
        }
    },

    /* special legend options */
    legend: {
        /**
         * @visprop
         */
        style: 'vertical',
        labels: ['1','2','3','4','5','6','7','8'],
        colors: ['#B02B2C','#3F4C6B','#C79810','#D15600','#FFFF88','#C3D9FF','#4096EE','#008C00']
    },

    /* special line options */
    line : {
        /**#@+
         * @visprop
         */

        firstArrow : false,
        lastArrow : false,
        straightFirst : true,
        straightLast : true,
        fillColor : 'none',               // Important for VML on IE
        highlightFillColor : 'none',  // Important for VML on IE
        strokeColor : '#0000ff',
        highlightStrokeColor : '#888888',
        withTicks: false,

        /**#@-*/

        point1 : {                  // Default values for point1 if created by line
            visible: false, 
            withLabel: false, 
            fixed:true,
            name: ''
        },
        point2 : {                  // Default values for point2 if created by line
            visible: false, 
            withLabel: false, 
            fixed: true,
            name: ''
        },
        ticks : {
            drawLabels : true,
            drawZero : false,
            insertTicks : false,
            minTicksDistance : 50,
            maxTicksDistance : 300,
            minorHeight : 4,          // if <0: full width and height
            majorHeight : -1,         // if <0: full width and height
            minorTicks : 4,
            defaultDistance : 1,
            strokeOpacity : 0.3
        },
        /* absolute label offset from anchor */
        labelOffsets: [10,10]
    },

    /* special options for locus curves */
    locus : {
        /**#@+
         * @visprop
         */

        translateToOrigin: false,
        translateTo10: false,
        stretch: false,
        toOrigin: null,
        to10: null

        /**#@-*/
    },
    
    /* special options for parallel lines */
    parallel : {
        strokeColor: '#000000', // Parallel line
        point : {               // Parallel point
            visible: false,
            fixed: true,
            withLabel: false,
            name: ''
        }
    },

    /* special perpendicular options */
    perpendicular : {
        strokeColor: '#000000', // Perpendicular segment
        straightFirst: false,
        straightLast: false,
        point : {               // Perpendicular point
            visible: false,
            fixed: true,
            withLabel: false,
            name: ''
        }
    },

    /* special point options */
    point : {
        /**#@+
         * @visprop
         */

    	withLabel: true,

        /**
         * This attribute was used to determined the point layout. It was derived from GEONExT and was
         * replaced by {@link JXG.Point#face} and {@link JXG.Point#size}.
         * @see JXG.Point#face
         * @see JXG.Point#size
         * @type Number
         * @default JXG.Options.point#style
         * @name JXG.Point#style
         * @deprecated
         */
        style : 5,

        /**
         * There are different point styles which differ in appearance.
         * Posssible values are
         * <table><tr><th>Value</th></tr>
         * <tr><td>cross</td></tr>
         * <tr><td>circle</td></tr>
         * <tr><td>square</td></tr>
         * <tr><td>plus</td></tr>
         * <tr><td>diamond</td></tr>
         * <tr><td>triangleUp</td></tr>
         * <tr><td>triangleDown</td></tr>
         * <tr><td>triangleLeft</td></tr>
         * <tr><td>triangleRight</td></tr>
         * </table>
         * @type string
         * @see JXG.Point#setStyle
         * @default circle
         * @name JXG.Point#face
         */
        face : 'o',

        /**
         * Determines the size of a point.
         * Means radius resp. half the width of a point (depending on the face).
         * @see JXG.Point#face
         * @type number
         * @see JXG.Point#setStyle
         * @default 3
         * @name JXG.Point#size
         */
        size : 3,
        fillColor : '#ff0000',
        highlightFillColor : '#EEEEEE',
        strokeWidth: 2,
        strokeColor : '#ff0000',
        highlightStrokeColor : '#C3D9FF',
        zoom: false,             // Change the point size on zoom

        /**
         * If true, the infobox is shown on mouse over, else not.
         * @type boolean
         * @default true
         */
        showInfobox: true,

        draft: false

        /**#@-*/
    },

    /* special polygon options */
    polygon : {
        /**#@+
         * @visprop
         */

        fillColor : '#00FF00',
        highlightFillColor : '#00FF00',
        fillOpacity : 0.3,
        highlightFillOpacity : 0.3,

        /**
         * Is the polygon bordered by lines?
         * @type Boolean
         * @name JXG.Polygon#withLines
         * @default true
         */
        withLines: true,

        /**#@-*/

        lines: {
            withLabel: false,
		    strokeWidth: 1,
		    highlightStrokeWidth: 1,
            // Polygon layer + 1
            layer: 5
        },
        
        /**
         *  Points for regular polygons
         */ 
        points : {                    
            withLabel: true,
            strokeColor: '#ff0000',
            fillColor: '#ff0000',
            fixed: true
        }
    },

    /* special options for riemann sums */
    riemannsum: {
        withLabel:false,
        fillOpacity:0.3,
        fillColor:'#ffff00'
    },

    /* special sector options */
    sector : {
        fillColor: '#00FF00',
        highlightFillColor: '#00FF00',
        fillOpacity: 0.3,
        highlightFillOpacity: 0.3
    },

    /* special slider options */
    slider : {
        /**#@+
         * @visprop
         */

        /**
         * The slider only returns multiples of this value, e.g. for discrete values set this property to <tt>1</tt>. For
         * continuous results set this to <tt>-1</tt>.
         * @memberOf Slider.prototype
         * @name snapWidth
         * @type Number
         */
        snapWidth: -1,      // -1 = deactivated

        /**
         * The precision of the slider value displayed in the optional text.
         * @memberOf Slider.prototype
         * @name precision
         * @type Number
         */
        precision: 2,
        firstArrow : false,
        lastArrow : false,
        withTicks: true,
        withLabel: true,

        /**#@-*/
            
        point1: {
            needsRegularUpdate : false,
            showInfobox: false,
            withLabel: false,
            visible: false,
            fixed: true,
            name: ''
        },
        point2: {
            needsRegularUpdate : false,
            showInfobox: false,
            withLabel: false,
            visible: false,
            fixed: true,
            name: ''
        },
        glider: {
            showInfobox: false,
            name : '',
            withLabel: false,
            visible: true,
            strokeColor : '#000000',
            highlightStrokeColor : '#888888',
            fillColor : '#ffffff',
            highlightFillColor : 'none',
            size: 6
        },
        segment1: {
            needsRegularUpdate : false,
            name : '',
            strokeWidth: 1,
            strokeColor : '#000000',
            highlightStrokeColor : '#888888'
        },
        /* line ticks options */
        ticks : {
            needsRegularUpdate : false,
            drawLabels : false,
            drawZero : true,
            insertTicks : true,
            minorHeight : 4,          // if <0: full width and height
            majorHeight : 10,        // if <0: full width and height
            minorTicks : 0,
            defaultDistance : 1,
            strokeOpacity : 1,
            strokeWidth: 1,
            strokeColor : '#000000'
        }, 
        segment2: {
            strokeWidth: 3,
            name : '',
            strokeColor : '#000000',
            highlightStrokeColor : '#888888'
        },
        text: {
            strokeColor: '#000000'
        }
    },
    
    /* special text options */
    text : {
        /**#@+
         * @visprop
         */

        fontSize : 12,
        digits: 2,
        isLabel: false,
        strokeColor : '#000000',
        useASCIIMathML : false,
        useMathJax : false,
        display : 'html',                    //'html' or 'internal'
        withLabel: false

        /**#@-*/
    },
    
    /**
      * Abbreviations of properties. Setting the shortcut means setting abbreviated properties
      * to the same value.
      * It is used in JXG.GeometryElement#setProperty and in
      * the constructor JXG.GeometryElement.
      * Attention: In Options.js abbreviations are not allowed.
      */
    shortcuts : {
        color: ['strokeColor', 'fillColor'],
        opacity: ['strokeOpacity', 'fillOpacity'],
        highlightColor: ['highlightStrokeColor', 'highlightFillColor'],
        highlightOpacity: ['highlightStrokeOpacity', 'highlightFillOpacity'],
        strokeWidth: ['strokeWidth', 'highlightStrokeWidth']
    }
    
};

/**
 * Holds all possible properties and the according validators for geometry elements. A validator is either a function
 * which takes one parameter and returns true, if the value is valid for the property, or it is false if no validator
 * is required.
 */
JXG.Validator = (function () {
    var validatePixel = function (v) {
            return /^[0-9]+px$/.test(v);
        },
        validateDisplay = function (v) {
            return (v  in {html: 0, internal: 0});
        },
        validateColor = function (v) {
            // for now this should do it...
            return JXG.isString(v);
        },
        validatePointFace = function (v) {
            return JXG.exists(JXG.Point.prototype.normalizeFace.call(this, v));
        },
        validateInteger = function (v) {
            return (Math.abs(v - Math.round(v)) < JXG.Math.eps);
        },
        validatePositiveInteger = function (v) {
            return validateInteger(v) && v > 0;
        },
        validateScreenCoords = function (v) {
            return v.length >= 2 && validateInteger(v[0]) && validateInteger(v[1]);
        },
        validateRenderer = function (v) {
            return (v in {vml: 0, svg: 0, canvas: 0});
        },
    i, v = {},
    validators = {
        color: validateColor,
        defaultDistance: JXG.isNumber,
        display : validateDisplay,
        doAdvancedPlot: false,
        draft : false,
        drawLabels : false,
        drawZero : false,
        face : validatePointFace,
        factor : JXG.isNumber,
        fillColor: validateColor,
        fillOpacity : JXG.isNumber,
        firstArrow : false,
        fontSize : validateInteger,
        dash : validateInteger,
        gridX : JXG.isNumber,
        gridY : JXG.isNumber,
        hasGrid : false,
        highlightFillColor: validateColor,
        highlightFillOpacity: JXG.isNumber,
        highlightStrokeColor: validateColor,
        highlightStrokeOpacity: JXG.isNumber,
        insertTicks : false,
        labelOffsets: validateScreenCoords,
        lastArrow : false,
        majorHeight : validateInteger,
        maxTicksDistance : validatePositiveInteger,
        minorHeight : validateInteger,
        minorTicks : validatePositiveInteger,
        minTicksDistance : validatePositiveInteger,
        numberPointsHigh : validatePositiveInteger,
        numberPointsLow : validatePositiveInteger,
        opacity : JXG.isNumber,
        radius : JXG.isNumber,
        RDPsmoothing : false,
        renderer: validateRenderer,
        right: validatePixel,
        showCopyright : false,
        showInfobox: false,
        showNavigation : false,
        size : validateInteger,
        snapSizeX : JXG.isNumber,
        snapSizeY : JXG.isNumber,
        snapWidth : JXG.isNumber,
        snapToGrid : false,
        straightFirst : false,
        straightLast : false,
        stretch: false,
        strokeColor : validateColor,
        strokeOpacity: JXG.isNumber,
        strokeWidth : validateInteger,
        takeFirst : false,
        takeSizeFromFile : false,
        textColor : validateColor,
        to10: false,
        toOrigin: false,
        translateTo10: false,
        translateToOrigin: false,
        useASCIIMathML : false,
        useDirection: false,
        useMathJax : false,
        withLabel: false,
        withTicks: false,
        zoom: false
    };

    // this seems like a redundant step but it makes sure that
    // all properties in the validator object have lower case names
    // and the validator object is easier to read.
    for (i in validators) {
        v[i.toLowerCase()] = validators[i];
    }

    return v;
})();


/**
 * Apply the options stored in this object to all objects on the given board.
 * @param {JXG.Board} board The board to which objects the options will be applied.
 */
JXG.useStandardOptions = function(board) {
    var o = JXG.Options,
        boardHadGrid = board.hasGrid,
        el, t, p, copyProps;

    board.options.grid.hasGrid = o.grid.hasGrid;
    board.options.grid.gridX = o.grid.gridX;
    board.options.grid.gridY = o.grid.gridY;
    board.options.grid.gridColor = o.grid.gridColor;
    board.options.grid.gridOpacity = o.grid.gridOpacity;
    board.options.grid.gridDash = o.grid.gridDash;
    board.options.grid.snapToGrid = o.grid.snapToGrid;
    board.options.grid.snapSizeX = o.grid.SnapSizeX;
    board.options.grid.snapSizeY = o.grid.SnapSizeY;
    board.takeSizeFromFile = o.takeSizeFromFile;

    copyProps = function(p, o) {
            p.visProp.fillcolor = o.fillColor;
            p.visProp.highlightfillcolor = o.highlightFillColor;
            p.visProp.strokecolor = o.strokeColor;
            p.visProp.highlightstrokecolor = o.highlightStrokeColor;
    };
    
    for(el in board.objects) {
        p = board.objects[el];
        if(p.elementClass == JXG.OBJECT_CLASS_POINT) {
            copyProps(p, o.point);
        }
        else if(p.elementClass == JXG.OBJECT_CLASS_LINE) {
            copyProps(p, o.line);
            for(t in p.ticks) {
                t.majorTicks = o.line.ticks.majorTicks;
                t.minTicksDistance = o.line.ticks.minTicksDistance;
                t.visProp.minorheight = o.line.ticks.minorHeight;
                t.visProp.majorheight = o.line.ticks.majorHeight;
            }
        }
        else if(p.elementClass == JXG.OBJECT_CLASS_CIRCLE) {
            copyProps(p, o.circle);
        }
        else if(p.type == JXG.OBJECT_TYPE_ANGLE) {
            copyProps(p, o.angle);
        }
        else if(p.type == JXG.OBJECT_TYPE_ARC) {
            copyProps(p, o.arc);
        }
        else if(p.type == JXG.OBJECT_TYPE_POLYGON) {
            copyProps(p, o.polygon);
        }
        else if(p.type == JXG.OBJECT_TYPE_CONIC) {
            copyProps(p, o.conic);
        }
        else if(p.type == JXG.OBJECT_TYPE_CURVE) {
            copyProps(p, o.curve);
        }
        else if(p.type == JXG.OBJECT_TYPE_SECTOR) {
            p.arc.visProp.fillcolor = o.sector.fillColor;
            p.arc.visProp.highlightfillcolor = o.sector.highlightFillColor;
            p.arc.visProp.fillopacity = o.sector.fillOpacity;
            p.arc.visProp.highlightfillopacity = o.sector.highlightFillOpacity;
        }
    }

    board.fullUpdate();
    if(boardHadGrid && !board.hasGrid) {
        board.removeGrids(board);
    } else if(!boardHadGrid && board.hasGrid) {
        board.create('grid', []);
    }
};

/**
 * Converts all color values to greyscale and calls useStandardOption to put them onto the board.
 * @param {JXG.Board} board The board to which objects the options will be applied.
 * @see #useStandardOptions
 */
JXG.useBlackWhiteOptions = function(board) {
    var o = JXG.Options;
    o.point.fillColor = JXG.rgb2bw(o.point.fillColor);
    o.point.highlightFillColor = JXG.rgb2bw(o.point.highlightFillColor);
    o.point.strokeColor = JXG.rgb2bw(o.point.strokeColor);
    o.point.highlightStrokeColor = JXG.rgb2bw(o.point.highlightStrokeColor);

    o.line.fillColor = JXG.rgb2bw(o.line.fillColor);
    o.line.highlightFillColor = JXG.rgb2bw(o.line.highlightFillColor);
    o.line.strokeColor = JXG.rgb2bw(o.line.strokeColor);
    o.line.highlightStrokeColor = JXG.rgb2bw(o.line.highlightStrokeColor);

    o.circle.fillColor = JXG.rgb2bw(o.circle.fillColor);
    o.circle.highlightFillColor = JXG.rgb2bw(o.circle.highlightFillColor);
    o.circle.strokeColor = JXG.rgb2bw(o.circle.strokeColor);
    o.circle.highlightStrokeColor = JXG.rgb2bw(o.circle.highlightStrokeColor);

    o.arc.fillColor = JXG.rgb2bw(o.arc.fillColor);
    o.arc.highlightFillColor = JXG.rgb2bw(o.arc.highlightFillColor);
    o.arc.strokeColor = JXG.rgb2bw(o.arc.strokeColor);
    o.arc.highlightStrokeColor = JXG.rgb2bw(o.arc.highlightStrokeColor);

    o.polygon.fillColor = JXG.rgb2bw(o.polygon.fillColor);
    o.polygon.highlightFillColor  = JXG.rgb2bw(o.polygon.highlightFillColor);

    o.sector.fillColor = JXG.rgb2bw(o.sector.fillColor);
    o.sector.highlightFillColor  = JXG.rgb2bw(o.sector.highlightFillColor);

    o.curve.strokeColor = JXG.rgb2bw(o.curve.strokeColor);
    o.grid.gridColor = JXG.rgb2bw(o.grid.gridColor);

    JXG.useStandardOptions(board);
};
