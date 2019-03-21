

//处理LaTeX表达式问题
export let MathJaxHub = ()=>{

    if (window.MathJax && window.MathJax.Hub)
    {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    }
};
