'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _expect = require('expect');

var _createFieldArrayProps = require('../createFieldArrayProps');

var _createFieldArrayProps2 = _interopRequireDefault(_createFieldArrayProps);

var _plain = require('../structure/plain');

var _plain2 = _interopRequireDefault(_plain);

var _expectations = require('../structure/plain/expectations');

var _expectations2 = _interopRequireDefault(_expectations);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _expectations3 = require('../structure/immutable/expectations');

var _expectations4 = _interopRequireDefault(_expectations3);

var _addExpectations = require('./addExpectations');

var _addExpectations2 = _interopRequireDefault(_addExpectations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var describeCreateFieldProps = function describeCreateFieldProps(name, structure, expect) {
  var fromJS = structure.fromJS;
  var getIn = structure.getIn;
  var size = structure.size;

  var defaultProps = [getIn, 'foo'];

  describe(name, function () {
    it('should pass props through', function () {
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{ otherProp: 'hello' }])).otherProp).toBe('hello');
    });

    it('should pass props through using props prop', function () {
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{ props: { otherProp: 'hello' } }])).otherProp).toBe('hello');
    });

    it('should pass dirty/pristine through', function () {
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        dirty: false,
        pristine: true
      }])).meta.dirty).toBe(false);
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        dirty: false,
        pristine: true
      }])).meta.pristine).toBe(true);
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        dirty: true,
        pristine: false
      }])).meta.dirty).toBe(true);
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        dirty: true,
        pristine: false
      }])).meta.pristine).toBe(false);
    });

    it('should provide length', function () {
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS([]),
        length: 0
      }])).fields.length).toBe(0);
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a']),
        length: 1
      }])).fields.length).toBe(1);
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b']),
        length: 2
      }])).fields.length).toBe(2);
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b', 'c']),
        length: 3
      }])).fields.length).toBe(3);
    });

    it('should provide errors', function () {
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{ syncError: 'Sync Error' }])).meta.error).toBe('Sync Error');
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{ syncError: 'Sync Error' }])).meta.valid).toBe(false);
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{ syncError: 'Sync Error' }])).meta.invalid).toBe(true);
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{ syncWarning: 'Sync Warning' }])).meta.warning).toBe('Sync Warning');
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        asyncError: 'Async Error'
      }])).meta.error).toBe('Async Error');
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        asyncError: 'Async Error'
      }])).meta.valid).toBe(false);
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        asyncError: 'Async Error'
      }])).meta.invalid).toBe(true);
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        submitError: 'Submit Error'
      }])).meta.error).toBe('Submit Error');
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        submitError: 'Submit Error'
      }])).meta.valid).toBe(false);
      expect(_createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        submitError: 'Submit Error'
      }])).meta.invalid).toBe(true);
    });

    it('should provide move', function () {
      var arrayMove = (0, _expect.createSpy)();
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b', 'c']),
        arrayMove: arrayMove
      }]));
      expect(result.fields.move).toBeA('function');
      expect(arrayMove).toNotHaveBeenCalled();
      expect(result.fields.move(0, 2)).toNotExist();
      expect(arrayMove).toHaveBeenCalled().toHaveBeenCalledWith(0, 2);
    });

    it('should provide push', function () {
      var arrayPush = (0, _expect.createSpy)();
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b']),
        arrayPush: arrayPush
      }]));
      expect(result.fields.push).toBeA('function');
      expect(arrayPush).toNotHaveBeenCalled();
      expect(result.fields.push('c')).toNotExist();
      expect(arrayPush).toHaveBeenCalled().toHaveBeenCalledWith('c');
    });

    it('should provide pop', function () {
      var arrayPop = (0, _expect.createSpy)();
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b', 'c']),
        length: 3,
        arrayPop: arrayPop
      }]));
      expect(result.fields.pop).toBeA('function');
      expect(arrayPop).toNotHaveBeenCalled();
      expect(result.fields.pop()).toBe('c');
      expect(arrayPop).toHaveBeenCalled().toHaveBeenCalledWith();
    });

    it('should provide insert', function () {
      var arrayInsert = (0, _expect.createSpy)();
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b']),
        arrayInsert: arrayInsert
      }]));
      expect(result.fields.insert).toBeA('function');
      expect(arrayInsert).toNotHaveBeenCalled();
      expect(result.fields.insert(1, 'c')).toNotExist();
      expect(arrayInsert).toHaveBeenCalled().toHaveBeenCalledWith(1, 'c');
    });

    it('should provide remove', function () {
      var arrayRemove = (0, _expect.createSpy)();
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b']),
        arrayRemove: arrayRemove
      }]));
      expect(result.fields.remove).toBeA('function');
      expect(arrayRemove).toNotHaveBeenCalled();
      expect(result.fields.remove(2)).toNotExist();
      expect(arrayRemove).toHaveBeenCalled().toHaveBeenCalledWith(2);
    });

    it('should provide removeAll', function () {
      var arrayRemoveAll = (0, _expect.createSpy)();
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b']),
        arrayRemoveAll: arrayRemoveAll
      }]));
      expect(result.fields.removeAll).toBeA('function');
      expect(arrayRemoveAll).toNotHaveBeenCalled();
      expect(result.fields.removeAll()).toNotExist();
      expect(arrayRemoveAll).toHaveBeenCalled().toHaveBeenCalledWith();
    });

    it('should provide unshift', function () {
      var arrayUnshift = (0, _expect.createSpy)();
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b']),
        arrayUnshift: arrayUnshift
      }]));
      expect(result.fields.unshift).toBeA('function');
      expect(arrayUnshift).toNotHaveBeenCalled();
      expect(result.fields.unshift('c')).toNotExist();
      expect(arrayUnshift).toHaveBeenCalled().toHaveBeenCalledWith('c');
    });

    it('should provide shift', function () {
      var arrayShift = (0, _expect.createSpy)();
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b', 'c']),
        arrayShift: arrayShift
      }]));
      expect(result.fields.shift).toBeA('function');
      expect(arrayShift).toNotHaveBeenCalled();
      expect(result.fields.shift()).toBe('a');
      expect(arrayShift).toHaveBeenCalled().toHaveBeenCalledWith();
    });

    it('should provide forEach', function () {
      var callback = (0, _expect.createSpy)();
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b', 'c'])
      }]));
      expect(result.fields.forEach).toBeA('function');
      expect(callback).toNotHaveBeenCalled();
      result.fields.forEach(callback);
      expect(callback).toHaveBeenCalled();
      expect(callback.calls.length).toBe(3);
      expect(callback.calls[0].arguments).toEqual(['foo[0]', 0]);
      expect(callback.calls[1].arguments).toEqual(['foo[1]', 1]);
      expect(callback.calls[2].arguments).toEqual(['foo[2]', 2]);
    });

    it('should provide map', function () {
      var callback = (0, _expect.createSpy)(function (name) {
        return { whatever: true, name: name };
      }).andCallThrough();
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b', 'c']),
        length: 3
      }]));
      expect(result.fields.map).toBeA('function');
      expect(callback).toNotHaveBeenCalled();
      var mapResult = result.fields.map(callback);
      expect(size(mapResult), 3);
      expect(getIn(mapResult, 0)).toEqual({ whatever: true, name: 'foo[0]' });
      expect(getIn(mapResult, 1)).toEqual({ whatever: true, name: 'foo[1]' });
      expect(getIn(mapResult, 2)).toEqual({ whatever: true, name: 'foo[2]' });
      expect(callback).toHaveBeenCalled();
      expect(callback.calls.length).toBe(3);
      expect(callback.calls[0].arguments).toEqual(['foo[0]', 0]);
      expect(callback.calls[1].arguments).toEqual(['foo[1]', 1]);
      expect(callback.calls[2].arguments).toEqual(['foo[2]', 2]);
    });

    it('should provide reduce', function () {
      var callback = (0, _expect.createSpy)(function (accumulator, name) {
        return _extends({}, accumulator, _defineProperty({}, name, { whatever: true, name: name }));
      }).andCallThrough();
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b', 'c']),
        length: 3
      }]));
      expect(result.fields.reduce).toBeA('function');
      expect(callback).toNotHaveBeenCalled();
      var reduceResult = result.fields.reduce(callback, {});
      expect(size(reduceResult), 3);
      expect(reduceResult['foo[0]']).toEqual({ whatever: true, name: 'foo[0]' });
      expect(reduceResult['foo[1]']).toEqual({ whatever: true, name: 'foo[1]' });
      expect(reduceResult['foo[2]']).toEqual({ whatever: true, name: 'foo[2]' });
      expect(callback).toHaveBeenCalled();
      expect(callback.calls.length).toBe(3);
      expect(callback.calls[0].arguments).toEqual([{}, 'foo[0]', 0]);
      expect(callback.calls[1].arguments).toEqual([{
        'foo[0]': { whatever: true, name: 'foo[0]' }
      }, 'foo[1]', 1]);
      expect(callback.calls[2].arguments).toEqual([{
        'foo[0]': { whatever: true, name: 'foo[0]' },
        'foo[1]': { whatever: true, name: 'foo[1]' }
      }, 'foo[2]', 2]);
    });

    it('should provide reduce when no value', function () {
      var callback = (0, _expect.createSpy)(function (accumulator, name) {
        return _extends({}, accumulator, _defineProperty({}, name, { whatever: true, name: name }));
      }).andCallThrough();
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{}]));
      expect(result.fields.reduce).toBeA('function');
      expect(callback).toNotHaveBeenCalled();
      var reduceResult = result.fields.reduce(callback, {});
      expect(size(reduceResult), 0);
      expect(callback).toNotHaveBeenCalled();
    });

    it('should provide swap', function () {
      var arraySwap = (0, _expect.createSpy)();
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        arraySwap: arraySwap,
        value: fromJS(['a', 'b', 'c'])
      }]));
      expect(result.fields.swap).toBeA('function');
      expect(arraySwap).toNotHaveBeenCalled();
      expect(result.fields.swap(0, 2)).toNotExist();
      expect(arraySwap).toHaveBeenCalled().toHaveBeenCalledWith(0, 2);
    });

    it('should provide a _isFieldArray meta prop', function () {
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b', 'c'])
      }]));
      expect(result.fields._isFieldArray).toBe(true);
    });

    it('should pass name through to the fields prop', function () {
      var result = _createFieldArrayProps2.default.apply(undefined, defaultProps.concat([{
        value: fromJS(['a', 'b', 'c'])
      }]));
      expect(result.fields.name).toBe('foo');
    });
  });
};

describeCreateFieldProps('createFieldArrayProps.plain', _plain2.default, (0, _addExpectations2.default)(_expectations2.default));
describeCreateFieldProps('createFieldArrayProps.immutable', _immutable2.default, (0, _addExpectations2.default)(_expectations4.default));