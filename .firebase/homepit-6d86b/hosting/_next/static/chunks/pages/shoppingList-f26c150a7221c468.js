(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[277],{86747:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/shoppingList",function(){return i(51035)}])},51035:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return ShoppingList}});var n=i(85893),s=i(67294),r=i(84053),a=i(69417),l=i(11994),d=i(5616),o=i(10586),c=i(50720),h=i(78835),p=i(41733),u=i(7906),g=i(295),x=i(53252),_=i(72882),j=i(53184),f=i(53816),m=i(90629);function ShoppingList(){let[e,t]=s.useState([]),[i,S]=s.useState([]),[Z,b]=s.useState([]),[L,w]=s.useState(),[y,v]=s.useState(),[k,C]=s.useState(),[E,I]=s.useState(),[N,D]=s.useState(!1),[q,P]=s.useState(!1),U=(0,r.useSupabaseClient)();U.auth.getUser().then(e=>{try{I(e.data.user.id)}catch(e){}});let upsertShoppingList=async e=>{e.preventDefault();try{let{data:e}=await U.from("Shopping Lists").upsert([{list_start_date:y,list_end_date:k,user_id:E}]);return e}catch(e){console.error(e)}};(0,s.useEffect)(()=>{let readShoppingLists=async()=>{try{let e=await U.from("Shopping Lists").select("list_id, list_start_date, list_end_date"),t=e.data;b(t),console.log(await U.auth.getUser())}catch(e){console.error(e)}};readShoppingLists()},[]);let deleteShoppingList=async e=>{try{let t=await U.from("Shopping Lists").delete().match({list_id:e});console.log(t.data),b(Z.filter(t=>t.list_id!==e))}catch(e){console.error(e)}};return(0,s.useEffect)(()=>{let readIngredient=async()=>{try{let e=await U.from("Ingredients").select("ing_id, ing_name"),t=e.data;S(t),console.log(await U.auth.getUser())}catch(e){console.error(e)}};readIngredient()},[]),(0,s.useEffect)(()=>{let readListIngredient=async()=>{try{let e=await U.from("Shopping List Ingredients").select("ing_id, list_id, ing_qnt_to_buy"),i=e.data;t(i)}catch(e){console.error(e)}};readListIngredient()},[]),(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"centered",children:(0,n.jsx)(a.Z,{variant:"contained",color:"primary",onClick:()=>D(!0),id:"addButton",children:"Add New Shopping List"})}),(0,n.jsx)("div",{className:"centered",children:(0,n.jsx)("h3",{children:"Your Shopping Lists"})}),(0,n.jsx)(l.Z,{open:N,onClose:()=>D(!1),children:(0,n.jsx)(d.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",boxShadow:24,p:4},children:(0,n.jsxs)("form",{onSubmit:upsertShoppingList,children:[(0,n.jsx)("h3",{children:"Enter List Data"}),(0,n.jsxs)(c._,{dateAdapter:o.y,children:[(0,n.jsx)(h.M,{label:"List Start Date",variant:"outlined",margin:"normal",fullWidth:!0,required:!0,selected:y,onChange:e=>v(e)}),(0,n.jsx)(h.M,{label:"List End Date",variant:"outlined",margin:"normal",fullWidth:!0,required:!0,selected:k,onChange:e=>C(e)})]}),(0,n.jsx)(a.Z,{fullWidth:!0,variant:"contained",color:"primary",type:"submit",children:"Submit"})]})})}),(0,n.jsx)("div",{sx:{overflow:"auto"},children:(0,n.jsx)("div",{sx:{width:"100%",display:"table",tableLayout:"fixed"},children:(0,n.jsx)(_.Z,{component:m.Z,children:(0,n.jsxs)(u.Z,{"aria-label":"simple table",children:[(0,n.jsx)(j.Z,{children:(0,n.jsxs)(f.Z,{children:[(0,n.jsx)(x.Z,{children:"List ID"}),(0,n.jsx)(x.Z,{align:"right",children:"Start Date"}),(0,n.jsx)(x.Z,{align:"right",children:"End Date"}),(0,n.jsx)(x.Z,{align:"right",children:"Items"}),(0,n.jsx)(x.Z,{align:"right",children:"Delete"})]})}),(0,n.jsx)(g.Z,{children:Z.map(e=>(0,n.jsxs)(f.Z,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[(0,n.jsx)(x.Z,{component:"th",scope:"row",children:e.list_id}),(0,n.jsx)(x.Z,{align:"right",children:e.list_start_date}),(0,n.jsx)(x.Z,{align:"right",children:e.list_end_date}),(0,n.jsx)(x.Z,{align:"right",children:(0,n.jsx)(a.Z,{onClick:()=>{P(!0),w(e.list_id)},children:"Ingredients"})}),(0,n.jsx)(x.Z,{align:"right",children:(0,n.jsx)(a.Z,{color:"error",onClick:()=>deleteShoppingList(e.list_id),children:(0,n.jsx)(p.Z,{})})})]},e.list_id))})]})})})}),(0,n.jsx)(l.Z,{open:q,onClose:()=>P(!1),children:(0,n.jsxs)(d.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",boxShadow:24,p:4},children:[(0,n.jsx)("h3",{children:"Items to Buy"}),(0,n.jsx)("div",{children:e.map(e=>(0,n.jsxs)("div",{children:[(0,n.jsxs)("p",{children:["Name: ",e.ing_name]}),(0,n.jsxs)("p",{children:["Quantity: ",e.ing_qnt_to_buy]})]},e.ing_id))})]})})]})}(0,i(90948).ZP)("div")(e=>{let{theme:t}=e;return{backgroundColor:t.palette.background.paper}})}},function(e){e.O(0,[754,510,188,296,835,774,888,179],function(){return e(e.s=86747)}),_N_E=e.O()}]);