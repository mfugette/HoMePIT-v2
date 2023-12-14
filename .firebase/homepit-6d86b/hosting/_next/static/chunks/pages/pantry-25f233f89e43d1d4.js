(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[922],{80940:function(e,n,t){"use strict";var r=t(64836);n.Z=void 0;var a=r(t(64938)),i=t(85893),l=(0,a.default)((0,i.jsx)("path",{d:"M3 10h11v2H3v-2zm0-2h11V6H3v2zm0 8h7v-2H3v2zm15.01-3.13.71-.71c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-.71.71-2.12-2.12zm-.71.71-5.3 5.3V21h2.12l5.3-5.3-2.12-2.12z"}),"EditNote");n.Z=l},89343:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/pantry",function(){return t(18428)}])},18428:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return Pantry}});var r=t(85893),a=t(67294),i=t(84053),l=t(69417),s=t(11994),o=t(5616),d=t(14510),u=t(41733),c=t(80940),h=t(7906),g=t(295),_=t(53252),v=t(72882),x=t(53184),j=t(53816),m=t(90629);function Pantry(){var e,n;let[t,p]=a.useState([]),[f,Z]=a.useState(""),[b,C]=a.useState(),[S,y]=a.useState(),[q,w]=a.useState(),[I,N]=a.useState(),[W,k]=a.useState(),[E,T]=a.useState(),[P,z]=a.useState(),[M,D]=a.useState(),[F,H]=a.useState(),[O,Q]=a.useState(),U=(0,i.useSupabaseClient)(),[V,X]=a.useState(!1),[A,B]=a.useState(!1),[L,Y]=a.useState((n=9999,e=Math.ceil(e=1),Math.floor(Math.random()*((n=Math.floor(n))-e+1))+e));U.auth.getUser().then(e=>{try{Q(e.data.user.id)}catch(e){}});let upsertIngredient=async e=>{e.preventDefault();try{let{data:e}=await U.from("Ingredients").upsert([{ing_id:L,ing_name:f,ing_qnt:b,ing_threshold_qnt:S,ing_serv_qnt:q,ing_serv_cal:I,ing_serv_prot:W,ing_serv_fat:E,ing_serv_carb:P,ing_purchase_serv_cnt:M,ing_purchase_cost:F,user_id:O}]);return e}catch(e){console.error(e)}};(0,a.useEffect)(()=>{let readIngredient=async()=>{try{let e=await U.from("Ingredients").select("ing_id, ing_name, ing_qnt"),n=e.data;p(n),console.log(await U.auth.getUser())}catch(e){console.error(e)}};readIngredient()},[]);let deleteIngredient=async e=>{try{let n=await U.from("Ingredients").delete().match({ing_id:e});console.log(n.data),p(t.filter(n=>n.ing_id!==e))}catch(e){console.error(e)}};return(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"centered",children:(0,r.jsx)(l.Z,{variant:"contained",color:"primary",onClick:()=>X(!0),id:"addButton",children:"Add New Ingredient"})}),(0,r.jsx)("div",{className:"centered",children:(0,r.jsx)("h3",{children:"Your Ingredients"})}),(0,r.jsx)(s.Z,{open:V,onClose:()=>X(!1),children:(0,r.jsx)(o.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",boxShadow:24,p:4},children:(0,r.jsxs)("form",{onSubmit:upsertIngredient,children:[(0,r.jsx)("h3",{children:"Input Food Data"}),(0,r.jsx)(d.Z,{fullWidth:!0,required:!0,variant:"outlined",margin:"normal",label:"Name",value:f,onChange:e=>Z(e.target.value)}),(0,r.jsx)(d.Z,{fullWidth:!0,required:!0,variant:"outlined",margin:"normal",label:"Quantity",value:b,onChange:e=>C(e.target.value)}),(0,r.jsx)(d.Z,{fullWidth:!0,required:!0,variant:"outlined",margin:"normal",label:"Threshold",value:S,onChange:e=>y(e.target.value)}),(0,r.jsx)(d.Z,{fullWidth:!0,required:!0,variant:"outlined",margin:"normal",label:"Serving Size",value:q,onChange:e=>w(e.target.value)}),(0,r.jsx)(d.Z,{fullWidth:!0,required:!0,variant:"outlined",margin:"normal",label:"Calories",value:I,onChange:e=>N(e.target.value)}),(0,r.jsx)(d.Z,{fullWidth:!0,required:!0,variant:"outlined",margin:"normal",label:"Protein",value:W,onChange:e=>k(e.target.value)}),(0,r.jsx)(d.Z,{fullWidth:!0,required:!0,variant:"outlined",margin:"normal",label:"Fat",value:E,onChange:e=>T(e.target.value)}),(0,r.jsx)(d.Z,{fullWidth:!0,required:!0,variant:"outlined",margin:"normal",label:"Carbohydrate",value:P,onChange:e=>z(e.target.value)}),(0,r.jsx)(d.Z,{fullWidth:!0,required:!0,variant:"outlined",margin:"normal",label:"Purchased Servings",value:M,onChange:e=>D(e.target.value)}),(0,r.jsx)(d.Z,{fullWidth:!0,required:!0,variant:"outlined",margin:"normal",label:"Cost",value:F,onChange:e=>H(e.target.value)}),(0,r.jsx)(l.Z,{fullWidth:!0,variant:"contained",color:"primary",type:"submit",children:"Submit"})]})})}),(0,r.jsx)("div",{sx:{overflow:"auto"},children:(0,r.jsx)("div",{sx:{width:"100%",display:"table",tableLayout:"fixed"},children:(0,r.jsx)(v.Z,{component:m.Z,children:(0,r.jsxs)(h.Z,{"aria-label":"simple table",children:[(0,r.jsx)(x.Z,{children:(0,r.jsxs)(j.Z,{children:[(0,r.jsx)(_.Z,{children:"Ingredient"}),(0,r.jsx)(_.Z,{align:"right",children:"Quantity"}),(0,r.jsx)(_.Z,{children:"Nutrition Facts"}),(0,r.jsx)(_.Z,{align:"right",children:"Edit"}),(0,r.jsx)(_.Z,{align:"right",children:"Delete"})]})}),(0,r.jsx)(g.Z,{children:t.map(e=>(0,r.jsxs)(j.Z,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[(0,r.jsx)(_.Z,{component:"th",scope:"row",children:e.ing_name}),(0,r.jsx)(_.Z,{align:"right",children:e.ing_qnt}),(0,r.jsx)(_.Z,{align:"right",children:(0,r.jsx)(l.Z,{onClick:()=>{B(!0),N(e.ing_serv_cal),k(e.ing_serv_prot),T(e.ing_serv_fat),z(e.ing_serv_carb),D(e.ing_purchase_serv_cnt),H(e.ing_purchase_cost)},children:"Nutrition"})}),(0,r.jsx)(_.Z,{align:"right",children:(0,r.jsx)(l.Z,{color:"info",onClick:()=>{X(!0),Z(e.ing_name),C(e.ing_qnt),y(e.ing_threshold_qnt),w(e.ing_serv_qnt),N(e.ing_serv_cal),k(e.ing_serv_prot),T(e.ing_serv_fat),z(e.ing_serv_carb),D(e.ing_purchase_serv_cnt),H(e.ing_purchase_cost),Y(e.ing_id)},children:(0,r.jsx)(c.Z,{})})}),(0,r.jsx)(_.Z,{align:"right",children:(0,r.jsx)(l.Z,{color:"error",onClick:()=>deleteIngredient(e.ing_id),children:(0,r.jsx)(u.Z,{})})})]},e.ing_id))})]})})})}),(0,r.jsx)(s.Z,{open:A,onClose:()=>B(!1),children:(0,r.jsxs)(o.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",boxShadow:24,p:4},children:[(0,r.jsx)("h3",{children:"Nutrition Data"}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{children:["Total Protein: ",W]}),(0,r.jsxs)("p",{children:["Total Fat: ",E]}),(0,r.jsxs)("p",{children:["Total Carbohydrate: ",P]}),(0,r.jsxs)("p",{children:["Total Calories: ",I]}),(0,r.jsxs)("p",{children:["Total Cost: ",F]})]})]})})]})}}},function(e){e.O(0,[754,510,188,774,888,179],function(){return e(e.s=89343)}),_N_E=e.O()}]);