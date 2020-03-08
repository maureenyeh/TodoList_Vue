var app = new Vue({
  el: '#app',
  data: {
    newTodo:'',
    Todos:[
      {
       id:'123',
       title:'新任務',
       completed:false
      }
    ],
    cacheTitle:'',
    cacheTodo:{},
    visibility:'all'
  },
  computed:{
    filterTodos(){
     let refreshTodos = [];
     //改寫頁籤內容顯示判斷式
      switch (this.visibility) {
        case 'all':
          return this.Todos;
          break;
        case 'processing':
          refreshTodos=this.Todos.filter(function(item){
            return !item.completed;
          });
          return refreshTodos;
          break;
        case 'finished':
          refreshTodos =this.Todos.filter(function (item) {
            return item.completed;
          });
          return refreshTodos;
          break;
      }
      //#region  頁籤內容if判斷式
      // if(this.visibility=='all')
      // {
      //   refreshTodos= this.Todos;
      // }else if(this.visibility == 'processing')
      // {
      //   this.Todos.forEach(function(item){
      //     if(!item.completed){
      //       refreshTodos.push(item);
      //     }
      //  });
      // }else if(this.visibility == 'finished')
      // {
      //   this.Todos.forEach(function (item) {
      //     if (item.completed) {
      //       refreshTodos.push(item);
      //     }
      //   });
      // }
      // return refreshTodos;
      //#endregion
    },
    countCompleted(){
      let count=this.Todos.filter(function(item){
        return  item.completed===false;
      })

      return count.length;
    },
    cleanTodos(){
      let check= confirm('是否確定清除全部資料？')
      if(check)
      {this.Todos=[];}
      else
      { return;}
    }
  },
  methods:{
    addTodo:function(){
      // console.log(this.newTodo);
      let value=this.newTodo.trim(); //去掉空白鍵問題
      let timestamp=Math.floor(Date.now()); //利用時間戳記產生id，並取其正整數
      if(!value) //在 if 判斷式裡會自動將 null、undefined、NaN 的值轉換為 false
      {return;}
      this.Todos.push({
        id: timestamp,
        title:value,
        completed:false,
       })
       this.newTodo='';
    },
    removeTodo:function(todo){
      let newIndex= this.Todos.findIndex(function (item, index) {
        return todo.id === item.id;
      });
      
       this.Todos.splice(newIndex,1); //splice是刪除陣列資料語法（刪除位置，刪除筆數）
    },
    editTodo:function(item){
      // console.log(item);
      this.cacheTodo=item;
      this.cacheTitle=item.title;
    },
    cancelEdit:function(){
      this.cacheTodo={};
    },
    doneEdit(item){
      if (!this.cacheTitle.trim()) {
        alert('資料不得空白');
        return;
      }
      item.title=this.cacheTitle;
      this.cacheTodo={};
      this.cacheTitle='';
    }
  }
});