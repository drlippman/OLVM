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

JXG.extend(JXG.Options, {
    square: {
        points: {
            withLabel: false,
            visible: false,
            name: ''
        },
        lines: {
            straightFirst: false,
            straightLast: false,
            withLabel: true
        }
    }
});

/**
 * @class A square is a rectangle with four sides each of the same length.
 * @pseudo
 * @name Square
 * @augments JXG.Composition
 * @constructor
 * @type JXG.Composition
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point} p1,p2 To build the square two additional points will be created. Those will be placed
 * at a pi/2 rotation of the two given points around the center of the square.
 * @example
 * var p1 = board.create('point', [2.0, 2.0]),
 *     p2 = board.create('point', [1.0, 0.5]),
 *
 *     a = board.create('square', [p1, p2]);
 * </pre><div id="3558cfad-59f0-4385-8602-7ac14cded0df" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('3558cfad-59f0-4385-8602-7ac14cded0df', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *       p1 = board.create('point', [2.0, 2.0]),
 *       p2 = board.create('point', [1.0, 0.5]),
 *
 *       a = board.create('square', [p1, p2]);
 * })();
 * </script><pre>
 */
JXG.createSquare = function(board, parents, attributes) {
    var p1, p2, p3, p4, l1, l2, l3, l4, ret, i, attr;
    
    if(JXG.isPoint(parents[0]) && JXG.isPoint(parents[1])) {
        p1 = parents[0];
        p2 = parents[1];

        attr = JXG.copyAttributes(attributes, board.options, 'square', 'points');

        p3 = board.create('point', [
                function () {
                    return (-p1.Y() + (p1.X() + p2.X())/2 + (p1.Y() + p2.Y())/2);
                },
                function () {
                    return (p1.X() - (p1.X() + p2.X())/2 + (p1.Y() + p2.Y())/2);
                }
            ], attr);

        p4 = board.create('point', [
                function () {
                    return (-p2.Y() + (p1.X() + p2.X())/2 + (p1.Y() + p2.Y())/2);
                },
                function () {
                    return (p2.X() - (p1.X() + p2.X())/2 + (p1.Y() + p2.Y())/2);
                }
            ], attr);
        
        attr = JXG.copyAttributes(attributes, board.options, 'square', 'lines');
        l1 = board.create('line', [p1, p3], attr);
        l2 = board.create('line', [p1, p4], attr);
        l3 = board.create('line', [p2, p3], attr);
        l4 = board.create('line', [p2, p4], attr);
        
        ret = new JXG.Composition(/** @lends Square.prototype */{
            /**
             * Contains the square's points. The first two points are the ones given as parent elements by the user.
             * The third and the fourth point are a rotation of pi/2 of the first resp. the second point around the
             * center of the square.
             * @type Array
             */
            points: [p1, p2, p3, p4],

            /**
             * Contains the square's stroke lines. The first line is the one from the point 1 to point 3, the second line
             * the one from point 1 to point 4. The same with the third and the fourth line but with point 2 instead of
             * point 1. The order of the points is the same as in {@link Square#points}.
             * @type Array
             */
            lines: [l1, l2, l3, l4]
        });

        for(i = 1; i <= 4; i++) {
            ret['point'+i] = ret.points[i-1];
            ret['line'+i] = ret.lines[i-1];
        }

        return ret;
    } else {
        throw new Error("JSXGraph: Can't create square with parent types '" + (typeof parents[0]) + "' and '" + (typeof parents[1]) + "'.");
    }
};

JXG.JSXGraph.registerElement('square', JXG.createSquare);
