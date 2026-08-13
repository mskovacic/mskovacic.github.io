import{A as e,I as t,O as n,P as r,t as i}from"./jsx-runtime-DjntjLAu.js";var a=t(e(),1);function o(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function s(e){if(Array.isArray(e))return e}function c(e){if(Array.isArray(e))return o(e)}function l(e,t){if(!(e instanceof t))throw TypeError(`Cannot call a class as a function`)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,ne(r.key),r)}}function d(e,t,n){return t&&u(e.prototype,t),n&&u(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function f(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(!n){if(Array.isArray(e)||(n=ie(e))||t&&e&&typeof e.length==`number`){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||n.return==null||n.return()}finally{if(s)throw a}}}}function p(e,t,n){return(t=ne(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function h(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function g(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function _(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?v(Object(n),!0).forEach(function(t){p(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function ee(e,t){return s(e)||h(e,t)||ie(e,t)||g()}function b(e){return c(e)||m(e)||ie(e)||_()}function te(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function ne(e){var t=te(e,`string`);return typeof t==`symbol`?t:t+``}function re(e){"@babel/helpers - typeof";return re=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},re(e)}function ie(e,t){if(e){if(typeof e==`string`)return o(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}var ae=function(){},oe={},se={},ce=null,le={mark:ae,measure:ae};try{typeof window<`u`&&(oe=window),typeof document<`u`&&(se=document),typeof MutationObserver<`u`&&(ce=MutationObserver),typeof performance<`u`&&(le=performance)}catch{}var ue=(oe.navigator||{}).userAgent,x=ue===void 0?``:ue,de=oe,S=se,fe=ce,pe=le;de.document;var me=!!S.documentElement&&!!S.head&&typeof S.addEventListener==`function`&&typeof S.createElement==`function`,he=~x.indexOf(`MSIE`)||~x.indexOf(`Trident/`),ge,_e=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|gt|jr|jfr|jdr|usb|ufsb|udsb|cr|ss|sr|sl|st|sds|sdr|sdl|sdt|sldr|slpdr|pr|ms|vs)?[\-\ ]/,ve=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Graphite|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Utility|Utility Fill|Utility Duo|Slab Press|Slab|Slab Duo|Slab Press Duo|Pixel|Mosaic|Vellum|Whiteboard)?.*/i,ye={classic:{fa:`solid`,fas:`solid`,"fa-solid":`solid`,far:`regular`,"fa-regular":`regular`,fal:`light`,"fa-light":`light`,fat:`thin`,"fa-thin":`thin`,fab:`brands`,"fa-brands":`brands`},duotone:{fa:`solid`,fad:`solid`,"fa-solid":`solid`,"fa-duotone":`solid`,fadr:`regular`,"fa-regular":`regular`,fadl:`light`,"fa-light":`light`,fadt:`thin`,"fa-thin":`thin`},sharp:{fa:`solid`,fass:`solid`,"fa-solid":`solid`,fasr:`regular`,"fa-regular":`regular`,fasl:`light`,"fa-light":`light`,fast:`thin`,"fa-thin":`thin`},"sharp-duotone":{fa:`solid`,fasds:`solid`,"fa-solid":`solid`,fasdr:`regular`,"fa-regular":`regular`,fasdl:`light`,"fa-light":`light`,fasdt:`thin`,"fa-thin":`thin`},slab:{"fa-regular":`regular`,faslr:`regular`},"slab-press":{"fa-regular":`regular`,faslpr:`regular`},"slab-duo":{"fa-regular":`regular`,fasldr:`regular`},"slab-press-duo":{"fa-regular":`regular`,faslpdr:`regular`},thumbprint:{"fa-light":`light`,fatl:`light`},vellum:{"fa-solid":`solid`,favs:`solid`},pixel:{"fa-regular":`regular`,fapr:`regular`},mosaic:{"fa-solid":`solid`,fams:`solid`},whiteboard:{"fa-semibold":`semibold`,fawsb:`semibold`},notdog:{"fa-solid":`solid`,fans:`solid`},"notdog-duo":{"fa-solid":`solid`,fands:`solid`},etch:{"fa-solid":`solid`,faes:`solid`},graphite:{"fa-thin":`thin`,fagt:`thin`},jelly:{"fa-regular":`regular`,fajr:`regular`},"jelly-fill":{"fa-regular":`regular`,fajfr:`regular`},"jelly-duo":{"fa-regular":`regular`,fajdr:`regular`},chisel:{"fa-regular":`regular`,facr:`regular`},utility:{"fa-semibold":`semibold`,fausb:`semibold`},"utility-duo":{"fa-semibold":`semibold`,faudsb:`semibold`},"utility-fill":{"fa-semibold":`semibold`,faufsb:`semibold`}},be={GROUP:`duotone-group`,SWAP_OPACITY:`swap-opacity`,PRIMARY:`primary`,SECONDARY:`secondary`},xe=[`fa-classic`,`fa-duotone`,`fa-sharp`,`fa-sharp-duotone`,`fa-thumbprint`,`fa-whiteboard`,`fa-notdog`,`fa-notdog-duo`,`fa-chisel`,`fa-etch`,`fa-graphite`,`fa-jelly`,`fa-jelly-fill`,`fa-jelly-duo`,`fa-slab`,`fa-slab-press`,`fa-slab-press-duo`,`fa-slab-duo`,`fa-mosaic`,`fa-pixel`,`fa-vellum`,`fa-utility`,`fa-utility-duo`,`fa-utility-fill`],C=`classic`,Se=`duotone`,Ce=`sharp`,we=`sharp-duotone`,Te=`chisel`,Ee=`etch`,De=`graphite`,Oe=`jelly`,ke=`jelly-duo`,Ae=`jelly-fill`,je=`mosaic`,Me=`notdog`,Ne=`notdog-duo`,Pe=`pixel`,Fe=`slab`,Ie=`slab-duo`,Le=`slab-press`,Re=`slab-press-duo`,ze=`thumbprint`,Be=`utility`,Ve=`utility-duo`,He=`utility-fill`,Ue=`vellum`,We=`whiteboard`,Ge=`Classic`,Ke=`Duotone`,qe=`Sharp`,Je=`Sharp Duotone`,Ye=`Chisel`,Xe=`Etch`,Ze=`Graphite`,Qe=`Jelly`,$e=`Jelly Duo`,et=`Jelly Fill`,tt=`Mosaic`,nt=`Notdog`,rt=`Notdog Duo`,it=`Pixel`,at=`Slab`,ot=`Slab Duo`,st=`Slab Press`,ct=`Slab Press Duo`,lt=`Thumbprint`,ut=`Utility`,dt=`Utility Duo`,ft=`Utility Fill`,pt=`Vellum`,mt=`Whiteboard`,ht=[C,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We];ge={},p(p(p(p(p(p(p(p(p(p(ge,C,Ge),Se,Ke),Ce,qe),we,Je),Te,Ye),Ee,Xe),De,Ze),Oe,Qe),ke,$e),Ae,et),p(p(p(p(p(p(p(p(p(p(ge,je,tt),Me,nt),Ne,rt),Pe,it),Fe,at),Ie,ot),Le,st),Re,ct),ze,lt),Be,ut),p(p(p(p(ge,Ve,dt),He,ft),Ue,pt),We,mt);var gt={classic:{900:`fas`,400:`far`,normal:`far`,300:`fal`,100:`fat`},duotone:{900:`fad`,400:`fadr`,300:`fadl`,100:`fadt`},sharp:{900:`fass`,400:`fasr`,300:`fasl`,100:`fast`},"sharp-duotone":{900:`fasds`,400:`fasdr`,300:`fasdl`,100:`fasdt`},slab:{400:`faslr`},"slab-press":{400:`faslpr`},"slab-duo":{400:`fasldr`},"slab-press-duo":{400:`faslpdr`},vellum:{900:`favs`},mosaic:{900:`fams`},pixel:{400:`fapr`},whiteboard:{600:`fawsb`},thumbprint:{300:`fatl`},notdog:{900:`fans`},"notdog-duo":{900:`fands`},etch:{900:`faes`},graphite:{100:`fagt`},chisel:{400:`facr`},jelly:{400:`fajr`},"jelly-fill":{400:`fajfr`},"jelly-duo":{400:`fajdr`},utility:{600:`fausb`},"utility-duo":{600:`faudsb`},"utility-fill":{600:`faufsb`}},_t={"Font Awesome 7 Free":{900:`fas`,400:`far`},"Font Awesome 7 Pro":{900:`fas`,400:`far`,normal:`far`,300:`fal`,100:`fat`},"Font Awesome 7 Brands":{400:`fab`,normal:`fab`},"Font Awesome 7 Duotone":{900:`fad`,400:`fadr`,normal:`fadr`,300:`fadl`,100:`fadt`},"Font Awesome 7 Sharp":{900:`fass`,400:`fasr`,normal:`fasr`,300:`fasl`,100:`fast`},"Font Awesome 7 Sharp Duotone":{900:`fasds`,400:`fasdr`,normal:`fasdr`,300:`fasdl`,100:`fasdt`},"Font Awesome 7 Jelly":{400:`fajr`,normal:`fajr`},"Font Awesome 7 Jelly Fill":{400:`fajfr`,normal:`fajfr`},"Font Awesome 7 Jelly Duo":{400:`fajdr`,normal:`fajdr`},"Font Awesome 7 Slab":{400:`faslr`,normal:`faslr`},"Font Awesome 7 Slab Press":{400:`faslpr`,normal:`faslpr`},"Font Awesome 7 Slab Duo":{400:`fasldr`,normal:`fasldr`},"Font Awesome 7 Slab Press Duo":{400:`faslpdr`,normal:`faslpdr`},"Font Awesome 7 Pixel":{400:`fapr`,normal:`fapr`},"Font Awesome 7 Mosaic":{900:`fams`,normal:`fams`},"Font Awesome 7 Vellum":{900:`favs`,normal:`favs`},"Font Awesome 7 Thumbprint":{300:`fatl`,normal:`fatl`},"Font Awesome 7 Notdog":{900:`fans`,normal:`fans`},"Font Awesome 7 Notdog Duo":{900:`fands`,normal:`fands`},"Font Awesome 7 Etch":{900:`faes`,normal:`faes`},"Font Awesome 7 Graphite":{100:`fagt`,normal:`fagt`},"Font Awesome 7 Chisel":{400:`facr`,normal:`facr`},"Font Awesome 7 Whiteboard":{600:`fawsb`,normal:`fawsb`},"Font Awesome 7 Utility":{600:`fausb`,normal:`fausb`},"Font Awesome 7 Utility Duo":{600:`faudsb`,normal:`faudsb`},"Font Awesome 7 Utility Fill":{600:`faufsb`,normal:`faufsb`}},vt=new Map([[`classic`,{defaultShortPrefixId:`fas`,defaultStyleId:`solid`,styleIds:[`solid`,`regular`,`light`,`thin`,`brands`],futureStyleIds:[],defaultFontWeight:900}],[`duotone`,{defaultShortPrefixId:`fad`,defaultStyleId:`solid`,styleIds:[`solid`,`regular`,`light`,`thin`],futureStyleIds:[],defaultFontWeight:900}],[`sharp`,{defaultShortPrefixId:`fass`,defaultStyleId:`solid`,styleIds:[`solid`,`regular`,`light`,`thin`],futureStyleIds:[],defaultFontWeight:900}],[`sharp-duotone`,{defaultShortPrefixId:`fasds`,defaultStyleId:`solid`,styleIds:[`solid`,`regular`,`light`,`thin`],futureStyleIds:[],defaultFontWeight:900}],[`chisel`,{defaultShortPrefixId:`facr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`etch`,{defaultShortPrefixId:`faes`,defaultStyleId:`solid`,styleIds:[`solid`],futureStyleIds:[],defaultFontWeight:900}],[`graphite`,{defaultShortPrefixId:`fagt`,defaultStyleId:`thin`,styleIds:[`thin`],futureStyleIds:[],defaultFontWeight:100}],[`jelly`,{defaultShortPrefixId:`fajr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`jelly-duo`,{defaultShortPrefixId:`fajdr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`jelly-fill`,{defaultShortPrefixId:`fajfr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`mosaic`,{defaultShortPrefixId:`fams`,defaultStyleId:`solid`,styleIds:[`solid`],futureStyleIds:[],defaultFontWeight:900}],[`notdog`,{defaultShortPrefixId:`fans`,defaultStyleId:`solid`,styleIds:[`solid`],futureStyleIds:[],defaultFontWeight:900}],[`notdog-duo`,{defaultShortPrefixId:`fands`,defaultStyleId:`solid`,styleIds:[`solid`],futureStyleIds:[],defaultFontWeight:900}],[`pixel`,{defaultShortPrefixId:`fapr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`slab`,{defaultShortPrefixId:`faslr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`slab-duo`,{defaultShortPrefixId:`fasldr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`slab-press`,{defaultShortPrefixId:`faslpr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`slab-press-duo`,{defaultShortPrefixId:`faslpdr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`thumbprint`,{defaultShortPrefixId:`fatl`,defaultStyleId:`light`,styleIds:[`light`],futureStyleIds:[],defaultFontWeight:300}],[`utility`,{defaultShortPrefixId:`fausb`,defaultStyleId:`semibold`,styleIds:[`semibold`],futureStyleIds:[],defaultFontWeight:600}],[`utility-duo`,{defaultShortPrefixId:`faudsb`,defaultStyleId:`semibold`,styleIds:[`semibold`],futureStyleIds:[],defaultFontWeight:600}],[`utility-fill`,{defaultShortPrefixId:`faufsb`,defaultStyleId:`semibold`,styleIds:[`semibold`],futureStyleIds:[],defaultFontWeight:600}],[`vellum`,{defaultShortPrefixId:`favs`,defaultStyleId:`solid`,styleIds:[`solid`],futureStyleIds:[],defaultFontWeight:900}],[`whiteboard`,{defaultShortPrefixId:`fawsb`,defaultStyleId:`semibold`,styleIds:[`semibold`],futureStyleIds:[],defaultFontWeight:600}]]),yt={chisel:{regular:`facr`},classic:{brands:`fab`,light:`fal`,regular:`far`,solid:`fas`,thin:`fat`},duotone:{light:`fadl`,regular:`fadr`,solid:`fad`,thin:`fadt`},etch:{solid:`faes`},graphite:{thin:`fagt`},jelly:{regular:`fajr`},"jelly-duo":{regular:`fajdr`},"jelly-fill":{regular:`fajfr`},mosaic:{solid:`fams`},notdog:{solid:`fans`},"notdog-duo":{solid:`fands`},pixel:{regular:`fapr`},sharp:{light:`fasl`,regular:`fasr`,solid:`fass`,thin:`fast`},"sharp-duotone":{light:`fasdl`,regular:`fasdr`,solid:`fasds`,thin:`fasdt`},slab:{regular:`faslr`},"slab-duo":{regular:`fasldr`},"slab-press":{regular:`faslpr`},"slab-press-duo":{regular:`faslpdr`},thumbprint:{light:`fatl`},utility:{semibold:`fausb`},"utility-duo":{semibold:`faudsb`},"utility-fill":{semibold:`faufsb`},vellum:{solid:`favs`},whiteboard:{semibold:`fawsb`}},bt=[`fak`,`fa-kit`,`fakd`,`fa-kit-duotone`],xt={kit:{fak:`kit`,"fa-kit":`kit`},"kit-duotone":{fakd:`kit-duotone`,"fa-kit-duotone":`kit-duotone`}},St=[`kit`];p(p({},`kit`,`Kit`),`kit-duotone`,`Kit Duotone`);var Ct={kit:{"fa-kit":`fak`},"kit-duotone":{"fa-kit-duotone":`fakd`}},wt={"Font Awesome Kit":{400:`fak`,normal:`fak`},"Font Awesome Kit Duotone":{400:`fakd`,normal:`fakd`}},Tt={kit:{fak:`fa-kit`},"kit-duotone":{fakd:`fa-kit-duotone`}},Et={kit:{kit:`fak`},"kit-duotone":{"kit-duotone":`fakd`}},Dt,Ot={GROUP:`duotone-group`,SWAP_OPACITY:`swap-opacity`,PRIMARY:`primary`,SECONDARY:`secondary`},kt=[`fa-classic`,`fa-duotone`,`fa-sharp`,`fa-sharp-duotone`,`fa-thumbprint`,`fa-whiteboard`,`fa-notdog`,`fa-notdog-duo`,`fa-chisel`,`fa-etch`,`fa-graphite`,`fa-jelly`,`fa-jelly-fill`,`fa-jelly-duo`,`fa-slab`,`fa-slab-press`,`fa-slab-press-duo`,`fa-slab-duo`,`fa-mosaic`,`fa-pixel`,`fa-vellum`,`fa-utility`,`fa-utility-duo`,`fa-utility-fill`];Dt={},p(p(p(p(p(p(p(p(p(p(Dt,`classic`,`Classic`),`duotone`,`Duotone`),`sharp`,`Sharp`),`sharp-duotone`,`Sharp Duotone`),`chisel`,`Chisel`),`etch`,`Etch`),`graphite`,`Graphite`),`jelly`,`Jelly`),`jelly-duo`,`Jelly Duo`),`jelly-fill`,`Jelly Fill`),p(p(p(p(p(p(p(p(p(p(Dt,`mosaic`,`Mosaic`),`notdog`,`Notdog`),`notdog-duo`,`Notdog Duo`),`pixel`,`Pixel`),`slab`,`Slab`),`slab-duo`,`Slab Duo`),`slab-press`,`Slab Press`),`slab-press-duo`,`Slab Press Duo`),`thumbprint`,`Thumbprint`),`utility`,`Utility`),p(p(p(p(Dt,`utility-duo`,`Utility Duo`),`utility-fill`,`Utility Fill`),`vellum`,`Vellum`),`whiteboard`,`Whiteboard`),p(p({},`kit`,`Kit`),`kit-duotone`,`Kit Duotone`);var At={classic:{"fa-brands":`fab`,"fa-duotone":`fad`,"fa-light":`fal`,"fa-regular":`far`,"fa-solid":`fas`,"fa-thin":`fat`},duotone:{"fa-regular":`fadr`,"fa-light":`fadl`,"fa-thin":`fadt`},sharp:{"fa-solid":`fass`,"fa-regular":`fasr`,"fa-light":`fasl`,"fa-thin":`fast`},"sharp-duotone":{"fa-solid":`fasds`,"fa-regular":`fasdr`,"fa-light":`fasdl`,"fa-thin":`fasdt`},slab:{"fa-regular":`faslr`},"slab-press":{"fa-regular":`faslpr`},"slab-duo":{"fa-regular":`fasldr`},"slab-press-duo":{"fa-regular":`faslpdr`},pixel:{"fa-regular":`fapr`},mosaic:{"fa-solid":`fams`},vellum:{"fa-solid":`favs`},whiteboard:{"fa-semibold":`fawsb`},thumbprint:{"fa-light":`fatl`},notdog:{"fa-solid":`fans`},"notdog-duo":{"fa-solid":`fands`},etch:{"fa-solid":`faes`},graphite:{"fa-thin":`fagt`},jelly:{"fa-regular":`fajr`},"jelly-fill":{"fa-regular":`fajfr`},"jelly-duo":{"fa-regular":`fajdr`},chisel:{"fa-regular":`facr`},utility:{"fa-semibold":`fausb`},"utility-duo":{"fa-semibold":`faudsb`},"utility-fill":{"fa-semibold":`faufsb`}},jt={classic:[`fas`,`far`,`fal`,`fat`,`fad`],duotone:[`fadr`,`fadl`,`fadt`],sharp:[`fass`,`fasr`,`fasl`,`fast`],"sharp-duotone":[`fasds`,`fasdr`,`fasdl`,`fasdt`],slab:[`faslr`],"slab-press":[`faslpr`],"slab-duo":[`fasldr`],"slab-press-duo":[`faslpdr`],pixel:[`fapr`],mosaic:[`fams`],vellum:[`favs`],whiteboard:[`fawsb`],thumbprint:[`fatl`],notdog:[`fans`],"notdog-duo":[`fands`],etch:[`faes`],graphite:[`fagt`],jelly:[`fajr`],"jelly-fill":[`fajfr`],"jelly-duo":[`fajdr`],chisel:[`facr`],utility:[`fausb`],"utility-duo":[`faudsb`],"utility-fill":[`faufsb`]},Mt={classic:{fab:`fa-brands`,fad:`fa-duotone`,fal:`fa-light`,far:`fa-regular`,fas:`fa-solid`,fat:`fa-thin`},duotone:{fadr:`fa-regular`,fadl:`fa-light`,fadt:`fa-thin`},sharp:{fass:`fa-solid`,fasr:`fa-regular`,fasl:`fa-light`,fast:`fa-thin`},"sharp-duotone":{fasds:`fa-solid`,fasdr:`fa-regular`,fasdl:`fa-light`,fasdt:`fa-thin`},slab:{faslr:`fa-regular`},"slab-press":{faslpr:`fa-regular`},"slab-duo":{fasldr:`fa-regular`},"slab-press-duo":{faslpdr:`fa-regular`},pixel:{fapr:`fa-regular`},mosaic:{fams:`fa-solid`},vellum:{favs:`fa-solid`},whiteboard:{fawsb:`fa-semibold`},thumbprint:{fatl:`fa-light`},notdog:{fans:`fa-solid`},"notdog-duo":{fands:`fa-solid`},etch:{faes:`fa-solid`},graphite:{fagt:`fa-thin`},jelly:{fajr:`fa-regular`},"jelly-fill":{fajfr:`fa-regular`},"jelly-duo":{fajdr:`fa-regular`},chisel:{facr:`fa-regular`},utility:{fausb:`fa-semibold`},"utility-duo":{faudsb:`fa-semibold`},"utility-fill":{faufsb:`fa-semibold`}},Nt=`fa.fas.far.fal.fat.fad.fadr.fadl.fadt.fab.fass.fasr.fasl.fast.fasds.fasdr.fasdl.fasdt.faslr.faslpr.fasldr.faslpdr.fapr.fams.favs.fawsb.fatl.fans.fands.faes.fagt.fajr.fajfr.fajdr.facr.fausb.faudsb.faufsb`.split(`.`).concat(kt,[`fa-solid`,`fa-regular`,`fa-light`,`fa-thin`,`fa-duotone`,`fa-brands`,`fa-semibold`]),Pt=[`solid`,`regular`,`light`,`thin`,`duotone`,`brands`,`semibold`],Ft=[1,2,3,4,5,6,7,8,9,10],It=Ft.concat([11,12,13,14,15,16,17,18,19,20]),Lt=[].concat(b(Object.keys(jt)),Pt,[`aw`,`fw`,`pull-left`,`pull-right`],[`2xs`,`xs`,`sm`,`lg`,`xl`,`2xl`,`beat`,`beat-fade`,`border`,`bounce`,`buzz`,`canvas-square`,`canvas-roomy`,`fade`,`flip-360`,`flip-both`,`flip-horizontal`,`flip-vertical`,`flip`,`float`,`inverse`,`jello`,`layers`,`layers-bottom-left`,`layers-bottom-right`,`layers-counter`,`layers-text`,`layers-top-left`,`layers-top-right`,`li`,`pull-end`,`pull-start`,`pulse`,`rotate-180`,`rotate-270`,`rotate-90`,`rotate-by`,`shake`,`spin-pulse`,`spin-reverse`,`spin`,`spin-snap`,`spin-snap-4`,`spin-snap-8`,`stack-1x`,`stack-2x`,`stack`,`swing`,`ul`,`wag`,`width-auto`,`width-fixed`,Ot.GROUP,Ot.SWAP_OPACITY,Ot.PRIMARY,Ot.SECONDARY],Ft.map(function(e){return`${e}x`}),It.map(function(e){return`w-${e}`})),Rt={"Font Awesome 5 Free":{900:`fas`,400:`far`},"Font Awesome 5 Pro":{900:`fas`,400:`far`,normal:`far`,300:`fal`},"Font Awesome 5 Brands":{400:`fab`,normal:`fab`},"Font Awesome 5 Duotone":{900:`fad`}},zt=`___FONT_AWESOME___`,Bt=16,Vt=`fa`,Ht=`svg-inline--fa`,Ut=`data-fa-i2svg`,Wt=`data-fa-pseudo-element`,Gt=`data-fa-pseudo-element-pending`,Kt=`data-prefix`,qt=`data-icon`,Jt=`fontawesome-i2svg`,Yt=`async`,Xt=[`HTML`,`HEAD`,`STYLE`,`SCRIPT`],Zt=[`::before`,`::after`,`:before`,`:after`],Qt=function(){try{return!0}catch{return!1}}();function $t(e){return new Proxy(e,{get:function(e,t){return t in e?e[t]:e[C]}})}var en=y({},ye);en[C]=y(y(y(y({},{"fa-duotone":`duotone`}),ye[C]),xt.kit),xt[`kit-duotone`]);var tn=$t(en),nn=y({},yt);nn[C]=y(y(y(y({},{duotone:`fad`}),nn[C]),Et.kit),Et[`kit-duotone`]);var rn=$t(nn),an=y({},Mt);an[C]=y(y({},an[C]),Tt.kit);var on=$t(an),sn=y({},At);sn[C]=y(y({},sn[C]),Ct.kit),$t(sn);var cn=_e,ln=`fa-layers-text`,un=ve;$t(y({},gt));var dn=[`class`,`data-prefix`,`data-icon`,`data-fa-transform`,`data-fa-mask`],fn=be,pn=[].concat(b(St),b(Lt)),mn=de.FontAwesomeConfig||{};function hn(e){var t=S.querySelector(`script[`+e+`]`);if(t)return t.getAttribute(e)}function gn(e){return e===``?!0:e===`false`?!1:e===`true`||e}S&&typeof S.querySelector==`function`&&[[`data-family-prefix`,`familyPrefix`],[`data-css-prefix`,`cssPrefix`],[`data-family-default`,`familyDefault`],[`data-style-default`,`styleDefault`],[`data-replacement-class`,`replacementClass`],[`data-auto-replace-svg`,`autoReplaceSvg`],[`data-auto-add-css`,`autoAddCss`],[`data-search-pseudo-elements`,`searchPseudoElements`],[`data-search-pseudo-elements-warnings`,`searchPseudoElementsWarnings`],[`data-search-pseudo-elements-full-scan`,`searchPseudoElementsFullScan`],[`data-observe-mutations`,`observeMutations`],[`data-mutate-approach`,`mutateApproach`],[`data-keep-original-source`,`keepOriginalSource`],[`data-measure-performance`,`measurePerformance`],[`data-show-missing-icons`,`showMissingIcons`]].forEach(function(e){var t=ee(e,2),n=t[0],r=t[1],i=gn(hn(n));i!=null&&(mn[r]=i)});var _n={styleDefault:`solid`,familyDefault:C,cssPrefix:Vt,replacementClass:Ht,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:`async`,keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};mn.familyPrefix&&(mn.cssPrefix=mn.familyPrefix);var vn=y(y({},_n),mn);vn.autoReplaceSvg||(vn.observeMutations=!1);var w={};Object.keys(_n).forEach(function(e){Object.defineProperty(w,e,{enumerable:!0,set:function(t){vn[e]=t,yn.forEach(function(e){return e(w)})},get:function(){return vn[e]}})}),Object.defineProperty(w,"familyPrefix",{enumerable:!0,set:function(e){vn.cssPrefix=e,yn.forEach(function(e){return e(w)})},get:function(){return vn.cssPrefix}}),de.FontAwesomeConfig=w;var yn=[];function bn(e){return yn.push(e),function(){yn.splice(yn.indexOf(e),1)}}var xn=Bt,Sn={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Cn(e){if(!(!e||!me)){var t=S.createElement(`style`);t.setAttribute(`type`,`text/css`),t.innerHTML=e;for(var n=S.head.childNodes,r=null,i=n.length-1;i>-1;i--){var a=n[i],o=(a.tagName||``).toUpperCase();[`STYLE`,`LINK`].indexOf(o)>-1&&(r=a)}return S.head.insertBefore(t,r),e}}var wn=`0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;function Tn(){for(var e=12,t=``;e-->0;)t+=wn[Math.random()*62|0];return t}function En(e){for(var t=[],n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function Dn(e){return e.classList?En(e.classList):(e.getAttribute(`class`)||``).split(` `).filter(function(e){return e})}function On(e){return`${e}`.replace(/&/g,`&amp;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function kn(e){return Object.keys(e||{}).reduce(function(t,n){return t+`${n}="${On(e[n])}" `},``).trim()}function An(e){return Object.keys(e||{}).reduce(function(t,n){return t+`${n}: ${e[n].trim()};`},``)}function jn(e){return e.size!==Sn.size||e.x!==Sn.x||e.y!==Sn.y||e.rotate!==Sn.rotate||e.flipX||e.flipY}function Mn(e){var t=e.transform,n=e.containerWidth,r=e.iconWidth;return{outer:{transform:`translate(${n/2} 256)`},inner:{transform:`${`translate(${t.x*32}, ${t.y*32}) `} ${`scale(${t.size/16*(t.flipX?-1:1)}, ${t.size/16*(t.flipY?-1:1)}) `} ${`rotate(${t.rotate} 0 0)`}`},path:{transform:`translate(${r/2*-1} -256)`}}}function Nn(e){var t=e.transform,n=e.width,r=n===void 0?Bt:n,i=e.height,a=i===void 0?Bt:i,o=e.startCentered,s=o!==void 0&&o,c=``;return c+=s&&he?`translate(${t.x/xn-r/2}em, ${t.y/xn-a/2}em) `:s?`translate(calc(-50% + ${t.x/xn}em), calc(-50% + ${t.y/xn}em)) `:`translate(${t.x/xn}em, ${t.y/xn}em) `,c+=`scale(${t.size/xn*(t.flipX?-1:1)}, ${t.size/xn*(t.flipY?-1:1)}) `,c+=`rotate(${t.rotate}deg) `,c}var Pn=`:root, :host {
  --fa-font-solid: normal 900 1em/1 'Font Awesome 7 Free';
  --fa-font-regular: normal 400 1em/1 'Font Awesome 7 Free';
  --fa-font-light: normal 300 1em/1 'Font Awesome 7 Pro';
  --fa-font-thin: normal 100 1em/1 'Font Awesome 7 Pro';
  --fa-font-duotone: normal 900 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-regular: normal 400 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-light: normal 300 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-thin: normal 100 1em/1 'Font Awesome 7 Duotone';
  --fa-font-brands: normal 400 1em/1 'Font Awesome 7 Brands';
  --fa-font-sharp-solid: normal 900 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-regular: normal 400 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-light: normal 300 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-thin: normal 100 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-duotone-solid: normal 900 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-regular: normal 400 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-light: normal 300 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-thin: normal 100 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-slab-regular: normal 400 1em/1 'Font Awesome 7 Slab';
  --fa-font-slab-press-regular: normal 400 1em/1 'Font Awesome 7 Slab Press';
  --fa-font-slab-duo-regular: normal 400 1em/1 'Font Awesome 7 Slab Duo';
  --fa-font-slab-press-duo-regular: normal 400 1em/1 'Font Awesome 7 Slab Press Duo';
  --fa-font-pixel-regular: normal 400 1em/1 'Font Awesome 7 Pixel';
  --fa-font-mosaic-solid: normal 900 1em/1 'Font Awesome 7 Mosaic';
  --fa-font-vellum-solid: normal 900 1em/1 'Font Awesome 7 Vellum';
  --fa-font-whiteboard-semibold: normal 600 1em/1 'Font Awesome 7 Whiteboard';
  --fa-font-thumbprint-light: normal 300 1em/1 'Font Awesome 7 Thumbprint';
  --fa-font-notdog-solid: normal 900 1em/1 'Font Awesome 7 Notdog';
  --fa-font-notdog-duo-solid: normal 900 1em/1 'Font Awesome 7 Notdog Duo';
  --fa-font-etch-solid: normal 900 1em/1 'Font Awesome 7 Etch';
  --fa-font-graphite-thin: normal 100 1em/1 'Font Awesome 7 Graphite';
  --fa-font-jelly-regular: normal 400 1em/1 'Font Awesome 7 Jelly';
  --fa-font-jelly-fill-regular: normal 400 1em/1 'Font Awesome 7 Jelly Fill';
  --fa-font-jelly-duo-regular: normal 400 1em/1 'Font Awesome 7 Jelly Duo';
  --fa-font-chisel-regular: normal 400 1em/1 'Font Awesome 7 Chisel';
  --fa-font-utility-semibold: normal 600 1em/1 'Font Awesome 7 Utility';
  --fa-font-utility-duo-semibold: normal 600 1em/1 'Font Awesome 7 Utility Duo';
  --fa-font-utility-fill-semibold: normal 600 1em/1 'Font Awesome 7 Utility Fill';
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-canvas-square {
  padding-block: 0.125em;
  margin-block-end: -0.125em;
}

.fa-canvas-roomy {
  padding-block: 0.25em;
  padding-inline: 0.125em;
  margin-block-end: -0.25em;
  box-sizing: content-box;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1.5s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-flip-360 {
  animation-name: fa-flip-360;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 0.75s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

.fa-spin-snap {
  animation-name: fa-spin-snap;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 3s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-snap-4 {
  animation-name: fa-spin-snap-4;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2.4s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-snap-8 {
  animation-name: fa-spin-snap-8;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 4s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-buzz {
  animation-name: fa-buzz;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 0.6s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-wag {
  animation-name: fa-wag;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 0.9s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-out);
  transform-origin: bottom center;
}

.fa-float {
  animation-name: fa-float;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 3s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
  will-change: transform;
}

.fa-swing {
  animation-name: fa-swing;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1.2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-out);
  transform-origin: top center;
}

.fa-jello {
  animation-name: fa-jello;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 0.9s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-out);
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-flip-360,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse,
  .fa-buzz,
  .fa-float,
  .fa-jello,
  .fa-spin-snap,
  .fa-spin-snap-4,
  .fa-spin-snap-8,
  .fa-swing,
  .fa-wag {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(calc(1.25 * var(--fa-beat-scale, 1.25)));
  }
  45% {
    transform: scale(calc(1.22 * var(--fa-beat-scale, 1.22)));
  }
  65% {
    transform: scale(calc(1.25 * var(--fa-beat-scale, 1.25)));
  }
  90% {
    transform: scale(1);
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
    animation-timing-function: var(--fa-animation-timing);
  }
  14% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.06), var(--fa-bounce-start-scale-y, 0.94)) translateY(var(--fa-bounce-anticipation, 3px));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  32% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.94), var(--fa-bounce-jump-scale-y, 1.12)) translateY(calc(-1 * var(--fa-bounce-height, 0.5em)));
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  52% {
    transform: scale(1, 1) translateY(calc(-1 * var(--fa-bounce-height, 0.5em) * 1.1));
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  70% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.06), var(--fa-bounce-land-scale-y, 0.92)) translateY(0);
    animation-timing-function: cubic-bezier(0.33, 0.33, 0.66, 1);
  }
  85% {
    transform: scale(0.98, 1.04) translateY(calc(-2px * var(--fa-bounce-rebound, 1)));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  0% {
    opacity: 1;
    transform: scale(1);
    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
  }
  40% {
    opacity: var(--fa-fade-opacity, 0.4);
    transform: scale(0.98);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes fa-beat-fade {
  0% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
  }
  25% {
    opacity: calc(var(--fa-beat-fade-opacity, 0.4) + 0.4);
    transform: scale(var(--fa-beat-fade-scale, 1.28));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  45% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.25));
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  65% {
    opacity: calc(var(--fa-beat-fade-opacity, 0.4) + 0.4);
    transform: scale(var(--fa-beat-fade-scale, 1.28));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
}
@keyframes fa-flip {
  0% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
  }
  8% {
    transform: perspective(2em) scale(var(--fa-flip-anticipation-scale, 0.95)) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  35% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * 0.6));
    animation-timing-function: linear;
  }
  65% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * 0.5));
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  92% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * var(--fa-flip-overshoot, 1.04)));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
  }
  100% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -360deg));
  }
}
@keyframes fa-flip-360 {
  0% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
  }
  8% {
    transform: perspective(2em) scale(var(--fa-flip-anticipation-scale, 0.95)) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  50% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * 0.6));
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  80% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * var(--fa-flip-overshoot, 1.04)));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
  }
  100% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -360deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
  }
  8% {
    transform: rotate(35deg) translateX(1px);
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  20% {
    transform: rotate(-22deg) translateX(-1px);
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  35% {
    transform: rotate(15deg) translateX(1px);
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  50% {
    transform: rotate(-9deg);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  65% {
    transform: rotate(5deg);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  78% {
    transform: rotate(-3deg);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  90% {
    transform: rotate(1deg);
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fa-spin-snap {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  12% {
    transform: rotate(60deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  16.67% {
    transform: rotate(60deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  28.67% {
    transform: rotate(120deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  33.33% {
    transform: rotate(120deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  45.33% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  62% {
    transform: rotate(240deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  66.67% {
    transform: rotate(240deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  78.67% {
    transform: rotate(300deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  83.33% {
    transform: rotate(300deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  95.33% {
    transform: rotate(360deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fa-spin-snap-4 {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  15% {
    transform: rotate(90deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  25% {
    transform: rotate(90deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  40% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  65% {
    transform: rotate(270deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  75% {
    transform: rotate(270deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  90% {
    transform: rotate(360deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fa-spin-snap-8 {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  9% {
    transform: rotate(45deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  12.5% {
    transform: rotate(45deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  21.5% {
    transform: rotate(90deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  25% {
    transform: rotate(90deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  34% {
    transform: rotate(135deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  37.5% {
    transform: rotate(135deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  46.5% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  59% {
    transform: rotate(225deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  62.5% {
    transform: rotate(225deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  71.5% {
    transform: rotate(270deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  75% {
    transform: rotate(270deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  84% {
    transform: rotate(315deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  87.5% {
    transform: rotate(315deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  96.5% {
    transform: rotate(360deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fa-buzz {
  0% {
    transform: translateX(0) rotate(0deg);
    animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);
  }
  5% {
    transform: translateX(var(--fa-buzz-distance, 4px)) rotate(0.5deg);
  }
  10% {
    transform: translateX(calc(-1 * var(--fa-buzz-distance, 4px))) rotate(-0.5deg);
  }
  15% {
    transform: translateX(var(--fa-buzz-distance, 4px)) rotate(0.3deg);
  }
  20% {
    transform: translateX(calc(-1 * var(--fa-buzz-distance, 4px))) rotate(-0.3deg);
  }
  25% {
    transform: translateX(calc(var(--fa-buzz-distance, 4px) * 0.7)) rotate(0.2deg);
  }
  30% {
    transform: translateX(calc(-1 * var(--fa-buzz-distance, 4px) * 0.7)) rotate(-0.2deg);
  }
  35% {
    transform: translateX(calc(var(--fa-buzz-distance, 4px) * 0.4)) rotate(0.1deg);
  }
  40% {
    transform: translateX(0) rotate(0deg);
  }
  100% {
    transform: translateX(0) rotate(0deg);
  }
}
@keyframes fa-wag {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
  }
  12% {
    transform: rotate(var(--fa-wag-angle, 12deg));
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  24% {
    transform: rotate(2deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
  }
  36% {
    transform: rotate(calc(var(--fa-wag-angle, 12deg) * 0.85));
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  48% {
    transform: rotate(1deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
  }
  58% {
    transform: rotate(calc(var(--fa-wag-angle, 12deg) * 0.6));
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  68% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-float {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x, 1.02), var(--fa-float-squash-y, 0.98));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  15% {
    transform: translateY(calc(-0.4 * var(--fa-float-height, 6px))) translateX(var(--fa-float-drift, 1px)) rotate(var(--fa-float-tilt, 1deg)) scale(1, 1);
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  35% {
    transform: translateY(calc(-1 * var(--fa-float-height, 6px))) translateX(0) rotate(0deg) scale(var(--fa-float-stretch-x, 0.98), var(--fa-float-stretch-y, 1.03));
    animation-timing-function: cubic-bezier(0.5, 0, 0.5, 0);
  }
  50% {
    transform: translateY(calc(-0.92 * var(--fa-float-height, 6px))) translateX(calc(-0.5 * var(--fa-float-drift, 1px))) rotate(calc(-0.5 * var(--fa-float-tilt, 1deg))) scale(0.995, 1.01);
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  70% {
    transform: translateY(calc(-0.3 * var(--fa-float-height, 6px))) translateX(calc(-1 * var(--fa-float-drift, 1px))) rotate(calc(-1 * var(--fa-float-tilt, 1deg))) scale(1, 1);
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  90% {
    transform: translateY(calc(0.05 * var(--fa-float-height, 6px))) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x, 1.02), var(--fa-float-squash-y, 0.98));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x, 1.02), var(--fa-float-squash-y, 0.98));
  }
}
@keyframes fa-swing {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
  }
  8% {
    transform: rotate(var(--fa-swing-angle, 22deg));
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  18% {
    transform: rotate(calc(-1 * var(--fa-swing-angle, 22deg) * 0.85));
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  28% {
    transform: rotate(calc(var(--fa-swing-angle, 22deg) * 0.65));
    animation-timing-function: cubic-bezier(0.35, 0, 0.65, 1);
  }
  38% {
    transform: rotate(calc(-1 * var(--fa-swing-angle, 22deg) * 0.45));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  48% {
    transform: rotate(calc(var(--fa-swing-angle, 22deg) * 0.25));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  56% {
    transform: rotate(calc(-1 * var(--fa-swing-angle, 22deg) * 0.1));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  64% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-jello {
  0% {
    transform: scale(1, 1);
    animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
  }
  12% {
    transform: scale(var(--fa-jello-scale-x, 1.15), calc(2 - var(--fa-jello-scale-x, 1.15)));
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  24% {
    transform: scale(calc(2 - var(--fa-jello-scale-y, 1.12)), var(--fa-jello-scale-y, 1.12));
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  36% {
    transform: scale(calc(1 + (var(--fa-jello-scale-x, 1.15) - 1) * 0.5), calc(2 - (1 + (var(--fa-jello-scale-x, 1.15) - 1) * 0.5)));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  48% {
    transform: scale(calc(2 - (1 + (var(--fa-jello-scale-y, 1.12) - 1) * 0.3)), calc(1 + (var(--fa-jello-scale-y, 1.12) - 1) * 0.3));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  58% {
    transform: scale(1.02, 0.98);
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  68% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  --fa-width: 1.25em;
  height: 1em;
  width: var(--fa-width);
}
.svg-inline--fa.fa-stack-2x {
  --fa-width: 2.5em;
  height: 2em;
  width: var(--fa-width);
}

.fa-stack-1x,
.fa-stack-2x {
  inset: 0;
  margin: auto;
  position: absolute;
  z-index: var(--fa-stack-z-index, auto);
}`;function Fn(){var e=Vt,t=Ht,n=w.cssPrefix,r=w.replacementClass,i=Pn;if(n!==e||r!==t){var a=RegExp(`\\.${e}\\-`,`g`),o=RegExp(`\\--${e}\\-`,`g`),s=RegExp(`\\.${t}`,`g`);i=i.replace(a,`.${n}-`).replace(o,`--${n}-`).replace(s,`.${r}`)}return i}var In=!1;function Ln(){w.autoAddCss&&!In&&(Cn(Fn()),In=!0)}var Rn={mixout:function(){return{dom:{css:Fn,insertCss:Ln}}},hooks:function(){return{beforeDOMElementCreation:function(){Ln()},beforeI2svg:function(){Ln()}}}},zn=de||{};zn[zt]||(zn[zt]={}),zn[zt].styles||(zn[zt].styles={}),zn[zt].hooks||(zn[zt].hooks={}),zn[zt].shims||(zn[zt].shims=[]);var T=zn[zt],Bn=[],Vn=function(){S.removeEventListener(`DOMContentLoaded`,Vn),Hn=1,Bn.map(function(e){return e()})},Hn=!1;me&&(Hn=(S.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(S.readyState),Hn||S.addEventListener(`DOMContentLoaded`,Vn));function Un(e){me&&(Hn?setTimeout(e,0):Bn.push(e))}function Wn(e){var t=e.tag,n=e.attributes,r=n===void 0?{}:n,i=e.children,a=i===void 0?[]:i;return typeof e==`string`?On(e):`<${t} ${kn(r)}>${a.map(Wn).join(``)}</${t}>`}function Gn(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var Kn=function(e,t){return function(n,r,i,a){return e.call(t,n,r,i,a)}},qn=function(e,t,n,r){var i=Object.keys(e),a=i.length,o=r===void 0?t:Kn(t,r),s,c,l;for(n===void 0?(s=1,l=e[i[0]]):(s=0,l=n);s<a;s++)c=i[s],l=o(l,e[c],c,e);return l};function Jn(e){return b(e).length===1?e.codePointAt(0).toString(16):null}function Yn(e){return Object.keys(e).reduce(function(t,n){var r=e[n];return r.icon?t[r.iconName]=r.icon:t[n]=r,t},{})}function Xn(e,t){var n=(arguments.length>2&&arguments[2]!==void 0?arguments[2]:{}).skipHooks,r=n!==void 0&&n,i=Yn(t);typeof T.hooks.addPack==`function`&&!r?T.hooks.addPack(e,Yn(t)):T.styles[e]=y(y({},T.styles[e]||{}),i),e===`fas`&&Xn(`fa`,t)}var Zn=T.styles,Qn=T.shims,$n=Object.keys(on),er=$n.reduce(function(e,t){return e[t]=Object.keys(on[t]),e},{}),tr=null,nr={},rr={},ir={},ar={},or={};function sr(e){return~pn.indexOf(e)}function cr(e,t){var n=t.split(`-`),r=n[0],i=n.slice(1).join(`-`);return r===e&&i!==``&&!sr(i)?i:null}var lr=function(){var e=function(e){return qn(Zn,function(t,n,r){return t[r]=qn(n,e,{}),t},{})};nr=e(function(e,t,n){return t[3]&&(e[t[3]]=n),t[2]&&t[2].filter(function(e){return typeof e==`number`}).forEach(function(t){e[t.toString(16)]=n}),e}),rr=e(function(e,t,n){return e[n]=n,t[2]&&t[2].filter(function(e){return typeof e==`string`}).forEach(function(t){e[t]=n}),e}),or=e(function(e,t,n){var r=t[2];return e[n]=n,r.forEach(function(t){e[t]=n}),e});var t=`far`in Zn||w.autoFetchSvg,n=qn(Qn,function(e,n){var r=n[0],i=n[1],a=n[2];return i===`far`&&!t&&(i=`fas`),typeof r==`string`&&(e.names[r]={prefix:i,iconName:a}),typeof r==`number`&&(e.unicodes[r.toString(16)]={prefix:i,iconName:a}),e},{names:{},unicodes:{}});ir=n.names,ar=n.unicodes,tr=vr(w.styleDefault,{family:w.familyDefault})};bn(function(e){tr=vr(e.styleDefault,{family:w.familyDefault})}),lr();function ur(e,t){return(nr[e]||{})[t]}function dr(e,t){return(rr[e]||{})[t]}function fr(e,t){return(or[e]||{})[t]}function pr(e){return ir[e]||{prefix:null,iconName:null}}function mr(e){var t=ar[e],n=ur(`fas`,e);return t||(n?{prefix:`fas`,iconName:n}:null)||{prefix:null,iconName:null}}function hr(){return tr}var gr=function(){return{prefix:null,iconName:null,rest:[]}};function _r(e){var t=C,n=$n.reduce(function(e,t){return e[t]=`${w.cssPrefix}-${t}`,e},{});return ht.forEach(function(r){(e.includes(n[r])||e.some(function(e){return er[r].includes(e)}))&&(t=r)}),t}function vr(e){var t=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:{}).family,n=t===void 0?C:t,r=tn[n][e];if(n===Se&&!e)return`fad`;var i=rn[n][e]||rn[n][r],a=e in T.styles?e:null;return i||a||null}function yr(e){var t=[],n=null;return e.forEach(function(e){var r=cr(w.cssPrefix,e);r?n=r:e&&t.push(e)}),{iconName:n,rest:t}}function br(e){return e.sort().filter(function(e,t,n){return n.indexOf(e)===t})}var xr=Nt.concat(bt);function Sr(e){var t=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:{}).skipLookups,n=t!==void 0&&t,r=null,i=br(e.filter(function(e){return xr.includes(e)})),a=br(e.filter(function(e){return!xr.includes(e)})),o=ee(i.filter(function(e){return r=e,!xe.includes(e)}),1)[0],s=o===void 0?null:o,c=_r(i),l=y(y({},yr(a)),{},{prefix:vr(s,{family:c})});return y(y(y({},l),Er({values:e,family:c,styles:Zn,config:w,canonical:l,givenPrefix:r})),Cr(n,r,l))}function Cr(e,t,n){var r=n.prefix,i=n.iconName;if(e||!r||!i)return{prefix:r,iconName:i};var a=t===`fa`?pr(i):{},o=fr(r,i);return i=a.iconName||o||i,r=a.prefix||r,r===`far`&&!Zn.far&&Zn.fas&&!w.autoFetchSvg&&(r=`fas`),{prefix:r,iconName:i}}var wr=ht.filter(function(e){return e!==C||e!==Se}),Tr=Object.keys(Mt).filter(function(e){return e!==C}).map(function(e){return Object.keys(Mt[e])}).flat();function Er(e){var t=e.values,n=e.family,r=e.canonical,i=e.givenPrefix,a=i===void 0?``:i,o=e.styles,s=o===void 0?{}:o,c=e.config,l=c===void 0?{}:c,u=n===Se,d=t.includes(`fa-duotone`)||t.includes(`fad`),f=l.familyDefault===`duotone`,p=r.prefix===`fad`||r.prefix===`fa-duotone`;return!u&&(d||f||p)&&(r.prefix=`fad`),(t.includes(`fa-brands`)||t.includes(`fab`))&&(r.prefix=`fab`),!r.prefix&&wr.includes(n)&&(Object.keys(s).find(function(e){return Tr.includes(e)})||l.autoFetchSvg)&&(r.prefix=vt.get(n).defaultShortPrefixId,r.iconName=fr(r.prefix,r.iconName)||r.iconName),(r.prefix===`fa`||a===`fa`)&&(r.prefix=hr()||`fas`),r}var Dr=function(){function e(){l(this,e),this.definitions={}}return d(e,[{key:`add`,value:function(){var e=this,t=[...arguments].reduce(this._pullDefinitions,{});Object.keys(t).forEach(function(n){e.definitions[n]=y(y({},e.definitions[n]||{}),t[n]),Xn(n,t[n]);var r=on[C][n];r&&Xn(r,t[n]),lr()})}},{key:`reset`,value:function(){this.definitions={}}},{key:`_pullDefinitions`,value:function(e,t){var n=t.prefix&&t.iconName&&t.icon?{0:t}:t;return Object.keys(n).map(function(t){var r=n[t],i=r.prefix,a=r.iconName,o=r.icon,s=o[2];e[i]||(e[i]={}),s.length>0&&s.forEach(function(t){typeof t==`string`&&(e[i][t]=o)}),e[i][a]=o}),e}}])}(),Or=[],kr={},Ar={},jr=Object.keys(Ar);function Mr(e,t){var n=t.mixoutsTo;return Or=e,kr={},Object.keys(Ar).forEach(function(e){jr.indexOf(e)===-1&&delete Ar[e]}),Or.forEach(function(e){var t=e.mixout?e.mixout():{};if(Object.keys(t).forEach(function(e){typeof t[e]==`function`&&(n[e]=t[e]),re(t[e])===`object`&&Object.keys(t[e]).forEach(function(r){n[e]||(n[e]={}),n[e][r]=t[e][r]})}),e.hooks){var r=e.hooks();Object.keys(r).forEach(function(e){kr[e]||(kr[e]=[]),kr[e].push(r[e])})}e.provides&&e.provides(Ar)}),n}function Nr(e,t){var n=[...arguments].slice(2);return(kr[e]||[]).forEach(function(e){t=e.apply(null,[t].concat(n))}),t}function Pr(e){var t=[...arguments].slice(1);(kr[e]||[]).forEach(function(e){e.apply(null,t)})}function Fr(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return Ar[e]?Ar[e].apply(null,t):void 0}function Ir(e){e.prefix===`fa`&&(e.prefix=`fas`);var t=e.iconName,n=e.prefix||hr();if(t)return t=fr(n,t)||t,Gn(Lr.definitions,n,t)||Gn(T.styles,n,t)}var Lr=new Dr,E={noAuto:function(){w.autoReplaceSvg=!1,w.observeMutations=!1,Pr(`noAuto`)},config:w,dom:{i2svg:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return me?(Pr(`beforeI2svg`,e),Fr(`pseudoElements2svg`,e),Fr(`i2svg`,e)):Promise.reject(Error(`Operation requires a DOM of some kind.`))},watch:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=e.autoReplaceSvgRoot;w.autoReplaceSvg===!1&&(w.autoReplaceSvg=!0),w.observeMutations=!0,Un(function(){Rr({autoReplaceSvgRoot:t}),Pr(`watch`,e)})}},parse:{icon:function(e){if(e===null)return null;if(re(e)===`object`&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:fr(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){var t=e[1].indexOf(`fa-`)===0?e[1].slice(3):e[1],n=vr(e[0]);return{prefix:n,iconName:fr(n,t)||t}}if(typeof e==`string`&&(e.indexOf(`${w.cssPrefix}-`)>-1||e.match(cn))){var r=Sr(e.split(` `),{skipLookups:!0});return{prefix:r.prefix||hr(),iconName:fr(r.prefix,r.iconName)||r.iconName}}if(typeof e==`string`){var i=hr();return{prefix:i,iconName:fr(i,e)||e}}}},library:Lr,findIconDefinition:Ir,toHtml:Wn},Rr=function(){var e=(arguments.length>0&&arguments[0]!==void 0?arguments[0]:{}).autoReplaceSvgRoot,t=e===void 0?S:e;(Object.keys(T.styles).length>0||w.autoFetchSvg)&&me&&w.autoReplaceSvg&&E.dom.i2svg({node:t})};function zr(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(e){return Wn(e)})}}),Object.defineProperty(e,"node",{get:function(){if(me){var t=S.createElement(`div`);return t.innerHTML=e.html,t.children}}}),e}function Br(e){var t=e.children,n=e.main,r=e.mask,i=e.attributes,a=e.styles,o=e.transform;if(jn(o)&&n.found&&!r.found){var s={x:n.width/n.height/2,y:.5};i.style=An(y(y({},a),{},{"transform-origin":`${s.x+o.x/16}em ${s.y+o.y/16}em`}))}return[{tag:`svg`,attributes:i,children:t}]}function Vr(e){var t=e.prefix,n=e.iconName,r=e.children,i=e.attributes,a=e.symbol,o=a===!0?`${t}-${w.cssPrefix}-${n}`:a;return[{tag:`svg`,attributes:{style:`display: none;`},children:[{tag:`symbol`,attributes:y(y({},i),{},{id:o}),children:r}]}]}function Hr(e){return[`aria-label`,`aria-labelledby`,`title`,`role`].some(function(t){return t in e})}function Ur(e){var t=e.icons,n=t.main,r=t.mask,i=e.prefix,a=e.iconName,o=e.transform,s=e.symbol,c=e.maskId,l=e.extra,u=e.watchable,d=u!==void 0&&u,f=r.found?r:n,p=f.width,m=f.height,h=[w.replacementClass,a?`${w.cssPrefix}-${a}`:``].filter(function(e){return l.classes.indexOf(e)===-1}).filter(function(e){return e!==``||!!e}).concat(l.classes).join(` `),g={children:[],attributes:y(y({},l.attributes),{},{"data-prefix":i,"data-icon":a,class:h,role:l.attributes.role||`img`,viewBox:`0 0 ${p} ${m}`})};!Hr(l.attributes)&&!l.attributes[`aria-hidden`]&&(g.attributes[`aria-hidden`]=`true`),d&&(g.attributes[Ut]=``);var _=y(y({},g),{},{prefix:i,iconName:a,main:n,mask:r,maskId:c,transform:o,symbol:s,styles:y({},l.styles)}),v=r.found&&n.found?Fr(`generateAbstractMask`,_)||{children:[],attributes:{}}:Fr(`generateAbstractIcon`,_)||{children:[],attributes:{}},ee=v.children,b=v.attributes;return _.children=ee,_.attributes=b,s?Vr(_):Br(_)}function Wr(e){var t=e.content,n=e.width,r=e.height,i=e.transform,a=e.extra,o=e.watchable,s=o!==void 0&&o,c=y(y({},a.attributes),{},{class:a.classes.join(` `)});s&&(c[Ut]=``);var l=y({},a.styles);jn(i)&&(l.transform=Nn({transform:i,startCentered:!0,width:n,height:r}),l[`-webkit-transform`]=l.transform);var u=An(l);u.length>0&&(c.style=u);var d=[];return d.push({tag:`span`,attributes:c,children:[t]}),d}function Gr(e){var t=e.content,n=e.extra,r=y(y({},n.attributes),{},{class:n.classes.join(` `)}),i=An(n.styles);i.length>0&&(r.style=i);var a=[];return a.push({tag:`span`,attributes:r,children:[t]}),a}var Kr=T.styles;function qr(e){var t=e[0],n=e[1],r=ee(e.slice(4),1)[0],i=null;return i=Array.isArray(r)?{tag:`g`,attributes:{class:`${w.cssPrefix}-${fn.GROUP}`},children:[{tag:`path`,attributes:{class:`${w.cssPrefix}-${fn.SECONDARY}`,fill:`currentColor`,d:r[0]}},{tag:`path`,attributes:{class:`${w.cssPrefix}-${fn.PRIMARY}`,fill:`currentColor`,d:r[1]}}]}:{tag:`path`,attributes:{fill:`currentColor`,d:r}},{found:!0,width:t,height:n,icon:i}}var Jr={found:!1,width:512,height:512};function Yr(e,t){!Qt&&!w.showMissingIcons&&e&&console.error(`Icon with name "${e}" and prefix "${t}" is missing.`)}function Xr(e,t){var n=t;return t===`fa`&&w.styleDefault!==null&&(t=hr()),new Promise(function(r,i){if(n===`fa`){var a=pr(e)||{};e=a.iconName||e,t=a.prefix||t}if(e&&t&&Kr[t]&&Kr[t][e]){var o=Kr[t][e];return r(qr(o))}Yr(e,t),r(y(y({},Jr),{},{icon:w.showMissingIcons&&e&&Fr(`missingIconAbstract`)||{}}))})}var Zr=function(){},Qr=w.measurePerformance&&pe&&pe.mark&&pe.measure?pe:{mark:Zr,measure:Zr},$r=`FA "7.3.1"`,ei=function(e){return Qr.mark(`${$r} ${e} begins`),function(){return ti(e)}},ti=function(e){Qr.mark(`${$r} ${e} ends`),Qr.measure(`${$r} ${e}`,`${$r} ${e} begins`,`${$r} ${e} ends`)},ni={begin:ei,end:ti},ri=function(){};function ii(e){return typeof(e.getAttribute?e.getAttribute(Ut):null)==`string`}function ai(e){var t=e.getAttribute?e.getAttribute(Kt):null,n=e.getAttribute?e.getAttribute(qt):null;return t&&n}function oi(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(w.replacementClass)}function si(){return w.autoReplaceSvg===!0?fi.replace:fi[w.autoReplaceSvg]||fi.replace}function ci(e){return S.createElementNS(`http://www.w3.org/2000/svg`,e)}function li(e){return S.createElement(e)}function ui(e){var t=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:{}).ceFn,n=t===void 0?e.tag===`svg`?ci:li:t;if(typeof e==`string`)return S.createTextNode(e);var r=n(e.tag);return Object.keys(e.attributes||[]).forEach(function(t){r.setAttribute(t,e.attributes[t])}),(e.children||[]).forEach(function(e){r.appendChild(ui(e,{ceFn:n}))}),r}function di(e){var t=` ${e.outerHTML} `;return t=`${t}Font Awesome fontawesome.com `,t}var fi={replace:function(e){var t=e[0];if(t.parentNode){if(e[1].forEach(function(e){t.parentNode.insertBefore(ui(e),t)}),t.getAttribute(Ut)===null&&w.keepOriginalSource){var n=S.createComment(di(t));t.parentNode.replaceChild(n,t)}else t.remove()}},nest:function(e){var t=e[0],n=e[1];if(~Dn(t).indexOf(w.replacementClass))return fi.replace(e);var r=RegExp(`${w.cssPrefix}-.*`);if(delete n[0].attributes.id,n[0].attributes.class){var i=n[0].attributes.class.split(` `).reduce(function(e,t){return t===w.replacementClass||t.match(r)?e.toSvg.push(t):e.toNode.push(t),e},{toNode:[],toSvg:[]});n[0].attributes.class=i.toSvg.join(` `),i.toNode.length===0?t.removeAttribute(`class`):t.setAttribute(`class`,i.toNode.join(` `))}var a=n.map(function(e){return Wn(e)}).join(`
`);t.setAttribute(Ut,``),t.innerHTML=a}};function pi(e){e()}function mi(e,t){var n=typeof t==`function`?t:ri;if(e.length===0)n();else{var r=pi;w.mutateApproach===Yt&&(r=de.requestAnimationFrame||pi),r(function(){var t=si(),r=ni.begin(`mutate`);e.map(t),r(),n()})}}var hi=!1;function gi(){hi=!0}function _i(){hi=!1}var vi=null;function yi(e){if(fe&&w.observeMutations){var t=e.treeCallback,n=t===void 0?ri:t,r=e.nodeCallback,i=r===void 0?ri:r,a=e.pseudoElementsCallback,o=a===void 0?ri:a,s=e.observeMutationsRoot,c=s===void 0?S:s;vi=new fe(function(e){if(!hi){var t=hr();En(e).forEach(function(e){if(e.type===`childList`&&e.addedNodes.length>0&&!ii(e.addedNodes[0])&&(w.searchPseudoElements&&o(e.target),n(e.target)),e.type===`attributes`&&e.target.parentNode&&w.searchPseudoElements&&o([e.target],!0),e.type===`attributes`&&ii(e.target)&&~dn.indexOf(e.attributeName)){if(e.attributeName===`class`&&ai(e.target)){var r=Sr(Dn(e.target)),a=r.prefix,s=r.iconName;e.target.setAttribute(Kt,a||t),s&&e.target.setAttribute(qt,s)}else oi(e.target)&&i(e.target)}})}}),me&&vi.observe(c,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function bi(){vi&&vi.disconnect()}function xi(e){var t=e.getAttribute(`style`),n=[];return t&&(n=t.split(`;`).reduce(function(e,t){var n=t.split(`:`),r=n[0],i=n.slice(1);return r&&i.length>0&&(e[r]=i.join(`:`).trim()),e},{})),n}function Si(e){var t=e.getAttribute(`data-prefix`),n=e.getAttribute(`data-icon`),r=e.innerText===void 0?``:e.innerText.trim(),i=Sr(Dn(e));return i.prefix||=hr(),t&&n&&(i.prefix=t,i.iconName=n),i.iconName&&i.prefix?i:(i.prefix&&r.length>0&&(i.iconName=dr(i.prefix,e.innerText)||ur(i.prefix,Jn(e.innerText))),!i.iconName&&w.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(i.iconName=e.firstChild.data),i)}function Ci(e){return En(e.attributes).reduce(function(e,t){return e.name!==`class`&&e.name!==`style`&&(e[t.name]=t.value),e},{})}function wi(){return{iconName:null,prefix:null,transform:Sn,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Ti(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=Si(e),r=n.iconName,i=n.prefix,a=n.rest,o=Ci(e),s=Nr(`parseNodeAttributes`,{},e);return y({iconName:r,prefix:i,transform:Sn,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:a,styles:t.styleParser?xi(e):[],attributes:o}},s)}var Ei=T.styles;function Di(e){var t=w.autoReplaceSvg===`nest`?Ti(e,{styleParser:!1}):Ti(e);return~t.extra.classes.indexOf(ln)?Fr(`generateLayersText`,e,t):Fr(`generateSvgReplacementMutation`,e,t)}function Oi(){return[].concat(b(bt),b(Nt))}function ki(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!me)return Promise.resolve();var n=S.documentElement.classList,r=function(e){return n.add(`${Jt}-${e}`)},i=function(e){return n.remove(`${Jt}-${e}`)},a=w.autoFetchSvg?Oi():xe.concat(Object.keys(Ei));a.includes(`fa`)||a.push(`fa`);var o=[`.${ln}:not([${Ut}])`].concat(a.map(function(e){return`.${e}:not([${Ut}])`})).join(`, `);if(o.length===0)return Promise.resolve();var s=[];try{s=En(e.querySelectorAll(o))}catch{}if(s.length>0)r(`pending`),i(`complete`);else return Promise.resolve();var c=ni.begin(`onTree`),l=s.reduce(function(e,t){try{var n=Di(t);n&&e.push(n)}catch(e){Qt||e.name===`MissingIcon`&&console.error(e)}return e},[]);return new Promise(function(e,n){Promise.all(l).then(function(n){mi(n,function(){r(`active`),r(`complete`),i(`pending`),typeof t==`function`&&t(),c(),e()})}).catch(function(e){c(),n(e)})})}function Ai(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Di(e).then(function(e){e&&mi([e],t)})}function ji(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:Ir(t||{}),i=n.mask;return i&&=(i||{}).icon?i:Ir(i||{}),e(r,y(y({},n),{},{mask:i}))}}var Mi=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.transform,r=n===void 0?Sn:n,i=t.symbol,a=i!==void 0&&i,o=t.mask,s=o===void 0?null:o,c=t.maskId,l=c===void 0?null:c,u=t.classes,d=u===void 0?[]:u,f=t.attributes,p=f===void 0?{}:f,m=t.styles,h=m===void 0?{}:m;if(e){var g=e.prefix,_=e.iconName,v=e.icon;return zr(y({type:`icon`},e),function(){return Pr(`beforeDOMElementCreation`,{iconDefinition:e,params:t}),Ur({icons:{main:qr(v),mask:s?qr(s.icon):{found:!1,width:null,height:null,icon:{}}},prefix:g,iconName:_,transform:y(y({},Sn),r),symbol:a,maskId:l,extra:{attributes:p,styles:h,classes:d}})})}},Ni={mixout:function(){return{icon:ji(Mi)}},hooks:function(){return{mutationObserverCallbacks:function(e){return e.treeCallback=ki,e.nodeCallback=Ai,e}}},provides:function(e){e.i2svg=function(e){var t=e.node,n=t===void 0?S:t,r=e.callback;return ki(n,r===void 0?function(){}:r)},e.generateSvgReplacementMutation=function(e,t){var n=t.iconName,r=t.prefix,i=t.transform,a=t.symbol,o=t.mask,s=t.maskId,c=t.extra;return new Promise(function(t,l){Promise.all([Xr(n,r),o.iconName?Xr(o.iconName,o.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(o){var l=ee(o,2),u=l[0],d=l[1];t([e,Ur({icons:{main:u,mask:d},prefix:r,iconName:n,transform:i,symbol:a,maskId:s,extra:c,watchable:!0})])}).catch(l)})},e.generateAbstractIcon=function(e){var t=e.children,n=e.attributes,r=e.main,i=e.transform,a=e.styles,o=An(a);o.length>0&&(n.style=o);var s;return jn(i)&&(s=Fr(`generateAbstractTransformGrouping`,{main:r,transform:i,containerWidth:r.width,iconWidth:r.width})),t.push(s||r.icon),{children:t,attributes:n}}}},Pi={mixout:function(){return{layer:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.classes,r=n===void 0?[]:n;return zr({type:`layer`},function(){Pr(`beforeDOMElementCreation`,{assembler:e,params:t});var n=[];return e(function(e){Array.isArray(e)?e.map(function(e){n=n.concat(e.abstract)}):n=n.concat(e.abstract)}),[{tag:`span`,attributes:{class:[`${w.cssPrefix}-layers`].concat(b(r)).join(` `)},children:n}]})}}}},Fi={mixout:function(){return{counter:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.title,r=n===void 0?null:n,i=t.classes,a=i===void 0?[]:i,o=t.attributes,s=o===void 0?{}:o,c=t.styles,l=c===void 0?{}:c;return zr({type:`counter`,content:e},function(){return Pr(`beforeDOMElementCreation`,{content:e,params:t}),Gr({content:e.toString(),title:r,extra:{attributes:s,styles:l,classes:[`${w.cssPrefix}-layers-counter`].concat(b(a))}})})}}}},Ii={mixout:function(){return{text:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.transform,r=n===void 0?Sn:n,i=t.classes,a=i===void 0?[]:i,o=t.attributes,s=o===void 0?{}:o,c=t.styles,l=c===void 0?{}:c;return zr({type:`text`,content:e},function(){return Pr(`beforeDOMElementCreation`,{content:e,params:t}),Wr({content:e,transform:y(y({},Sn),r),extra:{attributes:s,styles:l,classes:[`${w.cssPrefix}-layers-text`].concat(b(a))}})})}}},provides:function(e){e.generateLayersText=function(e,t){var n=t.transform,r=t.extra,i=null,a=null;if(he){var o=parseInt(getComputedStyle(e).fontSize,10),s=e.getBoundingClientRect();i=s.width/o,a=s.height/o}return Promise.resolve([e,Wr({content:e.innerHTML,width:i,height:a,transform:n,extra:r,watchable:!0})])}}},Li=RegExp(`"`,`ug`),Ri=[1105920,1112319],zi=y(y(y(y({},{FontAwesome:{normal:`fas`,400:`fas`}}),_t),Rt),wt),Bi=Object.keys(zi).reduce(function(e,t){return e[t.toLowerCase()]=zi[t],e},{}),Vi=Object.keys(Bi).reduce(function(e,t){var n=Bi[t];return e[t]=n[900]||b(Object.entries(n))[0][1],e},{});function Hi(e){return Jn(b(e.replace(Li,``))[0]||``)}function Ui(e){var t=e.getPropertyValue(`font-feature-settings`).includes(`ss01`),n=e.getPropertyValue(`content`).replace(Li,``),r=n.codePointAt(0),i=r>=Ri[0]&&r<=Ri[1],a=n.length===2&&n[0]===n[1];return i||a||t}function Wi(e,t){var n=e.replace(/^['"]|['"]$/g,``).toLowerCase(),r=parseInt(t),i=isNaN(r)?`normal`:r;return(Bi[n]||{})[i]||Vi[n]}function Gi(e,t){var n=`${Gt}${t.replace(`:`,`-`)}`;return new Promise(function(r,i){if(e.getAttribute(n)!==null)return r();var a=En(e.children).filter(function(e){return e.getAttribute(Wt)===t})[0],o=de.getComputedStyle(e,t),s=o.getPropertyValue(`font-family`),c=s.match(un),l=o.getPropertyValue(`font-weight`),u=o.getPropertyValue(`content`);if(a&&!c)return e.removeChild(a),r();if(c&&u!==`none`&&u!==``){var d=o.getPropertyValue(`content`),f=Wi(s,l),p=Hi(d),m=c[0].startsWith(`FontAwesome`),h=Ui(o),g=ur(f,p),_=g;if(m){var v=mr(p);v.iconName&&v.prefix&&(g=v.iconName,f=v.prefix)}if(g&&!h&&(!a||a.getAttribute(Kt)!==f||a.getAttribute(qt)!==_)){e.setAttribute(n,_),a&&e.removeChild(a);var ee=wi(),b=ee.extra;b.attributes[Wt]=t,Xr(g,f).then(function(i){var a=Ur(y(y({},ee),{},{icons:{main:i,mask:gr()},prefix:f,iconName:_,extra:b,watchable:!0})),o=S.createElementNS(`http://www.w3.org/2000/svg`,`svg`);t===`::before`?e.insertBefore(o,e.firstChild):e.appendChild(o),o.outerHTML=a.map(function(e){return Wn(e)}).join(`
`),e.removeAttribute(n),r()}).catch(i)}else r()}else r()})}function Ki(e){return Promise.all([Gi(e,`::before`),Gi(e,`::after`)])}function qi(e){return e.parentNode!==document.head&&!~Xt.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Wt)&&(!e.parentNode||e.parentNode.tagName!==`svg`)}var Ji=function(e){return!!e&&Zt.some(function(t){return e.includes(t)})},Yi=function(e){if(!e)return[];var t=new Set,n=e.split(/,(?![^()]*\))/).map(function(e){return e.trim()});n=n.flatMap(function(e){return e.includes(`(`)?e:e.split(`,`).map(function(e){return e.trim()})});var r=f(n),i;try{for(r.s();!(i=r.n()).done;){var a=i.value;if(Ji(a)){var o=Zt.reduce(function(e,t){return e.replace(t,``)},a);o!==``&&o!==`*`&&t.add(o)}}}catch(e){r.e(e)}finally{r.f()}return t};function Xi(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1];if(me){var n;if(t)n=e;else if(w.searchPseudoElementsFullScan)n=e.querySelectorAll(`*`);else{var r=new Set,i=f(document.styleSheets),a;try{for(i.s();!(a=i.n()).done;){var o=a.value;try{var s=f(o.cssRules),c;try{for(s.s();!(c=s.n()).done;){var l=c.value,u=f(Yi(l.selectorText)),d;try{for(u.s();!(d=u.n()).done;){var p=d.value;r.add(p)}}catch(e){u.e(e)}finally{u.f()}}}catch(e){s.e(e)}finally{s.f()}}catch(e){w.searchPseudoElementsWarnings&&console.warn(`Font Awesome: cannot parse stylesheet: ${o.href} (${e.message})
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`)}}}catch(e){i.e(e)}finally{i.f()}if(!r.size)return;var m=Array.from(r).join(`, `);try{n=e.querySelectorAll(m)}catch{}}return new Promise(function(e,t){var r=En(n).filter(qi).map(Ki),i=ni.begin(`searchPseudoElements`);gi(),Promise.all(r).then(function(){i(),_i(),e()}).catch(function(){i(),_i(),t()})})}}var Zi={hooks:function(){return{mutationObserverCallbacks:function(e){return e.pseudoElementsCallback=Xi,e}}},provides:function(e){e.pseudoElements2svg=function(e){var t=e.node,n=t===void 0?S:t;w.searchPseudoElements&&Xi(n)}}},Qi=!1,$i={mixout:function(){return{dom:{unwatch:function(){gi(),Qi=!0}}}},hooks:function(){return{bootstrap:function(){yi(Nr(`mutationObserverCallbacks`,{}))},noAuto:function(){bi()},watch:function(e){var t=e.observeMutationsRoot;Qi?_i():yi(Nr(`mutationObserverCallbacks`,{observeMutationsRoot:t}))}}}},ea=function(e){return e.toLowerCase().split(` `).reduce(function(e,t){var n=t.toLowerCase().split(`-`),r=n[0],i=n.slice(1).join(`-`);if(r&&i===`h`)return e.flipX=!0,e;if(r&&i===`v`)return e.flipY=!0,e;if(i=parseFloat(i),isNaN(i))return e;switch(r){case`grow`:e.size+=i;break;case`shrink`:e.size-=i;break;case`left`:e.x-=i;break;case`right`:e.x+=i;break;case`up`:e.y-=i;break;case`down`:e.y+=i;break;case`rotate`:e.rotate+=i}return e},{size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0})},ta={mixout:function(){return{parse:{transform:function(e){return ea(e)}}}},hooks:function(){return{parseNodeAttributes:function(e,t){var n=t.getAttribute(`data-fa-transform`);return n&&(e.transform=ea(n)),e}}},provides:function(e){e.generateAbstractTransformGrouping=function(e){var t=e.main,n=e.transform,r=e.containerWidth,i=e.iconWidth,a={outer:{transform:`translate(${r/2} 256)`},inner:{transform:`${`translate(${n.x*32}, ${n.y*32}) `} ${`scale(${n.size/16*(n.flipX?-1:1)}, ${n.size/16*(n.flipY?-1:1)}) `} ${`rotate(${n.rotate} 0 0)`}`},path:{transform:`translate(${i/2*-1} -256)`}};return{tag:`g`,attributes:y({},a.outer),children:[{tag:`g`,attributes:y({},a.inner),children:[{tag:t.icon.tag,children:t.icon.children,attributes:y(y({},t.icon.attributes),a.path)}]}]}}}},na={x:0,y:0,width:`100%`,height:`100%`};function ra(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill=`black`),e}function ia(e){return e.tag===`g`?e.children:[e]}Mr([Rn,Ni,Pi,Fi,Ii,Zi,$i,ta,{hooks:function(){return{parseNodeAttributes:function(e,t){var n=t.getAttribute(`data-fa-mask`),r=n?Sr(n.split(` `).map(function(e){return e.trim()})):gr();return r.prefix||=hr(),e.mask=r,e.maskId=t.getAttribute(`data-fa-mask-id`),e}}},provides:function(e){e.generateAbstractMask=function(e){var t=e.children,n=e.attributes,r=e.main,i=e.mask,a=e.maskId,o=e.transform,s=r.width,c=r.icon,l=i.width,u=i.icon,d=Mn({transform:o,containerWidth:l,iconWidth:s}),f={tag:`rect`,attributes:y(y({},na),{},{fill:`white`})},p=c.children?{children:c.children.map(ra)}:{},m={tag:`g`,attributes:y({},d.inner),children:[ra(y({tag:c.tag,attributes:y(y({},c.attributes),d.path)},p))]},h={tag:`g`,attributes:y({},d.outer),children:[m]},g=`mask-${a||Tn()}`,_=`clip-${a||Tn()}`,v={tag:`mask`,attributes:y(y({},na),{},{id:g,maskUnits:`userSpaceOnUse`,maskContentUnits:`userSpaceOnUse`}),children:[f,h]},ee={tag:`defs`,children:[{tag:`clipPath`,attributes:{id:_},children:ia(u)},v]};return t.push(ee,{tag:`rect`,attributes:y({fill:`currentColor`,"clip-path":`url(#${_})`,mask:`url(#${g})`},na)}),{children:t,attributes:n}}}},{provides:function(e){var t=!1;de.matchMedia&&(t=de.matchMedia(`(prefers-reduced-motion: reduce)`).matches),e.missingIconAbstract=function(){var e=[],n={fill:`currentColor`},r={attributeType:`XML`,repeatCount:`indefinite`,dur:`2s`};e.push({tag:`path`,attributes:y(y({},n),{},{d:`M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z`})});var i=y(y({},r),{},{attributeName:`opacity`}),a={tag:`circle`,attributes:y(y({},n),{},{cx:`256`,cy:`364`,r:`28`}),children:[]};return t||a.children.push({tag:`animate`,attributes:y(y({},r),{},{attributeName:`r`,values:`28;14;28;28;14;28;`})},{tag:`animate`,attributes:y(y({},i),{},{values:`1;0;1;1;0;1;`})}),e.push(a),e.push({tag:`path`,attributes:y(y({},n),{},{opacity:`1`,d:`M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z`}),children:t?[]:[{tag:`animate`,attributes:y(y({},i),{},{values:`1;0;0;0;0;1;`})}]}),t||e.push({tag:`path`,attributes:y(y({},n),{},{opacity:`0`,d:`M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z`}),children:[{tag:`animate`,attributes:y(y({},i),{},{values:`0;0;1;1;0;0;`})}]}),{tag:`g`,attributes:{class:`missing`},children:e}}}},{hooks:function(){return{parseNodeAttributes:function(e,t){var n=t.getAttribute(`data-fa-symbol`);return e.symbol=n===null?!1:n===``||n,e}}}}],{mixoutsTo:E}),E.noAuto;var aa=E.config;E.library,E.dom;var oa=E.parse;E.findIconDefinition,E.toHtml;var sa=E.icon;E.layer,E.text,E.counter;var D=i();function ca(e){return e-=0,e===e}function la(e){return ca(e)?e:(e=e.replace(/[_-]+(.)?/g,(e,t)=>t?t.toUpperCase():``),e.charAt(0).toLowerCase()+e.slice(1))}var ua=(e,t)=>a.createElement(`stop`,{key:`${t}-${e.offset}`,offset:e.offset,stopColor:e.color,...e.opacity!==void 0&&{stopOpacity:e.opacity}});function da(e){return e.charAt(0).toUpperCase()+e.slice(1)}var fa=new Map,pa=1e3;function ma(e){if(fa.has(e))return fa.get(e);let t={},n=0,r=e.length;for(;n<r;){let i=e.indexOf(`;`,n),a=i===-1?r:i,o=e.slice(n,a).trim();if(o){let e=o.indexOf(`:`);if(e>0){let n=o.slice(0,e).trim(),r=o.slice(e+1).trim();if(n&&r){let e=la(n);t[e.startsWith(`webkit`)?da(e):e]=r}}}n=a+1}if(fa.size===pa){let e=fa.keys().next().value;e&&fa.delete(e)}return fa.set(e,t),t}function ha(e,t,n={}){if(typeof t==`string`)return t;let r=(t.children||[]).map(t=>{let r=t;return(`fill`in n||n.gradientFill)&&t.tag===`path`&&`fill`in t.attributes&&(r={...t,attributes:{...t.attributes,fill:void 0}}),ha(e,r)}),i=t.attributes||{},a={};for(let[e,t]of Object.entries(i))switch(!0){case e===`class`:a.className=t;break;case e===`style`:a.style=ma(String(t));break;case e.startsWith(`aria-`):case e.startsWith(`data-`):a[e.toLowerCase()]=t;break;default:a[la(e)]=t}let{style:o,role:s,"aria-label":c,gradientFill:l,...u}=n;if(o&&(a.style=a.style?{...a.style,...o}:o),s&&(a.role=s),c&&(a[`aria-label`]=c,a[`aria-hidden`]=`false`),l){a.fill=`url(#${l.id})`;let{type:t,stops:n=[],...i}=l;r.unshift(e(t===`linear`?`linearGradient`:`radialGradient`,{...i,id:l.id},n.map(ua)))}return e(t.tag,{...a,...u},...r)}var ga=ha.bind(null,a.createElement),_a=(e,t)=>{let n=(0,a.useId)();return e||(t?n:void 0)},va=class{constructor(e=`react-fontawesome`){this.enabled=!1;let t=!1;try{t=typeof process<`u`&&!1}catch{}this.scope=e,this.enabled=t}log(...e){this.enabled&&console.log(`[${this.scope}]`,...e)}warn(...e){this.enabled&&console.warn(`[${this.scope}]`,...e)}error(...e){this.enabled&&console.error(`[${this.scope}]`,...e)}};typeof process<`u`&&{}.FA_VERSION;var ya=`searchPseudoElementsFullScan`in aa&&typeof aa.searchPseudoElementsFullScan==`boolean`?`7.0.0`:`6.0.0`,ba=Number.parseInt(ya)>=7,xa=()=>ba,Sa=`fa`,O={beat:`fa-beat`,fade:`fa-fade`,beatFade:`fa-beat-fade`,bounce:`fa-bounce`,shake:`fa-shake`,spin:`fa-spin`,spinPulse:`fa-spin-pulse`,spinReverse:`fa-spin-reverse`,pulse:`fa-pulse`,flip360:`fa-flip-360`,buzz:`fa-buzz`,float:`fa-float`,jello:`fa-jello`,spinSnap:`fa-spin-snap`,spinSnap4:`fa-spin-snap-4`,spinSnap8:`fa-spin-snap-8`,swing:`fa-swing`,wag:`fa-wag`},Ca={left:`fa-pull-left`,right:`fa-pull-right`},wa={90:`fa-rotate-90`,180:`fa-rotate-180`,270:`fa-rotate-270`},Ta={"2xs":`fa-2xs`,xs:`fa-xs`,sm:`fa-sm`,lg:`fa-lg`,xl:`fa-xl`,"2xl":`fa-2xl`,"1x":`fa-1x`,"2x":`fa-2x`,"3x":`fa-3x`,"4x":`fa-4x`,"5x":`fa-5x`,"6x":`fa-6x`,"7x":`fa-7x`,"8x":`fa-8x`,"9x":`fa-9x`,"10x":`fa-10x`},k={border:`fa-border`,fixedWidth:`fa-fw`,flip:`fa-flip`,flipHorizontal:`fa-flip-horizontal`,flipVertical:`fa-flip-vertical`,inverse:`fa-inverse`,rotateBy:`fa-rotate-by`,swapOpacity:`fa-swap-opacity`,widthAuto:`fa-width-auto`,canvasSquare:`fa-canvas-square`,canvasRoomy:`fa-canvas-roomy`},Ea={default:`fa-layers`};function Da(e){let t=aa.cssPrefix||aa.familyPrefix||Sa;return t===Sa?e:e.replace(new RegExp(String.raw`(?<=^|\s)${Sa}-`,`g`),`${t}-`)}function Oa(e){let{beat:t,fade:n,beatFade:r,bounce:i,shake:a,spin:o,spinPulse:s,spinReverse:c,pulse:l,fixedWidth:u,inverse:d,border:f,flip:p,size:m,rotation:h,pull:g,swapOpacity:_,rotateBy:v,widthAuto:y,canvasSquare:ee,canvasRoomy:b,flip360:te,buzz:ne,float:re,jello:ie,spinSnap:ae,spinSnap4:oe,spinSnap8:se,swing:ce,wag:le,className:ue}=e,x=[];return ue&&x.push(...ue.split(` `)),t&&x.push(O.beat),n&&x.push(O.fade),r&&x.push(O.beatFade),i&&x.push(O.bounce),a&&x.push(O.shake),o&&x.push(O.spin),c&&x.push(O.spinReverse),s&&x.push(O.spinPulse),l&&x.push(O.pulse),u&&x.push(k.fixedWidth),d&&x.push(k.inverse),f&&x.push(k.border),p===!0&&x.push(k.flip),(p===`horizontal`||p===`both`)&&x.push(k.flipHorizontal),(p===`vertical`||p===`both`)&&x.push(k.flipVertical),m!=null&&x.push(Ta[m]),h!=null&&h!==0&&x.push(wa[h]),g!=null&&x.push(Ca[g]),_&&x.push(k.swapOpacity),xa()?(v&&x.push(k.rotateBy),y&&x.push(k.widthAuto),ee&&x.push(k.canvasSquare),b&&x.push(k.canvasRoomy),te&&x.push(O.flip360),ne&&x.push(O.buzz),re&&x.push(O.float),ie&&x.push(O.jello),ae&&x.push(O.spinSnap),oe&&x.push(O.spinSnap4),se&&x.push(O.spinSnap8),ce&&x.push(O.swing),le&&x.push(O.wag),(aa.cssPrefix||aa.familyPrefix||Sa)===Sa?x:x.map(Da)):x}var ka=e=>typeof e==`object`&&`icon`in e&&!!e.icon;function Aa(e){if(e)return ka(e)?e:oa.icon(e)}function ja(e){return Object.keys(e)}var Ma=new va(`FontAwesomeIcon`),Na={border:!1,className:``,mask:void 0,maskId:void 0,fixedWidth:!1,inverse:!1,flip:!1,icon:void 0,listItem:!1,pull:void 0,pulse:!1,rotation:void 0,rotateBy:!1,size:void 0,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:``,titleId:void 0,transform:void 0,swapOpacity:!1,widthAuto:!1,canvasSquare:!1,canvasRoomy:!1,flip360:!1,buzz:!1,float:!1,jello:!1,spinSnap:!1,spinSnap4:!1,spinSnap8:!1,swing:!1,wag:!1},Pa=new Set(Object.keys(Na)),Fa=a.forwardRef((e,t)=>{let n={...Na,...e},{icon:r,mask:i,symbol:a,title:o,titleId:s,maskId:c,transform:l}=n,u=_a(c,!!i),d=_a(s,!!o),f=Aa(r);if(!f)return Ma.error(`Icon lookup is undefined`,r),null;let p=Oa(n),m=typeof l==`string`?oa.transform(l):l,h=Aa(i),g=sa(f,{...p.length>0&&{classes:p},...m&&{transform:m},...h&&{mask:h},symbol:a,title:o,titleId:d,maskId:u});if(!g)return Ma.error(`Could not find icon`,f),null;let{abstract:_}=g,v={ref:t};for(let e of ja(n))Pa.has(e)||(v[e]=n[e]);return ga(_[0],v)});Fa.displayName=`FontAwesomeIcon`,`${Ea.default}${k.fixedWidth}`;var Ia={prefix:`fas`,iconName:`bomb`,icon:[576,512,[128163],`f1e2`,`M480-16c6.9 0 13 4.4 15.2 10.9l13.5 40.4 40.4 13.5C555.6 51 560 57.1 560 64s-4.4 13-10.9 15.2l-40.4 13.5-13.5 40.4C493 139.6 486.9 144 480 144s-13-4.4-15.2-10.9l-13.5-40.4-40.4-13.5C404.4 77 400 70.9 400 64s4.4-13 10.9-15.2l40.4-13.5 13.5-40.4C467-11.6 473.1-16 480-16zM321.4 97.4c12.5-12.5 32.8-12.5 45.3 0l80 80c12.5 12.5 12.5 32.8 0 45.3l-10.9 10.9c7.9 22 12.2 45.7 12.2 70.5 0 114.9-93.1 208-208 208S32 418.9 32 304 125.1 96 240 96c24.7 0 48.5 4.3 70.5 12.3l10.9-10.9zM144 304c0-53 43-96 96-96 13.3 0 24-10.7 24-24s-10.7-24-24-24c-79.5 0-144 64.5-144 144 0 13.3 10.7 24 24 24s24-10.7 24-24z`]},La={prefix:`fas`,iconName:`xmark`,icon:[384,512,[128473,10005,10006,10060,215,`close`,`multiply`,`remove`,`times`],`f00d`,`M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z`]},Ra={prefix:`fas`,iconName:`anchor`,icon:[576,512,[9875],`f13d`,`M288 64a32 32 0 1 0 0 64 32 32 0 1 0 0-64zM192 96c0-53 43-96 96-96s96 43 96 96c0 41.8-26.7 77.4-64 90.5l0 257.9c62.9-14.3 110.2-69.7 111.9-136.5l-16.1 14.1c-10 8.7-25.1 7.7-33.9-2.3s-7.7-25.1 2.3-33.9l64-56c9-7.9 22.6-7.9 31.6 0l64 56c10 8.7 11 23.9 2.3 33.9s-23.9 11-33.9 2.3L496 307.9C493.9 421 401.6 512 288 512S82.1 421 80 307.9L63.8 322.1c-10 8.7-25.1 7.7-33.9-2.3s-7.7-25.1 2.3-33.9l64-56c9-7.9 22.6-7.9 31.6 0l64 56c10 8.7 11 23.9 2.3 33.9s-23.9 11-33.9 2.3l-16.1-14.1c1.8 66.8 49.1 122.2 111.9 136.5l0-257.9c-37.3-13.2-64-48.7-64-90.5z`]},za={prefix:`fas`,iconName:`ship`,icon:[640,512,[128674],`f21a`,`M272 0c-26.5 0-48 21.5-48 48l0 16-16 0c-44.2 0-80 35.8-80 80l0 108.8-21.6 8.6c-14.8 5.9-22.5 22.4-17.4 37.5 10.4 31.3 26.8 59.3 47.7 83.1 20.1-9.2 41.7-13.9 63.3-14 33.1-.2 66.3 10.2 94.4 31.4l1.6 1.2 0-215-104 41.6 0-83.2c0-8.8 7.2-16 16-16l224 0c8.8 0 16 7.2 16 16l0 83.2-104-41.6 0 215 1.6-1.2c27.5-20.7 59.9-31.2 92.4-31.4 22.3-.1 44.6 4.5 65.3 14 20.9-23.7 37.3-51.8 47.7-83.1 5-15.2-2.6-31.6-17.4-37.5L512 252.8 512 144c0-44.2-35.8-80-80-80l-16 0 0-16c0-26.5-21.5-48-48-48L272 0zM403.4 476.1c21.3-16.1 49.9-16.1 71.2 0 19 14.4 41.9 28.2 67.2 33.3 26.5 5.4 54.3 .8 80.7-19.1 10.6-8 12.7-23 4.7-33.6s-23-12.7-33.6-4.7c-14.9 11.2-28.6 13.1-42.3 10.3-14.9-3-30.9-11.9-47.8-24.6-38.4-29-90.5-29-129 0-24 18.1-40.7 26.3-54.5 26.3s-30.5-8.2-54.5-26.3c-38.4-29-90.5-29-129 0-21.6 16.3-41.3 25.8-58.9 25.7-9.6-.1-19.9-3-31.2-11.5-10.6-8-25.6-5.9-33.6 4.7S7 482.3 17.6 490.3c19.1 14.4 39.4 21 59.8 21.1 33.9 .2 64.3-17.4 88.1-35.3 21.3-16.1 49.9-16.1 71.2 0 24.2 18.3 52.3 35.9 83.4 35.9s59.1-17.7 83.4-35.9z`]},Ba;function A(){return Ba.apply(null,arguments)}function Va(e){Ba=e}function Ha(e){return e instanceof Array||Object.prototype.toString.call(e)===`[object Array]`}function Ua(e){return e!=null&&Object.prototype.toString.call(e)===`[object Object]`}function j(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function Wa(e){if(Object.getOwnPropertyNames)return Object.getOwnPropertyNames(e).length===0;for(var t in e)if(j(e,t))return!1;return!0}function M(e){return e===void 0}function Ga(e){return typeof e==`number`||Object.prototype.toString.call(e)===`[object Number]`}function Ka(e){return e instanceof Date||Object.prototype.toString.call(e)===`[object Date]`}function qa(e,t){var n=[],r,i=e.length;for(r=0;r<i;++r)n.push(t(e[r],r));return n}function Ja(e,t){for(var n in t)j(t,n)&&(e[n]=t[n]);return j(t,`toString`)&&(e.toString=t.toString),j(t,`valueOf`)&&(e.valueOf=t.valueOf),e}function Ya(e,t,n,r){return ml(e,t,n,r,!0).utc()}function Xa(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidEra:null,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],era:null,meridiem:null,rfc2822:!1,weekdayMismatch:!1}}function N(e){return e._pf??=Xa(),e._pf}var Za=Array.prototype.some?Array.prototype.some:function(e){var t=Object(this),n=t.length>>>0,r;for(r=0;r<n;r++)if(r in t&&e.call(this,t[r],r,t))return!0;return!1};function Qa(e){var t=null,n=!1,r=e._d&&!isNaN(e._d.getTime());if(r&&(t=N(e),n=Za.call(t.parsedDateParts,function(e){return e!=null}),r=t.overflow<0&&!t.empty&&!t.invalidEra&&!t.invalidMonth&&!t.invalidWeekday&&!t.weekdayMismatch&&!t.nullInput&&!t.invalidFormat&&!t.userInvalidated&&(!t.meridiem||t.meridiem&&n),e._strict&&(r=r&&t.charsLeftOver===0&&t.unusedTokens.length===0&&t.bigHour===void 0)),Object.isFrozen==null||!Object.isFrozen(e))e._isValid=r;else return r;return e._isValid}function $a(e){var t=Ya(NaN);return e==null?N(t).userInvalidated=!0:Ja(N(t),e),t}var eo=A.momentProperties=[],to=!1;function no(e,t){var n,r,i,a=eo.length;if(M(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),M(t._i)||(e._i=t._i),M(t._f)||(e._f=t._f),M(t._l)||(e._l=t._l),M(t._strict)||(e._strict=t._strict),M(t._tzm)||(e._tzm=t._tzm),M(t._isUTC)||(e._isUTC=t._isUTC),M(t._offset)||(e._offset=t._offset),M(t._pf)||(e._pf=N(t)),M(t._locale)||(e._locale=t._locale),a>0)for(n=0;n<a;n++)r=eo[n],i=t[r],M(i)||(e[r]=i);return e}function ro(e){no(this,e),this._d=new Date(e._d==null?NaN:e._d.getTime()),this.isValid()||(this._d=new Date(NaN)),to===!1&&(to=!0,A.updateOffset(this),to=!1)}function P(e){return e instanceof ro||e!=null&&e._isAMomentObject!=null}function io(e){A.suppressDeprecationWarnings===!1&&typeof console<`u`&&console.warn&&console.warn(`Deprecation warning: `+e)}function F(e,t){var n=!0;return Ja(function(){if(A.deprecationHandler!=null&&A.deprecationHandler(null,e),n){var r=[],i,a,o,s=arguments.length;for(a=0;a<s;a++){if(i=``,typeof arguments[a]==`object`){for(o in i+=`
[`+a+`] `,arguments[0])j(arguments[0],o)&&(i+=o+`: `+arguments[0][o]+`, `);i=i.slice(0,-2)}else i=arguments[a];r.push(i)}io(e+`
Arguments: `+Array.prototype.slice.call(r).join(``)+`
`+Error().stack),n=!1}return t.apply(this,arguments)},t)}var ao={};function oo(e,t){A.deprecationHandler!=null&&A.deprecationHandler(e,t),ao[e]||(io(t),ao[e]=!0)}A.suppressDeprecationWarnings=!1,A.deprecationHandler=null;function so(e){return typeof Function<`u`&&e instanceof Function||Object.prototype.toString.call(e)===`[object Function]`}function co(e){var t,n;for(n in e)j(e,n)&&(t=e[n],so(t)?this[n]=t:this[`_`+n]=t);this._config=e,this._dayOfMonthOrdinalParseLenient=RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+`|\\d{1,2}`)}function lo(e,t){var n=Ja({},e),r;for(r in t)j(t,r)&&(Ua(e[r])&&Ua(t[r])?(n[r]={},Ja(n[r],e[r]),Ja(n[r],t[r])):t[r]==null?delete n[r]:n[r]=t[r]);for(r in e)j(e,r)&&!j(t,r)&&Ua(e[r])&&(n[r]=Ja({},n[r]));return n}function uo(e){e!=null&&this.set(e)}var fo=Object.keys?Object.keys:function(e){var t,n=[];for(t in e)j(e,t)&&n.push(t);return n},po={sameDay:`[Today at] LT`,nextDay:`[Tomorrow at] LT`,nextWeek:`dddd [at] LT`,lastDay:`[Yesterday at] LT`,lastWeek:`[Last] dddd [at] LT`,sameElse:`L`};function mo(e,t,n){var r=this._calendar[e]||this._calendar.sameElse;return so(r)?r.call(t,n):r}function ho(e,t,n){var r=``+Math.abs(e),i=t-r.length;return(e>=0?n?`+`:``:`-`)+(10**Math.max(0,i)).toString().substr(1)+r}var go=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,_o=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,vo={},yo={};function I(e,t,n,r){var i=r;typeof r==`string`&&(i=function(){return this[r]()}),e&&(yo[e]=i),t&&(yo[t[0]]=function(){return ho(i.apply(this,arguments),t[1],t[2])}),n&&(yo[n]=function(){return this.localeData().ordinal(i.apply(this,arguments),e)})}function bo(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,``):e.replace(/\\/g,``)}function xo(e){var t=e.match(go),n,r;for(n=0,r=t.length;n<r;n++)yo[t[n]]?t[n]=yo[t[n]]:t[n]=bo(t[n]);return function(n){var i=``,a;for(a=0;a<r;a++)i+=so(t[a])?t[a].call(n,e):t[a];return i}}function So(e,t){return e.isValid()?(t=Co(t,e.localeData()),vo[t]=vo[t]||xo(t),vo[t](e)):e.localeData().invalidDate()}function Co(e,t){var n=5;function r(e){return t.longDateFormat(e)||e}for(_o.lastIndex=0;n>=0&&_o.test(e);)e=e.replace(_o,r),_o.lastIndex=0,--n;return e}var wo={LTS:`h:mm:ss A`,LT:`h:mm A`,L:`MM/DD/YYYY`,LL:`MMMM D, YYYY`,LLL:`MMMM D, YYYY h:mm A`,LLLL:`dddd, MMMM D, YYYY h:mm A`};function To(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.match(go).map(function(e){return e===`MMMM`||e===`MM`||e===`DD`||e===`dddd`?e.slice(1):e}).join(``),this._longDateFormat[e])}var Eo=`Invalid date`;function Do(){return this._invalidDate}var Oo=`%d`,ko=/\d{1,2}/;function Ao(e){return this._ordinal.replace(`%d`,e)}var jo={future:`in %s`,past:`%s ago`,s:`a few seconds`,ss:`%d seconds`,m:`a minute`,mm:`%d minutes`,h:`an hour`,hh:`%d hours`,d:`a day`,dd:`%d days`,w:`a week`,ww:`%d weeks`,M:`a month`,MM:`%d months`,y:`a year`,yy:`%d years`};function Mo(e,t,n,r){var i=this._relativeTime[n];return so(i)?i(e,t,n,r):i.replace(/%d/i,e)}function No(e,t){var n=this._relativeTime[e>0?`future`:`past`];return so(n)?n(t):n.replace(/%s/i,t)}var Po={D:`date`,dates:`date`,date:`date`,d:`day`,days:`day`,day:`day`,e:`weekday`,weekdays:`weekday`,weekday:`weekday`,E:`isoWeekday`,isoweekdays:`isoWeekday`,isoweekday:`isoWeekday`,DDD:`dayOfYear`,dayofyears:`dayOfYear`,dayofyear:`dayOfYear`,h:`hour`,hours:`hour`,hour:`hour`,ms:`millisecond`,milliseconds:`millisecond`,millisecond:`millisecond`,m:`minute`,minutes:`minute`,minute:`minute`,M:`month`,months:`month`,month:`month`,Q:`quarter`,quarters:`quarter`,quarter:`quarter`,s:`second`,seconds:`second`,second:`second`,gg:`weekYear`,weekyears:`weekYear`,weekyear:`weekYear`,GG:`isoWeekYear`,isoweekyears:`isoWeekYear`,isoweekyear:`isoWeekYear`,w:`week`,weeks:`week`,week:`week`,W:`isoWeek`,isoweeks:`isoWeek`,isoweek:`isoWeek`,y:`year`,years:`year`,year:`year`};function L(e){return typeof e==`string`?Po[e]||Po[e.toLowerCase()]:void 0}function Fo(e){var t={},n,r;for(r in e)j(e,r)&&(n=L(r),n&&(t[n]=e[r]));return t}var Io={date:9,day:11,weekday:11,isoWeekday:11,dayOfYear:4,hour:13,millisecond:16,minute:14,month:8,quarter:7,second:15,weekYear:1,isoWeekYear:1,week:5,isoWeek:5,year:1};function Lo(e){var t=[],n;for(n in e)j(e,n)&&t.push({unit:n,priority:Io[n]});return t.sort(function(e,t){return e.priority-t.priority}),t}var Ro=/\d/,R=/\d\d/,zo=/\d{3}/,Bo=/\d{4}/,Vo=/[+-]?\d{6}/,z=/\d\d?/,Ho=/\d\d\d\d?/,Uo=/\d\d\d\d\d\d?/,Wo=/\d{1,3}/,Go=/\d{1,4}/,Ko=/[+-]?\d{1,6}/,qo=/\d+/,Jo=/[+-]?\d+/,Yo=/Z|[+-]\d\d:?\d\d/gi,Xo=/Z|[+-]\d\d(?::?\d\d)?/gi,Zo=/[+-]?\d+(\.\d{1,3})?/,Qo=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,$o=/^[1-9]\d?/,es=/^([1-9]\d|\d)/,ts={};function B(e,t,n){ts[e]=so(t)?t:function(e,r){return e&&n?n:t}}function ns(e,t){return j(ts,e)?ts[e](t._strict,t._locale):new RegExp(rs(e))}function rs(e){return is(e.replace(`\\`,``).replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,r,i){return t||n||r||i}))}function is(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,`\\$&`)}function V(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function H(e){var t=+e,n=0;return t!==0&&isFinite(t)&&(n=V(t)),n}var as={};function U(e,t){var n,r=t,i;for(typeof e==`string`&&(e=[e]),Ga(t)&&(r=function(e,n){n[t]=H(e)}),i=e.length,n=0;n<i;n++)as[e[n]]=r}function os(e,t){U(e,function(e,n,r,i){r._w=r._w||{},t(e,r._w,r,i)})}function ss(e,t,n){t!=null&&j(as,e)&&as[e](t,n._a,n,e)}function cs(e){return e%4==0&&e%100!=0||e%400==0}var W=0,ls=1,us=2,G=3,K=4,ds=5,fs=6,ps=7,ms=8;I(`Y`,0,0,function(){var e=this.year();return e<=9999?ho(e,4):`+`+e}),I(0,[`YY`,2],0,function(){return this.year()%100}),I(0,[`YYYY`,4],0,`year`),I(0,[`YYYYY`,5],0,`year`),I(0,[`YYYYYY`,6,!0],0,`year`),B(`Y`,Jo),B(`YY`,z,R),B(`YYYY`,Go,Bo),B(`YYYYY`,Ko,Vo),B(`YYYYYY`,Ko,Vo),U([`YYYYY`,`YYYYYY`],W),U(`YYYY`,function(e,t){t[W]=e.length===2?A.parseTwoDigitYear(e):H(e)}),U(`YY`,function(e,t){t[W]=A.parseTwoDigitYear(e)}),U(`Y`,function(e,t){t[W]=parseInt(e,10)});function hs(e){return cs(e)?366:365}A.parseTwoDigitYear=function(e){return H(e)+(H(e)>68?1900:2e3)};var gs=vs(`FullYear`,!0);function _s(){return cs(this.year())}function vs(e,t){return function(n){return n==null?ys(this,e):(bs(this,e,n),A.updateOffset(this,t),this)}}function ys(e,t){if(!e.isValid())return NaN;var n=e._d,r=e._isUTC;switch(t){case`Milliseconds`:return r?n.getUTCMilliseconds():n.getMilliseconds();case`Seconds`:return r?n.getUTCSeconds():n.getSeconds();case`Minutes`:return r?n.getUTCMinutes():n.getMinutes();case`Hours`:return r?n.getUTCHours():n.getHours();case`Date`:return r?n.getUTCDate():n.getDate();case`Day`:return r?n.getUTCDay():n.getDay();case`Month`:return r?n.getUTCMonth():n.getMonth();case`FullYear`:return r?n.getUTCFullYear():n.getFullYear();default:return NaN}}function bs(e,t,n){var r,i,a,o,s;if(!(!e.isValid()||isNaN(n))){switch(r=e._d,i=e._isUTC,t){case`Milliseconds`:i?r.setUTCMilliseconds(n):r.setMilliseconds(n);return;case`Seconds`:i?r.setUTCSeconds(n):r.setSeconds(n);return;case`Minutes`:i?r.setUTCMinutes(n):r.setMinutes(n);return;case`Hours`:i?r.setUTCHours(n):r.setHours(n);return;case`Date`:i?r.setUTCDate(n):r.setDate(n);return;case`FullYear`:break;default:return}a=n,o=e.month(),s=e.date(),s=s===29&&o===1&&!cs(a)?28:s,i?r.setUTCFullYear(a,o,s):r.setFullYear(a,o,s)}}function xs(e){return e=L(e),so(this[e])?this[e]():this}function Ss(e,t){if(typeof e==`object`){e=Fo(e);var n=Lo(e),r,i=n.length;for(r=0;r<i;r++)this[n[r].unit](e[n[r].unit])}else if(e=L(e),so(this[e]))return this[e](t);return this}function Cs(e,t){return(e%t+t)%t}var q=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var t;for(t=0;t<this.length;++t)if(this[t]===e)return t;return-1};function ws(e,t){if(isNaN(e)||isNaN(t))return NaN;var n=Cs(t,12);return e+=(t-n)/12,n===1?cs(e)?29:28:31-n%7%2}I(`M`,[`MM`,2],`Mo`,function(){return this.month()+1}),I(`MMM`,0,0,function(e){return this.localeData().monthsShort(this,e)}),I(`MMMM`,0,0,function(e){return this.localeData().months(this,e)}),B(`M`,z,$o),B(`MM`,z,R),B(`MMM`,function(e,t){return t.monthsShortRegex(e)}),B(`MMMM`,function(e,t){return t.monthsRegex(e)}),U([`M`,`MM`],function(e,t){t[ls]=H(e)-1}),U([`MMM`,`MMMM`],function(e,t,n,r){var i=n._locale.monthsParse(e,r,n._strict);i==null?N(n).invalidMonth=e:t[ls]=i});var Ts=`January_February_March_April_May_June_July_August_September_October_November_December`.split(`_`),Es=`Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`.split(`_`),Ds=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,Os=Qo,ks=Qo;function As(e,t){return e?Ha(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||Ds).test(t)?`format`:`standalone`][e.month()]:Ha(this._months)?this._months:this._months.standalone}function js(e,t){return e?Ha(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[Ds.test(t)?`format`:`standalone`][e.month()]:Ha(this._monthsShort)?this._monthsShort:this._monthsShort.standalone}function Ms(e,t,n){var r,i,a,o=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],r=0;r<12;++r)a=Ya([2e3,r]),this._shortMonthsParse[r]=this.monthsShort(a,``).toLocaleLowerCase(),this._longMonthsParse[r]=this.months(a,``).toLocaleLowerCase();return n?t===`MMM`?(i=q.call(this._shortMonthsParse,o),i===-1?null:i):(i=q.call(this._longMonthsParse,o),i===-1?null:i):t===`MMM`?(i=q.call(this._shortMonthsParse,o),i===-1?(i=q.call(this._longMonthsParse,o),i===-1?null:i):i):(i=q.call(this._longMonthsParse,o),i===-1?(i=q.call(this._shortMonthsParse,o),i===-1?null:i):i)}function Ns(e,t,n){var r,i,a;if(this._monthsParseExact)return Ms.call(this,e,t,n);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),r=0;r<12;r++)if(i=Ya([2e3,r]),n&&!this._longMonthsParse[r]&&(this._longMonthsParse[r]=RegExp(`^`+this.months(i,``).replace(`.`,``)+`$`,`i`),this._shortMonthsParse[r]=RegExp(`^`+this.monthsShort(i,``).replace(`.`,``)+`$`,`i`)),!n&&!this._monthsParse[r]&&(a=`^`+this.months(i,``)+`|^`+this.monthsShort(i,``),this._monthsParse[r]=new RegExp(a.replace(`.`,``),`i`)),n&&t===`MMMM`&&this._longMonthsParse[r].test(e)||n&&t===`MMM`&&this._shortMonthsParse[r].test(e)||!n&&this._monthsParse[r].test(e))return r}function Ps(e,t){if(!e.isValid())return e;if(typeof t==`string`){if(/^\d+$/.test(t))t=H(t);else if(t=e.localeData().monthsParse(t),!Ga(t))return e}var n=t,r=e.date();return r=r<29?r:Math.min(r,ws(e.year(),n)),e._isUTC?e._d.setUTCMonth(n,r):e._d.setMonth(n,r),e}function Fs(e){return e==null?ys(this,`Month`):(Ps(this,e),A.updateOffset(this,!0),this)}function Is(){return ws(this.year(),this.month())}function Ls(e){return this._monthsParseExact?(j(this,`_monthsRegex`)||zs.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(j(this,`_monthsShortRegex`)||(this._monthsShortRegex=Os),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)}function Rs(e){return this._monthsParseExact?(j(this,`_monthsRegex`)||zs.call(this),e?this._monthsStrictRegex:this._monthsRegex):(j(this,`_monthsRegex`)||(this._monthsRegex=ks),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)}function zs(){function e(e,t){return t.length-e.length}var t=[],n=[],r=[],i,a,o,s;for(i=0;i<12;i++)a=Ya([2e3,i]),o=is(this.monthsShort(a,``)),s=is(this.months(a,``)),t.push(o),n.push(s),r.push(s),r.push(o);t.sort(e),n.sort(e),r.sort(e),this._monthsRegex=RegExp(`^(`+r.join(`|`)+`)`,`i`),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=RegExp(`^(`+n.join(`|`)+`)`,`i`),this._monthsShortStrictRegex=RegExp(`^(`+t.join(`|`)+`)`,`i`)}function Bs(e,t,n,r,i,a,o){var s;return e<100&&e>=0?(s=new Date(e+400,t,n,r,i,a,o),isFinite(s.getFullYear())&&s.setFullYear(e)):s=new Date(e,t,n,r,i,a,o),s}function Vs(e){var t,n;return e<100&&e>=0?(n=Array.prototype.slice.call(arguments),n[0]=e+400,t=new Date(Date.UTC.apply(null,n)),isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e)):t=new Date(Date.UTC.apply(null,arguments)),t}function Hs(e,t,n){var r=7+t-n;return-((7+Vs(e,0,r).getUTCDay()-t)%7)+r-1}function Us(e,t,n,r,i){var a=(7+n-r)%7,o=Hs(e,r,i),s=1+7*(t-1)+a+o,c,l;return s<=0?(c=e-1,l=hs(c)+s):s>hs(e)?(c=e+1,l=s-hs(e)):(c=e,l=s),{year:c,dayOfYear:l}}function Ws(e,t,n){var r=Hs(e.year(),t,n),i=Math.floor((e.dayOfYear()-r-1)/7)+1,a,o;return i<1?(o=e.year()-1,a=i+Gs(o,t,n)):i>Gs(e.year(),t,n)?(a=i-Gs(e.year(),t,n),o=e.year()+1):(o=e.year(),a=i),{week:a,year:o}}function Gs(e,t,n){var r=Hs(e,t,n),i=Hs(e+1,t,n);return(hs(e)-r+i)/7}I(`w`,[`ww`,2],`wo`,`week`),I(`W`,[`WW`,2],`Wo`,`isoWeek`),B(`w`,z,$o),B(`ww`,z,R),B(`W`,z,$o),B(`WW`,z,R),os([`w`,`ww`,`W`,`WW`],function(e,t,n,r){t[r.substr(0,1)]=H(e)});function Ks(e){return Ws(e,this._week.dow,this._week.doy).week}var qs={dow:0,doy:6};function Js(){return this._week.dow}function Ys(){return this._week.doy}function Xs(e){var t=this.localeData().week(this);return e==null?t:this.add((e-t)*7,`d`)}function Zs(e){var t=Ws(this,1,4).week;return e==null?t:this.add((e-t)*7,`d`)}I(`d`,0,`do`,`day`),I(`dd`,0,0,function(e){return this.localeData().weekdaysMin(this,e)}),I(`ddd`,0,0,function(e){return this.localeData().weekdaysShort(this,e)}),I(`dddd`,0,0,function(e){return this.localeData().weekdays(this,e)}),I(`e`,0,0,`weekday`),I(`E`,0,0,`isoWeekday`),B(`d`,z),B(`e`,z),B(`E`,z),B(`dd`,function(e,t){return t.weekdaysMinRegex(e)}),B(`ddd`,function(e,t){return t.weekdaysShortRegex(e)}),B(`dddd`,function(e,t){return t.weekdaysRegex(e)}),os([`dd`,`ddd`,`dddd`],function(e,t,n,r){var i=n._locale.weekdaysParse(e,r,n._strict);i==null?N(n).invalidWeekday=e:t.d=i}),os([`d`,`e`,`E`],function(e,t,n,r){t[r]=H(e)});function Qs(e,t){return typeof e==`string`?isNaN(e)?(e=t.weekdaysParse(e),typeof e==`number`?e:null):parseInt(e,10):e}function $s(e,t){return typeof e==`string`?t.weekdaysParse(e)%7||7:isNaN(e)?null:e}function ec(e,t){return e.slice(t,7).concat(e.slice(0,t))}var tc=`Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`.split(`_`),nc=`Sun_Mon_Tue_Wed_Thu_Fri_Sat`.split(`_`),rc=`Su_Mo_Tu_We_Th_Fr_Sa`.split(`_`),ic=Qo,ac=Qo,oc=Qo;function sc(e,t){var n=Ha(this._weekdays)?this._weekdays:this._weekdays[e&&e!==!0&&this._weekdays.isFormat.test(t)?`format`:`standalone`];return e===!0?ec(n,this._week.dow):e?n[e.day()]:n}function cc(e){return e===!0?ec(this._weekdaysShort,this._week.dow):e?this._weekdaysShort[e.day()]:this._weekdaysShort}function lc(e){return e===!0?ec(this._weekdaysMin,this._week.dow):e?this._weekdaysMin[e.day()]:this._weekdaysMin}function uc(e,t,n){var r,i,a,o=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],r=0;r<7;++r)a=Ya([2e3,1]).day(r),this._minWeekdaysParse[r]=this.weekdaysMin(a,``).toLocaleLowerCase(),this._shortWeekdaysParse[r]=this.weekdaysShort(a,``).toLocaleLowerCase(),this._weekdaysParse[r]=this.weekdays(a,``).toLocaleLowerCase();return n?t===`dddd`?(i=q.call(this._weekdaysParse,o),i===-1?null:i):t===`ddd`?(i=q.call(this._shortWeekdaysParse,o),i===-1?null:i):(i=q.call(this._minWeekdaysParse,o),i===-1?null:i):t===`dddd`?(i=q.call(this._weekdaysParse,o),i!==-1||(i=q.call(this._shortWeekdaysParse,o),i!==-1)?i:(i=q.call(this._minWeekdaysParse,o),i===-1?null:i)):t===`ddd`?(i=q.call(this._shortWeekdaysParse,o),i!==-1||(i=q.call(this._weekdaysParse,o),i!==-1)?i:(i=q.call(this._minWeekdaysParse,o),i===-1?null:i)):(i=q.call(this._minWeekdaysParse,o),i!==-1||(i=q.call(this._weekdaysParse,o),i!==-1)?i:(i=q.call(this._shortWeekdaysParse,o),i===-1?null:i))}function dc(e,t,n){var r,i,a;if(this._weekdaysParseExact)return uc.call(this,e,t,n);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),r=0;r<7;r++)if(i=Ya([2e3,1]).day(r),n&&!this._fullWeekdaysParse[r]&&(this._fullWeekdaysParse[r]=RegExp(`^`+this.weekdays(i,``).replace(`.`,`\\.?`)+`$`,`i`),this._shortWeekdaysParse[r]=RegExp(`^`+this.weekdaysShort(i,``).replace(`.`,`\\.?`)+`$`,`i`),this._minWeekdaysParse[r]=RegExp(`^`+this.weekdaysMin(i,``).replace(`.`,`\\.?`)+`$`,`i`)),this._weekdaysParse[r]||(a=`^`+this.weekdays(i,``)+`|^`+this.weekdaysShort(i,``)+`|^`+this.weekdaysMin(i,``),this._weekdaysParse[r]=new RegExp(a.replace(`.`,``),`i`)),n&&t===`dddd`&&this._fullWeekdaysParse[r].test(e)||n&&t===`ddd`&&this._shortWeekdaysParse[r].test(e)||n&&t===`dd`&&this._minWeekdaysParse[r].test(e)||!n&&this._weekdaysParse[r].test(e))return r}function fc(e){if(!this.isValid())return e==null?NaN:this;var t=ys(this,`Day`);return e==null?t:(e=Qs(e,this.localeData()),this.add(e-t,`d`))}function pc(e){if(!this.isValid())return e==null?NaN:this;var t=(this.day()+7-this.localeData()._week.dow)%7;return e==null?t:this.add(e-t,`d`)}function mc(e){if(!this.isValid())return e==null?NaN:this;if(e!=null){var t=$s(e,this.localeData());return this.day(this.day()%7?t:t-7)}return this.day()||7}function hc(e){return this._weekdaysParseExact?(j(this,`_weekdaysRegex`)||vc.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(j(this,`_weekdaysRegex`)||(this._weekdaysRegex=ic),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)}function gc(e){return this._weekdaysParseExact?(j(this,`_weekdaysRegex`)||vc.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(j(this,`_weekdaysShortRegex`)||(this._weekdaysShortRegex=ac),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function _c(e){return this._weekdaysParseExact?(j(this,`_weekdaysRegex`)||vc.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(j(this,`_weekdaysMinRegex`)||(this._weekdaysMinRegex=oc),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function vc(){function e(e,t){return t.length-e.length}var t=[],n=[],r=[],i=[],a,o,s,c,l;for(a=0;a<7;a++)o=Ya([2e3,1]).day(a),s=is(this.weekdaysMin(o,``)),c=is(this.weekdaysShort(o,``)),l=is(this.weekdays(o,``)),t.push(s),n.push(c),r.push(l),i.push(s),i.push(c),i.push(l);t.sort(e),n.sort(e),r.sort(e),i.sort(e),this._weekdaysRegex=RegExp(`^(`+i.join(`|`)+`)`,`i`),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=RegExp(`^(`+r.join(`|`)+`)`,`i`),this._weekdaysShortStrictRegex=RegExp(`^(`+n.join(`|`)+`)`,`i`),this._weekdaysMinStrictRegex=RegExp(`^(`+t.join(`|`)+`)`,`i`)}function yc(){return this.hours()%12||12}function bc(){return this.hours()||24}I(`H`,[`HH`,2],0,`hour`),I(`h`,[`hh`,2],0,yc),I(`k`,[`kk`,2],0,bc),I(`hmm`,0,0,function(){return``+yc.apply(this)+ho(this.minutes(),2)}),I(`hmmss`,0,0,function(){return``+yc.apply(this)+ho(this.minutes(),2)+ho(this.seconds(),2)}),I(`Hmm`,0,0,function(){return``+this.hours()+ho(this.minutes(),2)}),I(`Hmmss`,0,0,function(){return``+this.hours()+ho(this.minutes(),2)+ho(this.seconds(),2)});function xc(e,t){I(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}xc(`a`,!0),xc(`A`,!1);function Sc(e,t){return t._meridiemParse}B(`a`,Sc),B(`A`,Sc),B(`H`,z,es),B(`h`,z,$o),B(`k`,z,$o),B(`HH`,z,R),B(`hh`,z,R),B(`kk`,z,R),B(`hmm`,Ho),B(`hmmss`,Uo),B(`Hmm`,Ho),B(`Hmmss`,Uo),U([`H`,`HH`],G),U([`k`,`kk`],function(e,t,n){var r=H(e);t[G]=r===24?0:r}),U([`a`,`A`],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e}),U([`h`,`hh`],function(e,t,n){t[G]=H(e),N(n).bigHour=!0}),U(`hmm`,function(e,t,n){var r=e.length-2;t[G]=H(e.substr(0,r)),t[K]=H(e.substr(r)),N(n).bigHour=!0}),U(`hmmss`,function(e,t,n){var r=e.length-4,i=e.length-2;t[G]=H(e.substr(0,r)),t[K]=H(e.substr(r,2)),t[ds]=H(e.substr(i)),N(n).bigHour=!0}),U(`Hmm`,function(e,t,n){var r=e.length-2;t[G]=H(e.substr(0,r)),t[K]=H(e.substr(r))}),U(`Hmmss`,function(e,t,n){var r=e.length-4,i=e.length-2;t[G]=H(e.substr(0,r)),t[K]=H(e.substr(r,2)),t[ds]=H(e.substr(i))});function Cc(e){return(e+``).toLowerCase().charAt(0)===`p`}var wc=/[ap]\.?m?\.?/i,Tc=vs(`Hours`,!0);function Ec(e,t,n){return e>11?n?`pm`:`PM`:n?`am`:`AM`}var Dc={calendar:po,longDateFormat:wo,invalidDate:Eo,ordinal:Oo,dayOfMonthOrdinalParse:ko,relativeTime:jo,months:Ts,monthsShort:Es,week:qs,weekdays:tc,weekdaysMin:rc,weekdaysShort:nc,meridiemParse:wc},J={},Oc={},kc;function Ac(e,t){var n,r=Math.min(e.length,t.length);for(n=0;n<r;n+=1)if(e[n]!==t[n])return n;return r}function jc(e){return e&&e.toLowerCase().replace(`_`,`-`)}function Mc(e){for(var t=0,n,r,i,a;t<e.length;){for(a=jc(e[t]).split(`-`),n=a.length,r=jc(e[t+1]),r=r?r.split(`-`):null;n>0;){if(i=Pc(a.slice(0,n).join(`-`)),i)return i;if(r&&r.length>=n&&Ac(a,r)>=n-1)break;n--}t++}return kc}function Nc(e){return!!(e&&e.match(`^[^/\\\\]*$`))}function Pc(e){var t=null,n;if(J[e]===void 0&&typeof module<`u`&&module&&module.exports&&Nc(e))try{t=kc._abbr,n=r,n(`./locale/`+e),Fc(t)}catch{J[e]=null}return J[e]}function Fc(e,t){var n;return e&&(n=M(t)?Rc(e):Ic(e,t),n?kc=n:typeof console<`u`&&console.warn&&console.warn(`Locale `+e+` not found. Did you forget to load it?`)),kc._abbr}function Ic(e,t){if(t!==null){var n,r=Dc;if(t.abbr=e,J[e]!=null)oo(`defineLocaleOverride`,`use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.`),r=J[e]._config;else if(t.parentLocale!=null){if(J[t.parentLocale]!=null)r=J[t.parentLocale]._config;else if(n=Pc(t.parentLocale),n!=null)r=n._config;else return Oc[t.parentLocale]||(Oc[t.parentLocale]=[]),Oc[t.parentLocale].push({name:e,config:t}),null}return J[e]=new uo(lo(r,t)),Oc[e]&&Oc[e].forEach(function(e){Ic(e.name,e.config)}),Fc(e),J[e]}return delete J[e],null}function Lc(e,t){if(t!=null){var n,r,i=Dc;J[e]!=null&&J[e].parentLocale!=null?J[e].set(lo(J[e]._config,t)):(r=Pc(e),r!=null&&(i=r._config),t=lo(i,t),r??(t.abbr=e),n=new uo(t),n.parentLocale=J[e],J[e]=n),Fc(e)}else J[e]!=null&&(J[e].parentLocale==null?J[e]!=null&&delete J[e]:(J[e]=J[e].parentLocale,e===Fc()&&Fc(e)));return J[e]}function Rc(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return kc;if(!Ha(e)){if(t=Pc(e),t)return t;e=[e]}return Mc(e)}function zc(){return fo(J)}function Bc(e){var t,n=e._a;return n&&N(e).overflow===-2&&(t=n[ls]<0||n[ls]>11?ls:n[us]<1||n[us]>ws(n[W],n[ls])?us:n[G]<0||n[G]>24||n[G]===24&&(n[K]!==0||n[ds]!==0||n[fs]!==0)?G:n[K]<0||n[K]>59?K:n[ds]<0||n[ds]>59?ds:n[fs]<0||n[fs]>999?fs:-1,N(e)._overflowDayOfYear&&(t<W||t>us)&&(t=us),N(e)._overflowWeeks&&t===-1&&(t=ps),N(e)._overflowWeekday&&t===-1&&(t=ms),N(e).overflow=t),e}var Vc=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Hc=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Uc=/Z|[+-]\d\d(?::?\d\d)?/,Wc=[[`YYYYYY-MM-DD`,/[+-]\d{6}-\d\d-\d\d/],[`YYYY-MM-DD`,/\d{4}-\d\d-\d\d/],[`GGGG-[W]WW-E`,/\d{4}-W\d\d-\d/],[`GGGG-[W]WW`,/\d{4}-W\d\d/,!1],[`YYYY-DDD`,/\d{4}-\d{3}/],[`YYYY-MM`,/\d{4}-\d\d/,!1],[`YYYYYYMMDD`,/[+-]\d{10}/],[`YYYYMMDD`,/\d{8}/],[`GGGG[W]WWE`,/\d{4}W\d{3}/],[`GGGG[W]WW`,/\d{4}W\d{2}/,!1],[`YYYYDDD`,/\d{7}/],[`YYYYMM`,/\d{6}/,!1],[`YYYY`,/\d{4}/,!1]],Gc=[[`HH:mm:ss.SSSS`,/\d\d:\d\d:\d\d\.\d+/],[`HH:mm:ss,SSSS`,/\d\d:\d\d:\d\d,\d+/],[`HH:mm:ss`,/\d\d:\d\d:\d\d/],[`HH:mm`,/\d\d:\d\d/],[`HHmmss.SSSS`,/\d\d\d\d\d\d\.\d+/],[`HHmmss,SSSS`,/\d\d\d\d\d\d,\d+/],[`HHmmss`,/\d\d\d\d\d\d/],[`HHmm`,/\d\d\d\d/],[`HH`,/\d\d/]],Kc=/^\/?Date\((-?\d+)/i,qc=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,Jc={UT:0,GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function Yc(e){var t,n,r=e._i,i=Vc.exec(r)||Hc.exec(r),a,o,s,c,l=Wc.length,u=Gc.length;if(i){for(N(e).iso=!0,t=0,n=l;t<n;t++)if(Wc[t][1].exec(i[1])){o=Wc[t][0],a=Wc[t][2]!==!1;break}if(o==null){e._isValid=!1;return}if(i[3]){for(t=0,n=u;t<n;t++)if(Gc[t][1].exec(i[3])){s=(i[2]||` `)+Gc[t][0];break}if(s==null){e._isValid=!1;return}}if(!a&&s!=null){e._isValid=!1;return}if(i[4]){if(Uc.exec(i[4]))c=`Z`;else{e._isValid=!1;return}}e._f=o+(s||``)+(c||``),sl(e)}else e._isValid=!1}function Xc(e,t,n,r,i,a){var o=[Zc(e),Es.indexOf(t),parseInt(n,10),parseInt(r,10),parseInt(i,10)];return a&&o.push(parseInt(a,10)),o}function Zc(e){var t=parseInt(e,10);return t<=49?2e3+t:t<=999?1900+t:t}function Qc(e){return e.replace(/\([^()]*\)|[\n\t]/g,` `).replace(/(\s\s+)/g,` `).replace(/^\s\s*/,``).replace(/\s\s*$/,``)}function $c(e,t,n){return e&&nc.indexOf(e)!==new Date(t[0],t[1],t[2]).getDay()?(N(n).weekdayMismatch=!0,n._isValid=!1,!1):!0}function el(e,t,n){if(e)return Jc[e];if(t)return 0;var r=parseInt(n,10),i=r%100;return(r-i)/100*60+i}function tl(e){var t=qc.exec(Qc(e._i)),n;if(t){if(n=Xc(t[4],t[3],t[2],t[5],t[6],t[7]),!$c(t[1],n,e))return;e._a=n,e._tzm=el(t[8],t[9],t[10]),e._d=Vs.apply(null,e._a),e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),N(e).rfc2822=!0}else e._isValid=!1}function nl(e){var t=Kc.exec(e._i);if(t!==null){e._d=new Date(+t[1]);return}if(Yc(e),e._isValid===!1)delete e._isValid;else return;if(tl(e),e._isValid===!1)delete e._isValid;else return;e._strict?e._isValid=!1:A.createFromInputFallback(e)}A.createFromInputFallback=F(`value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.`,function(e){e._d=new Date(e._i+(e._useUTC?` UTC`:``))});function rl(e,t,n){return e??t??n}function il(e){var t=new Date(A.now());return e._useUTC?[t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()]:[t.getFullYear(),t.getMonth(),t.getDate()]}function al(e){var t,n,r=[],i,a,o;if(!e._d){for(i=il(e),e._w&&e._a[us]==null&&e._a[ls]==null&&ol(e),e._dayOfYear!=null&&(o=rl(e._a[W],i[W]),(e._dayOfYear>hs(o)||e._dayOfYear===0)&&(N(e)._overflowDayOfYear=!0),n=Vs(o,0,e._dayOfYear),e._a[ls]=n.getUTCMonth(),e._a[us]=n.getUTCDate()),t=0;t<3&&e._a[t]==null;++t)e._a[t]=r[t]=i[t];for(;t<7;t++)e._a[t]=r[t]=e._a[t]==null?+(t===2):e._a[t];e._a[G]===24&&e._a[K]===0&&e._a[ds]===0&&e._a[fs]===0&&(e._nextDay=!0,e._a[G]=0),e._d=(e._useUTC?Vs:Bs).apply(null,r),a=e._useUTC?e._d.getUTCDay():e._d.getDay(),e._tzm!=null&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[G]=24),e._w&&e._w.d!==void 0&&e._w.d!==a&&(N(e).weekdayMismatch=!0)}}function ol(e){var t=e._w,n,r,i,a,o,s,c,l;t.GG!=null||t.W!=null||t.E!=null?(a=1,o=4,n=rl(t.GG,e._a[W],Ws(Y(),1,4).year),r=rl(t.W,1),i=rl(t.E,1),(i<1||i>7)&&(c=!0)):(a=e._locale._week.dow,o=e._locale._week.doy,l=Ws(Y(),a,o),n=rl(t.gg,e._a[W],l.year),r=rl(t.w,l.week),t.d==null?t.e==null?i=a:(i=t.e+a,(t.e<0||t.e>6)&&(c=!0)):(i=t.d,(i<0||i>6)&&(c=!0))),r<1||r>Gs(n,a,o)?N(e)._overflowWeeks=!0:c==null?(s=Us(n,r,i,a,o),e._a[W]=s.year,e._dayOfYear=s.dayOfYear):N(e)._overflowWeekday=!0}A.ISO_8601=function(){},A.RFC_2822=function(){};function sl(e){if(e._f===A.ISO_8601){Yc(e);return}if(e._f===A.RFC_2822){tl(e);return}e._a=[],N(e).empty=!0;var t=``+e._i,n,r,i,a,o,s=t.length,c=0,l,u;for(i=Co(e._f,e._locale).match(go)||[],u=i.length,n=0;n<u;n++)a=i[n],r=(t.match(ns(a,e))||[])[0],r&&(o=t.substr(0,t.indexOf(r)),o.length>0&&N(e).unusedInput.push(o),t=t.slice(t.indexOf(r)+r.length),c+=r.length),yo[a]?(r?N(e).empty=!1:N(e).unusedTokens.push(a),ss(a,r,e)):e._strict&&!r&&N(e).unusedTokens.push(a);N(e).charsLeftOver=s-c,t.length>0&&N(e).unusedInput.push(t),e._a[G]<=12&&N(e).bigHour===!0&&e._a[G]>0&&(N(e).bigHour=void 0),N(e).parsedDateParts=e._a.slice(0),N(e).meridiem=e._meridiem,e._a[G]=cl(e._locale,e._a[G],e._meridiem),l=N(e).era,l!==null&&(e._a[W]=e._locale.erasConvertYear(l,e._a[W])),al(e),Bc(e)}function cl(e,t,n){var r;return n==null?t:e.meridiemHour==null?e.isPM==null?t:(r=e.isPM(n),r&&t<12&&(t+=12),!r&&t===12&&(t=0),t):e.meridiemHour(t,n)}function ll(e){var t,n,r,i,a,o,s=!1,c=e._f.length;if(c===0){N(e).invalidFormat=!0,e._d=new Date(NaN);return}for(i=0;i<c;i++)a=0,o=!1,t=no({},e),e._useUTC!=null&&(t._useUTC=e._useUTC),t._f=e._f[i],sl(t),Qa(t)&&(o=!0),a+=N(t).charsLeftOver,a+=N(t).unusedTokens.length*10,N(t).score=a,s?a<r&&(r=a,n=t):(r==null||a<r||o)&&(r=a,n=t,o&&(s=!0));Ja(e,n||t)}function ul(e){if(!e._d){var t=Fo(e._i),n=t.day===void 0?t.date:t.day;e._a=qa([t.year,t.month,n,t.hour,t.minute,t.second,t.millisecond],function(e){return e&&parseInt(e,10)}),al(e)}}function dl(e){var t=new ro(Bc(fl(e)));return t._nextDay&&=(t.add(1,`d`),void 0),t}function fl(e){var t=e._i,n=e._f;return e._locale=e._locale||Rc(e._l),t===null||n===void 0&&t===``?$a({nullInput:!0}):(typeof t==`string`&&(e._i=t=e._locale.preparse(t)),P(t)?new ro(Bc(t)):(Ka(t)?e._d=t:Ha(n)?ll(e):n?sl(e):pl(e),Qa(e)||(e._d=null),e))}function pl(e){var t=e._i;M(t)?e._d=new Date(A.now()):Ka(t)?e._d=new Date(t.valueOf()):typeof t==`string`?nl(e):Ha(t)?(e._a=qa(t.slice(0),function(e){return parseInt(e,10)}),al(e)):Ua(t)?ul(e):Ga(t)?e._d=new Date(t):A.createFromInputFallback(e)}function ml(e,t,n,r,i){var a={};return(t===!0||t===!1)&&(r=t,t=void 0),(n===!0||n===!1)&&(r=n,n=void 0),(Ua(e)&&Wa(e)||Ha(e)&&e.length===0)&&(e=void 0),a._isAMomentObject=!0,a._useUTC=a._isUTC=i,a._l=n,a._i=e,a._f=t,a._strict=r,dl(a)}function Y(e,t,n,r){return ml(e,t,n,r,!1)}var hl=F(`moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/`,function(){var e=Y.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:$a()}),gl=F(`moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/`,function(){var e=Y.apply(null,arguments);return this.isValid()&&e.isValid()?e>this?this:e:$a()});function _l(e,t){var n,r;if(t.length===1&&Ha(t[0])&&(t=t[0]),!t.length)return Y();for(n=t[0],r=1;r<t.length;++r)(!t[r].isValid()||t[r][e](n))&&(n=t[r]);return n}function vl(){return _l(`isBefore`,[].slice.call(arguments,0))}function yl(){return _l(`isAfter`,[].slice.call(arguments,0))}var bl=function(){return Date.now?Date.now():+new Date},xl=[`year`,`quarter`,`month`,`week`,`day`,`hour`,`minute`,`second`,`millisecond`];function Sl(e){var t,n=!1,r,i=xl.length;for(t in e)if(j(e,t)&&!(q.call(xl,t)!==-1&&(e[t]==null||!isNaN(e[t]))))return!1;for(r=0;r<i;++r)if(e[xl[r]]){if(n)return!1;parseFloat(e[xl[r]])!==H(e[xl[r]])&&(n=!0)}return!0}function Cl(){return this._isValid}function wl(){return ql(NaN)}function Tl(e){var t=Fo(e),n=t.year||0,r=t.quarter||0,i=t.month||0,a=t.week||t.isoWeek||0,o=t.day||0,s=t.hour||0,c=t.minute||0,l=t.second||0,u=t.millisecond||0;this._isValid=Sl(t),this._milliseconds=+u+l*1e3+c*6e4+s*1e3*60*60,this._days=+o+a*7,this._months=+i+r*3+n*12,this._data={},this._locale=Rc(),this._bubble()}function El(e){return e instanceof Tl}function Dl(e){return e<0?Math.round(-1*e)*-1:Math.round(e)}function Ol(e,t,n){var r=Math.min(e.length,t.length),i=Math.abs(e.length-t.length),a=0,o;for(o=0;o<r;o++)(n&&e[o]!==t[o]||!n&&H(e[o])!==H(t[o]))&&a++;return a+i}function kl(e,t){I(e,0,0,function(){var e=this.utcOffset(),n=`+`;return e<0&&(e=-e,n=`-`),n+ho(~~(e/60),2)+t+ho(~~e%60,2)})}kl(`Z`,`:`),kl(`ZZ`,``),B(`Z`,Xo),B(`ZZ`,Xo),U([`Z`,`ZZ`],function(e,t,n){n._useUTC=!0,n._tzm=jl(Xo,e)});var Al=/([\+\-]|\d\d)/gi;function jl(e,t){var n=(t||``).match(e),r,i,a;return n===null?null:(r=n[n.length-1]||[],i=(r+``).match(Al)||[`-`,0,0],a=+(i[1]*60)+H(i[2]),a===0?0:i[0]===`+`?a:-a)}function Ml(e,t){var n,r;return t._isUTC?(n=t.clone(),r=(P(e)||Ka(e)?e.valueOf():Y(e).valueOf())-n.valueOf(),n._d.setTime(n._d.valueOf()+r),A.updateOffset(n,!1),n):Y(e).local()}function Nl(e){return-Math.round(e._d.getTimezoneOffset())}A.updateOffset=function(){};function Pl(e,t,n){var r=this._offset||0,i;if(!this.isValid())return e==null?NaN:this;if(e!=null){if(typeof e==`string`){if(e=jl(Xo,e),e===null)return this}else Math.abs(e)<16&&!n&&(e*=60);return!this._isUTC&&t&&(i=Nl(this)),this._offset=e,this._isUTC=!0,i!=null&&this.add(i,`m`),r!==e&&(!t||this._changeInProgress?Ql(this,ql(e-r,`m`),1,!1):this._changeInProgress||=(this._changeInProgress=!0,A.updateOffset(this,!0),null)),this}return this._isUTC?r:Nl(this)}function Fl(e,t){return e==null?-this.utcOffset():(typeof e!=`string`&&(e=-e),this.utcOffset(e,t),this)}function Il(e){return this.utcOffset(0,e)}function Ll(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Nl(this),`m`)),this}function Rl(){if(this._tzm!=null)this.utcOffset(this._tzm,!1,!0);else if(typeof this._i==`string`){var e=jl(Yo,this._i);e==null?this.utcOffset(0,!0):this.utcOffset(e)}return this}function zl(e){return this.isValid()?(e=e?Y(e).utcOffset():0,(this.utcOffset()-e)%60==0):!1}function Bl(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Vl(){if(!M(this._isDSTShifted))return this._isDSTShifted;var e={},t;return no(e,this),e=fl(e),e._a?(t=e._isUTC?Ya(e._a):Y(e._a),this._isDSTShifted=this.isValid()&&Ol(e._a,t.toArray())>0):this._isDSTShifted=!1,this._isDSTShifted}function Hl(){return this.isValid()?!this._isUTC:!1}function Ul(){return this.isValid()?this._isUTC:!1}function Wl(){return this.isValid()?this._isUTC&&this._offset===0:!1}var Gl=/^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,Kl=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function ql(e,t){var n=e,r=null,i,a,o;return El(e)?n={ms:e._milliseconds,d:e._days,M:e._months}:Ga(e)||!isNaN(+e)?(n={},t?n[t]=+e:n.milliseconds=+e):(r=Gl.exec(e))?(i=r[1]===`-`?-1:1,n={y:0,d:H(r[us])*i,h:H(r[G])*i,m:H(r[K])*i,s:H(r[ds])*i,ms:H(Dl(r[fs]*1e3))*i}):(r=Kl.exec(e))?(i=r[1]===`-`?-1:1,n={y:Jl(r[2],i),M:Jl(r[3],i),w:Jl(r[4],i),d:Jl(r[5],i),h:Jl(r[6],i),m:Jl(r[7],i),s:Jl(r[8],i)}):n==null?n={}:typeof n==`object`&&(`from`in n||`to`in n)&&(o=Xl(Y(n.from),Y(n.to)),n={},n.ms=o.milliseconds,n.M=o.months),a=new Tl(n),El(e)&&j(e,`_locale`)&&(a._locale=e._locale),El(e)&&j(e,`_isValid`)&&(a._isValid=e._isValid),a}ql.fn=Tl.prototype,ql.invalid=wl;function Jl(e,t){var n=e&&parseFloat(e.replace(`,`,`.`));return(isNaN(n)?0:n)*t}function Yl(e,t){var n={};return n.months=t.month()-e.month()+(t.year()-e.year())*12,e.clone().add(n.months,`M`).isAfter(t)&&--n.months,n.milliseconds=t-+e.clone().add(n.months,`M`),n}function Xl(e,t){var n;return e.isValid()&&t.isValid()?(t=Ml(t,e),e.isBefore(t)?n=Yl(e,t):(n=Yl(t,e),n.milliseconds=-n.milliseconds,n.months=-n.months),n):{milliseconds:0,months:0}}function Zl(e,t){return function(n,r){var i,a;return r!==null&&!isNaN(+r)&&(oo(t,`moment().`+t+`(period, number) is deprecated. Please use moment().`+t+`(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.`),a=n,n=r,r=a),i=ql(n,r),Ql(this,i,e),this}}function Ql(e,t,n,r){var i=t._milliseconds,a=Dl(t._days),o=Dl(t._months);e.isValid()&&(r??=!0,o&&Ps(e,ys(e,`Month`)+o*n),a&&bs(e,`Date`,ys(e,`Date`)+a*n),i&&e._d.setTime(e._d.valueOf()+i*n),r&&A.updateOffset(e,a||o))}var $l=Zl(1,`add`),eu=Zl(-1,`subtract`);function tu(e){return typeof e==`string`||e instanceof String}function nu(e){return P(e)||Ka(e)||tu(e)||Ga(e)||iu(e)||ru(e)||e==null}function ru(e){var t=Ua(e)&&!Wa(e),n=!1,r=[`years`,`year`,`y`,`months`,`month`,`M`,`days`,`day`,`d`,`dates`,`date`,`D`,`hours`,`hour`,`h`,`minutes`,`minute`,`m`,`seconds`,`second`,`s`,`milliseconds`,`millisecond`,`ms`],i,a,o=r.length;for(i=0;i<o;i+=1)a=r[i],n||=j(e,a);return t&&n}function iu(e){var t=Ha(e),n=!1;return t&&(n=e.filter(function(t){return!Ga(t)&&tu(e)}).length===0),t&&n}function au(e){var t=Ua(e)&&!Wa(e),n=!1,r=[`sameDay`,`nextDay`,`lastDay`,`nextWeek`,`lastWeek`,`sameElse`],i,a;for(i=0;i<r.length;i+=1)a=r[i],n||=j(e,a);return t&&n}function ou(e,t){var n=e.diff(t,`days`,!0);return n<-6?`sameElse`:n<-1?`lastWeek`:n<0?`lastDay`:n<1?`sameDay`:n<2?`nextDay`:n<7?`nextWeek`:`sameElse`}function su(e,t){arguments.length===1&&(arguments[0]?nu(arguments[0])?(e=arguments[0],t=void 0):au(arguments[0])&&(t=arguments[0],e=void 0):(e=void 0,t=void 0));var n=e||Y(),r=Ml(n,this).startOf(`day`),i=A.calendarFormat(this,r)||`sameElse`,a=t&&(so(t[i])?t[i].call(this,n):t[i]);return this.format(a||this.localeData().calendar(i,this,Y(n)))}function cu(){return new ro(this)}function lu(e,t){var n=P(e)?e:Y(e);return this.isValid()&&n.isValid()?(t=L(t)||`millisecond`,t===`millisecond`?this.valueOf()>n.valueOf():n.valueOf()<this.clone().startOf(t).valueOf()):!1}function uu(e,t){var n=P(e)?e:Y(e);return this.isValid()&&n.isValid()?(t=L(t)||`millisecond`,t===`millisecond`?this.valueOf()<n.valueOf():this.clone().endOf(t).valueOf()<n.valueOf()):!1}function du(e,t,n,r){var i=P(e)?e:Y(e),a=P(t)?t:Y(t);return this.isValid()&&i.isValid()&&a.isValid()?(r||=`()`,(r[0]===`(`?this.isAfter(i,n):!this.isBefore(i,n))&&(r[1]===`)`?this.isBefore(a,n):!this.isAfter(a,n))):!1}function fu(e,t){var n=P(e)?e:Y(e),r;return this.isValid()&&n.isValid()?(t=L(t)||`millisecond`,t===`millisecond`?this.valueOf()===n.valueOf():(r=n.valueOf(),this.clone().startOf(t).valueOf()<=r&&r<=this.clone().endOf(t).valueOf())):!1}function pu(e,t){return this.isSame(e,t)||this.isAfter(e,t)}function mu(e,t){return this.isSame(e,t)||this.isBefore(e,t)}function hu(e,t,n){var r,i,a;if(!this.isValid()||(r=Ml(e,this),!r.isValid()))return NaN;switch(i=(r.utcOffset()-this.utcOffset())*6e4,t=L(t),t){case`year`:a=gu(this,r)/12;break;case`month`:a=gu(this,r);break;case`quarter`:a=gu(this,r)/3;break;case`second`:a=(this-r)/1e3;break;case`minute`:a=(this-r)/6e4;break;case`hour`:a=(this-r)/36e5;break;case`day`:a=(this-r-i)/864e5;break;case`week`:a=(this-r-i)/6048e5;break;default:a=this-r}return n?a:V(a)}function gu(e,t){if(e.date()<t.date())return-gu(t,e);var n=(t.year()-e.year())*12+(t.month()-e.month()),r=e.clone().add(n,`months`),i,a;return t-r<0?(i=e.clone().add(n-1,`months`),a=(t-r)/(r-i)):(i=e.clone().add(n+1,`months`),a=(t-r)/(i-r)),-(n+a)||0}A.defaultFormat=`YYYY-MM-DDTHH:mm:ssZ`,A.defaultFormatUtc=`YYYY-MM-DDTHH:mm:ss[Z]`;function _u(){return this.clone().locale(`en`).format(`ddd MMM DD YYYY HH:mm:ss [GMT]ZZ`)}function vu(e){if(!this.isValid())return null;var t=e!==!0,n=t?this.clone().utc():this;return n.year()<0||n.year()>9999?So(n,t?`YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]`:`YYYYYY-MM-DD[T]HH:mm:ss.SSSZ`):so(Date.prototype.toISOString)?t?this.toDate().toISOString():new Date(this.valueOf()+this.utcOffset()*60*1e3).toISOString().replace(`Z`,So(n,`Z`)):So(n,t?`YYYY-MM-DD[T]HH:mm:ss.SSS[Z]`:`YYYY-MM-DD[T]HH:mm:ss.SSSZ`)}function yu(){if(!this.isValid())return`moment.invalid(/* `+this._i+` */)`;var e=`moment`,t=``,n,r,i,a;return this.isLocal()||(e=this.utcOffset()===0?`moment.utc`:`moment.parseZone`,t=`Z`),n=`[`+e+`("]`,r=0<=this.year()&&this.year()<=9999?`YYYY`:`YYYYYY`,i=`-MM-DD[T]HH:mm:ss.SSS`,a=t+`[")]`,this.format(n+r+i+a)}function bu(e){e||=this.isUtc()?A.defaultFormatUtc:A.defaultFormat;var t=So(this,e);return this.localeData().postformat(t)}function xu(e,t){return this.isValid()&&(P(e)&&e.isValid()||Y(e).isValid())?ql({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function Su(e){return this.from(Y(),e)}function Cu(e,t){return this.isValid()&&(P(e)&&e.isValid()||Y(e).isValid())?ql({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function wu(e){return this.to(Y(),e)}function Tu(e){var t;return e===void 0?this._locale._abbr:(t=Rc(e),t!=null&&(this._locale=t),this)}var Eu=F(`moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.`,function(e){return e===void 0?this.localeData():this.locale(e)});function Du(){return this._locale}var Ou=1e3,ku=60*Ou,Au=60*ku,ju=3506328*Au;function Mu(e,t){return(e%t+t)%t}function Nu(e,t,n){return e<100&&e>=0?new Date(e+400,t,n)-ju:new Date(e,t,n).valueOf()}function Pu(e,t,n){return e<100&&e>=0?Date.UTC(e+400,t,n)-ju:Date.UTC(e,t,n)}function Fu(e){var t,n;if(e=L(e),e===void 0||e===`millisecond`||!this.isValid())return this;switch(n=this._isUTC?Pu:Nu,e){case`year`:t=n(this.year(),0,1);break;case`quarter`:t=n(this.year(),this.month()-this.month()%3,1);break;case`month`:t=n(this.year(),this.month(),1);break;case`week`:t=n(this.year(),this.month(),this.date()-this.weekday());break;case`isoWeek`:t=n(this.year(),this.month(),this.date()-(this.isoWeekday()-1));break;case`day`:case`date`:t=n(this.year(),this.month(),this.date());break;case`hour`:t=this._d.valueOf(),t-=Mu(t+(this._isUTC?0:this.utcOffset()*ku),Au);break;case`minute`:t=this._d.valueOf(),t-=Mu(t,ku);break;case`second`:t=this._d.valueOf(),t-=Mu(t,Ou)}return this._d.setTime(t),A.updateOffset(this,!0),this}function Iu(e){var t,n;if(e=L(e),e===void 0||e===`millisecond`||!this.isValid())return this;switch(n=this._isUTC?Pu:Nu,e){case`year`:t=n(this.year()+1,0,1)-1;break;case`quarter`:t=n(this.year(),this.month()-this.month()%3+3,1)-1;break;case`month`:t=n(this.year(),this.month()+1,1)-1;break;case`week`:t=n(this.year(),this.month(),this.date()-this.weekday()+7)-1;break;case`isoWeek`:t=n(this.year(),this.month(),this.date()-(this.isoWeekday()-1)+7)-1;break;case`day`:case`date`:t=n(this.year(),this.month(),this.date()+1)-1;break;case`hour`:t=this._d.valueOf(),t+=Au-Mu(t+(this._isUTC?0:this.utcOffset()*ku),Au)-1;break;case`minute`:t=this._d.valueOf(),t+=ku-Mu(t,ku)-1;break;case`second`:t=this._d.valueOf(),t+=Ou-Mu(t,Ou)-1}return this._d.setTime(t),A.updateOffset(this,!0),this}function Lu(){return this._d.valueOf()-(this._offset||0)*6e4}function Ru(){return Math.floor(this.valueOf()/1e3)}function zu(){return new Date(this.valueOf())}function Bu(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]}function Vu(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}}function Hu(){return this.isValid()?this.toISOString():null}function Uu(){return Qa(this)}function Wu(){return Ja({},N(this))}function Gu(){return N(this).overflow}function Ku(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}I(`N`,0,0,`eraAbbr`),I(`NN`,0,0,`eraAbbr`),I(`NNN`,0,0,`eraAbbr`),I(`NNNN`,0,0,`eraName`),I(`NNNNN`,0,0,`eraNarrow`),I(`y`,[`y`,1],`yo`,`eraYear`),I(`y`,[`yy`,2],0,`eraYear`),I(`y`,[`yyy`,3],0,`eraYear`),I(`y`,[`yyyy`,4],0,`eraYear`),B(`N`,rd),B(`NN`,rd),B(`NNN`,rd),B(`NNNN`,id),B(`NNNNN`,ad),U([`N`,`NN`,`NNN`,`NNNN`,`NNNNN`],function(e,t,n,r){var i=n._locale.erasParse(e,r,n._strict);i?N(n).era=i:N(n).invalidEra=e}),B(`y`,qo),B(`yy`,qo),B(`yyy`,qo),B(`yyyy`,qo),B(`yo`,od),U([`y`,`yy`,`yyy`,`yyyy`],W),U([`yo`],function(e,t,n,r){var i;n._locale._eraYearOrdinalRegex&&(i=e.match(n._locale._eraYearOrdinalRegex)),t[W]=n._locale.eraYearOrdinalParse?n._locale.eraYearOrdinalParse(e,i):parseInt(e,10)});function qu(e,t){var n,r,i,a=this._eras||Rc(`en`)._eras;for(n=0,r=a.length;n<r;++n)switch(typeof a[n].since==`string`&&(i=A(a[n].since).startOf(`day`),a[n].since=i.valueOf()),typeof a[n].until){case`undefined`:a[n].until=1/0;break;case`string`:i=A(a[n].until).startOf(`day`).valueOf(),a[n].until=i.valueOf()}return a}function Ju(e,t,n){var r,i,a=this.eras(),o,s,c;for(e=e.toUpperCase(),r=0,i=a.length;r<i;++r)if(o=a[r].name.toUpperCase(),s=a[r].abbr.toUpperCase(),c=a[r].narrow.toUpperCase(),n)switch(t){case`N`:case`NN`:case`NNN`:if(s===e)return a[r];break;case`NNNN`:if(o===e)return a[r];break;case`NNNNN`:if(c===e)return a[r]}else if([o,s,c].indexOf(e)>=0)return a[r]}function Yu(e,t){var n=e.since<=e.until?1:-1;return t===void 0?A(e.since).year():A(e.since).year()+(t-e.offset)*n}function Xu(){var e,t,n,r=this.localeData().eras();for(e=0,t=r.length;e<t;++e)if(n=this.clone().startOf(`day`).valueOf(),r[e].since<=n&&n<=r[e].until||r[e].until<=n&&n<=r[e].since)return r[e].name;return``}function Zu(){var e,t,n,r=this.localeData().eras();for(e=0,t=r.length;e<t;++e)if(n=this.clone().startOf(`day`).valueOf(),r[e].since<=n&&n<=r[e].until||r[e].until<=n&&n<=r[e].since)return r[e].narrow;return``}function Qu(){var e,t,n,r=this.localeData().eras();for(e=0,t=r.length;e<t;++e)if(n=this.clone().startOf(`day`).valueOf(),r[e].since<=n&&n<=r[e].until||r[e].until<=n&&n<=r[e].since)return r[e].abbr;return``}function $u(){var e,t,n,r,i=this.localeData().eras();for(e=0,t=i.length;e<t;++e)if(n=i[e].since<=i[e].until?1:-1,r=this.clone().startOf(`day`).valueOf(),i[e].since<=r&&r<=i[e].until||i[e].until<=r&&r<=i[e].since)return(this.year()-A(i[e].since).year())*n+i[e].offset;return this.year()}function ed(e){return j(this,`_erasNameRegex`)||sd.call(this),e?this._erasNameRegex:this._erasRegex}function td(e){return j(this,`_erasAbbrRegex`)||sd.call(this),e?this._erasAbbrRegex:this._erasRegex}function nd(e){return j(this,`_erasNarrowRegex`)||sd.call(this),e?this._erasNarrowRegex:this._erasRegex}function rd(e,t){return t.erasAbbrRegex(e)}function id(e,t){return t.erasNameRegex(e)}function ad(e,t){return t.erasNarrowRegex(e)}function od(e,t){return t._eraYearOrdinalRegex||qo}function sd(){var e=[],t=[],n=[],r=[],i,a,o,s,c,l=this.eras();for(i=0,a=l.length;i<a;++i)o=is(l[i].name),s=is(l[i].abbr),c=is(l[i].narrow),t.push(o),e.push(s),n.push(c),r.push(o),r.push(s),r.push(c);this._erasRegex=RegExp(`^(`+r.join(`|`)+`)`,`i`),this._erasNameRegex=RegExp(`^(`+t.join(`|`)+`)`,`i`),this._erasAbbrRegex=RegExp(`^(`+e.join(`|`)+`)`,`i`),this._erasNarrowRegex=RegExp(`^(`+n.join(`|`)+`)`,`i`)}I(0,[`gg`,2],0,function(){return this.weekYear()%100}),I(0,[`GG`,2],0,function(){return this.isoWeekYear()%100});function cd(e,t){I(0,[e,e.length],0,t)}cd(`gggg`,`weekYear`),cd(`ggggg`,`weekYear`),cd(`GGGG`,`isoWeekYear`),cd(`GGGGG`,`isoWeekYear`),B(`G`,Jo),B(`g`,Jo),B(`GG`,z,R),B(`gg`,z,R),B(`GGGG`,Go,Bo),B(`gggg`,Go,Bo),B(`GGGGG`,Ko,Vo),B(`ggggg`,Ko,Vo),os([`gggg`,`ggggg`,`GGGG`,`GGGGG`],function(e,t,n,r){t[r.substr(0,2)]=H(e)}),os([`gg`,`GG`],function(e,t,n,r){t[r]=A.parseTwoDigitYear(e)});function ld(e){return hd.call(this,e,this.week(),this.weekday()+this.localeData()._week.dow,this.localeData()._week.dow,this.localeData()._week.doy)}function ud(e){return hd.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)}function dd(){return Gs(this.year(),1,4)}function fd(){return Gs(this.isoWeekYear(),1,4)}function pd(){var e=this.localeData()._week;return Gs(this.year(),e.dow,e.doy)}function md(){var e=this.localeData()._week;return Gs(this.weekYear(),e.dow,e.doy)}function hd(e,t,n,r,i){var a;return e==null?Ws(this,r,i).year:(a=Gs(e,r,i),t>a&&(t=a),gd.call(this,e,t,n,r,i))}function gd(e,t,n,r,i){var a=Us(e,t,n,r,i),o=Vs(a.year,0,a.dayOfYear);return this.year(o.getUTCFullYear()),this.month(o.getUTCMonth()),this.date(o.getUTCDate()),this}I(`Q`,0,`Qo`,`quarter`),B(`Q`,Ro),U(`Q`,function(e,t){t[ls]=(H(e)-1)*3});function _d(e){return e==null?Math.ceil((this.month()+1)/3):this.month((e-1)*3+this.month()%3)}I(`D`,[`DD`,2],`Do`,`date`),B(`D`,z,$o),B(`DD`,z,R),B(`Do`,function(e,t){return e?t._dayOfMonthOrdinalParse||t._ordinalParse:t._dayOfMonthOrdinalParseLenient}),U([`D`,`DD`],us),U(`Do`,function(e,t){t[us]=H(e.match(z)[0])});var vd=vs(`Date`,!0);I(`DDD`,[`DDDD`,3],`DDDo`,`dayOfYear`),B(`DDD`,Wo),B(`DDDD`,zo),U([`DDD`,`DDDD`],function(e,t,n){n._dayOfYear=H(e)});function yd(e){var t=Math.round((this.clone().startOf(`day`)-this.clone().startOf(`year`))/864e5)+1;return e==null?t:this.add(e-t,`d`)}I(`m`,[`mm`,2],0,`minute`),B(`m`,z,es),B(`mm`,z,R),U([`m`,`mm`],K);var bd=vs(`Minutes`,!1);I(`s`,[`ss`,2],0,`second`),B(`s`,z,es),B(`ss`,z,R),U([`s`,`ss`],ds);var xd=vs(`Seconds`,!1);I(`S`,0,0,function(){return~~(this.millisecond()/100)}),I(0,[`SS`,2],0,function(){return~~(this.millisecond()/10)}),I(0,[`SSS`,3],0,`millisecond`),I(0,[`SSSS`,4],0,function(){return this.millisecond()*10}),I(0,[`SSSSS`,5],0,function(){return this.millisecond()*100}),I(0,[`SSSSSS`,6],0,function(){return this.millisecond()*1e3}),I(0,[`SSSSSSS`,7],0,function(){return this.millisecond()*1e4}),I(0,[`SSSSSSSS`,8],0,function(){return this.millisecond()*1e5}),I(0,[`SSSSSSSSS`,9],0,function(){return this.millisecond()*1e6}),B(`S`,Wo,Ro),B(`SS`,Wo,R),B(`SSS`,Wo,zo);var Sd,Cd;for(Sd=`SSSS`;Sd.length<=9;Sd+=`S`)B(Sd,qo);function wd(e,t){t[fs]=H((`0.`+e)*1e3)}for(Sd=`S`;Sd.length<=9;Sd+=`S`)U(Sd,wd);Cd=vs(`Milliseconds`,!1),I(`z`,0,0,`zoneAbbr`),I(`zz`,0,0,`zoneName`);function Td(){return this._isUTC?`UTC`:``}function Ed(){return this._isUTC?`Coordinated Universal Time`:``}var X=ro.prototype;X.add=$l,X.calendar=su,X.clone=cu,X.diff=hu,X.endOf=Iu,X.format=bu,X.from=xu,X.fromNow=Su,X.to=Cu,X.toNow=wu,X.get=xs,X.invalidAt=Gu,X.isAfter=lu,X.isBefore=uu,X.isBetween=du,X.isSame=fu,X.isSameOrAfter=pu,X.isSameOrBefore=mu,X.isValid=Uu,X.lang=Eu,X.locale=Tu,X.localeData=Du,X.max=gl,X.min=hl,X.parsingFlags=Wu,X.set=Ss,X.startOf=Fu,X.subtract=eu,X.toArray=Bu,X.toObject=Vu,X.toDate=zu,X.toISOString=vu,X.inspect=yu,typeof Symbol<`u`&&Symbol.for!=null&&(X[Symbol.for(`nodejs.util.inspect.custom`)]=function(){return`Moment<`+this.format()+`>`}),X.toJSON=Hu,X.toString=_u,X.unix=Ru,X.valueOf=Lu,X.creationData=Ku,X.eraName=Xu,X.eraNarrow=Zu,X.eraAbbr=Qu,X.eraYear=$u,X.year=gs,X.isLeapYear=_s,X.weekYear=ld,X.isoWeekYear=ud,X.quarter=X.quarters=_d,X.month=Fs,X.daysInMonth=Is,X.week=X.weeks=Xs,X.isoWeek=X.isoWeeks=Zs,X.weeksInYear=pd,X.weeksInWeekYear=md,X.isoWeeksInYear=dd,X.isoWeeksInISOWeekYear=fd,X.date=vd,X.day=X.days=fc,X.weekday=pc,X.isoWeekday=mc,X.dayOfYear=yd,X.hour=X.hours=Tc,X.minute=X.minutes=bd,X.second=X.seconds=xd,X.millisecond=X.milliseconds=Cd,X.utcOffset=Pl,X.utc=Il,X.local=Ll,X.parseZone=Rl,X.hasAlignedHourOffset=zl,X.isDST=Bl,X.isLocal=Hl,X.isUtcOffset=Ul,X.isUtc=Wl,X.isUTC=Wl,X.zoneAbbr=Td,X.zoneName=Ed,X.dates=F(`dates accessor is deprecated. Use date instead.`,vd),X.months=F(`months accessor is deprecated. Use month instead`,Fs),X.years=F(`years accessor is deprecated. Use year instead`,gs),X.zone=F(`moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/`,Fl),X.isDSTShifted=F(`isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information`,Vl);function Dd(e){return Y(e*1e3)}function Od(){return Y.apply(null,arguments).parseZone()}function kd(e){return e}var Z=uo.prototype;Z.calendar=mo,Z.longDateFormat=To,Z.invalidDate=Do,Z.ordinal=Ao,Z.preparse=kd,Z.postformat=kd,Z.relativeTime=Mo,Z.pastFuture=No,Z.set=co,Z.eras=qu,Z.erasParse=Ju,Z.erasConvertYear=Yu,Z.erasAbbrRegex=td,Z.erasNameRegex=ed,Z.erasNarrowRegex=nd,Z.months=As,Z.monthsShort=js,Z.monthsParse=Ns,Z.monthsRegex=Rs,Z.monthsShortRegex=Ls,Z.week=Ks,Z.firstDayOfYear=Ys,Z.firstDayOfWeek=Js,Z.weekdays=sc,Z.weekdaysMin=lc,Z.weekdaysShort=cc,Z.weekdaysParse=dc,Z.weekdaysRegex=hc,Z.weekdaysShortRegex=gc,Z.weekdaysMinRegex=_c,Z.isPM=Cc,Z.meridiem=Ec;function Ad(e,t,n,r){var i=Rc(),a=Ya().set(r,t);return i[n](a,e)}function jd(e,t,n){if(Ga(e)&&(t=e,e=void 0),e||=``,t!=null)return Ad(e,t,n,`month`);var r,i=[];for(r=0;r<12;r++)i[r]=Ad(e,r,n,`month`);return i}function Md(e,t,n,r){typeof e==`boolean`?(Ga(t)&&(n=t,t=void 0),t||=``):(t=e,n=t,e=!1,Ga(t)&&(n=t,t=void 0),t||=``);var i=Rc(),a=e?i._week.dow:0,o,s=[];if(n!=null)return Ad(t,(n+a)%7,r,`day`);for(o=0;o<7;o++)s[o]=Ad(t,(o+a)%7,r,`day`);return s}function Nd(e,t){return jd(e,t,`months`)}function Pd(e,t){return jd(e,t,`monthsShort`)}function Fd(e,t,n){return Md(e,t,n,`weekdays`)}function Id(e,t,n){return Md(e,t,n,`weekdaysShort`)}function Ld(e,t,n){return Md(e,t,n,`weekdaysMin`)}Fc(`en`,{eras:[{since:`0001-01-01`,until:1/0,offset:1,name:`Anno Domini`,narrow:`AD`,abbr:`AD`},{since:`0000-12-31`,until:-1/0,offset:1,name:`Before Christ`,narrow:`BC`,abbr:`BC`}],dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10;return e+(H(e%100/10)===1?`th`:t===1?`st`:t===2?`nd`:t===3?`rd`:`th`)}}),A.lang=F(`moment.lang is deprecated. Use moment.locale instead.`,Fc),A.langData=F(`moment.langData is deprecated. Use moment.localeData instead.`,Rc);var Rd=Math.abs;function zd(){var e=this._data;return this._milliseconds=Rd(this._milliseconds),this._days=Rd(this._days),this._months=Rd(this._months),e.milliseconds=Rd(e.milliseconds),e.seconds=Rd(e.seconds),e.minutes=Rd(e.minutes),e.hours=Rd(e.hours),e.months=Rd(e.months),e.years=Rd(e.years),this}function Bd(e,t,n,r){var i=ql(t,n);return e._milliseconds+=r*i._milliseconds,e._days+=r*i._days,e._months+=r*i._months,e._bubble()}function Vd(e,t){return Bd(this,e,t,1)}function Hd(e,t){return Bd(this,e,t,-1)}function Ud(e){return e<0?Math.floor(e):Math.ceil(e)}function Wd(){var e=this._milliseconds,t=this._days,n=this._months,r=this._data,i,a,o,s,c;return e>=0&&t>=0&&n>=0||e<=0&&t<=0&&n<=0||(e+=Ud(Kd(n)+t)*864e5,t=0,n=0),r.milliseconds=e%1e3,i=V(e/1e3),r.seconds=i%60,a=V(i/60),r.minutes=a%60,o=V(a/60),r.hours=o%24,t+=V(o/24),c=V(Gd(t)),n+=c,t-=Ud(Kd(c)),s=V(n/12),n%=12,r.days=t,r.months=n,r.years=s,this}function Gd(e){return e*4800/146097}function Kd(e){return e*146097/4800}function qd(e){if(!this.isValid())return NaN;var t,n,r=this._milliseconds;if(e=L(e),e===`month`||e===`quarter`||e===`year`)switch(t=this._days+r/864e5,n=this._months+Gd(t),e){case`month`:return n;case`quarter`:return n/3;case`year`:return n/12}else switch(t=this._days+Math.round(Kd(this._months)),e){case`week`:return t/7+r/6048e5;case`day`:return t+r/864e5;case`hour`:return t*24+r/36e5;case`minute`:return t*1440+r/6e4;case`second`:return t*86400+r/1e3;case`millisecond`:return Math.floor(t*864e5)+r;default:throw Error(`Unknown unit `+e)}}function Jd(e){return function(){return this.as(e)}}var Yd=Jd(`ms`),Xd=Jd(`s`),Zd=Jd(`m`),Qd=Jd(`h`),$d=Jd(`d`),ef=Jd(`w`),tf=Jd(`M`),nf=Jd(`Q`),rf=Jd(`y`),af=Yd;function of(){return ql(this)}function sf(e){return e=L(e),this.isValid()?this[e+`s`]():NaN}function cf(e){return function(){return this.isValid()?this._data[e]:NaN}}var lf=cf(`milliseconds`),uf=cf(`seconds`),df=cf(`minutes`),ff=cf(`hours`),pf=cf(`days`),mf=cf(`months`),hf=cf(`years`);function gf(){return V(this.days()/7)}var _f=Math.round,vf={ss:44,s:45,m:45,h:22,d:26,w:null,M:11};function yf(e,t,n,r,i){return i.relativeTime(t||1,!!n,e,r)}function bf(e,t,n,r){var i=ql(e).abs(),a=_f(i.as(`s`)),o=_f(i.as(`m`)),s=_f(i.as(`h`)),c=_f(i.as(`d`)),l=_f(i.as(`M`)),u=_f(i.as(`w`)),d=_f(i.as(`y`)),f=a<=n.ss&&[`s`,a]||a<n.s&&[`ss`,a]||o<=1&&[`m`]||o<n.m&&[`mm`,o]||s<=1&&[`h`]||s<n.h&&[`hh`,s]||c<=1&&[`d`]||c<n.d&&[`dd`,c];return n.w!=null&&(f=f||u<=1&&[`w`]||u<n.w&&[`ww`,u]),f=f||l<=1&&[`M`]||l<n.M&&[`MM`,l]||d<=1&&[`y`]||[`yy`,d],f[2]=t,f[3]=+e>0,f[4]=r,yf.apply(null,f)}function xf(e){return e===void 0?_f:typeof e==`function`&&(_f=e,!0)}function Sf(e,t){return vf[e]===void 0?!1:t===void 0?vf[e]:(vf[e]=t,e===`s`&&(vf.ss=t-1),!0)}function Cf(e,t){if(!this.isValid())return this.localeData().invalidDate();var n=!1,r=vf,i,a;return typeof e==`object`&&(t=e,e=!1),typeof e==`boolean`&&(n=e),typeof t==`object`&&(r=Object.assign({},vf,t),t.s!=null&&t.ss==null&&(r.ss=t.s-1)),i=this.localeData(),a=bf(this,!n,r,i),n&&(a=i.pastFuture(+this,a)),i.postformat(a)}var wf=Math.abs;function Tf(e){return(e>0)-(e<0)||+e}function Ef(){if(!this.isValid())return this.localeData().invalidDate();var e=wf(this._milliseconds)/1e3,t=wf(this._days),n=wf(this._months),r,i,a,o,s=this.asSeconds(),c,l,u,d;return s?(r=V(e/60),i=V(r/60),e%=60,r%=60,a=V(n/12),n%=12,o=e?e.toFixed(3).replace(/\.?0+$/,``):``,c=s<0?`-`:``,l=Tf(this._months)===Tf(s)?``:`-`,u=Tf(this._days)===Tf(s)?``:`-`,d=Tf(this._milliseconds)===Tf(s)?``:`-`,c+`P`+(a?l+a+`Y`:``)+(n?l+n+`M`:``)+(t?u+t+`D`:``)+(i||r||e?`T`:``)+(i?d+i+`H`:``)+(r?d+r+`M`:``)+(e?d+o+`S`:``)):`P0D`}var Q=Tl.prototype;Q.isValid=Cl,Q.abs=zd,Q.add=Vd,Q.subtract=Hd,Q.as=qd,Q.asMilliseconds=Yd,Q.asSeconds=Xd,Q.asMinutes=Zd,Q.asHours=Qd,Q.asDays=$d,Q.asWeeks=ef,Q.asMonths=tf,Q.asQuarters=nf,Q.asYears=rf,Q.valueOf=af,Q._bubble=Wd,Q.clone=of,Q.get=sf,Q.milliseconds=lf,Q.seconds=uf,Q.minutes=df,Q.hours=ff,Q.days=pf,Q.weeks=gf,Q.months=mf,Q.years=hf,Q.humanize=Cf,Q.toISOString=Ef,Q.toString=Ef,Q.toJSON=Ef,Q.locale=Tu,Q.localeData=Du,Q.toIsoString=F(`toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)`,Ef),Q.lang=Eu,I(`X`,0,0,`unix`),I(`x`,0,0,`valueOf`),B(`x`,Jo),B(`X`,Zo),U(`X`,function(e,t,n){n._d=new Date(parseFloat(e)*1e3)}),U(`x`,function(e,t,n){n._d=new Date(H(e))}),A.version=`2.30.1`,Va(Y),A.fn=X,A.min=vl,A.max=yl,A.now=bl,A.utc=Ya,A.unix=Dd,A.months=Nd,A.isDate=Ka,A.locale=Fc,A.invalid=$a,A.duration=ql,A.isMoment=P,A.weekdays=Fd,A.parseZone=Od,A.localeData=Rc,A.isDuration=El,A.monthsShort=Pd,A.weekdaysMin=Ld,A.defineLocale=Ic,A.updateLocale=Lc,A.locales=zc,A.weekdaysShort=Id,A.normalizeUnits=L,A.relativeTimeRounding=xf,A.relativeTimeThreshold=Sf,A.calendarFormat=ou,A.prototype=X,A.HTML5_FMT={DATETIME_LOCAL:`YYYY-MM-DDTHH:mm`,DATETIME_LOCAL_SECONDS:`YYYY-MM-DDTHH:mm:ss`,DATETIME_LOCAL_MS:`YYYY-MM-DDTHH:mm:ss.SSS`,DATE:`YYYY-MM-DD`,TIME:`HH:mm`,TIME_SECONDS:`HH:mm:ss`,TIME_MS:`HH:mm:ss.SSS`,WEEK:`GGGG-[W]WW`,MONTH:`YYYY-MM`};var Df=()=>A().format(`LTS`),Of=e=>{let t=e.length;if(t!==0)return e[t-1]},kf=({row:e,column:t},{row:n,column:r})=>e===n&&t===r,Af=(e,t)=>{for(let n of e)if(kf(n,t))return!0},jf=(e,t)=>{for(let n of e)if(!Af(t,n))return;return!0},Mf=(e,t)=>{for(let{coordinates:n}of e)if(!jf(n,t))return;return!0},Nf=(e,t)=>{for(let n in e){let{coordinates:r,name:i}=e[n];if(Af(r,t))return i.toLowerCase()}},Pf=(e,t)=>{for(let{name:n,coordinates:r}of e)if(n.toLowerCase()===t)return r},Ff=(e,t,n)=>{let r=Nf(e,t);if(!(!r||!jf(Pf(e,r),n)))return r},If=(e,t)=>{let n={message:t,time:Df()};return e.concat([n])},Lf=(e,t)=>`Wrong number of tiles. A ${e.toLowerCase()} has ${t} tiles. Try again.`,Rf=(e,t)=>`Select ${t} tiles for your ${e.toLowerCase()}.`,zf=(e,t)=>{let[n,r]=e?[`You`,`opponent's`]:[`Opponent`,`your`];return`${n} has sunk ${r} ${t}.`},Bf=(e,t,n)=>{let r=Nf(t,n),i=e?`You`:`Opponent`,a=r?`HIT!`:`MISSED.`,{row:o,column:s}=n;return`${i} just shot at ${Hf[s]}${o+1}: ${a}`},Vf=(e,t,n)=>{let r=[],{[t]:i}=e[0];for(let{[t]:a,[n]:o}of e){if(a!==i)return;r.push(o)}let a=r.sort();for(let e=0;e<a.length-1;e++)if(a[e]+1!==a[e+1])return;return!0},Hf=`ABCDEFGHIJ`,Uf=`NEW_OPPONENT`,$=`NEW_MESSAGE`,Wf=`OPPONENT_LEFT`,Gf=`NEW_GAME`,Kf=`CLEAR_TILES`,qf=`SELECT_TILE`,Jf=`CONFIRM_TILES`,Yf=`COMPLETE_SELECTION`,Xf=`SET_OPPONENT_SHIPS`,Zf=`OPPONENTS_TURN`,Qf=`SHOT`,$f=`OPPONENT_SHOT`,ep=`MISSED`,tp=`SELECTED`,np=`CONFIRMED`,rp=`There is no player in the room. Waiting for another player...`,ip=`Another player is already in the room. The game is on!`,ap=`Another player has entered the game. The game is on!`,op=`The other player left. Waiting for another player...`,sp=`All tiles have to be connected (either horizontally or vertically).`,cp=`Your turn to attack.`,lp=`Opponent's turn to attack.`,up=`Waiting for player to join...`,dp=`You Won!`,fp=`You Lose.`,pp=`Opponent is placing ships...`,mp=`[NEW GAME] You have entered a new game.`,hp=[{name:`Carrier`,numOfTiles:5},{name:`Battleship`,numOfTiles:4},{name:`Cruiser`,numOfTiles:3},{name:`Submarine`,numOfTiles:3},{name:`Destroyer`,numOfTiles:2}],gp=()=>({gameState:0,shipTilesState:0,messages:[{time:Df(),message:`Welcome to Battleship!`}],myShips:[],myShipsShot:[],opponentShips:null,chosenTiles:[],opponentShipsShot:[],opponent:void 0,gotInitialOpponent:!1,haveSendInitialMsg:!1}),_p=({clickHandler:e,state:t})=>{let{type:n,shipName:r}=t,i=r?`square ${r}`:`square`;return(0,D.jsxs)(`div`,{className:i,onClick:e,children:[n===`SELECTED`&&(0,D.jsx)(Fa,{icon:Ra}),n===`CONFIRMED`&&(0,D.jsx)(Fa,{icon:za}),n===`MISSED`&&(0,D.jsx)(Fa,{icon:La}),n===`HIT`&&(0,D.jsx)(Fa,{icon:Ia})]})},vp=({clickTile:e,row:t,placedShips:n,chosenTiles:r,shot:i,myBoard:a})=>{let o=[];for(let s=0;s<10;s++){let c={row:t,column:s};o.push((0,D.jsx)(_p,{state:(()=>{if(Af(i,c)){let e=Nf(n,c);return e?Ff(n,c,i)?{type:`HIT`,shipName:e}:{type:`HIT`,shipName:a&&e}:{type:ep}}for(let e of r)if(kf(e,c))return{type:tp};if(a){let e=Nf(n,c);if(e)return{type:np,shipName:e}}return{type:null}})(),key:s,clickHandler:()=>e(c)}))}return(0,D.jsx)(`div`,{className:`row`,children:o})},yp=({isRow:e,index:t})=>{let n=e?`coordinate-label-row`:`coordinate-label-column`,r=e?t+1:Hf[t];return(0,D.jsx)(`div`,{className:n,children:r})},bp=({isRow:e})=>{let t=e?`row-column-label`:`row-column-label row-column column-label`,n=[];for(let t=0;t<10;t++){let r=(0,D.jsx)(yp,{key:t,isRow:e,index:t});n.push(r)}return(0,D.jsx)(`div`,{className:t,children:n})},xp=({placedShips:e,clickTile:t,chosenTiles:n,shot:r,myBoard:i})=>{let a=[];for(let o=0;o<10;o++)a.push((0,D.jsx)(vp,{key:o,clickTile:t,row:o,placedShips:e,chosenTiles:n,shot:r,myBoard:i}));return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsxs)(`div`,{className:`row-column`,children:[(0,D.jsx)(`div`,{className:`coordinate-space`}),(0,D.jsx)(bp,{})]}),(0,D.jsxs)(`div`,{className:`row-column`,children:[(0,D.jsx)(bp,{isRow:!0}),(0,D.jsx)(`div`,{className:`coordinate`,children:a})]})]})},Sp=({ship:{name:e,coordinates:t},shot:n})=>{let r=jf(t,n)?{textDecoration:`line-through`}:{};return(0,D.jsxs)(`div`,{className:`ship-name`,style:r,children:[(0,D.jsx)(`div`,{className:`label`}),e]})},Cp=({clearTiles:e,confirmTiles:t})=>(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`button`,{onClick:t,children:`Confirm`}),(0,D.jsx)(`button`,{className:`cancel`,onClick:e,children:`Clear`})]}),wp=({placedShips:e,showConfirmCancelButtons:t,clearTiles:n,confirmTiles:r,shot:i,active:a})=>{let o=a?`ship-list active`:`ship-list`,s=[];for(let t in e){let n=e[t];s.push((0,D.jsx)(Sp,{ship:n,shot:i,key:t}))}return(0,D.jsxs)(`div`,{className:o,children:[(0,D.jsx)(`div`,{children:s}),t&&(0,D.jsx)(Cp,{clearTiles:n,confirmTiles:r})]})},Tp=({settings:e})=>(0,D.jsx)(`div`,{className:`overlay`,style:e?{display:`flex`}:{},children:(0,D.jsx)(`h2`,{children:e&&e})}),Ep=({state:e})=>{let{myBoard:t,placedShips:n,overlaySettings:r,title:i,showConfirmCancelButtons:a,clearTiles:o,clickTile:s,chosenTiles:c,confirmTiles:l,shot:u,active:d}=e,f=(0,D.jsxs)(`div`,{className:d?`board active`:`board`,children:[(0,D.jsx)(`h3`,{children:i}),(0,D.jsx)(xp,{placedShips:n,clickTile:s,chosenTiles:c,shot:u,myBoard:t})]}),p=(0,D.jsx)(wp,{active:d,placedShips:n,showConfirmCancelButtons:a,clearTiles:o,confirmTiles:l,shot:u});return(0,D.jsxs)(`div`,{className:`whole-board`,children:[t?(0,D.jsxs)(D.Fragment,{children:[p,f]}):(0,D.jsxs)(D.Fragment,{children:[f,p]}),(0,D.jsx)(Tp,{settings:r})]})},Dp=({myState:e,opponentState:t})=>(0,D.jsxs)(`div`,{className:`display`,children:[(0,D.jsx)(Ep,{state:e}),(0,D.jsx)(Ep,{state:t})]}),Op=({time:e,message:t})=>(0,D.jsx)(`p`,{children:`[${e}] ${t}`}),kp=({newGame:e})=>(0,D.jsx)(`div`,{className:`new-game`,children:(0,D.jsx)(`button`,{onClick:e,children:`New Game`})}),Ap=e=>{let t=(0,a.useRef)(null);return(0,a.useEffect)(()=>{t&&t.current&&(t.current.scrollTop=t.current.scrollHeight)},[t,e]),t},jp=({messages:e,newGame:t})=>{let n=Ap(e),r=e.map(({time:e,message:t},n)=>(0,D.jsx)(Op,{time:e,message:t,key:n}));return(0,D.jsxs)(`div`,{className:`log-display`,children:[(0,D.jsx)(kp,{newGame:t}),(0,D.jsx)(`div`,{className:`logs`,ref:n,children:r})]})},Mp=()=>(0,D.jsx)(`div`,{className:`heading`,children:(0,D.jsx)(`h1`,{children:`[ Battleship ]`})});function Np(){return null}async function Pp(){let e=Np();if(!e)throw Error(`Supabase client not initialized`);let{data:t,error:n}=await e.from(`battleship_rooms`).insert({status:`waiting`}).select(`id`).single();if(n)throw n;return t.id}async function Fp(e){let t=Np();if(!t)throw Error(`Supabase client not initialized`);let n=`player_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,{data:r,error:i}=await t.from(`battleship_rooms`).select(`*`).eq(`id`,e).single();if(i)throw i;if(r.status!==`waiting`)throw Error(`Game room is not available`);let{error:a}=await t.from(`battleship_rooms`).update({player2_id:n,status:`playing`}).eq(`id`,e);if(a)throw a;let{error:o}=await t.from(`battleship_game_states`).insert({room_id:e,game_state:1,player1_ships:[],player2_ships:[],player1_shots:[],player2_shots:[]}).single();if(o&&o.code!==`23505`)throw o;return!0}async function Ip(e){let t=Np();if(!t)throw Error(`Supabase client not initialized`);let{data:n,error:r}=await t.from(`battleship_game_states`).select(`*`).eq(`room_id`,e).order(`created_at`,{ascending:!1}).limit(1).single();if(r&&r.code===`PGRST116`)return null;if(r)throw r;return n}async function Lp(e){let t=Np();if(!t)throw Error(`Supabase client not initialized`);let{data:n,error:r}=await t.from(`battleship_rooms`).select(`*`).eq(`id`,e).single();if(r&&r.code===`PGRST116`)return null;if(r)throw r;return n}async function Rp(e,t){let n=Np();if(!n)throw Error(`Supabase client not initialized`);let{data:r,error:i}=await n.from(`battleship_game_states`).update(t).eq(`room_id`,e).select().single();if(i)throw i;return r}async function zp(e,t,n=null,r=null){let i=Np();if(!i)throw Error(`Supabase client not initialized`);let{error:a}=await i.from(`battleship_events`).insert({room_id:e,event_type:t,player_number:n,payload:r});if(a)throw a}function Bp(e,t){let n=Np();if(!n)return null;let r=n.channel(`battleship_state:${e}`).on(`postgres_changes`,{event:`UPDATE`,schema:`public`,table:`battleship_game_states`,filter:`room_id=eq.${e}`},e=>{t(e.new)}).subscribe();return()=>{n.removeChannel(r)}}function Vp(e,t){let n=Np();if(!n)return null;let r=n.channel(`battleship_events:${e}`).on(`postgres_changes`,{event:`INSERT`,schema:`public`,table:`battleship_events`,filter:`room_id=eq.${e}`},e=>{t(e.new)}).subscribe();return()=>{n.removeChannel(r)}}var Hp=()=>{let[e,t]=(0,a.useState)(null),[n,r]=(0,a.useState)(null),[i,o]=(0,a.useState)(!0),s=(0,a.useCallback)(async t=>{if(e)try{await Rp(e,t)}catch(e){console.error(`Failed to sync state:`,e)}},[e]),c=(0,a.useCallback)(async(t,n=null,r=null)=>{if(e)try{await zp(e,t,r,n)}catch(e){console.error(`Failed to record event:`,e)}},[e]),l={[Uf](e,{opponent:t}){let n=+!!t;return{...e,opponent:t,gotInitialOpponent:!0,gameState:n}},[$](e,{message:t}){let{messages:n}=e,r=If(n,t);return{...e,haveSendInitialMsg:!0,messages:r}},[Gf](e){let{messages:t}=e,n=If(t,mp);return{...gp(),messages:n,roomId:e.roomId,playerNumber:e.playerNumber}},[Wf]({messages:e}){return{...gp(),messages:e,haveSendInitialMsg:!0}},[Kf](e){return{...e,chosenTiles:[]}},[qf](e,{coordinate:t}){let{myShips:n,chosenTiles:r}=e;for(let{coordinates:r}of n)if(Af(r,t))return e;let i=Af(r,t)?r.filter(e=>!kf(e,t)):r.concat([t]);return{...e,chosenTiles:i}},[Jf](e){let{shipTilesState:t,chosenTiles:n,messages:r,myShips:i}=e,{name:a,numOfTiles:o}=hp[t];if(o!==n.length){let t=If(r,Lf(a,o));return{...e,messages:t}}let s=Vf(n,`row`,`column`),c=Vf(n,`column`,`row`);if(!s&&!c){let t=If(r,sp);return{...e,messages:t}}let l={name:a,coordinates:n},u=i.concat([l]),d=t+1;return{...e,myShips:u,shipTilesState:d,chosenTiles:[]}},[Yf](e){return{...e,gameState:2}},[Xf](e,{opponentShips:t}){let{gameState:n}=e,r=n===2?3:n;return{...e,opponentShips:t,gameState:r}},[Zf](e){return{...e,gameState:4}},[Qf](e,{coordinate:t}){let{opponentShipsShot:n,opponentShips:r}=e;if(Af(n,t))return e;let i=n.concat([t]),a=Mf(r,i)?5:4;return{...e,opponentShipsShot:i,gameState:a}},[$f](e,{coordinate:t}){let{myShipsShot:n}=e,r=n.concat([t]);return{...e,myShipsShot:r,gameState:3}},END(e){return{...e,gameState:6}},UPDATE_STATE(e,{payload:t}){return{...e,gameState:t.game_state??e.gameState,opponentShips:e.playerNumber===1?t.player2_ships??e.opponentShips:t.player1_ships??e.opponentShips,myShips:e.playerNumber===1?t.player1_ships??e.myShips:t.player2_ships??e.myShips,opponentShipsShot:e.playerNumber===1?t.player2_shots??e.opponentShipsShot:t.player1_shots??e.opponentShipsShot,myShipsShot:e.playerNumber===1?t.player1_shots??e.myShipsShot:t.player2_shots??e.myShipsShot}}},[u,d]=(0,a.useReducer)((e,t)=>l[t.type]?.(e,t)||e,{...gp(),roomId:null,playerNumber:null}),{gotInitialOpponent:f,opponent:p,haveSendInitialMsg:m,gameState:h,myShips:g,opponentShips:_,messages:v,shipTilesState:y,chosenTiles:ee,opponentShipsShot:b,myShipsShot:te}=u;(0,a.useEffect)(()=>{e||(async()=>{try{let e=new URLSearchParams(window.location.search).get(`room`);if(e){let n=await Lp(e);if(n&&n.status===`waiting`){await Fp(e),t(e),r(2),d({type:$,message:ap});let n=await Ip(e);n&&d({type:`UPDATE_STATE`,payload:n})}}else{let e=await Pp();t(e),r(1),window.history.replaceState({},``,`?room=${e}`)}}catch(e){console.error(`Failed to initialize game:`,e)}finally{o(!1)}})()},[]),(0,a.useEffect)(()=>{if(!e)return;let t=Bp(e,e=>{d({type:`UPDATE_STATE`,payload:e})});return()=>t?.()},[e]),(0,a.useEffect)(()=>{if(!e||n===null)return;let t=Vp(e,e=>{if(e.player_number!==n)switch(e.event_type){case`ships_placed`:d({type:Xf,opponentShips:e.payload});break;case`shot`:d({type:$f,coordinate:e.payload});break;case`end`:d({type:$f,coordinate:e.payload}),d({type:`END`})}});return()=>t?.()},[e,n]),(0,a.useEffect)(()=>{f&&(d({type:$,message:p?m?ap:ip:m?op:rp}),p||d({type:Wf}))},[p]),(0,a.useEffect)(()=>{switch(h){case 1:let{numOfTiles:e,name:t}=hp[0];d({type:$,message:Rf(t,e)});break;case 2:if(n===1?(s({player1_ships:g,player1_placed_ships:!0}),c(`ships_placed`,g,n)):n===2&&(s({player2_ships:g,player2_placed_ships:!0}),c(`ships_placed`,g,n)),_)return d({type:Zf});d({type:$,message:pp});break;case 3:let r=Of(te);if(r){let e=Bf(!1,g,r);d({type:$,message:e});let t=Ff(g,r,te);if(t){let e=zf(!1,t);d({type:$,message:e})}}d({type:$,message:cp});break;case 4:let i=Of(b);if(i){let e=Bf(!0,_,i);d({type:$,message:e});let t=Ff(_,i,b);if(t){let e=zf(!0,t);d({type:$,message:e})}}d({type:$,message:lp});break;case 5:d({type:$,message:dp});break;case 6:d({type:$,message:fp})}},[h,g,_,te,b,n,c,s]),(0,a.useEffect)(()=>{switch(y){case 0:break;case hp.length:d({type:Yf});break;default:let{numOfTiles:e,name:t}=hp[y];d({type:$,message:Rf(t,e)})}},[y]);let ne=()=>{d({type:Gf}),c(`new_game`,null,n),s({game_state:1,player1_ships:[],player2_ships:[],player1_shots:[],player2_shots:[],player1_placed_ships:!1,player2_placed_ships:!1})},re=h===0?up:_?null:pp,ie=h===5?dp:h===6?fp:null,ae=h===1,oe=()=>{d({type:Kf})},se=e=>e?e=>{h===1&&d({type:qf,coordinate:e})}:e=>{if(h===3){d({type:Qf,coordinate:e});let t=[...b,e];n===1?(s({player1_shots:t}),c(`shot`,e,n)):n===2&&(s({player2_shots:t}),c(`shot`,e,n))}},ce=()=>d({type:Jf}),le={messages:v,newGame:ne},ue={myBoard:!0,placedShips:g,overlaySettings:ie,title:`Your Board`,showConfirmCancelButtons:ae,clearTiles:oe,clickTile:se(!0),chosenTiles:ee,confirmTiles:ce,shot:te,active:h===4},x={placedShips:_,overlaySettings:re,title:`Opponent's Board`,clickTile:se(!1),chosenTiles:[],shot:b,active:h===3};return i?{logState:{messages:[{time:new Date().toLocaleTimeString(),message:`Loading game...`}],newGame:ne},myState:{...ue,placedShips:[]},opponentState:{...x,placedShips:[]}}:{logState:le,myState:ue,opponentState:x}},Up=n(function(){let{myState:e,opponentState:t,logState:n}=Hp();return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(Mp,{}),(0,D.jsx)(Dp,{myState:e,opponentState:t}),(0,D.jsx)(jp,{...n})]})});export{Up as default};