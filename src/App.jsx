import { useState, useMemo, useCallback, useEffect } from "react";

const D = {
  platforms: [
    {code:"facebook",full:"Meta (Facebook/Instagram)",medium:"paid",label:"paid",note:"smb-and-scale"},
    {code:"linkedin",full:"LinkedIn Ads",medium:"paid",label:"paid",note:"main-b2b-platform"},
    {code:"tiktok",full:"TikTok Ads",medium:"paid",label:"paid",note:"Especially for Hulul"},
    {code:"google",full:"Google Ads - All Objectives",medium:"cpc",label:"paid",note:"All Objectives (auto-tagged)"},
    {code:"facebook",full:"SM - Facebook",medium:"social",label:"organic"},
    {code:"instagram",full:"SM - Instagram",medium:"social",label:"organic"},
    {code:"tiktok",full:"SM - TikTok",medium:"social",label:"organic"},
    {code:"youtube",full:"SM - YouTube",medium:"social",label:"organic"},
    {code:"twitter",full:"SM - Twitter",medium:"social",label:"organic"},
    {code:"linkedin",full:"SM - LinkedIn",medium:"social",label:"organic"},
    {code:"linktree",full:"SM - Linktree",medium:"social",label:"organic"},
    {code:"newsletter",full:"Email Newsletter",medium:"email",label:"organic"},
    {code:"webinar",full:"Webinar",medium:"referral",label:"organic"},
    {code:"ebook",full:"Ebook",medium:"referral",label:"organic"},
    {code:"shopify",full:"Shopify App Marketplace",medium:"referral",label:"organic"},
    {code:"salla",full:"Salla App Marketplace",medium:"referral",label:"organic"},
    {code:"zid",full:"Zid App Marketplace",medium:"referral",label:"organic"},
  ],
  types: [{code:"pros",full:"Prospecting"},{code:"reta",full:"Retargeting"}],
  objectives: [
    {code:"conv",full:"Conversion",plat:"All"},
    {code:"vid",full:"Video Views",plat:"All"},
    {code:"plike",full:"Page Likes",plat:"Meta"},
    {code:"adv",full:"Advantage+ Meta",plat:"Meta"},
    {code:"srch",full:"Search",plat:"Google"},
    {code:"dgen",full:"Demand Gen",plat:"Google"},
    {code:"pmax",full:"PMax",plat:"Google"},
    {code:"lgen",full:"Lead Gen Form",plat:"LinkedIn, Meta"},
    {code:"waba",full:"WhatsApp Leads",plat:"Meta"},
  ],
  landingUrls: [
    {code:"home",full:"WideBot Home Page",cat:"WideBot",label:"WideBot",arUrl:"https://widebot.ai/ar",enUrl:"https://widebot.ai"},
    {code:"agnt",full:"AI Agent",cat:"Products",label:"WideBot",arUrl:"https://widebot.ai/ar/products/ai-agent",enUrl:"https://widebot.ai/products/ai-agent"},
    {code:"asst",full:"Enterprise AI Assistant",cat:"Products",label:"WideBot",arUrl:"https://widebot.ai/ar/products/ai-assistant",enUrl:"https://widebot.ai/products/ai-assistant"},
    {code:"omni",full:"Omnichannel Inbox",cat:"Products",label:"WideBot",arUrl:"https://widebot.ai/ar/products/omnichannel-inbox",enUrl:"https://widebot.ai/products/omnichannel-inbox"},
    {code:"wapi",full:"WhatsApp API",cat:"Products",label:"WideBot",arUrl:"https://widebot.ai/ar/products/whatsapp-business-api",enUrl:"https://widebot.ai/products/whatsapp-business-api"},
    {code:"avtr",full:"Digital Human Avatar",cat:"Products",label:"WideBot",arUrl:"https://widebot.ai/ar/products/digital-humans",enUrl:"https://widebot.ai/products/digital-humans"},
    {code:"list",full:"Social Listening",cat:"Products",label:"WideBot",arUrl:"https://widebot.ai/ar/products/social-listening",enUrl:"https://widebot.ai/products/social-listening"},
    {code:"sale",full:"Sales Automation",cat:"Solutions (Use Cases)",label:"WideBot",arUrl:"https://widebot.ai/ar/solutions/sales-automation",enUrl:"https://widebot.ai/solutions/sales-automation"},
    {code:"gov",full:"Govt & Public",cat:"Solutions (Sectors)",label:"WideBot",arUrl:"https://widebot.ai/ar/solutions/government",enUrl:"https://widebot.ai/solutions/government"},
    {code:"crm",full:"CRM Integration",cat:"Integrations",label:"WideBot",arUrl:"https://widebot.ai/ar/integrations/crm",enUrl:"https://widebot.ai/integrations/crm"},
    {code:"demo",full:"Request Demo",cat:"Request Demo",label:"WideBot",arUrl:"https://widebot.ai/ar/request-a-demo",enUrl:"https://widebot.ai/request-a-demo"},
    {code:"cs",full:"Customer Support",cat:"Solutions (Use Cases)",label:"WideBot",arUrl:"https://widebot.ai/ar/solutions/customer-support",enUrl:"https://widebot.ai/solutions/customer-support"},
    {code:"mktg",full:"Marketing Automation",cat:"Solutions (Use Cases)",label:"WideBot",arUrl:"https://widebot.ai/ar/solutions/marketing-automation",enUrl:"https://widebot.ai/solutions/marketing-automation"},
    {code:"ops",full:"IT & Operations",cat:"Solutions (Use Cases)",label:"WideBot",arUrl:"https://widebot.ai/ar/solutions/conversational-it-operations",enUrl:"https://widebot.ai/solutions/conversational-it-operations"},
    {code:"tele",full:"Telecom",cat:"Solutions (Sectors)",label:"WideBot",arUrl:"https://widebot.ai/ar/solutions/telecom",enUrl:"https://widebot.ai/solutions/telecom"},
    {code:"fin",full:"Finance & Banking",cat:"Solutions (Sectors)",label:"WideBot",arUrl:"https://widebot.ai/ar/solutions/finance-banking",enUrl:"https://widebot.ai/solutions/finance-banking"},
    {code:"edu",full:"Education",cat:"Solutions (Sectors)",label:"WideBot",arUrl:"https://widebot.ai/ar/solutions/education",enUrl:"https://widebot.ai/solutions/education"},
    {code:"health",full:"Health Care",cat:"Solutions (Sectors)",label:"WideBot",arUrl:"https://widebot.ai/ar/solutions/health-care",enUrl:"https://widebot.ai/solutions/health-care"},
    {code:"restate",full:"Real Estate",cat:"Solutions (Sectors)",label:"WideBot",arUrl:"https://widebot.ai/ar/solutions/real-state",enUrl:"https://widebot.ai/solutions/real-state"},
    {code:"insu",full:"Insurance",cat:"Solutions (Sectors)",label:"WideBot",arUrl:"https://widebot.ai/ar/solutions/insurance",enUrl:"https://widebot.ai/solutions/insurance"},
    {code:"auto",full:"Automotive",cat:"Solutions (Sectors)",label:"WideBot",arUrl:"https://widebot.ai/ar/solutions/automotive",enUrl:"https://widebot.ai/solutions/automotive"},
    {code:"wamrkt",full:"WhatsApp Integration",cat:"Integrations",label:"WideBot",arUrl:"https://widebot.ai/ar/integrations/whatsapp-campaigns",enUrl:"https://widebot.ai/integrations/whatsapp-campaigns"},
    {code:"memrkt",full:"Messenger Integration",cat:"Integrations",label:"WideBot",arUrl:"https://widebot.ai/ar/integrations/messenger-api",enUrl:"https://widebot.ai/integrations/messenger-api"},
    {code:"igmrkt",full:"Instagram Integration",cat:"Integrations",label:"WideBot",arUrl:"https://widebot.ai/ar/integrations/instagram-api",enUrl:"https://widebot.ai/integrations/instagram-api"},
    {code:"lchat",full:"Live Chat",cat:"Integrations",label:"WideBot",arUrl:"https://widebot.ai/ar/integrations/live-chat-api",enUrl:"https://widebot.ai/integrations/live-chat-api"},
    {code:"sms",full:"SMS",cat:"Integrations",label:"WideBot",arUrl:"https://widebot.ai/ar/integrations/sms-api",enUrl:"https://widebot.ai/integrations/sms-api"},
    {code:"emrkt",full:"Email Integration",cat:"Integrations",label:"WideBot",arUrl:"https://widebot.ai/ar/integrations/email-marketing",enUrl:"https://widebot.ai/integrations/email-marketing"},
    {code:"erp",full:"ERP Integration",cat:"Integrations",label:"WideBot",arUrl:"https://widebot.ai/ar/integrations/erp",enUrl:"https://widebot.ai/integrations/erp"},
    {code:"wmkt",full:"WhatsApp Marketing",cat:"Broadcasting & Bulk",label:"Hulul",arUrl:"https://hulul.ai/products/whatsapp-automation",enUrl:"https://hulul.ai/en/products/whatsapp-automation"},
    {code:"huhome",full:"Hulul Home Page",cat:"Home Page",label:"Hulul",arUrl:"https://hulul.ai",enUrl:"https://hulul.ai/en"},
    {code:"chtbot",full:"Chatbot Builder",cat:"AI Chatbot Builder",label:"Hulul",arUrl:"https://hulul.ai/products/chatbot-builder",enUrl:"https://hulul.ai/en/products/chatbot-builder"},
    {code:"sala",full:"Salla Integration",cat:"Store Automation",label:"Hulul",arUrl:"https://hulul.ai/products/integrations",enUrl:"https://hulul.ai/en/products/integrations"},
    {code:"zid",full:"Zid Integration",cat:"Store Automation",label:"Hulul",arUrl:"https://hulul.ai/products/integrations",enUrl:"https://hulul.ai/en/products/integrations"},
    {code:"dtana",full:"Data Analysis",cat:"AI-Powered Analytics",label:"Hulul",arUrl:"https://hulul.ai/products/data-analysis",enUrl:"https://hulul.ai/en/products/data-analysis"},
    {code:"omnimkt",full:"Omni Channel Marketing",cat:"Marketing & Support",label:"Hulul",arUrl:"https://hulul.ai/products/omnichannel",enUrl:"https://hulul.ai/en/products/omnichannel"},
    {code:"mktauto",full:"Marketing Automation",cat:"AI-Powered Campaigns",label:"Hulul",arUrl:"https://hulul.ai/solutions/marketing-automation",enUrl:"https://hulul.ai/en/solutions/marketing-automation"},
    {code:"smrtcs",full:"Smart Customer Support",cat:"AI-Powered Support",label:"Hulul",arUrl:"https://hulul.ai/solutions/support-customer-service",enUrl:"https://hulul.ai/en/solutions/support-customer-service"},
    {code:"sauto",full:"Sales Automation",cat:"Sales Process",label:"Hulul",arUrl:"https://hulul.ai/solutions/sales",enUrl:"https://hulul.ai/en/solutions/sales"},
    {code:"epaymnt",full:"Online Payment / E-Payment",cat:"E-Payment",label:"Hulul",arUrl:"https://hulul.ai/solutions/online-payment",enUrl:"https://hulul.ai/en/solutions/online-payment"},
  ],
  bidding: [{code:"abo",full:"Ad Set Budget"},{code:"cbo",full:"Campaign Budget"}],
  audiences: [
    {code:"new",full:"New / Broad Audience"},{code:"wvs",full:"Website Visitors"},
    {code:"drop",full:"Signup Page Dropoff"},{code:"fb",full:"Facebook Engagement"},
    {code:"ig",full:"Instagram Engagement"},{code:"linkedin",full:"LinkedIn Page Engagers"},
    {code:"list",full:"CRM List"},{code:"int",full:"Interest Based"},
    {code:"l01",full:"Lookalike 1%"},{code:"l03",full:"Lookalike 3%"},
    {code:"l10",full:"Lookalike 10%"},{code:"30d",full:"30 Day Window"},
    {code:"60d",full:"60 Day Window"},{code:"90d",full:"90 Day Window"},
    {code:"180d",full:"180 Day Window"},{code:"aiborad",full:"Broad / AI-Optimized"},
  ],
  formats: [
    {code:"vid",full:"Video",plat:"All"},{code:"img",full:"Static Image",plat:"All"},
    {code:"caro",full:"Carousel",plat:"All"},{code:"inf",full:"Influencer Content",plat:"All"},
    {code:"reel",full:"Reel / Short",plat:"Meta"},{code:"boost",full:"Partnership Ad",plat:"Meta"},
    {code:"text",full:"Text Ad",plat:"Google Search"},{code:"tla",full:"Thought Leader Ad",plat:"LinkedIn"},
    {code:"inmail",full:"InMail",plat:"LinkedIn"},{code:"vidtut",full:"Video Tutorial",plat:"Meta, Google"},
    {code:"gdn",full:"Display Banners",plat:"Google Display"},{code:"csvid",full:"Case Study Video",plat:"Meta, Google"},
    {code:"banda",full:"Before/After Storytelling",plat:"Meta"},{code:"motvid",full:"Motion Graphic",plat:"Meta"},
    {code:"demo",full:"Video Product Demo",plat:"Meta, Google"},
  ],
  hooks: [
    {code:"dial",full:"Arabic Accuracy",cat:"Product",label:"WideBot"},
    {code:"pain",full:"Admin Pain",cat:"Prob/Sol",label:"WideBot"},
    {code:"sale",full:"Sales Growth",cat:"Transform",label:"WideBot"},
    {code:"trst",full:"Trust/Authority",cat:"Social Proof",label:"WideBot"},
    {code:"time",full:"Time Saving",cat:"Efficiency",label:"WideBot"},
    {code:"wbaw01",full:"Arabic-First AI Power",cat:"Awareness",label:"WideBot"},
    {code:"wbaw02",full:"Trusted by Governments",cat:"Awareness",label:"WideBot"},
    {code:"wbaw03",full:"Enterprise-Ready AI",cat:"Awareness",label:"WideBot"},
    {code:"wbaw04",full:"Omnichannel AI Presence",cat:"Awareness",label:"WideBot"},
    {code:"wbpk01",full:"Stop Losing Customers",cat:"Painkiller",label:"WideBot"},
    {code:"wbpk02",full:"Millions Lost in Manual Support",cat:"Painkiller",label:"WideBot"},
    {code:"wbpk03",full:"Arabic Dialect Misunderstanding",cat:"Painkiller",label:"WideBot"},
    {code:"wbpk04",full:"Support Teams Burnout",cat:"Painkiller",label:"WideBot"},
    {code:"wbcs01",full:"No-Code Bot Builder",cat:"Consideration",label:"WideBot"},
    {code:"wbcs02",full:"Enterprise AI Agents",cat:"Consideration",label:"WideBot"},
    {code:"wbcs03",full:"WhatsApp Voice Agents",cat:"Consideration",label:"WideBot"},
    {code:"wbcs04",full:"Smart Workflow Automation",cat:"Consideration",label:"WideBot"},
    {code:"wbcv01",full:"Reduce Support Costs 60%",cat:"Conversion",label:"WideBot"},
    {code:"wbcv02",full:"Launch Chatbot in 10 Min",cat:"Conversion",label:"WideBot"},
    {code:"wbcv03",full:"Try AI Agents Free",cat:"Conversion",label:"WideBot"},
    {code:"wbcv04",full:"Proven Enterprise Scale",cat:"Conversion",label:"WideBot"},
    {code:"ghst",full:"The Ghost Writer",cat:"Efficiency",label:"Hulul"},
    {code:"kill",full:"Meeting Killer",cat:"Efficiency",label:"Hulul"},
    {code:"clon",full:"Clone Yourself",cat:"Efficiency",label:"Hulul"},
    {code:"rec",full:"Recovery",cat:"ROI",label:"Hulul"},
    {code:"node",full:"No Developer",cat:"Ease",label:"Hulul"},
    {code:"all1",full:"All-in-One",cat:"Value",label:"Hulul"},
    {code:"sal1",full:"Salla-Fast",cat:"Platform",label:"Hulul"},
    {code:"non",full:"24/7 Sales",cat:"Scale",label:"Hulul"},
    {code:"hlaw01",full:"All-in-One CX Platform",cat:"Awareness",label:"Hulul"},
    {code:"hlaw02",full:"Arabic Conversational AI",cat:"Awareness",label:"Hulul"},
    {code:"hlaw03",full:"Omnichannel Inbox",cat:"Awareness",label:"Hulul"},
    {code:"hlaw04",full:"For E-commerce Growth",cat:"Awareness",label:"Hulul"},
    {code:"hlpk01",full:"Drop in Response = Drop in Sales",cat:"Painkiller",label:"Hulul"},
    {code:"hlpk02",full:"Lost WhatsApp Orders",cat:"Painkiller",label:"Hulul"},
    {code:"hlpk03",full:"Too Many Channels One Team",cat:"Painkiller",label:"Hulul"},
    {code:"hlpk04",full:"Manual Order Chaos",cat:"Painkiller",label:"Hulul"},
    {code:"hlcs01",full:"WhatsApp Commerce Automation",cat:"Consideration",label:"Hulul"},
    {code:"hlcs02",full:"Shopify & Zid Integration",cat:"Consideration",label:"Hulul"},
    {code:"hlcs03",full:"Generative AI Smart Replies",cat:"Consideration",label:"Hulul"},
    {code:"hlcs04",full:"Multi-Agent Routing",cat:"Consideration",label:"Hulul"},
    {code:"hlcv01",full:"Increase Conversion 30%",cat:"Conversion",label:"Hulul"},
    {code:"hlcv02",full:"Automate Sales in 1 Day",cat:"Conversion",label:"Hulul"},
    {code:"hlcv03",full:"Try WhatsApp Automation Free",cat:"Conversion",label:"Hulul"},
    {code:"hlcv04",full:"Customer Stories E-commerce",cat:"Conversion",label:"Hulul"},
  ],
  versions: [{code:"v1",full:"V1"},{code:"v2",full:"V2"},{code:"v3",full:"V3"},{code:"v4",full:"V4"},{code:"v5",full:"V5"}],
};

