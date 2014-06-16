/*
    Copyright 2008,2009
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
 * @fileoverview In this file the geometry element Image is defined.
 * @author graphjs
 * @version 0.1
 */

/**
 * Construct and handle images
 * @class Image:
 * It inherits from @see GeometryElement.
 * @constructor
 */
JXG.Image = function (board, url, coordinates, size, attributes) {
    this.constructor(board, attributes, JXG.OBJECT_TYPE_IMAGE, JXG.OBJECT_CLASS_OTHER);

    this.initialCoords = new JXG.Coords(JXG.COORDS_BY_USER, coordinates, this.board);  // Still needed?

    this.X = JXG.createFunction(coordinates[0],this.board,'');
    this.Y = JXG.createFunction(coordinates[1],this.board,'');
    this.W = JXG.createFunction(size[0],this.board,'');
    this.H = JXG.createFunction(size[1],this.board,'');
    this.coords = new JXG.Coords(JXG.COORDS_BY_USER, [this.X(),this.Y()], this.board);
    this.updateCoords = new Function('','this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.X(),this.Y()]);');
    this.updateSize = new Function('','this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.W(),this.H()]);');
    this.usrSize = [this.W(), this.H()];
    this.size = [this.usrSize[0]*board.unitX,this.usrSize[1]*board.unitY];
    this.url = url;

    this.parent = JXG.getRef(attributes.anchor);

    this.id = this.board.setId(this, 'Im');

    this.board.renderer.drawImage(this);
    if(!this.visProp.visible) {
       this.board.renderer.hide(this);
    }
};

JXG.Image.prototype = new JXG.GeometryElement;

JXG.extend(JXG.Image.prototype, /** @lends JXG.Image.prototype */ {

    /**
     * Empty function (for the moment). It is needed for highlighting, a feature not used for images right now.
     * @param {int} x Coordinate in x direction, screen coordinates.
     * @param {int} y Coordinate in y direction, screen coordinates.
     * @return Always returns false
     */
    hasPoint: function (x,y) {
        return false;
    },

    /**
     * Recalculate the coordinates of lower left corner and the width amd the height.
     * @private
     */
    update: function () {
        if (this.needsUpdate) {
            this.updateCoords();
            this.usrSize = [this.W(), this.H()];
            this.size = [this.usrSize[0]*this.board.unitX,this.usrSize[1]*this.board.unitY];
            this.updateTransform();
        }
        return this;
    },

    /**
     * Send an update request to the renderer.
     */
    updateRenderer: function () {
        if (this.needsUpdate) {
            this.board.renderer.updateImage(this);
            this.needsUpdate = false;
        }
        return this;
    },

    updateTransform: function () {
        if (this.transformations.length==0) {
            return;
        }
        for (var i=0;i<this.transformations.length;i++) {
            this.transformations[i].update();
        }
    },

    addTransform: function (transform) {
        if (JXG.isArray(transform)) {
            for (var i=0;i<transform.length;i++) {
                this.transformations.push(transform[i]);
            }
        } else {
            this.transformations.push(transform);
        }
    }
});

/**
 * @class Displays an image. 
 * @pseudo
 * @description Shows an image. The image can be supplied as an URL or an base64 encoded inline image 
 * like "data:image/png;base64, /9j/4AAQSkZJRgA..." or a function returning an URL: function(){ return 'xxx.png; }.
 * @constructor
 * @name Image
 * @type JXG.Image
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {String_Array_Array} url, [position of the top left vertice], [width,height] 
 * @example
 * var im = board.create('image', ['http://geonext.uni-bayreuth.de/fileadmin/geonext/design/images/logo.gif', [-3,1],[5,5]]);
 *
 * </pre><div id="9850cda0-7ea0-4750-981c-68bacf9cca57" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var image_board = JXG.JSXGraph.initBoard('9850cda0-7ea0-4750-981c-68bacf9cca57', {boundingbox: [-4, 4, 4, -4], axis: false, showcopyright: false, shownavigation: false});
 *   var image_im = image_board.create('image', ['http://jsxgraph.uni-bayreuth.de/distrib/images/uccellino.jpg', [-3,1],[5,5]]);
 * </script><pre>
 */
JXG.createImage = function(board, parents, attributes) {
    var url, attr;
    attr = JXG.copyAttributes(attributes, board.options, 'image');
    return new JXG.Image(board, parents[0], parents[1], parents[2], attr);
};

JXG.JSXGraph.registerElement('image', JXG.createImage);
