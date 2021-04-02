let timer  = new Timer();
//timer.OnTick = (ms)=>{
//	console.log(ms);
//}
timer.Start();


class Timer {
	constructor(){
      this._timerId = null;
      this._value = 0;
      this._startTime = null;
      this._tryUpdateEveryMs = 1000;
    }

    OnTick = ()=>{}  
  
  	Start(){
        this._reset(); // исключаем ситуацию, что когда либо можно запустить несколько 
      	this._startTime = new Date();
      	this._nextTick();	
    }

  	Stop(){
      	this._reset();
    }
  
  	GetValue(){
    	return this._value;
    }
  	
  	_nextTick(){
      this._value = (new Date()) - this._startTime;
      this.OnTick(this._value);
      
      this._timerId = setTimeout(this._nextTick.bind(this), this._tryUpdateEveryMs);
    }
  
    _reset(){
      if(this._timerId != null)	
      	clearTimeout(this._timerId);
      
      this._timerId = null;
      this._value = 0;
    }
  

}