var BRAND={
  WideBot:{c:{bg:"#00327a",lt:"#e8f0fe",bd:"#7baaf7",tx:"#00327a"},a:{bg:"#004a9b",lt:"#e3f2fd",bd:"#90caf9",tx:"#004a9b"},d:{bg:"#ff5100",lt:"#fff3e0",bd:"#ffab91",tx:"#ff5100"},accent:"#54f7f2"},
  Hulul:{c:{bg:"#0002a1",lt:"#ede7f6",bd:"#b39ddb",tx:"#0002a1"},a:{bg:"#01e68d",lt:"#e0f7f0",bd:"#80cbc4",tx:"#00895e"},d:{bg:"#ff367c",lt:"#fce4ec",bd:"#f48fb1",tx:"#ff367c"},accent:"#ffd607"},
  default:{c:{bg:"#0F766E",lt:"#f0fdfa",bd:"#99f6e4",tx:"#0F766E"},a:{bg:"#8B5CF6",lt:"#f5f3ff",bd:"#c4b5fd",tx:"#7C3AED"},d:{bg:"#F97316",lt:"#fff7ed",bd:"#fed7aa",tx:"#EA580C"},accent:"#34d399"},
};

var SHORTIO_KEYS = {
  "go.widebot.ai": "pk_KuaTyiHcnAh8j7x1",
  "go.hulul.ai": "pk_NUHE90GmMSe4KJCL"
};
export default function App(){
  var _=useState;
  var[tab,setTab]=_("builder");
  var[data,setData]=_(D);
  var[domain,setDomain]=_("");
  var[purpose,setPurpose]=_("");
  var[lang,setLang]=_("");
  var[sel,setSel]=_({platform:"",type:"",objective:"",landingUrl:"",bidding:""});
  var[asSel,setAsSel]=_({audience:""});
  var[adSel,setAdSel]=_({format:"",hook:"",version:""});
  var[baseUrl,setBaseUrl]=_("");
  var[hist,setHist]=_([]);
  var[admDim,setAdmDim]=_("platforms");
  var[admNew,setAdmNew]=_({code:"",full:"",extra:""});
  var[cs,setCs]=_("");
  var[hs,setHs]=_("");
  var[shortUrl,setShortUrl]=_("");
  var[shortLoading,setShortLoading]=_(false);
  var[shortError,setShortError]=_("");

  useEffect(function(){
    try{var d=localStorage.getItem("wb-utm-config");if(d)setData(JSON.parse(d))}catch(e){}
    try{var h=localStorage.getItem("wb-utm-history");if(h)setHist(JSON.parse(h))}catch(e){}
  },[]);
  useEffect(function(){setShortUrl("");setShortError("")},[sel,asSel,adSel,baseUrl]);

  var save=function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};

  // Filtered data
  var CL=BRAND[domain]||BRAND.default;

  var filtPlats=purpose?data.platforms.filter(function(p){return p.label===purpose}):data.platforms;
  var filtUrls=data.landingUrls.filter(function(u){return(!domain||u.label===domain)});
  var filtUrlsSearch=cs?filtUrls.filter(function(c){return c.full.toLowerCase().indexOf(cs.toLowerCase())>=0||c.code.indexOf(cs.toLowerCase())>=0||c.cat.toLowerCase().indexOf(cs.toLowerCase())>=0}):filtUrls;
  var filtHooks=data.hooks.filter(function(h){return(!domain||h.label===domain)});
  var filtHooksSearch=hs?filtHooks.filter(function(h){return h.full.toLowerCase().indexOf(hs.toLowerCase())>=0||h.code.indexOf(hs.toLowerCase())>=0||(h.cat||"").toLowerCase().indexOf(hs.toLowerCase())>=0}):filtHooks;

  var platObj=data.platforms.find(function(p){return p.code===sel.platform&&p.label===(purpose||p.label)});
  var campName=[sel.platform,sel.type,sel.objective,sel.landingUrl,sel.bidding].filter(Boolean).join("-");
  var asOwn=asSel.audience||"";
  var adOwn=[adSel.format,adSel.hook,adSel.version].filter(Boolean).join("-");
  var asFull=asOwn?(campName?asOwn+"_"+campName:asOwn):"";
  var adFull=adOwn?[adOwn,asOwn,campName].filter(Boolean).join("_"):"";
  var utmUrl="";
  if(campName){var p=new URLSearchParams();p.set("utm_source",sel.platform||"platform");p.set("utm_medium",platObj?platObj.medium:"paid");p.set("utm_campaign",campName);if(asOwn)p.set("utm_content",asOwn);if(adOwn)p.set("utm_term",adOwn);utmUrl=(baseUrl||"https://widebot.ai")+"?"+p.toString()}

  var pickUrl=function(code){
    setSel(function(prev){
      var n=prev.landingUrl===code?"":code;
      if(n){var c=filtUrls.find(function(x){return x.code===n});if(c){var url=lang==="en"?c.enUrl:c.arUrl;if(url&&url.indexOf("http")!==0)url="https://"+url;if(url)setBaseUrl(url)}}
      return Object.assign({},prev,{landingUrl:n});
    });
  };
  var pick=function(g,c){setSel(function(p){var o={};o[g]=p[g]===c?"":c;return Object.assign({},p,o)})};
  var pickAs=function(g,c){setAsSel(function(p){var o={};o[g]=p[g]===c?"":c;return Object.assign({},p,o)})};
  var pickAd=function(g,c){setAdSel(function(p){var o={};o[g]=p[g]===c?"":c;return Object.assign({},p,o)})};

  var saveH=function(sUrl){if(!utmUrl)return;var e={url:utmUrl,campaign:campName,adset:asFull,ad:adFull,shortUrl:sUrl||shortUrl||"",ts:new Date().toLocaleString(),id:Date.now(),domain:domain};var n=[e].concat(hist).slice(0,20);setHist(n);save("wb-utm-history",n)};
  var removeH=function(id){var n=hist.filter(function(h){return h.id!==id});setHist(n);save("wb-utm-history",n)};
  var clearH=function(){setHist([]);save("wb-utm-history",[])};
  var resetD=function(){setData(D);save("wb-utm-config",D)};

