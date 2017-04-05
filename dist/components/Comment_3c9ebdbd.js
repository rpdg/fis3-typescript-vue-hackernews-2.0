define("components/Comment",function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"comment",props:["id"],data:function(){return{open:!0}},computed:{comment:function(){return this.$store.state.items[this.id]}},methods:{pluralize:function(e){return e+(1===e?" reply":" replies")}}};var n;n=t&&t.__esModule&&t.default?t.default:o.exports,n.render=function(){var e=this,t=e.$createElement,o=e._self._c||t;return e.comment?o("li",{staticClass:"comment"},[o("div",{staticClass:"by"},[o("router-link",{attrs:{to:"/user/"+e.comment.by}},[e._v(e._s(e.comment.by))]),e._v(e._s(e._f("timeAgo")(e.comment.time))+" ago")],1),o("div",{staticClass:"text",domProps:{innerHTML:e._s(e.comment.text)}}),e.comment.kids&&e.comment.kids.length?o("div",{staticClass:"toggle","class":{open:e.open}},[o("a",{on:{click:function(){e.open=!e.open}}},[e._v(e._s(e.open?"[-]":"[+] "+e.pluralize(e.comment.kids.length)+" collapsed"))])]):e._e(),o("ul",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],staticClass:"comment-children"},e._l(e.comment.kids,function(e){return o("comment",{key:e,attrs:{id:e}})}))]):e._e()},n.staticRenderFns=[],function(e){var t=document.createElement("style");t.setAttribute("type","text/css"),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),document.getElementsByTagName("head")[0].appendChild(t)}(".comment-children .comment-children{margin-left:1.5em}.comment{border-top:1px solid #eee;position:relative}.comment .by,.comment .text,.comment .toggle{font-size:.9em;margin:1em 0}.comment .by{color:#999}.comment .by a{color:#999;text-decoration:underline}.comment .text{overflow-wrap:break-word}.comment .text a:hover{color:#f60}.comment .text pre{white-space:pre-wrap}.comment .toggle{background-color:#fffbf2;padding:.3em .5em;border-radius:4px}.comment .toggle a{color:#999;cursor:pointer}.comment .toggle.open{padding:0;background-color:transparent;margin-bottom:-.5em}")});