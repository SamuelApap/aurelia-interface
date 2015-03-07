export function splitClass(str){
    return str.split(/\s*,\s*/);
}


export class ComponentTools{

    constructor(){
        this.count = 1;
    }

    generateId(name){

        name = `${name}-${this.count}`
        this.count++;
        return name;
    }
}



export class Util{
    isFalse(property){
        return ((property === false) && property !== undefined)
    }
    join(){
        for(let index in arguments){
            index && (arguments[0]+= arguments[index]);
        }
        return arguments[0];
    }
    previousSibling(name){
        return this.previousExists() ? this.element.previousElementSibling[name] : this.element.previousElementSibling
    }

    nextSibling(name){
        return this.nextExists() ? this.element.nextElementSibling[name] : this.element.nextElementSibling
    }

    previousExists(){
        return this.siblingExists('previous');
    }

    nextExists(){
        return this.siblingExists('next');
    }

    siblingExists(side){
        var exists  = this.join('_', side, 'Exists'),
            sibling = this.join(side, 'ElementSibling');
        this[exists] = (this.isFalse(this[exists])) || ( this.element[sibling] && this.element[sibling].hasOwnProperty(defaults.name) ) || false;
        return this[exists];
    }

    findParent(name){
        this._parentExixts = (!!this.parentExists(name))
        return this._parentExixts && this.parentExists(name);
    }

    parentExists(name, el){
        el = el || this.element;
        return this.isParent(name, el.parentElement) ? el.parentElement[name] : (this.parentExists(name, el.parentElement))
        if(this.isParent(name, el.parentElement)){
            return el.parentElement[name]
        } else {
            return this.parentExists(name, el.parentElement)
        }
    }

    isParent(name, el){
        el = el || this.element;
        return el.hasOwnProperty(name) ? true : (el[name] ? true : false);
    }

    all(selector, el){
        el = el || this.element;
        return el.querySelectorAll(selector);
    }
    allClass(){
        el = el || this.element;
        return el.getElementsByClassName(selector);
    }
    allTag(selector, el){
        el = el || this.element;
        return el.getElementsByTagName(selector);
    }
    find(selector, el){
        el = el || this.element;
        return el.querySelectorAll(selector)[0];
    }
    findClass(){
        el = el || this.element;
        return el.getElementsByClassName(selector)[0];
    }
    findTag(selector, el){
        el = el || this.element;
        return el.getElementsByTagName(selector)[0];
    }

    get classList(){
        return this.element.classList;
    }

    _handleEvent(name, event, prevent){
        prevent && event.preventDefault();
        this[`${name}`](event)
    }



}

export function zip(){
    var zipped = [];
    var maxLength = 0;
    var index     = 0;
    var itemIndex = 0;
    for (var i = 0; i < arguments.length; i++) {
        if(arguments[i].length > maxLength){maxLength = arguments[i].length}
    };

    while(zipped.length < arguments.length){
        zipped[index] = zipped[index] || [];
        for (var i = 0; i < arguments.length; i++) {
            if(arguments[i][0]){
                var item = arguments[i].shift();
                zipped[index].push(item)
            } else {
                delete zipped[index]
            }
        };
        index++
    }
    return zipped
}
