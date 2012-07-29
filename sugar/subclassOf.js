function subclassOf(base) {
    _subclassOf.prototype= base.prototype;
    return new _subclassOf();
}
function _subclassOf() {};