var shortenUrl=function(){
    if(!utmUrl)return;
    var d=null;var lower=baseUrl.toLowerCase();
    if(lower.indexOf("widebot")>=0)d="go.widebot.ai";
    else if(lower.indexOf("hulul")>=0)d="go.hulul.ai";
    if(!d){setShortError("URL must contain 'widebot' or 'hulul'");return}
    var apiKey=SHORTIO_KEYS[d];
    setShortLoading(true);setShortError("");setShortUrl("");
    fetch("https://api.short.io/links/public",{method:"POST",headers:{"accept":"application/json","Content-Type":"application/json","authorization":apiKey},body:JSON.stringify({domain:d,originalURL:utmUrl,allowDuplicates:false})}).then(function(r){return r.json()}).then(function(dd){setShortLoading(false);if(dd.shortURL){setShortUrl(dd.shortURL);saveH(dd.shortURL)}else{setShortError(dd.message||dd.error||"Failed")}}).catch(function(e){setShortLoading(false);setShortError("Network error: "+e.message)});
  };

  var chip=function(o,selected,onClick,color,showCat){
    return <button key={o.code+(o.label||"")+(o.medium||"")} onClick={onClick} style={{padding:"4px 8px",borderRadius:6,border:selected?"2px solid "+color:"1.5px solid #d1d5db",background:selected?color:"transparent",color:selected?"#fff":"#374151",fontSize:11,fontWeight:selected?600:400,cursor:"pointer",fontFamily:"'IBM Plex Sans',sans-serif",whiteSpace:"nowrap",lineHeight:1.4}}>
      <b>{o.code}</b>{" "}<span style={{opacity:0.5,fontSize:8.5}}>({o.full})</span>{o.plat&&o.plat!=="All"?<span style={{opacity:0.3,fontSize:7.5,marginLeft:1}}>[{o.plat}]</span>:null}{showCat&&o.cat?<span style={{opacity:0.3,fontSize:7.5,marginLeft:1}}>[{o.cat}]</span>:null}
    </button>;
  };

  var topChip=function(value,selected,onClick,label,color){
    return <button key={value} onClick={onClick} style={{padding:"6px 16px",borderRadius:8,border:selected?"2px solid "+color:"1.5px solid #d1d5db",background:selected?color:"transparent",color:selected?"#fff":"#374151",fontSize:12,fontWeight:selected?700:500,cursor:"pointer",fontFamily:"'IBM Plex Sans',sans-serif",transition:"all 0.12s"}}>{label}</button>;
  };

  var DIMS=[{key:"platforms",label:"Platforms",extra:"utm_medium"},{key:"types",label:"Campaign Type"},{key:"objectives",label:"Objectives",extra:"Platform(s)"},{key:"landingUrls",label:"Landing URLs",extra:"Arabic URL"},{key:"bidding",label:"Bidding"},{key:"audiences",label:"Audience Type"},{key:"formats",label:"Ad Format",extra:"Platform(s)"},{key:"hooks",label:"Ad Hook",extra:"Category"},{key:"versions",label:"Version"}];

  var REF=[
    {title:"Campaign Level",color:CL.c,groups:[{label:"Platform",items:data.platforms},{label:"Campaign Type",items:data.types},{label:"Objective",items:data.objectives},{label:"Landing URL",items:data.landingUrls},{label:"Bidding",items:data.bidding}]},
    {title:"Ad Set Level",color:CL.a,groups:[{label:"Audience Type",items:data.audiences}]},
    {title:"Ad Level",color:CL.d,groups:[{label:"Ad Format",items:data.formats},{label:"Ad Hook",items:data.hooks},{label:"Version",items:data.versions}]},
  ];

  return(
  <div style={{fontFamily:"'IBM Plex Sans',sans-serif",maxWidth:900,margin:"0 auto",padding:"16px 12px",color:"#1f2937"}}>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet"/>

  {/* HEADER */}
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,borderBottom:"1px solid #e5e7eb",paddingBottom:10}}>
    <div>
      <h1 style={{fontSize:18,fontWeight:700,color:CL.c.tx,margin:0}}>Campaign & UTM Builder</h1>
      <p style={{fontSize:10,color:"#6b7280",margin:"3px 0 0"}}><span style={{color:CL.c.tx}}>Campaign</span>{" \u2192 "}<span style={{color:CL.a.tx}}>Ad Set</span>{" \u2192 "}<span style={{color:CL.d.tx}}>Ad</span>{" \u2014 separated by "}<code style={{background:"#f3f4f6",padding:"1px 4px",borderRadius:3,fontSize:9}}>_</code>{" \u2014 across All platforms"}</p>
    </div>
    <a href="https://essawi.com/?utm_source=saasgate.io&utm_medium=saas-tools&utm_campaign=utm-builder" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:6}}>
      <span style={{fontSize:9,color:"#9ca3af"}}>Built by</span>
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMyIiBoZWlnaHQ9IjM3IiB2aWV3Qm94PSIwIDAgMTMyIDM3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfODIyM18zMzMpIj4KPHBhdGggZD0iTTEyNy45MzUgMTUuNTc2N0MxMjcuOTM1IDE1LjQ3MDYgMTI3Ljk0MyAxMy4wNjQ1IDEyNy45NDMgMTIuOTU4NEMxMjcuOTQzIDcuNTE3MTYgMTIzLjQwNyAzLjEzNjkxIDExNy45MDkgMy4zOTA3OUMxMTMuMDM2IDMuNjE0MzQgMTA5LjA2NSA3LjU0NzQ4IDEwOC44IDEyLjQyMDNDMTA4Ljc4OSAxMi42MjQ5IDEwOC43ODUgMTIuODI5NSAxMDguNzg5IDEzLjAzNDJWMTIuOTY5N0MxMDguNzg5IDE0Ljc4NDcgMTA3LjMxNSAxNi4yNTg3IDEwNS41IDE2LjI1ODdDMTAzLjY4NSAxNi4yNTg3IDEwMi4yMTEgMTQuNzg0NyAxMDIuMjExIDEyLjk2OTdWNy4yODYwM0MxMDIuMjExIDYuODg0MzggMTAxLjg4NSA2LjU1ODUxIDEwMS40ODMgNi41NTg1MUg5Ni42NDg0Qzk2LjI0NjcgNi41NTg1MSA5NS45MjQ3IDYuODg0MzggOTUuOTI0NyA3LjI4MjI0TDk1LjkxNzEgMTIuNDY5NkM5NS45MTcxIDEyLjUyMjYgOTUuOTA5NSAxMi45MjgxIDk1LjkwOTUgMTIuOTI4MUM5NS45MDk1IDE0Ljc0MzEgOTQuNDM1NSAxNi4yMTcgOTIuNjIwNSAxNi4yMTdDOTAuODAxNyAxNi4yMTcgODkuMzE2NCAxNC43MzE3IDg5LjMxNjQgMTIuOTEyOVY3LjI3ODQ1Qzg5LjMxNjQgNi44NzY4IDg4Ljk5MDUgNi41NTA5MyA4OC41ODg5IDYuNTUwOTNIODMuMzU2MUM4Mi45NTQ0IDYuNTUwOTMgODIuNjMyMyA2Ljg3NjggODIuNjMyMyA3LjI3NDY2TDgyLjYyNDggMTIuNDYyQzgyLjYyNDggMTIuNTE1IDgyLjYxNzIgMTIuOTIwNSA4Mi42MTcyIDEyLjkyMDVWMTIuOTI4MUM4Mi42MTcyIDEyLjk5NjMgODIuNjI0OCAxMy4wNjQ1IDgyLjYzOTkgMTMuMTMyN0M4Mi45MzU1IDE4LjM4ODIgODcuMjg5MiAyMi41NjAxIDkyLjYyMDUgMjIuNTYwMUM5NS4xMTc2IDIyLjU2MDEgOTcuMzk4NiAyMS42NDMxIDk5LjE0OTIgMjAuMTI3NEMxMDAuOTQ1IDIxLjcxODkgMTAzLjM0IDIyLjY0NzIgMTA1Ljk1MSAyMi41MjZDMTEwLjgyNCAyMi4zMDI0IDExNC43OTUgMTguMzY5MyAxMTUuMDYgMTMuNDk2NEMxMTUuMDcxIDEzLjI5MTggMTE1LjA3NSAxMy4wODcyIDExNS4wNzEgMTIuODgyNlYxMi45NDdDMTE1LjA3MSAxMS4xMzIgMTE2LjU0NSA5LjY1ODAzIDExOC4zNiA5LjY1ODAzQzEyMC4xNzUgOS42NTgwMyAxMjEuNjQ5IDExLjEzMiAxMjEuNjQ5IDEyLjk0N1YxNS42OTc5QzEyMS42NDkgMTYuMTE0NyAxMjEuOTg2IDE2LjQ1MiAxMjIuNDAzIDE2LjQ1MkgxMjcuMjEyQzEyNy42MTMgMTYuNDUyIDEyNy45MzUgMTYuMTI2MSAxMjcuOTM1IDE1LjcyODJMMTI3Ljk0MyAxNS43NTFDMTI3Ljk0MyAxNS42OTA0IDEyNy45MzkgMTUuNjI5NyAxMjcuOTMyIDE1LjU3MjlMMTI3LjkzNSAxNS41NzY3WiIgZmlsbD0iIzAwNERGRiIvPgo8cGF0aCBkPSJNODkuMDIxMSAzMC4xMDgxQzkwLjU3NiAzMC4xMDgxIDkxLjgzNjUgMjguODQ3NiA5MS44MzY1IDI3LjI5MjdDOTEuODM2NSAyNS43Mzc5IDkwLjU3NiAyNC40Nzc0IDg5LjAyMTEgMjQuNDc3NEM4Ny40NjYzIDI0LjQ3NzQgODYuMjA1OCAyNS43Mzc5IDg2LjIwNTggMjcuMjkyN0M4Ni4yMDU4IDI4Ljg0NzYgODcuNDY2MyAzMC4xMDgxIDg5LjAyMTEgMzAuMTA4MVoiIGZpbGw9IiMwMDRERkYiLz4KPHBhdGggZD0iTTk2LjMwNzUgMzAuMTA4MUM5Ny44NjI0IDMwLjEwODEgOTkuMTIyOSAyOC44NDc2IDk5LjEyMjkgMjcuMjkyN0M5OS4xMjI5IDI1LjczNzkgOTcuODYyNCAyNC40Nzc0IDk2LjMwNzUgMjQuNDc3NEM5NC43NTI3IDI0LjQ3NzQgOTMuNDkyMiAyNS43Mzc5IDkzLjQ5MjIgMjcuMjkyN0M5My40OTIyIDI4Ljg0NzYgOTQuNzUyNyAzMC4xMDgxIDk2LjMwNzUgMzAuMTA4MVoiIGZpbGw9IiMwMDRERkYiLz4KPHBhdGggZD0iTTcxLjU3OTIgMTIuNjcwNEM3MS41NzkyIDEyLjc3NjUgNzEuNTcxNyAxMi44Nzg4IDcxLjU3MTcgMTIuOTg0OUM3MS41NzE3IDE4LjQyNjEgNzUuNDcwNyAyMi44MDY0IDgwLjE5OTUgMjIuNTUyNUM4NC4zOTAzIDIyLjMyODkgODcuODA0NCAxOC4zOTU4IDg4LjAzMTcgMTMuNTIzQzg4LjA1ODIgMTIuOTczNSA4OC4wNDMxIDEyLjQzMTcgODcuOTkzOCAxMS45MDEyQzg3LjgwMDYgOS45MDA1NCA4Ny4wNzMgOC4wMTM1NCA4NS45ODU2IDYuNTc3NDZIODMuOTEyOUM4My4yMDgxIDYuNTc3NDYgODIuNjM2IDcuMjQ0MzUgODIuNjM2IDguMDYyOFYxMi45ODg3QzgyLjYzNiAxNC44MDM3IDgxLjM3MDQgMTYuMjc3NyA3OS44MDkzIDE2LjI3NzdDNzguMjQ4MSAxNi4yNzc3IDc2Ljk4MjYgMTQuODAzNyA3Ni45ODI2IDEyLjk4ODdWNy4zMDExOUM3Ni45ODI2IDYuODk5NTQgNzYuNzAyMiA2LjU3MzY3IDc2LjM1NzQgNi41NzM2N0g3Mi4xOTY5QzcxLjg1MjEgNi41NzM2NyA3MS41NzU0IDYuODk5NTQgNzEuNTc1NCA3LjI5NzRMNzEuNTY3OSAxMi40ODQ3QzcxLjU2NzkgMTIuNTQ1NCA3MS41NzE3IDEyLjYwNiA3MS41NzkyIDEyLjY2MjhWMTIuNjcwNFoiIGZpbGw9IiMwMDRERkYiLz4KPHBhdGggZD0iTTYwLjUxODkgMTIuNjcwNEM2MC41MTg5IDEyLjc3NjUgNjAuNTExNCAxMi44Nzg4IDYwLjUxMTQgMTIuOTg0OUM2MC41MTE0IDE4LjQyNjEgNjQuNDEwNCAyMi44MDY0IDY5LjEzOTIgMjIuNTUyNUM3My4zMyAyMi4zMjg5IDc2Ljc0NDEgMTguMzk1OCA3Ni45NzE0IDEzLjUyM0M3Ni45OTc5IDEyLjk3MzUgNzYuOTgyOCAxMi40MzE3IDc2LjkzMzUgMTEuOTAxMkM3Ni43NDAzIDkuOTAwNTQgNzYuMDEyNyA4LjAxMzU0IDc0LjkyNTMgNi41Nzc0Nkg3Mi44NTI2QzcyLjE0NzggNi41Nzc0NiA3MS41NzU3IDcuMjQ0MzUgNzEuNTc1NyA4LjA2MjhWMTIuOTg4N0M3MS41NzU3IDE0LjgwMzcgNzAuMzEwMSAxNi4yNzc3IDY4Ljc0OSAxNi4yNzc3QzY3LjE4NzggMTYuMjc3NyA2NS45MjIzIDE0LjgwMzcgNjUuOTIyMyAxMi45ODg3VjcuMzAxMTlDNjUuOTIyMyA2Ljg5OTU0IDY1LjY0MTkgNi41NzM2NyA2NS4yOTcgNi41NzM2N0g2MS4xMzY2QzYwLjc5MTcgNi41NzM2NyA2MC41MTUxIDYuODk5NTQgNjAuNTE1MSA3LjI5NzRMNjAuNTA3NiAxMi40ODQ3QzYwLjUwNzYgMTIuNTQ1NCA2MC41MTE0IDEyLjYwNiA2MC41MTg5IDEyLjY2MjhWMTIuNjcwNFoiIGZpbGw9IiMwMDRERkYiLz4KPHBhdGggZD0iTTY1Ljg3MzIgMTEuOTA1QzY1LjY3OTkgOS45MDQzMiA2NC45NTI0IDguMDE3MzIgNjMuODY0OSA2LjU4MTI0SDYxLjc5MjJDNjEuMDg3NSA2LjU4MTI0IDYwLjUxNTMgNy4yNDgxMyA2MC41MTUzIDguMDY2NThWMTIuOTkyNUM2MC41MTUzIDE0LjgwNzUgNTkuMjQ5NyAxNi4yODE0IDU3LjY4ODYgMTYuMjgxNEM1Ni45MzQ2IDE2LjI4OSA1NS45NDU2IDE2LjMwOCA1NS40MzAzIDE2LjMxMThMNTMuNjc5NyAyMi41NjM5QzU0LjYwMDQgMjIuNTYzOSA1Ny40MzQ3IDIyLjU4NjYgNTguMDc4OSAyMi41NTI1QzYyLjI2OTcgMjIuMzI4OSA2NS42ODM3IDE4LjM5NTggNjUuOTExIDEzLjUyM0M2NS45Mzc2IDEyLjk3MzUgNjUuOTIyNCAxMi40MzE3IDY1Ljg3MzIgMTEuOTAxMlYxMS45MDVaIiBmaWxsPSIjMDA0REZGIi8+CjxwYXRoIGQ9Ik0zNi4wMTQ2IDEzLjQzOTZDMzYuMDE0NiAxMy4zMzM1IDM2LjAyMjIgMTMuMjMxMiAzNi4wMjIyIDEzLjEyNTFDMzYuMDIyMiA3LjY4Mzg4IDMxLjQ4NjYgMy4zMDM2MyAyNS45ODg1IDMuNTU3NUMyMS4xMTU3IDMuNzgxMDYgMTcuMTQ0NyA3LjcxNDE5IDE2Ljg3OTQgMTIuNTg3QzE2Ljg0OTEgMTMuMTM2NSAxNi44NjQzIDEzLjY3ODMgMTYuOTI0OSAxNC4yMDg4QzE3LjE0ODQgMTYuMjA5NSAxNy45OTM0IDE4LjA5NjUgMTkuMjU5IDE5LjUzMjVIMjEuNjY4OUMyMi40OTExIDE5LjUzMjUgMjMuMTU0MiAxOC44MDEyIDIzLjE1NDIgMTcuOTc5VjEzLjEyMTNDMjMuMTU0MiAxMS4zMDYzIDI0LjYyODIgOS44MzIzMyAyNi40NDMyIDkuODMyMzNDMjguMjU4MiA5LjgzMjMzIDI5LjczMjIgMTEuMzA2MyAyOS43MzIyIDEzLjEyMTNWMTUuODA3OEMyOS43MzIyIDE2LjE3MTYgMzAuMDI3NyAxNi40NjcxIDMwLjM5MTUgMTYuNDY3MUgzNS4yOTQ3QzM1LjY5NjMgMTYuNDY3MSAzNi4wMTg0IDE2LjE0MTMgMzYuMDE4NCAxNS43NDM0TDM2LjAyNiAxMy42MjE1QzM2LjAyNiAxMy41NjA4IDM2LjAyMjIgMTMuNTAwMiAzNi4wMTQ2IDEzLjQ0MzRWMTMuNDM5NloiIGZpbGw9IiMwMDRERkYiLz4KPHBhdGggZD0iTTQgMTguMDMyQzQgMjMuNDczMyA4LjUzNTYxIDI3Ljg1MzUgMTQuMDMzNyAyNy41OTk2QzE4LjkwNjUgMjcuMzc2MSAyMi44NTg2IDIzLjMzNjggMjMuMTI3NiAxOC40NjRDMjMuMTU3OSAxNy45MTQ2IDIzLjE1NDEgMTYuNjE0OSAyMy4wOTM1IDE2LjA4ODJDMjIuODY5OSAxNC4wODc1IDIyLjAyODggMTMuMDYwNyAyMC43NjMyIDExLjYyODRIMTguMzUzM0MxNy41MzEgMTEuNjI4NCAxNi44Njc5IDEyLjI5NTMgMTYuODY3OSAxMy4xMTM3VjE4LjAzOTZDMTYuODY3OSAxOS44NTQ2IDE1LjM5NCAyMS4zMjg2IDEzLjU3OSAyMS4zMjg2QzExLjc2NCAyMS4zMjg2IDEwLjI5IDE5Ljg1NDYgMTAuMjkgMTguMDM5NlYxNy4zNTM4QzEwLjI5IDE2Ljk1OTcgOS45Njc5IDE2LjYzNzYgOS41NzM4MyAxNi42Mzc2SDQuNzI3NTJDNC4zMjU4NyAxNi42Mzc2IDQuMDAzNzkgMTYuOTYzNSA0LjAwMzc5IDE3LjM2MTRDNC4wMDM3OSAxNy4zNjE0IDQuMDAzNzkgMTcuOTI5NyA0LjAwMzc5IDE4LjAzMkg0WiIgZmlsbD0iIzAwNERGRiIvPgo8cGF0aCBkPSJNNC4zNjc1NSAxNi42MzM5SDkuOTMzOEMxMC4xMjcgMTYuNjMzOSAxMC4yODYyIDE2Ljc5MyAxMC4yODYyIDE2Ljk4NjJWMTguOTc5M0MxMC4yODYyIDE4Ljk3OTMgMTAuMjc4NiAxOC45OTgzIDEwLjI2NzIgMTguOTk4M0g1LjcyNDA2QzQuNzcyOTkgMTguOTk4MyA0IDE4LjIyNTMgNCAxNy4yNzQyVjE3LjAwNTJDNCAxNi44MDA2IDQuMTY2NzIgMTYuNjM3NiA0LjM2NzU1IDE2LjYzNzZWMTYuNjMzOVoiIGZpbGw9IiMwMDRERkYiLz4KPHBhdGggZD0iTTcuMTQxMjYgNy4xMzA2N0M4LjY5NjEzIDcuMTMwNjcgOS45NTY2IDUuODcwMiA5Ljk1NjYgNC4zMTUzM0M5Ljk1NjYgMi43NjA0NyA4LjY5NjEzIDEuNSA3LjE0MTI2IDEuNUM1LjU4NjQgMS41IDQuMzI1OTMgMi43NjA0NyA0LjMyNTkzIDQuMzE1MzNDNC4zMjU5MyA1Ljg3MDIgNS41ODY0IDcuMTMwNjcgNy4xNDEyNiA3LjEzMDY3WiIgZmlsbD0iIzAwNERGRiIvPgo8cGF0aCBkPSJNNy4xNDEwMiAxNC40MjFDOC42OTU4OCAxNC40MjEgOS45NTYzNSAxMy4xNjA1IDkuOTU2MzUgMTEuNjA1NkM5Ljk1NjM1IDEwLjA1MDggOC42OTU4OCA4Ljc5MDMxIDcuMTQxMDIgOC43OTAzMUM1LjU4NjE1IDguNzkwMzEgNC4zMjU2OCAxMC4wNTA4IDQuMzI1NjggMTEuNjA1NkM0LjMyNTY4IDEzLjE2MDUgNS41ODYxNSAxNC40MjEgNy4xNDEwMiAxNC40MjFaIiBmaWxsPSIjMDA0REZGIi8+CjxwYXRoIGQ9Ik01Ni45MTE2IDEyLjEzMjNDNTYuOTExNiA3LjI1MTkyIDUyLjk1NTcgMy4yOTYwNSA0OC4wNzUzIDMuMjk2MDVDNDMuMTk0OSAzLjI5NjA1IDM5LjIzOSA3LjI1MTkyIDM5LjIzOSAxMi4xMzIzQzM5LjIzOSAxNi42MzM4IDQyLjYwMzggMjAuMzQzNCA0Ni45NTc1IDIwLjg5MjhMNDIuMzUzNyAzMi4yNDg5QzQyLjA4ODUgMzIuOTAwNiA0Mi40MDI5IDMzLjYzOTUgNDMuMDU0NyAzMy45MDQ4TDQ2LjczMzkgMzUuMzk3N0M0Ny40MTYgMzUuNjc0MyA0OC4xOTI4IDM1LjM0NDYgNDguNDY5NCAzNC42NjI2TDU2LjExMjEgMTUuODExNkM1Ni42Mjc0IDE0LjY5IDU2LjkxNTQgMTMuNDQ3MiA1Ni45MTU0IDEyLjEzMjNINTYuOTExNlpNNDguMDc1MyAxNS44MTE2QzQ2LjA4MjIgMTUuODExNiA0NC40NjggMTQuMTk3NCA0NC40NjggMTIuMjA0M0M0NC40NjggMTAuMjExMiA0Ni4wODIyIDguNTk3MDYgNDguMDc1MyA4LjU5NzA2QzUwLjA2ODQgOC41OTcwNiA1MS42ODI2IDEwLjIxMTIgNTEuNjgyNiAxMi4yMDQzQzUxLjY4MjYgMTQuMTk3NCA1MC4wNjg0IDE1LjgxMTYgNDguMDc1MyAxNS44MTE2WiIgZmlsbD0iIzAwNERGRiIvPgo8cGF0aCBkPSJNNTYuMjAzMyAxNS43NDcySDUyLjI4MTVWMjIuNTYzOUg1Ni4yMDMzVjE1Ljc0NzJaIiBmaWxsPSIjMDA0REZGIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfODIyM18zMzMiPgo8cmVjdCB3aWR0aD0iMTIzLjk0NyIgaGVpZ2h0PSIzNCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgMS41KSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=" alt="Essawi" style={{height:28,display:"block"}}/>
    </a>
  </div>

  {/* TABS */}
  <div style={{display:"flex",gap:2,marginBottom:14,borderBottom:"1px solid #e5e7eb",flexWrap:"wrap"}}>
    {[["builder","Builder"],["history","History"],["reference","Code Reference"],["looker","Looker Studio Guide"],["admin","Admin Panel"]].map(function(t){
      return <button key={t[0]} onClick={function(){setTab(t[0])}} style={{padding:"6px 12px",borderRadius:"7px 7px 0 0",border:"none",borderBottom:tab===t[0]?"3px solid "+CL.c.bg:"3px solid transparent",background:tab===t[0]?CL.c.lt:"transparent",color:tab===t[0]?CL.c.tx:"#6b7280",fontSize:11,fontWeight:tab===t[0]?700:500,cursor:"pointer",fontFamily:"'IBM Plex Sans',sans-serif"}}>
        {t[1]}{t[0]==="history"&&hist.length>0?<span style={{marginLeft:4,background:"#ef4444",color:"#fff",borderRadius:10,padding:"1px 5px",fontSize:9}}>{hist.length}</span>:null}
      </button>;
    })}
  </div>

  {/* ===== BUILDER ===== */}
  {tab==="builder"&&<div>

    {/* TOP FILTERS: Domain / Purpose / Language */}
    <div style={{background:"#f8fafc",borderRadius:12,padding:14,marginBottom:12,border:"1px solid #e2e8f0"}}>
      <div style={{display:"flex",gap:20,flexWrap:"wrap",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:"#374151",textTransform:"uppercase",marginBottom:5,letterSpacing:"0.05em"}}>Domain</div>
          <div style={{display:"flex",gap:6}}>
            {topChip("WideBot",domain==="WideBot",function(){setDomain(domain==="WideBot"?"":"WideBot");setSel(function(p){return Object.assign({},p,{landingUrl:"",platform:""})})},"WideBot","#00327a")}
            {topChip("Hulul",domain==="Hulul",function(){setDomain(domain==="Hulul"?"":"Hulul");setSel(function(p){return Object.assign({},p,{landingUrl:"",platform:""})})},"Hulul","#8B5CF6")}
          </div>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:"#374151",textTransform:"uppercase",marginBottom:5,letterSpacing:"0.05em"}}>Purpose</div>
          <div style={{display:"flex",gap:6}}>
            {topChip("paid",purpose==="paid",function(){setPurpose(purpose==="paid"?"":"paid");setSel(function(p){return Object.assign({},p,{platform:""})})},"Paid","#F97316")}
            {topChip("organic",purpose==="organic",function(){setPurpose(purpose==="organic"?"":"organic");setSel(function(p){return Object.assign({},p,{platform:""})})},"Organic","#22C55E")}
          </div>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:"#374151",textTransform:"uppercase",marginBottom:5,letterSpacing:"0.05em"}}>Language</div>
          <div style={{display:"flex",gap:6}}>
            {topChip("ar",lang==="ar",function(){setLang(lang==="ar"?"":"ar");setSel(function(p){return Object.assign({},p,{landingUrl:""})})},"Arabic","#0EA5E9")}
            {topChip("en",lang==="en",function(){setLang(lang==="en"?"":"en");setSel(function(p){return Object.assign({},p,{landingUrl:""})})},"English","#6366F1")}
          </div>
        </div>
      </div>
    </div>

    {/* Campaign Level */}
    <div style={{background:"#f9fafb",borderRadius:11,padding:12,marginBottom:10,border:"1px solid #e5e7eb",borderLeft:"4px solid "+CL.c.bg}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{fontSize:12,fontWeight:700}}>Campaign Level <span style={{fontSize:8.5,color:"#9ca3af",fontFamily:"'IBM Plex Mono',monospace"}}>platform-type-obj-landing-bid</span></span>
        {campName&&<span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9.5,color:CL.c.tx,fontWeight:600,background:CL.c.lt,padding:"2px 7px",borderRadius:4,border:"1px solid "+CL.c.bd}}>{campName}</span>}
      </div>
      <div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:CL.c.tx,textTransform:"uppercase",marginBottom:3}}>Platform {!purpose&&<span style={{fontSize:9,color:"#ef4444"}}>← select Purpose first</span>}</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{filtPlats.map(function(o,i){return <button key={o.code+o.medium+i} onClick={function(){pick("platform",o.code)}} style={{padding:"4px 8px",borderRadius:6,border:sel.platform===o.code?"2px solid "+CL.c.bg:"1.5px solid #d1d5db",background:sel.platform===o.code?CL.c.bg:"transparent",color:sel.platform===o.code?"#fff":"#374151",fontSize:11,fontWeight:sel.platform===o.code?600:400,cursor:"pointer",fontFamily:"'IBM Plex Sans',sans-serif",whiteSpace:"nowrap"}}><b>{o.code}</b>{" "}<span style={{opacity:0.5,fontSize:8.5}}>({o.full})</span></button>})}</div></div>
      <div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:CL.c.tx,textTransform:"uppercase",marginBottom:3}}>Campaign Type</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{data.types.map(function(o){return chip(o,sel.type===o.code,function(){pick("type",o.code)},CL.c.bg)})}</div></div>
      <div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:CL.c.tx,textTransform:"uppercase",marginBottom:3}}>Objective</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{data.objectives.map(function(o){return chip(o,sel.objective===o.code,function(){pick("objective",o.code)},CL.c.bg)})}</div></div>
      <div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:CL.c.tx,textTransform:"uppercase",marginBottom:3}}>Landing URL {!domain&&<span style={{fontSize:9,color:"#ef4444"}}>← select Domain first</span>}</div>
        <input placeholder="Search landing URLs..." value={cs} onChange={function(e){setCs(e.target.value)}} style={{width:"100%",padding:"5px 9px",borderRadius:6,border:"1px solid #d1d5db",fontSize:11,marginBottom:5,boxSizing:"border-box",outline:"none"}}/>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",maxHeight:180,overflowY:"auto"}}>{filtUrlsSearch.map(function(o){return <button key={o.code} onClick={function(){pickUrl(o.code)}} style={{padding:"4px 8px",borderRadius:6,border:sel.landingUrl===o.code?"2px solid "+CL.c.bg:"1.5px solid #d1d5db",background:sel.landingUrl===o.code?CL.c.bg:"transparent",color:sel.landingUrl===o.code?"#fff":"#374151",fontSize:11,fontWeight:sel.landingUrl===o.code?600:400,cursor:"pointer",fontFamily:"'IBM Plex Sans',sans-serif",whiteSpace:"nowrap"}}><b>{o.code}</b>{" "}<span style={{opacity:0.5,fontSize:8.5}}>({o.full})</span></button>})}</div>
      </div>
      <div><div style={{fontSize:10,fontWeight:600,color:CL.c.tx,textTransform:"uppercase",marginBottom:3}}>Bidding</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{data.bidding.map(function(o){return chip(o,sel.bidding===o.code,function(){pick("bidding",o.code)},CL.c.bg)})}</div></div>
    </div>

    {/* Ad Set Level */}
    <div style={{background:"#f9fafb",borderRadius:11,padding:12,marginBottom:10,border:"1px solid #e5e7eb",borderLeft:"4px solid "+CL.a.bg}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{fontSize:12,fontWeight:700}}>Ad Set Level <span style={{fontSize:8.5,color:"#9ca3af",fontFamily:"'IBM Plex Mono',monospace"}}>audience _ campaign</span></span>
        {asFull&&<span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9.5,color:CL.a.tx,fontWeight:600,background:CL.a.lt,padding:"2px 7px",borderRadius:4,border:"1px solid "+CL.a.bd,maxWidth:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{asFull}</span>}
      </div>
      <div><div style={{fontSize:10,fontWeight:600,color:CL.c.tx,textTransform:"uppercase",marginBottom:3}}>Audience Type</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{data.audiences.map(function(o){return chip(o,asSel.audience===o.code,function(){pickAs("audience",o.code)},CL.a.bg)})}</div></div>
    </div>

    {/* Ad Level */}
    <div style={{background:"#f9fafb",borderRadius:11,padding:12,marginBottom:10,border:"1px solid #e5e7eb",borderLeft:"4px solid "+CL.d.bg}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{fontSize:12,fontWeight:700}}>Ad Level <span style={{fontSize:8.5,color:"#9ca3af",fontFamily:"'IBM Plex Mono',monospace"}}>format-hook-ver _ adset _ campaign</span></span>
        {adFull&&<span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9.5,color:CL.d.tx,fontWeight:600,background:CL.d.lt,padding:"2px 7px",borderRadius:4,border:"1px solid "+CL.d.bd,maxWidth:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{adFull}</span>}
      </div>
      <div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:CL.c.tx,textTransform:"uppercase",marginBottom:3}}>Ad Format</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{data.formats.map(function(o){return chip(o,adSel.format===o.code,function(){pickAd("format",o.code)},CL.d.bg)})}</div></div>
      <div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:CL.c.tx,textTransform:"uppercase",marginBottom:3}}>Hook / Angle {!domain&&<span style={{fontSize:9,color:"#ef4444"}}>← select Domain first</span>}</div>
        <input placeholder="Search hooks..." value={hs} onChange={function(e){setHs(e.target.value)}} style={{width:"100%",padding:"5px 9px",borderRadius:6,border:"1px solid #d1d5db",fontSize:11,marginBottom:5,boxSizing:"border-box",outline:"none"}}/>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",maxHeight:160,overflowY:"auto"}}>{filtHooksSearch.map(function(o){return chip(o,adSel.hook===o.code,function(){pickAd("hook",o.code)},CL.d.bg,true)})}</div>
      </div>
      <div><div style={{fontSize:10,fontWeight:600,color:CL.c.tx,textTransform:"uppercase",marginBottom:3}}>Version</div><div style={{display:"flex",gap:4}}>{data.versions.map(function(o){return <button key={o.code} onClick={function(){pickAd("version",o.code)}} style={{padding:"4px 8px",borderRadius:6,border:adSel.version===o.code?"2px solid "+CL.d.bg:"1.5px solid #d1d5db",background:adSel.version===o.code?CL.d.bg:"transparent",color:adSel.version===o.code?"#fff":"#374151",fontSize:11,fontWeight:600,cursor:"pointer"}}>{o.code}</button>})}</div></div>
    </div>

    {/* URL */}
    <div style={{marginBottom:10}}>
      <div style={{fontSize:10,fontWeight:600,color:CL.c.tx,textTransform:"uppercase",marginBottom:3}}>Landing URL {sel.landingUrl&&<span style={{color:CL.c.tx,fontSize:9,fontWeight:400}}>{"\u2190"} auto-filled</span>}</div>
      <input type="text" value={baseUrl} onChange={function(e){setBaseUrl(e.target.value)}} style={{width:"100%",padding:"6px 10px",borderRadius:7,border:"1.5px solid #d1d5db",fontSize:11,fontFamily:"'IBM Plex Mono',monospace",boxSizing:"border-box",outline:"none"}}/>
    </div>

    {/* Output */}
    {campName&&<div style={{background:"#f8fafc",borderRadius:11,padding:13,border:"1px solid #e2e8f0"}}>
      <div style={{fontSize:13,fontWeight:700,color:"#111827",marginBottom:8}}>Generated Output</div>
      <CopyBlock label="Campaign Name" value={campName} accent="#34d399"/>
      {asFull&&<CopyBlock label="Ad Set Name" value={asFull} accent="#a78bfa"/>}
      {adFull&&<CopyBlock label="Ad Name" value={adFull} accent="#fb923c"/>}
      <CopyBlock label="Full UTM URL" value={utmUrl} accent="#34d399" mono={true} onCopy={function(){saveH()}}/>
      <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:8}}>
        <button onClick={shortenUrl} disabled={shortLoading} style={{padding:"6px 16px",borderRadius:6,border:"none",background:shortLoading?"#9ca3af":"#3B82F6",color:"#fff",fontSize:11,fontWeight:600,cursor:shortLoading?"wait":"pointer"}}>
          {shortLoading?"Shortening...":"Shorten URL"}
        </button>
        {shortError&&<span style={{fontSize:10,color:"#ef4444"}}>{shortError}</span>}
      </div>
      {shortUrl&&<CopyBlock label={"Short URL"} value={shortUrl} accent="#3B82F6" mono={true}/>}
      <div style={{marginTop:6,padding:"8px 10px",background:"#fff",borderRadius:7,border:"1px solid #e5e7eb"}}>
        <div style={{fontSize:9,fontWeight:600,color:"#6b7280",marginBottom:4,textTransform:"uppercase"}}>UTM Breakdown</div>
        <div style={{fontSize:10.5,fontFamily:"'IBM Plex Mono',monospace",lineHeight:1.9,color:"#374151"}}>
          <div><span style={{color:"#6b7280",display:"inline-block",width:105}}>utm_source:</span><span style={{color:CL.c.tx,fontWeight:600}}>{sel.platform||"\u2014"}</span></div>
          <div><span style={{color:"#6b7280",display:"inline-block",width:105}}>utm_medium:</span><span style={{color:CL.c.tx,fontWeight:600}}>{platObj?platObj.medium:"\u2014"}</span></div>
          <div><span style={{color:"#6b7280",display:"inline-block",width:105}}>utm_campaign:</span><span style={{color:CL.c.tx,fontWeight:600}}>{campName}</span></div>
          <div><span style={{color:"#6b7280",display:"inline-block",width:105}}>utm_content:</span><span style={{color:CL.a.tx,fontWeight:600}}>{asOwn||"\u2014"}</span></div>
          <div><span style={{color:"#6b7280",display:"inline-block",width:105}}>utm_term:</span><span style={{color:CL.d.tx,fontWeight:600}}>{adOwn||"\u2014"}</span></div>
        </div>
      </div>
    </div>}
  </div>}

  {/* ===== HISTORY ===== */}
  {tab==="history"&&<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <span style={{fontSize:13,fontWeight:700}}>History <span style={{fontSize:11,color:"#9ca3af",fontWeight:400}}>{hist.length} saved</span></span>
      {hist.length>0&&<button onClick={clearH} style={{padding:"4px 12px",borderRadius:6,border:"1px solid #fca5a5",background:"#fff",color:"#ef4444",fontSize:10,cursor:"pointer"}}>Clear all</button>}
    </div>
    {hist.length===0&&<p style={{color:"#9ca3af",fontSize:12,textAlign:"center",padding:30}}>No history yet. Copy a Full UTM URL to auto-save.</p>}
    {hist.map(function(h){return <div key={h.id} style={{background:"#f9fafb",borderRadius:9,padding:10,marginBottom:8,border:"1px solid #e5e7eb"}}>
      {h.domain&&<span style={{fontSize:9,background:h.domain==="WideBot"?"#e8f0fe":"#ede7f6",color:h.domain==="WideBot"?"#00327a":"#0002a1",padding:"1px 6px",borderRadius:4,fontWeight:600,marginBottom:4,display:"inline-block"}}>{h.domain}</span>}
      <MiniBlock label="Campaign Name" value={h.campaign} accent="#34d399"/>
      {h.adset&&<MiniBlock label="Ad Set Name" value={h.adset} accent="#a78bfa"/>}
      {h.ad&&<MiniBlock label="Ad Name" value={h.ad} accent="#fb923c"/>}
      <MiniBlock label="Full UTM URL" value={h.url} accent="#34d399"/>
      {h.shortUrl&&<MiniBlock label="Short URL" value={h.shortUrl} accent="#3B82F6"/>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
        <span style={{fontSize:8.5,color:"#9ca3af"}}>{h.ts}</span>
        <button onClick={function(){removeH(h.id)}} style={{padding:"2px 10px",borderRadius:4,border:"1px solid #fca5a5",background:"#fff",color:"#ef4444",fontSize:9,cursor:"pointer"}}>Remove</button>
      </div>
    </div>})}
  </div>}

  {/* ===== CODE REFERENCE ===== */}
  {tab==="reference"&&<div>
    <div style={{fontSize:11,color:"#6b7280",marginBottom:12}}>
      {"All codes. Campaign: "}<code style={{background:CL.c.lt,padding:"2px 5px",borderRadius:3,fontSize:10,color:CL.c.tx}}>platform-type-obj-landing-bid</code>
      {" Ad Set: "}<code style={{background:CL.a.lt,padding:"2px 5px",borderRadius:3,fontSize:10,color:CL.a.tx}}>audience</code>
      {" Ad: "}<code style={{background:CL.d.lt,padding:"2px 5px",borderRadius:3,fontSize:10,color:CL.d.tx}}>format-hook-ver</code>
    </div>
    {REF.map(function(s){return <div key={s.title} style={{marginBottom:18}}>
      <h3 style={{fontSize:13,fontWeight:700,color:s.color.tx,marginBottom:8,borderLeft:"4px solid "+s.color.bg,paddingLeft:10}}>{s.title}</h3>
      {s.groups.map(function(g){return <div key={g.label} style={{marginBottom:12}}>
        <div style={{fontSize:10.5,fontWeight:600,color:"#374151",marginBottom:4}}>{g.label}</div>
        <div style={{display:"grid",gridTemplateColumns:"80px 1fr",gap:"2px 12px",fontSize:11,fontFamily:"'IBM Plex Mono',monospace"}}>
          {g.items.map(function(i,idx){return <div key={i.code+"_"+idx} style={{display:"contents"}}>
            <span style={{fontWeight:600,color:s.color.tx}}>{i.code}</span>
            <span style={{color:"#6b7280"}}>{i.full}{i.plat&&i.plat!=="All"?" ["+i.plat+"]":""}{i.label?" ["+i.label+"]":""}</span>
          </div>})}
        </div>
      </div>})}
    </div>})}
  </div>}

  {/* ===== HOW IT WORKS ===== */}
  {tab==="looker"&&<div style={{fontSize:12,lineHeight:1.8,color:"#374151"}}>
    <h2 style={{fontSize:16,fontWeight:700,color:CL.c.tx,marginBottom:12}}>Looker Studio Guide</h2>

    <div style={{background:"#f9fafb",borderRadius:10,padding:14,border:"1px solid #e5e7eb",marginBottom:14}}>
      <h3 style={{fontSize:13,fontWeight:700,marginBottom:6}}>What is Looker Studio?</h3>
      <p style={{margin:"0 0 8px"}}>Looker Studio (formerly Google Data Studio) is a free tool from Google that lets you build visual dashboards and reports. You connect it to your data sources (like GA4, Google Sheets, or BigQuery) and create charts, tables, and filters to analyze your ad performance.</p>
      <p style={{margin:0}}>Think of it as: your ad platforms collect the data, GA4 stores it, Looker Studio visualizes it in a way you can filter and slice.</p>
    </div>

    <div style={{background:"#f9fafb",borderRadius:10,padding:14,border:"1px solid #e5e7eb",marginBottom:14}}>
      <h3 style={{fontSize:13,fontWeight:700,marginBottom:6}}>How Your UTM Data Flows</h3>
      <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,background:"#111827",color:"#34d399",padding:12,borderRadius:8,lineHeight:2.2}}>
        <div>{"1. Create UTM URL here \u2192 paste as ad destination URL"}</div>
        <div>{"2. Someone clicks your ad \u2192 lands on your site with UTM params"}</div>
        <div>{"3. GA4 captures: source, medium, campaign, content, term"}</div>
        <div>{"4. Looker Studio reads GA4 \u2192 you build dashboards from it"}</div>
      </div>
    </div>

    <div style={{background:"#f9fafb",borderRadius:10,padding:14,border:"1px solid #e5e7eb",marginBottom:14}}>
      <h3 style={{fontSize:13,fontWeight:700,marginBottom:6}}>The Magic: Splitting Names into Dimensions</h3>
      <p style={{margin:"0 0 8px"}}>{"Because your campaign name is structured as platform-type-obj-landing-bid, Looker Studio can SPLIT it by \"-\" to create separate filterable columns."}</p>
      <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10.5,lineHeight:2,marginLeft:8}}>
        {[["Platform","1"],["Campaign Type","2"],["Objective","3"],["Landing URL","4"],["Bidding","5"]].map(function(x){return <div key={x[0]}><span style={{color:"#6b7280"}}>{"SPLIT(Campaign, \"-\", "+x[1]+")"}</span>{" \u2192 "}<b style={{color:CL.c.tx}}>{x[0]}</b></div>})}
      </div>
    </div>

    <div style={{background:"#f9fafb",borderRadius:10,padding:14,border:"1px solid #e5e7eb",marginBottom:14}}>
      <h3 style={{fontSize:13,fontWeight:700,marginBottom:6}}>Step-by-Step: Setting Up in Looker Studio</h3>
      <div style={{fontSize:11.5,lineHeight:2}}>
        <p style={{margin:"0 0 4px"}}><b>Step 1:</b> Go to lookerstudio.google.com, Create, Report</p>
        <p style={{margin:"0 0 4px"}}><b>Step 2:</b> Add data source, choose Google Analytics 4, select your GA4 property</p>
        <p style={{margin:"0 0 4px"}}><b>Step 3:</b> Create calculated fields: Resource, Manage data sources, Edit, Add field</p>
      </div>
    </div>

    <div style={{background:"#f9fafb",borderRadius:10,padding:14,border:"1px solid #e5e7eb",marginBottom:14}}>
      <h3 style={{fontSize:13,fontWeight:700,marginBottom:6}}>Calculated Fields for Looker Studio</h3>
      <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,background:"#111827",color:"#34d399",padding:10,borderRadius:7,lineHeight:2}}>
        {[["Platform",'SPLIT(sessionCampaignName, "-", 1)'],["Campaign Type",'SPLIT(sessionCampaignName, "-", 2)'],["Objective",'SPLIT(sessionCampaignName, "-", 3)'],["Landing URL",'SPLIT(sessionCampaignName, "-", 4)'],["Bidding",'SPLIT(sessionCampaignName, "-", 5)'],["Audience",'sessionManualAdContent'],["Ad Format",'SPLIT(sessionManualTerm, "-", 1)'],["Ad Hook",'SPLIT(sessionManualTerm, "-", 2)']].map(function(x){return <div key={x[0]}><span style={{color:"#6b7280"}}>{x[0]+":"}</span>{" "+x[1]}</div>})}
      </div>
      <p style={{margin:"8px 0 0",fontSize:11}}><b>Step 4:</b> Use these fields as filters and dimensions in any chart. Create a table with Landing URL as a row and Sessions, Conversions, Revenue as metrics.</p>
      <p style={{margin:"4px 0 0",fontSize:11}}><b>Step 5:</b> Add dropdown filters for Platform, Objective, Landing URL, etc.</p>
    </div>

    <div style={{background:"#f9fafb",borderRadius:10,padding:14,border:"1px solid #e5e7eb",marginBottom:14}}>
      <h3 style={{fontSize:13,fontWeight:700,marginBottom:6}}>Label Mapping (CASE formula)</h3>
      <p style={{margin:"0 0 8px",fontSize:11}}>Use CASE formulas to convert short codes into readable labels:</p>
      <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,background:"#111827",color:"#34d399",padding:12,borderRadius:8,lineHeight:1.8,maxHeight:300,overflowY:"auto"}}>
        <div style={{color:"#6b7280"}}>-- Campaign Type Label --</div>
        <div>CASE</div>
        {data.types.map(function(t){return <div key={t.code}>{"  WHEN SPLIT(Campaign,\"-\",2) = \""+t.code+"\" THEN \""+t.full+"\""}</div>})}
        <div>{"  ELSE SPLIT(Campaign,\"-\",2)"}</div><div>END</div>
        <br/><div style={{color:"#6b7280"}}>-- Objective Label --</div><div>CASE</div>
        {data.objectives.map(function(o){return <div key={o.code}>{"  WHEN SPLIT(Campaign,\"-\",3) = \""+o.code+"\" THEN \""+o.full+"\""}</div>})}
        <div>{"  ELSE SPLIT(Campaign,\"-\",3)"}</div><div>END</div>
        <br/><div style={{color:"#6b7280"}}>-- Ad Format Label --</div><div>CASE</div>
        {data.formats.map(function(f){return <div key={f.code}>{"  WHEN SPLIT(Keyword,\"-\",1) = \""+f.code+"\" THEN \""+f.full+"\""}</div>})}
        <div>{"  ELSE SPLIT(Keyword,\"-\",1)"}</div><div>END</div>
      </div>
    </div>

    <div style={{background:"#f9fafb",borderRadius:10,padding:14,border:"1px solid #e5e7eb",marginBottom:14}}>
      <h3 style={{fontSize:13,fontWeight:700,marginBottom:6}}>What Reports Can You Build?</h3>
      <div style={{fontSize:11.5,lineHeight:1.9}}>
        <p style={{margin:"0 0 4px"}}><b>Performance by Landing URL:</b> Which product page drives the most conversions?</p>
        <p style={{margin:"0 0 4px"}}><b>Platform Comparison:</b> Is Meta outperforming LinkedIn for the same page?</p>
        <p style={{margin:"0 0 4px"}}><b>Objective Analysis:</b> Do conv campaigns outperform vid campaigns in leads?</p>
        <p style={{margin:"0 0 4px"}}><b>Creative Insights:</b> Which Ad Hook drives the most conversions?</p>
        <p style={{margin:"0 0 4px"}}><b>Audience Analysis:</b> Do website visitors outperform broad audiences?</p>
        <p style={{margin:"0 0 4px"}}><b>Ad Format Performance:</b> Video vs Carousel vs Static, what converts best?</p>
        <p style={{margin:0}}><b>Prospecting vs Retargeting:</b> What is the cost-per-lead difference?</p>
      </div>
    </div>

    <div style={{background:CL.c.lt,borderRadius:10,padding:14,border:"1px solid "+CL.c.bd,marginBottom:14}}>
      <h3 style={{fontSize:13,fontWeight:700,color:CL.c.tx,marginBottom:6}}>UTM Tracking Notes</h3>
      <p style={{margin:"0 0 10px",fontSize:11.5}}>{"GA4 captures UTM parameters automatically. In your GA4 property \u2192 Reports, you can find sessions attributed to specific campaigns."}</p>
      <div style={{fontSize:11.5,lineHeight:2.2}}>
        <div><b style={{color:CL.c.tx}}>utm_source</b>{" \u2192 identifies the platform (facebook, google, linkedin)"}</div>
        <div><b style={{color:CL.c.tx}}>utm_medium</b>{" \u2192 identifies channel type (paid, social, cpc, email)"}</div>
        <div><b style={{color:CL.c.tx}}>utm_campaign</b>{" \u2192 your full campaign name"}</div>
        <div><b style={{color:CL.a.tx}}>utm_content</b>{" \u2192 your audience type"}</div>
        <div><b style={{color:CL.d.tx}}>utm_term</b>{" \u2192 your ad format and hook"}</div>
      </div>
      <p style={{margin:"10px 0 0",fontSize:11,color:"#6b7280"}}>{"These flow into GA4 as: sessionSource, sessionMedium, sessionCampaignName, sessionManualAdContent, sessionManualTerm"}</p>
    </div>

    <div style={{background:CL.c.lt,borderRadius:10,padding:14,border:"1px solid "+CL.c.bd}}>
      <h3 style={{fontSize:13,fontWeight:700,color:CL.c.tx,marginBottom:6}}>GA4 / Looker Mapping</h3>
      <div style={{display:"grid",gridTemplateColumns:"110px 180px",gap:"3px 10px",fontFamily:"'IBM Plex Mono',monospace",fontSize:10}}>
        <span style={{fontWeight:700}}>UTM</span><span style={{fontWeight:700}}>GA4 Dimension</span>
        <span style={{color:CL.c.tx}}>utm_source</span><span>sessionSource</span>
        <span style={{color:CL.c.tx}}>utm_medium</span><span>sessionMedium</span>
        <span style={{color:CL.c.tx}}>utm_campaign</span><span>sessionCampaignName</span>
        <span style={{color:CL.a.tx}}>utm_content</span><span>sessionManualAdContent</span>
        <span style={{color:CL.d.tx}}>utm_term</span><span>sessionManualTerm</span>
      </div>
    </div>
  </div>}

  {/* ===== ADMIN ===== */}
  {tab==="admin"&&<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <span style={{fontSize:14,fontWeight:700}}>Admin Panel</span>
      <button onClick={resetD} style={{padding:"4px 12px",borderRadius:6,border:"1px solid #fca5a5",background:"#fff",color:"#ef4444",fontSize:10,cursor:"pointer"}}>Reset to defaults</button>
    </div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
      {DIMS.map(function(d){return <button key={d.key} onClick={function(){setAdmDim(d.key)}} style={{padding:"4px 10px",borderRadius:5,fontSize:10,cursor:"pointer",border:admDim===d.key?"2px solid "+CL.c.bg:"1px solid #d1d5db",background:admDim===d.key?CL.c.lt:"#fff",color:admDim===d.key?CL.c.tx:"#6b7280",fontWeight:admDim===d.key?600:400}}>{d.label} ({data[d.key].length})</button>})}
    </div>
    <div style={{background:"#f9fafb",borderRadius:10,padding:12,border:"1px solid #e5e7eb",marginBottom:12}}>
      <div style={{fontSize:11,fontWeight:600,marginBottom:8}}>{"Add new "+(DIMS.find(function(d){return d.key===admDim})||{}).label}</div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        <input placeholder="Code" value={admNew.code} onChange={function(e){setAdmNew(function(p){return{code:e.target.value,full:p.full,extra:p.extra}})}} style={{padding:"5px 8px",borderRadius:5,border:"1px solid #d1d5db",fontSize:11,width:80}}/>
        <input placeholder="Full Name" value={admNew.full} onChange={function(e){setAdmNew(function(p){return{code:p.code,full:e.target.value,extra:p.extra}})}} style={{padding:"5px 8px",borderRadius:5,border:"1px solid #d1d5db",fontSize:11,width:160}}/>
        {(DIMS.find(function(d){return d.key===admDim})||{}).extra&&<input placeholder={(DIMS.find(function(d){return d.key===admDim})||{}).extra} value={admNew.extra} onChange={function(e){setAdmNew(function(p){return{code:p.code,full:p.full,extra:e.target.value}})}} style={{padding:"5px 8px",borderRadius:5,border:"1px solid #d1d5db",fontSize:11,flex:1,minWidth:120}}/>}
        <button onClick={function(){
          if(!admNew.code||!admNew.full)return;
          var i={code:admNew.code.toLowerCase().trim(),full:admNew.full.trim()};
          if(admDim==="platforms")i.medium=admNew.extra||"paid";
          if(admDim==="objectives"||admDim==="formats")i.plat=admNew.extra||"All";
          if(admDim==="landingUrls"){i.arUrl=admNew.extra||"";i.enUrl="";i.label="WideBot";i.cat="General"}
          if(admDim==="hooks")i.cat=admNew.extra||"General";
          var nd=Object.assign({},data);nd[admDim]=data[admDim].concat([i]);setData(nd);save("wb-utm-config",nd);
          setAdmNew({code:"",full:"",extra:""});
        }} style={{padding:"5px 14px",borderRadius:5,border:"none",background:CL.c.bg,color:"#fff",fontSize:11,cursor:"pointer"}}>Add</button>
      </div>
    </div>
    <div style={{background:"#fff",borderRadius:10,border:"1px solid #e5e7eb",maxHeight:400,overflowY:"auto"}}>
      {data[admDim].map(function(item,i){return <div key={item.code+"_"+i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 12px",borderBottom:"1px solid #f3f4f6"}}>
        <div><span style={{fontFamily:"'IBM Plex Mono',monospace",fontWeight:600,color:CL.c.tx,fontSize:11,marginRight:8}}>{item.code}</span><span style={{fontSize:11,color:"#374151"}}>{item.full}</span>{(item.label||item.plat||item.cat||item.medium)?<span style={{fontSize:9,color:"#9ca3af",marginLeft:6}}>{item.label||item.plat||item.cat||item.medium}</span>:null}</div>
        <button onClick={function(){var nd=Object.assign({},data);nd[admDim]=data[admDim].filter(function(x,j){return j!==i});setData(nd);save("wb-utm-config",nd)}} style={{padding:"2px 8px",borderRadius:4,border:"1px solid #fca5a5",background:"#fff",color:"#ef4444",fontSize:9,cursor:"pointer"}}>Remove</button>
      </div>})}
    </div>
  </div>}

  </div>);
}

