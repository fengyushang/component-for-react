export class Emmit{
    constructor(log = {}){
        this.log = log;
    }
    on(type,callback){
        if(!this.log[type]){
            this.log[type] = [];
        }
        this.log[type].push(callback);
        return ()=>{
            this.off(type,callback);
        }
    }
    off(type,callback){
        this.log[type].splice(this.log[type].indexOf(callback),1)
    }
    emit(type,argument){
        if(this.log[type]){
           this.log[type].forEach((log)=>{
              log(argument);
           });
        }
        if(type !== '*') this.emit('*',argument);
    }
}

export const Event = new Emmit;
export const FORM_FIELD_CHANGE = 'FORM_FIELD_CHANGE';
