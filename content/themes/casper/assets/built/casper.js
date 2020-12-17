/**
* ghostHunter - 0.6.0
 * Copyright (C) 2014 Jamal Neufeld (jamal@i11u.me)
 * MIT Licensed
 * @license
*/
!function(e){var t,i;!function(){var e,t,i,r,n,s,o,a,l,u,c,h,d,f,p,g,m,y,v,x,w,b,k,S,L,_,Q,T,I=function(e){var t=new I.Builder;return t.pipeline.add(I.trimmer,I.stopWordFilter,I.stemmer),t.searchPipeline.add(I.stemmer),e.call(t,t),t.build()};I.version="2.1.5"
/*!
 * lunr.utils
 * Copyright (C) 2017 Oliver Nightingale
 */,I.utils={},I.utils.warn=(e=this,function(t){e.console&&console.warn&&console.warn(t)}),I.utils.asString=function(e){return null==e?"":e.toString()},I.FieldRef=function(e,t,i){this.docRef=e,this.fieldName=t,this._stringValue=i},I.FieldRef.joiner="/",I.FieldRef.fromString=function(e){var t=e.indexOf(I.FieldRef.joiner);if(-1===t)throw"malformed field ref string";var i=e.slice(0,t),r=e.slice(t+1);return new I.FieldRef(r,i,e)},I.FieldRef.prototype.toString=function(){return null==this._stringValue&&(this._stringValue=this.fieldName+I.FieldRef.joiner+this.docRef),this._stringValue},I.idf=function(e,t){var i=0;for(var r in e)"_index"!=r&&(i+=Object.keys(e[r]).length);var n=(t-i+.5)/(i+.5);return Math.log(1+Math.abs(n))},I.Token=function(e,t){this.str=e||"",this.metadata=t||{}},I.Token.prototype.toString=function(){return this.str},I.Token.prototype.update=function(e){return this.str=e(this.str,this.metadata),this},I.Token.prototype.clone=function(e){return e=e||function(e){return e},new I.Token(e(this.str,this.metadata),this.metadata)}
/*!
 * lunr.tokenizer
 * Copyright (C) 2017 Oliver Nightingale
 */,I.tokenizer=function(e){if(null==e||null==e)return[];if(Array.isArray(e))return e.map((function(e){return new I.Token(I.utils.asString(e).toLowerCase())}));for(var t=e.toString().trim().toLowerCase(),i=t.length,r=[],n=0,s=0;n<=i;n++){var o=n-s;(t.charAt(n).match(I.tokenizer.separator)||n==i)&&(o>0&&r.push(new I.Token(t.slice(s,n),{position:[s,o],index:r.length})),s=n+1)}return r},I.tokenizer.separator=/[\s\-]+/
/*!
 * lunr.Pipeline
 * Copyright (C) 2017 Oliver Nightingale
 */,I.Pipeline=function(){this._stack=[]},I.Pipeline.registeredFunctions=Object.create(null),I.Pipeline.registerFunction=function(e,t){t in this.registeredFunctions&&I.utils.warn("Overwriting existing registered function: "+t),e.label=t,I.Pipeline.registeredFunctions[e.label]=e},I.Pipeline.warnIfFunctionNotRegistered=function(e){e.label&&e.label in this.registeredFunctions||I.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",e)},I.Pipeline.load=function(e){var t=new I.Pipeline;return e.forEach((function(e){var i=I.Pipeline.registeredFunctions[e];if(!i)throw new Error("Cannot load unregistered function: "+e);t.add(i)})),t},I.Pipeline.prototype.add=function(){var e=Array.prototype.slice.call(arguments);e.forEach((function(e){I.Pipeline.warnIfFunctionNotRegistered(e),this._stack.push(e)}),this)},I.Pipeline.prototype.after=function(e,t){I.Pipeline.warnIfFunctionNotRegistered(t);var i=this._stack.indexOf(e);if(-1==i)throw new Error("Cannot find existingFn");i+=1,this._stack.splice(i,0,t)},I.Pipeline.prototype.before=function(e,t){I.Pipeline.warnIfFunctionNotRegistered(t);var i=this._stack.indexOf(e);if(-1==i)throw new Error("Cannot find existingFn");this._stack.splice(i,0,t)},I.Pipeline.prototype.remove=function(e){var t=this._stack.indexOf(e);-1!=t&&this._stack.splice(t,1)},I.Pipeline.prototype.run=function(e){for(var t=this._stack.length,i=0;i<t;i++){var r=this._stack[i];e=e.reduce((function(t,i,n){var s=r(i,n,e);return void 0===s||""===s?t:t.concat(s)}),[])}return e},I.Pipeline.prototype.runString=function(e){var t=new I.Token(e);return this.run([t]).map((function(e){return e.toString()}))},I.Pipeline.prototype.reset=function(){this._stack=[]},I.Pipeline.prototype.toJSON=function(){return this._stack.map((function(e){return I.Pipeline.warnIfFunctionNotRegistered(e),e.label}))}
/*!
 * lunr.Vector
 * Copyright (C) 2017 Oliver Nightingale
 */,I.Vector=function(e){this._magnitude=0,this.elements=e||[]},I.Vector.prototype.positionForIndex=function(e){if(0==this.elements.length)return 0;for(var t=0,i=this.elements.length/2,r=i-t,n=Math.floor(r/2),s=this.elements[2*n];r>1&&(s<e&&(t=n),s>e&&(i=n),s!=e);)r=i-t,n=t+Math.floor(r/2),s=this.elements[2*n];return s==e||s>e?2*n:s<e?2*(n+1):void 0},I.Vector.prototype.insert=function(e,t){this.upsert(e,t,(function(){throw"duplicate index"}))},I.Vector.prototype.upsert=function(e,t,i){this._magnitude=0;var r=this.positionForIndex(e);this.elements[r]==e?this.elements[r+1]=i(this.elements[r+1],t):this.elements.splice(r,0,e,t)},I.Vector.prototype.magnitude=function(){if(this._magnitude)return this._magnitude;for(var e=0,t=this.elements.length,i=1;i<t;i+=2){var r=this.elements[i];e+=r*r}return this._magnitude=Math.sqrt(e)},I.Vector.prototype.dot=function(e){for(var t=0,i=this.elements,r=e.elements,n=i.length,s=r.length,o=0,a=0,l=0,u=0;l<n&&u<s;)(o=i[l])<(a=r[u])?l+=2:o>a?u+=2:o==a&&(t+=i[l+1]*r[u+1],l+=2,u+=2);return t},I.Vector.prototype.similarity=function(e){return this.dot(e)/(this.magnitude()*e.magnitude())},I.Vector.prototype.toArray=function(){for(var e=new Array(this.elements.length/2),t=1,i=0;t<this.elements.length;t+=2,i++)e[i]=this.elements[t];return e},I.Vector.prototype.toJSON=function(){return this.elements}
/*!
 * lunr.stemmer
 * Copyright (C) 2017 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */,I.stemmer=(t={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},i={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},r="[aeiouy]",n="[^aeiou][^aeiouy]*",s=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*"),o=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*"),a=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$"),l=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy]"),u=/^(.+?)(ss|i)es$/,c=/^(.+?)([^s])s$/,h=/^(.+?)eed$/,d=/^(.+?)(ed|ing)$/,f=/.$/,p=/(at|bl|iz)$/,g=new RegExp("([^aeiouylsz])\\1$"),m=new RegExp("^"+n+r+"[^aeiouwxy]$"),y=/^(.+?[^aeiou])y$/,v=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,x=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,w=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,b=/^(.+?)(s|t)(ion)$/,k=/^(.+?)e$/,S=/ll$/,L=new RegExp("^"+n+r+"[^aeiouwxy]$"),_=function(e){var r,n,_,Q,T,I,P;if(e.length<3)return e;if("y"==(_=e.substr(0,1))&&(e=_.toUpperCase()+e.substr(1)),T=c,(Q=u).test(e)?e=e.replace(Q,"$1$2"):T.test(e)&&(e=e.replace(T,"$1$2")),T=d,(Q=h).test(e)){var E=Q.exec(e);(Q=s).test(E[1])&&(Q=f,e=e.replace(Q,""))}else T.test(e)&&(r=(E=T.exec(e))[1],(T=l).test(r)&&(I=g,P=m,(T=p).test(e=r)?e+="e":I.test(e)?(Q=f,e=e.replace(Q,"")):P.test(e)&&(e+="e")));return(Q=y).test(e)&&(e=(r=(E=Q.exec(e))[1])+"i"),(Q=v).test(e)&&(r=(E=Q.exec(e))[1],n=E[2],(Q=s).test(r)&&(e=r+t[n])),(Q=x).test(e)&&(r=(E=Q.exec(e))[1],n=E[2],(Q=s).test(r)&&(e=r+i[n])),T=b,(Q=w).test(e)?(r=(E=Q.exec(e))[1],(Q=o).test(r)&&(e=r)):T.test(e)&&(r=(E=T.exec(e))[1]+E[2],(T=o).test(r)&&(e=r)),(Q=k).test(e)&&(r=(E=Q.exec(e))[1],T=a,I=L,((Q=o).test(r)||T.test(r)&&!I.test(r))&&(e=r)),T=o,(Q=S).test(e)&&T.test(e)&&(Q=f,e=e.replace(Q,"")),"y"==_&&(e=_.toLowerCase()+e.substr(1)),e},function(e){return e.update(_)}),I.Pipeline.registerFunction(I.stemmer,"stemmer")
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2017 Oliver Nightingale
 */,I.generateStopWordFilter=function(e){var t=e.reduce((function(e,t){return e[t]=t,e}),{});return function(e){if(e&&t[e.toString()]!==e.toString())return e}},I.stopWordFilter=I.generateStopWordFilter(["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]),I.Pipeline.registerFunction(I.stopWordFilter,"stopWordFilter")
/*!
 * lunr.trimmer
 * Copyright (C) 2017 Oliver Nightingale
 */,I.trimmer=function(e){return e.update((function(e){return e.replace(/^\W+/,"").replace(/\W+$/,"")}))},I.Pipeline.registerFunction(I.trimmer,"trimmer")
/*!
 * lunr.TokenSet
 * Copyright (C) 2017 Oliver Nightingale
 */,I.TokenSet=function(){this.final=!1,this.edges={},this.id=I.TokenSet._nextId,I.TokenSet._nextId+=1},I.TokenSet._nextId=1,I.TokenSet.fromArray=function(e){for(var t=new I.TokenSet.Builder,i=0,r=e.length;i<r;i++)t.insert(e[i]);return t.finish(),t.root},I.TokenSet.fromClause=function(e){return"editDistance"in e?I.TokenSet.fromFuzzyString(e.term,e.editDistance):I.TokenSet.fromString(e.term)},I.TokenSet.fromFuzzyString=function(e,t){for(var i=new I.TokenSet,r=[{node:i,editsRemaining:t,str:e}];r.length;){var n,s,o,a=r.pop();if(a.str.length>0)(s=a.str.charAt(0))in a.node.edges?n=a.node.edges[s]:(n=new I.TokenSet,a.node.edges[s]=n),1==a.str.length?n.final=!0:r.push({node:n,editsRemaining:a.editsRemaining,str:a.str.slice(1)});if(a.editsRemaining>0&&a.str.length>1)(s=a.str.charAt(1))in a.node.edges?o=a.node.edges[s]:(o=new I.TokenSet,a.node.edges[s]=o),a.str.length<=2?o.final=!0:r.push({node:o,editsRemaining:a.editsRemaining-1,str:a.str.slice(2)});if(a.editsRemaining>0&&1==a.str.length&&(a.node.final=!0),a.editsRemaining>0&&a.str.length>=1){if("*"in a.node.edges)var l=a.node.edges["*"];else{l=new I.TokenSet;a.node.edges["*"]=l}1==a.str.length?l.final=!0:r.push({node:l,editsRemaining:a.editsRemaining-1,str:a.str.slice(1)})}if(a.editsRemaining>0){if("*"in a.node.edges)var u=a.node.edges["*"];else{u=new I.TokenSet;a.node.edges["*"]=u}0==a.str.length?u.final=!0:r.push({node:u,editsRemaining:a.editsRemaining-1,str:a.str})}if(a.editsRemaining>0&&a.str.length>1){var c,h=a.str.charAt(0),d=a.str.charAt(1);d in a.node.edges?c=a.node.edges[d]:(c=new I.TokenSet,a.node.edges[d]=c),1==a.str.length?c.final=!0:r.push({node:c,editsRemaining:a.editsRemaining-1,str:h+a.str.slice(2)})}}return i},I.TokenSet.fromString=function(e){for(var t=new I.TokenSet,i=t,r=!1,n=0,s=e.length;n<s;n++){var o=e[n],a=n==s-1;if("*"==o)r=!0,t.edges[o]=t,t.final=a;else{var l=new I.TokenSet;l.final=a,t.edges[o]=l,t=l,r&&(t.edges["*"]=i)}}return i},I.TokenSet.prototype.toArray=function(){for(var e=[],t=[{prefix:"",node:this}];t.length;){var i=t.pop(),r=Object.keys(i.node.edges),n=r.length;i.node.final&&e.push(i.prefix);for(var s=0;s<n;s++){var o=r[s];t.push({prefix:i.prefix.concat(o),node:i.node.edges[o]})}}return e},I.TokenSet.prototype.toString=function(){if(this._str)return this._str;for(var e=this.final?"1":"0",t=Object.keys(this.edges).sort(),i=t.length,r=0;r<i;r++){var n=t[r];e=e+n+this.edges[n].id}return e},I.TokenSet.prototype.intersect=function(e){for(var t=new I.TokenSet,i=void 0,r=[{qNode:e,output:t,node:this}];r.length;){i=r.pop();for(var n=Object.keys(i.qNode.edges),s=n.length,o=Object.keys(i.node.edges),a=o.length,l=0;l<s;l++)for(var u=n[l],c=0;c<a;c++){var h=o[c];if(h==u||"*"==u){var d=i.node.edges[h],f=i.qNode.edges[u],p=d.final&&f.final,g=void 0;h in i.output.edges?(g=i.output.edges[h]).final=g.final||p:((g=new I.TokenSet).final=p,i.output.edges[h]=g),r.push({qNode:f,output:g,node:d})}}}return t},I.TokenSet.Builder=function(){this.previousWord="",this.root=new I.TokenSet,this.uncheckedNodes=[],this.minimizedNodes={}},I.TokenSet.Builder.prototype.insert=function(e){var t,i=0;if(e<this.previousWord)throw new Error("Out of order word insertion");for(var r=0;r<e.length&&r<this.previousWord.length&&e[r]==this.previousWord[r];r++)i++;this.minimize(i),t=0==this.uncheckedNodes.length?this.root:this.uncheckedNodes[this.uncheckedNodes.length-1].child;for(r=i;r<e.length;r++){var n=new I.TokenSet,s=e[r];t.edges[s]=n,this.uncheckedNodes.push({parent:t,char:s,child:n}),t=n}t.final=!0,this.previousWord=e},I.TokenSet.Builder.prototype.finish=function(){this.minimize(0)},I.TokenSet.Builder.prototype.minimize=function(e){for(var t=this.uncheckedNodes.length-1;t>=e;t--){var i=this.uncheckedNodes[t],r=i.child.toString();r in this.minimizedNodes?i.parent.edges[i.char]=this.minimizedNodes[r]:(i.child._str=r,this.minimizedNodes[r]=i.child),this.uncheckedNodes.pop()}}
/*!
 * lunr.Index
 * Copyright (C) 2017 Oliver Nightingale
 */,I.Index=function(e){this.invertedIndex=e.invertedIndex,this.fieldVectors=e.fieldVectors,this.tokenSet=e.tokenSet,this.fields=e.fields,this.pipeline=e.pipeline},I.Index.prototype.search=function(e){return this.query((function(t){new I.QueryParser(e,t).parse()}))},I.Index.prototype.query=function(e){var t=new I.Query(this.fields),i=Object.create(null),r=Object.create(null),n=Object.create(null);e.call(t,t);for(var s=0;s<t.clauses.length;s++){var o=t.clauses[s],a=null;a=o.usePipeline?this.pipeline.runString(o.term):[o.term];for(var l=0;l<a.length;l++){var u=a[l];(o=JSON.parse(JSON.stringify(o))).term=u;for(var c=I.TokenSet.fromClause(o),h=this.tokenSet.intersect(c).toArray(),d=0;d<h.length;d++){var f=h[d],p=this.invertedIndex[f];if(p)for(var g=p._index,m=0;m<o.fields.length;m++){var y=o.fields[m],v=p[y],x=Object.keys(v),w=f+"/"+y;if(void 0===r[y]&&(r[y]=new I.Vector),r[y].upsert(g,1*o.boost,(function(e,t){return e+t})),!n[w]){for(var b=0;b<x.length;b++){var k,S=x[b],L=new I.FieldRef(S,y),_=v[S];void 0===(k=i[L])?i[L]=new I.MatchData(f,y,_):k.add(f,y,_)}n[w]=!0}}}}}var Q=Object.keys(i),T=[],P=Object.create(null);for(s=0;s<Q.length;s++){var E,O=I.FieldRef.fromString(Q[s]),N=O.docRef,F=this.fieldVectors[O],j=r[O.fieldName].similarity(F);if(void 0!==(E=P[N]))E.score+=j,E.matchData.combine(i[O]);else{var D={ref:N,score:j,matchData:i[O]};P[N]=D,T.push(D)}}return T.sort((function(e,t){return t.score-e.score}))},I.Index.prototype.toJSON=function(){var e=Object.keys(this.invertedIndex).sort().map((function(e){return[e,this.invertedIndex[e]]}),this),t=Object.keys(this.fieldVectors).map((function(e){return[e,this.fieldVectors[e].toJSON()]}),this);return{version:I.version,fields:this.fields,fieldVectors:t,invertedIndex:e,pipeline:this.pipeline.toJSON()}},I.Index.load=function(e){var t={},i={},r=e.fieldVectors,n={},s=e.invertedIndex,o=new I.TokenSet.Builder,a=I.Pipeline.load(e.pipeline);e.version!=I.version&&I.utils.warn("Version mismatch when loading serialised index. Current version of lunr '"+I.version+"' does not match serialized index '"+e.version+"'");for(var l=0;l<r.length;l++){var u=(h=r[l])[0],c=h[1];i[u]=new I.Vector(c)}for(l=0;l<s.length;l++){var h,d=(h=s[l])[0],f=h[1];o.insert(d),n[d]=f}return o.finish(),t.fields=e.fields,t.fieldVectors=i,t.invertedIndex=n,t.tokenSet=o.root,t.pipeline=a,new I.Index(t)}
/*!
 * lunr.Builder
 * Copyright (C) 2017 Oliver Nightingale
 */,I.Builder=function(){this._ref="id",this._fields=[],this.invertedIndex=Object.create(null),this.fieldTermFrequencies={},this.fieldLengths={},this.tokenizer=I.tokenizer,this.pipeline=new I.Pipeline,this.searchPipeline=new I.Pipeline,this.documentCount=0,this._b=.75,this._k1=1.2,this.termIndex=0,this.metadataWhitelist=[]},I.Builder.prototype.ref=function(e){this._ref=e},I.Builder.prototype.field=function(e){this._fields.push(e)},I.Builder.prototype.b=function(e){this._b=e<0?0:e>1?1:e},I.Builder.prototype.k1=function(e){this._k1=e},I.Builder.prototype.add=function(e){var t=e[this._ref];this.documentCount+=1;for(var i=0;i<this._fields.length;i++){var r=this._fields[i],n=e[r],s=this.tokenizer(n),o=this.pipeline.run(s),a=new I.FieldRef(t,r),l=Object.create(null);this.fieldTermFrequencies[a]=l,this.fieldLengths[a]=0,this.fieldLengths[a]+=o.length;for(var u=0;u<o.length;u++){var c=o[u];if(null==l[c]&&(l[c]=0),l[c]+=1,null==this.invertedIndex[c]){var h=Object.create(null);h._index=this.termIndex,this.termIndex+=1;for(var d=0;d<this._fields.length;d++)h[this._fields[d]]=Object.create(null);this.invertedIndex[c]=h}null==this.invertedIndex[c][r][t]&&(this.invertedIndex[c][r][t]=Object.create(null));for(var f=0;f<this.metadataWhitelist.length;f++){var p=this.metadataWhitelist[f],g=c.metadata[p];null==this.invertedIndex[c][r][t][p]&&(this.invertedIndex[c][r][t][p]=[]),this.invertedIndex[c][r][t][p].push(g)}}}},I.Builder.prototype.calculateAverageFieldLengths=function(){for(var e=Object.keys(this.fieldLengths),t=e.length,i={},r={},n=0;n<t;n++){var s=I.FieldRef.fromString(e[n]);r[o=s.fieldName]||(r[o]=0),r[o]+=1,i[o]||(i[o]=0),i[o]+=this.fieldLengths[s]}for(n=0;n<this._fields.length;n++){var o;i[o=this._fields[n]]=i[o]/r[o]}this.averageFieldLength=i},I.Builder.prototype.createFieldVectors=function(){for(var e={},t=Object.keys(this.fieldTermFrequencies),i=t.length,r=Object.create(null),n=0;n<i;n++){for(var s=I.FieldRef.fromString(t[n]),o=s.fieldName,a=this.fieldLengths[s],l=new I.Vector,u=this.fieldTermFrequencies[s],c=Object.keys(u),h=c.length,d=0;d<h;d++){var f,p,g,m=c[d],y=u[m],v=this.invertedIndex[m]._index;void 0===r[m]?(f=I.idf(this.invertedIndex[m],this.documentCount),r[m]=f):f=r[m],p=f*((this._k1+1)*y)/(this._k1*(1-this._b+this._b*(a/this.averageFieldLength[o]))+y),g=Math.round(1e3*p)/1e3,l.insert(v,g)}e[s]=l}this.fieldVectors=e},I.Builder.prototype.createTokenSet=function(){this.tokenSet=I.TokenSet.fromArray(Object.keys(this.invertedIndex).sort())},I.Builder.prototype.build=function(){return this.calculateAverageFieldLengths(),this.createFieldVectors(),this.createTokenSet(),new I.Index({invertedIndex:this.invertedIndex,fieldVectors:this.fieldVectors,tokenSet:this.tokenSet,fields:this._fields,pipeline:this.searchPipeline})},I.Builder.prototype.use=function(e){var t=Array.prototype.slice.call(arguments,1);t.unshift(this),e.apply(this,t)},I.MatchData=function(e,t,i){for(var r=Object.create(null),n=Object.keys(i),s=0;s<n.length;s++){var o=n[s];r[o]=i[o].slice()}this.metadata=Object.create(null),this.metadata[e]=Object.create(null),this.metadata[e][t]=r},I.MatchData.prototype.combine=function(e){for(var t=Object.keys(e.metadata),i=0;i<t.length;i++){var r=t[i],n=Object.keys(e.metadata[r]);null==this.metadata[r]&&(this.metadata[r]=Object.create(null));for(var s=0;s<n.length;s++){var o=n[s],a=Object.keys(e.metadata[r][o]);null==this.metadata[r][o]&&(this.metadata[r][o]=Object.create(null));for(var l=0;l<a.length;l++){var u=a[l];null==this.metadata[r][o][u]?this.metadata[r][o][u]=e.metadata[r][o][u]:this.metadata[r][o][u]=this.metadata[r][o][u].concat(e.metadata[r][o][u])}}}},I.MatchData.prototype.add=function(e,t,i){if(!(e in this.metadata))return this.metadata[e]=Object.create(null),void(this.metadata[e][t]=i);if(t in this.metadata[e])for(var r=Object.keys(i),n=0;n<r.length;n++){var s=r[n];s in this.metadata[e][t]?this.metadata[e][t][s]=this.metadata[e][t][s].concat(i[s]):this.metadata[e][t][s]=i[s]}else this.metadata[e][t]=i},I.Query=function(e){this.clauses=[],this.allFields=e},I.Query.wildcard=new String("*"),I.Query.wildcard.NONE=0,I.Query.wildcard.LEADING=1,I.Query.wildcard.TRAILING=2,I.Query.prototype.clause=function(e){return"fields"in e||(e.fields=this.allFields),"boost"in e||(e.boost=1),"usePipeline"in e||(e.usePipeline=!0),"wildcard"in e||(e.wildcard=I.Query.wildcard.NONE),e.wildcard&I.Query.wildcard.LEADING&&e.term.charAt(0)!=I.Query.wildcard&&(e.term="*"+e.term),e.wildcard&I.Query.wildcard.TRAILING&&e.term.slice(-1)!=I.Query.wildcard&&(e.term=e.term+"*"),this.clauses.push(e),this},I.Query.prototype.term=function(e,t){var i=t||{};return i.term=e,this.clause(i),this},I.QueryParseError=function(e,t,i){this.name="QueryParseError",this.message=e,this.start=t,this.end=i},I.QueryParseError.prototype=new Error,I.QueryLexer=function(e){this.lexemes=[],this.str=e,this.length=e.length,this.pos=0,this.start=0,this.escapeCharPositions=[]},I.QueryLexer.prototype.run=function(){for(var e=I.QueryLexer.lexText;e;)e=e(this)},I.QueryLexer.prototype.sliceString=function(){for(var e=[],t=this.start,i=this.pos,r=0;r<this.escapeCharPositions.length;r++)i=this.escapeCharPositions[r],e.push(this.str.slice(t,i)),t=i+1;return e.push(this.str.slice(t,this.pos)),this.escapeCharPositions.length=0,e.join("")},I.QueryLexer.prototype.emit=function(e){this.lexemes.push({type:e,str:this.sliceString(),start:this.start,end:this.pos}),this.start=this.pos},I.QueryLexer.prototype.escapeCharacter=function(){this.escapeCharPositions.push(this.pos-1),this.pos+=1},I.QueryLexer.prototype.next=function(){if(this.pos>=this.length)return I.QueryLexer.EOS;var e=this.str.charAt(this.pos);return this.pos+=1,e},I.QueryLexer.prototype.width=function(){return this.pos-this.start},I.QueryLexer.prototype.ignore=function(){this.start==this.pos&&(this.pos+=1),this.start=this.pos},I.QueryLexer.prototype.backup=function(){this.pos-=1},I.QueryLexer.prototype.acceptDigitRun=function(){var e,t;do{t=(e=this.next()).charCodeAt(0)}while(t>47&&t<58);e!=I.QueryLexer.EOS&&this.backup()},I.QueryLexer.prototype.more=function(){return this.pos<this.length},I.QueryLexer.EOS="EOS",I.QueryLexer.FIELD="FIELD",I.QueryLexer.TERM="TERM",I.QueryLexer.EDIT_DISTANCE="EDIT_DISTANCE",I.QueryLexer.BOOST="BOOST",I.QueryLexer.lexField=function(e){return e.backup(),e.emit(I.QueryLexer.FIELD),e.ignore(),I.QueryLexer.lexText},I.QueryLexer.lexTerm=function(e){if(e.width()>1&&(e.backup(),e.emit(I.QueryLexer.TERM)),e.ignore(),e.more())return I.QueryLexer.lexText},I.QueryLexer.lexEditDistance=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(I.QueryLexer.EDIT_DISTANCE),I.QueryLexer.lexText},I.QueryLexer.lexBoost=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(I.QueryLexer.BOOST),I.QueryLexer.lexText},I.QueryLexer.lexEOS=function(e){e.width()>0&&e.emit(I.QueryLexer.TERM)},I.QueryLexer.termSeparator=I.tokenizer.separator,I.QueryLexer.lexText=function(e){for(;;){var t=e.next();if(t==I.QueryLexer.EOS)return I.QueryLexer.lexEOS;if(92!=t.charCodeAt(0)){if(":"==t)return I.QueryLexer.lexField;if("~"==t)return e.backup(),e.width()>0&&e.emit(I.QueryLexer.TERM),I.QueryLexer.lexEditDistance;if("^"==t)return e.backup(),e.width()>0&&e.emit(I.QueryLexer.TERM),I.QueryLexer.lexBoost;if(t.match(I.QueryLexer.termSeparator))return I.QueryLexer.lexTerm}else e.escapeCharacter()}},I.QueryParser=function(e,t){this.lexer=new I.QueryLexer(e),this.query=t,this.currentClause={},this.lexemeIdx=0},I.QueryParser.prototype.parse=function(){this.lexer.run(),this.lexemes=this.lexer.lexemes;for(var e=I.QueryParser.parseFieldOrTerm;e;)e=e(this);return this.query},I.QueryParser.prototype.peekLexeme=function(){return this.lexemes[this.lexemeIdx]},I.QueryParser.prototype.consumeLexeme=function(){var e=this.peekLexeme();return this.lexemeIdx+=1,e},I.QueryParser.prototype.nextClause=function(){var e=this.currentClause;this.query.clause(e),this.currentClause={}},I.QueryParser.parseFieldOrTerm=function(e){var t=e.peekLexeme();if(null!=t)switch(t.type){case I.QueryLexer.FIELD:return I.QueryParser.parseField;case I.QueryLexer.TERM:return I.QueryParser.parseTerm;default:var i="expected either a field or a term, found "+t.type;throw t.str.length>=1&&(i+=" with value '"+t.str+"'"),new I.QueryParseError(i,t.start,t.end)}},I.QueryParser.parseField=function(e){var t=e.consumeLexeme();if(null!=t){if(-1==e.query.allFields.indexOf(t.str)){var i=e.query.allFields.map((function(e){return"'"+e+"'"})).join(", "),r="unrecognised field '"+t.str+"', possible fields: "+i;throw new I.QueryParseError(r,t.start,t.end)}e.currentClause.fields=[t.str];var n=e.peekLexeme();if(null==n){r="expecting term, found nothing";throw new I.QueryParseError(r,t.start,t.end)}switch(n.type){case I.QueryLexer.TERM:return I.QueryParser.parseTerm;default:r="expecting term, found '"+n.type+"'";throw new I.QueryParseError(r,n.start,n.end)}}},I.QueryParser.parseTerm=function(e){var t=e.consumeLexeme();if(null!=t){e.currentClause.term=t.str.toLowerCase(),-1!=t.str.indexOf("*")&&(e.currentClause.usePipeline=!1);var i=e.peekLexeme();if(null!=i)switch(i.type){case I.QueryLexer.TERM:return e.nextClause(),I.QueryParser.parseTerm;case I.QueryLexer.FIELD:return e.nextClause(),I.QueryParser.parseField;case I.QueryLexer.EDIT_DISTANCE:return I.QueryParser.parseEditDistance;case I.QueryLexer.BOOST:return I.QueryParser.parseBoost;default:var r="Unexpected lexeme type '"+i.type+"'";throw new I.QueryParseError(r,i.start,i.end)}else e.nextClause()}},I.QueryParser.parseEditDistance=function(e){var t=e.consumeLexeme();if(null!=t){var i=parseInt(t.str,10);if(isNaN(i)){var r="edit distance must be numeric";throw new I.QueryParseError(r,t.start,t.end)}e.currentClause.editDistance=i;var n=e.peekLexeme();if(null!=n)switch(n.type){case I.QueryLexer.TERM:return e.nextClause(),I.QueryParser.parseTerm;case I.QueryLexer.FIELD:return e.nextClause(),I.QueryParser.parseField;case I.QueryLexer.EDIT_DISTANCE:return I.QueryParser.parseEditDistance;case I.QueryLexer.BOOST:return I.QueryParser.parseBoost;default:r="Unexpected lexeme type '"+n.type+"'";throw new I.QueryParseError(r,n.start,n.end)}else e.nextClause()}},I.QueryParser.parseBoost=function(e){var t=e.consumeLexeme();if(null!=t){var i=parseInt(t.str,10);if(isNaN(i)){var r="boost must be numeric";throw new I.QueryParseError(r,t.start,t.end)}e.currentClause.boost=i;var n=e.peekLexeme();if(null!=n)switch(n.type){case I.QueryLexer.TERM:return e.nextClause(),I.QueryParser.parseTerm;case I.QueryLexer.FIELD:return e.nextClause(),I.QueryParser.parseField;case I.QueryLexer.EDIT_DISTANCE:return I.QueryParser.parseEditDistance;case I.QueryLexer.BOOST:return I.QueryParser.parseBoost;default:r="Unexpected lexeme type '"+n.type+"'";throw new I.QueryParseError(r,n.start,n.end)}else e.nextClause()}},Q=this,T=function(){return I},"function"==typeof define&&define.amd?define(T):"object"==typeof exports?module.exports=T():Q.lunr=T()}(),t=this,i=function(e){function t(e,t){var i,r;for(i=-1,r=e.length;++i<r;)t(e[i],i,e)}function i(e,i){var r;return r=Array(e.length),t(e,(function(e,t,n){r.push(i(e,t,n))})),r}function r(e,i,r){return t(e,(function(e,t,n){r=i(e,t,n)})),r}function n(e,t){return e.charAt(t)}function s(e,t){return e[t]}function o(e,i){var r,o,a,l;if("string"==typeof e&&"string"==typeof i)l=n;else{if("object"!=typeof e||"object"!=typeof i)throw"Levensthtein: input must be two strings or two arrays";l=s}return a=this._matrix=[],e==i?this.distance=0:""==e?this.distance=i.length:""==i?this.distance=e.length:(r=[0],t(e,(function(e,t){t++,r[t]=t})),a[0]=r,t(i,(function(n,s){o=[++s],t(e,(function(t,n){n++,l(e,n-1)==l(i,s-1)?o[n]=r[n-1]:o[n]=Math.min(r[n]+1,o[n-1]+1,r[n-1]+1)})),r=o,a[a.length]=r})),this.distance=o[o.length-1])}return o.prototype.toString=o.prototype.inspect=function(e){var t,n,s,o;for(n=r(t=this.getMatrix(),(function(e,t){return Math.max(e,r(t,Math.max,0))}),0),s=Array((n+"").length).join(" "),o=[];o.length<(t[0]&&t[0].length||0);)o[o.length]=Array(s.length+1).join("-");return o=o.join("-+")+"-",i(t,(function(e){return i(e,(function(e){return(s+e).slice(-s.length)})).join(" |")+" "})).join("\n"+o+"\n")},o.prototype.getSteps=function(){var e,t,i,r,n,s,o,a;for(e=[],i=(t=this.getMatrix()).length-1,r=t[0].length-1;0!==i||0!==r;)n=r>0?t[i][r-1]:Number.MAX_VALUE,s=i>0?t[i-1][r]:Number.MAX_VALUE,o=r>0&&i>0?t[i-1][r-1]:Number.MAX_VALUE,(a=Math.min(n,s,o))===o?(o<t[i][r]&&e.push(["substitute",r,i]),i--,r--):a===s?(e.push(["insert",r,i]),i--):(e.push(["delete",r,i]),r--);return e},o.prototype.getMatrix=function(){return this._matrix.slice()},o.prototype.valueOf=function(){return this.distance},o},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define((function(){return i()})):"object"==typeof module&&module&&module.exports?module.exports=i():t.Levenshtein=i(),e.fn.ghostHunter=function(t){var i=e.extend({},e.fn.ghostHunter.defaults,t);if(i.results)return l.init(this,i),l},e.fn.ghostHunter.defaults={resultsData:!1,onPageLoad:!1,onKeyUp:!1,result_template:"<a id='gh-{{ref}}' class='gh-search-item' href='{{link}}'><p><h2>{{title}}</h2><h4>{{prettyPubDate}}</h4></p></a>",info_template:"<p>Number of posts found: {{amount}}</p>",displaySearchInfo:!0,zeroResultsInfo:!0,before:!1,onComplete:!1,filterfields:!1,subpath:"",item_preprocessor:!1,indexing_start:!1,indexing_end:!1,includebodysearch:!1};var r=function(e){return e.replace(/^\//,"").replace(/\//g,"-")},n=null,s=function(){e(".gh-search-item").each((function(){var e=this.getAttribute("id").replace(/^new-/,"");this.setAttribute("id",e)}))},o=function(e,t,i){for(var r=0,n=i.length;r<n;r++){var o=i[r];if("delete"==o[0])e.eq(o[1]-1).remove();else{var a=t[o[2]-1].ref,l=this.blogData[a],u=this.format(this.result_template,l);if("substitute"===o[0])e.eq(o[1]-1).replaceWith(u);else if("insert"===o[0]){var c;c=0===o[1]?null:o[1]-1,e.eq(c).after(u)}}}s()},a=function(){this.blogData={},this.latestPost=0;var t=(ghost_root_url||"/ghost/api/v2")+"/content/posts/?key="+ghosthunter_key+"&limit=all&include=tags",i={limit:"all",include:"tags"};this.includebodysearch?(i.formats=["plaintext"],t+="&formats=plaintext"):i.formats=[""];var n=this;e.get(t).done((function(e){var t=e.posts;n.index=lunr((function(){this.ref("id"),this.field("title"),this.field("description"),n.includebodysearch&&this.field("plaintext"),this.field("pubDate"),this.field("tag"),t.forEach((function(e){new Date(e.updated_at).getTime()>new Date(n.latestPost).getTime()&&(n.latestPost=e.updated_at);var t=e.tags.map((function(e){return e.name}));null==e.meta_description&&(e.meta_description="");var i=t.join(", ");i.length<1&&(i="undefined");var r={id:String(e.id),title:String(e.title),description:String(e.custom_excerpt),pubDate:String(e.published_at),tag:i};n.includebodysearch&&(r.plaintext=String(e.plaintext)),this.add(r);var s,o,a=n.subpath+e.url;n.blogData[e.id]={title:e.title,description:e.custom_excerpt,pubDate:(s=r.pubDate,o=new Date(s),o.getDate()+" "+["January","February","March","April","May","June","July","August","September","October","November","December"][o.getMonth()]+" "+o.getFullYear()),link:a,tags:t},n.item_preprocessor&&Object.assign(n.blogData[e.id],n.item_preprocessor(e))}),this)}));try{var i=r(n.subpath);localStorage.setItem("ghost_"+i+"_lunrIndex",JSON.stringify(n.index)),localStorage.setItem("ghost_"+i+"_blogData",JSON.stringify(n.blogData)),localStorage.setItem("ghost_"+i+"_latestPost",n.latestPost)}catch(e){console.warn("ghostHunter: save to localStorage failed: "+e)}n.indexing_end&&n.indexing_end(),n.isInit=!0}))},l={isInit:!1,init:function(e,t){var i=this;if(i.target=e,Object.assign(this,t),t.onPageLoad){window.setTimeout((function(){i.loadAPI()}),1)}else e.focus((function(){i.loadAPI()}));e.closest("form").submit((function(t){t.preventDefault(),i.find(e.val())})),t.onKeyUp&&(e.keydown((function(e){if(13===e.which)return!1})),e.keyup((function(t){i.find(e.val())})))},loadAPI:function(){if(!this.isInit){this.indexing_start&&this.indexing_start();try{var t=r(this.subpath);this.index=localStorage.getItem("ghost_"+t+"_lunrIndex"),this.blogData=localStorage.getItem("ghost_"+t+"_blogData"),this.latestPost=localStorage.getItem("ghost_"+t+"_latestPost"),this.latestPost&&this.index&&this.blogData&&(this.latestPost=this.latestPost,this.index=lunr.Index.load(JSON.parse(this.index)),this.blogData=JSON.parse(this.blogData),this.isInit=!0)}catch(e){console.warn("ghostHunter: retrieve from localStorage failed: "+e)}}if(this.isInit){this.latestPost.replace(/\..*/,"").replace(/T/," ");var i=(ghost_root_url||"/ghost/api/v2")+"/content/posts/?key="+ghosthunter_key+"&limit=all&fields=id&filter=updated_at:>'"+this.latestPost.replace(/\..*/,"").replace(/T/," ")+"'",n=this;e.get(i).done((function(e){e.posts.length>0?a.call(n):(n.indexing_end&&n.indexing_end(),n.isInit=!0)}))}else a.call(this)},find:function(t){clearTimeout(n),t||(t=""),t=t.toLowerCase(),n=setTimeout(function(){for(var i=[],r=t.split(/\s+/),n=0,a=r.length;n<a;n++){var l=r[n];l&&i.push(this.index.query((function(e){e.term(l,{usePipeline:!0,boost:100}),e.term(l,{usePipeline:!1,boost:10,wildcard:lunr.Query.wildcard.TRAILING}),e.term(l,{usePipeline:!1,editDistance:1,boost:1})})))}if(i.length>1){var u=i[0];i=i.slice(1);for(n=u.length-1;n>-1;n--){var c=u[n].ref;for(j=0,jlen=i.length;j<jlen;j++){for(var h={},d=0,f=i[j].length;d<f;d++)h[i[j][d].ref]=!0;if(!h[c]){u=u.slice(0,n).concat(u.slice(n+1));break}}}}else u=1===i.length?i[0]:[];var p=e(this.results),g=[];0===u.length?(p.empty(),this.displaySearchInfo&&this.zeroResultsInfo&&p.append(this.format(this.info_template,{amount:0}))):this.displaySearchInfo&&(p.length>0?p.children().eq(0).replaceWith(this.format(this.info_template,{amount:u.length})):p.append(this.format(this.info_template,{amount:u.length}))),this.before&&this.before();for(n=0;n<u.length;n++){var m=u[n].ref,y=this.blogData[m];y?(y.ref=m,g.push(y)):console.warn("ghostHunter: index/data mismatch. Ouch.")}var v=e(".gh-search-item"),x=v.map((function(){return this.id.slice(3)})).get();if(0===x.length){for(n=0,a=g.length;n<a;n++)p.append(this.format(this.result_template,g[n]));s()}else{var w=[];for(n=0,a=u.length;n<a;n++)w.push(u[n].ref);var b=new Levenshtein(x,w).getSteps();o.call(this,v,u,b)}this.onComplete&&this.onComplete(g)}.bind(this),100)},clear:function(){e(this.results).empty(),this.target.val("")},format:function(e,t){return e.replace(/{{([^{}]*)}}/g,(function(e,i){var r=t[i];return"string"==typeof r||"number"==typeof r?r:e}))}}}(jQuery),function(e){"use strict";e.fn.fitVids=function(t){var i={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var r=document.head||document.getElementsByTagName("head")[0],n=document.createElement("div");n.innerHTML='<p>x</p><style id="fit-vids-style">.fluid-width-video-container{flex-grow: 1;width:100%;}.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>',r.appendChild(n.childNodes[1])}return t&&e.extend(i,t),this.each((function(){var t=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]',"object","embed"];i.customSelector&&t.push(i.customSelector);var r=".fitvidsignore";i.ignore&&(r=r+", "+i.ignore);var n=e(this).find(t.join(","));(n=(n=n.not("object object")).not(r)).each((function(){var t=e(this);if(!(t.parents(r).length>0||"embed"===this.tagName.toLowerCase()&&t.parent("object").length||t.parent(".fluid-width-video-wrapper").length)){t.css("height")||t.css("width")||!isNaN(t.attr("height"))&&!isNaN(t.attr("width"))||(t.attr("height",9),t.attr("width",16));var i=("object"===this.tagName.toLowerCase()||t.attr("height")&&!isNaN(parseInt(t.attr("height"),10))?parseInt(t.attr("height"),10):t.height())/(isNaN(parseInt(t.attr("width"),10))?t.width():parseInt(t.attr("width"),10));if(!t.attr("name")){var n="fitvid"+e.fn.fitVids._count;t.attr("name",n),e.fn.fitVids._count++}t.wrap('<div class="fluid-width-video-container"><div class="fluid-width-video-wrapper"></div></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*i+"%"),t.removeAttr("height").removeAttr("width")}}))}))},e.fn.fitVids._count=0}(window.jQuery||window.Zepto),function(e,t){t.addEventListener("DOMContentLoaded",(function(){t.querySelectorAll(".kg-gallery-image img").forEach((function(e){var t=e.closest(".kg-gallery-image"),i=e.attributes.width.value/e.attributes.height.value;t.style.flex=i+" 1 0%"}))}))}(window,document),function(e,t){var i=t.querySelector("link[rel=next]");if(i){var r=t.querySelector(".post-feed");if(r){var n=!1,s=!1,o=e.scrollY,a=e.innerHeight,l=t.documentElement.scrollHeight;e.addEventListener("scroll",d,{passive:!0}),e.addEventListener("resize",f),h()}}function u(){if(404===this.status)return e.removeEventListener("scroll",d),void e.removeEventListener("resize",f);this.response.querySelectorAll(".post-card").forEach((function(e){r.appendChild(t.importNode(e,!0))}));var o=this.response.querySelector("link[rel=next]");o?i.href=o.href:(e.removeEventListener("scroll",d),e.removeEventListener("resize",f)),l=t.documentElement.scrollHeight,n=!1,s=!1}function c(){if(!s)if(o+a<=l-300)n=!1;else{s=!0;var t=new e.XMLHttpRequest;t.responseType="document",t.addEventListener("load",u),t.open("GET",i.href),t.send(null)}}function h(){n||e.requestAnimationFrame(c),n=!0}function d(){o=e.scrollY,h()}function f(){a=e.innerHeight,l=t.documentElement.scrollHeight,h()}}(window,document);var resultTemplate='\n<article id=\'gh-{{ref}}\' class="gh-search-item post-card">\n    <a class="post-card-image-link" href="{{link}}">\n        <img class="post-card-image"\n            sizes="(max-width: 1000px) 400px, 700px"\n            height="200px"\n            loading="lazy"\n            src="{{feature_image}}"\n            alt="{{title}}"\n        />\n    </a>\n    <div class="post-card-content search-card-content bg-white">\n        <a class="post-card-content-link" href="{{link}}">\n            <header class="post-card-header">\n                <h2 class="post-card-title">{{title}}</h2>\n            </header>\n            <section class="post-card-excerpt">\n                    <p class="search-excerpt">{{excerpt}}</p>\n            </section>\n        </a>\n    </div>\n</article>\n',itemPreprocessor=function(e){var t={};return t.excerpt=e.excerpt,t.feature_image=e.feature_image,t},indexingStart=function(){$(".search-field").prop("disabled",!0).addClass("yellow-bg").prop("placeholder","Indexing, please wait")},indexingEnd=function(){$(".search-field").prop("placeholder","Search …").removeClass("yellow-bg").prop("disabled",!1)};$(document).ready((function(){$(".search-field").ghostHunter({results:"#search-results",onKeyUp:!0,onPageLoad:!0,includebodysearch:!0,info_template:"",result_template:resultTemplate,item_preprocessor:itemPreprocessor,indexing_start:indexingStart,indexing_end:indexingEnd});$(".close-btn").click((function(){$(".search-overlay").fadeOut(),$("#search-btn").show()})),$("#search-btn").click((function(){$(this).hide(),$(".search-overlay").fadeIn(),$(".search-field").focus()}))})),function(e,t){e.Casper||(e.Casper={}),e.Casper.stickyNavTitle=function(i){var r=t.querySelector(i.navSelector),n=t.querySelector(i.titleSelector),s=e.scrollY,o=!1;function a(){var t=n.getBoundingClientRect().top+e.scrollY,a=n.offsetHeight+35;s>=t+a?r.classList.add(i.activeClass):r.classList.remove(i.activeClass),o=!1}e.addEventListener("scroll",(function(){s=e.scrollY,function(){o||requestAnimationFrame(a);o=!0}()}),{passive:!0}),a()}}(window,document);
//# sourceMappingURL=casper.js.map