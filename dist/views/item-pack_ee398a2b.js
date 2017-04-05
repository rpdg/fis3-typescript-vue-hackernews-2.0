;/*!views/item/item*/
define("views/item/item",function(e,t,i){"use strict";function n(e){return e.dispatch("FETCH_ITEMS",{ids:[e.state.route.params.id]})}function s(e,t){return t.kids?e.dispatch("FETCH_ITEMS",{ids:t.kids}).then(function(){return Promise.all(t.kids.map(function(t){return s(e,e.state.items[t])}))}):void 0}function a(e){return n(e).then(function(){var t=e.state,i=t.items,n=t.route;return s(e,i[n.params.id])})}var m=e("components/Spinner"),r=e("components/Comment");i.exports={name:"item-view",components:{Spinner:m.default,Comment:r.default},data:function(){return{loading:!0}},computed:{item:function(){return this.$store.state.items[this.$route.params.id]}},preFetch:n,beforeMount:function(){var e=this;a(this.$store).then(function(){e.loading=!1})}};var o;o=t&&t.__esModule&&t.default?t.default:i.exports,o.render=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.item?i("div",{staticClass:"item-view"},[e.item?[i("div",{staticClass:"item-view-header"},[i("a",{attrs:{href:e.item.url,target:"_blank"}},[i("h1",[e._v(e._s(e.item.title))])]),e.item.url?i("span",{staticClass:"host"},[e._v("("+e._s(e._f("host")(e.item.url))+")")]):e._e(),i("p",{staticClass:"meta"},[e._v(e._s(e.item.score)+" points | by"),i("router-link",{attrs:{to:"/user/"+e.item.by}},[e._v(e._s(e.item.by))]),e._v(e._s(e._f("timeAgo")(e.item.time))+" ago")],1)]),i("div",{staticClass:"item-view-comments"},[i("p",{staticClass:"item-view-comments-header"},[e._v(e._s(e.item.kids?e.item.descendants+" comments":"No comments yet.")),i("spinner",{attrs:{show:e.loading}})],1),e.loading?e._e():i("ul",{staticClass:"comment-children"},e._l(e.item.kids,function(e){return i("comment",{key:e,attrs:{id:e}})}))])]:e._e()],2):e._e()},o.staticRenderFns=[],function(e){var t=document.createElement("style");t.setAttribute("type","text/css"),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),document.getElementsByTagName("head")[0].appendChild(t)}(".item-view-header{background-color:#fff;padding:1.8em 2em 1em;box-shadow:0 1px 2px rgba(0,0,0,.1)}.item-view-header h1{display:inline;font-size:1.5em;margin:0;margin-right:.5em}.item-view-header .host,.item-view-header .meta,.item-view-header .meta a{color:#999}.item-view-header .meta a{text-decoration:underline}.item-view-comments{background-color:#fff;margin-top:10px;padding:0 2em .5em}.item-view-comments-header{margin:0;font-size:1.1em;padding:1em 0;position:relative}.item-view-comments-header .spinner{position:absolute;top:0;right:0;bottom:auto}.comment-children{list-style-type:none;padding:0;margin:0}@media (max-width:600px){.item-view-header h1{font-size:1.25em}}")});