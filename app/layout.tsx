import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets:["latin","cyrillic"], display:"swap", variable:"--font-inter" });

export const metadata: Metadata = {
  title: "Echo",
  description: "ослания, которые переживут вас",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head><meta charSet="utf-8" /></head>
      <body className={inter.variable}
        style={{fontFamily:'var(--font-inter), ui-sans-serif, system-ui, "Segoe UI", Roboto, Arial, sans-serif'}}>
        {process.env.NODE_ENV === "development" && (
          <Script id="first-letter-guard" strategy="beforeInteractive">{`
            (function(){
              try{
                var Z="\\u200C"; // Zero Width Non-Joiner
                function prefixNode(n){ try{
                  var t=n.nodeValue||"";
                  if(t && t.charCodeAt(0)!==8204){ n.nodeValue = Z + t; }
                }catch(e){} }
                function fix(root){
                  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{
                    acceptNode:function(n){ return (n.nodeValue||"").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT; }
                  });
                  var x; while(x=w.nextNode()){ prefixNode(x); }
                }
                document.addEventListener("DOMContentLoaded",function(){ fix(document.body); });
                new MutationObserver(function(m){
                  for(var i=0;i<m.length;i++){
                    var r=m[i];
                    if(r.addedNodes) r.addedNodes.forEach(function(node){
                      if(node.nodeType===1) fix(node);
                      else if(node.nodeType===3) prefixNode(node);
                    });
                  }
                }).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
              }catch(e){}
            })();
          `}</Script>
        )}
        {children}
      </body>
    </html>
  );
}
