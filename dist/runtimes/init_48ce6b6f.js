;/*!runtimes/filters/filters*/
define("runtimes/filters/filters",function(t,e){"use strict";function n(t){var e=t.replace(/^https?:\/\//,"").replace(/\/.*$/,""),n=e.split(".").slice(-3);return"www"===n[0]&&n.shift(),n.join(".")}function r(t){var e=Date.now()/1e3-Number(t);return 3600>e?i(~~(e/60)," minute"):86400>e?i(~~(e/3600)," hour"):i(~~(e/86400)," day")}function i(t,e){return 1===t?t+e:t+e+"s"}e.host=n,e.timeAgo=r});
;/*!runtimes/router/router*/
define("runtimes/router/router",function(e,t){"use strict";var o=e("node_modules/vue/dist/vue"),n=e("node_modules/vue-router/dist/vue-router.common");o.use(n);var u=function(t){return function(o){e.async(["views/createListView"],function(e){o(e.createListView(t))})}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=new n({mode:"hash",scrollBehavior:function(){return{x:0,y:0}},routes:[{path:"/top/:page(\\d+)?",component:u("top")},{path:"/new/:page(\\d+)?",component:u("new")},{path:"/show/:page(\\d+)?",component:u("show")},{path:"/ask/:page(\\d+)?",component:u("ask")},{path:"/job/:page(\\d+)?",component:u("job")},{path:"/item/:id(\\d+)",component:function(t){e.async(["views/item/item"],t)}},{path:"/user/:id",component:function(t){e.async(["views/user/user"],t)}},{path:"*",redirect:"/top"}]})});
;/*!runtimes/store/create-api*/
define("runtimes/store/create-api",function(e,a){"use strict";var s=e("node_modules/firebase/app");e("node_modules/firebase/database");var t={databaseURL:"https://hacker-news.firebaseio.com"},i="/v0";s.initializeApp(t);var r=s.database().ref(i);Object.defineProperty(a,"__esModule",{value:!0}),a.default=r});
;/*!runtimes/store/api*/
define("runtimes/store/api",function(e,t){"use strict";function n(){c((f.default.cachedIds.top||[]).slice(0,30)),setTimeout(n,9e5)}function a(e){var t=f.default.cachedItems;return t&&t.has(e)?Promise.resolve(t.get(e)):new Promise(function(n,a){f.default.child(e).once("value",function(a){var r=a.val();r&&(r.__lastUpdated=Date.now()),t&&t.set(e,r),n(r)},a)})}function r(e){return f.default.cachedIds&&f.default.cachedIds[e]?Promise.resolve(f.default.cachedIds[e]):a(e+"stories")}function u(e){return a("item/"+e)}function c(e){return Promise.all(e.map(function(e){return u(e)}))}function i(e){return a("user/"+e)}function s(e,t){var n=!0,a=f.default.child(e+"stories"),r=function(e){n?n=!1:t(e.val())};return a.on("value",r),function(){a.off("value",r)}}var f=e("runtimes/store/create-api");f.default.onServer&&!f.default.warmCacheStarted&&(f.default.warmCacheStarted=!0,n()),t.fetchIdsByType=r,t.fetchItem=u,t.fetchItems=c,t.fetchUser=i,t.watchList=s});
;/*!runtimes/store/store*/
define("runtimes/store/store",function(e,t){"use strict";var r=e("node_modules/vue/dist/vue"),n=e("node_modules/vuex/dist/vuex"),s=e("runtimes/store/api");r.use(n);var i=new n.Store({state:{activeType:null,itemsPerPage:20,items:{},users:{},lists:{top:[],"new":[],show:[],ask:[],job:[]}},actions:{FETCH_LIST_DATA:function(e,t){var r=e.commit,n=e.dispatch,i=(e.state,t.type);return r("SET_ACTIVE_TYPE",{type:i}),s.fetchIdsByType(i).then(function(e){return r("SET_LIST",{type:i,ids:e})}).then(function(){return n("ENSURE_ACTIVE_ITEMS")})},ENSURE_ACTIVE_ITEMS:function(e){var t=e.dispatch,r=e.getters;return t("FETCH_ITEMS",{ids:r.activeIds})},FETCH_ITEMS:function(e,t){var r=e.commit,n=e.state,i=t.ids,u=Date.now();return i=i.filter(function(e){var t=n.items[e];return t?u-t.__lastUpdated>18e4?!0:!1:!0}),i.length?s.fetchItems(i).then(function(e){return r("SET_ITEMS",{items:e})}):Promise.resolve()},FETCH_USER:function(e,t){var r=e.commit,n=e.state,i=t.id;return n.users[i]?Promise.resolve(n.users[i]):s.fetchUser(i).then(function(e){return r("SET_USER",{user:e})})}},mutations:{SET_ACTIVE_TYPE:function(e,t){var r=t.type;e.activeType=r},SET_LIST:function(e,t){var r=t.type,n=t.ids;e.lists[r]=n},SET_ITEMS:function(e,t){var n=t.items;n.forEach(function(t){t&&r.set(e.items,t.id,t)})},SET_USER:function(e,t){var n=t.user;r.set(e.users,n.id,n)}},getters:{activeIds:function(e){var t=e.activeType,r=e.itemsPerPage,n=e.lists,s=Number(e.route.params.page)||1;if(t){var i=(s-1)*r,u=s*r;return n[t].slice(i,u)}return[]},activeItems:function(e,t){return t.activeIds.map(function(t){return e.items[t]}).filter(function(e){return e})}}});Object.defineProperty(t,"__esModule",{value:!0}),t.default=i});
;/*!runtimes/views/app*/
define("runtimes/views/app",function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={};var i;i=t&&t.__esModule&&t.default?t.default:a.exports,i.render=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("header",{staticClass:"header"},[a("nav",{staticClass:"inner"},[a("router-link",{attrs:{to:"/",exact:""}},[a("img",{staticClass:"logo",attrs:{src:"/fis3-typescript-vue-hackernews-2.0/dist/public/logo-48_3c404239.png",alt:"logo"}})]),a("router-link",{attrs:{to:"/top"}},[e._v("Top")]),a("router-link",{attrs:{to:"/new"}},[e._v("New")]),a("router-link",{attrs:{to:"/show"}},[e._v("Show")]),a("router-link",{attrs:{to:"/ask"}},[e._v("Ask")]),a("router-link",{attrs:{to:"/job"}},[e._v("Jobs")]),a("a",{staticClass:"github",attrs:{href:"https://github.com/vuejs/vue-hackernews-2.0",target:"_blank"}},[e._v("Built with Vue.js")])],1)]),a("transition",{attrs:{name:"fade",mode:"out-in"}},[a("router-view",{staticClass:"view"})],1)],1)},i.staticRenderFns=[],function(e){var t=document.createElement("style");t.setAttribute("type","text/css"),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),document.getElementsByTagName("head")[0].appendChild(t)}('body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;font-size:15px;background-color:#f2f3f5;margin:0;padding-top:55px;color:#34495e;overflow-y:scroll}a{color:#34495e;text-decoration:none}.header{background-color:#f60;position:fixed;z-index:999;height:55px;top:0;left:0;right:0}.header .inner{max-width:800px;box-sizing:border-box;margin:0 auto;padding:15px 5px}.header a{color:rgba(255,255,255,.8);line-height:24px;-webkit-transition:color .15s ease;transition:color .15s ease;display:inline-block;vertical-align:middle;font-weight:300;letter-spacing:.075em;margin-right:1.8em}.header a:hover{color:#fff}.header a.router-link-active{color:#fff;font-weight:400}.header a:nth-child(6){margin-right:0}.header .github{color:#fff;font-size:.9em;margin:0;float:right}.logo{width:24px;margin-right:10px;display:inline-block;vertical-align:middle}.view{max-width:800px;margin:0 auto;position:relative}.fade-enter-active,.fade-leave-active{-webkit-transition:all .2s ease;transition:all .2s ease}.fade-enter,.fade-leave-active{opacity:0}@media (max-width:860px){.header .inner{padding:15px 30px}}@media (max-width:600px){body{font-size:14px}.header .inner{padding:15px}.header a{margin-right:1em}.header .github{display:none}}')});
;/*!app*/
define("app",function(e,t){"use strict";var u=e("node_modules/tslib/tslib"),r=e("node_modules/vue/dist/vue"),s=e("node_modules/vuex-router-sync/index"),n=e("runtimes/filters/filters");Object.keys(n).forEach(function(e){r.filter(e,n[e])});var o=e("runtimes/router/router"),i=e("runtimes/store/store"),d=e("runtimes/views/app");s.sync(i.default,o.default);var l=new r(u.__assign({router:o.default,store:i.default},d.default)).$mount("#app");Object.defineProperty(t,"__esModule",{value:!0}),t.default=l});
;/*!boot*/
define("boot",function(e){"use strict";e("node_modules/es6-promise/dist/es6-promise").polyfill(),e.async(["app"])});