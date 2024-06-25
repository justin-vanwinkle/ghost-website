/* http://meyerweb.com/eric/tools/css/reset/ 
v2.0 | 20110126
License: none (public domain)
 */

 html, body, div, span, applet, object, iframe,
 h1, h2, h3, h4, h5, h6, p, blockquote, pre,
 a, abbr, acronym, address, big, cite, code,
 del, dfn, em, img, ins, kbd, q, s, samp,
 small, strike, strong, sub, sup, tt, var,
 b, u, i, center,
 dl, dt, dd, ol, ul, li,
 fieldset, form, label, legend,
 table, caption, tbody, tfoot, thead, tr, th, td,
 article, aside, canvas, details, embed, 
 figure, figcaption, footer, header, hgroup, 
 menu, nav, output, ruby, section, summary,
 time, mark, audio, video {
     margin: 0;
     padding: 0;
     border: 0;
     font-size: 100%;
     font: inherit;
     vertical-align: baseline;
 }
 /* HTML5 display-role reset for older browsers */
 article, aside, details, figcaption, figure, 
 footer, header, hgroup, menu, nav, section {
     display: block;
 }
 body {
     line-height: 1;
 }
 ol, ul {
     list-style: none;
 }
 blockquote, q {
     quotes: none;
 }
 blockquote:before, blockquote:after,
 q:before, q:after {
     content: '';
     content: none;
 }
 table {
     border-collapse: collapse;
     border-spacing: 0;
 }

 /* end of reset */



 body {
     font: normal normal 400;
     font-size: 80%;
     line-height: 1.5em;
     /*also written as...  font: normal normal 400 100%/1.5em;*/
     font-family: Verdana,sans-serif;
     margin-top: 1em;
     margin-left: 1em;
     max-width: 1080px;
 }

 p {
     position: relative;
     left: 33%;
     margin-bottom: 0.7em;
     margin-right: 0;
     width: 65%;
 }

 code {
     font: normal normal;
     font-size: 80%;
     /*line-height: 1em;*/
     font-family: Menlo,monospace,sans-serif;
     color: #666;
 }

 p code {
     position: absolute;
     left: -14%;
 }


 ul {
     position: relative;
     left: 33%;
     width: 65%;
     margin-bottom: 0.7em;
     margin-top: -0.5em;
     margin-left: 1.25em;
     list-style-position: inside;
 }

 /*uncomment to get dashes in the list*/
 li:before {
     content: "-";
     position: relative;
     left: -0.25em;
 }

 li {
     /*second line indent*/
     padding-left: 1.25em;
     text-indent: -1.25em;
     /* color: #777; */
 }

 li ul {
     position: relative;
     left: 0;
     width: 100%;
     margin-top: 0.25em;
 }

 h1,h2,h3,h4 {
     font-weight: 400;
     font-family: Cousine,Verdana,sans-serif;
     width: 65%;
 }

 h1 {
     text-align: left;
     font-size: 3em;
     line-height: 1em;
     position: relative;
     left: 33%;
     margin-bottom: 0.25em;
 }

 h1+p { 
     /*subtitle*/
     font-style: italic;
     font-size: 110%;
 }

 h2 {
     font-size: 1.1em;
     color: #a00;
     margin-top: 3em;
     position: relative;
     top: 1.4em;
     text-align: right;
     width: 20%;
 }

 h3 {
     font-size: 1em;
     line-height: 2em; 
     position: relative;
     top: 1.7em;
     text-align: right;
     width: 20%;
 }

 a {
     color: inherit;
     /*text-decoration:none*/
 }

 a:hover {
     color:#39f
 }

 #webaddress {
     margin-top: 1em;
     position: relative;
     left: 33%;
     color: #aaa;
     font-family: Menlo,monospace,sans-serif;
     font-size: 80%;
 }

 #webaddress a {
     text-decoration: none;
 }

 em {
     font-weight: bold;
     font-style: italic;
 }

 strong {
     font-weight: bold;
 }

 #address {
     display: none;
 }



 /*
 @media only screen and (max-width: 480px) {
 make one column somehow...
 }*/
