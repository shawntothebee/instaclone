var app = new Vue({
  el: '#app',
  data: {
    title: 'Hello World!',
    users: [2,3,4,5,6],
    link: 'http://www.google.com/',
    counter: 0,
    x: 0,
    y: 0
  },
  methods: {
    changeTitle: function(event){
      this.title = event.target.value;
    },
    sayHello: function (){
      return this.title;
    },
    increase: function(step){
      this.counter += step;
    },
    updateCoordinates(event){
      this.x = event.clientX;
      this.y = event.clientY;
    }
  }
});
