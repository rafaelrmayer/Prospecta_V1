const demoCompanies = [
 {id:1,name:"Aurora Café",initials:"AC",color:"#d9e9fb",ink:"#245b94",category:"Alimentação",city:"Curitiba",state:"PR",contact:"Exemplo demonstrativo",meta:"Registro fictício"},
 {id:2,name:"Clínica Horizonte",initials:"CH",color:"#e2f3ec",ink:"#28795c",category:"Saúde",city:"Curitiba",state:"PR",contact:"Exemplo demonstrativo",meta:"Registro fictício"},
 {id:3,name:"Oficina Ponto Norte",initials:"PN",color:"#fcebdc",ink:"#a65d22",category:"Automotivo",city:"São José dos Pinhais",state:"PR",contact:"Exemplo demonstrativo",meta:"Registro fictício"},
 {id:4,name:"Vértice Contabilidade",initials:"VC",color:"#e9e4fb",ink:"#6552a6",category:"Serviços profissionais",city:"Joinville",state:"SC",contact:"Exemplo demonstrativo",meta:"Registro fictício"},
 {id:5,name:"Casa Ipê Decoração",initials:"CI",color:"#f8e5ef",ink:"#a34e7c",category:"Varejo",city:"Curitiba",state:"PR",contact:"Exemplo demonstrativo",meta:"Registro fictício"},
 {id:6,name:"Nuvem Sistemas",initials:"NS",color:"#dff0f7",ink:"#26738b",category:"Tecnologia",city:"São Paulo",state:"SP",contact:"Exemplo demonstrativo",meta:"Registro fictício"}
];
let companies = [...demoCompanies];
let selectedIds = new Set();
let savedLists = 0;
let toastTimer;
const $ = id => document.getElementById(id);
function notify(message){
 const toast=$("toast"); toast.textContent=message; toast.classList.add("show");
 clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),3200);
}
function populateSelects(){
 const categories=[...new Set(demoCompanies.map(c=>c.category))].sort();
 const states=[...new Set(demoCompanies.map(c=>c.state))].sort();
 categories.forEach(v=>$("categoryFilter").add(new Option(v,v)));
 states.forEach(v=>$("stateFilter").add(new Option(v,v)));
}
function currentRows(){
 const q=$("quickFilter").value.trim().toLocaleLowerCase("pt-BR");
 const category=$("categoryFilter").value;
 const state=$("stateFilter").value;
 return companies.filter(c=>(!q||[c.name,c.category,c.city,c.state].join(" ").toLocaleLowerCase("pt-BR").includes(q))&&(!category||c.category===category)&&(!state||c.state===state));
}
function render(){
 const rows=currentRows(), tbody=$("companyRows");
 tbody.innerHTML="";
 rows.forEach(c=>{
  const tr=document.createElement("tr");
  const checked=selectedIds.has(c.id);
  tr.innerHTML=`<td><input type="checkbox" class="row-check" data-id="${c.id}" aria-label="Selecionar ${escapeHtml(c.name)}" ${checked?"checked":""}></td>
   <td><div class="company-cell"><div class="company-logo" style="background:${c.color};color:${c.ink}">${escapeHtml(c.initials)}</div><div><div class="company-name">${escapeHtml(c.name)}</div><div class="company-meta">${escapeHtml(c.meta)}</div></div></div></td>
   <td><span class="category-chip">${escapeHtml(c.category)}</span></td>
   <td class="location-cell"><strong>${escapeHtml(c.city)}</strong>${escapeHtml(c.state)}, Brasil</td>
   <td class="contact-cell">${escapeHtml(c.contact)}</td>
   <td><button class="row-more" data-more="${c.id}" aria-label="Detalhes de ${escapeHtml(c.name)}">···</button></td>`;
  tbody.appendChild(tr);
 });
 $("resultCount").textContent=rows.length;
 $("showingText").textContent=`Mostrando ${rows.length} ${rows.length===1?"empresa demonstrativa":"empresas demonstrativas"}`;
 $("emptyState").hidden=rows.length>0;
 $("selectAll").checked=rows.length>0&&rows.every(c=>selectedIds.has(c.id));
 $("selectAll").indeterminate=rows.some(c=>selectedIds.has(c.id))&&!$("selectAll").checked;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
$("searchForm").addEventListener("submit",e=>{
 e.preventDefault();
 const segment=$("segment").value.trim().toLocaleLowerCase("pt-BR");
 const city=$("city").value.trim().toLocaleLowerCase("pt-BR");
 const state=$("state").value;
 companies=demoCompanies.filter(c=>(!segment||c.category.toLocaleLowerCase("pt-BR").includes(segment)||c.name.toLocaleLowerCase("pt-BR").includes(segment))&&(!city||c.city.toLocaleLowerCase("pt-BR").includes(city))&&(!state||c.state===state));
 selectedIds.clear();
 $("quickFilter").value=""; $("categoryFilter").value=""; $("stateFilter").value="";
 $("resultSubtitle").textContent="Resultados demonstrativos correspondentes aos critérios informados.";
 render();
 $("resultados").scrollIntoView({behavior:"smooth",block:"start"});
 if(companies.length===0) notify("Nenhum exemplo corresponde aos critérios. Tente outros termos.");
});
["quickFilter","categoryFilter","stateFilter"].forEach(id=>$(id).addEventListener(id==="quickFilter"?"input":"change",render));
$("clearFilters").addEventListener("click",()=>{
 $("quickFilter").value="";$("categoryFilter").value="";$("stateFilter").value="";
 $("segment").value="";$("city").value="";$("state").value="";
 companies=[...demoCompanies];selectedIds.clear();
 $("resultSubtitle").textContent="Exemplos fictícios para explorar a interface.";
 render();notify("Filtros limpos.");
});
$("selectAll").addEventListener("change",e=>{
 currentRows().forEach(c=>e.target.checked?selectedIds.add(c.id):selectedIds.delete(c.id));render();
});
$("companyRows").addEventListener("change",e=>{
 if(!e.target.classList.contains("row-check"))return;
 const id=Number(e.target.dataset.id);e.target.checked?selectedIds.add(id):selectedIds.delete(id);render();
});
$("companyRows").addEventListener("click",e=>{
 const b=e.target.closest("[data-more]");if(!b)return;
 const c=companies.find(x=>x.id===Number(b.dataset.more));
 if(c)notify(`${c.name}: registro fictício de demonstração; nenhum contato real disponível.`);
});
$("saveList").addEventListener("click",()=>{
 const n=selectedIds.size;
 if(!n){notify("Selecione ao menos uma empresa antes de salvar a lista.");return;}
 savedLists++;$("savedCount").textContent=savedLists;
 notify(`Lista demonstrativa salva nesta sessão com ${n} ${n===1?"empresa":"empresas"}.`);
});
$("exportCsv").addEventListener("click",()=>{
 const rows=currentRows().filter(c=>selectedIds.size===0||selectedIds.has(c.id));
 if(!rows.length){notify("Não há resultados para exportar.");return;}
 const csvRows=[["Empresa","Segmento","Cidade","Estado","Contato","Tipo de registro"],...rows.map(c=>[c.name,c.category,c.city,c.state,c.contact,c.meta])];
 const csv="\uFEFF"+csvRows.map(row=>row.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(";")).join("\r\n");
 const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
 const url=URL.createObjectURL(blob);const a=document.createElement("a");
 a.href=url;a.download="prospecta-empresas-demonstrativas.csv";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
 notify(`Arquivo CSV exportado com ${rows.length} registro(s) demonstrativo(s).`);
});
$("menuToggle").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
document.addEventListener("click",e=>{if(window.innerWidth<=760&&!e.target.closest("#sidebar")&&!e.target.closest("#menuToggle"))$("sidebar").classList.remove("open");});
populateSelects();render();
