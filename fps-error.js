
  

// 执行第一次返回rAF或者setTimeout
// 执行第二次，给返回的rAF或者setTimeout传入参数执行
function CalcFps(){
    this.frame = 0;
    this.allFrameCount = 0;
    this.lastTime = Date.now();
    this.lastFameTime = Date.now();

}


CalcFps.prototype.loop =  function (raf) {


    var now = Date.now();
    var fs = (now - this.lastFameTime);
    var fps = Math.round(1000 / fs);
    var done = null;

  
    this.lastFameTime = now;
    // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
    this.allFrameCount++;
    this.frame++;

    if (now > 1000 + this.lastTime) {
        var fps = Math.round((this.frame * 1000) / (now - this.lastTime));
        console.log(`${new Date()} 1S内 FPS：`, fps);
        this.frame = 0;
        this.lastTime = now;
    };
    console.log("------this",this);
    console.log(this.loop);
    
    //另外一个方法种有问题
    if(window.webkitRequestAnimationFrame){

        done = window.webkitRequestAnimationFrame;

    }else if(window.requestAnimationFrame){

        done = window.requestAnimationFrame;

    }else{
        done = function (callback) {

            window.setTimeout(callback, 1000 / 60);
            
        }
    }

    var g =  done.bind(this);//将对应方法绑定到this上

    g(this.loop)


    /*
    this.requestAnimationFrame ||
    this.webkitRequestAnimationFrame||
    function (callback) {
        //callback带进来在这里使用
        this.setTimeout(callback, 1000 / 60);
    }
    */

    // this.raf(this.loop);



    //rAF()(this.loop); 
    // 先执行一次，返回函数，然后再传入回调，执行返回的函数
    // -----error1：Uncaught TypeError: Window.requestAnimationFrame: Argument 1 is not an object.
    //so：我输出了一下this，发现第二次是有问题的
    //第一次function loop()
    //第二次：undefined
    //第一次输出是object，第二次调用loop的，就是rAF,rAF里边的this就是window了
    //所以，第二次就找不到this.loop了


    //then,我试着将将rAF放进CalcFps内部，发现rAF内部因为原型链还是会跑到window
    //-----error2:Uncaught TypeError: this.rAF is not a function
    //第二轮的时候又回到了window，所以在window里边找不到rAF了
    

    //最后根据同事的提示，用原型链的方法，但是还是报错error2，why，
    //原型链从下往上找,找到了，现在的问题是从上怎么回来


    //然后我就考虑能不能把相关方法绑定到this上，绑是绑了，但是引擎不同意，报了一个错
    //-----error3:TypeError: "'requestAnimationFrame' called on an object that does not implement interface Window."



 }




//window.loop()

new CalcFps().loop()