function CopyBlock(props){
  var label=props.label,value=props.value,accent=props.accent||"#34d399",mono=props.mono,onCopy=props.onCopy;
  var ref=useState(false),cp=ref[0],setCp=ref[1];
  var copy=function(){navigator.clipboard.writeText(value);setCp(true);setTimeout(function(){setCp(false)},1200);if(onCopy)onCopy()};
  return <div style={{marginBottom:8}}>
    <div style={{fontSize:9,fontWeight:600,color:"#6b7280",marginBottom:2,textTransform:"uppercase"}}>{label}</div>
    <div onClick={copy} style={{background:"#111827",color:accent,padding:"7px 11px",borderRadius:7,fontFamily:mono?"'IBM Plex Mono',monospace":"'IBM Plex Sans',sans-serif",fontSize:mono?10:11.5,cursor:"pointer",position:"relative",wordBreak:"break-all",lineHeight:1.5,border:"1px solid #1f2937"}}>
      {value}<span style={{position:"absolute",right:8,top:7,fontSize:8.5,color:cp?accent:"#6b7280"}}>{cp?"Copied!":"Click to copy"}</span>
    </div>
  </div>;
}

function MiniBlock(props){
  var label=props.label,value=props.value,accent=props.accent||"#34d399";
  var ref=useState(false),cp=ref[0],setCp=ref[1];
  var copy=function(){navigator.clipboard.writeText(value);setCp(true);setTimeout(function(){setCp(false)},1200)};
  return <div style={{marginBottom:5}}>
    <div style={{fontSize:8,fontWeight:600,color:"#6b7280",textTransform:"uppercase"}}>{label}</div>
    <div onClick={copy} style={{background:"#111827",color:accent,padding:"5px 8px",borderRadius:5,fontFamily:"'IBM Plex Mono',monospace",fontSize:9,cursor:"pointer",position:"relative",wordBreak:"break-all",lineHeight:1.4,border:"1px solid #1f2937"}}>
      {value}<span style={{position:"absolute",right:6,top:5,fontSize:7.5,color:cp?accent:"#6b7280"}}>{cp?"Copied!":"Copy"}</span>
    </div>
  </div>;
}
