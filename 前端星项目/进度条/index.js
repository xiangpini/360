//沙漏进度条
class HourGlassProgress {
    constructor(container,opt){
        this.container = container;
        this.option = opt;
    }
    getProgressHtml(){
        const html = `<div class="hourglass-top">
                            <div class="hourglass-top-sand"></div>
                        </div>
                        <div class="hourglass-bottom">
                            <div class="hourglass-bottom-sand"></div>
                       </div>`;
        return html;
    }
    getProgressValue(){
        const $sand = this.container.querySelector('.hourglass-top-sand');
        const $glass = this.container.querySelector('.hourglass-top');
        let value = (1-($sand.offsetHeight/$glass.offsetHeight))*100;
        return value;
    }
    setProgressValue(value){ // 这里这个value是改变的百分比
        const $sand = this.container.querySelector('.hourglass-top-sand');
        const $glass = this.container.querySelector('.hourglass-top');
        value = $glass.offsetHeight/2-(value/100)*($glass.offsetHeight/2);
        this.changeProgressStyle(value);
    }
    changeProgressStyle(value){ // 这里这个value是改变之后上面阴影三角的像素
        const top = this.container.querySelector('.hourglass-top-sand');
        const bottom = this.container.querySelector('.hourglass-bottom-sand');
        top.style.borderWidth = value+'px';
        top.style.top = '-'+ value +'px';
        top.style.right = '-'+ value +'px';
        bottom.style.borderWidth = value+'px';
        bottom.style.top = '-'+ value +'px';
        bottom.style.right = '-'+ value +'px';
    }
    setProgressColor(bgColor,progressColor){
        if (bgColor){
            this.container.querySelector('.hourglass-top').style.borderTopColor = bgColor;
            this.container.querySelector('.hourglass-bottom-sand').style.borderBottomColor = bgColor;
        }
        if (progressColor){
            this.container.querySelector('.hourglass-top-sand').style.borderTopColor = progressColor;
            this.container.querySelector('.hourglass-bottom').style.borderBottomColor = progressColor;
        }
    }
}
//条形进度条
class BarProgress {
    constructor(container,opt){
        this.container = container;
        this.option = opt;
    }
    getProgressHtml(){
        const html = '<div class="bar">'+
            '            <div class="completed"></div>'+
            '        </div>';
        return html;
    }
    getProgressValue(){
        let $complete = this.container.querySelector('.completed');
        let $bar = this.container.querySelector('.bar');
        return ($complete.clientWidth/$bar.clientWidth)*100;
    }
    setProgressValue(value){
        let $bar = this.container.querySelector('.bar');
        value = (value/100)*$bar.clientWidth;
        this.changeProgressStyle(value);
    }
    changeProgressStyle(value){
        let complete = this.container.querySelector('.completed');
        complete.style.width = value+'px';
    }
    setProgressColor(bgColor,progressColor){
        if (bgColor)
            this.container.querySelector('.bar').style.background = bgColor;
        if (progressColor)
            this.container.querySelector('.completed').style.background = progressColor;
    }
}
//圆环进度条
class RingProgress {
    constructor(container,opt){
        this.container = container;
        this.option = opt;
    }
    getProgressHtml(){
        const html = `<svg xmlns="http://www.w3.org/200/svg" height="120" width="110">
                            <circle cx="55" cy="55" r="50" fill="none" stroke="#ccc" stroke-width="10" stroke-linecap="round"/>
                            <circle transform="rotate(-90,55 55)" class="demo2" id="J_demo2" cx="55" cy="55" r="50" fill="none" stroke="#aaa" stroke-width="10" stroke-dasharray="0,1000"/>
                        </svg>`;
        return html;
    }
    getProgressValue(){
        let demo2 =  document.querySelector(".demo2"),
            circleLength = Math.floor(2 * Math.PI * demo2.getAttribute("r")),
            nowLen = demo2.getAttribute("stroke-dasharray").split(',')[0];
        let value = (nowLen/circleLength)*100;
        return value;
    }
    setProgressValue(value){
        let val = parseFloat(value).toFixed(2);
        val = Math.max(0,val);
        val = Math.min(100,val);
        this.changeProgressStyle(val);
    }
    changeProgressStyle(value){
        const demo2 =  document.querySelector("#J_demo2");
        let circleLength = Math.floor(2 * Math.PI * demo2.getAttribute("r"));
        demo2.setAttribute("stroke-dasharray","" + circleLength * value / 100 + ",10000");
    }
    setProgressColor(bgColor,progressColor){
        if (bgColor)
            this.container.querySelectorAll('circle')[0].setAttribute('stroke',bgColor);
        if (progressColor)
            this.container.querySelectorAll('circle')[1].setAttribute('stroke',progressColor);
    }
}
class ProgressFactory{
    constructor(container,opt){
        this.container = container;
        this.option = opt || '';
    }
    init(){
        this.render();
        this.setProgressColor();
    }
    getProgressFromType(type){
        if (type === 'hourglass-progress'){
            return new HourGlassProgress(this.container,this.option);
        }
        if (type === 'bar-progress'){
            return new BarProgress(this.container,this.option);
        }
        if (type === 'ring-progress'){
            return new RingProgress(this.container,this.option);
        }
    }
    render(){
        let html = '';
        let type = this.option.type;
        let progress = this.getProgressFromType(type);
        html += progress.getProgressHtml();
        this.container.innerHTML = html;
    }
    getProgress(){
        let type = this.option.type;
        let progress = this.getProgressFromType(type);
        return progress.getProgressValue();
    }
    setProgress(value){
        let type = this.option.type;
        let progress = this.getProgressFromType(type);
        progress.setProgressValue(value);
    }
    setProgressColor(bgColor='#ccc',progressColor='#aaa'){
        let type = this.option.type;
        let progress = this.getProgressFromType(type);
        progress.setProgressColor(bgColor,progressColor);
    }
}

